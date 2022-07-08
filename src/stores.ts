import { writable } from 'svelte/store';
import type { MinecraftTextureItem } from './types/Minecraft';

export const textureStore = writable<MinecraftTextureItem[]>([]);

export const dragStore = writable<MinecraftTextureItem | undefined>();

export const isPicking = writable(false);
