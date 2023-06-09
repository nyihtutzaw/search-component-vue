<template>
  <div class="px-8 py-2 w-full">
    <div class="relative">
      <input v-model="query" @input="handleLazySearch" placeholder="Search..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      <div v-if="results.length > 0" class="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md">
        <ul>
          <li v-for="result in results" :key="result.id" class="p-4 hover:bg-gray-100">
            <div v-html="highlightSearchText(result.name)"></div>
            <div v-html="highlightSearchText(result.description)"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSearch } from '../hooks/useSearch';

export default {
  name: 'SearchBox',
  setup() {
    const { query, results, handleLazySearch, highlightSearchText } = useSearch();

    return {
      query,
      results,
      handleLazySearch,
      highlightSearchText,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px;
}

strong {
  font-weight: bold;
}
</style>
