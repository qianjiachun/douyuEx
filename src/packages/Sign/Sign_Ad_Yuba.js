function initPkg_Sign_Ad_Yuba() {
	getFishBall_Ad_Yuba();
}

function getFishBall_Ad_Yuba() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/chance?client_sys=android",
        data: "token=" + dyToken + "&uid=" + getUID() + "&posCode=1042329&clientType=1",
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: async function(response) {
            let ret = response.response;
            if (ret.error == "0") {
                let chance = ret.data.chanceNum;
                if (chance > 0) {
                    for (let i = 0; i < chance; i++) {
                        let posid_Ad_Yuba = "1042329";
                        let token = dyToken;
                        let uid = getUID();
                        let info = await getFishBall_Ad_Yuba_info(posid_Ad_Yuba, token, uid);
                        if (info == false) {
                            return;
                        }
                        let mid = info.mid;
                        let infoBack = info.infoBack;
                        let isStart = await getFishBall_Ad_Yuba_start(posid_Ad_Yuba, token, uid, mid, infoBack);
                        if (isStart == true) {
                            showMessage("【鱼吧鱼丸】开始领取鱼吧鱼丸，需等待15秒", "info");
                            await sleep(15555).then(async () => {
                                let isFinish = await getFishBall_Ad_Yuba_finish(posid_Ad_Yuba, token, uid, mid, infoBack);
                                if (isFinish == true) {
                                    showMessage("【鱼吧鱼丸】成功领取40鱼丸", "success");
                                    await sleep(1000);
                                }
                            })
                        }
                    }
                } else {
                    showMessage("【鱼吧鱼丸】今日次数已用完", "warning");
                    return;
                }
            }
        }
    });
}



function getFishBall_Ad_Yuba_info(posid_Ad_Yuba, token, uid) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
            data: "posid=" + posid_Ad_Yuba + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    if (ret.data.length == 0) {
                        resolve(false);
                        return;
                    }
                    let mid = ret.data[0].mid;
                    let infoBack = encodeURIComponent(JSON.stringify(ret.data));
                    resolve({mid: mid, infoBack: infoBack});
                }
            }
        });
    })
}

function getFishBall_Ad_Yuba_start(posid_Ad_Yuba, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
            data: "token=" + token + "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid_Ad_Yuba + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    resolve(true);
                }
            }
        });

    })
}

function getFishBall_Ad_Yuba_finish(posid_Ad_Yuba, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
            data: "uid=" + uid + "&clientType=1&posCode=" + posid_Ad_Yuba + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    if (ret.data == "1") {
                        resolve(true);
                    }
                }
            }
        });

    })
}
