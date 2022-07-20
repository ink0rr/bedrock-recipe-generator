export type MinecraftTextureItem = {
	readable: string;
	id: string;
	texture: string;
	data?: number;
};

export type MinecraftTextures = {
	comment: string;
	items: MinecraftTextureItem[];
};
