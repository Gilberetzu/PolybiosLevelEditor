import * as PIXI from "pixi.js";

export default class CollisionEditableElement {
    constructor(posX, posY, editableContainer, collisionColor, editor, worldIndex, currentState){
        this.posX = posX;
        this.posY = posY;
        this.editor = editor;
        this.worldIndex = worldIndex;
        this.currentState = currentState;

        this.elementGraphic = new PIXI.Graphics();
        this.elementGraphic.x = posX;
        this.elementGraphic.y = posY;

        editableContainer.addChild(this.elementGraphic);
        this.color = (collisionColor[0] << 16) + (collisionColor[1] << 8) + collisionColor[2];
        this.drawState();
    }

    toggle(){
        this.currentState = !this.currentState;
        this.drawState();
        return this.currentState;
    }

    drawState(){
        this.elementGraphic.clear();
        if(this.currentState){
            this.elementGraphic.beginFill(this.color);
            this.elementGraphic.lineStyle(0);
            this.elementGraphic.drawRect(0,0,4,4);
        }
    }
}