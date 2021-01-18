<script>
    import OpenProjectIcon from "../Icons/OpenProject.svelte";
    import CreateNewIcon from "../Icons/CreateNew.svelte";
    import SaveProjectIcon from "../Icons/SaveIcon.svelte";
    import CreateNewLevel from "../TopMenu/CreateNewLevel.svelte";
    export let projectManager;

    let inputPath;
    let openCreateLevelWindow;

    let clickInput = (e) => {
        inputPath.click();
    };

    let clickCreate = (e) => {
        openCreateLevelWindow();
    };

    let saveProject = () => {
        projectManager.save();
    }

    let inputChanged = (e) => {
        projectManager.loadProject(inputPath.files[0].path);
    };
</script>

<style>
    .topMenuButton {
        padding: 8px;
        background-color: var(--pixiAppBgColor);
        width: 24px;
        border-radius: 5px;
        display: block;
        line-height: 0px;
        cursor: pointer;
    }
    .topMenuButton:hover {
        background-color: var(--editorButtonHoverBG) !important;
    }
    .topMenu {
        grid-area: menu;
        display: grid;
        grid-template-columns: repeat(auto-fit, 40px);
        gap: 8px;
        padding-bottom: 6px;
    }
</style>

<input
    bind:this={inputPath}
    on:input={inputChanged}
    type="file"
    style="display:none" />

<div class="topMenu">
    <div class="topMenuButton" on:click={clickInput}>
        <OpenProjectIcon />
    </div>
    <div class="topMenuButton" on:click={clickCreate}>
        <CreateNewIcon />
    </div>
    <div class="topMenuButton" on:click={saveProject}>
        <SaveProjectIcon />
    </div>
</div>

<CreateNewLevel bind:openWindow={openCreateLevelWindow} {projectManager} />
