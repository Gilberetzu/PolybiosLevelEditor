import App from './App.svelte';
import svelte from 'svelte/compiler';
import ProjectManager from "./ProjectManager/ProjectManager";
import { setGlobalColors } from "./components/Colors/ColorSetup";

setGlobalColors();
let projectManager = new ProjectManager();

const app = new App({
	target: document.body,
	props: {
		version: svelte.VERSION,
		projectManager: projectManager
	}
});

export default app;
