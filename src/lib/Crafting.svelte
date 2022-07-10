<script lang="ts">
	import type { MinecraftTextureItem } from 'src/types/Minecraft';

	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { Button, Card, CardBody, CardHeader, CardTitle } from 'sveltestrap';
	import { parseRecipe } from '../core/RecipeGenerator';
	import Item from './Item.svelte';

	export let recipe: string | undefined;

	const items = getContext<MinecraftTextureItem[]>('items');
	let grids: Record<number, MinecraftTextureItem | undefined> = {};

	if (recipe) {
		try {
			const arr = JSON.parse(atob(recipe)) as number[];
			arr.forEach((id, i) => {
				if (id === -1) return;
				grids[i] = items[id];
			});
		} catch (e) {
			console.error(e);
			if (browser) goto(`/`);
		}
	}

	function share() {
		let res: number[] = new Array(9).fill(-1);
		for (const i in items) {
			const item = items[i];
			for (const k in grids) {
				const gridItem = grids[k];
				if (!gridItem) continue;
				if (item.id === gridItem.id && item.data === gridItem.data) res[k] = parseInt(i);
			}
		}
		const buf = btoa(JSON.stringify(res));
		const params = `recipe=${buf}`;
		navigator.clipboard.writeText(`${window.location.host}?${params}`);
		goto(`?${params}`, { noscroll: true });
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
				</div>
			</div>
		</div>
		<Button on:click={share}>Share</Button>
	</CardBody>
</Card>

<code>
	{JSON.stringify(parseRecipe(grids), null, 2)}
</code>

<style>
	code {
		display: block;
		white-space: pre-wrap;
	}
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
</style>
