<script>
    import { onMount } from "svelte";
    import ColorHolder from "../ColorPicker/ColorHolder.svelte";
    import PrimaryButton from "../Button/PrimaryButton.svelte";
    import ButtonToggle from "../Button/ButtonToggle.svelte";

    export let projectManager;

    let name = "";
    let backgroundColor = [0, 0, 0];
    let width = 0;
    let height = 0;
    let possibleStates = [];

    let renderState = null;
    let collisionStates = [];
    let layerStates = [];

    let currentState = null;

    onMount(() => {
        projectManager.levelEditor.subscriptionManager.subscribe(
            "currentLevelEditorUpdate",
            currentLevelEditorUpdate
        );

        projectManager.levelCollection.subscriptionManager.subscribe(
            "currentLevelUIUpdate",
            currentLevelUIUpdate
        );

        retreiveSelectedLevelInfo();
        retreivePossibleStates();
        currentState = projectManager.levelEditor.state;

        return () => {
            projectManager.levelEditor.subscriptionManager.unsubscribe(
                "currentLevelEditorUpdate"
            );

            projectManager.levelCollection.subscriptionManager.unsubscribe(
                "currentLevelUIUpdate"
            );
        };
    });

    const setState = (state) => {
        projectManager.levelEditor.setState(state);
    };

    const retreivePossibleStates = () => {
        possibleStates = projectManager.levelEditor.possibleStates;

        collisionStates = [];
        layerStates = [];

        for (let i = 0; i < possibleStates.length; i++) {
            const possibleState = possibleStates[i];
            if (possibleState.value == "R") {
                renderState = possibleState;
            } else if (possibleState.value[0] == "C") {
                collisionStates.push(possibleState);
            } else if (possibleState.value[0] == "L") {
                layerStates.push(possibleState);
            }
        }

        collisionStates = [...collisionStates];
        layerStates = [...layerStates];
    };

    const retreiveSelectedLevelInfo = () => {
        const selectedLevel = projectManager.levelCollection.getSelectedLevel();
        if (selectedLevel) {
            name = selectedLevel.name;
            backgroundColor = selectedLevel.backgroundColor;
            width = selectedLevel.width;
            height = selectedLevel.height;
        }
    };

    const currentLevelEditorUpdate = (TYPE) => {
        if (TYPE == "POSSIBLE_STATES_CHANGED") {
            retreivePossibleStates();
        } else if (TYPE == "STATE_CHANGED") {
            currentState = projectManager.levelEditor.state;
        }
    };

    const currentLevelUIUpdate = (TYPE) => {
        if (TYPE == "LEVEL_SELECTED") {
            retreiveSelectedLevelInfo();
        }
    };
</script>

<style>
    .mainContainer {
        display: block;
        padding: 8px;
        color: var(--editorUIText);
    }
    .sizeContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
    }
    .title {
        font-weight: 800;
    }
    .value {
        font-weight: 300;
        font-size: 1.5em;
    }
    .section {
        margin-bottom: 16px;
    }
</style>

<div class="mainContainer">
    <div>Current Level</div>
    {#if name}
        <div class="section">
            <div class="title">Name: <span class="value">{name}</span></div>
        </div>

        <div class="section">
            <div class="title">Background Color:</div>
            <ColorHolder pickedColor={backgroundColor} />
        </div>

        <div class="section">
            <div class="sizeContainer">
                <div class="title">Width</div>
                <div class="title">Height</div>
                <div><span class="value">{width}</span></div>
                <div><span class="value">{height}</span></div>
            </div>
        </div>

        {#if renderState}
            <div class="section">
                <ButtonToggle
                    label={'RENDER'}
                    selected={currentState ? currentState.value == 'R' : false}
                    on:click={() => {
                        setState(renderState);
                    }} />
            </div>
        {/if}

        <div class="section">
            <div class="title">Layers</div>
            {#each layerStates as layerState}
                <ButtonToggle
                    label={layerState.label}
                    selected={currentState ? currentState.value == layerState.value : false}
                    on:click={() => {
                        setState(layerState);
                    }} />
            {/each}
        </div>

        <div class="section">
            <div class="title">Collision Layer</div>
            {#each collisionStates as collState}
                <ButtonToggle
                    label={collState.label}
                    selected={currentState ? currentState.value == collState.value : false}
                    on:click={() => {
                        setState(collState);
                    }} />
            {/each}
        </div>
    {/if}
</div>
