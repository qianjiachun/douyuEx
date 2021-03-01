let barrageMemoryArr = [];
let barrageMemoryIndex = 0; // 当前 指向索引
function initPkg_ChatMemory() {
    initPkg_ChatMemory_Func();
}

function initPkg_ChatMemory_Func() {
    document.getElementsByClassName("ChatSend-txt")[0].addEventListener("keydown", (e) => {
        if (e.keyCode == 38) {
            // ↑
            barrageMemoryIndex = barrageMemoryIndex > 0 ? barrageMemoryIndex - 1 : barrageMemoryIndex;
            chatMemory_setBarrage();
            console.log("↑");
        } else if (e.keyCode == 40) {
            // ↓
            barrageMemoryIndex = barrageMemoryIndex < barrageMemoryArr.length - 1 ? barrageMemoryIndex + 1 : barrageMemoryIndex;
            chatMemory_setBarrage();
            console.log("↓")
        } else if (e.keyCode == 13) {
            // enter
            chatMemory_pushBarrage(getBarrageValue());
            console.log("enter")
        }
    });
    document.getElementsByClassName("ChatSend-button")[0].addEventListener("click", () => {
        // 点击弹幕发送按钮
        chatMemory_pushBarrage(getBarrageValue());
    })
}

function chatMemory_pushBarrage(txt) {
    barrageMemoryIndex = barrageMemoryArr.push(txt);
}

function chatMemory_setBarrage() {
    setBarrageValue(barrageMemoryArr[barrageMemoryIndex] || "");
}

function getBarrageValue() {
    let dom = document.getElementsByClassName("ChatSend-txt")[0];
    if (dom != undefined && dom != null) {
        return dom.value;
    }
    return "";
}
function setBarrageValue(txt) {
    let dom = document.getElementsByClassName("ChatSend-txt")[0];
    if (dom != undefined && dom != null) {
        dom.value = txt;
    }
}