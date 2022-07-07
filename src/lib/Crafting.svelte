<script lang="ts">
</script>

<div class="card">
	<div class="card-header">
		<div class="card-title">Crafting</div>
	</div>
	<div class="card-body">
		<div class="crafting-holder">
			<h6 class="crafting-title">Crafting</h6>
			<div class="crafting-wrapper">
				<div class="crafting">
					<div class="recipe">
						<button>Grid</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.crafting-holder {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		margin-top: 10px;
		background: #c6c6c6;
		border: 2px solid #373737;
		border-right-color: #fff;
		border-bottom-color: #fff;
	}

	.crafting-title {
		font-family: Minecraft, sans-serif;
		margin-bottom: 5px;
	}

	.crafting-wrapper {
		display: flex;
		justify-content: center;
	}

	.crafting {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10px;
	}
</style>
