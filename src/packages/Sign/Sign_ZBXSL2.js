function initPkg_Sign_ZBXSL2() {
	signZBXSL2();
}

async function signZBXSL2() {
    for (let i = 0; i < 3; i++) {
        await addFollowRoom("6889778");
        await removeFollowRoom("6889778");
    }
    let result = await takeActPrize("202010ZBXSL_T9");
    if (result.error == "0") {
        showMessage("【主播新势力2】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【主播新势力2】" + result.msg, "warning");
    }
}
