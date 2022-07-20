<script lang="ts">
	import type { MinecraftTextureItem } from '$lib/types/Minecraft';

	import { dragStore, isPicking } from '$lib/stores';
	import Tooltip from './Tooltip.svelte';

	export let props: MinecraftTextureItem | undefined = undefined;
	export let isCrafting = false;

	const formatId = (id: string, data?: number) => id + (data ? `<${data}>` : ``);
</script>

{#if props}
	{@const { id, readable, texture, data } = props}
	<div
		on:mousedown={(e) => {
			$isPicking = true;
			if (!isCrafting) {
				$dragStore = $dragStore ? undefined : props;
				return;
			}

			if ($dragStore) {
				[props, $dragStore] = [$dragStore, props];
				return;
			}

			if (e.shiftKey) $isPicking = false;
			else $dragStore = props;

			props = undefined;
		}}
		on:mouseup={(e) => {
			if (isCrafting && !$isPicking) {
				$dragStore = undefined;
			}
		}}
	>
		<span class="grid">
			<Tooltip title={readable} description={formatId(id, data)}>
				<img class="img" src={texture} alt={readable} width="32px" height="32px" />
			</Tooltip>
		</span>
	</div>
{:else}
	<div
		on:mouseenter={(e) => {
			if (e.buttons && $dragStore && !$isPicking) {
				props = $dragStore;
			}
		}}
		on:mousedown={() => {
			$isPicking = false;
			props = $dragStore;
		}}
	>
		<span class="grid">
			<div style="height: 32px; width: 32px;" />
		</span>
	</div>
{/if}

<style>
	.grid {
		position: relative;
		display: inline-block;
		text-align: center !important;
		background-color: #8b8b8b;
		border-color: #373737 #fff #fff #373737;
		border-style: solid;
		border-width: 2px;
		vertical-align: middle;
	}

	.grid:hover {
		background-color: #dddddd;
	}

	.img {
		pointer-events: none;
		width: 32px !important;
		height: 32px !important;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>
