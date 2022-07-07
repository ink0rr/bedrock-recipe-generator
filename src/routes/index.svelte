<script context="module" lang="ts">
	import '../app.css';
</script>

<script lang="ts">
	import Inventory from '$lib/Inventory.svelte';
	import DraggedItem from '$lib/DraggedItem.svelte';
	import { textureStore } from '../stores';

	import type { MinecraftTextures } from '../types/Minecraft';

	fetch(`https://unpkg.com/minecraft-textures@1.19.0/dist/textures/json/1.19.json`)
		.then((response) => response.json())
		.then((textures: MinecraftTextures) => {
			textureStore.set(textures.items);
		});
</script>

<section>
	<Inventory />
</section>
