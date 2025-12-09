import { defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";
import { viteBundler } from "@vuepress/bundler-vite";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

import theme from "./theme.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "Learn",
  description: "Client Documentation for Nosana",

  head: [
    [
      "meta",
      {
        name: "algolia-site-verification",
        content: "20531F0DAE9A671C",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  ],

  theme,

  alias: {
    "@theme-hope/components/sidebar/SidebarLinks": path.resolve(
      __dirname,
      "./overrides/SidebarLinks.js",
    ),
  },

  bundler: viteBundler({
    viteOptions: {
      build: {
        minify: false,
      },
    },
  }),
});
