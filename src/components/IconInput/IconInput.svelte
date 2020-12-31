<script>
    export let IconElement = null;
    export let placeholder = "";
    export let value = "";
    export let type = "text";
</script>

<style>
    .inputContainer {
        display: grid;
        background-color: var(--editorBgColor);
        grid-template-columns: 1fr;
        padding: 8px 16px 8px 16px;
        border-radius: 100px;
        gap: 10px;
    }
    .withIcon{
        grid-template-columns: 24px 1fr !important;
    }
    .inputElem {
        border-style: none;
        background-color: unset;
        box-shadow: 0px 2px var(--editorIconColor);
        width: 100%;
        font-size: 16px;
        color: var(--editorUIText);
    }
    .inputElem:focus {
        outline: none;
    }
</style>

<div class:inputContainer={true} class:withIcon={IconElement != null}>
    <svelte:component this={IconElement} />
    <div>
        {#if type == "text"}
            <input class="inputElem" type="text" {placeholder} bind:value />
        {:else if type == "number"}
            <input class="inputElem" type="number" {placeholder} bind:value />
        {/if}
    </div>
</div>
