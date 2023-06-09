<template>
  <div class="bg-gray-200 min-h-screen flex justify-center pt-3">
    <SearchBox />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "./components/SearchBox.vue";

export default defineComponent({
  name: "App",
  components: {
    SearchBox,
  },
});
</script>
