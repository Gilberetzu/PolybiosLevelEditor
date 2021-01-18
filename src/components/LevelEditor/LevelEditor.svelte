<script>
    import { onMount } from "svelte";
    import ToolSelection from "./ToolSelection.svelte";
    //import ModeSelector from "./ModeSelector.svelte";

    export let projectManager;
    let htmlContainer;

    onMount(() => {
        projectManager.pixiApp.stage.scale.x = 2;
        projectManager.pixiApp.stage.scale.y = 2;

        htmlContainer.appendChild(projectManager.pixiApp.view);

        projectManager.pixiApp.ticker.add(resizeUpdate);
    });

    let resizeUpdate = () => {
        projectManager.pixiApp.renderer.resize(
            htmlContainer.getBoundingClientRect().width,
            htmlContainer.getBoundingClientRect().height
        );
    };
</script>

<style>
    .htmlContainer {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        grid-area: pixiCanvas;
    }
</style>

<div bind:this={htmlContainer} class="htmlContainer">
    <ToolSelection {projectManager} />
</div>
