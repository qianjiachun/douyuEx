"use strict";
// ==UserScript==
// @name         DouyuEx-斗鱼直播间增强插件
// @namespace    https://github.com/qianjiachun
// @icon         https://s2.ax1x.com/2020/01/12/loQI3V.png
// @version      2020.07.18.02
// @description  弹幕自动变色防检测循环发送 一键续牌 查看真实人数/查看主播数据 已播时长 一键签到(直播间/车队/鱼吧/客户端) 一键领取鱼粮(宝箱/气泡/任务) 一键寻宝 送出指定数量的礼物 一键清空背包 屏蔽广告 调节弹幕大小 自动更新 同屏画中画/多直播间小窗观看/可在斗鱼看多个平台直播(b站) 获取真实直播流地址 自动抢礼物红包 背包信息扩展 简洁模式 夜间模式 开播提醒 幻神模式 关键词回复 关键词禁言 自动谢礼物 自动抢宝箱 弹幕右键信息扩展 防止下播自动跳转
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
// @require      https://cdn.jsdelivr.net/npm/svgaplayerweb@2.3.1/build/svga.min.js
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        unsafeWindow
// ==/UserScript==
function init() {
	initPkg_Night_Set_Fast();
	removeAD();
	initPkg_Statistics();
	initPkg_Console();
}
function initPkg() {
	initPkg_ExIcon();
	initPkg_ExPanel();
	initPkg_RealAudience();
	initPkg_CopyRealLive();
	initPkg_RemoveAD();
	initPkg_BagInfo();
	initPkg_Update();
	initPkg_PopupPlayer();
	initPkg_LiveTool();
	initPkg_ExpandTool();
	initPkg_Night();
	initPkg_Refresh();
	initPkg_BarrageLoop();
	initPkg_FansContinue();
	initPkg_FishFood();
	initPkg_FishPond();
	initPkg_Sign();
	initPkg_BarragePanel();
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
.bag-info {    position: absolute;    background-color: rgba(0, 0, 0, 0.6);    color: white;    width: 20px;    font-weight: 800;    height: 20px;    text-align: center;}.bag-button {    position: relative;    color: rgb(255, 255, 255);    text-align: center;    height: 15px;    line-height: 15px;    cursor: pointer;    margin-left: 5px;    background: rgb(70, 171, 255);    border-radius: 9px;    padding: 0px 10px;    float: right;    right: 20px;}.bloop {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 200px;	position: relative;	bottom: 200px;	display: none;}.bloop__switch {	position: absolute;	right: 0;	bottom: 0;}.bloop__mode {	display: inline-block;}.barragePanel__funcPanel {    position: absolute;    width: 232px;    height: 270px;    display: block;    background: white;    overflow-y: scroll;}.barragePanel__funcPanel::-webkit-scrollbar {display:none}.barragePanel__muteTime {    position: absolute;    left: 25px;    top: 123px;    z-index: 5;}#copy-real-live {    cursor: pointer;}.ex-icon {	display: inline-block;	vertical-align: middle;	margin-right: 8px;	-moz-user-select:none; /*火狐*/    -webkit-user-select:none; /*webkit浏览器*/    -ms-user-select:none; /*IE10*/    -khtml-user-select:none; /*早期浏览器*/    user-select:none;}.extool {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 200px;	position: relative;	bottom: 200px;	display: none;}.extool__switch {	position: absolute;	right: 0;	bottom: 0;}.extool__bsize,.extool__sendgift {	margin-bottom: 5px;}.extool__redpacket_room,.extool__gold {	display: inline-block;}.ex_giftAnimation {	width: 100%;	height: 100%;	position: absolute;	z-index: 50;	pointer-events: none;}.ex-panel {	width: 550px;	height: 50px;	position: absolute;	bottom: 35px;	right: 50px;	background-color: rgba(255,255,255,0.9);	display: none;	border: 2px rgb(234,173,26) solid;	z-index: 7777;}.ex-panel__wrap {	display: flex;	align-items: center;	justify-content: center;	width: 100%;	height: 100%;}.ex-panel__icon {	margin: 0 10px;	display: block;	position: relative;	padding: 5px;	transition: 0.5s;}.ex-panel__icon:hover {	transform: scale(1.25);}.ex-panel__tip {	display:none;	background:#f00;	border-radius:50%;	width:8px;	height:8px;	top:0px;	right:0px;	position:absolute;}.gift__panel {    width: 100%;    display: none;    margin-top: 4px;}#gift__title {    cursor: pointer;}#gift__select {    width: 190px;}.gift__option {    margin-top: 5px;}#gift__giftId {    width: 40px;}#gift__reply {    width: 150px;}.livetool {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 200px;	position: relative;	bottom: 200px;	display: none;}.livetool__cell {	position: relative;    display: -webkit-box;    display: -webkit-flex;    display: flex;    box-sizing: border-box;    width: 100%;    padding: 10px 16px;    overflow: hidden;    color: #323233;    font-size: 14px;    line-height: 24px;	background-color: #fff;	border-bottom: 1px solid rgba(0,0,0,0.2);	flex-wrap: wrap;    -webkit-flex-wrap: wrap;}.livetool__cell_title {	flex: 1;    -webkit-box-flex: 1;}.livetool__cell_option {	flex: 1;	-webkit-box-flex: 1;	text-align: right;}.livetool__cell_switch {	float: right;}.mute__panel {    width: 100%;    display: none;    margin-top: 4px;}#mute__title {    cursor: pointer;}#mute__idlist {    cursor: pointer;    color: royalblue;    margin-left: 10px;}#mute__select {    width: 110px;}.mute__option {    margin-top: 5px;}#mute__word {    width: 70px;}#mute__count {    width: 30px;}#mute__time {    width: 65px;}.reply__panel {    width: 100%;    display: none;    margin-top: 4px;}#reply__title {    cursor: pointer;}#reply__select {    width: 190px;}.reply__option {    margin-top: 5px;}#reply__word {    width: 70px;}#reply__reply {    width: 147px;}.livetool__Treasure {    width: 100%;    position: relative;    z-index: 999;}#ex-point {    cursor: pointer;    float: left;    line-height: 30px;    -moz-user-select:none; /*火狐*/    -webkit-user-select:none; /*webkit浏览器*/    -ms-user-select:none; /*IE10*/    -khtml-user-select:none; /*早期浏览器*/    user-select:none;}#point__value {    color: #333;}#ex-exchange {    position: absolute;    left: 0;    bottom: 37px;    z-index: 100;}.exchange__panel {    width: 400px;    height: 500px;    position: relative;}.exchange__wrap {    width: 400px;    height: 500px;    background-color: white;    border-radius: 3%;    overflow-y: scroll;    overflow-x: hidden;    box-shadow: 0px 0px 20px 0px #888888;}.exchange__wrap::-webkit-scrollbar {    display:none}.exchange__close {    position: absolute;    color: rgb(127, 127, 137);    right: 10px;    top: 5px;    font-size: 15px;    cursor: pointer;    z-index: 101;}.item__wrap {    width: 100%;    height: 130px;    border-bottom: 1px solid rgba(121,127,137,0.4);    position: relative;}.item__pic {    left: 10px;    top: 10px;    position: absolute;    height: 110px;    width: 110px;}.item__name {    position: absolute;    top: 7px;    left: 130px;    color: #353536;;    font-size: 15px;    margin-right: 10px;}.item__description {    position: absolute;    top: 32px;    left: 130px;    font-size: 12px;    margin-right: 10px;    color: #969799;}.item__num {    position: absolute;    bottom: 27px;    left: 130px;    font-size: 12px;    color: #969799;}.item__price {    position: absolute;    bottom: 7px;    left: 130px;    font-size: 14px;    color: rgb(255,93,35);    font-weight: 600;}.item__exchange {    position: absolute;    bottom: 8px;    right: 10px;    font-size: 14px;    color: white;    text-align: center;    width: 80px;    height: 25px;        background-color: rgb(255,93,35);    border-radius: 999px;    cursor: pointer;}#ex-pointlist {    position: absolute;    width: 300px;    height: 400px;    background-color: white;    border-radius: 3%;    overflow: auto;    z-index: 100;    bottom: 37px;}#ex-pointlist::-webkit-scrollbar {    display:none}.pointlist__wrap {    width: 100%;    height: 100%;    margin: 15px 0;    position: absolute;}.pointlist__close {    position: absolute;    color: rgb(127, 127, 137);    right: 7px;    font-size: 15px;    cursor: pointer;}.pointlist__wrap table {    border-collapse: collapse;    margin: 0 auto;    text-align: center;}.pointlist__wrap td,.pointlist__wrap th {    border: 1px solid #cad9ea;    color: #666;    height: 30px;    width: 85px;}.pointlist__wrap thead th {    background-color: #CCE8EB;    width: 100px;}.pointlist__wrap tr:nth-child(odd) {    background: #fff;}.pointlist__wrap tr:nth-child(even) {    background: #F5FAFA;}.point__panel {    position: absolute;    left: 0px;    bottom: 37px;    display: none;    animation: move-in 0.75s;    z-index: 101;}@keyframes move-in {    0% {        opacity: 0;    }    100% {        opacity: 0.95;    }}.panel__wrap {    overflow: hidden;    background-color: white;    border-radius: 5%;    width: 120px;    box-shadow: 0px 2px 20px 0px #888888;    font-size: 14px;}.panel__cell {    width: 100%;    height: 37px;    line-height: 37px;    border-bottom: 1px solid rgba(121,127,137,0.4);    text-align: center;    cursor: pointer;}.panel__cell:hover {    background-color: rgb(217, 217, 217);    transition: 0.75s;}.panel__triangle {    width: 0px;    height: 0px;    border-color: white transparent transparent transparent;    border-style: solid;    border-width: 10px;    position: absolute;    left: 35px;}#ex-record {    width: 300px;    height: 400px;    position: absolute;    bottom: 67px;    z-index: 100;}.record__close {    position: absolute;    color: rgb(127, 127, 137);    right: -20px;    font-size: 15px;    cursor: pointer;}.records__wrap {    width: 100%;    height: 100%;    background-color: white;    border-radius: 3%;    box-shadow: 0px 0px 20px 0px #888888;    padding: 15px;    overflow-y: scroll;    overflow-x: hidden;}.records__wrap::-webkit-scrollbar {    display:none}.record__wrap {    height: 50px;    width: 100%;    border: 1px solid rgba(121,127,137,0.4);    margin-bottom: 10px;    display: -webkit-box;    display: -moz-box;     display: -ms-flexbox;    display: -webkit-flex;     display: flex;     transition: 0.75s;    cursor: pointer;}.record__wrap:hover {    background-color: #e9f5ff;}.record__left {    flex: 1;    position: relative;}.record__name {    position: absolute;    flex: 1;    color: #353536;;    font-size: 15px;    top: 2px;    margin-left: 5px;}.record__updatetime {    position: absolute;    margin-left: 5px;    font-size: 12px;    bottom: 2px;    color: #969799;}.record__price {    line-height: 50px;    color: rgb(255,93,35);    margin-right: 10px;}.record__pagenav {    display: -webkit-box;    display: -moz-box;     display: -ms-flexbox;    display: -webkit-flex;     display: flex;     width: 310px;    position: absolute;    bottom: -20px;    padding-left: 10px;    padding-right: 10px;    cursor: pointer;}.record__prev {    flex: 1;    text-align: center;    border: 1px solid rgba(121,127,137,0.8);    transition: 0.75s;    color: white;    background-color: rgb(57,169,237);}.record__prev:hover {    background-color: #7167ff;}.record__next {    flex: 1;    text-align: center;    border: 1px solid rgba(121,127,137,0.8);    transition: 0.75s;    background-color: rgb(57,169,237);    color: white;}.record__next:hover {    background-color: #7167ff;}.videoDiv {    width: 400px;    height: 200px;    background-color: rgba(255, 255, 255, 0);    position: absolute;    z-index: 7777;}.videoPlayer {    width: 100%;    height: 100%;    cursor: move;}.videoScale {    width: 10px;    height: 10px;    overflow: hidden;    cursor: se-resize;    position: absolute;    right: 0;    bottom: 0;    background-color: rgb(231, 57, 57);}.videoInfo {    width: 100%;    height: 30px;    background-color: gray;    position: absolute;    top: -30px;    line-height: 30px;}.videoClose {    width: 30px;    float: right;    color: white;}.videoQn, .videoCDN {    margin-left: 5px;}.videoRID {    margin: 0px 5px;    font-weight: 800;    font-size: medium;}#popup-player__prompt {    display: none;}.real-audience {    cursor: pointer;}#refresh-video {    float: left;    width: 24px;    height: 24px;    margin-right: 20px;    cursor: pointer;    background-size: contain;}.refresh-barrage {    display: inline-block;    vertical-align: top;    margin: 0 2px;    padding: 0 8px;    height: 22px;    line-height: 21px;    background-color: #fff;    border: 1px solid #e5e4e4;    -webkit-border-radius: 4px;    -moz-border-radius: 4px;    border-radius: 4px;    cursor: pointer;}#refresh-barrage__svg {    vertical-align: middle;}/*    Notice.css*/.noticejs-top{top:0;width:100%!important}.noticejs-top .item{border-radius:0!important;margin:0!important}.noticejs-topRight{top:10px;right:10px}.noticejs-topLeft{top:10px;left:10px}.noticejs-topCenter{top:10px;left:50%;transform:translate(-50%)}.noticejs-middleLeft,.noticejs-middleRight{right:10px;top:50%;transform:translateY(-50%)}.noticejs-middleLeft{left:10px}.noticejs-middleCenter{top:50%;left:50%;transform:translate(-50%,-50%)}.noticejs-bottom{bottom:0;width:100%!important}.noticejs-bottom .item{border-radius:0!important;margin:0!important}.noticejs-bottomRight{bottom:10px;right:10px}.noticejs-bottomLeft{bottom:10px;left:10px}.noticejs-bottomCenter{bottom:10px;left:50%;transform:translate(-50%)}.noticejs{font-family:Helvetica Neue,Helvetica,Arial,sans-serif}.noticejs .item{margin:0 0 10px;border-radius:3px;overflow:hidden}.noticejs .item .close{float:right;font-size:18px;font-weight:700;line-height:1;color:#fff;text-shadow:0 1px 0 #fff;opacity:1;margin-right:7px}.noticejs .item .close:hover{opacity:.5;color:#000}.noticejs .item a{color:#fff;border-bottom:1px dashed #fff}.noticejs .item a,.noticejs .item a:hover{text-decoration:none}.noticejs .success{background-color:#64ce83}.noticejs .success .noticejs-heading{background-color:#3da95c;color:#fff;padding:10px}.noticejs .success .noticejs-body{color:#fff;padding:10px}.noticejs .success .noticejs-body:hover{visibility:visible!important}.noticejs .success .noticejs-content{visibility:visible}.noticejs .info{background-color:#3ea2ff}.noticejs .info .noticejs-heading{background-color:#067cea;color:#fff;padding:10px}.noticejs .info .noticejs-body{color:#fff;padding:10px}.noticejs .info .noticejs-body:hover{visibility:visible!important}.noticejs .info .noticejs-content{visibility:visible}.noticejs .warning{background-color:#ff7f48}.noticejs .warning .noticejs-heading{background-color:#f44e06;color:#fff;padding:10px}.noticejs .warning .noticejs-body{color:#fff;padding:10px}.noticejs .warning .noticejs-body:hover{visibility:visible!important}.noticejs .warning .noticejs-content{visibility:visible}.noticejs .error{background-color:#e74c3c}.noticejs .error .noticejs-heading{background-color:#ba2c1d;color:#fff;padding:10px}.noticejs .error .noticejs-body{color:#fff;padding:10px}.noticejs .error .noticejs-body:hover{visibility:visible!important}.noticejs .error .noticejs-content{visibility:visible}.noticejs .progressbar{width:100%}.noticejs .progressbar .bar{width:1%;height:30px;background-color:#4caf50}.noticejs .success .noticejs-progressbar{width:100%;background-color:#64ce83;margin-top:-1px}.noticejs .success .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#3da95c}.noticejs .info .noticejs-progressbar{width:100%;background-color:#3ea2ff;margin-top:-1px}.noticejs .info .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#067cea}.noticejs .warning .noticejs-progressbar{width:100%;background-color:#ff7f48;margin-top:-1px}.noticejs .warning .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#f44e06}.noticejs .error .noticejs-progressbar{width:100%;background-color:#e74c3c;margin-top:-1px}.noticejs .error .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#ba2c1d}@keyframes noticejs-fadeOut{0%{opacity:1}to{opacity:0}}.noticejs-fadeOut{animation-name:noticejs-fadeOut}@keyframes noticejs-modal-in{to{opacity:.3}}@keyframes noticejs-modal-out{to{opacity:0}}.noticejs-rtl .noticejs-heading{direction:rtl}.noticejs-rtl .close{float:left!important;margin-left:7px;margin-right:0!important}.noticejs-rtl .noticejs-content{direction:rtl}.noticejs{position:fixed;z-index:10050;width:320px}.noticejs ::-webkit-scrollbar{width:8px}.noticejs ::-webkit-scrollbar-button{width:8px;height:5px}.noticejs ::-webkit-scrollbar-track{border-radius:10px}.noticejs ::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.5);border-radius:10px}.noticejs ::-webkit-scrollbar-thumb:hover{background:#fff}.noticejs-modal{position:fixed;width:100%;height:100%;background-color:#000;z-index:10000;opacity:.3;left:0;top:0}.noticejs-modal-open{opacity:0;animation:noticejs-modal-in .3s ease-out}.noticejs-modal-close{animation:noticejs-modal-out .3s ease-out;animation-fill-mode:forwards}/** * PostbirdAlertBox.js * -    原生javascript弹框插件 * Author:  Postbird - http://www.ptbird.cn * License: MIT * Date:    2017-09-23 */.postbird-box-container {    width: 100%;    height: 100%;    overflow: hidden;    position: fixed;    top: 0;    left: 0;    z-index: 9999;    background-color: rgba(0, 0, 0, 0.2);    display: block;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none}.postbird-box-container.active {    display: block}.postbird-box-content {    min-width: 400px;    max-width: 600px;    min-height: 150px;    background-color: #fff;    border: solid 1px #dfdfdf;    position: absolute;    top: 50%;    left: 50%;    transform: translate(-50%, -50%);    margin-top: -100px}.postbird-box-header {    width: 100%;    padding: 10px 15px;    position: relative;    font-size: 1.1em;    letter-spacing: 2px}.postbird-box-close-btn {    cursor: pointer;    font-weight: 700;    color: #000;    float: right;    opacity: .5;    font-size: 1.3em;    margin-top: -3px;    display: none}.postbird-box-close-btn:hover {    opacity: 1}.postbird-box-text {    box-sizing: border-box;    width: 100%;    padding: 0 10%;    text-align: center;    line-height: 40px;    font-size: 20px;    letter-spacing: 1px}.postbird-box-footer {    width: 100%;    position: absolute;    padding: 0;    margin: 0;    bottom: 0;    display: flex;    display: -webkit-flex;    justify-content: space-around;    border-top: solid 1px #dfdfdf;    align-items: flex-end}.postbird-box-footer .btn-footer {    line-height: 44px;    border: 0;    cursor: pointer;    background-color: #fff;    color: #0e90d2;    font-size: 1.1em;    letter-spacing: 2px;    transition: background-color .5s;    -webkit-transition: background-color .5s;    -o-transition: background-color .5s;    -moz-transition: background-color .5s;    outline: 0}.postbird-box-footer .btn-footer:hover {    background-color: #e5e5e5}.postbird-box-footer .btn-block-footer {    width: 100%}.postbird-box-footer .btn-left-footer,.postbird-box-footer .btn-right-footer {    position: relative;    width: 100%}.postbird-box-footer .btn-left-footer::after {    content: "";    position: absolute;    right: 0;    top: 0;    background-color: #e5e5e5;    height: 100%;    width: 1px}.postbird-box-footer .btn-footer-cancel {    color: #333}.postbird-prompt-input {    width: 100%;    padding: 5px;    font-size: 16px;    border: 1px solid #ccc;    outline: 0}.onoffswitch {    position: relative; width: 45px;    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;}.onoffswitch-checkbox {    position: absolute;    opacity: 0;    pointer-events: none;}.onoffswitch-label {    display: block; overflow: hidden; cursor: pointer;    height: 20px; padding: 0; line-height: 20px;    border: 2px solid #E3E3E3; border-radius: 20px;    background-color: #FFFFFF;    transition: background-color 0.3s ease-in;}.onoffswitch-label:before {    content: "";    display: block; width: 20px; margin: 0px;    background: #FFFFFF;    position: absolute; top: 0; bottom: 0;    right: 23px;    border: 2px solid #E3E3E3; border-radius: 20px;    transition: all 0.3s ease-in 0s; }.onoffswitch-checkbox:checked + .onoffswitch-label {    background-color: #3AAD38;}.onoffswitch-checkbox:checked + .onoffswitch-label, .onoffswitch-checkbox:checked + .onoffswitch-label:before {   border-color: #3AAD38;}.onoffswitch-checkbox:checked + .onoffswitch-label:before {    right: 0px; }.layui-timeline {    padding-left: 5px;}.layui-timeline-item {    position: relative;    padding-bottom: 20px;}li {    list-style: none;}.layui-timeline-item:first-child::before {    display: block;}.layui-timeline-item:last-child::before {    content: '';    position: absolute;    left: 5px;    top: 0;    z-index: 0;    width: 0;    height: 100%;}.layui-timeline-item::before {    content: '';    position: absolute;    left: 5px;    top: 0;    z-index: 0;    width: 1px;    height: 100%;}.layui-timeline-item::before,hr {    background-color: #e6e6e6;}.layui-timeline-axis {    position: absolute;    left: -5px;    top: 0;    z-index: 10;    width: 20px;    height: 20px;    line-height: 20px;    background-color: #fff;    color: #5FB878;    border-radius: 50%;    text-align: center;    cursor: pointer;}.layui-icon {    font-family: layui-icon !important;    font-size: 16px;    font-style: normal;}.layui-timeline-content {    padding-left: 25px;}.layui-text {    line-height: 22px;    font-size: 14px;    color: rgb(85,85,85);}.layui-timeline-title {    position: relative;}
`));
	document.head.appendChild(style);
}

(function() {
	initRouter(window.location.href);
})();
// 全局变量及公共函数
var exTimer = 0; // 总时钟句柄
var url = document.getElementsByTagName('html')[0].innerHTML;
var urlLen = ("$ROOM.room_id =").length;
var ridPos = url.indexOf('$ROOM.room_id =');
var rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
rid = rid.trim();
url = null;
urlLen = null;
ridPos = null;
var my_uid = getCookieValue("acf_uid"); // 自己的uid
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
	let result = "" + parseInt(secondTime) + "秒";
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
	let exp = new Date();
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
function getUID() {
	let ret = getCookieValue("acf_uid");
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
	let o = {
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
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function isRid(str) {
	if (/^[0-9]+$/.test(str)) {
		return true;
	} else {
		return false;
	}
}
function getAvailableSheet(index) {
    let ret = -1;
    for (let i = index; i < document.styleSheets.length - index; i++) {
        if (document.styleSheets[i].href == null) {
            ret = i;
            break;
        } else {
            ret = -1;
        }
    }
    return ret;
}

function showMessageWindow(title, content, callback){
    if(window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) {
            var notice_ = new Notification(title, { body: content });
            notice_.onclick = function() {
				callback();
            }
        });
    }   
}

function getUserName() {
	return new Promise(resovle => {
		fetch('https://www.douyu.com/member/cp',{
			method: 'GET',
			mode: 'no-cors',
			credentials: 'include',
		}).then(res => {
			return res.text();
		}).then(txt => {
			txt = (new DOMParser()).parseFromString(txt, 'text/html');
			let ret = txt.getElementsByClassName("uname_con")[0].title;
			resovle(ret);
		}).catch(err => {
			console.error('请求失败', err);
		})
	})
}
function initPkg_BagInfo() {
	initPkg_BagInfo_Func();
}

function initPkg_BagInfo_Func() {
	document.getElementsByClassName("BackpackButton")[0].addEventListener("click", function() {
        setTimeout(() => {
            if (document.getElementsByClassName("Backpack JS_Backpack").length > 0) {
                getBagGifts(rid, (ret) => {
                    let chunkNum = ret.data.list.length;
                    if (chunkNum > 0) {
                        let totalPrice = 0;
                        let totalIntimate = 0;
                        for (let i = 0; i < chunkNum; i++) {
                            let chunk = document.getElementsByClassName("Backpack-prop")[i];
                            let isValuable = ret.data.list[i].isValuable; // 判断是否是有价值的礼物
                            let expiry = ret.data.list[i].expiry; // 过期时间
                            let price = ret.data.list[i].price; // 注意这个要除100才是真实价格，否则是亲密度
                            let intimate = ret.data.list[i].intimate; // 亲密度
                            let count = ret.data.list[i].count; // 数量
                            if (isValuable == "1") {
                                totalPrice = totalPrice + Number(price) * Number(count);
                            }
                            totalIntimate = totalIntimate + Number(intimate) * Number(count);
                            let expiryDiv = document.createElement("div");
                            expiryDiv.className = "bag-info";
                            expiryDiv.innerHTML = expiry;
                            chunk.insertBefore(expiryDiv, chunk.childNodes[0]);
                        }
                        document.getElementsByClassName("Backpack-space")[0].innerText = "总价值：" + String(Number(totalPrice / 100).toFixed(2)) + " 总亲密度：" + String(totalIntimate);
                        
                        let a = document.getElementsByClassName("Backpack-title")[0];
                        let b = document.createElement("div");
                        b.className = "bag-button";
                        b.id = "Backpack__clearbag";
                        b.innerText = "清空背包";
                        a.appendChild(b);
                        document.getElementById("Backpack__clearbag").addEventListener("click", () => {
                            if (confirm("确认清空？") != true) {
                                return;
                            }
                            showMessage("【清空背包】执行中...", "info");
                            getBagGifts(rid, (ret) => {
                                clearBagGifts(ret, rid);
                            })
                        })

                    }
                });
            }
        }, 300);
    });
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
	html += '<div style="display:inline-block"><label>弹幕：</label></div>';
	html += '<div class="bloop__mode"><label><input id="bloop__checkbox_tiangou" type="checkbox">舔狗模式</label></div>';
	html += '<textarea placeholder="一行一个，开启舔狗模式后此处不需要输入" id="bloop__textarea" rows="5" cols="50"></textarea>';
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
		text: document.getElementById("bloop__textarea").value,
		speed1: speed1,
		speed2: speed2,
		stopTime: stopTime,
		isChangeColor: isChangeColor,
		isTiangouMode: tiangouMode,
	}
	
	localStorage.setItem("ExSave_BarrageLoop", JSON.stringify(data)); // 存储弹幕列表
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
		sendBarrage(tiangouBarrage);
	} else {
		sendBarrage(barrageArr[barrageOffset]);
		barrageOffset++;
		if (barrageOffset > barrageLength) {
			barrageOffset = 0;
		}
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
			if (document.getElementsByClassName("livetool")[0].style.display == "block") {
				document.getElementsByClassName("livetool")[0].style.display = "none";
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
		document.getElementById("bloop__textarea").value = retJson.text;
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
            url: "https://chp.shadiao.app/api.php",
            responseType: "text",
            onload: function(response) {
                let ret = response.response;
                if (ret != "") {
					resolve(ret);
				}
            }
        });
	})
}
function initPkg_BarragePanel() {
	let timer = setInterval(() => {
        if (document.getElementsByClassName("danmuTips-1ee820").length > 0) {
            clearInterval(timer);
            document.getElementsByClassName("danmuTips-1ee820")[0].parentElement.id = "Ex_BarragePanel";
            setBarragePanelCallBack();
        }
    }, 1500);

    initPkg_BarragePanel_Tip();
}

function setBarragePanelCallBack() {
    let a = new DomHook("#Ex_BarragePanel", true, (m) => {
        let isAttributes = false;
        if (m.length > 0) {
            for (let i = 0; i < m.length; i++) {
                if (m[i].type == "attributes") {
                    isAttributes = true;
                    break;
                } 
            }
            if (isAttributes == false) {
                let addedNodes = m[0].addedNodes;
                if (addedNodes.length > 0) {
                    let barragePanel = addedNodes[0];
                    if ("getElementsByClassName" in barragePanel == false) {
                        return;
                    }
                    let userNameDom = barragePanel.getElementsByClassName("danmuAuthor-3d7b4a");
                    let id = "";
                    if (userNameDom.length > 0) {
                        id = userNameDom[0].innerText;
                        setUserFansMedal(userNameDom[0], id);
                        setMuteButton(barragePanel);
                        setSearchBarrageButton(barragePanel);
                        setMuteTimeButton(barragePanel);
                        setReplyBarrageButton(barragePanel);
                        setBarrgePanelFunc(barragePanel, id);
                    }
                }
            } else {
                let tmp = document.getElementsByClassName("barragePanel__funcPanel");
                if (tmp.length > 0) {
                    tmp[0].remove();
                }
                let barragePanel = document.getElementsByClassName("danmudiv-32f498")[0];
                let userNameDom = barragePanel.getElementsByClassName("danmuAuthor-3d7b4a");
                
                let id = "";
                if (userNameDom.length > 0) {
                    id = userNameDom[0].innerText;
                    setUserFansMedal(userNameDom[0], id);
                    setMuteButton(barragePanel);
                    setSearchBarrageButton(barragePanel);
                    setMuteTimeButton(barragePanel);
                    setReplyBarrageButton(barragePanel);
                    setBarrgePanelFunc(barragePanel, id);
                }

            }
            
        }
    });
}

function getUserFansMedal(userName) {
    let ret = false;
    let barrageList = document.getElementsByClassName("Barrage-listItem");
    for (let i = barrageList.length - 1; i >= 0; i--) {
        let barragePanel = barrageList[i].lastElementChild;
        if (barragePanel != null && barragePanel != undefined && barragePanel.innerHTML.indexOf(userName) != -1) {
            let fansElement = barragePanel.getElementsByClassName("FansMedal");
            if (fansElement.length > 0) {
                ret = fansElement[0].cloneNode(true);
                break;
            }
        }
    }
    return ret;
}
function getUserLevelText(userName) {
    let ret = "";
    let barrageList = document.getElementsByClassName("Barrage-listItem");
    for (let i = barrageList.length - 1; i >= 0; i--) {
        let barragePanel = barrageList[i].lastElementChild;
        if (barragePanel != null && barragePanel != undefined && barragePanel.innerHTML.indexOf(userName) != -1) {
            let roomAdmin = barragePanel.getElementsByClassName("Barrage-icon--roomAdmin");
            if (roomAdmin.length > 0) {
                ret += "【房管】";
            }
            let noble = barragePanel.getElementsByClassName("Barrage-nobleImg");
            if (noble.length > 0) {
                ret += `【${ noble[0].title }】`;
            }
            let level = barragePanel.getElementsByClassName("UserLevel");
            if (level.length > 0) {
                ret += level[0].title;
            }
            break;
        }
    }
    return ret;
}

function setUserFansMedal(dom, userName) {
    if (document.getElementById("barragePanel__id") == undefined) {
        dom.removeChild(dom.childNodes[0]);
        let userLevel = getUserLevelText(userName);
        let a = document.createElement("span");
        a.innerHTML = userName;
        a.title = userLevel;
        a.id = "barragePanel__id";
        dom.insertBefore(a, dom.childNodes[0]);
    }
    

    let fansMedal = getUserFansMedal(userName);
    if (fansMedal != false) {
        a = document.createElement("div");
        a.style = "display:inline-block";
        a.appendChild(fansMedal);
        dom.insertBefore(a, dom.childNodes[0]);
    }
}

function setMuteButton(dom) {
    if (document.getElementById("barragePanel__mute") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "ReportButton-41fa9e";
    a.id = "barragePanel__mute";
    a.innerText = "禁言";
    a.style = "margin-top:120px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setSearchBarrageButton(dom) {
    if (document.getElementById("barragePanel__search") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "HideButton-d22988";
    a.innerText = "查弹幕";
    a.id = "barragePanel__search";
    a.style = "margin-top:120px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setReplyBarrageButton(dom) {
    if (document.getElementById("barragePanel__reply") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "HideButton-d22988";
    a.innerText = "回复";
    a.id = "barragePanel__reply";
    a.style = "margin-top:90px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setMuteTimeButton(dom) {
    if (document.getElementsByClassName("barragePanel__muteTime").length > 0) {
        return;
    }
    let a = document.createElement("div");
    a.className = "barragePanel__muteTime";
    a.innerHTML = `
    <select id="barragePanel__muteSelect" style='width:55px'>
        <option value="1">1分钟</option>
        <option value="10">10分钟</option>
        <option value="30">30分钟</option>
        <option value="60">1小时</option>
        <option value="480">8小时</option>
        <option value="1440">1天</option>
        <option value="4320">3天</option>
        <option value="10080">7天</option>
        <option value="43200">30天</option>
        <option value="259200">180天</option>
        <option value="518400">360天</option>
    </select>
    `;
    dom.insertBefore(a, dom.childNodes[0]);
}

function setBarrgePanelFunc(parentDom, id) {
    document.getElementById("barragePanel__reply").onclick = () => {
        let txt = parentDom.getElementsByClassName("danmuContent-25f266")[0].innerText;
        if (txt != "") {
            document.getElementsByClassName("ChatSend-txt")[0].value = `@${ id }：${ txt }`;
        }
    };

    document.getElementById("barragePanel__mute").onclick = async () => {
        let value = document.getElementById("barragePanel__muteSelect").value || "1";
        let ret = await addMuteUser(rid, id, value);
        if (ret.msg == "添加成功") {
            showMessage(`【禁言】${id}已被禁言${value}分钟`, "success");
        } else {
            showMessage(ret.msg, "error");
        }
    };
    
    document.getElementById("barragePanel__search").onclick = async () => {
        insertBarragePanel_SearchBarrage_Dom(parentDom);
        barragePanelLastName = id;
        let ret = await getUserRecentBarrage(id);
        let retJson = JSON.parse(ret.data);
        let panel = document.getElementById("barragePanel__searchPanel");
        if(retJson.msg == "成功") {
            if ("danmuVoList" in retJson.data == false) {
                return;
            }
            for (let i = 0; i < retJson.data.danmuVoList.length; i++) {
                let item = retJson.data.danmuVoList[i];
                let a = document.createElement("li");
                a.className = "layui-timeline-item";
                a.innerHTML = `
                <i class="layui-icon layui-timeline-axis"></i>
                <div class="layui-timeline-content layui-text">
                    <h3 class="layui-timeline-title">${item.time}</h3>
                    <p>
                        <span style="font-size:12px">${item.anchorName}：</span><br/>
                        ${item.txt}
                    </p>
                </div>
                `;
                if (panel != null || panel != undefined) {
                    panel.appendChild(a);
                }
            }
            let end = document.createElement("li");
            end.className = "layui-timeline-item";
            end.innerHTML = `
            <i class="layui-icon layui-timeline-axis"></i>
            <div class="layui-timeline-content layui-text">
                <div class="layui-timeline-title"></div>
            </div>
            `;
            if (panel != null || panel != undefined) {
                panel.appendChild(end);
            }
            

        } else {
            showMessage("【查弹幕】查询失败", "error");
        }
    };
}

function insertBarragePanel_SearchBarrage_Dom(parentDom) {
    let pMarginLeft = parseInt(parentDom.style.marginLeft);
    let newMarginLeft = "-237px";
    if (pMarginLeft > 237) {
        newMarginLeft = "-237px";
    } else {
        newMarginLeft = "237px";
    }
    
    let a = document.createElement("div");
    a.className = "barragePanel__funcPanel";
    a.style = `margin-left:${newMarginLeft}`;
    a.innerHTML = `
    <ul class="layui-timeline" id="barragePanel__searchPanel">
        
    </ul>
    `;

    parentDom.insertBefore(a, parentDom.childNodes[0]);
}


function getUserRecentBarrage(name) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://dyapi.fz996.com/api/Wx/GetDataBarrage?keyword=" + name,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    });
}
function initPkg_BarragePanel_Tip() {
    setBarragePanelTipCallBack();
}

function setBarragePanelTipCallBack() {
    let a = new DomHook("#comment-dzjy-container", false, (m) => {
        if (m.length <= 0) {
            return;
        }
        if (m[0].addedNodes.length <= 0) {
            return;
        }
        let dom = m[0].addedNodes[0];
        renderBarragePanelTip(dom);
        setBarragePanelTipFunc();
    })
}

function renderBarragePanelTip(dom) {
    let a = document.createElement("div");
    a.style.display = "inline-block";
    document.getElementsByClassName("btnscontainer-4e2ed0")[0].insertBefore(a, dom.childNodes[0]);


    a = document.createElement("p");
    a.className = "sugun-e3fbf6";
    a.innerText = "|";
    dom.appendChild(a);

    a = document.createElement("div");
    a.className = "labelfisrt-407af4";
    a.id = "barrage-panel-tip__+1"
    a.innerText = "+1";
    dom.appendChild(a);
}

function setBarragePanelTipFunc() {
    document.getElementById("barrage-panel-tip__+1").onclick = () => {
        let txt = document.getElementById("comment-higher-container").innerText;
        sendBarrage(txt);
    }
}

function initPkg_Console() {
	console_watermark_douyEx();
}

function console_watermark_douyEx() {
    return;
}
function initPkg_CopyRealLive() {
	initPkg_CopyRealLive_Dom();
	initPkg_CopyRealLive_Func();
}

function initPkg_CopyRealLive_Dom() {
	CopyRealLive_insertIcon();
}
function CopyRealLive_insertIcon() {
	let a = document.createElement("div");
    a.className = "Title-blockInline";
    a.id = "copy-real-live";
	a.innerHTML = '<div class="TitleShare"><div class="TitleShare-shareBox "><div class="Title-row-span  is-right"><span class="Title-row-icon "><svg t="1585641756842" class="icon" viewBox="0 0 1237 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5646" width="16" height="16"><path d="M648.448 946.347l0.256-1.622-0.256 1.622z m84.31 13.354c-0.769 4.608-0.769 4.608-4.182 13.483-8.533 16.768-8.533 16.768-49.835 22.784-24.149-14.293-24.149-14.293-27.605-22.613-2.475-5.718-2.475-5.718-3.541-9.387L476.416 335.36l-103.083 499.2c-1.109 5.12-1.109 5.12-4.821 13.27-6.827 12.117-6.827 12.117-35.285 22.527-30.294-7.253-30.294-7.253-38.742-19.37-4.522-8.15-4.522-8.15-6.058-13.227l-74.582-262.357H0v-85.334h278.272l45.781 161.11 104.022-503.424c1.024-4.694 1.024-4.694 4.394-12.502 6.102-11.989 6.102-11.989 35.968-23.338 31.83 8.533 31.83 8.533 39.254 20.736 4.053 7.808 4.053 7.808 5.376 12.544l165.888 609.237 113.92-716.885c0.896-5.248 0.896-5.248 4.864-14.592 9.088-15.574 9.088-15.574 44.928-22.4C868.48 12.587 868.48 12.587 873.6 22.443c3.285 6.912 3.285 6.912 4.523 11.52l112 446.549h221.738v85.333H923.563l-78.507-312.917-112.299 706.773z" p-id="5647"></path></svg></span><span class="Title-row-text ">复制直播流</span></div></div></div>';
    let b = document.getElementsByClassName("Title-col")[4];
    if (b.childNodes.length > 1) {
        b.insertBefore(a, b.childNodes[1]);
    }
}

function initPkg_CopyRealLive_Func() {
	document.getElementById("copy-real-live").addEventListener("click", function() {
        getRealLive_Douyu(rid, false, "777", "1", (lurl) => {
            if (lurl == "None") {
                showMessage("房间未开播或其他错误", "error");
            } else {
                GM_setClipboard(String(lurl).replace("https", "http"));
                showMessage("复制成功", "success");
            }
            
        })
    });
    document.getElementsByClassName("Title-header")[0].addEventListener("click", function() {
        getRealLive_Douyu(rid, false, "777", "1", (lurl) => {
            if (lurl == "None") {
                showMessage("房间未开播或其他错误", "error");
            } else {
                GM_setClipboard(String(lurl).replace("https", "http"));
                showMessage("复制成功", "success");
            }
            
        })
    });
    document.getElementsByClassName("Title-header")[0].style.cursor = "pointer";
    document.getElementsByClassName("Title-header")[0].title = "复制直播流地址"
}


function initPkg_ExIcon() {
	initPkg_ExIcon_insertDom();
	initPkg_ExIcon_Func();
}
function initPkg_ExIcon_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-icon";
	a.innerHTML = '<a title="～ (´• ᵕ •`)*✲"><svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><image width="24" height="24" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABdFBMVEUAAAAzNjozNjozNjoz NjozNjozNjozNjozNjozNjozNjozNjozNjo0NjpCMjY0NjozNjozNjo9MzczNjozNjo4NThBMjZR U1eusLHQ0dKWmJozNjozNjpTVVl3eXxWWVxnaWyDhYi+v8BWWFzf3+AzNjptb3L09PTv7++Fh4ro 6OlER0rGx8iGh4pOUVQ+QUVXWVyWmJkzNjpxc3bZ2tv39/fX19jHyMnf4OBSVVg+QUWPkZOPkJM5 PEDo6Oja2tthZGeXmJrp6epTVVg0NzttcHKMjY+cnp+Ehog0NztjKSx7IyWIHyF1JCd8IiSpFRfN DAzWCQlmKCt+IiTEDg/UCgq5EhJ+ISTJDQ2WGxyjFxhaLC/SCgp2JCZJMDM8MzdQLjGFICJiKSx1 JCbPCwvFDg56IyVKMDOqq61rbXDNzs+2EhNOLzJrJypRLjE5NTg2OT2Ympw4NTheKy5PLzI5PED+ /v7////d3t/39/f8/Pz5+vpEN+40AAAASnRSTlMAAxorEg1Al7e/swd55v7QI4356Fvz/v7+/f4C Ff7+/v79/f7+Cf7+/v39/f39/v7+/ND8/f7+/v7++P398/79/fz9/uX9/f390Kmu6iUAAAABYktH RHdGZPnXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AUdCCsAU/Ff1wAAAWNJREFUKM9j YCAIGJmYmVkYMYRZ2dg5ODm52Nm4UYV5ePm8vH18fL34+HlYEeICgkJ+/gGBQBDgHyQkyAJXLygc HBIaCAahYcHCIjA9PELBgUggXJQHqoHXLwTIj4j084uKADJConkhWtjE/IHmxMTGxccnxMYATUvk YwO7nz0JaG9ErLiEpKSUeHJKYGCqF7s0UIKJIw2oPzJdIiMzM0siLhvI8eMAmcXMmZObm5uXL5lZ UFAoWVQM5JRwyoAlZOXk5ORLIRKlCkCOLFiChUuxrLxcSVkqq7CwQkpZpby8TJFLFWy5mnp5uYYm xHLNyvJyLTWw5Qxs2jpV5eXVunr6+ga61eXlVYbaYOcycBsZm5SXl5uamZtbmAIZJpZG0CDmsbIu RwI2tjyIQLSxq4KIVtnbIAKRgUXE1sHRCei2MidHZ1sRVeSIctF2dXN393DV9kSOKNxRCwLSrDIy qtKEEw0AQgtYsEqTgPQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDUtMjlUMDg6NDM6MDArMDA6 MDA6vG69AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA1LTI5VDA4OjQzOjAwKzAwOjAwS+HWAQAA AABJRU5ErkJggg=="/></svg><i id="ex-icon__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}
