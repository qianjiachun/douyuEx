function initPkg_Sign_Bowuyuan() {
	signBowuyuan();
}

async function signBowuyuan() {
    for (let i = 0; i < 3; i++) {
        await addFollowRoom("5992130");
        await removeFollowRoom("5992130");
    }
    let result = await takeActPrize("20201020_T3");
    if (result.error == "0") {
        showMessage("【博物院】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【博物院】" + result.msg, "warning");
    }

    result = await getJackpot("578");
    if (result.error == "0") {
        showMessage("【博物院】礼盒开启：" + result.data.giftName, "success");
    }

}
