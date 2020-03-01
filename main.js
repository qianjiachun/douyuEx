"use strict";
// ==UserScript==
// @name         DouyuEx-斗鱼直播间增强插件
// @namespace    https://github.com/qianjiachun
// @icon         https://s2.ax1x.com/2020/01/12/loQI3V.png
// @version      2020.03.01.01
// @description  弹幕自动变色防检测循环发送 一键续牌 查看真实人数/查看主播数据 已播时长 一键签到(直播间/车队/鱼吧/客户端) 一键领取鱼粮(宝箱/气泡/任务) 一键寻宝 送出指定数量的礼物 一键清空背包 屏蔽广告 调节弹幕大小 自动更新 同屏画中画/多直播间小窗观看/可在斗鱼看多个平台直播(b站虎牙) 获取真实直播流地址 自动抢礼物红包 不绑定手机发送弹幕
// @author       小淳
// @match			*://*.douyu.com/0*
// @match			*://*.douyu.com/1*
// @match			*://*.douyu.com/2*
// @match			*://*.douyu.com/3*
// @match			*://*.douyu.com/4*
// @match			*://*.douyu.com/5*
// @match			*://*.douyu.com/6*
// @match			*://*.douyu.com/7*
// @match			*://*.douyu.com/8*
// @match			*://*.douyu.com/9*
// @match			*://*.douyu.com/topic/*
// @match        *://msg.douyu.com/*
// @require      https://cdn.jsdelivr.net/npm/flv.js@1.5.0/dist/flv.min.js
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// ==/UserScript==
function initPkg() {
	initPkg_ExIcon();
	initPkg_ExPanel();
	initPkg_RemoveAD();
	initPkg_RealAudience();
	initPkg_Update();
	initPkg_PopupPlayer();
	initPkg_ExpandTool();
	initPkg_BarrageLoop();
	initPkg_FansContinue();
	initPkg_FishFood();
	initPkg_FishPond();
	initPkg_Sign();
}
function initPkg_Timer() {
	initPkg_FishPond_Timer();
}
function initTimer() {
	initPkg_Timer();
	exTimer = setInterval(initPkg_Timer, 20000);
}

function initStyles() {
	let style = document.createElement("style");
	style.appendChild(document.createTextNode(`
.bloop {
	background-color: rgba(255,255,255,0.9);
	width: 100%;
	height: 200px;
	position: relative;
	bottom: 200px;
	display: none;
}

.bloop__switch {
	position: absolute;
	right: 0;
	bottom: 0;
}
.ex-icon {
	display: inline-block;
	vertical-align: middle;
	margin-right: 8px;
}
.extool {
	background-color: rgba(255,255,255,0.9);
	width: 100%;
	height: 200px;
	position: relative;
	bottom: 200px;
	display: none;
}

.extool__switch {
	position: absolute;
	right: 0;
	bottom: 0;
}
.extool__bsize,.extool__sendgift {
	margin-bottom: 5px;
}

.ex-panel {
	width: 500px;
	height: 50px;
	position: absolute;
	bottom: 35px;
	right: 75px;
	background-color: rgba(255,255,255,0.9);
	display: none;
	border: 2px rgb(234,173,26) solid;
}
.ex-panel__wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}
.ex-panel__icon {
	margin: 0 10px;
	display: block;
	position: relative;
	padding: 5px;
}
.ex-panel__tip {
	display:none;
	background:#f00;
	border-radius:50%;
	width:8px;
	height:8px;
	top:0px;
	right:0px;
	position:absolute;
}
.videoDiv {
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    z-index: 7777;
}

.videoPlayer {
    width: 100%;
    height: 100%;
    cursor: move;
}

.videoScale {
    width: 10px;
    height: 10px;
    overflow: hidden;
    cursor: se-resize;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgb(231, 57, 57);
}

.videoInfo {
    width: 100%;
    height: 30px;
    background-color: gray;
    position: absolute;
    top: -30px;
    line-height: 30px;
}

.videoClose {
    width: 30px;
    float: right;
    color: white;
}

.videoQn, .videoCDN {
    margin-left: 5px;
}

.videoRID {
    margin: 0px 5px;
    font-weight: 800;
    font-size: medium;
}

#popup-player__prompt {
    display: none;
}

.postbird-box-container{width:100%;height:100%;overflow:hidden;position:fixed;top:0;left:0;z-index:9999;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.postbird-box-container.active{display:block}.postbird-box-content{width:400px;max-width:90%;min-height:170px;background-color:#fff;border:solid 1px #dfdfdf;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);margin-top:-100px}.postbird-box-header{width:100%;padding:10px 15px;position:relative;font-size:1.1em;letter-spacing:2px}.postbird-box-close-btn{cursor:pointer;font-weight:700;color:#000;float:right;opacity:.5;font-size:1.3em;margin-top:-3px;display:none}.postbird-box-close-btn:hover{opacity:1}.postbird-box-text{box-sizing: border-box;width:100%;padding:0 10%;text-align:center;line-height:40px;font-size:20px;letter-spacing:1px}.postbird-box-footer{width:100%;position:absolute;bottom:0;padding:0;margin:0;display:flex;display:-webkit-flex;justify-content:space-around;border-top:solid 1px #dfdfdf;align-items:flex-end}.postbird-box-footer .btn-footer{line-height:44px;border:0;cursor:pointer;background-color:#fff;color:#0e90d2;font-size:1.1em;letter-spacing:2px;transition:background-color .5s;-webkit-transition:background-color .5s;-o-transition:background-color .5s;-moz-transition:background-color .5s;outline:0}.postbird-box-footer .btn-footer:hover{background-color:#e5e5e5}.postbird-box-footer .btn-block-footer{width:100%}.postbird-box-footer .btn-left-footer,.postbird-box-footer .btn-right-footer{position:relative;width:100%}.postbird-box-footer .btn-left-footer::after{content:"";position:absolute;right:0;top:0;background-color:#e5e5e5;height:100%;width:1px}.postbird-box-footer .btn-footer-cancel{color:#333}.postbird-prompt-input{width:100%;padding:5px;font-size:16px;border:1px solid #ccc;outline:0}
.real-audience {
    cursor: pointer;
}
/*
    Notice.css
*/
.noticejs-top{top:0;width:100%!important}.noticejs-top .item{border-radius:0!important;margin:0!important}.noticejs-topRight{top:10px;right:10px}.noticejs-topLeft{top:10px;left:10px}.noticejs-topCenter{top:10px;left:50%;transform:translate(-50%)}.noticejs-middleLeft,.noticejs-middleRight{right:10px;top:50%;transform:translateY(-50%)}.noticejs-middleLeft{left:10px}.noticejs-middleCenter{top:50%;left:50%;transform:translate(-50%,-50%)}.noticejs-bottom{bottom:0;width:100%!important}.noticejs-bottom .item{border-radius:0!important;margin:0!important}.noticejs-bottomRight{bottom:10px;right:10px}.noticejs-bottomLeft{bottom:10px;left:10px}.noticejs-bottomCenter{bottom:10px;left:50%;transform:translate(-50%)}.noticejs{font-family:Helvetica Neue,Helvetica,Arial,sans-serif}.noticejs .item{margin:0 0 10px;border-radius:3px;overflow:hidden}.noticejs .item .close{float:right;font-size:18px;font-weight:700;line-height:1;color:#fff;text-shadow:0 1px 0 #fff;opacity:1;margin-right:7px}.noticejs .item .close:hover{opacity:.5;color:#000}.noticejs .item a{color:#fff;border-bottom:1px dashed #fff}.noticejs .item a,.noticejs .item a:hover{text-decoration:none}.noticejs .success{background-color:#64ce83}.noticejs .success .noticejs-heading{background-color:#3da95c;color:#fff;padding:10px}.noticejs .success .noticejs-body{color:#fff;padding:10px}.noticejs .success .noticejs-body:hover{visibility:visible!important}.noticejs .success .noticejs-content{visibility:visible}.noticejs .info{background-color:#3ea2ff}.noticejs .info .noticejs-heading{background-color:#067cea;color:#fff;padding:10px}.noticejs .info .noticejs-body{color:#fff;padding:10px}.noticejs .info .noticejs-body:hover{visibility:visible!important}.noticejs .info .noticejs-content{visibility:visible}.noticejs .warning{background-color:#ff7f48}.noticejs .warning .noticejs-heading{background-color:#f44e06;color:#fff;padding:10px}.noticejs .warning .noticejs-body{color:#fff;padding:10px}.noticejs .warning .noticejs-body:hover{visibility:visible!important}.noticejs .warning .noticejs-content{visibility:visible}.noticejs .error{background-color:#e74c3c}.noticejs .error .noticejs-heading{background-color:#ba2c1d;color:#fff;padding:10px}.noticejs .error .noticejs-body{color:#fff;padding:10px}.noticejs .error .noticejs-body:hover{visibility:visible!important}.noticejs .error .noticejs-content{visibility:visible}.noticejs .progressbar{width:100%}.noticejs .progressbar .bar{width:1%;height:30px;background-color:#4caf50}.noticejs .success .noticejs-progressbar{width:100%;background-color:#64ce83;margin-top:-1px}.noticejs .success .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#3da95c}.noticejs .info .noticejs-progressbar{width:100%;background-color:#3ea2ff;margin-top:-1px}.noticejs .info .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#067cea}.noticejs .warning .noticejs-progressbar{width:100%;background-color:#ff7f48;margin-top:-1px}.noticejs .warning .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#f44e06}.noticejs .error .noticejs-progressbar{width:100%;background-color:#e74c3c;margin-top:-1px}.noticejs .error .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#ba2c1d}@keyframes noticejs-fadeOut{0%{opacity:1}to{opacity:0}}.noticejs-fadeOut{animation-name:noticejs-fadeOut}@keyframes noticejs-modal-in{to{opacity:.3}}@keyframes noticejs-modal-out{to{opacity:0}}.noticejs-rtl .noticejs-heading{direction:rtl}.noticejs-rtl .close{float:left!important;margin-left:7px;margin-right:0!important}.noticejs-rtl .noticejs-content{direction:rtl}.noticejs{position:fixed;z-index:10050;width:320px}.noticejs ::-webkit-scrollbar{width:8px}.noticejs ::-webkit-scrollbar-button{width:8px;height:5px}.noticejs ::-webkit-scrollbar-track{border-radius:10px}.noticejs ::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.5);border-radius:10px}.noticejs ::-webkit-scrollbar-thumb:hover{background:#fff}.noticejs-modal{position:fixed;width:100%;height:100%;background-color:#000;z-index:10000;opacity:.3;left:0;top:0}.noticejs-modal-open{opacity:0;animation:noticejs-modal-in .3s ease-out}.noticejs-modal-close{animation:noticejs-modal-out .3s ease-out;animation-fill-mode:forwards}

`));
	document.head.appendChild(style);
}



(function() {
	if (window.location.host == "msg.douyu.com") {
		if (getQueryString("exid") == "chun") {
			signMotorcade_Sign(getQueryString("mid"), getQueryString("total"));
		}
	} else {
        if (String(location.href).indexOf("exid=chun") != -1) {
            let intID = setInterval(() => {
                if (typeof(document.querySelector('div.wfs-2a8e83')) != "undefined") {
                    document.querySelector('div.wfs-2a8e83').click();
					document.querySelector('label.layout-Player-asidetoggleButton').click();
					let l = document.querySelectorAll(".tip-e3420a > ul > li").length;
					document.querySelectorAll(".tip-e3420a > ul > li")[l - 1].click();
                    clearInterval(intID);
                }
            }, 1000);
        } else {
            let intID = setInterval(() => {
                if (typeof(document.getElementsByClassName("ChatToolBar")[0]) != "undefined") {
                    setTimeout(() => {
                        initStyles();
                        initPkg();
                        initTimer();
                    }, 1000)
                    clearInterval(intID);
                }
            }, 1000);
        }
	}
})();
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

function initPkg_BarrageLoop() {
	initPkg_BarrageLoop_Dom();
	initPkg_BarrageLoop_Func();
	initPkg_BarrageLoop_Set();
}

function BarrageLoop_insertModal() {
	let html = "";
	let a = document.createElement("div");
	a.className = "bloop";
	html += '<div><label>弹幕(一行一个)：</label></div>';
	html += '<textarea id="bloop__textarea" rows="5" cols="50"></textarea>';
	html += '<div><label>速度(ms)：</label><input id="bloop__text_speed1" type="text" style="width:50px;text-align:center;" value="2000" />~<input id="bloop__text_speed2" type="text" style="width:50px;text-align:center;" value="3000" /></div>';
	html += '<div><label>限时(min)：</label><input id="bloop__text_stoptime" type="text" style="width:50px;text-align:center;" value="1" /></div>';
	html += '<div><label><input id="bloop__checkbox_changeColor" type="checkbox" name="checkbox_changeColor" checked>自动变色</label></div>';
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
	let a = document.getElementsByClassName("FansBarrageColor-item");
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
		a = document.getElementsByClassName("FansBarrageColor-item")[index];
	} else{
		document.getElementsByClassName("MatchSystemFansBarrageSwitcher")[0].click()
		a = document.getElementsByClassName("MatchSystemFansBarrageColor-item")[index];
	}
	
	if (a != undefined) {
		a.click();
	}
}
function sendBarrage(text) {
	// 发送弹幕
	document.getElementsByClassName("ChatSend-txt")[0].value = text;
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
		text: document.getElementById("bloop__textarea").value,
		speed1: speed1,
		speed2: speed2,
		stopTime: stopTime,
		isChangeColor: isChangeColor,
	}
	
	localStorage.setItem("ExSave_BarrageLoop", JSON.stringify(data)); // 存储弹幕列表
}


function getStopTime() {
	let a = document.getElementById("bloop__text_stoptime").value;
	return Number(a) * 60 * 1000;
}

function doLoopBarrage() {
	if (isChangeColor == true) {
		selectBarrageColor(barrageColorOffset);
		barrageColorOffset++;
		if (barrageColorOffset > barrageColorLength) {
			barrageColorOffset = 0;
		}
	}
	sendBarrage(barrageArr[barrageOffset]);
	barrageOffset++;
	if (barrageOffset > barrageLength) {
		barrageOffset = 0;
	}
	bloopTimer = setTimeout(doLoopBarrage, getSpeed());
}


