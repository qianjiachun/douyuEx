var isGetTreasure = false;
function initPkg_ExpandTool_Treasure() {
    ExpandTool_Treasure_insertDom();
    ExpandTool_Treasure_insertFunc();
    ExpandTool_Treasure_Set();
}


function ExpandTool_Treasure_insertDom() {
    let html = "";
    html += '<label class="ex-label"><input class="ex-checkbox" id="extool__treasure_start" type="checkbox">自动抢宝箱</label>';
    html += '<label class="ex-label ex-label-inline">延迟(抢得过快请调高)：</label><input class="ex-input" id="extool__treasure_delay" type="text" style="width:50px;text-align:center;" value="3200" />ms'
    html += '<div style="margin-top:10px"><label class="ex-label ex-label-inline">rrocr秘钥：</label><input class="ex-input" id="extool__treasure_skey" type="text" style="width:200px;text-align:center;" placeholder="填写则会自动完成宝箱领取验证"></div>';
    html += '<div><a href="https://www.rrocr.com/" target="_blank" style="color:blue" title="点击进入rrocr官网，将账号用户中心的appkey填入右边然后开启功能即可">点击进入rrocr官网，将账号用户中心的appkey填入右边然后开启功能即可</a></div>';
    html += '<div class="ex-line" style="margin:10px 0"></div>';
    let a = document.createElement("div");
    a.className = "extool__treasure";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);

}
function ExpandTool_Treasure_insertFunc() {
    document.getElementById("extool__treasure_start").addEventListener("click", function() {
        verifyFans("5189167", 9).then(r => { // 请尊重作者劳动成果，在此感谢
            if (r == true) {
                let ischecked = document.getElementById("extool__treasure_start").checked;
                if (ischecked == true) {
                    // 开始
                    isGetTreasure = true;
                    getTreasure_Existing();
                } else{
                    // 停止
                    isGetTreasure = false;
                }
                saveData_Treasure();
            } else {
                document.getElementById("extool__treasure_start").checked = false;
                showMessage("本功能需拥有9级歆崽粉丝牌(5189167)才可使用", "error");
            }
        })
	});
    document.getElementById("extool__treasure_skey").addEventListener("change", () => {
        saveData_Treasure();
    })
}


function saveData_Treasure() {
    isGetTreasure = document.getElementById("extool__treasure_start").checked;
    let delay = document.getElementById("extool__treasure_delay").value;
    let skey = document.getElementById("extool__treasure_skey").value;
	let data = {
        isGetTreasure: isGetTreasure,
        treasureDelay: delay,
        skey: skey,
	}
	localStorage.setItem("ExSave_Treasure", JSON.stringify(data)); // 存储弹幕列表
}

function ExpandTool_Treasure_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Treasure");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("treasureDelay" in retJson == true) {
            document.getElementById("extool__treasure_delay").value = retJson.treasureDelay;
        } else {
            document.getElementById("extool__treasure_delay").value = "3200";
        }
        if ("skey" in retJson == true) {
            document.getElementById("extool__treasure_skey").value = retJson.skey;
        }
        if (retJson.isGetTreasure == true) {
            verifyFans("5189167", 9).then(r => {
                if (r == true) {
                    document.getElementById("extool__treasure_start").click();
                } else {
                    let data = {
                        isGetTreasure: false
                    }
                    localStorage.setItem("ExSave_Treasure", JSON.stringify(data)); // 存储弹幕列表
                    showMessage("本功能需拥有9级歆崽粉丝牌(5189167)才可使用", "error");
                }
            })
        }
	}
}


function getTreasureDelay() {
    let ret = document.getElementById("extool__treasure_delay").value;
    return Number(ret);
}

function getTreasureSkey() {
    let ret = document.getElementById("extool__treasure_skey").value;
    return ret;
}

function getTreasure_Existing() {
    getTslist(data => {
        if (data == null) {
            return;
        }
        // let list = String(data.list).split("@S/");
        for (let i = 0; i < data.list.length - 1; i++) {
            let item = data.list[i];
            // let rpid = getStrMiddle(list[i], "rpid@A=", "@");
            let rpid = item.rpid;
            // let ot = getStrMiddle(list[i], "Sot@A=", "@");
            let ot = item.ot;
            let did = getCookieValue("dy_did");
            let timeout = Number(ot) - Math.floor(Date.now()/1000);

            let a = document.createElement("div");
            let idName = "Ex_Geetest_no" + String(treasureNum);
            a.id = idName;
            let b = document.getElementById("Ex_Geetest");
            b.appendChild(a);

            if (timeout >= 0) {
                timeout = timeout * 1000 + getTreasureDelay();
                treasureNum++;
                setTimeout(() => {
                    getTreasure(rid, rpid, did, idName);
                }, timeout);
            } else {
                getTreasure(rid, rpid, did, idName);
            }
        }
    });
}

function getTslist(callback) {
    unsafeWindow.socketProxy.socketStream.subscribe('tslist', callback);
}
