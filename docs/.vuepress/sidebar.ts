import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "Deployments",
      icon: "rocket",
      prefix: "deployments/",
      collapsible: true,
      expanded: true,
      children: ["intro", "create-deployment", "manage-deployment", "options"],
    },
    {
      text: "Job Definition",
      icon: "file-code",
      prefix: "job-definition/",
      collapsible: true,
      expanded: true,
      children: [
        "intro",
        "schema",
        "endpoints",
        "literals",
        "multiple-services",
        "resources",
      ],
    },
    {
      text: "Guides",
      icon: "book",
      prefix: "guides/",
      collapsible: true,
      expanded: true,
      children: ["get-api-key", "my-first-deployment", "manage-dashboard"],
    },
    "gpu-markets",
    "glossary",
  ],
});
