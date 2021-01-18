export default class StaticCollisionArray{
    constructor(levelWidth, levelHeight, name, id, collisionColor){
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;

        this.name = name;
        this.id = id;
        this.collisionColor = collisionColor;
        
        this.staticCollision = new Array((levelWidth/4)*(levelHeight/4));
        for (let i = 0; i < this.staticCollision.length; i++) {
            this.staticCollision[i] = false;
        }
    }

    createSaveData(){
        return {
            name: this.name,
            id: this.id,
            collisionColor: this.collisionColor,
            staticCollisionArray: this.staticCollision
        }
    }
}