<script>
    import FloatingWindow from "../FloatingWindow/FloatingWindow.svelte";
    import Checkbox from "../Checkbox/Checkbox.svelte";
    import PrimaryButton from "../Button/PrimaryButton.svelte";
    import LevelsIcon from "../Icons/Levels.svelte";
    import HeightIcon from "../Icons/Height.svelte";
    import WidthIcon from "../Icons/Width.svelte";
    import LayerConfiguration from "./LayerConfiguration.svelte";
    
    import ColorPicker from "../ColorPicker/ColorPicker.svelte";

    import IconInput from "../IconInput/IconInput.svelte";

    export let projectManager;
    export let openWindow;

    let closeWindow;
    let levelName;
    let levelWidth;
    let levelHeight;
    let createCollision;
    let backgroundColor;

    let getLayer1;
    let getLayer2;
    let getLayer3;
    let getLayer4;

    const createLevel = () => {
        try {
            projectManager.levelCollection.addNewLevel({
                width: levelWidth,
                height: levelHeight,
                name: levelName,
                createCollision: createCollision,
                layers: [getLayer1(), getLayer2(), getLayer3(), getLayer4()],
                backgroundColor: backgroundColor
            });
            closeWindow();
        } catch (error) {
            //TODO: changed for a window prompt
            console.log(error);
        }
    };
</script>

<style>
    .mainContainer {
        width: 100%;
        height: 100%;
    }
    .sizeContainer {
        display: grid;
        grid-template-columns: 150px 150px;
        gap: 8px;
    }
    .inputSectionTitle {
        color: var(--editorUIText);
        font-size: 1.2em;
        font-weight: 700;
    }
    .createCollision {
        display: grid;
        grid-template-columns: auto auto;
    }
    .sectionContainer {
        margin-bottom: 16px;
    }
</style>

<FloatingWindow
    windowName={'Create New Level'}
    bind:openWindow
    bind:closeWindow>
    <div class="mainContainer">
        <div class="sectionContainer">
            <div class="inputSectionTitle">Level Name</div>
            <IconInput
                IconElement={LevelsIcon}
                placeholder={'Level Name'}
                bind:value={levelName} />
        </div>

        <div class="sectionContainer">
            <div class="inputSectionTitle">Level Size</div>
            <div class="sizeContainer">
                <IconInput
                    IconElement={WidthIcon}
                    type={'number'}
                    placeholder={'Width'}
                    bind:value={levelWidth} />
                <IconInput
                    IconElement={HeightIcon}
                    type={'number'}
                    placeholder={'Height'}
                    bind:value={levelHeight} />
            </div>
        </div>

        <div class="sectionContainer">
            <div class="inputSectionTitle">Pick Background Color</div>
            <ColorPicker
                fieldName={'Background Color'}
                bind:pickedColor={backgroundColor} />
        </div>

        <div class="createCollision sectionContainer">
            <div class="inputSectionTitle">Create Collision</div>
            <Checkbox bind:value={createCollision} />
        </div>

        <div class="sectionContainer">
            <div class="inputSectionTitle">Layer 1</div>
            <LayerConfiguration bind:getLayerInfo={getLayer1} />
        </div>

        <div class="sectionContainer">
            <div class="inputSectionTitle">Layer 2</div>
            <LayerConfiguration bind:getLayerInfo={getLayer2} />
        </div>

        <div class="sectionContainer">
            <div class="inputSectionTitle">Layer 3</div>
            <LayerConfiguration bind:getLayerInfo={getLayer3} />
        </div>

        <div class="sectionContainer">
            <div class="inputSectionTitle">Layer 4</div>
            <LayerConfiguration bind:getLayerInfo={getLayer4} />
        </div>
        <div style="display:inline-block;" class="sectionContainer">
            <PrimaryButton label="Create Level" on:click={createLevel} />
        </div>
    </div>
</FloatingWindow>