function initPkg_BarrageLoop_Func() {
	// 函数初始化
	// 将onclick事件绑定在这里
	document.getElementsByClassName("bloop-icon")[0].addEventListener("click", function() {
		let a = document.getElementsByClassName("bloop")[0];
		if (a.style.display != "block") {
			a.style.display = "block";
			if (document.getElementsByClassName("extool")[0].style.display == "block") {
				document.getElementsByClassName("extool")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
	});
	document.getElementById("bloop__checkbox_changeColor").addEventListener("click", function() {
		isChangeColor = document.getElementById("bloop__checkbox_changeColor").checked;
	});
	document.getElementById("bloop__checkbox_startSend").addEventListener("click", function() {
		let ischecked = document.getElementById("bloop__checkbox_startSend").checked;
		if (ischecked == true) {
			// 开始发送
			barrageOffset = 0;
			barrageColorOffset = 0;
			getBarrageArr();
			getBarrageColorArr();
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
}

function initPkg_BarrageLoop_Dom() {
	// Dom初始化
	BarrageLoop_insertModal();
	BarrageLoop_insertIcon();
}

function initPkg_BarrageLoop_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_BarrageLoop");
	
	if (ret != null) {
		let retJson = JSON.parse(ret);
		if (retJson.speed1 == undefined) {
			retJson.speed1 = 2000;
		}
		if (retJson.speed2 == undefined) {
			retJson.speed2 = 3000;
		}
		if (retJson.stopTime == undefined) {
			retJson.stopTime = 5;
		}
		document.getElementById("bloop__textarea").value = retJson.text;
		document.getElementById("bloop__checkbox_changeColor").checked = retJson.isChangeColor;
		isChangeColor = Boolean(retJson.isChangeColor);
		document.getElementById("bloop__text_speed1").value = retJson.speed1;
		document.getElementById("bloop__text_speed2").value = retJson.speed2;
		document.getElementById("bloop__text_stoptime").value = retJson.stopTime;
	}
}


function initPkg_ExIcon() {
	
	pkg_ExIcon_insertDom();
	pkg_ExIcon_initFunc();
}
function pkg_ExIcon_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-icon";
	a.innerHTML = '<a title="～ (´• ᵕ •`)*✲"><svg t="1578667843177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5685" width="30" height="30"><path d="M512 937.353846c-234.732308 0-425.353846-190.621538-425.353846-425.353846 0-17.329231 14.178462-31.507692 31.507692-31.507692h236.307692c17.329231 0 31.507692 14.178462 31.507693 31.507692 0 69.316923 56.713846 126.030769 126.030769 126.030769s126.030769-56.713846 126.030769-126.030769c0-17.329231 14.178462-31.507692 31.507693-31.507692h236.307692c17.329231 0 31.507692 14.178462 31.507692 31.507692 0 234.732308-190.621538 425.353846-425.353846 425.353846zM151.236923 543.507692c15.753846 185.107692 171.716923 330.830769 360.763077 330.83077s345.009231-145.723077 360.763077-330.83077H698.683077C683.716923 632.516923 605.735385 701.046154 512 701.046154s-171.716923-68.529231-186.683077-157.538462H151.236923z" fill="#33363a" p-id="5686"></path><path d="M512 118.153846c-217.403077 0-393.846154 176.443077-393.846154 393.846154h236.307692c0-86.646154 70.892308-157.538462 157.538462-157.538462s157.538462 70.892308 157.538462 157.538462h236.307692c0-217.403077-176.443077-393.846154-393.846154-393.846154z" fill="#d60909" p-id="5687"></path><path d="M905.846154 543.507692H669.538462c-17.329231 0-31.507692-14.178462-31.507693-31.507692 0-69.316923-56.713846-126.030769-126.030769-126.030769s-126.030769 56.713846-126.030769 126.030769c0 17.329231-14.178462 31.507692-31.507693 31.507692H118.153846c-17.329231 0-31.507692-14.178462-31.507692-31.507692 0-234.732308 190.621538-425.353846 425.353846-425.353846s425.353846 190.621538 425.353846 425.353846c0 17.329231-14.178462 31.507692-31.507692 31.507692z m-207.163077-63.015384h174.867692C857.009231 295.384615 701.046154 149.661538 512 149.661538S166.990769 295.384615 151.236923 480.492308h174.867692C340.283077 391.483077 418.264615 322.953846 512 322.953846s171.716923 68.529231 186.683077 157.538462z" fill="#33363a" p-id="5688"></path><path d="M512 701.046154c-103.975385 0-189.046154-85.070769-189.046154-189.046154s85.070769-189.046154 189.046154-189.046154 189.046154 85.070769 189.046154 189.046154-85.070769 189.046154-189.046154 189.046154z m0-315.076923c-69.316923 0-126.030769 56.713846-126.030769 126.030769s56.713846 126.030769 126.030769 126.030769 126.030769-56.713846 126.030769-126.030769-56.713846-126.030769-126.030769-126.030769z" fill="#33363a" p-id="5689"></path><path d="M512 512m-78.769231 0a78.769231 78.769231 0 1 0 157.538462 0 78.769231 78.769231 0 1 0-157.538462 0Z" fill="#33363a" p-id="5690"></path></svg><i id="ex-icon__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
	
	
}
function pkg_ExIcon_initFunc() {
	document.getElementsByClassName("ex-icon")[0].addEventListener("click", showExPanel);
	// unsafeWindow.showExPanel = showExPanel;
}

function ExIcon_showTip(a) {
	let d = document.getElementById("ex-icon__tip");
	if (a == true) {
		d.style.display = "block";
	} else {
		d.style.display = "none";
	}
}

function initPkg_ExpandTool() {
	initPkg_ExpandTool_Dom();
    initPkg_ExpandTool_Func();

	initPkg_ExpandTool_RedPacket_Room();
	initPkg_ExpandTool_ClearBag();
    initPkg_ExpandTool_SendGift();
    initPkg_ExpandTool_BarrageSize();
}


function initPkg_ExpandTool_Dom() {
	// Dom初始化
	ExpandTool_insertModal();
    ExpandTool_insertIcon();
    
}
function ExpandTool_insertModal() {
	let a = document.createElement("div");
	a.className = "extool";
	
	let b = document.getElementsByClassName("layout-Player-chat")[0];
	b.insertBefore(a, b.childNodes[0]);
}
function ExpandTool_insertIcon() {
	let a = document.createElement("div");
	a.className = "extool-icon";
	a.innerHTML = '<a class="ex-panel__icon" title="扩展功能"><svg t="1578755163250" style="display: block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16761" width="32" height="32"><path d="M816.784579 684.416257L646.90465 812.225921c-21.984461 16.588275-50.963979-1.898658-50.963979-32.477045l0.299788-183.270465c0-13.890182 6.495409-26.781071 16.987993-33.576268L782.808593 452.779977c21.984461-14.2899 49.16525 4.296963 49.16525 33.676197v165.682896c0 12.990818-5.695974 25.182201-15.189264 32.277187z" fill="#d81e06" p-id="16762"></path><path d="M809.689594 324.970312l-1.698799-2.798022c-8.194208-13.290606-25.681848-17.38771-38.972455-9.293432l-254.819894 156.989041-271.508099-156.689253c-14.090041-8.194208-32.377116-3.297669-40.471395 10.892302l-0.999293 1.698799c-7.794491 13.490465-3.09781 30.878175 10.392654 38.672666l273.806475 158.088264c-2.098517 3.897245-3.297669 8.394067-3.29767 13.190677v321.772572c0 16.288487 13.290606 29.679023 29.679023 29.679023h1.998588c15.588982 0 28.280012-12.790959 28.280011-28.280012V535.821283c0-3.997175-0.799435-7.794491-2.298375-11.192089l260.715727-160.586498c13.190677-8.194208 17.38771-25.781778 9.193502-39.072384z" fill="#d81e06" p-id="16763"></path><path d="M379.993302 708.799023L203.917752 607.170854c-13.790253-7.89442-18.486933-25.681848-10.592514-39.472102l1.099223-1.898658c7.89442-13.790253 25.681848-18.486933 39.472102-10.592513l176.07555 101.62817c13.790253 7.89442 18.486933 25.681848 10.592513 39.472101l-1.099223 1.898658c-7.99435 13.790253-25.681848 18.586863-39.472101 10.592513zM116.079835 738.278187l-27.980224 20.485521c-6.595338 0-19.985874 23.583331-19.985874 16.987993V275.605203c0-6.595338 5.396186-11.991524 11.991525-11.991524h35.974573c6.595338 0 11.991524 5.396186 11.991525 11.991524l-3.797317 464.671572c0 6.495409-1.59887-1.998587-8.194208-1.998588z" fill="#d81e06" p-id="16764"></path><path d="M135.066415 280.102025l-66.053313-4.396893c-3.497528-5.596045 2.897952-27.180789 8.593926-30.578387L461.23588 8.593926c5.596045-3.497528 12.990818-1.698799 16.488346 3.897245l28.879588 28.779659c3.497528 5.596045 3.397599 8.394067-2.298376 11.891595L135.066415 280.102025c-5.596045 3.397599 3.497528 5.596045 0 0zM936.699823 754.866463h-35.974573c-6.595338 0-11.991524-5.396186-11.991524-11.991525V279.502449c0-12.69103 7.094985-10.092866 13.690324-10.092867l34.275773 10.692443c6.595338 0 11.991524 5.396186 11.991525 11.991524l3.997175 485.756669c0 6.695268-9.393361-22.983755-15.9887-22.983755z" fill="#d81e06" p-id="16765"></path><path d="M931.503496 309.581189l-7.094985-8.793785c-2.098517-2.598164-5.596045-3.597457-8.893714-2.897951-8.194208 1.798729-22.584038-11.09216-31.177964-16.388417L517.496115 65.853455c-0.399717-0.199859-0.799435-0.499647-1.099223-0.799435-11.891595-10.492584-59.857693 11.192089-57.859105 6.39548 0.299788-0.799435 0.699506-1.698799 0.899364-2.498235l9.893008-56.460094c0.499647-2.997881 2.498234-5.496115 5.396186-6.595338 16.987993-6.495409 70.050489-4.296963 79.044132 1.299082l378.432525 233.934655c0.399717 0.199859 0.699506 0.499647 1.099223 0.799435 14.189971 12.191383 18.586863 47.266592 13.390536 64.654303-2.098517 6.695268-10.792372 8.394067-15.189265 2.997881zM69.712607 769.256292l41.970336-31.477752c3.297669-5.695974 4.896539-4.496822 10.592513-1.199152l380.231254 224.041648c5.695974 3.297669 28.479871-1.898658 25.182201 3.797316l11.991525 56.260236c-3.297669 5.695974-57.359459 3.497528-62.255998-2.298376L75.008864 782.946616c-5.995762-3.497528-8.793785-7.694562-5.296257-13.690324z" fill="#d81e06" p-id="16766"></path><path d="M518.29555 1020.578658l-26.681142-17.287781c-3.497528-5.596045 0.199859-31.477752 5.795904-34.975279l394.920871-230.037411c5.596045-3.497528 12.990818-1.698799 17.287781-13.690323l43.868994 35.774714c2.698093 23.283543-12.391242 19.08651-17.987287 22.584038l-360.24538 219.045179c-4.79661 13.290606-53.462213 24.282837-56.959741 18.586863z" fill="#d81e06" p-id="16767"></path></svg><i id="extool__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}



function initPkg_ExpandTool_Func() {
	// 函数初始化
	// 将onclick事件绑定在这里
	document.getElementsByClassName("extool-icon")[0].addEventListener("click", function() {
		let a = document.getElementsByClassName("extool")[0];
		if (a.style.display != "block") {
			a.style.display = "block";
			if (document.getElementsByClassName("bloop")[0].style.display == "block") {
				document.getElementsByClassName("bloop")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
	});
}

var sheetIndex = 0;
function initPkg_ExpandTool_BarrageSize() {
    sheetIndex = getAvailableSheet();
    if (sheetIndex != -1) {
        document.styleSheets[sheetIndex].addRule(".danmuItem-31f924",""); // 这里默认初始化页面的时候新增一个rule用于使自己的css生效
    }
    ExpandTool_BarrageSize_insertDom();
    ExpandTool_BarrageSize_insertFunc();
    initPkg_ExpandTool_BarrageSize_Set();

    setBarrageSize(getBarrageSize());
}

function ExpandTool_BarrageSize_insertDom() {
    let a = document.createElement("div");
    a.className = "extool__bsize";
    a.innerHTML = '<label>弹幕大小(默认24px)：</label><input id="extool__bsize_value" type="text" style="width:50px;text-align:center;" value="24" /><input style="width:40px;margin-left:10px;" type="button" id="extool__bsize_btn" value="确认" />';
    
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function setBarrageSize(s) {
    let l = document.styleSheets[sheetIndex].rules.length;
    document.styleSheets[sheetIndex].removeRule(l - 1);
    document.styleSheets[sheetIndex].addRule(".danmuItem-31f924","font-size:" + s + "px !important;");
}

function getAvailableSheet() {
    let ret = -1;
    for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href == null) {
            ret = i;
            break;
        } else {
            ret = -1;
        }
    }
    return ret;
}

function getBarrageSize() {
    return document.getElementById("extool__bsize_value").value;
}
function ExpandTool_BarrageSize_insertFunc() {
    document.getElementById("extool__bsize_btn").addEventListener("click", function() {
        setBarrageSize(getBarrageSize());
        saveData_BarrageSize();
    });
}

function saveData_BarrageSize() {
	let data = {
		size: getBarrageSize()
	}
	localStorage.setItem("ExSave_BarrageSize", JSON.stringify(data)); // 存储弹幕列表
}
function initPkg_ExpandTool_BarrageSize_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_BarrageSize");
	if (ret != null) {
		let retJson = JSON.parse(ret);
		document.getElementById("extool__bsize_value").value = retJson.size;
	}
}


function initPkg_ExpandTool_ClearBag() {
    ExpandTool_ClearBag_insertDom();
    ExpandTool_ClearBag_insertFunc();
}

function ExpandTool_ClearBag_insertDom() {
    let html = "";
    html += '<label>背包送礼：[速度并不快,间隔>0.1s]</label><a id="extool__clearbag_showid" style="margin-left:10px;color:blue;" href="javascript:void(0);">礼物id示例</a><br />';
    html += '<label>礼物ID：</label><input id="extool__clearbag_id" type="text" style="width:50px;text-align:center;margin-right:10px;" value="268" />';
    html += '<label>数量：</label><input id="extool__clearbag_cnt" type="text" style="width:30px;text-align:center;" value="1" />';
    html += '<input style="width:40px;margin-left:10px;" type="button" id="extool__clearbag_sendbtn" value="送出" />';
    html += '<input style="width:60px;margin-left:10px;" type="button" id="extool__clearbag_clearbtn" value="清空背包" />';
    let a = document.createElement("div");
    a.className = "extool__clearbag";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_ClearBag_insertFunc() {
    document.getElementById("extool__clearbag_sendbtn").addEventListener("click", async function() {
        if (confirm("确认送出？") != true) {
            return;
        }
        let id = document.getElementById("extool__clearbag_id").value;
        let n = Number(document.getElementById("extool__clearbag_cnt").value);
        showMessage("【背包送礼】执行中...", "info");
        for (let i = 0; i < n; i++) {
            await sleep(100).then(() => {
                sendGift_bag(id, 1, rid).then(data => {
                    if (data.msg != "success") {
                        showMessage("【背包送礼】" + rid + "赠送失败 " + data.msg, "error");
                        console.log(rid, data);
                    }
                }).catch(err => {
                    showMessage("【背包送礼】" + rid + "赠送失败", "error");
                    console.log(rid, err);
                })
            })
            
        }
        showMessage("【背包送礼】执行完毕！", "success");
    });
    document.getElementById("extool__clearbag_clearbtn").addEventListener("click", function() {
        if (confirm("确认清空？") != true) {
            return;
        }
        showMessage("【清空背包】执行中...", "info");
        getBagGifts(rid, (ret) => {
            clearBagGifts(ret, rid);
        })
    });
    document.getElementById("extool__clearbag_showid").addEventListener("click", function() {
        getBagGifts(rid, (ret) => {
            let chunkNum = ret.data.list.length;
            if (chunkNum > 0) {
                for (let i = 0; i < chunkNum; i++) {
                    let gift_id = ret.data.list[i].id;
                    let gift_name = ret.data.list[i].name;
                    console.log("【" + gift_name + "】 id:" + gift_id);
                }
                showMessage("请按F12到控制台(console)查看背包礼物id", "success");
            } else {
                showMessage("背包礼物为空", "error");
            }
        });
    });
}

function getBagGifts(room_id, callback) {
    // 获取背包内所有礼物信息(json)，传给回调函数
    fetch('https://www.douyu.com/japi/prop/backpack/web/v1?rid=' + room_id, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
    }).then(result => {
        return result.json();
    }).then(ret => {
        callback(ret);
    }).catch(err => {
        console.log("请求失败!", err)
    })
}

async function clearBagGifts(bagGiftsJson, room_id) {
    // 赠送背包内所有的礼物
    let chunkNum = bagGiftsJson.data.list.length;
    if (chunkNum > 0) {
        for (let i = 0; i < chunkNum; i++) {
            let gift_id = bagGiftsJson.data.list[i].id;
            let gift_cnt = bagGiftsJson.data.list[i].count;
            if (Object.keys(bagGiftsJson.data.list[i].batchInfo).length > 0) {
                await sleep(100).then(() => {
                    sendGift_bag(gift_id, gift_cnt, room_id);
                })
            } else {
                for (let j = 0; j < gift_cnt; j++) {
                    await sleep(100).then(() => {
                        sendGift_bag(gift_id, 1, room_id);
                    })
                }
            }
        }
        showMessage("【清空背包】执行完毕！", "success");
    } else {
        showMessage("背包礼物为空", "error");
    }
}
let redpackets_arr = [];
let redpacketTimer; // 时钟句柄
function initPkg_ExpandTool_RedPacket_Room() {
    ExpandTool_RedPacket_Room_insertDom();
    ExpandTool_RedPacket_Room_insertFunc();
    ExpandTool_RedPacket_Room_Set();
}


function ExpandTool_RedPacket_Room_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px" id="extool__redpacekt_room_start" type="checkbox">自动抢礼物红包</label>';
    
    let a = document.createElement("div");
    a.className = "extool__redpacket_room";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);

}
function ExpandTool_RedPacket_Room_insertFunc() {
    document.getElementById("extool__redpacekt_room_start").addEventListener("click", function() {
        verifyFans("5189167", 3).then(r => {
            if (r == true) {
                let ischecked = document.getElementById("extool__redpacekt_room_start").checked;
                if (ischecked == true) {
                    // 开始自动抢红包
                    redpacketTimer = setInterval(() => {
                        getRoomRedPacketsList(rid);
                    }, 1100);
                } else{
                    // 停止自动抢红包
                    clearInterval(redpacketTimer);
                }
                saveData_RedPacket_Room();
            } else {
                document.getElementById("extool__redpacekt_room_start").checked = false;
                showMessage("本功能需拥有3级歆崽粉丝牌(5189167)才可使用", "error");
            }
        })
	});

}


function getRoomRedPacketsList(room_id) {
    fetch("https://www.douyu.com/japi/interactnc/web/propredpacket/getPrpList?type_id=1&room_id=" + room_id, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(res => {
        return res.json();
    }).then(ret => {
        if (ret.data.list.length > 0) {
            for (let i = 0; i < ret.data.list.length; i++) {
                let rpid = ret.data.list[i].activityid;
                let offset = checkRedPacket(rpid);
                let startTime = ret.data.list[i].startTime;
                let to = Number(startTime) - Math.round(new Date().getTime()/1000);
                to = 1000 * to - 2000;
                if (offset == -1) {
                    redpackets_arr.push(ret.data.list[i].activityid);
                    if (to > 0) {
                        setTimeout(() => {
                            getRoomRedPacket(rpid);
                            getRoomRedPacket(rpid);
                            getRoomRedPacket(rpid);
                            showMessage("【礼物红包】抢红包执行完毕！", "success");
                        }, to);
                    } else {
                        getRoomRedPacket(rpid);
                        getRoomRedPacket(rpid);
                        getRoomRedPacket(rpid);
                        showMessage("【礼物红包】抢红包执行完毕！", "success");
                    }
                }
            }
        }
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

function checkRedPacket(a) {
    let ret = -1;
    for (let i = 0; i < redpackets_arr.length; i++) {
        if (redpackets_arr[i] == a) {
            ret = i;
            break;
        } else {
            res =  -1;
        }
    }
    return ret;
}

function getRoomRedPacket(rpid) {
    fetch("https://www.douyu.com/japi/interactnc/web/propredpacket/grab_prp", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'activityid=' + rpid + '&ctn=' + getCCN()
    }).then(res => {
        return res.json();
    }).then((ret) =>{
        if (ret.data.isSuc == 2) {
            getRoomRedPacket(rpid);
        }
    })

}


function saveData_RedPacket_Room() {
	let isGetRedPacket = document.getElementById("extool__redpacekt_room_start").checked;
	let data = {
		isGetRedPacket: isGetRedPacket
	}
	localStorage.setItem("ExSave_RedPacket_Room", JSON.stringify(data)); // 存储弹幕列表
}

function ExpandTool_RedPacket_Room_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_RedPacket_Room");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isGetRedPacket == true) {
            verifyFans("5189167", 3).then(r => {
                if (r == true) {
                    document.getElementById("extool__redpacekt_room_start").click();
                } else {
                    let data = {
                        isGetRedPacket: false
                    }
                    localStorage.setItem("ExSave_RedPacket_Room", JSON.stringify(data)); // 存储弹幕列表
                    showMessage("本功能需拥有3级歆崽粉丝牌(5189167)才可使用", "error");
                }
            })
        }
	}
}

function initPkg_ExpandTool_SendGift() {
    ExpandTool_SendGift_insertDom();
    ExpandTool_SendGift_insertFunc();
}

function ExpandTool_SendGift_insertDom() {
    let html = "";
    html += '<label>送礼：[用于打榜,例如送出999个飞机]</label><a style="margin-left:10px;color:blue;" href="http://open.douyucdn.cn/api/RoomApi/room/' + rid + '" target="_blank">礼物id示例</a><br />';
    html += '<label>礼物ID：</label><input id="extool__sendgift_id" type="text" style="width:50px;text-align:center;margin-right:10px;" value="20000" />';
    html += '<label>数量：</label><input id="extool__sendgift_cnt" type="text" style="width:30px;text-align:center;" value="1" />';
    html += '<input style="width:40px;margin-left:10px;" type="button" id="extool__sendgift_btn" value="送出" />';
    let a = document.createElement("div");
    a.className = "extool__sendgift";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_SendGift_insertFunc() {
    document.getElementById("extool__sendgift_btn").addEventListener("click", function() {
        if (confirm("确认送出？") != true) {
            return;
        }
        let gid = document.getElementById("extool__sendgift_id").value;
        let gcnt = document.getElementById("extool__sendgift_cnt").value;
        let t_num = 0;
        let t_price = 0;
        for (let i = 0; i < Number(gcnt); i++) {
            sendGift_any(gid, 1, rid).then(ret => {
                if (ret.data != null) {
                    if (ret.msg != "鱼翅不足") {
                        t_num = t_num + 1;
                        t_price = t_price + Number(ret.data.priceType);
                    } else {
                        console.log("【送礼】" + gid + ret.msg);
                    }
                } else {
                    console.log("【送礼】" + gid + ret.msg);
                }
                if (i == Number(gcnt) - 1) {
                    showMessage("【送礼】赠送完毕！详细信息可以在F12控制台查看", "success");
                    console.log("【送礼】赠送完毕！详细信息可以在F12控制台查看");
                }
            }).catch(err => {
                console.log("请求失败!", err);
            })
        }
        showMessage("【送礼】执行中...", "info");
    });
}

function sendGift_any(gid, count, rid) {
	// 送任意东西
	// gid: 268是荧光棒
	// count: 数量
	// rid: 房间号
	return fetch("https://www.douyu.com/japi/gift/donate/mainsite/v1", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'giftId=' + gid + '&giftCount=' + count + '&roomId=' + rid + '&bizExt=%7B%22yzxq%22%3A%7B%7D%7D'
	}).then(res => {
		return res.json();
	})
}
function initPkg_ExPanel() {
	pkg_ExPanel_insertDom();
}
function pkg_ExPanel_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-panel";
	a.innerHTML = '<div class="ex-panel__wrap"></div>';
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

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
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_FansContinue_Func() {
	document.getElementsByClassName("fans-continue")[0].addEventListener("click", function() {
		fetch('https://www.douyu.com/member/cp/getFansBadgeList',{
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
				await sleep(200).then(() => {
					sendGift_bag(268, 1, rid).then(data => {
						if (data.msg == "success") {
							showMessage("【续牌】" + rid + "赠送一根荧光棒成功", "success");
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
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'propId=' + gid + '&propCount=' + count + '&roomId=' + rid + '&bizExt=%7B%22yzxq%22%3A%7B%7D%7D'
	}).then(res => {
		return res.json();
	})
}

function initPkg_FishFood() {
	initPkg_FishFood_Dom();
	initPkg_FishFood_Func();
}

function initPkg_FishFood_Dom() {
	FishFood_insertIcon();
}
function FishFood_insertIcon() {
	let a = document.createElement("div");
	a.className = "fish-food";
	a.innerHTML = '<a class="ex-panel__icon" title="一键鱼塘寻宝"><svg t="1578588143670" style="display: block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="41610" width="36" height="36"><path d="M961.40146484375 293.77460937500007c0-75.01376953125-60.809765625-135.8244140625-135.82792968750002-135.8244140625H197.86572265625006C122.85107421875006 157.9501953125 62.0439453125 218.76171875000006 62.0439453125 293.77460937500007c0 3.0392578125000003 0.140625 6.0380859375 0.3322265625 9.024609375-0.021093749999999998 0.7083984375-0.09316406249999999 1.4080078125000002-0.09316406249999999 2.13310546875v501.1171875c0 32.4544921875 24.837890625000004 58.78212890625 55.48447265625 58.78212890625h787.9060546875c30.650097656249994 0 55.4888671875-26.32763671875 55.4888671875-58.78212890625v-501.1171875c0-0.71982421875-0.07910156249999999-1.4097656250000001-0.0984375-2.1128906250000004 0.193359375-2.99619140625 0.33749999999999997-6.005566406250001 0.33749999999999997-9.044824218750001z m0 0" fill="#F0B417" p-id="41611"></path><path d="M747.34296875 157.9501953125H276.1033203125c-54.37353515625 0-98.66513671875 42.581250000000004-101.66748046875 96.2033203125h674.56845703125c-3.0005859375-53.62119140625-47.29306640625-96.2033203125-101.661328125-96.2033203125z m0 0" fill="#E13633" p-id="41612"></path><path d="M174.30751953125002 268.28984375000005v154.06259765625h674.8303710937499V268.28984375000005c0-0.53525390625-0.06855468749999999-1.05556640625-0.08964843749999998-1.58642578125 0.144140625-2.0759765625 0.22851562500000003-4.180957031249999 0.23818359375000003-6.30263671875h-675.1318359375c0.00791015625 2.1181640625000004 0.09755859375 4.215234375 0.22587890625 6.28330078125-0.007031249999999999 0.5396484374999999-0.07294921875 1.06171875-0.07294921875 1.6057617187500002z m0 310.728515625v154.07138671875h674.8303710937499V579.0183593749999c0-0.530859375-0.06855468749999999-1.0520507812500002-0.08964843749999998-1.57236328125 0.144140625-2.0926757812499996 0.22851562500000003-4.19501953125 0.23818359375000003-6.317578125h-675.1318359375c0.00791015625 2.1216796875 0.09755859375 4.21435546875 0.22587890625 6.2964843749999995-0.007031249999999999 0.54140625-0.07294921875 1.0529296874999998-0.07294921875 1.59345703125z m0 0" fill="#C91111" p-id="41613"></path><path d="M62 476.5080078125h899.44189453125v44.38740234375H62z" fill="#9F7D0F" p-id="41614"></path><path d="M617.06357421875 349.27314453125l65.11025390625001 200.38271484375002-170.45068359375 123.83613281249998-170.45683593750002-123.83613281249998 65.10673828125-200.38271484375002h210.69052734374998z m0 0" fill="#E9BF53" p-id="41615"></path><path d="M608.48984375 362.46376953125l59.81396484375 184.07285156249998-156.5806640625 113.77177734374999-156.5859375-113.77177734374999 59.808691406250006-184.07285156249998h193.5439453125z m0 0" fill="#F0B417" p-id="41616"></path><path d="M558.7578125 481.31738281249994c0-26.054296875-21.11923828125-47.162988281249994-47.16826171875-47.162988281249994-26.043750000000003 0-47.16474609375 21.10869140625-47.16474609375 47.162988281249994 0 22.40859375 15.650683593749998 41.1275390625 36.60205078125001 45.92900390625l-24.581249999999997 60.795703124999996h69.359765625l-23.90185546875-60.732421875c21.084960937499996-4.70478515625 36.854296875-23.49228515625 36.854296875-45.992285156250006z m0 0" fill="#715F39" p-id="41617"></path></svg><i id="fish-food__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_FishFood_Func() {
	document.getElementsByClassName("fish-food")[0].addEventListener("click", function() {
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
				await sleep(1300).then(() => {
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
	})
	
}

function initPkg_FishPond() {
	initPkg_FishPond_Dom();
	initPkg_FishPond_Func();
}

function initPkg_FishPond_Timer() {
	// 这里挂载每个子模块的时钟周期函数
	initPkg_FishPond_Bubble_Timer();
	initPkg_FishPond_Box_Timer();
	initPkg_FishPond_Task_Timer();
}
function initPkg_FishPond_Func() {
	document.getElementsByClassName("fish-pond")[0].addEventListener("click", function() {
		// 这里挂载每个子模块的函数入口
		// 入口即为调用
		// 调用的是每个子模块的领取接口
		initPkg_FishPond_Bubble();
		initPkg_FishPond_Box();
		initPkg_FishPond_Task();
	})
}
function initPkg_FishPond_Dom() {
	FishPond_insertIcon();
}
function FishPond_insertIcon() {
	let a = document.createElement("div");
	a.className = "fish-pond";
	a.innerHTML = '<a class="ex-panel__icon" title="一键领取鱼粮"><svg t="1578572028540" style="display: block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19278" width="36" height="36"><path d="M607.1 900.6c-2.6 0-5.1-0.1-7.7-0.4-19.8-2.3-34.1-13.1-41.8-20.7-24.5 10.2-46.4 11.7-65.3 4.3-16.1-6.3-26.1-17.7-31.5-26-29 8.3-52.4 6.5-69.8-5.2-14-9.5-20.7-23.3-23.8-33.8-22.8 5.6-41.9 3.7-57-5.5-13.6-8.4-20.5-21-23.9-30.1-24.7 1.5-44.3-4.3-58.3-17.3-13.5-12.4-18.4-28.4-20.2-39.4-27.9-1.4-52-20.2-63.8-39.4-8.3-13.4-11.2-27.6-8.7-40.3-10.6-3.6-19-10.7-23.9-20.7-9.3-18.7-5.4-44 9.8-67.6-26.2-36.9-27.2-58-3.7-88.1-10.8-18.4-13.6-36-8.2-52.3 7.5-22.7 28.9-35.8 41.3-41.7 0.9-3.9 3.2-6.4 4.2-7.5 7.8-7.4 20.9-6.3 50.1 4.1 20.1 7.1 47.9 19 82.9 35.1C346 435.2 425.4 475 523.4 526.3c166.8 87.3 332.2 179.1 333.8 180 2.7 1.5 4.7 3.9 5.6 6.9 8.7 27.4 7.3 48.4-4.1 62.2-8 9.7-19.2 13.4-28 14.8 0.6 22.2-5.5 39.1-18.1 50.4-16.3 14.6-38.9 15-51.8 13.7-8 15.7-19.5 26.4-34.4 31.6-25 8.9-52.3-0.7-65.2-6.6-18.1 14.2-36.3 21.3-54.1 21.3z" fill="#66584F" p-id="19279"></path><path d="M840.3 760c-5.6 6.8-17.1 7.2-21 6.8-3.7-0.5-7.4 0.8-10 3.4-2.6 2.6-3.9 6.3-3.4 10 2.6 20.3-0.5 34.6-9.2 42.4-14.1 12.7-40.1 6.8-40.3 6.8-3.4-0.8-6.8-0.1-9.5 1.7 15-40.6 0-65.2 0-65.2-86.6-112.6-198-83-330.9-147.3C282.8 554 275.6 504.1 210.7 479.3c-59-22.5-77.8 5.6-86.1 32.8-0.9-10.9 5.1-19.8 16.5-33 3.6-4.2 3.9-10.2 0.7-14.7-10.3-14.7-13.7-27.7-10.1-38.7 6.6-20.3 34.5-30.1 35.1-30.3 3.2-1.1 5.8-3.5 7.2-6.5 5.6 1.1 15.9 4 33.9 11 21.3 8.2 49.7 20.7 84.7 37.2 59.1 27.8 137.3 67.3 232.4 117.2C672.1 631.5 815.1 710.5 841.4 725c4.5 16.2 4.2 28.6-1.1 35z" fill="#D8D1CE" p-id="19280"></path><path d="M746.9 831c-2 1.3-3.6 3.3-4.6 5.7-5.3 14-13.1 22.7-23.8 26.5-23.1 8.3-52.6-8.4-52.9-8.6-4.5-2.6-10.1-2-13.9 1.4-17.4 15.2-34 22.1-49.3 20.4-19.9-2.2-32-18.3-32-18.4-2.3-3.2-6-5-9.8-5-1.8 0-3.6 0.4-5.2 1.2-21.4 10.4-39.6 12.9-54 7.4-16.9-6.5-23.6-22.5-23.7-22.5-2.3-6-9-9.1-15.1-7-25.5 8.8-45.5 9.1-58.1 0.8-14.9-9.9-16.2-29.7-16.2-29.8-0.2-3.8-2.1-7.2-5.3-9.4-3.1-2.1-7.1-2.6-10.7-1.4-21.4 7.4-38 7.6-49.5 0.7-13.3-8.1-15.9-24.2-15.9-24.3-0.9-6.6-6.9-11.2-13.5-10.3-22.1 2.9-38.7-0.4-49.3-10-14.2-12.8-13.6-33.7-13.6-33.8 0.2-3.6-1.3-7-3.9-9.4-2.7-2.4-6.2-3.5-9.8-3-16.2 2.4-39.6-6.4-52.7-27.7-3.3-5.4-10.2-19.1-2.5-30.2 2.5-3.7 2.9-8.5 0.8-12.4-2.1-4-6.2-6.4-10.6-6.4-9.4 0-15.8-3.4-19.1-10-6-12.1-0.9-32.1 12.6-49.9 3.3-4.3 3.3-10.2 0-14.5-13.3-17.7-19.8-29.1-20.6-39 8.3-27.2 27.1-55.3 86.1-32.8 64.9 24.8 72.1 74.7 205.3 139.2 132.8 64.4 244.3 34.7 330.9 147.3-0.1 0.1 14.9 24.6-0.1 65.2z" fill="#FFFFFF" p-id="19281"></path><path d="M196.1 562c-2.7 0-5.3-1.4-6.8-3.8-16.7-27.5-8.5-46 4.7-54.3 15.4-9.6 37.5-5.8 46.4 8.1 2.4 3.7 1.3 8.7-2.4 11-3.7 2.4-8.7 1.3-11-2.4-4.1-6.5-16.5-8.1-24.4-3.1-8.8 5.5-8.6 17.3 0.6 32.4 2.3 3.8 1.1 8.7-2.7 11-1.5 0.7-2.9 1.1-4.4 1.1zM244.6 671.6c-0.4 0-0.8 0-1.2-0.1-4.4-0.7-7.4-4.8-6.7-9.1 4.9-31.8 23.1-40.7 38.5-38.5 18 2.6 32.4 19.8 30.3 36-0.6 4.4-4.6 7.5-9 6.9-4.4-0.6-7.5-4.6-6.9-9 1-7.6-7.4-16.8-16.7-18.1-14.6-2.1-19.1 16.9-20.4 25.1-0.6 4-4 6.8-7.9 6.8zM558.9 812.5c-3.7 0-7-2.5-7.8-6.2-1-4.3 1.7-8.6 6-9.6 7.5-1.7 13.2-12.8 11.2-21.9-2.2-10.1-13.3-13.9-30.6-10.4-4.3 0.9-8.6-1.9-9.4-6.2s1.9-8.6 6.2-9.4c31.5-6.4 46.2 7.6 49.5 22.8 3.8 17.8-7.3 37.3-23.3 40.9-0.7-0.1-1.3 0-1.8 0zM734.2 797c-2.2 0-4.4-0.9-6-2.7-2.9-3.3-2.6-8.4 0.8-11.3 5.8-5.1 5.5-17.5-0.6-24.6-6.7-7.9-18.4-5.9-31.9 5.4-3.4 2.8-8.4 2.4-11.3-1-2.8-3.4-2.4-8.4 1-11.3 24.7-20.6 44.2-15.3 54.3-3.5 11.8 13.8 11.3 36.2-1 47-1.6 1.3-3.5 2-5.3 2zM389.7 722.4h-0.9c-4.4-0.5-7.6-4.4-7.1-8.8 3.5-32 21.3-41.7 36.8-40.2 18.1 1.8 33.3 18.3 31.8 34.7-0.4 4.4-4.3 7.7-8.7 7.3-4.4-0.4-7.7-4.3-7.3-8.7 0.7-7.7-8.1-16.4-17.5-17.3-14.7-1.4-18.4 17.7-19.3 26-0.3 3.9-3.8 7-7.8 7z" fill="#66584F" p-id="19282"></path><path d="M952.8 648.4c-2.3-27.9-7.7-56.5-17.6-81.7C912.5 509.4 870 293.1 576 201.4c-253.2-78.9-381.2-1.2-453.3 56.6 0 0-22.4 13.7-44.3 40.5 22-60.2 73-91.3 73-91.3 47.4-31.3 196.9-133 460.2-43.4C863.9 249.7 914 450 935.9 505.3c17.7 44.8 20.4 100.9 16.9 143.1z" fill="#FFAEAE" p-id="19283"></path><path d="M952.8 648.4c-2.1 25.6-6.5 46-11.2 55.8-24.7 51.1-64.6 63.5-64.6 63.5-50.8 13.7-72-21.1-72-21.1-63.9-69.6-126.4-80.2-126.4-80.2-22.5-9.8-180.9-18.8-273.6-69.6C276.8 526.5 244.4 410 131.9 418.4c-62.8 4.7-68.8-56.6-59.9-98.1 1.6-7.7 3.8-14.9 6.3-21.8 21.9-26.8 44.3-40.5 44.3-40.5 72.1-57.7 200.2-135.5 453.3-56.6 294.1 91.7 336.5 308 359.2 365.3 10.1 25.2 15.5 53.8 17.7 81.7z" fill="#F96464" p-id="19284"></path><path d="M952.7 647.1c-24 35.3-53.7 44.6-53.7 44.6-50.8 13.7-72-21.1-72-21.1-63.9-69.6-126.4-80.2-126.4-80.2-22.5-9.8-180.9-18.8-273.6-69.6C298.8 450.5 266.4 334 153.9 342.4c-44.2 3.3-60.2-26-62.8-58.2 17.1-17.4 31.5-26.2 31.5-26.2 72.1-57.7 200.2-135.5 453.3-56.6 294.1 91.7 336.5 308 359.2 365.3 9.9 24.8 15.3 52.9 17.6 80.4z" fill="#FF7B7B" p-id="19285"></path><path d="M952.7 647.1c-24 35.3-53.7 44.6-53.7 44.6-50.8 13.7-72-21.1-72-21.1-63.9-69.6-126.4-80.2-126.4-80.2-22.5-9.8-180.9-18.8-273.6-69.6C298.8 450.5 266.4 334 153.9 342.4c-44.2 3.3-60.2-26-62.8-58.2 17.1-17.4 31.5-26.2 31.5-26.2 72.1-57.7 200.2-135.5 453.3-56.6 294.1 91.7 336.5 308 359.2 365.3 9.9 24.8 15.3 52.9 17.6 80.4z" fill="#FF7B7B" p-id="19286"></path><path d="M557.8 162.4l-2.1 11.8c-18.1-3.2-58.3-4.4-103.6-1.1-0.6-0.1-1.2-0.2-1.8-0.2-1.5-0.2-2.9-0.4-4.4-0.6l-2.1-0.3c-1.2-0.1-2.5-0.3-3.8-0.4-1.3-0.2-2.6-0.3-4-0.4-2.6-0.3-5.2-0.6-7.8-0.8-2.6-0.2-5.2-0.5-7.7-0.7-1.6-0.1-3.3-0.3-4.9-0.4-0.5 0-1.1-0.1-1.6-0.1-1.6-0.1-3.2-0.2-4.9-0.3-2.5-0.2-5-0.3-7.5-0.4-1.2-0.1-2.5-0.1-3.7-0.2-2.3-0.1-4.6-0.2-6.8-0.2h-0.5c11.9-1.9 23.3-3.4 33.9-4.5 57.3-6.2 110.4-5.3 133.3-1.2zM726.4 220.7l-2.6 11.7c-29.2-6.4-60.4-9.8-91.8-10.9-1.3-0.5-2.6-1.1-3.9-1.6-2-0.8-4.1-1.6-6.1-2.4-4.2-1.6-8.4-3.2-12.7-4.8-1.1-0.4-2.1-0.8-3.2-1.2-2.2-0.8-4.3-1.6-6.5-2.3 42.9-0.5 86.7 2.7 126.8 11.5zM814.4 289.8l-3.3 10.8c-17.2-5.3-36.6-9.1-58.1-11.4-0.7-0.5-1.5-1.1-2.2-1.6-1.4-1.1-2.9-2.1-4.3-3.2-0.7-0.5-1.5-1.1-2.2-1.6-0.7-0.5-1.5-1.1-2.2-1.6-0.7-0.5-1.5-1.1-2.2-1.6-2-1.4-4-2.8-6-4.1 29.9 1.9 56.5 6.3 79.5 13.2 0.3 0.4 0.7 0.8 1 1.1zM889 393.4c-13.1-5.1-27.8-9.5-43.6-12.9-3.7-4.9-7.5-9.7-11.6-14.6 16.5 3 32 6.9 46.2 11.6 3.2 5.3 6.2 10.6 9 15.9z" fill="#FFD9D9" p-id="19287"></path><path d="M452 173.1c-8.6 0.6-17.3 1.4-26.2 2.4-48.1 5.2-115 17.3-160.4 45-34.4 21-57.8 43.1-69.6 65.7-12.2 23.3-12.4 46.9-0.7 72.1 18.7 40.3 6.4 64.5 2.1 71.2-2.4-1.1-4.8-2.1-7.3-3.1l-3.3-2.7c0.4-0.5 4.1-5.6 5.7-15 2.3-13.2-0.5-28.9-8.1-45.4-25.7-55.5-0.5-107 75-153.1 37.1-22.7 87.6-35.2 131.4-42.2 19.4 0.6 39.8 2.2 61.4 5.1z" fill="#F79494" p-id="19288"></path><path d="M632.1 221.6c-70.4-2.5-141.9 6.4-194.7 18.3-1.1 0.2-111.5 26.8-140 92.6-11.7 26.8-8 57.1 10.8 89.8 16.8 29.3 14.1 52.6 8.9 67-5.7 15.8-15.6 24.5-16 24.9l-7.9-9c1.3-1.2 32-29.2 4.6-76.9-20.8-36.3-24.7-70.1-11.4-100.6 13.1-30.1 42.1-56 86.3-77 32.5-15.4 60.8-22.2 62-22.4 45.4-10.2 104.4-18.3 164.9-19 11.2 3.8 22 8 32.5 12.3z" fill="#F79494" p-id="19289"></path><path d="M753 289.2c-28.6-3.1-60.8-3.5-96.4-1.2-57.1 3.7-102.3 13.1-110.8 15h-0.2c-0.9 0.2-93.8 18.5-125.5 81.1-16.3 32.1-13.9 70.8 7.1 114.9 15.5 32.6 6.9 56.4-3 70.6-10.6 15.2-24.8 22.6-25.4 22.9l-2.8-5.3-2.7-5.3c2.1-1.1 47.8-25.7 23.1-77.7-22.7-47.7-25-90-6.9-125.6 14.3-28.2 42.1-52.3 80.3-69.6 28-12.7 51.7-17.4 53.6-17.8 8.8-1.9 54.8-11.5 112.6-15.2 28-1.8 54-2 77.9-0.5 6.6 4.5 13 9 19.1 13.7z" fill="#F79494" p-id="19290"></path><path d="M845.4 380.4c-17.2-3.8-35.9-6.6-55.6-8.3-41.2-3.6-86.2-2.5-130.1 3.3h-0.1c-0.8 0.1-85.3 10.2-116.5 63.8-16.2 27.8-15.4 63 2.4 104.6 14.2 33.2 15.7 60.5 4.4 80.9-3.7 6.7-8.4 12-13.4 16.1-5.3-1.1-10.7-2.3-16.1-3.6 6.7-3.7 14.1-9.5 19.1-18.5 4.1-7.6 6.1-16.6 5.9-26.8-0.3-12.6-4-27.2-10.9-43.4-19.4-45.3-20-84.1-1.7-115.4 14.3-24.5 40.6-44.3 76.1-57.3 26-9.5 47.8-12.2 49.4-12.3 62.6-8.2 123.9-7.1 175.6 2.4 3.9 4.8 7.8 9.7 11.5 14.5z" fill="#F79494" p-id="19291"></path><path d="M901.1 475.3c-39-11.1-92.5-18.5-165.3-15.3-0.4 0-49.2 3.1-67.3 34.9-12 21.1-8.4 50.5 10.8 87.5 16.4 31.6 20.2 60.9 11.4 87 0 0.1-0.1 0.1-0.1 0.2-6.3-2-10.4-2.8-11.6-3.1 0.1-0.4 0.3-0.7 0.4-1.1 7.7-22.9 4.1-49-10.8-77.5-21.2-40.8-24.7-74.2-10.5-99 8.9-15.7 25.2-27.7 47-34.8 16.1-5.3 29.6-6 30.1-6.1 68.2-3 120.1 3.2 159.3 13.1 2.4 4.8 4.6 9.5 6.6 14.2z" fill="#F79494" p-id="19292"></path><path d="M944.4 595.7c-23.8-13.3-47.6-23.3-67.4-27.9l-0.2-0.1c-0.6-0.2-61.2-16.7-85.7 10.2-14.6 16.1-13.9 45.3 2.2 86.8 9.1 23.5 9.6 44.1 1.6 61.2-1.1 2.3-2.3 4.5-3.6 6.5-3-2.9-6-5.7-9-8.3 0.6-1.1 1.2-2.2 1.8-3.4 6.6-14 5.9-31.3-2-51.6-17.9-46.1-17.8-79.5 0.1-99.2 29.1-32 93.5-14.9 97.7-13.7 17.8 4.2 38.7 12.5 59.9 23.5 1.7 5.1 3.3 10.5 4.6 16z" fill="#F79494" p-id="19293"></path><path d="M452 173.1c-8.6 0.6-17.3 1.4-26.2 2.4-48.1 5.2-115 17.3-160.4 45-34.4 21-57.8 43.1-69.6 65.7-9.9 18.9-11.9 38-6.1 58-4.2-0.8-8.5-1.4-12.9-1.7-11.2-47.5 16.4-91.9 82.3-132.2 37.1-22.7 87.6-35.2 131.4-42.2 19.5 0.5 39.9 2.1 61.5 5zM632.1 221.6c-70.4-2.5-141.9 6.4-194.7 18.3-1.1 0.2-111.5 26.8-140 92.6-11.7 26.8-8 57.1 10.8 89.8 1.3 2.3 2.5 4.5 3.6 6.8-8.8-8.8-17.3-17.4-25.7-25.6-10-27-9.9-52.4 0.3-75.8 13.1-30.1 42.1-56 86.3-77 32.5-15.4 60.8-22.2 62-22.4 45.4-10.2 104.4-18.3 164.9-19 11.2 3.8 22 8 32.5 12.3z" fill="#FFBBBB" p-id="19294"></path><path d="M753 289.2c-28.6-3.1-60.8-3.5-96.4-1.2-57.1 3.7-102.3 13.1-110.8 15h-0.2c-0.9 0.2-93.8 18.5-125.5 81.1-16.3 32.1-13.9 70.8 7.1 114.9 4.5 9.4 6.9 18.1 8 26.1-2.8-1.4-5.5-2.8-8.2-4.3-1.9-1-3.7-2.1-5.5-3.1-1.2-4.3-2.8-8.8-5.1-13.5-22.7-47.7-25-90-6.9-125.6 14.3-28.2 42.1-52.3 80.3-69.6 28-12.7 51.7-17.4 53.6-17.8 8.8-1.9 54.8-11.5 112.6-15.2 28-1.8 54-2 77.9-0.5 6.6 4.5 13 9 19.1 13.7z" fill="#FFBBBB" p-id="19295"></path><path d="M845.4 380.4c-17.2-3.8-35.9-6.6-55.6-8.3-41.2-3.6-86.2-2.5-130.1 3.3h-0.1c-0.8 0.1-85.3 10.2-116.5 63.8-16.2 27.8-15.4 63 2.4 104.6 2.9 6.8 5.3 13.4 7.2 19.7-4.5-1-9-2-13.6-3.1-1.3-3.9-2.9-7.8-4.6-11.9-19.4-45.3-20-84.1-1.7-115.4 14.3-24.5 40.6-44.3 76.1-57.3 26-9.5 47.8-12.2 49.4-12.3 62.6-8.2 123.9-7.1 175.6 2.4 3.9 4.8 7.8 9.7 11.5 14.5z" fill="#FFBBBB" p-id="19296"></path><path d="M901.1 475.3c-39-11.1-92.5-18.5-165.3-15.3-0.4 0-49.2 3.1-67.3 34.9-12 21.1-8.4 50.5 10.8 87.5 0.6 1.1 1.2 2.3 1.7 3.4-4.4-0.8-9.3-1.6-14.7-2.4-19.1-38.8-21.9-70.5-8.2-94.4 8.9-15.7 25.2-27.7 47-34.8 16.1-5.3 29.6-6 30.1-6.1 68.2-3 120.1 3.2 159.3 13.1 2.4 4.7 4.6 9.4 6.6 14.1zM944.4 595.7c-23.8-13.3-47.6-23.3-67.4-27.9l-0.2-0.1c-0.6-0.2-61.2-16.7-85.7 10.2-10.2 11.3-13 28.9-8.2 52.8-4.6-3.4-9.1-6.6-13.6-9.5-2.4-22.1 1.9-39.3 12.8-51.4 29.1-32 93.5-14.9 97.7-13.7 17.8 4.2 38.7 12.5 59.9 23.5 1.8 5.2 3.4 10.6 4.7 16.1z" fill="#FFBBBB" p-id="19297"></path><path d="M409.2 151.6c61.3 0 126.8 11.7 194.6 34.8 51 17.4 96.9 40.9 136.5 70 33.2 24.4 62.6 53.3 87.5 85.9 45.2 59.1 66.2 117.8 78.8 152.9 2.6 7.2 4.8 13.5 6.9 18.8 11.3 28.5 17.2 66.8 16.6 107.6-0.6 36.4-6.2 64-10.1 72-18.4 38.1-46.1 49.6-50 51-5.5 1.4-10.8 2.2-15.7 2.2-8.4 0-15.7-2.1-21.8-6.3-4.1-2.8-6.5-5.8-7.1-6.7l-0.7-1.4-2-2.1c-61.8-67.3-123.4-84-137.2-87-9.3-3.4-24.1-5.7-53.4-10.2-57.6-8.8-153.9-23.6-215.5-57.4-49.5-27.1-84.8-62.5-116-93.8-22.6-22.6-43.9-44-68.1-60.1-28.3-18.8-57.5-27.9-89.3-27.9-4.3 0-8.7 0.2-13.1 0.5-1.7 0.1-3.3 0.2-4.9 0.2-14.3 0-20.2-5.2-23.4-9.1-9.1-11.3-11.7-35.5-6.4-60.3 5.6-26.1 18.6-50.3 38.7-72 15.1-16.3 28.8-25.1 29.7-25.7l0.3-0.2 0.4-0.3 1.5-1c33.8-22.1 112.7-74.4 243.2-74.4m0-24c-139.8 0-224.3 57.3-257.8 79.5 0 0-63.3 38.7-79.3 113.1-8.6 40-3.4 98.4 53.2 98.4 2.1 0 4.4-0.1 6.6-0.3 3.9-0.3 7.7-0.4 11.4-0.4 103.4 0 137.9 110.9 261.8 178.8 92.6 50.8 251.1 59.8 273.6 69.6 0 0 62.4 10.6 126.4 80.2 0 0 14.8 24.3 49.3 24.3 6.8 0 14.3-0.9 22.7-3.2 0 0 39.9-12.4 64.6-63.5 12.4-25.7 22.8-126.9-5.8-198.9-21.9-55.3-72-255.6-324.3-341.5-77.2-26.2-144.5-36.1-202.4-36.1z" fill="#66584F" p-id="19298"></path></svg><i id="fish-pond__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function FishPond_showTip(a) {
	let d = document.getElementById("fish-pond__tip");
	if (a == true) {
		if (d.style.display != "block") {
			showMessage("【鱼粮】有鱼粮可以领取啦！", "info");
			d.style.display = "block";
		}
	} else {
		d.style.display = "none";
	}
}
var boxList = [];
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



var bubbleList = [];
function initPkg_FishPond_Bubble() {
	getFishPond_Bubble();
}

function initPkg_FishPond_Bubble_Timer() {
	getFishPond_BubbleList();
}

function getFishPond_Bubble() {
	// 清空bubbleList内的气泡
	if (bubbleList.length == 0) {
		showMessage("【鱼塘气泡】暂无可领取的鱼粮", "info");
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
		for (let i = 0; i < ret.data.length; i++) {
			result = result + ret.data[i].num + "个" + ret.data[i].name + ",";
		}
		bubbleList.length = 0; // 此处领取完毕,小红点也要去掉
		FishPond_showTip(false);
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
		bubbleList.length = 0;
		for (let i = 0; i < ret.data.list.length; i++) {
			if (ret.data.list[i] != null) {
				if (ret.data.list[i].status == "2") {
					bubbleList.push(ret.data.list[i].id);
					FishPond_showTip(true);
				}
			}
		}
	}).catch(err => {
		console.log("请求失败!", err);
	})
}



var taskList = [];
function initPkg_FishPond_Task() {
	getFishPond_Task();
}

function initPkg_FishPond_Task_Timer() {
	getFishPond_TaskList();
}

function getFishPond_Task() {
	if (taskList.length == 0) {
		showMessage("【鱼塘任务】暂无可领取的鱼粮", "info");
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
			showMessage("【鱼塘任务】领取结果:" + ret.data.msg, "success");
			// console.log("【鱼塘任务】领取结果:" + ret.data.msg, ret);
		}).catch(err => {
			console.log("请求失败!", err);
		})
	}
	taskList.length = 0;
	FishPond_showTip(false);
}

function getFishPond_TaskList() {
	// 获取可领取的鱼粮,如果有,就显示小红点
	taskList.length = 0;
	getFishPond_TaskList_Day();
	getFishPond_TaskList_Week();
	getFishPond_TaskList_Ytzb();
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
				FishPond_showTip(true);
				taskList.push(ret.data.list[i].id);
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
				FishPond_showTip(true);
				taskList.push(ret.data.list[i].id);
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
				FishPond_showTip(true);
				taskList.push(ret.data.list[i].id);
			}
		}
	}).catch(err => {
		console.log("请求失败!", err);
	})
}

let videoPlayerArr = [];

function initPkg_PopupPlayer() {
    initPkg_PopupPlayer_Dom();
    initPkg_PopupPlayer_Func();
}

function initPkg_PopupPlayer_Dom() {
    PopupPlayer_insertIcon();
    PopupPlayer_insertPrompt();
}

function PopupPlayer_insertIcon() {
    let a = document.createElement("div");
    a.className = "popup-player";
    a.innerHTML = '<a class="ex-panel__icon" title="同屏播放"><svg style="display:block;" t="1579448049771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1804" width="30" height="30"><path d="M353.024 900.416H109.952c-57.856 0-109.952-46.336-109.952-98.432V153.6c0-52.096 52.096-98.432 109.952-98.432h810.176c57.856 0 104.192 46.336 104.192 98.496v185.472c0 28.928-23.168 52.096-46.336 52.096s-46.272-23.168-46.272-52.096V159.36H98.368V807.68h248.896c34.688 0 52.032 17.408 52.032 46.336 0 28.928-17.344 46.272-46.272 46.272" fill="#f26b1f" p-id="1805"></path><path d="M619.2 631.488c-5.76 0-5.76 5.76-5.76 11.52v223.04c0 5.76 5.76 11.52 5.76 11.52h289.344c5.76 0 11.584-5.76 11.584-11.52v-222.976c0-5.824-5.76-11.584-11.52-11.584H619.136z m289.344 338.688h-289.28a103.68 103.68 0 0 1-104.192-104.128v-222.976c0-57.92 46.272-109.952 104.128-109.952h289.344c57.856 0 104.128 46.272 104.128 109.952v222.976c5.824 57.856-40.448 104.128-104.128 104.128z" fill="#f26b1f" p-id="1806"></path></svg><i id="popup-player__tip" class="ex-panel__tip"></i></a>';

    let b = document.getElementsByClassName("ex-panel__wrap")[0];
    b.insertBefore(a, b.childNodes[0]);

}

function PopupPlayer_insertPrompt() {
    let a = document.createElement("div");
    let html = "";
    a.className = "postbird-box-container";
    a.id = "popup-player__prompt"
    html += '<div class="postbird-box-dialog">';
    html += '<div class="postbird-box-content">';
    html += '<div class="postbird-box-header">';
    html += '<span class="postbird-box-title"><span>请输入直播间地址：</span></span>';
    html += '</div>'; // header
    html += '<div class="postbird-box-text">';
    html += '<input id="popup-player__url" value="https://www.douyu.com/5189167" style="height:30px;box-sizing:border-box" type="text" class="postbird-prompt-input" autofocus="true">';
    html += '<label style="margin-right:30px" title="【直播流模式】&#10;1. 速度快&#10;2. 延迟低&#10;3. 占用少&#10;4. 不会进入直播间&#10;5. 支持斗鱼/虎牙/Bilibili"><input id="popup-player__noiframe" type="radio" name="sex" value="无弹幕" checked="checked">无弹幕(推荐)</label>';
    html += '<label title="【框架模式】&#10;1. 速度慢&#10;2. 占用高&#10;3. 会进入直播间&#10;4. 仅支持斗鱼&#10;此模式拖动不是很灵活，请尽量在标题栏小幅度拖动&#10;若拖动无反应请点击页面任意处触发移动"><input id="popup-player__iframe" type="radio" name="sex" value="有弹幕">有弹幕</label>';
    html += '</div>'; // text
    html += '<div class="postbird-box-footer"><button id="popup-player__cancel" class="btn-footer btn-left-footer btn-footer-cancel" style="color:undefined;">取消</button><button id="popup-player__ok" class="btn-footer btn-right-footer btn-footer-ok" style="color:#0e90d2;">确定</button></div></div>'

    a.innerHTML = html;

    let b = document.getElementsByClassName("layout-Main")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_PopupPlayer_Func() {
    document.getElementsByClassName("popup-player")[0].addEventListener("click", function () {
        document.getElementById("popup-player__prompt").style.display = "block";
    });
    document.getElementById("popup-player__cancel").addEventListener("click", function() {
        document.getElementById("popup-player__prompt").style.display = "none";
    })
    document.getElementById("popup-player__ok").addEventListener("click", function() {
        let roomUrl = document.getElementById("popup-player__url").value;
        if (roomUrl != "") {
            let isIframe = document.getElementById("popup-player__noiframe").checked;
            if (isIframe == true) {
                if (roomUrl.indexOf("douyu.com") != -1) {
                    getRealRid_Douyu(roomUrl, (rid) => {
                        createNewVideo(videoPlayerArr.length, rid, "Douyu");
                    });
                } else if (roomUrl.indexOf("bilibili.com") != -1) {
                    getRealRid_Bilibili(roomUrl, (rid) => {
                        createNewVideo(videoPlayerArr.length, rid, "Bilibili");
                    });
                } else if (roomUrl.indexOf("huya.com") != -1) {
                    createNewVideo(videoPlayerArr.length, roomUrl, "Huya");
                }
            } else {
                createNewVideo_iframe(videoPlayerArr.length, roomUrl);
            }
            
        } else {
            showMessage("请输入地址", "error");
        }
        document.getElementById("popup-player__prompt").style.display = "none";
    })
    document.getElementById("popup-player__prompt").addEventListener("keydown", function(event) {
        let theEvent = window.event || e;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            document.getElementById("popup-player__ok").click();
        }
    })
}

function createNewVideo(id, rid, platform) {
    switch (platform) {
        case "Douyu":
            createNewVideo_Douyu(id, rid);
            break;
        case "Bilibili":
            createNewVideo_Bilibili(id, rid);
            break;
        case "Huya":
            let a = String(rid).split("/");
            createNewVideo_Huya(id, rid, a[a.length - 1]);
            break;
        default:
            createNewVideo_Douyu(id, rid);
            break;
    }
    
}

function setElementVideo(id, l) {
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoPlayer" + String(id));
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: l
        },{fixAudioTimestampGap: false});
        if (id > videoPlayerArr.length - 1) {
			videoPlayerArr.push(flvPlayer);
		} else {
			videoPlayerArr[id] = flvPlayer;
		}
        
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
}

function setElementResize(id) {
    let box = document.getElementById("videoDiv" + String(id));
    
    let scale = document.getElementById("videoScale" + String(id));
    scale.onmousedown = function (e) {
        // 阻止冒泡,避免缩放时触发移动事件
        e.stopPropagation();
        e.preventDefault();
        let pos = {
            'w': box.offsetWidth,
            'h': box.offsetHeight,
            'x': e.clientX,
            'y': e.clientY
        };
        let w;
        let h;
        document.onmousemove = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            w = Math.max(300, ev.clientX - pos.x + pos.w)
            h = Math.max(150, ev.clientY - pos.y + pos.h)
            w = w >= document.offsetWidth - box.offsetLeft ? document.offsetWidth - box.offsetLeft : w
            h = h >= document.offsetHeight - box.offsetTop ? document.offsetHeight - box.offsetTop : h
        }
        document.onmouseup = function (e) {
            e.stopPropagation();
            e.preventDefault();
            box.style.width = w + 'px';
            box.style.height = h + 'px';
            
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

}

function setElementDrag(id) {
    let box = document.getElementById("videoDiv" + String(id));
    box.onmousedown = function (event) {
        event.stopPropagation();
        let xx = event.clientX - box.offsetLeft;
        let yy = event.clientY - box.offsetTop;
        let mouseX;
        let mouseY;
        document.onmousemove = function (event) {
            event.stopPropagation();
            mouseX = event.clientX - xx;
            mouseY = event.clientY - yy;
        }
        document.onmouseup = function (event) {
            event.stopPropagation();
            box.style.left = mouseX + "px";
            box.style.top = mouseY + "px";
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}



// Douyu
function createNewVideo_Douyu(id, rid) {
    getRealLive_Douyu(rid, false, "1", "1", (lurl) => {
        if (lurl != "" || lurl != null) {
            if (lurl == "None") {
                showMessage("房间未开播或其他错误", "error");
                return;
            }
            let lurl_host_arr = String(lurl).split("/live");
            let lurl_host = "";
            if (lurl_host_arr.length > 0) {
                lurl_host = lurl_host_arr[0];
            }
            let a = document.createElement("div");
            let html = "";
            a.id = "videoDiv" + String(id);
            a.rid = rid;
            a.className = "videoDiv";
            html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><a title='复制直播流地址'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span></a>";
            html += "<select class='videoQn' id='videoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光4M</option></select>";
            html += "<select style='display:none' class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路5</option><option value='3'>备用线路6</option></select>";
            html += "<a style='margin-left:5px' href='" + lurl_host + "' target='_blank'>无视频？</a>";
            html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>";
            html += "</div>";
            html += "<video controls='controls' class='videoPlayer' id='videoPlayer" + String(id) + "'></video><div class='videoScale' id='videoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = document.getElementsByClassName("layout-Main")[0];
            b.insertBefore(a, b.childNodes[0]);
            setElementDrag(id);
            setElementResize(id);
            setElementFunc_Douyu(id, rid);
            setElementVideo(id, lurl);
        }
    });
}


function setElementFunc_Douyu(id, rid) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoPlayer = document.getElementById("videoPlayer" + String(id));
    let info = document.getElementById("videoInfo" + String(id));
    let scale = document.getElementById("videoScale" + String(id));
    videoPlayer.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (scale.style.display != "block") {
            scale.style.display = "block";
            info.style.display = "block";
        } else {
            scale.style.display = "none";
            info.style.display = "none";
        }
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
    let videoQn = document.getElementById("videoQn" + String(id));
    let videoCDN = document.getElementById("videoCDN" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoQn.onchange = function() {
        getRealLive_Douyu(rid, false, videoQn.value, videoCDN.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoCDN.onchange = function() {
        getRealLive_Douyu(rid, false, videoQn.value, videoCDN.value, (lurl) => {
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoClose.onclick = function() {
        box.remove();
    }

    let videoRID = document.getElementById("videoRID" + String(id));
    videoRID.onclick = function() {
        getRealLive_Douyu(rid, false, videoQn.value, videoCDN.value, (lurl) => {
            GM_setClipboard(String(lurl).replace("https", "http"));
            showMessage("复制成功", "success");
        })
    }
}


// Bilibili
function createNewVideo_Bilibili(id, rid){
    getRealLive_Bilibili(rid, "1", "1", (lurl) => {
        if (lurl != "" || lurl != null) {
            let a = document.createElement("div");
            let html = "";
            a.id = "videoDiv" + String(id);
            a.rid = rid;
            a.className = "videoDiv";
            html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><a title='复制直播流地址'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "Bilibili - " + rid + "</span></a>";
            html += "<select class='videoQn' id='videoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光</option><option value='5'>原画</option></select>";
            html += "<select class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option><option value='4'>备用线路3</option></select>";
            html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='videoPlayer' id='videoPlayer" + String(id) + "'></video><div class='videoScale' id='videoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = document.getElementsByClassName("layout-Main")[0];
            b.insertBefore(a, b.childNodes[0]);
            setElementDrag(id);
            setElementResize(id);
            setElementFunc_Bilibili(id, rid);
            setElementVideo(id, lurl);
        }
    });
}

function setElementFunc_Bilibili(id, rid) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoPlayer = document.getElementById("videoPlayer" + String(id));
    let info = document.getElementById("videoInfo" + String(id));
    let scale = document.getElementById("videoScale" + String(id));
    videoPlayer.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (scale.style.display != "block") {
            scale.style.display = "block";
            info.style.display = "block";
        } else {
            scale.style.display = "none";
            info.style.display = "none";
        }
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
    let videoQn = document.getElementById("videoQn" + String(id));
    let videoCDN = document.getElementById("videoCDN" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoQn.onchange = function() {
        getRealLive_Bilibili(rid, videoQn.value, videoCDN.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoCDN.onchange = function() {
        getRealLive_Bilibili(rid, videoQn.value, videoCDN.value, (lurl) => {
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoClose.onclick = function() {
        box.remove();
    }


    let videoRID = document.getElementById("videoRID" + String(id));
    videoRID.onclick = function() {
        getRealLive_Bilibili(rid, videoQn.value, videoCDN.value, (lurl) => {
            GM_setClipboard(lurl);
            showMessage("复制成功", "success");
        })
    }
}

// Huya
function createNewVideo_Huya(id, rid, rname){
    getRealLive_Huya(rid, "1", "1", (lurl, msg) => {
        if (lurl != "" || lurl != null) {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            let a = document.createElement("div");
            let html = "";
            a.id = "videoDiv" + String(id);
            a.rid = rid;
            a.className = "videoDiv";
            html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><a title='复制直播流地址'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "Huya - " + rname + "</span></a>";
            html += "<select class='videoQn' id='videoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>超清</option><option value='3'>蓝光4M</option><option value='4'>原画</option></select>";
            html += "<select class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option></select>";
            html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='videoPlayer' id='videoPlayer" + String(id) + "'></video><div class='videoScale' id='videoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = document.getElementsByClassName("layout-Main")[0];
            b.insertBefore(a, b.childNodes[0]);
            setElementDrag(id);
            setElementResize(id);
            setElementFunc_Huya(id, rid);
            setElementVideo(id, lurl);
        }
    });
}

function setElementFunc_Huya(id, rid) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoPlayer = document.getElementById("videoPlayer" + String(id));
    let info = document.getElementById("videoInfo" + String(id));
    let scale = document.getElementById("videoScale" + String(id));
    videoPlayer.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (scale.style.display != "block") {
            scale.style.display = "block";
            info.style.display = "block";
        } else {
            scale.style.display = "none";
            info.style.display = "none";
        }
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
    let videoQn = document.getElementById("videoQn" + String(id));
    let videoCDN = document.getElementById("videoCDN" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoQn.onchange = function() {
        getRealLive_Huya(rid, videoQn.value, videoCDN.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoCDN.onchange = function() {
        getRealLive_Huya(rid, videoQn.value, videoCDN.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoClose.onclick = function() {
        box.remove();
    }


    let videoRID = document.getElementById("videoRID" + String(id));
    videoRID.onclick = function() {
        getRealLive_Huya(rid, videoQn.value, videoCDN.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            GM_setClipboard(lurl);
            showMessage("复制成功", "success");
        })
    }
}


// iframe
function createNewVideo_iframe(id, url) {
    if (String(url).indexOf("douyu.com") == -1) {
        showMessage("有弹幕模式仅支持斗鱼直播", "error");
        return;
    }
    let rid_arr = String(url).split("/");
    let rid = rid_arr[rid_arr.length - 1];
    let a = document.createElement("div");
    let html = "";
    a.id = "videoDiv" + String(id);
    a.rid = rid;
    a.className = "videoDiv";
    html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span>";
    html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>"
    html += "</div>";
    html += "<iframe class='videoPlayer' id='videoPlayer" + String(id) + "' src=" + url + "?exid=chun></iframe>" 
    html += "<div class='videoScale' id='videoScale" + String(id) + "'></div>";
    a.innerHTML = html;
    let b = document.getElementsByClassName("layout-Main")[0];
    b.insertBefore(a, b.childNodes[0]);
    setElementDrag(id);
    setElementResize(id);
    if (id > videoPlayerArr.length - 1) {
        videoPlayerArr.push("iframe");
    } else {
        videoPlayerArr[id] = "iframe";
    }
    setElementFunc_iframe(id);
}

function setElementFunc_iframe(id) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoClose.onclick = function() {
        box.remove();
    }
    box.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
}
let real_viewIcon = '<svg style="width:16px;height:16px" t="1566119680547" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3494" width="128" height="128"><path d="M712.820909 595.224609C807.907642 536.686746 870.40537 437.74751 870.40537 325.549212 870.400378 145.753547 709.943392 0 511.997503 0 314.055363 0 153.599626 145.753547 153.599626 325.549212 153.599626 437.74751 216.092361 536.686746 311.179092 595.219615 149.961841 657.72608 31.268214 793.205446 5.334335 955.968198 1.926253 962.195123 0 969.212275 0 976.638899 0 1002.324352 22.919038 1023.151098 51.198627 1023.151098 79.476967 1023.151098 102.396005 1002.324352 102.396005 976.638899L102.396005 1023.151098C102.396005 817.669984 285.787009 651.099674 511.997503 651.099674 738.212992 651.099674 921.602746 817.669984 921.602746 1023.151098L921.602746 976.638899C921.602746 1002.324352 944.523034 1023.151098 972.801376 1023.151098 1001.07472 1023.151098 1024 1002.324352 1024 976.638899 1024 969.212275 1022.073747 962.195123 1018.659424 955.968198 992.731789 793.205446 874.038157 657.72608 712.820909 595.224609ZM511.997503 558.080262C370.618285 558.080262 256.000624 453.967732 256.000624 325.545467 256.000624 197.121954 370.618285 93.009424 511.997503 93.009424 653.386707 93.009424 767.993133 197.121954 767.993133 325.545467 767.993133 453.972726 653.386707 558.080262 511.997503 558.080262L511.997503 558.080262Z" p-id="3495"></path></svg>'
let real_danmuIcon = '<svg t="1576951281876" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6314" width="16" height="16"><path d="M500.622222 324.266667s0 5.688889-5.688889 5.688889v62.577777h91.022223v-56.888889H506.311111c-5.688889-17.066667-5.688889-17.066667-5.688889-11.377777zM733.866667 324.266667c5.688889 0 0-5.688889 0 0h-91.022223v56.888889h91.022223v-56.888889zM494.933333 523.377778c0 5.688889 0 5.688889 5.688889 5.688889 0 0 5.688889 0 5.688889 5.688889h79.644445v-56.888889H494.933333v45.511111zM733.866667 529.066667v-51.2h-91.022223v56.888889h85.333334c5.688889 0 5.688889 0 5.688889-5.688889z" p-id="6315" fill="#1296db"></path><path d="M796.444444 0H227.555556C102.4 0 0 102.4 0 227.555556v568.888888c0 125.155556 102.4 227.555556 227.555556 227.555556h568.888888c125.155556 0 227.555556-102.4 227.555556-227.555556V227.555556c0-125.155556-102.4-227.555556-227.555556-227.555556zM381.155556 711.111111c-5.688889 34.133333-11.377778 56.888889-22.755556 73.955556-11.377778 17.066667-22.755556 34.133333-34.133333 39.822222s-28.444444 11.377778-45.511111 11.377778c-17.066667 0-39.822222-5.688889-62.577778-22.755556-17.066667-11.377778-28.444444-17.066667-34.133334-28.444444-5.688889-11.377778-5.688889-22.755556 5.688889-39.822223 5.688889-11.377778 11.377778-17.066667 22.755556-17.066666s22.755556 0 34.133333 11.377778c11.377778 5.688889 17.066667 11.377778 22.755556 17.066666 5.688889 0 11.377778 5.688889 17.066666 0 5.688889 0 11.377778-5.688889 11.377778-5.688889 5.688889-5.688889 5.688889-11.377778 11.377778-17.066666 5.688889-11.377778 5.688889-22.755556 5.688889-39.822223 0-17.066667 5.688889-39.822222 5.688889-73.955555 0-11.377778 0-22.755556-5.688889-22.755556 0-5.688889-11.377778 0-11.377778 0H210.488889c-5.688889 0-17.066667-5.688889-22.755556-11.377777-5.688889-5.688889-5.688889-11.377778-11.377777-22.755556v-39.822222l11.377777-91.022222c0-11.377778 5.688889-22.755556 5.688889-34.133334 0-11.377778 5.688889-17.066667 11.377778-22.755555 5.688889-5.688889 11.377778-11.377778 17.066667-11.377778 5.688889 0 17.066667-5.688889 28.444444-5.688889h51.2c5.688889 0 11.377778 0 11.377778-5.688889 0 0 5.688889-5.688889 5.688889-17.066667v-39.822222s0-11.377778-5.688889-17.066666l-11.377778-11.377778H210.488889c-11.377778 0-22.755556 0-28.444445-5.688889-5.688889-5.688889-5.688889-17.066667-5.688888-28.444445 0-17.066667 5.688889-22.755556 11.377777-28.444444 5.688889-5.688889 17.066667-5.688889 28.444445-22.755556h108.088889c22.755556 11.377778 39.822222 17.066667 45.511111 34.133334 11.377778 11.377778 5.688889 56.888889 5.688889 56.888889V341.333333c0 28.444444-5.688889 51.2-17.066667 62.577778-11.377778 11.377778-22.755556 17.066667-45.511111 17.066667h-56.888889c-5.688889 0-11.377778 0-17.066667 5.688889 0 0-5.688889 5.688889-5.688889 11.377777l-5.688888 56.888889v11.377778h91.022222s22.755556 5.688889 28.444444 5.688889c5.688889 0 17.066667 5.688889 17.066667 11.377778s11.377778 11.377778 11.377778 22.755555 5.688889 22.755556 5.688889 39.822223c5.688889 51.2 5.688889 91.022222 0 125.155555z m455.111111 17.066667c-5.688889 5.688889-22.755556 11.377778-34.133334 17.066666h-125.155555v62.577778c-17.066667 17.066667-22.755556 28.444444-28.444445 34.133334-5.688889 5.688889-17.066667 11.377778-34.133333 11.377777-11.377778 0-22.755556-5.688889-28.444444-11.377777-5.688889-5.688889-11.377778-17.066667 0-34.133334v-62.577778H420.977778c-5.688889-11.377778-11.377778-11.377778-11.377778-11.377777-5.688889 0-5.688889-5.688889-5.688889-11.377778v-22.755556c-5.688889-17.066667-5.688889-28.444444 5.688889-34.133333 5.688889-5.688889 17.066667-5.688889 34.133333-11.377778h142.222223v-56.888889H500.622222c-22.755556 0-45.511111-5.688889-51.2-17.066666-11.377778-11.377778-11.377778-28.444444-11.377778-56.888889V312.888889c0-28.444444 5.688889-45.511111 17.066667-56.888889 11.377778-11.377778 28.444444-17.066667 51.2-17.066667 0 0 0-5.688889-5.688889-5.688889L494.933333 227.555556c-11.377778-17.066667-11.377778-22.755556-11.377777-34.133334 0-11.377778 5.688889-17.066667 17.066666-28.444444 11.377778-5.688889 22.755556-11.377778 34.133334-11.377778 11.377778 0 22.755556 11.377778 28.444444 22.755556 5.688889 11.377778 5.688889 22.755556 11.377778 34.133333 5.688889 11.377778 11.377778 17.066667 11.377778 28.444444h79.644444c11.377778-11.377778 17.066667-17.066667 17.066667-28.444444 5.688889-11.377778 11.377778-17.066667 11.377777-28.444445 5.688889-17.066667 17.066667-22.755556 22.755556-28.444444 11.377778-5.688889 17.066667 0 28.444444 5.688889s17.066667 17.066667 22.755556 22.755555c5.688889 11.377778 0 22.755556-5.688889 34.133334 0 5.688889-5.688889 5.688889-5.688889 11.377778s-5.688889 5.688889-5.688889 11.377777c22.755556 0 39.822222 5.688889 51.2 17.066667 11.377778 11.377778 11.377778 28.444444 11.377778 56.888889v204.8c0 28.444444-5.688889 45.511111-11.377778 56.888889s-28.444444 17.066667-51.2 17.066666h-85.333333v56.888889h125.155556c17.066667 0 28.444444 5.688889 34.133333 11.377778 5.688889 5.688889 11.377778 17.066667 11.377778 28.444445 11.377778 22.755556 11.377778 34.133333 0 39.822222z" p-id="6316" fill="#1296db"></path></svg>'
// let real_giftIcon = '<svg t="1576950815993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3618" width="16" height="16"><path d="M554.957 829.848l-85.905 0 0-463.89c0-18.978 15.384-34.363 34.362-34.363l17.182 0c18.978 0 34.362 15.38499999 34.362 34.363l0 463.89z" fill="#d4237a" p-id="3619"></path><path d="M889.985 494.814l-755.97 0c-37.902 0-68.724-30.82999999-68.724-68.725L65.291 323.003c0-56.846 46.241-103.087 103.087-103.087l687.245 0c56.846 0 103.087 46.24 103.087 103.087l0 103.086c-0.001 37.894-30.823 68.725-68.725 68.725z m0-68.725l0 34.363 0.016-34.363-0.016 0zM168.377 288.64c-18.94300001 0-34.363 15.412-34.363 34.364l0 103.086 755.87 0 0.1-103.086c0-18.952-15.42-34.363-34.363-34.363L168.377 288.641z" fill="#d4237a" p-id="3620"></path><path d="M821.26 958.712L202.74 958.712c-37.903 0-68.725-30.838-68.725-68.732L134.015 494.814c0-37.89400001 30.822-68.725 68.724-68.725l618.522 0c37.902 0 68.724 30.82999999 68.724 68.725L889.985 889.98c0 37.89400001-30.822 68.73199999-68.724 68.732z m0-68.732l0 34.362 0.017-34.362-0.016 0zM202.74 494.814L202.74 889.98l618.42 0 0.1-395.166L202.74 494.814z m281.358-240.537c-9.93399999 0-19.78200001-4.278-26.578-12.55L358.728 121.46c-12.03-14.664-9.916-36.317 4.748-48.363 14.648-12.038 36.326-9.924 48.373 4.74l98.79199999 120.268c12.03 14.664 9.916 36.317-4.74799999 48.363a34.213 34.213 0 0 1-21.795 7.81z" fill="#d4237a" p-id="3621"></path><path d="M539.902 254.277a34.212 34.212 0 0 1-21.795-7.81c-14.664-12.047-16.778-33.7-4.748-48.363L612.15 77.836c12.047-14.664 33.708-16.77799999 48.373-4.74 14.664 12.047 16.778 33.7 4.748 48.363l-98.792 120.268c-6.795 8.272-16.644 12.55-26.577 12.55z" fill="#d4237a" p-id="3622"></path></svg>'
let real_money_yc = '<svg t="1579155265981" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6949" width="16" height="16"><path d="M136.96 67.413h181.76L512 452.693l193.28-385.28h181.76l-245.76 445.44h163.84v84.48h-211.2l-1.28 1.28v106.24h212.48v84.48H592.64v192H431.36v-192h-211.2v-84.48h211.2v-106.24l-1.28-1.28H220.16v-84.48h162.56z" fill="#F54330" p-id="6950"></path></svg>'
let real_info = {
	view: "",
	showtime: 777,
	danmu_person_count: "",
	gift_person_count: "",
	isShow: 2,
	money_yc: 0,
	money_bag: 0,
	money_total: 0,
}

function initPkg_RealAudience() {
	initPkg_RealAudience_Dom();
	initPkg_RealAudience_Func();
	
	fetch("https://www.douyu.com/swf_api/h5room/" + rid, {
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(retData => {
		real_info.showtime = retData.data.show_time;
		real_info.isShow = retData.data.show_status;
		getRealViewer();
		setInterval(getRealViewer, 30000);
	}).catch(err => {
		console.log("请求失败!", err);
	})
}


function initPkg_RealAudience_Dom() {
	document.querySelector(".AnchorAnnounce > h3").style.display = "none";
	let html = "";
	let a = document.createElement("div");
	a.className = "real-audience";
	html += "<div id='real-audience__t' style='display: inline-block;margin-right:3px;' title='今日累计观看人数'>" + real_viewIcon + '<span id="real-audience__total" style="color:red">****</span></div>';
	html += "<div style='display: inline-block;margin-right:3px;' title='弹幕人数'>" + real_danmuIcon + '<span id="real-audience__barrage">****</span></div>';
	// html += "<div style='display: inline-block;margin-right:3px;' title='送礼人数'>" + real_giftIcon + '<span id="real-audience__gift">****</span></div>';
	html += "<div id='real-audience__money' style='display: inline-block;margin-right:3px;' title='今日累计礼物价值'>" + real_money_yc + '<span id="real-audience__money_yc">****</span></div>';
	
	html += '<span id="real-audience__time" style="float:right">' + "已播:" + "****" + "</span>";
	a.innerHTML = html;
	
	let b = document.getElementsByClassName("AnchorAnnounce")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_RealAudience_Func() {
	document.getElementsByClassName("AnchorAnnounce")[0].addEventListener("mouseover", function() {document.querySelector(".AnchorAnnounce > h3").style.display="block"});
	document.getElementsByClassName("AnchorAnnounce")[0].addEventListener("mouseout", function() {document.querySelector(".AnchorAnnounce > h3").style.display="none"});
	document.getElementsByClassName("real-audience")[0].addEventListener("click", function() {
		openPage("https://www.xiaohulu.com/liveParticularsIndex/2/" + rid, true);
	})
}

function getRealViewer() {
	if(document.querySelector(".MatchSystemChatRoomEntry") != null){
		document.querySelector(".MatchSystemChatRoomEntry").style.display = "none";
	}
	fetch("https://bojianger.com/data/api/common/search.do?keyword=" + rid,{
		method: 'GET',
	}).then(res => {
		return res.json();
	}).then(retData => {
		let showedTime = 0;
		if (real_info.isShow == 2) {
			showedTime = 0;
		} else {
			if (real_info.showtime == 777) {
				showedTime = 0;
			} else {
				showedTime = Math.floor(Date.now()/1000) - Number(real_info.showtime);
			}
		}
		real_info.view = retData.data.anchorVo.audience_count;
		real_info.danmu_person_count = retData.data.anchorVo.danmu_person_count;
		real_info.gift_person_count = retData.data.anchorVo.gift_person_count;
		real_info.money_yc = retData.data.anchorVo.gift_new_yc;
		if (real_info.money_yc == "undefined" || real_info.money_yc == undefined) {
			real_info.money_yc = 0;
			real_info.money_bag = 0;
			real_info.money_total = 0;
		} else {
			real_info.money_bag = retData.data.anchorVo.gift_new_bag;
			real_info.money_total = retData.data.anchorVo.yc_gift_value;
		}
		
		document.getElementById("real-audience__total").innerText = real_info.view;
		document.getElementById("real-audience__t").title = "总人数:" + real_info.view + " 弹幕人数:" + real_info.danmu_person_count + " 送礼人数:" + real_info.gift_person_count;
		document.getElementById("real-audience__barrage").innerText = real_info.danmu_person_count;
		// document.getElementById("real-audience__gift").innerText = real_info.gift_person_count;
		document.getElementById("real-audience__money_yc").innerText = real_info.money_yc;
		document.getElementById("real-audience__money").title = "总礼物价值:" + real_info.money_total + " 鱼翅礼物:" + real_info.money_yc + " 背包礼物:" + real_info.money_bag;
		
		document.getElementById("real-audience__time").innerText = "已播:" + formatSeconds(showedTime);
		
	}).catch(err => {
		console.log("请求失败!", err);
	})
}



function initPkg_RemoveAD() {
    let t = setInterval(() => {
        let a = document.getElementsByClassName("PlayerToolbar-wealthNum")[0];
        if (a != undefined) {
            removeAD();
            clearInterval(t);
        }
    }, 1000);
}

function removeAD() {
    let a;
    a = document.getElementsByClassName("recommendAD-54569e")[0]; // 左
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("recommendApp-0e23eb")[0]; // 右
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("Title-ad")[0]; // 分享左
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("Bottom-ad")[0]; // 鱼吧ad
    if (a != undefined) {
        a.style.display = "none";
    }
    a = document.getElementsByClassName("SignBarrage")[0];
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("corner-ad-495ade")[0];
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("SignBaseComponent-sign-ad");
    if (a != undefined) {
        for (let i = 0; i < a.length; i++) {
            // a[i].style.display = "none";
            a[i].remove();
        }
    }
    a = document.getElementsByClassName("SuperFansBubble")[0];
    if (a != undefined) {
        a.remove();
    }
    
    // a = document.getElementsByClassName("recommendView-3e8b62")[0]
    // if (a != undefined) {
    //     a.remove();
    // }
	
    // a = document.getElementsByClassName("js-room-activity")[0];
    // if (a != undefined) {
    //     a.remove();
    // }
    
    a = document.getElementsByClassName("is-noLogin")[0];
    if (a != undefined) {
        a.style.display = "none"
    }
    a = document.getElementsByClassName("ChatSend-button")[0];
    if (a != undefined) {
        a.className = "ChatSend-button";
    }
}
function initPkg_Sign() {
	initPkg_Sign_Dom();
	initPkg_Sign_Func();
}

function initPkg_Sign_Func() {
	document.getElementsByClassName("ex-sign")[0].addEventListener("click", function() {
		// 这里挂载每个子模块的函数入口
		// 入口即为调用
		initPkg_Sign_Yuba(); // 鱼吧签到
		initPkg_Sign_Client();
		initPkg_Sign_Motorcade();
		initPkg_Sign_Room();
	})
}
function initPkg_Sign_Dom() {
	Sign_insertIcon();
}
function Sign_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-sign"; // 以免有同名冲突,加了ex-
	a.innerHTML = '<a class="ex-panel__icon" title="一键签到(所有关注的直播间/鱼吧/客户端/车队)"><svg style="display: block;" t="1578566545259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12959" width="32" height="32"><path d="M698.368 80.896v114.688c0 23.552 19.968 43.008 44.032 43.008s44.032-19.456 44.032-43.008V80.896c0-23.552-19.968-43.008-44.032-43.008s-44.032 18.944-44.032 43.008zM227.328 80.896v114.688c0 23.552 19.968 43.008 44.032 43.008 24.576 0 44.032-19.456 44.032-43.008V80.896c0-23.552-19.968-43.008-44.032-43.008-24.576 0-44.032 18.944-44.032 43.008z" fill="#F96C5D" p-id="12960"></path><path d="M977.92 195.584c0-23.552-19.968-43.008-44.032-43.008h-88.576v43.008c0 55.296-46.08 100.352-102.912 100.352s-102.912-45.056-102.912-100.352v-43.008H374.272v43.008c0 55.296-46.08 100.352-102.912 100.352-56.832 0-102.912-45.056-102.912-100.352v-43.008H79.872c-24.576 0-44.032 19.456-44.032 43.008v611.328l252.928-145.92-8.192-8.192c-10.24-9.728-16.384-23.552-16.384-38.4 0-29.696 25.088-54.272 55.808-54.272 15.36 0 29.184 6.144 39.424 15.872l28.16 27.648L977.92 263.168V195.584z" fill="#F96C5D" p-id="12961"></path><path d="M329.216 278.528c-5.632 3.584-11.264 6.656-17.408 9.216 5.632-2.56 11.776-5.632 17.408-9.216zM344.064 266.24c4.608-4.608 8.704-9.728 12.8-14.848-3.584 5.632-8.192 10.24-12.8 14.848zM329.216 278.528c5.632-3.584 10.752-7.68 15.36-12.288-5.12 4.608-10.24 8.704-15.36 12.288zM449.536 664.064l220.16-214.016c10.24-9.728 24.064-15.872 39.424-15.872 30.72 0 55.808 24.064 55.808 54.272 0 14.848-6.144 28.672-16.384 38.4l-259.072 252.416c-10.24 9.728-24.064 15.872-39.424 15.872s-29.184-6.144-39.424-15.872l-121.344-118.272L35.84 806.912v104.96c0 23.552 19.968 43.008 44.032 43.008h854.016c24.576 0 44.032-19.456 44.032-43.008V263.168L387.584 603.648l61.952 60.416zM350.72 569.856c-4.608-3.072-9.216-5.12-14.336-6.656 5.12 1.024 10.24 3.584 14.336 6.656zM271.36 295.936c14.336 0 27.648-2.56 39.936-7.68-12.288 4.608-25.6 7.68-39.936 7.68z" fill="#F15A4A" p-id="12962"></path></svg><i id="ex-sign__tip" class="ex-panel__tip"></i></a>';
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_Sign_Client() {
	signClient();
}

function signClient() {
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://apiv2.douyucdn.cn/h5nc/sign/sendSign",
		data: 'token=' + dyToken,
		responseType: "json",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function(response) {
			let ret = response.response;
			if (ret.data.length == 0) {
				showMessage("【客户端】今日已签到", "warning");
				// console.log("【客户端】今日已签到");
			} else {
				if (ret.data.sign_pl.length != 0) {
					let recv = "";
					for (let i = 0; i < ret.data.sign_pl.length; i++) {
						recv = recv + ret.data.sign_pl[i].cnt + "个" + ret.data.sign_pl[i].name + ",";
					}
					showMessage("【客户端】签到成功! 获得物品:" + recv, "success");
					// console.log("【客户端】签到成功! 获得物品:" + recv);
				} else {
					showMessage("【客户端】签到成功! 可惜没有获得东西", "success");
					// console.log("【客户端】签到成功! 可惜没获得东西");
				}
			}
		}
	});
}
function initPkg_Sign_Motorcade() {
	signMotorcade();
}

function signMotorcade() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://msgm.douyu.com/mapi/v1.0/motorcade_battle/home",
		responseType: "json",
		headers: {
		  "dy-client": "android",
		  "dy-token": dyToken,
		},
		onload: function(response) {
			if (Object.keys(response.response).length != 0) {
				if (Object.keys(response.response.data.joined_motorcade).length != 0) {
					let mid = encodeURIComponent(response.response.data.joined_motorcade.id);
					GM_xmlhttpRequest({
						method: "GET",
						url: "https://msg.douyu.com/v3/motorcade/signs/weekly?mid=" + mid,
						responseType: "json",
						headers: {
							"dy-client": "android",
							"dy-token": dyToken,
						},
						onload: function(response) {
							if (response.response.data.is_sign == "1") {
								showMessage("【车队签到】车队已签到", "warning");
							} else {
								showMessage("【车队签到】即将打开车队签到页面", "info");
								openPage("https://msg.douyu.com/motorcade/#/motorcade/" + mid + "/task?total=" + String(Number(response.response.data.total) + 1) + "&mid=" + mid + "&exid=chun", false);
							}
						}
					});
				} 
			}
		}
	});
}

function getCookie(cookieName) {
	let csrfToken = "";
	let strCookie = document.cookie;
	let arrCookie = strCookie.split("; ");
	for(let i = 0; i < arrCookie.length; i++) {
		let arr = arrCookie[i].split("=");
		if(cookieName == arr[0]){
			csrfToken = arr[1];
		}
	}
	if(csrfToken == ""){
		csrfToken = Math.random().toString(36).substr(2);
		document.cookie = "post-csrfToken="+ escape(csrfToken)+";path=/";
	}
	return csrfToken;
}
function signMotorcade_Sign(m, t) {
	fetch('https://msg.douyu.com/v3/msign/add?timestamp=' + Math.random().toFixed(17), {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'dy-device-id':'-',
			"dy-client": "web",
			"dy-csrf-token":getCookie("post-csrfToken"),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: "to_mid="+ m +"&expression=" + t
	}).then(res => {
		return res;
	}).then(ret => {
		if (Math.floor(ret.status_code / 100) == 2){
			console.log("【车队】签到成功")
		} else {
			console.log(ret.message);
		}
		closePage();
	}).catch(err => {
		console.log("请求失败!", err)
		closePage();
	})
}
function initPkg_Sign_Room() {
	signAllRoom();
}
function signAllRoom() {
    // 1. get page counts(777)
    // 2. for in all pages
    // 3. sign each room
    let pageCount = 0;
    fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/list?page=777',{
        method: 'GET',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'include',
    }).then(res => {
        return res.json();
    }).then(ret => {
        pageCount = Number(ret.data.pageCount);
        for (let nowPage = 1; nowPage <= pageCount; nowPage++) {
            fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/list?page=' + String(nowPage),{
                method: 'GET',
                mode: 'no-cors',
                cache: 'default',
                credentials: 'include',
            }).then(res => {
                return res.json();
            }).then(ret => {
                let roomCount = Number(ret.data.list.length);
                for (let i = 0; i < roomCount; i++) {
                    signRoom(ret.data.list[i].room_id);
                    if (nowPage == pageCount && i == roomCount - 1) {
                        showMessage("【房间签到】" + ret.data.total + "个房间签到已完成！", "success");
                    }
                }
            }).catch(err => {
                console.log("请求失败!", err);
            })
        }
        showMessage("【房间签到】" + ret.data.total + "个房间正在签到中...", "info");
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

function signRoom(r) {
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://apiv2.douyucdn.cn/japi/roomuserlevel/apinc/checkIn",
		data: 'rid=' + r + '&ctn=' + getCCN(),
		responseType: "json",
		headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': dyToken,
            'cookie': document.cookie
		},
		onload: function(response) {
        }
	});
}
function initPkg_Sign_Yuba() {
	signYubaList();
}

function signYuba(group_id, t) {
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://yuba.douyu.com/ybapi/topic/sign",
		data: 'group_id=' + group_id,
		responseType: "json",
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded",
		  "dy-client": "pc",
		  "dy-token": t,
		  'Referer': 'https://yuba.douyu.com/group/' + group_id
		},
		onload: function(response) {
			if (response.response.message == "") {
				showMessage("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp, "success");
				// console.log("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
			} else {
				showMessage("【鱼吧】" + group_id + response.response.message, "warning");
				// console.log("【鱼吧】" + group_id + response.response.message);
			}
		 
		}
	});
}

function signYubaList() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://yuba.douyu.com/wbapi/web/group/myFollow?page=1&limit=999",
		responseType: "json",
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded",
		  "dy-client": "pc",
		  "dy-token": dyToken
		},
		onload: function(response) {
			for (let i = 0; i < response.response.data.list.length; i++) {
				signYuba(response.response.data.list[i].group_id, dyToken);
			}
		 
		}
	});
	
}

// 版本号
// 格式 yyyy.MM.dd.**
// var curVersion = "2020.01.12.01";
var curVersion = "2020.03.01.01"
function initPkg_Update() {
	initPkg_Update_Dom();
	initPkg_Update_Func();

	Update_checkVersion(); // 首次检查更新
}

function initPkg_Update_Dom() {
	Update_insertIcon();
}
function Update_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-update";
	a.innerHTML = '<a class="ex-panel__icon" title="版本更新"><svg t="1578767541873" style="display:block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23715" width="32" height="32"><path d="M768 810.7H512c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h256c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z" fill="#3688FF" p-id="23716"></path><path d="M554.7 938.7c-10.9 0-21.8-4.2-30.2-12.5l-128-128c-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0 16.7 16.7 16.7 43.7 0 60.3L487 768l97.8 97.8c16.7 16.7 16.7 43.7 0 60.3-8.3 8.4-19.2 12.6-30.1 12.6z" fill="#5F6379" p-id="23717"></path></svg><i id="ex-update__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_Update_Func() {
	document.getElementsByClassName("ex-update")[0].addEventListener("click", Update_openUpdatePage);
}

function Update_checkVersion() {
	fetch('https://greasyfork.org/zh-CN/scripts/394497',{
		method: 'GET',
		mode: 'cors',
		cache: 'no-store',
		credentials: 'omit',
	}).then(res => {
		return res.text();
	}).then(txt => {
		txt = (new DOMParser()).parseFromString(txt, 'text/html');
		let v = txt.getElementsByClassName("script-show-version")[1];
		if(v != undefined){
			if (v.innerText != curVersion) {
				Update_showTip(true);
			}
		}
	}).catch(err => {
		console.error('请求失败', err);
	})
}

function Update_openUpdatePage() {
	openPage("https://greasyfork.org/zh-CN/scripts/394497", true);
}

function Update_showTip(a) {
	let d = document.getElementById("ex-update__tip");
	if (a == true) {
		if (d.style.display != "block") {
			showMessage("【版本更新】插件有新版本，请及时更新~", "error");
			d.style.display = "block";
		}
	} else {
		d.style.display = "none";
	}
}
/*
  md5.js
*/
var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz))}function b64_md5(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz))}function str_md5(s){return binl2str(core_md5(str2binl(s),s.length*chrsz))}function hex_hmac_md5(key,data){return binl2hex(core_hmac_md5(key,data))}function b64_hmac_md5(key,data){return binl2b64(core_hmac_md5(key,data))}function str_hmac_md5(key,data){return binl2str(core_hmac_md5(key,data))}function md5_vm_test(){return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72"}function core_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t)}function core_hmac_md5(key,data){var bkey=str2binl(key);if(bkey.length>16)bkey=core_md5(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C}var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128)}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}function str2binl(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin}function binl2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);return str}function binl2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF)}return str}function binl2b64(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3){var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F)}}return str}
/*
    Notice.js
*/
(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==='object'&&typeof module==='object')module.exports=factory();else if(typeof define==='function'&&define.amd)define("NoticeJs",[],factory);else if(typeof exports==='object')exports["NoticeJs"]=factory();else root["NoticeJs"]=factory()})(typeof self!=='undefined'?self:this,function(){return(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{configurable:false,enumerable:true,get:getter})}};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module['default']}:function getModuleExports(){return module};__webpack_require__.d(getter,'a',getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="dist/";return __webpack_require__(__webpack_require__.s=2)})([(function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var noticeJsModalClassName=exports.noticeJsModalClassName='noticejs-modal';var closeAnimation=exports.closeAnimation='noticejs-fadeOut';var Defaults=exports.Defaults={title:'',text:'',type:'success',position:'topRight',timeout:30,progressBar:true,closeWith:['button'],animation:null,modal:false,scroll:{maxHeight:300,showOnHover:true},rtl:false,callbacks:{beforeShow:[],onShow:[],afterShow:[],onClose:[],afterClose:[],onClick:[],onHover:[],onTemplate:[]}}}),(function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.appendNoticeJs=exports.addListener=exports.CloseItem=exports.AddModal=undefined;exports.getCallback=getCallback;var _api=__webpack_require__(0);var API=_interopRequireWildcard(_api);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}var options=API.Defaults;function getCallback(ref,eventName){if(ref.callbacks.hasOwnProperty(eventName)){ref.callbacks[eventName].forEach(function(cb){if(typeof cb==='function'){cb.apply(ref)}})}}var AddModal=exports.AddModal=function AddModal(){if(document.getElementsByClassName(API.noticeJsModalClassName).length<=0){var element=document.createElement('div');element.classList.add(API.noticeJsModalClassName);element.classList.add('noticejs-modal-open');document.body.appendChild(element);setTimeout(function(){element.className=API.noticeJsModalClassName},200)}};var CloseItem=exports.CloseItem=function CloseItem(item){getCallback(options,'onClose');if(options.animation!==null&&options.animation.close!==null){item.className+=' '+options.animation.close}setTimeout(function(){item.remove()},200);if(options.modal===true&&document.querySelectorAll("[noticejs-modal='true']").length>=1){document.querySelector('.noticejs-modal').className+=' noticejs-modal-close';setTimeout(function(){document.querySelector('.noticejs-modal').remove()},500)}var position='.'+item.closest('.noticejs').className.replace('noticejs','').trim();setTimeout(function(){if(document.querySelectorAll(position+' .item').length<=0){let p=document.querySelector(position);if(p!=null){p.remove()}}},500)};var addListener=exports.addListener=function addListener(item){if(options.closeWith.includes('button')){item.querySelector('.close').addEventListener('click',function(){CloseItem(item)})}if(options.closeWith.includes('click')){item.style.cursor='pointer';item.addEventListener('click',function(e){if(e.target.className!=='close'){getCallback(options,'onClick');CloseItem(item)}})}else{item.addEventListener('click',function(e){if(e.target.className!=='close'){getCallback(options,'onClick')}})}item.addEventListener('mouseover',function(){getCallback(options,'onHover')})};var appendNoticeJs=exports.appendNoticeJs=function appendNoticeJs(noticeJsHeader,noticeJsBody,noticeJsProgressBar){var target_class='.noticejs-'+options.position;var noticeJsItem=document.createElement('div');noticeJsItem.classList.add('item');noticeJsItem.classList.add(options.type);if(options.rtl===true){noticeJsItem.classList.add('noticejs-rtl')}if(noticeJsHeader&&noticeJsHeader!==''){noticeJsItem.appendChild(noticeJsHeader)}noticeJsItem.appendChild(noticeJsBody);if(noticeJsProgressBar&&noticeJsProgressBar!==''){noticeJsItem.appendChild(noticeJsProgressBar)}if(['top','bottom'].includes(options.position)){document.querySelector(target_class).innerHTML=''}if(options.animation!==null&&options.animation.open!==null){noticeJsItem.className+=' '+options.animation.open}if(options.modal===true){noticeJsItem.setAttribute('noticejs-modal','true');AddModal()}addListener(noticeJsItem,options.closeWith);getCallback(options,'beforeShow');getCallback(options,'onShow');document.querySelector(target_class).appendChild(noticeJsItem);getCallback(options,'afterShow');return noticeJsItem}}),(function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _noticejs=__webpack_require__(3);var _noticejs2=_interopRequireDefault(_noticejs);var _api=__webpack_require__(0);var API=_interopRequireWildcard(_api);var _components=__webpack_require__(4);var _helpers=__webpack_require__(1);var helper=_interopRequireWildcard(_helpers);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var NoticeJs=function(){function NoticeJs(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,NoticeJs);this.options=Object.assign(API.Defaults,options);this.component=new _components.Components();this.on('beforeShow',this.options.callbacks.beforeShow);this.on('onShow',this.options.callbacks.onShow);this.on('afterShow',this.options.callbacks.afterShow);this.on('onClose',this.options.callbacks.onClose);this.on('afterClose',this.options.callbacks.afterClose);this.on('onClick',this.options.callbacks.onClick);this.on('onHover',this.options.callbacks.onHover);return this}_createClass(NoticeJs,[{key:'show',value:function show(){var container=this.component.createContainer();if(document.querySelector('.noticejs-'+this.options.position)===null){document.body.appendChild(container)}var noticeJsHeader=void 0;var noticeJsBody=void 0;var noticeJsProgressBar=void 0;noticeJsHeader=this.component.createHeader(this.options.title,this.options.closeWith);noticeJsBody=this.component.createBody(this.options.text);if(this.options.progressBar===true){noticeJsProgressBar=this.component.createProgressBar()}var noticeJs=helper.appendNoticeJs(noticeJsHeader,noticeJsBody,noticeJsProgressBar);return noticeJs}},{key:'on',value:function on(eventName){var cb=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};if(typeof cb==='function'&&this.options.callbacks.hasOwnProperty(eventName)){this.options.callbacks[eventName].push(cb)}return this}}]);return NoticeJs}();exports.default=NoticeJs;module.exports=exports['default']}),(function(module,exports){}),(function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Components=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _api=__webpack_require__(0);var API=_interopRequireWildcard(_api);var _helpers=__webpack_require__(1);var helper=_interopRequireWildcard(_helpers);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var options=API.Defaults;var Components=exports.Components=function(){function Components(){_classCallCheck(this,Components)}_createClass(Components,[{key:'createContainer',value:function createContainer(){var element_class='noticejs-'+options.position;var element=document.createElement('div');element.classList.add('noticejs');element.classList.add(element_class);return element}},{key:'createHeader',value:function createHeader(){var element=void 0;if(options.title&&options.title!==''){element=document.createElement('div');element.setAttribute('class','noticejs-heading');element.textContent=options.title}if(options.closeWith.includes('button')){var close=document.createElement('div');close.setAttribute('class','close');close.innerHTML='&times;';if(element){element.appendChild(close)}else{element=close}}return element}},{key:'createBody',value:function createBody(){var element=document.createElement('div');element.setAttribute('class','noticejs-body');var content=document.createElement('div');content.setAttribute('class','noticejs-content');content.innerHTML=options.text;element.appendChild(content);if(options.scroll!==null&&options.scroll.maxHeight!==''){element.style.overflowY='auto';element.style.maxHeight=options.scroll.maxHeight+'px';if(options.scroll.showOnHover===true){element.style.visibility='hidden'}}return element}},{key:'createProgressBar',value:function createProgressBar(){var element=document.createElement('div');element.setAttribute('class','noticejs-progressbar');var bar=document.createElement('div');bar.setAttribute('class','noticejs-bar');element.appendChild(bar);if(options.progressBar===true&&typeof options.timeout!=='boolean'&&options.timeout!==false){var frame=function frame(){if(width<=0){clearInterval(id);var item=element.closest('div.item');if(options.animation!==null&&options.animation.close!==null){item.className=item.className.replace(new RegExp('(?:^|\\s)'+options.animation.open+'(?:\\s|$)'),' ');item.className+=' '+options.animation.close;var close_time=parseInt(options.timeout)+500;setTimeout(function(){helper.CloseItem(item)},close_time)}else{helper.CloseItem(item)}}else{width--;bar.style.width=width+'%'}};var width=100;var id=setInterval(frame,options.timeout)}return element}}]);return Components}()})])});
/*
    Get Bilibili Real Live URL (https)
    By: 小淳
*/
function getRealLive_Bilibili(room_id, qn, cdn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入string(1,2,3,4,5),表示清晰度 流畅_80(1) 高清_150(2) 超清_250(3) 蓝光_400p(4) 原画_10000p(5)
    // 第三个参数传入string(1,2,3,4),表示线路 1:主线路 2:备用线路1 3:备用线路2 4:备用线路3 此参数只对HTTPS有效
    // 第四个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}
    let qn_data = "80";
    switch (qn) {
        case "1":
            qn_data = "80";
            break;
        case "2":
            qn_data = "150";
            break;
        case "3":
            qn_data = "250";
            break;
        case "4":
            qn_data = "400";
            break;
        case "5":
            qn_data = "10000";
            break;
        default:
            qn_data = "80";
            break;
    }
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://api.live.bilibili.com/room/v1/Room/playUrl?cid=" + room_id + "&qn=" + qn_data + "&platform=web",
		responseType: "json",
		onload: function(response) {
            let ret = response.response;
            let rurl = "";
            if (ret.data.durl != null) {
                rurl = ret.data.durl[Number(cdn)].url;
            } else {
                rurl = "";
            }
            reallive_callback(rurl);
        }
	});
}
/*
    Get Bilibili Real Room ID
    By: 小淳 
*/

