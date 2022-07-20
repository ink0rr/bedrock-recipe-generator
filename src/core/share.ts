import type { MinecraftTextureItem } from 'src/types/Minecraft';
import type { RecipeUrl } from 'src/types/RecipeUrl';

import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { encodeBase64 } from '../utils/buffer';

export function shareRecipe(
	items: MinecraftTextureItem[],
	grids: Record<number, MinecraftTextureItem | undefined>,
	result?: MinecraftTextureItem
) {
	const recipeUrl: RecipeUrl = {
		input: new Array(9).fill(-1)
	};

	for (const i in items) {
		const item = items[i];
		for (const k in grids) {
			const gridItem = grids[k];
			if (!gridItem) continue;
			if (item.id === gridItem.id && item.data === gridItem.data) recipeUrl.input[k] = parseInt(i);
		}
		if (item.id === result?.id && item.data === result?.data) recipeUrl.output = parseInt(i);
	}

	const params = `recipe=${encodeBase64(recipeUrl)}`;
	if (browser) {
		navigator.clipboard.writeText(`${window.location.host}?${params}`);
		goto(`?${params}`);
	}
}
