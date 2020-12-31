<script>
    import { onMount } from "svelte";
    export let projectManager;

    let createdLevels = [];
    let selectedLevel = -1;

    onMount(() => {
        projectManager.levelCollection.subscriptionManager.subscribe(
            "LevelCollectionView",
            levelCollectionUpdated
        );

        addLevels();

        return () => {
            projectManager.levelCollection.subscriptionManager.unsubscribe(
                "LevelCollectionView"
            );
        };
    });

    const selectLevel = (index) => {
        projectManager.levelCollection.setSelected(index);
    };

    const addLevels = () => {
        createdLevels = [];
        projectManager.levelCollection.levels.forEach((level, index) => {
            createdLevels.push({
                name: level.name,
                width: level.width,
                height: level.height,
                index: index,
            });
        });
    };

    const levelCollectionUpdated = (TYPE) => {
        if (TYPE == "LEVEL_ADDED") {
            createdLevels = [];
            projectManager.levelCollection.levels.forEach((level, index) => {
                createdLevels.push({
                    name: level.name,
                    width: level.width,
                    height: level.height,
                    index: index,
                });
            });
        }else if(TYPE == "LEVEL_SELECTED"){
            selectedLevel = projectManager.levelCollection.selectedLevel;
        }
    };
</script>

<style>
    .mainContainer {
        display: block;
        padding: 8px;
    }
    .rowStructure {
        display: grid;
        grid-template-columns: 1fr 80px 80px;
        margin-bottom: 8px;
        place-items: center;
        color: var(--editorUIText);
        gap: 8px;
        position: relative;
    }
    .selectableRow {
        padding: 8px 0px 8px 0px;
        border-radius: 24px;
    }
    .selectableRow:hover {
        background-color: var(--editorBgColor);
    }
    .selected {
        background-color: var(--editorBgColor);
    }
    .headerLine::after {
        content: "";
        position: absolute;
        top: 100%;
        height: 4px;
        left: 0px;
        right: 0px;
        border-radius: 16px;
        background-color: var(--editorIconColor);
    }
    .titleSection {
        font-weight: 800;
    }
</style>

<div class="mainContainer">
    <div class="rowStructure titleSection headerLine">
        <div>Level Name</div>
        <div>Width</div>
        <div>Height</div>
    </div>

    {#each createdLevels as { name, width, height, index }}
        <div
            class:rowStructure={true}
            class:selectableRow={true}
            class:selected={index == selectedLevel}
            on:click={() => {
                selectLevel(index);
            }}>
            <div>{name}</div>
            <div>{width}</div>
            <div>{height}</div>
        </div>
    {/each}
</div>
