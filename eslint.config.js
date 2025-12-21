import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-trailing-spaces": "error",
      "no-multi-spaces": "error",
      "no-var":"error",
      "max-len":["error", { "code": 160 }],
      "curly":"error"
    },
  },

  tseslint.configs.recommended,
  globalIgnores(["playwright-report/*", "node_modules/*", "tests-examples/*"])
]);