function initPkg_ExIcon_Func() {
	document.getElementsByClassName("ex-icon")[0].addEventListener("click", showExPanel);
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
	initPkg_ExpandTool_Module();
}

function initPkg_ExpandTool_Module() {
	// initPkg_ExpandTool_RedPacket_Motorcade();
	initPkg_ExpandTool_Treasure();
	initPkg_ExpandTool_Gold();
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
	a.innerHTML = '<a class="ex-panel__icon" title="扩展功能"><svg t="1590294700144" style="display:block;" class="icon" viewBox="0 0 1077 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11915" width="30" height="30"><path d="M152.770257 11.469971l213.048618 206.378138-37.094375 36.931681 159.440737 158.545917-76.95456 73.782015-159.440737-158.545917-38.47728 36.931681L0.244042 159.115348 152.770257 11.469971z" p-id="11916" fill="#d81e06"></path><path d="M1077.851922 217.848109h-105.751509L929.393073 260.311408l-31.644106 31.400063-33.02701 32.538926L776.866857 300.985065l-23.428026-87.204321 33.027009-32.538926 33.02701-32.538926L862.281538 105.751509V0.569431h-8.134732a244.041945 244.041945 0 0 0-178.964092 68.331745 234.768351 234.768351 0 0 0-68.738481 147.645376 250.712425 250.712425 0 0 0 10.981887 95.664443v2.765808a34.165872 34.165872 0 0 1-9.598983 36.931681c-17.896409 16.269463-525.096918 497.520178-525.096918 497.520178-42.625993 35.548777-38.47728 102.497617 0 142.113759 39.860184 38.233238 105.751509 40.673657 142.927233 0 0 0 478.322212-504.353352 498.984429-524.852875A33.677788 33.677788 0 0 1 754.821735 455.544963c5.531617 1.382904 10.981888 4.067366 16.269463 5.450271a242.170956 242.170956 0 0 0 87.936447 9.598983 237.290118 237.290118 0 0 0 148.45885-68.331745 231.677153 231.677153 0 0 0 68.738481-177.662536 14.805211 14.805211 0 0 0 1.626946-6.751827zM178.964093 943.628853a33.352399 33.352399 0 0 1-48.076263 0 32.538926 32.538926 0 0 1 0-47.832221 33.352399 33.352399 0 0 1 48.076263 0 35.467429 35.467429 0 0 1 0 47.832221z" p-id="11917" fill="#d81e06"></path><path d="M981.618049 785.082936L747.988561 567.804258S617.344773 601.97013 526.642517 753.682873c5.531617 1.382904 241.926915 239.161106 241.926914 239.161105a109.98157 109.98157 0 0 0 152.607563 0l60.441055-58.732761a102.823006 102.823006 0 0 0 0-149.028281zM854.146806 951.763584a29.366381 29.366381 0 0 1-38.477279 0l-195.233556-189.94598-1.382905-1.382904a25.543057 25.543057 0 0 1 1.382905-35.548777 29.366381 29.366381 0 0 1 38.47728 0l196.535113 189.94598A28.796949 28.796949 0 0 1 854.146806 951.763584z m86.634891-83.380997a29.366381 29.366381 0 0 1-38.47728 0L705.362568 678.436606l-1.382905-1.382904a25.543057 25.543057 0 0 1 1.382905-35.548777 29.366381 29.366381 0 0 1 38.477279 0l196.535113 189.945981a24.404194 24.404194 0 0 1 0 37.013028z" p-id="11918" fill="#d81e06"></path></svg><i id="extool__tip" class="ex-panel__tip"></i></a>';
	
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
			if (document.getElementsByClassName("livetool")[0].style.display == "block") {
				document.getElementsByClassName("livetool")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
	});
}

