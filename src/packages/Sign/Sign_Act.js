function initPkg_Sign_Act() {
    getAct();
}

async function getAct() {
    let actList = await getActList();
    actList = JSON.parse(decodeURIComponent(escape(window.atob(actList))) || "{}");
    if ("data" in actList == false) {
        return;
    }
    for (let i = 0; i < actList.data.length; i++) {
        let eachAct = actList.data[i];
        let name = eachAct.name;
        for (let j = 0; j < eachAct.script.length; j++) {
            let script = eachAct.script[j];
            let value = script.value;
            
            let ret;
            let ret2;
            switch (script.name) {
                case "signAct":
                    ret = await signAct(value);
                    if (ret.error == "0") {
                        showMessage(`【${name}】签到完毕`, "success");
                    } else {
                        showMessage(`【${name}】${ret.msg}`, "error");
                    }
                    break;
                    
                case "userStatus":
                    ret = await userStatus(value);
                    if (ret.error == 0) {
                        for (let key in ret.data) {
                            let item = ret.data[key];
                            let cnt = item.curCompleteNum - item.curDeliverNum;
                            let name2 = name + "-" + item.taskName;
                            for (let i = 0; i < cnt; i++) {
                                let ret2 = await takeActPrize(key);
                                if (ret2.error == "0") {
                                    showMessage(`【${name2}】获得` + ret2.data.sendRes.items[0].prizeName + "*" + ret2.data.sendRes.items[0].prizeNum, "success");
                                } else {
                                    showMessage(`【${name2}】${ret2.msg}`, "error");
                                }
                            }
                        }
                    }
                    break;
                    
                case "addFollowRoom":
                    await addFollowRoom(value);
                    break;
                case "removeFollowRoom":
                    await removeFollowRoom(value);
                    break;
                case "shareAct":
                    await shareAct(value);
                    break;
                case "doSign":
                    await doSign(value);
                    break;
                case "getActRemaining":
                    ret = await getActRemaining(value);
                    if (ret.error == "0") {
                        for (let i = 0; i < ret.data.freeCount; i++) {
                            ret2 = await getJackpot(value);
                            if (ret2.error == "0") {
                                showMessage(`【${name}】礼盒开启：${ret2.data.giftName}`, "success");
                            }
                        }
                    }
                default:
                    break;
            }
        }
    }

}
