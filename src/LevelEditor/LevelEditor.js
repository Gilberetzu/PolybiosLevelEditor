import SubscriptionManager from "../SubscriptionManager/SubscriptionManager";
import EditorTools from "./EditorTools";

import ArrayTypeLayerEditor from "./ArrayLayerEditor/ArrayTypeLayerEditor";
import CollisionLayerEditor from "./CollisionLayerEditor/CollisionLayerEditor";

import ArrayTypeLayer from "../Level/Layers/ArrayTypeLayer";
import DynamicTypeLayer from "../Level/Layers/DynamicTypeLayer";

const STATE_NONE = -1;

const createPossibleState = (label, value) => {
    return {
        label: label,
        value: value
    }
}

export default class LevelEditor {
    constructor(pixiApp, spriteCollection, levelCollection) {
        this.editorTools = new EditorTools();

        this.subscriptionManager = new SubscriptionManager();

        this.pixiApp = pixiApp;
        this.spriteCollection = spriteCollection;
        this.levelCollection = levelCollection;

        this.state = STATE_NONE;
        this.possibleStates = [];

        this.levelCollection.subscriptionManager.subscribe("levelEditorUpdate", this.levelSelectionUpdate.bind(this));

        this.currentEditor = null;
    }

    levelSelectionUpdate(TYPE) {
        if (TYPE == "LEVEL_SELECTED") {
            this.state = STATE_NONE;

            this.possibleStates = [
                {
                    label: "RENDERING",
                    value: "R"
                }
            ];

            const selectedLevel = this.levelCollection.getSelectedLevel();

            const collisionLayers = selectedLevel.collisionLayers;
            for (let i = 0; i < collisionLayers.length; i++) {
                const cLayer = collisionLayers[i];
                this.possibleStates.push(createPossibleState(cLayer.name, `C${i}`));
            }

            for (let i = 0; i < selectedLevel.layers.length; i++) {
                const layer = selectedLevel.layers[i];
                if (layer != null) {
                    this.possibleStates.push(createPossibleState(`Layer ${i + 1}`, `L${i}`));
                }
            }

            this.subscriptionManager.callSubscribedCallback("POSSIBLE_STATES_CHANGED");

            this.destroyCurrentEditor();
        }
    }

    setState(newState) {
        this.state = newState;

        this.destroyCurrentEditor();

        if (this.state.value[0] == "R") {
            throw new Error("There is no renderer available yet");
        } else if (this.state.value[0] == "L") {
            const layerIndex = parseInt(this.state.value[1]);
            const selectedLevel = this.levelCollection.getSelectedLevel();
            const selectedLayer = selectedLevel.layers[layerIndex];

            if (selectedLayer) {
                if (selectedLayer instanceof ArrayTypeLayer) {
                    this.currentEditor = new ArrayTypeLayerEditor(this.spriteCollection, this.levelCollection, this.pixiApp, layerIndex, this.editorTools);
                } else if (selectedLayer instanceof DynamicTypeLayer) {
                    throw new Error("There is no editor for the dynamic layer type");
                }
            } else {
                throw new Error("The selected layer does not exist");
            }
        } else if (this.state.value[0] == "C"){
            const collisionLayerIndex = parseInt(this.state.value[1]);
            this.currentEditor = new CollisionLayerEditor(this.spriteCollection, this.levelCollection, this.pixiApp, collisionLayerIndex, this.editorTools);
        }

        this.subscriptionManager.callSubscribedCallback("STATE_CHANGED");
    }

    destroyCurrentEditor() {
        if (this.currentEditor) {
            if (this.currentEditor.destroy) {
                this.currentEditor.destroy();
            }
        }
    }
}