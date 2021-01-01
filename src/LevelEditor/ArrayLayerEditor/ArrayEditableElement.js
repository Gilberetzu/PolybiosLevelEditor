import * as PIXI from "pixi.js";

export default class ArrayEditableElement {
    constructor(posX, posY, editableContainer, size, editor, tileSpriteName, worldIndex) {
        this.tileSpriteName = tileSpriteName;
        this.worldIndex = worldIndex;

        this.editor = editor;
        this.size = size;

        this.elementContainer = new PIXI.Container();
        this.elementContainer.hitArea = new PIXI.Rectangle(0, 0, this.size, this.size);
        this.elementContainer.x = posX;
        this.elementContainer.y = posY;

        this.spriteContainer = new PIXI.Container();
        this.innerSpriteObject = null;
        this.elementContainer.addChild(this.spriteContainer);

        this.gridVisual = new PIXI.Graphics();
        this.elementContainer.addChild(this.gridVisual);
        this.showGridBorder();

        editableContainer.addChild(this.elementContainer);

        this.elementContainer.interactive = true;
        this.showSelectedSprite();

        this.elementContainer.on("mouseover", this.mouseOver.bind(this));
        this.elementContainer.on("mouseout", this.mouseOut.bind(this));

        this.mouseDownCheck = (() => {
            if (this.editor.isMouseDown) {
                this.editor.setTileToCurrentSprite(this.worldIndex);
                this.tileSpriteName = this.editor.getCurrentSpriteName();
            };
        }).bind(this);
    }

    mouseOver() {
        this.showHoverGridBorder();
        this.showPossibleSprite();

        this.editor.pixiApp.ticker.add(this.mouseDownCheck);
    }

    mouseOut() {
        this.showGridBorder();
        this.showSelectedSprite();

        this.editor.pixiApp.ticker.remove(this.mouseDownCheck);
    }

    showGridBorder() {
        this.gridVisual.clear();
        this.gridVisual.lineStyle(1, 0xffffff, 0.30, 0);
        this.gridVisual.drawRect(0, 0, this.size, this.size);
    }

    showHoverGridBorder() {
        this.gridVisual.clear();
        this.gridVisual.lineStyle(1, 0xffffff, 1, 0);
        this.gridVisual.drawRect(0, 0, this.size, this.size);
    }

    /*drawBackground() {
        this.spriteBackground.clear();
        const bgColor = this.editor.getLayerBackgroundColor();
        const color = (bgColor[0] << 16) + (bgColor[1] << 8) + bgColor[2];
        this.spriteBackground.lineStyle(0);
        this.spriteBackground.beginFill(color);
        this.spriteBackground.drawRect(0, 0, this.size, this.size);
        this.spriteBackground.endFill();
    }*/

    showSelectedSprite() {
        if (this.tileSpriteName) {
            if (this.tileSpriteName == "TRANSPARENT") {
                this.clearSpriteOnContainer();
            } else {
                const sprite = this.editor.spriteCollection.getSpriteWithName(this.tileSpriteName);
                this.setSpriteOnContainer(sprite);
            }
        } else {
            this.clearSpriteOnContainer();
        }
    }

    showPossibleSprite() {
        const currentSpriteName = this.editor.getCurrentSpriteName();
        if (currentSpriteName == "TRANSPARENT") {
            this.clearSpriteOnContainer();
        } else {
            const currentSprite = this.editor.getCurrentSprite();
            if (currentSprite) {
                this.setSpriteOnContainer(currentSprite);
            } else {
                this.clearSpriteOnContainer();
            }
        }
    }

    clearSpriteOnContainer() {
        this.spriteContainer.removeChildren(0);
        if (this.innerSpriteObject) {
            if (!this.innerSpriteObject._destroyed) {
                this.innerSpriteObject.destroy();
            }
        }
    }

    setSpriteOnContainer(sprite) {
        this.clearSpriteOnContainer();
        this.innerSpriteObject = sprite.createPixiSprite();
        this.spriteContainer.addChild(this.innerSpriteObject);
    }

    destroy() {
        this.gridVisual.destroy();
        this.spriteContainer.destroy();
        this.elementContainer.destroy();
    }
}