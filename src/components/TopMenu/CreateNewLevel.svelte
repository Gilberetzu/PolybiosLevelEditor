<script>
    import FloatingWindow from "../FloatingWindow/FloatingWindow.svelte";
    import Checkbox from "../Checkbox/Checkbox.svelte";
    import PrimaryButton from "../Button/PrimaryButton.svelte";
    import LevelsIcon from "../Icons/Levels.svelte";
    import HeightIcon from "../Icons/Height.svelte";
    import WidthIcon from "../Icons/Width.svelte";
    import LayerConfiguration from "./LayerConfiguration.svelte";
    import CollisionConfiguration from "./CollisionConfiguration.svelte";

    import ColorPicker from "../ColorPicker/ColorPicker.svelte";

    import IconInput from "../IconInput/IconInput.svelte";

    export let projectManager;
    export let openWindow;

    let closeWindow;
    let levelName;
    let levelWidth;
    let levelHeight;
    let getCollsionDataArray = [];
    let backgroundColor;

    let getLayer1;
    let getLayer2;
    let getLayer3;
    let getLayer4;

    const checkCollisionLayers = (collisionLayers) => {
        for (let i = 0; i < collisionLayers.length; i++) {
            const collisionLayer = collisionLayers[i];
            for (let j = 0; j < collisionLayers.length; j++) {
                if(j != i){
                    const otherCollisionLayer = collisionLayers[j];

                    if(collisionLayer.name == otherCollisionLayer.name){
                        throw new Error(`Collision Layer ${i} has the same name of the collision layer ${j}`)
                    }else if(collisionLayer.layerId == otherCollisionLayer.layerId){
                        throw new Error(`Collision Layer ${i} has the same layerId of the collision layer ${j}`)
                    }
                }
            }
        }
    }

    const createLevel = () => {
        try {
            let collisionLayers = [];
            for (let index = 0; index < getCollsionDataArray.length; index++) {
                const getCollisionData = getCollsionDataArray[index];
                collisionLayers.push(getCollisionData());
            }

            checkCollisionLayers(collisionLayers);

            projectManager.levelCollection.addNewLevel({
                width: levelWidth,
                height: levelHeight,
                name: levelName,
                layers: [getLayer1(), getLayer2(), getLayer3(), getLayer4()],
                backgroundColor: backgroundColor,
                collisionLayers: collisionLayers
            });
            
            closeWindow();
        } catch (error) {
            //TODO: changed for a window prompt
            console.log(error);
        }
    };

    const addCollisionLayer = () => {
        getCollsionDataArray = [...getCollsionDataArray, null];
    };

    const removeCollisionLayer = (index) => {
        getCollsionDataArray.splice(index);
        getCollsionDataArray = [...getCollsionDataArray];
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
    .sectionContainer {
        margin-bottom: 32px;
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

        <div class="sectionContainer">
            <div class="inputSectionTitle">Collision Layers</div>
            <PrimaryButton
                label={'Create Collision Layer'}
                on:click={addCollisionLayer} />
        </div>

        {#each getCollsionDataArray as getData, i}
            <div class="sectionContainer">
                <div class="inputSectionTitle">Collision Layer {i + 1}</div>
                <CollisionConfiguration
                    bind:getCollisionLayer={getData}
                    {removeCollisionLayer}
                    layerIndex={i} />
            </div>
        {/each}

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
