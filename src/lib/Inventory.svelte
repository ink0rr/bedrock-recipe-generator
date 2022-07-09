<script lang="ts">
	import type { MinecraftTextureItem } from '../types/Minecraft';

	import { debounce } from 'lodash-es';
	import { getContext } from 'svelte';
	import { Card, CardBody, CardHeader, CardTitle } from 'sveltestrap';
	import Item from './Item.svelte';

	let query = '';

	const items = getContext<MinecraftTextureItem[]>('items');
	$: searchResult = items.filter((v) => {
		return v.readable.toLowerCase().includes(query.toLowerCase());
	});
</script>

<Card>
	<CardHeader>
		<CardTitle>Inventory</CardTitle>
	</CardHeader>
	<CardBody>
		<span class="search-box">
			<p>Search:</p>
			<input
				type="text"
				on:input={debounce((e) => {
					query = e.target.value;
				}, 150)}
			/>
		</span>
		<div class="inventory">
			{#each searchResult as item}
				<Item props={item} />
			{/each}
		</div>
	</CardBody>
</Card>

<style>
	.inventory {
		user-select: none;
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		margin-top: 10px;
		background: #c6c6c6;
		border: 2px solid #373737;
		border-right-color: #fff;
		border-bottom-color: #fff;
		min-height: 60px;
	}

	.inventory {
		max-height: 700px;
		overflow-y: scroll;
	}

	.inventory::-webkit-scrollbar {
		width: auto;
	}

	.inventory::-webkit-scrollbar-track {
		background-color: #8b8b8b;
	}

	.inventory::-webkit-scrollbar-thumb {
		height: 10px;
		background-color: #c6c6c6;
		border: 2px solid #373737;
		border-right-color: #fff;
		border-bottom-color: #fff;
	}

	.search-box {
		display: flex;
		align-items: center;
		flex: 0 0 100%;
		margin-bottom: 5px;
		overflow-x: auto;
	}

	.search-box p {
		margin-bottom: 0;
	}

	.search-box input {
		flex: 2;
		margin-left: 10px;
	}
</style>
