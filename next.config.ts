import type { NextConfig } from "next";

// GitHub Pages serves this project site under /<repo>/.
const BASE_PATH = "/pc-november-open-preview";

const config: NextConfig = {
  output: "export", // fully static: no server, no API routes, nothing to call
  basePath: BASE_PATH,
  trailingSlash: true,
  reactStrictMode: true,
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
};

export default config;
