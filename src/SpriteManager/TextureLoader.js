const fs = require("fs");

export function LoadTexture(texturesMetadata, appLoader, callBack) {
    let imageURLs = [];
    
    for (let i = 0; i < texturesMetadata.length; i++) {
        const texturePath = texturesMetadata[i].path;
        const textureName = texturesMetadata[i].name;
        const base64Image = fs.readFileSync(texturePath, {
            encoding: "base64",
        });
        const imgUrl = "data:image/png;base64," + base64Image;
        imageURLs.push(imgUrl);
        appLoader.add(textureName, imgUrl);
    }
    

    appLoader.load((loader, resources) => {
        let importedTextures = [];
        for (let i = 0; i < texturesMetadata.length; i++) {
            const textureName = texturesMetadata[i].name;
            importedTextures.push({
                imageURL: imageURLs[i],
                texture: resources[textureName].texture,
                importData: texturesMetadata[i]
            });
        }

        callBack(importedTextures);
    });
}