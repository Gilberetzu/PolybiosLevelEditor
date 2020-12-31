<script>
    import XIcon from "../Icons/X.svelte";

    export let windowName = "No name given";
    export let width = 500;
    export let height = 500;
    export let positionX = 24;
    export let positionY = 24;

    let open = false;

    export const openWindow = () => {
        open = true;
    };
    export const closeWindow = () => {
        open = false;
    };

    let moving = false;

    let movementOffset = {
        x: 0,
        y: 0,
    };

    const startMove = (e) => {
        movementOffset.x = positionX - e.clientX;
        movementOffset.y = positionY - e.clientY;
        moving = true;
    };

    const mouseMove = (e) => {
        if (moving) {
            positionX = e.clientX + movementOffset.x;
            positionY = e.clientY + movementOffset.y;
        }
    };

    const stopMove = () => {
        moving = false;
    };
</script>

<style>
    .mainContainer {
        z-index: 2000;
        position: fixed;
        display: grid;
        grid-template-rows: auto 1fr;
        border-radius: 8px;
        border-color: var(--editorButtonHoverBG);
        border-style: solid;
        border-width: 1px;
        overflow: hidden;

        box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.15);
    }
    .containerTop {
        cursor: pointer;
        background-color: var(--editorBgColor);
        display: grid;
        grid-template-columns: 1fr auto;
    }
    .titleContainer {
        padding: 8px 0px 0px 8px;
        color: var(--editorUIText);
    }
    .closeButton {
        cursor: pointer;
        background-color: var(--editorBg2Color);
        width: 16px;
        padding: 8px 8px 8px 8px;
    }
    .closeButton:hover {
        background-color: var(--editorButtonHoverBG);
    }
    .layoutContainer {
        position: relative;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    .contentContainer {
        background-color: var(--pixiAppBgColor);
        display: block;
        padding: 0px 8px 8px 8px;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        overflow-y: auto;
    }
    .contentContainer::-webkit-scrollbar {
        width: 8px;
    }

    .contentContainer::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .contentContainer::-webkit-scrollbar-thumb {
        background-color: var(--editorIconColor);
        border-radius: 100px;
        outline: 0px;
    }
</style>

<svelte:window on:mousemove={mouseMove} on:mouseup={stopMove} />

{#if open}
    <div
        class="mainContainer"
        style={`top: ${positionY}px; left: ${positionX}px; width: ${width}px; height: ${height}px;`}>
        <div class="containerTop" on:mousedown={startMove}>
            <div class="titleContainer">{windowName}</div>
            <div class="closeButton" on:click={closeWindow}>
                <XIcon />
            </div>
        </div>
        <div class="layoutContainer">
            <div class="contentContainer">
                <slot />
            </div>
        </div>
    </div>
{/if}
