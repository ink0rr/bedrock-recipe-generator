import type { RequestHandler } from '@sveltejs/kit';
import type { MinecraftTextures } from 'src/types/Minecraft';

export const get: RequestHandler = async ({ url }) => {
	const response = await fetch(
		`https://unpkg.com/minecraft-textures@1.19.0/dist/textures/json/1.19.json`
	);
	const json: MinecraftTextures = await response.json();
	const recipe = url.searchParams.get('recipe');
	return {
		body: {
			items: json.items,
			recipe
		}
	};
};
