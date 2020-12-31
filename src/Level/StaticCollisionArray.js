export default class StaticCollisionArray{
    constructor(levelWidth, levelHeight){
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
        
        this.staticCollision = new Array((levelWidth/4)*(levelHeight/4));
    }
}