export default class ArrayTypeLayer{
    constructor(width, height, spriteSize, useParalax, paralaxShiftAmount){
        this.width = width;
        this.height = height;
        this.spriteSize = spriteSize;

        this.useParalax = useParalax;
        if(useParalax){
            this.paralaxShiftAmount = paralaxShiftAmount;
        }else{
            this.paralaxShiftAmount = 0;
        }

        if(this.spriteSize == "8x8"){
            if(this.width % 8 != 0){
                throw new Error("Width is not a multiple of the sprite size (8x8)");
            }
            if(this.height % 8 != 0){
                throw new Error("Height is not a multiple of the sprite size (8x8)");
            }
            
            this.world = new Array((width/8) * (height/8));

        }else if(this.spriteSize == "16x16"){
            if(this.width % 16 != 0){
                throw new Error(`Width is not a multiple of the sprite size (16x16), provided width: ${this.width} | mod: ${this.width % 16}`);
            }
            if(this.height % 16 != 0){
                throw new Error("Height is not a multiple of the sprite size (16x16)");
            }

            this.world = new Array((width/16) * (height/16));
        }
    }
}