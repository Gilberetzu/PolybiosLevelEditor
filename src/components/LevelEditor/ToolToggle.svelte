<script>
    import { onMount } from "svelte";
    export let tool;
    let hold = false;

    onMount(() => {
        tool.subscriptionManager.subscribe("toggleUIUpdate", toggleUpdate);
        hold = tool.hold;

        return () => {
            tool.subscriptionManager.unsubscribe("toggleUIUpdate");
        };
    });

    const toggleUpdate = (TYPE) => {
        if (TYPE == "ACTION") {
            hold = tool.hold;
        }
    };
</script>

<style>
    .normal {
        color: var(--editorIconColor);
        background-color: var(--editorBgColor);
        padding: 4px;
        border-radius: 4px;
        margin: 4px;
        font-weight: 900;
        user-select: none;
        cursor: pointer;
    }
    .normal:hover {
        box-shadow: 0px 0px 0px 2px var(--editorUIText);
    }
    .selected {
        background-color: var(--editorIconColor) !important;
        color: var(--editorBgColor) !important;
    }
</style>

<div
    class:normal={true}
    class:selected={hold}
    on:click={() => {
        tool.onClick();
    }}>
    {tool.label}
</div>
