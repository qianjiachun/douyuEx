function initPkg_Sign_Aoligei() {
	getAoligei_todo();
}

function getAoligei_todo() {
    verifyFans("5189167", 1).then(r => {
        if (r == true) {
            fetch("https://www.douyu.com/japi/carnival/nc/actTask/userStatus", {
                method: 'POST',
                mode: 'no-cors',
                credentials: 'include',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'tasks=20200415cc_T1&token=' + dyToken
            }).then(res => {
                return res.json();
            }).then(ret => {
                if (ret.error == "0") {
                    let deliverNum = Number(ret.data['20200415cc_T1'].curDeliverNum);
                    let completeNum = Number(ret.data['20200415cc_T1'].curCompleteNum);
                    let limitNum = Number(ret.data['20200415cc_T1'].taskLimitNum);
                    if (deliverNum == limitNum) {
                        if (completeNum == limitNum) {
                            showMessage("【和平精英周年庆】奥利给已领取", "warning");
                            return;
                        }
                    }
                    showMessage("【和平精英周年庆】即将打开领取界面，领取后自动关闭", "info");
                    openPage("https://www.douyu.com/topic/tzbjnh?flag=aoligei", false);
                }
            }).catch(err => {
                console.log("请求失败!", err);
            })
        }
    })
}
function getAoligei() {
    fetch("https://www.douyu.com/japi/carnival/nc/actTask/takePrize", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'token=' + dyToken + '&aid=android&taskAlias=20200415cc_T1'
    }).then(res => {
        return res.json();
    }).then(ret => {
        console.log("dsadsadassad:",ret);
        if (ret.error == "0") {
            showMessage("【和平精英周年庆】成功领取" + ret.data.sendRes.bagName, "success");
        } else {
            showMessage(ret.msg, "error");
        }
        closePage();
    }).catch(err => {
        console.log("请求失败!", err);
        closePage();
    })
}