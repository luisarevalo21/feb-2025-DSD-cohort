import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs}"] },
  { languageOptions: { globals: globals.node } },
  { plugins: { prettier: pluginPrettier } },
  pluginJs.configs.recommended,
  "prettier/prettier",
  "error",
  configPrettier,
];
