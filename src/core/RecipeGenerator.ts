import type { GridItem, Grids } from 'src/types/Grids';
import type { MCRecipeItem, Recipe } from 'src/types/MCRecipe';

import { findKey } from 'lodash-es';

type ParseRecipeOptions = {
	input: Grids;
	output?: GridItem;
	exact?: boolean;
};

export function parseRecipe({ input, output, exact }: ParseRecipeOptions): Recipe {
	const patternChars = [...'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

	const key: Record<string, MCRecipeItem> = {};
	const pattern = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' ']
	];

	for (const i in input) {
		const item = input[i];
		if (!item) continue;

		let k = findKey(key, (v) => v.item === item.id && v.data === item.data);
		if (!k) {
			k = patternChars.shift() as string;
			key[k] = {
				item: item.id,
				data: item.data,
				count: 1
			};
		}
		const idx = parseInt(i);
		pattern[Math.floor(idx / 3)][idx % 3] = k;
	}

	let res = pattern.map((s) => s.join(''));
	if (!exact) {
		res = removeSpaces(res);
	}
	const result: MCRecipeItem | undefined = output && {
		item: output.id,
		data: output.data
	};
	return {
		format_version: `1.12.0`,
		'minecraft:recipe_shaped': {
			description: {
				identifier: `result`
			},
			pattern: res,
			key,
			result
		}
	};
}

const removeSpaces = (arr: string[]) => {
	const min: number[] = [];
	const max: number[] = [];
	for (const s of arr) {
		min.push(3 - s.trimStart().length);
		max.push(3 - s.trimEnd().length);
	}
	const start = Math.min(...min);
	const end = 3 - Math.min(...max);
	return arr.filter((s) => s.trim().length > 0).map((s) => s.slice(start, end));
};
