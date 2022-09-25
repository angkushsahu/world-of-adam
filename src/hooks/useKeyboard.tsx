import { useCallback, useEffect, useState } from "react";

const actionByKey = (key: string) => {
	const keyActionMap: any = {
		KeyW: "moveForward",
		KeyA: "moveLeft",
		KeyS: "moveBackward",
		KeyD: "moveRight",
		ArrowUp: "moveForward",
		ArrowLeft: "moveLeft",
		ArrowDown: "moveBackward",
		ArrowRight: "moveRight",
		Space: "jump",
		Digit1: "dirt",
		Digit2: "grass",
		Digit3: "glass",
		Digit4: "wood",
		Digit5: "log",
	};
	return keyActionMap[key];
};

const useKeyboard = () => {
	const [actions, setActions] = useState({
		jump: false,
		moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		dirt: false,
		glass: false,
		grass: false,
		wood: false,
		log: false,
	});

	const handleKeyDown = useCallback((e: KeyboardEventInit) => {
		const action = actionByKey(e.code || "");
		if (action) {
			setActions(prev => {
				return { ...prev, [action]: true };
			});
		}
	}, []);

	const handleKeyUp = useCallback((e: KeyboardEventInit) => {
		const action = actionByKey(e.code || "");
		if (action) {
			setActions(prev => {
				return { ...prev, [action]: false };
			});
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return actions;
};

export default useKeyboard;