function getRealRid_Bilibili(url, realrid_callback) {
    GM_xmlhttpRequest({
		method: "GET",
		url: url,
        responseType: "text",
		onload: function(response) {
            let ret = response.response;
            let rid = "";
            rid =  getStrMiddle(ret, 'room_id":', ',');
            rid = rid.trim();
            if (rid == "") {
                rid = "-1";
            }
            realrid_callback(rid);
        }
	});
}
/*
    Get Douyu Real Live URL (http/https)
    By: 小淳
*/
function getRealLive_Douyu(room_id, is_https, qn, cdn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入bool,表示是否返回https地址。注意https地址只能使用一次，使用过以后需要再次获取；http地址无限制
    // 第三个参数传入string(1,2,3,4),表示清晰度 流畅_550p(rate:1) 高清_1200p(rate:2) 超清_2000p(rate:3) 蓝光4M_4000p(rate:4)
    // 第四个参数传入string(1,2,3,4),表示线路 1:主线路(ws-h5) 2:备用线路1(tct-h5) 3:备用线路2(ali-h5) 此参数只对HTTPS有效
    // 第五个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}
    GM_xmlhttpRequest({
		method: "GET",
		url: 'https://m.douyu.com/' + room_id,
		responseType: "text",
		onload: function(response) {
            let a = response.response.match(/(function ub9.*)[\s\S](var.*)/i);
            let b = String(a[1]).replace(/eval.*;}/, 'strc;}');
            let c = b + String(a[2]);
            let tt2 = dateFormat("yyyyMMdd", new Date());
            let tt0 = String(Math.round(new Date().getTime()/1000).toString());
            RealLive_get_sign_url(tt2, room_id, tt0, c, is_https, qn, cdn, reallive_callback); // 传入参数无误
        }
	});
}

