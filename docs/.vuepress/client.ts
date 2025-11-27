import { defineClientConfig } from '@vuepress/client';
import GPUMarkets from './components/GPUMarkets.vue';

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('GPUMarkets', GPUMarkets);
    app.component('GpuMarkets', GPUMarkets);
  },
});

