<script>
    import Pallete from "./Pallete.svelte";
    import ColorHolder from "./ColorHolder.svelte";

    export let pickedColor = [0, 0, 0];
    export let fieldName = "";

    let setColor = (color) => {
        pickedColor = color;
    };
    let pickColor;
</script>

<ColorHolder
    bind:pickedColor
    on:click={() => {
        pickColor();
    }} />

<Pallete bind:pickColor {setColor} {fieldName} />
