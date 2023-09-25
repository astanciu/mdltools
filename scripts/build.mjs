import { build } from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

await build({
  entryPoints: ["src/MDLTools.ts"],
  bundle: true,
  outfile: "build/mdltools.js",
  target: "es2020",
  platform: "browser",
  sourcemap: "inline",
  plugins: [],
  // logLevel: 'verbose',
});
