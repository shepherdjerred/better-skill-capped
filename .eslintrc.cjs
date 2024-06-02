module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },

  plugins: ["@typescript-eslint", "promise", "import"],
  extends: [
    // "react-app",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "prettier",
  ],
};
