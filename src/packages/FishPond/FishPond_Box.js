let boxList = [];
function initPkg_FishPond_Box() {
	getFishPond_Box();
}

function initPkg_FishPond_Box_Timer() {
	getFishPond_BoxList();
}

function getFishPond_Box() {
	// 清空boxList内的气泡
	if (boxList.length == 0) {
		showMessage("【鱼塘宝箱】暂无可领取的鱼粮", "info");
		return;
	}
	let arr = boxList.concat();
	for (let i = 0; i < arr.length; i++) {
		GM_xmlhttpRequest({
			method: "POST",
			url: "https://pcapi.douyucdn.cn/japi/tasksys/ytxb/getPrize",
			data: "id=" + arr[i] + "&token=" + dyToken,
			responseType: "json",
			headers: {
			  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			onload: function(response) {
				showMessage("【鱼塘宝箱】" + response.response.data.msg, "success");
				// console.log("【鱼塘宝箱】" , response.response.msg, response.response);
			}
		});
	}
	FishPond_showTip(false);
	boxList.length = 0;
}

function getFishPond_BoxList() {
	// 获取可领取的鱼粮,如果有,就显示小红点
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://pcapi.douyucdn.cn/japi/tasksys/ytxb/box",
		data: 'token=' + dyToken,
		responseType: "json",
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		onload: function(response) {
			boxList.length = 0;
			for (let i = 0; i < response.response.data.length; i++) {
				if (response.response.data[i] != null) {
					if (response.response.data[i].status == "2") {
						FishPond_showTip(true);
						boxList.push(response.response.data[i].id);
					}
				}
			}
		}
	});
}


