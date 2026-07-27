import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryBasePath = "/luna-learns-python";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: repositoryBasePath,
        assetPrefix: repositoryBasePath,
        trailingSlash: true,
        typescript: {
          tsconfigPath: "./tsconfig.pages.json",
        },
      }
    : {}),
};

export default nextConfig;
