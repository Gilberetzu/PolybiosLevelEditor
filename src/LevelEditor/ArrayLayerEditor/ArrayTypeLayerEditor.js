import * as PIXI from "pixi.js";
import ArrayEditableElement from "./ArrayEditableElement";
import Background from "../Renderers/Background";

export default class ArrayTypeLayerEditor {
    constructor(spriteCollection, levelCollection, pixiApp, layerIndex) {
        this.spriteCollection = spriteCollection;
        this.levelCollection = levelCollection;
        this.layerIndex = layerIndex;
        const selectedLevel = levelCollection.getSelectedLevel();
        const selectedLayer = selectedLevel.layers[layerIndex];

        this.pixiApp = pixiApp;

        //This should be changed to its own object, because there are some options it needs
        this.globalContainer = new PIXI.Container();
        this.pixiApp.stage.addChild(this.globalContainer);

        this.container = new PIXI.Container();
        this.bgRenderer = new Background(this.globalContainer, selectedLevel.backgroundColor, selectedLevel.width, selectedLevel.height);
        this.globalContainer.addChild(this.container);

        this.spriteSize = selectedLayer.spriteSize == "16x16" ? 16 : 8;

        this.editableElements = [];

        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < selectedLayer.world.length; i++) {
            const tileSpriteName = selectedLayer.world[i];
            this.editableElements[i] = new ArrayEditableElement(currentX, currentY, this.container, this.spriteSize, this, tileSpriteName, i);
            
            currentX += this.spriteSize;
            if(currentX >= selectedLevel.width){
                currentX = 0;
                currentY += this.spriteSize;
            }
        }

        this.isMouseDown = false;
        this.container.hitArea = new PIXI.Rectangle(0,0,selectedLevel.width, selectedLevel.height);
        this.container.interactive = true;
        this.container.on("mousedown", this.mouseDown.bind(this));
        this.container.on("mouseup", this.mouseUp.bind(this));
        this.container.on("mouseout", this.mouseUp.bind(this));

        this.destroyed = false;
    }

    mouseDown(){
        this.isMouseDown = true;
    }
    mouseUp(){
        this.isMouseDown = false;
    }

    getCurrentSprite(){
        const selectedSprite = this.spriteCollection.getSelectedSprite();
        console.log("selected sprite: ", selectedSprite);
        console.log("size: ", this.spriteSize);
        if(selectedSprite){
            if(selectedSprite.getSpriteSize() == this.spriteSize){
                return selectedSprite;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    getCurrentSpriteName(){
        if(this.spriteCollection.transparent){
            return "TRANSPARENT";
        }else{
            const currentSprite = this.getCurrentSprite();
            return currentSprite ? currentSprite.textureMetaData.name : null;
        }
    }

    setTileToCurrentSprite(worldIndex){
        const selectedLevel = this.levelCollection.getSelectedLevel();
        const selectedLayer = selectedLevel.layers[this.layerIndex];
        selectedLayer.world[worldIndex] = this.getCurrentSpriteName();
    }

    destroy(){
        if(!this.destroyed){
            for (let i = 0; i < this.editableElements.length; i++) {
                this.editableElements[i].destroy();
            }
            this.pixiApp.stage.removeChild(this.globalContainer);
            this.bgRenderer.destroy();
            this.container.destroy();
            this.globalContainer.destroy();
        }
        this.destroyed = true;
    }
}