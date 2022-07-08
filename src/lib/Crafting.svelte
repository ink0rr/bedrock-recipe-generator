<script lang="ts">
	import type { MinecraftTextureItem } from 'src/types/Minecraft';

	import { Card, CardBody, CardHeader, CardTitle } from 'sveltestrap';
	import Item from './Item.svelte';

	let grids: Record<number, MinecraftTextureItem | undefined> = {};

	$: {
		for (const grid in grids) {
			console.log(grids[grid]?.id);
		}
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
	</CardBody>
</Card>

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
</style>
