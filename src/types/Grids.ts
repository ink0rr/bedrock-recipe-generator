import type { MinecraftTextureItem } from './Minecraft';

export type GridItem = MinecraftTextureItem | undefined;

export type Grids = Record<number, GridItem>;
