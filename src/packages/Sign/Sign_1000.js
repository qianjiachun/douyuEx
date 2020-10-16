function initPkg_Sign_1000() {
	sign1000();
}

async function sign1000() {
    for (let i = 0; i < 3; i++) {
        await addFollowRoom("7107176");
        await removeFollowRoom("7107176");
    }
    let result = await takeActPrize("20201002dyspjnh_T2");
    if (result.error == "0") {
        showMessage("【斗鱼视频】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【斗鱼视频】" + result.msg, "warning");
    }

    result = await takeActPrize("20201002dyspjnh_T9");
    if (result.error == "0") {
        showMessage("【斗鱼视频】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【斗鱼视频】" + result.msg, "warning");
    }
    
    await shareAct("20201002dyspjnh");
    result = await takeActPrize("20201002dyspjnh_T7");
    if (result.error == "0") {
        showMessage("【斗鱼视频】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【斗鱼视频】" + result.msg, "warning");
    }
    
}
