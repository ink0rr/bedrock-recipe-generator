<script context="module" lang="ts">
	import '../app.css';
</script>

<script lang="ts">
	import type { MinecraftTextures } from '../types/Minecraft';

	import { dragStore, textureStore } from '../stores';
	import { Styles } from 'sveltestrap';
	import Inventory from '$lib/Inventory.svelte';
	import DraggedItem from '$lib/DraggedItem.svelte';
	import Crafting from '$lib/Crafting.svelte';

	fetch(`https://unpkg.com/minecraft-textures@1.19.0/dist/textures/json/1.19.json`)
		.then((response) => response.json())
		.then((textures: MinecraftTextures) => {
			textureStore.set(textures.items);
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
