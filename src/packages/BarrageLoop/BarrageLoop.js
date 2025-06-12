let barrageColorArr = [];
let barrageArr = [];
let barrageColorLength = 0;
let barrageLength = 0;
let bloopTimer;
let barrageOffset = 0;
let barrageColorOffset = 0;
let isChangeColor = true;
let isMatch = false; //是否为赛事直播间
let bloopStopTimer;
let barrageOptions = [];

function initPkg_BarrageLoop() {
	initPkg_BarrageLoop_Dom();
	initPkg_BarrageLoop_Func();
	initPkg_BarrageLoop_Set();
}

function BarrageLoop_insertModal() {
	let html = "";
	let a = document.createElement("div");
	a.className = "bloop";
	html += '<div style="display:inline-block"><label>弹幕：</label></div>';
	html += `
	<span style="float:right;margin-right:15px;">
		<select id="bloop__select"></select>
		<input style="width:40px;margin-left:10px;" type="button" id="bloop__save" value="保存"/>
		<input style="width:40px;margin-left:10px;" type="button" id="bloop__delete" value="删除"/>
	</span>
	`;
	html += '<textarea placeholder="一行一个，开启舔狗模式后此处不需要输入" id="bloop__textarea" rows="5" cols="50"></textarea>';
	html += '<div><label>速度(ms)：</label><input id="bloop__text_speed1" type="text" style="width:50px;text-align:center;" value="2000" />~<input id="bloop__text_speed2" type="text" style="width:50px;text-align:center;" value="3000" /></div>';
	html += '<div><label>限时(min)：</label><input id="bloop__text_stoptime" type="text" style="width:50px;text-align:center;" value="1" /></div>';
	html += '<div><label><input id="bloop__checkbox_changeColor" type="checkbox" name="checkbox_changeColor" checked>自动变色</label><label><input id="bloop__checkbox_tiangou" type="checkbox">舔狗模式</label><label><input id="bloop__checkbox_random" type="checkbox">随机发送</label></div>';
	html += '<div class="bloop__switch"><label><input id="bloop__checkbox_startSend" type="checkbox">开始发送</label></div>';
	
	a.innerHTML = html;
	let b = document.getElementsByClassName("layout-Player-chat")[0];
	b.insertBefore(a, b.childNodes[0]);
}
function BarrageLoop_insertIcon() {
	let a = document.createElement("div");
	a.className = "bloop-icon";
	a.innerHTML = '<a class="ex-panel__icon" title="弹幕发送小助手"><svg t="1578572568198" style="display: block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55445" width="32" height="32"><path d="M511.99883605 1020.07740302c-68.78771655 0-135.53209458-13.47788003-198.38074083-40.06106453-60.69004402-25.67037725-115.18953131-62.41203655-161.98371328-109.20738247-46.79418197-46.79301803-83.53700523-101.29366926-109.20621853-161.98371328C15.84497778 645.97776043 2.36709774 579.23105337 2.36709774 510.4445019s13.47904398-135.53209458 40.06106453-198.38074083c25.6692133-60.69004402 62.41203655-115.18953131 109.20621853-161.98371328 46.79534706-46.79418197 101.29366926-83.53700523 161.98371328-109.20621853 62.84864739-26.5831845 129.59418937-40.06106453 198.38074083-40.06106453 68.78771655 0 135.53209458 13.47904398 198.38190592 40.06106453 60.69004402 25.6692133 115.18953131 62.41203655 161.98487723 109.20621853 46.79301803 46.79418197 83.53584128 101.29366926 109.20621853 161.98371328 26.5831845 62.84864739 40.06106453 129.59418937 40.06106453 198.38074083s-13.47788003 135.53325853-40.06106453 198.38074084c-25.67037725 60.69004402-62.41203655 115.19069525-109.20621853 161.98371328-46.79534706 46.79418197-101.29483435 83.53817031-161.98487723 109.20738247C647.53092949 1006.59952413 580.78655147 1020.07740302 511.99883605 1020.07740302zM511.99883605 57.86089358c-249.55500203 0-452.58244437 203.02744235-452.58244437 452.58244437s203.02744235 452.58244437 452.58244437 452.58244438c249.55616597 0 452.58360832-203.02744235 452.58360832-452.58244438C964.58244437 260.88949987 761.55500203 57.86089358 511.99883605 57.86089358z" p-id="55446" fill="#1296db" data-spm-anchor-id="a313x.7781069.0.i24"></path><path d="M322.42598685 461.65355293l-8.51099648 74.46598314 97.86947811 0c-2.85950862 76.59314973-4.9866752 127.6556379-6.38266595 153.18746454-1.42975431 51.06132423-27.65899321 75.16339541-78.72148139 72.33881542-18.45058333 1.39598962-35.47024839 2.12716658-51.06248818 2.12716658-2.85950862-17.02082901-6.38266595-34.77283613-10.63816419-53.19081984 18.41681863 0 35.43764878 0 51.06248817 0 25.53066155 2.82574393 38.99456967-7.77981952 40.42432399-31.9133275 1.39598962-9.9069861 2.12833166-25.53182663 2.12833166-46.80698994 1.39598962-21.27632725 2.12716658-36.86740309 2.12716658-46.80698994l-99.9966447 0 14.89366244-172.33546126 89.3584805 0 0-78.72148138-102.12497636 0 0-48.9353216 151.05913287 0 0 176.5909595L322.42598685 461.65355293zM450.08162475 580.79819435l0-242.54594504 74.46598314 0c-17.0219941-24.10090723-31.91449145-43.25006791-44.67982222-57.44515413l46.80698994-21.27632725c4.25433429 4.25549824 10.63699911 12.06675342 19.14799673 23.40349497 15.5910747 18.45058333 24.79948459 30.51733789 27.65899321 36.16882574l-42.5514917 19.14799673 80.84864796 0c25.53066155-38.29715741 41.8203136-64.5263963 48.93415652-78.72031744l53.19081984 14.89366244c-5.68525255 8.50983253-15.62483939 22.70491762-29.78732487 42.55149169-7.11384291 9.93958685-12.06675342 17.02082901-14.89249849 21.27516331l70.20931982 0 0 242.54594503L620.28991829 580.7970304l0 51.06248818 144.67646806 0 0 48.93415651L620.28991829 680.79367509l0 87.23131392-51.06132423 0 0-87.23131392L428.80646144 680.79367509l0-48.93415651 140.42213376 0 0-51.06248818L450.08162475 580.7970304zM501.14411293 385.0604032l0 53.18965475 68.08331718 0 0-53.18965475L501.14411293 385.0604032zM501.14411293 480.80154965l0 55.31682248 68.08331718 0L569.22743011 480.80154965 501.14411293 480.80154965zM688.37323549 385.0604032l-68.0833172 0 0 53.18965475 68.0833172 0L688.37323549 385.0604032zM620.28991829 480.80154965l0 55.31682248 68.0833172 0L688.37323549 480.80154965 620.28991829 480.80154965z" p-id="55447" fill="#1296db"></path></svg><i id="bloop__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function getBarrageColorArr() {
	// 获取已解锁的弹幕颜色
	barrageColorArr.length = 0;// 清空数组
	barrageColorLength = 0;
	let a = document.getElementsByClassName("FansBarrageSwitcher");
	let nobleIcon = document.getElementsByClassName("NobleBarrageSwitcher is-active");
	let isNoble = false;
	if (nobleIcon.length > 0) {
		isNoble = true;
	}
	if (a.length == 0) {
		isMatch = true;
		let b = document.getElementsByClassName("MatchSystemFansBarrageSwitcher")[0];
		if (b != undefined) {
			b.click();
			a = document.getElementsByClassName("MatchSystemFansBarrageColor-item");
		} else {
			isMatch = false;
		}
		
	} else {
		a[0].click();
		a = document.getElementsByClassName("FansBarrageColor-item");
		isMatch = false;
	}
	
	for (let i = 0; i < a.length; i++) {
		let itemClassName = a[i].className;
		if (itemClassName.indexOf("is-lock") == -1) {
			barrageColorArr.push(i);
			barrageColorLength++;
		}
	}
	barrageColorLength = barrageColorLength - 1;
	
	if (isNoble == true) {
		document.getElementsByClassName("NobleBarrageSwitcher")[0].click();
	}
}


