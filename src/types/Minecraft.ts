export type MinecraftTextureItem = {
  readable: string;
  id: string;
  texture: string;
};

export type MinecraftTextures = {
  comment: string;
  items: MinecraftTextureItem[];
};
