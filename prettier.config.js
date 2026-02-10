//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  printWidth: 80,
  singleQuote: false,
  semi: true,
  useTabs: false,
  trailingComma: "all",
  plugins: ["prettier-plugin-organize-imports"],
};
export default config;
