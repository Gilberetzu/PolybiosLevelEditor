const fs = require('fs');
const path = require('path');

import * as PIXI from "pixi.js";
import { LoadTexture } from "../SpriteManager/TextureLoader";
import LevelEditor from "../LevelEditor/LevelEditor";
import TextureMetaData from "../SpriteManager/TextureMetaData";
import SpriteCollection from "../SpriteManager/SpriteCollection";
import LevelCollection from "../Level/LevelCollection";
import hexColors from "../components/Colors/ColorSetup";

export default class ProjectManager {
    constructor() {
        this.spriteCollection = new SpriteCollection();
        this.levelCollection = new LevelCollection();
        this.projectPath = "";
        this.name = "";

        PIXI.settings.ROUND_PIXELS = true;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this.pixiApp = new PIXI.Application({
            width: window.innerWidth - 15,
            height: window.innerHeight - 15,
            resolution: window.devicePixelRatio || 1,
            backgroundColor: hexColors.pixiAppBgColor,
            antialias: false,
        });

        this.levelEditor = new LevelEditor(this.pixiApp, this.spriteCollection, this.levelCollection);
    }



    createSprites(importedTextures) {
        for (let i = 0; i < importedTextures.length; i++) {
            const importedTexture = importedTextures[i];
            this.spriteCollection.addSprite(
                importedTexture.texture,
                importedTexture.importData,
                importedTexture.imageURL
            );
        }
    }

    loadSprites(projectSpriteData){
        let texturesMetaData = [];

        for (let i = 0; i < projectSpriteData.length; i++) {
            const spriteData = projectSpriteData[i];

            if (spriteData.type == "Sprite") {
                texturesMetaData.push(
                    new TextureMetaData(
                        spriteData.path,
                        spriteData.name,
                        spriteData.size
                    )
                );

            } else if (spriteData.type == "SpriteCollection") {
                const spriteFileNames = fs.readdirSync(spriteData.path);

                for (let i = 0; i < spriteFileNames.length; i++) {
                    const fileName = spriteFileNames[i];
                    const spritePath = path.join(spriteData.path, fileName);
                    const spriteName = `${spriteData.name}_${i}`;

                    texturesMetaData.push(
                        new TextureMetaData(
                            spritePath,
                            spriteName,
                            spriteData.size
                        )
                    );
                }

            } else {
                throw new Error("Sprite type is not recognized")
            }
        }

        LoadTexture(
            texturesMetaData, 
            this.pixiApp.loader, 
            this.createSprites.bind(this)
        );
    }

    loadProject(projectConfigPath) {
        this.projectPath = projectConfigPath;
        const projectData = JSON.parse(fs.readFileSync(this.projectPath).toString());

        this.name = projectData.name;

        if(projectData.levels){
            for (let i = 0; i < projectData.levels.length; i++) {
                const level = projectData.levels[i];
                this.levelCollection.addLevelFromSaveData(level)
            }
        }

        this.loadSprites(projectData.sprites);
    }

    save(){
        let projectData = JSON.parse(fs.readFileSync(this.projectPath).toString());
        projectData.levels = this.levelCollection.createSaveData();

        fs.writeFileSync(this.projectPath, JSON.stringify(projectData));
    }
}