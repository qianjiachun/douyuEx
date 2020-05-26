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
            <div class="gift__option">
                <label><a id="reply__show_gid" style="color:blue;" href="javascript:void(0);">礼物id：</a><input id="gift__giftId" type="text"/></label>
                <label>回复：<input id="gift__reply" type="text" placeholder="<id>会替换成用户名"/></label>
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
20005|超级火箭
20760|风暴超火
20761|风暴火箭
20004|火箭
20003|飞机
20624|魔法球
20002|办卡
20010|MVP
20727|乖乖戴口罩
20541|大气
20000|100鱼丸
20644|能量戒指
20642|能量电池
20643|能量水晶
20008|超大丸星
20728|勤洗手
20417|福袋
20542|666
20009|天秀
20001|弱鸡
20006|赞
20709|壁咚
1859|小飞碟
20626|幸福券
824|粉丝荧光棒
20624|魔法彩蛋
20621|魔法之翼
20599|星空飞机
20615|幸福摩天轮
20600|星空火箭
20614|踏青卡丁车
20618|魔法指环
20616|春意丘比特
20613|永恒钻戒
20617|爱的旅行
520|稳
193|弱鸡
192|赞
712|棒棒哒
519|呵呵
20461|车队加油卡
20596|小星星
20759|集结号角
20597|星球
20611|浪漫花束
713|辣眼睛
20620|魔法皇冠
20832|奥利给
        `);
        console.log("或访问：", "http://open.douyucdn.cn/api/RoomApi/room/" + rid , "进行查看");
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
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
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

}


function saveData_Gift() {
	let data = giftWordList;
	localStorage.setItem("ExSave_Gift", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isGift() {
	let data = {
        isGift: isGiftOn
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
        isGiftOn = retJson.isGift;
        document.getElementById("gift__switch").checked = isGiftOn;
	}
}

function initPkg_LiveTool_Gift_Handle(text) {
    if (isGiftOn == false) {
        return;
    }
    if (getType(text) == "dgb") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let gfid = getStrMiddle(text, "gfid@=", "/");
        for (let key in giftWordList) {
            if (gfid == key) {
                let reply = giftWordList[key].reply;
                reply = String(reply).replace(/<id>/g, nn);
                sendBarrage(reply);
                break;
            }
        }
    }
    
}
