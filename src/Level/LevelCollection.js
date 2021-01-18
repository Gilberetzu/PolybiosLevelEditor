import Level from "./Level";
import SubscriptionManager from "../SubscriptionManager/SubscriptionManager";

export default class LevelCollection {
    constructor() {
        this.levels = [];
        this.selectedLevel = -1;
        this.subscriptionManager = new SubscriptionManager();
    }

    setSelected(selected) {
        this.selectedLevel = selected;
        this.subscriptionManager.callSubscribedCallback("LEVEL_SELECTED");
    }

    getSelectedLevel() {
        if (this.selectedLevel != -1) {
            return this.levels[this.selectedLevel];
        } else {
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

        this.levels.push(
            new Level(levelInfo.width, levelInfo.height, levelInfo.name, levelInfo.collisionLayers, levelInfo.layers, levelInfo.backgroundColor)
        );

        this.subscriptionManager.callSubscribedCallback("LEVEL_ADDED");
    }

    addLevelFromSaveData(levelData) {
        //throw new Error("Function not implemented")

        let creationLayerData = [];
        for (let i = 0; i < levelData.layers.length; i++) {
            const layerData = levelData.layers[i];
            if(layerData.type == "ARRAY_TYPE_LAYER"){
                let arrayType = layerData.spriteSize == 8 ? "ARRAY_8x8" : "ARRAY_16x16";
                creationLayerData.push({
                    type: arrayType,
                    useParalax: layerData.useParalax,
                    paralaxShiftAmount: layerData.paralaxShiftAmount,
                    transparentcolor: layerData.transparentcolor
                })
            }else if(layerData.type == "DYNAMIC_TYPE_LAYER"){
                creationLayerData.push({
                    type: "DYNAMIC",
                    transparentcolor: layerData.transparentcolor
                })
            }else{
                creationLayerData.push(null);
            }
        }

        let creationCollisionLayerData = [];
        for (let i = 0; i < levelData.collisionLayers.length; i++) {
            const collisionLayerData = levelData.collisionLayers[i];
            creationCollisionLayerData.push({
                name: collisionLayerData.name, 
                layerId: collisionLayerData.layerId, 
                collisionColor: collisionLayerData.collisionColor
            })
        }

        let createdLevel = new Level(levelData.width, levelData.height, levelData.name, creationCollisionLayerData, creationLayerData, levelData.backgroundColor);


        //Load the world values to the layers
        for (let i = 0; i < levelData.layers.length; i++) {
            const layerData = levelData.layers[i];
            if(layerData.type == "ARRAY_TYPE_LAYER"){
                layerData.world.forEach((value, index) => {
                    createdLevel.layers[i].world[index] = value; 
                });
            }else if(layerData.type == "DYNAMIC_TYPE_LAYER"){
                layerData.world.forEach((value, index) => {
                    createdLevel.layers[i].world[index] = value; 
                });
            }else{
                //Layer does not exist so nothing needs to be done
            }
        }

        console.log(createdLevel);

        //Load the collision values to the collision layers
        for (let i = 0; i < levelData.collisionLayers.length; i++) {
            const collisionLayerData = levelData.collisionLayers[i];
            collisionLayerData.staticCollisionArray.forEach((value, index)=>{
                createdLevel.collisionLayers[i].staticCollision[index] = value;
            });
        }
        

        this.levels.push(
            createdLevel
        );
    }

    createSaveData() {
        let levelSaveData = [];
        for (let i = 0; i < this.levels.length; i++) {
            levelSaveData.push(this.levels[i].createSaveData());
        }
        return levelSaveData;
    }
}