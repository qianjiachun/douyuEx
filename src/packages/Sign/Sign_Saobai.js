async function initPkg_Sign_Saobai() {
    await signSaobai();
    await sleep(1000).then(() => {
        initPkg_Sign_Changzheng();
    })
}
function signSaobai() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + "32323"
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.error == "0") {
                showMessage("【骚白签到】恭喜你获得荧光棒x10", "success");
            } else {
                showMessage("【骚白签到】" + ret.msg, "warning");
            }
            resolve();
        })
    })
}