function initPkg_ExpandTool_BarrageSize() {
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
    cancelBarrageSize();
    StyleHook_set("Ex_Style_DanmuSize", ".danmuItem-31f924{font-size:" + s + "px !important;}");
}

function cancelBarrageSize() {
    StyleHook_remove("Ex_Style_DanmuSize");
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
    // html += '<input style="width:60px;margin-left:10px;" type="button" id="extool__clearbag_clearbtn" value="清空背包" />';
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
    // document.getElementById("extool__clearbag_clearbtn").addEventListener("click", function() {
    //     if (confirm("确认清空？") != true) {
    //         return;
    //     }
    //     showMessage("【清空背包】执行中...", "info");
    //     getBagGifts(rid, (ret) => {
    //         clearBagGifts(ret, rid);
    //     })
    // });
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
let gold_timer; // 时钟句柄
let goldGift_timer; // 时钟句柄
let user_name;
let animationNum = 0;
function initPkg_ExpandTool_Gold() {
    ExpandTool_Gold_insertDom();
    ExpandTool_Gold_insertGiftDom();
    ExpandTool_Gold_insertFunc();
    ExpandTool_Gold_Set();
}

function ExpandTool_Gold_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px;" id="extool__gold_start" type="checkbox">幻神模式</label>';
    html += '<label><input style="margin-top:5px;" id="extool__goldGift_start" type="checkbox">荧光棒变超火</label>';
    
    let a = document.createElement("div");
    a.className = "extool__gold";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_Gold_insertGiftDom() {
    let a = document.createElement("div");
    a.className = "ex_giftAnimation";
    let b = document.getElementsByClassName("Barrage-main")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_Gold_insertFunc() {
    document.getElementById("extool__gold_start").addEventListener("click", async function() {
        let ischecked = document.getElementById("extool__gold_start").checked;
        if (ischecked == true) {
            // 开启幻神模式
            gold_timer = setInterval(() => {
                goldBarrageList();
                goldBarrage();
                goldFansMedal();
            }, 300);
        } else{
            // 停止幻神模式
            clearInterval(gold_timer);
        }
        saveData_Gold();
	});
    document.getElementById("extool__goldGift_start").addEventListener("click", async function() {
        user_name = await getUserName();
        let ischecked = document.getElementById("extool__goldGift_start").checked;
        if (ischecked == true) {
            goldGift_timer = setInterval(() => {
                fansToSuperRocket();
            }, 300);
        } else{
            clearInterval(goldGift_timer);
        }
        saveData_GoldGift();
	});
}

function saveData_Gold() {
	let isGold = document.getElementById("extool__gold_start").checked;
	let data = {
		isGold: isGold
	}
	localStorage.setItem("ExSave_Gold", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_GoldGift() {
	let isGoldGift = document.getElementById("extool__goldGift_start").checked;
	let data = {
		isGoldGift: isGoldGift
	}
	localStorage.setItem("ExSave_GoldGift", JSON.stringify(data)); // 存储弹幕列表
}

function ExpandTool_Gold_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Gold");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isGold == true) {
            document.getElementById("extool__gold_start").click();
        }
    }
    ret = localStorage.getItem("ExSave_GoldGift");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isGoldGift == true) {
            document.getElementById("extool__goldGift_start").click();
        }
    }
}

function goldBarrageList() {
    let barrageArr = document.getElementsByClassName('Barrage-listItem');
    if (barrageArr.length < 1) {
        return;
    }
    for (let i = 0; i < barrageArr.length; i++) {
        let chatArea = barrageArr[i].lastElementChild;
        if (chatArea != null && chatArea.innerHTML.indexOf("is-self") != -1) {
            if (barrageArr[i].id == "ex_gold") {
                continue;
            }
            barrageArr[i].id = "ex_gold";
            barrageArr[i].className = "Barrage-listItem js-noblefloating-barrage";
            chatArea.className = "js-noblefloating-barragecont Barrage-notice--noble";
            chatArea.setAttribute('style','background-color: #fff3df');
            let nickNameObj = chatArea.getElementsByClassName("Barrage-nickName")[0];
            nickNameObj.setAttribute('class','Barrage-nickName is-self js-nick');

            let userLevelObj = chatArea.querySelector(".UserLevel");
            if( userLevelObj!=null){
                userLevelObj.className = "UserLevel UserLevel--120";
                userLevelObj.setAttribute("title", "用户等级：120");
            }
            let roomLevelObj = chatArea.querySelector(".RoomLevel");
            if( roomLevelObj!=null){
                roomLevelObj.className = "RoomLevel RoomLevel--18";
                roomLevelObj.setAttribute("title","房间等级：18");
            }
            let fansMedal = barrageArr[i].querySelector(".FansMedal");

            if(fansMedal!=null){
                fansMedal.style = "display:none;";
            }
            let fansMedalName = document.getElementsByClassName("FansMedal-name")[0];//fans medal
                let fansBackgroundImg = document.getElementsByClassName("FansRankList-item FansRankList-item--top")[0];
                if(fansMedalName!=undefined && fansBackgroundImg!= undefined ){
                    if(fansBackgroundImg.innerHTML.indexOf("background-image:")==-1){//common fans medal
                        let fansTag = document.createElement("div");
                        let fansSpan = document.createElement("span");
                        fansTag.className="FansMedal level-30 js-fans-dysclick Barrage-icon";
                        // fansTag.setAttribute("data-rid",roomId);//id is same to roomId
                        fansSpan.className = "FansMedal-name js-fans-dysclick";
                        // fansSpan.setAttribute("data-rid",roomId);
                        fansSpan.innerHTML = fansMedalName.innerText;
                        fansTag.appendChild(fansSpan);
                        chatArea.insertBefore(fansTag,chatArea.querySelector(".UserLevel"));
                    }else{//special fans medal
                        let fansTag1 = document.createElement("div");
                        fansTag1.className="FansMedal is-made js-fans-dysclick Barrage-icon";
                        fansTag1.setAttribute("style", fansBackgroundImg.getElementsByClassName("FansMedal is-made")[0].getAttribute("style") );
                        // fansTag1.setAttribute("data-rid",roomId);
                        let fansSpan1 = document.createElement("span");
                        fansSpan1.className = "FansMedal-name js-fans-dysclick";
                        // fansSpan1.setAttribute("data-rid",roomId);
                        fansSpan1.innerHTML = fansMedalName.innerText;
                        fansTag1.appendChild(fansSpan1);
                        chatArea.insertBefore(fansTag1,chatArea.querySelector(".UserLevel"));
                    }
                }else{//point to a fans medal when room have none of fans medal
                    let fansTag2 = document.createElement("div");
                    fansTag2.className="FansMedal level-30 js-fans-dysclick Barrage-icon";
                    fansTag2.setAttribute("data-rid","5189167");
                    let fansSpan2 = document.createElement("span");
                    fansSpan2.className = "FansMedal-name js-fans-dysclick";
                    fansSpan2.setAttribute("data-rid","5189167");
                    fansSpan2.innerHTML = "歆崽";
                    fansTag2.appendChild(fansSpan2);
                    chatArea.insertBefore(fansTag2,chatArea.querySelector(".UserLevel"));
                }

            let nobleIconObj = barrageArr[i].querySelector(".Barrage-nobleImg");
            if(nobleIconObj != null){
                nobleIconObj.src = "//res.douyucdn.cn/resource/2019/08/15/common/4e85776071ffbae2867bb9d116e9a43c.gif";
                nobleIconObj.title = "幻神"
            } else {
                let royalTag = document.createElement("span");
                let royalImg = document.createElement("img");
                royalTag.className = "Barrage-icon Barrage-noble";
                royalImg.className = "Barrage-nobleImg";
                royalImg.setAttribute("src", "//res.douyucdn.cn/resource/2019/08/15/common/4e85776071ffbae2867bb9d116e9a43c.gif");
                royalImg.setAttribute("title", "幻神");
                royalTag.appendChild(royalImg);
                chatArea.insertBefore(royalTag, chatArea.firstElementChild);
            }
        }
        
    }
}

function goldFansMedal() {
    document.getElementsByClassName("FansMedalEnter-enterContent")[0].setAttribute("data-medal-level","30");
}

function goldBarrage() {
    let fatherNode = document.querySelector(".danmu-6e95c1");
    for(let i = fatherNode.children.length-1;i>=0;i--){
        if(fatherNode.children[i].className.indexOf("noble-bf13ad")==-1 && fatherNode.children[i].innerHTML.indexOf("border: 2px solid rgb(2, 255, 255)")!=-1){//find self and remove redupliction
            //transform parent node
            if (fatherNode.children[i].id == "ex_goldbarrage") {
                continue;
            }
            fatherNode.children[i].id = "ex_goldbarrage";
            let liStyle = fatherNode.children[i].getAttribute("style");
            let characterLength = liStyle.substring(liStyle.indexOf("translateX(-")+12,liStyle.indexOf("px); transition"));
            let transformLength = liStyle.substring(liStyle.indexOf("transform ")+10,liStyle.indexOf("s linear"));
            let screenOpacity = liStyle.substring(liStyle.indexOf("opacity:")+8,liStyle.indexOf("; z-index:"));
            let characterStyle = "opacity: "+ screenOpacity +"; z-index: 30; background: rgba(0, 0, 0, 0); top: 4px; transform: translateX(-"+ characterLength +"px); transition: transform "+ transformLength +"s linear 0s;"
            fatherNode.children[i].className = "danmuItem-31f924 noble-bf13ad";
            fatherNode.children[i].setAttribute("style",characterStyle);
            //noble icon without redupliction remove
            let nobleImgTag = document.createElement("img");
            nobleImgTag.className = "super-noble-icon-9aacaf";
            nobleImgTag.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h1_dcd226.png");
            nobleImgTag.setAttribute("style","margin-left: -57px; margin-top: -4px;");
            fatherNode.children[i].insertBefore(nobleImgTag,fatherNode.children[i].firstElementChild);
            //user avatar img
            let userIconTag = document.createElement("img");
            userIconTag.className = "super-user-icon-574f31";
            let userIconObj = document.getElementsByClassName("Avatar is-circle")[0];
            if(userIconObj !=undefined){
                userIconObj = userIconObj.getElementsByTagName("img")[0].getAttribute("src");
                userIconTag.setAttribute("src", userIconObj.replace((new RegExp("_middle")),"_small"));
            }else{
                // console.error("未能获取到用户头像");
            }
            fatherNode.children[i].insertBefore(userIconTag,fatherNode.children[i].firstElementChild);
            //remove out tail tag
            let tailTag = fatherNode.children[i].getElementsByClassName("afterpic-8a2e13")[0];
            tailTag.remove();
            //transform barrage effect
            let textContent = fatherNode.children[i].getElementsByClassName("text-879f3e")[0];
            textContent.className = "super-text-0281ca";
            textContent.setAttribute("style","font: bold 23px SimHei, 'Microsoft JhengHei', Arial, Helvetica, sans-serif; color: rgb(255, 255, 255); background: url('https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h2_8e5e64.png'); height: 44px;");
            //add tag tail includes fire icon or sign icon
            let afterpicTag = document.createElement("div");
            afterpicTag.setAttribute("class","afterpic-8a2e13");
            afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -1px;");// afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -43px;");
            textContent.appendChild(afterpicTag);
            //tail icon
            let superTailImg = document.createElement("img");
            superTailImg.className = "super-tail-bffa58";
            superTailImg.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h3_fd2e5b.png");
            fatherNode.children[i].appendChild(superTailImg);
        }
    }
}

function fansToSuperRocket() {
    let dom_userName = document.getElementsByClassName("Banner4gift-senderName");
    for (let i = 0; i < dom_userName.length; i++) {
        if (dom_userName[i].title == user_name) {
            let dom_gift = dom_userName[i].parentElement.parentElement;
            if (dom_gift.id == "ex_giftModified") {
                continue;
            }
            let giftName = dom_gift.getElementsByClassName("Banner4gift-objectName")[0].title;
            if (giftName == "粉丝荧光棒") {
                dom_gift.id = "ex_giftModified";
                dom_gift.className = "Banner4gift Banner4gift--size2";
                dom_gift.getElementsByClassName("Banner4gift-bg")[0].src = "https://gfs-op.douyucdn.cn/dygift/2019/03/15/6651f2de52dd359c7b553a77b9d00020.png"; // 修改横幅
                dom_gift.getElementsByClassName("Banner4gift-objectName")[0].title = "超级火箭";
                dom_gift.getElementsByClassName("Banner4gift-objectName")[0].innerText = "超级火箭";
                dom_gift.getElementsByClassName("Banner4gift-headerImg")[0].src = "https://gfs-op.douyucdn.cn/dygift/2018/11/27/3adbb0c17d9886c1440d55c9711f4c79.gif"; // 修改gif

                if (document.getElementsByClassName("ex_giftAnimation_exist").length > 0) {
                    continue;
                }
                animationNum++;

                let a = document.createElement("div");
                let idName = "ex_giftAnimation_" + String(animationNum);
                a.id = idName;
                a.className = "ex_giftAnimation_exist";
                let b = document.getElementsByClassName("ex_giftAnimation")[0];
                b.appendChild(a);

                let player = new SVGA.Player("#" + idName);
                let parser = new SVGA.Parser("#" + idName);
                parser.load('https://gfs-op.douyucdn.cn/dygift/2018/11/27/6c6349672e662750ad5c019b240d57f2.svga', (videoItem) => {
                    player.setVideoItem(videoItem);
                    player.startAnimation();
                    setTimeout(() => {
                        player = null;
                        parser = null;
                        document.getElementById(idName).remove();
                    }, 4000);
                });
                
            }
        }
    }
}


let redpackets_room_arr = [];
let redpacket_room_timer; // 时钟句柄
function initPkg_ExpandTool_RedPacket_Room() {
    ExpandTool_RedPacket_Room_insertDom();
    ExpandTool_RedPacket_Room_insertFunc();
    ExpandTool_RedPacket_Room_Set();
}


