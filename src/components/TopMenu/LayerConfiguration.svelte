<script>
    import SelectionBox from "../SelectionBox/SelectionBox.svelte";
    import Checkbox from "../Checkbox/Checkbox.svelte";
    import ColorPicker from "../ColorPicker/ColorPicker.svelte";
    import IconInput from "../IconInput/IconInput.svelte";

    export const getLayerInfo = () => {
        if (layerType == "DYNAMIC") {
            return {
                type: layerType,
                transparentColor: transparentColor
            };
        } else if (layerType == "ARRAY_8x8" || layerType == "ARRAY_16x16") {
            return {
                type: layerType,
                useParalax: useParalax,
                paralaxShiftAmount: paralaxShiftAmount,
                transparentColor: transparentColor
            };
        } else {
            return null;
        }
    };

    let layerType = "None";
    let transparentColor = [0,0,0];

    let useParalax = false;
    let paralaxShiftAmount = 0;
</script>

<style>
    .inputSectionTitle {
        color: var(--editorUIText);
        font-size: 1.2em;
        font-weight: 700;
    }
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
    .sideBySide {
        display: grid;
        grid-template-columns: auto auto;
    }
    .sectionContainer {
        margin-bottom: 16px;
    }
</style>

<div class="layerSectionContainer">
    <div class="sectionContainer">
        <div class="inputSectionTitle">Layer Type</div>
        <div>
            <SelectionBox
                possibleValues={['None', 'ARRAY_8x8', 'ARRAY_16x16', 'DYNAMIC']}
                bind:value={layerType} />
        </div>
    </div>
    {#if layerType == 'ARRAY_16x16' || layerType == 'ARRAY_8x8'}
        <div class="sectionContainer">
            <div class="inputSectionTitle">Pick Transparent Color</div>
            <ColorPicker
                fieldName={'Transparent Color'}
                bind:pickedColor={transparentColor} />
        </div>
        <div class="sectionContainer sideBySide">
            <div class="inputSectionTitle">Use Paralax</div>
            <Checkbox bind:value={useParalax} />
        </div>
        {#if useParalax}
            <div class="inputSectionTitle">Paralax Shift Amount</div>
            <div style="width: 150px">
                <IconInput bind:value={paralaxShiftAmount} />
            </div>
        {/if}
    {:else if layerType == 'DYNAMIC'}
        <div class="sectionContainer">
            <div class="inputSectionTitle">Pick Transparent Color</div>
            <ColorPicker
                fieldName={'Transparent Color'}
                bind:pickedColor={transparentColor} />
        </div>
        <div class="sectionContainer" />
    {/if}
</div>
