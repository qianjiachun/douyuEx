function initPkg_FansContinue() {
	initPkg_FansContinue_Dom();
	initPkg_FansContinue_Func();
}

function initPkg_FansContinue_Dom() {
	FansContinue_insertIcon();
}
function FansContinue_insertIcon() {
	let a = document.createElement("div");
	a.className = "fans-continue";
	a.innerHTML = '<a class="ex-panel__icon" title="一键续牌"><img style="width: 32px;height: 32px;" src="https://gfs-op.douyucdn.cn/dygift/1705/7db9beee246848252f1c7fe916259f4e.png"/><i id="fans-continue__tip" class="ex-panel__tip"></i></a>';
	a.addEventListener("contextmenu", function (e) {
		e.preventDefault();
		let savedIds = [];
		const savedIdsJson = localStorage.getItem('ExSave_FilterIdList');
		if (savedIdsJson) {
			try {
				const parsedIds = JSON.parse(savedIdsJson);
				savedIds = parsedIds.map(id => Number(id));
			} catch (error) {
				console.error('解析 ExSave_FilterIdList 时出错:', error);
			}
		}
		const inputIds = prompt('请输入要过滤的房间号ID，用英文逗号分隔', savedIds.join(','));
		if (inputIds) {
			const idList = inputIds.split(',').map(id => id.trim());
			window.filterIdList = idList;
			localStorage.setItem('ExSave_FilterIdList', JSON.stringify(idList));
		}
	});
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
}

// 在初始化函数中从 localStorage 加载 ID
function initPkg_FansContinue_Func() {
	const savedIds = localStorage.getItem('ExSave_FilterIdList');
	if (savedIds) {
		window.filterIdList = JSON.parse(savedIds);
	}
	document.getElementsByClassName("fans-continue")[0].addEventListener("click", function () {
		let sendNum = prompt("每个直播间赠送几根荧光棒？", "1");
		if (sendNum == null) {
			return;
		}
		if (sendNum == "") {
			return;
		}
		let giftId = 0;
		getBagGifts(rid, (ret) => {
			let chunkNum = ret.data.list.length;
			if (chunkNum > 0) {
				for (let i = 0; i < chunkNum; i++) {
					if (ret.data.list[i].id == 268) {
						giftId = 268;
						break;
					}
					if (ret.data.list[i].id == 2358) {
						giftId = 2358;
					}
				}
				if (giftId == 0) {
					showMessage("没有足够的道具", "error");
					return;
				};
				fetch('https://www.douyu.com/member/cp/getFansBadgeList', {
					method: 'GET',
					mode: 'no-cors',
					cache: 'default',
					credentials: 'include',
				}).then(res => {
					return res.text();
				}).then(async (doc) => {
					doc = (new DOMParser()).parseFromString(doc, 'text/html');
					let a = doc.getElementsByClassName("fans-badge-list")[0].lastElementChild;
					let n = a.children.length;
					for (let i = 0; i < n; i++) {
						let rid = a.children[i].getAttribute("data-fans-room"); // 获取房间号
						if (window.filterIdList && window.filterIdList.includes(rid)) {
							continue;
						}
						await sleep(250).then(() => {
							sendGift_bag(giftId, Number(sendNum), rid).then(data => {
								if (data.msg == "success") {
									showMessage("【续牌】" + rid + "赠送荧光棒成功", "success");
									// console.log(rid + "赠送一根荧光棒成功");
								} else {
									showMessage("【续牌】" + rid + "赠送失败 " + data.msg, "error");
									// console.log(rid + "赠送失败");
									console.log(rid, data);
								}
							}).catch(err => {
								showMessage("【续牌】" + rid + "赠送失败", "error");
								console.log(rid, err);
							})
						});
					}
				}).catch(err => {
					console.log("请求失败!", err);
				})
			} else {
				showMessage("背包礼物为空", "error");
			}
		});

	});
}

function sendGift_bag(gid, count, rid) {
	// 送背包里的东西
	// gid: 268是荧光棒
	// count: 数量
	// rid: 房间号
	return fetch("https://www.douyu.com/japi/prop/donate/mainsite/v1", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: 'propId=' + gid + '&propCount=' + count + '&roomId=' + rid + '&bizExt=%7B%22yzxq%22%3A%7B%7D%7D'
	}).then(res => {
		return res.json();
	})
}
