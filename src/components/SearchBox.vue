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
import { ref, watch } from 'vue';
import axios from 'axios';

interface SearchResult {
  id: number;
  name: string;
  description: string;
}

export default {
  name: 'SearchBox',
  data() {
    return {
      query: '',
      results: [] as SearchResult[],
    };
  },
  setup() {
    const handleLazySearch = () => {
      debounce(() => {
        fetchresults();
      }, 500)();
    };

    const debounce = (func: Function, delay: number) => {
      let timeoutId:number;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
      };
    };

    const fetchresults = async () => {
      if (query.value.length < 3) {
        results.value = [];
        return;
      }

      try {
        const response = await axios.get<SearchResult[]>(`https://arbimon.rfcx.org/api/user/projectlist?q=${encodeURIComponent(query.value)}`);
        results.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const highlightSearchText = (text: string) => {
      const searchTerm = query.value.toLowerCase();
      const regex = new RegExp(searchTerm, 'gi');
      return text.replace(regex, '<strong>$&</strong>');
    };

    const query = ref('');
    const results = ref([] as SearchResult[]);

    watch(query, handleLazySearch);

    return {
      query,
      results,
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
