function initPkg_Sign_Ad_FishPond() {
	getFishBall_Ad_FishPond();
}

function getFishBall_Ad_FishPond() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://apiv2.douyucdn.cn/japi/fishpoolTask/m/apinc/taskList?client_sys=android",
        data: "rid=" + rid + "&token=" + dyToken,
        responseType: "json",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: async function(response) {
            let panel = response.response.data.panel;
            let ret = null;
            for (let i = 0; i < panel.length; i++) {
                if (panel[i].id == 37) {
                    // 每日活跃
                    ret = panel[i].taskList;
                    break;
                }
            }
            if (!ret) {
                return;
            }
            for (let i = 0; i < ret.length; i++) {
                if (ret[i].task.id == "5578") {
                    if (ret[i].task.status == "3") {
                        // showMessage("【鱼塘鱼丸】已领取", "warning");
                        // initPkg_Sign_Ad_666();
                        initPkg_Sign_Ad_Yuba();
                    } else {
                        for (let j = 0; j < ret[i].task.max - ret[i].task.cur; j++) {
                            let posid_Ad_FishPond = "1114268";
                            let token = dyToken;
                            let uid = getUID();
                            let info = await getFishBall_Ad_FishPond_info(posid_Ad_FishPond, token, uid);
                            if (info == false) {
                                // initPkg_Sign_Ad_666();
                                initPkg_Sign_Ad_Yuba();
                                return;
                            }
                            let mid = info.mid;
                            let infoBack = info.infoBack;
                            let isStart = await getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack);
                            if (isStart == false) {
                                isStart = await getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack);
                                if (isStart == false) {
                                    isStart = await getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack);
                                    // 偷个懒，直接三次重试
                                }
                            }
                            if (isStart == true) {
                                showMessage("【鱼塘鱼丸】开始领取鱼塘鱼丸，需等待15秒", "info");
                                await sleep(15555).then(async () => {
                                    let isFinish = await getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack);
                                    if (isFinish == false) {
                                        isFinish = await getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack);
                                        if (isFinish == false) {
                                            isFinish = await getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack);
                                        }
                                    }
                                    if (isFinish == true) {
                                        // let isGet = await getFishBall_Ad_FishPond_Bubble(token);
                                        showMessage("【鱼塘鱼丸】任务完成", "success");
                                    }
                                    
                                })
                            }
                        }
                        // initPkg_Sign_Ad_666();
                        initPkg_Sign_Ad_Yuba();
                    }
                }
            }
            
        }
    });
}

function getFishBall_Ad_FishPond_info(posid_Ad_FishPond, token, uid) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
            data: "posid=" + posid_Ad_FishPond + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
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

function getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
            data: "token=" + token + "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid_Ad_FishPond + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
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

function getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
            data: "uid=" + uid + "&clientType=1&posCode=" + posid_Ad_FishPond + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
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

function getFishBall_Ad_FishPond_Bubble(token) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/tasksys/ytxb/getPrize?client_sys=android",
            data: "token=" + token + "&id=182",
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    showMessage("【鱼塘鱼丸】" + ret.data.msg, "success");
                } else {
                    showMessage("【鱼塘鱼丸】" + ret.msg, "error");
                }
                resolve(ret.error);
            }
        });
    })
}