function ExpandTool_RedPacket_Room_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px;" id="extool__redpacekt_room_start" type="checkbox">自动抢礼物红包</label>';
    
    let a = document.createElement("div");
    a.className = "extool__redpacket_room";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);

}
function ExpandTool_RedPacket_Room_insertFunc() {
    document.getElementById("extool__redpacekt_room_start").addEventListener("click", function() {
        verifyFans("5189167", 6).then(r => {
            if (r == true) {
                let ischecked = document.getElementById("extool__redpacekt_room_start").checked;
                if (ischecked == true) {
                    // 开始自动抢红包
                    redpacket_room_timer = setInterval(() => {
                        getRoomRedPacketsList(rid);
                    }, 1100);
                } else{
                    // 停止自动抢红包
                    clearInterval(redpacket_room_timer);
                }
                saveData_RedPacket_Room();
            } else {
                document.getElementById("extool__redpacekt_room_start").checked = false;
                showMessage("本功能需拥有6级歆崽粉丝牌(5189167)才可使用", "error");
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
                let offset = redpackets_room_arr.indexOf(rpid);
                let startTime = ret.data.list[i].startTime;
                let to = Number(startTime) - Math.round(new Date().getTime()/1000);
                to = 1000 * to - 2000;
                if (offset == -1) {
                    redpackets_room_arr.push(ret.data.list[i].activityid);
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
            verifyFans("5189167", 6).then(r => {
                if (r == true) {
                    document.getElementById("extool__redpacekt_room_start").click();
                } else {
                    let data = {
                        isGetRedPacket: false
                    }
                    localStorage.setItem("ExSave_RedPacket_Room", JSON.stringify(data)); // 存储弹幕列表
                    showMessage("本功能需拥有6级歆崽粉丝牌(5189167)才可使用", "error");
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
var isGetTreasure = false;
function initPkg_ExpandTool_Treasure() {
    ExpandTool_Treasure_insertDom();
    ExpandTool_Treasure_insertFunc();
    ExpandTool_Treasure_Set();
}


function ExpandTool_Treasure_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px" id="extool__treasure_start" type="checkbox">自动抢宝箱</label>';
    html += '<label style="margin-left:10px;">延迟(抢得过快请调高)：</label><input id="extool__treasure_delay" type="text" style="width:50px;text-align:center;" value="3200" />ms'
    html += '<div><a href="http://www.ddocr.com/" target="_blank" style="color:blue" title="点击进入ddocr官网，将账号用户中心的接口秘钥填入右边然后开启功能即可">ddocr秘钥：</a><input id="extool__treasure_skey" type="text" style="width:200px;text-align:center;" placeholder="填写则会自动完成宝箱领取验证"></div>';
    
    let a = document.createElement("div");
    a.className = "extool__treasure";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);

}
function ExpandTool_Treasure_insertFunc() {
    document.getElementById("extool__treasure_start").addEventListener("click", function() {
        verifyFans("5189167", 9).then(r => { // 请尊重作者劳动成果，在此感谢
            if (r == true) {
                let ischecked = document.getElementById("extool__treasure_start").checked;
                if (ischecked == true) {
                    // 开始
                    isGetTreasure = true;
                    getTreasure_Existing();
                } else{
                    // 停止
                    isGetTreasure = false;
                }
                saveData_Treasure();
            } else {
                document.getElementById("extool__treasure_start").checked = false;
                showMessage("本功能需拥有9级歆崽粉丝牌(5189167)才可使用", "error");
            }
        })
	});

}


function saveData_Treasure() {
    isGetTreasure = document.getElementById("extool__treasure_start").checked;
    let delay = document.getElementById("extool__treasure_delay").value;
    let skey = document.getElementById("extool__treasure_skey").value;
	let data = {
        isGetTreasure: isGetTreasure,
        treasureDelay: delay,
        skey: skey,
	}
	localStorage.setItem("ExSave_Treasure", JSON.stringify(data)); // 存储弹幕列表
}

function ExpandTool_Treasure_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Treasure");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("treasureDelay" in retJson == true) {
            document.getElementById("extool__treasure_delay").value = retJson.treasureDelay;
        } else {
            document.getElementById("extool__treasure_delay").value = "3200";
        }
        if ("skey" in retJson == true) {
            document.getElementById("extool__treasure_skey").value = retJson.skey;
        }
        if (retJson.isGetTreasure == true) {
            verifyFans("5189167", 9).then(r => {
                if (r == true) {
                    document.getElementById("extool__treasure_start").click();
                } else {
                    let data = {
                        isGetTreasure: false
                    }
                    localStorage.setItem("ExSave_Treasure", JSON.stringify(data)); // 存储弹幕列表
                    showMessage("本功能需拥有9级歆崽粉丝牌(5189167)才可使用", "error");
                }
            })
        }
	}
}


function getTreasureDelay() {
    let ret = document.getElementById("extool__treasure_delay").value;
    return Number(ret);
}

function getTreasureSkey() {
    let ret = document.getElementById("extool__treasure_skey").value;
    return ret;
}

function getTreasure_Existing() {
    getTslist(data => {
        if (data == null) {
            return;
        }
        let list = String(data.list).split("@S/");
        for (let i = 0; i < list.length - 1; i++) {
            let rpid = getStrMiddle(list[i], "rpid@A=", "@");
            let ot = getStrMiddle(list[i], "Sot@A=", "@");
            let did = getCookieValue("dy_did");
            let timeout = Number(ot) - Math.floor(Date.now()/1000);

            let a = document.createElement("div");
            let idName = "Ex_Geetest_no" + String(treasureNum);
            a.id = idName;
            let b = document.getElementById("Ex_Geetest");
            b.appendChild(a);

            if (timeout >= 0) {
                timeout = timeout * 1000 + getTreasureDelay();
                treasureNum++;
                setTimeout(() => {
                    getTreasure(rid, rpid, did, idName);
                }, timeout);
            } else {
                getTreasure(rid, rpid, did, idName);
            }
        }
    });
}

function getTslist(callback) {
    unsafeWindow.socketProxy.socketStream.subscribe('tslist', callback);
}

function initPkg_ExPanel() {
	initPkg_ExPanel_insertDom();
}
function initPkg_ExPanel_insertDom() {
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
		let sendNum = prompt("每个直播间赠送几根荧光棒？", "1");
		if (sendNum == null) {
			return;
		}
		if (sendNum == "") {
			return;
		}
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
				await sleep(250).then(() => {
					sendGift_bag(268, Number(sendNum), rid).then(data => {
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

function initPkg_FirePower() {
	initPkg_FirePower_Dom();
	initPkg_FirePower_Func();
}

function initPkg_FirePower_Dom() {
	FirePower_insertIcon();
}
function FirePower_insertIcon() {
	let a = document.createElement("div");
	a.className = "firepower";
	a.innerHTML = '<a class="ex-panel__icon" title="跳转随机火力全开房间"><svg style="display:block;" t="1584277091105" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2603" width="32" height="32"><path d="M893.3888 499.89632C841.82016 381.67552 788.48 317.55264 769.3824 266.33216c-20.28544-54.43584-0.27648-100.82304-0.27648-100.82304-42.33216-8.448-73.79968 31.87712-97.57696 72.77568-14.71488 25.31328-33.90464 178.71872-63.95904 216.3712-5.12 6.41024-15.28832 4.84352-18.13504-2.84672C486.7072 175.16544 541.75744 27.09504 541.75744 27.09504 380.22144 87.9104 340.0192 245.26848 332.34944 269.6192c-14.83776 47.0528-8.56064 225.98656-8.56064 225.98656-0.64512 12.2368-17.3056 15.38048-22.39488 4.22912 0 0-42.56768-104.69376-47.53408-162.14016-4.05504-47.02208-4.39296-37.23264-4.39296-37.23264-73.17504 67.50208-154.4192 220.3648-154.4192 323.04128 0 206.2336 182.36416 373.41184 407.32672 373.41184 224.94208 0 407.31648-167.17824 407.31648-373.41184 0-43.99104 0-86.26176-16.30208-123.60704zM759.82848 854.36416c-68.57728 62.8736-160.01024 97.4848-257.45408 97.4848-97.45408 0-188.88704-34.6112-257.46432-97.4848-67.51232-61.9008-104.704-143.88224-104.704-230.84032 0-40.47872 16.44544-96.90112 45.1072-154.76736a608.512 608.512 0 0 1 36.16768-63.2832c14.10048 51.72224 34.82624 103.39328 38.05184 111.29856l0.34816 0.86016 0.38912 0.83968a56.20736 56.20736 0 0 0 51.68128 33.29024c30.34112 0 55.3472-23.63392 56.92416-53.82144l0.1024-1.9456-0.06144-1.95584c-2.93888-84.1728-1.31072-186.08128 6.5024-210.8928 0.41984-1.31072 0.91136-2.94912 1.49504-4.90496 4.61824-15.36 16.88576-56.14592 44.78976-98.65216 17.38752-26.48064 37.76512-49.11104 60.96896-67.71712a629.0432 629.0432 0 0 0-0.75776 23.25504c-1.29024 100.57728 20.62336 212.39808 65.14688 332.34944a55.87968 55.87968 0 0 0 52.23424 36.2496 55.5008 55.5008 0 0 0 43.59168-20.97152c23.02976-28.85632 36.48512-84.6848 52.95104-160.4096 4.97664-22.784 11.71456-53.82144 15.27808-62.28992 2.21184-3.80928 4.48512-7.5776 6.8608-11.29472a189.3376 189.3376 0 0 0 9.0624 33.28c9.80992 26.25536 25.43616 52.34688 45.2096 85.4016 23.11168 38.5536 51.84512 86.53824 79.72864 150.4256 12.55424 28.75392 12.55424 64.37888 12.55424 105.64608 0 86.96832-37.1712 168.94976-104.704 230.85056z m0 0" fill="#CE3D3A" p-id="2604"></path><path d="M492.89216 81.664s-170.7008 90.10176-147.56864 380.88704c-11.5712 62.208-60.75392 66.54976-60.75392 66.54976l-53.52448-144.67072S3.91168 631.808 194.8672 830.01344c125.87008 104.15104 234.36288 206.87872 522.26048 82.46272 73.7792-57.86624 202.52672-172.56448 157.696-400.20992-63.67232-111.91296-143.24736-295.64928-143.24736-295.64928L680.96 274.4832l-28.93824 138.88512-49.01888 83.82464L526.17216 382.976l-33.28-301.312z" fill="#CE3D3A" p-id="2605"></path></svg><i id="firepower__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_FirePower_Func() {
	document.getElementsByClassName("firepower")[0].addEventListener("click", function() {
		fetch('https://www.douyu.com/japi/firepower/apinc/activeTask/getRecRid', {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: "token=" + getCCN()
        }).then(result => {
            return result.json();
        }).then(ret => {
            let rid = ret.data;
            window.location.href = "https://www.douyu.com/" + rid;
        }).catch(err => {
            console.log("请求失败!", err);
        })
	});
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
	initPkg_FishPond_RoomSign_Timer();
}
function initPkg_FishPond_Func() {
	document.getElementsByClassName("fish-pond")[0].addEventListener("click", function() {
		// 这里挂载每个子模块的函数入口
		// 入口即为调用
		// 调用的是每个子模块的领取接口
		initPkg_FishPond_Bubble();
		initPkg_FishPond_Box();
		initPkg_FishPond_Task();
		initPkg_FishPond_RoomSign();
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



let bubbleList = [];

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
		for (let i = 0; i < ret.data.prizeList.length; i++) {
			result = result + ret.data.prizeList[i].num + "个" + ret.data.prizeList[i].name + ",";
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



let roomSignList = [];
function initPkg_FishPond_RoomSign() {
	getFishPond_RoomSign();
}

function initPkg_FishPond_RoomSign_Timer() {
	getFishPond_RoomSignList();
}

function getFishPond_RoomSign() {
	// 清空roomSignList内的气泡
	if (roomSignList.length == 0) {
		showMessage("【签到宝箱】暂无可领取的鱼粮", "info");
		return;
	}
    let arr = roomSignList.concat();
	for (let i = 0; i < arr.length; i++) {
		fetch('https://www.douyu.com/japi/roomuserlevel/apinc/getPrize',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'rid=' + rid + '&ctn=' + getCCN()
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.error == "0") {
                showMessage("【签到宝箱】领取结果:" + ret.msg, "success");
            }
        }).catch(err => {
            console.log("请求失败!", err);
        })
	}
	FishPond_showTip(false);
	roomSignList.length = 0;
}

function getFishPond_RoomSignList() {
    fetch('https://www.douyu.com/japi/roomuserlevel/apinc/levelInfo?rid=' + rid + '&clientType=0',{
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(ret => {
        if (ret.error == "0" ) {
            if (ret.data.treasure.status == "1") {
                FishPond_showTip(true);
                roomSignList.push("1");
            }
        }
	}).catch(err => {
		console.log("请求失败!", err);
	})
}



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
			// console.log("【鱼塘任务】领取结果:", ret);
			showMessage("【鱼塘任务】领取结果:" + ret.data.msg, "success");
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

// function getFishPond_TaskList_Client() {
// 	console.log("哦嚯嚯",dyToken);
// 	GM_xmlhttpRequest({
// 		method: "POST",
// 		url: "https://pcapi.douyucdn.cn/japi/tasksys/ytxb/userStatusV2",
// 		data: "cycleType=26&roomId=" + rid + "&tagId=1&token=" + dyToken,
// 		responseType: "json",
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded'
// 		},
// 		onload: function(response) {
// 			let ret = response.response;
// 			console.log("哈哈哈哈：",ret);
// 			for (let i = 0; i < ret.data.list.length; i++) {
// 				if (ret.data.list[i].status == "2") {
// 					FishPond_showTip(true);
// 					taskList.push(ret.data.list[i].id);
// 				}
// 			}
// 		}
// 	});
// }
let isGiftOn = false;
let giftWordList = {};
function initPkg_LiveTool_Gift() {
    LiveTool_Gift_insertDom();
    LiveTool_Gift_insertFunc();
    initPkg_Gift_Set();
}

function LiveTool_Gift_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='gift__title'>自动谢礼物</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="gift__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="gift__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='gift__panel'>
            <select id='gift__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="gift__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="gift__del" value="删除"/>
            <div class="gift__option">
                <label><a id="reply__show_gid" style="color:blue;" href="javascript:void(0);">礼物id：</a><input id="gift__giftId" type="text"/></label>
                <label>回复：<input id="gift__reply" type="text" placeholder="<id>=用户名 <cnt>个数"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Gift_insertFunc() {
    document.getElementById("reply__show_gid").addEventListener("click", () => {
        console.log(`
20005|超级火箭
20760|风暴超火
20761|风暴火箭
20004|火箭
20003|飞机
20624|魔法球
20002|办卡
20010|MVP
20727|乖乖戴口罩
20541|大气
20000|100鱼丸
20644|能量戒指
20642|能量电池
20643|能量水晶
20008|超大丸星
20728|勤洗手
20417|福袋
20542|666
20009|天秀
20001|弱鸡
20006|赞
20709|壁咚
1859|小飞碟
20626|幸福券
824|粉丝荧光棒
20624|魔法彩蛋
20621|魔法之翼
20599|星空飞机
20615|花海摩天轮
20600|星空火箭
20614|踏青卡丁车
20618|魔法指环
20616|春意丘比特
20613|永恒钻戒
20617|爱的旅行
520|稳
193|弱鸡
192|赞
712|棒棒哒
519|呵呵
20461|车队加油卡
20596|小星星
20759|集结号角
20597|星球
20611|浪漫花束
713|辣眼睛
20620|魔法皇冠
20832|奥利给
20640|礼物红包办卡
20523|礼物红包飞机
20710|金鲨鱼
20842|时空战机
20598|星空卡
20664|666
20841|星际飞车
1889|火箭
20914|开黑券
20932|爆裂飞机
20931|战地越野车
20933|有牌面
20934|机械火箭
20935|欧皇的祝福
20936|一起开黑
`);
        console.log("或访问：", "http://open.douyucdn.cn/api/RoomApi/room/" + rid , "\n或者https://webconf.douyucdn.cn/resource/common/gift/flash/gift_effect.json", "进行查看");
        showMessage("请按F12到控制台(console)查看礼物id", "success");
    });
    document.getElementById("gift__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("gift__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isGiftOn = true;
		} else{
            // 关闭关键词禁言
            isGiftOn = false;
        }
        saveData_isGift();

    });
    document.getElementById("gift__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("gift__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
				document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("gift__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let giftId = this.options[this.selectedIndex].text;
        let reply = giftWordList[giftId].reply;
        document.getElementById("gift__giftId").value = giftId;
        document.getElementById("gift__reply").value = reply;
    };

    document.getElementById("gift__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("gift__select");
        let giftId = document.getElementById("gift__giftId").value;
        let reply = document.getElementById("gift__reply").value;

        if (giftId == "") {
            return;
        }
        // 构造json并添加json
        giftWordList[giftId] = {
            reply: reply,
        }

        // 添加到select中去
        select_wordList.options.add(new Option(giftId, ""));

        saveData_Gift();
    });

    document.getElementById("gift__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("gift__select");
        let giftId = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete giftWordList[giftId];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveData_Gift();
    });

}


function saveData_Gift() {
	let data = giftWordList;
	localStorage.setItem("ExSave_Gift", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isGift() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isGift");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isGiftOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
    
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isGift", JSON.stringify(data)); // 存储弹幕列表
}

function initPkg_Gift_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Gift");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        giftWordList = retJson;
        let select_wordList = document.getElementById("gift__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
    
    ret = localStorage.getItem("ExSave_isGift");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isGiftOn = false;
        } else {
            isGiftOn = true;
        }
        document.getElementById("gift__switch").checked = isGiftOn;
	} else {
        isGiftOn = false;
        document.getElementById("gift__switch").checked = isGiftOn;
    }
}

function initPkg_LiveTool_Gift_Handle(text) {
    if (isGiftOn == false) {
        return;
    }
    if (getType(text) == "dgb") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let gfid = getStrMiddle(text, "gfid@=", "/");
        let gfcnt = getStrMiddle(text, "gfcnt@=", "/");
        for (let key in giftWordList) {
            if (gfid == key) {
                let reply = giftWordList[key].reply;
                reply = String(reply).replace(/<id>/g, nn);
                reply = String(reply).replace(/<cnt>/g, gfcnt);
                sendBarrage(reply);
                break;
            }
        }
    }
    
}

let timer_closing;
let closingNum = 0;
function initPkg_LiveTool_LiveNotice() {
}

function initPkg_LiveTool_LiveNotice_Handle(text) {
    if (getType(text) == "rss") {
        let rid = getStrMiddle(text, "rid@=", "/");
        let ss = getStrMiddle(text, "ss@=", "/");
        if (ss == "1") {
            showMessageWindow("开播提醒", "直播间：" + rid + "开播了，点我签到", () => {
                signRoom(rid);
            });
        } else {
            clearInterval(timer_closing);
            timer_closing = setInterval(() => {
                if (closingNum > 20) {
                    clearInterval(timer_closing);
                    closingNum = 0;
                }
                let x = document.getElementsByClassName("dy-ModalRadius-close-x");
                if (x.length > 0) {
                    clearInterval(timer_closing);
                    x[0].click();
                }
                closingNum++;
            }, 500);
        }
    }
}

function getRoomAvatar() {
    fetch('https://www.douyu.com/betard/' + rid,{
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include'
    }).then(res => {
        return res.json();
    }).then(ret => {
        roomAvatar = ret.room.avatar.middle;
    }).catch(err => {
        console.log("请求失败!", err);
    })
}
function initPkg_LiveTool() {
    initPkg_LiveTool_Dom();
    initPkg_LiveTool_Module();
    initPkg_LiveTool_Func();
    initPkg_LiveTool_HandleFunc();
}

function initPkg_LiveTool_Dom() {
    LiveTool_insertModal();
    LiveTool_insertIcon();
}

function initPkg_LiveTool_Module() {
	// 添加模块
	initPkg_LiveTool_Mute();
	initPkg_LiveTool_Gift();
	initPkg_LiveTool_Reply();
	initPkg_LiveTool_Treasure();

	// initPkg_LiveTool_Bojiang_Handle();
}
function LiveTool_insertModal() {
	let a = document.createElement("div");
	a.className = "livetool";
	
	let b = document.getElementsByClassName("layout-Player-chat")[0];
	b.insertBefore(a, b.childNodes[0]);
}
function LiveTool_insertIcon() {
	let a = document.createElement("div");
	a.className = "livetool-icon";
	a.innerHTML = '<a class="ex-panel__icon" title="直播间工具"><svg t="1590294900594" style="display:block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20028" width="36" height="36"><path d="M352.2 245.3c-5.1 0-10.2-2-14.1-5.9L196.6 98c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l141.4 141.4c7.8 7.8 7.8 20.5 0 28.3-3.9 3.9-9 5.9-14.1 5.9zM477.1 245.3c-5.1 0-10.2-2-14.1-5.9-7.8-7.8-7.8-20.5 0-28.3L604.3 69.7c7.8-7.8 20.5-7.8 28.3 0 7.8 7.8 7.8 20.5 0 28.3L491.2 239.4c-3.9 3.9-9 5.9-14.1 5.9z" fill="#0C2B4A" p-id="20029"></path><path d="M703.9 194.8H124.2c-33 0-60 27-60 60v453c0 33 27 60 60 60h418c1.7-122.5 99.6-221.8 221.7-225.5V254.8c0-33-27-60-60-60zM533.4 522.9L356.3 625.2c-24 13.9-54-3.5-54-31.2V389.5c0-27.7 30-45 54-31.2l177.1 102.2c24 13.9 24 48.6 0 62.4zM815.2 776.4c0 21.9-17.8 39.7-39.7 39.7-21.9 0-39.7-17.8-39.7-39.7 0-21.9 17.8-39.7 39.7-39.7 21.9 0 39.7 17.8 39.7 39.7z" fill="#0C2B4A" p-id="20030"></path><path d="M775.5 591C673.6 591 591 673.6 591 775.5S673.6 960 775.5 960 960 877.4 960 775.5 877.4 591 775.5 591zM879 819l-15.6 27c-2.1 3.6-6.8 4.9-10.4 2.8l-15.5-8.9c-2.7-1.6-6.1-1.3-8.5 0.6-7.5 5.9-15.9 10.6-25.1 13.8-3 1.1-5.1 4-5.1 7.2v18.7c0 4.2-3.4 7.6-7.6 7.6H760c-4.2 0-7.6-3.4-7.6-7.6v-18.5c0-3.3-2.1-6.2-5.1-7.2-9.3-3.2-17.9-7.8-25.5-13.7-2.4-1.9-5.8-2.2-8.5-0.6l-15.2 8.8c-3.6 2.1-8.3 0.9-10.4-2.8l-15.6-27c-2.1-3.6-0.8-8.3 2.8-10.4l12.2-7.1c3-1.7 4.5-5.2 3.7-8.5-1.7-6.8-2.6-13.8-2.6-21.1 0-4.1 0.3-8.2 0.9-12.2 0.4-3.1-1-6.1-3.7-7.7l-10.5-6.1c-3.6-2.1-4.9-6.8-2.8-10.4l15.6-27c2.1-3.6 6.8-4.9 10.4-2.8l7.8 4.5c2.9 1.7 6.6 1.3 9-1.1 9.1-8.7 20-15.5 32.2-19.7 3.1-1 5.1-4 5.1-7.2v-7.9c0-4.2 3.4-7.6 7.6-7.6H791c4.2 0 7.6 3.4 7.6 7.6v8.1c0 3.2 2 6.1 5.1 7.2 12.1 4.2 22.9 10.9 31.9 19.6 2.4 2.4 6.1 2.8 9.1 1.1l8.2-4.7c3.6-2.1 8.3-0.8 10.4 2.8l15.6 27c2.1 3.6 0.9 8.3-2.8 10.4l-11 6.3c-2.7 1.6-4.1 4.6-3.7 7.7 0.6 3.9 0.8 8 0.8 12.1 0 7.2-0.9 14.1-2.5 20.8-0.8 3.3 0.7 6.7 3.6 8.3l12.8 7.4c3.7 2.1 5 6.8 2.9 10.4z" fill="#0C2B4A" p-id="20031"></path></svg><i id="LiveTool__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_LiveTool_Func() {
	document.getElementsByClassName("livetool-icon")[0].addEventListener("click", function() {
        let a = document.getElementsByClassName("livetool")[0];
		if (a.style.display != "block") {
			a.style.display = "block";
			if (document.getElementsByClassName("bloop")[0].style.display == "block") {
				document.getElementsByClassName("bloop")[0].style.display = "none";
            }
            if (document.getElementsByClassName("extool")[0].style.display == "block") {
				document.getElementsByClassName("extool")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
	});
}

function initPkg_LiveTool_HandleFunc() {
    // 开启ws，并且设置处理函数的入口
    // 是否生效由每个处理函数决定，可以设置一个变量保存开启状态，判断是否要执行
    let ws = new Ex_WebSocket_UnLogin(rid, (ret) => {
        initPkg_LiveTool_LiveNotice_Handle(ret); // 开播提醒
		initPkg_LiveTool_Mute_Handle(ret); // 关键词禁言
		initPkg_LiveTool_Reply_Handle(ret); // 关键词回复
		initPkg_LiveTool_Gift_Handle(ret); // 自动谢礼物
		initPkg_LiveTool_Treasure_Handle(ret);
		// initPkg_LiveTool_Friend_Handle(ret);
    });
}

function getType(str) {
    return getStrMiddle(str, "type@=", "/");
}

function selectOptionByValue(selectId, checkValue) {
	// 根据value值选择option 
    let select = document.getElementById(selectId);  
    for(let i=0; i<select.options.length; i++){  
        if(select.options[i].value == checkValue){  
            select.options[i].selected = true;  
            break;
        }  
    }  
}
let isMuteOn = false;
// let canMute;
let muteWordList = {};
let muteIdList = {};
let muteIdListShow = [];
function initPkg_LiveTool_Mute() {
    if (rid == "5189167") {
        return;
    }
    LiveTool_Mute_insertDom();
    LiveTool_Mute_insertFunc();
    initPkg_Mute_Set();
}

function LiveTool_Mute_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='mute__title'>关键词禁言</span><span id='mute__idlist'>名单</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="mute__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="mute__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='mute__panel'>
            <select id='mute__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="mute__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="mute__del" value="删除"/>
            <input style="width:65px;margin-left:10px;" type="button" id="mute__delmute" value="一键解禁"/>
            <div class="mute__option">
                <label>词：<input id="mute__word" type="text" placeholder="re(式)=结果"/></label>
                <label>次数：<input id="mute__count" type="number" value="5"/></label>
                <label>时间：
                    <select id='mute__time'>
                        <option value="1">1分钟</option>
                        <option value="10">10分钟</option>
                        <option value="30">30分钟</option>
                        <option value="60">1小时</option>
                        <option value="480">8小时</option>
                        <option value="1440">1天</option>
                        <option value="4320">3天</option>
                        <option value="10080">7天</option>
                        <option value="43200">30天</option>
                        <option value="259200">180天</option>
                        <option value="518400">360天</option>
                    </select>
                </label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Mute_insertFunc() {
    document.getElementById("mute__idlist").addEventListener("click", () => {
        if (muteIdListShow.length == 0) {
            showMessage("暂无禁言名单", "warning");
            return;
        }
        console.log("【禁言名单】");
        for (let i = 0; i < muteIdListShow.length; i++) {
            let item = muteIdListShow[i];
                console.log("id:【" + item.id + "】 | uid:" + item.uid + " | 弹幕:" + item.barrage + " | 检测次数:" + item.count + " | 禁言时长:" + item.time + "分钟 | 禁言时间:" + item.ts);
        }
        showMessage("禁言名单已经输出在控制台，请按F12查看", "success");
    });

    document.getElementById("mute__delmute").addEventListener("click", async () => {
        if (muteIdListShow.length == 0) {
            showMessage("暂无禁言名单", "warning");
            return;
        }
        if (confirm("是否解禁名单上所有的id？") != true) {
            return;
        }
        for (let i = 0; i < muteIdListShow.length; i++) {
            let item = muteIdListShow[i];
            let tmp = await deleteMuteUser(rid, item.uid);
        }
        showMessage("解除禁言完毕", "success");
    });

    document.getElementById("mute__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("mute__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isMuteOn = true;
		} else{
            // 关闭关键词禁言
            isMuteOn = false;
        }
        saveData_isMute();

    });
    document.getElementById("mute__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("mute__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("mute__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let word = this.options[this.selectedIndex].text;
        let count = muteWordList[word].count;
        let time = muteWordList[word].time;
        document.getElementById("mute__word").value = word;
        document.getElementById("mute__count").value = count;
        selectOptionByValue("mute__time", time);
    };

    document.getElementById("mute__add").addEventListener("click", () => {
        let select_time = document.getElementById("mute__time");
        let select_wordList = document.getElementById("mute__select");
        let word = document.getElementById("mute__word").value;
        let count = document.getElementById("mute__count").value;
        let time = select_time.options[select_time.selectedIndex].value

        if (word == "") {
            return;
        }

        // 构造json并添加json
        muteWordList[word] = {
            count: count,
            time: time,
        }

        // 添加到select中去
        select_wordList.options.add(new Option(word, ""));

        saveData_Mute();
    });

    document.getElementById("mute__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("mute__select");
        let word = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete muteWordList[word];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveData_Mute();
    });

}

function saveData_Mute() {
	let data = muteWordList;
	localStorage.setItem("ExSave_Mute", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isMute() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isMute");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isMuteOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isMute", JSON.stringify(data)); // 存储弹幕列表
}

async function initPkg_Mute_Set() {
    // canMute = await getRoomAdminStatus();
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Mute");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        muteWordList = retJson;
        let select_wordList = document.getElementById("mute__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
    
    ret = localStorage.getItem("ExSave_isMute");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isMuteOn = false;
        } else {
            isMuteOn = true;
        }
        document.getElementById("mute__switch").checked = isMuteOn;
	} else {
        isMuteOn = false;
        document.getElementById("mute__switch").checked = isMuteOn;
    }
}

async function initPkg_LiveTool_Mute_Handle(text) {
    // if (canMute != true) {
    //     return;
    // }
    if (isMuteOn == false) {
        return;
    }
    if (rid == "5189167") {
        return;
    }
    if (getType(text) == "chatmsg") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let txt = getStrMiddle(text, "txt@=", "/");
        let isConform = false;
        for (let key in muteWordList) {
            if (key == "") {
                continue;
            }
            if (key.indexOf("re(") != -1) {
                // 正则
                let regStr = getStrMiddle(key, "re(", ")=");
                let strArr = key.split("=")
                if (strArr.length > 1) {
                    let str = strArr[1];
                    let regObj = new RegExp(regStr, "g");
                    let result = regObj.exec(txt);
                    if (result.length > 0) {
                        if (result[0] == str) {
                            isConform = true;
                        } else {
                            isConform = false;
                        }
                    }
                }
            } else {
                if (String(txt).indexOf(key) == -1) {
                    // 没找到
                    isConform = false;
                } else {
                    isConform = true;
                }
            }
            if (isConform == true) {
                let maxCount = muteWordList[key].count;
                let time = muteWordList[key].time;
                if (muteIdList.hasOwnProperty(nn)) {
                    let nextCount = Number(muteIdList[nn].count) + 1;
                    if (nextCount >= maxCount) {
                        let tmp = await addMuteUser(rid, nn, time);
                        showMessageWindow("禁言信息", "【" + nn + "】已被禁言" + time + "分钟" + "\n弹幕：" + txt, () => {});
                        let obj = {
                            id: nn,
                            uid: uid,
                            barrage: txt,
                            time: time,
                            count: 1,
                            ts: String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date()))
                        };
                        muteIdListShow.push(obj);
                        muteIdList[nn].count = 0;
                    } else {
                        muteIdList[nn].count = String(nextCount);
                    }
                } else {
                    let nextCount = 1;
                    if (nextCount >= maxCount) {
                        let tmp = await addMuteUser(rid, nn, time);
                        showMessageWindow("禁言信息", "【" + nn + "】已被禁言" + time + "分钟" + "\n弹幕：" + txt, () => {});
                        let obj = {
                            id: nn,
                            uid: uid,
                            barrage: txt,
                            time: time,
                            count: 1,
                            ts: String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date()))
                        };
                        muteIdListShow.push(obj);
                    } else {
                        muteIdList[nn] = {
                            uid: uid,
                            count: 1,
                        }
                    }
                }
                break;
            }
        }
    }
    
}

function addMuteUser(roomid, name, ban_time) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/room/roomSetting/addMuteUser", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'ban_nickname=' + name + '&room_id=' + roomid + '&ban_time=' + ban_time
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function deleteMuteUser(roomid, uid) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/room/roomSetting/deleteMuteUser", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'room_id=' + roomid + '&uid=' + uid
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function getRoomAdminStatus() {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/firepower/apinc/roomAdmin/getStatus?rid=' + rid,{
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include'
        }).then(res => {
            return res.json();
        }).then(ret => {
            let result = false;
            if (ret.error == "0") {
                if (ret.data.has == "1") {
                    result = true;
                } else {
                    result = false;
                }
            } else {
                result = false;
            }
            resolve(result);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    });
}
let isReplyOn = false;
let replyWordList = {};
function initPkg_LiveTool_Reply() {
    LiveTool_Reply_insertDom();
    LiveTool_Reply_insertFunc();
    initPkg_Reply_Set();
}

function LiveTool_Reply_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='reply__title'>关键词回复</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="reply__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="reply__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='reply__panel'>
            <select id='reply__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="reply__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="reply__del" value="删除"/>
            <div class="reply__option">
                <label>词：<input id="reply__word" type="text" placeholder="re(式)=结果"/></label>
                <label>回复：<input id="reply__reply" type="text" placeholder="<id>用户名 <txt>弹幕"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Reply_insertFunc() {
    document.getElementById("reply__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("reply__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isReplyOn = true;
		} else{
            // 关闭关键词禁言
            isReplyOn = false;
        }
        saveData_isReply();

    });
    document.getElementById("reply__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("reply__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
				document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("reply__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let word = this.options[this.selectedIndex].text;
        let reply = replyWordList[word].reply;
        document.getElementById("reply__word").value = word;
        document.getElementById("reply__reply").value = reply;
    };

    document.getElementById("reply__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("reply__select");
        let word = document.getElementById("reply__word").value;
        let reply = document.getElementById("reply__reply").value;

        if (word == "") {
            return;
        }
        // 构造json并添加json
        replyWordList[word] = {
            reply: reply,
        }

        // 添加到select中去
        select_wordList.options.add(new Option(word, ""));

        saveData_Reply();
    });

    document.getElementById("reply__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("reply__select");
        let word = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete replyWordList[word];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveData_Reply();
    });

}


