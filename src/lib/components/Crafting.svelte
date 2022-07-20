<script lang="ts">
	import type { GridItem, Grids } from '$lib/types/Grids';
	import type { MinecraftTextureItem } from '$lib/types/Minecraft';

	import { loadRecipe } from '$lib/core/load';
	import { parseRecipe } from '$lib/core/RecipeGenerator';
	import { shareRecipe } from '$lib/core/share';
	import register from 'highlight.js/lib/languages/json';
	import { getContext } from 'svelte';
	import Highlight from 'svelte-highlight';
	import 'svelte-highlight/styles/atom-one-dark.css';
	import { Button, Card, CardBody, CardHeader, CardTitle, Input } from 'sveltestrap';
	import Item from './Item.svelte';

	export let recipeUrl: string | undefined;

	let exact: boolean;
	const items = getContext<MinecraftTextureItem[]>('items');
	let grids: Grids = {};
	let result: GridItem;

	if (recipeUrl) {
		[grids, result] = loadRecipe(items, recipeUrl);
	}
</script>

<Card>
	<CardHeader>
		<CardTitle>Crafting</CardTitle>
	</CardHeader>
	<CardBody>
		<div class="crafting-holder">
			<h6 class="crafting-title">Crafting</h6>
			<div class="crafting-wrapper">
				<div class="crafting">
					<div class="recipe">
						<div class="table-grid">
							{#each [...Array(9).keys()] as key}
								<Item isCrafting={true} bind:props={grids[key]} />
							{/each}
						</div>
					</div>
					<div class="arrow" />
					<div class="crafting-table-output">
						<Item isCrafting={true} bind:props={result} />
					</div>
				</div>
			</div>
		</div>
		<Input type="checkbox" label="Exact" bind:checked={exact} />
		<Button on:click={() => shareRecipe(items, grids, result)}>Share</Button>
	</CardBody>
</Card>

<Highlight
	language={{ name: 'json', register }}
	code={JSON.stringify(
		parseRecipe({
			input: grids,
			output: result,
			exact
		}),
		null,
		2
	)}
/>

<style>
	* {
		user-select: none;
	}
	.crafting-holder {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		margin-top: 10px;
		background: #c6c6c6;
		border: 2px solid #373737;
		border-right-color: #fff;
		border-bottom-color: #fff;
	}

	.crafting-title {
		font-family: Minecraft, sans-serif;
		margin-bottom: 5px;
	}

	.crafting-wrapper {
		display: flex;
		justify-content: center;
	}

	.crafting {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10px;
	}

	.recipe {
		display: flex;
	}

	.table-grid {
		display: flex;
		flex-wrap: wrap;

		width: 110px;
	}
	.crafting-table-output {
		display: flex;
	}
</style>