function getBarrageArr() {
	// 获取即将发送的弹幕数组
	barrageArr.length = 0;
	barrageLength = 0;
	let a = document.getElementById("bloop__textarea").value;
	barrageArr = a.split("\n");
	barrageLength = barrageArr.length - 1;
	
}

function selectBarrageColor(index) {
	// 选择粉丝弹幕
	let a;
	if (isMatch == false) {
		document.getElementsByClassName("FansBarrageSwitcher")[0].click();
		a = document.getElementsByClassName("FansBarrageColor-item")[index];
	} else{
		document.getElementsByClassName("MatchSystemFansBarrageSwitcher")[0].click();
		a = document.getElementsByClassName("MatchSystemFansBarrageColor-item")[index];
	}
	
	if (a != undefined) {
		a.click();
	}
}
function sendBarrage(text) {
	// 发送弹幕
	let chatDom = document.getElementsByClassName("ChatSend-txt")[0];
	if (chatDom.tagName == "TEXTAREA") {
		chatDom.value = text;
	} else {
		chatDom.innerText = text;
	}
	document.getElementsByClassName("ChatSend-button")[0].click();
}

function getSpeed() {
	let min = document.getElementById("bloop__text_speed1").value;
	let max = document.getElementById("bloop__text_speed2").value;
	let ret = getRandom(Number(min), Number(max));
	return ret;
}

