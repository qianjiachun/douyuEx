function initPkg_Chaoguan() {
	startGetChaoguanFishBall();
}
async function startGetChaoguanFishBall() {
    let status = await getChaoguanStatus();
    if (status.error == "0") {
        let completeNum = Number(status.data['20200914superbaba_T1'].curCompleteNum);
        let limitNum = Number(status.data['20200914superbaba_T1'].taskLimitNum);
        let leftNum = limitNum - completeNum;
        console.log("剩余"+leftNum);
        for (let i = 0; i < leftNum; i++) {
            getFishBall_Chaoguan();
        }
    }
}


async function getFishBall_Chaoguan() {
    let adWatchcer = new DyWacthAd("1054387", dyToken, rid);
    let isStart = await adWatchcer.start();
    if (isStart == true) {
        await sleep(15000).then(async () => {
            await adWatchcer.finish();
        })
    }
    
}

function getChaoguanStatus() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/actTask/userStatus", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `tasks=20200914superbaba_T1&token=${dyToken}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}