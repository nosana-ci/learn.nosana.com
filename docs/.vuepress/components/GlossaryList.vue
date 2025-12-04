<template>
  <section class="glossary-list">
    <div
      v-for="(entries, letter) in groupedByLetter"
      :key="letter"
      class="glossary-letter-group"
    >
      <h2 :id="letter.toLowerCase()">
        {{ letter }}
      </h2>

      <div
        v-for="([term, definition]) in entries"
        :key="term"
        class="glossary-entry"
      >
        <h3 :id="termId(term)">
          {{ term }}
        </h3>
        <p>{{ definition }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GLOSSARY_DEFINITIONS } from "../glossary-definitions";

type Entry = [string, string];

const sortedEntries = computed<Entry[]>(() =>
  Object.entries(GLOSSARY_DEFINITIONS).sort(([a], [b]) =>
    a.localeCompare(b),
  ),
);

const groupedByLetter = computed<Record<string, Entry[]>>(() => {
  const groups: Record<string, Entry[]> = {};

  for (const entry of sortedEntries.value) {
    const [term] = entry;
    const letter = term.charAt(0).toUpperCase();

    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(entry);
  }

  return groups;
});

const termId = (term: string) =>
  term.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
</script>

<style scoped>
.glossary-letter-group {
  margin-top: 1.5rem;
}

.glossary-entry {
  margin-top: 0.75rem;
}
</style>


