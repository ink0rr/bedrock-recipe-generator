import type { GridItem, Grids } from 'src/types/Grids';
import type { MinecraftTextureItem } from 'src/types/Minecraft';
import type { RecipeUrl } from 'src/types/RecipeUrl';

import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { decodeBase64 } from '../utils/buffer';

export function loadRecipe(items: MinecraftTextureItem[], recipeUrl: string): [Grids, GridItem] {
	const grids: Grids = {};
	let result: GridItem;

	try {
		const recipe = decodeBase64<RecipeUrl>(recipeUrl);
		recipe.input.forEach((id, i) => {
			if (id === -1) return;
			grids[i] = items[id];
		});
		if (recipe.output) result = items[recipe.output];
	} catch (e) {
		console.error(e);
		if (browser) goto(`/`);
	}
	return [grids, result];
}
