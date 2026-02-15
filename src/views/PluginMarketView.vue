<!-- src/views/PluginMarketView.vue -->
<template>
  <div class="plugin-market">
    <div class="search-bar">
      <input v-model="searchQuery" @input="debouncedSearch" placeholder="搜索插件..." />
      <button @click="refresh">刷新</button>
    </div>
    <div class="plugin-grid">
      <PluginCard v-for="plugin in plugins" :key="plugin.id" :plugin="plugin" @install="installPlugin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePluginStore } from '../stores/pluginStore';
import PluginCard from '../components/plugins/PluginCard.vue';
import { useServerStore } from '../stores/serverStore';

const pluginStore = usePluginStore();
const { plugins, loading } = storeToRefs(pluginStore);
const serverStore = useServerStore();
const searchQuery = ref('');

let debounceTimer: number;
const debouncedSearch = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    pluginStore.searchPlugins(searchQuery.value);
  }, 300);
};

const refresh = () => {
  pluginStore.fetchPopularPlugins();
};

const installPlugin = async (pluginId: number) => {
  const server = serverStore.servers[0]; // 简化：默认选择第一个服务器
  if (!server) return alert('请先创建服务器');
  await pluginStore.downloadPlugin(pluginId, server.path);
};

onMounted(() => {
  pluginStore.fetchPopularPlugins();
});
</script>

<style scoped>
.plugin-market {
  padding: 20px;
}
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search-bar input {
  flex: 1;
  padding: 8px;
}
.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>
