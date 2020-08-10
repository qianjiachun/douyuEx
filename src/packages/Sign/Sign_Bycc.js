function initPkg_Sign_Bycc() {
    getBycc();
}

async function getBycc() {
    let ret = await signBycc();
    if (ret.error == "0") {
        showMessage("【八月冲刺签到】签到完毕", "success");

    } else {
        showMessage("【八月冲刺签到】" + ret.msg, "warning");
    }
}

function signBycc() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + "20200806QD"
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

