"use strict";
// ==UserScript==
// @name         DouyuEx-斗鱼直播间增强插件
// @namespace    https://github.com/qianjiachun
// @icon         https://s2.ax1x.com/2020/01/12/loQI3V.png
// @version      2021.06.08.01
// @description  弹幕自动变色防检测循环发送 一键续牌 查看真实人数/查看主播数据 已播时长 一键签到(直播间/车队/鱼吧/客户端) 一键领取鱼粮(宝箱/气泡/任务) 一键寻宝 送出指定数量的礼物 一键清空背包 屏蔽广告 调节弹幕大小 自动更新 同屏画中画/多直播间小窗观看/可在斗鱼看多个平台直播(虎牙/b站) 获取真实直播流地址 自动抢礼物红包 背包信息扩展 简洁模式 夜间模式 开播提醒 幻神模式 关键词回复 关键词禁言 自动谢礼物 自动抢宝箱 弹幕右键信息扩展 防止下播自动跳转 影院模式 直播时间流控制 弹幕投票 直播滤镜 直播音频流 账号多开/切换 显示粉丝牌获取日期 月消费数据显示 弹幕时速 相机截图录制gif
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
// @match        *://www.douyu.com/member/cp/getFansBadgeList
// @match        *://passport.douyu.com/*
// @match        *://msg.douyu.com/*
// @match        *://yuba.douyu.com/*
// @match        *://v.douyu.com/*
// @match        *://cz.douyu.com/*
// @require      https://cdn.jsdelivr.net/npm/flv.js@1.5.0/dist/flv.min.js
// @require      https://cdn.jsdelivr.net/npm/svgaplayerweb@2.3.1/build/svga.min.js
// @require      https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.min.js
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_cookie
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @connect      douyucdn.cn
// @connect      douyu.com
// @connect      122.51.5.63
// @connect      qq.com
// @connect      ddocr.com
// @connect      douyuex.com
// @connect      bojianger.com
// @connect      greasyfork.org
// @connect      bilibili.com
// @connect      huya.com
// @connect      jsdelivr.net
// @connect      shadiao.app
// @connect      fz996.com
// @connect      toubang.tv
// @connect      doseeing.com
// ==/UserScript==
function init() {
	initPkg_Night_Set_Fast();
	removeAD();
	initPkg_Statistics();
	initPkg_Console();
	initPkg_Menu();
	initPkg_FollowList();
}
function initPkg() {
	Update_checkVersion();
	initPkg_Night();
	initPkg_ExIcon();
	initPkg_ExPanel();
	initPkg_RealAudience();
	initPkg_CopyRealLive();
	initPkg_AudioLine();
	initPkg_RemoveAD();
	initPkg_BagInfo();
	initPkg_Update();
	initPkg_MiniProgram();
	initPkg_PopupPlayer();
	initPkg_LiveTool();
	initPkg_VideoTools();
	initPkg_ExpandTool();
	initPkg_Refresh();
	initPkg_BarrageLoop();
	initPkg_FansContinue();
	initPkg_FishFood();
	initPkg_Sign();
	initPkg_BarragePanel();
	initPkg_AdVideo();
	initPkg_AccountList();
	initPkg_ChatTools();
	initPkg_MonthCost();
}
function initPkg_Timer() {
	initPkg_FishPond_Timer();
}
function initTimer() {
	initPkg_Timer();
	exTimer = setInterval(initPkg_Timer, 30000);
}

function initStyles() {
	let style = document.createElement("style");
	style.appendChild(document.createTextNode(`
#ex-accountList-wrap {    left: -152px;    top: -16px;    /* max-height: 330px;    overflow-y: scroll;    scrollbar-width: none;    -ms-overflow-style: none; */    -webkit-transition: all .2s cubic-bezier(.22,.58,.12,.98);    -o-transition: all cubic-bezier(.22,.58,.12,.98) .2s;    -moz-transition: all cubic-bezier(.22,.58,.12,.98) .2s;    transition: all .2s cubic-bezier(.22,.58,.12,.98);    -webkit-transform-origin: 80% 0;    -moz-transform-origin: 80% 0;    -ms-transform-origin: 80% 0;    -o-transform-origin: 80% 0;    transform-origin: 80% 0;    -webkit-animation: scale-in-ease .5s cubic-bezier(.22,.58,.12,.98);    -moz-animation: scale-in-ease cubic-bezier(.22,.58,.12,.98) .5s;    -o-animation: scale-in-ease cubic-bezier(.22,.58,.12,.98) .5s;    animation: scale-in-ease .5s cubic-bezier(.22,.58,.12,.98);}/* #ex-accountList-wrap::-webkit-scrollbar {    display: none;} */.ex-accountList-item {    padding: 10px;    display: flex;    border-radius: 10px;    align-items: center;}.ex-accountList-item:hover {    background-color: rgb(244,244,244);}#ex-accountList-iframe {    display: none;}#ex-accountList-iframe2 {    display: none;}#ex-accountList-item-add {    padding: 10px;    text-align: center;    margin-bottom:0px;    border-radius: 10px;}#ex-accountList-item-add:hover {    background-color: rgb(244,244,244);}.ex-accountList-item__imgWrap {    flex: 0 0 25%;}.ex-accountList-item__img {    width: 50px;    height: 50px;    border-radius: 50%;}.ex-accountList-item__name {    line-height: 50px;    flex: 0 0 55%;}.ex-accountList-item__btn {    height: 30px;    width: 50px;    border-radius: 10px;    align-items: center;    flex: auto;    text-align: center;    line-height: 28px;    color: white;    background-color: rgb(245,108,108);}.ex-accountList-item__btn:hover {    background-color: rgb(247,137,137);}#ex-audio-line {    cursor: pointer;}.bag-info {    position: absolute;    background-color: rgba(0, 0, 0, 0.6);    color: white;    width: 20px;    font-weight: 800;    height: 20px;    text-align: center;}.bag-button {    position: relative;    color: rgb(255, 255, 255);    text-align: center;    height: 15px;    line-height: 15px;    cursor: pointer;    margin-left: 5px;    background: rgb(70, 171, 255);    border-radius: 9px;    padding: 0px 10px;    float: right;    right: 20px;}.bloop {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 200px;	position: relative;	bottom: 200px;	display: none;	z-index: 1015;}.bloop__switch {	position: absolute;	right: 0;	bottom: 0;}.bloop__mode {	display: inline-block;}.barragePanel__funcPanel {    position: absolute;    width: 232px;    height: 270px;    display: block;    background: white;    overflow-y: scroll;}.barragePanel__funcPanel::-webkit-scrollbar {display:none}.barragePanel__muteTime {    position: absolute;    left: 25px;    top: 123px;    z-index: 5;}#copy-real-live {    cursor: pointer;}.ex-icon {	display: inline-block;	vertical-align: middle;	margin-right: 8px;	-moz-user-select:none; /*火狐*/    -webkit-user-select:none; /*webkit浏览器*/    -ms-user-select:none; /*IE10*/    -khtml-user-select:none; /*早期浏览器*/    user-select:none;}.extool {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 200px;	position: relative;	bottom: 200px;	display: none;	z-index: 1015;}.extool__switch {	position: absolute;	right: 0;	bottom: 0;}.extool__bsize,.extool__sendgift {	margin-bottom: 5px;}.extool__redpacket_room,.extool__gold {	display: inline-block;}.ex_giftAnimation {	width: 100%;	height: 100%;	position: absolute;	z-index: 50;	pointer-events: none;}.ex-panel {	position: absolute;	bottom: 35px;	right: 38px;	background-color: rgba(255,255,255,0.9);	display: none;	border: 2px rgb(234,173,26) solid;	z-index: 1015;	user-select: none;}.ex-panel__wrap {	display: flex;	align-items: center;	justify-content: center;	width: 100%;	height: 100%;}.ex-panel__icon {	margin: 0 10px;	display: block;	position: relative;	padding: 5px;	transition: 0.5s;}.ex-panel__icon:hover {	transform: scale(1.15);}.ex-panel__tip {	display:none;	background:#f00;	border-radius:50%;	width:8px;	height:8px;	top:0px;	right:0px;	position:absolute;}#refreshFollowList {    color: grey;position: absolute;right: 5px;top:0px;cursor: default;}.barrageSpeed {    position: absolute;    right: 10px;    top: -20px;    color: rgba(0,0,0,0.5);    cursor: default;    z-index: 0;}.enter__panel {    width: 100%;    display: none;    margin-top: 4px;}#enter__title {    cursor: pointer;}#enter__select {    width: 190px;}.enter__option {    margin-top: 5px;}#enter__enterId {    width: 40px;}#enter__reply {    width: 150px;}#enter__word {    width: 140px;}#enter__level {    width: 25px;    text-align: center;}.gift__panel {    width: 100%;    display: none;    margin-top: 4px;}#gift__title {    cursor: pointer;}#gift__select {    width: 190px;}.gift__option {    margin-top: 5px;}#gift__giftId {    width: 40px;}#gift__reply {    width: 150px;}.livetool {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 290px;	position: relative;	bottom: 290px;	display: none;	z-index: 1015;}.livetool__cell {	position: relative;    display: -webkit-box;    display: -webkit-flex;    display: flex;    box-sizing: border-box;    width: 100%;    padding: 10px 16px;    overflow: hidden;    color: #323233;    font-size: 14px;    line-height: 24px;	background-color: #fff;	border-bottom: 1px solid rgba(0,0,0,0.2);	flex-wrap: wrap;    -webkit-flex-wrap: wrap;}.livetool__cell_title {	flex: 1;    -webkit-box-flex: 1;}.livetool__cell_option {	flex: 1;	-webkit-box-flex: 1;	text-align: right;}.livetool__cell_switch {	float: right;}.mute__panel {    width: 100%;    display: none;    margin-top: 4px;}#mute__title {    cursor: pointer;}#mute__idlist {    cursor: pointer;    color: royalblue;    margin-left: 10px;}#mute__select {    width: 110px;}.mute__option {    margin-top: 5px;}#mute__word {    width: 70px;}#mute__count {    width: 30px;}#mute__time {    width: 65px;}.reply__panel {    width: 100%;    display: none;    margin-top: 4px;}#reply__title {    cursor: pointer;}#reply__select {    /* width: 190px; */    width: 100px;}#reply__time {    width: 35px;}.reply__option {    margin-top: 5px;}#reply__word {    width: 70px;}#reply__reply {    width: 147px;}.livetool__Treasure {    width: 100%;    position: relative;    z-index: 999;}.vote__panel {    width: 100%;    display: none;    margin-top: 4px;}#vote__title {    cursor: pointer;}#vote__select {    width: 100px;}.vote__option {    margin-top: 5px;}#vote__theme {    width: 70px;}#vote__options {    width: 133px;}#vote__time {    width: 35px;}#vote__show-result {    cursor: pointer;    color: royalblue;    margin-left: 10px;}.vote__result {    position: absolute;    top: 0px;    width: 300px;    background: rgba(255,255,255,0.85);    left: 0px;    z-index: 999;    padding: 5px;    border-radius: 10px;    user-select: none;    display: none;}#vote__result-theme {    font-size: 20px;    font-weight: 600;    margin-bottom: 10px;}#vote__result-close {    position: absolute;    top: 5px;    right: 10px;    font-size: 14px;    cursor: pointer;    color: gray;}.vote__option-wrap {    margin-bottom: 10px;}.vote__option-choice {    display: inline-block;    font-size: 14px;}.vote__option-num {    float: right;    font-size: 14px;}.vote__progress {    width: 100%;    background-color: #ddd;    border-radius: 10px;}.vote__progress-bar {    width: 0%;    height: 14px;    background-color: #4CAF50;    text-align: center;    line-height: 30px;    border-radius: 10px;}.miniprogram__panel {    position: absolute;    right: 43px;    bottom: 100px;    animation: move-in 0.75s;    z-index: 101;    text-align: center;    display: none;}.miniprogram__wrap {    overflow: hidden;    background-color: white;    border-radius: 5%;    width: 200px;    box-shadow: 0px 2px 20px 0px #888888;    font-size: 14px;}.miniprogram__triangle {    width: 0px;    height: 0px;    border-color: white transparent transparent transparent;    border-style: solid;    border-width: 10px;    position: absolute;    left: 100px;}.month-cost {    margin-right: 5px;    cursor: default;    -moz-user-select:none;/*火狐*/    -webkit-user-select:none;/*webkit浏览器*/    -ms-user-select:none;/*IE10*/    -khtml-user-select:none;/*早期浏览器*/    user-select:none;}.monthcost__icon {    position: relative;    top: 3px;    cursor: pointer;    margin-left: 3px;}#ex-point {    cursor: pointer;    float: left;    line-height: 30px;    -moz-user-select:none; /*火狐*/    -webkit-user-select:none; /*webkit浏览器*/    -ms-user-select:none; /*IE10*/    -khtml-user-select:none; /*早期浏览器*/    user-select:none;}#point__value {    color: #333;}#ex-exchange {    position: absolute;    left: 0;    bottom: 37px;    z-index: 100;}.exchange__panel {    width: 400px;    height: 500px;    position: relative;}.exchange__wrap {    width: 400px;    height: 500px;    background-color: white;    border-radius: 3%;    overflow-y: scroll;    overflow-x: hidden;    box-shadow: 0px 0px 20px 0px #888888;}.exchange__wrap::-webkit-scrollbar {    display:none}.exchange__close {    position: absolute;    color: rgb(127, 127, 137);    right: 10px;    top: 5px;    font-size: 15px;    cursor: pointer;    z-index: 101;}.item__wrap {    width: 100%;    height: 130px;    border-bottom: 1px solid rgba(121,127,137,0.4);    position: relative;}.item__pic {    left: 10px;    top: 10px;    position: absolute;    height: 110px;    width: 110px;}.item__name {    position: absolute;    top: 7px;    left: 130px;    color: #353536;;    font-size: 15px;    margin-right: 10px;}.item__description {    position: absolute;    top: 32px;    left: 130px;    font-size: 12px;    margin-right: 10px;    color: #969799;}.item__num {    position: absolute;    bottom: 27px;    left: 130px;    font-size: 12px;    color: #969799;}.item__price {    position: absolute;    bottom: 7px;    left: 130px;    font-size: 14px;    color: rgb(255,93,35);    font-weight: 600;}.item__exchange {    position: absolute;    bottom: 8px;    right: 10px;    font-size: 14px;    color: white;    text-align: center;    width: 80px;    height: 25px;        background-color: rgb(255,93,35);    border-radius: 999px;    cursor: pointer;}#ex-pointlist {    position: absolute;    width: 300px;    height: 400px;    background-color: white;    border-radius: 3%;    overflow: auto;    z-index: 100;    bottom: 37px;}#ex-pointlist::-webkit-scrollbar {    display:none}.pointlist__wrap {    width: 100%;    height: 100%;    margin: 15px 0;    position: absolute;}.pointlist__close {    position: absolute;    color: rgb(127, 127, 137);    right: 7px;    font-size: 15px;    cursor: pointer;}.pointlist__wrap table {    border-collapse: collapse;    margin: 0 auto;    text-align: center;}.pointlist__wrap td,.pointlist__wrap th {    border: 1px solid #cad9ea;    color: #666;    height: 30px;    width: 85px;}.pointlist__wrap thead th {    background-color: #CCE8EB;    width: 100px;}.pointlist__wrap tr:nth-child(odd) {    background: #fff;}.pointlist__wrap tr:nth-child(even) {    background: #F5FAFA;}.point__panel {    position: absolute;    left: 0px;    bottom: 37px;    display: none;    animation: move-in 0.75s;    z-index: 101;}@keyframes move-in {    0% {        opacity: 0;    }    100% {        opacity: 0.95;    }}.panel__wrap {    overflow: hidden;    background-color: white;    border-radius: 5%;    width: 120px;    box-shadow: 0px 2px 20px 0px #888888;    font-size: 14px;}.panel__cell {    width: 100%;    height: 37px;    line-height: 37px;    border-bottom: 1px solid rgba(121,127,137,0.4);    text-align: center;    cursor: pointer;}.panel__cell:hover {    background-color: rgb(217, 217, 217);    transition: 0.75s;}.panel__triangle {    width: 0px;    height: 0px;    border-color: white transparent transparent transparent;    border-style: solid;    border-width: 10px;    position: absolute;    left: 35px;}#ex-record {    width: 300px;    height: 400px;    position: absolute;    bottom: 67px;    z-index: 100;}.record__close {    position: absolute;    color: rgb(127, 127, 137);    right: -20px;    font-size: 15px;    cursor: pointer;}.records__wrap {    width: 100%;    height: 100%;    background-color: white;    border-radius: 3%;    box-shadow: 0px 0px 20px 0px #888888;    padding: 15px;    overflow-y: scroll;    overflow-x: hidden;}.records__wrap::-webkit-scrollbar {    display:none}.record__wrap {    height: 50px;    width: 100%;    border: 1px solid rgba(121,127,137,0.4);    margin-bottom: 10px;    display: -webkit-box;    display: -moz-box;     display: -ms-flexbox;    display: -webkit-flex;     display: flex;     transition: 0.75s;    cursor: pointer;}.record__wrap:hover {    background-color: #e9f5ff;}.record__left {    flex: 1;    position: relative;}.record__name {    position: absolute;    flex: 1;    color: #353536;;    font-size: 15px;    top: 2px;    margin-left: 5px;}.record__updatetime {    position: absolute;    margin-left: 5px;    font-size: 12px;    bottom: 2px;    color: #969799;}.record__price {    line-height: 50px;    color: rgb(255,93,35);    margin-right: 10px;}.record__pagenav {    display: -webkit-box;    display: -moz-box;     display: -ms-flexbox;    display: -webkit-flex;     display: flex;     width: 310px;    position: absolute;    bottom: -20px;    padding-left: 10px;    padding-right: 10px;    cursor: pointer;}.record__prev {    flex: 1;    text-align: center;    border: 1px solid rgba(121,127,137,0.8);    transition: 0.75s;    color: white;    background-color: rgb(57,169,237);}.record__prev:hover {    background-color: #7167ff;}.record__next {    flex: 1;    text-align: center;    border: 1px solid rgba(121,127,137,0.8);    transition: 0.75s;    background-color: rgb(57,169,237);    color: white;}.record__next:hover {    background-color: #7167ff;}.exVideoDiv {    width: 400px;    height: 200px;    background-color: rgba(255, 255, 255, 0);    position: absolute;    z-index: 1015;}.exVideoPlayer {    width: 100%;    height: 100%;    cursor: move;}.exVideoScale {    width: 10px;    height: 10px;    overflow: hidden;    cursor: se-resize;    position: absolute;    right: 0;    bottom: 0;    background-color: rgb(231, 57, 57);}.exVideoInfo {    width: 100%;    height: 30px;    background-color: gray;    position: absolute;    top: -30px;    line-height: 30px;}.exVideoClose {    width: 30px;    float: right;    color: white;}.exVideoQn, .exVideoCDN {    margin-left: 5px;}.exVideoRID {    margin: 0px 5px;    font-weight: 800;    font-size: medium;}#popup-player__prompt {    display: none;}.real-audience {    cursor: pointer;    display: flex;    padding: 0 7px;    line-height: 33px;}#refresh-video {    float: left;    width: 24px;    height: 24px;    margin-right: 5px;    cursor: pointer;    background-size: contain;}#refresh-video2 {    display: none;    position: absolute;    top: 20px;    right: 20px;    cursor: pointer;}#refresh-video2-svg {    fill: rgba(0,0,0,.6)}.refresh-barrage {    display: inline-block;    vertical-align: top;    margin: 0 2px;    padding: 0 8px;    height: 22px;    line-height: 21px;    background-color: #fff;    border: 1px solid #e5e4e4;    -webkit-border-radius: 4px;    -moz-border-radius: 4px;    border-radius: 4px;    cursor: pointer;}#refresh-barrage__svg {    vertical-align: middle;}#ex-camera {    background: rgba(0,0,0,0.7);    position: absolute;    right: 20px;    bottom: 190px;    z-index: 10;    width: 60px;    height: 60px;    cursor: pointer;    -webkit-border-radius: 50%;    -moz-border-radius: 50%;    border-radius: 50%;    cursor: pointer;    display: none;    justify-content: center;    align-items: center;    border: 2px solid #2d2c2c;    box-sizing: border-box;}#ex-camera:hover > svg > path {    fill: rgb(252, 199, 84);}#ex-camera:active > svg > path {    fill: rgb(253, 60, 60);}#ex-cinema {    float: left;    width: 24px;    height: 24px;    margin-right: 10px;    cursor: pointer;    background-size: contain;}.cinema__wrap {    display: none;    position: relative;    height: 100%;    margin-right: -15px;    border-radius: 4px;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none;    float: left;    right: -12px;}.cinema__panel {    position: absolute;    border: 1px solid #000;    border-radius: 4px;    transform: translateY(calc(-4px - 100%)) translateX(-50%);    left: 33%;    background-color: #000;    opacity: .75;    width: 70px;}.cinema__panel li {    padding: 0 2px;    white-space: nowrap;    color: #fff;    text-align: center;    cursor: pointer;}.cinema__panel li:hover {    background-color: rgb(85, 85, 85);}  #ex-filter {    float: left;    width: 24px;    height: 24px;    margin-right: 10px;    cursor: pointer;    background-size: contain;}.filter__wrap {    display: none;    position: relative;    height: 100%;    margin-right: -15px;    border-radius: 4px;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none;    float: left;    right: -12px;}.filter__panel {    position: absolute;    border: 1px solid #000;    border-radius: 4px;    transform: translateY(calc(-4px - 100%)) translateX(-50%);    left: 33%;    background-color: #000;    opacity: .75;    width: 300px;    padding-top: 10px;    padding-left: 10px;    padding-right: 10px;}.filter__panel li {    padding: 0 2px;    white-space: nowrap;    color: #fff;    text-align: center;    cursor: pointer;}.filter__panel li:hover {    background-color: rgb(85, 85, 85);}.filter__scroll {    width: 255px;    height: 5px;    background: #ccc;    position: relative;    display: inline-block;}.filter__scroll-bar {    width: 15px;    height: 15px;    background: #369;    position: absolute;    top: -5px;    left: 100px;    cursor: pointer;    border-radius: 100%;}.filter__scroll-mask {    position: absolute;    left: 0;    top: 0;    background: #369;    width: 100px;    height: 5px;}.filter__title {    color: white;    display: inline-block;    cursor: initial;    margin-right: 2px;}#filter__select {    width: 260px;    float: right;}.filter__filter {    margin-top: 5px;}#ex-videospeed {    float: left;    width: 24px;    height: 24px;    margin-right: 10px;    cursor: pointer;    background-size: contain;}.videospeed__wrap {    display: none;    position: relative;    height: 100%;    margin-right: -15px;    border-radius: 4px;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none;    float: left;    right: -12px;}.videospeed__panel {    position: absolute;    border: 1px solid #000;    border-radius: 4px;    transform: translateY(calc(-4px - 100%)) translateX(-50%);    left: 33%;    background-color: #000;    opacity: .75;    width: 70px;}.videospeed__panel li {    padding: 0 2px;    white-space: nowrap;    color: #fff;    text-align: center;    cursor: pointer;}.videospeed__panel li:hover {    background-color: rgb(85, 85, 85);}  #ex-videosync {    float: left;    width: 24px;    height: 24px;    margin-left: 20px;    cursor: pointer;    background-size: contain;}/*    Notice.css*/.noticejs-top{top:0;width:100%!important}.noticejs-top .item{border-radius:0!important;margin:0!important}.noticejs-topRight{top:10px;right:10px}.noticejs-topLeft{top:10px;left:10px}.noticejs-topCenter{top:10px;left:50%;transform:translate(-50%)}.noticejs-middleLeft,.noticejs-middleRight{right:10px;top:50%;transform:translateY(-50%)}.noticejs-middleLeft{left:10px}.noticejs-middleCenter{top:50%;left:50%;transform:translate(-50%,-50%)}.noticejs-bottom{bottom:0;width:100%!important}.noticejs-bottom .item{border-radius:0!important;margin:0!important}.noticejs-bottomRight{bottom:10px;right:10px}.noticejs-bottomLeft{bottom:10px;left:10px}.noticejs-bottomCenter{bottom:10px;left:50%;transform:translate(-50%)}.noticejs{font-family:Helvetica Neue,Helvetica,Arial,sans-serif}.noticejs .item{margin:0 0 10px;border-radius:3px;overflow:hidden}.noticejs .item .close{float:right;font-size:18px;font-weight:700;line-height:1;color:#fff;text-shadow:0 1px 0 #fff;opacity:1;margin-right:7px}.noticejs .item .close:hover{opacity:.5;color:#000}.noticejs .item a{color:#fff;border-bottom:1px dashed #fff}.noticejs .item a,.noticejs .item a:hover{text-decoration:none}.noticejs .success{background-color:#64ce83}.noticejs .success .noticejs-heading{background-color:#3da95c;color:#fff;padding:10px}.noticejs .success .noticejs-body{color:#fff;padding:10px}.noticejs .success .noticejs-body:hover{visibility:visible!important}.noticejs .success .noticejs-content{visibility:visible}.noticejs .info{background-color:#3ea2ff}.noticejs .info .noticejs-heading{background-color:#067cea;color:#fff;padding:10px}.noticejs .info .noticejs-body{color:#fff;padding:10px}.noticejs .info .noticejs-body:hover{visibility:visible!important}.noticejs .info .noticejs-content{visibility:visible}.noticejs .warning{background-color:#ff7f48}.noticejs .warning .noticejs-heading{background-color:#f44e06;color:#fff;padding:10px}.noticejs .warning .noticejs-body{color:#fff;padding:10px}.noticejs .warning .noticejs-body:hover{visibility:visible!important}.noticejs .warning .noticejs-content{visibility:visible}.noticejs .error{background-color:#e74c3c}.noticejs .error .noticejs-heading{background-color:#ba2c1d;color:#fff;padding:10px}.noticejs .error .noticejs-body{color:#fff;padding:10px}.noticejs .error .noticejs-body:hover{visibility:visible!important}.noticejs .error .noticejs-content{visibility:visible}.noticejs .progressbar{width:100%}.noticejs .progressbar .bar{width:1%;height:30px;background-color:#4caf50}.noticejs .success .noticejs-progressbar{width:100%;background-color:#64ce83;margin-top:-1px}.noticejs .success .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#3da95c}.noticejs .info .noticejs-progressbar{width:100%;background-color:#3ea2ff;margin-top:-1px}.noticejs .info .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#067cea}.noticejs .warning .noticejs-progressbar{width:100%;background-color:#ff7f48;margin-top:-1px}.noticejs .warning .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#f44e06}.noticejs .error .noticejs-progressbar{width:100%;background-color:#e74c3c;margin-top:-1px}.noticejs .error .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#ba2c1d}@keyframes noticejs-fadeOut{0%{opacity:1}to{opacity:0}}.noticejs-fadeOut{animation-name:noticejs-fadeOut}@keyframes noticejs-modal-in{to{opacity:.3}}@keyframes noticejs-modal-out{to{opacity:0}}.noticejs-rtl .noticejs-heading{direction:rtl}.noticejs-rtl .close{float:left!important;margin-left:7px;margin-right:0!important}.noticejs-rtl .noticejs-content{direction:rtl}.noticejs{position:fixed;z-index:10050;width:320px}.noticejs ::-webkit-scrollbar{width:8px}.noticejs ::-webkit-scrollbar-button{width:8px;height:5px}.noticejs ::-webkit-scrollbar-track{border-radius:10px}.noticejs ::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.5);border-radius:10px}.noticejs ::-webkit-scrollbar-thumb:hover{background:#fff}.noticejs-modal{position:fixed;width:100%;height:100%;background-color:#000;z-index:10000;opacity:.3;left:0;top:0}.noticejs-modal-open{opacity:0;animation:noticejs-modal-in .3s ease-out}.noticejs-modal-close{animation:noticejs-modal-out .3s ease-out;animation-fill-mode:forwards}/** * PostbirdAlertBox.js * -    原生javascript弹框插件 * Author:  Postbird - http://www.ptbird.cn * License: MIT * Date:    2017-09-23 */.postbird-box-container {    width: 100%;    height: 100%;    overflow: hidden;    position: fixed;    top: 0;    left: 0;    z-index: 9999;    background-color: rgba(0, 0, 0, 0.2);    display: block;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none}.postbird-box-container.active {    display: block}.postbird-box-content {    min-width: 400px;    max-width: 600px;    min-height: 150px;    background-color: #fff;    border: solid 1px #dfdfdf;    position: absolute;    top: 50%;    left: 50%;    transform: translate(-50%, -50%);    margin-top: -100px}.postbird-box-header {    width: 100%;    padding: 10px 15px;    position: relative;    font-size: 1.1em;    letter-spacing: 2px}.postbird-box-close-btn {    cursor: pointer;    font-weight: 700;    color: #000;    float: right;    opacity: .5;    font-size: 1.3em;    margin-top: -3px;    display: none}.postbird-box-close-btn:hover {    opacity: 1}.postbird-box-text {    box-sizing: border-box;    width: 100%;    padding: 0 10%;    text-align: center;    line-height: 40px;    font-size: 20px;    letter-spacing: 1px}.postbird-box-footer {    width: 100%;    position: absolute;    padding: 0;    margin: 0;    bottom: 0;    display: flex;    display: -webkit-flex;    justify-content: space-around;    border-top: solid 1px #dfdfdf;    align-items: flex-end}.postbird-box-footer .btn-footer {    line-height: 44px;    border: 0;    cursor: pointer;    background-color: #fff;    color: #0e90d2;    font-size: 1.1em;    letter-spacing: 2px;    transition: background-color .5s;    -webkit-transition: background-color .5s;    -o-transition: background-color .5s;    -moz-transition: background-color .5s;    outline: 0}.postbird-box-footer .btn-footer:hover {    background-color: #e5e5e5}.postbird-box-footer .btn-block-footer {    width: 100%}.postbird-box-footer .btn-left-footer,.postbird-box-footer .btn-right-footer {    position: relative;    width: 100%}.postbird-box-footer .btn-left-footer::after {    content: "";    position: absolute;    right: 0;    top: 0;    background-color: #e5e5e5;    height: 100%;    width: 1px}.postbird-box-footer .btn-footer-cancel {    color: #333}.postbird-prompt-input {    width: 100%;    padding: 5px;    font-size: 16px;    border: 1px solid #ccc;    outline: 0}.onoffswitch {    position: relative; width: 45px;    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;}.onoffswitch-checkbox {    position: absolute;    opacity: 0;    pointer-events: none;}.onoffswitch-label {    display: block; overflow: hidden; cursor: pointer;    height: 20px; padding: 0; line-height: 20px;    border: 2px solid #E3E3E3; border-radius: 20px;    background-color: #FFFFFF;    transition: background-color 0.3s ease-in;}.onoffswitch-label:before {    content: "";    display: block; width: 20px; margin: 0px;    background: #FFFFFF;    position: absolute; top: 0; bottom: 0;    right: 23px;    border: 2px solid #E3E3E3; border-radius: 20px;    transition: all 0.3s ease-in 0s; }.onoffswitch-checkbox:checked + .onoffswitch-label {    background-color: #3AAD38;}.onoffswitch-checkbox:checked + .onoffswitch-label, .onoffswitch-checkbox:checked + .onoffswitch-label:before {   border-color: #3AAD38;}.onoffswitch-checkbox:checked + .onoffswitch-label:before {    right: 0px; }.layui-timeline {    padding-left: 5px;}.layui-timeline-item {    position: relative;    padding-bottom: 20px;}li {    list-style: none;}.layui-timeline-item:first-child::before {    display: block;}.layui-timeline-item:last-child::before {    content: '';    position: absolute;    left: 5px;    top: 0;    z-index: 0;    width: 0;    height: 100%;}.layui-timeline-item::before {    content: '';    position: absolute;    left: 5px;    top: 0;    z-index: 0;    width: 1px;    height: 100%;}.layui-timeline-item::before,hr {    background-color: #e6e6e6;}.layui-timeline-axis {    position: absolute;    left: -5px;    top: 0;    z-index: 10;    width: 20px;    height: 20px;    line-height: 20px;    background-color: #fff;    color: #5FB878;    border-radius: 50%;    text-align: center;    cursor: pointer;}.layui-icon {    font-family: layui-icon !important;    font-size: 16px;    font-style: normal;}.layui-timeline-content {    padding-left: 25px;}.layui-text {    line-height: 22px;    font-size: 14px;    color: rgb(85,85,85);}.layui-timeline-title {    position: relative;}
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

function formatSeconds2(value) {
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) {
		minuteTime = parseInt(secondTime / 60);
		secondTime = parseInt(secondTime % 60);
		if (minuteTime > 60) {
			hourTime = parseInt(minuteTime / 60);
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result ="" +(parseInt(secondTime) < 10? "0" + parseInt(secondTime): parseInt(secondTime));

	// if (minuteTime > 0) {
		result ="" + (parseInt(minuteTime) < 10? "0" + parseInt(minuteTime) : parseInt(minuteTime)) + ":" + result;
	// }
	// if (hourTime > 0) {
		result ="" + (parseInt(hourTime) < 10 ? "0" + parseInt(hourTime): parseInt(hourTime)) +":" + result;
	// }
	return result;
}

async function verifyFans(room_id, level) {
	return true; // 2020年12月22日18:28:18
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

function getCTN() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "acf_ccn=", ";");
	let ret = getCookieValue("acf_ctn");
	if (ret == null) {
		setCookie("acf_ctn", "1");
		ret = "1";
	}
	return ret;
}

function getCSRF() {
	let ret = getCookieValue("cvl_csrf_token");
	if (ret == null) {
		setCookie("cvl_csrf_token", "1");
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

function getTextareaPosition(element) {
	// 获取textarea光标的位置
    let cursorPos = 0;
    if (document.selection) {//IE
        let selectRange = document.selection.createRange();
        selectRange.moveStart('character', -element.value.length);
        cursorPos = selectRange.text.length;
    } else if (element.selectionStart || element.selectionStart == '0') {
        cursorPos = element.selectionStart;
    }
    return cursorPos;
}
let svg_accountList = `<svg t="1613993967937" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2122" width="16" height="16"><path d="M217.472 311.808l384.64 384.64-90.432 90.56-384.64-384.64z" fill="#8A8A8A" p-id="2123"></path><path d="M896.32 401.984l-384.64 384.64-90.56-90.496 384.64-384.64z" fill="#8A8A8A" p-id="2124"></path></svg>`
let cleanOverTimes = 0; // 用于判断是否全部清空并跳转
function initPkg_AccountList() {
    // GM_deleteValue("Ex_accountList");
    // GM_deleteValue("Ex_accountListPassport");
    // return;
    initPkg_AccountList_Dom();
    initPkg_AccountList_Func();
}

function initPkg_AccountList_Dom() {
    AccountList_insertIcon();
}

function AccountList_insertIcon() {
    let a = document.createElement("div");
    a.style = "position: absolute;right: -14px;top: 32px;cursor: pointer;"
    a.id = "ex-accountList-icon";
    let html = `
        <div id="ex-accountList-wrap" class="public-DropMenu-drop">
            <div class="public-DropMenu-drop-main">
                <div id="ex-accountList-iframe"></div>
                <div id="ex-accountList-iframe2"></div>
                <div id="ex-accountList-content" style="width: 300px;font-size: 14px;padding: 10px;">
                </div>
            </div>
            <i></i>
        </div>
    `;
    a.innerHTML = svg_accountList + html;
    // a.innerHTML = svg_accountList + `<div id="ex-accountList-wrap" class="public-DropMenu-drop"><div class="public-DropMenu-drop-main"><div style="width: 300px;font-size: 14px;"></div></div><i></i></div>`;
    // a.title = "账号列表";
    let b = document.getElementsByClassName("Header-right")[0];
    b.appendChild(a);

    addAccount();
}


function initPkg_AccountList_Func() {
    setPassportCmd("null", my_uid);
    unsafeWindow.addEventListener("message", (event) => {
        switch (event.data) {
            case "cleanOver":
                setTimeout(() => {
                    window.location.reload();
                }, 50);
                break;
            case "msgCleanOver":
                cleanOverTimes++;
                if (cleanOverTimes >= 5) {
                    cleanOverTimes = 0;
                    setTimeout(() => {
                        window.location.reload();
                    }, 50);
                }
                break;
            case "yubaCleanOver":
                cleanOverTimes++;
                if (cleanOverTimes >= 5) {
                    cleanOverTimes = 0;
                    setTimeout(() => {
                        window.location.reload();
                    }, 50);
                }
                break;
            case "videoCleanOver":
                cleanOverTimes++;
                if (cleanOverTimes >= 5) {
                    cleanOverTimes = 0;
                    setTimeout(() => {
                        window.location.reload();
                    }, 50);
                }
                break;
            case "czCleanOver":
                cleanOverTimes++;
                if (cleanOverTimes >= 5) {
                    cleanOverTimes = 0;
                    setTimeout(() => {
                        window.location.reload();
                    }, 50);
                }
                break;
            case "switchOver":
                cleanOverTimes++;
                if (cleanOverTimes >= 5) {
                    cleanOverTimes = 0;
                    setTimeout(() => {
                        window.location.reload();
                    }, 50);
                }
                break;
            case "deleteOver":
                renderAccountList();
                showMessage("【账号管理】删除完毕", "success");
                break;
            default:
                break;
        }
    })
    document.getElementById("ex-accountList-icon").addEventListener("mouseenter", () => {
        document.getElementById("ex-accountList-wrap").style.display = "block";
    });
    document.getElementById("ex-accountList-icon").addEventListener("mouseleave", () => {
        document.getElementById("ex-accountList-wrap").style.display = "none";
    });
}

function renderAccountList(obj) {
    document.getElementById("ex-accountList-content").innerHTML = getAccountListHtml(obj);
    let items = document.getElementsByClassName("ex-accountList-item");
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let uid = item.getAttribute("uid");
        item.addEventListener("click", () => {
            switchAccount(uid, () => {});
            setPassportCmd("switch", uid);
            setYubaAndMsgAndVideoClean();
        })
        item.getElementsByClassName("ex-accountList-item__btn")[0].addEventListener("click", (e) => {
            e.stopPropagation();
            showMessage("【账号管理】正在删除...", "info");
            deleteAccount(uid, () => {});
            setPassportCmd("delete", uid);
        })
    }

    document.getElementById("ex-accountList-item-add").addEventListener("click", () => {
        // 重新登录
        cleanCookie(() => {})
        setPassportCmd("clean", "null");
    });
}


function getAccountListHtml(object) {
    let obj = object == undefined ? JSON.parse(GM_getValue("Ex_accountList") || "{}") : object;
    let ret = "";
    for (const key in obj) {
        if (key == "null") {
            continue;
        }
        let item = obj[key];
        ret += `
        <div class="ex-accountList-item" uid="${item.uid}">
            <div class="ex-accountList-item__imgWrap">
                <img src=${decodeURIComponent(item.avatar) + "middle.jpg"} alt="" class="ex-accountList-item__img">
            </div>
            <div class="ex-accountList-item__name">${decodeURIComponent(item.nickname)}</div>
            <div class="ex-accountList-item__btn">删除</div>
        </div>`
    }

    ret += `
    <div id="ex-accountList-item-add">
        <svg t="1613995373702" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2832" width="32" height="32"><path d="M577.088 0H448.96v448.512H0v128h448.96V1024h128.128V576.512H1024v-128H577.088z" p-id="2833" fill="#8A8A8A"></path></svg>
    </div>
    `;
    return ret;
}

function switchAccount(uid, callback) {
    let list = JSON.parse(GM_getValue("Ex_accountList"));
    // let l = list[uid]["data"];
    let l = [];
    let delock = 0;
    GM_cookie("list", { path: "/" }, function(cookies) {
        for(let i = 0; i < cookies.length; i++){
            GM_cookie("delete", {name: cookies[i]["name"]}, function(error) {
                delock++;
                if (delock >= cookies.length) {
                    let addlock = 0;
                    for(let i = 0; i < l.length; i++){
                        GM_cookie("set", {
                            name: l[i]['name'], 
                            value: l[i]['value'], 
                            domain: l[i]['domain'], 
                            path: l[i]['path'], 
                            secure: l[i]['secure'], 
                            httpOnly: l[i]['httpOnly'], 
                            sameSite: l[i]['sameSite'], 
                            expirationDate: l[i]['expirationDate'], 
                            hostOnly: l[i]['hostOnly']
                        }, function(error) {
                            addlock++;
                            if (addlock >= l.length) {
                                callback();
                            };
                        });
                    }
                };
            });
        }
    });
};

function switchAccountPassport(uid, callback) {
    let list = JSON.parse(GM_getValue("Ex_accountListPassport"));
    // let l = Array(list.global).concat(list[uid]);
    let l = list[uid];
    let delock = 0;
    GM_cookie("list", { path: "/" }, function(cookies) {
        for(let i = 0; i < cookies.length; i++){
            GM_cookie("delete", {name: cookies[i]["name"]}, function(error) {
                delock++;
                if (delock >= cookies.length) {
                    let addlock = 0;
                    for(let i = 0; i < l.length; i++){
                        GM_cookie("set", {
                            name: l[i]['name'], 
                            value: l[i]['value'], 
                            domain: l[i]['domain'], 
                            path: l[i]['path'], 
                            secure: l[i]['secure'], 
                            httpOnly: l[i]['httpOnly'], 
                            sameSite: l[i]['sameSite'], 
                            expirationDate: l[i]['expirationDate'], 
                            hostOnly: l[i]['hostOnly']
                        }, function(error) {
                            addlock++;
                            if (addlock >= l.length) {
                                callback();
                            };
                        });
                    }
                };
            });
        }
    });
};
// function switchAccountPassport( callback) {
//     let l = JSON.parse(GM_getValue("Ex_accountListPassport"));
//     let delock = 0;
//     GM_cookie("list", { path: "/" }, function(cookies) {
//         for(let i = 0; i < cookies.length; i++){
//             GM_cookie("delete", {name: cookies[i]["name"]}, function(error) {
//                 delock++;
//                 if (delock >= cookies.length) {
//                     let addlock = 0;
//                     for(let i = 0; i < l.length; i++){
//                         GM_cookie("set", {
//                             name: l[i]['name'], 
//                             value: l[i]['value'], 
//                             domain: l[i]['domain'], 
//                             path: l[i]['path'], 
//                             secure: l[i]['secure'], 
//                             httpOnly: l[i]['httpOnly'], 
//                             sameSite: l[i]['sameSite'], 
//                             expirationDate: l[i]['expirationDate'], 
//                             hostOnly: l[i]['hostOnly']
//                         }, function(error) {
//                             addlock++;
//                             if (addlock >= l.length) {
//                                 callback();
//                             };
//                         });
//                     }
//                 };
//             });
//         }
//     });
// };

function addAccount() {
    let accountListData = JSON.parse(GM_getValue("Ex_accountList") || "{}");
    let item = {};
    let uid = "";
    GM_cookie("list", { path: "/" }, function(cookies) {
        let c = [];
        if (cookies == undefined) {
            document.getElementById("ex-accountList-content").innerHTML = "请升级Tampermonkey版本<br/><a href='https://www.crx4chrome.com/crx/1429/'>点我升级，选择Crx4Chrome</a>";
            return;
        }
        for(let i = 0; i < cookies.length; i++) {
            let name = cookies[i]["name"];
            let value = cookies[i]["value"];
            if (name == "acf_nickname") {
                item.nickname = value;
            }
            if (name == "acf_uid") {
                item.uid = value;
                uid = value;
            }
            if (name == "acf_avatar") {
                item.avatar = value;
            }
            c.push(cookies[i]);
        }
        if (uid == "") {
            item.uid = "null";
            uid = "null";
        }
        item.data = c;
        item.update_time = String(new Date().getTime());
        accountListData[uid] = item;
        GM_setValue("Ex_accountList", JSON.stringify(accountListData));
        renderAccountList(accountListData);
    });
};


function addAccountPassport(uid) {
    let accountListData = JSON.parse(GM_getValue("Ex_accountListPassport") || "{}");
    let private_arr = [];
    let global_arr = [];
    GM_cookie("list", { path: "/" }, function(cookies) {
        if (cookies == undefined) {
            return;
        }
        for(let i = 0; i < cookies.length; i++) {
            if (cookies[i]["name"] == "LTP0") {
                private_arr.push(cookies[i]);
            } else {
                global_arr.push(cookies[i]);
            }
        }
        if (uid == "") {
            uid = "null";
        }
        accountListData.global = null;
        accountListData.global = global_arr;
        accountListData[uid] = private_arr;
        accountListData.update_time = String(new Date().getTime());
        GM_setValue("Ex_accountListPassport", JSON.stringify(accountListData));
    });
};

// function addAccountPassport() {
//     GM_cookie("list", { path: "/" }, function(cookies) {
//         let c = [];
//         for(let i = 0; i < cookies.length; i++) {
//             c.push(cookies[i]);
//         }
//         GM_setValue("Ex_accountListPassport", JSON.stringify(c));
//     });
// };



function cleanCookie(callback) {
    let lock = 0;
    GM_cookie("list", {
        path: "/"
    }, (cookies) => {
        if (cookies) {
            for (let i = 0; i < cookies.length; i++) {
                GM_cookie("delete", {
                    name: cookies[i]["name"]
                }, function (error) {
                    lock++;
                    if (lock >= cookies.length){
                        callback();
                    }
                });
            }
        } else {
            callback();
        }
    });
}

function setPassportCmd(cmd, uid) {
    document.getElementById("ex-accountList-iframe").innerHTML = `
    <iframe id="login-passport-frame" width="100%" height="100%" scrolling="no" frameborder="0" src="https://passport.douyu.com/index/error/show404?&exid=chun&cmd=${cmd}&uid=${uid}&domain=${encodeURIComponent(window.location.href)}&"></iframe>
    `;
}

function setYubaAndMsgAndVideoClean() {
    document.getElementById("ex-accountList-iframe2").innerHTML = `
    <iframe id="ex-yuba-iframe" width="100%" height="100%" scrolling="no" frameborder="0" src="https://yuba.douyu.com/iframe/tab/6416853?exClean&domain=${encodeURIComponent(window.location.href)}&"></iframe>
    <iframe id="ex-msg-iframe" width="100%" height="100%" scrolling="no" frameborder="0" src="https://msg.douyu.com/web/index.html?exClean&domain=${encodeURIComponent(window.location.href)}&"></iframe>
    <iframe id="ex-video-iframe" width="100%" height="100%" scrolling="no" frameborder="0" src="https://v.douyu.com/show/0?exClean&domain=${encodeURIComponent(window.location.href)}&"></iframe>
    <iframe id="ex-cz-iframe" width="100%" height="100%" scrolling="no" frameborder="0" src="https://cz.douyu.com/item/gold?exClean&domain=${encodeURIComponent(window.location.href)}&"></iframe>
    `
}
function deleteAccount(uid, callback) {
    let obj = JSON.parse(GM_getValue("Ex_accountList") || "{}");
    delete obj[uid];
    GM_setValue("Ex_accountList", JSON.stringify(obj));
    callback();
}

function deleteAccountPassport(uid, callback) {
    let obj = JSON.parse(GM_getValue("Ex_accountListPassport") || "{}");
    delete obj[uid];
    GM_setValue("Ex_accountListPassport", JSON.stringify(obj));
    callback();
}
function initPkg_AdVideo() {
    initPkg_Sign_Ad_FishPond();
}
function initPkg_AdVideo_Xiaoxiaole() {
	startGetXiaoxiaoleFishBall();
}
async function startGetXiaoxiaoleFishBall() {
    let status = await getXiaoxiaoleStatus();
    if (status.error == "0") {
        let completeNum = Number(status.data['20201021xiaoxiaole_T1'].curCompleteNum);
        let limitNum = Number(status.data['20201021xiaoxiaole_T1'].taskLimitNum);
        let leftNum = limitNum - completeNum;
        if (leftNum > 0) {
            showMessage(`【消消乐】开始领取鱼丸，剩余${leftNum}次`, "info")
        }
        for (let i = 0; i < leftNum; i++) {
            await getFishBall_Xiaoxiaole();
        }
    }
}


async function getFishBall_Xiaoxiaole() {
    let adWatchcer = new DyWacthAd("1134396", dyToken, rid);
    let isStart = await adWatchcer.start();
    if (isStart == true) {
        await sleep(15000).then(async () => {
            let isFinish = await adWatchcer.finish();
            if (isFinish == true) {
                showMessage("【消消乐】成功领取40鱼丸", "success");
            }
        })
    }
}

function getXiaoxiaoleStatus() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/actTask/userStatus", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `tasks=20201021xiaoxiaole_T1&token=${dyToken}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}
function initPkg_Sign_Ad_FishPond() {
	getFishBall_Ad_FishPond();
}

function getFishBall_Ad_FishPond() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://apiv2.douyucdn.cn/japi/fishpoolTask/m/apinc/taskList?client_sys=android",
        data: "rid=" + rid + "&token=" + dyToken,
        responseType: "json",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: async function(response) {
            let panel = response.response.data.panel;
            let ret = null;
            for (let i = 0; i < panel.length; i++) {
                if (panel[i].id == 37) {
                    // 每日活跃
                    ret = panel[i].taskList;
                    break;
                }
            }
            if (!ret) {
                return;
            }
            for (let i = 0; i < ret.length; i++) {
                if (ret[i].task.id == "5578") {
                    if (ret[i].task.status == "3") {
                        // showMessage("【鱼塘鱼丸】已领取", "warning");
                        // initPkg_Sign_Ad_666();
                        initPkg_Sign_Ad_Yuba();
                    } else {
                        for (let j = 0; j < ret[i].task.max - ret[i].task.cur; j++) {
                            let posid_Ad_FishPond = "1114268";
                            let token = dyToken;
                            let uid = getUID();
                            let info = await getFishBall_Ad_FishPond_info(posid_Ad_FishPond, token, uid);
                            if (info == false) {
                                // initPkg_Sign_Ad_666();
                                initPkg_Sign_Ad_Yuba();
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
                                        // let isGet = await getFishBall_Ad_FishPond_Bubble(token);
                                        showMessage("【鱼塘鱼丸】任务完成", "success");
                                    }
                                    
                                })
                            }
                        }
                        // initPkg_Sign_Ad_666();
                        initPkg_Sign_Ad_Yuba();
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
function initPkg_Sign_Ad_Guess() {
	getFishBall_Ad_Guess();
}

async function getFishBall_Ad_Guess() {
    let chance = await getFishBall_Ad_Guess_chance();
    if (chance > 0) {
        for (let i = 0; i < chance; i++) {
            let adWatcher = new DyWacthAd("1114337", dyToken, rid);
            let isStart = await adWatcher.start();
            if (isStart == true) {
                showMessage("【预言鱼丸】开始领取预言鱼丸，需等待15秒", "info");
                await sleep(15555).then(async () => {
                    if (await adWatcher.finish() == true) {
                        showMessage("【预言鱼丸】成功领取40鱼丸", "success");
                    }
                    await sleep(1000);
                })
            }
        }
    } else {
        // showMessage("【预言鱼丸】今日次数已用完", "warning");
    }
    initPkg_AdVideo_Xiaoxiaole();
}


function getFishBall_Ad_Guess_chance() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/chance?client_sys=android",
            data: "token=" + dyToken + "&uid=" + getUID() + "&posCode=1114337&clientType=1",
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: async function(response) {
                let ret = response.response;
                if (ret.error == "0") {
                    let chance = ret.data.chanceNum;
                    resolve(chance);
                } else {
                    resolve(0);
                }
            }
        });
    })
}

