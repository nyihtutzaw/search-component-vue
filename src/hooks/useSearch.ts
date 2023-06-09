import { ref, watch } from 'vue';
import { getSearchResults } from './../services/searchService';

interface SearchResult {
  id: number;
  name: string;
  description: string;
}

export function useSearch() {
  const query = ref('');
  const results = ref([] as SearchResult[]);

  const handleLazySearch = () => {
    lazyLoad(() => {
      fetchSearchResults();
    }, 500)();
  };

  const lazyLoad = (func: Function, delay: number) => {
    let timeoutId: number;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  const fetchSearchResults = async () => {
    if (query.value.length < 3) {
      results.value = [];
      return;
    }

    try {
        const response = await getSearchResults<SearchResult>(query.value);
        results.value = response;
      } catch (error) {
        console.error(error);
      }
  };

  const highlightSearchText = (text: string) => {
    const keyword = query.value.toLowerCase();
    const regex = new RegExp(keyword, 'gi');
    return text.replace(regex, '<strong>$&</strong>');
  };

  watch(query, handleLazySearch);

  return {
    query,
    results,
    handleLazySearch,
    highlightSearchText,
  };
}
