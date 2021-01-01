import Level from "./Level";
import SubscriptionManager from "../SubscriptionManager/SubscriptionManager";

export default class LevelCollection {
    constructor() {
        this.levels = [];
        this.selectedLevel = -1;
        this.subscriptionManager = new SubscriptionManager();
    }

    setSelected(selected){
        this.selectedLevel = selected;
        this.subscriptionManager.callSubscribedCallback("LEVEL_SELECTED");
    }

    getSelectedLevel(){
        if(this.selectedLevel != -1){
            return this.levels[this.selectedLevel];
        }else {
            return null;
        }
    }

    addNewLevel(levelInfo) {
        for (let i = 0; i < this.levels.length; i++) {
            const level = this.levels[i];
            if (level.name == levelInfo.name) {
                throw new Error("Level name already in use");
            }
        }

        console.log(this.levels);

        this.levels.push(
            new Level(levelInfo.width, levelInfo.height, levelInfo.name, levelInfo.createCollision, levelInfo.layers, levelInfo.backgroundColor)
        );

        this.subscriptionManager.callSubscribedCallback("LEVEL_ADDED");
    }

    addLevel() {
        //This function is meant to be used to load files that comes from a file
        throw new Error("Function not implemented")
    }
}