<script>
    import IconInput from "../IconInput/IconInput.svelte";
    import ColorPicker from "../ColorPicker/ColorPicker.svelte";
    import PrimaryButton from "../Button/PrimaryButton.svelte";

    export let layerIndex = -1;
    export let removeCollisionLayer = () => {};

    export const getCollisionLayer = () => {
        if(layerId.includes(" ")){
            throw new Error(`Layer ids cannot include spaces. Collision Layer ${layerIndex + 1}`);
        }

        return {
            name: name,
            layerId: layerId,
            collisionColor: collisionColor,
        };
    };

    let name = "";
    let layerId = "";
    let collisionColor = [0, 0, 0];
</script>

<style>
    .layerSectionContainer {
        margin-left: 16px;
        margin-bottom: 16px;
        position: relative;
    }
    .layerSectionContainer::after {
        content: "";
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: -12px;
        width: 4px;
        background-color: var(--editorBg2Color);
    }
    .sectionContainer {
        margin-bottom: 16px;
    }
    .inputSectionTitle {
        color: var(--editorUIText);
        font-size: 1.2em;
        font-weight: 700;
    }
</style>

<div class="layerSectionContainer">
    <div class="sectionContainer">
        <div class="inputSectionTitle">Collision Layer Name</div>
        <IconInput bind:value={name} placeholder={'Collision Layer Name'} />
    </div>
    <div class="sectionContainer">
        <div class="inputSectionTitle">Collision Layer Id</div>
        <IconInput bind:value={layerId} placeholder={'Collision Layer Id'} />
    </div>
    <div class="sectionContainer">
        <div class="inputSectionTitle">Pick Collision Color</div>
        <ColorPicker
            fieldName={'Collision Color'}
            bind:pickedColor={collisionColor} />
    </div>
    <div class="sectionContainer">
        <PrimaryButton
            label={"Remove Collision Layer"}
            on:click={() => {
                removeCollisionLayer(layerIndex);
            }} />
    </div>
</div>
