<script>
    export let value = false;

    const toggleValue = ()=>{
        value = !value;
    }
</script>

<style>
    .mainContainer {
        cursor: pointer;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        background-color: var(--editorBgColor);
    }
    .notSelected {
        box-shadow: inset 0px 0px 0px 2px var(--editorIconColor);
    }
    .notSelected:hover{
        box-shadow: inset 0px 0px 0px 2px var(--editorIconColor), 0px 0px 0px 4px var(--editorButtonHoverBG);
    }
    .selected {
        box-shadow: inset 0px 0px 0px 30px var(--editorIconColor);
    }
    .selected:hover{
        box-shadow: inset 0px 0px 0px 30px var(--editorIconColor), 0px 0px 0px 4px var(--editorButtonHoverBG);
    }
</style>

<div
    class:mainContainer={true}
    class:notSelected={!value}
    class:selected={value} 
    on:click={toggleValue}/>
