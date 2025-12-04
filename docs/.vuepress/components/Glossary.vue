<template>
  <span
    class="glossary-wrapper"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <span class="glossary-term">
      <slot>{{ term }}</slot>
    </span>

    <span
      v-if="definition && show"
      class="glossary-tooltip"
    >
      {{ definition }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { GLOSSARY_DEFINITIONS } from "../glossary-definitions";

const props = defineProps<{
  term: string;
}>();

const show = ref(false);

const definition = computed(() => {
  const termLower = props.term.toLowerCase();
  const matchedKey = Object.keys(GLOSSARY_DEFINITIONS).find(
    (key) => key.toLowerCase() === termLower,
  );

  return matchedKey ? GLOSSARY_DEFINITIONS[matchedKey] : "";
});
</script>

<style scoped>
.glossary-wrapper {
  position: relative;
  display: inline-block;
}

.glossary-term {
  border-bottom: 1px dotted var(--vp-c-text-2, rgba(0, 0, 0, 0.4));
  cursor: help;
}

.glossary-tooltip {
  position: absolute;
  left: 0;
  bottom: 120%;
  transform: none;
  display: block;
  min-width: 220px;
  max-width: 420px;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  background: var(--vp-c-bg, #111827);
  color: var(--vp-c-text, #f9fafb);
  font-size: 0.8rem;
  line-height: 1.3;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  white-space: normal;
}
</style>