function saveData_Reply() {
	let data = replyWordList;
	localStorage.setItem("ExSave_Reply", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isReply() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isReply");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isReplyOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isReply", JSON.stringify(data)); // 存储弹幕列表
}

function initPkg_Reply_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Reply");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        replyWordList = retJson;
        let select_wordList = document.getElementById("reply__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
    
    ret = localStorage.getItem("ExSave_isReply");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isReplyOn = false;
        } else {
            isReplyOn = true;
        }
        document.getElementById("reply__switch").checked = isReplyOn;
	} else {
        isReplyOn = false;
        document.getElementById("reply__switch").checked = isReplyOn;
    }
}

function initPkg_LiveTool_Reply_Handle(text) {
    if (isReplyOn == false) {
        return;
    }
    if (getType(text) == "chatmsg") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let txt = getStrMiddle(text, "txt@=", "/");
        let isConform = false;
        for (let key in replyWordList) {
            if (key == "") {
                continue;
            }
            if (key.indexOf("re(") != -1) {
                // 正则
                let regStr = getStrMiddle(key, "re(", ")=");
                let strArr = key.split("=")
                if (strArr.length > 1) {
                    let str = strArr[1];
                    let regObj = new RegExp(regStr, "g");
                    let result = regObj.exec(txt);
                    if (result.length > 0) {
                        if (result[0] == str) {
                            isConform = true;
                        } else {
                            isConform = false;
                        }
                    }
                }
            } else {
                if (String(txt).indexOf(key) != -1) {
                    isConform = true;
                } else {
                    isConform = false
                }
            }
            if (isConform == true) {
                let reply = replyWordList[key].reply;
                reply = String(reply).replace(/<id>/g, nn);
                reply = String(reply).replace(/<txt>/g, txt);
                sendBarrage(reply);
                break;
            }
        }
    }
    
}


var treasureNum = 0;
function initPkg_LiveTool_Treasure() {
    LiveTool_Treasure_insertModal();
}

function LiveTool_Treasure_insertModal() {
	let a = document.createElement("div");
	a.className = "livetool__Treasure";
	a.id = "Ex_Geetest";
	let b = document.getElementsByClassName("Barrage-main")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_LiveTool_Treasure_Handle(text) {
    if (isGetTreasure == false) {
        return;
    }
    if (getType(text) == "tsboxb") {
        let ot = getStrMiddle(text, "ot@=", "/");
        let rpid = getStrMiddle(text, "rpid@=", "/");
        let rid = getStrMiddle(text, "rid@=", "/");
        let did = getCookieValue("dy_did");
        let timeout = Number(ot) - Math.floor(Date.now()/1000);
        timeout = timeout * 1000 + getTreasureDelay();
        treasureNum++;

        let a = document.createElement("div");
        let idName = "Ex_Geetest_no" + String(treasureNum);
        a.id = idName;
        let b = document.getElementById("Ex_Geetest");
        b.appendChild(a);

        setTimeout(() => {
            getTreasure(rid, rpid, did, idName);
        }, timeout);
    }
}

function getTreasure(roomid, rpid, deviceid, idName) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://pcapi.douyucdn.cn/h5nc/member/getRedPacket?token=" + dyToken,
        data: "room_id=" + roomid + "&package_room_id=" + roomid + "&device_id=" + deviceid + "&packerid=" + rpid + "&version=1",
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
            let ret = response.response;
            if (ret.data.code == "-1" && ret.data.validate != "0") {
                let v = JSON.parse(ret.data.geetest.validate_str);
                let success = v.success;
                let challenge = v.challenge;
                let gt = v.gt;

                let skey = getTreasureSkey();
                if (skey != "") {
                    let url = window.location.href;
                    getTreasure_Auto(skey, gt, challenge, url, deviceid, rpid, roomid);
                    return;
                }
                

                let handler = (e) => {
                    showMessageWindow(rid, "【宝箱】请手动验证领取宝箱", () => {
                        window.focus();
                    });
                    let idDiv = document.getElementById(idName);
                    e.appendTo("#" + idName);
                    e.onSuccess(() => {
                        let result = e.getValidate();
                        let geetest_challenge = result.geetest_challenge;
                        let geetest_seccode = result.geetest_seccode;
                        let geetest_validate = result.geetest_validate;
                        let data = "room_id=" + roomid + "&package_room_id=" + roomid + "&device_id=" + deviceid + "&packerid=" + rpid + "&version=1";
                        data = data + "&geetest_challenge=" + geetest_challenge + "&geetest_validate=" + geetest_validate + "&geetest_seccode=" + encodeURIComponent(geetest_seccode);
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: "https://pcapi.douyucdn.cn/h5nc/member/getRedPacket?token=" + dyToken,
                            data: data,
                            responseType: "json",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            onload: function(response) {
                                let ret = response.response;
                                let msg = "";
                                if (ret.data.prop_id == "") {
                                    msg = "鱼丸x" + ret.data.silver;
                                } else {
                                    msg = ret.data.prop_name + "x" + ret.data.prop_count;
                                }
                                if (msg != "") {
                                    showMessage("【宝箱】获得" + msg, "success");
                                }
                                if (idDiv != null) {
                                    idDiv.remove();
                                }
                            }
                        });
                    });
                };
                if (unsafeWindow.initGeetest != undefined) {
                    unsafeWindow.initGeetest({
                        gt: gt,
                        challenge: challenge,
                        offline: !success,
                        product: "float",
                    }, handler);
                } else {
                    showMessage("自动抢宝箱初始化失败", "error");
                }
            } else if(ret.data.msg != "领取失败" && ret.data.msg != "验证码不正确") {
                let msg = "";
                if (ret.data.prop_id == "") {
                    msg = "鱼丸x" + ret.data.silver;
                } else {
                    msg = ret.data.prop_name + "x" + ret.data.prop_count;
                }
                if (msg != "") {
                    showMessage("【宝箱】获得" + msg, "success");
                }
            } else {
                showMessage("【宝箱】领取失败", "error");
            }
        }
    });
}


function getTreasure_Verify(challenge, validate, seccode, divId) {
    let data = "room_id=" + roomid + "&package_room_id=" + roomid + "&device_id=" + deviceid + "&packerid=" + rpid + "&version=1";
    data += "&geetest_challenge=" + challenge + "&geetest_validate=" + validate + "&geetest_seccode=" + encodeURIComponent(seccode);
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://pcapi.douyucdn.cn/h5nc/member/getRedPacket?token=" + dyToken,
        data: data,
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
            let ret = response.response;
            if (document.getElementById(divId) != null) {
                document.getElementById(divId).remove();
            }
        }
    });
}

function getTreasure_Auto(skey, gt, challenge, referer, deviceid, rpid, roomid) {
    let wtype = "geetest";
    let data = "wtype=" + wtype + "&secretkey=" + skey + "&gt=" + gt + "&referer=" + referer + "&challenge=" + challenge + "&supporttype=3";
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://api.ddocr.com/api/gateway.jsonp",
        data: data,
        timeout: 60000,
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
            let ret = response.response;
            if (ret.status == "-1") {
                showMessage("【宝箱】自动识别失败", "error");
                return;
            }
            
            let data = "room_id=" + roomid + "&package_room_id=" + roomid + "&device_id=" + deviceid + "&packerid=" + rpid + "&version=1";
            data = data + "&geetest_challenge=" + ret.data.challenge + "&geetest_validate=" + ret.data.validate + "&geetest_seccode=" + ret.data.validate + "%7Cjordan";
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://pcapi.douyucdn.cn/h5nc/member/getRedPacket?token=" + dyToken,
                data: data,
                responseType: "json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                onload: function(response) {
                    let ret = response.response;
                    if (ret.data.code == "-1") {
                        showMessage("【宝箱】验证码不正确", "error")
                        return;
                    }
                    let msg = "";
                    if (ret.data.prop_id == "") {
                        msg = "鱼丸x" + ret.data.silver;
                    } else {
                        msg = ret.data.prop_name + "x" + ret.data.prop_count;
                    }
                    if (msg != "") {
                        showMessage("【宝箱】获得" + msg, "success");
                    }
                }
            });
        }
    });
}
let svg_night  = '<svg t="1587640254282" class="icon" viewBox="0 0 1055 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5670" width="26" height="26"><path d="M388.06497 594.013091c-96.566303-167.253333-39.067152-381.889939 128.217212-478.487273a348.656485 348.656485 0 0 1 256.248242-36.864C623.491879-5.306182 435.417212-11.170909 276.542061 80.616727 37.236364 218.763636-44.776727 524.815515 93.401212 764.152242c138.146909 239.305697 444.198788 321.318788 683.535515 183.140849 158.875152-91.725576 247.870061-257.520485 249.669818-428.559515a348.656485 348.656485 0 0 1-160.085333 203.496727c-167.253333 96.566303-381.889939 39.036121-478.487273-128.217212" p-id="5671" fill="#8a8a8a"></path></svg>';
let svg_day = '<svg t="1587640423416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2270" width="26" height="26"><path d="M270.016 197.248l-83.84-84.544-69.76 70.464 83.776 84.544 69.76-70.4zM139.648 465.024H0v93.888h139.648V465.024zM558.528 0H465.472v136.192h93.056V0z m349.056 183.168l-69.76-70.464-83.84 84.544L819.2 263.04l88.384-79.872z m-153.6 643.584l83.84 84.48 65.28-65.728L819.2 760.96l-65.216 65.792z m130.368-267.84H1024V465.024h-139.648v93.888zM512.064 230.08C358.4 230.08 232.768 356.992 232.768 512c0 155.008 125.632 281.856 279.296 281.856 153.6 0 279.232-126.848 279.232-281.856 0-154.944-125.632-281.856-279.232-281.856zM465.472 1024h93.056v-136.256H465.472V1024z m-349.056-183.232l69.76 70.4 83.84-84.48L204.8 760.96 116.48 840.768z" p-id="2271" fill="#8a8a8a"></path></svg>';
let currentMode = 0; // 0日间模式 1夜间模式
function initPkg_Night() {
	initPkg_Night_Dom();
    initPkg_Night_Func();
    initPkg_Night_Set();
}

function initPkg_Night_Dom() {
	Night_insertIcon();
}
function Night_insertIcon() {
    let a = document.createElement("div");
    a.style = "position: absolute;right: -75px;top: 18px;cursor: pointer;"
    a.id = "ex-night";
    a.innerHTML = svg_day;
    a.title = "切换夜间模式";
	let b = document.getElementsByClassName("Header-right")[0];
	b.appendChild(a);
}
function saveData_Mode() {
	// 0日间模式 1夜间模式
	let data = {
		mode: currentMode
	}
	localStorage.setItem("ExSave_Mode", JSON.stringify(data));
}
function initPkg_Night_Set_Fast() {
    let ret = localStorage.getItem("ExSave_Mode");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("mode" in retJson == false) {
            retJson.mode = 0;
        }
        if (retJson.mode == 1) {
            setNightMode();
        }
    }
}

function initPkg_Night_Set() {
    let ret = localStorage.getItem("ExSave_Mode");
    let a = document.getElementById("ex-night");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        
        if ("mode" in retJson == false) {
            retJson.mode = 0;
        }
        if (retJson.mode == 1) {
            currentMode = 1;
            a.innerHTML = svg_night;
            a.title = "切换日间模式";
            // setNightMode();
        }
    }
}

function initPkg_Night_Func() {
	document.getElementById("ex-night").addEventListener("click", function() {
        let a = document.getElementById("ex-night");
        if (currentMode == 0) {
            currentMode = 1;
            a.innerHTML = svg_night;
            a.title = "切换日间模式";
            setNightMode();
        } else {
            currentMode = 0;
            a.innerHTML = svg_day;
            a.title = "切换夜间模式";
            cancelNightMode();
        }
        saveData_Mode();
    });
}

function setNightMode() {
    let cssText = `
    .layout-Player-barrage,.Barrage--paddedBarrage,.Barrage-firstCharge,.Barrage-notice--replyBarrage{background-color:rgba(37,38,42,1) !important;}
    .Barrage-userEnter{background-color:rgba(37,38,42,1) !important;color:rgba(187,187,187,1) !important;}
    /*.Barrage-content,.Barrage-text{color:rgba(187,187,187,1) !important;}*/
    .Barrage-content,.Barrage-text{color:rgba(187,187,187,1);}
    .Barrage-notice--noble{background-color:rgba(37,38,42,1) !important;border:rgba(37,38,42,1) solid 1px !important;}
    .layout-Player-title{background-color:rgba(35,36,39,1) !important;border:rgba(35,36,39,1) solid 1px !important;}
    .Title-header{color:rgba(191,191,191,1) !important;}
    .Title-anchorText{color:rgba(107,176,125,1) !important;}
    .Title-row-text,.Title-anchorName{color:rgba(153,153,153,1) !important;}
    #js-player-toolbar{background:rgb(37,38,42) !important;border:1px solid rgb(37,38,42) !important;}
    .PlayerToolbar-wealthNum,.Header-wrap .Header-menu-link>a,.public-DropMenu-link,.Header-icon{color:rgb(191,191,191) !important;}
    .layout-Main{background-color:rgba(35,36,39,1) !important;}
    .ChatRank-rankWraper{background:rgba(47,48,53,1) !important;border:rgba(47,48,53,1) solid 1px !important;}
    .bg-icon{display:none;}
    .ChatRankWeek-headerContent,.NobleRank,.NobleRankTips{background-color:rgba(47,48,53,1) !important;}
    #js-player-asideMain{border:1px solid rgba(37,38,42,1) !important;background-color:rgb(47,48,53) !important;}
    .Chat,.ChatSend-txt{background:rgba(47,48,53,1) !important;color:rgb(187,187,187) !important;border-radius:0px !important;}
    .ChatTabContainer-titleWraper--tabLi{background:rgb(29,32,35) !important;border:1px solid rgb(47,48,53) !important;}
    .ChatTabContainer-titleWraper--tabLi.is-active,.ChatBarrageCollect-tip,.FansRankInfo{background:rgb(47,48,53) !important;}
    .FansRankInfo-txt{color:rgb(121,127,137) !important;}
    .Barrage{border:1px solid rgba(35,36,39,1) !important;}
    .layout-Player-chat{border-top:1px solid rgba(47,48,53,1) !important;}
    .layout-Player-announce{background-color:rgb(29,32,35) !important;border:1px solid rgb(29,32,35) !important;}
    .FansRankBottom,.AnchorFriend-footer{border-top:1px solid rgb(121,127,137) !important;}
    .Title-official{background:rgb(35,36,39) !important;}
    .Header-wrap{background:rgb(45,46,54) !important;border-bottom:1px solid rgb(45,46,54) !important;}
    .layout-Menu{background:rgb(47,48,53) !important;border-color:rgb(35,36,39) !important;}
    .GuessMainPanel{background:rgba(47,48,53,0.9) !important;border:1px solid rgb(47,48,53) !important;}
    .danmuAuthor-3d7b4a{color:rgb(234,234,234) !important;}
    .danmudiv-32f498{background:rgba(47,49,53,0.9) !important;}
    .danmuContent-25f266{background:rgba(35,36,39,0.9) !important;}
    .word-89c053{background:rgba(35,36,39,0.9) !important;color:rgb(187,187,187) !important;}
    .FansMedalPanel-Panel{color:black !important;}
    .AnchorLike-ItemBox,.AnchorFriendPane-content,.SociatyLabelPop-content{border:1px solid rgb(35,36,39) !important;}
    .AnchorFriendCard-info>h3,.GiftExpandPanel-descName,.GiftInfoPanel-name,.FansMedalInfo-titleL,.SociatyAnchorCard-info>h3{color:rgb(204,204,204) !important;}
    .GuessReturnYwFdSlider{background:rgba(47,48,53,0.7); !important;border-left:1px solid rgb(35,36,39) !important;}
    .GuessGuideList-itemBox,.GuessGuideList-moreGuess{background-color:rgba(47,48,53) !important;color:rgb(204,204,204) !important;}
    .AnchorFriend-footer a{background-color:rgb(47,48,53) !important;color:rgb(204,204,204) !important;}
    .AnchorFriendPane-title{border-bottom:1px solid rgb(121,127,137) !important;background-color:rgb(35,36,39) !important;}
    .AnchorLike-friendList .AnchorFriendPane-title h3,.Title svg{color:rgb(153,153,153) !important;}
    .GiftExpandPanel{background-color:rgb(35,36,39) !important;border:1px solid rgb(35,36,39) !important;}
    .GiftInfoPanel-cont{background-color:rgb(35,36,39) !important;border:1px solid rgb(35,36,39) !important;}
    .BatchGiveForm-num{background-color:rgb(35,36,39) !important;}
    .BatchGiveForm-input{background-color:rgb(35,36,39) !important;color:rgb(149,149,149) !important;}
    .BatchGiveForm-btn,.Backpack-prop.is-blank,.GuessMainPanel-sliderItem{background-color:rgb(47,48,53) !important;}
    .Backpack{background-color:rgb(35,36,39) !important;border:1px solid rgb(35,36,39) !important;}
    .Backpack-name,.NormalCard-btn,.NormalCard-close,.NobleCard-close,.ReportButton-41fa9e,.HideButton-d22988,.txtHidden-486e56,.BackpackInfoPanel-name,.NormalCard-name{color:rgb(187,187,187) !important;}
    .Backpack-propPage,.BatchProp-content{background-color:rgb(35,36,39) !important;color:rgb(149,149,149)!important;}
    .BackpackInfoPanel-content{background-color:rgb(35,36,39) !important;border:1px solid rgb(35,36,39) !important;}
    .BatchProp-customIpt,.BatchGiveForm-num,.GiftInfoPanel-intro{color:rgb(149,149,149) !important;}
    .GuessReturnYwFdSlider-numIptWrap,.GuessReturnYwFdSlider-numIpt{background-color:rgb(47,48,53) !important;color:rgb(149,149,149) !important;}
    .GuessReturnYwFdSlider-giftName{color:rgb(160,160,160) !important;}
    .NormalCard-common,.GuessRankPanel{background-color:rgb(47,48,53) !important;border:1px solid rgb(47,48,53) !important;}
    .FansMedalPanel-OwnerInfo,.FansMedalPanel-list{background-color:rgb(47,48,53) !important;color:rgb(187,187,187) !important;}
    .FansMedalList-item:hover{background-color:rgb(37,38,42) !important;}
    .AnchorFriend-content,.SociatyAnchor-content{background-color:rgb(35,36,39) !important;border-top:1px solid rgb(35,36,39) !important;}
    .SociatyLabelPop-title{border-bottom:1px solid rgb(121,127,137) !important;background-color:rgb(35,36,39) !important;color:rgb(153,153,153) !important;}
    .Barrage-nickName{color:rgb(255,119,0) !important;}
    .wm-general-wrapper{background:rgb(35,36,39) !important;}
    .ChatRank-rankWraper .ChatRankTab-title.is-active{color:rgb(255,119,0)!important;}
    .ChatRank-rankWraper .ChatRankTab-title{color:rgb(131,140,154)!important;background:rgb(29,32,35)!important;border:1px solid rgb(47,48,53)!important;}
    .MatchTeamRankList-topAvatar{background:rgb(47,48,53)!important;}
    .MatchTeamRankList-topName{color:rgb(131,140,154)!important;background-color:rgb(47,48,53)!important;}
    .MatchTeamRankTitle-content{background:rgb(47,48,53)!important;color:rgb(131,140,154)!important;}
    .MatchTeamRankBottom{background:rgb(47,48,53) !important;}
    .MatchTeamRankBottom-lable{color:rgb(131,140,154);}
    .MatchTeamRankBottom-desc{color:rgb(121,127,137);}
    .Barrage-text>a,.Barrage-firstCharge{color:rgb(187,187,187)!important;}
    .GuessMainPanelHeader-slogon{color:rgb(204,204,204)!important;}
    .Barrage-hitYwGame--text{color:rgb(187,187,187)!important;}
    .AnchorFriendPane-title h3{color:rgb(153,153,153)!important;}
    .Barrage-nickName.is-self{color:rgb(255,0,51)!important;}
    .barragePanel__funcPanel{background:rgba(47,49,53,0.9) !important;}
    .layui-text{color:rgb(187,187,187) !important;}
    .GuessReturnYwFdSlider-ywNum{color:rgb(237,90,101) !important;}
    .VideoBottomTabs span{color:rgb(204,204,204)}
    #point__value{color:rgb(191,191,191) !important;}
    `;
    StyleHook_set("Ex_Style_NightMode", cssText);

}
function cancelNightMode() {
    StyleHook_remove("Ex_Style_NightMode");
}
function initPkg_Point() {
	initPkg_Point_insertDom();
    initPkg_Point_Func();
    initPkg_Point_Constructor();
    initPkg_Point_Module();
}

