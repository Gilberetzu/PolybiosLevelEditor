<script>
    import ArrowUpIcon from "../Icons/ArrowUp.svelte";
    import ArrowDownIcon from "../Icons/ArrowDown.svelte";

    import { fly } from 'svelte/transition';
    import { backIn, backOut } from 'svelte/easing';

    export let possibleValues;
    export let value = "";

    let open = false;
    const toggleDropdown = ()=>{
        open = !open;
    }
</script>

<style>
    .mainContainer{
        display: grid;
        grid-template-columns: auto 24px;
        gap: 8px;
        position: relative;
        place-items: center;
    }
    .currentValue{
        color: var(--editorUIText);
        font-weight: 600;
        border-radius: 24px;
        width: 100%;
        height: 100%;
        background-color: var(--editorBgColor);
    }
    .currentValue div{
        margin-left: 8px;
    }
    .toggle{
        cursor: pointer;
        border-radius: 24px;
        display: block;
        line-height: 0;
    }
    .toggle:hover{
        box-shadow: 0px 0px 0px 2px var(--editorButtonHoverBG);
    }
    .dropDown{
        z-index: 1000;
        top: calc(100% + 8px);
        left: 0px;
        right: 0px;
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--pixiAppBgColor);
        color: var(--editorUIText);
        position: absolute;
        box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.15), inset 0px 0px 0px 1px var(--editorButtonHoverBG);
    }
    .dropDownValue{
        padding: 4px;
    }
    .dropDownValue:hover{
        background-color: var(--editorBgColor);
    }
</style>

<div class="mainContainer">
    <div class="currentValue">
        <div>{value}</div>
    </div>
    <div class="toggle" on:click={toggleDropdown}>
        {#if open}
            <ArrowUpIcon/>
        {:else}
            <ArrowDownIcon/>
        {/if}
    </div>

    {#if open}
        <div in:fly="{{delay: 0, duration: 300, x: 0, y: -50, opacity: 0, easing: backOut}}"
             out:fly="{{delay: 0, duration: 300, x: 0, y: -50, opacity: 0, easing: backIn}}" class="dropDown">
            {#each possibleValues as possValue}
                <div class="dropDownValue" on:click={()=>{value = possValue; toggleDropdown();}}>{possValue}</div>
            {/each}
        </div>
    {/if}
    
</div>

