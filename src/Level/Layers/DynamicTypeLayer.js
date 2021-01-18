export default class DynamicTypeLayer{
    constructor(transparentcolor){
        this.transparentcolor = transparentcolor;
        this.world = [];
    }

    createSaveData(){
        return {
            type: "DYNAMIC_TYPE_LAYER",
            world: this.world
        }
    }
}