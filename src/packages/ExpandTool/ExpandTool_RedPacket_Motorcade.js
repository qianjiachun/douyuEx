let redpacketsID_motorcade_arr = [];
let redpacket_motorcade_timer;
// let redpredpacket_motorcade_number = 0;
function initPkg_ExpandTool_RedPacket_Motorcade() {
    ExpandTool_RedPacket_Motorcade_insertDom();
    ExpandTool_RedPacket_Motorcade_insertFunc();
    ExpandTool_RedPacket_Motorcade_Set();
}


function ExpandTool_RedPacket_Motorcade_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px" id="extool__redpacekt_motorcade_start" type="checkbox">自动抢车队红包</label>';
    
    let a = document.createElement("div");
    a.className = "extool__redpacket_motorcade";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);

}
function ExpandTool_RedPacket_Motorcade_insertFunc() {
    document.getElementById("extool__redpacekt_motorcade_start").addEventListener("click", function() {
        verifyFans("5189167", 0).then(async (r) => {
            if (r == true || r == false) {
                let ischecked = document.getElementById("extool__redpacekt_motorcade_start").checked;
                if (ischecked == true) {
                    // 开始自动抢红包
                    let retConnect = await motorcadeConnect(dyToken);
                    let retConnect2 = await motorcadeConnect2(retConnect.data.uid, retConnect.data.sig);
                    let motorcadeID = await getMotorcadeID(retConnect2.TinyId, retConnect2.A2Key, retConnect.data.uid);
                    redpacket_motorcade_timer = setInterval(async() => {
                        let msglist = await getMotorcadeMessage(motorcadeID, retConnect2.TinyId, retConnect2.A2Key, 3);
                        let isArr = msglist.RspMsgList instanceof Array;
                        if (isArr == true) {
                            for (let i = 0; i < msglist.RspMsgList.length; i++) {
                                let eachMsg = msglist.RspMsgList[i].MsgBody[0].MsgContent.Data;
                                let redpacketID = getStrMiddle(String(eachMsg), 'RedPacketId":"', '",');
                                if (redpacketID != false) {
                                    if (redpacketsID_motorcade_arr.length > 3) {
                                        redpacketsID_motorcade_arr.length = 0;
                                    }
                                    if (redpacketsID_motorcade_arr.indexOf(redpacketID) == -1) {
                                        redpacketsID_motorcade_arr.push(redpacketID);
                                        // redpredpacket_motorcade_number++;
                                        // if (redpredpacket_motorcade_number >= 6) {
                                        //     getMotorcadeRedPacket(dyToken, redpacketID);
                                        // }
                                        getMotorcadeRedPacket(dyToken, redpacketID);
                                    }
                                    
                                }
                            }
                        }
                    }, 20);
                } else {
                    // 停止自动抢红包
                    clearInterval(redpacket_motorcade_timer);
                }
                saveData_RedPacket_Motorcade();
            } else {
                document.getElementById("extool__redpacekt_motorcade_start").checked = false;
                showMessage("本功能需拥有13级歆崽粉丝牌(5189167)才可使用", "error");
            }
        })
	});

}

function saveData_RedPacket_Motorcade() {
	let isGetRedPacket = document.getElementById("extool__redpacekt_motorcade_start").checked;
	let data = {
		isGetRedPacket: isGetRedPacket
	}
	localStorage.setItem("ExSave_RedPacket_Motorcade", JSON.stringify(data)); // 存储弹幕列表
}
function ExpandTool_RedPacket_Motorcade_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_RedPacket_Motorcade");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isGetRedPacket == true) {
            verifyFans("5189167", 0).then(r => {
                if (r == true || r == false) {
                    document.getElementById("extool__redpacekt_motorcade_start").click();
                } else {
                    let data = {
                        isGetRedPacket: false
                    }
                    localStorage.setItem("ExSave_RedPacket_Motorcade", JSON.stringify(data)); // 存储弹幕列表
                    showMessage("本功能需拥有13级歆崽粉丝牌(5189167)才可使用", "error");
                }
            })
        }
	}
}

function motorcadeConnect(token) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://msg.douyu.com/v3/login/getusersig",
            responseType: "json",
            headers: {
                "dy-token": token,
                "dy-client": "pc"
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}

function motorcadeConnect2(identifier, sig) {
    let url = "https://webim.tim.qq.com/v4/openim/login?identifier=" + identifier + "&usersig=" + sig +"&contenttype=json&sdkappid=1400029396";
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: '{"State":"Online"}',
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}

function getMotorcadeMessage(motorcadeID, tinyid, a2, msgNum) {
    let url = "https://webim.tim.qq.com/v4/group_open_http_svc/group_msg_get?tinyid=" + tinyid + "&a2=" + a2 + "&contenttype=json&sdkappid=1400029396"
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: '{"GroupId":"' + motorcadeID + '","ReqMsgNumber":' + String(msgNum) + '}',
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}

function getMotorcadeID(tinyid, a2, identifier) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://webim.tim.qq.com/v4/group_open_http_svc/get_joined_group_list?tinyid=" + tinyid + "&a2=" + a2 + "&contenttype=json&sdkappid=1400029396",
            data: '{"Member_Account":"' + identifier + '"}',
            responseType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                resolve(response.response.GroupIdList[0].GroupId);
            }
        });
    })
}


function getMotorcadeRedPacket(token, redpacketID) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://msg.douyu.com/v3/motorcade/red_packet/obtain",
        data: 'red_packet_id=' + redpacketID,
        responseType: "json",
        headers: {
            "dy-client": "android",
            "dy-token": token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
            console.log(response.response);
        }
    });
}