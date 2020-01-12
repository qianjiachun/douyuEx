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

function getStrMiddle(str, before, after) {
	let m = str.match(new RegExp(before + '(.*?)' + after));
	return m ? m[1] : false;
}

function getToken() {
	let cookie = document.cookie;
	let ret = getStrMiddle(cookie, "acf_uid=", ";") + "_" + getStrMiddle(cookie, "acf_biz=", ";") + "_" + getStrMiddle(cookie, "acf_stk=", ";") + "_" + getStrMiddle(cookie, "acf_ct=", ";") + "_" + getStrMiddle(cookie, "acf_ltkid=", ";");
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

function closePage(){
    if(navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1){
        window.location.href = "about:blank";
        window.close();
    }else{
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