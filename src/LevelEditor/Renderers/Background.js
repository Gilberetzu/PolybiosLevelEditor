import * as PIXI from "pixi.js";

export default class Background{
    constructor(container, backgroundColor, width, height){
        this.bgGraphic = new PIXI.Graphics();

        this.bgGraphic.clear();

        const bgColor = backgroundColor;

        const color = (bgColor[0] << 16) + (bgColor[1] << 8) + bgColor[2];

        this.bgGraphic.lineStyle(0);
        this.bgGraphic.beginFill(color);
        this.bgGraphic.drawRect(0, 0, width, height);
        this.bgGraphic.endFill();

        container.addChild(this.bgGraphic);
    }

    destroy(){
        this.bgGraphic.destroy();
    }
}