function RealLive_get_sign_url(post_v, r, tt, ub9, is_https, qn, cdn, reallive_callback) {
    let sign = RealLive_get_sign(r, post_v, tt, ub9);
    if (is_https != true) {
        let postData = 'v=2501' + post_v + '&did=10000000000000000000000000001501&tt=' + tt + '&sign=' + sign + '&ver=219032101&rid=' + r + '&rate=-1';
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://m.douyu.com/api/room/ratestream",
            data: postData,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'
            },
            onload: function(response) {
                let ret = response.response;
                let result = "";
                if (ret.code == "0") {
                    let url = ret.data.url;
                    if (String(url).indexOf("mix=1") != -1) {
                        result = "PKing"
                    } else {
                        let p = /live\/(\d{1,8}[0-9a-zA-Z]+)_?[\d]{0,4}\/playlist/i;
                        result = String(url).match(p)[1];
                    }
                } else {
                    result = "0";
                }
                let cl = "";
                switch (qn) {
                    case "1":
                        cl = "550p"
                        break;
                    case "2":
                        cl = "1200p"
                        break;
                    case "3":
                        cl = "2000p"
                        break;    
                    case "4":
                        cl = "4000p"
                        break;               
                    default:
                        cl = "1200p"
                        break;
                }
                let realLive = "";
                if (result == "0") {
                    realLive = "None";
                } else {
                    realLive = "https://tx2play1.douyucdn.cn/live/" + result + "_" + cl + ".flv?uuid=";
                }
                
                reallive_callback(realLive);
            }
        });
    } else {
        fetch("https://www.douyu.com/lapi/live/getH5Play/" + r, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'v=220120200219&did=' + getDyDid() + '&tt=' + tt + '&sign=' + sign + '&cdn=' + cdn + '&rate=' + qn + '&ver=Douyu_220021805&iar=0&ive=0'
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.data != "") {
                reallive_callback(ret.data.rtmp_url + "/" + ret.data.rtmp_live);
            } else {
                showMessage(ret.msg, "error");
                console.log(ret.msg);
            }
        })
    }
}

