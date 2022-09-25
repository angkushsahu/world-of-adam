import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { Ref, useEffect, useRef } from "react";
import useKeyboard from "../hooks/useKeyboard";

const JUMP_FORCE = 4,
	SPEED = 4;

const Player = () => {
	const { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyboard();
	const { camera } = useThree();
	const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 1, 0] }));

	const velocity = useRef([0, 0, 0]);
	useEffect(() => {
		api.velocity.subscribe(v => (velocity.current = v));
	}, [api.velocity]);

	const pos = useRef([0, 0, 0]);
	useEffect(() => {
		api.position.subscribe(p => (pos.current = p));
	}, [api.position]);

	useFrame(() => {
		camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

		const direction = new Vector3(),
			frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)),
			sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(SPEED)
			.applyEuler(camera.rotation);

		api.velocity.set(direction.x, velocity.current[1], direction.z);

		if (jump && Math.abs(Number(velocity.current[1] < 0.05))) {
			api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
		}
	});

	return <mesh ref={ref as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined}></mesh>;
};

export default Player;
