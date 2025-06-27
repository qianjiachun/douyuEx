let isMuteOn = false;
// let canMute;
let muteWordList = {};
let muteIdList = {};
let muteIdListShow = [];
function initPkg_LiveTool_Mute() {
    // if (rid == "4042402") {
    //     return;
    // }
    LiveTool_Mute_insertDom();
    LiveTool_Mute_insertFunc();
    initPkg_Mute_Set();
}

function LiveTool_Mute_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='mute__title'>关键词禁言</span>
            <span id='mute__idlist'>名单</span>
            <span id='mute__export'>导出</span>
            <span id='mute__import'>导入</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mute__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="mute__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='mute__panel'>
            <select id='mute__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="mute__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="mute__del" value="删除"/>
            <input style="width:65px;margin-left:10px;" type="button" id="mute__delmute" value="一键解禁"/>
            <div class="mute__option">
                <label>词：<input id="mute__word" type="text" placeholder="re(式)=结果"/></label>
                <label>次数：<input id="mute__count" type="number" value="5"/></label>
                <label>时间：
                    <select id='mute__time'>
                        <option value="1">1分钟</option>
                        <option value="10">10分钟</option>
                        <option value="30">30分钟</option>
                        <option value="60">1小时</option>
                        <option value="480">8小时</option>
                        <option value="1440">1天</option>
                        <option value="4320">3天</option>
                        <option value="10080">7天</option>
                        <option value="43200">30天</option>
                        <option value="259200">180天</option>
                        <option value="518400">360天</option>
                    </select>
                </label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Mute_insertFunc() {
    document.getElementById("mute__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(muteWordList));
        showMessage("【关键词禁言】导出完毕，已复制到剪贴板", "success");
    });
    document.getElementById("mute__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("mute__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    muteWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in muteWordList) {
                        if (muteWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Mute();
                }
                showMessage("【关键词禁言】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

    document.getElementById("mute__idlist").addEventListener("click", () => {
        if (muteIdListShow.length == 0) {
            showMessage("暂无禁言名单", "warning");
            return;
        }
        console.log("【禁言名单】");
        for (let i = 0; i < muteIdListShow.length; i++) {
            let item = muteIdListShow[i];
                console.log("id:【" + item.id + "】 | uid:" + item.uid + " | 弹幕:" + item.barrage + " | 检测次数:" + item.count + " | 禁言时长:" + item.time + "分钟 | 禁言时间:" + item.ts);
        }
        showMessage("禁言名单已经输出在控制台，请按F12查看", "success");
    });

    document.getElementById("mute__delmute").addEventListener("click", async () => {
        if (muteIdListShow.length == 0) {
            showMessage("暂无禁言名单", "warning");
            return;
        }
        if (confirm("是否解禁名单上所有的id？") != true) {
            return;
        }
        for (let i = 0; i < muteIdListShow.length; i++) {
            let item = muteIdListShow[i];
            let tmp = await deleteMuteUser(rid, item.uid);
        }
        showMessage("解除禁言完毕", "success");
    });

    document.getElementById("mute__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("mute__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isMuteOn = true;
		} else{
            // 关闭关键词禁言
            isMuteOn = false;
        }
        saveData_isMute();

    });
    document.getElementById("mute__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("mute__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
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
    
    document.getElementById("mute__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let word = this.options[this.selectedIndex].text;
        let count = muteWordList[word].count;
        let time = muteWordList[word].time;
        document.getElementById("mute__word").value = word;
        document.getElementById("mute__count").value = count;
        selectOptionByValue("mute__time", time);
    };

    document.getElementById("mute__add").addEventListener("click", () => {
        let select_time = document.getElementById("mute__time");
        let select_wordList = document.getElementById("mute__select");
        let word = document.getElementById("mute__word").value;
        let count = document.getElementById("mute__count").value;
        let time = select_time.options[select_time.selectedIndex].value

        if (word == "") {
            return;
        }

        // 构造json并添加json
        muteWordList[word] = {
            count: count,
            time: time,
        }

        // 添加到select中去
        select_wordList.options.add(new Option(word, ""));

        saveData_Mute();
    });

    document.getElementById("mute__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("mute__select");
        let word = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete muteWordList[word];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveData_Mute();
    });

}

function saveData_Mute() {
	let data = muteWordList;
	localStorage.setItem("ExSave_Mute", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isMute() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isMute");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isMuteOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isMute", JSON.stringify(data)); // 存储弹幕列表
}

async function initPkg_Mute_Set() {
    // canMute = await getRoomAdminStatus();
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Mute");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        muteWordList = retJson;
        let select_wordList = document.getElementById("mute__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
    
    ret = localStorage.getItem("ExSave_isMute");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isMuteOn = false;
        } else {
            isMuteOn = true;
        }
        document.getElementById("mute__switch").checked = isMuteOn;
	} else {
        isMuteOn = false;
        document.getElementById("mute__switch").checked = isMuteOn;
    }
}

async function initPkg_LiveTool_Mute_Handle(text) {
    // if (canMute != true) {
    //     return;
    // }
    if (isMuteOn == false) {
        return;
    }
    // if (rid == "4042402") {
    //     return;
    // }
    if (getType(text) == "chatmsg") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let txt = getStrMiddle(text, "txt@=", "/");
        let isConform = false;
        for (let key in muteWordList) {
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
                if (String(txt).indexOf(key) == -1) {
                    // 没找到
                    isConform = false;
                } else {
                    isConform = true;
                }
            }
            if (isConform == true) {
                let maxCount = muteWordList[key].count;
                let time = muteWordList[key].time;
                if (muteIdList.hasOwnProperty(nn)) {
                    let nextCount = Number(muteIdList[nn].count) + 1;
                    if (nextCount >= maxCount) {
                        let tmp = await addMuteUser(rid, nn, time);
                        showMessageWindow("禁言信息", "【" + nn + "】已被禁言" + time + "分钟" + "\n弹幕：" + txt, () => {});
                        let obj = {
                            id: nn,
                            uid: uid,
                            barrage: txt,
                            time: time,
                            count: 1,
                            ts: String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date()))
                        };
                        muteIdListShow.push(obj);
                        muteIdList[nn].count = 0;
                    } else {
                        muteIdList[nn].count = String(nextCount);
                    }
                } else {
                    let nextCount = 1;
                    if (nextCount >= maxCount) {
                        let tmp = await addMuteUser(rid, nn, time);
                        showMessageWindow("禁言信息", "【" + nn + "】已被禁言" + time + "分钟" + "\n弹幕：" + txt, () => {});
                        let obj = {
                            id: nn,
                            uid: uid,
                            barrage: txt,
                            time: time,
                            count: 1,
                            ts: String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date()))
                        };
                        muteIdListShow.push(obj);
                    } else {
                        muteIdList[nn] = {
                            uid: uid,
                            count: 1,
                        }
                    }
                }
                break;
            }
        }
    }
    
}

function addMuteUser(roomid, name, ban_time) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/room/roomSetting/addMuteUser", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'ban_nickname=' + name + '&room_id=' + roomid + '&ban_time=' + ban_time + '&reason=7'
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function deleteMuteUser(roomid, uid) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/room/roomSetting/deleteMuteUser", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'room_id=' + roomid + '&uid=' + uid
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function getRoomAdminStatus() {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/firepower/apinc/roomAdmin/getStatus?rid=' + rid,{
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include'
        }).then(res => {
            return res.json();
        }).then(ret => {
            let result = false;
            if (ret.error == "0") {
                if (ret.data.has == "1") {
                    result = true;
                } else {
                    result = false;
                }
            } else {
                result = false;
            }
            resolve(result);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    });
}