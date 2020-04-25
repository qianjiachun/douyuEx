var roomSignList = [];
function initPkg_FishPond_RoomSign() {
	getFishPond_RoomSign();
}

function initPkg_FishPond_RoomSign_Timer() {
	getFishPond_RoomSignList();
}

function getFishPond_RoomSign() {
	// 清空roomSignList内的气泡
	if (roomSignList.length == 0) {
		showMessage("【签到宝箱】暂无可领取的鱼粮", "info");
		return;
	}
    let arr = roomSignList.concat();
	for (let i = 0; i < arr.length; i++) {
		fetch('https://www.douyu.com/japi/roomuserlevel/apinc/getPrize',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'rid=' + rid + '&ctn=' + getCCN()
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.error == "0") {
                showMessage("【签到宝箱】领取结果:" + ret.msg, "success");
            }
        }).catch(err => {
            console.log("请求失败!", err);
        })
	}
	FishPond_showTip(false);
	roomSignList.length = 0;
}

function getFishPond_RoomSignList() {
    fetch('https://www.douyu.com/japi/roomuserlevel/apinc/levelInfo?rid=' + rid + '&clientType=0',{
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(ret => {
        if (ret.error == "0" ) {
            if (ret.data.treasure.status == "1") {
                FishPond_showTip(true);
                roomSignList.push("1");
            }
        }
	}).catch(err => {
		console.log("请求失败!", err);
	})
}


