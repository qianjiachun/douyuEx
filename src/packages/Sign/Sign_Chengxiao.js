function initPkg_Sign_Chengxiao() {
    signChengxiao();
}
function signChengxiao() {
    fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'token=' + dyToken + "&signAlias=" + "20200611cxll2qd"
	}).then(res => {
		return res.json();
	}).then(ret => {
        if (ret.error == "0") {
            showMessage("【粉丝福利】恭喜你获得荧光棒x10", "success");
        } else {
            showMessage("【粉丝福利】" + ret.msg, "warning");
        }
    })
}
