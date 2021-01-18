import StaticCollisionArray from "./StaticCollisionArray";
import ArrayTypeLayer from "./Layers/ArrayTypeLayer";
import DynamicTypeLayer from "./Layers/DynamicTypeLayer";

export default class Level {
    constructor(width, height, name, collisionLayers, layers, backgroundColor) {
        this.name = name;

        this.backgroundColor = backgroundColor;

        if (width % 4 != 0) {
            throw new Error("Selected width is not a multiple of 4");
        }
        if (height % 4 != 0) {
            throw new Error("Selected height is not a multiple of 4");
        }

        this.width = width;
        this.height = height;

        this.collisionLayers = [];
        for (let index = 0; index < collisionLayers.length; index++) {
            const collLayer = collisionLayers[index];
            this.collisionLayers.push(new StaticCollisionArray(this.width, this.height, collLayer.name, collLayer.layerId, collLayer.collisionColor));
        }

        this.layers = new Array(4);

        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer) {
                if (layer.type == "ARRAY_8x8") {
                    this.layers[i] = new ArrayTypeLayer(this.width, this.height, "8x8", layer.useParalax, layer.paralaxShiftAmount, layer.transparentcolor);
                } else if (layer.type == "ARRAY_16x16") {
                    this.layers[i] = new ArrayTypeLayer(this.width, this.height, "16x16", layer.useParalax, layer.paralaxShiftAmount, layer.transparentcolor);
                } else if (layer.type == "DYNAMIC") {
                    this.layers[i] = new DynamicTypeLayer(layer.transparentcolor);
                }
            } else {
                this.layers[i] = null;
            }
        }
    }

    createSaveData() {
        let layers = [];
        for (let i = 0; i < this.layers.length; i++) {
            const currentLayer = this.layers[i];
            if(currentLayer == null){
                layers.push({
                    type: "NULL"
                });
            }else{
                layers.push(currentLayer.createSaveData());
            }
        }

        let collisionLayers = [];
        for (let i = 0; i < this.collisionLayers.length; i++) {
            const currentCollisionLayer = this.collisionLayers[i];
            collisionLayers.push(currentCollisionLayer.createSaveData())
        }

        let saveData = {
            name: this.name,
            backgroundColor: this.backgroundColor,
            width: this.width,
            height: this.height,
            collisionLayers: collisionLayers,
            layers: layers
        }

        return saveData;
    }
}

export function loadLevelFromFiles(filePath) {
    throw new Error("Function not implemented");
}