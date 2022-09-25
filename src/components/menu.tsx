import { useStore } from "../hooks";

const Menu = () => {
	const [saveWorld, resetWorld] = useStore(state => [state.saveWorld, state.resetWorld]);

	const saveCurrentWorld = () => {
		setTimeout(() => {
			saveWorld();
		}, 2000);
	};
	const resetCurrentWorld = () => {
		setTimeout(() => {
			resetWorld();
		}, 2000);
	};

	return (
		<section className="absolute menu">
			<button type="button" onClick={saveCurrentWorld}>
				Save
			</button>
			<button type="button" onClick={resetCurrentWorld}>
				Reset
			</button>
		</section>
	);
};

export default Menu;
