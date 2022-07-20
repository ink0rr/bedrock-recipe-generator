import type { MinecraftTextureItem } from './types/Minecraft';

import { writable } from 'svelte/store';

export const dragStore = writable<MinecraftTextureItem | undefined>();

export const isPicking = writable(false);
