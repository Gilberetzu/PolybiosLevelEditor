import * as PIXI from "pixi.js";

import ToolToggle from "./ToolToggle";

import ArrayTypeLayer from "../Level/Layers/ArrayTypeLayer";
import DynamicTypeLayer from "../Level/Layers/DynamicTypeLayer";

import ArrayTypeLayerRenderer from "./Renderers/ArrayTypeLayerRenderer";
import BackgroundRenderer from "./Renderers/Background";

export default class LayerEditor {
    constructor(spriteCollection, levelCollection, pixiApp, layerIndex) {
        this.destroyed = false;

        this.pixiApp = pixiApp;
        this.spriteCollection = spriteCollection;
        this.levelCollection = levelCollection;

        this.layerContainer = new PIXI.Container();
        this.globalContainer = new PIXI.Container();
        this.layerRenderers = [];

        this.bgRenderer = null;
        this.createBackgroundRenderer();
        this.createLayerRenderers(layerIndex);

        this.pixiApp.stage.addChild(this.globalContainer);
    }

    createBackgroundRenderer() {
        const selectedLevel = this.levelCollection.getSelectedLevel();
        this.bgRenderer = new BackgroundRenderer(this.globalContainer, selectedLevel.backgroundColor, selectedLevel.width, selectedLevel.height);
    }

    createLayerRenderers(ignoredLayerIndex) {
        if (isNaN(ignoredLayerIndex)) {
            throw new Error("Layer of the current editalbe index was not provided")
        }
        const selectedLevel = this.levelCollection.getSelectedLevel();
        let layerContainerAdded = false;

        for (let i = 0; i < 4; i++) {
            if (ignoredLayerIndex == i) {
                this.globalContainer.addChild(this.layerContainer);
                this.layerRenderers.push(null);
                layerContainerAdded = true;
            } else {
                const layer = selectedLevel.layers[i];
                if (layer) {
                    if (layer instanceof ArrayTypeLayer) {
                        this.layerRenderers.push(
                            new ArrayTypeLayerRenderer(this.globalContainer, selectedLevel, i, this.spriteCollection, 0.5)
                        );
                    } else if (layer instanceof DynamicTypeLayer) {
                        //TODO: ADD THE DYNAMIC LAYER RENDERER
                        this.layerRenderers.push(
                            null
                        );
                    } else {
                        throw new Error(`The layer type of the current layer (${i + 1}) is currently not implemented`);
                    }
                } else {
                    this.layerRenderers.push(null)
                }
            }
        }

        if (!layerContainerAdded) {
            this.globalContainer.addChild(this.layerContainer);
        }
    }

    createBackgroundRendererToggles() {
        let tools = [];

        let bgAction = (() => {
            return this.bgRenderer.toggle();
        }).bind(this);

        tools.push(
            new ToolToggle("Bg", "renderBackground", bgAction, true)
        );

        return tools;
    }

    createLayerRendererToggles() {
        let tools = [];

        this.layerRenderers.forEach((renderer, index) => {
            if (renderer) {
                const toggleRenderer = () => {
                    return renderer.toggle();
                };
                tools.push(new ToolToggle(`L${index + 1}`, `Layer${index + 1}`, toggleRenderer, true));
            }
        });

        return tools;
    }

    destroy() {
        if (!this.destroyed) {
            this.bgRenderer.destroy();
            for (let i = 0; i < this.layerRenderers.length; i++) {
                if (this.layerRenderers[i]) {
                    this.layerRenderers[i].destroy();
                }
            }
            this.pixiApp.stage.removeChild(this.globalContainer);
            this.globalContainer.destroy();
        }
        this.destroyed = true;
    }
}