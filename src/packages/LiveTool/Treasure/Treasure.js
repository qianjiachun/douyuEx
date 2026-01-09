var treasureNum = 0;
function initPkg_LiveTool_Treasure() {
    LiveTool_Treasure_insertModal();
}

function LiveTool_Treasure_insertModal() {
	let a = document.createElement("div");
	a.className = "livetool__Treasure";
	a.id = "Ex_Geetest";
	let b = document.getElementsByClassName("Barrage-main")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_LiveTool_Treasure_Handle(text) {
    if (isGetTreasure == false) {
        return;
    }
    if (getType(text) == "tsboxb") {
        let ot = getStrMiddle(text, "ot@=", "/");
        let rpid = getStrMiddle(text, "rpid@=", "/");
        let rid = getStrMiddle(text, "rid@=", "/");
        let did = getCookieValue("dy_did");
        let timeout = Number(ot) - Math.floor(Date.now()/1000);
        timeout = timeout * 1000 + getTreasureDelay();
        treasureNum++;

        let a = document.createElement("div");
        let idName = "Ex_Geetest_no" + String(treasureNum);
        a.id = idName;
        let b = document.getElementById("Ex_Geetest");
        b.appendChild(a);

        setTimeout(() => {
            getTreasure(rid, rpid, did, idName);
        }, timeout);
    }
}

function getTreasure(roomid, rpid, deviceid, idName) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://pcapi.douyucdn.cn/h5nc/member/getRedPacket?token=" + dyToken,
        data: "room_id=" + roomid + "&package_room_id=" + roomid + "&device_id=" + deviceid + "&packerid=" + rpid + "&version=1",
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
            let ret = response.response;
            if (ret.data.code == "-1" && ret.data.validate != "0") {
                let v = JSON.parse(ret.data.geetest.validate_str);
                let success = v.success;
                let challenge = v.challenge;
                let gt = v.gt;

                let handler = (e) => {
                    // 2021-3-18 09:51:47 免打扰
                    // showMessageWindow(rid, "【宝箱】请手动验证领取宝箱", () => {
                    //     window.focus();
                    // });
                    let idDiv = document.getElementById(idName);
                    e.appendTo("#" + idName);
                    e.onSuccess(() => {
                        let result = e.getValidate();
                        let geetest_challenge = result.geetest_challenge;
                        let geetest_seccode = result.geetest_seccode;
                        let geetest_validate = result.geetest_validate;
                        let data = "room_id=" + roomid + "&package_room_id=" + roomid + "&device_id=" + deviceid + "&packerid=" + rpid + "&version=1";
                        data = data + "&geetest_challenge=" + geetest_challenge + "&geetest_validate=" + geetest_validate + "&geetest_seccode=" + encodeURIComponent(geetest_seccode);
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: "https://pcapi.douyucdn.cn/h5nc/member/getRedPacket?token=" + dyToken,
                            data: data,
                            responseType: "json",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            onload: function(response) {
                                let ret = response.response;
                                let msg = "";
                                if (ret.data.prop_id == "") {
                                    msg = "鱼丸x" + ret.data.silver;
                                } else {
                                    msg = ret.data.prop_name + "x" + ret.data.prop_count;
                                }
                                if (msg != "") {
                                    showMessage("【宝箱】获得" + msg, "success");
                                }
                                if (idDiv != null) {
                                    idDiv.remove();
                                }
                            }
                        });
                    });
                };
                if (unsafeWindow.initGeetest != undefined) {
                    unsafeWindow.initGeetest({
                        gt: gt,
                        challenge: challenge,
                        offline: !success,
                        product: "float",
                    }, handler);
                } else {
                    showMessage("宝箱验证初始化失败", "error");
                }
            } else if(ret.data.msg != "领取失败" && ret.data.msg != "验证码不正确") {
                let msg = "";
                if (ret.data.prop_id == "") {
                    msg = "鱼丸x" + ret.data.silver;
                } else {
                    msg = ret.data.prop_name + "x" + ret.data.prop_count;
                }
                if (msg != "") {
                    showMessage("【宝箱】获得" + msg, "success");
                }
            } else {
                showMessage("【宝箱】领取失败", "error");
            }
        }
    });
}


function getTreasure_Verify(challenge, validate, seccode, divId) {
    let data = "room_id=" + roomid + "&package_room_id=" + roomid + "&device_id=" + deviceid + "&packerid=" + rpid + "&version=1";
    data += "&geetest_challenge=" + challenge + "&geetest_validate=" + validate + "&geetest_seccode=" + encodeURIComponent(seccode);
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://pcapi.douyucdn.cn/h5nc/member/getRedPacket?token=" + dyToken,
        data: data,
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
            let ret = response.response;
            if (document.getElementById(divId) != null) {
                document.getElementById(divId).remove();
            }
        }
    });
}
