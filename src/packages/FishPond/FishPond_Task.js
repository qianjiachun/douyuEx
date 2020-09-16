let taskList = [];
function initPkg_FishPond_Task() {
	getFishPond_Task();
}

function initPkg_FishPond_Task_Timer() {
	getFishPond_TaskList();
}

function getFishPond_Task() {
	fetch('https://www.douyu.com/japi/tasksys/ytxb/batchGetPrize',{
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'ids=1182%2C1183%2C1184%2C1185%2C1186' + '&rid=' + rid
	}).then(res => {
		return res.json();
	}).then(ret => {
		if (ret.data !== null) {
			for (let i = 0; i < ret.data.length; i++) {
				showMessage("【鱼塘任务】领取结果:成功领取" + ret.data[i].name + ret.data[i].num + "个", "success");
			}
		}
	}).catch(err => {
		console.log("请求失败!", err);
	})
	if (taskList.length == 0) {
		// showMessage("【鱼塘任务】暂无可领取的鱼粮", "info");
		return;
	}
	let arr = taskList.concat();
	for (let i = 0; i < arr.length; i++) {
		fetch('https://www.douyu.com/japi/tasksys/ytxb/getPrize',{
			method: 'POST',
			mode: 'no-cors',
			credentials: 'include',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			body: 'id=' + arr[i] + '&roomId=' + rid
		}).then(res => {
			return res.json();
		}).then(ret => {
			// console.log("【鱼塘任务】领取结果:", ret);
			showMessage("【鱼塘任务】领取结果:" + ret.data.msg, "success");
		}).catch(err => {
			console.log("请求失败!", err);
		})
	}
	taskList.length = 0;
	// FishPond_showTip(false);
}

function getFishPond_TaskList() {
	// 获取可领取的鱼粮,如果有,就显示小红点
	taskList.length = 0;
	getFishPond_TaskList_Day();
	getFishPond_TaskList_Week();
	getFishPond_TaskList_Ytzb();
	// getFishPond_TaskList_Client();
}


function getFishPond_TaskList_Day() {
	fetch('https://www.douyu.com/japi/tasksys/ytxb/userStatusV2?cycleType=1&roomId=' + rid,{
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(ret => {
		
		for (let i = 0; i < ret.data.list.length; i++) {
			if (ret.data.list[i].status == "2") {
				taskList.push(ret.data.list[i].id);
				getAllFishPond();
			}
		}
	}).catch(err => {
		console.log("请求失败!", err);
	})
}
function getFishPond_TaskList_Week() {
	fetch('https://www.douyu.com/japi/tasksys/ytxb/userStatusV2?cycleType=2&roomId=' + rid,{
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(ret => {
		for (let i = 0; i < ret.data.list.length; i++) {
			if (ret.data.list[i].status == "2") {
				taskList.push(ret.data.list[i].id);
				getAllFishPond();
			}
		}
	}).catch(err => {
		console.log("请求失败!", err);
	})
}

function getFishPond_TaskList_Ytzb() {
	fetch('https://www.douyu.com/japi/tasksys/ytxb/userStatusV2?cycleType=25&roomId=' + rid,{
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(ret => {
		for (let i = 0; i < ret.data.list.length; i++) {
			if (ret.data.list[i].status == "2") {
				taskList.push(ret.data.list[i].id);
				getAllFishPond();
			}
		}
	}).catch(err => {
		console.log("请求失败!", err);
	})
}
