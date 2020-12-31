<script>
    import TopMenu from "./components/TopMenu/TopMenu.svelte";
    import LevelEditor from "./components/LevelEditor/LevelEditor.svelte";
    import SideMenu from "./components/SideMenu/SideMenu.svelte";

    export let projectManager;
</script>

<style>
    :global(body) {
        /* this will apply to <body> */
        margin: 0;
        background-color: var(--editorBgColor);
        font-family: "Nunito";
    }
    .layoutContainer {
        position: fixed;
        top: 6px;
        bottom: 6px;
        left: 6px;
        right: 6px;
        display: grid;
        grid-template-columns: 3fr 6.5px 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "menu . side"
            "pixiCanvas . side";
    }
</style>

<div class="layoutContainer">
    <TopMenu {projectManager} />
    <LevelEditor {projectManager} />
    <SideMenu {projectManager} />
</div>
