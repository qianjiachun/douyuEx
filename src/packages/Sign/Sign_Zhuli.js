function initPkg_Sign_Zhuli() {
	signZhuli();
}

async function signZhuli() {
    await shareAct("202010ZBXSL");
    let result = await takeActPrize("202010ZBXSL_T3");
    if (result.error == "0") {
        showMessage("【主播助力】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【主播助力】" + result.msg, "warning");
    }
}
