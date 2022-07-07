<script lang="ts">
	import Item from './Item.svelte';
	import { textureStore } from '../stores';
	import { debounce } from 'lodash';

	let query = '';
	$: items = $textureStore.filter((v) => {
		return v.readable.toLowerCase().includes(query.toLowerCase());
	});
</script>

<div class="card">
	<div class="card-header">
		<div class="card-title">Inventory</div>
	</div>
	<div class="card-body">
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
			{#if items.length === 0}
				<div class="inventory-loading-text">
					{'Loading...'}
				</div>
			{:else}
				{#each items as item}
					<Item name={item.readable} identifier={item.id} texture={item.texture} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.inventory {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		margin-top: 10px;
		background: #c6c6c6;
		border: 2px solid #373737;
		border-right-color: #fff;
		border-bottom-color: #fff;
	}

	.inventory-loading-text {
		display: flex;
		justify-content: center;
		width: 100%;
		font-family: Minecraft, sans-serif;
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