function RealLive_get_sign(r, post_v, tt, ub9) {
    let ub9_ex = String(ub9).replace("ub98484234", "ub98484234_ex");
    eval1(ub9_ex, "exScript1");
    let res2 = ub98484234_ex();
    let str3 = String(res2).replace(/\(function[\s\S]*toString\(\)/, "\'");
    let md5rb = hex_md5(r + '10000000000000000000000000001501' + tt + '2501' + post_v);
    let str4 = 'function get_sign(){var rb=\'' + md5rb + str3;
    let str5 = String(str4).replace(/return rt;}[\s\S]*/, 'return re;};');
    let str6 = String(str5).replace(/"v=.*&sign="\+/, '');
    str6 = String(str6).replace("get_sign", "get_sign_ex")
    eval1(str6, "exScript2");
    let sign = get_sign_ex(r + "10000000000000000000000000001501", tt);
    document.getElementById("exScript1").remove();
    document.getElementById("exScript2").remove();
    return sign;
}

function eval1(str, iid) {
    var sc = document.createElement("script");
    sc.id = iid
    sc.setAttribute("type","text\/javascript");
    sc.appendChild(document.createTextNode(str));
    document.body.appendChild(sc);
}
/* 
    Get Douyu Real Room ID
    By: 小淳
*/

