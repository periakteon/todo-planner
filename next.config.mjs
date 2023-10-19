import removeImports from "next-remove-imports";
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = removeImports()({
  reactStrictMode: true,

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

export default config;
