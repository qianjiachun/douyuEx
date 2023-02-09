let isAiReportOn = false;
let aiName = "小研";

function initPkg_LiveTool_AiReport() {
    LiveTool_AiReport_insertDom();
    LiveTool_AiReport_insertFunc();
    initPkg_AiReport_Set();
}

function LiveTool_AiReport_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='aireport__title'>AI闲聊</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="aireport__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="aireport__switch"></label>
            </div>
        </div>
    `;
    a.innerHTML = cell;

    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function LiveTool_AiReport_insertFunc() {
    document.getElementById("aireport__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("aireport__switch").checked;
        if (ischecked == true) {
            // 开启
            isAiReportOn = true;
        } else {
            // 关闭
            isAiReportOn = false;
        }
        saveData_isAiReportOn();
    });
}

function initPkg_AiReport_Set() {
    // 设置初始化
    let ret = localStorage.getItem("ExSave_isAiReport");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isAiReportOn = false;
        } else {
            isAiReportOn = true;
        }
        document.getElementById("reply__switch").checked = isAiReportOn;
    } else {
        isAiReportOn = false;
        document.getElementById("reply__switch").checked = isAiReportOn;
    }
}

function saveData_isAiReportOn() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isAiReport");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isAiReportOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
    let data = {
        rooms: ridArr,
    };
    localStorage.setItem("ExSave_isAiReport", JSON.stringify(data));
}

function initPkg_LiveTool_AiReport_handle(text) {
    if (isAiReportOn !== true) return;

    if (getType(text) == "chatmsg") {
        let uid = getStrMiddle(text, "uid@=", "/");
        let nn = getStrMiddle(text, "nn@=", "/");
        let txt = getStrMiddle(text, "txt@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }

        if (!check_chat_pass(txt)) return;

        // 切割@，去掉无用内容尽量保证能自己的回答完整
        if (txt.split("@").length >= 1) { txt = String(txt.split("@")[0]).trim(); }
        getChatBotTxt(txt).then(ret => {
            console.log("【chatbot】AI问答：", txt, ret);
            if (ret.data != null) {
                let reply = ret.data.info.text;
                reply = String(reply).replace(/小思/g, aiName);
                reply += " @" + nn;
                sendBarrage(reply);
            } else {
                console.log("【chatbot】" + ret.msg);
            }
        }).catch(err => {
            console.log("【chatbot】请求失败!", err);
        })
    }
}

function check_chat_pass(txt) {
    if (String(txt).indexOf("@A" + aiName) !== -1) {
        return true;
    }
    // 如果不是@指令，则有一定的概率自动答复介入话题
    if (Date.now() % 10 === 0) {
        return true;
    }

    return false;
}

async function getChatBotTxt(msg) {
    txt = String(msg).replaceAll("@A" + aiName, '小思');
    return fetch("https://api.ownthink.com/bot?spoken=" + msg, {
        method: 'GET',
    }).then(res => {
        return res.json();
    })
}