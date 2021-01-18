import * as PIXI from "pixi.js";
import ArrayEditableElement from "./ArrayEditableElement";
import LayerEditor from "../LayerEditor";

import ArrayTypeLayerRenderer from "../Renderers/ArrayTypeLayerRenderer";
import Background from "../Renderers/Background";
import ToolToggle from "../ToolToggle";

export default class ArrayTypeLayerEditor extends LayerEditor {
    constructor(spriteCollection, levelCollection, pixiApp, layerIndex, editorTools) {
        super(spriteCollection, levelCollection, pixiApp, layerIndex);

        this.layerIndex = layerIndex;
        this.editorTools = editorTools;
        
        const selectedLevel = this.levelCollection.getSelectedLevel();
        const selectedLayer = selectedLevel.layers[this.layerIndex];

        this.spriteSize = selectedLayer.spriteSize == "16x16" ? 16 : 8;

        //Setting the container to handle what happens when the mouse is down
        this.isMouseDown = false;
        this.layerContainer.hitArea = new PIXI.Rectangle(0, 0, selectedLevel.width, selectedLevel.height);
        this.layerContainer.interactive = true;
        this.layerContainer.on("mousedown", this.mouseDown.bind(this));
        this.layerContainer.on("mouseup", this.mouseUp.bind(this));
        this.layerContainer.on("mouseout", this.mouseUp.bind(this));

        this.editableElements = [];
        this.createEditableElements();

        this.createTools();
    }

    createTools() {
        let tools = [...this.createBackgroundRendererToggles(), ...this.createLayerRendererToggles()];
        this.editorTools.setTools(tools);
    }

    createEditableElements() {
        const selectedLevel = this.levelCollection.getSelectedLevel();
        const selectedLayer = selectedLevel.layers[this.layerIndex];

        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < selectedLayer.world.length; i++) {
            const tileSpriteName = selectedLayer.world[i];
            this.editableElements[i] = new ArrayEditableElement(currentX, currentY, this.layerContainer, this.spriteSize, this, tileSpriteName, i);
            currentX += this.spriteSize;
            if (currentX >= selectedLevel.width) {
                currentX = 0;
                currentY += this.spriteSize;
            }
        }
    }

    mouseDown() {
        this.isMouseDown = true;
    }
    mouseUp() {
        this.isMouseDown = false;
    }

    getCurrentSprite() {
        const selectedSprite = this.spriteCollection.getSelectedSprite();
        if (selectedSprite) {
            if (selectedSprite.getSpriteSize() == this.spriteSize) {
                return selectedSprite;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    getCurrentSpriteName() {
        if (this.spriteCollection.transparent) {
            return "TRANSPARENT";
        } else {
            const currentSprite = this.getCurrentSprite();
            return currentSprite ? currentSprite.textureMetaData.name : null;
        }
    }

    setTileToCurrentSprite(worldIndex) {
        const selectedLevel = this.levelCollection.getSelectedLevel();
        const selectedLayer = selectedLevel.layers[this.layerIndex];
        selectedLayer.world[worldIndex] = this.getCurrentSpriteName();
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();
            for (let i = 0; i < this.editableElements.length; i++) {
                this.editableElements[i].destroy();
            }
        }
        this.destroyed = true;
    }
}