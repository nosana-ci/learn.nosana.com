import { defineClientConfig } from "@vuepress/client";
import GPUMarkets from "./components/GPUMarkets.vue";
import Glossary from "./components/Glossary.vue";
import GlossaryList from "./components/GlossaryList.vue";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("GPUMarkets", GPUMarkets);
    app.component("GpuMarkets", GPUMarkets);

    app.component("Glossary", Glossary);
    app.component("GlossaryList", GlossaryList);
  },
});
