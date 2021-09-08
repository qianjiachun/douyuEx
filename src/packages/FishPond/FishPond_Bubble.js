let bubbleList = [];

function initPkg_FishPond_Bubble() {
	getFishPond_Bubble();
}

function initPkg_FishPond_Bubble_Timer() {
	getFishPond_BubbleList();
}

function getFishPond_Bubble() {
	if (!bubbleList) {
		return;
	}
	// 清空bubbleList内的气泡
	if (bubbleList.length == 0) {
		// showMessage("【鱼塘气泡】暂无可领取的鱼粮", "info");
		return;
	}
	
	let bubbleToGet = "";
	for (let i = 0; i < bubbleList.length; i++) {
		if (i != bubbleList.length - 1) {
			bubbleToGet = bubbleToGet + bubbleList[i] + "%2C";
		} else {
			bubbleToGet = bubbleToGet + bubbleList[i];
		}
	}
	fetch('https://www.douyu.com/japi/tasksys/ytxb/batchGetPrize',{
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'ids=' + bubbleToGet + '&rid=' + rid
	}).then(res => {
		return res.json();
	}).then(ret => {
		let result = "";
		for (let i = 0; i < ret.data.prizeList.length; i++) {
			result = result + ret.data.prizeList[i].num + "个" + ret.data.prizeList[i].name + ",";
		}
		bubbleList.length = 0; // 此处领取完毕,小红点也要去掉
		// FishPond_showTip(false);
		showMessage("【鱼塘气泡】领取结果:" + result, "success");
		// console.log("【鱼塘气泡】领取结果:" + result, ret);
	}).catch(err => {
		console.log("请求失败!", err);
	})
}

function getFishPond_BubbleList() {
	// 获取可领取的鱼粮,如果有,就显示小红点
	fetch('https://www.douyu.com/japi/tasksys/ytxb/bubble',{
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(ret => {
		if (!bubbleList) {
			return;
		}
		bubbleList.length = 0;
		for (let i = 0; i < ret.data.list.length; i++) {
			if (ret.data.list[i] != null) {
				if (ret.data.list[i].status == "2") {
					bubbleList.push(ret.data.list[i].id);
					getAllFishPond();
				}
			}
		}
	}).catch(err => {
		console.log("请求失败!", err);
	})
}