<script>
    export let label = "No label";
</script>

<style>
    .container{
        padding: 8px 16px 8px 16px;
        cursor: pointer;
        user-select: none;
        border-radius: 100px;
        background-color: var(--editorBgColor);
        color: var(--editorUIText);
    }
    .container:hover{
        background-color: var(--editorButtonHoverBG);
    }
</style>

<div on:click class="container">
    {label}
</div>