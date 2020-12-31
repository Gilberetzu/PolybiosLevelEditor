<script>
    import FloatingWindow from "../FloatingWindow/FloatingWindow.svelte";
    export let fieldName = "none";
    export let setColor;
    export const pickColor = () => {
        openWindow();
    };

    let openWindow;
    let closeWindow;

    const leftShiftAdding1 = (color, amount) => {
        if (color != 0) {
            let paddedColor = color;
            for (let i = 0; i < amount; i++) {
                paddedColor = (paddedColor << 1) + 1;
            }
            return paddedColor;
        }else{
            return 0;
        }
    };

    const transformColor = (color) => {
        const red = leftShiftAdding1((color & 0xe0) >> 5, 5);
        const green = leftShiftAdding1((color & 0x1c) >> 2, 5);
        const blue = leftShiftAdding1(color & 0x03, 6);

        return [red, green, blue];
    };

    const createColorPallete = () => {
        let pallete = [];
        for (let i = 0; i < 256; i++) {
            pallete.push(transformColor(i));
        }
        return pallete;
    };

    const colorPallete = createColorPallete();
</script>

<style>
    .container {
        display: grid;
        padding-top: 8px;
        grid-template-columns: repeat(auto-fit, 24px);
        gap: 8px;
    }
    .colorBox {
        width: 24px;
        height: 24px;
    }
    .colorBox:hover {
        transform: scale(1.5);
    }
</style>

<FloatingWindow
    windowName={fieldName}
    bind:openWindow
    bind:closeWindow
    positionX={200}
    positionY={200}
    width={210}>
    <div class="container">
        {#each colorPallete as color}
            <div
                class:colorBox={true}
                style={`background-color: rgb(${color[0]},${color[1]},${color[2]});`}
                on:click={() => {
                    setColor(color);
                    closeWindow();
                }} />
        {/each}
    </div>
</FloatingWindow>