function getRealRid_Douyu(url, realrid_callback) {
    fetch(url,{
        method: 'GET',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'include',
    }).then(res => {
        return res.text();
    }).then(doc => {
        doc = (new DOMParser()).parseFromString(doc, 'text/html');
        let url = doc.getElementsByTagName('html')[0].innerHTML;
        let urlLen = ("$ROOM.room_id =").length;
        let ridPos = url.indexOf('$ROOM.room_id =');
        let rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
        rid = rid.trim();
        if (isRid(rid) == true) {
            realrid_callback(rid);
        } else {
            showMessage("获取直播间失败，请检查直播间地址是否正确！", "error")
        }
        
    }).catch(err => {
        console.log("请求失败!", err);
    })
}
/*
    Get Huya Real Live URL (https)
    By: 小淳
*/
function getRealLive_Huya(url, qn, cdn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入string(1,2,3,4),表示清晰度 流畅_500(1) 超清_2500(2) 蓝光4M_4500(3) 原画(4)
    // 第三个参数传入string(1,2,3,4),表示线路 1:主线路 2:备用线路1 3:备用线路2 4:备用线路3 
    // 第四个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url, msg) => {console.log(url, msg)}
    // 这个回调函数有2个参数，第一个是直播流地址，第二个是信息，用于判断错误
    let qn_data = "500";
    switch (qn) {
        case "1":
            qn_data = "500";
            break;
        case "2":
            qn_data = "2500";
            break;
        case "3":
            qn_data = "4500";
            break;
        case "4":
            qn_data = "0";
            break;
        default:
            qn_data = "500";
            break;
    }
    let cdn_data = Number(cdn) - 1;
    GM_xmlhttpRequest({
		method: "GET",
		url: url,
		responseType: "text",
		onload: function(response) {
            let html = String(response.response);
            let lurl = ""; // 直播源
            let msg = ""; // 信息 预留
            let lurl_sFlvUrl = "";
            let lurl_sStreamName = "";
            let lurl_sFlvUrlSuffix = "";
            let lurl_sFlvAntiCode = "";
            if (getStrMiddle(html, '"state":"', '",') == "ON") {
                let tlen = ("hyPlayerConfig = ").length;
                let tpos = html.indexOf("hyPlayerConfig = ");
                let json = JSON.parse(html.substring(tpos + tlen, html.indexOf('};', tpos + tlen)) + '}');
                if (json.stream != null) {
                    if (json.stream.data[0].gameStreamInfoList.length >= cdn_data) {
                        lurl_sFlvUrl = json.stream.data[0].gameStreamInfoList[cdn_data].sFlvUrl;
                        lurl_sFlvUrl = String(lurl_sFlvUrl).replace("http", "https");
                        lurl_sStreamName = json.stream.data[0].gameStreamInfoList[cdn_data].sStreamName;
                        lurl_sFlvUrlSuffix = json.stream.data[0].gameStreamInfoList[cdn_data].sFlvUrlSuffix;
                        lurl_sFlvAntiCode = json.stream.data[0].gameStreamInfoList[cdn_data].sFlvAntiCode;

                        lurl = lurl_sFlvUrl + "/" + lurl_sStreamName + "." + lurl_sFlvUrlSuffix + "?" + lurl_sFlvAntiCode;
                        lurl = lurl.replace(/amp;/g, "");
                        if (qn_data != "0") {
                            lurl = lurl + "&ratio=" + qn_data;
                        }
                    } else {
                        msg = "暂无该线路";
                    }
                }
            } else {
                msg = "该房间未开播";
            }
            reallive_callback(lurl, msg);
        }
	});
}

