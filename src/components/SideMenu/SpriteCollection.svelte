<script>
    export let projectManager;
    import { onMount } from "svelte";
    import SearchIcon from "../Icons/Search.svelte";
    import IconInput from "../IconInput/IconInput.svelte";

    let containerImages = [];
    let filteredImages = [];

    let searchInput = "";
    let imageSelected = -1;
    let transparent = false;

    let textHover = "";
    let textHoverTop = 0;
    let textHoverRight = 0;

    onMount(() => {
        projectManager.spriteCollection.subscriptionManager.subscribe(
            "SpriteCollectionUpdate",
            spriteCollectionUpdated
        );

        addSprites();

        getDataFromSpriteCollection();

        return () => {
            projectManager.spriteCollection.subscriptionManager.unsubscribe(
                "SpriteCollectionUpdate"
            );
        };
    });

    const selectSprite = (index) => {
        projectManager.spriteCollection.setSelected(index);
    };

    const addSprites = () => {
        //Adds every sprite from the current project that are not currently loaded to this component
        for (
            let i = 0;
            i < projectManager.spriteCollection.sprites.length;
            i++
        ) {
            const sprite = projectManager.spriteCollection.sprites[i];

            const contianerImagesIndex = containerImages.findIndex(
                (valid, index) => {
                    return valid.name == sprite.textureMetaData.name;
                }
            );

            if (contianerImagesIndex == -1) {
                containerImages.push({
                    imgUrl: sprite.imageURL,
                    name: sprite.textureMetaData.name,
                    index: i,
                });
            }
        }

        containerImages = [...containerImages];
    };

    const getDataFromSpriteCollection = () => {
        imageSelected = projectManager.spriteCollection.selectedSprite;
        transparent = projectManager.spriteCollection.transparent;
    };

    const spriteCollectionUpdated = (TYPE) => {
        if (TYPE == "SPRITE_ADDED") {
            addSprites();
        } else if (TYPE == "SELECTED_SPRITE") {
            getDataFromSpriteCollection();
        }
    };

    const onHover = (e, name) => {
        const boundingRect = e.srcElement.getBoundingClientRect();
        textHoverTop = boundingRect.top + boundingRect.height;
        textHoverRight = window.innerWidth - boundingRect.right;
        textHover = name;
    };

    const onHoverStop = () => {
        textHover = "";
    };

    $: {
        if (searchInput) {
            filteredImages = containerImages.filter((imgObj) => {
                return imgObj.name.toLowerCase().includes(searchInput);
            });
        } else {
            filteredImages = [...containerImages];
        }
    }
</script>

<style>
    .mainContainer {
        display: grid;
        width: 100%;
        height: 100%;
        overflow: hidden;
        grid-template-rows: 0px auto 1fr;
        gap: 16px;
    }
    .spriteListContainer {
        display: block;
        overflow: auto;
        height: 100%;
    }
    .spriteListContainer::-webkit-scrollbar {
        width: 8px;
    }

    .spriteListContainer::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .spriteListContainer::-webkit-scrollbar-thumb {
        background-color: var(--editorIconColor);
        border-radius: 100px;
        outline: 0px;
    }
    .spriteContainer {
        display: inline-grid;
        grid-template-columns: repeat(auto-fit, 64px);
        padding: 8px 16px 40px 16px;
        width: calc(100% - 32px);
        gap: 16px;
    }
    .imgName {
        color: var(--editorUIText);
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    img {
        width: 100%;
        image-rendering: pixelated;
    }
    img:hover {
        box-shadow: 0px 0px 0px 5px var(--editorButtonHoverBG);
        border-radius: 5px;
    }
    .imgSelected {
        box-shadow: 0px 0px 0px 5px var(--editorUIText) !important;
        border-radius: 5px;
    }
    .textHover {
        position: absolute;
        padding: 8px;
        background-color: var(--editorBgColor);
        color: var(--editorUIText);
        border-radius: 5px;
    }
    .specialColors {
        width: 64px;
        height: 64px;
        position: relative;
        display: grid;
        place-items: center;
        background-color: var(--editorBgColor);
    }
    .specialColors:hover {
        box-shadow: 0px 0px 0px 5px var(--editorButtonHoverBG);
        border-radius: 5px;
    }
    .specialColors div {
        color: var(--editorUIText);
        user-select: none;
    }
</style>

<div class="mainContainer">
    <div />
    <div style="padding:0px 16px">
        <IconInput
            IconElement={SearchIcon}
            bind:value={searchInput}
            placeholder="Sprite name" />
    </div>
    <div class="spriteListContainer">
        <div class="spriteContainer">
            <div
                class:specialColors={true}
                class:imgSelected={transparent}
                on:click={() => {
                    projectManager.spriteCollection.setAsTransparent();
                }}>
                <div>T</div>
            </div>
            {#each filteredImages as image}
                <div>
                    <img
                        src={image.imgUrl}
                        alt={image.name}
                        class:imgSelected={image.index == imageSelected}
                        on:click={() => {
                            selectSprite(image.index);
                        }} />
                    <div
                        class="imgName"
                        on:mouseleave={onHoverStop}
                        on:mouseover={(e) => {
                            onHover(e, image.name);
                        }}>
                        {image.name}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

{#if textHover}
    <div
        class="textHover"
        style={`top: ${textHoverTop}px; right: ${textHoverRight}px;`}>
        {textHover}
    </div>
{/if}
