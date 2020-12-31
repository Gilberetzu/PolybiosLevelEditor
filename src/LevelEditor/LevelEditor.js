import * as PIXI from "pixi.js";
import SubscriptionManager from "../SubscriptionManager/SubscriptionManager";

import ArrayTypeLayerEditor from "./ArrayLayerEditor/ArrayTypeLayerEditor";

import ArrayTypeLayer from "../Level/Layers/ArrayTypeLayer";
import DynamicTypeLayer from "../Level/Layers/DynamicTypeLayer";

export const editorStates = {
    NONE: "NONE",
    RENDERING: "RENDERING",
    LAYER1: "LAYER1",
    LAYER2: "LAYER2",
    LAYER3: "LAYER3",
    LAYER4: "LAYER4",
    COLLISION: "COLLISION"
};

export default class LevelEditor {
    constructor(pixiApp, spriteCollection, levelCollection) {
        this.subscriptionManager = new SubscriptionManager();

        this.pixiApp = pixiApp;
        this.spriteCollection = spriteCollection;
        this.levelCollection = levelCollection;

        this.state = editorStates.NONE;
        this.possibleStates = [];

        this.levelCollection.subscriptionManager.subscribe("levelEditorUpdate", this.levelSelectionUpdate.bind(this));

        this.currentEditor = null;
    }

    levelSelectionUpdate(TYPE) {
        if (TYPE == "LEVEL_SELECTED") {
            this.state = editorStates.NONE;

            this.possibleStates = [
                editorStates.RENDERING,
            ];

            const selectedLevel = this.levelCollection.getSelectedLevel();

            if (selectedLevel.collisionArray != null) {
                this.possibleStates.push(editorStates.COLLISION);
            }

            for (let i = 0; i < selectedLevel.layers.length; i++) {
                const layer = selectedLevel.layers[i];
                if (layer != null) {
                    this.possibleStates.push(editorStates[`LAYER${i + 1}`]);
                }
            }

            this.subscriptionManager.callSubscribedCallback("POSSIBLE_STATES_CHANGED");

            this.destroyCurrentEditor();
        }
    }

    setState(newState) {
        const validStates = Object.keys(editorStates);
        let foundState = false;

        for (let i = 0; i < validStates.length; i++) {
            const state = validStates[i];
            if (state == newState) {
                foundState = true;
                break;
            }
        }

        if (!foundState) {
            throw new Error("Not a valid state");
        }

        this.state = newState;

        this.destroyCurrentEditor();

        if (this.state == editorStates.LAYER1 || 
            this.state == editorStates.LAYER2 || 
            this.state == editorStates.LAYER3 || 
            this.state == editorStates.LAYER4) {
            const layerIndex = this.state[5] - 1;

            const selectedLevel = this.levelCollection.getSelectedLevel();
            
            const selectedLayer = selectedLevel.layers[layerIndex];

            if(!selectedLayer){
                throw new Error("Selected layer does not exist");
            }

            if(selectedLayer instanceof ArrayTypeLayer){
                this.currentEditor = new ArrayTypeLayerEditor(this.spriteCollection, this.levelCollection, this.pixiApp, layerIndex);
            }else if(selectedLayer instanceof DynamicTypeLayer){
                throw new Error("There is no editor for the dynamic layer type");
            }else{
                throw new Error("There is no editor for the type of layer trying to be edited");
            }
        }else if(this.state == editorStates.RENDERING){
            throw new Error("Level rendering currently not implemented");
        }else if(this.state == editorStates.COLLISION){
            throw new Error("Level collision editor currently not implemented");
        }else{
            throw new Error("The current state is not implemented");
        }

        this.subscriptionManager.callSubscribedCallback("STATE_CHANGED");
    }

    destroyCurrentEditor(){
        if(this.currentEditor){
            if(this.currentEditor.destroy){
                this.currentEditor.destroy();
            }
        }
    }
}