const baseColors = [
    "132935",
    "2E4A5F",
    "47E285",
    "1B3A4A",
    "3F6581",
    "DAEFFE"
]

const iconColors = [
    "E24747"
]

const Colors = {
    //UI colors
    editorBgColor: baseColors[0],
    pixiAppBgColor: baseColors[1],
    editorIconColor: baseColors[2],
    editorBg2Color: baseColors[3],
    editorButtonHoverBG: baseColors[4],
    editorUIText: baseColors[5],
    redColor: iconColors[0],
    selectionBoxColor: baseColors[2]
}

function createColorHex(){
    let cHex = {};
    Object.keys(Colors).forEach(cName => {
        cHex[cName] = parseInt("0x"+ Colors[cName]);
    })
    return cHex;
}

const ColorsHex = createColorHex();

export function setGlobalColors() {
    Object.keys(Colors).forEach(cName => {
        document.documentElement.style.setProperty("--" + cName, '#' + Colors[cName]);
    })
}

export default ColorsHex;