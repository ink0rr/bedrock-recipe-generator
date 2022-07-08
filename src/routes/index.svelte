<script context="module" lang="ts">
	import '../app.css';
</script>

<script lang="ts">
	import type { MinecraftTextures } from '../types/Minecraft';

	import { dragStore, itemStore } from '../stores';
	import { Styles } from 'sveltestrap';
	import Inventory from '$lib/Inventory.svelte';
	import DraggedItem from '$lib/DraggedItem.svelte';
	import Crafting from '$lib/Crafting.svelte';
	import bedrock from '../bedrock';

	fetch(`https://unpkg.com/minecraft-textures@1.19.0/dist/textures/json/1.19.json`)
		.then((response) => response.json())
		.then(({ items }: MinecraftTextures) => {
			$itemStore = items
				.filter((v) => !bedrock.ignore.includes(v.id))
				.map((v) => {
					const item = bedrock.conversions[v.id];
					if (item) item.id = item.id + (item.data ? `<${item.data}>` : ``);
					return v;
				});
		});

	$: x = 0;
	$: y = 0;
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
				<Crafting />
			</div>
		</div>
	</div>
</section>
