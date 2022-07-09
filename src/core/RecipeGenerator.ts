import type { MCRecipeItem, Recipe } from 'src/types/MCRecipe';
import type { MinecraftTextureItem } from 'src/types/Minecraft';

import { findKey } from 'lodash-es';

const formatShape = (arr: string[], size: number) =>
	arr.reduce((res, curr, i) => {
		const idx = res.length - 1;
		if (i % size) res[idx] = res[idx] + curr;
		else res.push(curr);
		return res;
	}, [] as string[]);

export function parseRecipe(grids: Record<number, MinecraftTextureItem | undefined>): Recipe {
	const pattern = [...'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	const key: Record<string, MCRecipeItem> = {};
	const shape = new Array(9).fill(' ');

	for (const i in grids) {
		const item = grids[i];
		if (!item) continue;

		let k = findKey(key, (v) => v.item === item.id && v.data === item.data);
		if (!k) {
			k = pattern.shift() as string;
			key[k] = {
				item: item.id,
				count: 1,
				data: item.data
			};
		}
		shape[i] = k;
	}

	return {
		format_version: `1.12.0`,
		MCRecipeShaped: {
			description: {
				identifier: `result`
			},
			pattern: formatShape(shape, 3),
			key
		}
	};
}
