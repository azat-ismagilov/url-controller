import {
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow
} from "@mui/material/colors";

const COLOR_VALUE = 300;

const COLOR_VARIANTS = [
    amber[COLOR_VALUE],
    blue[COLOR_VALUE],
    blueGrey[COLOR_VALUE],
    brown[COLOR_VALUE],
    cyan[COLOR_VALUE],
    deepOrange[COLOR_VALUE],
    deepPurple[COLOR_VALUE],
    green[COLOR_VALUE],
    grey[COLOR_VALUE],
    indigo[COLOR_VALUE],
    lightBlue[COLOR_VALUE],
    lightGreen[COLOR_VALUE],
    lime[COLOR_VALUE],
    orange[COLOR_VALUE],
    pink[COLOR_VALUE],
    purple[COLOR_VALUE],
    red[COLOR_VALUE],
    teal[COLOR_VALUE],
    yellow[COLOR_VALUE]
];

function limitedRandom(seed: string, maxValue: number) {
    let hash = 5381;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (((hash << 5) + hash) + char) % maxValue;
    }
    return hash;
}

export function pickColor(id: string) {
    const index = limitedRandom(id, COLOR_VARIANTS.length);
    return COLOR_VARIANTS[index];
}
