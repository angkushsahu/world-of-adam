import create from "zustand";
import { nanoid } from "nanoid";
import { StateType, CubeType, TextureType } from "../types";

const getFromLocalStorage = (key: string) => JSON.parse(window.localStorage.getItem(key) || "");
const setInLocalStorage = (key: string, value: CubeType[]) =>
	window.localStorage.setItem(key, JSON.stringify(value));

const useStore = create<StateType>(set => ({
	texture: "dirt",
	cubes: getFromLocalStorage("cubes") || [],
	addCube: (x: number, y: number, z: number) => {
		set((prev: StateType) => ({
			cubes: [
				...prev.cubes,
				{
					key: nanoid(),
					position: [x, y, z],
					texture: prev.texture,
				},
			],
		}));
	},
	removeCube: (x: number, y: number, z: number) => {
		set((prev: StateType) => ({
			cubes: prev.cubes.filter((cube: CubeType) => {
				const [X, Y, Z] = cube.position;
				return x !== X || y !== Y || z !== Z;
			}),
		}));
	},
	setTexture: (texture: TextureType) => {
		set(() => ({ texture }));
	},
	saveWorld: () => {
		set((prev: StateType): any => {
			setInLocalStorage("cubes", prev.cubes);
		});
	},
	resetWorld: () => {
		set(() => ({
			cubes: [],
		}));
	},
}));

export default useStore;
