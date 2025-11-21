import { defineUserConfig } from "vuepress";
import { redirectPlugin } from "@vuepress/plugin-redirect";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "Client Docs",
  description: "Client Documentation for Nosana",

  theme,
});