function initPkg_Point_Module() {
    initPkg_Point_PointPanel();
}

function initPkg_Point_insertDom() {
	let a = document.createElement("div");
    a.id = "ex-point";
    a.innerHTML = `
    <span>💗 积分</span>
    <span id="point__value" class="PlayerToolbar-dataLoadding"></span>
    `;
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Point_Func() {
    document.getElementById("ex-point").addEventListener("click", () => {
        let a = document.getElementsByClassName("point__panel")[0];
        if (a.style.display != "block") {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
    })
}

async function initPkg_Point_Constructor() {
    let ret = await getUserPoint(dyToken);
    let valueDom = document.getElementById("point__value");
    if (ret.error == "0") {
        valueDom.className = "";
        valueDom.innerText = ret.data[0].point;
        document.getElementById("ex-point").title = `更新时间：${ ret.data[0].update_time }`;
    } else if (ret.error == "2") {
        alert(ret.msg);
    } else {
        valueDom.className = "";
        valueDom.innerText = "0";
    }
}

async function updateUserPoint() {
    let ret = await getUserPoint(dyToken);
    let valueDom = document.getElementById("point__value");
    if (ret.error == "0") {
        valueDom.className = "";
        valueDom.innerText = ret.data[0].point;
        document.getElementById("ex-point").title = `更新时间：${ ret.data[0].update_time }`;
        showMessage("【积分系统】积分更新完毕", "success");
    } else if (ret.error == "2") {
        alert(ret.msg);
    } else {
        valueDom.className = "";
        valueDom.innerText = "0";
    }
}

function getUserPoint(token) {
    // 获取用户积分
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/query_by_uid",
            data: "token=" + token,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function getItemList(token) {
    // 获取物品列表
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/query_item",
            data: "token=" + token,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function exchangeItem(token, item_id, id, info) {
    // 兑换物品
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/exchange",
            data: "token=" + token + "&item_id=" + item_id + "&id=" + id + "&info=" + info,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}


function getExchangeRecord(token, offset) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/query_exchange",
            data: "token=" + token + "&offset=" + offset,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function getPointList(token) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/point_list",
            data: "token=" + token,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}
function initPkg_Point_PointExchange() {
    initPkg_Point_PointExchange_insertDom();
    initPkg_Point_PointExchange_insertFunc();
}
function initPkg_Point_PointExchange_insertDom() {
	renderExchangePanel();
}

function initPkg_Point_PointExchange_insertFunc() {

}


async function renderExchangePanel() {
    if (document.getElementById("ex-exchange") !== null) {
        return;
    }

    let ret = await getItemList(dyToken);
    if (ret.error != "0") {
        showMessage("【积分系统】获取物品列表失败：" + ret.msg, "error");
        return;
    }
    if (ret.data == null) {
        showMessage("【积分系统】暂无可兑换的物品", "error");
        return;
    }

    let a = document.createElement("div");
    a.id = "ex-exchange";
    
    let html = `<div class="exchange__panel"><div class="exchange__close">X</div>
    <div class="exchange__wrap">`;
    for (let i = 0; i < ret.data.length; i++) {
        html = html + `
            <div class="item__wrap">
                <img class="item__pic" src="${ ret.data[i].pic }" />
                <span class="item__name">${ ret.data[i].name }</span>
                <span class="item__description">${ ret.data[i].description }</span>
                <span class="item__num">剩余 ${ ret.data[i].num } 件</span>
                <span class="item__price">💗${ ret.data[i].price }</span>
                <div class="item__exchange">兑换</div>
            </div>
        `;
    }
    html = html + "</div></div>";

    a.innerHTML = html;

    let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
    b.insertBefore(a, b.childNodes[0]);
    
    bindExchangePanel(ret);
}

function bindExchangePanel(itemJson) {
    let dom = document.getElementsByClassName("item__exchange");
    for (let i = 0; i < dom.length; i++) {
        dom[i].onclick = () => {
            exchangeItemEvent(itemJson.data[i].id, itemJson.data[i].num, itemJson.data[i].price);
        }
    }
    document.getElementsByClassName("exchange__close")[0].onclick = () => {
        let a = document.getElementById("ex-exchange");
        if (a !== null) {
            a.remove();
        }
    }
}
async function exchangeItemEvent(item_id, item_num, item_price){
    if (item_num <= 0) {
        showMessage("【积分系统】兑换失败：物品数量不足", "error");
        return;
    }
    let currentPoint = document.getElementById("point__value").innerText;
    if (currentPoint - item_price < 0) {
        showMessage("【积分系统】兑换失败：积分不足", "error");
        return;
    }

    showPrompt("请填写备注信息（联系方式/收获地址）",async (info) => {
        if (info == "") {
            showMessage("【积分系统】兑换失败：未填写备注信息", "error");
            return;
        }
        
        let id = await getUserName();
        let ret = await exchangeItem(dyToken, item_id, id, info);
        if (ret.error == "0") {
            showMessage("【积分系统】" + ret.msg, "success");
            if (ret.data.length > 0) {
                document.getElementById("point__value").innerText = ret.data[0].point;
                document.getElementById("ex-point").title = `更新时间：${ ret.data[0].update_time }`;
            }
        } else {
            showMessage("【积分系统】" + ret.msg, "error");
        }
    }, () => {return});
    
}

function initPkg_Point_PointList() {
    initPkg_Point_PointList_insertDom();
}
function initPkg_Point_PointList_insertDom() {
    renderPointList();
}

function initPkg_Point_PointList_insertFunc() {
    document.getElementsByClassName("pointlist__close")[0].onclick = () => {
        let a = document.getElementById("ex-pointlist");
        if (a !== null) {
            a.remove();
        }
    }
}

async function renderPointList() {
    if (document.getElementById("ex-pointlist") !== null) {
        return;
    }

    let ret = await getPointList(dyToken);
    if (ret.error != "0") {
        showMessage("【积分系统】获取积分榜失败：" + ret.msg, "error");
        return;
    }
    if (ret.data == null) {
        showMessage("【积分系统】积分榜暂无数据", "error");
        return;
    }

    let a = document.createElement("div");
    a.id = "ex-pointlist";
    
    let html = `<div class="pointlist__close">X</div>
    <div class="pointlist__wrap">
    <table>
        <tr>
            <th>排名</th>
            <th>昵称</th>
            <th>积分</th>
        </tr>`;
    for (let i = 0; i < ret.data.length; i++) {
        html = html + `
        <tr>
            <td>${ i + 1 }</td>
            <td>${ ret.data[i].id }</td>
            <td>${ ret.data[i].point }</td>
        </tr>
        `;
    }
    html = html + "</table></div>";

    a.innerHTML = html;

    let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
    b.insertBefore(a, b.childNodes[0]);

    // 异步函数所以要把绑定函数放在最后
    initPkg_Point_PointList_insertFunc();
}
function initPkg_Point_PointPanel() {
    initPkg_Point_PointPanel_insertDom();
    initPkg_Point_PointPanel_insertFunc();
}
function initPkg_Point_PointPanel_insertDom() {
	let a = document.createElement("div");
	a.className = "point__panel";
    a.innerHTML = `
            <div class="panel__wrap">
                <div id="panel__update" class="panel__cell">更新积分</div>
                <div id="panel__pointlist" class="panel__cell">积分榜</div>
				<div id="panel__exchange" class="panel__cell">兑换物品</div>
				<div id="panel__record" class="panel__cell">兑换记录</div>
				<div id="panel__rules" class="panel__cell">积分规则</div>
			</div>
			<div class="panel__triangle"></div>
    `;
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_Point_PointPanel_insertFunc() {
    document.getElementById("panel__update").addEventListener("click",  () => {
        closePointPanel();
        updateUserPoint();
    });
    document.getElementById("panel__pointlist").addEventListener("click",  () => {
        closePointPanel();
        initPkg_Point_PointList();
    });
    document.getElementById("panel__exchange").addEventListener("click", async () => {
        closePointPanel();
        initPkg_Point_PointExchange();
    });
    document.getElementById("panel__record").addEventListener("click", async () => {
        closePointPanel();
        initPkg_Point_PointRecord();
    });
    document.getElementById("panel__rules").addEventListener("click",  async () => {
        closePointPanel();
        openPage("https://qianjiachun.github.io/DouyuEx/rules", true);
    });
}

function closePointPanel() {
    document.getElementsByClassName("point__panel")[0].style.display = "none";
}

let currentOffset = 0;
let maxOffset = 99999;
function initPkg_Point_PointRecord() {
    currentOffset = 0;
    initPkg_Point_PointRecord_insertDom();
    initPkg_Point_PointRecord_insertFunc();
}
function initPkg_Point_PointRecord_insertDom() {
    renderRecordWrap();
    renderRecord(currentOffset);
}

function initPkg_Point_PointRecord_insertFunc() {
    document.getElementsByClassName("record__close")[0].onclick = () => {
        let a = document.getElementById("ex-record");
        if (a !== null) {
            a.remove();
        }
    }
    document.getElementsByClassName("record__prev")[0].onclick = () => {
        if (currentOffset < 10) {
            showMessage("【积分系统】兑换系统已到首页", "error");
            return;
        }
        currentOffset = currentOffset - 10;
        renderRecord(currentOffset);
    }
    document.getElementsByClassName("record__next")[0].onclick = () => {
        if (currentOffset >= maxOffset) {
            showMessage("【积分系统】兑换系统已到尾页", "error");
            return;
        }
        currentOffset = currentOffset + 10;
        renderRecord(currentOffset);
    }
}


function renderRecordWrap() {
    if (document.getElementById("ex-record") !== null) {
        return;
    }
    let a = document.createElement("div");
    a.id = "ex-record";
    
    let html = `
    <div class="record__close">X</div>
    <div class="records__wrap"></div>
    <div class="record__pagenav">
        <div class="record__prev">上一页</div>
        <div class="record__next">下一页</div>
    </div>
    `;
    a.innerHTML = html;
    let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
    b.insertBefore(a, b.childNodes[0]);
}

async function renderRecord(offset) {
    let dom = document.getElementsByClassName("records__wrap");
    if (dom.length <= 0) {
        return;
    }
    dom[0].innerHTML = "";


    let recordList = await getExchangeRecord(dyToken, offset);
    if (recordList.error != "0") {
        showMessage("【积分系统】" + recordList.msg, "error");
        return;
    }
    if (recordList.data == null) {
        maxOffset = currentOffset;
        showMessage("【积分系统】无兑换记录", "error");
        return;
    }
    
    

    let html = "";


    for (let i = 0; i < recordList.data.length; i++) {
        html += `
        <div class="record__wrap">
            <div class="record__left">
                <div class="record__name">（${ recordList.data[i].status=="1"?"已发货":"未发货" }）${ recordList.data[i].item_name }</div>
                <div class="record__updatetime">${ recordList.data[i].update_time }</div>
            </div>
            <div class="record__right">
                <div class="record__price">💗${ recordList.data[i].price }</div>
            </div>
        </div>
        `;
    }

    dom[0].innerHTML = html;

    bindRecord(recordList);
}

function bindRecord(recordJson) {
    let dom = document.getElementsByClassName("record__wrap");
    for (let i = 0; i < dom.length; i++) {
        dom[i].onclick = () => {
            PostbirdAlertBox.alert({
                'title': '备注信息',
                'content': recordJson.data[i].info,
                'okBtn': '确定',
                'contentColor': 'rgb(51,51,51)',
            });
        }
    }
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
    html += '<div style="min-height:170px" class="postbird-box-content">';
    html += '<div class="postbird-box-header">';
    html += '<span class="postbird-box-title"><span>请输入直播间地址：</span></span>';
    html += '</div>'; // header
    html += '<div class="postbird-box-text">';
    html += '<input id="popup-player__url" value="https://www.douyu.com/5189167" style="height:30px;box-sizing:border-box" type="text" class="postbird-prompt-input" autofocus="true">';
    html += '<label style="margin-right:30px" title="【直播流模式】&#10;1. 速度快&#10;2. 延迟低&#10;3. 占用少&#10;4. 不会进入直播间&#10;5. 支持斗鱼/Bilibili"><input id="popup-player__noiframe" type="radio" name="sex" value="无弹幕" checked="checked">无弹幕(推荐)</label>';
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
    getRealLive_Huya(rid, "1", (lurl, msg) => {
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
            // html += "<select class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option></select>";
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
    // let videoCDN = document.getElementById("videoCDN" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoQn.onchange = function() {
        getRealLive_Huya(rid, videoQn.value, (lurl, msg) => {
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
        getRealLive_Huya(rid, videoQn.value, (lurl, msg) => {
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
	let real_viewIcon = '<svg style="width:16px;height:16px" t="1566119680547" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3494" width="128" height="128"><path d="M712.820909 595.224609C807.907642 536.686746 870.40537 437.74751 870.40537 325.549212 870.400378 145.753547 709.943392 0 511.997503 0 314.055363 0 153.599626 145.753547 153.599626 325.549212 153.599626 437.74751 216.092361 536.686746 311.179092 595.219615 149.961841 657.72608 31.268214 793.205446 5.334335 955.968198 1.926253 962.195123 0 969.212275 0 976.638899 0 1002.324352 22.919038 1023.151098 51.198627 1023.151098 79.476967 1023.151098 102.396005 1002.324352 102.396005 976.638899L102.396005 1023.151098C102.396005 817.669984 285.787009 651.099674 511.997503 651.099674 738.212992 651.099674 921.602746 817.669984 921.602746 1023.151098L921.602746 976.638899C921.602746 1002.324352 944.523034 1023.151098 972.801376 1023.151098 1001.07472 1023.151098 1024 1002.324352 1024 976.638899 1024 969.212275 1022.073747 962.195123 1018.659424 955.968198 992.731789 793.205446 874.038157 657.72608 712.820909 595.224609ZM511.997503 558.080262C370.618285 558.080262 256.000624 453.967732 256.000624 325.545467 256.000624 197.121954 370.618285 93.009424 511.997503 93.009424 653.386707 93.009424 767.993133 197.121954 767.993133 325.545467 767.993133 453.972726 653.386707 558.080262 511.997503 558.080262L511.997503 558.080262Z" p-id="3495"></path></svg>';
	let real_danmuIcon = '<svg t="1587796804183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20780" width="16" height="16"><path d="M811.8272 62.6176H212.1728c-79.9232 0-149.8624 69.9392-149.8624 149.9136v599.6032a150.3232 150.3232 0 0 0 149.8624 149.9136h599.6544a150.3232 150.3232 0 0 0 149.8624-149.9136V212.5312c0-79.9744-69.9392-149.9136-149.8624-149.9136zM263.5264 367.104c30.0032 0 49.9712 19.968 49.9712 49.9712s-19.968 49.92-49.9712 49.92-49.9712-19.968-49.9712-49.92 20.0192-49.9712 49.9712-49.9712z m449.6896 294.8096H263.5264c-24.9856 0-49.9712-24.9856-49.9712-49.9712s24.9856-49.9712 49.9712-49.9712h449.6896c24.9856 0 49.9712 24.9856 49.9712 49.9712s-24.9856 49.9712-49.9712 49.9712z m99.9424-199.68H463.4112c-24.9856 0-49.9712-24.9856-49.9712-49.9712s24.9856-49.9712 49.9712-49.9712h349.7472c24.9856 0 49.9712 24.9856 49.9712 49.9712s-24.9856 49.7664-49.9712 49.7664z" p-id="20781" fill="#1296db"></path></svg>';
	// let real_giftIcon = '<svg t="1576950815993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3618" width="16" height="16"><path d="M554.957 829.848l-85.905 0 0-463.89c0-18.978 15.384-34.363 34.362-34.363l17.182 0c18.978 0 34.362 15.38499999 34.362 34.363l0 463.89z" fill="#d4237a" p-id="3619"></path><path d="M889.985 494.814l-755.97 0c-37.902 0-68.724-30.82999999-68.724-68.725L65.291 323.003c0-56.846 46.241-103.087 103.087-103.087l687.245 0c56.846 0 103.087 46.24 103.087 103.087l0 103.086c-0.001 37.894-30.823 68.725-68.725 68.725z m0-68.725l0 34.363 0.016-34.363-0.016 0zM168.377 288.64c-18.94300001 0-34.363 15.412-34.363 34.364l0 103.086 755.87 0 0.1-103.086c0-18.952-15.42-34.363-34.363-34.363L168.377 288.641z" fill="#d4237a" p-id="3620"></path><path d="M821.26 958.712L202.74 958.712c-37.903 0-68.725-30.838-68.725-68.732L134.015 494.814c0-37.89400001 30.822-68.725 68.724-68.725l618.522 0c37.902 0 68.724 30.82999999 68.724 68.725L889.985 889.98c0 37.89400001-30.822 68.73199999-68.724 68.732z m0-68.732l0 34.362 0.017-34.362-0.016 0zM202.74 494.814L202.74 889.98l618.42 0 0.1-395.166L202.74 494.814z m281.358-240.537c-9.93399999 0-19.78200001-4.278-26.578-12.55L358.728 121.46c-12.03-14.664-9.916-36.317 4.748-48.363 14.648-12.038 36.326-9.924 48.373 4.74l98.79199999 120.268c12.03 14.664 9.916 36.317-4.74799999 48.363a34.213 34.213 0 0 1-21.795 7.81z" fill="#d4237a" p-id="3621"></path><path d="M539.902 254.277a34.212 34.212 0 0 1-21.795-7.81c-14.664-12.047-16.778-33.7-4.748-48.363L612.15 77.836c12.047-14.664 33.708-16.77799999 48.373-4.74 14.664 12.047 16.778 33.7 4.748 48.363l-98.792 120.268c-6.795 8.272-16.644 12.55-26.577 12.55z" fill="#d4237a" p-id="3622"></path></svg>'
	let real_money_yc = '<svg t="1579155265981" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6949" width="16" height="16"><path d="M136.96 67.413h181.76L512 452.693l193.28-385.28h181.76l-245.76 445.44h163.84v84.48h-211.2l-1.28 1.28v106.24h212.48v84.48H592.64v192H431.36v-192h-211.2v-84.48h211.2v-106.24l-1.28-1.28H220.16v-84.48h162.56z" fill="#F54330" p-id="6950"></path></svg>';
	document.querySelector(".AnchorAnnounce > h3").style.display = "none";
	let html = "";
	let a = document.createElement("div");
	a.className = "real-audience";
	html += "<div id='real-audience__t' style='display: inline-block;margin-right:3px;' title='今日累计观看人数'>" + real_viewIcon + '<span id="real-audience__total" style="color:#ed5a65">****</span></div>';
	html += "<div style='display: inline-block;margin-right:3px;' title='弹幕人数'>" + real_danmuIcon + '<span id="real-audience__barrage">****</span></div>';
	// html += "<div style='display: inline-block;margin-right:3px;' title='送礼人数'>" + real_giftIcon + '<span id="real-audience__gift">****</span></div>';
	html += "<div id='real-audience__money' style='display: inline-block;margin-right:3px;' title='今日累计礼物价值'>" + real_money_yc + '<span id="real-audience__money_yc">****</span></div>';
	
	html += '<span id="real-audience__time" style="float:right">' + "已播:" + "****" + "</span>";
	a.innerHTML = html;
	
	let b = document.getElementsByClassName("AnchorAnnounce")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_RealAudience_Func() {
	let h_timeout;
	document.getElementsByClassName("AnchorAnnounce")[0].addEventListener("mouseover", () => {
		h_timeout = setTimeout(() => {
			document.querySelector(".AnchorAnnounce > h3").style.display="block";
		}, 500);
		
	});
	document.getElementsByClassName("AnchorAnnounce")[0].addEventListener("mouseout", () => {
		clearTimeout(h_timeout);
		document.querySelector(".AnchorAnnounce > h3").style.display="none";
	});
	document.getElementsByClassName("real-audience")[0].addEventListener("click", function() {
		openPage("https://xian.xiaohulu.com/anchor2/details?plat=2&roomid=" + rid, true);
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
		document.getElementById("real-audience__time").title = "开播时间:" + String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date(Number(real_info.showtime + "000"))));
		
	}).catch(err => {
		console.log("请求失败!", err);
	})
}



function initPkg_Refresh() {
	initPkg_Refresh_BarrageFrame();
	initPkg_Refresh_Video();
	initPkg_Refresh_Barrage();
}

function saveData_Refresh() {
	// 此处为保存简洁模式的数据，请在每次操作后都调用这个函数以保存状态
	// 数据结构
	// {功能1:{子功能1:{}}}
	// 每个子模块需要提供相应的返回数据函数
	let data = {
		barrageFrame: {
			status: refresh_BarrageFrame_getStatus(),
		},
		video: {
			status: refresh_Video_getStatus(),
		},
		barrage: {
			status: refresh_Barrage_getStatus(),
		}
	}
	
	localStorage.setItem("ExSave_Refresh", JSON.stringify(data)); // 存储弹幕列表
}
let current_barrage_status = 0; // 0没被简化 1被简化

function initPkg_Refresh_Barrage() {
	initPkg_Refresh_Barrage_Dom();
    initPkg_Refresh_Barrage_Func();
    initPkg_Refresh_Barrage_Set();
}

function initPkg_Refresh_Barrage_Dom() {
	Refresh_Barrage_insertIcon();
}
function Refresh_Barrage_insertIcon() {
	let a = document.createElement("a");
    a.className = "refresh-barrage";
    a.id = "refresh-barrage";
	a.innerHTML = '<svg t="1588051109604" id="refresh-barrage__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16"><path d="M588.416 516.096L787.2 317.312a54.016 54.016 0 1 0-76.416-76.416L512 439.68 313.216 241.024A54.016 54.016 0 1 0 236.8 317.376l198.784 198.848-198.016 197.888a54.016 54.016 0 1 0 76.416 76.416L512 592.576l197.888 197.952a54.016 54.016 0 1 0 76.416-76.416L588.416 516.096z" fill="#AFAFAF" p-id="3096"></path></svg><i class="Barrage-toolbarIcon"></i><span id="refresh-barrage__text" class="Barrage-toolbarText">前缀</span>';
	let b = document.getElementsByClassName("Barrage-toolbar")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Refresh_Barrage_Func() {
	document.getElementById("refresh-barrage").addEventListener("click", function() {
        if (current_barrage_status == 0) {
            // 简化
            current_barrage_status = 1;
            setRefreshBarrage();
        } else {
            current_barrage_status = 0;
            cancelRefreshBarrage();
        }
        saveData_Refresh();
    });
}


function refresh_Barrage_getStatus() {
    if (current_barrage_status == 1) {
        // 被简化
        return true;
    } else {
        // 没被简化
        return false;
    }
}

function initPkg_Refresh_Barrage_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("barrage" in retJson == false) {
            retJson.barrage = {status: false};
        }
        if (retJson.barrage.status == true) {
            current_barrage_status = 1;
            setRefreshBarrage();
        }
    }
}
 
function setRefreshBarrage() {
    let cssText = `
    .Barrage-listItem .Barrage-icon,.Barrage-listItem .FansMedal.is-made,.Barrage-listItem .RoomLevel,.Barrage-listItem .Motor,.Barrage-listItem .ChatAchievement,.Barrage-listItem .Barrage-hiIcon,.Barrage-listItem .Medal,.Barrage-listItem .MatchSystemTeamMedal{display:none !important;}
    /*.Barrage-listItem .UserLevel{display:none !important;}*/
    `;
    StyleHook_set("Ex_Style_RefreshBarrage", cssText);
}

function cancelRefreshBarrage() {
    StyleHook_remove("Ex_Style_RefreshBarrage");
}
function initPkg_Refresh_BarrageFrame() {
	initPkg_Refresh_BarrageFrame_Dom();
    initPkg_Refresh_BarrageFrame_Func();
    initPkg_Refresh_BarrageFrame_Set();
}

function initPkg_Refresh_BarrageFrame_Dom() {
	Refresh_BarrageFrame_insertIcon();
}
function Refresh_BarrageFrame_insertIcon() {
	let a = document.createElement("a");
    a.className = "Barrage-toolbarLock";
    a.id = "refresh-barrage-frame";
	a.innerHTML = '<i class="Barrage-toolbarIcon"></i><span id="refresh-barrage-frame__text" class="Barrage-toolbarText">拉高</span>';
	let b = document.getElementsByClassName("Barrage-toolbar")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Refresh_BarrageFrame_Func() {
	document.getElementById("refresh-barrage-frame").addEventListener("click", function() {
        let dom_rank = document.getElementsByClassName("layout-Player-rank")[0];
        let dom_barrage = document.getElementById("js-player-barrage");
        let dom_activity = document.getElementById("js-room-activity");
        if (dom_rank.style.display == "none") {
            // 被拉高
            dom_rank.style.display = "block";
            dom_barrage.style = "";
            dom_activity.style.display = "block";
            document.getElementById("refresh-barrage-frame__text").innerText = "拉高";

        } else {
            // 没拉高
            let topHeight = document.getElementsByClassName("layout-Player-announce")[0].offsetHeight;
            dom_rank.style.display = "none";
            dom_activity.style.display = "none";
            dom_barrage.style = "top:" + topHeight + "px";
            document.getElementById("refresh-barrage-frame__text").innerText = "恢复";
        }
        saveData_Refresh();
    });
}


function refresh_BarrageFrame_getStatus() {
    let dom_rank = document.getElementsByClassName("layout-Player-rank")[0];
    if (dom_rank.style.display == "none") {
        // 被拉高
        return true;
    } else {
        // 没拉高
        return false;
    }
}

function initPkg_Refresh_BarrageFrame_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("barrageFrame" in retJson == false) {
            retJson.barrageFrame = {status: false};
        }
        if (retJson.barrageFrame.status == true) {
            let dom_rank = document.getElementsByClassName("layout-Player-rank")[0];
            let dom_barrage = document.getElementById("js-player-barrage");
            let dom_activity = document.getElementById("js-room-activity");
            let topHeight = document.getElementsByClassName("layout-Player-announce")[0].offsetHeight;
            dom_rank.style.display = "none";
            dom_activity.style.display = "none";
            dom_barrage.style = "top:" + topHeight + "px";
            document.getElementById("refresh-barrage-frame__text").innerText = "恢复";
        }
    }
}

function initPkg_Refresh_Video() {
    let timer = setInterval(() => {
        if (document.getElementsByClassName("right-e7ea5d").length > 0) {
            clearInterval(timer);
            initPkg_Refresh_Video_Dom();
            initPkg_Refresh_Video_Func();
            initPkg_Refresh_Video_Set();
        }
    }, 1500);
}

function initPkg_Refresh_Video_Dom() {
	Refresh_Video_insertIcon();
}
function Refresh_Video_insertIcon() {
	let a = document.createElement("div");
    a.id = "refresh-video";
    a.title = "隐藏礼物框";
    a.innerHTML = '<svg t="1587295753406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6410" width="22" height="22"><path d="M218.88 64l73.728 23.168c-9.792 20.608-18.432 41.216-25.792 61.824h224.896v73.408H362.688c19.648 25.728 39.36 54.08 59.008 84.992l-77.44 42.496a1235.456 1235.456 0 0 0-66.368-127.552h-47.936L189.376 288c-14.72 20.608-34.432 43.776-59.008 69.504L64 307.328C135.296 235.2 186.944 154.112 218.88 64z m383.488 0l70.08 23.168c-7.36 20.608-16 41.216-25.792 61.824h261.824v73.408h-151.168c19.648 25.728 36.864 52.8 51.648 81.088l-66.368 42.496a1440.32 1440.32 0 0 0-70.08-123.584h-59.072a594.816 594.816 0 0 1-95.872 131.264L451.2 303.424C520 231.36 570.432 151.552 602.368 64zM259.456 334.336a491.52 491.52 0 0 1 84.8 108.16l-70.08 38.592c-17.216-36.032-43.008-72.064-77.44-108.16l62.72-38.592z m125.376 48.832H832v472.576c0 33.472-7.36 59.2-22.144 77.248-14.72 17.984-36.864 27.008-66.368 27.008-24.576 0-44.352-1.28-78.784-3.84l-18.432-64c39.36 2.56 71.296 3.84 95.872 3.84 17.216 0 25.792-18.048 25.792-54.08V448.832H384.832V383.168zM128 448h64v512H128V448z m512 64.448V832H320V512.448h320zM576 640V576H384.832v64H576z m-191.168 64v64H576v-64H384.832z" p-id="6411" fill="#ffffff"></path></svg>';
    let b = document.getElementsByClassName("right-e7ea5d")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Refresh_Video_Func() {
	document.getElementById("refresh-video").addEventListener("click", function() {
        let dom_toolbar = document.getElementsByClassName("PlayerToolbar-Content")[0];
        let dom_video = document.getElementsByClassName("layout-Player-video")[0];
        if (dom_toolbar.style.visibility == "hidden") {
            dom_toolbar.style.visibility = "visible";
            dom_video.style = "";
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
        }
        saveData_Refresh();
    });
}

function refresh_Video_getStatus() {
    let dom_toolbar = document.getElementsByClassName("layout-Player-toolbar")[0];
    if (dom_toolbar.style.visibility == "hidden") {
        return true;
    } else {
        return false;
    }
}

function initPkg_Refresh_Video_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("video" in retJson == false) {
            retJson.video = {status: false};
        }
        if (retJson.video.status == true) {
            let dom_toolbar = document.getElementsByClassName("PlayerToolbar-Content")[0];
            let dom_video = document.getElementsByClassName("layout-Player-video")[0];
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
        }
    }
}

function initPkg_RemoveAD() {
    let t = setInterval(() => {
        let a = document.getElementsByClassName("PlayerToolbar-wealthNum")[0];
        if (a != undefined) {
            removeChatLimit();
            clearInterval(t);
        }
    }, 1000);
    
}

function removeAD() {
    StyleHook_set("Ex_Style_RemoveAD", `
    .DropMenuList-ad,.DropPane-ad,.WXTipsBox,.igl_bg-b0724a,.closure-ab91fb,.VideoAboveVivoAd,.pwd-990896,.css-widgetWrapper-EdVVC,.watermark-442a18,.FollowGuide-FadeOut,.MatchSystemChatRoomEntry-roomTabs,.FansMedalDialog-normal,.GameLauncher,.recommendAD-54569e,.recommendApp-0e23eb,.Title-ad,.Bottom-ad,.SignBarrage,.corner-ad-495ade,.SignBaseComponent-sign-ad,.SuperFansBubble,.is-noLogin,.PlayerToolbar-signCont,#js-widget,.Frawdroom,.HeaderGif-right,.HeaderGif-left,.liveos-workspace{display:none !important;} /* 左侧悬浮广告 */
    .Barrage-topFloater{z-index:999}
    .danmuAuthor-3d7b4a, .danmuContent-25f266{overflow: initial}
    .dy-Modal-mask{display:none !important;}
    .BattleShipTips{display:none !important;}
    `);
}
function removeChatLimit() {
    let a;
    
    a = document.getElementsByClassName("ChatSend-button")[0];
    if (a != undefined) {
        a.className = "ChatSend-button";
    }
    a = document.getElementsByClassName("ChatSend-txt")[0];
    if (a != undefined) {
        a.maxLength = a.maxLength + 20; // 原来为50字符，修改成70字符
    }

}
function initPkg_Sign() {
	initPkg_Sign_Dom();
	initPkg_Sign_Func();
}

function initPkg_Sign_Func() {
	let dom = new CClick(document.getElementsByClassName("ex-sign")[0]);
	dom.click(() => {
		initPkg_Sign_Main(false); // 只签到开播的
	});
	dom.longClick(() => {
		initPkg_Sign_Main(true); // 全部签到
	});
	
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

function initPkg_Sign_Main(isAll) {
		// 这里挂载每个子模块的函数入口
		// 入口即为调用
		initPkg_Sign_Yuba(); // 鱼吧签到
		initPkg_Sign_Client();
		initPkg_Sign_Motorcade();
		initPkg_Sign_Room(isAll);
		// initPkg_Sign_Ad_666(); // 此处移动到鱼塘鱼丸领取中去以免观看冲突
		initPkg_Sign_Ad_Sign();
		initPkg_Sign_Ad_FishPond();
		// initPkg_Sign_Aoligei();
		// initPkg_Sign_Ad_Yuba();
		initPkg_Sign_Chengxiao();
		// initPkg_Sign_Ad_Novel();
		initPkg_Sign_Changzheng();
		initPkg_Sign_TV();
}
function initPkg_Sign_Ad_666() {
	getFishBall_Ad_666();
}

function getFishBall_Ad_666() {
    let cnt = 0;
    fetch("https://www.douyu.com/japi/tasksys/userStatus?ids=1033&token=" + dyToken + "&client_sys=android", {
		method: 'GET',
		mode: 'no-cors',
		credentials: 'include'
	}).then(res => {
		return res.json();
	}).then(async (retData) => {
        cnt = Number(retData.data.list[0].taskLimitNum) - Number(retData.data.list[0].curCompleteNum);
        if (cnt <= 0) {
            showMessage("【挑战鱼丸】今日次数已用完", "warning");
            initPkg_Sign_Ad_Yuba();
            return;
        }
        for (let i = 0; i < cnt; i++) {
            let posid_ad_666 = "1114318";
            let token = dyToken;
            let uid = getUID();
            let info = await getFishBall_Ad_666_info(posid_ad_666, token, uid);
            if (info == false) {
                initPkg_Sign_Ad_Yuba();
                return;
            }
            let mid = info.mid;
            let infoBack = info.infoBack;
            let isStart = await getFishBall_Ad_666_start(posid_ad_666, token, uid, mid, infoBack);
            if (isStart == true) {
                showMessage("【挑战鱼丸】开始领取挑战鱼丸，需等待15秒", "info");
                await sleep(15555).then(async () => {
                    let isFinish = await getFishBall_Ad_666_finish(posid_ad_666, token, uid, mid, infoBack);
                    if (isFinish == true) {
                        await getFishBall_Ad_666_Bubble(token);
                    }
                })
            }
        }
        initPkg_Sign_Ad_Yuba();
	}).catch(err => {
		console.log("请求失败!", err);
	})
}



function getFishBall_Ad_666_info(posid_ad_666, token, uid) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
            data: "posid=" + posid_ad_666 + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    if (ret.data.length == 0) {
                        resolve(false);
                        return;
                    }
                    let mid = ret.data[0].mid;
                    let infoBack = encodeURIComponent(JSON.stringify(ret.data));
                    resolve({mid: mid, infoBack: infoBack});
                }
            }
        });
    })
}

