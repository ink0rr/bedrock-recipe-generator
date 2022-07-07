<script lang="ts">
	import { dragStore } from '../stores';

	export let name = '';
	export let texture = '';
	export let x = 0;
	export let y = 0;
</script>

<div style:position="absolute" style:left={`${x - 21}px`} style:top={`${y - 21}px`}>
	<img class="img" src={texture} alt={name} width="42px" height="42px" />
</div>

<style>
	div {
		z-index: 1;
		pointer-events: none;
	}
	.img {
		width: 42px !important;
		height: 42px !important;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>
