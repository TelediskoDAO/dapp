import path from "path";

import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

const ENVS = ["production", "staging", "development"];
const env = process.env.NODE_ENV?.toLowerCase() || "development";

if (!ENVS.includes(env)) {
  console.error(`Invalid NODE_ENV value: ${env}`);
  process.exit(1);
}

console.log(`Building for ${env}`);

const dev = env === "development";

const network = process.env.NETWORK || "local";
const endpoint = process.env.ENDPOINT || "http://localhost:8545";
const oracleAddress = process.env.ORACLE_ADDRESS;

// https://stackoverflow.com/a/35778030/597097
const gitRevision = require("child_process")
  .execSync("git rev-parse HEAD")
  .toString()
  .trim();

const now = Date.now();

function setAlias() {
  const projectRootDir = path.resolve(__dirname);
  return alias({
    resolve: [".svelte", ".js"],
    entries: [
      {
        find: "src",
        replacement: path.resolve(projectRootDir, "src"),
      },
    ],
  });
}

export default [
  {
    input: "src/index.ts",
    output: {
      file: "build/bundle.js",
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      replace({
        __buildEnv__: JSON.stringify({
          production: !dev,
          env,
          date: now,
          version: packageJson.version,
          network,
          endpoint,
          oracleAddress,
          ipfsEndpoint: "https://ipfs.infura.io:5001",
          gitRevision,
        }),
      }),
      copy({ targets: [{ src: "public/*", dest: "build" }] }),
      svelte({
        compilerOptions: {
          // enable run-time checks when not in production
          dev,
        },
        preprocess: sveltePreprocess({ sourceMap: dev }),
      }),
      css({ output: "components.css" }),
      setAlias(),
      json(),
      resolve({ browser: true, dedupe: ["svelte"] }),
      commonjs(),
      typescript({
        sourceMap: dev,
        inlineSources: dev,
      }),
      dev &&
        serve({
          contentBase: "build",
          /*open: true,*/ host: "0.0.0.0",
          port: 4100,
        }),
      dev && livereload("build"),
      !dev && terser(),
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true,
      },
    },
  },

  {
    input: "service-worker/index.js",
    output: {
      file: "build/service-worker.js",
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      replace({
        __buildEnv__: JSON.stringify({
          production: !dev,
          date: now,
          version: dev ? "dev" : packageJson.version,
        }),
      }),
      setAlias(),
      json(),
      // rollup-plugin-node-resolve embeds external dependecies in the bundle,
      // more info here:
      // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
      resolve({ browser: true, dedupe: ["svelte"] }),
      commonjs(),
      //!production && livereload("build"),
      !dev && terser(),
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true,
      },
    },
  },
];
