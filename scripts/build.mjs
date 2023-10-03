import { build } from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

await build({
  entryPoints: ["src/MDLTools.ts"],
  bundle: true,
  outfile: "build/mdltools.js",
  // target: "esnext",
  platform: "browser",
  format: "esm",
  // sourcemap: "inline",
  tsconfig: "./tsconfig-web.json",
  // logLevel: 'verbose',
});
