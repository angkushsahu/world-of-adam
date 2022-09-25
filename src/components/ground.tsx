import { usePlane } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks";
import { Ref } from "react";
import { BufferGeometry, Material, Mesh } from "three";

const Ground = () => {
	const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0] }));
	const [addCube] = useStore(state => [state.addCube]);
	groundTexture.repeat.set(100, 100);

	const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
		addCube(x, y, z);
	};

	return (
		<mesh
			onClick={handleMeshClick}
			ref={ref as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined}
		>
			<planeGeometry attach="geometry" args={[100, 100]} />
			<meshStandardMaterial attach="material" map={groundTexture} />
		</mesh>
	);
};

export default Ground;