function saveData_BarrageLoop() {
	let speed1 = document.getElementById("bloop__text_speed1").value;
	let speed2 = document.getElementById("bloop__text_speed2").value;
	let stopTime = document.getElementById("bloop__text_stoptime").value;
	let tiangouMode = document.getElementById("bloop__checkbox_tiangou").checked;
	if (speed1 == "undefined") {
		speed1 = 2000;
	}
	if (speed2 == "undefined") {
		speed2 = 3000;
	}
	if (stopTime == "undefined") {
		stopTime = 5;
	}
	let data = {
		text: barrageOptions,
		speed1: speed1,
		speed2: speed2,
		stopTime: stopTime,
		isChangeColor: isChangeColor,
		isTiangouMode: tiangouMode,
	}
	
	localStorage.setItem("ExSave_BarrageLoopOptions", JSON.stringify(data).replace(/\\n/g, "\\r")); // 存储弹幕列表
}


function getStopTime() {
	let a = document.getElementById("bloop__text_stoptime").value;
	return Number(a) * 60 * 1000;
}

async function doLoopBarrage() {
	if (isChangeColor == true) {
		selectBarrageColor(barrageColorOffset);
		barrageColorOffset++;
		if (barrageColorOffset > barrageColorLength) {
			barrageColorOffset = 0;
		}
	}
	if (document.getElementById("bloop__checkbox_tiangou").checked == true) {
		let tiangouBarrage = await getBarrageTxt_Tiangou();
		tiangouBarrage = String(tiangouBarrage).replace(/他/g,"她");
		sendBarrage(tiangouBarrage);
	} else {
		// 判断是否开启随机模式
		if (document.getElementById("bloop__checkbox_random").checked == true) {
			barrageOffset = Math.floor(Math.random() * barrageArr.length);
		}
		sendBarrage(barrageArr[barrageOffset]);
		
		// 如果不是随机模式，则顺序发送
		if (document.getElementById("bloop__checkbox_random").checked != true) {
			barrageOffset++;
			if (barrageOffset > barrageArr.length - 1) {
				barrageOffset = 0;
			}
		}
	}
	
	bloopTimer = setTimeout(doLoopBarrage, getSpeed());
}


