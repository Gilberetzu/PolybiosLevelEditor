import StaticCollisionArray from "./StaticCollisionArray";
import ArrayTypeLayer from "./Layers/ArrayTypeLayer";
import DynamicTypeLayer from "./Layers/DynamicTypeLayer";

export default class Level {
    constructor(width, height, name, createCollision, layers) {
        this.name = name;

        if (width % 4 != 0) {
            throw new Error("Selected width is not a multiple of 4");
        }
        if (height % 4 != 0) {
            throw new Error("Selected height is not a multiple of 4");
        }

        this.width = width;
        this.height = height;

        if (createCollision) {
            this.collisionArray = new StaticCollisionArray(this.width, this.height);
        } else {
            this.collisionArray = null;
        }

        this.layers = new Array(4);

        console.log(layers);

        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if(layer){
                if (layer.type == "ARRAY_8x8") {
                    this.layers[i] = new ArrayTypeLayer(this.width, this.height, "8x8", layer.useParalax, layer.paralaxShiftAmount);
                } else if (layer.type == "ARRAY_16x16") {
                    this.layers[i] = new ArrayTypeLayer(this.width, this.height, "16x16", layer.useParalax, layer.paralaxShiftAmount);
                } else if (layer.type == "DYNAMIC") {
                    this.layers[i] = new DynamicTypeLayer();
                }
            }else{
                this.layers[i] = null;
            }
        }
    }
}

export function loadLevelFromFiles(filePath) {
    throw new Error("Function not implemented");
}