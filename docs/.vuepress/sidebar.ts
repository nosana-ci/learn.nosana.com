import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "About",
      // icon: "info",
      prefix: "about/",
      collapsible: true,
      children: ["introduction", "key-concepts", "glossary"],
    },
    {
      text: "Deployments",
      // icon: "rocket",
      prefix: "deployments/",
      collapsible: true,
      children: ["intro", "strategies", "options"],
    },
    {
      text: "API",
      // icon: "code",
      prefix: "api/",
      collapsible: true,
      children: ["intro", "create-deployments", "manage-deployments"],
    },
    {
      text: "TypeScript SDK",
      // icon: "code",
      prefix: "sdk/",
      collapsible: true,
      children: ["intro", "create-deployments", "manage-deployments"],
    },
    {
      text: "Job Definition",
      // icon: "file-code",
      prefix: "job-definition/",
      collapsible: true,
      children: [
        "intro",
        "schema",
        "endpoints",
        "health-checks",
        "literals",
        "services",
        "resources",
      ],
    },
    {
      text: "Guides",
      // icon: "book-open",
      prefix: "guides/",
      collapsible: true,
      children: ["get-api-key", "my-first-deployment", "manage-dashboard"],
    },
    {
      text: "GPU Markets",
      // icon: "computer",
      link: "gpu-markets",
    },
  ],
});
