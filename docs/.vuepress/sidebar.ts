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
        "options",
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
        "get-api-key",
        "my-first-deployment",
        "manage-dashboard",
        "deploy-ai-models",
      ],
    },
    "gpu-markets",
    "glossary",
  ],
});
