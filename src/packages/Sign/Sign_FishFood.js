function initPkg_Sign_FishFood() {
	getFishFood();
}
function getFishFood() {
	fetch("https://www.douyu.com/japi/activepointnc/api/getActivePointInfo", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(res => {
		return res.json();
	}).then(async (ret) =>{
		let cnt = Math.floor(Number(ret.data.userActivePoint) / Number(ret.data.onceLotteryActivePoint));
		if (cnt == 0) {
			showMessage("【寻宝】" + "鱼粮不足", "warning");
			return;
		}
		cnt = Number(ret.data.dailyMaxLotteryTimes) - Number(ret.data.usedLotteryCount);
		if (cnt == 0) {
			showMessage("【寻宝】" + "今日寻宝次数已到达上限", "warning");
			return;
		}
		for (let i = 0; i < cnt; i++) {
			await sleep(1500).then(() => {
				fetch("https://www.douyu.com/japi/activepointnc/api/dolottery", {
					method: 'POST',
					mode: 'no-cors',
					credentials: 'include',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					body: 'rid=' + rid + '&ctn=' + getCCN()
				}).then(res => {
					return res.json();
				}).then(ret => {
					if (ret.data != null) {
						if (Object.keys(ret.data).length != 0) {
							showMessage("【寻宝】" + ret.data.msg, "success");
						}
					} else {
						showMessage("【寻宝】" + ret.msg, "warning");
					}
					// console.log("【寻宝】" + ret.data.msg);
				}).catch(err => {
					console.log("请求失败!", err);
				})
			})
		}
	})
}