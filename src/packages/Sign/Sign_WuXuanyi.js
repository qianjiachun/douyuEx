async function initPkg_Sign_WuXuanyi() {
    await signWuXuanyi();
}
function signWuXuanyi() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + "20200904QD"
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.error == "0") {
                showMessage("【吴宣仪】恭喜你获得积分x1", "success");
            } else {
                showMessage("【吴宣仪】" + ret.msg, "warning");
            }
            resolve();
        })
    })
}