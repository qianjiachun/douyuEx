// 全局变量及公共函数
var exTimer = 0; // 总时钟句柄
var url = document.getElementsByTagName('html')[0].innerHTML;
var urlLen = ("$ROOM.room_id =").length;
var ridPos = url.indexOf('$ROOM.room_id =');
var rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
rid = rid.trim();
var dyToken = getToken();

function showExPanel() {
	// 显示功能条
	let a = document.getElementsByClassName("ex-panel")[0];
	if (a.style.display != "block") {
		a.style.display = "block";
	} else {
		a.style.display = "none";
	}
}

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function formatSeconds(value) {
	let secondTime = parseInt(value);
	let minuteTime = 0;
	let hourTime = 0;
	if (secondTime > 60) {
		minuteTime = parseInt(secondTime / 60);
		secondTime = parseInt(secondTime % 60);
		if (minuteTime > 60) {
			hourTime = parseInt(minuteTime / 60);
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result = "" + parseInt(secondTime) + "秒";
	if (minuteTime > 0) {
		result = "" + parseInt(minuteTime) + "分" + result;
	}
	if (hourTime > 0) {
		result = "" + parseInt(hourTime) + "小时" + result;
	}
	return result;
}

async function verifyFans(room_id, level) {
	let ret = false;
	let doc = await fetch('https://www.douyu.com/member/cp/getFansBadgeList',{
		method: 'GET',
		mode: 'no-cors',
		cache: 'default',
		credentials: 'include',
	}).then(res => {
		return res.text();
	}).catch(err => {
		console.log("请求失败!", err);
	})
	doc = (new DOMParser()).parseFromString(doc, 'text/html');
	let a = doc.getElementsByClassName("fans-badge-list")[0].lastElementChild;
	let n = a.children.length;
	for (let i = 0; i < n; i++) {
		let rid = a.children[i].getAttribute("data-fans-room");
		let rlv = a.children[i].getAttribute("data-fans-level");
		if (rid == room_id && rlv >= level) {
			ret = true;
			break;
		} else {
			ret = false;
		}
	}
	return ret;
}


function getStrMiddle(str, before, after) {
	let m = str.match(new RegExp(before + '(.*?)' + after));
	return m ? m[1] : false;
}

function getToken() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "acf_uid=", ";") + "_" + getStrMiddle(cookie, "acf_biz=", ";") + "_" + getStrMiddle(cookie, "acf_stk=", ";") + "_" + getStrMiddle(cookie, "acf_ct=", ";") + "_" + getStrMiddle(cookie, "acf_ltkid=", ";");
	let ret = getCookieValue("acf_uid") + "_" + getCookieValue("acf_biz") + "_" + getCookieValue("acf_stk") + "_" + getCookieValue("acf_ct") + "_" + getCookieValue("acf_ltkid");
	return ret;
}

function getDyDid() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "dy_did=", ";");
	let ret = getCookieValue("dy_did");
	return ret;
}

function setCookie(cookiename, value){
	var exp = new Date();
	exp.setTime(exp.getTime() + 3*60*60*1000);
	document.cookie = cookiename + "="+ escape (value) + "; path=/; expires=" + exp.toGMTString();
}
function getCookieValue(name){
   let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
function getCCN() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "acf_ccn=", ";");
	let ret = getCookieValue("acf_ccn");
	if (ret == null) {
		setCookie("acf_ccn", "1");
		ret = "1";
	}
	return ret;
}

function showMessage(msg, type) {
	// type: success[green] error[red] warning[orange] info[blue]
	new NoticeJs({
		text: msg,
		type: type,
		position: 'bottomRight',
	}).show();
}

function openPage(url, b) {
	GM_openInTab(url, {
		active: b
	});
}

function closePage() {
	if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
		window.location.href = "about:blank";
		window.close();
	} else {
		window.opener = null;
		window.open("", "_self");
		window.close();
	}
}

function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	if (window.location.hash.indexOf("?") < 0) {
		return null;
	}
	let r = window.location.hash.split("?")[1].match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

function dateFormat(fmt, date) {
	var o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function isRid(str) {
	if (/^[0-9]+$/.test(str)) { //这是用正则表达是检查
		return true;
	} else {
		return false;
	}
}
