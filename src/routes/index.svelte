<script context="module" lang="ts">
	import '../app.css';
</script>

<script lang="ts">
	import type { MinecraftTextureItem } from '$lib/types/Minecraft';

	import Crafting from '$lib/components/Crafting.svelte';
	import DraggedItem from '$lib/components/DraggedItem.svelte';
	import Inventory from '$lib/components/Inventory.svelte';
	import { convertBedrock } from '$lib/core/bedrock';
	import { dragStore } from '$lib/stores';
	import { setContext } from 'svelte';
	import { Styles } from 'sveltestrap';

	$: x = 0;
	$: y = 0;

	export let recipeUrl: string;
	export let items: MinecraftTextureItem[] = [];

	setContext('items', convertBedrock(items));
</script>

<Styles />

<section>
	<div
		class="container"
		on:mousemove={({ pageX, pageY }) => {
			x = pageX;
			y = pageY;
		}}
	>
		{#if $dragStore}
			<DraggedItem name={$dragStore.readable} texture={$dragStore.texture} {x} {y} />
		{/if}

		<div class="row">
			<div class="col-md-6 col-sm-12">
				<Inventory />
			</div>
			<div class="pull-right col-md-6 col-sm-12">
				<Crafting {recipeUrl} />
			</div>
		</div>
	</div>
</section>
