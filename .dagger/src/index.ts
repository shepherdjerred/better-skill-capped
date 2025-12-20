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

const BUN_VERSION = "1.3.4";

/**
 * Get a Bun container
 */
function getBunContainer(): Container {
  return dag
    .container()
    .from(`oven/bun:${BUN_VERSION}`)
    .withWorkdir("/workspace")
    .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-cache"));
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
      await container.withExec(["bun", "run", "lint:fix"]);
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
      return container.withExec(["bun", "run", "build"]);
    });

    return buildResult.directory("/workspace/dist");
  }

  /**
   * Deploy the main application to Netlify
   */
  @func()
  async deploy(
    @argument({
      ignore: ["node_modules", "dist", "build", ".cache", "*.log", ".env*", "!.env.example", ".dagger", "fetcher"],
      defaultPath: ".",
    })
    source: Directory,
    @argument() prod: boolean = false,
    netlifyToken: Secret,
  ): Promise<string> {
    logWithTimestamp(`🚀 Deploying to Netlify (${prod ? "production" : "preview"})`);

    const dist = await this.build(source);
    const siteId = "4374825e-365d-4cb3-8117-71e1d8c0c960";

    const container = getBunContainer()
      .withExec(["bun", "install", "-g", "netlify-cli"])
      .withMountedDirectory("/workspace/dist", dist)
      .withSecretVariable("NETLIFY_AUTH_TOKEN", netlifyToken)
      .withEnvVariable("NETLIFY_SITE_ID", siteId);

    await withTiming("netlify deployment", async () => {
      if (prod) {
        await container.withExec(["bunx", "netlify-cli", "deploy", "--dir=dist", "--prod"]);
      } else {
        await container.withExec(["bunx", "netlify-cli", "deploy", "--dir=dist"]);
      }
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
      await container.withExec(["bun", "run", "build"]);
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
      await container.withSecretVariable("CLOUDFLARE_API_TOKEN", cloudflareToken).withExec(["bun", "run", "deploy"]);
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
    netlifyToken?: Secret,
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

    // Deploy if we're in production and have tokens
    if (prod && netlifyToken && cloudflareToken) {
      await Promise.all([
        withTiming("main deploy", () => this.deploy(mainSource, prod, netlifyToken)),
        withTiming("fetcher deploy", () => this.fetcherDeploy(fetcherSource, cloudflareToken)),
      ]);

      return "✅ CI pipeline completed successfully with deployments";
    }

    return "✅ CI pipeline completed successfully";
  }
}
