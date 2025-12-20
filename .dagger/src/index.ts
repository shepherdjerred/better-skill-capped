import { func, argument, Directory, object, Secret, Container, dag } from "@dagger.io/dagger";
import { logWithTimestamp, withTiming } from "@shepherdjerred/dagger-utils/utils";

/**
 * Get a container with bun
 */
function getBunContainer(): Container {
  return dag.container().from("oven/bun:latest").withWorkdir("/workspace");
}

@object()
export class BetterSkillCapped {
  /**
   * Install dependencies for the main app
   */
  @func()
  deps(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger", "fetcher"],
      defaultPath: ".",
    })
    source: Directory,
  ): Container {
    logWithTimestamp("📦 Installing main app dependencies");

    return getBunContainer()
      .withMountedDirectory("/workspace", source)
      .withExec(["bun", "install", "--frozen-lockfile"]);
  }

  /**
   * Lint the main application
   */
  @func()
  async lint(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger", "fetcher"],
      defaultPath: ".",
    })
    source: Directory,
  ): Promise<string> {
    logWithTimestamp("🔍 Linting main application");

    await withTiming("linting", async () => {
      const container = this.deps(source);
      await container.withExec(["bun", "run", "lint:fix"]).sync();
    });

    return "✅ Linting completed successfully";
  }

  /**
   * Build the main application
   */
  @func()
  async build(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger", "fetcher"],
      defaultPath: ".",
    })
    source: Directory,
  ): Promise<Directory> {
    logWithTimestamp("🏗️ Building main application");

    const buildResult = await withTiming("building", async () => {
      const container = this.deps(source);
      return container.withExec(["bun", "run", "build"]).sync();
    });

    return buildResult.directory("/workspace/dist");
  }

  /**
   * Deploy the main application to Cloudflare Pages
   */
  @func()
  async deploy(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger", "fetcher"],
      defaultPath: ".",
    })
    source: Directory,
    projectName: string,
    branch: string,
    gitSha: string,
    cloudflareAccountId: Secret,
    cloudflareToken: Secret,
    buildDir?: Directory,
  ): Promise<string> {
    logWithTimestamp(`🚀 Deploying to Cloudflare Pages (branch: ${branch})`);

    const dist = buildDir ?? (await this.build(source));

    const container = dag
      .container()
      .from("node:lts-slim")
      .withDirectory("/workspace/dist", dist)
      .withSecretVariable("CLOUDFLARE_ACCOUNT_ID", cloudflareAccountId)
      .withSecretVariable("CLOUDFLARE_API_TOKEN", cloudflareToken);

    const output = await withTiming("cloudflare pages deployment", async () => {
      const deployContainer = container.withExec([
        "npx",
        "wrangler@latest",
        "pages",
        "deploy",
        "/workspace/dist",
        `--project-name=${projectName}`,
        `--branch=${branch}`,
        `--commit-hash=${gitSha}`,
      ]);

      const [stdout, stderr] = await Promise.all([
        deployContainer.stdout().catch(() => ""),
        deployContainer.stderr().catch(() => ""),
      ]);

      logWithTimestamp(`📤 Deployment stdout:\n${stdout}`);
      if (stderr) {
        logWithTimestamp(`📤 Deployment stderr:\n${stderr}`);
      }

      await deployContainer.sync();

      return stdout;
    });

    return `✅ Deployment completed successfully (branch: ${branch})\n${output}`;
  }

  /**
   * Install dependencies for the fetcher
   */
  @func()
  fetcherDeps(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger"],
      defaultPath: "fetcher",
    })
    source: Directory,
  ): Container {
    logWithTimestamp("📦 Installing fetcher dependencies");

    return getBunContainer()
      .withMountedDirectory("/workspace", source)
      .withExec(["bun", "install", "--frozen-lockfile"]);
  }

  /**
   * Build the fetcher worker
   */
  @func()
  async fetcherBuild(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger"],
      defaultPath: "fetcher",
    })
    source: Directory,
  ): Promise<string> {
    logWithTimestamp("🏗️ Building fetcher worker");

    await withTiming("fetcher build", async () => {
      const container = this.fetcherDeps(source);
      await container.withExec(["bun", "run", "build"]).sync();
    });

    return "✅ Fetcher build completed successfully";
  }

  /**
   * Deploy the fetcher worker to Cloudflare
   */
  @func()
  async fetcherDeploy(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger"],
      defaultPath: "fetcher",
    })
    source: Directory,
    cloudflareToken: Secret,
  ): Promise<string> {
    logWithTimestamp("🚀 Deploying fetcher to Cloudflare");

    const output = await withTiming("fetcher deployment", async () => {
      const container = this.fetcherDeps(source);
      const deployContainer = container
        .withSecretVariable("CLOUDFLARE_API_TOKEN", cloudflareToken)
        .withExec(["bun", "run", "deploy"]);

      const [stdout, stderr] = await Promise.all([
        deployContainer.stdout().catch(() => ""),
        deployContainer.stderr().catch(() => ""),
      ]);

      logWithTimestamp(`📤 Fetcher deployment stdout:\n${stdout}`);
      if (stderr) {
        logWithTimestamp(`📤 Fetcher deployment stderr:\n${stderr}`);
      }

      await deployContainer.sync();

      return stdout;
    });

    return `✅ Fetcher deployment completed successfully\n${output}`;
  }

  /**
   * Run the complete CI pipeline
   */
  @func()
  async ci(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger"],
      defaultPath: ".",
    })
    source: Directory,
    projectName: string,
    branch: string,
    gitSha: string,
    cloudflareAccountId: Secret,
    cloudflareToken: Secret,
  ): Promise<string> {
    logWithTimestamp(`🚀 Running CI pipeline (branch: ${branch})`);

    const mainSource = source.withoutDirectory("fetcher");
    const fetcherSource = source.directory("fetcher");

    // Run lint and build in parallel
    const [_lintResult, buildResult, _fetcherBuildResult] = await Promise.all([
      withTiming("main lint", () => this.lint(mainSource)),
      withTiming("main build", () => this.build(mainSource)),
      withTiming("fetcher build", () => this.fetcherBuild(fetcherSource)),
    ]);

    logWithTimestamp("✅ Build and lint completed successfully");

    // Deploy both main app and fetcher
    const isProduction = branch === "main";

    if (isProduction) {
      // Production deployment: deploy both main and fetcher
      await Promise.all([
        withTiming("main deploy", () =>
          this.deploy(mainSource, projectName, branch, gitSha, cloudflareAccountId, cloudflareToken, buildResult),
        ),
        withTiming("fetcher deploy", () => this.fetcherDeploy(fetcherSource, cloudflareToken)),
      ]);

      return "✅ CI pipeline completed successfully with production deployments";
    } else {
      // Preview deployment: deploy only main app (fetcher doesn't support preview)
      await withTiming("main deploy (preview)", () =>
        this.deploy(mainSource, projectName, branch, gitSha, cloudflareAccountId, cloudflareToken, buildResult),
      );

      return "✅ CI pipeline completed successfully with preview deployment";
    }
  }
}
