import LayerEditor from "../LayerEditor";
import SystemColors from "../../components/Colors/ColorSetup";
import CollisionEditableElement from "./CollisionEditableElement";
import * as PIXI from "pixi.js";

export default class CollisionLayerEditor extends LayerEditor {
    constructor(spriteCollection, levelCollection, pixiApp, collisionLayerIndex, editorTools) {
        super(spriteCollection, levelCollection, pixiApp, -1);

        this.collisionLayerIndex = collisionLayerIndex;
        this.editorTools = editorTools;

        const selectedLevel = this.levelCollection.getSelectedLevel();
        this.layerContainer.hitArea = new PIXI.Rectangle(0, 0, selectedLevel.width, selectedLevel.height);
        this.layerContainer.interactive = true;
        this.layerContainer.on("mousedown", this.mouseDown.bind(this));
        this.layerContainer.on("mouseup", this.mouseUp.bind(this));
        this.layerContainer.on("mousemove", this.mouseMove.bind(this));

        this.editableElements = [];
        this.createEditableElements();

        this.boxSelectionGraphic = new PIXI.Graphics();
        this.layerContainer.addChild(this.boxSelectionGraphic);

        this.isMouseDown = false;
        this.startPosition = null;
        this.currentPosition = null;
    }

    createEditableElements() {
        const selectedLevel = this.levelCollection.getSelectedLevel();
        const selectedCollisionLayer = selectedLevel.collisionLayers[this.collisionLayerIndex];

        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < selectedCollisionLayer.staticCollision.length; i++) {
            const currentTileState = selectedCollisionLayer.staticCollision[i];
            this.editableElements[i] = new CollisionEditableElement(currentX, currentY, this.layerContainer, selectedCollisionLayer.collisionColor, this, i, currentTileState);
            currentX += 4;
            if (currentX >= selectedLevel.width) {
                currentX = 0;
                currentY += 4;
            }
        }
    }

    mouseDown(e) {
        this.isMouseDown = true;
        this.startPosition = e.data.getLocalPosition(this.layerContainer);
        this.currentPosition = e.data.getLocalPosition(this.layerContainer);
    }

    mouseMove(e) {
        this.currentPosition = e.data.getLocalPosition(this.layerContainer);
        this.redrawSelectionBox();
    }

    mouseUp(e) {
        this.isMouseDown = false;
        this.redrawSelectionBox();
        this.toggleEveryBoxUnderSelectionBox();
    }

    redrawSelectionBox() {
        this.boxSelectionGraphic.clear();
        if (this.isMouseDown) {
            console.log("current pos: ", this.currentPosition);
            console.log("start pos: ", this.startPosition);

            this.boxSelectionGraphic.beginFill(SystemColors.selectionBoxColor, 0.5);
            this.boxSelectionGraphic.lineStyle(0);

            const boxWidth = Math.abs(this.currentPosition.x - this.startPosition.x)
            const boxHeight = Math.abs(this.currentPosition.y - this.startPosition.y)

            const startPosSelector = (pos1, pos2) => {
                return pos1 < pos2 ? pos1 : pos2;
            }

            const startXPos = startPosSelector(this.startPosition.x, this.currentPosition.x);
            const startYPos = startPosSelector(this.startPosition.y, this.currentPosition.y);

            this.boxSelectionGraphic.drawRect(startXPos, startYPos, boxWidth, boxHeight);
        }
    }

    toggleEveryBoxUnderSelectionBox() {
        const boxWidth = Math.abs(this.currentPosition.x - this.startPosition.x)
        const boxHeight = Math.abs(this.currentPosition.y - this.startPosition.y)

        const startPosSelector = (pos1, pos2) => {
            return pos1 < pos2 ? pos1 : pos2;
        }

        const startXPos = startPosSelector(this.startPosition.x, this.currentPosition.x);
        const startYPos = startPosSelector(this.startPosition.y, this.currentPosition.y);

        const endXPos = startXPos + boxWidth;
        const endYPos = startYPos + boxHeight;

        const selectedLevel = this.levelCollection.getSelectedLevel();
        const selectedCollisionLayer = selectedLevel.collisionLayers[this.collisionLayerIndex];

        for (let i = 0; i < this.editableElements.length; i++) {
            const element = this.editableElements[i];
            const upperLeftCorner = {
                x: element.posX,
                y: element.posY
            }
            const bottomRightCorner = {
                x: upperLeftCorner.x + 4,
                y: upperLeftCorner.y + 4
            }

            if (startXPos < bottomRightCorner.x && startYPos < bottomRightCorner.y && endXPos > upperLeftCorner.x && endYPos > upperLeftCorner.y) {
                const elementCurrentState = element.toggle();
                selectedCollisionLayer.staticCollision[i] = elementCurrentState;
            }
        }
    }

    createTools() {
        let tools = [...this.createBackgroundRendererToggles(), ...this.createLayerRendererToggles()];
        this.editorTools.setTools(tools);
    }
}