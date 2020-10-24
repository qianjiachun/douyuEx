function initPkg_Sign_COD() {
	signCOD();
}

async function signCOD() {
    await shareAct("2020codmxfb");
    let result = await takeActPrize("2020codmxfb_T1");
    if (result.error == "0") {
        showMessage("【COD先锋杯】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【COD先锋杯】" + result.msg, "warning");
    }

    ret = await getActRemaining("581");
    if (ret.error == "0") {
        for (let i = 0; i < ret.data.freeCount; i++) {
            let ret2 = await getJackpot("581");
            if (ret2.error == "0") {
                showMessage("【COD先锋杯】礼盒开启：" + ret2.data.giftName, "success");
            }
        }
    }
}
