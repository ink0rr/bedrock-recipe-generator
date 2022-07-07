<script lang="ts">
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
	on:mouseenter={(e) => {
		visible = true;
		setCursorPos(e);
	}}
	on:mouseleave={() => {
		visible = false;
	}}
	on:mousemove={(e) => setCursorPos(e)}
>
	<span class="itemspan">
		<img src={texture} alt={name} />
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
	.itemspan {
		position: relative;
		display: inline-block;
		text-align: center !important;
		background-color: #8b8b8b;
		border-color: #373737 #fff #fff #373737;
		border-style: solid;
		border-width: 2px;
		vertical-align: middle;
	}
</style>
