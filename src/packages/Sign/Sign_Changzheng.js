const ACTIVITY_DAY_ID = "610";

function initPkg_Sign_Changzheng() {
    getChangzheng();
}

async function getChangzheng() {
    let ret = await signChangzheng();
    if (ret.error == "0") {
        showMessage("【长征签到】签到完毕", "success");

    } else {
        showMessage("【长征签到】" + ret.msg, "warning");
    }

    ret = await getActRemaining(ACTIVITY_DAY_ID);
    if (ret.error == "0") {
        for (let i = 0; i < ret.data.freeCount; i++) {
            let ret2 = await getJackpot(ACTIVITY_DAY_ID);
            if (ret2.error == "0") {
                showMessage("【长征签到】礼盒开启：" + ret2.data.giftName, "success");
            }
        }
    }
    
    // await sleep(1000).then(() => {
    //     initPkg_Sign_Chengxiao();
    // })
    // await sleep(1000).then(() => {
    //     initPkg_Sign_Lmjx();
    // })
}

function signChangzheng() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + "XSDXZC"
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}