function initPkg_Sign_Ad_666() {
	getFishBall_Ad_666();
}

function getFishBall_Ad_666() {
    let cnt = 0;
    fetch("https://www.douyu.com/japi/tasksys/userStatus?ids=1033&token=" + dyToken + "&client_sys=android", {
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(async (retData) => {
        cnt = Number(retData.data.list[0].taskLimitNum) - Number(retData.data.list[0].curCompleteNum);
        if (cnt <= 0) {
            showMessage("【挑战鱼丸】今日次数已用完", "warning");
            return;
        }
        for (let i = 0; i < cnt; i++) {
            let posid_ad_666 = "1114318";
            let token = dyToken;
            let uid = getUID();
            let info = await getFishBall_Ad_666_info(posid_ad_666, token, uid);
            let mid = info.mid;
            let infoBack = info.infoBack;
            let isStart = await getFishBall_Ad_666_start(posid_ad_666, token, uid, mid, infoBack);
            if (isStart == true) {
                showMessage("【挑战鱼丸】开始领取挑战鱼丸，需等待15秒", "info");
                await sleep(15555).then(async () => {
                    let isFinish = await getFishBall_Ad_666_finish(posid_ad_666, token, uid, mid, infoBack);
                    if (isFinish == true) {
                        await getFishBall_Ad_666_Bubble(token);
                    }
                })
            }
        }
	}).catch(err => {
		console.log("请求失败!", err);
	})
}



function getFishBall_Ad_666_info(posid_ad_666, token, uid) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
            data: "posid=" + posid_ad_666 + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    mid = ret.data[0].mid;
                    infoBack = encodeURIComponent(JSON.stringify(ret.data));
                    resolve({mid: mid, infoBack: infoBack});
                }
            }
        });
    })
}

function getFishBall_Ad_666_start(posid_ad_666, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
            data: "token=" + token + "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid_ad_666 + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
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

function getFishBall_Ad_666_finish(posid_ad_666, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
            data: "uid=" + uid + "&clientType=1&posCode=" + posid_ad_666 + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
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

function getFishBall_Ad_666_Bubble(token) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/tasksys/getPrize?client_sys=android", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "id=1033&roomId=" + rid + "&token=" + token
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.error == "0") {
                let retJson = JSON.parse(ret.data.ext);
                showMessage("【挑战鱼丸】已领取" + retJson.data.items[1].prizeNum + "个" + retJson.data.items[1].prizeName, "success");
            } else {
                showMessage(ret.msg, "error");
            }
            resolve();
        })
    })
}