<script context="module" lang="ts">
	import '../app.css';
</script>

<script lang="ts">
	import type { MinecraftTextureItem } from '../types/Minecraft';

	import Crafting from '$lib/Crafting.svelte';
	import DraggedItem from '$lib/DraggedItem.svelte';
	import Inventory from '$lib/Inventory.svelte';
	import { setContext } from 'svelte';
	import { Styles } from 'sveltestrap';
	import { convertBedrock } from '../core/bedrock';
	import { dragStore } from '../stores';

	$: x = 0;
	$: y = 0;

	export let recipe: string;
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
				<Crafting {recipe} />
			</div>
		</div>
	</div>
</section>
