function initPkg_Sign_Ad_Guess() {
	getFishBall_Ad_Guess();
}

async function getFishBall_Ad_Guess() {
    let chance = await getFishBall_Ad_Guess_chance();
    if (chance > 0) {
        for (let i = 0; i < chance; i++) {
            let adWatchcer = new DyWacthAd("1114337", dyToken, rid);
            let isStart = await adWatchcer.start();
            if (isStart == true) {
                showMessage("【预言鱼丸】开始领取预言鱼丸，需等待15秒", "info");
                await sleep(15555).then(async () => {
                    if (await adWatchcer.finish() == true) {
                        showMessage("【预言鱼丸】成功领取40鱼丸", "success");
                    }
                    await sleep(1000);
                })
            }
        }
    } else {
        // showMessage("【预言鱼丸】今日次数已用完", "warning");
    }
}


function getFishBall_Ad_Guess_chance() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/chance?client_sys=android",
            data: "token=" + dyToken + "&uid=" + getUID() + "&posCode=1114337&clientType=1",
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: async function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    let chance = ret.data.chanceNum;
                    resolve(chance);
                } else {
                    resolve(0);
                }
            }
        });
    })
}
