let real_info = {
	view: "",
	showtime: 1428,
	danmu_person_count: "",
	gift_person_count: "",
	paid_person_count: "",
	isShow: 2,
	money_yc: 0,
	money_bag: 0,
	money_total: 0,
}
let hasAvatarBottom = false;

function initPkg_RealAudience() {
	initPkg_RealAudience_StyleHook();
	initPkg_RealAudience_Dom();
	initPkg_RealAudience_Func();
	setAvatarVideo();

	fetch("https://www.douyu.com/swf_api/h5room/" + rid, {
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(retData => {
		real_info.showtime = retData.data.show_time;
		real_info.isShow = retData.data.show_status;
		setRealViewer();
		setInterval(setRealViewer, 150000);
		setInterval(switchRealAndTodayWatch, 5000);
	}).catch(err => {
		console.log("请求失败!", err);
	})
}

function initPkg_RealAudience_StyleHook() {
	StyleHook_set("Ex_Style_RealAudience", `
    .VideoEntry{display:none !important;}
	.layout-Player-rank{top:34px !important;}
    `);
}

function initPkg_RealAudience_Dom() {
	let real_viewIcon = '<svg style="width:16px;height:16px" t="1566119680547" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3494" width="128" height="128"><path d="M712.820909 595.224609C807.907642 536.686746 870.40537 437.74751 870.40537 325.549212 870.400378 145.753547 709.943392 0 511.997503 0 314.055363 0 153.599626 145.753547 153.599626 325.549212 153.599626 437.74751 216.092361 536.686746 311.179092 595.219615 149.961841 657.72608 31.268214 793.205446 5.334335 955.968198 1.926253 962.195123 0 969.212275 0 976.638899 0 1002.324352 22.919038 1023.151098 51.198627 1023.151098 79.476967 1023.151098 102.396005 1002.324352 102.396005 976.638899L102.396005 1023.151098C102.396005 817.669984 285.787009 651.099674 511.997503 651.099674 738.212992 651.099674 921.602746 817.669984 921.602746 1023.151098L921.602746 976.638899C921.602746 1002.324352 944.523034 1023.151098 972.801376 1023.151098 1001.07472 1023.151098 1024 1002.324352 1024 976.638899 1024 969.212275 1022.073747 962.195123 1018.659424 955.968198 992.731789 793.205446 874.038157 657.72608 712.820909 595.224609ZM511.997503 558.080262C370.618285 558.080262 256.000624 453.967732 256.000624 325.545467 256.000624 197.121954 370.618285 93.009424 511.997503 93.009424 653.386707 93.009424 767.993133 197.121954 767.993133 325.545467 767.993133 453.972726 653.386707 558.080262 511.997503 558.080262L511.997503 558.080262Z" p-id="3495"></path></svg>';
	let real_danmuIcon = '<svg t="1587796804183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20780" width="16" height="16"><path d="M811.8272 62.6176H212.1728c-79.9232 0-149.8624 69.9392-149.8624 149.9136v599.6032a150.3232 150.3232 0 0 0 149.8624 149.9136h599.6544a150.3232 150.3232 0 0 0 149.8624-149.9136V212.5312c0-79.9744-69.9392-149.9136-149.8624-149.9136zM263.5264 367.104c30.0032 0 49.9712 19.968 49.9712 49.9712s-19.968 49.92-49.9712 49.92-49.9712-19.968-49.9712-49.92 20.0192-49.9712 49.9712-49.9712z m449.6896 294.8096H263.5264c-24.9856 0-49.9712-24.9856-49.9712-49.9712s24.9856-49.9712 49.9712-49.9712h449.6896c24.9856 0 49.9712 24.9856 49.9712 49.9712s-24.9856 49.9712-49.9712 49.9712z m99.9424-199.68H463.4112c-24.9856 0-49.9712-24.9856-49.9712-49.9712s24.9856-49.9712 49.9712-49.9712h349.7472c24.9856 0 49.9712 24.9856 49.9712 49.9712s-24.9856 49.7664-49.9712 49.7664z" p-id="20781" fill="#1296db"></path></svg>';
	// let real_giftIcon = '<svg t="1576950815993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3618" width="16" height="16"><path d="M554.957 829.848l-85.905 0 0-463.89c0-18.978 15.384-34.363 34.362-34.363l17.182 0c18.978 0 34.362 15.38499999 34.362 34.363l0 463.89z" fill="#d4237a" p-id="3619"></path><path d="M889.985 494.814l-755.97 0c-37.902 0-68.724-30.82999999-68.724-68.725L65.291 323.003c0-56.846 46.241-103.087 103.087-103.087l687.245 0c56.846 0 103.087 46.24 103.087 103.087l0 103.086c-0.001 37.894-30.823 68.725-68.725 68.725z m0-68.725l0 34.363 0.016-34.363-0.016 0zM168.377 288.64c-18.94300001 0-34.363 15.412-34.363 34.364l0 103.086 755.87 0 0.1-103.086c0-18.952-15.42-34.363-34.363-34.363L168.377 288.641z" fill="#d4237a" p-id="3620"></path><path d="M821.26 958.712L202.74 958.712c-37.903 0-68.725-30.838-68.725-68.732L134.015 494.814c0-37.89400001 30.822-68.725 68.724-68.725l618.522 0c37.902 0 68.724 30.82999999 68.724 68.725L889.985 889.98c0 37.89400001-30.822 68.73199999-68.724 68.732z m0-68.732l0 34.362 0.017-34.362-0.016 0zM202.74 494.814L202.74 889.98l618.42 0 0.1-395.166L202.74 494.814z m281.358-240.537c-9.93399999 0-19.78200001-4.278-26.578-12.55L358.728 121.46c-12.03-14.664-9.916-36.317 4.748-48.363 14.648-12.038 36.326-9.924 48.373 4.74l98.79199999 120.268c12.03 14.664 9.916 36.317-4.74799999 48.363a34.213 34.213 0 0 1-21.795 7.81z" fill="#d4237a" p-id="3621"></path><path d="M539.902 254.277a34.212 34.212 0 0 1-21.795-7.81c-14.664-12.047-16.778-33.7-4.748-48.363L612.15 77.836c12.047-14.664 33.708-16.101599999 48.373-4.74 14.664 12.047 16.778 33.7 4.748 48.363l-98.792 120.268c-6.795 8.272-16.644 12.55-26.577 12.55z" fill="#d4237a" p-id="3622"></path></svg>'
	let real_money_yc = '<svg t="1579155265981" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6949" width="16" height="16"><path d="M136.96 67.413h181.76L512 452.693l193.28-385.28h181.76l-245.76 445.44h163.84v84.48h-211.2l-1.28 1.28v106.24h212.48v84.48H592.64v192H431.36v-192h-211.2v-84.48h211.2v-106.24l-1.28-1.28H220.16v-84.48h162.56z" fill="#F54330" p-id="6950"></path></svg>';
	const videoEntry = document.getElementsByClassName("VideoEntry")[0];
	if (videoEntry) videoEntry.style.display = "none";
	// document.querySelector(".AnchorAnnounce > h3").style.display = "none";
	let html = "";
	let a = document.createElement("div");
	a.className = "real-audience";
	html += "<div style='flex: 1;white-space: nowrap'>";
	html += "<div id='real-audience__t' style='display: inline-block;margin-right:3px;' title='今日累计观看人数'>" + real_viewIcon + '<span id="real-audience__total" style="color:#ed5a65">****</span></div>';
	html += "<div style='display: inline-block;margin-right:3px;' title='弹幕人数'>" + real_danmuIcon + '<span id="real-audience__barrage">****</span></div>';
	// html += "<div style='display: inline-block;margin-right:3px;' title='送礼人数'>" + real_giftIcon + '<span id="real-audience__gift">****</span></div>';
	html += "<div id='real-audience__money' style='display: inline-block;margin-right:3px;' title='今日累计礼物价值'>" + real_money_yc + '<span id="real-audience__money_yc">****</span></div>';
	html += "</div>";
	html += '<span id="real-audience__time" style="white-space: nowrap;display: block;">' + "已播:" + "****" + "</span>";
	html += '<span id="real-audience__watchtime" style="white-space: nowrap;display: none;">' + "已观看:" + "****" + "</span>";
	a.innerHTML = html;
	
	let b = getValidDom([".layout-Player-announce", ".layout-Player-rankAll"]);
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_RealAudience_Func() {
	document.getElementsByClassName("real-audience")[0].addEventListener("click", function() {
		openPage(`https://www.doseeing.com/room/${rid}`, true);
	})
}

async function setRealViewer() {
	if(document.querySelector(".MatchSystemChatRoomEntry") != null){
		document.querySelector(".MatchSystemChatRoomEntry").style.display = "none";
	}
	let retData = await getRealViewer(rid);
	let todayWatchData = await getTodayWatch(rid);
	let showedTime = 0;
	if (real_info.isShow == 2) {
		showedTime = 0;
	} else {
		if (real_info.showtime == 1428) {
			showedTime = 0;
		} else {
			showedTime = Math.floor(Date.now()/1000) - Number(real_info.showtime);
		}
	}
	real_info.view = retData.data["active.uv"] || 0;
	real_info.danmu_person_count = retData.data["chat.uv"] || 0;
	real_info.gift_person_count = retData.data["gift.all.uv"] || 0;
	real_info.paid_person_count = retData.data["gift.paid.uv"] || 0;
	real_info.money_yc = Number(retData.data["gift.paid.price"] / 100 || 0).toFixed(2);
	real_info.money_total = Number(retData.data["gift.all.price"] / 100 || 0).toFixed(2);
	
	document.getElementById("real-audience__total").innerText = real_info.view;
	document.getElementById("real-audience__t").title = "今日累计活跃人数:" + real_info.view + " 弹幕人数:" + real_info.danmu_person_count + " 送礼人数:" + real_info.gift_person_count + " 付费人数:" + real_info.paid_person_count;
	document.getElementById("real-audience__barrage").innerText = real_info.danmu_person_count;
	// document.getElementById("real-audience__gift").innerText = real_info.gift_person_count;
	document.getElementById("real-audience__money_yc").innerText = real_info.money_yc;
	document.getElementById("real-audience__money").title = "总礼物价值:" + real_info.money_total + " 鱼翅礼物:" + real_info.money_yc;
	
	document.getElementById("real-audience__time").innerText = "已播:" + formatSeconds(showedTime);
	document.getElementById("real-audience__time").title = "开播时间:" + String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date(Number(real_info.showtime + "000")))) + "\n已观看:" + formatSeconds(todayWatchData.data.todayWatch);
	
	if (todayWatchData.error == 0) {
		document.getElementById("real-audience__watchtime").innerText = "已观看:" + formatSeconds(todayWatchData.data.todayWatch);
		document.getElementById("real-audience__watchtime").title = "开播时间:" + String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date(Number(real_info.showtime + "000")))) + "\n已观看:" + formatSeconds(todayWatchData.data.todayWatch);
	}
}