function initPkg_BarrageLoop_Func() {
	// 函数初始化
	// 将onclick事件绑定在这里
	document.getElementsByClassName("bloop-icon")[0].addEventListener("click", function() {
		showExRightPanel("弹幕发送小助手");
	});
	document.getElementById("bloop__checkbox_changeColor").addEventListener("click", function() {
		isChangeColor = document.getElementById("bloop__checkbox_changeColor").checked;
	});
	document.getElementById("bloop__checkbox_startSend").addEventListener("click", function() {
		let ischecked = document.getElementById("bloop__checkbox_startSend").checked;
		if (ischecked == true) {
			// 开始发送
			getBarrageArr();
			getBarrageColorArr();
			if (document.getElementById("bloop__checkbox_random").checked == true) {
				barrageOffset = Math.floor(Math.random() * barrageArr.length);
				barrageColorOffset = Math.floor(Math.random() * barrageColorArr.length);
			} else {
				barrageOffset = 0;
				barrageColorOffset = 0;
			}
			saveData_BarrageLoop();
			bloopTimer = setTimeout(doLoopBarrage, getSpeed());
			bloopStopTimer = setTimeout(() => {
				document.getElementById("bloop__checkbox_startSend").checked = false;
				clearTimeout(bloopTimer);
			}, getStopTime());
		} else{
			// 停止发送
			clearTimeout(bloopTimer);
			clearTimeout(bloopStopTimer);
			// clearInterval(bloopTimer);
		}
	});

	document.getElementById("bloop__checkbox_tiangou").addEventListener("click", function() {
		let ischecked = document.getElementById("bloop__checkbox_tiangou").checked;
		if (ischecked == true) {
			// 开启舔狗模式
			document.getElementById("bloop__textarea").disabled = true;
		} else{
			// 关闭舔狗模式
			document.getElementById("bloop__textarea").disabled = false;
		}
		saveData_BarrageLoop();
	});

  document.getElementById("bloop__select").onclick = function() {
    if (this.options.length == 0) {
      return;
    }
    let area = document.getElementById("bloop__textarea");
    let text = this.options[this.selectedIndex].text;
    area.value = text;
    area.value = area.value.replace(/\\r/g, "\r");
  };

	document.getElementById("bloop__save").addEventListener("click", () => {
		// ExSave_BarrageLoopOptions
    let select_bloop = document.getElementById("bloop__select");
    let text = document.getElementById("bloop__textarea").value;
    if (text == "") return;
    barrageOptions.push(text);
    select_bloop.options.add(new Option(text.replace(/\n/g, "\\r"), true));
    saveData_BarrageLoop();
	});

	document.getElementById("bloop__delete").addEventListener("click", () => {
		let select_bloop = document.getElementById("bloop__select");
    let index = select_bloop.options[select_bloop.selectedIndex];
    if (!index) return;
    let text = index.text;
    barrageOptions = barrageOptions.filter(item => item === text);
    select_bloop.options.remove(select_bloop.selectedIndex);
    saveData_BarrageLoop();
	});
}


function initPkg_BarrageLoop_Dom() {
	// Dom初始化
	BarrageLoop_insertModal();
	BarrageLoop_insertIcon();
}

function initPkg_BarrageLoop_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_BarrageLoopOptions");
	
	if (ret != null) {
		let retJson = JSON.parse(ret);
		if ("speed1" in retJson == false) {
			retJson.speed1 = 2000;
		}
		if ("speed2" in retJson == false) {
			retJson.speed2 = 3000;
		}
		if ("stopTime" in retJson == false) {
			retJson.stopTime = 5;
		}
		if ("isTiangouMode" in retJson == false) {
			retJson.isTiangouMode = false;
		}
    let select_bloop = document.getElementById("bloop__select");
    retJson.text.forEach(item => {
      select_bloop.options.add(new Option(item.replace(/\r/g, "\\r"), ""));
    });
    barrageOptions = retJson.text;
		document.getElementById("bloop__checkbox_changeColor").checked = retJson.isChangeColor;
		isChangeColor = Boolean(retJson.isChangeColor);
		document.getElementById("bloop__text_speed1").value = retJson.speed1;
		document.getElementById("bloop__text_speed2").value = retJson.speed2;
		document.getElementById("bloop__text_stoptime").value = retJson.stopTime;
		if (retJson.isTiangouMode == true) {
			document.getElementById("bloop__checkbox_tiangou").checked = retJson.isTiangouMode;
			document.getElementById("bloop__textarea").disabled = true;
		}
	}
}


function getBarrageTxt_Tiangou() {
	return new Promise(resolve => {
		GM_xmlhttpRequest({
            method: "GET",
            url: "https://api.shadiao.app/chp",
            responseType: "json",
            onload: function(response) {
                let ret = response.response;
                resolve(ret.data.text);
            }
        });
	})
}