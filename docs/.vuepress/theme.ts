import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { hopeTheme } from "vuepress-theme-hope";
import sidebar from "./sidebar.js";
import navbar from "./navbar.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default hopeTheme(
  {
    hostname: "https://docs.nosana.com",
    logo: "/assets/logo.svg",
    logoDark: "/assets/logo-dark.svg",
    repo: "https://github.com/nosana-ci/client-docs",
    docsDir: "docs",
    editLink: false,
    prevLink: false,
    nextLink: false,
    darkmode: "toggle",
    print: false,
    repoDisplay: false,

    // footer
    footer: "MIT Licensed | Copyright © 2021-present Nosana",
    copyright: false,
    displayFooter: true,
    contributors: false,

    navbar,
    sidebar,

    navbarLayout: {
      start: ["Brand"],
      center: [""],
      end: ["Links", "Outlook", "Search"],
    },

    pageInfo: ["Category", "Tag", "ReadingTime"],

    markdown: {
      alert: true,
      chartjs: true,
      codeTabs: true,
      component: true,
      demo: true,
      figure: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: true,
      kotlinPlayground: true,
      math: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      revealjs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
        themes: [
          "auto",
          "beige",
          "black",
          "blood",
          "league",
          "moon",
          "night",
          "serif",
          "simple",
          "sky",
          "solarized",
          "white",
        ],
      },
      sandpack: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
            return undefined;
          },
        },
      ],
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    plugins: {
      copyright: true,

      // docsearch: {
      //   appId: "O80DOX8SB5",
      //   apiKey: "3419239266c440c627d6bdd2f1cb82ea",
      //   indexName: "nosana",
      // },

      // PWA plugin options – allow extra fields like `cachePic`
      pwa: {
        favicon: "/favicon.ico",
        cacheHTML: true,
        cachePic: true,
        appendBase: true,
        apple: {
          icon: "/assets/icon/apple-touch-icon.png",
          statusBarColor: "black",
        },
        manifest: {
          icons: [
            {
              src: "/assets/icon/chrome-512x512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-192x192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [],
        },
      } as Record<string, unknown>,

      mdEnhancePlugin: {
        alert: true,
        align: true,
        attrs: true,
        chart: true,
        codetabs: true,
        component: true,
        demo: true,
        echarts: true,
        figure: true,
        flowchart: true,
        gfm: true,
        imgLazyload: true,
        imgMark: true,
        imgSize: true,
        include: {
          deep: true,
          resolvePath: (file: string) => {
            if (file.startsWith("@components/"))
              return file.replace(
                "@components",
                resolve(__dirname, "../../../components/src"),
              );

            if (file.startsWith("@echarts/"))
              return file.replace(
                "@echarts",
                resolve(__dirname, "../../../md-enhance/src/echarts"),
              );

            if (file.startsWith("@md-enhance/"))
              return file.replace(
                "@md-enhance",
                resolve(__dirname, "../../../md-enhance/src"),
              );

            if (file.startsWith("@pwa/"))
              return file.replace(
                "@pwa",
                resolve(__dirname, "../../../pwa2/src"),
              );

            return file;
          },
        },
        kotlinPlayground: true,
        mathjax: true,
        mark: true,
        markmap: false,
        mermaid: true,
        playground: {
          presets: ["ts", "vue", "unocss"],
        },
        revealJs: {
          plugins: ["highlight", "math", "search", "notes", "zoom"],
          themes: [
            "auto",
            "beige",
            "black",
            "blood",
            "league",
            "moon",
            "night",
            "serif",
            "simple",
            "sky",
            "solarized",
            "white",
          ],
        },
        sandpack: true,
        stylize: [
          {
            matcher: "Recommended",
            replacer: ({ tag }: { tag: string }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommended",
                };
            },
          },
        ],
        sub: true,
        sup: true,
        tabs: true,
        vPre: true,
        vuePlayground: true,
      },

      icon: {
        assets: "fontawesome",
      },
    } as Record<string, unknown>,
  },
  { custom: true },
);
