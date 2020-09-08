import * as fs from "fs";
import path from "path";

import alias from "@rollup/plugin-alias";
import sveltePreprocess from "svelte-preprocess";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import scss from "rollup-plugin-scss";
import serve from "rollup-plugin-serve";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;
const dedupe = (importee) =>
  importee === "svelte" || importee.startsWith("svelte/");

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
    input: "src/index.js",
    output: {
      file: "build/bundle.js",
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      replace({
        __buildEnv__: JSON.stringify({
          production,
          date: Date.now(),
        }),
      }),
      copy({ targets: [{ src: "public/*", dest: "build" }] }),
      copy({
        targets: [{ src: "service-workers/*", dest: "build/service-workers" }],
      }),
      svelte({
        dev: !production,
        preprocess: sveltePreprocess(),
        css: (css) => css.write("components.css"),
      }),
      scss({
        output: "build/style.css",
      }),
      setAlias(),
      json(),
      // rollup-plugin-node-resolve embeds external dependecies in the bundle,
      // more info here:
      // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
      resolve({ browser: true, dedupe }),
      commonjs(),
      // https://github.com/thgh/rollup-plugin-serve
      !production &&
        serve({
          contentBase: "build",
          /*open: true,*/ host: "0.0.0.0",
          port: 4100,
        }),
      !production && livereload("build"),
      production && terser(),
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true,
      },
    },
  },

  {
    input: "service-workers/index.js",
    output: {
      file: "build/service-workers.js",
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      replace({
        __buildEnv__: JSON.stringify({
          production,
          date: Date.now(),
        }),
      }),
      setAlias(),
      json(),
      // rollup-plugin-node-resolve embeds external dependecies in the bundle,
      // more info here:
      // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
      resolve({ browser: true, dedupe }),
      commonjs(),
      //!production && livereload("build"),
      production && terser(),
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true,
      },
    },
  },
];
