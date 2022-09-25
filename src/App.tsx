import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
// import { Cubes, FirstPersonView, Ground, Menu, Player, TextureSelector } from "./components";
import { Cubes, FirstPersonView, Ground, Player, TextureSelector } from "./components";

const App: FC = () => {
	return (
		<main className="root">
			<Canvas>
				<Sky sunPosition={[100, 100, 20]} />
				<ambientLight intensity={0.5} />
				<FirstPersonView />
				<Physics>
					<Player />
					<Cubes />
					<Ground />
				</Physics>
			</Canvas>
			<section className="absolute centered cursor">+</section>
			<TextureSelector />
			{/* <Menu /> */}
		</main>
	);
};

export default App;
