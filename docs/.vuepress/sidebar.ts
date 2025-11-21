import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Deployments",
      icon: "rocket",
      prefix: "deployments/",
      link: "deployments/",
      children: [
        "create-deployment",
        "manage-deployment",
      ],
    },
    {
      text: "Job Definition",
      icon: "file-code",
      prefix: "job-definition/",
      link: "job-definition/",
      children: [
        "schema",
        "endpoints",
        "literals",
      ],
    },
    {
      text: "Guides",
      icon: "book",
      prefix: "guides/",
      link: "guides/",
      children: [
        "my-first-deployment",
        "get-api-key",
        "manage-dashboard",
        "deploy-ai-models",
      ],
    },
    "markets",
    "glossary",
  ],
});
