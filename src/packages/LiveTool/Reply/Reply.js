let isReplyOn = false;
let replyWordList = {};
let isReplyCD = false;
let replyCd = 0;
function initPkg_LiveTool_Reply() {
    LiveTool_Reply_insertDom();
    LiveTool_Reply_insertFunc();
    initPkg_Reply_Set();
}

function LiveTool_Reply_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='reply__title'>关键词回复</span>
            <span id='reply__export'>导出</span>
            <span id='reply__import'>导入</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="reply__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="reply__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='reply__panel'>
            <select id='reply__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="reply__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="reply__del" value="删除"/>
            <label style="margin-left:5px">CD：<input id="reply__time" type="text" placeholder="秒" /></label>
            <div class="reply__option">
                <label>词：<input id="reply__word" type="text" placeholder="re(式)=结果"/></label>
                <label>回复：<input id="reply__reply" type="text" placeholder="<id>用户名 <txt>弹幕"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Reply_insertFunc() {
    document.getElementById("reply__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(replyWordList));
        showMessage("【关键词回复】导出完毕，已复制到剪贴板", "success");
    });

    document.getElementById("reply__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("reply__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    replyWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in replyWordList) {
                        if (replyWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Reply();
                }
                showMessage("【关键词回复】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

    document.getElementById("reply__switch").addEventListener("click", () => {
        replyCd = String(document.getElementById("reply__time").value) || 0;
        let ischecked = document.getElementById("reply__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isReplyOn = true;
		} else{
            // 关闭关键词禁言
            isReplyOn = false;
        }
        saveData_isReply();
        saveData_ReplyCd();
    });
    document.getElementById("reply__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("reply__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
                document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("enter__panel")[0].style.display == "block") {
				document.getElementsByClassName("enter__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("vote__panel")[0].style.display == "block") {
				document.getElementsByClassName("vote__panel")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("reply__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let word = this.options[this.selectedIndex].text;
        let reply = replyWordList[word].reply;
        document.getElementById("reply__word").value = word;
        document.getElementById("reply__reply").value = reply;
    };

    document.getElementById("reply__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("reply__select");
        let word = document.getElementById("reply__word").value;
        let reply = document.getElementById("reply__reply").value;

        if (word == "") {
            return;
        }
        // 构造json并添加json
        replyWordList[word] = {
            reply: reply,
        }

        // 添加到select中去
        select_wordList.options.add(new Option(word, ""));

        saveData_Reply();
    });

    document.getElementById("reply__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("reply__select");
        let word = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete replyWordList[word];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveData_Reply();
    });

}


function saveData_Reply() {
	let data = replyWordList;
	localStorage.setItem("ExSave_Reply", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_ReplyCd() {
	let data = document.getElementById("reply__time").value;
	localStorage.setItem("ExSave_ReplyCd", data); // 存储弹幕列表
}

function saveData_isReply() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isReply");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isReplyOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isReply", JSON.stringify(data)); // 存储弹幕列表
}

function initPkg_Reply_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Reply");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        replyWordList = retJson;
        let select_wordList = document.getElementById("reply__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
    
    ret = localStorage.getItem("ExSave_isReply");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isReplyOn = false;
        } else {
            isReplyOn = true;
        }
        document.getElementById("reply__switch").checked = isReplyOn;
	} else {
        isReplyOn = false;
        document.getElementById("reply__switch").checked = isReplyOn;
    }

    ret = localStorage.getItem("ExSave_ReplyCd");
	
	if (ret != null) {
        document.getElementById("reply__time").value = ret;
	}
    
}

function initPkg_LiveTool_Reply_Handle(text) {
    if (isReplyOn == false) {
        return;
    }
    if (getType(text) == "chatmsg") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let txt = getStrMiddle(text, "txt@=", "/");
        let isConform = false;
        for (let key in replyWordList) {
            if (key == "") {
                continue;
            }
            if (key.indexOf("re(") != -1) {
                // 正则
                let regStr = getStrMiddle(key, "re(", ")=");
                let strArr = key.split("=")
                if (strArr.length > 1) {
                    let str = strArr[1];
                    let regObj = new RegExp(regStr, "g");
                    let result = regObj.exec(txt);
                    if (result.length > 0) {
                        if (result[0] == str) {
                            isConform = true;
                        } else {
                            isConform = false;
                        }
                    }
                }
            } else {
                if (String(txt).indexOf(key) != -1) {
                    isConform = true;
                } else {
                    isConform = false
                }
            }
            if (isConform == true) {
                let reply = replyWordList[key].reply;
                reply = String(reply).replace(/<id>/g, nn);
                reply = String(reply).replace(/<txt>/g, txt);
                if (isReplyCD == false) {
                    sendBarrage(reply);
                    // 设置CD
                    if (replyCd > 0) {
                        isReplyCD = true;
                        setTimeout(() => {
                            isReplyCD = false;
                        }, replyCd * 1000);
                    }
                }
                break;
            }
        }
    }
    
}

