export type TextureType = "dirt" | "glass" | "grass" | "log" | "wood";

export interface CubeType {
	key: string;
	position: [x: number, y: number, z: number];
	texture: TextureType;
}

export interface StateType {
	addCube: Function;
	removeCube: Function;
	resetWorld: Function;
	saveWorld: Function;
	setTexture: Function;
	cubes: CubeType[];
	texture: TextureType;
}
