// src/api/plugins.ts
import { invoke } from './tauri';

export interface PluginInfo {
  id: number;
  name: string;
  tag: string;
  description: string;
  author: string;
  version: string;
  downloads: number;
  icon?: string;
}

export async function searchPlugins(query: string, size: number = 20): Promise<PluginInfo[]> {
  return invoke('search_plugins', { query, size });
}

export async function getPopularPlugins(size: number = 20): Promise<PluginInfo[]> {
  return invoke('get_popular_plugins', { size });
}

export async function downloadPlugin(pluginId: number, serverPath: string): Promise<void> {
  return invoke('download_plugin', { pluginId, serverPath });
}
