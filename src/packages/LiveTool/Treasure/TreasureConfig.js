let treasureEnabled = false;

export function getTreasureEnabled() {
    return treasureEnabled;
}

export function setTreasureEnabled(enabled) {
    treasureEnabled = enabled;
}

export function getTreasureDelay() {
    let ret = document.getElementById("extool__treasure_delay").value;
    return Number(ret);
}