function setAvatarVideo() {
	// 1. 插入对应的dom
	// 2. 绑定相应的函数
	// 3. 拉高黑框
	// 4. 对头像框鼠标移入移出事件绑定
	let homeDom = document.querySelectorAll(".VideoEntry-tabItem>a")[0];
	if (homeDom == undefined) {
		return;
	}
	let videoUrl = homeDom.href + "?type=video";
	let videoReplayUrl = homeDom.href + "?type=liveReplay";
	
	setAvatarVideo_Dom();
	setAvatarYuba_Dom();
	setAvatarVideo_Func(videoUrl, videoReplayUrl);
	document.getElementsByClassName("Title-anchorPic-bottom")[0].style.display = "none";
	document.getElementsByClassName("Title-anchorPic-bottom")[0].style.height = hasAvatarBottom ? "66px" : "22px";

	document.getElementsByClassName("Title-anchorPicBack")[0].addEventListener("mouseenter", () => {
		document.getElementsByClassName("Title-anchorPic-bottom")[0].style.display = "block";
	});
	document.getElementsByClassName("Title-anchorPicBack")[0].addEventListener("mouseleave", () => {
		document.getElementsByClassName("Title-anchorPic-bottom")[0].style.display = "none";
	});
}

function setAvatarVideo_Dom() {
	let a = document.createElement("div");
	hasAvatarBottom = !!document.getElementsByClassName("Title-anchorPic-bottom")[0];

	a.className = hasAvatarBottom ? "" : "Title-anchorPic-bottom";
	a.innerHTML = `
	<div id="Ex_VideoReview" class="Title-anchorPic-bottomItem"><span>回看</span></div>
	<i style="top: 28px"></i>
	<div id="Ex_VideoSubmit" class="Title-anchorPic-bottomItem"><span>投稿</span></div>
	`
	let b = document.getElementsByClassName("Title-anchorPic-bottom")[0] || document.getElementsByClassName("Title-anchorPicBack")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function setAvatarYuba_Dom() {
	let a = document.createElement("div");
	hasAvatarBottom = !!document.getElementsByClassName("Title-anchorPic-bottom")[0];

	a.className = hasAvatarBottom ? "" : "Title-anchorPic-bottom";
	a.innerHTML = `
	<div id="Ex_EnterYuba" class="Title-anchorPic-bottomItem"><span>打开鱼吧</span></div>
	`
	let b = document.getElementsByClassName("Title-anchorPic-bottom")[0] || document.getElementsByClassName("Title-anchorPicBack")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function setAvatarVideo_Func(videoUrl, videoReplayUrl) {
	document.getElementById("Ex_VideoSubmit").addEventListener("click", () => {
		openPage(videoUrl, true);
	})

	document.getElementById("Ex_VideoReview").addEventListener("click", () => {
		openPage(videoReplayUrl, true);
	})

	document.getElementById("Ex_EnterYuba").addEventListener("click", async () => {
		const data = await getBindYuba(rid);
		const url = data.data.group_url;
		openPage(url, true);
	})
}

function getBindYuba(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/wgapi/yubanc/api/group/getBindGroup?room_id=" + rid)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getTodayWatch(rid) {
	return new Promise((resolve, reject) => {
		fetch('https://www.douyu.com/japi/interactnc/web/fsjk/getCardTaskInfo?rid=' + rid,{
			method: 'GET',
			mode: 'no-cors',
			credentials: 'include'
		}).then(res => {
			return res.json();
		}).then(ret => {
			resolve(ret);
		}).catch(err => {
			reject(err);
		})
	})
}

function getRealViewer(rid) {
	return new Promise((resolve, reject) => {
		GM_xmlhttpRequest({
			method: "POST",
			url: `https://www.doseeing.com/xeee/room/aggr`,
			headers: {
				"Connection": "keep-alive",
				"Content-Type": "application/json;charset=UTF-8",
				"Origin": "https://www.doseeing.com",
				"Referer": "https://www.doseeing.com/room/" + rid,
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/91.0.4472.114"
			},
			data: `{"m":"${window.btoa(`rid=${rid}&dt=0`).split("").reverse().join("")}"}`,
			responseType: "json",
			onload: (response) => {
				resolve(response.response);
			},
			onerror: (err) => {
				reject(err);
			}
		});
	})
}

function switchRealAndTodayWatch() {
	let realDom = document.getElementById("real-audience__time");
	let watchDom = document.getElementById("real-audience__watchtime");
	if (realDom.style.display == "none") {
		realDom.style.display = "block";
		watchDom.style.display = "none";
	} else {
		realDom.style.display = "none";
		watchDom.style.display = "block";
	}
}