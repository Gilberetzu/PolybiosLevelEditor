const { text } = require("svelte/internal");
import * as PIXI from "pixi.js";

export default class Sprite{
    constructor(texture, textureMetaData, imageURL){
        this.textureMetaData = textureMetaData;
        this.texture = texture;
        this.imageURL = imageURL;
    }

    getSpriteSize(){
        if(this.textureMetaData.size == "8x8"){
            return 8;
        }else if(this.textureMetaData.size == "16x16"){
            return 16;
        }else{
            return 0;
        }
    }

    createPixiSprite(){
        return new PIXI.Sprite(this.texture);
    }
}