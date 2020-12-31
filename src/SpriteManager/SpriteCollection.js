import Sprite from "./Sprite";
import SubscriptionManager from "../SubscriptionManager/SubscriptionManager";

export default class SpriteCollection {
    constructor() {
        this.sprites = [];
        this.selectedSprite = -1;

        this.transparent = false;
        this.background = false;
        
        this.subscriptionManager = new SubscriptionManager();
    }

    setSelected(selected){
        this.selectedSprite = selected;
        this.transparent = false;
        this.background = false;

        this.subscriptionManager.callSubscribedCallback("SELECTED_SPRITE");
    }

    setAsTransparent(){
        this.selectedSprite = -1;
        this.transparent = true;
        this.background = false;

        this.subscriptionManager.callSubscribedCallback("SELECTED_SPRITE");
    }

    setAsBackground(){
        this.selectedSprite = -1;
        this.background = true;
        this.transparent = false;

        this.subscriptionManager.callSubscribedCallback("SELECTED_SPRITE");
    }

    getSelectedSprite(){
        if(this.selectedSprite != -1){
            return this.sprites[this.selectedSprite];
        }else{
            return null;
        }
    }

    getSpriteWithName(name){
        for (let i = 0; i < this.sprites.length; i++) {
            const sprite = this.sprites[i];
            if(sprite.textureMetaData.name == name){
                return sprite;
            }
        }
        return null;
    }

    addSprite(texture, textureImportData, imageURL) {
        this.sprites.push(new Sprite(
            texture, 
            textureImportData,
            imageURL)
        );

        this.subscriptionManager.callSubscribedCallback("SPRITE_ADDED");
    }
}