function getFishBall_Ad_666_start(posid_ad_666, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
            data: "token=" + token + "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid_ad_666 + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    resolve(true);
                }
            }
        });

    })
}

function getFishBall_Ad_666_finish(posid_ad_666, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
            data: "uid=" + uid + "&clientType=1&posCode=" + posid_ad_666 + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    resolve(true);
                }
            }
        });

    })
}

function getFishBall_Ad_666_Bubble(token) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/tasksys/getPrize?client_sys=android", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "id=1033&roomId=" + rid + "&token=" + token
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.error == "0") {
                let retJson = JSON.parse(ret.data.ext);
                showMessage("【挑战鱼丸】已领取" + retJson.data.items[1].prizeNum + "个" + retJson.data.items[1].prizeName, "success");
            } else {
                showMessage(ret.msg, "error");
            }
            resolve();
        })
    })
}
function initPkg_Sign_Ad_FishPond() {
	getFishBall_Ad_FishPond();
}

function getFishBall_Ad_FishPond() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://apiv2.douyucdn.cn/japi/tasksys/ytxb/userStatusV3?client_sys=android",
        data: "roomId=" + rid + "&token=" + dyToken,
        responseType: "json",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: async function(response) {
            let ret = response.response.data.taskList;
            for (let i = 0; i < ret.length; i++) {
                if (ret[i].task.id == "182") {
                    if (ret[i].task.status == "3") {
                        showMessage("【鱼塘鱼丸】已领取", "warning");
                        initPkg_Sign_Ad_666();
                    } else {
                        let posid_Ad_FishPond = "1114268";
                        let token = dyToken;
                        let uid = getUID();
                        let info = await getFishBall_Ad_FishPond_info(posid_Ad_FishPond, token, uid);
                        if (info == false) {
                            initPkg_Sign_Ad_666();
                            return;
                        }
                        let mid = info.mid;
                        let infoBack = info.infoBack;
                        let isStart = await getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack);
                        if (isStart == false) {
                            isStart = await getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack);
                            if (isStart == false) {
                                isStart = await getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack);
                                // 偷个懒，直接三次重试
                            }
                        }
                        if (isStart == true) {
                            showMessage("【鱼塘鱼丸】开始领取鱼塘鱼丸，需等待15秒", "info");
                            await sleep(15555).then(async () => {
                                let isFinish = await getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack);
                                if (isFinish == false) {
                                    isFinish = await getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack);
                                    if (isFinish == false) {
                                        isFinish = await getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack);
                                    }
                                }
                                if (isFinish == true) {
                                    let isGet = await getFishBall_Ad_FishPond_Bubble(token);
                                }
                                
                            })
                        }
                        initPkg_Sign_Ad_666();
                    }
                }
            }
            
        }
    });
}

function getFishBall_Ad_FishPond_info(posid_Ad_FishPond, token, uid) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
            data: "posid=" + posid_Ad_FishPond + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    if (ret.data.length == 0) {
                        resolve(false);
                        return;
                    }
                    let mid = ret.data[0].mid;
                    let infoBack = encodeURIComponent(JSON.stringify(ret.data));
                    resolve({mid: mid, infoBack: infoBack});
                }
            }
        });
    })
}

function getFishBall_Ad_FishPond_start(posid_Ad_FishPond, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
            data: "token=" + token + "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid_Ad_FishPond + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    resolve(true);
                }
            }
        });

    })
}

function getFishBall_Ad_FishPond_finish(posid_Ad_FishPond, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
            data: "uid=" + uid + "&clientType=1&posCode=" + posid_Ad_FishPond + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    resolve(true);
                }
            }
        });

    })
}

function getFishBall_Ad_FishPond_Bubble(token) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/tasksys/ytxb/getPrize?client_sys=android",
            data: "token=" + token + "&id=182",
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    showMessage("【鱼塘鱼丸】" + ret.data.msg, "success");
                } else {
                    showMessage("【鱼塘鱼丸】" + ret.msg, "error");
                }
                resolve(ret.error);
            }
        });
    })
}
function initPkg_Sign_Ad_Sign() {
	getFishBall_Ad_Sign();
}

function getFishBall_Ad_Sign() {
    let fishBallNum = "0";
    let posid_ad_sign = "1064246";
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/inspire/getFishBallNum?posId=" + posid_ad_sign + "&ct=1&token=" + dyToken,
		responseType: "json",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function(response) {
            let ret = response.response;
            if (ret.error == "0") {
                fishBallNum = ret.data.num;
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/inspire/sendFishBall?uid=" + getUID() + "&posCode=" + posid_ad_sign + "&ct=1&token=" + dyToken,
                    responseType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    onload: function(response) {
                        let ret = response.response;
                        if (ret.error == "0") {
                            showMessage("【签到鱼丸】成功领取" + fishBallNum + "个鱼丸", "success");
                        } else {
                            if (ret.msg == "null") {
                                showMessage("【签到鱼丸】未绑定手机" , "warning");
                            } else {
                                showMessage("【签到鱼丸】" + ret.msg, "warning");
                            }
                        }
                    }
                });
            }
		}
	});
    
    
	
}
function initPkg_Sign_Ad_Yuba() {
	getFishBall_Ad_Yuba();
}

function getFishBall_Ad_Yuba() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/chance?client_sys=android",
        data: "token=" + dyToken + "&uid=" + getUID() + "&posCode=1042329&clientType=1",
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: async function(response) {
            let ret = response.response;
            if (ret.error == "0") {
                let chance = ret.data.chanceNum;
                if (chance > 0) {
                    for (let i = 0; i < chance; i++) {
                        let posid_Ad_Yuba = "1042329";
                        let token = dyToken;
                        let uid = getUID();
                        let info = await getFishBall_Ad_Yuba_info(posid_Ad_Yuba, token, uid);
                        if (info == false) {
                            return;
                        }
                        let mid = info.mid;
                        let infoBack = info.infoBack;
                        let isStart = await getFishBall_Ad_Yuba_start(posid_Ad_Yuba, token, uid, mid, infoBack);
                        if (isStart == true) {
                            showMessage("【鱼吧鱼丸】开始领取鱼吧鱼丸，需等待15秒", "info");
                            await sleep(15555).then(async () => {
                                let isFinish = await getFishBall_Ad_Yuba_finish(posid_Ad_Yuba, token, uid, mid, infoBack);
                                if (isFinish == true) {
                                    showMessage("【鱼吧鱼丸】成功领取40鱼丸", "success");
                                    await sleep(1000);
                                }
                            })
                        }
                    }
                } else {
                    showMessage("【鱼吧鱼丸】今日次数已用完", "warning");
                    return;
                }
            }
        }
    });
}



function getFishBall_Ad_Yuba_info(posid_Ad_Yuba, token, uid) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
            data: "posid=" + posid_Ad_Yuba + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    if (ret.data.length == 0) {
                        resolve(false);
                        return;
                    }
                    let mid = ret.data[0].mid;
                    let infoBack = encodeURIComponent(JSON.stringify(ret.data));
                    resolve({mid: mid, infoBack: infoBack});
                }
            }
        });
    })
}

function getFishBall_Ad_Yuba_start(posid_Ad_Yuba, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
            data: "token=" + token + "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid_Ad_Yuba + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    resolve(true);
                }
            }
        });

    })
}

function getFishBall_Ad_Yuba_finish(posid_Ad_Yuba, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
            data: "uid=" + uid + "&clientType=1&posCode=" + posid_Ad_Yuba + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    if (ret.data == "1") {
                        resolve(true);
                    }
                }
            }
        });

    })
}

const ACTIVITY_DAY_ID = "393";

function initPkg_Sign_Changzheng() {
    getChangzheng();
}

async function getChangzheng() {
    let ret = await signChangzheng();
    if (ret.error == "0") {
        showMessage("【长征签到】签到完毕", "success");

    } else {
        showMessage("【长征签到】" + ret.msg, "warning");
    }

    ret = await getChangzhengBoxStatus_Day();
    if (ret.error == "0") {
        for (let i = 0; i < ret.data.freeCount; i++) {
            let ret2 = await getChangzhengBox_Day();
            if (ret2.error == "0") {
                showMessage("【长征签到】礼盒开启：" + ret2.data.giftName, "success");
            }
        }
    }
    
}

