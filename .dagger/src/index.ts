import { func, argument, Directory, object, Secret, Container, dag } from "@dagger.io/dagger";

// Helper function to log with timestamp
function logWithTimestamp(message: string): void {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Helper function to measure execution time
async function withTiming<T>(operation: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now();
  logWithTimestamp(`Starting ${operation}...`);
  try {
    const result = await fn();
    const duration = Date.now() - start;
    logWithTimestamp(`✅ ${operation} completed in ${duration.toString()}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    logWithTimestamp(
      `❌ ${operation} failed after ${duration.toString()}ms: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
}

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
  async deps(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger", "fetcher"],
      defaultPath: ".",
    })
    source: Directory,
  ): Promise<Container> {
    logWithTimestamp("📦 Installing main app dependencies");

    return getBunContainer().withMountedDirectory("/workspace", source).withExec(["bun", "install", "--frozen-lockfile"]);
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
      const container = await this.deps(source);
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
      const container = await this.deps(source);
      await container.withExec(["bun", "run", "build"]).sync();
      return container;
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
    @argument() prod: boolean = false,
    cloudflareToken: Secret,
    buildDir?: Directory,
  ): Promise<string> {
    logWithTimestamp(`🚀 Deploying to Cloudflare Pages (${prod ? "production" : "preview"})`);

    const dist = buildDir ?? (await this.build(source));

    const container = getBunContainer()
      .withExec(["bun", "add", "-g", "wrangler"])
      .withMountedDirectory("/workspace/dist", dist)
      .withSecretVariable("CLOUDFLARE_API_TOKEN", cloudflareToken)
      .withWorkdir("/workspace");

    await withTiming("cloudflare pages deployment", async () => {
      const deployCmd = prod
        ? ["bunx", "wrangler", "pages", "deploy", "dist", "--branch=main"]
        : ["bunx", "wrangler", "pages", "deploy", "dist"];
      await container.withExec(deployCmd).sync();
    });

    return `✅ Deployment completed successfully (${prod ? "production" : "preview"})`;
  }

  /**
   * Install dependencies for the fetcher
   */
  @func()
  async fetcherDeps(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger"],
      defaultPath: "fetcher",
    })
    source: Directory,
  ): Promise<Container> {
    logWithTimestamp("📦 Installing fetcher dependencies");

    return getBunContainer().withMountedDirectory("/workspace", source).withExec(["bun", "install", "--frozen-lockfile"]);
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
      const container = await this.fetcherDeps(source);
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

    await withTiming("fetcher deployment", async () => {
      const container = await this.fetcherDeps(source);
      await container.withSecretVariable("CLOUDFLARE_API_TOKEN", cloudflareToken).withExec(["bun", "run", "deploy"]).sync();
    });

    return "✅ Fetcher deployment completed successfully";
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
    @argument() prod: boolean = false,
    cloudflareToken?: Secret,
  ): Promise<string> {
    logWithTimestamp(`🚀 Running CI pipeline (${prod ? "production" : "preview"})`);

    const mainSource = source.withoutDirectory("fetcher");
    const fetcherSource = source.directory("fetcher");

    // Run lint and build in parallel
    const [lintResult, buildResult, fetcherBuildResult] = await Promise.all([
      withTiming("main lint", () => this.lint(mainSource)),
      withTiming("main build", () => this.build(mainSource)),
      withTiming("fetcher build", () => this.fetcherBuild(fetcherSource)),
    ]);

    logWithTimestamp("✅ Build and lint completed successfully");

    // Deploy if we have a token (production or preview)
    if (!cloudflareToken) {
      throw new Error("cloudflareToken is required for deployments");
    }

    if (prod) {
      // Production deployment: deploy to main branch
      await Promise.all([
        withTiming("main deploy", () => this.deploy(mainSource, prod, cloudflareToken, buildResult)),
        withTiming("fetcher deploy", () => this.fetcherDeploy(fetcherSource, cloudflareToken)),
      ]);

      return "✅ CI pipeline completed successfully with production deployments";
    } else {
      // Preview deployment: deploy as preview (no --branch flag creates preview)
      await Promise.all([
        withTiming("main deploy (preview)", () => this.deploy(mainSource, prod, cloudflareToken, buildResult)),
        // Note: fetcher doesn't support preview deployments, skip for previews
      ]);

      return "✅ CI pipeline completed successfully with preview deployments";
    }
  }
}
