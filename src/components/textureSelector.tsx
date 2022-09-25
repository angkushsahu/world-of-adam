import { useEffect, useState } from "react";
import { useKeyboard, useStore } from "../hooks";
// image imports
import dirtImage from "../images/dirt.jpg";
import glassImage from "../images/glass.png";
import grassImage from "../images/grass.jpg";
import logImage from "../images/log.jpg";
import woodImage from "../images/wood.png";

const images = {
	dirt: dirtImage,
	grass: grassImage,
	glass: glassImage,
	wood: woodImage,
	log: logImage,
};

const TextureSelector = () => {
	const [visible, setVisible] = useState(false);
	const [activeTexture, setTexture] = useStore(state => [state.texture, state.setTexture]);
	const { dirt, glass, grass, log, wood } = useKeyboard();
	const textures = { dirt, glass, grass, log, wood };

	useEffect(() => {
		const pressedTexture = Object.entries(textures).find(([k, v]) => v);
		if (pressedTexture) {
			setTexture(pressedTexture[0]);
		}
		// eslint-disable-next-line
	}, [setTexture, dirt, glass, grass, log, wood]);

	useEffect(() => {
		const visibilityTimeout = setTimeout(() => {
			setVisible(false);
		}, 1000);

		setVisible(true);

		return () => {
			clearTimeout(visibilityTimeout);
		};
	}, [activeTexture]);

	return visible ? (
		<div className="absolute centered texture-selector">
			{Object.entries(images).map(([k, src]) => (
				<img
					src={src}
					alt={`${k}-texture`}
					key={k}
					className={k === activeTexture ? "active" : ""}
				/>
			))}
		</div>
	) : null;
};

export default TextureSelector;
