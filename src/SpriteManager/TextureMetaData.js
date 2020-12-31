export default class TextureMetaData {
    constructor(path, name, size){
        if(!path){
            throw new Error("Texture path was not provided");
        }
        if(!name){
            throw new Error("Texture name was not provided");
        }
        if(!size){
            throw new Error("Texture size was not provided");
        }
        this.path = path;
        this.name = name;
        this.size = size;
    }
}