function initPkg_Sign_Ad_Search() {
	getFishBall_Ad_Search();
}

function getFishBall_Ad_Search() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/chance?client_sys=android",
        data: "token=" + dyToken + "&uid=" + getUID() + "&posCode=1124343&clientType=1",
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
                        let posid_Ad_Search = "1124343";
                        let token = dyToken;
                        let uid = getUID();
                        let info = await getFishBall_Ad_Search_info(posid_Ad_Search, token, uid);
                        if (info == false) {
                            initPkg_Sign_Ad_Guess();
                            return;
                        }
                        let mid = info.mid;
                        let infoBack = info.infoBack;
                        let isStart = await getFishBall_Ad_Search_start(posid_Ad_Search, token, uid, mid, infoBack);
                        if (isStart == true) {
                            showMessage("【搜索鱼丸】开始领取搜索鱼丸，需等待15秒", "info");
                            await sleep(15555).then(async () => {
                                let isFinish = await getFishBall_Ad_Search_finish(posid_Ad_Search, token, uid, mid, infoBack);
                                if (isFinish == true) {
                                    showMessage("【搜索鱼丸】成功领取40鱼丸", "success");
                                    await sleep(1000);
                                }
                            })
                        }
                    }
                } else {
                    // showMessage("【搜索鱼丸】今日次数已用完", "warning");
                    initPkg_Sign_Ad_Guess();
                    return;
                }
            }
            initPkg_Sign_Ad_Guess();
        }
    });
}



function getFishBall_Ad_Search_info(posid_Ad_Search, token, uid) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
            data: "posid=" + posid_Ad_Search + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
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

function getFishBall_Ad_Search_start(posid_Ad_Search, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
            data: "token=" + token + "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid_Ad_Search + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
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

function getFishBall_Ad_Search_finish(posid_Ad_Search, token, uid, mid, infoBack) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
            data: "uid=" + uid + "&clientType=1&posCode=" + posid_Ad_Search + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
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
                            initPkg_Sign_Ad_Search();
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
                    // showMessage("【鱼吧鱼丸】今日次数已用完", "warning");
                    initPkg_Sign_Ad_Search();
                    return;
                }
            }
            initPkg_Sign_Ad_Search();
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

function initPkg_AudioLine() {
	initPkg_AudioLine_Dom();
	initPkg_AudioLine_Func();
}

function initPkg_AudioLine_Dom() {
	AudioLine_insertIcon();
}
function AudioLine_insertIcon() {
	let a = document.createElement("div");
    a.className = "Title-blockInline";
    a.id = "ex-audio-line";
	a.innerHTML = '<div class="TitleShare"><div class="TitleShare-shareBox "><div class="Title-row-span  is-right"><span class="Title-row-icon "><svg t="1613808136306" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2829" width="16" height="16"><path d="M496 64A48 48 0 0 1 544 112v800a48 48 0 0 1-96 0v-800A48 48 0 0 1 496 64z m-224 128A48 48 0 0 1 320 240v544a48 48 0 0 1-96 0v-544A48 48 0 0 1 272 192z m448 0A48 48 0 0 1 768 240v544a48 48 0 0 1-96 0v-544A48 48 0 0 1 720 192z m-672 128A48 48 0 0 1 96 368v288a48 48 0 0 1-96 0v-288A48 48 0 0 1 48 320z m896 0a48 48 0 0 1 48 48v288a48 48 0 0 1-96 0v-288a48 48 0 0 1 48-48z" p-id="2830"></path></svg></span><span class="Title-row-text ">切换音频线路</span></div></div></div>';
    let b = document.getElementsByClassName("Title-col")[4];
    if (b.childNodes.length > 1) {
        b.insertBefore(a, b.childNodes[1]);
    }
}

function initPkg_AudioLine_Func() {
	document.getElementById("ex-audio-line").addEventListener("click", function() {
        document.getElementsByClassName("pause-c594e8")[0].click(); // 暂停视频播放
        getRealLive_Douyu(rid, true, false, "1015", (lurl) => {
            createNewAudio_Douyu(videoPlayerArr.length, rid);
        })
    });
}
let timeout;
function initPkg_BagInfo() {
	initPkg_BagInfo_Func();
}

function initPkg_BagInfo_Func() {
	document.getElementsByClassName("BackpackButton")[0].addEventListener("click", function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
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
                            expiryDiv.innerHTML = expiry - 1;
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
        }, 500);
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
		tiangouBarrage = String(tiangouBarrage).replace(/他/g,"她");
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
                if (barragePanel == undefined) {
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

let barrageMemoryArr = [];
let barrageMemoryIndex = 0; // 当前 指向索引
let prevTextareaPosition = 0;
function initPkg_ChatMemory() {
    initPkg_ChatMemory_Func();
}

function initPkg_ChatMemory_Func() {
    document.getElementsByClassName("ChatSend-txt")[0].addEventListener("keydown", (e) => {
        let dom = e.target;
        if (e.keyCode == 38) {
            // ↑
            if (getTextareaPosition(dom) == 0) {
                barrageMemoryIndex = barrageMemoryIndex > 0 ? barrageMemoryIndex - 1 : barrageMemoryIndex;
                chatMemory_setBarrage();
            }
        } else if (e.keyCode == 40) {
            // ↓
            if (getTextareaPosition(dom) == dom.value.length) {
                barrageMemoryIndex = barrageMemoryIndex < barrageMemoryArr.length - 1 ? barrageMemoryIndex + 1 : barrageMemoryIndex;
                chatMemory_setBarrage();
            }
        } else if (e.keyCode == 13) {
            // enter
            chatMemory_pushBarrage(getBarrageValue());
        }
    });
    document.getElementsByClassName("ChatSend-button")[0].addEventListener("click", () => {
        // 点击弹幕发送按钮
        chatMemory_pushBarrage(getBarrageValue());
    })
}

function chatMemory_pushBarrage(txt) {
    barrageMemoryIndex = barrageMemoryArr.push(txt);
}

function chatMemory_setBarrage() {
    if (barrageMemoryArr[barrageMemoryIndex] == undefined) {
        return;
    }
    setBarrageValue(barrageMemoryArr[barrageMemoryIndex] || "");
}

function getBarrageValue() {
    let dom = document.getElementsByClassName("ChatSend-txt")[0];
    if (dom != undefined && dom != null) {
        return dom.value;
    }
    return "";
}
function setBarrageValue(txt) {
    let dom = document.getElementsByClassName("ChatSend-txt")[0];
    if (dom != undefined && dom != null) {
        dom.value = txt;
    }
}
function initPkg_ChatTools() {
    initPkg_ChatMemory();
}

function initPkg_Console() {
	console_watermark_douyEx();
}

function console_watermark_douyEx() {
    // console.log("DouyuEx插件官网 https://www.douyuex.com")
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
        getRealLive_Douyu(rid, true, false, "1015", (lurl) => {
            if (lurl == "None") {
                showMessage("房间未开播或其他错误", "error");
            } else {
                let str = String(lurl);
                // GM_setClipboard(String(lurl).replace("https", "http"));
                GM_setClipboard(str);
                showMessage("复制成功", "success");
            }
            
        })
    });
    document.getElementsByClassName("Title-header")[0].addEventListener("click", function() {
        getRealLive_Douyu(rid, true, false, "1015", (lurl) => {
            if (lurl == "None") {
                showMessage("房间未开播或其他错误", "error");
            } else {
                // // GM_setClipboard(String(lurl).replace("https", "http"));
                // GM_setClipboard(String(lurl));
                let str = String(lurl);
                GM_setClipboard(str);
                showMessage("复制成功", "success");
            }
            
        })
    });

    let titNode = document.getElementsByClassName("RecommendViewTit-04ebd8");
    let tit = "";
    if (titNode.length > 0) {
        tit = titNode[0].innerText + "\n";
    }

    document.getElementsByClassName("Title-header")[0].style.cursor = "pointer";
    document.getElementsByClassName("Title-header")[0].title = tit + "点击复制直播流";
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
    // initPkg_ExpandTool_BarrageSize();
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
let user_name;
let animationNum = 0;

let goldBarrageHook;
let goldBarrageListHook;

