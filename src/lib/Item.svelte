<script lang="ts">
	import { dragStore } from '../stores';
	import Tooltip from './Tooltip.svelte';

	let visible = false;
	let x = 0;
	let y = 0;

	function setCursorPos(e: MouseEvent) {
		x = e.clientX;
		y = e.clientY;
	}

	export let name = '';
	export let identifier = '';
	export let texture = '';
</script>

<div
	on:mousedown={(e) => {
		if ($dragStore) {
			visible = true;
			$dragStore = undefined;
			return;
		}
		visible = false;
		$dragStore = {
			name,
			identifier,
			texture
		};
	}}
	on:mouseenter={(e) => {
		if ($dragStore) return;
		visible = true;
		setCursorPos(e);
	}}
	on:mouseleave={() => {
		visible = false;
	}}
	on:mousemove={(e) => setCursorPos(e)}
>
	<span class="grid">
		<img class="img" src={texture} alt={name} width="32px" height="32px" />
		<Tooltip
			title={name}
			description={identifier}
			style={{
				x,
				y,
				display: visible ? 'block' : 'hidden'
			}}
			{visible}
		/>
	</span>
</div>

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
		width: 32px !important;
		height: 32px !important;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>
