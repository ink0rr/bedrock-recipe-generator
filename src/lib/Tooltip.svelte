<script lang="ts">
	export let title = '';
	export let description = '';
	export let style = {
		display: 'hidden',
		x: 0,
		y: 0
	};
	export let visible = false;

  
</script>

<section>
	{#if visible}
		<div
			class="mc-tooltip"
			style:display={style.display}
			style:left={style.x + 'px'}
			style:top={style.y + 'px'}
		>
			<div class="mc-tooltip-title">
				{title}
			</div>
			<div class="mc-tooltip-description">
				{description}
			</div>
		</div>
	{/if}
</section>

<style>
	.mc-tooltip {
		text-align: left;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #100010;
		background-color: rgba(16, 0, 16, 0.94);
		color: #fff;
		padding: 0.375em;
		font-family: Minecraft;
		font-size: 16px;
		word-spacing: 4px;
		white-space: nowrap;
		line-height: 1.25em;
		text-shadow: 0.125em 0.125em 0 #3f3f3f;
		margin: 0.125em 0.25em;
		pointer-events: none;
		z-index: 99;
	}

	.mc-tooltip:before {
		content: '';
		position: absolute;
		top: 0.125em;
		right: -0.125em;
		bottom: 0.125em;
		left: -0.125em;
		border: 0.125em solid #100010;
		border-style: none solid;
		border-color: rgba(16, 0, 16, 0.94);
	}

	.mc-tooltip:after {
		content: '';
		position: absolute;
		top: 0.125em;
		right: 0;
		bottom: 0.125em;
		left: 0;
		border: 2px solid #2d0a63;
		border-image: linear-gradient(rgba(80, 0, 255, 0.31), rgba(40, 0, 127, 0.31)) 1;
	}

	.mc-tooltip > .mc-tooltip-description {
		font-size: 12px;
		display: block;
		margin-top: 4px;
	}
</style>
