let isEnterOn = false;
let enterWordList = [];
function initPkg_LiveTool_Enter() {
    LiveTool_Enter_insertDom();
    LiveTool_Enter_insertFunc();
    initPkg_Enter_Set();
}

function LiveTool_Enter_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='enter__title'>进场欢迎</span>
            <span id='enter__export'>导出</span>
            <span id='enter__import'>导入</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="enter__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="enter__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='enter__panel'>
            <select id='enter__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="enter__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="enter__del" value="删除"/>
            <div class="enter__option">
                <label>等级≥<input id="enter__level" type="text" value="1"/></label>
                <label>当前欢迎词：<input id="enter__word" type="text" placeholder="欢迎<id>光临直播间"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Enter_insertFunc() {
    document.getElementById("enter__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(enterWordList));
        showMessage("【进场欢迎】导出完毕，已复制到剪贴板", "success");
    });

    document.getElementById("enter__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("enter__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    enterWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in enterWordList) {
                        if (enterWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Enter();
                }
                showMessage("【进场欢迎】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

    document.getElementById("enter__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("enter__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isEnterOn = true;
		} else{
            // 关闭关键词禁言
            isEnterOn = false;
        }
        saveData_isEnter();

    });
    document.getElementById("enter__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("enter__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
                document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
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
    
    document.getElementById("enter__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let word = this.options[this.selectedIndex].text;
        let level = enterWordList[word].enter;
        document.getElementById("enter__word").value = word;
        document.getElementById("enter__level").value = level;
        localStorage.setItem("ExSave_LastEnterWord", word); // 存储弹幕列表
    };

    document.getElementById("enter__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("enter__select");
        let word = document.getElementById("enter__word").value;
        let level = document.getElementById("enter__level").value;

        if (word == "") return;
        if (level == "") return;

        let isExist = false;

        for (const item of enterWordList) {
            if (Number(level) === Number(item.level)) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            showMessage("【进场欢迎】等级已存在", "error");
            return;
        }
        
        enterWordList.push({
            level,
            word
        });
        
        enterWordList.sort((a, b) => b.level - a.level);
        refreshEnterSelectOptions();
        saveData_Enter();
    });

    document.getElementById("enter__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("enter__select");
        let word = select_wordList.options[select_wordList.selectedIndex].text;
        enterWordList.splice(select_wordList.selectedIndex, 1);
        enterWordList.sort((a, b) => b.level - a.level);
        refreshEnterSelectOptions();
        saveData_Enter();
    });

}


function saveData_Enter() {
	let data = enterWordList;
    localStorage.setItem("ExSave_Enter", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isEnter() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isEnter");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isEnterOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isEnter", JSON.stringify(data)); // 存储弹幕列表
}

function refreshEnterSelectOptions() {
    let select_wordList = document.getElementById("enter__select");
    select_wordList.options.length = 0;
    for (const item of enterWordList) {
        select_wordList.options.add(new Option(`【${item.level}级】${item.word}`, ""));
    }
}

function initPkg_Enter_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Enter");
    if (ret == "") {
        return;
    }
	let select_wordList = document.getElementById("enter__select");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (!Array.isArray(retJson)) {
            retJson = [];
            saveData_Enter();
        }
        enterWordList = retJson;
		refreshEnterSelectOptions();
    }
    
    // ret = localStorage.getItem("ExSave_LastEnterWord");
    // if (ret != null) {
    //     let i = 0;
    //     for (const key in enterWordList) {
    //         if (key == ret) {
    //             select_wordList.selectedIndex = i;
    //             let level = enterWordList[ret].enter;
    //             document.getElementById("enter__word").value = ret;
    //             document.getElementById("enter__level").value = level;
    //             break;
    //         }
    //         i++;
    //     }
    // } 

    ret = localStorage.getItem("ExSave_isEnter");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isEnterOn = false;
        } else {
            isEnterOn = true;
        }
        document.getElementById("enter__switch").checked = isEnterOn;
	} else {
        isEnterOn = false;
        document.getElementById("enter__switch").checked = isEnterOn;
    }
}

function initPkg_LiveTool_Enter_Handle(text) {
    if (isEnterOn == false) {
        return;
    }
    if (getType(text) == "uenter") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let level = getStrMiddle(text, "level@=", "/");
        for (const item of enterWordList) {
            if (Number(level) >= Number(item.level)) {
                reply = String(item.word).replace(/<id>/g, nn);
                sendBarrage(reply);
                break;
            }
        }
    }
}

