export type MCRecipeTag =
	| 'blast_furnace'
	| 'brewing_stand'
	| 'campfire'
	| 'cartography_table'
	| 'crafting_table'
	| 'furnace'
	| 'material_reducer'
	| 'smoker'
	| 'soul_campfire'
	| 'stonecutter';

export interface MCRecipeItem {
	count?: number;
	data?: number;
	item: string;
}

export interface MCRecipeDescription {
	identifier: string;
}

export interface MCRecipeBrewing {
	description: MCRecipeDescription;
	input?: string;
	output?: string;
	reagent?: string;
	tags?: MCRecipeTag[];
}

export interface MCRecipeFurnace {
	description: MCRecipeDescription;
	input?: string;
	output?: string;
	tags?: MCRecipeTag[];
}

export interface MCRecipeShaped {
	description: MCRecipeDescription;
	group?: string;
	key?: Record<string, MCRecipeItem>;
	pattern?: string[];
	result?: MCRecipeItem;
	tags?: MCRecipeTag[];
}

export interface MCRecipeShapeless {
	description: MCRecipeDescription;
	group?: string;
	ingredients?: MCRecipeItem[];
	priority?: number;
	result?: MCRecipeItem;
	tags?: MCRecipeTag[];
}

export interface Recipe {
	format_version: `1.12.0`;
	MCRecipeBrewingContainer?: MCRecipeBrewing;
	MCRecipeBrewingMix?: MCRecipeBrewing;
	MCRecipeFurnace?: MCRecipeFurnace;
	MCRecipeShaped?: MCRecipeShaped;
	MCRecipeShapeless?: MCRecipeShapeless;
}
