import { writable } from 'svelte/store';
import type { MinecraftTextureItem } from './types/Minecraft';

export const textureStore = writable<MinecraftTextureItem[]>([]);
