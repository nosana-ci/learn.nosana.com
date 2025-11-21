import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Deployments",
    icon: "rocket",
    prefix: "/deployments/",
    children: [
      {
        text: "Create a Deployment",
        icon: "plus",
        link: "create-deployment",
      },
      {
        text: "Manage Deployment",
        icon: "gear",
        link: "manage-deployment",
      },
    ],
  },
  {
    text: "Job Definition",
    icon: "file-code",
    prefix: "/job-definition/",
    children: [
      {
        text: "Schema",
        icon: "sitemap",
        link: "schema",
      },
      {
        text: "Endpoints",
        icon: "plug",
        link: "endpoints",
      },
      {
        text: "Literals",
        icon: "code",
        link: "literals",
      },
    ],
  },
  {
    text: "Guides",
    icon: "book",
    prefix: "/guides/",
    children: [
      {
        text: "My First Deployment",
        icon: "play",
        link: "my-first-deployment",
      },
      {
        text: "How to Get an API Key",
        icon: "key",
        link: "get-api-key",
      },
      {
        text: "Manage Deployments in the Dashboard",
        icon: "dashboard",
        link: "manage-dashboard",
      },
      {
        text: "How to Deploy Certain AI Models",
        icon: "brain",
        link: "deploy-ai-models",
      },
    ],
  },
  {
    text: "Markets",
    icon: "store",
    link: "/markets",
  },
  {
    text: "Glossary",
    icon: "book-open",
    link: "/glossary",
  },
]);
