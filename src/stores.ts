import { writable } from 'svelte/store';
import type { MinecraftTextureItem } from './types/Minecraft';

export const dragStore = writable<MinecraftTextureItem | undefined>();

export const isPicking = writable(false);
