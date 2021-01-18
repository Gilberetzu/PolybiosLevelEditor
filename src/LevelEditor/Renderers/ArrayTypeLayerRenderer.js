import * as PIXI from "pixi.js";

export default class ArrayTypeLayerRenderer{
    constructor(container, level, layerIndex, spriteCollection, shownAlpha){
        this.layerContainer = new PIXI.Container();
        this.shownAlpha = shownAlpha;

        this.layerContainer.alpha = this.shownAlpha; 

        const selectedLayer = level.layers[layerIndex];
        const spriteSize = selectedLayer.getNumericSpriteSize();

        this.sprites = [];

        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < selectedLayer.world.length; i++) {
            const spriteName = selectedLayer.world[i];

            if(spriteName != "TRANSPARENT"){
                const sprite = spriteCollection.getSpriteWithName(spriteName);
                if(sprite){
                    const pixiSprite = sprite.createPixiSprite();
                    
                    pixiSprite.x = currentX;
                    pixiSprite.y = currentY;

                    this.sprites.push(pixiSprite);
                    this.layerContainer.addChild(pixiSprite);
                }
            }

            currentX += spriteSize;
            if(currentX >= level.width){
                currentX = 0;
                currentY += spriteSize;
            }
        }

        container.addChild(this.layerContainer);
    }

    toggle(){
        if(this.layerContainer.alpha == this.shownAlpha){
            this.hide();
            return false;
        }else{
            this.show();
            return true;
        }
    }

    show(){
        this.layerContainer.alpha = this.shownAlpha;
    }

    hide(){
        this.layerContainer.alpha = 0;
    }

    destroy(){
        this.sprites.forEach((sp)=>{
            sp.destroy();
        })
        this.layerContainer.removeChildren(0);
    }
}