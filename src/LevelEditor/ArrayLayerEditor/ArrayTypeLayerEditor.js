import * as PIXI from "pixi.js";
import ArrayEditableElement from "./ArrayEditableElement";

export default class ArrayTypeLayerEditor {
    constructor(spriteCollection, levelCollection, pixiApp, layerIndex) {
        this.spriteCollection = spriteCollection;
        this.levelCollection = levelCollection;
        this.layerIndex = layerIndex;
        const selectedLevel = levelCollection.getSelectedLevel();
        const selectedLayer = selectedLevel.layers[layerIndex];

        this.container = new PIXI.Container();
        this.pixiApp = pixiApp;
        this.pixiApp.stage.addChild(this.container);

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
        const currentSprite = this.getCurrentSprite();
        return currentSprite ? currentSprite.textureMetaData.name : null;
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
            this.pixiApp.stage.removeChild(this.container);
            this.container.destroy();
        }
        this.destroyed = true;
    }
}