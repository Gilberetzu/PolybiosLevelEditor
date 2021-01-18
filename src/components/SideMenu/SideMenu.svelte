<script>
    import LevelsListIcon from "../Icons/LevelsList.svelte";
    import CurrentLevelIcon from "../Icons/Levels.svelte";
    import SpritesIcon from "../Icons/Sprites.svelte";

    import SpriteCollection from "./SpriteCollection.svelte";
    import LevelsCollection from "./LevelsCollection.svelte";
    import CurrentLevel from "./CurrentLevel.svelte";

    export let projectManager;

    const possibleMenus = {
        spriteCollection: {
            icon: SpritesIcon,
            menuComponent: SpriteCollection,
        },
        levelsMenu: {
            icon: LevelsListIcon,
            menuComponent: LevelsCollection,
        },
        currentLevel: {
            icon: CurrentLevelIcon,
            menuComponent: CurrentLevel
        }
    };

    let currentMenu;

    let changeCurrentMenu = (menuClicked) => {
        if (projectManager) {
            if (currentMenu != menuClicked) {
                currentMenu = menuClicked;
            }
        }
    };

    
</script>

<style>
    .htmlContainer {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 48px 1fr;

        grid-area: side;

        border-radius: 5px;
        overflow: hidden;
    }
    .menuSelector {
        background-color: var(--editorBg2Color);
    }
    .menuButton {
        display: inline-block;
        margin: 8px 0px 0px 8px;
        border-radius: 5px 0px 0px 5px;
        padding: 8px;
        width: 24px;
        cursor: pointer;
    }
    .menuButton:hover {
        background-color: var(--editorButtonHoverBG) !important;
    }
    .notSelected {
        background-color: var(--editorBgColor);
    }
    .selected {
        background-color: var(--pixiAppBgColor);
    }
    .main {
        background-color: var(--pixiAppBgColor);
        overflow: hidden;
    }
</style>

<div class="htmlContainer">
    <div class="menuSelector">
        {#each Object.keys(possibleMenus) as possibleMenu}
            <div
                class:menuButton={true}
                class:selected={currentMenu == possibleMenu}
                class:notSelected={currentMenu != possibleMenu}
                on:click={() => {
                    changeCurrentMenu(possibleMenu);
                }}>
                <svelte:component this={possibleMenus[possibleMenu].icon} />
            </div>
        {/each}
    </div>
    <div class="main">
        {#if possibleMenus[currentMenu]}
            <svelte:component
                this={possibleMenus[currentMenu].menuComponent}
                bind:projectManager />
        {/if}
    </div>
</div>
