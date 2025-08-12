let isGiftOn = false;
let giftWordList = {};
function initPkg_LiveTool_Gift() {
    LiveTool_Gift_insertDom();
    LiveTool_Gift_insertFunc();
    initPkg_Gift_Set();
}

function LiveTool_Gift_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='gift__title'>自动谢礼物</span>
            <span id='gift__export'>导出</span>
            <span id='gift__import'>导入</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="gift__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="gift__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='gift__panel'>
            <select id='gift__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="gift__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="gift__del" value="删除"/>
            <input style="width:64px;margin-left:10px;" type="button" id="gift__template" value="生成模板"/>
            <div class="gift__option">
                <label><a id="reply__show_gid" style="color:blue;" href="javascript:void(0);">礼物id：</a><input id="gift__giftId" type="text"/></label>
                <label>回复：<input id="gift__reply" type="text" placeholder="<id>=用户名 <cnt>个数"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Gift_insertFunc() {
    document.getElementById("reply__show_gid").addEventListener("click", () => {
        console.log(`
背包礼物：http://webconf.douyucdn.cn/resource/common/prop_gift_list/prop_gift_config.json
鱼翅礼物：http://open.douyucdn.cn/api/RoomApi/room/4042402
`);
        showMessage("请按F12到控制台(console)查看礼物id", "success");
    });
    document.getElementById("gift__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("gift__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isGiftOn = true;
		} else{
            // 关闭关键词禁言
            isGiftOn = false;
        }
        saveData_isGift();

    });
    document.getElementById("gift__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("gift__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
                document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("enter__panel")[0].style.display == "block") {
				document.getElementsByClassName("enter__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("vote__panel")[0].style.display == "block") {
				document.getElementsByClassName("vote__panel")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("gift__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let giftId = this.options[this.selectedIndex].text;
        let reply = giftWordList[giftId].reply;
        document.getElementById("gift__giftId").value = giftId;
        document.getElementById("gift__reply").value = reply;
    };

    document.getElementById("gift__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("gift__select");
        let giftId = document.getElementById("gift__giftId").value;
        let reply = document.getElementById("gift__reply").value;

        if (giftId == "") {
            return;
        }
        // 构造json并添加json
        giftWordList[giftId] = {
            reply: reply,
        }

        // 添加到select中去
        select_wordList.options.add(new Option(giftId, ""));

        saveData_Gift();
    });

    document.getElementById("gift__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("gift__select");
        let giftId = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete giftWordList[giftId];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveData_Gift();
    });

    document.getElementById("gift__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(giftWordList));
        showMessage("【自动谢礼物】导出完毕，已复制到剪贴板", "success");
    });

    document.getElementById("gift__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("gift__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    giftWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in giftWordList) {
                        if (giftWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Gift();
                }
                showMessage("【自动谢礼物】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

    document.getElementById("gift__template").addEventListener("click", () => {
        setAllGiftTemplate();
    })
}


function saveData_Gift() {
	let data = giftWordList;
	localStorage.setItem("ExSave_Gift", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isGift() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isGift");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isGiftOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
    
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isGift", JSON.stringify(data)); // 存储弹幕列表
}

function initPkg_Gift_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Gift");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        giftWordList = retJson;
        let select_wordList = document.getElementById("gift__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
    
    ret = localStorage.getItem("ExSave_isGift");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isGiftOn = false;
        } else {
            isGiftOn = true;
        }
        document.getElementById("gift__switch").checked = isGiftOn;
	} else {
        isGiftOn = false;
        document.getElementById("gift__switch").checked = isGiftOn;
    }
}

function initPkg_LiveTool_Gift_Handle(text) {
    if (isGiftOn == false) {
        return;
    }
    let typeName = getType(text);
    if (typeName === "dgb") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let gfid = getStrMiddle(text, "gfid@=", "/");
        let gfcnt = getStrMiddle(text, "gfcnt@=", "/");
        if (gfid in giftWordList) {
            let reply = giftWordList[gfid].reply;
            reply = String(reply).replace(/<id>/g, nn);
            reply = String(reply).replace(/<cnt>/g, gfcnt);
            sendBarrage(reply);
        }
    } else if (typeName === "odfbc" || typeName === "rndfbc") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nick@=", "/");
        let gfid = typeName === "odfbc" ? "开通钻粉" : "续费钻粉";
        let gfcnt = "1";
        if (gfid in giftWordList) {
            let reply = giftWordList[gfid].reply;
            reply = String(reply).replace(/<id>/g, nn);
            reply = String(reply).replace(/<cnt>/g, gfcnt);
            sendBarrage(reply);
        }
    }
}

async function setAllGiftTemplate() {
    let ret = {};
    let roomGiftObj = {};
    let roomGift = await getRoomGiftTemplate();
    for (let i = 0; i < roomGift.data.gift.length; i++) {
        let item = roomGift.data.gift[i];
        roomGiftObj[item.id] = {
            reply: `感谢<id>赠送的${item.name}x<cnt>`
        };
    }
    let bagGift = await getBagGiftTemplate();
    let bagGiftObj = {};
    bagGift = bagGift.substring(0, bagGift.length - 2);
    bagGift = bagGift.replace("DYConfigCallback(", "");
    bagGift = JSON.parse(bagGift || "{}") || {};
    for (const key in bagGift.data) {
        bagGiftObj[key] = {
            reply: `感谢<id>赠送的${bagGift.data[key].name}x<cnt>`
        };
    }

    let diamondObj = {
        "开通钻粉": {
            reply: `感谢<id>开通钻粉`,
        },
        "续费钻粉": {
            reply: `感谢<id>续费钻粉`,
        },
    }
    
    ret = {...roomGiftObj, ...bagGiftObj, ...diamondObj};
    GM_setClipboard(JSON.stringify(ret));
    showMessage("【自动谢礼物】礼物模板生成完毕，已复制到剪贴板，可直接导入", "success");
}

function getRoomGiftTemplate() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://open.douyucdn.cn/api/RoomApi/room/" + rid,
            responseType: "json",
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function getBagGiftTemplate() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://webconf.douyucdn.cn/resource/common/prop_gift_list/prop_gift_config.json",
            responseType: "text",
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}