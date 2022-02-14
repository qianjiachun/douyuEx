function initPkg_AdVideo_Xiaoxiaole() {
    // startGetXiaoxiaoleFishBall()
}
async function startGetXiaoxiaoleFishBall() {
    let status = await getXiaoxiaoleStatus();
    if (status.error == "0") {
        let completeNum = Number(status.data['20201021xiaoxiaole_T1'].curCompleteNum);
        let limitNum = Number(status.data['20201021xiaoxiaole_T1'].taskLimitNum);
        let leftNum = limitNum - completeNum;
        if (leftNum > 0) {
            showMessage(`【消消乐】开始领取鱼丸，剩余${leftNum}次`, "info")
        }
        for (let i = 0; i < leftNum; i++) {
            await getFishBall_Xiaoxiaole();
        }
    }
}


async function getFishBall_Xiaoxiaole() {
    let adWatchcer = new DyWacthAd("1134396", dyToken, rid);
    let isStart = await adWatchcer.start();
    if (isStart == true) {
        await sleep(15000).then(async () => {
            let isFinish = await adWatchcer.finish();
            if (isFinish == true) {
                showMessage("【消消乐】成功领取40鱼丸", "success");
            }
        })
    }
}

function getXiaoxiaoleStatus() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/actTask/userStatus", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `tasks=20201021xiaoxiaole_T1&token=${dyToken}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}
