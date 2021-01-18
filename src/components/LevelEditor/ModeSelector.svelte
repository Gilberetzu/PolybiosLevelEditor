<!--
    <script>
    import { onMount } from "svelte";
    //import { editorStates } from "../../LevelEditor/LevelEditor";
    export let projectManager;

    const editorStatesLabels = {
        RENDERING: "R",
        LAYER1: "L1",
        LAYER2: "L2",
        LAYER3: "L3",
        LAYER4: "L4",
        COLLISION: "C",
    };

    let possibleStates = [];
    let selectedState = editorStates.NONE;
    let selectedLevelName = "";
    const subscriptionLabel = "ModeSelectorUpdate";

    onMount(() => {
        projectManager.levelEditor.subscriptionManager.subscribe(
            subscriptionLabel,
            modeSelectorUpdate
        );

        return () => {
            projectManager.levelEditor.subscriptionManager.unsubscribe(
                subscriptionLabel
            );
        };
    });

    const setEditorState = (state) => {
        projectManager.levelEditor.setState(state);
    }

    const modeSelectorUpdate = (TYPE) => {
        if (TYPE == "POSSIBLE_STATES_CHANGED") {
            possibleStates = projectManager.levelEditor.possibleStates;
            const selectedLevel = projectManager.levelCollection.getSelectedLevel();
            selectedLevelName = selectedLevel.name;
            selectedState = projectManager.levelEditor.state;
        }else if(TYPE == "STATE_CHANGED"){
            selectedState = projectManager.levelEditor.state;
        }
    };
</script>

<style>
    .container {
        position: absolute;
        bottom: 16px;
        left: 16px;
        right: 16px;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 16px;
        color: var(--editorUIText);
    }

    .levelName{
        place-self: center;
        font-weight: 700;
        font-size: 1.2em;
    }

    .selectableStatesContainer{
        display: grid;
        grid-template-columns: repeat(auto-fit, 32px);
        gap: 8px;
    }

    .selectableState {
        background-color: var(--editorBgColor);
        color: var(--editorUIText);
        cursor: pointer;

        padding: 4px;
        border-radius: 4px;
    }

    .selectableState:hover {
        background-color: var(--editorButtonHoverBG);
    }

    .selected {
        background-color: var(--editorIconColor);
        color: var(--editorUIText);

        padding: 4px;
        border-radius: 4px;
    }
</style>

{#if possibleStates}
    <div class="container">
        <div class="levelName">{selectedLevelName}</div>
        <div class="selectableStatesContainer">
            {#each possibleStates as state}
                <div
                    class:selectableState={selectedState != state}
                    class:selected={selectedState == state}
                    on:click={()=>setEditorState(state)}>
                    {editorStatesLabels[state]}
                </div>
            {/each}
        </div>
    </div>
{/if}

-->