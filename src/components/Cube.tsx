import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { Ref, useState } from "react";
import { BufferGeometry, Material, Mesh, Texture } from "three";
import { useStore } from "../hooks";
import * as textures from "../images/textures";

interface CubeProps {
	position: [x: number, y: number, z: number];
	texture: string;
}

const Cube = ({ position, texture }: CubeProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [ref] = useBox(() => ({ type: "Static", position }));
	const textureType = texture + "Texture";
	const activeTexture: Texture = textures[textureType as keyof typeof textures];
	const [addCube, removeCube] = useStore(state => [state.addCube, state.removeCube]);

	const handleCubeClick = (e: any) => {
		e.stopPropagation();
		const clickedFace = Math.floor(e.faceIndex / 2);
		const { x, y, z } = ref.current!.position;
		if (e.altKey) {
			removeCube(x, y, z);
			return;
		}
		switch (clickedFace) {
			case 0:
				addCube(x + 1, y, z);
				break;
			case 1:
				addCube(x - 1, y, z);
				break;
			case 2:
				addCube(x, y + 1, z);
				break;
			case 3:
				addCube(x, y - 1, z);
				break;
			case 4:
				addCube(x, y, z + 1);
				break;
			case 5:
				addCube(x, y, z - 1);
				break;
			default:
				break;
		}
	};

	const handlePointerIn = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setIsHovered(true);
	};
	const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setIsHovered(false);
	};

	return (
		<mesh
			ref={ref as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined}
			onPointerMove={handlePointerIn}
			onPointerOut={handlePointerOut}
			onClick={handleCubeClick}
		>
			<boxGeometry attach="geometry" />
			<meshStandardMaterial
				map={activeTexture}
				attach="material"
				transparent={true}
				opacity={texture === "glass" ? 0.6 : 1}
				color={isHovered ? "gray" : "white"}
			/>
		</mesh>
	);
};

export default Cube;
