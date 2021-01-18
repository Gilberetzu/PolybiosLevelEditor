<script>
    import PrimaryButton from "./PrimaryButton.svelte";
    export let label;
    export let selected = false;
</script>

<style>
    .buttonToggleContainer {
        display: grid;
        grid-template-columns: 32px 1fr;
        gap: 8px;
    }
    .toggleState {
        place-self: center;
        width: 32px;
        border-radius: 32px;
        height: 32px;
    }
    .toggleUnselected {
        background-color: var(--editorBgColor);
    }
    .toggleSelected {
        background-color: var(--editorIconColor);
    }
</style>

<div class="buttonToggleContainer">
    <div class="toggleState" class:toggleUnselected={!selected} class:toggleSelected={selected} />
    <div>
        <PrimaryButton {label} on:click />
    </div>
</div>
