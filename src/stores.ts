import { writable } from 'svelte/store';
import type { MinecraftTextureItem } from './types/Minecraft';

export const textureStore = writable<MinecraftTextureItem[]>([]);

export const dragStore = writable<
	| {
			name: string;
			identifier: string;
			texture: string;
	  }
	| undefined
>();
