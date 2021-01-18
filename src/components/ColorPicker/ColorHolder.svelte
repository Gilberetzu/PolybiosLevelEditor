<script>
    export let pickedColor = [0,0,0];

    const colorToConsoleLimit = (color) => {
        return [
            {
                val: color[0] >> 5,
                label: "R",
            },
            {
                val: color[1] >> 5,
                label: "G",
            },
            {
                val: color[2] >> 6,
                label: "B",
            },
        ];
    };
</script>

<style>
    .container {
        display: grid;
        gap: 8px;
        grid-template-columns: 40px auto;
        grid-template-rows: 21px;
        grid-template-areas:
            "R C"
            "G C"
            "B C";
    }
    .pickedColor {
        width: 81px;
        height: 100%;
        grid-area: C;
    }
    .colorContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        text-align: center;
    }
    .colorLabel {
        color: var(--editorUIText);
        font-weight: 800;
        border-radius: 4px;
        background-color: var(--editorBgColor);
    }
    .colorValue {
        color: var(--editorUIText);
    }
</style>

<div class="container">
    <div
        class="pickedColor"
        style={`background-color: rgb(${pickedColor[0]}, ${pickedColor[1]}, ${pickedColor[2]})`}
        on:click/>
    {#each colorToConsoleLimit(pickedColor) as tColor}
        <div class="colorContainer" style={`grid-area: ${tColor.label}`}>
            <div class="colorLabel">{tColor.label}</div>
            <div class="colorValue">{tColor.val}</div>
        </div>
    {/each}
</div>