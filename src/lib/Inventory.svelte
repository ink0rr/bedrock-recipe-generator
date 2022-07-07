<script lang="ts">
	import Item from './Item.svelte';
	import { textureStore } from '../stores';

	let query = '';

	$: items = $textureStore.filter((v) => {
		return v.readable.toLowerCase().includes(query.toLowerCase());
	});
</script>

<div>
	<input type="text" bind:value={query} />
	<div class="InventoryContainer">
		{#each items as item}
			<Item name={item.readable} identifier={item.id} texture={item.texture} />
		{/each}
	</div>
</div>

<style>
	.InventoryContainer {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		background: #c6c6c6;
		border-color: #373737 #fff #fff #373737;
		border-style: solid;
		border-width: 2px;
		max-width: 512px;
	}
</style>
