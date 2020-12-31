<script>
    export let label = "No label";
</script>

<style>
    .container{
        padding: 8px 16px 8px 16px;
        border-radius: 100px;
        background-color: none;
        color: var(--editorUIText);
        box-shadow: inset 0px 0px 0px 2px var(--editorBgColor);
    }
    .container:hover{
        box-shadow: inset 0px 0px 0px 2px var(--editorButtonHoverBG);
    }
</style>

<div on:click class="container">
    {label}
</div>