function initPkg_Sign_Movie() {
	signMovie();
}

async function signMovie() {
    for (let i = 0; i < 3; i++) {
        await addFollowRoom("8935403");
        await removeFollowRoom("8935403");
    }
    let result = await takeActPrize("1001guanzhurenwu");
    if (result.error == "0") {
        showMessage("【影视主题乐园】获得" + result.data.sendRes.items[0].prizeName + "*" + result.data.sendRes.items[0].prizeNum, "success");
    } else {
        showMessage("【影视主题乐园】" + result.msg, "warning");
    }
}
