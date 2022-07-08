<script lang="ts">
	export let name = '';
	export let texture = '';
	export let x = 0;
	export let y = 0;
</script>

<div style:position="absolute" style:left={`${x - 24}px`} style:top={`${y - 24}px`}>
	<img class="img" src={texture} alt={name} width="42px" height="42px" />
</div>

<style>
	* {
		pointer-events: none;
    user-select: none;
	}
	div {
		z-index: 1;
	}
	.img {
		width: 42px !important;
		height: 42px !important;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>
