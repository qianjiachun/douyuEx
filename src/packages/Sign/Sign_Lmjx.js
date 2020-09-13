function initPkg_Sign_Lmjx() {
    doLmjx();
}

async function doLmjx() {
    let status = await getLmjxStatus();
    if (status.error != "0") {
        return;
    }
    if (status.data['20200911LMJX_T5'].curCompleteNum == "0") {
        // 没完成分享
        await shareAct("20200911LMJX");
        let result = await takeActPrize("20200911LMJX_T5");
        if (result.error == "0") {
            showMessage("【黎明觉醒分享】获得抽奖次数*1", "success");
        } else {
            showMessage("【黎明觉醒分享】" + result.msg, "warning");
        }
    } else {
        showMessage("【黎明觉醒分享】奖励已领取", "warning");
    }
    if (status.data['20200911LMJX_T2'].curCompleteNum == "0") {
        // 没完成关注
        for (let i = 0; i < 3; i++) {
            await addFollowRoom("9184529");
            await removeFollowRoom("9184529");
        }
        let result = await takeActPrize("20200911LMJX_T2");
        if (result.error == "0") {
            showMessage("【黎明觉醒关注】获得抽奖次数*1", "success");
        } else {
            showMessage("【黎明觉醒关注】" + result.msg, "warning");
        }
    } else {
        showMessage("【黎明觉醒关注】奖励已领取", "warning");
    }

}

function shareAct(name) {
    // 20200911LMJX
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/common/share',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `actAlias=${ name }&token=${ dyToken }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function takeActPrize(name) {
    // 关注20200911LMJX_T2
    // 分享20200911LMJX_T5
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/nc/actTask/takePrize',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `token=${ dyToken }&aid=android&taskAlias=${ name }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function addFollowRoom(rid) {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/add',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `rid=${ rid }&ctn=${ getCCN() }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}


function removeFollowRoom(rid) {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/rm',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `rid=${ rid }&ctn=${ getCCN() }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}


function getLmjxStatus() {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/nc/actTask/userStatus',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `tasks=20200911LMJX_T5%2C20200911LMJX_T2%2C20200911LMJX_T3%2C20200911LMJX_T4`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}