function signChangzheng() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + "XSDXZC"
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function signChangzheng() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + "XSDXZC"
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function getChangzhengBox_Day() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/lottery/jackpot", {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: `{"activityId":"${ ACTIVITY_DAY_ID }","token":"${ dyToken }"}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function getChangzhengBoxStatus_Day() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/lottery/remaining?activityId=" + ACTIVITY_DAY_ID, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function initPkg_Sign_Chengxiao() {
    signChengxiao();
}
function signChengxiao() {
    fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'token=' + dyToken + "&signAlias=" + "20200611cxll2qd"
	}).then(res => {
		return res.json();
	}).then(ret => {
        if (ret.error == "0") {
            showMessage("【粉丝福利】恭喜你获得荧光棒x10", "success");
        } else {
            showMessage("【粉丝福利】" + ret.msg, "warning");
        }
    })
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
	openPage("https://msg.douyu.com/motorcade/#/motorcade/list/recommend?exid=chun", false);
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
async function signMotorcade_Sign() {
	let retConnect = await motorcadeConnect();
	let retConnect2 = await motorcadeConnect2(retConnect.data.uid, retConnect.data.sig);
	let mid = await getMotorcadeID(retConnect2.TinyId, retConnect2.A2Key, retConnect.data.uid);
	if (mid == null) {
		closePage();
		return;
	}
	if (mid == undefined) {
		closePage();
		return;
	}
	if (mid == "") {
		closePage();
		return;
	}
	console.log("mid是：", mid);
	mid = encodeURIComponent(mid);
	fetch('https://msg.douyu.com/v3/motorcade/signs/weekly?mid=' + mid + '&timestamp=' + Math.random().toFixed(17), {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'dy-device-id':'-',
			"dy-client": "web",
			"dy-csrf-token":getCookie("post-csrfToken"),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	}).then(res => {
		return res;
	}).then(ret => {
		console.log("weekly:", ret);
		if (ret.data.is_sign == "1") {
			closePage();
		} else {
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
				body: "to_mid="+ mid +"&expression=" + String(Number(ret.data.total) + 1)
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
	}).catch(err => {
		console.log("请求失败!", err)
	})
}

function motorcadeConnect() {
    return new Promise(resolve => {
        fetch('https://msg.douyu.com/v3/login/getusersig?t=' + String(new Date().getTime()) + '&timestamp=' + Math.random().toFixed(17), {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'dy-device-id':'-',
				"dy-client": "web",
				"dy-csrf-token":getCookie("post-csrfToken"),
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		}).then(res => {
			return res;
		}).then(ret => {
			resolve(ret);
		}).catch(err => {
			console.log("请求失败!", err)
		})
    })
}

function motorcadeConnect2(identifier, sig) {
    let url = "https://webim.tim.qq.com/v4/openim/login?identifier=" + identifier + "&usersig=" + sig +"&contenttype=json&sdkappid=1400029396";
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: '{"State":"Online"}',
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}
function getMotorcadeID(tinyid, a2, identifier) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://webim.tim.qq.com/v4/group_open_http_svc/get_joined_group_list?tinyid=" + tinyid + "&a2=" + a2 + "&contenttype=json&sdkappid=1400029396",
            data: '{"Member_Account":"' + identifier + '"}',
            responseType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
				if (response.response.GroupIdList.length > 0) {
					resolve(response.response.GroupIdList[0].GroupId);
				} else {
					resolve("");
				}
            }
        });
    })
}
function initPkg_Sign_Room(isAll) {
	signAllRoom(isAll);
}
function signAllRoom(isAll) {
    // 1. get page counts(777)
    // 2. for in all pages
    // 3. sign each room
    let pageCount = 0;
    let signedCount = 0;
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
                    if (isAll == false) {
                        if (ret.data.list[i].show_status == "1") {
                            signRoom(ret.data.list[i].room_id);
                            signedCount++;
                        }
                    } else {
                        signRoom(ret.data.list[i].room_id);
                        signedCount++;
                    }
                    
                    if (nowPage == pageCount && i == roomCount - 1) {
                        let rest = Number(ret.data.total) - signedCount;
                        showMessage("【房间签到】" + String(signedCount) + "个房间签到已完成，" + String(rest) + "个房间未签到", "success");
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
		url: "https://apiv2.douyucdn.cn/japi/roomuserlevel/apinc/checkIn?client_sys=android",
		data: 'rid=' + r,
		responseType: "json",
		headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': dyToken,
            'aid': 'android1'
		},
		onload: function(response) {
        }
	});
}
function initPkg_Sign_TV() {
	signTV();
}

function signTV() {
    let did = window.btoa(getDyDid());
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://apitv.douyucdn.cn/user/sign/index?token=" + dyToken + "&client_sys=android",
		responseType: "json",
		headers: {
			'User-Device': did
		},
		onload: function(response) {
			let ret = response.response;
			if (ret.error == "0") {
                showMessage("【电视端】签到成功！获得100鱼丸", "success");
			} else {
                showMessage("【电视端】" + ret.data.msg, "warning");
			}
		}
	});
}

let signedYuba = 0;
let totalYuba = 0;
let doneYuba = 0;
function initPkg_Sign_Yuba() {
    signYubaList();
}

function signYubaFast() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://mapi-yuba.douyu.com/wb/v3/fastSign",
        responseType: "json",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "client": "android",
            "token": dyToken,
        },
        onload: function (response) {
            if (response.response.message == "" && response.response.data != 0) {
                // showMessage("【鱼吧】一键签到成功! 获得经验" + response.response.data, "success");
                // console.log("【极速鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
            } else if (response.response.data == 0) {
                // showMessage("【鱼吧】没有7级以上的鱼吧或极速签到已完成", "warning");
                // console.log("【极速鱼吧】" + group_id + response.response.message);
            } else {
                // showMessage("【鱼吧】" + response.response.message, "warning");
                // console.log("【极速鱼吧】" + response.response.message);
            }

        }
    });
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
        onload: function (response) {
            doneYuba++;
            if (response.response.message == "") {
                signedYuba++;
                // showMessage("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp, "success");
                // console.log("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
            } else {
                // showMessage("【鱼吧】" + group_id + response.response.message, "warning");
                // console.log("【鱼吧】" + group_id + response.response.message);
            }
            if (doneYuba == totalYuba) {
                // 完成全部签到
                if (signedYuba > 0) {
                    if (totalYuba - signedYuba == 0) {
                        showMessage("【鱼吧】" + String(signedYuba) + "个鱼吧签到完成", "success")
                    } else {
                        showMessage("【鱼吧】" + String(signedYuba) + "个鱼吧签到完成，" + String(totalYuba - signedYuba) + "个鱼吧已签到", "success");
                    }
                    
                } else {
                    showMessage("【鱼吧】"+ String(totalYuba) + "个鱼吧已签到", "warning");
                }
                signedYuba = null;
                totalYuba = null;
                doneYuba = null;
            }

        }
    });
}

async function signYubaList() {
    let yubaList = [];
    let ret = await getYubaPage(1);
    yubaList = yubaList.concat(ret.list);
    let pageNum = Number(ret.count_page) - 1;
    if (pageNum >= 1) {
        for (let i = 0; i < pageNum; i++) {
            let curPage = 2 + i;
            ret = await getYubaPage(curPage);
            yubaList = yubaList.concat(ret.list);
        }
    }
    totalYuba = yubaList.length;
    signYubaFast();
    for (let i = 0; i < yubaList.length; i++) {
        signYuba(yubaList[i].group_id, dyToken);
    }

}

function getYubaPage(page) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://yuba.douyu.com/wbapi/web/group/myFollow?page=" + String(page) + "&limit=30",
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "dy-client": "pc",
              "dy-token": dyToken
            },
            onload: function(response) {
                resolve(response.response.data)
            }
        });
    })
}
var _hmt = _hmt || [];

function initPkg_Statistics() {
  let hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4dc4fb0549a56fe03ba53c022b1ff455";
  let s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
}
// 版本号
// 格式 yyyy.MM.dd.**
// var curVersion = "2020.01.12.01";
var curVersion = "2020.07.18.02"
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
    CClick
    单双击/长按不冲突的解决方案 
    By: 小淳

    调用方法:
    let a = new CClick(document.getElementById(""));
    a.click((e) => {// TODO});
    a.dbClick((e) => {// TODO});
    a.longClick((e) => {// TODO});
*/
class CClick {
    constructor(element) {
        const CONST_LONG_TIME = 700; // 长按多少ms执行
        const CONST_DOUBLE_TIME = 250; // 双击的间隔
        this.func_click = null;
        this.func_dbClick = null;
        this.func_longClick = null;
        let isLong = false;
        let timer_long;
        let clickTimes = 0;
        let timer_db;
        element.onmousedown = (event) => {
            if (event.button !== 0) {
                return;
            }
            isLong = false;
            timer_long = setTimeout(() => {
                isLong = true;
                if (this.func_longClick !== null) {
                    this.func_longClick(event);
                }
            }, CONST_LONG_TIME);
        };
        element.onmouseup = (event) => {
            if (event.button !== 0) {
                return;
            }
            if (isLong == false) {
                clearTimeout(timer_long);
                clickTimes++;
                if (clickTimes >= 2) {
                    clearTimeout(timer_db);
                    clickTimes = 0;
                    if (this.func_dbClick !== null) {
                        this.func_dbClick(event);
                    }
                    return;
                }
                timer_db = setTimeout(() => {
                    clickTimes = 0;
                    if (this.func_click !== null) {
                        this.func_click(event);
                    }
                }, CONST_DOUBLE_TIME);
            }
        };
    }
    click(callback) {
        this.func_click = callback;
    }
    dbClick(callback) {
        this.func_dbClick = callback;
    }
    longClick(callback) {
        this.func_longClick = callback;
    }
}


class DomHook {
    constructor(selector, isSubtree, callback) {
        this.selector = selector;
        this.isSubtree = isSubtree;
        let targetNode = document.querySelector(this.selector);
        let observer = new MutationObserver(function(mutations) {
            callback(mutations);
        });
        observer.observe(targetNode, { attributes: true, childList: true, subtree: this.isSubtree });
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
    二次封装postbirdAlertBox，用于DouyuEx内部使用
    By: 小淳
*/

function showAlert(text) {
    PostbirdAlertBox.alert({
        'title': '提示',
        'content': text,
        'okBtn': '确定',
        'contentColor': 'rgb(51,51,51)',
    });
}

function showConfirm(text, callback_confirm, callback_cancel) {
    PostbirdAlertBox.confirm({
        'title': '提示',
        'content': text,
        'okBtn': '确定',
        'contentColor': 'rgb(51,51,51)',
        'onConfirm': function () {
            callback_confirm();
        },
        'onCancel': function () {
            callback_cancel();
        }
    });
}

function showPrompt(text, callback_confirm, callback_cancel) {
    PostbirdAlertBox.prompt({
        'title': text,
        'okBtn': '确定',
        onConfirm: function (data) {
            callback_confirm(data);
        },
        onCancel: function (data) {
            callback_cancel(data);
        },
    });
}
/**
 * PostbirdAlertBox.js
 * -    原生javascript弹框插件
 * Author:  Postbird - http://www.ptbird.cn
 * License: MIT
 * Date:    2017-09-23
 */
var PostbirdAlertBox={containerClass:"postbird-box-container active",box:null,textTemplate:{title:"提示信息",content:"提示内容",okBtn:"好的",cancelBtn:"取消",contentColor:"#000000",okBtnColor:"#0e90d2",promptTitle:"请输入内容",promptOkBtn:"确认",},getAlertTemplate:function(){var temp='<div class="postbird-box-dialog">'+'<div class="postbird-box-content">'+'<div class="postbird-box-header">'+'<span class="postbird-box-close-btn">×</span>'+'<span class="postbird-box-title">'+"<span >"+this.textTemplate.title+"</span>"+"</span>"+"</div>"+'<div class="postbird-box-text">'+'<span style="color:'+this.textTemplate.contentColor+';">'+this.textTemplate.content+"</span>"+"</div>"+'<div class="postbird-box-footer">'+'<button class="btn-footer btn-block-footer btn-footer-ok" style="color:'+this.textTemplate.okBtnColor+';">'+this.textTemplate.okBtn+"</button>"+"</div>"+"</div>"+"</div>";return temp},getConfirmTemplate:function(){return'<div class="postbird-box-container">'+'<div class="postbird-box-dialog">'+'<div class="postbird-box-content">'+'<div class="postbird-box-header">'+'<span class="postbird-box-close-btn">×</span>'+'<span class="postbird-box-title">'+"<span >"+this.textTemplate.title+"</span>"+"</span>"+"</div>"+'<div class="postbird-box-text">'+'<span style="color:'+this.textTemplate.contentColor+';">'+this.textTemplate.content+"?</span>"+"</div>"+'<div class="postbird-box-footer">'+'<button class="btn-footer btn-left-footer btn-footer-cancel" style="color:'+this.textTemplate.cancelBtnColor+';">'+this.textTemplate.cancelBtn+"</button>"+'<button class="btn-footer btn-right-footer btn-footer-ok"  style="color:'+this.textTemplate.okBtnColor+';">'+this.textTemplate.okBtn+"</button>"+"</div>"+"</div>"+"</div>"+"</div>"},getPromptTemplate:function(){return'<div class="postbird-box-container">'+'<div class="postbird-box-dialog">'+'<div class="postbird-box-content">'+'<div class="postbird-box-header">'+'<span class="postbird-box-close-btn">×</span>'+'<span class="postbird-box-title">'+"<span >"+this.textTemplate.title+"</span>"+"</span>"+"</div>"+'<div class="postbird-box-text">'+'<input type="text" class="postbird-prompt-input" autofocus="true" >'+"</div>"+'<div class="postbird-box-footer">'+'<button class="btn-footer btn-left-footer btn-footer-cancel" style="color:'+this.textTemplate.cancelBtnColor+';">'+this.textTemplate.cancelBtn+"</button>"+'<button class="btn-footer btn-right-footer btn-footer-ok"  style="color:'+this.textTemplate.okBtnColor+';">'+this.textTemplate.okBtn+"</button>"+"</div>"+"</div>"+"</div>"+"</div>"},alert:function(opt){this.textTemplate.title=opt.title||this.textTemplate.title;this.textTemplate.content=opt.content||this.textTemplate.content;this.textTemplate.okBtn=opt.okBtn||this.textTemplate.okBtn;this.textTemplate.okBtnColor=opt.okBtnColor||this.textTemplate.okBtnColor;this.textTemplate.contentColor=opt.contentColor||this.textTemplate.contentColor;var box=document.createElement("div"),_this=this;box.className=this.containerClass;box.innerHTML=this.getAlertTemplate();this.box=box;document.body.appendChild(this.box);var btn=document.getElementsByClassName("btn-footer-ok");btn[btn.length-1].focus();btn[btn.length-1].onclick=function(){if(opt.onConfirm){opt.onConfirm()}_this.removeBox()}},confirm:function(opt){this.textTemplate.title=opt.title||this.textTemplate.promptTitle;this.textTemplate.promptPlaceholder=opt.promptPlaceholder||this.textTemplate.promptPlaceholder;this.textTemplate.okBtn=opt.okBtn||this.textTemplate.promptOkBtn;this.textTemplate.okBtnColor=opt.okBtnColor||this.textTemplate.okBtnColor;this.textTemplate.cancelBtn=opt.cancelBtn||this.textTemplate.cancelBtn;this.textTemplate.cancelBtnColor=opt.cancelBtnColor||this.textTemplate.cancelBtnColor;this.textTemplate.content=opt.content||this.textTemplate.content;var box=document.createElement("div"),_this=this;this.box=box;box.className=this.containerClass;box.innerHTML=this.getConfirmTemplate();document.body.appendChild(box);var okBtn=document.getElementsByClassName("btn-footer-ok");okBtn[okBtn.length-1].focus();okBtn[okBtn.length-1].onclick=function(){if(opt.onConfirm){opt.onConfirm()}_this.removeBox()};var cancelBtn=document.getElementsByClassName("btn-footer-cancel");cancelBtn[cancelBtn.length-1].onclick=function(){if(opt.onCancel){opt.onCancel()}_this.removeBox()}},prompt:function(opt){this.textTemplate.title=opt.title||this.textTemplate.title;this.textTemplate.content=opt.content||this.textTemplate.content;this.textTemplate.contentColor=opt.contentColor||this.textTemplate.contentColor;this.textTemplate.okBtn=opt.okBtn||this.textTemplate.okBtn;this.textTemplate.okBtnColor=opt.okBtnColor||this.textTemplate.okBtnColor;this.textTemplate.cancelBtn=opt.cancelBtn||this.textTemplate.cancelBtn;this.textTemplate.cancelBtnColor=opt.cancelBtnColor||this.textTemplate.cancelBtnColor;var box=document.createElement("div"),_this=this;box.className=this.containerClass;box.innerHTML=this.getPromptTemplate();this.box=box;document.body.appendChild(box);var promptInput=document.getElementsByClassName("postbird-prompt-input");
promptInput=promptInput[promptInput.length-1];promptInput.focus();var okBtn=document.getElementsByClassName("btn-footer-ok");var inputData=promptInput.value;okBtn[okBtn.length-1].focus();okBtn[okBtn.length-1].onclick=function(){if(opt.onConfirm){opt.onConfirm(promptInput.value)}_this.removeBox()};var cancelBtn=document.getElementsByClassName("btn-footer-cancel");cancelBtn[cancelBtn.length-1].onclick=function(){if(opt.onCancel){opt.onCancel(promptInput.value)}_this.removeBox()}},colse:function(){this.removeBox()},removeBox:function(){var box=document.getElementsByClassName(this.containerClass);document.body.removeChild(box[box.length-1])}};
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
    // 第三个参数传入string(1,2,3,4),表示清晰度 流畅_550p(rate:1) 高清_1200p(rate:2) 超清_2000p(rate:3) 蓝光4M_4000p(rate:4) 填写777则返回默认清晰度
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
                    if (qn == "777") {
                        // qn写777则不返回清晰度，即默认
                        realLive = "https://tx2play1.douyucdn.cn/live/" + result + ".flv?uuid=";
                    } else {
                        realLive = "https://tx2play1.douyucdn.cn/live/" + result + "_" + cl + ".flv?uuid=";
                    }
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
    let sc = document.createElement("script");
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
function getRealLive_Huya(url, qn, reallive_callback) {
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
    GM_xmlhttpRequest({
        method: 'GET',
        headers: {
            'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        },
        url: url,
        responseType: 'blob',
        onload: resp=>{
            let msg = "";
            let ret = resp.responseText;
            let liveUrl = /\<script\>\s*var liveLineUrl = "(.+)";\s*\<\/script\>/.exec(ret);
            if (liveUrl == null) {
                msg = "房间暂未开播";
            } else {
                liveUrl = liveUrl[1];
                liveUrl = liveUrl.replace(/(_\d+)(.m3u8)/, '$2');
                liveUrl = "https:" + liveUrl;
                liveUrl = liveUrl + "&ratio=" + qn_data;
                liveUrl = String(liveUrl).replace("m3u8", "flv");
            }
            reallive_callback(liveUrl, msg);
        }
    })
}
/*
    Style Hook
    用于替换页面的原样式
    By 小淳
*/
function StyleHook_set(styleName, styleText) {
    // styleName：样式id名，建议以Ex_Style_大驼峰的形式命名
    if (document.getElementById(styleName) == null) {
        let styleElement = document.createElement("style");
        styleElement.id = styleName;
        styleElement.innerHTML = styleText;
        document.body.append(styleElement);
    }
}

function StyleHook_remove(styleName) {
    let e = document.getElementById(styleName);
    if (e !== null) {
        document.getElementById(styleName).remove();
    }
}
/*
   DouyuEx WebSocket
    By: 小淳
    此处为一些公共函数
*/

function WebSocket_Packet(str) {
    const MSG_TYPE = 689;
    let bytesArr = stringToByte(str);   
    let buffer = new Uint8Array(bytesArr.length + 4 + 4 + 2 + 1 + 1 + 1);
    let p_content = new Uint8Array(bytesArr.length); // 消息内容
    for (let i = 0; i < p_content.length; i++) {
        p_content[i] = bytesArr[i];
    }
    let p_length = new Uint32Array([bytesArr.length + 4 + 2 + 1 + 1 + 1]); // 消息长度
    let p_type = new Uint32Array([MSG_TYPE]); // 消息类型

    buffer.set(new Uint8Array(p_length.buffer), 0);
    buffer.set(new Uint8Array(p_length.buffer), 4);
    buffer.set(new Uint8Array(p_type.buffer), 8);
    buffer.set(p_content, 12);

    return buffer;
}

function stringToByte(str) {  
    let bytes = new Array();  
    let len, c;  
    len = str.length;  
    for(let i = 0; i < len; i++) {  
        c = String(str).charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  
}

function byteToString(arr) {
    if(typeof arr === 'string') {
        return arr;
    }
    let str = '',
        _arr = arr;
    for(let i = 0; i < _arr.length; i++) {
        let one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8) {
            let bytesLength = v[0].length;
            let store = _arr[i].toString(2).slice(7 - bytesLength);
            for(let st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
return str;
}


function hex2bin(e) {
    if ("string" === typeof e && e.length % 8 === 0) {
        for (let r = [], t = e.length, o = 0; o < t;) r.push(e.substr(o, 2)), o += 2;
        for (let n = [], i = r.length, s = 0; s < i;) n.push(parseInt(r.slice(s, s + 4).reverse().join(""), 16)), s += 4;
        return n
    }
    return null
}

function hex(e) {
    if (Array.isArray(e)) {
        let r = "0123456789abcdef".split("");
        return e.map(function (e) {
            for (let t = "", o = 0; o < 4; o++) t += r[e >> 8 * o + 4 & 15] + r[e >> 8 * o & 15];
            return t
        }).join("")
    }
    return ""
}

/*
   DouyuEx WebSocket UnLogin
    By: 小淳
*/
class Ex_WebSocket_UnLogin {
    // 调用方法：
    // 连接：let a = new Ex_WebSocket_UnLogin("房间号", 消息回调函数);
    // 关闭连接: a.WebSocket_Close(); a = null; 记得null掉变量再重新连接
    // 消息回调函数建议用箭头函数，示例：(msg) => {// TODO}
    constructor(rid, callback) {
        if ("WebSocket" in window) {
            this.timer = 0;
            this.roomid = rid;
            this.ws = new WebSocket("wss://danmuproxy.douyu.com:850" + String(getRandom(2,5))); // 负载均衡 8502~8504都可以用
            this.ws.onopen = () => {
                this.ws.send(WebSocket_Packet("type@=loginreq/roomid@=" + rid));
                this.ws.send(WebSocket_Packet("type@=joingroup/rid@=" + rid + "/gid@=-9999/"));
                this.timer = setInterval(() => {
                    this.ws.send(WebSocket_Packet("type@=mrkl/"));
                }, 40000)
                // console.log("WebSocket已连接");
            };
            this.ws.onmessage = (e) => { 
                let reader = new FileReader();
                reader.onload = () => {
                    let arr = String(reader.result).split("type@="); // 分包
                    reader = null;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].length > 12) {
                            // 过滤第一条和心跳包
                            callback("type@=" + arr[i]);
                        }
                    }
                };
                reader.readAsText(e.data);
            };
            this.ws.onclose = () => { 
                showMessage("服务器连接丢失，请尝试刷新页面", "error");
                console.log("服务器连接丢失");
            };
        }
    }
    close() {
        clearInterval(this.timer);
        this.ws.close();
    }
}
function initRouter(href) {
    if (String(href).indexOf("msg.douyu.com") != -1) {
        initRouter_Motorcade();
	} else {
        if (String(href).indexOf("exid=chun") != -1) {
            initRouter_DouyuRoom_Popup();
        } else {
            initRouter_DouyuRoom_Main();
        }
	}
}

function initRouter_Motorcade() {
    // 车队
    if (getQueryString("exid") == "chun") {
        signMotorcade_Sign();
    }
}

function initRouter_DouyuRoom_Popup() {
    // 画中画
    let intID = setInterval(() => {
        if (typeof(document.querySelector('div.wfs-2a8e83')) != "undefined") {
            document.querySelector('div.wfs-2a8e83').click();
            document.querySelector('label.layout-Player-asidetoggleButton').click();
            let l = document.querySelectorAll(".tip-e3420a > ul > li").length;
            document.querySelectorAll(".tip-e3420a > ul > li")[l - 1].click();
            clearInterval(intID);
        }
    }, 1000);
}


function initRouter_DouyuRoom_Main() {
    // 主要
    init();
    let intID = setInterval(() => {
        if (typeof(document.getElementsByClassName("BackpackButton")[0]) != "undefined") {
            setTimeout(() => {
                initStyles();
                initPkg();
                initPkgSpecial();
                initTimer();
            }, 1500)
            clearInterval(intID);
        }
    }, 1000);
}

function initPkgSpecial() {
    if (rid == "5189167") {
        initPkg_Point();
    }
}

// function initRouter_Novel() {
//     startWatchNovel();
// }