let goldGiftHook;
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
            goldBarrageHook = new DomHook(".danmu-6e95c1", true, goldBarrage);
            goldBarrageListHook = new DomHook(".Barrage-list", true, goldBarrageList);
            goldFansMedal();
        } else{
            // 停止幻神模式
            goldBarrageHook.closeHook();
            goldBarrageListHook.closeHook();
            
        }
        saveData_Gold();
	});
    document.getElementById("extool__goldGift_start").addEventListener("click", async function() {
        user_name = await getUserName();
        let ischecked = document.getElementById("extool__goldGift_start").checked;
        if (ischecked == true) {
            goldGiftHook = new DomHook(".BarrageBanner", true, fansToSuperRocket);
        } else{
            goldGiftHook.closeHook();
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

function goldBarrageList(m) {
    if (m.length == 0) {
        return;
    }
    if (m[0].addedNodes.length == 0) {
        return;
    }
    
    let itemNode = m[0].addedNodes[0];
    let chatArea = itemNode.lastElementChild;
    if (chatArea != null && chatArea.innerHTML.indexOf("is-self") != -1) {
        let barrageListTimeout = setTimeout(() => {
            itemNode.className = "Barrage-listItem js-noblefloating-barrage";
        chatArea.className = "js-noblefloating-barragecont Barrage-notice--noble";
        chatArea.setAttribute('style','background-color: #fff3df');
        let nickNameObj = chatArea.getElementsByClassName("Barrage-nickName")[0];
        nickNameObj.setAttribute('class','Barrage-nickName is-self js-nick');

        let userLevelObj = chatArea.querySelector(".UserLevel");
        if( userLevelObj!=null){
            userLevelObj.className = "UserLevel UserLevel--150";
            userLevelObj.setAttribute("title", "用户等级：150");
        }
        let roomLevelObj = chatArea.querySelector(".RoomLevel");
        if( roomLevelObj!=null){
            roomLevelObj.className = "RoomLevel RoomLevel--18";
            roomLevelObj.setAttribute("title","房间等级：18");
        }
        let fansMedal = itemNode.querySelector(".FansMedal");

        if(fansMedal!=null){
            fansMedal.style = "display:none;";
        }
        let fansMedalName = document.getElementsByClassName("FansMedal-name")[0];//fans medal
            let fansBackgroundImg = document.getElementsByClassName("FansRankList-item FansRankList-item--top")[0];
            if(fansMedalName!=undefined && fansBackgroundImg!= undefined ){
                if(fansBackgroundImg.innerHTML.indexOf("background-image:")==-1){//common fans medal
                    let fansTag = document.createElement("div");
                    let fansSpan = document.createElement("span");
                    fansTag.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
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
                fansTag2.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
                fansTag2.setAttribute("data-rid","5189167");
                let fansSpan2 = document.createElement("span");
                fansSpan2.className = "FansMedal-name js-fans-dysclick";
                fansSpan2.setAttribute("data-rid","5189167");
                fansSpan2.innerHTML = "歆崽";
                fansTag2.appendChild(fansSpan2);
                chatArea.insertBefore(fansTag2,chatArea.querySelector(".UserLevel"));
            }

        let nobleIconObj = itemNode.querySelector(".Barrage-nobleImg");
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
        clearTimeout(barrageListTimeout);
        }, 100);
    }
    
}

function goldFansMedal() {
    document.getElementsByClassName("FansMedalEnter-enterContent")[0].setAttribute("data-medal-level","50");
}

function goldBarrage(m) {
    if (m.length == 0) {
        return;
    }
    if (m[0].addedNodes.length == 0) {
        return;
    }
    let itemNode = m[0].addedNodes[0];
    if(itemNode.className.indexOf("noble-bf13ad")==-1 && itemNode.innerHTML.indexOf("border: 2px solid rgb(2, 255, 255)")!=-1){//find self and remove redupliction
        itemNode.style.zIndex = "30";
        itemNode.className = "danmuItem-31f924 noble-bf13ad";
        // itemNode.setAttribute("style",characterStyle);
        //noble icon without redupliction remove
        let nobleImgTag = document.createElement("img");
        nobleImgTag.className = "super-noble-icon-9aacaf";
        nobleImgTag.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h1_dcd226.png");
        nobleImgTag.setAttribute("style","margin-left: -57px; margin-top: -4px;");
        itemNode.insertBefore(nobleImgTag,itemNode.firstElementChild);
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
        itemNode.insertBefore(userIconTag,itemNode.firstElementChild);
        //remove out tail tag
        let tailTag = itemNode.getElementsByClassName("afterpic-8a2e13")[0];
        tailTag.remove();
        //transform barrage effect
        let textContent = itemNode.getElementsByClassName("text-879f3e")[0];
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
        itemNode.appendChild(superTailImg);
    }
}

function fansToSuperRocket(m) {
    if (m.length == 0) {
        return;
    }
    if (m[0].addedNodes.length == 0) {
        return;
    }
    let dom_gift = m[0].addedNodes[0];
    if (dom_gift.getElementsByClassName("Banner4gift-senderName")[0].title == user_name) {
        let giftName = dom_gift.getElementsByClassName("Banner4gift-objectName")[0].title;
        if (giftName == "粉丝荧光棒") {
            dom_gift.className = "Banner4gift Banner4gift--size2";
            dom_gift.getElementsByClassName("Banner4gift-bg")[0].src = "https://gfs-op.douyucdn.cn/dygift/2019/03/15/6651f2de52dd359c7b553a77b9d00020.png"; // 修改横幅
            dom_gift.getElementsByClassName("Banner4gift-objectName")[0].title = "超级火箭";
            dom_gift.getElementsByClassName("Banner4gift-objectName")[0].innerText = "超级火箭";
            dom_gift.getElementsByClassName("Banner4gift-headerImg")[0].src = "https://gfs-op.douyucdn.cn/dygift/2018/11/27/3adbb0c17d9886c1440d55c9711f4c79.gif"; // 修改gif

            if (document.getElementsByClassName("ex_giftAnimation_exist").length > 0) {
                return;
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
    html += '<label>数量：</label><input id="extool__sendgift_cnt" type="text" style="width:30px;text-align:center;margin-right:10px;" value="1" />';
    html += '<label>间隔ms：</label><input id="extool__sendgift_delay" type="text" style="width:30px;text-align:center;" value="0" />';
    html += '<input style="width:40px;margin-left:10px;" type="button" id="extool__sendgift_btn" value="送出" />';
    let a = document.createElement("div");
    a.className = "extool__sendgift";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_SendGift_insertFunc() {
    document.getElementById("extool__sendgift_btn").addEventListener("click", async () => {
        if (confirm("确认送出？") != true) {
            return;
        }
        let gid = document.getElementById("extool__sendgift_id").value;
        let gcnt = document.getElementById("extool__sendgift_cnt").value;
        let delay = Number(document.getElementById("extool__sendgift_delay").value);
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
            if (delay > 0) {
                await sleep(delay);
            }
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
    document.getElementById("extool__treasure_skey").addEventListener("change", () => {
        saveData_Treasure();
    })
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

function initPkg_FansBadgeList() {
    setFansBadgeList();
}

function setFansBadgeList() {
    // document.querySelectorAll(".fans-badge-list tr")[1].getAttribute("data-fans-gbdgts")
    let nowTime = new Date().getTime();
    let items = document.querySelectorAll(".fans-badge-list tr");
    if (items.length <= 1) {
        return;
    }
    // items[0].getElementsByTagName("th")[1].setAttribute("width", "30%");
    // 跳过表头
    for (let i = 1; i < items.length; i++) {
        let item = items[i];
        let tt = Number(item.getAttribute("data-fans-gbdgts")) * 1000;
        let ttStr = dateFormat("yyyy-MM-dd hh:mm:ss",new Date(tt)); // 获取日期
        let days = Math.floor((nowTime - tt) / 86400000); // 距今天数
        let style = days >= 300 ? "font-weight:600;color:red;" : "";
        // let className = days >= 300 ? "fansBadgeDays" : "";

        let td = item.getElementsByTagName("td")[1];
        // td.innerHTML += `获取于：${ttStr}（${days}天）`;
        td.innerHTML += `
        已获取 <span style="${style}">${days}</span> 天<br/>
        ${ttStr}`;
        // td.innerHTML += `于${ttStr}获取（${days}天）`;
    }
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
	// document.getElementsByClassName("fish-food")[0].addEventListener("click", function() {
	// 	getFishFoodV2();
	// 	fetch("https://www.douyu.com/japi/activepointnc/api/getActivePointInfo", {
	// 		method: 'POST',
	// 		mode: 'no-cors',
	// 		credentials: 'include',
	// 		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	// 	}).then(res => {
	// 		return res.json();
	// 	}).then(async (ret) =>{
	// 		let cnt = Math.floor(Number(ret.data.userActivePoint) / Number(ret.data.onceLotteryActivePoint));
	// 		if (cnt == 0) {
	// 			showMessage("【寻宝】" + "鱼粮不足", "warning");
	// 			return;
	// 		}
	// 		cnt = Number(ret.data.dailyMaxLotteryTimes) - Number(ret.data.usedLotteryCount);
	// 		if (cnt == 0) {
	// 			showMessage("【寻宝】" + "今日寻宝次数已到达上限", "warning");
	// 			return;
	// 		}
	// 		for (let i = 0; i < cnt; i++) {
	// 			await sleep(1500).then(() => {
	// 				fetch("https://www.douyu.com/japi/activepointnc/api/dolottery", {
	// 					method: 'POST',
	// 					mode: 'no-cors',
	// 					credentials: 'include',
	// 					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	// 					body: 'rid=' + rid + '&ctn=' + getCCN()
	// 				}).then(res => {
	// 					return res.json();
	// 				}).then(ret => {
	// 					if (ret.data != null) {
	// 						if (Object.keys(ret.data).length != 0) {
	// 							showMessage("【寻宝】" + ret.data.msg, "success");
	// 						}
	// 					} else {
	// 						showMessage("【寻宝】" + ret.msg, "warning");
	// 					}
	// 					// console.log("【寻宝】" + ret.data.msg);
	// 				}).catch(err => {
	// 					console.log("请求失败!", err);
	// 				})
	// 			})
	// 		}
	// 	})
	// })
	document.getElementsByClassName("fish-food")[0].addEventListener("click", function() {
		getFishFoodV2();
		fetch("https://www.douyu.com/japi/activepointnc/apinc/lotteryV2", {
			method: 'POST',
			mode: 'no-cors',
			credentials: 'include',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(res => {
			return res.json();
		}).then(async (ret) =>{
			let cnt = Math.floor(Number(ret.data.yuliang) / Number(ret.data.cost));
			if (cnt == 0) {
				showMessage("【寻宝】" + "鱼粮不足", "warning");
				return;
			}
			cnt = Number(ret.data.leftChance);
			if (cnt == 0) {
				showMessage("【寻宝】" + "今日寻宝次数已到达上限", "warning");
				return;
			}
			for (let i = 0; i < cnt; i++) {
				await sleep(1500).then(() => {
					fetch("https://www.douyu.com/japi/activepointnc/apinc/doLotteryV2", {
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
								showMessage("【寻宝】" + ret.data.lotteryRes.data.msg, "success");
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

function getFishFoodV2() {
	fetch("https://www.douyu.com/japi/activepointnc/apinc/seniorLotteryV2", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'ctn=' + getCCN()
	}).then(res => {
		return res.json();
	}).then(async (ret) =>{
		if (ret.data == null) {
			return;
		}
		let cnt = Number(ret.data.leftChance);
		if (cnt == 0) {
			showMessage("【高级寻宝】" + "今日寻宝次数已到达上限", "warning");
			return;
		}
		if (Number(ret.data.yuliang) < Number(ret.data.cost)) {
			showMessage("【高级寻宝】" + "鱼粮不足", "warning");
			return;
		}
		for (let i = 0; i < cnt; i++) {
			await sleep(1500).then(() => {
				fetch("https://www.douyu.com/japi/activepointnc/apinc/doSeniorLotteryV2", {
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
							showMessage("【高级寻宝】" + ret.data.lotteryRes.data.msg, "success");
						}
					} else {
						showMessage("【高级寻宝】" + ret.msg, "warning");
					}
					// console.log("【寻宝】" + ret.data.msg);
				}).catch(err => {
					console.log("请求失败!", err);
				})
			})
		}
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
	// initPkg_FishPond_Task_Timer();
	initPkg_FishPond_RoomSign_Timer();
	initPkg_FishPond_Task2_Timer();
}
function initPkg_FishPond_Func() {
}
function initPkg_FishPond_Dom() {
	FishPond_insertIcon();
}
function FishPond_insertIcon() {
	
}

function getAllFishPond() {
	initPkg_FishPond_Bubble();
	initPkg_FishPond_Box();
	// initPkg_FishPond_Task();
	// initPkg_FishPond_RoomSign();
	// initPkg_FishPond_Task2();
}

function FishPond_showTip(a) {
	// let d = document.getElementById("fish-pond__tip");
	// if (a == true) {
	// 	if (d.style.display != "block") {
	// 		showMessage("【鱼粮】有鱼粮可以领取啦！", "info");
	// 		d.style.display = "block";
	// 	}
	// } else {
	// 	d.style.display = "none";
	// }
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
		// showMessage("【鱼塘宝箱】暂无可领取的鱼粮", "info");
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
	// FishPond_showTip(false);
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
						boxList.push(response.response.data[i].id);
						getAllFishPond();
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
let roomSignList = [];
function initPkg_FishPond_RoomSign() {
	getFishPond_RoomSign();
}

function initPkg_FishPond_RoomSign_Timer() {
	getFishPond_RoomSignList();
}

function getFishPond_RoomSign() {
	// 清空roomSignList内的气泡
	// if (roomSignList.length == 0) {
	// 	// showMessage("【签到宝箱】暂无可领取的鱼粮", "info");
	// 	return;
	// }
    // let arr = roomSignList.concat();
	// for (let i = 0; i < arr.length; i++) {
	// 	fetch('https://www.douyu.com/japi/roomuserlevel/apinc/getPrize',{
    //         method: 'POST',
    //         mode: 'no-cors',
    //         credentials: 'include',
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //         body: 'rid=' + rid + '&ctn=' + getCCN()
    //     }).then(res => {
    //         return res.json();
    //     }).then(ret => {
    //         if (ret.error == "0") {
    //             showMessage("【签到宝箱】领取结果:" + ret.msg, "success");
    //         }
    //     }).catch(err => {
    //         console.log("请求失败!", err);
    //     })
	// }
	// // FishPond_showTip(false);
	// roomSignList.length = 0;
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
                // roomSignList.push("1");
                // getAllFishPond();
                getFishPond_RoomSign();
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

function initPkg_FishPond_Task2() {
	getFishPond_Task2();
}

function initPkg_FishPond_Task2_Timer() {
    getFishPond_Task2();
}


async function getFishPond_Task2() {
    let taskList = await getFishPond_Task2List();
    if (taskList.data == null) {
        return;
    }
    getFishPond_Task2Panel(taskList.data.panel);
    getFishPond_Task2Bubble(taskList.data.bubble);
}

function getFishPond_Task2List() {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/fishpoolTask/w/apinc/taskList',{
			method: 'POST',
			mode: 'no-cors',
			credentials: 'include',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			body: 'rid=' + rid + '&ctn=' + getCCN()
		}).then(res => {
			return res.json();
		}).then(ret => {
            resolve(ret);
		}).catch(err => {
			console.log("请求失败!", err);
		})
    })
}

async function getFishPond_Task2Panel(panelList) {
    for (let i = 0; i < panelList.length; i++) {
        let item = panelList[i];
        for (let j = 0; j < item.taskList.length; j++) {
            let taskItem = item.taskList[j].task;
            if (taskItem.status == 2) {
                let id = taskItem.id;
                // 领取
                await sleep(1500).then(() => {
                    getFishPond_Task2GetPrize(id);
                })
            }
        }
    }
}

function getFishPond_Task2GetPrize(id) {
    fetch('https://www.douyu.com/japi/fishpoolTask/w/apinc/getPrize',{
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'id=' + id + '&rid=' + rid + '&ctn=' + getCCN()
    }).then(res => {
        return res.json();
    }).then(ret => {
        if (ret.error == 0) {
            showMessage("【高级鱼塘】" + ret.data.msg, "success");
        } else {
            showMessage("【高级鱼塘】" + ret.msg, "error");
        }
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

async function getFishPond_Task2Bubble(bubbleList) {
    for (let i = 0; i < bubbleList.length; i++) {
        let item = bubbleList[i];
        if (item.status == 2) {
            let id = item.id;
            await sleep(1500).then(() => {
                getFishPond_Task2GetPrize(id);
            })
        }
    }
}

let followListHook;
function initPkg_FollowList() {
    let intID = setInterval(() => {
        if (typeof(document.getElementsByClassName("DropPane-icon Follow-icon")[0]) != "undefined") {
            followListHook = new DomHook(".Header-follow-content", false, handleFollowList)
            clearInterval(intID);
        }
    }, 1000);
    
}

function handleFollowList(m) {
    let active = document.getElementsByClassName("Header-follow-tab is-active")[0].innerText;
    if (active == "特别关注") {
        return;
    }
    let panel = document.getElementsByClassName("Header-follow-listWrap");
    if (panel.length == 0) {
        return;
    }
    panel[0].style.marginTop = "12px";
    document.getElementsByClassName("Header-follow-listBox")[0].style.display = "none";
    setNewFollowList(panel[0]);
}
async function setNewFollowList(panel) {
    let followList = await getFollowList();
    if (followList.error != "0") {
        return;
    }
    const FOLLOWLIST_LIMIT = 10; // 关注列表最多显示个数
    let limit = 0;
    let html = `<div id="refreshFollowList"><span style="margin-left:3px">长按弹出同屏播放</span></div>`;
    let nowTime = Math.floor(Date.now()/1000);
    for (let i = 0; i < followList.data.list.length; i++) {
        let item = followList.data.list[i];
        if (item.show_status == "1" && item.videoLoop == "0") {
            // 开播且非录播
            html += `<li class="DropPaneList FollowList ExFollowListItem" rid="${ item.room_id }"><a><div class="DropPaneList-cover"><div class="LazyLoad is-visible DyImg "><img src="${ String(item.avatar_small).replace("_big","_small") }" alt="${ item.nickname }" class="DyImg-content is-normal "></div></div><div class="DropPaneList-info"><p><span class="DropPaneList-hot"><i></i>${ item.online }</span><span class="DropPaneList-title">${ item.room_name }</span></p><p><span class="DropPaneList-name">${ item.nickname }</span><span class="DropPaneList-time">已播${ formatSeconds(nowTime - Number(item.show_time)) }</span></p></div></a></li>`
            // html += `<li class="DropPaneList FollowList ExFollowListItem" rid="${ item.room_id }"><a><div class="DropPaneList-cover"><div class="DyImg "><img src="${ String(item.avatar_small).replace("_big","_small") }" alt="${ item.nickname }" class="DyImg-content is-normal "></div></div><div class="DropPaneList-info"><p><span class="DropPaneList-hot"><i></i>${ item.online }</span><span class="DropPaneList-title">${ item.room_name }</span></p><p><span class="DropPaneList-name">${ item.nickname }</span><span class="DropPaneList-time">已播${ formatSeconds(nowTime - Number(item.show_time)) }</span></p></div></a></li>`
            limit++;
        }
        if (limit >= FOLLOWLIST_LIMIT) {
            break;
        }
    }
    panel.innerHTML += html;


    let followListItems = document.getElementsByClassName("ExFollowListItem");
    for (let i = 0; i < followListItems.length; i++) {
        let cclick = new CClick(followListItems[i]);
        cclick.longClick(() => {
            createNewVideo(videoPlayerArr.length, followListItems[i].getAttribute("rid"), "Douyu");
            document.querySelector(".Follow .public-DropMenu").className = "public-DropMenu";
        });
        cclick.click(() => {
            openPage("https://www.douyu.com/" + followListItems[i].getAttribute("rid"), true);
        });
        followListItems[i].addEventListener("mousedown", (event) => {
            if (event.button == 1) {
                // 鼠标中键
                openPage("https://www.douyu.com/" + followListItems[i].getAttribute("rid"), false);
            }
        })
    }
}

function getFollowList() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/wgapi/livenc/liveweb/follow/list?sort=1&cid1=0", {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}
let barrageSpeed_count = 0;
function initPkg_LiveTool_BarrageSpeed() {
    // LiveTool_BarrageSpeed_Dom();
    setInterval(() => {
        let barrageSpeed = Number((barrageSpeed_count / 5) * 60).toFixed(0);
        barrageSpeed_count = 0;
        document.getElementsByClassName("ChatSend-txt")[0].placeholder = "弹幕时速：" + barrageSpeed + "条/分";
        // document.getElementsByClassName("barrageSpeed__value")[0].innerText = barrageSpeed;
    }, 5000)
}

function LiveTool_BarrageSpeed_Dom() {
    let a = document.createElement("div");
    a.className = "barrageSpeed";
    let html = `
        弹幕时速：<span class='barrageSpeed__value'>**</span>条/分
    `
    a.innerHTML = html;
    
    let b = document.getElementsByClassName("Chat")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_LiveTool_BarrageSpeed_Handle(text) {
    if (getType(text) == "chatmsg") {
        barrageSpeed_count++;
    }
}
let isEnterOn = false;
let enterWordList = {};
function initPkg_LiveTool_Enter() {
    LiveTool_Enter_insertDom();
    LiveTool_Enter_insertFunc();
    initPkg_Enter_Set();
}

function LiveTool_Enter_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='enter__title'>进场欢迎</span>
        </div>
        <div class='livetool__cell_option'>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="enter__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="enter__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='enter__panel'>
            <select id='enter__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="enter__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="enter__del" value="删除"/>
            <div class="enter__option">
                <label>等级≥<input id="enter__level" type="text" value="1"/></label>
                <label>当前欢迎词：<input id="enter__word" type="text" placeholder="欢迎<id>光临直播间"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Enter_insertFunc() {
    document.getElementById("enter__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("enter__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isEnterOn = true;
		} else{
            // 关闭关键词禁言
            isEnterOn = false;
        }
        saveData_isEnter();

    });
    document.getElementById("enter__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("enter__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
                document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("vote__panel")[0].style.display == "block") {
				document.getElementsByClassName("vote__panel")[0].style.display = "none";
			}
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("enter__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let word = this.options[this.selectedIndex].text;
        let level = enterWordList[word].enter;
        document.getElementById("enter__word").value = word;
        document.getElementById("enter__level").value = level;
        localStorage.setItem("ExSave_LastEnterWord", word); // 存储弹幕列表
    };

    document.getElementById("enter__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("enter__select");
        let word = document.getElementById("enter__word").value;
        let level = document.getElementById("enter__level").value;

        if (word == "") {
            return;
        }
        if (level == "") {
            return;
        }
        // 构造json并添加json
        enterWordList[word] = {
            enter: Number(level),
        }

        // 添加到select中去
        select_wordList.options.add(new Option(word, ""));

        saveData_Enter();
    });

    document.getElementById("enter__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("enter__select");
        let word = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete enterWordList[word];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveData_Enter();
    });

}


function saveData_Enter() {
	let data = enterWordList;
    localStorage.setItem("ExSave_Enter", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_isEnter() {
    let ridArr = [];
    let ret = localStorage.getItem("ExSave_isEnter");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
    }
    let index = ridArr.indexOf(rid);
    if (isEnterOn == true) {
        if (index == -1) {
            ridArr.push(rid);
        }
    } else {
        ridArr.splice(index, 1);
    }
	let data = {
        rooms: ridArr,
    };
	localStorage.setItem("ExSave_isEnter", JSON.stringify(data)); // 存储弹幕列表
}

function initPkg_Enter_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Enter");
    if (ret == "") {
        return;
    }
	let select_wordList = document.getElementById("enter__select");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        enterWordList = retJson;
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
    
    ret = localStorage.getItem("ExSave_LastEnterWord");
    if (ret != null) {
        let i = 0;
        for (const key in enterWordList) {
            if (key == ret) {
                select_wordList.selectedIndex = i;
                let level = enterWordList[ret].enter;
                document.getElementById("enter__word").value = ret;
                document.getElementById("enter__level").value = level;
                break;
            }
            i++;
        }
    } 

    ret = localStorage.getItem("ExSave_isEnter");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        let ridArr = [];
        if ("rooms" in retJson == true) {
            ridArr = retJson.rooms;
        }
        if (ridArr.indexOf(rid) == -1) {
            isEnterOn = false;
        } else {
            isEnterOn = true;
        }
        document.getElementById("enter__switch").checked = isEnterOn;
	} else {
        isEnterOn = false;
        document.getElementById("enter__switch").checked = isEnterOn;
    }
}

function initPkg_LiveTool_Enter_Handle(text) {
    if (isEnterOn == false) {
        return;
    }
    if (getType(text) == "uenter") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let level = getStrMiddle(text, "level@=", "/");
        let select_wordList = document.getElementById("enter__select");
        let reply = select_wordList.options[select_wordList.selectedIndex].text;
        let levelLimit = enterWordList[reply].enter;
        if (Number(level) < Number(levelLimit)) {
            return;
        }
        reply = String(reply).replace(/<id>/g, nn);
        sendBarrage(reply);
    }
}


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
背包礼物：http://webconf.douyucdn.cn/resource/common/prop_gift_list/prop_gift_config.json
鱼翅礼物：http://open.douyucdn.cn/api/RoomApi/room/5189167
`);
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
            if (document.getElementsByClassName("enter__panel")[0].style.display == "block") {
				document.getElementsByClassName("enter__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("vote__panel")[0].style.display == "block") {
				document.getElementsByClassName("vote__panel")[0].style.display = "none";
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
                if (closingNum > 30) {
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
	initPkg_LiveTool_Vote();
	initPkg_LiveTool_Enter();
	initPkg_LiveTool_Mute();
	initPkg_LiveTool_Gift();
	initPkg_LiveTool_Reply();
	initPkg_LiveTool_Treasure();
	initPkg_LiveTool_BarrageSpeed();

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
		initPkg_LiveTool_Treasure_Handle(ret); // 自动抢宝箱
		initPkg_LiveTool_Enter_Handle(ret); // 自动欢迎
		// initPkg_LiveTool_Friend_Handle(ret);
		initPkg_LiveTool_Vote_Handle(ret); // 投票
		initPkg_LiveTool_BarrageSpeed_Handle(ret); // 弹幕时速
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
    // if (rid == "5189167") {
    //     return;
    // }
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
            if (document.getElementsByClassName("enter__panel")[0].style.display == "block") {
				document.getElementsByClassName("enter__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("vote__panel")[0].style.display == "block") {
				document.getElementsByClassName("vote__panel")[0].style.display = "none";
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
    // if (rid == "5189167") {
    //     return;
    // }
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
            body: 'ban_nickname=' + name + '&room_id=' + roomid + '&ban_time=' + ban_time + '&reason=7'
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
let isReplyCD = false;
let replyCd = 0;
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
            <label style="margin-left:5px">CD：<input id="reply__time" type="text" placeholder="秒" /></label>
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
        replyCd = String(document.getElementById("reply__time").value) || 0;
        let ischecked = document.getElementById("reply__switch").checked;
		if (ischecked == true) {
            // 开启关键词禁言
            isReplyOn = true;
		} else{
            // 关闭关键词禁言
            isReplyOn = false;
        }
        saveData_isReply();
        saveData_ReplyCd();
    });
    document.getElementById("reply__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("reply__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
                document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("enter__panel")[0].style.display == "block") {
				document.getElementsByClassName("enter__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("vote__panel")[0].style.display == "block") {
				document.getElementsByClassName("vote__panel")[0].style.display = "none";
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

function saveData_ReplyCd() {
	let data = document.getElementById("reply__time").value;
	localStorage.setItem("ExSave_ReplyCd", data); // 存储弹幕列表
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

    ret = localStorage.getItem("ExSave_ReplyCd");
	
	if (ret != null) {
        document.getElementById("reply__time").value = ret;
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
                if (isReplyCD == false) {
                    sendBarrage(reply);
                    // 设置CD
                    if (replyCd > 0) {
                        isReplyCD = true;
                        setTimeout(() => {
                            isReplyCD = false;
                        }, replyCd * 1000);
                    }
                }
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
                    // 2021-3-18 09:51:47 免打扰
                    // showMessageWindow(rid, "【宝箱】请手动验证领取宝箱", () => {
                    //     window.focus();
                    // });
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
let isVoteOn = false;
let voteList = {};
let voteNameList = {};
let voteWordList = {};
let voteTotalNum = 0;
let timer_Vote;
let isRepeat = false;
function initPkg_LiveTool_Vote() {
    LiveTool_Vote_insertDom();
    LiveTool_Vote_insertDom_VotePanel();
    LiveTool_Vote_insertFunc();
    initPkg_Vote_Set();
}

function LiveTool_Vote_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='vote__title'>弹幕投票</span><span id='vote__show-result'>面板</span>
        </div>
        <div class='livetool__cell_option'>
            <label style="margin-right:10px;"><input id="vote__repeat" type="checkbox">重复投票</label>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="vote__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="vote__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='vote__panel'>
            <select id='vote__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="vote__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="vote__del" value="删除"/>
            <label style="margin-left:5px">限时：<input id="vote__time" type="text" placeholder="秒" /></label>
            <div class="vote__option">
                <label>主题：<input id="vote__theme" type="text"/></label>
                <label>选项：<input id="vote__options" type="text" placeholder="用空格隔开每个选项"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Vote_insertFunc() {
    document.getElementById("vote__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("vote__switch").checked;
        let selectDom = document.getElementById("vote__select");
        let title = selectDom.options[selectDom.selectedIndex].text;
        let options = voteList[title].options;
        let time = voteList[title].time;
		if (ischecked == true) {
            // 开启关键词禁言
            let arr = String(options).split(" ");
            for (let i = 0; i < arr.length; i++) {
                voteWordList[arr[i]] = {
                    num: 0,
                    index: i
                };
            }
            document.getElementById("vote__repeat").disabled = true;
            voteTotalNum = 0;
            initVoteOptionsPanel(title, options);


            isRepeat = document.getElementById("vote__repeat").checked;
            isVoteOn = true;
            timer_Vote = setTimeout(() => {
                voteNameList = {};
                voteWordList = {};
                isVoteOn = false;
                document.getElementById("vote__repeat").disabled = false;
                document.getElementById("vote__switch").checked = false;
            }, time * 1000);

            document.getElementsByClassName("vote__result")[0].style.display = "block";
		} else{
            // 关闭关键词禁言
            clearTimeout(timer_Vote);
            voteNameList = {};
            voteWordList = {};
            isVoteOn = false;
            document.getElementById("vote__repeat").disabled = false;
        }
    });
    document.getElementById("vote__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("vote__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
                document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("enter__panel")[0].style.display == "block") {
				document.getElementsByClassName("enter__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
            }
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("vote__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let title = this.options[this.selectedIndex].text;
        let options = voteList[title].options;
        let time = voteList[title].time;
        document.getElementById("vote__theme").value = title;
        document.getElementById("vote__options").value = options;
        document.getElementById("vote__time").value = time;
    };

    document.getElementById("vote__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("vote__select");
        let title = document.getElementById("vote__theme").value;
        let options = document.getElementById("vote__options").value;
        let time = document.getElementById("vote__time").value;

        if (title == "" || options == "" || time == "") {
            return;
        }

        // 构造json并添加json
        voteList[title] = {
            options: options,
            time: time
        }

        // 添加到select中去
        select_wordList.options.add(new Option(title, ""));

        saveDate_Vote();
    });

    document.getElementById("vote__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("vote__select");
        let title = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete voteList[title];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveDate_Vote();
    });

    document.getElementById("vote__show-result").addEventListener("click", () => {
        let a = document.getElementsByClassName("vote__result")[0];
		if (a.style.display != "block") {
			a.style.display = "block";
		} else {
			a.style.display = "none";
		}
    })
}

function initPkg_Vote_Set() {
    document.getElementById("vote__switch").checked = isReplyOn;
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Vote");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        voteList = retJson;
        let select_wordList = document.getElementById("vote__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
}

function initPkg_LiveTool_Vote_Handle(text) {
    if (isVoteOn == false) {
        return;
    }
    if (getType(text) == "chatmsg") {
        let uid = getStrMiddle(text, "uid@=", "/");
        let txt = getStrMiddle(text, "txt@=", "/");
        if (isRepeat) {
            if (Object(voteWordList).hasOwnProperty(txt)) {
                voteWordList[txt].num++;
                voteTotalNum++;
                changeOptionsData();
            }
        } else {
            if (Object(voteNameList).hasOwnProperty(uid) == false) {
                if (Object(voteWordList).hasOwnProperty(txt)) {
                    voteNameList[uid] = 0;
                    voteWordList[txt].num++;
                    voteTotalNum++;
                    changeOptionsData();
                }
            }
        }
    }
    
}

function saveDate_Vote() {
    let data = voteList;
	localStorage.setItem("ExSave_Vote", JSON.stringify(data)); // 存储弹幕列表
}


function LiveTool_Vote_insertDom_VotePanel() {
    let a = document.createElement("div");
    a.className = "vote__result";
    let panel = `
        <div id="vote__result-theme">投票主题</div>
        <div id="vote__result-close">X</div>
        <div id="vote__result-options"></div>
    `;
    a.innerHTML = panel;
    
    let b = document.getElementsByClassName("layout-Player-main")[0];
    b.insertBefore(a, b.childNodes[0]);

    let box = document.getElementsByClassName("vote__result")[0];
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
            box.style.left = mouseX + "px";
            box.style.top = mouseY + "px";
        }
        document.onmouseup = function (event) {
            event.stopPropagation();
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

    document.getElementById("vote__result-close").addEventListener("click", () => {
        document.getElementsByClassName("vote__result")[0].style.display = "none";
    })
}


function initVoteOptionsPanel(theme, options) {
    // 设置标题
    document.getElementById("vote__result-theme").innerText = theme;

    // 设置结果面板
    document.getElementById("vote__result-options").innerHTML = ""; // 清空信息面板
    setVoteOptionsDom(options);
}

function setVoteOptionsDom(options) {
    let arr = options.split(" ");
    let b = document.getElementById("vote__result-options");
    for (let i = 0; i < arr.length; i++) {
        let a = document.createElement("div");
        a.className = "vote__option-wrap";
        a.innerHTML = `
            <div class="vote__option-choice">${ arr[i] }</div>
            <div class="vote__option-num"></div>
            <div class="vote__progress">
                <div class="vote__progress-bar"></div>
            </div>
        `;
        b.appendChild(a);
    }
}

function changeOptionsData() {
    for (const key in voteWordList) {
        let item = voteWordList[key];
        
        let domNum = document.getElementsByClassName("vote__option-num")[item.index];
        let domBar = document.getElementsByClassName("vote__progress-bar")[item.index];

        let percent = String(Number(Number(item.num / voteTotalNum) * 100).toFixed(1)) + "%";
        domNum.innerText = `${ item.num }（${ percent }）`;
        domBar.style.width = percent;
    }
}
function initPkg_Menu() {
    GM_registerMenuCommand(`检查更新`, () => {
        Update_checkVersion(true);
    })
}

function initPkg_MiniProgram() {
	initPkg_MiniProgram_Dom();
	initPkg_MiniProgram_Func();
}

function initPkg_MiniProgram_Dom() {
	MiniProgram_insertIcon();
	MiniProgram_insertModal();
}
function MiniProgram_insertIcon() {
	let a = document.createElement("div");
	a.className = "MiniProgram";
	a.innerHTML = '<a class="ex-panel__icon" title="移动端"><svg style="display:block" t="1605503862776" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4759" width="32" height="32"><path d="M512.153785 1024a511.692431 511.692431 0 1 1 512.102523-511.692431 511.897477 511.897477 0 0 1-512.102523 511.692431z m207.967961-742.420505a163.21666 163.21666 0 0 0-246.670404 97.089308c0 29.372847 0 242.46696-2.306769 271.686023a86.529435 86.529435 0 0 1-134.048858 25.630757c-80.173008-77.609932 35.88306-125.898278 54.542251-135.279135a44.392471 44.392471 0 0 0-54.542251-67.665199 176.185823 176.185823 0 0 0-104.522227 130.768122 164.395675 164.395675 0 0 0 96.627954 153.37445c153.169403 51.671606 227.242291-70.894674 226.063276-108.264318V383.026031a82.428514 82.428514 0 0 1 156.603924 2.35803c11.790148 56.387665-76.892271 97.089307-74.790548 114.723268-16.454946 59.822187 54.542251 54.132159 54.54225 54.132158 207.762915-168.189027 28.501402-272.659992 28.501402-272.659992z" fill="#59B540" p-id="4760"></path></svg><i id="MiniProgram__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function MiniProgram_insertModal() {
	let a = document.createElement("div");
	a.className = "miniprogram__panel";
    a.innerHTML = `
		<div class="miniprogram__wrap">
			<div>DouyuEx移动端上线啦</div><div>微信扫码或<b>搜索DouyuEx</b></div><div>↓ 即刻体验 ↓</div>
			<img style="width: 200px;height: 200px;" src="https://qianjiachun.github.io/DouyuEx/DouyuExQRCode.jpg">
		</div>
		<div class="miniprogram__triangle"></div>
    `;
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_MiniProgram_Func() {
	document.getElementsByClassName("MiniProgram")[0].addEventListener("click", function() {
		let a = document.getElementsByClassName("miniprogram__panel")[0];
        if (a.style.display != "block") {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
	});
}


let totalMonthCost = 0;
let typeNum = 0;
let typeCount = 0;

let svg_see = `<svg t="1619141525444" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4635" width="16" height="16" style="/* display: inline-block; */"><path d="M1009.592 531.212C863.184 730.624 696.96 832 512 832c-184.96 0-351.184-101.376-497.592-300.788C10.384 525.864 8 519.212 8 512s2.384-13.864 6.408-19.212C160.816 293.376 327.04 192 512 192c184.96 0 351.184 101.376 497.592 300.788 4.024 5.348 6.408 12 6.408 19.212s-2.384 13.864-6.408 19.212zM512 768c156.864 0 300.54-84.332 432.012-256C812.54 340.332 668.864 256 512 256c-156.864 0-300.54 84.332-432.012 256C211.46 683.668 355.136 768 512 768z m0-64c-106.04 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z m0-64c70.692 0 128-57.308 128-128s-57.308-128-128-128-128 57.308-128 128 57.308 128 128 128z" p-id="4636" fill="#707070"></path></svg>`;
let svg_unsee = `<svg t="1619143157694" class="icon" viewBox="0 0 1186 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733" width="16" height="16"><path d="M591.707784 915.740462A642.870487 642.870487 0 0 1 2.965954 526.459025a39.298888 39.298888 0 0 1 0-28.91805 632.489649 632.489649 0 0 1 584.292899-388.539948h8.897862a630.265183 630.265183 0 0 1 584.292899 388.539948 39.298888 39.298888 0 0 1 0 28.91805 637.680068 637.680068 0 0 1-336.635757 337.377245 646.577929 646.577929 0 0 1-252.106073 51.904192zM77.856287 512.370744a565.755688 565.755688 0 0 0 1026.961505 0 556.116338 556.116338 0 0 0-508.661077-329.220872h-8.897862a556.857827 556.857827 0 0 0-509.402566 329.220872z" p-id="1734" fill="#707070"></path><path d="M590.966296 732.592814a218.739093 218.739093 0 1 1 222.446535-218.739093 218.739093 218.739093 0 0 1-222.446535 218.739093z m0-362.587852a144.590248 144.590248 0 1 0 148.29769 143.848759 148.29769 148.29769 0 0 0-148.29769-143.848759z" p-id="1735" fill="#707070"></path><path d="M1137.443284 1023.997776a37.074423 37.074423 0 0 1-24.469119-8.897862L20.761677 65.253208A37.074423 37.074423 0 0 1 68.958426 8.900086l1092.212489 946.880752a37.074423 37.074423 0 0 1 0 52.64568 35.591446 35.591446 0 0 1-23.727631 15.571258z" p-id="1736" fill="#707070"></path></svg>`;

let seeStatus = 1; // 0 不可视 1 可视
function initPkg_MonthCost() {
	// if (document.getElementsByClassName("SociatyLabel")[0].innerText == "伐木累") {
	// 	return;
	// }
	initPkg_MonthCost_Dom();
	initPkg_MonthCost_Func();
	seeStatus = MonthCost_getSeeStatus();
	if (seeStatus == 1) {
		document.getElementsByClassName("monthcost__icon")[0].innerHTML = svg_see;
		MonthCost_updateCost();
	} else {
		document.getElementsByClassName("monthcost__icon")[0].innerHTML = svg_unsee;
	}
}

function initPkg_MonthCost_Dom() {
	MonthCost_insertIcon();
}

function MonthCost_insertIcon() {
	let a = document.createElement("span");
	a.className = "month-cost";
	a.innerHTML = `
	本月已消费 <span id="monthcost__money">***</span> 元
	<span class="monthcost__icon"></span>
	`;
	a.title = "数据每日更新，根据个人中心消费数据统计"
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_MonthCost_Func() {
	document.getElementsByClassName("monthcost__icon")[0].addEventListener("click", () => {
		if (seeStatus == 1) {
			seeStatus = 0;
			document.getElementById("monthcost__money").innerText = "***";
			document.getElementsByClassName("monthcost__icon")[0].innerHTML = svg_unsee;
		} else {
			seeStatus = 1;
			document.getElementsByClassName("monthcost__icon")[0].innerHTML = svg_see;
			MonthCost_updateCost();
		}
		MonthCost_saveSeeStatus();
	})
	
}


function MonthCost_saveSeeStatus() {
	localStorage.setItem("ExSave_MonthCost_SeeStatus", seeStatus);
}

function MonthCost_getSeeStatus() {
	let storage = localStorage.getItem("ExSave_MonthCost_SeeStatus");
	if (storage == null) {
		storage = 1;
	}
	return storage;
}

function MonthCost_queryData(url) {
    return new Promise(resolve => {
        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

async function getMonthCost() {
	totalMonthCost = 0;
	let ret = await MonthCost_queryData("https://www.douyu.com/member/cp/getYcConsumeTypeList");
	typeNum = ret.data.length - 1;
	if (ret.code == 0) {
		// 跳过第一个 也就是全部，全部不支持查询月数据
		for (let i = 1; i < ret.data.length; i++) {
			let item = ret.data[i];
			calcMonthCost(item.type);
		}
	}
}

async function calcMonthCost(type) {
	// type: 礼物(1) 太空魔盒(3) 福袋礼物(5) 甜蜜告白(6) 音乐学徒(19)
    let [beginTime, endTime] = getMonthTimeRange();
    let host = "https://www.douyu.com/member/cp/getYcTransactionList";

    let lastId = "";
    let currentNum = 0;
    let currentPage = 1;
    let total = 0;
    let ret;

    do {
        ret = await MonthCost_queryData(host + "?" + `firstId=&lastId=${lastId}&propType=0&beginTime=${beginTime}&endTime=${endTime}&type=${type}&pageNum=${currentPage}&pageSize=100`)
        if (ret.code == "0") {
            let len = ret.data.details.length;
            if (len == 0) {
                break;
            }
            lastId = ret.data.details[len - 1].id;
            total = Number(ret.data.total);
            currentNum += Number(ret.data.pageSize);
            currentPage++;
            
            for (let i = 0; i < ret.data.details.length; i++) {
                let item = ret.data.details[i];
				totalMonthCost += Number(item.price) * Number(item.number);
            }
            
        } else {
            console.log(ret.msg);
            break;
        }
    } while (currentNum < total);
	typeCount++;
	if (typeCount >= typeNum) {
		// 结束
		MonthCost_saveData();
		document.getElementById("monthcost__money").innerText = String(totalMonthCost/ 100);
	}
}

function getMonthTimeRange() {
	let now = new Date();
    let nowMonth = now.getMonth();
    let nowYear = now.getFullYear(); 
    let monthStartDate = new Date(nowYear, nowMonth, 1); 
	return [Math.round(new Date(monthStartDate).getTime() / 1000).toString(), Math.round(now.getTime() / 1000).toString()];
}

function MonthCost_saveData() {
	let data = {
		monthCost: totalMonthCost,
		updateTime: new Date().getTime()
	}
	let storage = localStorage.getItem("ExSave_MonthCost");
	if (storage !== null) {
		storage = JSON.parse(storage);
	} else {
		storage = {};
	}
	storage[my_uid] = data;
	localStorage.setItem("ExSave_MonthCost", JSON.stringify(storage));
}

function MonthCost_getData() {
	let storage = localStorage.getItem("ExSave_MonthCost");
	if (storage !== null) {
		storage = JSON.parse(storage);
	} else {
		storage = {};
	}
	return storage;
}

function MonthCost_updateCost() {
	let timeDiff = 1;
	let tmpCost = 0;
	// 默认为1，也就是要更新
	let now = new Date().getDate();

	let storage = MonthCost_getData();
	if (my_uid in storage) {
		let item = storage[my_uid];
		timeDiff = Math.abs(now - new Date(item.updateTime).getDate());
		tmpCost = item.monthCost;
	}

	if (timeDiff >= 1) {
		getMonthCost();
	} else {
		document.getElementById("monthcost__money").innerText = String(tmpCost/ 100);
	}
}
let svg_night  = '<svg t="1587640254282" class="icon" viewBox="0 0 1055 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5670" width="26" height="26"><path d="M388.06497 594.013091c-96.566303-167.253333-39.067152-381.889939 128.217212-478.487273a348.656485 348.656485 0 0 1 256.248242-36.864C623.491879-5.306182 435.417212-11.170909 276.542061 80.616727 37.236364 218.763636-44.776727 524.815515 93.401212 764.152242c138.146909 239.305697 444.198788 321.318788 683.535515 183.140849 158.875152-91.725576 247.870061-257.520485 249.669818-428.559515a348.656485 348.656485 0 0 1-160.085333 203.496727c-167.253333 96.566303-381.889939 39.036121-478.487273-128.217212" p-id="5671" fill="#8a8a8a"></path></svg>';
let svg_day = '<svg t="1587640423416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2270" width="26" height="26"><path d="M270.016 197.248l-83.84-84.544-69.76 70.464 83.776 84.544 69.76-70.4zM139.648 465.024H0v93.888h139.648V465.024zM558.528 0H465.472v136.192h93.056V0z m349.056 183.168l-69.76-70.464-83.84 84.544L819.2 263.04l88.384-79.872z m-153.6 643.584l83.84 84.48 65.28-65.728L819.2 760.96l-65.216 65.792z m130.368-267.84H1024V465.024h-139.648v93.888zM512.064 230.08C358.4 230.08 232.768 356.992 232.768 512c0 155.008 125.632 281.856 279.296 281.856 153.6 0 279.232-126.848 279.232-281.856 0-154.944-125.632-281.856-279.232-281.856zM465.472 1024h93.056v-136.256H465.472V1024z m-349.056-183.232l69.76 70.4 83.84-84.48L204.8 760.96 116.48 840.768z" p-id="2271" fill="#8a8a8a"></path></svg>';

let currentMode = 0; // 0日间模式 1夜间模式
function initPkg_Night() {
	initPkg_Night_Dom();
    initPkg_Night_Func();
    initPkg_Night_Set();
    watchBottomIframe();
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
    // GM_setValue("ExSave_NightMode", currentMode);
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
    // let ret = GM_getValue("ExSave_NightMode");
    // if (ret && ret == 1) {
    //     setNightMode();
    // }
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
    // let ret = GM_getValue("ExSave_NightMode");
    // let a = document.getElementById("ex-night");
    // if (ret && ret == 1) {
    //     currentMode = 1;
    //     a.innerHTML = svg_night;
    //     a.title = "切换日间模式";
    // }

}

function initPkg_Night_Func() {
	document.getElementById("ex-night").addEventListener("click", function() {
        let a = document.getElementById("ex-night");
        if (currentMode == 0) {
            currentMode = 1;
            a.innerHTML = svg_night;
            a.title = "切换日间模式";
            setNightMode();
            saveData_Mode();
            setNightModeIframe();
        } else {
            currentMode = 0;
            a.innerHTML = svg_day;
            a.title = "切换夜间模式";
            cancelNightMode();
            saveData_Mode();
            cancelNightModeIframe();
        }
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
    .FansRankBottom,.AnchorFriend-footer{border-top:1px solid rgb(47,48,53) !important;}
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
    .AnchorFriendPane-title{border-bottom:1px solid rgb(47,48,53) !important;background-color:rgb(35,36,39) !important;}
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
    .AnchorFriend-content,.SociatyAnchor-content{background-color:rgb(35,36,39) !important;border-top:1px solid rgb(47,48,53) !important;}
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
    #red_envelope_text,#red_envelope_query{color:rgb(191,191,191) !important;}
    .layout-Container{background-color:rgb(35,36,39) !important;}
    .FansRankBottom-invisible,.ChatRankWeek-invisibleContent{background:rgb(47,48,53) !important;}
    .Barrage-roomVip--super{border-top: 1px solid rgb(37,38,42)!important;border-bottom: 1px solid rgb(37,38,42)!important;background: rgb(37,38,42)!important;}
    .Barrage-userEnter--vip{background: rgb(37,38,42)!important;}
    .ChatRankWeek-nobleInvisible{border-top:1px solid rgb(121,127,137) !important;}
    #refresh-video2-svg{fill:#ffffff !important}
    .VideoRecommendItem a{border-bottom: 3px solid rgb(35,36,39) !important;}
    .AnchorFriendPane-title a:after{display:none !important;}

    .MedalOwnerInfo-box{border-bottom: 1px solid rgb(79 81 88)!important;}
    .FansMedalList-item.is-NoWear{border-top: 1px solid rgb(79 81 88)!important;}

    /*弹幕时速*/
    .barrageSpeed{color: rgba(255,255,255,0.5) !important;}

    /*用户等级*/
    ${getUserLevelNightModeStyle()}
    `;
    StyleHook_set("Ex_Style_NightMode", cssText);

}
function cancelNightMode() {
    StyleHook_remove("Ex_Style_NightMode");
}

function getUserLevelNightModeStyle() {
    let ret = "";
    for (let i = 1; i < 70; i++) {
        ret += ".shark-webp .UserLevel--" + String(i) + ",";
    }
    ret = ret.substring(0, ret.length - 1);
    ret += `{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADACAMAAAAN8R4NAAACXlBMVEUiJipt1QAAy8P/phPisGQnKy8AzMSA2iAh08tp3tr/sjMsMDOq52rTu5TkunmbrI//y3bmvoBWV1Zz3toZ0coRz8gxNTk2Oj1x1gZjdnlGR0h01wuw6XTB7ZMs1c7/rSMGzsZ21w9z2QANzsf/xWO2qZN82Rmck4WK3THktm//tz6Y4kp82db/u0n/sCvDr4882NLavZB42BKo5mZykZFvioz/rBOf5FZ81dP+1Y//uECS3z9g3dlW3Nflsma564N53NhpgYKtwppM2tWfsZL/z39aYFxIUFHG66C1zZ48QUT/qBb/x2qi5FuA1tQz1tAw1s+tn4hA2dK26n6Kg3jkuHQ+QEP/tTjjs2rC36ON3jaI3S5v3tpE2tMd0sqBsK//ynG/sJX/wVhESUm87Ihj3tpm3tnjy6KH3Cv/qRrkwo2P3zvmwIWDkHyk5WD/vlI+RUiE0c+Ctra3zaD/04n/znxYWVZI2tN7oqKu6HD61522pYpxbmec41KV4ESFw8Lw06KBfHJebnFQXV/cxqD+1pLmwYiD2yT/qx1c3NfE5KPJt5pUWlaB1NI319F4mJrlunny1aOwx53XvZKWjH1R29Yl08392Jt3mJhRXV9LV1nJtJKRinxoZWFdXVmEzMrD7ZZOTk9jamOtwpu77IX/0IGmupZ0fnL/w11+qancv5G97Yt9iHl4dGz/vU+y6XWnmYVYZ2htdWyDtraNmoW916GvpI/hwI2DyMbOt5JXZ2h72Ravo42lm4iflIHlu3x62NWEvbuDvbvWwp+ToomVi3xkdnnjsmhMTk2mupX0jOxvAAAZBUlEQVR42uyb/V9TVRzHP+PeM5UJsikbYTmIBxm4IZAZQyMfCgTNsIHzqZBKZU3pQbAAiZlODDOJykqhrCwjIbMHtF7ac9p/1T2XnddJzr079wd6ycv1/eEcNj+v8zpvd7zct9873G+zVPc/rFqqh63mHlQs1YNW92e3p1koux22ewmkRe61qeWwUOWq1ZzyqJXco4rV/dkXwkIt1ICJlSCxqbBUqtWcYi2nWN1fGixVGmyg9fHLwMufAWw8WVt7Bdj2mVYbQIsD4x0X4GoC2OhoamoRgLXYKDCqBRLjaEgfpgF37wZ2HwOAIn0811ndkpgYMPgGnwWAt+lI3/kewIZ6TBUD/ugB4IHHATY+Pe+qA8Bbr00DnjMfeMO2FkBJDTRS2/bttg0oq9y3b1/tdODMDKBXdQGIxgH03oxGVRcHFmPOKNwZqlMfpgGnZwF7lR8ABP3Qfmws9TcuZRMD5hv8nG7wedC6z7YSj1XZdkwDnjtPg0xbA2DzcgC/FKyeOxd1e+xPGACjsgo4absPwPZNQE0ZSp6EXiIwfNrgUN+h1MNANMKBhZhbi2VEo046GAHD2wqcV84A2NoB+AvZBA7MN/iYvkEsyJ+zEvNrthsBI3sP8IL9RcCR9xs8W9bMW37KEPhAMVCb4wZQR9AwpwrFta/O328MnNEMNN0EAAKQzAwT4GEaCxMQVDjpYAi8MQBUtzvoT0cpNJsYsLhBbXcf16xEA1YaAq9aBCzLI8DVvDU7F9bBgdWGwGu1M11SBr0O20oIciqramxvGAK7VBecic91THWCA5vEKKsJcJFShGAbpuqgcpRNHFjYYM0maMAwAV6RtgJPrAOwsGDRukXZBIbAdKy6kuDDyfriA6i/Qk+2CDw1OtQY9HLEmoVPmMfcakwCjEBrl9I/tdTFgSE2CcB0g4/Z6gF8vYMkA8ZTz9XZX6LAaW/BkXfVFPjV4ifz6UzKNgDzi931DUBVsTFweXO5D7QiLnrARWAWa/JBBtwZOOgFrdz0rTE+icB0gwTAjsWVlTk5JabAOxc9UkDnq3YHpTcCXrlAq/22/E2gVVayf+2cGuSXndxWuVIAHsvVqkX1DU8BR1tcmXED4IpcWixmAly4VKuQ4t0IWm3eo0VF59jEgMUN7l+/fn1J33dGwKvv0epIWvYJACAFz3neTHvJCNhGq26HbQP0BWtyFh++gg0ltspNbgFYpUWcid9FLfGbvjEHBxZio8mAFVotpcogaLXTV1vZxID5Bp9hGwTMjnQaLc8S7SzTeiU7LW8hRGCx3AS0GtjrO3enBXlxYLHqcFulpeCtZarJQ8rpodUN3jXAM31U1bNWcmfv3JG2epG5ay5aKkxF1/WOCCLG9FnI3Zi+VgggPWdzrfnw+erqEQZsosOffkWd6dVnn2G/lgx1+PWFj7wO4MjOxz0isH4zOD4lulHAPaw6jYC56DJ7cPvCQo6v5YxiyoRJsy/iO2vFh482+v3KIAM21OFP8hdr7+Ts2J6zngMLOnxPwa4t9jV4Om/Jqbx7OLChwSIjHhWBxRhFchoA89CNxFrlYYImnxUf9m/UpjYOLOow2bdPA97XB2xfyYBFHcaWdcCeZXhvF3BqNQcWDdZHwOzVBDgjIboAKiJ/CsB8rZ4wW+tGOVCuWvHhXIKWQCsHFnQYm/ruW6yN24DjfQxY1GHY31w27xXgxNOg0AzYTHSTAvPYn5lEADZby+WrsObDF5UgOLCgw/fNcVNgAE/atjFgUYc/SFu0fLP9WwB4xP4lBxYNdlwGzEU315cLM2A0377WjfCwNR/G+f7ARgYs6vCC/AXQgd2HF9eDAQs6rAGvAnbtAsi7Bb/BBJgZrAAsxHr0WM9Nny+satRGwGe1EF+rIhyCFR8mbYNAVoABizr8ZE5l5WJb5R91x49fAgMWdZgeaWDeIjTMfe8bGAFXJES3whRYjJFbt26Vh2/x3DQb5muF1B6Xy2XJh4OxovQJBizqcJ2mw/fmrCdl+dvWrv2DAYs6jHVLvlmx6F0cKvhyxYq/OLAoukmAxRiEI228VkSllWvBh0P+xoHCLgZsrMP0SOfQN49zYEGHPafS0pY7kEfffG8KeJbeaTlmyocdDrCa1cD/3a1l6slDyulhygHP8FGd/f/Fk3oXLZg0dEeatBo18+HLABs95T0e8JwYYj6MULnLig+zl3Iffqy29gsrPvzCsmUfisD0bnBkSmHjACI+p9PZIwAL/eFcXyQi9Id5iPswmjMnw8NWfBgY9Q5A7sPbcmgb24oPnzplf58Bm/V9Gay5DxM9F5kEMnp4ztCtaWf4cjNwOWzFh0FKtw5A7sO0jf18mdyHT50Alh/iwEYNXaC55+w14aiKqgv1ck/GiLkPX2Y+DELoOxZ8WJs7zgxA5sOsjS334QbA89QeBmzmuWHfcFyNJfXhSQAetTkeVcd5Tgjx+/JQOJxrxYfPBBwUWOLDrI1txYfftW8GAzbr+8Y8QDxi7sPDHg2TAg8DESHHpTnEgYlrstmCD5/zngMFlvkwa2PLfRgNvy5aZQLMFJbE+AnkIEKOHmmhPyw2kSlwebn+mct9+GCj1zugeEMyH/5cb2P/JPfhQ+/TSQTWFdbDGrq+iGOE2qwIPJbIjYHWpNPjah7jOVO3DoVH3JNhIvfh3OvXrz86cJ3IfbjkEm1jy3148zcr5m7hwMYN3VGnhk6S+fAIaJGoqsaJBR9GhU+N9lrpDwP0SMt9+Dvaxv5E7sM/Ls8rWF0n10Ni8Q6KEEmOJ2e6P+wm1nzY8b8Pp448pJwephyw1SN41zzykHoXLZO+b28TLSOQGyNUlgE2enpuEKkPj8boSJrcVnz492qtBqU+zCa5DwMrHheBT1/7t+deO336dLMqgNAcbyPHQZ0pEg9b8mEgrvZa8eE2b2lpabXMh9kk92GgrqDAGJgrLK3JuAkw8+YbukYCEfHWkod4r7k8kwLLfTh4EIDUh9kk92FgyRJjYNb3hV4kHDMF5t7sHCNu+pYIzEKs19zr81BguQ8HqjuzxqU+zCa5D+PErhfNgLnCUteBKTD3Zk9YVU9b6Q+7fb2gwHIfbve2+hv7ZT7MJrkPv/iUwwyY4riZ9jdfMwFmuXH9h/hI6PSYuQ/HGLCzHAxY0h8eGgEm2mQ+zCapDx8pOAIzYN73BWKq2wSY+3DCcHvCPGfWa3arPp9PDZfLfdgx1AK0yvvDVYk2scyHf8nLzi6wZx8RgKcpbDwOY+Cxf3uzIzxMPNHTAjCTa+7D2muXetkh92F423KPegul/eErCS2W+XDDmjVrduatIQLwtOeg1ZgJ8O0+HIqq4YjL1IdHGfDUH1vy4cGg9jfgkPkwm+Q+DNAjPXN6SGb+Tsvzf3949vaHZ7s8pJwe3imQ2e/DM/wow13jw1YvRrPBh2/vD6M3o8ct9dwR/TnoDNd04DNUdKsBNg4OoYta7hkObO7DGL9wcBxyH/6efb9Z4sOvPKSVcbu0l/eHy9X4zz4PBxabw+w56MzMSDgEDsxFtwhAqR/oalVKMdSuWe4EBzb34aXejgnlutSH2febpT58KHvJkiXLJP1hovYAP4tSID5T3eMj1CpFYF10u6joZvn9paguBS8lmQ93tAFZ1VIfZt9vlvrwE4+wmAg8xhTWrfYCkZ8tPAcdjdAPvYUDi6LrQGEpsibObNzLgZP4sHKsOut3uQ/r32++ZMGHn1q2c97rkPWHnXH3qM8n91z9rRZ1RATWRbdU1zwKXKi0FQ4UCsCiD48rgYmgYsGHcyoPPG+rl/twXvaq5faXTPvD+mcLjPhU32QmBxZDzHMrgFzVJQDTkYouA949SHtkDgFY8OFxZSPQ0SHvD9d/AdSUyfvDr30IbDF55IH7sIe4EZ+E/DnoSBQIqcQI+FEqugx471Jgt1IkAIvPSzces/S89N/1zwBVxdL+MHnNAzyXpD88ltBhMhIeMe37DoMB96ohtzMODsxFN6aLLjvSgaWxCS//hM19+GJprChwUerDnvyyum35K+X94YJ1DV9mr5b1h11ONdwDU88d4Z57Nqw6CQcWRDcB7GgbaJ8oAgc29eEWv6L4PXIfpt9vPuCW+/D7m+3Zq4iV/vBM930dVu+0PB5rPtyAO94fnv23lqkmDymnhzO9wVkPbPkIXrCSu2A1d+eO9ExfZGb9RUuBXt2DwGC1LqbMX0GOdQ5O2yAXWDYOYW81LVmuH3B0XwghuQ8PZfWDLyjtD1/6uvaStD+cmBiw4K9B3V8bS4Fg+kVvJ9ugmGOem5Wenh5QSPJcYxChdn/hQGdSH97Y2BFI1xf0KkTuwwvy+2psC6Q+nJgYsOCv3Ql/7fY60N8mAAs5WoV+WS6I1iDQPZDMh2NaNrdRV8iLfsh9uK8MqKqV+jCbGLCZv3Z09GcdgwAi5AC0tA/JckEcDHSR1kAyH15a6EFI6WYLynyY2L6qnb9N6sNsYsCm/ro1kN7WftEIhAtsAviCF7JcEAgqjY1FEh92+AMOtqDMh7+wFdeU2N6Q+nBiYsCCv3JgoLud2Y2QGwIHDnQKwFx0GXCWt3t3mxdJfXhp+tZRtqDEhynwAaCvT+rDiUkAZmLKQDr8QBH319tz1TwHDCldAjBbbwAMOJBF/0XvTebD/e2FRJ8Vii3z4fW2ryw9L80mDiyKKQXpb9zb1cb91TQH+P0AJLkg/FtDjk4llMSHPQMTRUVF5wH/BAAL3x/et39t8WGpD7OJAZv5KzoblcAgB7k9t5vnQonjLeY8QS3HgENtA43B7mQ+PKTQuoCQfsDlPvzMdputpkHqw2ziwKbVNcN3UB7r61n04Qa5D/OJAqfgrWWqyUPK6eE/7Z13ixNRFMXvzDobdcSGJrFuxF4RC5YoFnTVxK6oa9fY2yr2LiLELgpGbOjau1gRFawIfivzzAkvz8l7dxwiitn5Y1929/hmj5vNzm/PnXvLznCpn9L//J94yu9Fq4CHC8D0xCGix+M9PLznl9i3ey7Pfb99W1up04Au8NlXPrztQiRvWN9e+vgtcTh6HkZ76SVDxVEEHo6o/Np1bePa5IVi/Pre0w+6dm6/OqnTgC4wm8+Hhx291zf5Gob17aWbpNPpd5YLw/r20o0ymUyrStLy8AXwa20vovFVxfi1ueDXPTLP7dUFn4FOB7rAZzYf7jeMqFZGLbr20uLYv55gWN9eWnzifH/S8PA2wUdzxKXg8KyNQ8q1L2RLBb8mw+IfrBZfZFiY7zJX6nSgGwZccflwr3tuXf4/0NK3lxYPorLbkra9NBFFYgelYR2/bqs6saNvxRHvF/i+4n1hnrt6dsUyECx0WtCFYSYfptlrkxWNHRg2tZempwNIGta1lxaPWpM0rOPXOVlg71JxRf0CgcN1kIWXVx2iqxWrEW9CpwNdGObyYWr85MvZfl1g2NRemrrtloYN7aWp1UIihoeHi3Jf58Jal8lzxVM+OYxoeV+p04AuDLP58HtR0AKQhmFNe+mJ1nNp2NBe+lPlJY/hLleyh8KvF6pmt+01mcx57ur377tTl8ZXvyT3SJ0OdGGYy4frkpMjV4c3hmFTe+n1cZKGDe2l+8+E7Fcebit5eDhR7dqKWrc4vwJzk7k8N9y3IrlU6rSgC8NsPrxnePJorSxb0raX3mhNlIYN7aXfVn4iX3jozPF7ZTTHKe2VVjhAvbS5vXQ9D5cNPJQdHpb6xKXW/TUetp76eWo9tXw+BX3rSs/DJX7xKLmu9Dxs4NLVzbfVKb8eOkwimiSIFG9P5hpa3dw96yR+PXjmI4m3QjExLN6ZSFKn7Dc2v9+NXN/oCdAZ8+G7szok/OTDF0dvcaVhPZduTz6ZW3X110u8GusmuDQ/l6kmGk93O6kYlsL5QjilXe9QN6dwPlLBfpJz0SCrRvSNRu5ryodHRffHo3f4fLhP7Hz/mMyHtVzqJm9nH3qa4jpyLhMaWq0ZQk5ooMew0ykPsNXRGkpZEwvnIxn2U/pGm/LhbqOIDuzn8+FWfYgWyahFy6V1goLuNdZwqdClXEqFBkas60RD0ophFWCd1M/vd+F8JN2cp0hooNI32lQvvWB/uDrdhM+HO553N2cawbCJS4c/qVtWVeUxfNO6CS7N+rR6OC/FFe7TTqrhvHBBTuh0smYps1UMc56UvtGmeumN0aiV9tFP620sVtmQYNjEpV+qKqpqG+u5FA2t7lo1YlqRYtgjfDlKqDyGIbtRuJ/SN9pULx2K10wMDeHrpRv233Vw8UgYNnApPXbr6MlyPZe6ublMTnQFUe/5imFVWNPbEV+uatgrC+f2o5MFfaMN+fB1a1z2cTs2Hx4sXsXwEZsMXJqNaSNf1h7xculLOZfp5c1QnIaE7r6KdlAMq8Jwu92pDlYH1bCXcwkNsn72jcartCEfvhvdlLjbI83mw5tjI9xL0zIwbOLS170q1m4rltOuAZeKhlZDqimSzWkHSiMKwG6l3A+dFWpPimHdnKchN5yo+OAa6Az58MQe0eiBZnw+fHBaLLZoDAwznMtxacT5uaRc1Yj3SGFldNiP1eFI/HY/rTK8tCw3eCg7PPS7YakHUf01w36fMqUeNeZ3v782f7jUw+T+2osWuPQcSBNvq8X8YSwefoVO8qt49yFxc4rbXp7hSsMF532Y2wD7PZJ10CwPH28yq5rnYRETf9ysnT8suRSLl1/HqTrgqTRcpKWWeNhiQ4O20rD3vODrV6iD5nl4txVPD7jL8/DCypmZ1pc8hh3wpuRSLBy/Ak+ZOcUf1hFtkK1fDfuhDprl4bD1lCg9heVhR/x8Z46Z5g+nHMG5WIpzaTupU/pa6e5Hpgf7hGnFsOe8J3/u97MO+hWxPFwtSof3p1ke3mwvITrfkJ8/jMVz4nPWOUUHPGXnFNPeBvukYf15H6EOmuXhHvHqSZ068Tw8febmM507a+YPK1yKheFX4Ck3p9hZV9iB7df9jsv9HqEOmuXhV52sAQdCLA+LTK31ooZFDLdXOPcdFpZfgafNYFjTh9pt+mEOeQ3jvNjv1U++th6KheXhr3fD1RTvzddLX3Q344ZpaXh/kfnDWMz8ei60PiXwtN24sDSs3GqM+5HX9dzXsqV8lTbxMOqgOR524vFETbSG5eFsPOzuit2H4aK8uXG9mD+MBSfW6DrtvwE8LT6n2M3355on3vugGsZ+J9dYrwp4mE6KOugUz8N31ljRWcTz8JiOlbHR7PxhLEYulYLfnlNs3i+V8sfDKZ6H1UJtuwwvLcsNHsoOD/8bsPd5+H1K//t/uvF7/Dd/nPN7eHhTxrmoR9ZzKQYeIafldeBXnnPHIW/WcW6+QdaYhaMTgQyrvCni3AOhbmo9sqJTeRg5LatT+NU8Rym+plu1gXPRIGtJbGbHVpsDGwZvIs5NWBOVemRFp3IzclpWB35lORd5s4Fz0SCr40iihquCG5Zx7gSiGmss6pH1XIqBR8hpWR34leXcBPJmLeeiQZZrvyEamQlqGLwp41zUI/N5LnJaVgd+ZTn3a5a36amBc9Eg67A9CJXQwQyrcW4ukZb1yIZ8GDktqwO/spz7HHmzlnPRIOuSvUTQX3DDapzbbaBSj6zPh999R07L6Qj8ynFuM+TNWs7NN8iKTSXaeTqQYfCmjHMniDgX9chcnluNnJbTEfiV5VzkzXrORYOskQ0v7YpdC2ZY5c0OaSv0VK1HLqbDwCPktKwO/MpyrsibowNNnIsGWe5pO7aSAhjm4lyehxM8N4NfS5X7/hIn2/WXlvXwkDvKDw/9bviv63wb9vuU+dd1vg3bPmX/uu63DHuB85QAzgTRmYN5mZFLDy+cGuF1mAPM6jAfidVhCWDYC5yVDbPA+W3CqsrpeZmZSzuejrVhdZgDzOowH4nVYQluWAJnwv75jWjU/7Q0bODSzCKi0yNZHeYAszrMR2J1WIIblsA5pnLXiKkuuTRSGtZzKR1bIkyzOswBZnWYj8TqsAQ3LIHzhd1x5WJxSmnYwKXi0ejK+6wOc4BZHeYjsToswQ1L4JzwmciNHVQM67mUyDnf+TOvwxxgVof5SKwOS3DDEjjfim1brVIMG7g00TDzjNfJOcCMLj8fidNhCWZYBc4l9pbIaHuJYtjApTs73x88+BurwxxgVpefj8TpsAQ0rALn6MV2x1OkGDZwaUx8MMPqMAeY1WE+EqvDEsCwsfUVZGYu5XVY/th+9ZeW9fBQtnj4jxup5+F6Hg7wKq3hTaUvs63HZvSrYvkV9/GyOqW+2VAHHSwfNvCm0pfZ1mMz+lWx/Ir7eFmdUt9sqIMOlg8beFPpy2zrsRn9qlh+xX28rE6pbzbUQQfLh/W8qfZltrXYjH5VPL/iPl5Op9Y36+ugA+bDBt5U+jLbBmxGSsvxK+7jZXVKfbOhDjpYPmzgTaUvs63HZvSrYvkV9/GyOqW+2VAHHSwf1vOm2pfZ1mMz+lWxnIv7eDmdWt+sr4MOmA8beFPpy2zrsRn9qljOxX28rE6pbzbUQQfLhw28qfRltrXYjH5VPL/iPl5Wp9Q3G+qgg+XDDG+6zBVP5M/wcITVuciH63m4Hh7KHA9/AFW8i/7YsWHhAAAAAElFTkSuQmCC) !important}`;
    return ret;
}

function watchBottomIframe() {
    let h = new DomHook(".BottomGroup", true, (m) => {
        if (currentMode == 0) {
            return;
        }
        if (m.length == 1) {
            setNightModeIframe();
        }
    })
}

function setNightModeIframe() {
    // 设置底部鱼吧的夜间模式
    let dom = document.getElementsByClassName("BottomGroup")[0].getElementsByTagName("iframe")[0];
    if (dom == undefined) {
        return
    }
    StyleHook_setIframe(dom.contentWindow.document, "Ex_Style_NightModeIframe", `
    body,#groupListBox,.mainbg,.wb_card-wbCardDetail-1wzCV,.video-imgWrap-3Mf6v{background: rgb(35,36,39) !important;}
    .wb_card-wbCardWrap-22KrE,.wb_card-topListItemBox-1ui_g{border-bottom: 1px solid rgb(47,48,53) !important;}
    .wb_card-wbInfo-19JiQ a,.wb_card-wbText-2fk2Y{color: rgb(204,204,204) !important;}
    .wb_handle-wbRowLine-3OXI6 li,.wb_card-groupnameAndGrouplevel-38MGW{background: rgb(47,48,53) !important;}
    .index-dyPage-260IV a{background-color: rgb(47,48,53)!important;border: 1px solid rgb(47,48,53)!important;}
    .index-topTypeStyle-2ksW4{background-color: rgb(47,48,53)!important;color: rgb(204,204,204) !important;}
    .index-dyPage-260IV span{background-color: rgb(47,48,53)!important;}

    .index-editorArea-3XhrM input[data-input=title]{background-color: rgb(47,48,53)!important;color:rgb(204,204,204)!important;border: 1px solid rgb(47,48,53)!important;}
    .index-dyPageGoNumber-LGN4a{background-color: rgb(47,48,53)!important;color:rgb(204,204,204)!important;}
    span.index-dyPageActive-op79B{color:rgb(204,204,204)!important;}

    .editor-editorPluginsWrapper-HGPzc{background-color: rgb(47,48,53)!important;border-bottom: 1px solid rgb(47,48,53)!important;border-top: 1px solid rgb(47,48,53)!important;}
    .style-voteicon-3aTqD{color:rgb(204,204,204)!important;}
    .editor-editorWrapper-2fChb{border: 1px solid rgb(47,48,53)!important;}
    .editor-editorPluginsWrapper-HGPzc [data-role="menu"]:hover{background-color: rgb(47,48,53)!important;cursor: pointer!important;}
    .editor-editorContentRoot-3PCjH{color: rgb(204,204,204) !important;}
    .editor-editorNotLoginMask-1hCr-{background-color: rgb(47,48,53)!important;color: rgb(204,204,204) !important;}

    .style-newvoteTopwrapper-3PgJY{background: rgb(47,48,53)!important;}
    .style-newvoteHead-j0bH1{color: rgb(204,204,204) !important;}
    .style-newvoteHeadAttendView-1EgXK, .style-newvoteHeadAttendView-1EgXK:focus{background: rgb(47,48,53)!important;}
    .style-optionWrapper-2FhfD{background: rgb(35,36,39) !important;cursor: pointer!important;}
    .style-newvotestyleTitle-32flx{color: rgb(204,204,204) !important;}
    
    .editor-3MzrC{background: rgb(47,48,53)!important;border-top: 1px solid rgb(47,48,53)!important;border-bottom: 1px solid rgb(47,48,53)!important;}
    .editor-2y1wx{border: 1px solid rgb(47,48,53)!important;color:rgb(204,204,204)!important;}

    .VideoRecommendItem-liveTitle,.Bottom-tab--header{color:rgb(204,204,204)!important;}
    `)
}

function cancelNightModeIframe() {
    StyleHook_removeIframe(document.getElementsByClassName("BottomGroup")[0].getElementsByTagName("iframe")[0].contentWindow.document, "Ex_Style_NightModeIframe")
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

    showPrompt("请填写备注信息（联系方式/收货地址）",async (info) => {
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
var videoPlayerArr = [];

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
        var videoElement = document.getElementById("exVideoPlayer" + String(id));
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
    let box = document.getElementById("exVideoDiv" + String(id));
    
    let scale = document.getElementById("exVideoScale" + String(id));
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
            box.style.width = w + 'px';
            box.style.height = h + 'px';
        }
        document.onmouseup = function (e) {
            e.stopPropagation();
            e.preventDefault();
            
            
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

}

function setElementDrag(id) {
    let box = document.getElementById("exVideoDiv" + String(id));
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
            box.style.left = mouseX + "px";
            box.style.top = mouseY + "px";
        }
        document.onmouseup = function (event) {
            event.stopPropagation();
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}



// Douyu
function createNewVideo_Douyu(id, rid) {
    getRealLive_Douyu(rid, true, true, "1", (lurl) => {
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
            a.id = "exVideoDiv" + String(id);
            a.rid = rid;
            a.className = "exVideoDiv";
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='复制直播流地址'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span></a>";
            html += "<select class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='0'>蓝光</option></select>";
            html += "<select style='display:none' class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路5</option><option value='3'>备用线路6</option></select>";
            html += "<a style='margin-left:5px' href='" + lurl_host + "' target='_blank'>无视频？</a>";
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>";
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
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
    let box = document.getElementById("exVideoDiv" + String(id));
    let exVideoPlayer = document.getElementById("exVideoPlayer" + String(id));
    let info = document.getElementById("exVideoInfo" + String(id));
    let scale = document.getElementById("exVideoScale" + String(id));
    exVideoPlayer.onclick = function(e) {
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
            let box = document.getElementById("exVideoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 1016;
                } else {
                    box.style.zIndex = 1015;
                }
            }
        }
    }
    let exVideoQn = document.getElementById("exVideoQn" + String(id));
    let exVideoCDN = document.getElementById("exVideoCDN" + String(id));
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    exVideoQn.onchange = function() {
        getRealLive_Douyu(rid, true, true, exVideoQn.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    exVideoCDN.onchange = function() {
        getRealLive_Douyu(rid, true, true, exVideoQn.value, (lurl) => {
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    exVideoClose.onclick = function() {
        box.remove();
    }

    let exVideoRID = document.getElementById("exVideoRID" + String(id));
    exVideoRID.onclick = function() {
        getRealLive_Douyu(rid, true, true, exVideoQn.value, (lurl) => {
            GM_setClipboard(String(lurl).replace("https", "http"));
            showMessage("复制成功", "success");
        })
    }
}

function createNewAudio_Douyu(id, rid) {
    getRealLive_Douyu(rid, false, true, "1", (lurl) => {
        console.log(lurl);
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
            a.id = "exVideoDiv" + String(id);
            a.rid = rid;
            a.className = "exVideoDiv";
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='复制音频流地址'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span></a>";
            html += "<select style='display:none' class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='0'>蓝光</option></select>";
            html += "<select style='display:none' class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路5</option><option value='3'>备用线路6</option></select>";
            html += "<a style='margin-left:5px;display:none' href='" + lurl_host + "' target='_blank'>无视频？</a>";
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>";
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
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


// Bilibili
function createNewVideo_Bilibili(id, rid){
    getRealLive_Bilibili(rid, "1", "1", (lurl) => {
        if (lurl != "" || lurl != null) {
            let a = document.createElement("div");
            let html = "";
            a.id = "exVideoDiv" + String(id);
            a.rid = rid;
            a.className = "exVideoDiv";
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='复制直播流地址'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "Bilibili - " + rid + "</span></a>";
            html += "<select class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光</option><option value='5'>原画</option></select>";
            html += "<select class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option><option value='4'>备用线路3</option></select>";
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
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
    let box = document.getElementById("exVideoDiv" + String(id));
    let exVideoPlayer = document.getElementById("exVideoPlayer" + String(id));
    let info = document.getElementById("exVideoInfo" + String(id));
    let scale = document.getElementById("exVideoScale" + String(id));
    exVideoPlayer.onclick = function(e) {
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
            let box = document.getElementById("exVideoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 1016;
                } else {
                    box.style.zIndex = 1015;
                }
            }
        }
    }
    let exVideoQn = document.getElementById("exVideoQn" + String(id));
    let exVideoCDN = document.getElementById("exVideoCDN" + String(id));
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    exVideoQn.onchange = function() {
        getRealLive_Bilibili(rid, exVideoQn.value, exVideoCDN.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    exVideoCDN.onchange = function() {
        getRealLive_Bilibili(rid, exVideoQn.value, exVideoCDN.value, (lurl) => {
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    exVideoClose.onclick = function() {
        box.remove();
    }


    let exVideoRID = document.getElementById("exVideoRID" + String(id));
    exVideoRID.onclick = function() {
        getRealLive_Bilibili(rid, exVideoQn.value, exVideoCDN.value, (lurl) => {
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
            a.id = "exVideoDiv" + String(id);
            a.rid = rid;
            a.className = "exVideoDiv";
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='复制直播流地址'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "Huya - " + rname + "</span></a>";
            html += "<select class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>超清</option><option value='3'>蓝光4M</option><option value='4'>原画</option></select>";
            // html += "<select class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option></select>";
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
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
    let box = document.getElementById("exVideoDiv" + String(id));
    let exVideoPlayer = document.getElementById("exVideoPlayer" + String(id));
    let info = document.getElementById("exVideoInfo" + String(id));
    let scale = document.getElementById("exVideoScale" + String(id));
    exVideoPlayer.onclick = function(e) {
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
            let box = document.getElementById("exVideoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 1016;
                } else {
                    box.style.zIndex = 1015;
                }
            }
        }
    }
    let exVideoQn = document.getElementById("exVideoQn" + String(id));
    // let exVideoCDN = document.getElementById("exVideoCDN" + String(id));
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    exVideoQn.onchange = function() {
        getRealLive_Huya(rid, exVideoQn.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    exVideoClose.onclick = function() {
        box.remove();
    }


    let exVideoRID = document.getElementById("exVideoRID" + String(id));
    exVideoRID.onclick = function() {
        getRealLive_Huya(rid, exVideoQn.value, (lurl, msg) => {
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
    a.id = "exVideoDiv" + String(id);
    a.rid = rid;
    a.className = "exVideoDiv";
    html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span>";
    html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>"
    html += "</div>";
    html += "<iframe class='exVideoPlayer' id='exVideoPlayer" + String(id) + "' src=" + url + "?exid=chun></iframe>" 
    html += "<div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
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
    let box = document.getElementById("exVideoDiv" + String(id));
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    exVideoClose.onclick = function() {
        box.remove();
    }
    box.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("exVideoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 1016;
                } else {
                    box.style.zIndex = 1015;
                }
            }
        }
    }
}
let real_info = {
	view: "",
	showtime: 1015,
	danmu_person_count: "",
	gift_person_count: "",
	paid_person_count: "",
	isShow: 2,
	money_yc: 0,
	money_bag: 0,
	money_total: 0,
}

function initPkg_RealAudience() {
	initPkg_RealAudience_StyleHook();
	initPkg_RealAudience_Dom();
	initPkg_RealAudience_Func();
	setAvatarVideo();
	getRealViewer();

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
		setInterval(getRealViewer, 150000);
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
	document.getElementsByClassName("VideoEntry")[0].style.display = "none";
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
	html += '<span id="real-audience__time" style="white-space: nowrap">' + "已播:" + "****" + "</span>";
	a.innerHTML = html;
	
	let b = document.getElementsByClassName("layout-Player-announce")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_RealAudience_Func() {
	document.getElementsByClassName("real-audience")[0].addEventListener("click", function() {
		openPage(`https://www.doseeing.com/room/${rid}`, true);
	})
}

function getRealViewer() {
	if(document.querySelector(".MatchSystemChatRoomEntry") != null){
		document.querySelector(".MatchSystemChatRoomEntry").style.display = "none";
	}
	GM_xmlhttpRequest({
		method: "GET",
		url: `https://www.doseeing.com/wecr/room/aggr?rid=${rid}&dt=0`,
		headers: {
			"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/90.0.4430.212"
		},
		responseType: "json",
		onload: function(response) {
			let retData = response.response;
			
			let showedTime = 0;
			if (real_info.isShow == 2) {
				showedTime = 0;
			} else {
				if (real_info.showtime == 1015) {
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
			document.getElementById("real-audience__t").title = "活跃人数:" + real_info.view + " 弹幕人数:" + real_info.danmu_person_count + " 送礼人数:" + real_info.gift_person_count + " 付费人数:" + real_info.paid_person_count;
			document.getElementById("real-audience__barrage").innerText = real_info.danmu_person_count;
			// document.getElementById("real-audience__gift").innerText = real_info.gift_person_count;
			document.getElementById("real-audience__money_yc").innerText = real_info.money_yc;
			document.getElementById("real-audience__money").title = "总礼物价值:" + real_info.money_total + " 鱼翅礼物:" + real_info.money_yc;
			
			document.getElementById("real-audience__time").innerText = "已播:" + formatSeconds(showedTime);
			document.getElementById("real-audience__time").title = "开播时间:" + String(dateFormat("yyyy年MM月dd日hh时mm分ss秒 ",new Date(Number(real_info.showtime + "000"))));
			
		}
	});
	
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
	setAvatarVideo_Func(videoUrl, videoReplayUrl);
	document.getElementsByClassName("Title-anchorPic-bottom")[0].style.display = "none";
	document.getElementsByClassName("Title-anchorPic-bottom")[0].style.height = "44px";

	document.getElementsByClassName("Title-anchorPicBack")[0].addEventListener("mouseenter", () => {
		document.getElementsByClassName("Title-anchorPic-bottom")[0].style.display = "block";
	});
	document.getElementsByClassName("Title-anchorPicBack")[0].addEventListener("mouseleave", () => {
		document.getElementsByClassName("Title-anchorPic-bottom")[0].style.display = "none";
	});
}

function setAvatarVideo_Dom() {
	let a = document.createElement("div");
	a.id = "Ex_VideoReview";
	a.className = "Title-anchorPic-bottomItem";
	a.innerHTML = "<span>回看</span>";

	let a1 = document.createElement("i");
	a1.style = "top: 28px";

	let a2 = document.createElement("div");
	a2.id = "Ex_VideoSubmit";
	a2.className = "Title-anchorPic-bottomItem";
	a2.innerHTML = "<span>投稿</span>";

	let b = document.getElementsByClassName("Title-anchorPic-bottom")[0];
	b.insertBefore(a, b.childNodes[0]);
	b.insertBefore(a1, b.childNodes[0]);
	b.insertBefore(a2, b.childNodes[0]);
}

function setAvatarVideo_Func(videoUrl, videoReplayUrl) {
	document.getElementById("Ex_VideoSubmit").addEventListener("click", () => {
		openPage(videoUrl, true);
	})

	document.getElementById("Ex_VideoReview").addEventListener("click", () => {
		openPage(videoReplayUrl, true);
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
    .Barrage-honor,.Barrage-listItem .Barrage-icon,.Barrage-listItem .FansMedal.is-made,.Barrage-listItem .RoomLevel,.Barrage-listItem .Motor,.Barrage-listItem .ChatAchievement,.Barrage-listItem .Barrage-hiIcon,.Barrage-listItem .Medal,.Barrage-listItem .MatchSystemTeamMedal{display:none !important;}
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

let video_num = 0;
function initPkg_Refresh_Video() {
    let timer = setInterval(() => {
        if (document.getElementsByClassName("right-e7ea5d").length > 0) {
            clearInterval(timer);
            initPkg_Refresh_Video_Dom();
            initPkg_Refresh_Video_Func();
            initPkg_Refresh_Video_Set();
        }
        video_num++;
        if (video_num >= 15) {
            clearInterval(timer);
        }
    }, 1500);
}

function initPkg_Refresh_Video_Dom() {
	Refresh_Video_insertIcon();
}
function Refresh_Video_insertIcon() {
	let a = document.createElement("div");
    a.id = "refresh-video";
    a.title = "视频区简洁模式";
    a.innerHTML = '<svg t="1587295753406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6410" width="22" height="22"><path d="M218.88 64l73.728 23.168c-9.792 20.608-18.432 41.216-25.792 61.824h224.896v73.408H362.688c19.648 25.728 39.36 54.08 59.008 84.992l-77.44 42.496a1235.456 1235.456 0 0 0-66.368-127.552h-47.936L189.376 288c-14.72 20.608-34.432 43.776-59.008 69.504L64 307.328C135.296 235.2 186.944 154.112 218.88 64z m383.488 0l70.08 23.168c-7.36 20.608-16 41.216-25.792 61.824h261.824v73.408h-151.168c19.648 25.728 36.864 52.8 51.648 81.088l-66.368 42.496a1440.32 1440.32 0 0 0-70.08-123.584h-59.072a594.816 594.816 0 0 1-95.872 131.264L451.2 303.424C520 231.36 570.432 151.552 602.368 64zM259.456 334.336a491.52 491.52 0 0 1 84.8 108.16l-70.08 38.592c-17.216-36.032-43.008-72.064-77.44-108.16l62.72-38.592z m125.376 48.832H832v472.576c0 33.472-7.36 59.2-22.144 77.248-14.72 17.984-36.864 27.008-66.368 27.008-24.576 0-44.352-1.28-78.784-3.84l-18.432-64c39.36 2.56 71.296 3.84 95.872 3.84 17.216 0 25.792-18.048 25.792-54.08V448.832H384.832V383.168zM128 448h64v512H128V448z m512 64.448V832H320V512.448h320zM576 640V576H384.832v64H576z m-191.168 64v64H576v-64H384.832z" p-id="6411" fill="#ffffff"></path></svg>';
    let b = document.getElementsByClassName("right-e7ea5d")[0];
    b.insertBefore(a, b.childNodes[0]);

    a = document.createElement("div");
    a.id = "refresh-video2";
    a.title = "视频区简洁模式";
    a.innerHTML = '<svg t="1587295753406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6410" width="22" height="22"><path d="M218.88 64l73.728 23.168c-9.792 20.608-18.432 41.216-25.792 61.824h224.896v73.408H362.688c19.648 25.728 39.36 54.08 59.008 84.992l-77.44 42.496a1235.456 1235.456 0 0 0-66.368-127.552h-47.936L189.376 288c-14.72 20.608-34.432 43.776-59.008 69.504L64 307.328C135.296 235.2 186.944 154.112 218.88 64z m383.488 0l70.08 23.168c-7.36 20.608-16 41.216-25.792 61.824h261.824v73.408h-151.168c19.648 25.728 36.864 52.8 51.648 81.088l-66.368 42.496a1440.32 1440.32 0 0 0-70.08-123.584h-59.072a594.816 594.816 0 0 1-95.872 131.264L451.2 303.424C520 231.36 570.432 151.552 602.368 64zM259.456 334.336a491.52 491.52 0 0 1 84.8 108.16l-70.08 38.592c-17.216-36.032-43.008-72.064-77.44-108.16l62.72-38.592z m125.376 48.832H832v472.576c0 33.472-7.36 59.2-22.144 77.248-14.72 17.984-36.864 27.008-66.368 27.008-24.576 0-44.352-1.28-78.784-3.84l-18.432-64c39.36 2.56 71.296 3.84 95.872 3.84 17.216 0 25.792-18.048 25.792-54.08V448.832H384.832V383.168zM128 448h64v512H128V448z m512 64.448V832H320V512.448h320zM576 640V576H384.832v64H576z m-191.168 64v64H576v-64H384.832z" p-id="6411" id="refresh-video2-svg"></path></svg>';
    b = document.getElementsByClassName("PlayerToolbar")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Refresh_Video_Func() {
	document.getElementById("refresh-video").addEventListener("click", function() {
        let dom_toolbar = document.getElementsByClassName("PlayerToolbar-Content")[0];
        let dom_video = document.getElementsByClassName("layout-Player-video")[0];
        let dom_refresh2 = document.getElementById("refresh-video2");
        if (dom_toolbar.style.visibility == "hidden") {
            dom_toolbar.style.visibility = "visible";
            dom_video.style = "";
            dom_refresh2.style.display = "none";
            refresh_Video_removeStyle();
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_refresh2.style.display = "block";
            refresh_Video_setStyle();
        }
        saveData_Refresh();
    });
    document.getElementById("refresh-video2").addEventListener("click", function() {
        let dom_toolbar = document.getElementsByClassName("PlayerToolbar-Content")[0];
        let dom_video = document.getElementsByClassName("layout-Player-video")[0];
        let dom_refresh2 = document.getElementById("refresh-video2");
        if (dom_toolbar.style.visibility == "hidden") {
            dom_toolbar.style.visibility = "visible";
            dom_video.style = "";
            dom_refresh2.style.display = "none";
            refresh_Video_removeStyle();
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_refresh2.style.display = "block";
            refresh_Video_setStyle();
        }
        saveData_Refresh();
    });
}

function refresh_Video_getStatus() {
    let dom_toolbar = document.getElementsByClassName("PlayerToolbar-Content")[0];
    if (dom_toolbar.style.visibility == "hidden") {
        return true;
    } else {
        return false;
    }
}
// FullPageFollowGuide
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
            let dom_refresh2 = document.getElementById("refresh-video2");
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_refresh2.style.display = "block";
            refresh_Video_setStyle();
        }
    }
}

function refresh_Video_setStyle() {
    StyleHook_set("Ex_Style_VideoRefresh", `
    .RandomPKBar,.LiveRoomLoopVideo,.LiveRoomDianzan,.maiMaitView-68e80c,.PkView{display:none !important;}
    `)
}

function refresh_Video_removeStyle() {
    StyleHook_remove("Ex_Style_VideoRefresh");
}
function initPkg_RemoveAD() {
    let t = setInterval(() => {
        let a = document.getElementsByClassName("PlayerToolbar-wealthNum")[0];
        if (a != undefined) {
            optimizePageStyle();
            removeChatLimit();
            clearInterval(t);
        }
    }, 1000);
    
}
// .dy-ModalRadius-mask,dy-ModalRadius-wrap{display:none !important;}
function removeAD() {
    StyleHook_set("Ex_Style_RemoveAD", `
    .XinghaiAd,.CustomGroupGuide,.FudaiGiftToolBarTips,.UserInfo-tryEnterHiddenLead,.BargainingKit,.AnchorPocketTips,.FishShopTip,.FollowGuide,#js-bottom-right-cloudGame,.CloudGameLink,.RoomText-icon-horn,.RoomText-list,.Search-ad,.RedEnvelopAd,.noHandlerAd-0566b9,.PcDiversion,.DropMenuList-ad,.DropPane-ad,.WXTipsBox,.igl_bg-b0724a,.closure-ab91fb,.VideoAboveVivoAd,.pwd-990896,.css-widgetWrapper-EdVVC,.watermark-442a18,.FollowGuide-FadeOut,.MatchSystemChatRoomEntry-roomTabs,.FansMedalDialog-normal,.GameLauncher,.recommendAD-54569e,.recommendApp-0e23eb,.Title-ad,.Bottom-ad,.SignBarrage,.corner-ad-495ade,.SignBaseComponent-sign-ad,.SuperFansBubble,.is-noLogin,.PlayerToolbar-signCont,#js-widget,.Frawdroom,.HeaderGif-right,.HeaderGif-left,.liveos-workspace{display:none !important;}
    .Barrage-topFloater{z-index:999}
    .danmuAuthor-3d7b4a, .danmuContent-25f266{overflow: initial}
    .BattleShipTips{display:none !important;}
    .LastLiveTime,.recommendView-3e8b62{display:none !important;}
    .TurntableLottery-actTips{display:none !important;}
    .feedback-e27241{display:none !important;}
    .FansMedalEnter-maxFlag{display:none !important;}
    .Header-follow-listBox{max-height:640px !important;}

    .GuessGameMiniPanelB-wrapper{display:none !important;}

    .ZoomTip{display:none !important;}

    /*福利券*/
    .PlayerToolbar-couponInfo{display:none !important;}
    /*太空探险tips*/
    .AroundStarsActTips-actTips,.AroundStarsMoonBoxTips,.AroundStarsPlanetTips{display:none !important;}
    /*优化页面*/
    #js-barrage-list-parent{scrollbar-width: none;-ms-overflow-style: none;width:98%;height:100%}
    #js-barrage-list-parent::-webkit-scrollbar{display: none;}
    /*陪玩*/
    .InteractPlayWithEnter-enterTips1{display:none !important;}
    `);
    // body{transform: translateZ(0)!important;}
    // .RomanticDatePanelModal-middle--small{height:220px !important;}
    // .MainDialog-main--content{height:450px !important;}
    // .RomanticDatePanelModal-middle--rowItemBottom--rowItemBottomBtn{margin-left:0px !important;margin-top:0px !important;width:170px !important;height:40px !important;background:orange !important;}
    // }
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

function optimizePageStyle() {
    // 弹幕框滚动条隐藏
    let dom_barrage = document.getElementById("js-barrage-list").parentNode;
    dom_barrage.id = "js-barrage-list-parent";
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
	a.innerHTML = '<a class="ex-panel__icon" title="一键签到(所有关注的直播间/鱼吧/客户端/车队/活动)"><svg style="display: block;" t="1578566545259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12959" width="32" height="32"><path d="M698.368 80.896v114.688c0 23.552 19.968 43.008 44.032 43.008s44.032-19.456 44.032-43.008V80.896c0-23.552-19.968-43.008-44.032-43.008s-44.032 18.944-44.032 43.008zM227.328 80.896v114.688c0 23.552 19.968 43.008 44.032 43.008 24.576 0 44.032-19.456 44.032-43.008V80.896c0-23.552-19.968-43.008-44.032-43.008-24.576 0-44.032 18.944-44.032 43.008z" fill="#F96C5D" p-id="12960"></path><path d="M977.92 195.584c0-23.552-19.968-43.008-44.032-43.008h-88.576v43.008c0 55.296-46.08 100.352-102.912 100.352s-102.912-45.056-102.912-100.352v-43.008H374.272v43.008c0 55.296-46.08 100.352-102.912 100.352-56.832 0-102.912-45.056-102.912-100.352v-43.008H79.872c-24.576 0-44.032 19.456-44.032 43.008v611.328l252.928-145.92-8.192-8.192c-10.24-9.728-16.384-23.552-16.384-38.4 0-29.696 25.088-54.272 55.808-54.272 15.36 0 29.184 6.144 39.424 15.872l28.16 27.648L977.92 263.168V195.584z" fill="#F96C5D" p-id="12961"></path><path d="M329.216 278.528c-5.632 3.584-11.264 6.656-17.408 9.216 5.632-2.56 11.776-5.632 17.408-9.216zM344.064 266.24c4.608-4.608 8.704-9.728 12.8-14.848-3.584 5.632-8.192 10.24-12.8 14.848zM329.216 278.528c5.632-3.584 10.752-7.68 15.36-12.288-5.12 4.608-10.24 8.704-15.36 12.288zM449.536 664.064l220.16-214.016c10.24-9.728 24.064-15.872 39.424-15.872 30.72 0 55.808 24.064 55.808 54.272 0 14.848-6.144 28.672-16.384 38.4l-259.072 252.416c-10.24 9.728-24.064 15.872-39.424 15.872s-29.184-6.144-39.424-15.872l-121.344-118.272L35.84 806.912v104.96c0 23.552 19.968 43.008 44.032 43.008h854.016c24.576 0 44.032-19.456 44.032-43.008V263.168L387.584 603.648l61.952 60.416zM350.72 569.856c-4.608-3.072-9.216-5.12-14.336-6.656 5.12 1.024 10.24 3.584 14.336 6.656zM271.36 295.936c14.336 0 27.648-2.56 39.936-7.68-12.288 4.608-25.6 7.68-39.936 7.68z" fill="#F15A4A" p-id="12962"></path></svg><i id="ex-sign__tip" class="ex-panel__tip"></i></a>';
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
		// initPkg_Sign_Aoligei();
		// initPkg_Sign_Ad_Yuba();
		// initPkg_Sign_Bycc();

		// saobai后每秒签到一个
		// initPkg_Sign_Saobai();
		// initPkg_Sign_Changzheng();
		// initPkg_Sign_Chengxiao();
		// initPkg_Sign_WuXuanyi();
		// initPkg_Sign_1000();
        // initPkg_Sign_Zhuli();

		initPkg_Sign_TV();
		initPkg_Sign_Yuba_Like();
        
        // initPkg_Sign_Renlei();
        initPkg_Sign_Act();
        // initPkg_Sign_Bowuyuan();
        // initPkg_Sign_ZBXSL2();
        // initPkg_Sign_COD();
		// initPkg_Sign_Wangzhe();
}

// function takeActPrize(name) {
//     // 关注20200911LMJX_T2
//     // 分享20200911LMJX_T5
//     return new Promise(resolve => {
//         fetch('https://www.douyu.com/japi/carnival/nc/actTask/takePrize',{
//             method: 'POST',
//             mode: 'no-cors',
//             credentials: 'include',
//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//             body: `token=${ dyToken }&aid=android&taskAlias=${ name }`
//         }).then(res => {
//             return res.json();
//         }).then(ret => {
//             resolve(ret);
//         }).catch(err => {
//             console.log("请求失败!", err);
//         })
//     })
// }


// function addFollowRoom(rid) {
//     return new Promise(resolve => {
//         fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/add',{
//             method: 'POST',
//             mode: 'no-cors',
//             credentials: 'include',
//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//             body: `rid=${ rid }&ctn=${ getCCN() }`
//         }).then(res => {
//             return res.json();
//         }).then(ret => {
//             resolve(ret);
//         }).catch(err => {
//             console.log("请求失败!", err);
//         })
//     })
// }


// function removeFollowRoom(rid) {
//     return new Promise(resolve => {
//         fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/rm',{
//             method: 'POST',
//             mode: 'no-cors',
//             credentials: 'include',
//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//             body: `rid=${ rid }&ctn=${ getCCN() }`
//         }).then(res => {
//             return res.json();
//         }).then(ret => {
//             resolve(ret);
//         }).catch(err => {
//             console.log("请求失败!", err);
//         })
//     })
// }

// function shareAct(name) {
//     // 20200911LMJX
//     return new Promise(resolve => {
//         fetch('https://www.douyu.com/japi/carnival/common/share',{
//             method: 'POST',
//             mode: 'no-cors',
//             credentials: 'include',
//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//             body: `actAlias=${ name }&token=${ dyToken }`
//         }).then(res => {
//             return res.json();
//         }).then(ret => {
//             resolve(ret);
//         }).catch(err => {
//             console.log("请求失败!", err);
//         })
//     })
// }


// function getJackpot(id) {
//     return new Promise(resolve => {
//         fetch("https://www.douyu.com/japi/carnival/nc/lottery/jackpot", {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json;charset=UTF-8'},
//             body: `{"activityId":"${ id }","token":"${ dyToken }"}`
//         }).then(res => {
//             return res.json();
//         }).then(ret => {
//             resolve(ret);
//         })
//     })
// }


// function getActRemaining(id) {
//     return new Promise(resolve => {
//         fetch("https://www.douyu.com/japi/carnival/nc/lottery/remaining?activityId=" + id, {
//             method: 'GET',
//             mode: 'no-cors',
//             credentials: 'include',
//             headers: {'Content-Type': 'application/json;charset=UTF-8'},
//         }).then(res => {
//             return res.json();
//         }).then(ret => {
//             resolve(ret);
//         })
//     })
// }

function initPkg_Sign_Act() {
    getAct();
}

async function getAct() {
    let actList = await getActList();
    actList = JSON.parse(decodeURIComponent(escape(window.atob(actList))));
    if ("data" in actList == false) {
        return;
    }
    for (let i = 0; i < actList.data.length; i++) {
        let eachAct = actList.data[i];
        let name = eachAct.name;
        for (let j = 0; j < eachAct.script.length; j++) {
            let script = eachAct.script[j];
            let value = script.value;
            
            let ret;
            let ret2;
            switch (script.name) {
                case "signAct":
                    ret = await signAct(value);
                    if (ret.error == "0") {
                        showMessage(`【${name}】签到完毕`, "success");
                    } else {
                        showMessage(`【${name}】${ret.msg}`, "error");
                    }
                    break;
                    
                case "userStatus":
                    ret = await userStatus(value);
                    if (ret.error == 0) {
                        for (let key in ret.data) {
                            let item = ret.data[key];
                            let cnt = item.curCompleteNum - item.curDeliverNum;
                            let name2 = name + "-" + item.taskName;
                            for (let i = 0; i < cnt; i++) {
                                let ret2 = await takeActPrize(key);
                                if (ret2.error == "0") {
                                    showMessage(`【${name2}】获得` + ret2.data.sendRes.items[0].prizeName + "*" + ret2.data.sendRes.items[0].prizeNum, "success");
                                } else {
                                    showMessage(`【${name2}】${ret2.msg}`, "error");
                                }
                            }
                        }
                    }
                    break;
                    
                case "addFollowRoom":
                    await addFollowRoom(value);
                    break;
                case "removeFollowRoom":
                    await removeFollowRoom(value);
                    break;
                case "shareAct":
                    await shareAct(value);
                    break;
                case "doSign":
                    await doSign(value);
                    break;
                case "getActRemaining":
                    ret = await getActRemaining(value);
                    if (ret.error == "0") {
                        for (let i = 0; i < ret.data.freeCount; i++) {
                            ret2 = await getJackpot(value);
                            if (ret2.error == "0") {
                                showMessage(`【${name}】礼盒开启：${ret2.data.giftName}`, "success");
                            }
                        }
                    }
                default:
                    break;
            }
        }
    }

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
    // 1. get page counts(1015)
    // 2. for in all pages
    // 3. sign each room
    let pageCount = 0;
    let signedCount = 0;
    let count = 0;
    fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/list?page=1015',{
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
            }).then(ret1 => {
                let roomCount = Number(ret1.data.list.length);
                for (let i = 0; i < roomCount; i++) {
                    if (isAll == false) {
                        if (ret1.data.list[i].show_status == "1") {
                            signRoom(ret1.data.list[i].room_id);
                            signedCount++;
                        }
                    } else {
                        signRoom(ret1.data.list[i].room_id);
                        signedCount++;
                    }
                    count++;
                    if (count == ret1.data.total && i == roomCount - 1) {
                        let rest = Number(ret1.data.total) - signedCount;
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
            getSupplementaryNums(group_id).then(async (numsRet) => {
                if (numsRet.status_code == "200") {
                    let nums = numsRet.data.supplementary_cards;
                    for (let j = 0; j < nums; j++) {
                        let a = await signSupplementary(group_id);
                        if (a.message == "补签失败" || a.message == "系统维护中") {
                            break;
                        }
                    }
                }
            })
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

function getSupplementaryNums(group_id) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://yuba.douyu.com/wbapi/web/signDetail?group_id=" + group_id,
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "dy-client": "pc",
              "dy-token": dyToken
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}

function signSupplementary(group_id) {   
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://mapi-yuba.douyu.com/wb/v3/supplement",
            responseType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "client": "android",
                "token": dyToken,
            },
            data: "group_id=" + group_id,
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}
function initPkg_Sign_Yuba_Like() {
    likeYuba();
}

function likeYuba() {
    let pid = "502737841569427537";
    // likeYubaPostComment(pid, "1483548421625277411", "-1").then(() => {likeYubaPostComment(pid, "1483548421625277411", "1")});
    // likeYubaPostComment(pid, "1483548421625277411", "-1").then(() => {likeYubaPostComment(pid, "1483548421625277411", "1")});
    // likeYubaPostComment(pid, "1482171839375552044", "-1").then(() => {likeYubaPostComment(pid, "1482171839375552044", "1")});
    // likeYubaPostComment(pid, "1481389816302095706", "-1").then(() => {likeYubaPostComment(pid, "1481389816302095706", "1")});
    // likeYubaPostComment(pid, "1470603012833589758", "-1").then(() => {likeYubaPostComment(pid, "1470603012833589758", "1")});
    likeYubaPost(pid, "-1").then(() => {likeYubaPost(pid, "1")});
    showMessage("【鱼吧点赞】已完成", "success");
}

function likeYubaPostComment(post_id, commnet_id, type) {
    let data = `pid=${ post_id }&comment_id=${ commnet_id }&type=${ type }`;
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://yuba.douyu.com/ybapi/follow/like",
            data: data,
            responseType: "json",
            headers: {
                "dy-token": dyToken,
                "dy-client": "pc",
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": "https://yuba.douyu.com/p/502737841569427537"
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function likeYubaPost(post_id, type) {
    let data = `pid=${ post_id }&type=${ type }`;
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://yuba.douyu.com/ybapi/follow/like",
            data: data,
            responseType: "json",
            headers: {
                "dy-token": dyToken,
                "dy-client": "pc",
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": "https://yuba.douyu.com/p/" + post_id
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
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
var curVersion = "2021.06.08.01"
var isNeedUpdate = false
var lastestVersion = ""
function initPkg_Update() {
	initPkg_Update_Dom();
	initPkg_Update_Func();

	// Update_checkVersion(); // 首次检查更新
	if (isNeedUpdate) {
		Update_showTip(true);
	}
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
function checkUpdate_Src() {
	return new Promise((resolve, reject) => {
		fetch('https://www.douyuex.com/src/douyuex_version.txt',{
			method: 'GET',
			mode: 'cors',
			cache: 'no-store',
			credentials: 'omit',
		}).then(res => {
			return res.text();
		}).then(txt => {
			if(txt != undefined){
				if (txt != curVersion) {
					resolve([true, txt]);
				}
			}
			resolve(false);
		}).catch(err => {
			console.error('请求失败', err);
			reject();
		})
	})
}

function checkUpdate_GreasyFork() {
	return new Promise((resolve, reject) => {
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
					resolve([true, v.innerText]);
				}
			}
			resolve(false);
		}).catch(err => {
			console.error('请求失败', err);
			reject();
		})
	})
}

async function Update_checkVersion(isShowNotUpdate = false) {
	// 用解构赋值会导致函数undefined，暂不知原因
	let tmp = [];
	tmp = await checkUpdate_Src().catch(async (err) => {
		tmp = await checkUpdate_GreasyFork().catch(err => {
			tmp = [false, curVersion];
			isNeedUpdate = tmp[0];
			lastestVersion = tmp[1];
			if (isNeedUpdate) {
				Update_showMessage();
				if (isNeedUpdate) {
					Update_showTip(true);
				}
			} else {
				if (isShowNotUpdate) {
					showMessage(`【版本更新】当前版本${curVersion}已为最新`, "success")
				}
			}
		})
	})
	isNeedUpdate = tmp[0];
	lastestVersion = tmp[1];
	if (isNeedUpdate) {
		Update_showMessage();
		if (isNeedUpdate) {
			Update_showTip(true);
		}
	} else {
		if (isShowNotUpdate) {
			showMessage(`【版本更新】当前版本${curVersion}已为最新`, "success")
		}
	}
}

function Update_openUpdatePage() {
	openPage("https://www.douyuex.com/install/web.html", true);
}

function Update_showTip(a) {
	let d = document.getElementById("ex-update__tip");
	if (d) {
		if (a) {
			if (d.style.display != "block") {
				d.style.display = "block";
			}
		} else {
			d.style.display = "none";
		}
	}
	
}
// 【版本更新】最新版本：2010.02.10.01，点击官方源或者greasyfork源更新
function Update_showMessage() {
	let msg = `【版本更新】最新版本：${lastestVersion}，点击<a href="https://www.douyuex.com/install/web.html" target="_blank">官方源</a>或者<a href="https://greasyfork.org/zh-CN/scripts/394497" target="_blank">GreasyFork源</a>更新`
	showMessage(msg, "error");
}

let videoStartTime = 0;
let videoTime_domhook_videoChange = null;
let videoTime_domhook_showtime = null;
let videoTime_timeout = 0;
function initPkg_VideoTime() {
    let timer = setInterval(() => {
        VideoTime_setData();
        let videoDom = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("__video");
        let showtimeDom = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector("demand-video-controller-preview");

        if (videoDom !== undefined && videoDom !== null) {
            clearInterval(timer);
            videoTime_domhook_videoChange = new MutationObserver(function(mutations) {
                VideoTime_setData();
            });
            videoTime_domhook_videoChange.observe(videoDom, { attributes: true, childList: true, subtree: false });

            videoTime_domhook_showtime = new MutationObserver(function(mutations) {
                for (let i = 0; i < mutations.length; i++) {
                    let item = mutations[i];
                    if (item.attributeName == "showtime") {
                        // 此时修改时间
                        let showtime = Number(VideoTime_getShowTime());
                        VideoTime_setShowTime(String(dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(videoStartTime + showtime * 1000)))) + "<br/>" + formatSeconds2(showtime));
                        break;
                    } else if (item.attributeName == "isshow") {
                        clearTimeout(videoTime_timeout);
                        let showtime = Number(VideoTime_getShowTime());
                        // 宏任务 模拟nextTick
                        videoTime_timeout = setTimeout(() => {
                            VideoTime_setShowTime(String(dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(videoStartTime + showtime * 1000)))) + "<br/>" + formatSeconds2(showtime));
                        }, 0);
                        break;
                    }
                }
            });
            videoTime_domhook_showtime.observe(showtimeDom, { attributes: true, childList: true, subtree: false });
        }
    }, 1000)
}

function VideoTime_setData() {
    let pathnameArr = String(window.location.pathname).split("/");
    let videoId = pathnameArr[pathnameArr.length - 1];
    fetch("https://v.douyu.com/video/video/getVideoUrl?vid=" + videoId, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(res => {
        return res.json();
    }).then(ret => {
        let imgUrl = ret.data.viewthumb[0].url;
        let timeStr = getStrMiddle(imgUrl, "--", "/");
        videoStartTime = new Date(timeStr.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3 $4:$5:$6")).getTime();
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

function VideoTime_getShowTime() {
    let t = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector("demand-video-controller-preview").getAttribute("showtime");
    return Number(t).toFixed(0);
}

function VideoTime_setShowTime(timeStr) {
    let dom = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector("demand-video-controller-preview").shadowRoot.querySelector(".Preview-Time");
    if (dom) {
        dom.style.position = "relative";
        dom.style.bottom = "60px"
        dom.style.backgroundColor = "rgba(0,0,0,0.4)";
        dom.innerHTML = timeStr;
    }
}
var gifworkerStr = `(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var NeuQuant=require("./TypedNeuQuant.js");var LZWEncoder=require("./LZWEncoder.js");function ByteArray(){this.page=-1;this.pages=[];this.newPage()}ByteArray.pageSize=4096;ByteArray.charMap={};for(var i=0;i<256;i++)ByteArray.charMap[i]=String.fromCharCode(i);ByteArray.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(ByteArray.pageSize);this.cursor=0};ByteArray.prototype.getData=function(){var rv="";for(var p=0;p<this.pages.length;p++){for(var i=0;i<ByteArray.pageSize;i++){rv+=ByteArray.charMap[this.pages[p][i]]}}return rv};ByteArray.prototype.writeByte=function(val){if(this.cursor>=ByteArray.pageSize)this.newPage();this.pages[this.page][this.cursor++]=val};ByteArray.prototype.writeUTFBytes=function(string){for(var l=string.length,i=0;i<l;i++)this.writeByte(string.charCodeAt(i))};ByteArray.prototype.writeBytes=function(array,offset,length){for(var l=length||array.length,i=offset||0;i<l;i++)this.writeByte(array[i])};function GIFEncoder(width,height){this.width=~~width;this.height=~~height;this.transparent=null;this.transIndex=0;this.repeat=-1;this.delay=0;this.image=null;this.pixels=null;this.indexedPixels=null;this.colorDepth=null;this.colorTab=null;this.neuQuant=null;this.usedEntry=new Array;this.palSize=7;this.dispose=-1;this.firstFrame=true;this.sample=10;this.dither=false;this.globalPavarte=false;this.out=new ByteArray}GIFEncoder.prototype.setDelay=function(milliseconds){this.delay=Math.round(milliseconds/10)};GIFEncoder.prototype.setFrameRate=function(fps){this.delay=Math.round(100/fps)};GIFEncoder.prototype.setDispose=function(disposalCode){if(disposalCode>=0)this.dispose=disposalCode};GIFEncoder.prototype.setRepeat=function(repeat){this.repeat=repeat};GIFEncoder.prototype.setTransparent=function(color){this.transparent=color};GIFEncoder.prototype.addFrame=function(imageData){this.image=imageData;this.colorTab=this.globalPavarte&&this.globalPavarte.slice?this.globalPavarte:null;this.getImagePixels();this.analyzePixels();if(this.globalPavarte===true)this.globalPavarte=this.colorTab;if(this.firstFrame){this.writeLSD();this.writePavarte();if(this.repeat>=0){this.writeNetscapeExt()}}this.writeGraphicCtrlExt();this.writeImageDesc();if(!this.firstFrame&&!this.globalPavarte)this.writePavarte();this.writePixels();this.firstFrame=false};GIFEncoder.prototype.finish=function(){this.out.writeByte(59)};GIFEncoder.prototype.setQuality=function(quality){if(quality<1)quality=1;this.sample=quality};GIFEncoder.prototype.setDither=function(dither){if(dither===true)dither="FloydSteinberg";this.dither=dither};GIFEncoder.prototype.setGlobalPavarte=function(pavarte){this.globalPavarte=pavarte};GIFEncoder.prototype.getGlobalPavarte=function(){return this.globalPavarte&&this.globalPavarte.slice&&this.globalPavarte.slice(0)||this.globalPavarte};GIFEncoder.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")};GIFEncoder.prototype.analyzePixels=function(){if(!this.colorTab){this.neuQuant=new NeuQuant(this.pixels,this.sample);this.neuQuant.buildColormap();this.colorTab=this.neuQuant.getColormap()}if(this.dither){this.ditherPixels(this.dither.replace("-serpentine",""),this.dither.match(/-serpentine/)!==null)}else{this.indexPixels()}this.pixels=null;this.colorDepth=8;this.palSize=7;if(this.transparent!==null){this.transIndex=this.findClosest(this.transparent,true)}};GIFEncoder.prototype.indexPixels=function(imgq){var nPix=this.pixels.length/3;this.indexedPixels=new Uint8Array(nPix);var k=0;for(var j=0;j<nPix;j++){var index=this.findClosestRGB(this.pixels[k++]&255,this.pixels[k++]&255,this.pixels[k++]&255);this.usedEntry[index]=true;this.indexedPixels[j]=index}};GIFEncoder.prototype.ditherPixels=function(kernel,serpentine){var kernels={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!kernel||!kernels[kernel]){throw"Unknown dithering kernel: "+kernel}var ds=kernels[kernel];var index=0,height=this.height,width=this.width,data=this.pixels;var direction=serpentine?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var y=0;y<height;y++){if(serpentine)direction=direction*-1;for(var x=direction==1?0:width-1,xend=direction==1?width:0;x!==xend;x+=direction){index=y*width+x;var idx=index*3;var r1=data[idx];var g1=data[idx+1];var b1=data[idx+2];idx=this.findClosestRGB(r1,g1,b1);this.usedEntry[idx]=true;this.indexedPixels[index]=idx;idx*=3;var r2=this.colorTab[idx];var g2=this.colorTab[idx+1];var b2=this.colorTab[idx+2];var er=r1-r2;var eg=g1-g2;var eb=b1-b2;for(var i=direction==1?0:ds.length-1,end=direction==1?ds.length:0;i!==end;i+=direction){var x1=ds[i][1];var y1=ds[i][2];if(x1+x>=0&&x1+x<width&&y1+y>=0&&y1+y<height){var d=ds[i][0];idx=index+x1+y1*width;idx*=3;data[idx]=Math.max(0,Math.min(255,data[idx]+er*d));data[idx+1]=Math.max(0,Math.min(255,data[idx+1]+eg*d));data[idx+2]=Math.max(0,Math.min(255,data[idx+2]+eb*d))}}}}};GIFEncoder.prototype.findClosest=function(c,used){return this.findClosestRGB((c&16711680)>>16,(c&65280)>>8,c&255,used)};GIFEncoder.prototype.findClosestRGB=function(r,g,b,used){if(this.colorTab===null)return-1;if(this.neuQuant&&!used){return this.neuQuant.lookupRGB(r,g,b)}var c=b|g<<8|r<<16;var minpos=0;var dmin=256*256*256;var len=this.colorTab.length;for(var i=0,index=0;i<len;index++){var dr=r-(this.colorTab[i++]&255);var dg=g-(this.colorTab[i++]&255);var db=b-(this.colorTab[i++]&255);var d=dr*dr+dg*dg+db*db;if((!used||this.usedEntry[index])&&d<dmin){dmin=d;minpos=index}}return minpos};GIFEncoder.prototype.getImagePixels=function(){var w=this.width;var h=this.height;this.pixels=new Uint8Array(w*h*3);var data=this.image;var srcPos=0;var count=0;for(var i=0;i<h;i++){for(var j=0;j<w;j++){this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];srcPos++}}};GIFEncoder.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33);this.out.writeByte(249);this.out.writeByte(4);var transp,disp;if(this.transparent===null){transp=0;disp=0}else{transp=1;disp=2}if(this.dispose>=0){disp=dispose&7}disp<<=2;this.out.writeByte(0|disp|0|transp);this.writeShort(this.delay);this.out.writeByte(this.transIndex);this.out.writeByte(0)};GIFEncoder.prototype.writeImageDesc=function(){this.out.writeByte(44);this.writeShort(0);this.writeShort(0);this.writeShort(this.width);this.writeShort(this.height);if(this.firstFrame||this.globalPavarte){this.out.writeByte(0)}else{this.out.writeByte(128|0|0|0|this.palSize)}};GIFEncoder.prototype.writeLSD=function(){this.writeShort(this.width);this.writeShort(this.height);this.out.writeByte(128|112|0|this.palSize);this.out.writeByte(0);this.out.writeByte(0)};GIFEncoder.prototype.writeNetscapeExt=function(){this.out.writeByte(33);this.out.writeByte(255);this.out.writeByte(11);this.out.writeUTFBytes("NETSCAPE2.0");this.out.writeByte(3);this.out.writeByte(1);this.writeShort(this.repeat);this.out.writeByte(0)};GIFEncoder.prototype.writePavarte=function(){this.out.writeBytes(this.colorTab);var n=3*256-this.colorTab.length;for(var i=0;i<n;i++)this.out.writeByte(0)};GIFEncoder.prototype.writeShort=function(pValue){this.out.writeByte(pValue&255);this.out.writeByte(pValue>>8&255)};GIFEncoder.prototype.writePixels=function(){var enc=new LZWEncoder(this.width,this.height,this.indexedPixels,this.colorDepth);enc.encode(this.out)};GIFEncoder.prototype.stream=function(){return this.out};module.exports=GIFEncoder},{"./LZWEncoder.js":2,"./TypedNeuQuant.js":3}],2:[function(require,module,exports){var EOF=-1;var BITS=12;var HSIZE=5003;var masks=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function LZWEncoder(width,height,pixels,colorDepth){var initCodeSize=Math.max(2,colorDepth);var accum=new Uint8Array(256);var htab=new Int32Array(HSIZE);var codetab=new Int32Array(HSIZE);var cur_accum,cur_bits=0;var a_count;var free_ent=0;var maxcode;var clear_flg=false;var g_init_bits,ClearCode,EOFCode;function char_out(c,outs){accum[a_count++]=c;if(a_count>=254)flush_char(outs)}function cl_block(outs){cl_hash(HSIZE);free_ent=ClearCode+2;clear_flg=true;output(ClearCode,outs)}function cl_hash(hsize){for(var i=0;i<hsize;++i)htab[i]=-1}function compress(init_bits,outs){var fcode,c,i,ent,disp,hsize_reg,hshift;g_init_bits=init_bits;clear_flg=false;n_bits=g_init_bits;maxcode=MAXCODE(n_bits);ClearCode=1<<init_bits-1;EOFCode=ClearCode+1;free_ent=ClearCode+2;a_count=0;ent=nextPixel();hshift=0;for(fcode=HSIZE;fcode<65536;fcode*=2)++hshift;hshift=8-hshift;hsize_reg=HSIZE;cl_hash(hsize_reg);output(ClearCode,outs);outer_loop:while((c=nextPixel())!=EOF){fcode=(c<<BITS)+ent;i=c<<hshift^ent;if(htab[i]===fcode){ent=codetab[i];continue}else if(htab[i]>=0){disp=hsize_reg-i;if(i===0)disp=1;do{if((i-=disp)<0)i+=hsize_reg;if(htab[i]===fcode){ent=codetab[i];continue outer_loop}}while(htab[i]>=0)}output(ent,outs);ent=c;if(free_ent<1<<BITS){codetab[i]=free_ent++;htab[i]=fcode}else{cl_block(outs)}}output(ent,outs);output(EOFCode,outs)}function encode(outs){outs.writeByte(initCodeSize);remaining=width*height;curPixel=0;compress(initCodeSize+1,outs);outs.writeByte(0)}function flush_char(outs){if(a_count>0){outs.writeByte(a_count);outs.writeBytes(accum,0,a_count);a_count=0}}function MAXCODE(n_bits){return(1<<n_bits)-1}function nextPixel(){if(remaining===0)return EOF;--remaining;var pix=pixels[curPixel++];return pix&255}function output(code,outs){cur_accum&=masks[cur_bits];if(cur_bits>0)cur_accum|=code<<cur_bits;else cur_accum=code;cur_bits+=n_bits;while(cur_bits>=8){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}if(free_ent>maxcode||clear_flg){if(clear_flg){maxcode=MAXCODE(n_bits=g_init_bits);clear_flg=false}else{++n_bits;if(n_bits==BITS)maxcode=1<<BITS;else maxcode=MAXCODE(n_bits)}}if(code==EOFCode){while(cur_bits>0){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}flush_char(outs)}}this.encode=encode}module.exports=LZWEncoder},{}],3:[function(require,module,exports){var ncycles=100;var netsize=256;var maxnetpos=netsize-1;var netbiasshift=4;var intbiasshift=16;var intbias=1<<intbiasshift;var gammashift=10;var gamma=1<<gammashift;var betashift=10;var beta=intbias>>betashift;var betagamma=intbias<<gammashift-betashift;var initrad=netsize>>3;var radiusbiasshift=6;var radiusbias=1<<radiusbiasshift;var initradius=initrad*radiusbias;var radiusdec=30;var alphabiasshift=10;var initalpha=1<<alphabiasshift;var alphadec;var radbiasshift=8;var radbias=1<<radbiasshift;var alpharadbshift=alphabiasshift+radbiasshift;var alpharadbias=1<<alpharadbshift;var prime1=499;var prime2=491;var prime3=487;var prime4=503;var minpicturebytes=3*prime4;function NeuQuant(pixels,samplefac){var network;var netindex;var bias;var freq;var radpower;function init(){network=[];netindex=new Int32Array(256);bias=new Int32Array(netsize);freq=new Int32Array(netsize);radpower=new Int32Array(netsize>>3);var i,v;for(i=0;i<netsize;i++){v=(i<<netbiasshift+8)/netsize;network[i]=new Float64Array([v,v,v,0]);freq[i]=intbias/netsize;bias[i]=0}}function unbiasnet(){for(var i=0;i<netsize;i++){network[i][0]>>=netbiasshift;network[i][1]>>=netbiasshift;network[i][2]>>=netbiasshift;network[i][3]=i}}function altersingle(alpha,i,b,g,r){network[i][0]-=alpha*(network[i][0]-b)/initalpha;network[i][1]-=alpha*(network[i][1]-g)/initalpha;network[i][2]-=alpha*(network[i][2]-r)/initalpha}function alterneigh(radius,i,b,g,r){var lo=Math.abs(i-radius);var hi=Math.min(i+radius,netsize);var j=i+1;var k=i-1;var m=1;var p,a;while(j<hi||k>lo){a=radpower[m++];if(j<hi){p=network[j++];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}if(k>lo){p=network[k--];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}}}function contest(b,g,r){var bestd=~(1<<31);var bestbiasd=bestd;var bestpos=-1;var bestbiaspos=bestpos;var i,n,dist,biasdist,betafreq;for(i=0;i<netsize;i++){n=network[i];dist=Math.abs(n[0]-b)+Math.abs(n[1]-g)+Math.abs(n[2]-r);if(dist<bestd){bestd=dist;bestpos=i}biasdist=dist-(bias[i]>>intbiasshift-netbiasshift);if(biasdist<bestbiasd){bestbiasd=biasdist;bestbiaspos=i}betafreq=freq[i]>>betashift;freq[i]-=betafreq;bias[i]+=betafreq<<gammashift}freq[bestpos]+=beta;bias[bestpos]-=betagamma;return bestbiaspos}function inxbuild(){var i,j,p,q,smallpos,smallval,previouscol=0,startpos=0;for(i=0;i<netsize;i++){p=network[i];smallpos=i;smallval=p[1];for(j=i+1;j<netsize;j++){q=network[j];if(q[1]<smallval){smallpos=j;smallval=q[1]}}q=network[smallpos];if(i!=smallpos){j=q[0];q[0]=p[0];p[0]=j;j=q[1];q[1]=p[1];p[1]=j;j=q[2];q[2]=p[2];p[2]=j;j=q[3];q[3]=p[3];p[3]=j}if(smallval!=previouscol){netindex[previouscol]=startpos+i>>1;for(j=previouscol+1;j<smallval;j++)netindex[j]=i;previouscol=smallval;startpos=i}}netindex[previouscol]=startpos+maxnetpos>>1;for(j=previouscol+1;j<256;j++)netindex[j]=maxnetpos}function inxsearch(b,g,r){var a,p,dist;var bestd=1e3;var best=-1;var i=netindex[g];var j=i-1;while(i<netsize||j>=0){if(i<netsize){p=network[i];dist=p[1]-g;if(dist>=bestd)i=netsize;else{i++;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}if(j>=0){p=network[j];dist=g-p[1];if(dist>=bestd)j=-1;else{j--;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}}return best}function learn(){var i;var lengthcount=pixels.length;var alphadec=30+(samplefac-1)/3;var samplepixels=lengthcount/(3*samplefac);var delta=~~(samplepixels/ncycles);var alpha=initalpha;var radius=initradius;var rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(i=0;i<rad;i++)radpower[i]=alpha*((rad*rad-i*i)*radbias/(rad*rad));var step;if(lengthcount<minpicturebytes){samplefac=1;step=3}else if(lengthcount%prime1!==0){step=3*prime1}else if(lengthcount%prime2!==0){step=3*prime2}else if(lengthcount%prime3!==0){step=3*prime3}else{step=3*prime4}var b,g,r,j;var pix=0;i=0;while(i<samplepixels){b=(pixels[pix]&255)<<netbiasshift;g=(pixels[pix+1]&255)<<netbiasshift;r=(pixels[pix+2]&255)<<netbiasshift;j=contest(b,g,r);altersingle(alpha,j,b,g,r);if(rad!==0)alterneigh(rad,j,b,g,r);pix+=step;if(pix>=lengthcount)pix-=lengthcount;i++;if(delta===0)delta=1;if(i%delta===0){alpha-=alpha/alphadec;radius-=radius/radiusdec;rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(j=0;j<rad;j++)radpower[j]=alpha*((rad*rad-j*j)*radbias/(rad*rad))}}}function buildColormap(){init();learn();unbiasnet();inxbuild()}this.buildColormap=buildColormap;function getColormap(){var map=[];var index=[];for(var i=0;i<netsize;i++)index[network[i][3]]=i;var k=0;for(var l=0;l<netsize;l++){var j=index[l];map[k++]=network[j][0];map[k++]=network[j][1];map[k++]=network[j][2]}return map}this.getColormap=getColormap;this.lookupRGB=inxsearch}module.exports=NeuQuant},{}],4:[function(require,module,exports){var GIFEncoder,renderFrame;GIFEncoder=require("./GIFEncoder.js");renderFrame=function(frame){var encoder,page,stream,transfer;encoder=new GIFEncoder(frame.width,frame.height);if(frame.index===0){encoder.writeHeader()}else{encoder.firstFrame=false}encoder.setTransparent(frame.transparent);encoder.setRepeat(frame.repeat);encoder.setDelay(frame.delay);encoder.setQuality(frame.quality);encoder.setDither(frame.dither);encoder.setGlobalPavarte(frame.globalPavarte);encoder.addFrame(frame.data);if(frame.last){encoder.finish()}if(frame.globalPavarte===true){frame.globalPavarte=encoder.getGlobalPavarte()}stream=encoder.stream();frame.data=stream.pages;frame.cursor=stream.cursor;frame.pageSize=stream.constructor.pageSize;if(frame.canTransfer){transfer=function(){var i,len,ref,results;ref=frame.data;results=[];for(i=0,len=ref.length;i<len;i++){page=ref[i];results.push(page.buffer)}return results}();return self.postMessage(frame,transfer)}else{return self.postMessage(frame)}};self.onmessage=function(event){return renderFrame(event.data)}},{"./GIFEncoder.js":1}]},{},[4]);`

var gifworkerBlob = URL.createObjectURL(new Blob([gifworkerStr], {
    type: 'application/javascript'
}))

var camera_canvas;
var camera_canvas_img;
var camera_width;
var camera_height;
var camera_anchorName;
const camera_fps = 83; // 12fps

function cameraAddFrame(node, camera_canvas, gif, fps) {
    camera_canvas.getContext('2d').drawImage(node, 0, 0, camera_canvas.width, camera_canvas.height);
    gif.addFrame(camera_canvas, {
        copy: true,
        delay: fps
    });
}
function initPkg_VideoTools_Camera() {
    camera_anchorName = document.getElementsByClassName("Title-anchorName")[0].innerText;
    camera_width = liveVideoNode.videoWidth * 0.25;
    camera_height = liveVideoNode.videoHeight * 0.25;
    camera_canvas = document.createElement("canvas");
    camera_canvas.width = camera_width;
    camera_canvas.height = camera_height;

    camera_canvas_img = document.createElement("canvas");
    camera_canvas_img.width = liveVideoNode.videoWidth;
    camera_canvas_img.height = liveVideoNode.videoHeight;

    initPkg_VideoTools_Camera_Dom();
    initPkg_VideoTools_Camera_Func();
}

function initPkg_VideoTools_Camera_Dom() {
    Camera_insertIcon();
}

function Camera_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-camera";
    a.title = "单击截图 长按录制gif"
    a.innerHTML = `
    <svg t="1620266708389" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2080" width="38" height="38"><path d="M512 337.371136c-119.543808 0-216.800256 97.255424-216.800256 216.798208 0 119.543808 97.256448 216.800256 216.800256 216.800256s216.800256-97.256448 216.800256-216.800256C728.800256 434.625536 631.543808 337.371136 512 337.371136zM680.479744 554.16832c0 92.911616-75.579392 168.501248-168.479744 168.501248-92.900352 0-168.480768-75.589632-168.480768-168.501248 0-92.923904 75.579392-168.521728 168.480768-168.521728C604.899328 385.646592 680.479744 461.24544 680.479744 554.16832z" p-id="2081" fill="#ffffff"></path><path d="M831.209472 337.349632l-47.167488 0c-13.647872 0-24.751104 11.083776-24.751104 24.707072 0 13.635584 11.103232 24.7296 24.751104 24.7296l47.167488 0c13.646848 0 24.75008-11.094016 24.75008-24.7296C855.959552 348.433408 844.85632 337.349632 831.209472 337.349632z" p-id="2082" fill="#ffffff"></path><path d="M700.505088 171.497472c4.235264 0 6.403072 0.405504 7.232512 0.612352 1.47968 1.514496 4.790272 6.218752 11.717632 20.685824 2.83648 5.910528 8.6272 18.86208 15.888384 35.533824l11.788288 27.063296 29.518848 0 96.535552 0c35.122176 0 63.695872 28.535808 63.695872 63.609856l0 469.933056c0 35.05152-28.573696 63.567872-63.695872 63.567872L150.811648 852.503552c-35.121152 0-63.694848-28.516352-63.694848-63.567872L87.1168 319.0016c0-35.062784 28.573696-63.589376 63.694848-63.589376l99.35872 0 29.110272 0 11.964416-26.537984c4.698112-10.421248 8.416256-19.063808 11.058176-25.70752 9.86112-24.829952 15.207424-30.125056 16.239616-30.974976 0.52736-0.161792 2.64192-0.695296 7.673856-0.695296L700.505088 171.496448M700.505088 126.441472 326.216704 126.441472c-32.519168 0-47.275008 13.479936-65.787904 60.096512-3.180544 7.999488-7.689216 18.122752-10.257408 23.819264l-99.35872 0c-59.96544 0-108.750848 48.738304-108.750848 108.645376l0 469.933056c0 59.894784 48.785408 108.623872 108.750848 108.623872l722.37568 0c59.96544 0 108.751872-48.729088 108.751872-108.623872L981.940224 319.0016c0-59.91936-48.786432-108.665856-108.751872-108.665856l-96.535552 0c-4.458496-10.236928-12.420096-28.372992-16.574464-37.031936C744.823808 141.448192 733.973504 126.441472 700.505088 126.441472L700.505088 126.441472z" p-id="2083" fill="#ffffff"></path></svg>
    `;
    let b = document.getElementsByClassName("player-dialog")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_Camera_Func() {
    let dom = document.getElementsByClassName("layout-Player-video")[0];
    let dom_video = document.getElementsByClassName("room-Player-Box")[0];
    let camera = document.getElementById("ex-camera");
    let gif = null;
    let timer = 0;
    let downTime = 0;
    let imgBase64;
    let timer_timeout = 0;
    dom.addEventListener("mouseenter", () => {
        camera.style.display = "flex";
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    dom_video.addEventListener("mousemove", () => {
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    camera.addEventListener("mouseenter", () => {
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
    })
    dom.addEventListener("mouseleave", () => {
        camera.style.display = "none";
    })
    camera.addEventListener("mousedown", (e) => {
        downTime = new Date().getTime();
        camera_canvas_img.getContext('2d').drawImage(liveVideoNode, 0, 0, camera_canvas_img.width, camera_canvas_img.height);
        imgBase64 = camera_canvas_img.toDataURL("image/png");

        gif = new GIF({
            workers: 5,
            quality: 3,
            width: camera_width,
            height: camera_height,
            workerScript: gifworkerBlob
        });;
        cameraAddFrame(liveVideoNode, camera_canvas, gif, camera_fps);
        timer = setInterval(() => {cameraAddFrame(liveVideoNode, camera_canvas, gif, camera_fps)}, camera_fps);
    })
    camera.addEventListener("mouseup", (e) => {
        let upTime = new Date().getTime();
        clearInterval(timer);
        if (upTime - downTime >= 800) {
            showMessage("【录制】正在生成gif...", "info");
            gif.on('finished', blob => {
                let el = document.createElement('a');
                el.href = URL.createObjectURL(blob);
                el.download = `【${camera_anchorName}】${dateFormat("yyyy-MM-dd hh-mm-ss",new Date())}`;
                document.body.appendChild(el);
                let evt = document.createEvent("MouseEvents");
                evt.initEvent("click", false, false);
                el.dispatchEvent(evt);
                document.body.removeChild(el);
            });
            gif.render();
        } else {
            let el = document.createElement("a");
            el.download = `【${camera_anchorName}】${dateFormat("yyyy-MM-dd hh-mm-ss",new Date())}`;
            el.href = imgBase64;
            document.body.appendChild(el);
            let evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            el.dispatchEvent(evt);
            document.body.removeChild(el);
        }

    })
}
function initPkg_VideoTools_Camera_Video() {
    let timer = setInterval(() => {
        liveVideoNode = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("__video");
        if (liveVideoNode !== undefined && liveVideoNode !== null && liveVideoNode.videoWidth) {
            clearInterval(timer);
            camera_anchorName = document.getElementsByTagName("demand-video-anchor")[0].shadowRoot.querySelector(".anchor-name").innerText;
            camera_width = liveVideoNode.videoWidth * 0.25;
            camera_height = liveVideoNode.videoHeight * 0.25;
            camera_canvas = document.createElement("canvas");
            camera_canvas.width = camera_width;
            camera_canvas.height = camera_height;

            camera_canvas_img = document.createElement("canvas");
            camera_canvas_img.width = liveVideoNode.videoWidth;
            camera_canvas_img.height = liveVideoNode.videoHeight;

            initPkg_VideoTools_Camera_Video_Dom();
            initPkg_VideoTools_Camera_Video_Func();
        }
    }, 1000)
}

function initPkg_VideoTools_Camera_Video_Dom() {
    Camera_Video_insertIcon();
}

function Camera_Video_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-camera";
    a.title = "单击截图 长按录制gif"
    a.innerHTML = `
    <svg t="1620266708389" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2080" width="38" height="38"><path d="M512 337.371136c-119.543808 0-216.800256 97.255424-216.800256 216.798208 0 119.543808 97.256448 216.800256 216.800256 216.800256s216.800256-97.256448 216.800256-216.800256C728.800256 434.625536 631.543808 337.371136 512 337.371136zM680.479744 554.16832c0 92.911616-75.579392 168.501248-168.479744 168.501248-92.900352 0-168.480768-75.589632-168.480768-168.501248 0-92.923904 75.579392-168.521728 168.480768-168.521728C604.899328 385.646592 680.479744 461.24544 680.479744 554.16832z" p-id="2081" fill="#ffffff"></path><path d="M831.209472 337.349632l-47.167488 0c-13.647872 0-24.751104 11.083776-24.751104 24.707072 0 13.635584 11.103232 24.7296 24.751104 24.7296l47.167488 0c13.646848 0 24.75008-11.094016 24.75008-24.7296C855.959552 348.433408 844.85632 337.349632 831.209472 337.349632z" p-id="2082" fill="#ffffff"></path><path d="M700.505088 171.497472c4.235264 0 6.403072 0.405504 7.232512 0.612352 1.47968 1.514496 4.790272 6.218752 11.717632 20.685824 2.83648 5.910528 8.6272 18.86208 15.888384 35.533824l11.788288 27.063296 29.518848 0 96.535552 0c35.122176 0 63.695872 28.535808 63.695872 63.609856l0 469.933056c0 35.05152-28.573696 63.567872-63.695872 63.567872L150.811648 852.503552c-35.121152 0-63.694848-28.516352-63.694848-63.567872L87.1168 319.0016c0-35.062784 28.573696-63.589376 63.694848-63.589376l99.35872 0 29.110272 0 11.964416-26.537984c4.698112-10.421248 8.416256-19.063808 11.058176-25.70752 9.86112-24.829952 15.207424-30.125056 16.239616-30.974976 0.52736-0.161792 2.64192-0.695296 7.673856-0.695296L700.505088 171.496448M700.505088 126.441472 326.216704 126.441472c-32.519168 0-47.275008 13.479936-65.787904 60.096512-3.180544 7.999488-7.689216 18.122752-10.257408 23.819264l-99.35872 0c-59.96544 0-108.750848 48.738304-108.750848 108.645376l0 469.933056c0 59.894784 48.785408 108.623872 108.750848 108.623872l722.37568 0c59.96544 0 108.751872-48.729088 108.751872-108.623872L981.940224 319.0016c0-59.91936-48.786432-108.665856-108.751872-108.665856l-96.535552 0c-4.458496-10.236928-12.420096-28.372992-16.574464-37.031936C744.823808 141.448192 733.973504 126.441472 700.505088 126.441472L700.505088 126.441472z" p-id="2083" fill="#ffffff"></path></svg>
    `;
    let b = document.getElementsByClassName("Video")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_Camera_Video_Func() {
    let dom = document.getElementsByTagName("demand-video")[0];
    let camera = document.getElementById("ex-camera");
    let gif = null;
    let timer = 0;
    let downTime = 0;
    let imgBase64;
    let timer_timeout = 0;
    dom.addEventListener("mouseenter", () => {
        camera.style.display = "flex";
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    dom.addEventListener("mousemove", () => {
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    camera.addEventListener("mouseenter", () => {
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
    })
    dom.addEventListener("mouseleave", () => {
        camera.style.display = "none";
    })
    camera.addEventListener("mousedown", (e) => {
        downTime = new Date().getTime();
        camera_canvas_img.getContext('2d').drawImage(liveVideoNode, 0, 0, camera_canvas_img.width, camera_canvas_img.height);
        imgBase64 = camera_canvas_img.toDataURL("image/png");

        gif = new GIF({
            workers: 5,
            quality: 3,
            width: camera_width,
            height: camera_height,
            workerScript: gifworkerBlob
        });;
        cameraAddFrame(liveVideoNode, camera_canvas, gif, camera_fps);
        timer = setInterval(() => {
            cameraAddFrame(liveVideoNode, camera_canvas, gif, camera_fps)
        }, camera_fps);
    })
    camera.addEventListener("mouseup", (e) => {
        let upTime = new Date().getTime();
        clearInterval(timer);
        if (upTime - downTime >= 800) {
            showMessage("【录制】正在生成gif...", "info");
            gif.on('finished', blob => {
                let el = document.createElement('a');
                el.href = URL.createObjectURL(blob);
                el.download = `【${camera_anchorName}】${dateFormat("yyyy-MM-dd hh-mm-ss",new Date())}`;
                document.body.appendChild(el);
                let evt = document.createEvent("MouseEvents");
                evt.initEvent("click", false, false);
                el.dispatchEvent(evt);
                document.body.removeChild(el);
            });
            gif.render();
        } else {
            let el = document.createElement("a");
            el.download = `【${camera_anchorName}】${dateFormat("yyyy-MM-dd hh-mm-ss",new Date())}`;
            el.href = imgBase64;
            document.body.appendChild(el);
            let evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            el.dispatchEvent(evt);
            document.body.removeChild(el);
        }

    })
}

function initPkg_VideoTools_Cinema() {
    initPkg_VideoTools_Cinema_Dom();
    initPkg_VideoTools_Cinema_Func();
}

function initPkg_VideoTools_Cinema_Dom() {
    Cinema_insertIcon();
}
function Cinema_insertIcon() {
	let a = document.createElement("div");
    a.id = "ex-cinema";
    a.innerHTML = `
    <div class="cinema__wrap">
        <div class="cinema__panel">
            <ul>
                <li id="cinema__default">默认</li>
                <li id="cinema__cover">剪裁</li>
                <li id="cinema__fill">拉伸</li>
            </ul>
        </div>
    </div>
    <svg t="1595353641060" class="icon" viewBox="0 0 1877 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11101" width="24" height="24"><path d="M1877.333333 1024H0V0h1877.333333v1024zM128 896h1621.333333v-768h-1621.333333v768z" p-id="11102" fill="#ffffff"></path><path d="M384 256C452.266667 256 512 315.733333 512 384S452.266667 512 384 512 256 452.266667 256 384 315.733333 256 384 256zM972.8 768c-8.533333 0-17.066667 0-25.6-8.533333-17.066667-8.533333-17.066667-25.6 0-34.133334l153.6-153.6c8.533333-8.533333 25.6-8.533333 42.666667 0l136.533333 68.266667 238.933333-187.733333c8.533333-8.533333 68.266667-51.2 102.4 0V768h-648.533333z" p-id="11103" fill="#ffffff"></path></svg>
    `;
    let b = document.getElementsByClassName("right-e7ea5d")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_Cinema_Func() {
	document.getElementById("ex-cinema").addEventListener("mouseover", function() {
        document.getElementsByClassName("cinema__wrap")[0].style.display = "block";
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
        document.getElementsByClassName("filter__wrap")[0].style.display = "none";
    });
    document.getElementsByClassName("cinema__wrap")[0].addEventListener("mouseout", function() {
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });

    document.getElementById("cinema__default").addEventListener("click", () => {
        StyleHook_remove("Ex_Style_Cinema");
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });
    document.getElementById("cinema__cover").addEventListener("click", () => {
        setVideoCinemaMode("cover");
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });
    document.getElementById("cinema__fill").addEventListener("click", () => {
        setVideoCinemaMode("fill");
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });

}

function setVideoCinemaMode(fit) {
    let newHeigth = String(parseInt(liveVideoNode.style.width) / 2.39) + "px";
    StyleHook_remove("Ex_Style_Cinema");
    let style = `
    .layout-Player-videoEntity video{object-fit:${ fit } !important;height:${ newHeigth } !important;}
    `;
    StyleHook_set("Ex_Style_Cinema", style);
}
let currentBrightness = "";
let currentContrast = "";
let currentSaturate = "";
let liveVideoParentClassName = "";

function initPkg_VideoTools_Filter() {
    liveVideoParentClassName = liveVideoNode.parentNode.className;
    initPkg_VideoTools_Filter_Dom();
    initPkg_VideoTools_Filter_Func();
}

function initPkg_VideoTools_Filter_Dom() {
    Filter_insertIcon();
}

function Filter_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-filter";
    a.innerHTML = `
    <div class="filter__wrap">
        <div class="filter__panel">
            <div class="filter__bright">
                <span class="filter__title">明亮度</span>
                <div class="filter__scroll" id="scroll__bright">
                    <div class="filter__scroll-bar" id="bar__bright"></div>
                    <div class="filter__scroll-mask" id="mask__bright"></div>
                </div>
            </div>
            <div class="filter__contrast">
                <span class="filter__title">对比度</span>
                <div class="filter__scroll" id="scroll__contrast">
                    <div class="filter__scroll-bar" id="bar__contrast"></div>
                    <div class="filter__scroll-mask" id="mask__contrast"></div>
                </div>
            </div>
            <div class="filter__saturate">
                <span class="filter__title">饱和度</span>
                <div class="filter__scroll" id="scroll__saturate">
                    <div class="filter__scroll-bar" id="bar__saturate"></div>
                    <div class="filter__scroll-mask" id="mask__saturate"></div>
                </div>
            </div>
            <div class="filter__filter">
                <p style="color:white;float:left;line-height:20px">滤镜</p>
                <select class="c3-4f78e3" id="filter__select">
                    <option class="option-b5745c" value="default">无</option>
                    <option class="option-b5745c" value="1977">1977</option>
                    <option class="option-b5745c" value="Aden">Aden</option>
                    <option class="option-b5745c" value="Amaro">Amaro</option>
                    <option class="option-b5745c" value="Brannan">Brannan</option>
                    <option class="option-b5745c" value="Brooklyn">Brooklyn</option>
                    <option class="option-b5745c" value="Claredon">Claredon</option>
                    <option class="option-b5745c" value="Earlybird">Earlybird</option>
                    <option class="option-b5745c" value="Gingham">Gingham</option>
                    <option class="option-b5745c" value="Hudson">Hudson</option>
                    <option class="option-b5745c" value="Inkwell">Inkwell</option>
                    <option class="option-b5745c" value="Lofi">Lofi</option>
                    <option class="option-b5745c" value="Maven">Maven</option>
                    <option class="option-b5745c" value="Perpetua">Perpetua</option>
                    <option class="option-b5745c" value="Reyes">Reyes</option>
                    <option class="option-b5745c" value="Stinson">Stinson</option>
                    <option class="option-b5745c" value="Toaster">Toaster</option>
                    <option class="option-b5745c" value="Walden">Walden</option>
                    <option class="option-b5745c" value="Valencia">Valencia</option>
                    <option class="option-b5745c" value="Xpro2">Xpro2</option>
                </select>
            </div>
            <ul style="clear:both">
                <li id="filter__mirror">镜像画面</li>
                <li id="filter__reset">重置</li>
            </ul>
        </div>
    </div>
    <svg t="1598941324196" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3146" width="24" height="24"><path d="M921.6 766.634667L257.365333 102.4a68.266667 68.266667 0 0 0-96.597333 0L102.4 160.768a68.266667 68.266667 0 0 0 0 96.597333L766.634667 921.6a68.266667 68.266667 0 0 0 96.597333 0L921.6 863.232a68.266667 68.266667 0 0 0 0-96.597333zM139.605333 199.338667l59.733334-59.733334A13.312 13.312 0 0 1 208.896 136.533333a13.653333 13.653333 0 0 1 9.898667 4.096l83.968 82.944-79.189334 79.189334-83.968-83.968a13.653333 13.653333 0 0 1 0-19.456z m744.789334 625.322666l-59.733334 59.733334a13.312 13.312 0 0 1-9.557333 4.096 13.653333 13.653333 0 0 1-9.898667-4.096L262.144 341.333333 341.333333 262.144l543.061334 543.061333a13.653333 13.653333 0 0 1 0 19.456zM230.058667 589.824l-50.517334 92.501333-92.842666 50.858667 92.842666 50.517333 50.517334 92.842667 50.517333-92.842667 92.842667-50.517333-92.842667-50.858667-50.517333-92.501333zM541.013333 270.336l31.061334-57.344 57.344-31.402667-57.344-31.402666-31.061334-57.002667-31.402666 57.002667-57.344 31.402666 57.344 31.402667 31.402666 57.344zM827.392 377.173333l21.162667-38.912L887.466667 317.098667l-38.912-21.504-21.162667-38.912-21.504 38.912-38.570667 21.504 38.570667 21.162666 21.504 38.912z" p-id="3147" fill="#ffffff"></path></svg>
    `;
    let b = document.getElementsByClassName("right-e7ea5d")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_Filter_Func() {
    document.onmouseup = function () {
        document.onmousemove = null; //弹起鼠标不做任何操作
    }
    setScrollFunc(document.getElementById("scroll__bright"), document.getElementById("bar__bright"), document.getElementById("mask__bright"), (data) => {
        currentBrightness = `brightness(${ data }%)`;
        liveVideoNode.style.filter = `${ currentBrightness } ${ currentContrast } ${ currentSaturate }`;
    });
    setScrollFunc(document.getElementById("scroll__contrast"), document.getElementById("bar__contrast"), document.getElementById("mask__contrast"), (data) => {
        currentContrast = `contrast(${ data }%)`;
        liveVideoNode.style.filter = `${ currentBrightness } ${ currentContrast } ${ currentSaturate }`;
    });
    setScrollFunc(document.getElementById("scroll__saturate"), document.getElementById("bar__saturate"), document.getElementById("mask__saturate"), (data) => {
        currentSaturate = `saturate(${ data }%)`;
        liveVideoNode.style.filter = `${ currentBrightness } ${ currentContrast } ${ currentSaturate }`;
    });

    document.getElementById("ex-filter").addEventListener("mouseover", function () {
        document.getElementsByClassName("filter__wrap")[0].style.display = "block";
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none"
    });
    document.getElementsByClassName("filter__wrap")[0].addEventListener("mouseleave", function () {
        document.getElementsByClassName("filter__wrap")[0].style.display = "none"
    });
    document.getElementById("filter__reset").addEventListener("click", () => {
        StyleHook_remove("Ex_Style_Filter");
        document.getElementById("filter__select").selectedIndex = 0;
        liveVideoNode.style.filter = "";
        liveVideoNode.parentNode.style.transform = "";
        document.getElementById("bar__bright").style.left = "100px";
        document.getElementById("bar__contrast").style.left = "100px";
        document.getElementById("bar__saturate").style.left = "100px";

        document.getElementById("mask__bright").style.width = "100px";
        document.getElementById("mask__contrast").style.width = "100px";
        document.getElementById("mask__saturate").style.width = "100px";
        
    });
    document.getElementById("filter__mirror").addEventListener("click", () => {
        if (liveVideoNode.parentNode.style.transform == "") {
            liveVideoNode.parentNode.style.transform = "rotateY(180deg)";
        } else {
            liveVideoNode.parentNode.style.transform = "";
        }
    });

    document.getElementById("filter__select").onchange = function() {
        let option = this.options[this.selectedIndex].text;
        switch (option) {
            case "default":
                StyleHook_remove("Ex_Style_Filter")
                break;
            case "1977":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(110%)brightness(110%)saturate(130%);filter:contrast(110%)brightness(110%)saturate(130%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:screen;background:rgba(243,106,188,0.3);z-index:10}`)
                break;
            case "Aden":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(120%)saturate(85%)hue-rotate(20deg);filter:contrast(90%)brightness(120%)saturate(85%)hue-rotate(20deg)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:darken;background:-webkit-linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(66,10,14,0));background:linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(66,10,14,0));z-index:10}`)
                break;  
            case "Amaro":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(110%)saturate(150%)hue-rotate(-10deg);filter:contrast(90%)brightness(110%)saturate(150%)hue-rotate(-10deg)}`)
                break;
            case "Brannan":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(140%)sepia(50%);filter:contrast(140%)sepia(50%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:lighten;background:rgba(161,44,199,0.31);z-index:10}`)
                break;
            case "Brooklyn":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(110%);filter:contrast(90%)brightness(110%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:overlay;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(168,223,193,0.4)1,rgba(183,196,200,0.2));background:radial-gradient(50%50%,circle closest-corner,rgba(168,223,193,0.4)1,rgba(183,196,200,0.2));z-index:10}`)
                break;   
            case "Claredon":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(120%)saturate(125%);filter:contrast(120%)saturate(125%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:overlay;background:rgba(127,187,227,0.2);z-index:10}`)
                break;
            case "Earlybird":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)sepia(20%);filter:contrast(90%)sepia(20%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:overlay;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(208,186,142,1)20,rgba(29,2,16,0.2));background:radial-gradient(50%50%,circle closest-corner,rgba(208,186,142,1)20,rgba(29,2,16,0.2));z-index:10}`)
                break;
            case "Gingham":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:brightness(105%)hue-rotate(350deg);filter:brightness(105%)hue-rotate(350deg)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:darken;background:-webkit-linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(0,0,0,0));background:linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(0,0,0,0));z-index:10}`)
                break;  
            case "Hudson":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(120%)saturate(110%);filter:contrast(90%)brightness(120%)saturate(110%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:multiply;opacity:0.5;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(255,177,166,1)50,rgba(52,33,52,1));background:radial-gradient(50%50%,circle closest-corner,rgba(255,177,166,1)50,rgba(52,33,52,1));z-index:10}`)
                break;
            case "Inkwell":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(110%)brightness(110%)sepia(30%)grayscale(100%);filter:contrast(110%)brightness(110%)sepia(30%)grayscale(100%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;background:rgba(0,0,0,0);z-index:10}`)
                break;
            case "Lofi":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(150%)saturate(110%);filter:contrast(150%)saturate(110%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:multiply;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(0,0,0,0)70,rgba(34,34,34,1));background:radial-gradient(50%50%,circle closest-corner,rgba(0,0,0,0)70,rgba(34,34,34,1));z-index:10}`);
                break;   
            case "Maven":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(95%)brightness(95%)saturate(150%)sepia(25%);filter:contrast(95%)brightness(95%)saturate(150%)sepia(25%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:hue;background:rgba(3,230,26,0.2);z-index:10}`)
                break;
            case "Perpetua":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:soft-light;opacity:0.5;background:-webkit-linear-gradient(to bottom,rgba(0,91,154,1)1,rgba(61,193,230,0));background:linear-gradient(to bottom,rgba(0,91,154,1)1,rgba(61,193,230,0));z-index:10}`)
                break;
            case "Reyes":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(85%)brightness(110%)saturate(75%)sepia(22%);filter:contrast(85%)brightness(110%)saturate(75%)sepia(22%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:soft-light;opacity:0.5;background:rgba(173,205,239,1);z-index:10}`)
                break;  
            case "Stinson":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(75%)brightness(115%)saturate(85%);filter:contrast(75%)brightness(115%)saturate(85%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:soft-light;background:rgba(240,149,128,0.2);z-index:10}`)
                break;
            case "Toaster":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(150%)brightness(90%);filter:contrast(150%)brightness(90%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:screen;opacity:0.5;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(15,78,128,1)1,rgba(59,0,59,1));background:radial-gradient(50%50%,circle closest-corner,rgba(15,78,128,1)1,rgba(59,0,59,1));z-index:10}`)
                break;
            case "Walden":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:brightness(110%)saturate(160%)sepia(30%)hue-rotate(350deg);filter:brightness(110%)saturate(160%)sepia(30%)hue-rotate(350deg)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:screen;opacity:0.3;background:rgba(204,68,0,1);z-index:10}`)
                break;   
            case "Valencia":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(108%)brightness(108%)sepia(8%);filter:contrast(108%)brightness(108%)sepia(8%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:exclusion;opacity:0.5;background:rgba(58,3,57,1);z-index:10}`)
                break;
            case "Xpro2":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:sepia(30%);filter:sepia(30%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:color-burn;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(224,231,230,1)40,rgba(43,42,161,0.6));background:radial-gradient(50%50%,circle closest-corner,rgba(224,231,230,1)40,rgba(43,42,161,0.6));z-index:10}`)
                break;
            default:
                StyleHook_remove("Ex_Style_Filter")
                break;
        }
    }
}

function setVideoFilter(style) {
    // liveVideoNode.style.filter = text;
    // liveVideoNode.style.webkitFilter = text;
    StyleHook_remove("Ex_Style_Filter");
    StyleHook_set("Ex_Style_Filter", style);
    document.getElementsByClassName("filter__wrap")[0].style.display = "none";
}

function setScrollFunc(scrollDom, barDom, maskDom, callback) {
    let scroll = scrollDom;
    let bar = barDom;
    let mask = maskDom;
    let barleft = 0;
    bar.onmousedown = function (e) {
        let event = e || window.event;
        let leftVal = event.clientX - this.offsetLeft;
        let that = this;
        // 拖动一定写到 down 里面才可以
        document.onmousemove = function (e) {
            let event = e || window.event;
            barleft = event.clientX - leftVal;
            if (barleft < 0)
                barleft = 0;
            else if (barleft > scroll.offsetWidth - bar.offsetWidth)
                barleft = scroll.offsetWidth - bar.offsetWidth;
            mask.style.width = barleft + 'px';
            that.style.left = barleft + "px";
            callback(parseInt(barleft / (scroll.offsetWidth - bar.offsetWidth) * 255));

            //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
}
function initPkg_VideoTools_VideoRecall() {
    initPkg_VideoTools_VideoRecall_Func();
}


function initPkg_VideoTools_VideoRecall_Func() {
    document.getElementsByClassName("layout-Player-video")[0].addEventListener("keydown", (e) => {
        if (isInput == true) {
            return;
        }
        if (e.keyCode == 37) {
            liveVideoNode.currentTime += -3;
        } else if (e.keyCode == 39) {
            liveVideoNode.currentTime += 3;
        }
    });
}

function initPkg_VideoTools_VideoSpeed() {
    initPkg_VideoTools_VideoSpeed_Dom();
    initPkg_VideoTools_VideoSpeed_Func();
}

function initPkg_VideoTools_VideoSpeed_Dom() {
    VideoSpeed_insertIcon();
}
function VideoSpeed_insertIcon() {
	let a = document.createElement("div");
    a.id = "ex-videospeed";
    a.innerHTML = `
    <div class="videospeed__wrap">
        <div class="videospeed__panel">
            <ul>
                <li id="videospeed__2.0">2.0x</li>
                <li id="videospeed__1.5">1.5x</li>
                <li id="videospeed__1.25">1.25x</li>
                <li id="videospeed__1.0">1.0x</li>
                <li id="videospeed__0.75">0.75x</li>
                <li id="videospeed__0.5">0.5x</li>
            </ul>
        </div>
    </div>
    <svg t="1595682415782" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15132" width="24" height="24"><path d="M566.857143 109.714286a36.571429 36.571429 0 0 1 2.742857 73.051428L566.857143 182.857143H219.428571a36.571429 36.571429 0 0 0-36.48 33.828571L182.857143 219.428571v585.142858a36.571429 36.571429 0 0 0 33.828571 36.48L219.428571 841.142857h585.142858a36.571429 36.571429 0 0 0 36.48-33.828571L841.142857 804.571429V292.571429a36.571429 36.571429 0 0 1 73.051429-2.742858L914.285714 292.571429v512a109.714286 109.714286 0 0 1-105.6 109.641142L804.571429 914.285714H219.428571a109.714286 109.714286 0 0 1-109.641142-105.6L109.714286 804.571429V219.428571a109.714286 109.714286 0 0 1 105.6-109.641142L219.428571 109.714286h347.428572z m92.068571 255.707428c33.389714 0 59.538286 13.677714 78.445715 41.837715 17.700571 26.550857 26.550857 62.354286 26.550857 107.410285 0 45.056-8.850286 80.859429-26.550857 107.410286-18.907429 27.757714-45.056 41.837714-78.445715 41.837714-33.792 0-59.940571-14.08-78.445714-41.837714-17.700571-26.550857-26.550857-62.354286-26.550857-107.410286 0-45.056 8.850286-80.859429 26.550857-107.410285 18.505143-28.16 44.653714-41.837714 78.445714-41.837715z m-176.201143 232.118857c8.850286 0 16.091429 2.816 22.528 9.252572 6.034286 6.034286 9.252571 13.677714 9.252572 22.528s-3.218286 16.091429-9.252572 22.528c-6.436571 5.632-13.677714 8.850286-22.528 8.850286s-16.493714-3.218286-22.125714-8.850286a30.061714 30.061714 0 0 1-9.252571-22.528c0-8.850286 2.816-16.493714 9.252571-22.528 5.632-6.436571 13.275429-9.252571 22.125714-9.252572z m-91.318857-226.486857V658.285714h-47.067428V427.776c-17.298286 15.689143-39.021714 27.355429-65.572572 34.998857v-46.665143c12.873143-3.218286 26.550857-8.850286 41.033143-16.896 14.482286-8.850286 26.550857-18.102857 36.205714-28.16h35.401143z m267.52 34.194286c-22.930286 0-39.021714 12.470857-48.274285 38.217143-6.436571 17.298286-9.654857 41.033143-9.654858 71.204571 0 29.769143 3.218286 53.504 9.654858 71.204572 9.252571 25.344 25.344 38.217143 48.274285 38.217143 22.528 0 38.619429-12.873143 48.274286-38.217143 6.436571-17.700571 9.654857-41.435429 9.654857-71.204572 0-30.171429-3.218286-53.906286-9.654857-71.204571-9.654857-25.746286-25.746286-38.217143-48.274286-38.217143zM822.857143 89.563429a18.285714 18.285714 0 0 1 10.349714 3.218285l56.045714 38.418286a18.285714 18.285714 0 0 1 0 30.171429l-56.045714 38.418285A18.285714 18.285714 0 0 1 804.571429 184.722286V107.849143a18.285714 18.285714 0 0 1 18.285714-18.285714z m-128 0a18.285714 18.285714 0 0 1 10.349714 3.218285l56.045714 38.418286a18.285714 18.285714 0 0 1 0 30.171429l-56.045714 38.418285A18.285714 18.285714 0 0 1 676.571429 184.722286V107.849143a18.285714 18.285714 0 0 1 18.285714-18.285714z" fill="#ffffff" p-id="15133"></path></svg>
    `;
    let b = document.getElementsByClassName("right-e7ea5d")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_VideoSpeed_Func() {
    document.getElementById("ex-videospeed").addEventListener("mouseover", function() {
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "block";
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
        document.getElementsByClassName("filter__wrap")[0].style.display = "none";
    });
    document.getElementsByClassName("videospeed__wrap")[0].addEventListener("mouseout", function() {
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });

    document.getElementById("videospeed__2.0").addEventListener("click", () => {
        liveVideoNode.playbackRate = 2;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__1.5").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1.5;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__1.25").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1.25;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__1.0").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__0.75").addEventListener("click", () => {
        liveVideoNode.playbackRate = 0.75;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__0.5").addEventListener("click", () => {
        liveVideoNode.playbackRate = 0.5;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
}

function initPkg_VideoTools_VideoSync() {
    initPkg_VideoTools_VideoSync_Dom();
    initPkg_VideoTools_VideoSync_Func();
}

function initPkg_VideoTools_VideoSync_Dom() {
    VideoSync_insertIcon();
}
function VideoSync_insertIcon() {
	let a = document.createElement("div");
    a.id = "ex-videosync";
    a.title = "同步时间";
    a.innerHTML = `
    <svg t="1595680402158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7532" width="22" height="22"><path d="M938.1888 534.016h-80.7936c0.4096-7.3728 0.6144-14.6432 0.6144-22.016 0-218.624-176.8448-400.7936-389.12-400.7936C257.024 111.2064 80.6912 293.1712 80.6912 512c0 218.7264 176.4352 400.7936 388.1984 400.7936 74.752 0 149.0944-22.016 208.1792-60.0064l42.7008 68.608c-75.0592 48.9472-161.9968 74.8544-250.7776 74.752C209.8176 996.1472 0 779.264 0 512S209.8176 27.8528 468.8896 27.8528C728.3712 27.8528 938.7008 244.736 938.7008 512c0 7.3728-0.2048 14.6432-0.512 22.016z m-261.12 318.7712z m-26.4192-158.1056L426.7008 556.032V291.9424h64v226.5088L689.5616 635.904l-38.912 58.7776z m245.3504-6.656L768 512h256L896 688.0256z" fill="#ffffff" p-id="7533"></path></svg>
    `;
    let b = document.getElementsByClassName("left-d3671e")[0];
    b.insertBefore(a, b.childNodes[3]);
}

function initPkg_VideoTools_VideoSync_Func() {
    document.getElementById("ex-videosync").addEventListener("click", () => {
        setVideoSync();
    })
}

function setVideoSync() {
    let buffered = liveVideoNode.buffered;
        if (buffered.length == 0) {
            // 暂停中
            return;
        }
    liveVideoNode.currentTime = buffered.end(0);
}
var liveVideoNode; // 直播video标签节点
var isInput = false;
let videotools_num = 0;
function initPkg_VideoTools() {
    let timer = setInterval(() => {
        if (document.getElementsByClassName("right-e7ea5d").length > 0) {
            clearInterval(timer);
            liveVideoNode = document.querySelector(".layout-Player-videoEntity video");
            initPkg_VideoTools_Module();
            initPkg_VideoTools_Func();
        }
        videotools_num++;
        if (videotools_num >= 15) {
            clearInterval(timer);
        }
    }, 1500);
}

function initPkg_VideoTools_Module() {
    // 添加模块
    initPkg_VideoTools_VideoSpeed();
    initPkg_VideoTools_Cinema();
    initPkg_VideoTools_VideoSync();
    initPkg_VideoTools_VideoRecall();
    initPkg_VideoTools_Filter();
    initPkg_VideoTools_Camera();
}

function initPkg_VideoTools_Func() {
    document.getElementById("js-player-toolbar").addEventListener("mouseover", () => {
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
        document.getElementsByClassName("filter__wrap")[0].style.display = "none";
    });
    document.getElementById("js-player-asideMain").addEventListener("mouseover", () => {
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
        document.getElementsByClassName("filter__wrap")[0].style.display = "none";
    });
    document.getElementsByClassName("inputView-2a65aa")[0].addEventListener("focus", () => {
        isInput = true;
    });
    document.getElementsByClassName("inputView-2a65aa")[0].addEventListener("blur", () => {
        isInput = false;
    });
    let m = new DomHook(".app-f0f9c7", false, (m) => {
        if (m.length > 0) {
            if (m[0].addedNodes.length > 0) {
                isInput = true;
            } else if (m[0].removedNodes.length > 0) {
                isInput = false;
            }
        }
    });
}

function doSign(alias) {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/nc/hostSnowSign/doSign',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `actAlias=${alias}&token=${dyToken}&ctn=${getCCN()}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function signAct(alias) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + alias
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function userStatus(tasks) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/actTask/userStatus", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `tasks=${tasks}&token=${dyToken}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}


function takeActPrize(name) {
    // 该接口会在userStatus后自动执行
    // 关注20200911LMJX_T2
    // 分享20200911LMJX_T5
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/nc/actTask/takePrize',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `token=${ dyToken }&aid=android&taskAlias=${ name }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function addFollowRoom(rid) {
	return new Promise(resolve => {
        fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/add',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `rid=${ rid }&ctn=${ getCCN() }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}


function removeFollowRoom(rid) {
	return new Promise(resolve => {
        fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/rm',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `rid=${ rid }&ctn=${ getCCN() }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function shareAct(name) {
    // 20200911LMJX
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/common/share',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `actAlias=${ name }&token=${ dyToken }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function getJackpot(id) {
	return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/lottery/jackpot", {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: `{"activityId":"${ id }","token":"${ dyToken }"}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function getActRemaining(id) {
	return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/lottery/remaining?activityId=" + id, {
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

function getActList() {
    return new Promise(resolve => {
        fetch('https://www.douyuex.com/src/actList.txt',{
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'omit',
        }).then(res => {
            return res.text();
        }).then(txt => {
            resolve(txt);
        }).catch(err => {
            console.error('请求失败', err);
        })
    })
}





// function douyuVideo_createUp(cookie, vid, ctn) {
// 	// 斗鱼视频点赞
// 	return exHttpRequest("https://v.douyu.com/api/video/createUp", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_destroyUp(cookie, vid, ctn) {
// 	// 斗鱼视频取消点赞
// 	return exHttpRequest("https://v.douyu.com/api/video/destroyUp", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_createCollect(cookie, vid, ctn) {
// 	// 斗鱼视频收藏
// 	return exHttpRequest("https://v.douyu.com/api/video/createCollect", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_destroyCollect(cookie, vid, ctn) {
// 	// 斗鱼视频取消收藏
// 	return exHttpRequest("https://v.douyu.com/api/video/destroyCollect", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_createSub(cookie, uid, ctn) {
// 	// 斗鱼关注UP主
// 	return exHttpRequest("https://v.douyu.com/api/video/createSub", "POST", {
// 		cookie: cookie
// 	}, "uid=" + uid + "&ccn=" + ctn);
// }

// function douyuVideo_destroySub(cookie, uid, ctn) {
// 	// 斗鱼取消关注UP主
// 	return exHttpRequest("https://v.douyu.com/api/video/destroySub", "POST", {
// 		cookie: cookie
// 	}, "uid=" + uid + "&ccn=" + ctn);
// }

// function douyuVideo_shareVideo(token, vid) {
// 	// 斗鱼分享视频
// 	return exHttpRequest("https://apiv2.douyucdn.cn/mgapi/vodnc/share/success?token=" + token + "&client_sys=android", "POST", {}, "hash_id=" + vid + "&share_type=weixin");
// }


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
        if (targetNode == null) {
            return;
        }
        let observer = new MutationObserver(function(mutations) {
            callback(mutations);
        });
        this.observer = observer;
        this.observer.observe(targetNode, { attributes: true, childList: true, subtree: this.isSubtree });
    }
    closeHook() {
        this.observer.disconnect();
    }
}
class DyWacthAd {
    constructor(posid, token, rid) {
        this.posid = posid;
        this.token = token;
        this.rid = rid;
        
        this._uid = String(token).split("_")[0];
        this._mid = 0;
        this._infoBack = "";

    }
    
    async start() {
        let info = await this.getInfo(this.posid, this.token, this.rid);
        if (info == false) {
            return false;
        }
        this._mid = info.mid;
        this._infoBack = info.infoBack;
        let isStart = await this.getStart(this.posid, this.token, this._uid, this._mid, this._infoBack);
        return isStart;
    }

    async finish() {
        let isFinish = await this.getFinish(this.posid, this.token, this._uid, this._mid, this._infoBack);
        return isFinish;
    }

    getInfo(posid, token, rid) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
                data: "posid=" + posid + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
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

    getStart(posid, token, uid, mid, infoBack) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
                data: "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid + "&token=" + token + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
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
    
    getFinish(posid, token, uid, mid, infoBack) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
                data: "uid=" + uid + "&clientType=1&posCode=" + posid + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
                responseType: "json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                onload: function(response) {
                    let ret = response.response;
                    if (ret.error == "0") {
                        if (ret.data == "1") {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                }
            });
    
        })
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
function getRealLive_Douyu(room_id, is_video, is_https, qn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入bool,表示是视频还是音频
    // 第三个参数传入bool,表示是否返回https地址。注意https地址只能使用一次，使用过以后需要再次获取；http地址无限制
    // 第四个参数传入string(1,2,3,4),表示清晰度 流畅_550p(rate:1) 高清_1200p(rate:2) 超清_2000p(rate:3) 蓝光4M_4000p(rate:0) 填写1015则返回默认清晰度
    // 第五个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}
    GM_xmlhttpRequest({
		method: "GET",
		url: 'https://m.douyu.com/' + room_id,
		responseType: "text",
		onload: function(response) {
            let a = response.response.match(/(function ub9.*)[\s\S](var.*)/i);
            let ub9_ex = String(a[0]).replace("ub98484234", "ub98484234_ex");
            eval1(ub9_ex, "exScript1");
            let tt0 = Math.round(new Date().getTime()/1000).toString();
            RealLive_get_sign_url(room_id, tt0, is_https, qn, reallive_callback, is_video);
        }
	});
}

function RealLive_get_sign_url(r, tt, is_https, qn, reallive_callback, is_video) {
    let param1 = ub98484234_ex(r, getDyDid(), tt);
    let postData;
    if (qn == "1015") {
        postData = param1 + "&ver=219032101&rid=" + r + "&rate=1";
    } else {
        postData = param1 + "&ver=219032101&rid=" + r + "&rate=" + qn;
    }
    
    document.getElementById("exScript1").remove();
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://m.douyu.com/api/room/ratestream",
        data: postData,
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        onload: function(response) {
            let ret = response.response;
            let result = "";
            if (ret.code == "0") {
                let url = ret.data.url;
                if (String(url).indexOf("mix=1") != -1) {
                    result = "PKing"
                } else {
                    let p = /^[0-9a-zA-Z]*/;
                    let tmpArr = String(ret.data.url).split("/");
                    result = String(tmpArr[tmpArr.length - 1]).match(p)[0];
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
                if (is_https == true) {
                    realLive = String(ret.data.url).replace("m3u8", "flv");
                    realLive = realLive.replace("http:", "https:");
                } else {
                    if (qn == "1015") {
                        // qn写1015则不返回清晰度，即默认
                        realLive = "http://tx2play1.douyucdn.cn/live/" + result + ".xs?uuid=";
                    } else {
                        realLive = "https://tx2play1.douyucdn.cn/live/" + result + "_" + cl + ".flv?uuid=";
                    }
                }
                realLive = is_video ? realLive : realLive + "&only-audio=1";
            }
            reallive_callback(realLive);
        }
    });
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
class STT {
    escape(v) {
        return v.toString().replace(/@/g, '@A').replace(/\//g, '@S')
    }

    unescape(v) {
        return v.toString().replace(/@A/g, '@').replace(/@S/g, '/')
    }

    serialize(raw) {
        if (util.isObject(raw)) {
            return Object.keys(raw).map(k => `${k}@=${this.escape(this.serialize(raw[k]))}/`).join('')
        } else if (Array.isArray(raw)) {
            return raw.map(v => `${this.escape(this.serialize(v))}/`).join('')
        } else if (util.isString(raw) || util.isNumber(raw)) {
            return raw.toString()
        }
    }

    deserialize(raw) {
        if (raw.includes('//')) {
            return raw.split('//').filter(e => e !== '').map(item => this.deserialize(item))
        }

        if (raw.includes('@=')) {
            return raw.split('/').filter(e => e !== '').reduce((o, s) => {
                const [k, v] = s.split('@=')
                o[k] = this.deserialize(this.unescape(v))
                return o
            }, {})
        } else if (raw.includes('@A=')) {
            return this.deserialize(this.unescape(raw))
        } else {
            return raw.toString()
        }
    }
}

// let a = new STT();
// a.deserialize(`type@=rquizisn/rid@=475252/qst@=1/qril@=qid@AA=4441661@ASqbid@AA=7341fe0a159617089038802172028@ASqt@AA=我的死亡数能否小于等于5@ASfon@AA=能@ASson@AA=不能@ASfbuid@AA=9985474@ASsbuid@AA=182243496@ASfbmc@AA=2360@ASsbmc@AA=4545@ASfolpc@AA=10@ASsolpc@AA=220@ASfobc@AA=440126@ASsobc@AA=39210@ASfbid@AA=109846265@ASsbid@AA=109846431@ASqs@AA=1@ASet@AA=-1@ASwo@AA=0@ASscs@AA=0@ASsuid@AA=25332273@ASsname@AA=孙悟空丨兰林汉@ASaktp@AA=10@ASft@AA=0@ASflagc@AA=0@AS@Sqid@AA=4441660@ASqbid@AA=7341fe0a159617089038802172028@ASqt@AA=比赛结果@ASfon@AA=赢@ASson@AA=输@ASfbuid@AA=0@ASsbuid@AA=136676242@ASfbmc@AA=0@ASsbmc@AA=35978@ASfolpc@AA=0@ASsolpc@AA=990@ASfobc@AA=1809968@ASsobc@AA=64078@ASfbid@AA=0@ASsbid@AA=109846387@ASqs@AA=1@ASet@AA=-1@ASwo@AA=0@ASscs@AA=0@ASsuid@AA=25332273@ASsname@AA=孙悟空丨兰林汉@ASaktp@AA=10@ASft@AA=0@ASflagc@AA=0@AS@Sqid@AA=4441659@ASqbid@AA=7341fe0a159617089038802172028@ASqt@AA=我的伤害能否全场第一@ASfon@AA=能@ASson@AA=不能@ASfbuid@AA=186024887@ASsbuid@AA=175701690@ASfbmc@AA=382@ASsbmc@AA=86040@ASfolpc@AA=510@ASsolpc@AA=10@ASfobc@AA=90719@ASsobc@AA=224159@ASfbid@AA=109846402@ASsbid@AA=109846396@ASqs@AA=1@ASet@AA=-1@ASwo@AA=0@ASscs@AA=0@ASsuid@AA=25332273@ASsname@AA=孙悟空丨兰林汉@ASaktp@AA=10@ASft@AA=0@ASflagc@AA=0@AS@S/`)



// function parseMsg(t) {
//     if (t.includes("//")) {
//         return t.split("//").map(item => {return parseMsg(item)}).filter(e => { return e !== "" });
//     }
//     if (t.includes("@=")) {
//         let arr = t.split("/");
//         return arr.reduce((prev, cur) => {
//             if (cur !== "") {
//                 let obj = cur.split("@=");
//                 prev[obj[0]] = parseMsg(obj[1].replace(/@A/g, '@').replace(/@S/g, '/'));
//             }
//             return prev;
//         }, {})
//     } else if (t.includes("@A=")) {
//         return parseMsg(t.replace(/@A/g, '@').replace(/@S/g, '/'));
//     } else {
//         return t;
//     }
// }
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

function StyleHook_setIframe(dom, styleName, styleText) {
    // styleName：样式id名，建议以Ex_Style_大驼峰的形式命名
    // document.getElementsByClassName("BottomGroup")[0].getElementsByTagName("iframe")[0].contentWindow.document
    if (dom.getElementById(styleName) == null) {
        let styleElement = dom.createElement("style");
        styleElement.id = styleName;
        styleElement.innerHTML = styleText;
        dom.body.append(styleElement);
    }
}

function StyleHook_removeIframe(dom, styleName) {
    let e = dom.getElementById(styleName);
    if (e !== null) {
        dom.getElementById(styleName).remove();
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
                    let arr = String(reader.result).split("\0"); // 分包
                    reader = null;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].length > 12) {
                            // 过滤第一条和心跳包
                            callback(arr[i]);
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
    // 用于优先载入夜间模式
    // if (String(href).indexOf("www.douyu.com") && String(href).indexOf("getFansBadgeList") == -1) {
    //     initPkg_Night_Set_Fast();
    // }

    // 路由转发
    if (String(href).indexOf("passport.douyu.com") != -1 && String(href).indexOf("exid=chun") != -1) {
        // 账号
        initRouter_Passport();
    } else if (String(href).indexOf("msg.douyu.com") != -1) {
        // 车队
        if (href.indexOf("?exClean") != -1) {
            initRouter_CleanMsg();
        } else {
            initRouter_Motorcade();
        }
    } else if (String(href).indexOf("yuba.douyu.com") != -1) {
        // 鱼吧
        if (String(href).indexOf("?exClean") != -1) {
            initRouter_CleanYuba();
        } else {
            initRouter_Yuba();
        }
    } else if (String(href).indexOf("v.douyu.com") != -1) {
        // 视频
        if (String(href).indexOf("?exClean") != -1) {
            initRouter_CleanVideo();
        } else if (String(href).indexOf("show/") != -1) {
            initRouter_Video();
        }
    } else if (String(href).indexOf("cz.douyu.com") != -1) {
        // 充值
        if (String(href).indexOf("?exClean") != -1) {
            initRouter_CleanCz();
        }
        
    } else if (String(href).indexOf("getFansBadgeList") != -1) {
        // 粉丝牌
        initRouter_FansBadgeList();
    } else {
        if (String(href).indexOf("exid=chun") != -1) {
            // 主站
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
        if (typeof (document.querySelector('div.wfs-2a8e83')) != "undefined") {
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
    document.domain = "douyu.com";
    init();
    let intID = setInterval(() => {
        if (typeof (document.getElementsByClassName("BackpackButton")[0]) != "undefined" && typeof (document.getElementsByClassName("Barrage-main")[0]) != "undefined") {
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

function initRouter_Yuba() {
    document.domain = "douyu.com";
}

function initRouter_Passport() {
    let cmd = getStrMiddle(window.location.href, "cmd=", "&");
    let uid = getStrMiddle(window.location.href, "uid=", "&");
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    if (cmd !== "clean") {
        addAccountPassport(uid);
    }
    switch (cmd) {
        case "clean":
            // 清空cookie，用于重新登录
            cleanCookie(() => {
                window.parent.postMessage("cleanOver", decodeURIComponent(domain));
            });
            break;
        case "switch":
            // 切换用户
            switchAccountPassport(uid, () => {
                window.parent.postMessage("switchOver", decodeURIComponent(domain));
            });
            break;
        case "delete":
            // 删除用户
            deleteAccountPassport(uid, () => {
                window.parent.postMessage("deleteOver", decodeURIComponent(domain));
            });
            break;
        default:
            break;
    }
    return;
}

function initRouter_CleanMsg() {
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    cleanCookie(() => {
        window.parent.postMessage("msgCleanOver", decodeURIComponent(domain));
    });
}

function initRouter_CleanYuba() {
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    cleanCookie(() => {
        window.parent.postMessage("yubaCleanOver", decodeURIComponent(domain));
    });
}

function initRouter_CleanVideo() {
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    cleanCookie(() => {
        window.parent.postMessage("videoCleanOver", decodeURIComponent(domain));
    });
}

function initRouter_CleanCz() {
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    cleanCookie(() => {
        window.parent.postMessage("czCleanOver", decodeURIComponent(domain));
    });
}

function initRouter_Video() {
    initStyles();
    initPkg_VideoTime();
    initPkg_VideoTools_Camera_Video();
}

function initRouter_FansBadgeList() {
    initPkg_FansBadgeList();
}
