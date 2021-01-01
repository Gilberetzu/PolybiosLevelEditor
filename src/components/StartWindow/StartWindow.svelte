<script>
    import PrimaryButton from "../Button/PrimaryButton.svelte";

    export let projectManager;

    let inputPath;
    let hideWindow = false;

    const clickInput = (e) => {
        inputPath.click();
    };

    const inputChanged = (e) => {
        projectManager.loadProject(inputPath.files[0].path);
        hideWindow = true;
    };
</script>

<style>
    .container {
        display: grid;
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;

        background-color: rgba(0, 0, 0, 0.5);
    }
    .loadProjectContainer {
        padding: 12px;
        width: 500px;
        height: 600px;
        place-self: center;

        box-shadow: inset 0px 0px 0px 1px var(--editorUIText);

        background-color: var(--pixiAppBgColor);
        border-radius: 8px;
    }
</style>

<input
    bind:this={inputPath}
    on:input={inputChanged}
    type="file"
    style="display:none" />

{#if !hideWindow}
    <div class="container">
        <div class="loadProjectContainer">
            <div>
                <PrimaryButton label="Load Project" on:click={clickInput} />
            </div>
        </div>
    </div>
{/if}
