import js from "@eslint/js";
import globals from "globals";
import wdio from "eslint-plugin-wdio";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      wdio
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Zmieniamy na module, żeby działało import/export
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        // Dodajemy zmienne globalne WebdriverIO, żeby ESLint ich nie podkreślał
        browser: "readonly",
        $: "readonly",
        $$: "readonly"
      }
    },
    rules: {
      ...wdio.configs.recommended.rules,
      
      // TWOJE STARE REGUŁY (Przeniesione):
      "class-methods-use-this": "off",
      "arrow-parens": "off",
      "prefer-arrow-callback": "off",
      "func-names": "off",
      "object-curly-newline": "off",

      // DODATKOWE (Dla wygody w zadaniu):
      "no-unused-vars": "warn",
      "no-console": "off" // Ważne dla Twojego Custom Loggera!
    }
  }
];