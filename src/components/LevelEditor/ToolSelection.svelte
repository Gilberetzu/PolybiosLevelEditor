<script>
    import { onMount } from "svelte";
    import ToolToggle from "./ToolToggle.svelte";
    import ToolToggleClass from "../../LevelEditor/ToolToggle";
    export let projectManager;

    let tools = [];
    let keyPadding = 0

    onMount(() => {
        projectManager.levelEditor.editorTools.subscriptionManager.subscribe(
            "ToolSelection",
            toolSelectionUpdate
        );

        return () => {
            projectManager.levelEditor.editorTools.subscriptionManager.unsubscribe(
                "ToolSelection"
            );
        };
    });

    const toolSelectionUpdate = (TYPE) => {
        if (TYPE == "TOOLS_UPDATED") {
            tools = projectManager.levelEditor.editorTools.tools;
            keyPadding = Math.round(Math.random() * 10) + 1;
        }
    };
</script>

<style>
    .container{
        position: absolute;
        top: 8px;
        right: 8px;
    }
</style>

<div class="container">
    {#each tools as tool (`${keyPadding}${tool.label}`)}
        {#if tool instanceof ToolToggleClass}
            <ToolToggle {tool} />
        {/if}
    {/each}
</div>
