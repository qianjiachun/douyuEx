"use strict";
// ==UserScript==
// @name         DouyuEx-斗鱼直播间增强插件
// @namespace    https://github.com/qianjiachun
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTA4cHgiIGhlaWdodD0iMTA4cHgiIHZpZXdCb3g9IjAgMCAxMDggMTA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPueyvueBteeQgzwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnsr7ngbXnkIMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuODMwNzY5LCAwLjgzMDc2OSkiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01My4xNjkyMzA3LDEwNi4zMzg0NjEgQzIzLjgyNzY5MjIsMTA2LjMzODQ2MSAwLDgyLjUxMDc2OTIgMCw1My4xNjkyMzA3IEMwLDUxLjAwMzA3NjkgMS43NzIzMDc3NSw0OS4yMzA3NjkyIDMuOTM4NDYxNSw0OS4yMzA3NjkyIEwzMy40NzY5MjMsNDkuMjMwNzY5MiBDMzUuNjQzMDc2OSw0OS4yMzA3NjkyIDM3LjQxNTM4NDUsNTEuMDAzMDc3IDM3LjQxNTM4NDYsNTMuMTY5MjMwNyBDMzcuNDE1Mzg0Niw2MS44MzM4NDYxIDQ0LjUwNDYxNTQsNjguOTIzMDc2OSA1My4xNjkyMzA3LDY4LjkyMzA3NjkgQzYxLjgzMzg0NjEsNjguOTIzMDc2OSA2OC45MjMwNzY5LDYxLjgzMzg0NjEgNjguOTIzMDc2OSw1My4xNjkyMzA3IEM2OC45MjMwNzY5LDUxLjAwMzA3NjkgNzAuNjk1Mzg0Niw0OS4yMzA3NjkyIDcyLjg2MTUzODUsNDkuMjMwNzY5MiBMMTAyLjQsNDkuMjMwNzY5MiBDMTA0LjU2NjE1NCw0OS4yMzA3NjkyIDEwNi4zMzg0NjEsNTEuMDAzMDc3IDEwNi4zMzg0NjEsNTMuMTY5MjMwNyBDMTA2LjMzODQ2MSw4Mi41MTA3NjkyIDgyLjUxMDc2OTIsMTA2LjMzODQ2MSA1My4xNjkyMzA3LDEwNi4zMzg0NjEgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iIzMzMzYzQSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOC4wNzM4NDYxMiw1Ny4xMDc2OTIyIEMxMC4wNDMwNzY5LDgwLjI0NjE1MzcgMjkuNTM4NDYxNSw5OC40NjE1Mzg1IDUzLjE2OTIzMDcsOTguNDYxNTM4NSBDNzYuOCw5OC40NjE1Mzg1IDk2LjI5NTM4NDYsODAuMjQ2MTUzOSA5OC4yNjQ2MTU0LDU3LjEwNzY5MjIgTDc2LjUwNDYxNTQsNTcuMTA3NjkyMiBDNzQuNjMzODQ2MSw2OC4yMzM4NDYxIDY0Ljg4NjE1MzksNzYuOCA1My4xNjkyMzA3LDc2LjggQzQxLjQ1MjMwNzYsNzYuOCAzMS43MDQ2MTU0LDY4LjIzMzg0NjEgMjkuODMzODQ2MSw1Ny4xMDc2OTIyIEw4LjA3Mzg0NjEyLDU3LjEwNzY5MjIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNTMuMTY5MjMwOCwzLjkzODQ2MTUgQzI1Ljk5Mzg0NjEsMy45Mzg0NjE1IDMuOTM4NDYxNSwyNS45OTM4NDYxIDMuOTM4NDYxNSw1My4xNjkyMzA3IEwzMy40NzY5MjMsNTMuMTY5MjMwNyBDMzMuNDc2OTIzLDQyLjMzODQ2MTUgNDIuMzM4NDYxNSwzMy40NzY5MjMgNTMuMTY5MjMwOCwzMy40NzY5MjMgQzY0LDMzLjQ3NjkyMyA3Mi44NjE1Mzg1LDQyLjMzODQ2MTUgNzIuODYxNTM4NSw1My4xNjkyMzA3IEwxMDIuNCw1My4xNjkyMzA3IEMxMDIuNCwyNS45OTM4NDYxIDgwLjM0NDYxNTQsMy45Mzg0NjE1IDUzLjE2OTIzMDgsMy45Mzg0NjE1IFoiIGlkPSLot6/lvoQiIGZpbGw9IiNENjA5MDkiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTEwMi40LDU3LjEwNzY5MjIgTDcyLjg2MTUzODUsNTcuMTA3NjkyMiBDNzAuNjk1Mzg0Niw1Ny4xMDc2OTIyIDY4LjkyMzA3Nyw1NS4zMzUzODQ1IDY4LjkyMzA3NjksNTMuMTY5MjMwNyBDNjguOTIzMDc2OSw0NC41MDQ2MTU0IDYxLjgzMzg0NjEsMzcuNDE1Mzg0NiA1My4xNjkyMzA3LDM3LjQxNTM4NDYgQzQ0LjUwNDYxNTQsMzcuNDE1Mzg0NiAzNy40MTUzODQ2LDQ0LjUwNDYxNTQgMzcuNDE1Mzg0Niw1My4xNjkyMzA3IEMzNy40MTUzODQ2LDU1LjMzNTM4NDYgMzUuNjQzMDc2OSw1Ny4xMDc2OTIyIDMzLjQ3NjkyMyw1Ny4xMDc2OTIyIEwzLjkzODQ2MTUsNTcuMTA3NjkyMiBDMS43NzIzMDc2Miw1Ny4xMDc2OTIyIDAsNTUuMzM1Mzg0NSAwLDUzLjE2OTIzMDcgQzAsMjMuODI3NjkyMiAyMy44Mjc2OTIzLDAgNTMuMTY5MjMwNywwIEM4Mi41MTA3NjkyLDAgMTA2LjMzODQ2MSwyMy44Mjc2OTIyIDEwNi4zMzg0NjEsNTMuMTY5MjMwNyBDMTA2LjMzODQ2MSw1NS4zMzUzODQ2IDEwNC41NjYxNTQsNTcuMTA3NjkyMiAxMDIuNCw1Ny4xMDc2OTIyIFoiIGlkPSLot6/lvoQiIGZpbGw9IiMzMzM2M0EiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTc2LjUwNDYxNTQsNDkuMjMwNzY5MyBMOTguMzYzMDc2OSw0OS4yMzA3NjkzIEM5Ni4yOTUzODQ2LDI2LjA5MjMwNzYgNzYuOCw3Ljg3NjkyMyA1My4xNjkyMzA3LDcuODc2OTIzIEMyOS41Mzg0NjE1LDcuODc2OTIzIDEwLjA0MzA3NjksMjYuMDkyMzA3NiA4LjA3Mzg0NjEyLDQ5LjIzMDc2OTMgTDI5LjkzMjMwNzYsNDkuMjMwNzY5MyBDMzEuNzA0NjE1NCwzOC4xMDQ2MTU0IDQxLjQ1MjMwNzYsMjkuNTM4NDYxNSA1My4xNjkyMzA3LDI5LjUzODQ2MTUgQzY0Ljg4NjE1MzksMjkuNTM4NDYxNSA3NC42MzM4NDYxLDM4LjEwNDYxNTQgNzYuNTA0NjE1NCw0OS4yMzA3NjkzIEw3Ni41MDQ2MTU0LDQ5LjIzMDc2OTMgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0Q2MDkwOSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNTMuMTY5MjMwNyw3Ni44IEM0MC4xNzIzMDc2LDc2LjggMjkuNTM4NDYxNSw2Ni4xNjYxNTM5IDI5LjUzODQ2MTUsNTMuMTY5MjMwNyBDMjkuNTM4NDYxNSw0MC4xNzIzMDc2IDQwLjE3MjMwNzYsMjkuNTM4NDYxNSA1My4xNjkyMzA3LDI5LjUzODQ2MTUgQzY2LjE2NjE1MzksMjkuNTM4NDYxNSA3Ni44LDQwLjE3MjMwNzYgNzYuOCw1My4xNjkyMzA3IEM3Ni44LDY2LjE2NjE1MzkgNjYuMTY2MTUzOSw3Ni44IDUzLjE2OTIzMDcsNzYuOCBaIiBpZD0i6Lev5b6EIiBmaWxsPSIjMzMzNjNBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01My4xNjkyMzA3LDM3LjQxNTM4NDYgQzQ0LjUwNDYxNTQsMzcuNDE1Mzg0NiAzNy40MTUzODQ2LDQ0LjUwNDYxNTQgMzcuNDE1Mzg0Niw1My4xNjkyMzA3IEMzNy40MTUzODQ2LDYxLjgzMzg0NjEgNDQuNTA0NjE1NCw2OC45MjMwNzY5IDUzLjE2OTIzMDcsNjguOTIzMDc2OSBDNjEuODMzODQ2MSw2OC45MjMwNzY5IDY4LjkyMzA3NjksNjEuODMzODQ2MSA2OC45MjMwNzY5LDUzLjE2OTIzMDcgQzY4LjkyMzA3NjksNDQuNTA0NjE1NCA2MS44MzM4NDYxLDM3LjQxNTM4NDYgNTMuMTY5MjMwNywzNy40MTUzODQ2IEw1My4xNjkyMzA3LDM3LjQxNTM4NDYgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNDMuMzIzMDc2OSw1My4xNjkyMzA3IEM0My4zMjMwNzY5LDU4LjYwNzExMTQgNDcuNzMxMzUwMSw2My4wMTUzODQ2IDUzLjE2OTIzMDcsNjMuMDE1Mzg0NiBDNTguNjA3MTExNCw2My4wMTUzODQ2IDYzLjAxNTM4NDYsNTguNjA3MTExNCA2My4wMTUzODQ2LDUzLjE2OTIzMDcgQzYzLjAxNTM4NDYsNDcuNzMxMzUwMSA1OC42MDcxMTE0LDQzLjMyMzA3NjkgNTMuMTY5MjMwNyw0My4zMjMwNzY5IEM0Ny43MzEzNTAxLDQzLjMyMzA3NjkgNDMuMzIzMDc2OSw0Ny43MzEzNTAxIDQzLjMyMzA3NjksNTMuMTY5MjMwNyBaIiBpZD0i6Lev5b6EIiBmaWxsPSIjMzMzNjNBIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=
// @version      2026.02.04.01
// @description  斗鱼直播间增强插件，功能：弹幕自动变色防检测循环发送 一键续牌 查看真实人数/查看主播数据 已播时长 一键签到(直播间/车队/鱼吧/客户端) 一键领取鱼粮(宝箱/气泡/任务) 一键寻宝 送出指定数量的礼物 一键清空背包 屏蔽广告 调节弹幕大小 自动更新 同屏画中画/多直播间小窗观看/可在斗鱼看多个平台直播(虎牙/b站) 获取真实直播流地址 自动抢礼物红包 背包信息扩展 简洁模式 夜间模式 开播提醒 幻神模式 关键词回复 关键词禁言 自动谢礼物 自动抢宝箱 弹幕右键信息扩展 防止下播自动跳转 影院模式 直播时间流控制 弹幕投票 直播滤镜 直播音频流 账号多开/切换 显示粉丝牌获取日期 月消费数据显示 弹幕时速 相机截图录制gif 全景播放器 斗鱼视频下载/弹幕ass下载 直播画面局部缩放 全站抽奖信息 直播音效增强 阻止P2P上传 显示贡献榜贡献值 恢复弹幕显示 斗鱼视频弹幕高能进度条 检测弹幕是否发送成功 查看主播配置信息 自动网页全屏 自动最高画质 弹幕无限收藏 收藏弹幕搜索 支持弹幕带图片 屏蔽弹幕背景 弹幕+1 房间VIP到期提醒 自动钓鱼 防止自动暂停直播 恢复已关闭鱼吧 弹幕小尾巴 屏蔽重复弹幕 画质增强
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
// @match			*://*.douyu.com/beta/*
// @match			*://*.douyu.com/topic/*
// @match        *://www.douyu.com/member/cp/getFansBadgeList
// @match        *://passport.douyu.com/*
// @match        *://msg.douyu.com/*
// @match        *://yuba.douyu.com/*
// @match        *://v.douyu.com/*
// @match        *://cz.douyu.com/*
// @require      https://registry.npmmirror.com/flv.js/1.6.2/files/dist/flv.min.js
// @require      https://fastly.jsdelivr.net/npm/svgaplayerweb@2.3.1/build/svga.min.js
// @require      https://registry.npmmirror.com/gif.js/0.2.0/files/dist/gif.js
// @require      https://registry.npmmirror.com/three/0.80.0/files/build/three.min.js
// @require      https://registry.npmmirror.com/xlsx/0.16.4/files/dist/xlsx.full.min.js
// @require      https://registry.npmmirror.com/dompurify/2.3.6/files/dist/purify.min.js
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
// @connect      douyuex.com
// @connect      bojianger.com
// @connect      greasyfork.org
// @connect      bilibili.com
// @connect      huya.com
// @connect      jsdelivr.net
// @connect      shadiao.app
// @connect      shadiao.pro
// @connect      fz996.com
// @connect      toubang.tv
// @connect      doseeing.com
// @antifeature  tracking
// ==/UserScript==
function init() {
  initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook();
  initScriptHook();
  initPkg_Night_Set_Fast();
  initResponseHook();
  initPkg_ShowDanmaku();
  Update_checkVersion();
  initKillP2P();
  initFullScreen();
  initHighestVideoQuality();
  removeAD();
  initPkg_Statistics();
  initPkg_Console();
  initPkg_Menu();
  initPkg_FollowList();
}
function initPkg() {
  initPkg_DanmakuTail();
  initPkg_Night();
  initPkg_ExIcon();
  initPkg_ExPanel();
  initPkg_RealAudience();
  initPkg_CopyRealLive();
  initPkg_AudioLine();
  initPkg_RemoveAD();
  initPkg_Shield();
  initPkg_BagInfo();
  initPkg_Update();
  // initPkg_SyncJoy();
  initPkg_AutoAnchorStar();
  initPkg_Fkbuff();
  initPkg_Monitor();
  initPkg_Lottery();
  // initPkg_MiniProgram();
  initPkg_PopupPlayer();
  initPkg_LiveTool();
  initPkg_VideoTools();
  initPkg_ExpandTool();
  initPkg_Refresh();
  initPkg_BarrageLoop();
  initPkg_FansContinue();
  // initPkg_FishFood();
  initPkg_Sign();
  initPkg_BarragePanel();
  // initPkg_AdVideo();
  initPkg_AccountList();
  initPkg_ChatTools();
  initPkg_MonthCost();
  initPkg_RoomVip();
  initPkg_WeeklyPanel();
  initPkg_DanmakuCollect();
  initPkg_RestoreYuba();
  initPkg_ChangeDanmakuLengthLimit();
  initPkg_CheckAnchorPocket();
}
function initPkg_Timer() {
  // initPkg_FishPond_Timer();
  initPkg_LevelTask_Timer();
  initPkg_Sign_OPFOY_Timer();
  initPkg_DisableCloseJump_Timer();
}
function initTimer() {
  initPkg_Timer();
}

function initStyles() {
  let style = document.createElement("style");
  style.appendChild(
    document.createTextNode(`
		body{position:relative;}
		#ex-accountList-wrap {    left: -152px;    top: -16px;    /* max-height: 330px;    overflow-y: scroll;    scrollbar-width: none;    -ms-overflow-style: none; */    -webkit-transition: all .2s cubic-bezier(.22,.58,.12,.98);    -o-transition: all cubic-bezier(.22,.58,.12,.98) .2s;    -moz-transition: all cubic-bezier(.22,.58,.12,.98) .2s;    transition: all .2s cubic-bezier(.22,.58,.12,.98);    -webkit-transform-origin: 80% 0;    -moz-transform-origin: 80% 0;    -ms-transform-origin: 80% 0;    -o-transform-origin: 80% 0;    transform-origin: 80% 0;    -webkit-animation: scale-in-ease .5s cubic-bezier(.22,.58,.12,.98);    -moz-animation: scale-in-ease cubic-bezier(.22,.58,.12,.98) .5s;    -o-animation: scale-in-ease cubic-bezier(.22,.58,.12,.98) .5s;    animation: scale-in-ease .5s cubic-bezier(.22,.58,.12,.98);}/* #ex-accountList-wrap::-webkit-scrollbar {    display: none;} */.ex-accountList-item {    padding: 10px;    display: flex;    border-radius: 10px;    align-items: center;}.ex-accountList-item:hover {    background-color: rgb(244,244,244);}#ex-accountList-iframe {    display: none;}#ex-accountList-iframe2 {    display: none;}#ex-accountList-item-add {    padding: 10px;    text-align: center;    margin-bottom:0px;    border-radius: 10px;}#ex-accountList-item-add:hover {    background-color: rgb(244,244,244);}.ex-accountList-item__imgWrap {    flex: 0 0 25%;}.ex-accountList-item__img {    width: 50px;    height: 50px;    border-radius: 50%;}.ex-accountList-item__name {    line-height: 50px;    flex: 0 0 55%;}.ex-accountList-item__btn {    height: 30px;    width: 50px;    border-radius: 10px;    align-items: center;    flex: auto;    text-align: center;    line-height: 28px;    color: white;    background-color: rgb(245,108,108);}.ex-accountList-item__btn:hover {    background-color: rgb(247,137,137);}#ex-accountList-icon:hover > #ex-accountList-wrap {    display: block;}#ex-accountList-content {    background-color: white;}#ex-audio-line {    cursor: pointer;}.live-next-body #ex-audio-line {    margin-left: 4px;}.bag-info {    position: absolute;    background-color: rgba(0, 0, 0, 0.6);    color: white;    width: 20px;    font-weight: 800;    height: 20px;    text-align: center;    z-index: 10;    bottom: 0;}.bag-button {    color: rgb(255, 255, 255);    text-align: center;    height: 15px;    line-height: 15px;    cursor: pointer;    margin-left: 5px;    background: rgb(70, 171, 255);    border-radius: 9px;    padding: 0px 10px;    right: 20px;}.bloop {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 200px;	position: relative;	bottom: 200px;	display: none;	z-index: 1428;	color: #333;}.bloop__switch {	position: absolute;	right: 0;	bottom: 0;}.bloop__mode {	display: inline-block;}#bloop__select {	width: 150px;}.barragePanel__funcPanel {    position: absolute;    width: 232px;    height: 270px;    display: block;    background: white;    overflow-y: scroll;}.barragePanel__funcPanel::-webkit-scrollbar {display:none}.barragePanel__muteTime {    /* position: absolute;    left: 25px;    top: 123px; */    z-index: 5;}.danmuContent-25f266 {    pointer-events: auto !important;}.thirdBtn-06cde5, .fourBtn-0845d4 {    /* 加宽按钮方便点击 */    margin-left: 0px !important;    margin-right: 0px !important;    padding: 0 17px !important;}#copy-real-live {    cursor: pointer;}.Title-row-span, .Title-row-icon  {    display: flex;    align-items: center;    justify-content: center;}.Title-row-icon {    margin-right: 4px;}.live-next-body #copy-real-live {    margin-left: 4px;}.ChatBarrageCollect .TagItem {  height: auto !important;}.ChatBarrageCollect .TagItem-txt {  overflow: auto !important;  white-space: normal !important;  text-overflow: clip !important;}.ChatToolBar-DanmakuTail {    display: inline-block;    vertical-align: middle;    width: 18px;    height: 18px;    -webkit-border-radius: 4px;    -moz-border-radius: 4px;    border-radius: 4px;    margin-right: 8px;    color: #bbb;    cursor: pointer;}[data-mantine-color-scheme=dark] .ChatToolBar-DanmakuTail-tip {    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAACklpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAAEiJnVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/stRzjPAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAAIxSURBVFiF1dixS1tRFMfxT16fuomDHcQs4h8giMVFXPo/lDpI5y710T+gf0K5dOlcuhUKHZ2Di7QInUW6JDjYIXSLDulwk5Imz5f3EpO0P8jy3rn3fDnv3HNzTq3b7RpWlmVL2MUeDlDHFpaxipWRRfnq4Bfavd8VzvAd5yGEu+EFtWGgLMs28ArH2CzpuIo6+IlPeBtCaOYC9aJyiA8zAsnTDY7Q6EcrGXh5iPdzhIHHPZ+H/Qe1brcry7I6LnoGi1ALT0II14/a7fYS3uDpgmCIB+Xu9PS0kWIfz4qsQwi1h/KcZdnosY46xpcEO1ifB8yY/Taxl4h1pmxdmbUOUmyXtS4Id6EqRLmeYm0GG0+qrUQFoIfQmCgvJ+KR+xdgYDVVIaGLNhz3OUvm30paFqas42lVGaiKJjmVlYGyLOsWRWnS0jAx0KDTPLBpc+n/yqE5Xap/aaIcGn42CH6f4zI2EwENb17l3aDNfVCVgOZwl0nFLmBstR533IvWVTDvpGLfNPJfOs/5tPlRwu5Xgtti6Gq6L4olo9tO8cMDtz5T5Fo7QXOc1bTXQYX9rhKx157aQVnoArsOzmonJyf7+Gy+HWueWnieiB3rxwXDEIcP5/1WegNfLS5KN9gNITQTCCFc4wUuFwBziaP+WGZw+tHAS5F2Xmr1fDb6D/IGVnW8Fvv9dbPpalti3r7rfZ0/GgHqQS2JQ4gdsdXeFvu3NZON9G7FAtwUy8w3XOSN9H4DKHngjnga2TgAAAAASUVORK5CYII=) 50% / 18px 18px no-repeat;}.ChatToolBar-DanmakuTail-tip {    width: 18px;    height: 18px;    text-align: center;    line-height: 18px;    border-radius: 4px;    font-size: 12px;    color: #fff;    cursor: pointer;    -webkit-box-sizing: border-box;    -moz-box-sizing: border-box;    box-sizing: border-box;    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAPFBMVEUAAADKy8zKy8zExMzKy83Ky83KzMzKzM7Kys3Ky8zKy83Jy8zJy83Ky8zLzMzJzMzIyM3MzMzKzMzKy8zUpkOsAAAAE3RSTlMA5PgF2qdrQ+rqysOOhzw3HBnqZkz8cgAAAN5JREFUOMuNlEkOAyEMBNs2y+xL/P+/JgoJaGCAqZOFSk0fLOOL7M7ONLBGeDCTdZsgcq6kdzAtBwLiSauMPoR5ow2Mx4dj1CZ0ArJoh1Ww/Quh5Be1w3F0apaD1a5kMSVJLyRphuknEYaGpIEXuC7pD4YWnaITuUiIdKRkVCRNRlUq+te+a0p4Ujy9ZkMpIaeUgJrEld6aYAxZJS2nF+hGwnUwmHOp/HSCzffybn1dubyZww47aQfaIGtPWgQ4O1Hj8fRgQPzYKOQFgWMhvlfWExHZnJ3M9RzSbN0eYt4fdzsuAVjiHAAAAABJRU5ErkJggg==) 50% / 18px 18px no-repeat;}.ChatToolBar-DanmakuTail-tip-active,.ChatToolBar-DanmakuTail-tip:hover {    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAPFBMVEUAAAD6aDP7ZTD2cUHxeU/pjGvmkHPfjnH4azj4bDruf1fshWHrhmLpjW3njm3kk3/ugFnugVn/XSP+YCg/+VboAAAAEnRSTlMA/P3z4XQyCPr5za2namIOx8bnayGzAAAA3klEQVQ4y43U2w6EIAxF0dNyc7xP+///Ook6EEHA/UTMSukDEUdhna0hVokpD8ZOy4aY/5I8pTT6iwRHUo1dOJD7SKOPO+5iaUYe2EbptAcs/4VQdo1aMWk0NTXDShdZmITkVkIGQ38SgRtIzhhaR3KlkGKnaGI3hFgHJVFBkkQVFfvXrmsivFk8fc0OJUJeiYAa0sreklJwtpKUJwY9INwPA0yOyksNbP4un57vXD7ezOiElaQTLQh7D40b4Duj2L/9YSA4bizkAs78SPpMdo/YtkzWDPffIRk7r+eYH6dAOJwNbfZEAAAAAElFTkSuQmCC) 50% / 18px 18px no-repeat;}.ChatToolBar-DanmakuTail-Panel {    background-color: rgba(255, 255, 255, 0.9);    width: 100%;    height: 140px;    position: relative;    display: none;    z-index: 1015;    color: #333;}.ChatToolBar-DanmakuTail-Panel__cell {    position: relative;    display: -webkit-box;    display: -webkit-flex;    display: flex;    box-sizing: border-box;    width: 100%;    padding: 10px 16px;    overflow: hidden;    color: #323233;    font-size: 14px;    line-height: 24px;    background-color: #fff;    border-bottom: 1px solid rgba(0, 0, 0, 0.2);    flex-wrap: wrap;    -webkit-flex-wrap: wrap;}.ChatToolBar-DanmakuTail-Panel__cell_title {    flex: 1;    -webkit-box-flex: 1;}.ChatToolBar-DanmakuTail-Panel__cell_option {    text-align: right;}.ChatToolBar-DanmakuTail-Panel__cell_switch {    float: right;}.ChatToolBar-DanmakuTail-title {    margin: 0 10px;    font-size: 16px;    font-weight: bold;}.DanmakuTail-input {    margin: 10px;    width: calc(100% - 20px);    height: 2.2em;}.DanmakuTail-checkbox-label,.DanmakuTail-option-label {    margin: 10px;    width: calc(100% - 20px);    display: block;    text-align: right;}.EnergyBarrageIcon {    margin-right: 8px;}.ex-icon {	display: inline-block;	vertical-align: middle;	margin-right: 8px;	-moz-user-select:none; /*火狐*/    -webkit-user-select:none; /*webkit浏览器*/    -ms-user-select:none; /*IE10*/    -khtml-user-select:none; /*早期浏览器*/    user-select:none;}.ex-icon a {    display: flex;    justify-items: center;    align-items: center;}.ex-icon svg:hover {    transform: scale(1.1);}.extool {
	background-color: rgba(255,255,255,0.9);
	width: 100%;
	max-height: 320px;
	position: relative;
	bottom: 200px;
	display: none;
	z-index: 1428;
	color: #333;
	box-sizing: border-box;
	padding: 8px 10px;
	overflow: auto;
	font-size: 13px;
	line-height: 22px;
}

.extool[style*="display: block"] {
	display: flex !important;
	flex-wrap: wrap;
	gap: 8px 10px;
	align-items: flex-start;
}

.extool > div:not(.ex_giftAnimation) {
	background: rgba(255,255,255,0.82);
	border: 1px solid rgba(0,0,0,0.10);
	border-radius: 10px;
	padding: 10px 12px 12px;
	box-sizing: border-box;
	box-shadow: 0 2px 10px rgba(0,0,0,0.06);
	display: flex;
	flex-wrap: wrap;
	gap: 6px 10px;
	align-items: center;
	min-width: 220px;
}

.extool__treasure,
.extool__sendgift {
	flex: 1 1 720px;
}
.extool__autofish {
	flex: 1 1 520px;
}
.extool__redpacket_room,
.extool__gold,
.extool__clearbag,
.extool__tabswitch,
.extool__p2p,
.extool__fullscreen {
	flex: 1 1 260px;
}

.extool__treasure::before,
.extool__sendgift::before,
.extool__autofish::before,
.extool__redpacket_room::before,
.extool__gold::before,
.extool__clearbag::before,
.extool__tabswitch::before,
.extool__p2p::before,
.extool__fullscreen::before {
	display: block;
	width: 100%;
	content: "";
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .4px;
	color: rgba(0,0,0,0.72);
	padding-bottom: 6px;
	margin-bottom: 2px;
	border-bottom: 1px dashed rgba(0,0,0,0.12);
}
.extool__treasure::before { content: "宝箱"; }
.extool__sendgift::before { content: "送礼"; }
.extool__autofish::before { content: "钓鱼"; }
.extool__redpacket_room::before { content: "礼物红包"; }
.extool__gold::before { content: "幻神/礼物"; }
.extool__clearbag::before { content: "背包"; }
.extool__tabswitch::before { content: "标签/切换"; }
.extool__p2p::before { content: "网络"; }
.extool__fullscreen::before { content: "播放器"; }

.extool label {
	white-space: nowrap;
	margin-right: 8px;
	line-height: 22px;
}
.extool input[type="text"] {
	padding: 2px 6px;
	border: 1px solid rgba(0,0,0,0.18);
	border-radius: 6px;
	outline: none;
	background: rgba(255,255,255,0.95);
	color: black;
}
.extool input[type="checkbox"], .extool input[type="radio"] {
	vertical-align: middle;
	margin-right: 4px;
}
.extool input[type="button"] {
	border: 1px solid rgba(0,0,0,0.18);
	border-radius: 8px;
	padding: 2px 10px;
	background: linear-gradient(#ffffff, #f4f6f8);
	cursor: pointer;
	color: black;
}
.extool input[type="button"]:hover {
	background: linear-gradient(#ffffff, #e9eef3);
}
.extool input[type="button"]:active {
	transform: translateY(1px);
}
.extool a {
	text-decoration: none;
}
.extool .extool__hint {
	margin-top: 6px;
	color: #666;
	font-size: 12px;
}

/* 兼容某些模块里使用 br 分行的写法，让它在 flex 下表现更一致 */
.extool br {
	flex-basis: 100%;
	width: 0;
	height: 0;
}

.extool__switch {
	position: absolute;
	right: 0;
	bottom: 0;
}
.extool__bsize,.extool__sendgift {
	margin-bottom: 5px;
}
/* 卡片内部已改为 flex，这里不再强制 inline-block */
.ex_giftAnimation {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 50;
	pointer-events: none;
}.ex-panel {	position: absolute;	bottom: 32px;	right: 0px;	background-color: rgba(255,255,255,0.9);	border: 2px rgb(234,173,26) solid;	z-index: 1428;	user-select: none;	display: none;}.ex-panel__wrap {	display: flex;	align-items: center;	justify-content: center;	width: 100%;	height: 100%;}.ex-panel__icon {	margin: 0 10px;	display: block;	position: relative;	padding: 5px;	transition: 0.5s;}.ex-panel__icon:hover {	transform: scale(1.15);}.ex-panel__tip {	display:none;	background:#f00;	border-radius:50%;	width:8px;	height:8px;	top:0px;	right:0px;	position:absolute;}/* 新版斗鱼右侧弹幕Panel的bottom */.live-next-body .layout-Player-chat>* {	bottom: 0 !important;}.text-879f3e {  height: auto !important;  max-height: 48px !important;}.ex-image-danmaku {  height: 48px;  border-radius: 6px;  margin: 0 4px;}.danmuContent-25f266 .ex-image-danmaku {  max-height: 32px;}.barrageSpeed {    position: absolute;    right: 10px;    top: -20px;    color: rgba(0,0,0,0.5);    cursor: default;    z-index: 0;}.enter__panel {    width: 100%;    display: none;    margin-top: 4px;}#enter__title {    cursor: pointer;    user-select: none;    color: royalblue;}#enter__select {    width: 190px;}.enter__option {    margin-top: 5px;}#enter__enterId {    width: 40px;}#enter__reply {    width: 150px;}#enter__word {    width: 140px;}#enter__level {    width: 25px;    text-align: center;}#enter__export {    cursor: pointer;    color: royalblue;    margin-left: 10px;}#enter__import {    cursor: pointer;    color: royalblue;    margin-left: 5px;}.gift__panel {    width: 100%;    display: none;    margin-top: 4px;}#gift__title {    cursor: pointer;    user-select: none;    color: royalblue;}#gift__select {    width: 113px;}.gift__option {    margin-top: 5px;}#gift__giftId {    width: 40px;}#gift__reply {    width: 150px;}#gift__export {    cursor: pointer;    color: royalblue;    margin-left: 10px;}#gift__import {    cursor: pointer;    color: royalblue;    margin-left: 5px;}.livetool {	background-color: rgba(255,255,255,0.9);	width: 100%;	height: 290px;	position: relative;	bottom: 290px;	display: none;	z-index: 1428;}.livetool__cell {	position: relative;    display: -webkit-box;    display: -webkit-flex;    display: flex;    box-sizing: border-box;    width: 100%;    padding: 10px 16px;    overflow: hidden;    color: #323233;    font-size: 14px;    line-height: 24px;	background-color: #fff;	border-bottom: 1px solid rgba(0,0,0,0.2);	flex-wrap: wrap;    -webkit-flex-wrap: wrap;}.livetool__cell_title {	flex: 1;    -webkit-box-flex: 1;}.livetool__cell_option {	text-align: right;}.livetool__cell_switch {	float: right;}.mute__panel {    width: 100%;    display: none;    margin-top: 4px;}#mute__title {    cursor: pointer;    user-select: none;    color: royalblue;}#mute__idlist {    cursor: pointer;    color: royalblue;    margin-left: 10px;}#mute__export, #mute__import {    cursor: pointer;    color: royalblue;    margin-left: 5px;}#mute__select {    width: 110px;}.mute__option {    margin-top: 5px;}#mute__word {    width: 70px;}#mute__count {    width: 30px;}#mute__time {    width: 65px;}.exRankPoint {    position: absolute;    right: 16px;}.exRankPoint--top {    position: absolute;    bottom: -12px;    right: 0;    left: 0;}.reply__panel {    width: 100%;    display: none;    margin-top: 4px;}#reply__title {    cursor: pointer;    user-select: none;    color: royalblue;}#reply__select {    /* width: 190px; */    width: 100px;}#reply__time {    width: 35px;}.reply__option {    margin-top: 5px;}#reply__word {    width: 70px;}#reply__reply {    width: 147px;}#reply__export {    cursor: pointer;    color: royalblue;    margin-left: 10px;}#reply__import {    cursor: pointer;    color: royalblue;    margin-left: 5px;}.livetool__Treasure {    width: 100%;    position: relative;    z-index: 999;}.vote__panel {    width: 100%;    display: none;    margin-top: 4px;}#vote__title {    cursor: pointer;    user-select: none;    color: royalblue;}#vote__select {    width: 100px;}.vote__option {    margin-top: 5px;}#vote__theme {    width: 70px;}#vote__options {    width: 133px;}#vote__time {    width: 35px;}#vote__show-result {    cursor: pointer;    color: royalblue;    margin-left: 10px;}.vote__result {    position: absolute;    top: 0px;    width: 300px;    background: rgba(255,255,255,0.85);    left: 0px;    z-index: 999;    padding: 5px;    border-radius: 10px;    user-select: none;    display: none;    color: #333;}#vote__result-theme {    font-size: 20px;    font-weight: 600;    margin-bottom: 10px;}#vote__result-close {    position: absolute;    top: 5px;    right: 10px;    font-size: 14px;    cursor: pointer;    color: gray;}.vote__option-wrap {    margin-bottom: 10px;}.vote__option-choice {    display: inline-block;    font-size: 14px;}.vote__option-num {    float: right;    font-size: 14px;}.vote__progress {    width: 100%;    background-color: #ddd;    border-radius: 10px;}.vote__progress-bar {    width: 0%;    height: 14px;    background-color: #4CAF50;    text-align: center;    line-height: 30px;    border-radius: 10px;}.exlottery {	background-color: rgba(255,255,255,1);	width: 100%;	height: 250px;	position: relative;	bottom: 250px;	display: none;	z-index: 1428;    overflow: auto;    padding: 0 10px;    box-sizing: border-box;}.lottery__nodata {    z-index: 998;    position: absolute;    left:50%;    top:50%;    transform: translate(-50%, -50%);    color: #606266;}.lottery__wrap {    display: flex;    flex-direction: column;    z-index: 999;}.lottery__a:hover .lottery__item {    background-color: rgb(244,244,244);}.lottery__item {    display: flex;    padding: 5px 0;    border-bottom: 1px solid #d0d0d0;    color: #606266;}.lottery__img img {    width: 150px;    border-radius: 5px;}.lottery__anchor {    position: absolute;    background-color: rgba(255,255,255,0.9);    border-radius: 5px 0px 5px 0px;}.lottery__info {    display: flex;    justify-content: space-evenly;    flex-direction: column;    margin-left: 10px;    overflow: hidden;}.lottery__prize {    white-space: nowrap;    text-overflow: ellipsis;    word-break: break-all;    font-size: 14px;}.lottery__expireTime {    position: absolute;    margin-top: -18px;    background-color: rgba(255,255,255,0.9);    border-radius: 0px 5px 0px 5px;} /*滚动条样式*/.exlottery::-webkit-scrollbar {    width: 4px;    }.exlottery::-webkit-scrollbar-thumb {    border-radius: 10px;    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);    background: rgba(0,0,0,0.2);}.exlottery::-webkit-scrollbar-track {    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);    border-radius: 0;    background: rgba(0,0,0,0.1);}.lottery__func {    display: flex;    justify-content: space-between;    margin-top: 5px;    user-select: none;    border-bottom: 1px solid #d0d0d0;}.lottery__notice,#lottery-refresh {    cursor: pointer;    color: #606266;}.miniprogram__panel {    position: absolute;    right: 43px;    bottom: 100px;    animation: move-in 0.75s;    z-index: 101;    text-align: center;    display: none;}.miniprogram__wrap {    overflow: hidden;    background-color: white;    border-radius: 5%;    width: 200px;    box-shadow: 0px 2px 20px 0px #888888;    font-size: 14px;}.miniprogram__triangle {    width: 0px;    height: 0px;    border-color: white transparent transparent transparent;    border-style: solid;    border-width: 10px;    position: absolute;    left: 100px;}.month-cost {    margin-right: 5px;    cursor: default;    -moz-user-select:none;/*火狐*/    -webkit-user-select:none;/*webkit浏览器*/    -ms-user-select:none;/*IE10*/    -khtml-user-select:none;/*早期浏览器*/    user-select:none;    display: inline-block;    vertical-align: middle;}.monthcost__icon {    position: relative;    top: 3px;    cursor: pointer;    margin-left: 3px;}.exVideoDiv {    width: 500px;    height: 250px;    background-color: rgba(255, 255, 255, 0);    position: absolute;    z-index: 1428;}.exVideoPlayer {    width: 100%;    height: 100%;    cursor: move;}.exVideoScale {    width: 10px;    height: 10px;    overflow: hidden;    cursor: se-resize;    position: absolute;    right: 0;    bottom: 0;    background-color: rgb(231, 57, 57);}.exVideoInfo {    width: 100%;    height: 30px;    background-color: gray;    position: absolute;    top: -30px;    line-height: 30px;}.exVideoClose {    width: 30px;    float: right;    color: white;}.exVideoQn, .exVideoCDN {    margin-left: 5px;}.exVideoRID {    margin: 0px 5px;    font-weight: 800;    font-size: medium;}#popup-player__prompt {    display: none;}.postbird-box-header {    width: auto !important;}.postbird-box-dialog {    color: #333;}.real-audience {    cursor: pointer;    display: flex;    padding: 0 7px;    line-height: 33px;    color: rgb(153, 153, 153);}#Ex_EnterYuba {    width: 100%;}.Title-anchorPic-bottom i{    display: none !important;}#real-audience__total, #real-audience__barrage, #real-audience__money_yc {    margin-left: 2px;}/* #refresh-video {    float: left;    width: 24px;    height: 24px;    margin-right: 5px;    cursor: pointer;    background-size: contain;} */#refresh-video2 {    display: none;    position: absolute;    top: 20px;    right: 20px;    cursor: pointer;}#refresh-video2-svg {    fill: rgba(0,0,0,.6)}.refresh-barrage {    display: inline-flex;    align-items: center;    vertical-align: top;    margin: 0 2px;    padding: 0 8px;    height: 22px;    line-height: 21px;    background-color: #fff;    border: 1px solid #e5e4e4;    -webkit-border-radius: 4px;    -moz-border-radius: 4px;    border-radius: 4px;    cursor: pointer;    user-select: none;}.refresh-barrage.ex-active {    background: linear-gradient(180deg, rgb(38, 169, 235), rgb(18, 150, 219));    border-color: rgb(18, 150, 219);    box-shadow: 0 0 0 2px rgba(18, 150, 219, .22), 0 8px 16px rgba(18, 150, 219, .28);    font-weight: 700;}.refresh-barrage.ex-active:hover {    box-shadow: 0 0 0 2px rgba(18, 150, 219, .28), 0 10px 18px rgba(18, 150, 219, .36);}.refresh-barrage.ex-active::after {    content: "";    width: 6px;    height: 6px;    margin-left: 6px;    border-radius: 999px;    background: rgba(255, 255, 255, .95);    box-shadow: 0 0 0 2px rgba(255, 255, 255, .22);}.live-next-body .refresh-barrage {    background-color: var(--front-background-color);    border: 1px solid var(--front-border-color);}#refresh-barrage__svg {    vertical-align: middle;}.top-0-important {    top: 0 !important;}.room-vip {  -moz-user-select:none;/*火狐*/  -webkit-user-select:none;/*webkit浏览器*/  -ms-user-select:none;/*IE10*/  -khtml-user-select:none;/*早期浏览器*/  user-select:none;  vertical-align: middle;  position: absolute;  left: 12px;}.repeated-danmaku {  opacity: 0 !important;  pointer-events: none !important;  visibility: hidden !important;}.danmu-fbb2a3 > div {  transition: font-size 0.5s ease !important;}.comment-dzjy-container > div {  z-index: 99 !important;}#ex-camera {    background: rgba(0,0,0,0.7);    position: absolute;    right: 20px;    bottom: 190px;    z-index: 10;    width: 60px;    height: 60px;    cursor: pointer;    -webkit-border-radius: 50%;    -moz-border-radius: 50%;    border-radius: 50%;    cursor: pointer;    display: none;    justify-content: center;    align-items: center;    border: 2px solid #2d2c2c;    box-sizing: border-box;}#ex-camera:hover > svg > path {    fill: rgb(252, 199, 84);}#ex-camera:active > svg > path {    fill: rgb(253, 60, 60);}#ex-camera-close {    position: absolute;    top: -8px;    right: -8px;    width: 20px;    height: 20px;    background: rgba(0,0,0,0.8);    border-radius: 50%;    display: flex;    justify-content: center;    align-items: center;    cursor: pointer;    color: #fff;    font-size: 12px;    line-height: 1;    border: 1px solid rgba(255,255,255,0.3);    z-index: 11;}#ex-camera-close:hover {    background: rgba(253, 60, 60, 0.9);}#ex-cinema:hover > .cinema__wrap {    display: block;}.cinema__wrap {    display: none;    margin: 0;    padding: 0;    border: 1px solid #e5e5e5;    background: #fff;    position: absolute;    left: 199px;    min-width: 100px;    top: 130px;}.cinema__panel {    position: absolute;    border: 1px solid #000;    border-radius: 4px;    transform: translateY(calc(-4px - 100%)) translateX(-50%);    left: 33%;    background-color: #000;    opacity: .75;    width: 70px;}.cinema__panel li {    padding: 0 2px;    white-space: nowrap;    color: #fff;    text-align: center;    cursor: pointer;}.cinema__panel li:hover {    background-color: rgb(85, 85, 85);}  #ex-joysound {    float: left;    width: 24px;    height: 24px;    margin-right: 10px;    cursor: pointer;    background-size: contain;    pointer-events: all;}#ex-joysound img {    width: 24px;    height: 24px;}#exVideoDivFake {  display: none;}#ex-metadata:hover > .metadata__wrap {  display: block;}.metadata__wrap {  display: none;  margin: 0;  padding: 0;  border: 1px solid #e5e5e5;  background: #fff;  position: absolute;  left: 199px;  min-width: 100px;  top: 0px;  white-space: nowrap;  color: black;}.metadata__panel {  position: absolute;  border: 1px solid #000;  border-radius: 4px;  transform: translateY(calc(-4px - 100%)) translateX(-50%);  left: 33%;  background-color: #000;  opacity: .75;  width: 70px;}.metadata__panel li {  padding: 0 2px;  white-space: nowrap;  color: #fff;  text-align: center;  cursor: pointer;}.metadata__panel li:hover {  background-color: rgb(85, 85, 85);}  #ex-filter {    float: left;    width: 24px;    height: 24px;    margin-right: 10px;    cursor: pointer;    background-size: contain;    pointer-events: all;}.filter__wrap {    display: none;    position: relative;    height: 100%;    margin-right: -15px;    border-radius: 4px;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none;    float: left;    right: -12px;    bottom: 10px;}.filter__panel {    position: absolute;    border: 1px solid #000;    border-radius: 4px;    transform: translateY(calc(-4px - 100%)) translateX(-50%);    left: 33%;    background-color: #000;    opacity: .75;    width: 300px;    padding-top: 10px;    padding-left: 10px;    padding-right: 10px;}.filter__panel li {    padding: 0 2px;    white-space: nowrap;    color: #fff;    text-align: center;    cursor: pointer;}.filter__panel li:hover {    background-color: rgb(85, 85, 85);}.filter__scroll {    width: 100%;    height: 5px;    background: #ccc;    position: relative;    display: inline-block;}.filter__scroll-bar {    width: 15px;    height: 15px;    background: #369;    position: absolute;    top: -5px;    left: 100px;    cursor: pointer;    border-radius: 100%;}.filter__scroll-mask {    position: absolute;    left: 0;    top: 0;    background: #369;    width: 100px;    height: 5px;}.filter__title {    color: white;    display: inline-block;    cursor: initial;    margin-right: 2px;}.filter__enhance {    margin-bottom: 10px;    display: flex;    align-items: center;    justify-content: space-between;}.filter__switch {    width: 40px;    height: 20px;    background: #ccc;    position: relative;    display: inline-block;    border-radius: 10px;    cursor: pointer;    transition: background 0.3s;}.filter__switch-slider {    width: 18px;    height: 18px;    background: #fff;    position: absolute;    top: 1px;    left: 0px;    border-radius: 50%;    transition: left 0.3s;}#filter__select {    width: 100%;    float: right;}.filter__filter {    margin-top: 5px;}/* 增强画质提示弹窗样式 */.enhance-modal__panel-wrap {    width: 100%;    height: 100%;    z-index: 1000;    background-color: rgba(0, 0, 0, 0.9);    position: absolute;    top: 0;    left: 0;    display: none;    justify-content: center;    align-items: center;}.enhance-modal__panel {    height: 550px;    width: 600px;    background-color: white;    border-radius: 20px;    position: fixed;    top: 0;    left: 0;    right: 0;    bottom: 0;    margin: auto;    color: #333;}.enhance-modal__content {    position: relative;    top: 50%;    transform: translateY(-50%);    text-align: center;}.enhance-modal__text {    font-size: 18px;    margin-top: 20px;}.enhance-modal__img {    width: 720px;    margin-top: 20px;}.enhance-modal__close {    font-size: 30px;    font-weight: bold;    position: absolute;    right: 15px;    top: 10px;    cursor: pointer;    transition: all 0.2s;}.enhance-modal__close:hover {    color: #ff7700;}#ex-videospeed:hover > .videospeed__wrap {    display: block;}.videospeed__wrap {    display: none;    margin: 0;    padding: 0;    border: 1px solid #e5e5e5;    background: #fff;    position: absolute;    left: 199px;    min-width: 100px;    top: 120px;}.videospeed__panel {    position: absolute;    border: 1px solid #000;    border-radius: 4px;    transform: translateY(calc(-4px - 100%)) translateX(-50%);    left: 33%;    background-color: #000;    opacity: .75;    width: 70px;}.videospeed__panel li {    padding: 0 2px;    white-space: nowrap;    color: #fff;    text-align: center;    cursor: pointer;}.videospeed__panel li:hover {    background-color: rgb(85, 85, 85);}  #ex-videosync {    float: left;    width: 24px;    height: 24px;    margin-left: 20px;    cursor: pointer;    background-size: contain;}.menu-da2a9e {  z-index: 999 !important;}.weeklypanel__panel-wrap {    width: 100%;    height: 100%;    z-index: 1000;    background-color: rgba(0, 0, 0, 0.9);    position: absolute;    top: 0;    left: 0;    display: flex;    justify-content: center;    align-items: center;}.weeklypanel__panel {    height: 600px;    width: 500px;    background-color: white;    border-radius: 20px;    position: fixed;    top: 0;    left: 0;    right: 0;    bottom: 0;    margin: auto;}.weeklypanel__content {    position: relative;    top: 50%;    transform: translateY(-50%);    text-align: center;}.weeklypanel__text {    font-size: 18px;}.weeklypanel__text a {    font-weight: bold;    font-size: 24px;}.weeklypanel__close {    font-size: 30px;    font-weight: bold;    position: absolute;    right: 15px;    cursor: pointer;}.noticejs-top{top:0;width:100% !important}.noticejs-top .item{border-radius:0 !important;margin:0 !important}.noticejs-topRight{top:10px;right:10px}.noticejs-topLeft{top:10px;left:10px}.noticejs-topCenter{top:10px;left:50%;transform:translate(-50%)}.noticejs-middleLeft,.noticejs-middleRight{right:10px;top:50%;transform:translateY(-50%)}.noticejs-middleLeft{left:10px}.noticejs-middleCenter{top:50%;left:50%;transform:translate(-50%,-50%)}.noticejs-bottom{bottom:0;width:100% !important}.noticejs-bottom .item{border-radius:0 !important;margin:0 !important}.noticejs-bottomRight{bottom:10px;right:10px}.noticejs-bottomLeft{bottom:10px;left:10px}.noticejs-bottomCenter{bottom:10px;left:50%;transform:translate(-50%)}.noticejs{font-family:Helvetica Neue,Helvetica,Arial,sans-serif}.noticejs .item{margin:0 0 10px;border-radius:3px;overflow:hidden}.noticejs .item .close{float:right;font-size:18px;font-weight:700;line-height:1;color:#fff;text-shadow:0 1px 0 #fff;opacity:1;margin-right:7px}.noticejs .item .close:hover{opacity:.5;color:#000}.noticejs .item a{color:#fff;border-bottom:1px dashed #fff}.noticejs .item a,.noticejs .item a:hover{text-decoration:none}.noticejs .success{background-color:#64ce83}.noticejs .success .noticejs-heading{background-color:#3da95c;color:#fff;padding:10px}.noticejs .success .noticejs-body{color:#fff;padding:10px}.noticejs .success .noticejs-body:hover{visibility:visible !important}.noticejs .success .noticejs-content{visibility:visible}.noticejs .info{background-color:#3ea2ff}.noticejs .info .noticejs-heading{background-color:#067cea;color:#fff;padding:10px}.noticejs .info .noticejs-body{color:#fff;padding:10px}.noticejs .info .noticejs-body:hover{visibility:visible !important}.noticejs .info .noticejs-content{visibility:visible}.noticejs .warning{background-color:#ff7f48}.noticejs .warning .noticejs-heading{background-color:#f44e06;color:#fff;padding:10px}.noticejs .warning .noticejs-body{color:#fff;padding:10px}.noticejs .warning .noticejs-body:hover{visibility:visible !important}.noticejs .warning .noticejs-content{visibility:visible}.noticejs .error{background-color:#e74c3c}.noticejs .error .noticejs-heading{background-color:#ba2c1d;color:#fff;padding:10px}.noticejs .error .noticejs-body{color:#fff;padding:10px}.noticejs .error .noticejs-body:hover{visibility:visible !important}.noticejs .error .noticejs-content{visibility:visible}.noticejs .progressbar{width:100%}.noticejs .progressbar .bar{width:1%;height:30px;background-color:#4caf50}.noticejs .success .noticejs-progressbar{width:100%;background-color:#64ce83;margin-top:-1px}.noticejs .success .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#3da95c}.noticejs .info .noticejs-progressbar{width:100%;background-color:#3ea2ff;margin-top:-1px}.noticejs .info .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#067cea}.noticejs .warning .noticejs-progressbar{width:100%;background-color:#ff7f48;margin-top:-1px}.noticejs .warning .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#f44e06}.noticejs .error .noticejs-progressbar{width:100%;background-color:#e74c3c;margin-top:-1px}.noticejs .error .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:#ba2c1d}@keyframes noticejs-fadeOut{0%{opacity:1}to{opacity:0}}.noticejs-fadeOut{animation-name:noticejs-fadeOut}@keyframes noticejs-modal-in{to{opacity:.3}}@keyframes noticejs-modal-out{to{opacity:0}}.noticejs-rtl .noticejs-heading{direction:rtl}.noticejs-rtl .close{float:left !important;margin-left:7px;margin-right:0 !important}.noticejs-rtl .noticejs-content{direction:rtl}.noticejs{position:fixed;z-index:10050;width:320px}.noticejs::-webkit-scrollbar{width:8px}.noticejs::-webkit-scrollbar-button{width:8px;height:5px}.noticejs::-webkit-scrollbar-track{border-radius:10px}.noticejs::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.5);border-radius:10px}.noticejs::-webkit-scrollbar-thumb:hover{background:#fff}.noticejs-modal{position:fixed;width:100%;height:100%;background-color:#000;z-index:10000;opacity:.3;left:0;top:0}.noticejs-modal-open{opacity:0;animation:noticejs-modal-in .3s ease-out}.noticejs-modal-close{animation:noticejs-modal-out .3s ease-out;animation-fill-mode:forwards}.noticejs .special{background-color:rgb(160,37,160)}.noticejs .special .noticejs-heading{background-color:rgb(110,26,110);color:#fff;padding:10px}.noticejs .special .noticejs-body{color:#fff;padding:10px}.noticejs .special .noticejs-body:hover{visibility:visible !important}.noticejs .special .noticejs-content{visibility:visible}.noticejs .special .noticejs-progressbar{width:100%;background-color:rgb(160,37,160);margin-top:-1px}.noticejs .special .noticejs-progressbar .noticejs-bar{width:100%;height:5px;background:rgb(110,26,110)}/** * PostbirdAlertBox.js * -    原生javascript弹框插件 * Author:  Postbird - http://www.ptbird.cn * License: MIT * Date:    2017-09-23 */ .postbird-box-container {    width: 100%;    height: 100%;    overflow: hidden;    position: fixed;    top: 0;    left: 0;    z-index: 9999;    background-color: rgba(0, 0, 0, 0.2);    display: block;    -webkit-user-select: none;    -moz-user-select: none;    -ms-user-select: none;    user-select: none}.postbird-box-container.active {    display: block}.postbird-box-content {    min-width: 400px;    max-width: 600px;    min-height: 150px;    background-color: #fff;    border: solid 1px #dfdfdf;    position: absolute;    top: 50%;    left: 50%;    transform: translate(-50%, -50%);    margin-top: -100px}.postbird-box-header {    width: 100%;    padding: 10px 15px;    position: relative;    font-size: 1.1em;    letter-spacing: 2px}.postbird-box-close-btn {    cursor: pointer;    font-weight: 700;    color: #000;    float: right;    opacity: .5;    font-size: 1.3em;    margin-top: -3px;    display: none}.postbird-box-close-btn:hover {    opacity: 1}.postbird-box-text {    box-sizing: border-box;    width: 100%;    padding: 0 10%;    text-align: center;    line-height: 40px;    font-size: 20px;    letter-spacing: 1px}.postbird-box-footer {    width: 100%;    position: absolute;    padding: 0;    margin: 0;    bottom: 0;    display: flex;    display: -webkit-flex;    justify-content: space-around;    border-top: solid 1px #dfdfdf;    align-items: flex-end}.postbird-box-footer .btn-footer {    line-height: 44px;    border: 0;    cursor: pointer;    background-color: #fff;    color: #0e90d2;    font-size: 1.1em;    letter-spacing: 2px;    transition: background-color .5s;    -webkit-transition: background-color .5s;    -o-transition: background-color .5s;    -moz-transition: background-color .5s;    outline: 0}.postbird-box-footer .btn-footer:hover {    background-color: #e5e5e5}.postbird-box-footer .btn-block-footer {    width: 100%}.postbird-box-footer .btn-left-footer,.postbird-box-footer .btn-right-footer {    position: relative;    width: 100%}.postbird-box-footer .btn-left-footer::after {    content: "";    position: absolute;    right: 0;    top: 0;    background-color: #e5e5e5;    height: 100%;    width: 1px}.postbird-box-footer .btn-footer-cancel {    color: #333}.postbird-prompt-input {    width: 100%;    padding: 5px;    font-size: 16px;    border: 1px solid #ccc;    outline: 0}.onoffswitch {    position: relative; width: 45px;    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;}.onoffswitch-checkbox {    position: absolute;    opacity: 0;    pointer-events: none;}.onoffswitch-label {    display: block; overflow: hidden; cursor: pointer;    height: 20px; padding: 0; line-height: 20px;    border: 2px solid #E3E3E3; border-radius: 20px;    background-color: #FFFFFF;    transition: background-color 0.3s ease-in;}.onoffswitch-label:before {    content: "";    display: block; width: 20px; margin: 0px;    background: #FFFFFF;    position: absolute; top: 0; bottom: 0;    right: 23px;    border: 2px solid #E3E3E3; border-radius: 20px;    transition: all 0.3s ease-in 0s; }.onoffswitch-checkbox:checked + .onoffswitch-label {    background-color: #3AAD38;}.onoffswitch-checkbox:checked + .onoffswitch-label, .onoffswitch-checkbox:checked + .onoffswitch-label:before {   border-color: #3AAD38;}.onoffswitch-checkbox:checked + .onoffswitch-label:before {    right: 0px; }.layui-timeline {    padding-left: 5px;}.layui-timeline-item {    position: relative;    padding-bottom: 20px;}li {    list-style: none;}.layui-timeline-item:first-child::before {    display: block;}.layui-timeline-item:last-child::before {    content: '';    position: absolute;    left: 5px;    top: 0;    z-index: 0;    width: 0;    height: 100%;}.layui-timeline-item::before {    content: '';    position: absolute;    left: 5px;    top: 0;    z-index: 0;    width: 1px;    height: 100%;}.layui-timeline-item::before,hr {    background-color: #e6e6e6;}.layui-timeline-axis {    position: absolute;    left: -5px;    top: 0;    z-index: 10;    width: 20px;    height: 20px;    line-height: 20px;    background-color: #fff;    color: #5FB878;    border-radius: 50%;    text-align: center;    cursor: pointer;}.layui-icon {    font-family: layui-icon !important;    font-size: 16px;    font-style: normal;}.layui-timeline-content {    padding-left: 25px;}.layui-text {    line-height: 22px;    font-size: 14px;    color: rgb(85,85,85);}.layui-timeline-title {    position: relative;}
		`)
  );
  document.head.appendChild(style);
}

// 全局变量及公共函数
var exTimer = 0; // 总时钟句柄
var url = document.getElementsByTagName('html')[0].innerHTML;
var urlLen = ("$ROOM.room_id =").length;
var ridPos = url.indexOf('$ROOM.room_id =');
var rid = "";
if (ridPos > 0) {
	rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
	if (rid) rid = rid.trim();
} else {
	rid = getStrMiddle(url, `roomID:`, `,`);
	if (rid) {
		rid = rid.trim();
	} else {
		let canonicalLink = document.querySelector(`link[rel="canonical"]`);
		if (canonicalLink) {
			let href = canonicalLink.getAttribute(`href`);
			rid = href.split('/').pop().trim();
		}
	}
}

url = null;	
urlLen = null;
ridPos = null;
var my_uid = getCookieValue("acf_uid"); // 自己的uid
var myName = "";
var dyToken = getToken();
// 功能条的显示定时器
var exPanelTimer = null;

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

function showMessage(msg, type="success", options) {
	// type: success[green] error[red] warning[orange] info[blue]
	let option = {
		text: msg,
		type: type,
		position: 'bottomLeft',
		...options
	}
	new NoticeJs(option).show();
}

function openPage(url, b=true) {
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
	// 如果元素是textarea，直接使用selectionStart获取位置
	if (element.tagName === 'TEXTAREA') {
			return element.selectionStart;
	}
	// 否则处理为contenteditable元素
	let cursorPos = 0;
	
	// 兼容旧版IE
	if (document.selection) {
			const selectRange = document.selection.createRange();
			const textRange = element.createTextRange();
			const preCaretRange = textRange.duplicate();
			
			preCaretRange.moveToBookmark(selectRange.getBookmark());
			preCaretRange.setEndPoint('EndToEnd', textRange);
			cursorPos = preCaretRange.text.length;
	} 
	// 现代浏览器
	else if (window.getSelection) {
			const selection = window.getSelection();
			
			if (selection.rangeCount > 0) {
					const range = selection.getRangeAt(0).cloneRange();
					range.selectNodeContents(element);
					range.setEnd(selection.rangeCount > 0 ? selection.getRangeAt(0).endContainer : element, 
											selection.rangeCount > 0 ? selection.getRangeAt(0).endOffset : 0);
					
					cursorPos = range.toString().length;
			}
	}
	
	return cursorPos;
}

function showExRightPanel(name) {
	let panels = [
		{
			name: "弹幕发送小助手",
			className: "bloop",
		},
		{
			name: "扩展功能",
			className: "extool",
		},
		{
			name: "直播间工具",
			className: "livetool",
		},
		{
			name: "全站抽奖信息",
			className: "exlottery"
		},
		{
			name: "弹幕小尾巴",
			className: "ChatToolBar-DanmakuTail-Panel"
		},
	];
	for (let i = 0; i < panels.length; i++) {
		let item = panels[i];
		let dom = document.getElementsByClassName(item.className)[0];
		if (dom) {
			if (name === item.name) {
				dom.style.display = dom.style.display !== "block" ? "block" : "none";
			} else {
				dom.style.display = "none";
			}
		}
	}
}

function getTimeDiff(t1, t2) {
	if (t1 < t2) {
		return -1;
	} else{
		let ret = "";
		let date3 = Math.abs(t1 - t2);
		let days = Math.floor(date3/(24*3600*1000));
		ret += days > 0 ? days + "天" : "";
		let leave1 = date3%(24*3600*1000);
		let hours = Math.floor(leave1/(3600*1000));
		ret += hours > 0 ? hours + "时" : "";
		let leave2 = leave1%(3600*1000);
		let minutes = Math.floor(leave2/(60*1000));
		ret += minutes > 0 ? minutes + "分" : "";
		let leave3 = leave2%(60*1000);
		let seconds = Math.round(leave3/1000);
		ret += seconds > 0 ? seconds + "秒" : "";
		return ret;
	}
}

function debounce(func, wait) {
    let timer;
    return function() {
      let context = this;
      let args = arguments;
 
      if (timer) clearTimeout(timer);
 
      let callNow = !timer;
 
      timer = setTimeout(() => {
        timer = null;
      }, wait)
 
      if (callNow) func.apply(context, args);
    }
}

function exportJsonToExcel(header, body, fileName = 'download.xlsx') {
    let aoa = [];
    aoa.push(header, ...body);
    let sheet = XLSX.utils.aoa_to_sheet(aoa);
    openDownloadDialog(sheet2blob(sheet), fileName);
}
 
function openDownloadDialog(url, saveName)
{
	if(typeof url == 'object' && url instanceof Blob)
	{
		url = URL.createObjectURL(url); // 创建blob地址
	}
	var aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	var event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else
	{
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}
function sheet2blob(sheet, sheetName) {
	sheetName = sheetName || 'sheet1';
	var workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	var wbout = XLSX.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}

function downloadFile(name, data) {
    var urlObject = unsafeWindow.URL || unsafeWindow.webkitURL || unsafeWindow;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;

	var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, unsafeWindow, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(ev);
} 

function timeText2Ms(text) {
	let ret = 0;
	let arr = text.split(":");
	if (arr.length === 1) {
		ret = Number(arr[0]);
	} else if (arr.length === 2) {
		ret = Number(arr[0]) * 60 + Number(arr[1]);
	} else if (arr.length === 3) {
		ret = Number(arr[0]) * 3600 + Number(arr[1]) * 60 + Number(arr[2]);
	}
	return ret * 1000;
}

function resizeWindow() {
  const resizeEvent = new Event("resize");
  window.dispatchEvent(resizeEvent);
}

function isValidImageFile(filename) {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico", ".tiff", ".tif"];
  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  return validExtensions.includes(ext);
}

function getCsrfToken() {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://www.douyu.com/japi/carnival/nc/common/generateCsrf',
      headers: {
        "Content-Type": "application/json",
        "Cookie": document.cookie,
      },
      anonymous: false,
      withCredentials: true,
      onload: function(response) {
        // 获取 Set-Cookie
        const setCookie = response.responseHeaders.match(/set-cookie:[^\n\r]+/gi);
				// 从set-cookie中获取csrfToken
				let csrfToken = "";
				for (const line of setCookie) {
					const match = line.match(/cvl_csrf_token=([^;]+)/);
					if (match) {
						csrfToken = match[1]; // 返回提取到的 token
						break;
					}
				}
				resolve(csrfToken);
      },
      onerror: function(err) {
        resolve("");
      }
    });
  });
}

function getValidDom(queryList) {
	for (const query of queryList) {
		let dom = null;
		if (typeof query === "string") {
			dom = document.querySelector(query);
		} else {
			dom = query;
		}
		if (dom) return dom;
	}
	return null;
}

function getValidDomList(queryList) {
	for (const query of queryList) {
		let dom = [];
		if (typeof query === "string") {
			dom = document.querySelectorAll(query);
		} else {
			dom = query;
		}
		if (dom.length > 0) return dom;
	}
	return [];
}
let svg_accountList = `<svg t="1613993967937" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2122" width="16" height="16"><path d="M217.472 311.808l384.64 384.64-90.432 90.56-384.64-384.64z" fill="#8A8A8A" p-id="2123"></path><path d="M896.32 401.984l-384.64 384.64-90.56-90.496 384.64-384.64z" fill="#8A8A8A" p-id="2124"></path></svg>`
let cleanOverTimes = 0; // 用于判断是否全部清空并跳转
function initPkg_AccountList() {
    // GM_deleteValue("Ex_accountList");
    // GM_deleteValue("Ex_accountListPassport");
    // return;
    const isBeta = !!document.getElementsByClassName("live-next-body")[0];
    if (isBeta) return;
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
}

function renderAccountList(obj) {
    document.getElementById("ex-accountList-content").innerHTML = getAccountListHtml(obj);
    let items = document.getElementsByClassName("ex-accountList-item");
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let uid = item.getAttribute("uid");
        item.addEventListener("click", () => {
            showMessage("【账号管理】正在切换账号，请耐心等待...", "info");
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
    // startGetXiaoxiaoleFishBall()
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
    if (b && b.childNodes.length > 1) {
        b.insertBefore(a, b.childNodes[1]);
    } else {
        b = getValidDom([".subTitleContainer__-vzhr"]);
        b.appendChild(a);
    }
}

function initPkg_AudioLine_Func() {
	document.getElementById("ex-audio-line").addEventListener("click", function() {
        let pause = getValidDom([".pause-c594e8", ".icon-c8be96"]);
        if (pause) pause.click(); // 暂停视频播放
        getRealLive_Douyu(rid, true, false, "1428", (lurl) => {
            createNewAudio_Douyu(videoPlayerArr.length, rid);
        })
    });
}
function initPkg_AutoAnchorStar() {
	initPkg_AutoAnchorStar_Dom();
	initPkg_AutoAnchorStar_Func();
}

function initPkg_AutoAnchorStar_Dom() {
	AutoAnchorStar_insertIcon();
}
function AutoAnchorStar_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-auto-anchor-star";
	a.innerHTML = `<a class="ex-panel__icon" title="全自动代抢星推荐红包"><img style="width:36px;height:36px;" src="https://shark2.douyucdn.cn/front-publish/live-new-anchor-support-master/assets/images/entryIcon_ee486a8.png"/></a>`;
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_AutoAnchorStar_Func() {
	document.getElementsByClassName("ex-auto-anchor-star")[0].addEventListener("click", function() {
        openPage("https://xtj.douyuex.com/");
	});
}


let timeout;
function initPkg_BagInfo() {
	initPkg_BagInfo_Func();
}

function initPkg_BagInfo_Func() {
    let backpackDom = getValidDom([".BackpackButton", "#js-backpack-enter"])
    if (!backpackDom) {
        return;
    }
	backpackDom.addEventListener("click", function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const isBeta = !!document.getElementsByClassName("BackpackExpandPanel")[0];
            if (getValidDom([".Backpack.JS_Backpack", ".BackpackExpandPanel"])) {
                getBagGifts(rid, (ret) => {
                    let chunkNum = ret.data.list.length;
                    if (chunkNum > 0) {
                        let totalPrice = 0;
                        let totalIntimate = 0;
                        for (let i = 0; i < chunkNum; i++) {
                            let chunk = getValidDomList([".Backpack-prop", ".ToolbarBackpack-giftItem"])[i];
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
                            if (isBeta) {
                                expiryDiv.style.left = "8px";
                                expiryDiv.style.bottom = "auto";
                            }
                            expiryDiv.innerHTML = expiry - 1;
                            chunk.insertBefore(expiryDiv, chunk.childNodes[0]);
                        }
                        const headerDom = getValidDom([".BackpackHeader-extInfo", ".BackpackExpandPanel-backpackHeader"]);
                        if (isBeta) {
                            headerDom.innerHTML = headerDom.innerHTML + 
                            `<span style="width: 100%;display: flex;justify-content: space-between;align-items: center;flex: 1;margin-left: 12px;">
                                <span>
                                    <span>总价值:</span>
                                    <span>￥${String(Number(totalPrice / 100).toFixed(2))}</span>
                                    <span>总亲密度:</span>
                                    <span>${String(totalIntimate)}</span>
                                </span>
                                <span class="bag-button" id="Backpack__clearbag" style="background: rgb(70, 171, 255) !important;color: white !important;">清空背包</span>
                            </span>`
                        } else {
                            headerDom.innerHTML = `<span style="float: left">` + "总价值：" + String(Number(totalPrice / 100).toFixed(2)) + " 总亲密度：" + String(totalIntimate) + `<span class="bag-button" id="Backpack__clearbag">清空背包</span></span>` + headerDom.innerHTML;
                        }
                        
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
		<input style="margin-left:10px;" type="button" id="bloop__save" value="保存"/>
		<input style="margin-left:10px;" type="button" id="bloop__delete" value="删除"/>
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
                    const barragePanelButton = barragePanel.getElementsByClassName("buttonGroup-de6b66")[0];
                    let userNameDom = barragePanel.getElementsByClassName("danmuAuthor-3d7b4a");
                    let id = "";
                    if (userNameDom.length > 0) {
                        id = userNameDom[0].innerText;
                        setUserFansMedal(userNameDom[0], id);
                        setReplyBarrageButton(barragePanelButton);
                        setSearchBarrageButton(barragePanelButton);
                        setBarragePanelButtonSplit(barragePanelButton);
                        setMuteButton(barragePanelButton);
                        setBarrgePanelFunc(barragePanelButton, id);
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
                const barragePanelButton = barragePanel.getElementsByClassName("buttonGroup-de6b66")[0];
                let userNameDom = barragePanel.getElementsByClassName("danmuAuthor-3d7b4a");
                
                let id = "";
                if (userNameDom.length > 0) {
                    id = userNameDom[0].innerText;
                    setUserFansMedal(userNameDom[0], id);
                    setReplyBarrageButton(barragePanelButton);
                    setSearchBarrageButton(barragePanelButton);
                    setBarragePanelButtonSplit(barragePanelButton);
                    setMuteButton(barragePanelButton);
                    setBarrgePanelFunc(barragePanelButton, id);
                }
                const contentDom = document.getElementsByClassName("danmuContent-25f266")[0];
                if (!contentDom) return;
                if (!contentDom.innerHTML.includes(`[DouyuEx图片`)) return;
                let newText = contentDom.innerHTML.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
                contentDom.innerHTML = newText;
            }
        }
    });

    new DomHook("#Ex_BarragePanel", false, (m) => {
        const contentDom = document.getElementsByClassName("danmuContent-25f266")[0];
        if (!contentDom) return;
        if (!contentDom.innerHTML.includes(`[DouyuEx图片`)) return;
        let newText = contentDom.innerHTML.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
        contentDom.innerHTML = newText;
    })
    
}

function getUserFansMedal(userName) {
    let ret = false;
    let barrageList = document.getElementsByClassName("Barrage-listItem");
    for (let i = barrageList.length - 1; i >= 0; i--) {
        let barragePanel = barrageList[i].lastElementChild;
        if (barragePanel != null && barragePanel != undefined && barragePanel.innerHTML.indexOf(userName) != -1) {
            let fansElement = barragePanel.getElementsByClassName("FansMedalWrap");
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

function setBarragePanelButtonSplit(dom) {
    if (document.getElementById("barragePanel__split") != null) {
        return;
    }
    let a = document.createElement("br");
    a.id = "barragePanel__split";
    dom.appendChild(a);
}

function setMuteButton(dom) {
    if (document.getElementById("barragePanel__mute") != null) {
        return;
    }
    if (document.getElementsByClassName("barragePanel__muteTime").length > 0) {
        return;
    }
    let a = document.createElement("div");
    a.style = "display:flex;align-items:center;width:100%;gap:8px;";
    a.innerHTML = `
        <div class="button-7e1395" id="barragePanel__mute" style="z-index:5">禁言</div>
        <div class="barragePanel__muteTime" style="z-index:5">
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
        </div>
    `
    dom.appendChild(a);
}

function setSearchBarrageButton(dom) {
    if (document.getElementById("barragePanel__search") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "button-7e1395";
    a.innerText = "查弹幕";
    a.id = "barragePanel__search";
    a.style = "z-index:5";
    dom.appendChild(a);
}

function setReplyBarrageButton(dom) {
    if (document.getElementById("barragePanel__reply") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "button-7e1395";
    a.innerText = "回复";
    a.id = "barragePanel__reply";
    a.style = "z-index:5";
    dom.appendChild(a);
}

function setBarrgePanelFunc(parentDom, id) {
    document.getElementById("barragePanel__reply").onclick = () => {
        let txt = document.getElementsByClassName("danmuContent-25f266")[0].innerText;
        const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
        const value = `@${ id }：${ txt }`;
        if (chatDom.tagName == "TEXTAREA") {
            chatDom.value = value;
        } else {
            chatDom.innerText = value;
        }
        chatDom.focus();
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
        let uid = await getUserUid(id);
        if (uid !== "") {
            openPage(`https://www.doseeing.com/data/fan/${uid}?type=chat&dt=0`, true);
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
            url: "http://dyapi.fz996.com/api/Wx/GetDataBarrage?keyword=" + name,
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

function getUserUid(name) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://www.doseeing.com/api/suggest_all?type=room&nickname=" + encodeURIComponent(name),
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                let success = true;
                if (!ret.suggest) success = false;
                if (!ret.suggest.fan) success = false;
                if (ret.suggest.fan.length === 0) success = false;
                if (ret.suggest.fan[0].nickname !== name) success = false;
                if (success) {
                    resolve(ret.suggest.fan[0].user_id);
                } else {
                    resolve("");
                    return;
                }
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
        renderBarragePanelTip();
        setBarragePanelTipFunc();
    })
}

function renderBarragePanelTip() {
    let a = document.createElement("div");
    a.style.display = "inline-block";

    const labelDoms = document.getElementsByClassName("labelfisrt-407af4");
    if (labelDoms.length === 0) return;
    const dom = labelDoms[0].parentElement;
    dom.appendChild(a);


    a = document.createElement("p");
    a.className = "sugun-e3fbf6";
    a.innerText = "|";
    dom.appendChild(a);

    a = document.createElement("div");
    a.className = "labelfisrt-407af4 thirdBtn-06cde5 fourBtn-0845d4";
    a.id = "barrage-panel-tip__+1"
    a.innerText = "+1";
    dom.appendChild(a);
}

function setBarragePanelTipFunc() {
    document.getElementById("barrage-panel-tip__+1").onclick = () => {
        const dom = document.getElementById("comment-higher-container");
        if (dom.getElementsByClassName("ex-image-danmaku").length > 0) {
            const textDom = dom.getElementsByClassName("text-879f3e")[0];
            sendBarrage(textDom.innerHTML.replace(/<a[^>]*><img\s+(?:.*?\s+)?src="(.*?)"[^>]*?\/?><\/a>/g, (match, src) => {
                return getImageDanmakuFromImgSrc(src);
            }));
        } else {
            sendBarrage(dom.innerText);
        }
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
        const isTextarea = dom.tagName === "TEXTAREA";
        if (e.keyCode == 38) {
            // ↑
            if (getTextareaPosition(dom) == 0) {
                barrageMemoryIndex = barrageMemoryIndex > 0 ? barrageMemoryIndex - 1 : barrageMemoryIndex;
                chatMemory_setBarrage();
            }
        } else if (e.keyCode == 40) {
            // ↓
            const length = isTextarea ? dom.value.length : dom.innerText.length;
            if (getTextareaPosition(dom) == length) {
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
        if (dom.tagName === "TEXTAREA") {
            return dom.value;
        } else {
            return dom.innerText;
        }
    }
    return "";
}
function setBarrageValue(txt) {
    let dom = document.getElementsByClassName("ChatSend-txt")[0];
    if (dom != undefined && dom != null) {
        if (dom.tagName === "TEXTAREA") {
            dom.value = txt;
        } else {
            dom.innerText = txt;
        }
    }
}
function initPkg_ChatTools() {
    initPkg_ChatMemory();
}

let anchorPocketData = {
  t: 0,
  list: []
};

async function initPkg_CheckAnchorPocket() {
  await updateAnchorPocketData();
  new DomHook(".FansMedalPanel-enter", false, async (m) => {
    const targetDom = document.querySelector(".FansMedalInfo-head");
    if (!targetDom) return;

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    const anchorDate = new Date(anchorPocketData.t);
    const anchorDay = anchorDate.getDate();

    if (currentDay > anchorDay) {
      await updateAnchorPocketData();
    }

    const list = anchorPocketData.list;
    if (list.length === 0) return;
    const dom = document.createElement("div");
    dom.innerHTML = `
      <div style="display: flex; align-items: center;gap: 8px;margin-top: 4px;">
        ${list
          .map(
            (item) => `
          <div style="display: flex; align-items: center;">
            <img style="width: 20px; height: 20px;margin-right: 4px;" src="${item.webIcon}" alt="${item.name}">
            <span style="font-size: 12px;">${item.name}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    targetDom.appendChild(dom);
  });
}

async function updateAnchorPocketData() {
  const newList = await getAnchorPocketList(rid);
  anchorPocketData.list = newList;
  anchorPocketData.t = new Date().getTime();
}

async function getAnchorPocketList(rid) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.douyu.com/japi/interact/cdn/pocket/effective?rid=${rid}`, {
      method: "GET",
      mode: "no-cors",
      credentials: "include"
    })
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        if (!res.data) return resolve([]);
        resolve(res.data.list);
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

function initPkg_Console() {
    console_watermark_douyEx();
}

function console_watermark_douyEx() {
    // console.log("DouyuEx插件官网 http://www.douyuex.com")
    console.log(`%c
   ______                    _____)
  (, /    )                /
    /    / ___             )__   __/
  _/___ /_(_)(_(_(_/_(_(_/        /(__
(_/___ /        .-/     (_____)  /
               (_/

%cver ${curVersion}`,'color:rgb(255,121,35);font-size:20px;font-weight:bold;', "color:red;font-size:16px;")
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
	a.innerHTML = '<div class="TitleShare"><div class="TitleShare-shareBox "><div class="Title-row-span is-right"><span class="Title-row-icon "><svg t="1585641756842" class="icon" viewBox="0 0 1237 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5646" width="16" height="16"><path d="M648.448 946.347l0.256-1.622-0.256 1.622z m84.31 13.354c-0.769 4.608-0.769 4.608-4.182 13.483-8.533 16.768-8.533 16.768-49.835 22.784-24.149-14.293-24.149-14.293-27.605-22.613-2.475-5.718-2.475-5.718-3.541-9.387L476.416 335.36l-103.083 499.2c-1.109 5.12-1.109 5.12-4.821 13.27-6.827 12.117-6.827 12.117-35.285 22.527-30.294-7.253-30.294-7.253-38.742-19.37-4.522-8.15-4.522-8.15-6.058-13.227l-74.582-262.357H0v-85.334h278.272l45.781 161.11 104.022-503.424c1.024-4.694 1.024-4.694 4.394-12.502 6.102-11.989 6.102-11.989 35.968-23.338 31.83 8.533 31.83 8.533 39.254 20.736 4.053 7.808 4.053 7.808 5.376 12.544l165.888 609.237 113.92-716.885c0.896-5.248 0.896-5.248 4.864-14.592 9.088-15.574 9.088-15.574 44.928-22.4C868.48 12.587 868.48 12.587 873.6 22.443c3.285 6.912 3.285 6.912 4.523 11.52l112 446.549h221.738v85.333H923.563l-78.507-312.917-112.299 706.773z" p-id="5647"></path></svg></span><span class="Title-row-text">复制直播流</span></div></div></div>';
    let b = document.getElementsByClassName("Title-col")[4];
    if (b && b.childNodes.length > 1) {
        b.insertBefore(a, b.childNodes[1]);
    } else {
        b = getValidDom([".subTitleContainer__-vzhr"]);
        b.appendChild(a);
    }
}

function CopyRealLive_getQn(qnName) {
    if (String(qnName).includes("蓝光8M")) return 8;
    if (String(qnName).includes("蓝光4M")) return 4;
    if (String(qnName).includes("超清")) return 3;
    if (String(qnName).includes("高清")) return 2;
    return 0;
}

function CopyRealLive_copyUrl(qn) {
    getRealLive_Douyu(rid, true, false, qn, (lurl) => {
        if (lurl == "None") {
            showMessage("房间未开播或其他错误", "error");
        } else {
            let str = String(lurl);
            // GM_setClipboard(String(lurl).replace("https", "http"));
            GM_setClipboard(str);
            showMessage("复制成功", "success");
        }
    })
}

function initPkg_CopyRealLive_Func() {
	document.getElementById("copy-real-live").addEventListener("click", function() {
        if (document.querySelectorAll(".tipItem-898596 > ul > li").length > 0) {
            document.querySelectorAll(".tipItem-898596 > ul > li").forEach(item => {
                if (item.className.includes("selected")) {
                    CopyRealLive_copyUrl(CopyRealLive_getQn(item.innerText));
                }
            })
        } else {
            CopyRealLive_copyUrl(0);
        }
    });

    let titNode = document.getElementsByClassName("RecommendViewTit-04ebd8");
    let tit = "";
    if (titNode.length > 0) {
        tit = titNode[0].innerText + "\n";
    }
}
function initPkg_DanmakuCollect() {
  initPkg_DanmakuCollect_Dom();
  const textarea = document.getElementsByClassName("ChatSend-txt")[0];
  const collectButton = document.getElementsByClassName("ChatBarrageCollect")[0];
  textarea.addEventListener("keyup", () => {
    const length = typeof textarea.value === "string" ? textarea.value.length : textarea.innerText.length;
    if (length > 25) {
      collectButton.style.display = "none";
    } else {
      collectButton.style.display = "";
    }
  });
  document.getElementsByClassName("ChatSend-button")[0].addEventListener("click", () => {
    collectButton.style.display = "";
  });
  responseHook((url, text) => {
    if (url.includes(`bulletscreen/query`)) {
      let obj = JSON.parse(text);
      obj.data.list.unshift(...getLocalDanmakuCollect().map(item => {
        return {
          content: item.content,
          type: 2,
          id: item.id
        }
      }));
      return JSON.stringify(obj);
    }
  });

  responseHook((url, text, body) => {
    if (url.includes(`bulletscreen/add`)) {
      let obj = JSON.parse(text);
      if (obj.error == 0) return text;
      let { content } = JSON.parse(body);
      addLocalDanmakuCollect(content);
      obj.msg = "收藏成功，云收藏已达上限，将收藏至本地（由DouyuEx插件实现无限收藏）";

      // 关闭并重新打开弹幕收藏以更新新添加的弹幕
      document.querySelector(".ChatBarrageCollect-tip").click();
      document.querySelector(".ChatBarrageCollect-tip").click();
      return JSON.stringify(obj);
    }
  });

  responseHook((url, text, body) => {
    if (url.includes(`bulletscreen/del`)) {
      let { id } = JSON.parse(body);
      delLocalDanmakuCollect(id);
    }
  });
}

function initPkg_DanmakuCollect_Dom() {
  let timer = setInterval(() => {
    if (typeof document.getElementsByClassName("ChatBarrageCollect")[0] != "undefined") {
      clearInterval(timer);
      new DomHook(".ChatBarrageCollect", false, (m) => {
        const titleDom = document.getElementsByClassName("ChatBarrageCollectPop-title");
        if (!titleDom) {
          document.getElementById("ex-danmaku-collect-search").removeEventListener("input", searchCollectDanmaku);
          return;
        }
        if (titleDom.length === 0) return;
        let inputDom = document.createElement("input");
        inputDom.id = "ex-danmaku-collect-search";
        inputDom.placeholder = "搜索弹幕";
        inputDom.style.marginLeft = "6px";
        titleDom[0].appendChild(inputDom);

        inputDom.addEventListener("input", searchCollectDanmaku);
      });
    }
  }, 1000);
}

function searchCollectDanmaku(e) {
  const searchText = e.target.value;
  let parentDom = document.getElementsByClassName("ChatBarrageCollectPop-barrageContent")[0].parentElement;
  let danmakuDoms = parentDom.getElementsByClassName("TagItem");
  // 找出所有doms里面包含searchText的dom，其他全部display为none，如果searchText为空，则全部显示
  for (let i = 0; i < danmakuDoms.length; i++) {
    let danmakuDom = danmakuDoms[i];
    if (danmakuDom.innerText.includes(searchText)) {
      danmakuDom.style.display = "";
    } else {
      danmakuDom.style.display = "none";
    }
  }
}

function getLocalDanmakuCollect() {
  let ret = localStorage.getItem("ExSave_DanmakuCollect");
  try {
    ret = JSON.parse(ret) || [];
  } catch (error) {
    ret = [];
  }
  return ret;
}

function addLocalDanmakuCollect(content) {
  let ret = getLocalDanmakuCollect();
  ret.unshift({
    content,
    id: new Date().getTime()
  });
  localStorage.setItem("ExSave_DanmakuCollect", JSON.stringify(ret));
}

function delLocalDanmakuCollect(id) {
  let ret = getLocalDanmakuCollect();
  localStorage.setItem("ExSave_DanmakuCollect", JSON.stringify(ret.filter(item => item.id !== id)));
}
function initPkg_DanmakuTail() {
    initPkg_DanmakuTail_insertDom();
    initPkg_DanmakuTail_Set();
    initPkg_DanmakuTail_Func();
}

function initPkg_DanmakuTail_insertDom() {
    let div = document.createElement("div");
    div.className = "ChatToolBar-DanmakuTail";
    div.innerHTML = `<div class="ChatToolBar-DanmakuTail-tip" title="弹幕小尾巴" ></div>`;
    let b = document.getElementsByClassName("ChatToolBar__left")[0];
    b.appendChild(div);

    let panel = document.createElement("div");
    panel.className = "ChatToolBar-DanmakuTail-Panel";
    let chat_panel = document.getElementsByClassName("layout-Player-chat")[0];
    chat_panel.insertBefore(panel, chat_panel.childNodes[0]);

    if (!window.location.href.includes("/beta")) {
        panel.style.bottom = "140px";
    }

    panel.innerHTML = `
        <div class="ChatToolBar-DanmakuTail-title">弹幕小尾巴</div>
        <input type="text" class="DanmakuTail-input" id="DanmakuTail-input" placeholder="请输入小尾巴内容"/>
        <div class="DanmakuTail-option-label">
            <label for="DanmakuTail-option-label1">
                <input type="radio" name="DanmakuTailType" value="1" id="DanmakuTail-option-label1"> 前缀
            </label>
            <label for="DanmakuTail-option-label2">
                <input type="radio" name="DanmakuTailType" value="2" id="DanmakuTail-option-label2" checked> 后缀
            </label>
        </div>
        <label class="DanmakuTail-checkbox-label">
            <input type="checkbox" class="DanmakuTail-checkbox" id="DanmakuTail-checkbox" />
            启用功能
        </label>
    `;
}

function initPkg_DanmakuTail_Set() {
    let ret = localStorage.getItem("ExSave_DanmakuTail");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        document.getElementById("DanmakuTail-checkbox").checked = retJson.isTailEnabled;
        document.getElementById("DanmakuTail-input").value = retJson.tailContent || "";
        document.getElementById("DanmakuTail-input").disabled = retJson.isTailEnabled;
        document.querySelectorAll('input[name="DanmakuTailType"]')[0].disabled = retJson.isTailEnabled;
        document.querySelectorAll('input[name="DanmakuTailType"]')[1].disabled = retJson.isTailEnabled;
        if (!retJson.type) {
            document.querySelector(`input[name="DanmakuTailType"][value="2"]`).checked = true;
        } else {
            document.querySelector(`input[name="DanmakuTailType"][value="${retJson.type}"]`).checked = true;
            saveData_DanmakuTail();
        }
        if (retJson.isTailEnabled) {
            document.querySelector(".ChatToolBar-DanmakuTail-tip").classList.add("ChatToolBar-DanmakuTail-tip-active");
        }
    }
}


function saveData_DanmakuTail() {
    let data = {
        isTailEnabled: document.getElementById("DanmakuTail-checkbox").checked,
        tailContent: document.getElementById("DanmakuTail-input").value,
        type: document.querySelector('input[name="DanmakuTailType"]:checked').value
    }
    localStorage.setItem("ExSave_DanmakuTail", JSON.stringify(data));
}


function initPkg_DanmakuTail_Func() {
    document.getElementsByClassName("ChatToolBar-DanmakuTail")[0].addEventListener("click", function () {
        showExRightPanel("弹幕小尾巴");
    });

    initPkg_DanmakuTail_HandleFunc("#DanmakuTail-checkbox", "#DanmakuTail-input");

    document.getElementById("DanmakuTail-checkbox").addEventListener("change", function () {
        saveData_DanmakuTail();
    });
    document.querySelectorAll('input[name="DanmakuTailType"]').forEach((elem) => {
        elem.addEventListener("change", function () {
            saveData_DanmakuTail();
        });
    });
    document.getElementById("DanmakuTail-input").addEventListener("input", function () {
        saveData_DanmakuTail();
    });

}


function initPkg_DanmakuTail_HandleFunc(checkboxSelector, inputSelector) {
    let keydownHandler = null;
    let clickHandler = null;

    // 开启
    function enable(content, type_value) {
        // 优先查找 textarea，如果没有则查找 div
        let textarea = document.querySelector("textarea.ChatSend-txt") || document.querySelector("div.ChatSend-txt");
        const button = document.querySelector(".ChatSend-button");
        if (!textarea || !button) return;

        disable(); // 防止重复绑定

        // 判断元素类型，div 使用 innerText，textarea 使用 value
        const isDiv = textarea.tagName.toLowerCase() === "div";
        const getText = () => isDiv ? textarea.innerText : textarea.value;
        const setText = (text) => {
            if (isDiv) {
                textarea.innerText = text;
            } else {
                textarea.value = text;
            }
        };

        keydownHandler = function (e) {
            if (!e.isTrusted) return;
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();
                button.click();
            }
        };

        clickHandler = function (e) {
            const currentText = getText();
            if (currentText.trim() == "") return;
            
            let shouldAdd = false;
            if (type_value === "1") {
                // 前缀模式：检查是否以内容开头
                shouldAdd = !currentText.startsWith(content);
            } else {
                // 后缀模式：检查是否以内容结尾
                shouldAdd = !currentText.endsWith(content);
            }
            
            if (shouldAdd) {
                if (type_value === "1") {
                    setText(content + currentText);
                } else {
                    setText(currentText + content);
                }
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
            }
        };

        textarea.addEventListener("keydown", keydownHandler, true);
        button.addEventListener("click", clickHandler, true);
    }

    // 关闭
    function disable() {
        // 优先查找 textarea，如果没有则查找 div
        const textarea = document.querySelector("textarea.ChatSend-txt") || document.querySelector("div.ChatSend-txt");
        const button = document.querySelector(".ChatSend-button");
        if (textarea && keydownHandler) {
            textarea.removeEventListener("keydown", keydownHandler, true);
        }
        if (button && clickHandler) {
            button.removeEventListener("click", clickHandler, true);
        }
        keydownHandler = null;
        clickHandler = null;
    }

    // 监听 checkbox
    const checkbox = document.querySelector(checkboxSelector);
    const input = document.querySelector(inputSelector);
    const type = document.querySelectorAll('input[name="DanmakuTailType"]');
    let type_value = document.querySelector('input[name="DanmakuTailType"]:checked').value;

    if (checkbox) {
        checkbox.addEventListener("change", function () {

            if (input.value.trim() === "") {
                checkbox.checked = false;
                showMessage("【弹幕小尾巴】请输入弹幕小尾巴内容", "error");
                return;
            }

            input.disabled = checkbox.checked;
            type[0].disabled = checkbox.checked;
            type[1].disabled = checkbox.checked;
            document.querySelector(".ChatToolBar-DanmakuTail-tip").classList.remove("ChatToolBar-DanmakuTail-tip-active");

            disable();
            if (checkbox.checked && input) {
                document.querySelector(".ChatToolBar-DanmakuTail-tip").classList.add("ChatToolBar-DanmakuTail-tip-active");
                let content = input.value.trim();
                type_value = document.querySelector('input[name="DanmakuTailType"]:checked').value;
                enable(content, type_value);
            }
        });

        if (checkbox.checked && input) {
            enable(input.value.trim(), type_value);
        }
    }

    return { enable, disable };
}


function initPkg_DisableCloseJump_Timer() {
  setInterval(() => {
    const x = document.querySelector(".ClosingRecommend .dy-ModalRadius-close-x");
    if (!x) return;
    x.click();
  }, 1000);
}
function getVideoStreamUrl(vid, sign) {
  return new Promise(resolve => {
      fetch("https://v.douyu.com/api/stream/getStreamUrl", {
          method: 'POST',
          mode: 'no-cors',
          credentials: 'include',
          headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
          body: `${sign}&vid=${vid}`
      }).then(result => {
          return result.json();
      }).then(ret => {
          resolve(ret);
      }).catch(err => {
          console.log("请求失败!", err);
      })
  })
}

function getVideoBarrageByTime(vid, pre = 0) {
  // pre来自接口返回值data.pre中
  // 若为-1则不再获取
  if (pre < 0) {
      return;
  }
  return new Promise(resolve => {
      fetch(`https://v.douyu.com/wgapi/vod/center/getBarrageListByPage?vid=${vid}&offset=${pre}`, {
          method: 'GET',
          mode: 'no-cors',
          credentials: 'include',
      }).then(result => {
          return result.json();
      }).then(ret => {
          resolve(ret);
      }).catch(err => {
          console.log("请求失败!", err);
      })
  })
}
let dyVideoBarrage_domhook_videoChange = null;
let dyVideoBarrage_hasRendered = false;
const dyVideoBarrage_domName = "ex-barrageLine";
const dyVideoBarrage_switchDomName = "ex-barrageLine-switch";
function initPkg_DyVideoBarrageLine() {
    let timer = setInterval(() => {
        let progress = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector(".ProgressBar-Safearea");
        let hashidShadow = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        let hashIdDom = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        if (progress && hashidShadow && hashIdDom) {
            clearInterval(timer);
            initPkg_DyVideoBarrageLine_Dom();
            renderVideoBarrageLine();
            let shareHoverDom = hashIdDom.querySelector("share-hover");
            dyVideoBarrage_domhook_videoChange = new MutationObserver(function(mutations) {
                renderVideoBarrageLine();
            });
            dyVideoBarrage_domhook_videoChange.observe(shareHoverDom, { attributes: true, childList: true, subtree: false });
        }
    }, 1000);
}

function initPkg_DyVideoBarrageLine_Dom() {
    let a = document.createElement("style");
    a.innerHTML = `.no-hasLR #ex-barrageLine {
        display: none !important;
    }`;
    
    let b = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot;
    b.append(a);
}


async function renderVideoBarrageLine() {
    if (dyVideoBarrage_hasRendered) return;
    dyVideoBarrage_hasRendered = true;
    setTimeout(() => {
        dyVideoBarrage_hasRendered = false;
    }, 1000);
    showMessage("弹幕高能进度条加载中，请耐心等待", "info");
    let progress = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot;
    let progressBar = progress.querySelector(".ProgressBar");
    let barrageLineDom = progress.querySelector("#" + dyVideoBarrage_domName);
    if (barrageLineDom) barrageLineDom.remove();
    let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
    let xAxisStepNum = 100;
    let progressTimeText = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("#time-label").innerText;
    let arr = progressTimeText.split("/");
    if (arr.length <= 0) return;
    let totalMs = timeText2Ms(arr[1]);
    let msStep = totalMs / (xAxisStepNum - 1);
    
    let list = new Array(xAxisStepNum).fill(0, 0, xAxisStepNum);
    let pre = 0;
    do {
        let data = await getVideoBarrageByTime(hashid, pre);
        pre = data.data.pre;
        if (data.data.list) {
            for (let i = 0; i < data.data.list.length; i++) {
                let item = data.data.list[i];
                let index = Math.floor(item.tl / msStep);
                list[index]++;
            }
        }
    } while (pre >= 0);


    // viewbox 长1000 高100
    let xStep = 1000 / list.length;
    let yStep = Math.max(...list) / 100;

    let positionArray = [];

    for (let i = 0; i < list.length; i++) {
        let barrageNum = list[i];
        let x = i * xStep;
        let y = barrageNum / yStep;
        positionArray.push([x, y]);
    }

    let d = "M 0 100 L 0 80 ";
    let c = "";
    for (let i = 0; i < positionArray.length - 1; i++) {
        let current = positionArray[i];
        let next = positionArray[i + 1];
        let [x1, y1] = current;
        let [x2, y2] = next;

        let cx1 = x1;
        let cy1 = (y1 + y2) / 2;
        let cx2 = x2;
        let cy2 = (y1 + y2) / 2;
        c += "C ";
        c += `${cx1} ${80 - cy1}, ${cx2} ${80 - cy2}, ${x2} ${80 - y2} `;
        // let smoothArr = smooth([current, next]);
        // for (let j = 1; j < smoothArr.length; j++) {
        //     c += `${smoothArr[j][0]} ${100 - smoothArr[j][1]}`;
        //     if (j === smoothArr.length - 1) {
        //         c += " ";
        //     } else {
        //         c += ", "
        //     }
        // }
    }
    c += "L 1000 100 Z";
    let path = d + c;
    let html = `
    <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1000 100" >
        <path fill="rgba(255,255,255,0.3)" d="${path}" />
    </svg>`;
    if (path.indexOf("NaN") !== -1) {
        console.log(path)
        showMessage("弹幕高能进度条加载失败", "error");
    }
    let a = document.createElement("div");
	a.id = dyVideoBarrage_domName;
    a.style = "position:absolute;width:100%;height:30px;bottom:0px;pointer-events:none;cursor: default;";
	a.innerHTML = html;
	
    progressBar.insertBefore(a, progressBar.childNodes[0]);
}
function initPkg_DyVideoDownload() {
    let timer = setInterval(() => {
        let toolBarShadow = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        if (toolBarShadow) {
            clearInterval(timer);
            let toolbar = toolBarShadow.querySelector(".ToolBar-positiveUl");
            initPkg_DyVideoDownload_Style();
            initPkg_DyVideoDownload_Dom(toolbar);
            initPkg_DyVideoDownload_Func();
        }
    }, 1000);
}

function initPkg_DyVideoDownload_Style() {
    let style = document.createElement("style");
    style.innerHTML = `
    #btn-download:hover .download__panel {
        display: block;
    }
    .download__panel {
        width:150px;
        position:absolute;
        text-align: center;
        cursor: default;
        margin-top: 29px;
        margin-left: -38px;
        box-shadow: 0px 3px 10px 0px;
        display: none;
        background: white;
    }
    .download__item {
        height: 30px;
        line-height: 30px;
        width: 100%;
        cursor: pointer;
    }
    .download__item:hover {
        color: rgb(255,119,0)
    }
    `;
    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.appendChild(style);
}

function initPkg_DyVideoDownload_Dom(dom) {
    let html = `
    <div class="download__panel">
        <div class="download__item" id="download__default" title="文件超过2GB时可能会下载失败">
            <span class="ToolBar-iconText">浏览器下载</span>
        </div>
        <div class="download__item" id="download__copy" title="可将链接填至第三方下载器中下载">
            <span class="ToolBar-iconText">复制m3u8链接</span>
        </div>
        <div class="download__item" id="download__barrage" title="下载弹幕(.xlsx)">
            <span class="ToolBar-iconText">下载弹幕(.xlsx)</span>
        </div>
        <div class="download__item" id="download__barrageass" title="下载弹幕(.ass)">
            <span class="ToolBar-iconText">下载弹幕(.ass)</span>
        </div>
    </div>
    <span class="ToolBar-icon ">
        <svg t="1634113402576" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7734" width="28" height="28"><path d="M761.98 413.12c0.25-4.4 0.39-8.82 0.39-13.28 0-127.18-102.84-230.28-229.71-230.28s-229.71 103.1-229.71 230.28c0 0.67 0.02 1.33 0.03 2a213.156 213.156 0 0 0-38.91-3.58c-117.2 0-212.21 95.25-212.21 212.74 0 117.49 95.01 212.74 212.21 212.74 2.94 0 5.86-0.08 8.77-0.2 2.54 0.13 5.09 0.2 7.66 0.2h467.35c2.82 0 5.61-0.09 8.39-0.24 108.96-5.16 195.72-95.13 195.72-205.36 0.01-108.3-83.73-197.04-189.98-205.02zM616.33 584.24l-90.86 93.93c-0.78 1.11-1.66 2.17-2.63 3.17-3.95 4.09-8.9 6.62-14.09 7.61-8.34 1.77-17.38-0.51-23.97-6.89a25.975 25.975 0 0 1-3.16-3.68l-93.5-90.45c-10.53-10.19-10.81-26.99-0.62-37.52 10.19-10.53 26.99-10.81 37.52-0.62l45.09 43.62c0-0.06-0.01-0.12-0.01-0.18l-2.43-146.62c-0.3-17.83 13.92-32.52 31.75-32.82 17.83-0.3 32.52 13.92 32.82 31.75l2.43 146.63v0.17l43.52-44.99c10.19-10.53 26.99-10.81 37.52-0.62 10.53 10.17 10.81 26.97 0.62 37.51z" p-id="7735" fill="#515151"></path></svg>
    </span>
    <span class="ToolBar-iconText" id="download-text">下载</span>
    `

    let a = document.createElement("li");
	a.title = "下载视频";
	a.innerHTML = html;
    a.id = "btn-download";

    dom.appendChild(a);
}

function initPkg_DyVideoDownload_Func() {
    let $DATA = unsafeWindow.$DATA;
    let domDownloadText = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download-text");
    let domDownloadPanel = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector(".download__panel");

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#btn-download").addEventListener("click", () => {
        if (domDownloadText.innerText === "下载完成") {
            showMessage("请刷新页面后再下载", "warning");
        }
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__default").addEventListener("click", async () => {
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        let vid = $DATA.ROOM.vid;
        if (hashid !== vid) {
            showMessage("视频内容已改变，请刷新网页后重试", "error");
            return;
        }

        showMessage("开始下载视频...当视频超过2GB时可能会下载失败", "info");
        const m3u8 = new M3U8();

        let dyVideoSign = new DyVideoSign($DATA.ROOM.point_id);
        let sign = dyVideoSign.getSign();
        
        dyVideoSign = null;
        let ret = await getVideoStreamUrl(vid, sign);

        let url = "";
        if ("super" in ret.data.thumb_video) {
            url = ret.data.thumb_video.super.url;
        } else if ("high" in ret.data.thumb_video) {
            url = ret.data.thumb_video.high.url;
        } else if ("normal" in ret.data.thumb_video) {
            url = ret.data.thumb_video.normal.url;
        } else {
            let keys = Object.keys(ret.data.thumb_video);
            url = keys.length > 0 ? ret.data.thumb_video[keys[0]].url : "";
        }
        if (url !== "") {
            let download = m3u8.start(url, {
                filename: $DATA.ROOM.name + ".mp4"
            });

            download.on("progress", progress => {
                domDownloadText.innerText = `${Number(progress.percentage).toFixed(2)}%`;
            }).on("finished", finished => {
                domDownloadText.innerText = "下载完成";
                showMessage("视频下载完成", "success");
            }).on("error", message => {
                domDownloadText.innerText = "下载失败";
                showMessage(message, "success");
            }).on("aborted", () => {
                domDownloadText.innerText = "下载中止";
            });
        } else {
            showMessage("获取m3u8链接失败", "error");
        }

        // domDownloadPanel.style.display = "none";
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__copy").addEventListener("click", async () => {
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        let vid = $DATA.ROOM.vid;
        if (hashid !== vid) {
            showMessage("视频内容已改变，请刷新网页后重试", "error");
            return;
        }

        showMessage("正在获取m3u8链接...", "info");

        let dyVideoSign = new DyVideoSign($DATA.ROOM.point_id);
        let sign = dyVideoSign.getSign();
        
        dyVideoSign = null;
        let ret = await getVideoStreamUrl(vid, sign);

        let url = "";
        if ("super" in ret.data.thumb_video) {
            url = ret.data.thumb_video.super.url;
        } else if ("high" in ret.data.thumb_video) {
            url = ret.data.thumb_video.high.url;
        } else if ("normal" in ret.data.thumb_video) {
            url = ret.data.thumb_video.normal.url;
        } else {
            let keys = Object.keys(ret.data.thumb_video);
            url = keys.length > 0 ? ret.data.thumb_video[keys[0]].url : "";
        }
        if (url !== "") {
            GM_setClipboard(url);
            showMessage("复制成功，可将链接复制到第三方下载器中下载", "success");
        } else {
            showMessage("获取m3u8链接失败", "error");
        }
        // domDownloadPanel.style.display = "none";
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__barrage").addEventListener("click", async () => {
        let videoTitle = document.getElementsByTagName("demand-video-title")[0].shadowRoot.querySelector(".Title-Main").innerText;
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        showMessage("正在获取弹幕数据，请勿切换页面...", "info");
        
        let pre = 0;
        let header = ["vid", "hashid", "uid", "昵称", "弹幕", "时间", "发送时间"];
        let body = [];
        do {
            let data = await getVideoBarrageByTime(hashid, pre);
            pre = data.data.pre;
            for (let i = 0; i < data.data.list.length; i++) {
                let item = data.data.list[i];
                body.push([item.vid, hashid, item.uid, item.nn, item.ctt, formatSeconds2(item.tl / 1000), dateFormat("yyyy-MM-dd hh:mm:ss", new Date(item.sts * 1000))]);
            }
        } while (pre >= 0);

        exportJsonToExcel(header, body, `【${videoTitle}】弹幕数据.xlsx`);
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__barrageass").addEventListener("click", async () => {
        let videoTitle = document.getElementsByTagName("demand-video-title")[0].shadowRoot.querySelector(".Title-Main").innerText;
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        showMessage("正在获取弹幕数据，请勿切换页面...", "info");
        let pre = 0;
        let ass = new ASS({title: videoTitle});
        let list = [];
        do {
            let data = await getVideoBarrageByTime(hashid, pre);
            pre = data.data.pre;
            for (let i = 0; i < data.data.list.length; i++) {
                let item = data.data.list[i];
                list.push({
                    time: Number(item.tl),
                    txt: item.ctt,
                    color: item.col,
                });
            }
        } while (pre >= 0);
        let result = ass.generate(list);
        downloadFile(`${videoTitle}.ass`, result);
    })
}
function initPkg_ExIcon() {
	initPkg_ExIcon_insertDom();
	initPkg_ExIcon_Func();
}
function initPkg_ExIcon_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-icon";
	a.innerHTML = `<a title="DouyuEx ver.${curVersion}"><svg class="icon" width="24" height="24" viewBox="0 0 108 108" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="精灵球" transform="translate(0.830769, 0.830769)" fill-rule="nonzero">
            <path d="M53.1692307,106.338461 C23.8276922,106.338461 0,82.5107692 0,53.1692307 C0,51.0030769 1.77230775,49.2307692 3.9384615,49.2307692 L33.476923,49.2307692 C35.6430769,49.2307692 37.4153845,51.003077 37.4153846,53.1692307 C37.4153846,61.8338461 44.5046154,68.9230769 53.1692307,68.9230769 C61.8338461,68.9230769 68.9230769,61.8338461 68.9230769,53.1692307 C68.9230769,51.0030769 70.6953846,49.2307692 72.8615385,49.2307692 L102.4,49.2307692 C104.566154,49.2307692 106.338461,51.003077 106.338461,53.1692307 C106.338461,82.5107692 82.5107692,106.338461 53.1692307,106.338461 Z" id="路径" fill="#33363A"></path>
            <path d="M8.07384612,57.1076922 C10.0430769,80.2461537 29.5384615,98.4615385 53.1692307,98.4615385 C76.8,98.4615385 96.2953846,80.2461539 98.2646154,57.1076922 L76.5046154,57.1076922 C74.6338461,68.2338461 64.8861539,76.8 53.1692307,76.8 C41.4523076,76.8 31.7046154,68.2338461 29.8338461,57.1076922 L8.07384612,57.1076922 Z" id="路径" fill="#FFFFFF"></path>
            <path d="M53.1692308,3.9384615 C25.9938461,3.9384615 3.9384615,25.9938461 3.9384615,53.1692307 L33.476923,53.1692307 C33.476923,42.3384615 42.3384615,33.476923 53.1692308,33.476923 C64,33.476923 72.8615385,42.3384615 72.8615385,53.1692307 L102.4,53.1692307 C102.4,25.9938461 80.3446154,3.9384615 53.1692308,3.9384615 Z" id="路径" fill="#D60909"></path>
            <path d="M102.4,57.1076922 L72.8615385,57.1076922 C70.6953846,57.1076922 68.923077,55.3353845 68.9230769,53.1692307 C68.9230769,44.5046154 61.8338461,37.4153846 53.1692307,37.4153846 C44.5046154,37.4153846 37.4153846,44.5046154 37.4153846,53.1692307 C37.4153846,55.3353846 35.6430769,57.1076922 33.476923,57.1076922 L3.9384615,57.1076922 C1.77230762,57.1076922 0,55.3353845 0,53.1692307 C0,23.8276922 23.8276923,0 53.1692307,0 C82.5107692,0 106.338461,23.8276922 106.338461,53.1692307 C106.338461,55.3353846 104.566154,57.1076922 102.4,57.1076922 Z" id="路径" fill="#33363A"></path>
            <path d="M76.5046154,49.2307693 L98.3630769,49.2307693 C96.2953846,26.0923076 76.8,7.876923 53.1692307,7.876923 C29.5384615,7.876923 10.0430769,26.0923076 8.07384612,49.2307693 L29.9323076,49.2307693 C31.7046154,38.1046154 41.4523076,29.5384615 53.1692307,29.5384615 C64.8861539,29.5384615 74.6338461,38.1046154 76.5046154,49.2307693 L76.5046154,49.2307693 Z" id="路径" fill="#D60909"></path>
            <path d="M53.1692307,76.8 C40.1723076,76.8 29.5384615,66.1661539 29.5384615,53.1692307 C29.5384615,40.1723076 40.1723076,29.5384615 53.1692307,29.5384615 C66.1661539,29.5384615 76.8,40.1723076 76.8,53.1692307 C76.8,66.1661539 66.1661539,76.8 53.1692307,76.8 Z" id="路径" fill="#33363A"></path>
            <path d="M53.1692307,37.4153846 C44.5046154,37.4153846 37.4153846,44.5046154 37.4153846,53.1692307 C37.4153846,61.8338461 44.5046154,68.9230769 53.1692307,68.9230769 C61.8338461,68.9230769 68.9230769,61.8338461 68.9230769,53.1692307 C68.9230769,44.5046154 61.8338461,37.4153846 53.1692307,37.4153846 L53.1692307,37.4153846 Z" id="路径" fill="#FFFFFF"></path>
            <path d="M43.3230769,53.1692307 C43.3230769,58.6071114 47.7313501,63.0153846 53.1692307,63.0153846 C58.6071114,63.0153846 63.0153846,58.6071114 63.0153846,53.1692307 C63.0153846,47.7313501 58.6071114,43.3230769 53.1692307,43.3230769 C47.7313501,43.3230769 43.3230769,47.7313501 43.3230769,53.1692307 Z" id="路径" fill="#33363A"></path>
        </g>
    </g>
</svg><i id="ex-icon__tip" class="ex-panel__tip"></i></a>`;
	let b = document.querySelector(".PlayerToolbar-ContentCell .PlayerToolbar-Wealth");
	if (b) {
		b.insertBefore(a, b.childNodes[0]);
	} else {
		a.className += " ToolbarGiftArea-backpack";
		a.style.width = "52px";
		b = document.querySelector(".ToolbarGiftArea-container");
		b.appendChild(a);
	}
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
	initPkg_ExpandTool_AutoFish();
	initPkg_ExpandTool_ClearBag();
    initPkg_ExpandTool_SendGift();
    // initPkg_ExpandTool_BarrageSize();
	initPkg_ExpandTool_TabSwitch();
	initPkg_ExpandTool_P2P();
	initPkg_ExpandTool_FullScreen();
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
		showExRightPanel("扩展功能");
	});
}

let autoFishInfo = [];
let baitId = null;
let nextFishEndTime = 0;
let isFishing = false;
let timerAutoFish = 0;

function initPkg_ExpandTool_AutoFish() {
  ExpandTool_AutoFish_insertDom();
  ExpandTool_AutoFish_insertFunc();
  ExpandTool_AutoFish_Set();
}

function ExpandTool_AutoFish_insertDom() {
  let html = "";
  html += '<label><input id="extool__autofish_start" type="checkbox">自动钓鱼</label><br>';
  html += '<label><input name="autofish_mode" type="radio" value="all" checked>全天</label>';
  html += '<label style="margin-left:5px;"><input name="autofish_mode" type="radio" value="contest">钓鱼大赛</label>';

  let a = document.createElement("div");
  a.className = "extool__autofish";
  a.innerHTML = html;
  let b = document.getElementsByClassName("extool")[0];
  b.insertBefore(a, b.childNodes[0]);
}
function ExpandTool_AutoFish_insertFunc() {
  document.querySelectorAll('input[name="autofish_mode"]').forEach(radio => {
    radio.addEventListener("change", saveData_AutoFish);
  });
  
  document.getElementById("extool__autofish_start").addEventListener("click", async () => {
    saveData_AutoFish();
    const isStart = document.getElementById("extool__autofish_start").checked;
    AutoFish_lockMode(isStart);
    if (!isStart) {
      clearInterval(timerAutoFish);
      return;
    }
    showMessage("【自动钓鱼】开始自动钓鱼", "info");
    autoFishInfo = await AutoFish_getFishInfo();
    const homepageRes = await AutoFish_getHomepageData();
    if (homepageRes.data) {
      let baitData = homepageRes.data.baits.find((item) => item.inUse);
      if (!baitData) {
        document.getElementById("extool__autofish_start").checked = false;
        AutoFish_lockMode(false);
        return showMessage("【自动钓鱼】请设置鱼饵", "error");
      }
      baitId = baitData.id;

      const myCh = homepageRes.data.myCh;
      if (!myCh) {
        document.getElementById("extool__autofish_start").checked = false;
        AutoFish_lockMode(false);
        return showMessage("【自动钓鱼】请设置形象", "error");
      }
    } else {
      document.getElementById("extool__autofish_start").checked = false;
      AutoFish_lockMode(false);
      return showMessage("【自动钓鱼】未能获取活动信息", "error");
    }
    saveData_AutoFish();

    if (homepageRes.data.fishing.stat == 0) {
      // 未开始钓鱼
      isFishing = false;
      nextFishEndTime = 0;
    }

    if (homepageRes.data.fishing.stat == 1) {
      // 还在钓鱼中
      isFishing = true;
      nextFishEndTime = homepageRes.data.fishing.fishEtMs;
    }

    if (homepageRes.data.fishing.stat == 2) {
      // 上一次未收杆
      await endFish();
      await sleep(1000);
    }

    timerAutoFish = setInterval(async () => {
      // 检查是否在钓鱼大赛时间内
      if (!isInFishingTime()) return;
      
      if (isFishing) {
        // 正在钓鱼中，检测是否到时间收杆
        const now = new Date().getTime();
        if (now <= nextFishEndTime) return;
        await endFish();
      } else {
        const fishRes = await AutoFish_startFish();
        if (fishRes.error !== 0) {
          showMessage(`【自动钓鱼】${fishRes.msg}`, "error");
          console.log(fishRes, "钓鱼失败");
          if (fishRes.error == 1001007) {
            // 操作失败
            await endFish();
          }
          if (fishRes.error == 1005003) {
            // 鱼饵不足
            clearInterval(timerAutoFish);
          }
          return;
        }
        isFishing = true;

        nextFishEndTime = fishRes.data.fishing.fishEtMs;
      }
    }, 1500);
  });
}

async function endFish() {
  const fishRes = await AutoFish_endFish();
  if (fishRes.error !== 0) {
    console.log(fishRes, "收杆失败");
    const homepageRes = await AutoFish_getHomepageData();
    if (homepageRes.data.fishing.stat == 0) {
      // 钓鱼已完成
      isFishing = false;
      nextFishEndTime = 0;
    }
    return;
  }
  let str = `【自动钓鱼】`;
  let fishData = autoFishInfo.find((item) => item.fishId == fishRes.data.fish.id);
  if (fishData) {
    str += `获得${fishData.name}${fishRes.data.fish.wei}斤`;
  }
  if (fishRes.data.awards && fishRes.data.awards.length > 0) {
    for (let i = 0; i < fishRes.data.awards.length; i++) {
      let award = fishRes.data.awards[i];
      str += `${fishData ? "，" : ""}获得${award.awardName}x${award.awardNum}`;
    }
  }
  if (str !== "【自动钓鱼】") showMessage(str, "success");
  isFishing = false;
}

function AutoFish_getSave() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("ExSave_AutoFish"));
  } catch (e) {
    data = null;
  }
  if (!data || typeof data !== "object") data = {};
  if (!Array.isArray(data.rids)) data.rids = [];
  if (!data.modes || typeof data.modes !== "object") data.modes = {};
  return data;
}

function AutoFish_lockMode(lock) {
  document.querySelectorAll('input[name="autofish_mode"]').forEach((r) => (r.disabled = lock));
}

function saveData_AutoFish() {
  let checkbox = document.getElementById("extool__autofish_start");
  let modeRadio = document.querySelector('input[name="autofish_mode"]:checked');
  if (!checkbox || !modeRadio) return;

  let value = checkbox.checked;
  let mode = modeRadio.value;
  let data = AutoFish_getSave();
  
  if (value) {
    if (!data.rids.includes(rid)) data.rids.push(rid);
    data.modes[rid] = mode;
  } else {
    data.rids = data.rids.filter((item) => item !== rid);
    delete data.modes[rid];
  }
  
  localStorage.setItem("ExSave_AutoFish", JSON.stringify(data));
}

function AutoFish_getRids() {
  return AutoFish_getSave().rids;
}

function ExpandTool_AutoFish_Set() {
  let data = AutoFish_getSave();
  if (!data.rids.includes(rid)) return;
  
  // 设置模式（兼容旧版本，默认全天）
  let mode = data.modes && data.modes[rid] ? data.modes[rid] : "all";
  document.querySelector(`input[name="autofish_mode"][value="${mode}"]`).checked = true;
  
  document.getElementById("extool__autofish_start").click();
}

function AutoFish_getFishInfo() {
  return new Promise((resolve) => {
    fetch(`https://www.douyu.com/japi/revenuenc/web/actfans/achieve/accList?rid=${rid}&type=1&period=1`, {
      method: "GET",
      mode: "no-cors",
      cache: "default",
      credentials: "include"
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        if (ret.data) {
          resolve(ret.data.accList);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

function AutoFish_getHomepageData() {
  return new Promise((resolve) => {
    fetch(`https://www.douyu.com/japi/revenuenc/web/actfans/fishing/homePage?rid=${rid}&opt=1`, {
      method: "GET",
      mode: "no-cors",
      cache: "default",
      credentials: "include"
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

function AutoFish_startFish() {
  return new Promise((resolve) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/actfans/fishing/fishing", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&rid=${rid}&baitId=${baitId}&ver=1.1`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

function AutoFish_endFish() {
  return new Promise((resolve) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/actfans/fishing/reelIn", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&rid=${rid}`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

function isInFishingTime() {
  let modeRadio = document.querySelector('input[name="autofish_mode"]:checked');
  let mode = modeRadio ? modeRadio.value : "all";
  if (mode === "all") return true;
  
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  
  // 钓鱼大赛：12:00-24:00，每个整点的前半小时（包括00:00-00:30）
  return (hour >= 12 && minute < 30) || (hour === 0 && minute < 30);
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
    a.innerHTML = '<label>弹幕大小(默认24px)：</label><input id="extool__bsize_value" type="text" style="width:50px;text-align:center;" value="24" /><input style="margin-left:10px;" type="button" id="extool__bsize_btn" value="确认" />';
    
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function setBarrageSize(s) {
    cancelBarrageSize();
    StyleHook_set("Ex_Style_DanmuSize", ".danmuItem-a8616a{font-size:" + s + "px !important;}");
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
    html += '<input style="margin-left:10px;" type="button" id="extool__clearbag_sendbtn" value="送出" />';
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
function initPkg_ExpandTool_FullScreen() {
    ExpandTool_FullScreen_insertDom();
    ExpandTool_FullScreen_insertFunc();
    ExpandTool_HighestVideoQuality_insertFunc();
    initPkg_ExpandTool_FullScreen_Set();
    initPkg_ExpandTool_HighestVideoQuality_Set();
}

function ExpandTool_FullScreen_insertDom() {
    let a = document.createElement("span");
    // a.className = "extool__bsize";
    a.innerHTML = '<label title="自动网页全屏"><input id="extool__fullscreen" type="checkbox">自动网页全屏</label><label title="自动最高画质"><input id="extool__highestvideoquality" type="checkbox">自动最高画质</label>';
    
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function getFullScreen() {
    return document.getElementById("extool__fullscreen").checked;
}
function ExpandTool_FullScreen_insertFunc() {
    document.getElementById("extool__fullscreen").addEventListener("click", function() {
        saveData_FullScreen();
        if (getFullScreen()) {
            showMessage("刷新页面生效", "success");
        }
    });
}

function saveData_FullScreen() {
	let data = {
		isFullScreen: getFullScreen()
	}
	localStorage.setItem("ExSave_FullScreen", JSON.stringify(data));
}
function initPkg_ExpandTool_FullScreen_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_FullScreen");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isFullScreen) {
            document.getElementById("extool__fullscreen").checked = retJson.isFullScreen;
        }
	}
}


function initFullScreen() {
	let ret = localStorage.getItem("ExSave_FullScreen");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isFullScreen) {
            fullScreen();
        }
	}
}

function fullScreen() {
    let count = 0;
    let intID1 = setInterval(() => {
        count++;
        if (count > 100) clearInterval(intID1);
        if (getValidDom([".wfs-2a8e83", ".icon-c8be96"])) {
            clearInterval(intID1);
            let dom = document.querySelector("div.wfs-2a8e83");
            if (dom) {
                dom.click();
            } else {
                dom = document.querySelectorAll(".icon-c8be96");
                if (dom.length >= 2) {
                    // 因为网页全屏按钮在倒数第二个
                    dom[dom.length - 2].click();
                }
            }
        }
    }, 1000);
}

function getHighestVideoQuality() {
    return document.getElementById("extool__highestvideoquality").checked;
}
function ExpandTool_HighestVideoQuality_insertFunc() {
    document.getElementById("extool__highestvideoquality").addEventListener("click", function() {
        saveData_HighestVideoQuality();
        if (getHighestVideoQuality()) {
            showMessage("刷新页面生效", "success");
        }
    });
}

function saveData_HighestVideoQuality() {
	let data = {
		isHighestVideoQuality: getHighestVideoQuality()
	}
	localStorage.setItem("ExSave_HighestVideoQuality", JSON.stringify(data));
}
function initPkg_ExpandTool_HighestVideoQuality_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_HighestVideoQuality");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isHighestVideoQuality) {
            document.getElementById("extool__highestvideoquality").checked = retJson.isHighestVideoQuality;
        }
	}
}

function initHighestVideoQuality() {
	let ret = localStorage.getItem("ExSave_HighestVideoQuality");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isHighestVideoQuality) {
            highestVideoQuality();
        }
	}
}

function highestVideoQuality() {
    let count = 0;
    let intID1 = setInterval(() => {
        count++;
        if (count > 100) clearInterval(intID1);
        const qualityContainer = document.querySelector('[class^="tipItem-"]:has([value^="画质"])') || document.querySelector('[class^="tip-"]:has([value^="画质"])');
        if (qualityContainer) {
            clearInterval(intID1);
            const highestQualityOption = qualityContainer.querySelector('ul > li:first-child');
            if (highestQualityOption) {
                const isAlreadySelected = highestQualityOption.matches('[class^="selected-"]');
                if (!isAlreadySelected) highestQualityOption.click(); 
            }
        }
    }, 1000);
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
    html += '<label><input id="extool__gold_start" type="checkbox">幻神模式</label>';
    html += '<label><input id="extool__goldGift_start" type="checkbox">荧光棒变超火</label>';
    
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
            // 开启幻神模式  danmu-fbb2a3
            goldBarrageHook = new DomHook(".danmu-e7f029", true, goldBarrage);
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
            let fansBackgroundImg = document.getElementsByClassName("DiamondsFansRankList-item DiamondsFansRankList-item--top")[0];
            if(fansMedalName){
                let fansTag = document.createElement("div");
                let fansSpan = document.createElement("span");
                fansTag.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
                // fansTag.setAttribute("data-rid",roomId);//id is same to roomId
                fansSpan.className = "FansMedal-name js-fans-dysclick";
                // fansSpan.setAttribute("data-rid",roomId);
                fansSpan.innerHTML = fansMedalName.innerText;
                fansTag.appendChild(fansSpan);
                chatArea.insertBefore(fansTag,chatArea.querySelector(".UserLevel"));
                // if(fansBackgroundImg && fansBackgroundImg.innerHTML.indexOf("background-image:")==-1){//common fans medal
                //     let fansTag = document.createElement("div");
                //     let fansSpan = document.createElement("span");
                //     fansTag.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
                //     // fansTag.setAttribute("data-rid",roomId);//id is same to roomId
                //     fansSpan.className = "FansMedal-name js-fans-dysclick";
                //     // fansSpan.setAttribute("data-rid",roomId);
                //     fansSpan.innerHTML = fansMedalName.innerText;
                //     fansTag.appendChild(fansSpan);
                //     chatArea.insertBefore(fansTag,chatArea.querySelector(".UserLevel"));
                // }else{//special fans medal
                //     let fansTag1 = document.createElement("div");
                //     fansTag1.className="FansMedal is-made js-fans-dysclick Barrage-icon";
                //     fansTag1.setAttribute("style", fansBackgroundImg.getElementsByClassName("FansMedal is-made")[0].getAttribute("style") );
                //     // fansTag1.setAttribute("data-rid",roomId);
                //     let fansSpan1 = document.createElement("span");
                //     fansSpan1.className = "FansMedal-name js-fans-dysclick";
                //     // fansSpan1.setAttribute("data-rid",roomId);
                //     fansSpan1.innerHTML = fansMedalName.innerText;
                //     fansTag1.appendChild(fansSpan1);
                //     chatArea.insertBefore(fansTag1,chatArea.querySelector(".UserLevel"));
                // }
            }else{//point to a fans medal when room have none of fans medal
                let fansTag2 = document.createElement("div");
                fansTag2.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
                fansTag2.setAttribute("data-rid","4042402");
                let fansSpan2 = document.createElement("span");
                fansSpan2.className = "FansMedal-name js-fans-dysclick";
                fansSpan2.setAttribute("data-rid","4042402");
                fansSpan2.innerHTML = "二九汪";
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
    if(itemNode.className.indexOf("noble-d35c82")==-1 && itemNode.innerHTML.indexOf("border: 2px solid rgb(2, 255, 255)")!=-1){//find self and remove redupliction
        itemNode.style.zIndex = "30";
        itemNode.className = "danmuItem-f8e204 noble-d35c82";
        // itemNode.setAttribute("style",characterStyle);
        //noble icon without redupliction remove
        let nobleImgTag = document.createElement("img");
        nobleImgTag.className = "super-noble-icon-54c62c";
        nobleImgTag.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h1_dcd226.png");
        nobleImgTag.setAttribute("style","margin-left: -57px; margin-top: -4px;");
        itemNode.insertBefore(nobleImgTag,itemNode.firstElementChild);
        //user avatar img
        let userIconTag = document.createElement("img");
        userIconTag.className = "super-user-icon-253711";
        let userIconObj = document.getElementsByClassName("Avatar is-circle")[0];
        if(userIconObj !=undefined){
            userIconObj = userIconObj.getElementsByTagName("img")[0].getAttribute("src");
            userIconTag.setAttribute("src", userIconObj.replace((new RegExp("_middle")),"_small"));
        }else{
            // console.error("未能获取到用户头像");
        }
        itemNode.insertBefore(userIconTag,itemNode.firstElementChild);
        //remove out tail tag
        let tailTag = itemNode.getElementsByClassName("afterpic-f864c2")[0];
        tailTag.remove();
        //transform barrage effect
        let textContent = itemNode.getElementsByClassName("text-edf4e7")[0];
        textContent.className = "super-text-188279";
        textContent.setAttribute("style","font: bold 23px SimHei, 'Microsoft JhengHei', Arial, Helvetica, sans-serif; color: rgb(255, 255, 255); background: url('https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h2_8e5e64.png'); height: 44px;");
        //add tag tail includes fire icon or sign icon
        let afterpicTag = document.createElement("div");
        afterpicTag.setAttribute("class","afterpic-f864c2");
        afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -1px;");// afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -43px;");
        textContent.appendChild(afterpicTag);
        //tail icon
        let superTailImg = document.createElement("img");
        superTailImg.className = "super-tail-6a0446";
        superTailImg.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h3_fd2e5b.png");
        itemNode.appendChild(superTailImg);
        console.log(superTailImg)
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


function initPkg_ExpandTool_P2P() {
    ExpandTool_P2P_insertDom();
    ExpandTool_P2P_insertFunc();
    initPkg_ExpandTool_P2P_Set();
}

function ExpandTool_P2P_insertDom() {
    let a = document.createElement("span");
    // a.className = "extool__bsize";
    a.innerHTML = '<label title="阻止p2p在后台占用网速，开启后直播画面会在刚进入页面时卡一下"><input id="extool__p2p" type="checkbox">阻止p2p上传</label>';
    
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function getP2P() {
    return document.getElementById("extool__p2p").checked;
}
function ExpandTool_P2P_insertFunc() {
    document.getElementById("extool__p2p").addEventListener("click", function() {
        saveData_P2P();
        if (getP2P()) {
            showMessage("阻止p2p上传成功，刷新页面生效", "success");
        }
    });
}

function saveData_P2P() {
	let data = {
		isKillP2P: getP2P()
	}
	localStorage.setItem("ExSave_P2P", JSON.stringify(data)); // 存储弹幕列表
}
function initPkg_ExpandTool_P2P_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_P2P");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isKillP2P) {
            document.getElementById("extool__p2p").checked = retJson.isKillP2P;
        }
	}
}


function initKillP2P() {
	let ret = localStorage.getItem("ExSave_P2P");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isKillP2P) {
            killP2P();
        }
	}
}

function killP2P() {
    let funNameList = [
        'RTCPeerConnection',
        'webkitRTCPeerConnection',
        'mozRTCPeerConnection',
        'msRTCPeerConnectio',
    ]
    funNameList.forEach(name => {
        if (typeof unsafeWindow.RTCPeerConnection === "undefined") unsafeWindow.RTCPeerConnection = unsafeWindow[name];
        if (typeof unsafeWindow[name] !== "undefined") unsafeWindow[name] = MyPeerConnection;
    })

    function MyPeerConnection() {
        return undefined;
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
    html += '<label><input id="extool__redpacekt_room_start" type="checkbox">自动抢礼物红包</label>';
    
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
                    }, 60000);
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
    html += '<br/><label>间隔ms：</label><input id="extool__sendgift_delay" type="text" style="width:30px;text-align:center;" value="0" />';
    html += '<input style="margin-left:10px;" type="button" id="extool__sendgift_btn" value="送出" />';
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
function initPkg_ExpandTool_TabSwitch() {
  enableIgnoreAutoPause();
  ExpandTool_TabSwitch_insertDom();
  ExpandTool_TabSwitch_insertFunc();
  initPkg_ExpandTool_TabSwitch_Set();
}

function ExpandTool_TabSwitch_insertDom() {
  let a = document.createElement("span");
  // a.className = "extool__bsize";
  a.innerHTML = '<label title="阻止浏览器页签冻结"><input id="extool__tabSwitch" type="checkbox">防页签冻结</label>';
  
  let b = document.getElementsByClassName("extool")[0];
  b.insertBefore(a, b.childNodes[0]);
}


function getTabSwitch() {
  return document.getElementById("extool__tabSwitch").checked;
}
function ExpandTool_TabSwitch_insertFunc() {
  document.getElementById("extool__tabSwitch").addEventListener("click", function() {
      saveData_TabSwitch();
      if (getTabSwitch()) {
        enableTabSwitch();
      } else {
        showMessage("已关闭页面防挂机，请刷新页面生效", "info");
      }
  });
}

function saveData_TabSwitch() {
  let data = {
    isEnableTabSwitch: getTabSwitch()
  }
  localStorage.setItem("ExSave_TabSwitch", JSON.stringify(data)); // 存储弹幕列表
}
function initPkg_ExpandTool_TabSwitch_Set() {
  // 设置初始化
  let ret = localStorage.getItem("ExSave_TabSwitch");
  if (ret != null) {
    let retJson = JSON.parse(ret);
        if (retJson.isEnableTabSwitch) {
            document.getElementById("extool__tabSwitch").checked = retJson.isEnableTabSwitch;
            enableTabSwitch();
        }
  }
}

function enableTabSwitch() {
  Object.defineProperty(document, 'hidden', {value: false, writable: false});
  Object.defineProperty(document, 'visibilityState', {value: 'visible', writable: false});
  Object.defineProperty(document, 'webkitVisibilityState', {value: 'visible', writable: false});
  document.dispatchEvent(new Event('visibilitychange'));
  document.hasFocus = function () { return true; };
  
  document.addEventListener('visibilitychange', function(e) {
      e.stopImmediatePropagation();
  }, true, true);
}

function enableIgnoreAutoPause() {
  // 防止直播自动暂停
  localStorage.setItem("freetimed", "1");
}

var isGetTreasure = false;
function initPkg_ExpandTool_Treasure() {
    ExpandTool_Treasure_insertDom();
    ExpandTool_Treasure_insertFunc();
    ExpandTool_Treasure_Set();
}


function ExpandTool_Treasure_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px" id="extool__treasure_start" type="checkbox">半自动抢宝箱</label>';
    html += '<label style="margin-left:10px;">延迟(抢得过快请调高)：</label><input id="extool__treasure_delay" type="text" style="width:50px;text-align:center;" value="3200" />ms'
    html += '<div class="extool__hint">说明：遇到验证码会自动弹出验证框，需要手动完成后才能领取。</div>';
    
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
	let data = {
        isGetTreasure: isGetTreasure,
        treasureDelay: delay,
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

function getTreasure_Existing() {
    getTslist(data => {
        if (data == null) {
            return;
        }
        // let list = String(data.list).split("@S/");
        for (let i = 0; i < data.list.length - 1; i++) {
            let item = data.list[i];
            // let rpid = getStrMiddle(list[i], "rpid@A=", "@");
            let rpid = item.rpid;
            // let ot = getStrMiddle(list[i], "Sot@A=", "@");
            let ot = item.ot;
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

    let exPanelDOM = document.querySelector(`.ex-panel`);
    exPanelDOM.addEventListener(`mouseenter`, () => {
        clearTimeout(exPanelTimer);
    });
    exPanelDOM.addEventListener(`mouseleave`, () => {
        clearTimeout(exPanelTimer);
        exPanelTimer = setTimeout(autoCloseExPanelHandle, 800);
    });
}
function initPkg_ExPanel_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-panel";
	a.innerHTML = `<div class="ex-panel__wrap"></div>`;
	
    let b = document.querySelector(".PlayerToolbar-ContentCell .PlayerToolbar-Wealth");
    if (!b) {
        b = document.querySelector(".PlayerToolbar-ContentRow");
        const domPlayerToolbar = document.querySelector(".PlayerToolbar");
        // 获取PlayerToolbar的高度作为bottom
        if (domPlayerToolbar) {
            a.style.bottom = domPlayerToolbar.offsetHeight + "px";
        } else {
            a.style.bottom = "76px";
        }
    }
    b.insertBefore(a, b.childNodes[0]);
	
}
function autoCloseExPanelHandle() {
    let exPanelDOM = document.querySelector(`.ex-panel`);
    exPanelTimer = null;
    exPanelDOM.style.display = `none`;
}

function showExPanel() {
	// 显示功能条
	let a = document.getElementsByClassName("ex-panel")[0];
	if (a.style.display !== 'block') {
        a.style.display = 'block';
        clearTimeout(exPanelTimer);
    } else {
        a.style.display = 'none';
        clearTimeout(exPanelTimer);
    }
}
function initPkg_FansBadgeList() {
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


function initPkg_Fkbuff() {
	initPkg_Fkbuff_Dom();
	initPkg_Fkbuff_Func();
}

function initPkg_Fkbuff_Dom() {
	Fkbuff_insertIcon();
}
function Fkbuff_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-fkbuff";
	a.innerHTML = `<a class="ex-panel__icon" title="FKBUFF - CS饰品议价交流工具"><img style="width:36px;height:36px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAC91BMVEUAAAABAQImIyMzMTASERAbFxUCAgMLDAwVFRUCAgIDAwMDAwQCAgIGBgYEBAQNDg4GBgYdFhMcGhkeHBwKCwsEBAQFBQYICQkUEQ8EBAUFBQUICAkKCgoLCwsTExNVJhIIBwcKCwsGBwcHBwcHBwgICAlSJRMICAhNKRlOJBMJCQlQKBhPJxdLKBsAAAACAgE+Pj0/Pz48PDs8PDz+5Mg6OjpAQD/+5Mb948X94sf948k4OTk5Ojk3ODcxMjEwMDADAwP+4sQzMzMuLi42NjYFBQUKCgr+48b+5Mo0NTQNDQ0sLCwHBwcQEBAaGxoTFBQXGBf/5skqKiokJSUnKCjKfl8dHh3/5cYiIyIgICDJfF3Nf2DGel3/5szBeFz/6Mn83sL+j7D+4sb23sLy2r4JBQT9k7PMgWTQgmK8eWAQCwr+4sH+lK0dEhD/6cz+5si0pI/Gf2I0IhwpGBLFtZ6ml4V6b2JzSjk6NjInHR4gFhX91M7o0bbTimzShWWwcVhoRjhZOixPMyhGLiQYEhL7173s1rn9mbThyrDVwKi8dFeWX0h5Tz5JRD0xLCn+ztD+5sr8oLb8nLbcxq79iaisnoqekH5cVU4+Jx/81MPjzrSLgXKEeGvCfWFvZVmobVX7wcD7vLf9j6bNu6L9haLPh2llXVSdZE2raUyBVUJsQzL93Mn7yrahaFJUTkYYDAn7z73+lbb7sLTkf5r1gJbWfZSTiHiMXEg/OjWWSSwoJiP7ycD8prj/ia/5rK2uZHjYlHW1dVx3R1GzbU5FPzljPzA2Mi3////3xaz6manwiaS8q5b2e4rScYnke4afXXFdOEBUMjn8r7z5hJ/4hobBc4XgoYJOSkSsWzqeVjlILTSLQicxHyRAHg/+4M36lKX3p570lpSvXmaMVGOZX1SCT1BvQEby8vHn6Oevr6/mtaDRsJzarpO7aYDMaHLGjnF8dm7GhWd9SjU8Ky2goKCYe3C3hGp8NxrV1dTpwL/arrGMjIzPooh7AvHQAAAALnRSTlMA+wsGNyHtURv35N3ystZHqi4VEWHOuHU/yL5+bVkm/p1npJaQiOqDYseMmZBTeywgmAAAGAtJREFUeNrEVttO20AQJQ0hARpIKZcWSgWliLdNCvLTeh3LN8nXWLZlJf//I50zS7ZIvCSB0APZrEHJOXNmZnd2NkSXsPOf0O31L26G5+fD0c3Dbf/L4IOFnFyPDjpjsURn7+j87se33qedj0H39KxDtG4YEbJwKeTz4fl9v/cBVny92xcinLWN73ie5/hV3ZZ55movDoYXu1s2ovt7LLI2jQMVBEoybBk46ZxUwIzx3uXF7jZ92N0TYRPHJECB25YA75TTFEkoCHvD297OttDvCDcvmpj4bcuybAN6eLSCaT3LUCCHv7dlQ+9QgKCSEoSPoMWCN72RTj0LYcPoeBvV0PtxAP58KsH4RC9aAV4hgbyQfpugL4bH7+zCp+MbxJ+VTUz8T5PJ04Q46Z1AK0CaOC1xnY9Jwq/d9+y/6/PPVOVJ68cK8U8mfyavAVNYQ8ASDh4G70V/+r2D/kf5KY6fBBgF2PHCidDlQC4gEWf97nuY378EfZkq26aOA7/m/YMFeOEHcoNMSOktqCX273pvb/7RPuh9ZS0L3kSu+Z/3RoCRMC1dMuH4je5fUeW7ZRpQ5+uqNwKebTAbs9MKLClVHVFLXnTfEv4lFVPSBEoidt1xL9wGDGAIv2kPYILtlGPRuTvZ/O6j8MPW4YOPqA0mZvO8fdUOEICGUAtKw2iwYfU9UPbzKgg4fI6dLeDF0ukADwN/XNJjj4OS89BQLV7+3Cj9Ny5l3wmUovSDU1NrTpQjh8k3ga0fGVrPsmJJQZpspuDkF9m/4JtPlx9+rZeAwwEhxuVssqTZIQo77gYoGKzNPxIiqwN8t7ltEC9DxdOqXhTlLM8TIM9nZTtvfA8ywClt7AB8BgpGX9fM/w3xNwgf/Lqi8NUqcCqaP6LQFa8wdrNkVtSppySA3LBu9mB8v17937siq8Cvc8yrJb2mpQnM8IVhFmlkoWsUudFsUWkRrACOpJn4fL2OgNt9ETaK+S36ocglzRtlpFk40nlT0WQYowbimObDtFkUswTyWERZT3F46UJVsnbF0Zc1zp8D4c4DxQnQSce0w2GHSTmvHHSmqUuUm+5KW3k0ICYhD4jZrHa4PZA5VVAZfFq5AIZjUcRagCQD46qMwE7ktR/r8lr2/hPvTW9i4QHRhYaorAKbD+XAy0XndOUEdEQyhQBIUN48d3kSalFe9vJUYtAQYpRgw4Avgd8+f2ruET+1axOKsxV7cXDEw2/AcBbJGLEUVawktwQfvGYUYnr9YE4qflkqbSPkImqnqBOvFOJqNQFXY1F6urymiwjWUzaV7qslmwE/v4a+C+KGZ9So8GPPo044XOlA/HkoopQExLEzT3gMrPQgDnPN5QtMDP5tzX/0sSn9giW0vuMUsGA1A1qH+L0Gg11W+By8vg6YgEmMArN/+cQmcIc8WlMtYZFWkTgarFQBWfWXEWtbaRgIoggq3qpUvIL44AdMBNEXbRNsEqiSCykU/f8f8Uxm97gxie15sWNhz5nZmdmZzhGxOrFJiG3eExC0X178P9RwH31COAlR8VXLzhbd6CKROp7Pv3KRqGpmnIRCdjrt+VsFtKjAgDgsKvUGCfGwuQdcSbKKW/fz1XKm9H7i+EtB00CL4VAJLh/fGk2nSI4PtlhAPz41+ZIyxiSAKcOleXt4jxEGTENfDCsCEtJvTYXDjTPqnUi5zuB+OwiC38P79mgkpKFFdYRXgBhqQi4KKJicb3gGJ5IVCW4/1uQzAbxuHAlrXABNwofBFKTq2eR+0wIcIfzr1NoOBQDm0ZgA/LUr6gpghdqYrJlwefOfgLND0UnIxnB3Ab265+mhwRToCwD8tjKvRI7+q8Vr7RkN+C33CQoIYmB6uhUwfAvsjdhb14nsjyuY3op8LFD83H8CATR4Ji8o+GJEAreVt1U2/iZML0WKGG8eo0+QhdADXZVqtY9rsCRwvyjgNf0WuR7pAeCv3q3zdpj4wcOWH4Cvb0cyu0NYjaYTSHOZDO6LN6eO3zfewFdj5y7UAQckG0x8HPpZ4E55ruT0fMj/45b/+QkCeLWh327C1QYBqKGTjr4WXESCBZplwRrhYbUc7Q28grfgx8AXFj/vGgCFsivn8l1/Iy3rouBS0sTLmdvR/A26pkX89qRS9qcDBRhJwfiHmW5B1tFc2TH2lkXulwMiynL9BTd9BfQQntITAKzlZLffg/EKNqTvCFBy8z1euZlbkf0QZiYvTkRBGEdwwQVF8SLu/8BrwZZe3DrRjBlHZozaOnZ3clBDLxAxiRoVs7aIdqIIogYx5iAxC4Y5xtwShoDgXWYYvHlSQRTUiwer+kmrJOIj5JKE7/eqXn2vqjMmMcxRiAMdBmjPPnli3+9pcueQb1KE02T5sBuuW00OH/yz/j0Dg75qL1WfGmOojpUo5JrFXJR5dPv+7WcXXz/Mv00kLfohjiR7wce9HmLIDnZME2b98BFYSabcOfyvPg/1MfYHxycmqbqVyJcG9XitVmvORJ+eC7OhU6HzZxsL82a19RYh6DgwDmaCx/EPgt9mepwwm0YCeAbkJQKnHUw87W6lmF2qVuL1LMh/zkWtJ2dZQeA4jhX7C/Nybfb7fLtZuBag48A+2I6XBqyC/wAsWQEA+BOv8nfSrhLkj01JuHe7mY3rum5G0ul0Jc/ceCiwPA/yHBv+tNDVas73biUe73fyMULHATcKFOFPgtEAW1aQo3gEqFm4jgLqoD8+cRRbymuDdtaUVV3vpTOZdLZMrl5gWY7nBCBgz3/sdiM1ZWHBiePKpmIBiuBuybMVwPg3wNqlZNLtvT3Po66z7+QRlM9V+81mRFVrb95kMplikrx8FhI5nudZjMH5W/NdJ2N82VpUZVmO65XWwB5zEfwQBc/YaBh2jgZYvAoAKC6VpzPlMWyjYrmq2bFboJ8GfUMuWdKjWyEB9XnhEM+J4XON7qyRSZGyhgSyWiy03xUsAlfr8YOA4F5ZXg4QYPvwRbCcnKQ9EL1nXNfzYw9l5dvmu0Lyi6aqvTe9TMbJS9aTcyEB5c8IgsBzwXvit25Dz9Sj0aLhAjjJRD9etyF40tQEzPLeYQT90QD4b8jpXRgtevbd508HphjCJDpmNhdLFhVZ7fXShlFPkKuXBEg/BfBBDMTg+R/dOV3/fJXYMg1BSbJNPd5J4Gx10g/dNSWgTd1IgO2EHKcBcM0Poj9+4jBsP5c1O4loYVZRZAPkldIMufMs5Omf8fnOCFwwfH9+TtZ7T4lVN2QFVqRM8hpUTCqGM9GEWw/eE+YTo4xoI2FO4OhNA4DFNw0BTML2B9ZMKoK7Ug2jYTPW5Zv0+MESBJ/g8/kEkT3XmJPl3odJYisIoGntGDNQoGirhQAEYZqmgQJABKRhgG1EmgAA+Ba63+6DfujdGLtqtsvRcl2m+pHUDLn7QGDRfCjArwXn8NOcIqdfPSWBpor6Ea0UkFoq5KPSvIaPu/Gep/bmAmweNQ/sp1Xg6Qfy/UonOdNyXH1DLSbI2PP7EH5crj536BAv8gIrsuGPc4qafvXhNIk1UB/WgImm4EQoctWWoNM78Nvnp8miZUPPZTeQMf8ehMT62+uflMiRnFkpxcpFTVMU2H+1ECV3L50NoToFgMiLh0R8Bdnw9VkEePE1QMoO6MPqF0i0pcmKppilGzhqQRZogBFg+CrAyxDrEPuc8ZOgn6pUcomSowCALEMhkGuXH4ddcQoAbwAAECLLBoPCZ80AgPdXCCk4GuZAc2xGyjuYkDiUDglM74UU4zpNFq0ZYYQ/CbXOmKaiKByNMzHGveKKcf65708TWoy2pbZiJ63VUhWKKU7QoqhAcQvGPSKK26jEBaJRHHFg4sIBCIIxMe69Na44/vidd/FZ6QU/UyzlvX7fGffc8857DnRXfCY4DDP2cWnTJq1ImzdhwuhR8ReWL5gisXG5KUsXq50+J9ED4Ifv8aI30XFvR02c8/pb2r1xTFqYdmkBcGA+DN94YfQo6JmHXMT1FsKAtT4S/YDgiiiGpnJUf2igpZu/bduOHSOmzVuetnD6lHFYS9QHZK0q3LoeKnweEoC9APUAAlS0HyXOmRiPDfkQjlWgwyt1xb74MQjI/MlMsg+Seyu7oCNqh7nMwEG887CY4MZJ8csu7E1bBO5aMGZd3rNhqd/pIdM1kRGRkbQonGuWfJi475COCXAI22j8pEkrYNZwubeKEfSEfVCHqN8FP12+TZ+3bN+njZP/stqoAVVG1LrgyuPQQOuBtsShTv+M7asOzl1u5GNasyMmxm6nYXrNGbrUA1jQ+DpzFFnoEHTFrVAGqONGAR4pseDefQdSQ6wxx7pkuId7lecF7IUzZycmJvr9fo0/pdDGxi2fe0JiOjMNkS0Wi8FCcGHUQaAN7WAQUaQBdJQ5/LqgYWdmxUCEHOAyMtOKtFSJKcCoyFADrVZrcY808c+trvT0kycvrswtBAsJSEPdl9kVAeBXkJpFsjF91JpYl4aClhTDQJJnQwA26kKDbrcQMcdgrYFuywqg2x+/0Tbc5bIYOMh+9BKAycoU2DB+dOlYL1FDhuci4ACvhDk3C4EpFvzEzGGIJfslQP7J/orJmu4l62U3yQLcDtkO76tXt41KMLVRw+jiVNSQDSG4TewfSDY3vnFwDRAAu5E+DYWi1Evs8tGyAreNfz7wRcmLX44/AjAxdbAWnQQCbIOHDdParbX8arfIjh8cxfld6BDEAnQON9HTwVwA9xSlyscXJSWv7DXx9BpQZTq3DZsOdkGVGOw2K4bXpFmsYrz8rcP5AVKYAGSfi/P/OVTxFEj3vCwp+VLjWslsE44HmraADUbOrMDshulRCr0BOUUQuN883KLwA9xTfw/JfVnyMpYp6NxMNBxqwYCTs5QY0C1rLfi5AtC7YnRienK/HHyFX/ZU6GG5379w53lXWuu6d9O1AWOFmxNvM4A71SDzcwWUU5Ig+vIPM9wfyu+1hgm1g5/w0b/Bzhp0rGNKf3GzM25zrk1xP/FzAcrqCwVEVjx9+iyIEh/Kb4Cn6looe2Y741Iwn2gtnNLHzPBoVHGa4xQ+h4XYFQFyTkm1wFhlaXV19XPGYsD/J1XcNn6kSMF2P7bvuC0S6yN8SCmXttjA1BQjDarBj6LF+bUWh07Eb3z86OGj6scmTBYhgGeql3tKLOG4UwMBm0+x9uEzon5MN9NHTYZvhpnZUC7AT6AEgFEifpZRXqBWPyyfzqRY+J/KdO06pdOFnAAGZ4QqWuXZw5o0EnTFphlyv+dcZ2cmCgDnh/08/AKLnoE/cLj6GQ0XtWS+28ETUwjkFRgCgQjfVvSE4QLwZx8JUCWmI6v+CtCiPxVHNfhGr1dHqB++n4ITwB+y+sQCTm12qgIB1dQtYW050JtZUyAACGzHqoEAngMWMkoc0+0JevXQiMCV0ufUdWuV1ScGVQPNmjVrVNFTZ4k80JWxrb6IgEqVf3+9FXtGFIdbaBTPgKWwHy1xwiNygddAnhJzKykQd/9+tCo6slA0JevUgqUv9gQiM1ev/rGKSV5eA2OFRvEa8DVJL/fGmuLS8/jVJtXJL2ciFK/LBKKnLvFiFYhuVhmP+wL3VwNbadsUlZTQEnj+SpLMHxF5uKh8I+MI4w095fxNLmCrJPUWVMJuuD7f7YvOhICfGcgCXlLE/EDFo2xcmSMGqkj1w1IEAag/A4LHzmSuzsyfOsMuWoVwQSvG0pf6KAabZkm4axJrqoe/snwnAkAK0J0fLip9nFW/Avzl2a4j+Zn5zt2rGAqhCN0xrHet9zvz8z2vPyOoxnr5ryZgOKPRYBmoNOpiKMhQFIjPuXN012GP0z8T23IHZIAIjTCuNxWmLPZ4sm8FGYfwu6zPy6sKaDpEF8gIgTr7QVFRWaWxnlPY3bK8nf51M2k37tK4zhs2HRgkpM9amlR8TqiAfxS8UVRVnKDXYEDEx1R6fcGuqryiJ3clxiHgv5W3c8PFkUjq5j3ruXnapp/cluxJyn7w7i7jqM1vqijLy7uajSKoxwugGUnCzl05OTlHn9w1shAoZ+kqy/KKsy/iXYPO3ep9uK5139SWzdnJxKSCXccqrCwcpjvnqnJykk9T/kEB/sM/CEjYmTx2LCTcqMySWG0EnxSBf0kGa9Kr6X+eZ+rfY0DjVsy+Tp9U8KDq3J3J7B9YM56/u3b27NhkrAByP3fBULzFu9Nrx49PTk5+cOxGRUZob2/MOF+Wl3MkO+k6v1VUP35Xb3UvTUZhfC2nlX1JX5aVpWVltW4G2/tebRd1RmT13nTsYvgylzeGCm1jwS5zzgvFzTbRiUwFb4TygyRUEkIGKmEIEnTbdRD0D/R7nrPKuzW1oB/7VPT3ez7Oc97zvOdcr77Os4KEgpWx1c33319gfYktS/cann9+vzT7EvTgNzWCR8kQ9IJ22eBGsovRsrr55eP35y8A/iNEbNQ0ZeYPNlBYr1VftVy4ZR+WHk9r5wy8uvpmc2l9fX3p6weQgx3oyiIBCdyjouUx1un01cwuJpOJZBI6pltWZ98As6vIjRWY3+pp/lT41jlSoK7Ceu2JvaeZhljr1MzTsTGo+I2WlpbFKROmK3rqzuhoUwj0aXR8msxuLCaUBISDMLbybrSzFRGS3fd5TVwwBay2utf2h+PSRQrMqZmup2D9helEFvRwgNC4TQ7z80/d6/U1GY7JBWiACKhIJBZnRhc6TTVUfHNue62lEG5U37CUVD+zIwac5hSI7EwiOc3oSmwsMD2H3skNIi+LgP1en5761m+QPyYHFUxw41/wjCUDbykChVPgJryAPlMu6ncJITSS0GoOLmSBhalBE9/9VH+Esh9ux/zOAnx6+q59Qvfq3DcCJat0+VU/UW/q4KZAAdjq6mwQcB1Ny7Qk4cIlQLkFWh7CSbZz5KlJBffHwrh0CZM7kBoOfhf4LUJF/8eLFHRfLLyL9MZVVMPKvWiZRWLCRfdD4AMGjTnOPV2j6oOIex1ETi0qo60tFoqg/vTEhcZNOxYgODvAjkdT6g5dhPz5bjq7e05qLgKY4XZ8ht/BD0KIor5gX1+7wXDGgpnIPVr2DAkN2shwgC5VuImHABhDuSL20gFHDtobu6WLAXrMN6DmzIfNZLa3z9cXiA7Fu4OpzEAvX7j0hgJ+DeAJEkFx5ruo9M0Vxt4RazE7OmuxUA0IpYA8IWAYmS+EDtNIQFswMt/46MFdt6q3vZk4ZwgLcPLAZHL4RHcYqQb7geJOG9iwoy/jEsTMPgepcFLKIcXZQF9bZksXaSAU9fgxPFULWwc9P6CB1Brj6E6fLYqfGxYPOiSNYAqiE1HV0BYFNYD8a+9r6+6Zn5/vjXwayazFTeGnDBVOjRSo0kA+YPj60cCuKfrMyRW3vTEoaSSQGbBcdwoyy6sk+Hy+5mg0Ggs0O6UDYxUDHr6HBnIWxx5v5DMkYA96IrbiN3YfRV5RRSYfYLIhKG568sMhyUjOEioN7C4qkYLZHRD8k//wdo6b7DupFFBDWuMoYMphZtYB88BG4aGBysURQuEEQbzkfahB/vWD/8D2DjnYzmA5uSappOpQwPclsLTMgwRQUPI3b2iYwmgqv/hAYjWCEcxtmx8K4IP7aVPA9zAJVCh/fcoBHGHwQgFe/bh/ly/LeCMB8BdESVcIXdHy7fIjCsiDO+GoZJdy/Dn0gAoC57oGAcSPnysBgt0PHQbPDydKdnLCpH4/WndrLkNTnAywAGqoU2XUyOSf45O+IxkA6Qwuo31/6PwODzjS3p5wXEqNeYnBq5zBLFBB5EwPOUoVTRiOpugwNhKXVh2z7BAVh/ZgNKRjUhIT2a/mO11ZrT6yDq7RGAQ0Xo1AKEctUYR/x7CehRPckTQ6fLCfrVblSUcGMj1RokgLNVMKIY1AavkezK/fpaNe52tLMd3kMv0uw2AJqDU05ZAAzkKMBrwInjuFdMbn3oJ+/6FKy66hsoaWbI8mOqLtTQYPdtjK5RagCZABDVLG1kYa3aA/WWbd1dOmlTWlfJdoItXfbBhSeDD3szfwQnI8EmiOd4zk7vBpw92lZwkl9YeRjjj31BMOjUcDHmk0MdrwlGYgHgyFex6rI5+1laD/C9h3rqYcGkDRML88EM6kUx1AKj03PPIq8lhdmuwpP3rcZvl7sJXVni791QW4TXBvOYV9+tI/OP58rOT4pTPlpfvdSoeiPnjgxNGqsgqr5R/Buq/iyLmLp6ou11+qv1x16nhZie2Y5T/FD20ZaW0SClivAAAAAElFTkSuQmCC"/></a>`;
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_Fkbuff_Func() {
	document.getElementsByClassName("ex-fkbuff")[0].addEventListener("click", function() {
        openPage("https://fkbuff.com/");
	});
}


let followListHook;
function initPkg_FollowList() {
    let intID = setInterval(() => {
        if (getValidDom([".Header-follow-content", "#js-backpack-enter"])) {
            followListHook = new DomHook(".Header-follow-content", false, handleFollowList);
            clearInterval(intID);
        }
    }, 1000);
}

function handleFollowList(m) {
    let active = document.getElementsByClassName("Header-follow-tab is-active")[0].innerText;
    if (active === "特别关注" || active === "视频动态") {
        return;
    }
    let panel = document.getElementsByClassName("Header-follow-listWrap");
    if (panel.length == 0) {
        return;
    }
    // panel[0].style.marginTop = "12px";
    document.getElementsByClassName("Header-follow-listBox")[0].style.display = "none";
    setNewFollowList(panel[0]);
}
async function setNewFollowList(panel) {
    let loadInCurrentPage = await GM_getValue("Ex_LoadInCurrentPage", false);
    let followList = await getFollowList();
    if (followList.error != "0") {
        return;
    }
    const FOLLOWLIST_LIMIT = 10; // 关注列表最多显示个数
    let limit = 0;
    let html = `
        <div id="refreshFollowList" style="color: grey; position: absolute; top: 0px; cursor: default; display: flex; align-items: center; justify-content: space-between; width: calc(100% - 10px); padding: 0 5px;">
            <label style="display: flex; align-items: center; cursor: pointer; color: inherit;">
                <input type="checkbox" id="loadInCurrentPageCheckbox" ${loadInCurrentPage ? 'checked' : ''} style="margin-right: 5px;">
                在当前页面加载
            </label>
            <span>长按弹出同屏播放</span>
        </div>
    `;
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

    const loadInCurrentPageCheckbox = panel.querySelector('#loadInCurrentPageCheckbox');
    if (loadInCurrentPageCheckbox) {
        loadInCurrentPageCheckbox.addEventListener("change", async (e) => {
            const isChecked = e.target.checked;
            await GM_setValue("Ex_LoadInCurrentPage", isChecked);
            showMessage(`【关注列表】已${isChecked ? "开启" : "关闭"}当前页加载功能（${isChecked ? "当前页面直接加载关注的直播间" : "使用新网页打开关注的直播间"}）`, "info");
        });
    }

    let followListItems = document.getElementsByClassName("ExFollowListItem");
    for (let i = 0; i < followListItems.length; i++) {
        let cclick = new CClick(followListItems[i]);
        cclick.longClick(() => {
            createNewVideo(videoPlayerArr.length, followListItems[i].getAttribute("rid"), "Douyu");
            document.querySelector(".Follow .public-DropMenu").className = "public-DropMenu";
        });
        cclick.click(async (event) => {
            event.preventDefault();
            const shouldLoadInCurrentPage = await GM_getValue("Ex_LoadInCurrentPage", false);
            const targetUrl = "https://www.douyu.com/" + followListItems[i].getAttribute("rid");
            if (shouldLoadInCurrentPage) {
                window.location.href = targetUrl; // 在当前页加载
            } else {
                openPage(targetUrl, true); // 在新页面打开
            }
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
function initPkg_ImageDanmaku() {
  initPkg_ImageDanmaku_Dom();
  initPkg_ImageDanmaku_Func();
}

function initPkg_ImageDanmaku_Dom() {
  const chatTool = document.getElementsByClassName("ChatToolBar__right")[0];
  const dom = document.createElement("div");
  dom.className = "BarrageFilter";
  dom.title = "添加图片弹幕（仅安装插件的用户可见）";
  dom.innerHTML = `
  <input id="ex-upload-image-input" type="file" id="ex-upload-image" style="display: none" accept="image/*">
  <svg id="ex-upload-image-svg" viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21426" width="18" height="18"><path d="M864.896 639.68a37.76 37.76 0 0 1 37.568 37.568v112.832h112.832a37.76 37.76 0 0 1 37.568 37.568 37.76 37.76 0 0 1-37.568 37.632H902.4v112.768a37.76 37.76 0 0 1-37.568 37.632 37.76 37.76 0 0 1-37.632-37.632V865.28h-112.832a37.76 37.76 0 0 1-37.568-37.632 37.76 37.76 0 0 1 37.568-37.568h112.832v-112.832a37.76 37.76 0 0 1 37.632-37.568zM930.688 0.384c46.656 0 84.608 37.952 84.608 84.608v474.688a37.632 37.632 0 0 1-75.2 0V398.208l-377.088 304.64a84.352 84.352 0 0 1-94.4 8.32l-1.28-0.768-209.216-127.616a9.344 9.344 0 0 0-7.552-0.256l-175.36 125.632v147.712c0 5.12 4.288 9.408 9.408 9.408H595.2a37.632 37.632 0 0 1 0 75.2H84.608A84.672 84.672 0 0 1 0 855.872V84.992C0 38.4 37.952 0.384 84.608 0.384z m0 75.2H84.608a9.536 9.536 0 0 0-9.408 9.408V615.68l135.552-97.152 1.792-1.024a84.032 84.032 0 0 1 82.432-0.256l1.344 0.768L505.6 645.632a9.344 9.344 0 0 0 10.048-1.152l0.128-0.128 424.32-342.848V84.992a9.536 9.536 0 0 0-9.344-9.408zM282.048 150.784c72.512 0 131.584 59.072 131.584 131.648a131.776 131.776 0 0 1-131.584 131.584A131.776 131.776 0 0 1 150.4 282.432c0-72.576 59.072-131.648 131.648-131.648z m0 75.264a56.448 56.448 0 0 0 0 112.768 56.448 56.448 0 0 0 0-112.768z" fill="#BBBBBB" p-id="21427"></path></svg>
  `;
  chatTool.insertBefore(dom, chatTool.firstChild);
}

function initPkg_ImageDanmaku_Func() {
  const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
  document.addEventListener("paste", async (event) => {
    if (document.activeElement !== chatDom) return;
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (let index in items) {
      let item = items[index];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        chatDom.value += `[DouyuEx图片上传中]`;
        let blob = item.getAsFile();
        const url = await getUploadImageUrl(blob);
        addImageDanmaku(url);
        break;
      }
    }
  });

  let timer = setInterval(() => {
    if (typeof document.getElementById("js-barrage-list") != "undefined") {
      clearInterval(timer);
      new DomHook("#js-barrage-list", false, (m) => {
        if (m.length <= 0) return;
        if (m[0].addedNodes.length <= 0) return;
        let dom = m[0].addedNodes[0];
        const contentDom = dom.getElementsByClassName("Barrage-content");
        if (!contentDom || (contentDom && contentDom.length === 0)) return;
        const text = contentDom[0].innerHTML;
        if (!text.includes("[DouyuEx图片")) return;
        let newText = text.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
        dom.getElementsByClassName("Barrage-content")[0].innerHTML = newText;
      });
    }
  }, 1000);

  let timer2 = setInterval(() => {
    if (typeof document.getElementsByClassName("danmu-fbb2a3")[0] != "undefined") {
      clearInterval(timer2);
      new DomHook(".danmu-fbb2a3", false, (m) => {
        if (m.length <= 0) return;
        if (m[0].addedNodes.length <= 0) return;
        let dom = m[0].addedNodes[0];
        if (!dom || (dom && !dom.innerHTML)) return;
        const text = dom.innerHTML;
        if (!text.includes("[DouyuEx图片")) return;
        let newText = text.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
        dom.innerHTML = newText;
      });
    }
  }, 1000);

  document.getElementById("ex-upload-image-svg").addEventListener("click", () => {
    document.getElementById("ex-upload-image-input").click();
  });

  document.getElementById("ex-upload-image-input").addEventListener("change", async (e) => {
    chatDom.value += `[DouyuEx图片上传中]`;
    let file = e.target.files[0];
    const url = await getUploadImageUrl(file).catch((err) => console.log(err));
    addImageDanmaku(url);
  });
}

function getImageDanmakuHtml(str) {
  if (!isValidImageFile(str)) return "";
  const split = str.split(".");
  const url = decompressImageUrl(split[0]);
  const realImageUrl = DOMPurify.sanitize(`https://img.douyucdn.cn/data/yuba/weibo/${url.slice(0, 4) + "/" + url.slice(4, 6) + "/" + url.slice(6, 8) + "/" + url}.200x0.${split[1]}`);
  const imgHtml = `<a href="${realImageUrl.replace("200x0.", "")}" target="_blank"><img class="ex-image-danmaku" src="${realImageUrl}" alt=""></a>`;
  return DOMPurify.sanitize(imgHtml);
}

function addImageDanmaku(url) {
  const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
  const split = url.split(".");
  chatDom.value = chatDom.value.replace("[DouyuEx图片上传中]", `[DouyuEx图片${compressImageUrl(split[0])}.${split[1]}]`);
}

function compressImageUrl(text) {
  let number = BigInt(text);
  return number.toString(36);
}

function decompressImageUrl(base36Str) {
  const base36Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let decimal = 0n;
  let multiplier = 1n;

  for (let i = base36Str.length - 1; i >= 0; i--) {
    const char = base36Str[i].toUpperCase();
    const charIndex = base36Chars.indexOf(char);
    if (charIndex === -1) {
      throw new Error(`Invalid base36 character: ${char}`);
    }
    decimal += BigInt(charIndex) * multiplier;
    multiplier *= 36n;
  }

  return decimal.toString();
}

function getUploadPreRequest() {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: `https://yuba.douyu.com/wbapi/web/image/preRequest?source=&timestamp=${new Date().getTime()}`,
      responseType: "json",
      headers: {
        "dy-client": "pc",
        "dy-token": dyToken
      },
      onload: function (response) {
        resolve(response.response);
      }
    });
  });
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

function getUploadImageUrl(file) {
  return new Promise(async (resolve, reject) => {
    const preRequestRet = await getUploadPreRequest();
    const preRequestData = preRequestRet.data;
    if (!preRequestData) return;
    let formData = new FormData();

    for (let key in preRequestData) {
      formData.append(key, preRequestData[key]);
    }
    formData.append("file", file);

    let request = new XMLHttpRequest();
    request.open("POST", "https://img.douyucdn.cn/upload", true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        try {
          let json = JSON.parse(this.response);
          const ret = json.uri.split("/").pop().split("?")[0];
          resolve(ret);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("图片上传失败");
      }
    };
    request.send(formData);
  });
}

function getImageDanmakuFromImgSrc(src) {
  const split = src.split("/");
  const url = split.pop();
  const split2 = url.split(".");
  return `[DouyuEx图片${compressImageUrl(split2[0])}.${split2[2]}]`;
}

async function initPkg_LevelTask_Timer() {
  checkLevelTask();
  setInterval(checkLevelTask, 35 * 1000);
}

async function checkLevelTask() {
  let ids = await getLevelTaskIds(rid);
  let tasks = await getLevelTasks(ids);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskId = task.taskId;
    const taskName = task.name
    const taskStatus = task.taskStatus;
    const prizeStatus = task.prizeStatus;
    if (taskStatus == 1 && prizeStatus == 0) {
      let result = await finishLevelTask(rid, taskId);
      for (let j = 0; j < result.length; j++) {
        showMessage(`【等级任务】${taskName} 获得${result[j].name}${result[j].num}`, "success");
      }
    }
  }
}

function getLevelTaskIds(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/interactnc/web/userLevel/userLevelDetail?rid=" + rid, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(res => {
        return res.json();
    }).then(ret => {
        let ids = ret.data.taskIds.join(",");
        resolve(ids);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}

function getLevelTasks(ids) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/tasksys/userLevelTask/getTaskStatus?taskIds=" + ids, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret.data.list);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}

function finishLevelTask(rid, taskid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/tasksys/userLevelTask/getPrize", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&taskIds=${taskid}&roomId=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret.data.list);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}

let myLastBarrage = ""; // 浏览器弹幕框中的最后一条自己的弹幕内容
let barrageSendCheckTimer = 0;
let barrageSendCheckTimer2 = 0;
async function initPkg_LiveTool_BarrageSendCheck() {
  myName = await getUserName();
  let timer = setInterval(() => {
    if (typeof document.getElementById("js-barrage-list") != "undefined") {
      clearInterval(timer);
      new DomHook("#js-barrage-list", false, (m) => {
        if (m.length <= 0) return;
        if (m[0].addedNodes.length <= 0) return;
        let dom = m[0].addedNodes[0];
        let isSelf = dom.getElementsByClassName("is-self").length > 0;
        if (!isSelf) return;
        const contentDom = dom.getElementsByClassName("Barrage-content");
        if (!contentDom || (contentDom && contentDom.length === 0)) return;
        let localLastBarrage = contentDom[0].innerText.trim();
        clearTimeout(barrageSendCheckTimer);
        barrageSendCheckTimer = setTimeout(() => {
          if (myLastBarrage !== "" && localLastBarrage !== "") {
            let data = stt_deserialize(myLastBarrage);
            if (!data.txt) return;
            if (data.txt.includes(`[DouyuEx图片`)) {
              data.txt = data.txt.replace(/\[DouyuEx图片[^\]]+\]/g, "").trim();
            }
            if (data.txt.replace(/\s+/g, " ") !== localLastBarrage.replace(/\s+/g, " ")) {
              let contentDom = dom.getElementsByClassName("Barrage-content")[0];
              contentDom.style.textDecoration = "line-through gray 1px";
              if (contentDom && contentDom.parentNode) {
                contentDom.parentNode.insertBefore(createBarrageFailDom(), contentDom.nextSibling);
              }
            }
          }
        }, 300);
      });
    }
  }, 1000);
}

function createBarrageFailDom() {
  let span = document.createElement("span");
  span.textContent = "(可能发送失败)";
  span.style.marginLeft = "4px";
  span.style.color = "gray";
  span.style.fontSize = "9px";
  span.style.cursor = "point";
  span.title = "该条弹幕发送失败，不会被其他人看到（可能会误判）";
  return span;
}

function initPkg_LiveTool_BarrageSendCheck_Handle(text) {
  if (getType(text) == "chatmsg") {
    if (!text.includes(myName)) return;
    myLastBarrage = text;
  }
}

let barrageSpeed_count = 0;
function initPkg_LiveTool_BarrageSpeed() {
    // LiveTool_BarrageSpeed_Dom();
    setInterval(() => {
        let barrageSpeed = Number((barrageSpeed_count / 5) * 60).toFixed(0);
        barrageSpeed_count = 0;
        const dom = document.getElementsByClassName("ChatSend-txt")[0];
        const text = `弹幕时速：${barrageSpeed }条/分`;
        dom.placeholder = text + " 按↑↓查看历史弹幕 视频ctrl+滚轮缩放";
        dom.setAttribute("data-placeholder", text);
        // document.getElementsByClassName("barrageSpeed__value")[0].innerText = barrageSpeed;
    }, 5000)
}

function LiveTool_BarrageSpeed_Dom() {
    let a = document.createElement("div");
    a.className = "barrageSpeed";
    let html = `
        弹幕时速：<span class='barrageSpeed__value'>**</span>条/分 按↑↓查看历史弹幕 视频ctrl+滚轮缩放
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
let enterWordList = [];
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
            <span id='enter__export'>导出</span>
            <span id='enter__import'>导入</span>
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
    document.getElementById("enter__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(enterWordList));
        showMessage("【进场欢迎】导出完毕，已复制到剪贴板", "success");
    });

    document.getElementById("enter__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("enter__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    enterWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in enterWordList) {
                        if (enterWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Enter();
                }
                showMessage("【进场欢迎】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

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

        if (word == "") return;
        if (level == "") return;

        let isExist = false;

        for (const item of enterWordList) {
            if (Number(level) === Number(item.level)) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            showMessage("【进场欢迎】等级已存在", "error");
            return;
        }
        
        enterWordList.push({
            level,
            word
        });
        
        enterWordList.sort((a, b) => b.level - a.level);
        refreshEnterSelectOptions();
        saveData_Enter();
    });

    document.getElementById("enter__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("enter__select");
        let word = select_wordList.options[select_wordList.selectedIndex].text;
        enterWordList.splice(select_wordList.selectedIndex, 1);
        enterWordList.sort((a, b) => b.level - a.level);
        refreshEnterSelectOptions();
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

function refreshEnterSelectOptions() {
    let select_wordList = document.getElementById("enter__select");
    select_wordList.options.length = 0;
    for (const item of enterWordList) {
        select_wordList.options.add(new Option(`【${item.level}级】${item.word}`, ""));
    }
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
        if (!Array.isArray(retJson)) {
            retJson = [];
            saveData_Enter();
        }
        enterWordList = retJson;
		refreshEnterSelectOptions();
    }
    
    // ret = localStorage.getItem("ExSave_LastEnterWord");
    // if (ret != null) {
    //     let i = 0;
    //     for (const key in enterWordList) {
    //         if (key == ret) {
    //             select_wordList.selectedIndex = i;
    //             let level = enterWordList[ret].enter;
    //             document.getElementById("enter__word").value = ret;
    //             document.getElementById("enter__level").value = level;
    //             break;
    //         }
    //         i++;
    //     }
    // } 

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
        for (const item of enterWordList) {
            if (Number(level) >= Number(item.level)) {
                reply = String(item.word).replace(/<id>/g, nn);
                sendBarrage(reply);
                break;
            }
        }
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
            <span id='gift__export'>导出</span>
            <span id='gift__import'>导入</span>
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
            <input style="width:64px;margin-left:10px;" type="button" id="gift__template" value="生成模板"/>
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
鱼翅礼物：http://open.douyucdn.cn/api/RoomApi/room/4042402
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

    document.getElementById("gift__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(giftWordList));
        showMessage("【自动谢礼物】导出完毕，已复制到剪贴板", "success");
    });

    document.getElementById("gift__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("gift__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    giftWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in giftWordList) {
                        if (giftWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Gift();
                }
                showMessage("【自动谢礼物】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

    document.getElementById("gift__template").addEventListener("click", () => {
        setAllGiftTemplate();
    })
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
    let typeName = getType(text);
    if (typeName === "dgb") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nn@=", "/");
        let gfid = getStrMiddle(text, "gfid@=", "/");
        let gfcnt = getStrMiddle(text, "gfcnt@=", "/");
        if (gfid in giftWordList) {
            let reply = giftWordList[gfid].reply;
            reply = String(reply).replace(/<id>/g, nn);
            reply = String(reply).replace(/<cnt>/g, gfcnt);
            sendBarrage(reply);
        }
    } else if (typeName === "dfobc" || typeName === "dfrbc") {
        let uid = getStrMiddle(text, "uid@=", "/");
        if (uid == my_uid) { // 不算自己
            return;
        }
        let nn = getStrMiddle(text, "nick@=", "/");
        let gfid = typeName === "dfobc" ? "开通钻粉" : "续费钻粉";
        let gfcnt = "1";
        if (gfid in giftWordList) {
            let reply = giftWordList[gfid].reply;
            reply = String(reply).replace(/<id>/g, nn);
            reply = String(reply).replace(/<cnt>/g, gfcnt);
            sendBarrage(reply);
        }
    }
}

async function setAllGiftTemplate() {
    let ret = {};
    let roomGiftObj = {};
    let roomGift = await getRoomGiftTemplate();
    for (let i = 0; i < roomGift.data.gift.length; i++) {
        let item = roomGift.data.gift[i];
        roomGiftObj[item.id] = {
            reply: `感谢<id>赠送的${item.name}x<cnt>`
        };
    }
    let bagGift = await getBagGiftTemplate();
    let bagGiftObj = {};
    bagGift = bagGift.substring(0, bagGift.length - 2);
    bagGift = bagGift.replace("DYConfigCallback(", "");
    bagGift = JSON.parse(bagGift || "{}") || {};
    for (const key in bagGift.data) {
        bagGiftObj[key] = {
            reply: `感谢<id>赠送的${bagGift.data[key].name}x<cnt>`
        };
    }

    let diamondObj = {
        "开通钻粉": {
            reply: `感谢<id>开通钻粉`,
        },
        "续费钻粉": {
            reply: `感谢<id>续费钻粉`,
        },
    }
    
    ret = {...roomGiftObj, ...bagGiftObj, ...diamondObj};
    GM_setClipboard(JSON.stringify(ret));
    showMessage("【自动谢礼物】礼物模板生成完毕，已复制到剪贴板，可直接导入", "success");
}

function getRoomGiftTemplate() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://open.douyucdn.cn/api/RoomApi/room/" + rid,
            responseType: "json",
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function getBagGiftTemplate() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://webconf.douyucdn.cn/resource/common/prop_gift_list/prop_gift_config.json",
            responseType: "text",
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}
let timer_closing;
let closingNum = 0;
function initPkg_LiveTool_LiveNotice() {
}

function initPkg_LiveTool_LiveNotice_Handle(text) {
    if (getType(text) == "rss") {
        let rid = getStrMiddle(text, "rid@=", "/");
        let ss = getStrMiddle(text, "ss@=", "/");
        let ivl = getStrMiddle(text, "ivl@=", "/"); // 区分轮播，当ivl为1时则为轮播
        if (ss == "1" && ivl == "0") {
            showMessageWindow("开播提醒", "直播间：" + rid + "开播了，点我签到", () => {
                signRoom(rid);
            });
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
initPkg_LiveTool_RankList();
initPkg_LiveTool_BarrageSendCheck();

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
	showExRightPanel("直播间工具");
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
	initPkg_LiveTool_RankList_Handle(ret); // 排行榜
	initPkg_LiveTool_BarrageSendCheck_Handle(ret); // 检查弹幕是否发送成功
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
    // if (rid == "4042402") {
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
            <span id='mute__title'>关键词禁言</span>
            <span id='mute__idlist'>名单</span>
            <span id='mute__export'>导出</span>
            <span id='mute__import'>导入</span>
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
    document.getElementById("mute__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(muteWordList));
        showMessage("【关键词禁言】导出完毕，已复制到剪贴板", "success");
    });
    document.getElementById("mute__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("mute__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    muteWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in muteWordList) {
                        if (muteWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Mute();
                }
                showMessage("【关键词禁言】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

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
    // if (rid == "4042402") {
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
let rankListData = {
    day: {},
    week: {},
    all: {}
};
function initPkg_LiveTool_RankList() {
    let a = new DomHook(".layout-Player-rankAll", false, (m) => {
        let dom = document.getElementsByClassName("RankAllMain-container");
        if (dom.length > 0) {
            if (Object.keys(rankListData.all).length > 0) {
                setRankListData("all", document.querySelectorAll(".layout-Player-rankAll .ChatRankWeek-listItem--nickname"));
            }
        }
    })
}

function initPkg_LiveTool_RankList_Handle(text) {
    if (getType(text) == "ranklist") {
        let data = stt_deserialize(text);
        if (data.list_day) {
            rankListData.day = getRankListData(data.list_day);
            setRankListData("day", document.querySelectorAll(".layout-Player-rank .ChatDayRank .ChatRankWeek-listItem--nickname"));
        }
        if (data.list) {
            rankListData.week = getRankListData(data.list);
            setRankListData("week", document.querySelectorAll(".layout-Player-rank .ChatRankWeek .ChatRankWeek-listItem--nickname"));
        }
        if (data.list_all) {
            rankListData.all = getRankListData(data.list_all);
        }
        setRankListData();
    }
}

function setRankListData(rankItemType, rankItems) {
    if (!rankItems) return;
    for (let i = rankItemType === "week" ? 10 : 0; i < rankItems.length; i++) {
        let rankItem = rankItems[i];
        let rankItemName = rankItem.innerHTML.split("<span")[0];
        let rankItemParent = rankItem.parentElement;
        let rankContent =  rankListData[rankItemType][rankItemName];
        if (rankItemParent.className.includes("--top")) {
            rankItem.innerHTML = `${rankItemName}<span class="exRankPoint--top">${rankContent}</span>`;
        } else {
            rankItem.innerHTML = `${rankItemName}<span class="exRankPoint">${rankContent}</span>`;
        }
    }
}

function getRankListData(list) {
    let obj = {};
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        obj[item.nickname] = Number(item.gold) / 100;
    }
    return obj;
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
            <span id='reply__export'>导出</span>
            <span id='reply__import'>导入</span>
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
    document.getElementById("reply__export").addEventListener("click", () => {
        GM_setClipboard(JSON.stringify(replyWordList));
        showMessage("【关键词回复】导出完毕，已复制到剪贴板", "success");
    });

    document.getElementById("reply__import").addEventListener("click", () => {
        PostbirdAlertBox.prompt({
            'title': "请输入json文本（会覆盖原来的设置）",
            'okBtn': '确定',
            onConfirm: function (data) {
                let select_wordList = document.getElementById("reply__select");
                let obj = JSON.parse(data || "{}") || {};
                if (typeof obj == "object") {
                    replyWordList = {...obj};
                    select_wordList.options.length = 0;
                    for (let key in replyWordList) {
                        if (replyWordList.hasOwnProperty(key)) {
                            select_wordList.options.add(new Option(key, ""));
                        }
                    }
                    saveData_Reply();
                }
                showMessage("【关键词回复】导入完毕", "success");
            },
            onCancel: function (data) {
            },
        });
    });

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
                    showMessage("宝箱验证初始化失败", "error");
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
    
    let b = getValidDom([".layout-Player-main", "main"]);
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
// 获取自己所有的粉丝牌房间号
let myFansBadgeList = [];
let lotteryHasNoticed = {};
let lotteryHTML = "";
let isLotteryNotice = false;
let timer_lottery = 0;

function initPkg_Lottery() {
    setFansBadgeList();
	initPkg_Lottery_Dom();
	initPkg_Lottery_Func();
    Lottery_Set();
    timer_lottery = setInterval(() => {
        initPkg_Lottery_Timer();
    }, 60000);
}

function initPkg_Lottery_Dom() {
    Lottery_insertModal();
	Lottery_insertIcon();
}
function Lottery_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-lottery";
	a.innerHTML = '<a class="ex-panel__icon" title="全站抽奖信息"><svg style="display:block;" t="1636332741708" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19181" width="32" height="32"><path d="M508.858182 986.042182c-261.748364 0-473.925818-212.177455-473.925818-473.925818S247.109818 38.190545 508.858182 38.190545s473.925818 212.177455 473.925818 473.925819-212.200727 473.925818-473.925818 473.925818m0-981.690182C228.421818 4.352 1.093818 231.703273 1.093818 512.116364s227.351273 507.764364 507.764364 507.764363c280.413091 0 507.787636-227.351273 507.787636-507.764363S789.271273 4.352 508.858182 4.352" fill="#FF4517" p-id="19182"></path><path d="M322.536727 512.302545l0.023273-1.326545-313.064727-1.931636c0 1.093818-0.093091 2.164364-0.093091 3.281454 0 90.88 24.785455 175.918545 67.84 248.925091l270.173091-155.997091a185.274182 185.274182 0 0 1-24.878546-92.951273zM416.791273 350.440727L264.029091 82.013091A492.986182 492.986182 0 0 0 77.498182 262.981818l270.173091 155.997091a186.717091 186.717091 0 0 1 69.12-68.538182zM602.856727 351.697455l151.831273-259.211637A488.261818 488.261818 0 0 0 508.718545 21.690182l0.023273 304.453818c34.350545 0 66.513455 9.355636 94.114909 25.553455zM258.536727 939.450182a488.471273 488.471273 0 0 0 241.710546 63.674182c2.839273 0 5.632-0.139636 8.448-0.186182V698.507636a185.064727 185.064727 0 0 1-94.068364-25.553454l-156.090182 266.496zM927.325091 270.452364l-257.466182 148.666181a185.204364 185.204364 0 0 1 25.041455 93.207273l-0.046546 1.070546 296.168727 1.838545c0.023273-0.977455 0.069818-1.931636 0.069819-2.909091 0-87.994182-23.249455-170.496-63.767273-241.873454zM600.855273 674.094545l148.573091 261.073455a492.776727 492.776727 0 0 0 178.106181-181.387636l-257.466181-148.642909a187.042909 187.042909 0 0 1-69.213091 68.95709z" fill="#FF4517" p-id="19183"></path><path d="M644.142545 512.302545a135.400727 135.400727 0 0 0-135.424-135.400727l-84.619636-160.791273 20.642909 173.824c-42.658909 22.784-71.400727 70.609455-71.400727 122.368a135.447273 135.447273 0 0 0 270.801454 0z m-133.492363 70.097455a68.491636 68.491636 0 1 1 0.023273-136.96 68.491636 68.491636 0 0 1-0.023273 136.96z" fill="#FF4517" p-id="19184"></path></svg><i id="lottery__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function Lottery_insertModal() {
	let a = document.createElement("div");
	a.className = "exlottery";
	a.innerHTML = `
        <div class="lottery__func">
            <div id="lottery-refresh">
                <svg t="1636115506027" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2454" width="16" height="16"><path d="M927.999436 531.028522a31.998984 31.998984 0 0 0-31.998984 31.998984c0 51.852948-10.147341 102.138098-30.163865 149.461048a385.47252 385.47252 0 0 1-204.377345 204.377345c-47.32295 20.016524-97.6081 30.163865-149.461048 30.163865s-102.138098-10.147341-149.461048-30.163865a385.47252 385.47252 0 0 1-204.377345-204.377345c-20.016524-47.32295-30.163865-97.6081-30.163865-149.461048s10.147341-102.138098 30.163865-149.461048a385.47252 385.47252 0 0 1 204.377345-204.377345c47.32295-20.016524 97.6081-30.163865 149.461048-30.163865a387.379888 387.379888 0 0 1 59.193424 4.533611l-56.538282 22.035878A31.998984 31.998984 0 1 0 537.892156 265.232491l137.041483-53.402685a31.998984 31.998984 0 0 0 18.195855-41.434674L639.723197 33.357261a31.998984 31.998984 0 1 0-59.630529 23.23882l26.695923 68.502679a449.969005 449.969005 0 0 0-94.786785-10.060642c-60.465003 0-119.138236 11.8488-174.390489 35.217667a449.214005 449.214005 0 0 0-238.388457 238.388457c-23.361643 55.252253-35.22128 113.925486-35.22128 174.390489s11.8488 119.138236 35.217668 174.390489a449.214005 449.214005 0 0 0 238.388457 238.388457c55.252253 23.368867 113.925486 35.217667 174.390489 35.217667s119.138236-11.8488 174.390489-35.217667A449.210393 449.210393 0 0 0 924.784365 737.42522c23.368867-55.270316 35.217667-113.925486 35.217667-174.390489a31.998984 31.998984 0 0 0-32.002596-32.006209z" fill="" p-id="2455"></path></svg>
            </div>
            <div class="lottery__notice">
                <label class="lottery__notice"><input class="lottery__notice" id="lottery-notice" type="checkbox">开启提醒</label>
            </div>
        </div>
        <div class="lottery__nodata">暂无数据</div>
        <div class="lottery__wrap"></div>
    `;
	let b = document.getElementsByClassName("layout-Player-chat")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Lottery_Func() {
    let dom_notice = document.getElementById("lottery-notice");
    document.getElementsByClassName("ex-lottery")[0].addEventListener("click", () => {
        showExRightPanel("全站抽奖信息");
        let dom = document.getElementsByClassName("lottery__wrap")[0];
        if (dom) {
            dom.innerHTML = lotteryHTML;
        }
    })

    document.getElementById("lottery-refresh").addEventListener("click", debounce(() => {
        initPkg_Lottery_Timer();
    }, 3000))

    dom_notice.addEventListener("click", () => {
        let ischecked = dom_notice.checked;
        if (ischecked == true) {
            // 开启提醒
            isLotteryNotice = true;
        } else{
            // 停止提醒
            isLotteryNotice =  false;
        }
        saveData_Lottery();
    })
}


async function initPkg_Lottery_Timer() {
    let html = "";
    let lotteryList = await getExLotteryList();
    if (!lotteryList.data.list) return;
    for (let i = 0; i < lotteryList.data.list.length; i++) {
        let item = lotteryList.data.list[i];
        if (item.status !== 0) {
            // status不为0说明已经开奖
            continue;
        }
        let lotteryInfo = await getExLotteryInfo(item.room_id);
        let condition = lotteryInfo.data.join_condition;
        let joinText = "command_content" in condition ? `发送弹幕` : `赠送 ${condition.gift_name}（${condition.gift_price}）x${condition.gift_num}`;
        let expireTime = Number(lotteryInfo.data.start_at) + Number(lotteryInfo.data.join_condition.expire_time);
        let expireText = getTimeDiff(expireTime * 1000, new Date().getTime());
        expireText = expireText == -1 ? "已结束" : "距结束：" + expireText;
        // 有这个房间的牌子或者不需要成为粉丝的 就都能参加
        let canJoin = myFansBadgeList.indexOf(String(item.room_id)) !== -1 || condition.lottery_range <= 1;

        if (canJoin && isLotteryNotice) {
            let keyName = `${lotteryInfo.data.prize_name}|${lotteryInfo.data.start_at}`;
            if (!(keyName in lotteryHasNoticed)) {
                lotteryHasNoticed[keyName] = 1;
                showMessage(`<a style="font-size:14px;border:none;" target="_blank" href="https://www.douyu.com/${item.room_id}">【${lotteryInfo.data.prize_name}x${lotteryInfo.data.prize_num}】${joinText}</a>`, "special", {
                    timeout: 100,
                });
            }
        }

        html += `
            <a class="lottery__a" href="https://www.douyu.com/${item.room_id}" target="_blank">
                <div class="lottery__item">
                    <div class="lottery__img">
                        <div class="lottery__anchor">${item.anchor_name}</div>
                        <img loading="lazy" src="${item.verticalSrc}"/>
                        <div class="lottery__expireTime">${expireText}</div>
                    </div>
                    <div class="lottery__info">
                        <div class="lottery__prize">${lotteryInfo.data.prize_name}x${lotteryInfo.data.prize_num}</div>
                        <div class="lottery__jointext">${joinText}</div>
                        <div style="color:${canJoin ? "#64ce83" : "#e74c3c"}" class="lottery__condition">${getJoinCondition(condition)}</div>
                    </div>
                </div>
            </a>
        `;
    }

    let domNodata = document.getElementsByClassName("lottery__nodata")[0];
    if (html.trim() !== "") {
        domNodata.style.display = "none";
    } else {
        domNodata.style.display = "block";
    }
    lotteryHTML = html;
    let dom = document.getElementsByClassName("lottery__wrap")[0];
    if (dom) {
        dom.innerHTML = lotteryHTML;
    }
}

function getJoinCondition(condition) {
    let ret = "";
    switch (condition.lottery_range) {
        case 0:
            ret = "所有人可参与";
            break;
        case 1:
            ret = "关注主播";
            break;
        case 2:
            ret = "成为粉丝";
            break;
        case 3:
            ret = "关注主播+成为粉丝";
            break;
        default:
            break;
    }
    return ret;
}

function getExLotteryList() {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://www.douyu.com/lapi/interact/lottery/getHallList",
            responseType: "json",
            onload: response => {
                let ret = response.response;
                resolve(ret);
            },
            onerror: err => {
                reject(err);
            }
        });
    })
}

function getExLotteryInfo(room_id) {
    return new Promise((resolve, reject) => {
        fetch("https://www.douyu.com/member/lottery/activity_info?room_id=" + room_id, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            reject(err);
        })
    })
}

async function setFansBadgeList() {
	let ret = [];
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
		ret.push(rid);
	}
	myFansBadgeList = ret;
}


function saveData_Lottery() {
	let data = {
		isNotice: isLotteryNotice
	}
	localStorage.setItem("ExSave_Lottery", JSON.stringify(data));
}

function Lottery_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Lottery");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isNotice == true) {
            document.getElementById("lottery-notice").click();
        }
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
	let b = getValidDom([".PlayerToolbar-ContentCell .PlayerToolbar-Wealth", "#js-backpack-enter"]);
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


function initPkg_Monitor() {
	initPkg_Monitor_Dom();
	initPkg_Monitor_Func();
}

function initPkg_Monitor_Dom() {
	Monitor_insertIcon();
}
function Monitor_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-monitor";
	a.innerHTML = '<a class="ex-panel__icon" title="在线弹幕助手"><svg style="display:block;" t="1638235744961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="69800" width="32" height="32"><path d="M426.666667 106.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h512a21.333333 21.333333 0 0 1 0 42.666667H448a21.333333 21.333333 0 0 1-21.333333-21.333333z m533.333333 789.333333H448a21.333333 21.333333 0 0 0 0 42.666667h512a21.333333 21.333333 0 0 0 0-42.666667z m0-554.666667H448a21.333333 21.333333 0 0 0 0 42.666667h512a21.333333 21.333333 0 0 0 0-42.666667z m0 298.666667H448a21.333333 21.333333 0 0 0 0 42.666667h512a21.333333 21.333333 0 0 0 0-42.666667zM245.333333 42.666667H96a53.393333 53.393333 0 0 0-53.333333 53.333333v149.333333a53.393333 53.393333 0 0 0 53.333333 53.333334h149.333333a53.393333 53.393333 0 0 0 53.333334-53.333334V96a53.393333 53.393333 0 0 0-53.333334-53.333333z m0 341.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333333v149.333334a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333334-53.333333V437.333333a53.393333 53.393333 0 0 0-53.333334-53.333333z m0 341.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333334v149.333333a53.393333 53.393333 0 0 0 53.333333 53.333333h149.333333a53.393333 53.393333 0 0 0 53.333334-53.333333v-149.333333a53.393333 53.393333 0 0 0-53.333334-53.333334z" fill="#13227a" p-id="69801"></path></svg><i id="Monitor__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_Monitor_Func() {
	document.getElementsByClassName("ex-monitor")[0].addEventListener("click", function() {
        openPage("https://www.douyuex.com/" + String(rid));
	});
}


const MONTH_COST_CACHE_KEY = "ExSave_MonthCost";
const MONTH_COST_SEE_STATUS_KEY = "ExSave_MonthCost_SeeStatus";

let totalMonthCost = 0;
let typeDetail = [];

let svg_see = `<svg t="1619141525444" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4635" width="16" height="16" style="/* display: inline-block; */"><path d="M1009.592 531.212C863.184 730.624 696.96 832 512 832c-184.96 0-351.184-101.376-497.592-300.788C10.384 525.864 8 519.212 8 512s2.384-13.864 6.408-19.212C160.816 293.376 327.04 192 512 192c184.96 0 351.184 101.376 497.592 300.788 4.024 5.348 6.408 12 6.408 19.212s-2.384 13.864-6.408 19.212zM512 768c156.864 0 300.54-84.332 432.012-256C812.54 340.332 668.864 256 512 256c-156.864 0-300.54 84.332-432.012 256C211.46 683.668 355.136 768 512 768z m0-64c-106.04 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z m0-64c70.692 0 128-57.308 128-128s-57.308-128-128-128-128 57.308-128 128 57.308 128 128 128z" p-id="4636" fill="#707070"></path></svg>`;
let svg_unsee = `<svg t="1619143157694" class="icon" viewBox="0 0 1186 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733" width="16" height="16"><path d="M591.707784 915.740462A642.870487 642.870487 0 0 1 2.965954 526.459025a39.298888 39.298888 0 0 1 0-28.91805 632.489649 632.489649 0 0 1 584.292899-388.539948h8.897862a630.265183 630.265183 0 0 1 584.292899 388.539948 39.298888 39.298888 0 0 1 0 28.91805 637.680068 637.680068 0 0 1-336.635757 337.377245 646.577929 646.577929 0 0 1-252.106073 51.904192zM77.856287 512.370744a565.755688 565.755688 0 0 0 1026.961505 0 556.116338 556.116338 0 0 0-508.661077-329.220872h-8.897862a556.857827 556.857827 0 0 0-509.402566 329.220872z" p-id="1734" fill="#707070"></path><path d="M590.966296 732.592814a218.739093 218.739093 0 1 1 222.446535-218.739093 218.739093 218.739093 0 0 1-222.446535 218.739093z m0-362.587852a144.590248 144.590248 0 1 0 148.29769 143.848759 148.29769 148.29769 0 0 0-148.29769-143.848759z" p-id="1735" fill="#707070"></path><path d="M1137.443284 1023.997776a37.074423 37.074423 0 0 1-24.469119-8.897862L20.761677 65.253208A37.074423 37.074423 0 0 1 68.958426 8.900086l1092.212489 946.880752a37.074423 37.074423 0 0 1 0 52.64568 35.591446 35.591446 0 0 1-23.727631 15.571258z" p-id="1736" fill="#707070"></path></svg>`;

let seeStatus = 0;

function MonthCost_getContainerDom() {
	return document.getElementsByClassName("month-cost")[0];
}

function MonthCost_getMoneyDom() {
	return document.getElementById("monthcost__money");
}

function MonthCost_getIconDom() {
	return document.getElementsByClassName("monthcost__icon")[0];
}

function MonthCost_renderSeeStatus() {
	const iconDom = MonthCost_getIconDom();
	const moneyDom = MonthCost_getMoneyDom();
	if (!iconDom || !moneyDom) return;
	if (seeStatus === 1) {
		iconDom.innerHTML = svg_see;
	} else {
		moneyDom.innerText = "***";
		iconDom.innerHTML = svg_unsee;
	}
	MonthCost_ContentAttrTitle();
}

function initPkg_MonthCost() {
	initPkg_MonthCost_Dom();
	initPkg_MonthCost_Func();
	seeStatus = MonthCost_getSeeStatus();
	MonthCost_renderSeeStatus();
	if (seeStatus === 1) {
		MonthCost_updateCost();
	}
}

function initPkg_MonthCost_Dom() {
	MonthCost_insertIcon();
}

function MonthCost_insertIcon() {
	let a = document.createElement("span");
	a.className = "month-cost";
	a.innerHTML = `
	本月消费 <span id="monthcost__money">***</span> 元
	<span class="monthcost__icon"></span>
	`;
	a.title = "数据每日更新，根据个人中心消费数据统计"
	let b = getValidDom(["#js-backpack-enter"]);
	if (b) {
		b = b.parentElement;
		b && b.insertBefore(a, b.childNodes[0]);
	}
}

function initPkg_MonthCost_Func() {
	const iconDom = MonthCost_getIconDom();
	if (!iconDom) return;
	iconDom.addEventListener("click", () => {
		seeStatus = seeStatus === 1 ? 0 : 1;
		MonthCost_saveSeeStatus();
		MonthCost_renderSeeStatus();
		if (seeStatus === 1) MonthCost_updateCost();
	});
}


function MonthCost_saveSeeStatus() {
	localStorage.setItem(MONTH_COST_SEE_STATUS_KEY, String(seeStatus));
}

function MonthCost_getSeeStatus() {
	let storage = localStorage.getItem(MONTH_COST_SEE_STATUS_KEY);
	if (storage == null) return 0;
	return Number(storage) === 1 ? 1 : 0;
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
        }).catch(() => {
			resolve({ error: -1, data: [] });
		});
    })
}


async function getMonthCost_gift() {
	const [start, end] = getMonthTimeRange();
	const [formattedStart, formattedEnd] = getFormattedMonthTimeRange();
	const direction = 1;
	let data = [];
	let hasMoreData = true;
	let id = 0;

	while (hasMoreData) {
		let url = `https://www.douyu.com/wjapi/nc/exchange/consume/giftList?queryType=0&consumeType=0&startDate=${start}&endDate=${end}&tradeStartDate=${formattedStart}&tradeEndDate=${formattedEnd}&direction=${direction}`;
		if (id !== 0) {
			url += `&id=${id}`;
		}
		
		let ret = await MonthCost_queryData(url);
		if (ret.error == 1000) {
			await new Promise(resolve => setTimeout(resolve, 2000));
		} else {
			let nextData = (ret && ret.data) || [];
			data = data.concat(nextData);
			if (nextData.length < 20) {
				hasMoreData = false;
			} else {
				id = nextData[nextData.length - 1].id;
			}
		}
	}

	let categorizedData = {};
	for (const item of data) {
		let money = Math.abs(item.amount);
		totalMonthCost += money;
		let key = item.consumeTypeDesc || "其他";
		if (!categorizedData[key]) categorizedData[key] = 0;
		categorizedData[key] += money;
	}

	for (let title in categorizedData) {
		typeDetail.push({ title, money: categorizedData[title] });
	}

}

async function getMonthCost_diamondFans() {
	let type = 0;
	let page = 1;
	let data = [];
	let hasMoreData = true;
	let now = new Date();
	let nowMonth = now.getMonth();
	let nowYear = now.getFullYear();

	while (hasMoreData) {
		let url = `https://www.douyu.com/japi/interactnc/web/dFansbadge/myLogs?type=${type}&page=${page}`;
		let ret = await MonthCost_queryData(url);
		let list = (((ret || {}).data || {}).list) || [];
		for (const item of list) {
			let consumeDate = new Date(item.consumeTime * 1000);
			if (consumeDate.getMonth() === nowMonth && consumeDate.getFullYear() === nowYear) {
				data.push(item);
			}
		}
		if (!list[list.length - 1]) break;
		let lastItemDate = new Date(list[list.length - 1].consumeTime * 1000);
		if (list.length < 20 || lastItemDate.getMonth() !== nowMonth || lastItemDate.getFullYear() !== nowYear) {
			hasMoreData = false;
		} else {
			page++;
		}
	}

	let diamondFansMoney = 0;
	for (const item of data) diamondFansMoney += Math.abs(item.consumeMoney);
	if (diamondFansMoney > 0) {
		typeDetail.push({ title: "钻粉充值/续费", money: diamondFansMoney });
	}
	totalMonthCost += diamondFansMoney;
}

async function getMonthCost() {
	totalMonthCost = 0;
	typeDetail = [];
	await getMonthCost_gift();
	await getMonthCost_diamondFans();
	MonthCost_saveData();
	MonthCost_ContentAttrTitle();
	let moneyDom = MonthCost_getMoneyDom();
	if (moneyDom) moneyDom.innerText = String(totalMonthCost / 100);
}

function MonthCost_ContentAttrTitle(){
	let containerDom = MonthCost_getContainerDom();
	if (!containerDom) return;
	if (seeStatus === 1 && typeDetail.length > 0) {
		let titleContent = "数据每日更新，根据个人中心消费数据统计。\n--- ---\n";
		typeDetail.forEach(detail => {
			titleContent += `${detail.title}: ${String(detail.money / 100)} 元\n`;
		});
		containerDom.title = titleContent;
	} else {
		containerDom.title = "数据每日更新，根据个人中心消费数据统计。";
	}
}

function getFormattedMonthTimeRange() {
	let now = new Date();
	let nowMonth = now.getMonth();
	let nowYear = now.getFullYear();
	let monthStartDate = new Date(nowYear, nowMonth, 1);

	let formatDate = (date) => {
		let year = date.getFullYear();
		let month = (date.getMonth() + 1).toString().padStart(2, '0');
		let day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	return [formatDate(monthStartDate), formatDate(now)];
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
		updateTime: new Date().getTime(),
		typeDetail: typeDetail 
	}
	let storage = localStorage.getItem(MONTH_COST_CACHE_KEY);
	if (storage !== null) {
		try {
			storage = JSON.parse(storage);
		} catch (e) {
			storage = {};
		}
	} else {
		storage = {};
	}
	storage[my_uid] = data;
	localStorage.setItem(MONTH_COST_CACHE_KEY, JSON.stringify(storage));
}

function MonthCost_getData() {
	let storage = localStorage.getItem(MONTH_COST_CACHE_KEY);
	if (storage !== null) {
		try {
			storage = JSON.parse(storage);
		} catch (e) {
			storage = {};
		}
	} else {
		storage = {};
	}
	return storage;
}

function MonthCost_updateCost() {
	if (seeStatus !== 1) return;
	let timeDiff = 1;
	let tmpCost = 0;
	let tmpTypeDetail = [];
	let now = new Date().getDate();

	let storage = MonthCost_getData();
	if (my_uid in storage) {
		let item = storage[my_uid];
		timeDiff = Math.abs(now - new Date(item.updateTime).getDate());
		tmpCost = item.monthCost;
		tmpTypeDetail = item.typeDetail || [];
		let moneyDom = MonthCost_getMoneyDom();
		if (moneyDom) moneyDom.innerText = String(tmpCost / 100);
		typeDetail = tmpTypeDetail;
		MonthCost_ContentAttrTitle();
	}else{
		let moneyDom = MonthCost_getMoneyDom();
		if (moneyDom) moneyDom.innerHTML = `<span class="PlayerToolbar-dataLoadding"></span>`;
	}

	if (timeDiff >= 1) {
		getMonthCost();
	}
}

let svg_night  = '<svg t="1587640254282" class="icon" viewBox="0 0 1055 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5670" width="26" height="26"><path d="M388.06497 594.013091c-96.566303-167.253333-39.067152-381.889939 128.217212-478.487273a348.656485 348.656485 0 0 1 256.248242-36.864C623.491879-5.306182 435.417212-11.170909 276.542061 80.616727 37.236364 218.763636-44.776727 524.815515 93.401212 764.152242c138.146909 239.305697 444.198788 321.318788 683.535515 183.140849 158.875152-91.725576 247.870061-257.520485 249.669818-428.559515a348.656485 348.656485 0 0 1-160.085333 203.496727c-167.253333 96.566303-381.889939 39.036121-478.487273-128.217212" p-id="5671" fill="#8a8a8a"></path></svg>';
let svg_day = '<svg t="1587640423416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2270" width="26" height="26"><path d="M270.016 197.248l-83.84-84.544-69.76 70.464 83.776 84.544 69.76-70.4zM139.648 465.024H0v93.888h139.648V465.024zM558.528 0H465.472v136.192h93.056V0z m349.056 183.168l-69.76-70.464-83.84 84.544L819.2 263.04l88.384-79.872z m-153.6 643.584l83.84 84.48 65.28-65.728L819.2 760.96l-65.216 65.792z m130.368-267.84H1024V465.024h-139.648v93.888zM512.064 230.08C358.4 230.08 232.768 356.992 232.768 512c0 155.008 125.632 281.856 279.296 281.856 153.6 0 279.232-126.848 279.232-281.856 0-154.944-125.632-281.856-279.232-281.856zM465.472 1024h93.056v-136.256H465.472V1024z m-349.056-183.232l69.76 70.4 83.84-84.48L204.8 760.96 116.48 840.768z" p-id="2271" fill="#8a8a8a"></path></svg>';

let currentMode = 0; // 0日间模式 1夜间模式
function initPkg_Night() {
    const isBeta = !!document.getElementsByClassName("live-next-body")[0];
    if (isBeta) return;
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
    const isBeta = !!document.getElementsByClassName("live-next-body")[0];
    if (isBeta) return;
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
    .PlayerToolbar-wealthNum,.Header-wrap .Header-menu-link>a,.public-DropMenu-link,.Header-icon{color:rgb(191,191,191) !important;--mantine-color-dark-5:rgb(191,191,191) !important;--mantine-color-dark-3:rgb(191,191,191) !important;}
    .layout-Main{background:rgba(35,36,39,1) !important;}
    .ChatRank-rankWraper{background:rgba(47,48,53,1) !important;border:rgba(47,48,53,1) solid 1px !important;}
    .bg-icon{display:none;}
    .ChatRankWeek-headerContent,.NobleRank,.NobleRankTips{background-color:rgba(47,48,53,1) !important;}
    #js-player-asideMain{border:1px solid rgba(37,38,42,1) !important;background-color:rgb(47,48,53) !important;}
    .Chat,.ChatSend-txt{background:rgba(47,48,53,1) !important;color:rgb(187,187,187) !important;border-radius:0px !important;}
    .ChatTabContainer-titleWraper--tabLi{background:rgb(29,32,35) !important;border:1px solid rgb(47,48,53) !important;}
    .ChatTabContainer-titleWraper--tabLi.is-active,.FansRankInfo{background:rgb(47,48,53) !important;}
    .FansRankInfo-txt{color:rgb(121,127,137) !important;}
    .Barrage{border:1px solid rgba(35,36,39,1) !important;}
    .layout-Player-chat{border-top:1px solid rgba(47,48,53,1) !important;}
    .layout-Player-announce{background-color:rgb(29,32,35) !important;border:1px solid rgb(29,32,35) !important;}
    .FansRankBottom,.AnchorFriend-footer{border-top:1px solid rgb(47,48,53) !important;}
    .Title-official{background:rgb(35,36,39) !important;}
    .Header-wrap{background:rgb(45,46,54) !important;border-bottom:1px solid rgb(45,46,54) !important;}
    [data-mantine-color-scheme=light] .Header-wrap:not(.is-darkMode):not(.NewActNavIng){background:rgb(45,46,54) !important;border-bottom:1px solid rgb(45,46,54) !important;}
    .Header-follow{--mantine-color-gray-2: rgba(47,48,53,1) !important;--mantine-color-dark-5:rgb(191,191,191) !important;--mantine-color-dark-3:rgb(191,191,191) !important;}
    .Header-follow-listBoxLine{display: none !important;}
    .DropPaneList>a:hover{background: rgb(47,48,53) !important;}
    .DropPaneList>a:hover, .DropPaneList>a:hover .DropPaneList-title, .DropPaneList>a:hover h4{color: var(--Header-hover-color) !important;}
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
    .GiftExpandPanel{background:rgb(35,36,39) !important;border:1px solid rgb(35,36,39) !important;}
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
    .BackpackHeader-info--title,#point__value{color:rgb(191,191,191) !important;}
    #red_envelope_text,#red_envelope_query{color:rgb(191,191,191) !important;}
    .layout-Container{background-color:rgb(35,36,39) !important;}
    .FansRankBottom-invisible,.ChatRankWeek-invisibleContent{background:rgb(47,48,53) !important;}
    .Barrage-roomVip--super{border-top: 1px solid rgb(37,38,42)!important;border-bottom: 1px solid rgb(37,38,42)!important;background: rgb(37,38,42)!important;}
    .Barrage-userEnter--vip{background: rgb(37,38,42)!important;}
    .ChatRankWeek-nobleInvisible{border-top:1px solid rgb(121,127,137) !important;}
    #refresh-video2-svg{fill:#ffffff !important}
    .VideoRecommendItem a{border-bottom: 3px solid rgb(35,36,39) !important;}
    .AnchorFriendPane-title a:after{display:none !important;}

    .MedalOwnerInfo-box{border-bottom: 1px solid rgb(79,81,88)!important;}
    .FansMedalList-item.is-NoWear{border-top: 1px solid rgb(79,81,88)!important;}

    .layout-Player-announce,#js-player-title,.DiamondsFansRankList-anniversary{background: none !important;}
    .DiamondsFansRankContainer-skinbg,.shark-webp .DiamondsFansRankList-anniversary{background: none !important;background-color: rgba(35, 36, 39, 1) !important;}
    .DiamondsFansRankList-anntitle,.DiamondsFansRankList-anntitle{color: #cfcfcf;}

    /*弹幕时速*/
    .barrageSpeed{color: rgba(255,255,255,0.5) !important;}

    /*用户等级*/
    ${getUserLevelNightModeStyle()}

    /*新背包*/
    .BackpackHeader{border-bottom: 1px solid rgb(37,38,42) !important;}
    .BackpackHeader-tabItem{color:rgb(121,127,137)!important;}
    .RightsPropsList{background-color: rgb(35,36,39) !important;color: rgb(149,149,149)!important;}
    .RightsPropsList-item{background: rgb(47,48,53) !important;}

    /*加入公会*/
    .SociatyLabelPop-content{background:rgb(35,36,39) !important;}

    /*任务文字*/
    .taskScoreEntryTxt{color:#BFBFBF !important;}

    .GiftExpandPanel-giftTabsWrap:after{display: none !important;}
    .PostCard-module__feedInfoWrapper-be1-y{background:#fff;}
    .PostCard-module__feedInfoWrapper-be1-y:hover{background:rgb(239,239,239) !important;}

    /* 新版斗鱼 */
    #root{background-color:rgb(35,36,39) !important;}
    #bc3, #bc3-bgblur{background-image: none !important;}
    .Barrage-label>span{color:rgb(187,187,187) !important;}
    .ToolbarRechargeModule-icon,.ToolbarGiftArea-backpack--content>i{background-color:rgb(35,36,39) !important;}
    .PlayerToolbar div:before{background-image:linear-gradient(0deg,rgba(255, 255, 255, 0),rgba(0, 0, 0, 0.55) ) !important;}
    .GiftExpandPanel-giftListWrap.is-mask:after{opacity: 0 !important;}
    .ToolbarGiftArea-backpack p, .ToolbarGiftArea-backpack span{color:rgb(187,187,187) !important;}
    .ToolbarCardModule p, .ToolbarCardModule span{color:rgb(187,187,187) !important;background:rgb(35,36,39) !important;}
    .GiftExpandPanel-giftValueWrap{border-top: 1px solid rgb(47,48,53) !important;}
    .GiftInfoPanel-brief, .GiftInfoPanel-footer, .AudioGiftEdit{background:rgb(47,48,53) !important;}
    .InteractEntryPanel{background:rgb(35,36,39) !important;border:2px solid rgb(35,36,39) !important;}
    .GiftSkinPanel{background:rgb(35,36,39) !important;}
    .BatchGiveForm-btn{background-color:rgb(35,36,39) !important;}
    .InteractEntryPanel:after{opacity: 0 !important;}
    .InteractEntryPanel p, .InteractEntryPanel span, .InteractEntryPanelTitle{color:rgb(187,187,187) !important;}
    .BackpackExpandPanel{background:rgb(35,36,39) !important;border:2px solid rgb(35,36,39) !important;}
    .BackpackExpandPanel-giftListWrap:after{opacity: 0 !important;}
    .BackpackExpandPanel-giftValueWrap{border-top: 1px solid rgb(47,48,53) !important;}

    * {
        --page-background-color: rgba(37,38,42,1) !important;
        --room-title-color: rgb(187,187,187) !important;
        --front-background-color: rgba(37,38,42,1) !important;
        --bg-follow: rgba(37,38,42,1) !important;
        --room-title-light-button-broder-color: rgb(90, 90, 90) !important;
        --bg-share-hover: rgb(187,187,187) !important;
        --ex-night-third-bg: rgb(90, 90, 90) !important;
        --ex-night-scroll-bg: rgb(60, 60, 60) !important;
    }
    
    .activeItem__d6uUm{background:rgb(35,36,39) !important;color:rgb(187,187,187) !important;border:1px solid var(--room-title-light-button-broder-color) !important;}

    .DiamondsFansRankContainer{background-image: none !important;}
    .DiamondsFansRankInfo{background: rgba(37,38,42,1) !important;}
    .DiamondsFansRankContainer-content{background-image: none !important;}
    .info__J-VGf{background-image: none !important;}
    .ChatTabContainer-titleWraper--tabLi:before{background: none !important;}
    .NobleRankList-nickName, .Barrage-EntranceIntroduce{color: rgb(187,187,187) !important;}
    .Chat{border-top: 1px solid rgb(47,48,53) !important;}
    .DiamondsFansRankInfo-txt, .DiamondsFansRankList-policyText{color: #7f7f7f !important;opacity: 1 !important;}

    .snapbarMenu__szc-e{color: rgb(187,187,187) !important;}
    .snapbarMenu__szc-e div:before{background-color: var(--ex-night-third-bg) !important;}
    .FansMedalPanel-container:after{background: var(--ex-night-third-bg) !important;}
    .snapbarMenu__szc-e{border: 1px solid var(--ex-night-third-bg);}
    .snapbar-menu-item:before{background: var(--ex-night-scroll-bg) !important;}

    /* 滚动条 */
    .Barrage-scroll--bar,.GiftExpandPanelScroll-bar,.InteractEntryScrollThumb{background: var(--ex-night-scroll-bg);transition: all 0.1s;}
    .Barrage-scroll--bar:hover,.GiftExpandPanelScroll-bar:hover,.InteractEntryScrollThumb:hover{background: var(--ex-night-third-bg);}
    .Barrage-main>div>div,.GiftExpandPanel-giftTabsList>div>div,
    .GiftExpandPanel-giftListWrap>div>div,
    .InteractEntryPanel>div>div,
    .BackpackExpandPanel-giftListWrap>div>div,
    .NobleRank-scroll>div
    {margin-bottom: -16px !important;margin-right: -16px !important;}
    /* 滚动条结束 */

    .BatchGiveForm-manual{background: var(--page-background-color) !important;border: none !important;}
    .ToolbarBackpack-giftItem--count, .BatchGiveForm-num{border: 1px solid var(--ex-night-third-bg) !important;}
    .menu-da2a9e{background: #fff !important;}
    .real-audience{color: rgb(187,187,187) !important;}
    .ChatRankDayWeekList-headerContent{background: transparent !important;display: flex !important;justify-content: space-between !important;align-items: center !important;}
    
    /* 新版鱼吧 */
    .Tab-module__yubatabEntry-sTCdV,.HotTopicList-module__tab-oI09g,.styles-module__commentPublish-8ZTWy{background: #fff !important;}
    .PostCard-module__postCard-7IgN5{background: #fff !important;border-radius: 4px !important;}
    .index-module__pluginItem-PCGnX, .index-module__header-dV497,.index-module__header-UVoJc,.Editor-module__editor--2Cm2{color: rgb(187,187,187) !important;}
    .index-module__header-dV497{border-bottom: 1px solid var(--ex-night-third-bg) !important;}

    /* sc */
    .HighEnergyBarrageContainer{border-top:1px solid transparent !important;}


    .contentTitle, .DropMenuList-name, .videoTitle, .DropPaneList-title{color: rgb(187,187,187) !important;}
    .UserInfo span, .UserInfo a, .UserInfo p, .UserInfo div{color: rgb(187,187,187) !important;}
    .button-7e1395{background: rgb(239,239,239);}
    .Search-Panel-Explore-item, .Search-Panel-Popular-item>span,.Search-Panel-Popular-item>em{color: rgb(187,187,187) !important}
    .Search-Panel-Popular-item:hover{background: rgb(47,48,53) !important;}
    `;
    StyleHook_set("Ex_Style_NightMode", cssText);
}
function cancelNightMode() {
    StyleHook_remove("Ex_Style_NightMode");
}

function getUserLevelNightModeStyle() {
    let ret = "";
    for (let i = 1; i < 70; i++) {
        ret += ".UserLevel--" + String(i) + ",";
    }
    ret = ret.substring(0, ret.length - 1);
    ret += `{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADACAMAAAAN8R4NAAAC+lBMVEUlJioDvrdnxgPfkxaJb0lrsSIhrKYDvLVif0ftnhtnxQQKnZlZpAwnKCy+iDDYmzlFfHwrLC/ckhc5OTq1exuIbkg6PjyAa0qehVxzX0JpwA5CQT84PkEpKi5geEksLjE3lZNHamsqpKAfQEIxQiM9QT5Gd3c8RUguoJ1HbG0tLzIRt7FCUlVquxZabUpplD1TYUnOmkRBRkAzNTcVs64/REBSTUZnjEJDPDNGYWMwNDdHOyZGdHVqvRJpxAkKu7RAPz2zhDcwMTMcrqlCgYE6QUQ2ODjekxc/iIdqnjVrpDA0mZY6kY+tjFdliERqmjg9SEvGjCpHZmhEfX1VT0czOTxYaUqPc0avgzjonyZ4ZktVZElhV0k7REfZkRtLVEZ4ZkpFQkBrojJrpi5ccUmRdEY2NjdrtxsasKtGb3BPTElSTkrLmUVkhUVMSEOCc1xEWFo/S05hekinfz2oilpLSUZCSEIHvLVBT1HElktqXkprqSw8j42McUhjgkaaeUO0hDbenTNJUEVOSkThnS5qtB1u1QIkqKRBhYSGdlxpXUpnkECfe0DWkB131BIAy8NfWVFvYUprrSa4klNIRkTpnSA9jIuih1s8OzvMjSYwnZtEe3t8aUnOjiTUkCD+phRmX1NdVUcym5jkniuifT8rop5Ef393bFlQWkiWdkSrgTxqmDvBii3akhkPzMVESUNrqCqXgFyEbUg+PTx0almpfzwTtK9EW12wjVaCbEhOV0fOmUFYUki6hzLRjyLImEtXZ0m4hjPfmihsX0rUmzy4hjTlmRxBhINGTUScekGB0yj/rCXAlU5FTEPRky1tZFa8iDG0klyQfWCKeVy9lFFsX0tNRToZp6KbflA2TE65jkeddDCvfSvYlyrwoyQgzcYZycIVwbubgluFcVAyQkVESkLDkT75rjNqVTNxxBkhnJghi4h5aE5tWz67gydfoRpVjI1yjlZeTDJeqxBs0QGm1HSohUxVRzPJhhhyzBF0z82Tu2mHqmJThCGbY0TbAAAbfUlEQVR42uybe1BUVRzHv7uLyVIrXTZFXTeI8gWC4ZpYKcKaoKTp5pquEYnBWoFUQCkVIUkPSwoCAgwRg0oJKuylSVhE9iILtZe9c9KaXtP0rmmme3b3cL3uuZwzjTNZ2++Pc9z1O2fOxzlz93783YszTgrRcyvkpDOmjhgaxK2hI6aK5s49JczArbBTzhXd3+knDtZxa/CJp+OkUyFQp540YopIbsoI0dwpS0Vyy04R3d+J00RyY05ECIQqZKhYbqhoLkwsFya6v8FiucHQg9SZk4BJcQAdI7Ky7MDLcXI9ClL6INB64krgyqsAOkrr1rlBKyioP5YD5CixnDe8A80ZQGqzBbDcAdDRvOx6kzIBMOihbPAigI7yNy8DuG4LvKXXeeezxwJjLwTk8TQyrr7vaTItICMpnQ94UDBwqf4sAGlzIJOGLF+ufxQTYx977LGso4FDhwMVxmsB5BYBqKjZtcuYowCrY9XemDS8Jt47qIGHhANrDY8DWFIAYG3GmtaMOjpRYGWDo+kGgYv1CYgODrnsKOATTgYm6GYBGHc+gCtiZt92AqIXDn6AAYzYm4AI/ZkAll8AzJmINA8sCxhl8iAZHwKw8xBQVKUAM2PDi3bFk4EFjPodcig1HcCL64EnF/smP2DEBtMNYvT0VxMQPGc5CxiTF8o53dmAacbVMEXOOvn8DUzglSuArEQAkOTsoJuwIis/OIUNXFgKrHMBgFXOhtYqwBqxefFkYAIHOYAXygGgOA94dj2d/IBX3gLEjfR+PnN+AoAEJvB5M4HxM8gBv3vWmGnRAGYzgc+Sz3TaRHjqTn0akBh705yQS5nA18pnOrcKntpuzAUTmMY4wEmGJCwpgbcqU/PoRIFVG7zMs8H5F2AA4Et0l2DcXHKiH7n83suf0gAm403RI718iNiyYiW22MnJZgCTsTbC2ARPSU2lhUxgMh6Qapo4wGjbEZ3q+zXb2uikEwVWb1BPNph1A7SByfhgtG4CgGl3LwBmPK0JnH9X1g8gNfFRIHgFtpiAm1awgTua324GqaocYHipFvBw19fd4AE3fLBtI0hJQz6wkcnxwVSwgPO/u3g6mS8bGRubmHiZJvCYdybEkPlpnQmYeR4LOGGYXCm33nWBFzgt5axBczB9YsTLsQl+wNstctVteq3QC5xrvjK0lwE8j8Qe39RdOBBwtlkut3HPVpB6Zfe3vySZ5embty1mBVjZ4I+/eTaYMnr06LSHh7GAZ4+Sa9Hdj9wOUjEPWi/UTWAB60lJN+gfhWfBOYnT77Tj0TR97AXwAzaSMsX7foseL6pp3h7tB0xjO0lMG9hAyrSmPROkMsin5+lEgZUNWm/QXwdPaR5pHSlrlG4BSF0zWbdqGvyAtcsEKMAiFSSaM3AjFJhXFJhd0VCVLvBuLQNOHgJOD0U3+J8BPtZHdYRTJOf854606EXmP3PRCgJbdFX2CgRp+zBwLZlpTnutzo6HJDEflirfstOfJQ0dPus5AMPyL7LSnyWmDtumjbcBGDXmNF9OR4CZBgupltorBWHFSNmbXaqcfyiarFVcs6sn1Cniw3ntra1hmRSYqcP26SPlbxJvWJ44jAIzdHhUTGSk/GnCqqgNq0YpwGzRpfZKQTRixIgPs4FRViuz0rVsu2th3f2ZiA+3FstTCQVm6TAee1UGvmc+sDyBAvvrMCJvBBaOR1QkcP9sBVjDYDHPD5gZK9z/kBqYvZb53Slw7y4U8WGi2G3bKDBLhy94+OKR8ngzgabA/joM3YXj77sGuH01cFskE5gaLBdYiT0UCgYwe63W0nQxH94atgQUmKHDZw4CASaiqL+ZAvvr8Dm6meeP83girtCt9gemohttbOIBk9Hrw5ZmCxOYSvNuZS3zoZ4Ktg9vO9qHJacjyA8Yg86UPDo8bPowH/CdI7dAAVbrMAE+D4iMBHBvzNXQAu748O094AN3uDZ7fHjfprIyl7EsiQnc8do6Za0pG4uTwPbhPV9QH37fRiwxEwh3+APnf/mHR4ezbo2NHamPHSYNuicFDOAxMe/FgNSqC4GTL4d021eLwACmovvRgYGB5x3pw9bq6uoOV7WSo6EkuTwhutaHH4zIvNLM9OGatsVeHy5PtljMKFliswxpocD+vi7JOnzqyNGYeNfnkybRq7RKhz/16vCNUYvGXn4v5j6yeuxY1lVaMVg2MDsGvyPNXMu5m3zTJzF92KDy4ZSCjK7saArM1mFypBP1P4To76HADB22btDpzjdhBvkyigIL+uu/1IdNJqhKF3i3lgEnDwGnhwEHfIyP6vH/XzwBd9EKgkZDt2KdXDkCPpyyd12KkA9LV+17XMyHgaQ7RHw4Ii7uHBEfjhg/3pfTQdNzq8ri4+P38X3Y0ry/l3yiOU23zqvJLTI+IeLDgH1jI/g+fHMiaWPzfXj1qg0bdAsosJbn5lJYjg/vrwI+W6fkNN36gBw8sEvAh8kfdjeC58O0jc334Q23A/fPpcBanlu6r+Nrm4APG9PtU00CPuyx3J4+ER9G8fr0RvB82NfGDub7MMmdsJACa3muq6ywyNjE9WG3sbQ3l+Y4PvyuMT5CxIfT20CAOT5M29giPnyvbhwosFbft8kG9FYN4MN2Ty7FWAvs388CJqN0pFtLFaF9TB9eJh3pw+aNZgYwGfMjjvLhiGduWSniwxFXzzxPA7jjsK/v+4YJqC3V9uFurw+j5ipWf5g2kV9oBgXe/gZwsMzG8mFHrdeHIxzP2oDKTfX1jan1Zn8fHvT9kT482tvGZvjwx7+rfHjuAmDh5QqwSofNVGGbq6SKsnksYJrz/mXVTvOVpdvVORpS+fDP8dWWnl1MH970UTFItQypk1e21tXVLW2sE/DhtJRJg+azfPgRtQ+PWzT2hEgKrNX3zck1lhUK+LBpl9FYJODDSOmtcVVZMLAP/+ptDJMjzfdhs9zGTrDzfXjR+atiZtv/9+EAubUMOHkIOD0MOGDRI/ifeeQh4C5abM8lOkwKtIL8vZmO1qv2uYV8GEi6SsiH866XK5Prw3Ti+zBwyYU8Hx7e09NTagTfhytcRX2ug2wfvlbda7Z3u8wiPvxK/Zo1ayp5Pkwnrg+TXEwMG1hp6ZLaXiTgw32HgL3dGv1hda/50OHDZhEfXkJguT5MJ74PA1Efx4Dnw4DJ1STgw7Wh0ejbI+DDeHdXusss4sOOymXhNq4P04nvw7g98uwY8HwY6CgT6Q9be4w1NUkCPpweaqbAHB8urw8qCJvC82E68X347BNAgVk+bKc6X/oZE5jmrOWeXF/pGxW9Hyo5rV6zubsJbGC0LXar+sNOO9DyCsOHT1X5sG/i+vComFEDAHd8NNWnsE1G+wDAn+2p9Zxje+lBoNO4lu3D3c5+H66UG8nNxrIKZn94qK8/3EZ8GJ0mYCirP3yLyoeDfW1ihg+/947iwzMX3T15coxu8ig/4Hm+9rBPCouKwAKmqmv0qW78Tre10Oj28+FMucybXPMoMGkkH3RVsH14j68/7PgmyWLGxhIpr34x14ft3onlwzNeUnz4duusWbPGzJgFCqzhuXX0ZHN8OGe/qya3ScCHAXKk2T7c6PPhsF/DZB/OXBJWX8z1YTrxfRggR/oY+rDpfx8+jm8tA04eAk4P/ymQ49+HRR9lWCZ2VP8zPix6MToefFjdH0bF8H2SkOcmdew1H/1zk05E93qAjpmdkIjlptOfmwH7w7ZllTZuf5i+38z34WtOk2sBrz/cYeztKbMJeG5eTdHO0moFuP+eMc9AnCK5QM5tC0tGZ0ZycnKLAqztw+au9S2pj3N92Pt+cxzfh+dOjoqKGs/rDxv3Aj2FAp57aD+ws48BjI3b5JwhHQgvaE3GC8lQyjCQD7eUADsq+T58WRYAAR8edwUAjg/LQBVAVY+A59bsBd4NtTKAi4noZoBUdjLCW9KL8/yAWT4cdsdb4dUCPnxLXH6wTcCHZ44fc5+N68O5vVJOczPfc1PIYwxfH3YzgInoJpdQ4OywkuzGbAVY04ftBkfBklQBH06MXUneb+b68IzJ590/eAIbWFHYTtnl9odq9X0j+j3XTvqlB0ttfsBk3CoZplBgSybpkTGA0fbNuUf6sM0wFFi/ngL7vz5MRXjLOcD8iQwfXqjuD18t5yLnavlw6RfNIOWGpGqIsx6WJsDYPRxyKxQs4GV7ptaDAueZAYuBBdzw7fv0eWmPD7ffofG89J/5R/rwWVusnnPu78NfTVP1h6+2knOu1R/+yFXo1eFedLo6FWC/JjIFfjf02ryavSpgKrq2TY5i9B9ph9nWspECq98f7vLG2gzv15HnpdfYLI6t/P7w9InSzbEJ/P5wzI3S6qdm8/rD1fFG1z6IeO4BY00f1MBUdJMNmf3AKGnMaEmiwMz+cLshg/iwqdVgKOD7MH2/mevDC8bpJr8k4MMmYR/+G557bHzYxPdhdU4XeLeWAScPAaeHx3qDxz3wsT2CS0Vz/9yRPtYXmeP+omWAV0wzgUyPuSZRfwXSGzKP/hlJpwJLRyfWvkXq6BxZjyTo6CRfLnVjYB/uDJ8CrL2elIAPw5YVZ+P3h+lESkeAFTFN8omptKM9GVgyZGtXA90gMxdNPDf8zTffdBg0c8menLyeu7w1m66n4cPF7evb3vQumAq+Dw+bPn8++ZLjw3RSgFViatjs89fNXYCzxA/E57nRXs8t8EpudgErV09znvW2ydH0roF82GbYDGvYWo9EFIDvw0QcguO4PkwnCqz21+vLQWpxsuwrzvB0sEBI7i1vLtsDbCp3auVe6F+v0hGNbY6BfNi8GHCnbiYLZnQK+LD+ubjg17k+TCcK7OevdIMvOoaUlLOONBVYBXjpRtCc9npINrS3J/F8+EkHGZfVA1wftulvmZ+m5/uwb/IDJuMOyeBUgIHN5f4gZCyeKucUYEcDmLm2rW5lvfD69MySfhD2+8PmIWvsdEGuD9tuXQk8/DC3P+ybWMANjju60H+kWz3/+CyQhrLs96EAOw3RADPX/YWyniMciDasZQDv+PCLb0FqSlc2SDnD7Czg/Lt+Uj0vHfKcxvPSn6jeH6aTGnixt1H7WnH/Bp3ta6US9UVGaei6tkEBLigAtHLKeq0vutFgcLN8uNtnv12Oty0WCXiyBYDA89KPpUxacSfLh99R+bB3osB+/ko3iIZ2gyNTAVELrEUBpseW5jTWc5d0tSenM334RW/MaSC3m0vhTnUCAj5sXa7XzzFxfZhOCrBmSaL+KpgzHXMfNgn6MM3pAu/WMuDkIeD08K/2zjNWhiiK42dGlyzGKgnWItFWjW6xeu+9r15WogtC9LASfYPoEi1EjU4QRHQiPuglhEQLgsQXH9xr7zV7uHPPZBBlzYd3n+efO/55a9/83jn3f2rlaUrfuGmeWu50f4Hhn/9S/cN/xdMUXF1N3er++Dctm4cFudb7yq8NemAe5jJc9gX/mi/13Hprlli2zgl0JWbT9eEGS3pJnekcLz2zPL80PCzipScW5ZcCHkbYPLx3ZzeotyDHpp3oQQHJDgD7NDr9QNTPlk2n2ltS5wy6HJ/d1IeXrNs2NqqpD4t46ayJRGKIKQ07x0t3jMfjQw1p+Lt6btMk53aDTdNtDELPvmvzCxmc2gRwYBBMH8T/RuqcQZdjsZv6cPslAPNlqcU5Xppf85pLw87x0sCu5RtswxhMl3A+8kHXbtCtK3/Ya/L9PzAvx+aoqOdy08wOdD0ldTrQ7VrfTX24/jawjucXhnXx0uCL2GlLmnhpbl0aVnMuN7xkbT9r7PoRdD23SYaC/LUgdRrQ5Ybp/WDwgmjTHDoelvHSMLAcSMO6eGmIVQGVYWi/N7CzkzTsW5dhZ9cMfgXO5chrycf7aWs7QYMMI+zyJubh/EEMurZhXB9uIGRwgfdL5xi79NgO2U2ri5eGIWNA1S9dO4jjpWHoatsw5tcL7eGr4X0+6LVAWc+9/07Uc+/dDbIlOok5PyB1SNg3Kay24AiAo+E1d3uI/Y7nece/4yuAvXEpeRjHSx81GyjztF68xfHSo4wwgIqHm5yNDpKG2cH0JoHpU1T13CYPNia/3u31R99gPwzK0WBEtJeSh08L0M3xbjADXWzYlq1sn7zthR3PrH1+a2dGaNDtmpKHcbx087ZgG9bES2/gb9kqHg7wQq00DJsWNLVBPIMKh6MZojv5ed8DGaJ51dwsQZdfPZBhJIuKfummX/K0jnWLrpsvfyxp4qWbmEdtw5p46c7GKGz4x/nV542bf32/dAjwZaTfo2XawUPa4eHPvvFv0rk3/LNfWr9F570+/ONvHr9L556HdVw6K/8SC3PpeIDxjEjlx2D5LwXaqmMGipAdUzkfiSu2fvnDVrB1aL9Kcr8GydxoS+iI+nBPn5v6cDhWU+gM0HHpmtybjq9s8O0j3kw5l4l/ygKtxsPMSNvEkCAyjIXQpkCF2UMglNUcYBu2ZZJz2UZiPzs3WlMfZug0r3mErA8XYui0vOUEWR/WcWnuvozWpmi4VARaTa4u/gYbhjrsQ4gLQ5ErEDC3Zm3ewjbsPOcJ5Ubr6sNDygO0nUfVh4vC0NLsU1lq0XCpxStf2+QzLZ7LVD4iHrB4oBX/R1RPYMNYGBDf7+rYsJRJzrW+IBHKjdbVhyfPg1DCRZ7W5uUQiucShnVc2m2T1e/EWg2XMgdmC/DzJ9zCdZDh74R1zIGADWOZPecJ50br+qWbRCJmJhfnhzvXnWDEQRjGddrggtRzvCPWZlg5P4cjlyYDrYYMr2zOlGVLbBhmTw1mF0J/efMKNoznPKXsx30XOKrSDcR5WpnaXtmaqTqdp5W55ehDmZspDE/b+Oqe6Fs+VZktDcBSHlweM7ti8vtZYfwXp5Eu7NP+yLAE2K1v+Hqlwhf3yDCSDXyTul8wsaeJUpdA54e3msXZ5wUUPNzwSWp9uDF/F4uVQYaTXFpjfXfBpac78b7lsZtg6YIR33Op/8NzOZfJX5UFWlXPVPl8pCIyLIQCYKHAmEBFsycyrOBcGZBVYeH44jI3WlMfrhwZ7gu3SJD90sEJjXzhVXFhWJ1rtfMLl+6bnnvBEkWd1ie51N+WBVqFAFiddqptBAFsJUj+pzMzFQZs2JZZcr8mbSMFWEBWAf5FYURXH97aIlJge3G6Pnxo1YS6RdCPJZJz3fctO+kCYqV0QOh+9Pxw+j1aph08pB0eut3wZw+i+m2Gvb20fnzUmNv9ftv84Z89TO63vWkh3kRcKheaX/kfTwI1p3jx4/0px33U97XKlx/MlsGF+ULzcJ+sA0NueLhsx1hIM39YBjeLheLX3SjXyvE88q1ll3PmDCLD8r6Yr5+KPmiah8dkb5soF6b7pUtkKRKvEqbnD4uF5lcGahcLEHOKK7PzyIFlI23DmHOtlP1EHzTNw9kZgCXa0P3SWWIA8bnCMOZNG18DjEvFouZXW8fxtGIBYk6xv7UfBi+7jgxjbLbnHptdymd9CiQPhzilzctE8zAfPbQ8Ts8fthd840pmJcSvHE+ZYXJOMdyZYWcFaHh4sDmE90HTPDygbWh8nTo0D5cqEmpXpoxy/nDgPeNQGdwsFiW/mkdtfmV4yg1Tc4r9Z84sBYVh/vErX1tsv8FmSh+07vzw+XJmue2ZFDy8Ooh4ePRBo0qRzArDhRd+Kpcyf1gsKn7NV8fWvSkscq3Uc4ov3UgG5lU7e9gCteHCz0+K/Z5+uaHZxeG+s/ugeUuVIaQ8MF3iZgz1S4eZrkgrbHje9/OH24qF5NdAEk+JOcWnr95oMsxOjXDYb/CX+05uUlX2QZt4/DDql27e1nclcp7kYWhZxDe67mjbMOZNe/6wWDRcagsqFiDmFHfKlu3s2WzjbMOYh5/K/XhgtCX6oCkeLr7HjAwEmocbFzPqxkAY/tlc6jZPy20ftF4XoHkY64z0e7RMO3hIOzz8Z8De7fXP/OrG7fXP/HLO7WU6lnNxP7IjN4dFnZbWSX6lObc4qzfrOFcGZDUuERM6w7VhJW+2qVMh0xDcj4x0mIdFnZbUIX7Vz1FqO3lISMO5IiBrYt0ixYaGPBm2eVOWc33Zt6J+ZE19WNRpSZ3gV5JzRb1Zw7kiIOtFMx405M0w5k1Llu/tfmQHHa8PizotqRP8SnKuqDdrOFcEZHHzzeIeDKvLubgfWcOvok5L6SS/kpybjxekCpdz5txkQNbEkFESoPZBz4b5x6Dk0nwDs19B/cjfcDPXSW5GdVqss5BO8CvFueE5dr0Zc26JJOeKgKywMRFg9dAfMDyGc6ldzkX9yJiHs9ZJ4ebiok6r0FmpOkjlV3zfyuhcsKg3Kzg32QedDMh6AXWLArTa4M0w5tICYyxWzhX9yCQPB0WdltIJfiXrvqzeHGb1ZmfOTQZknYNmmcOj69b0ZhjzZsUEK+fifmSFTg48EnVaUif4leZc6G9Gpuo4VwZkbTAmbAEPhjWg6bGeS/Prj+ZkAdYZ/x8t/8ND8ko/PHS74Z+uc23Y7UvmT9e5Nuz2TeFP17k2bIAKODtw4LQA2h2SMi2XFipRNEDr5BxgWsfnI5G6xjg32r1hFXAacQachUIds2yWMh2Xlp1QbNWEQqROzAEmdWI+EqUrKuTeDGPgDCbP6uVquco2rOHSYkUANjQjdWIOMKkT85EonVy8GcbA2XjR6KJPgF3NbMNqLg2HGZfOZdQSL6LTcX6Vc4ApnZyPROnE4tEwBs6yxuYtmctgwwpZSnBzzJhI6eQcYEon5iPROrF4MWw3GieBs8EoXms8hAwjGeJSbqTMKFqH5gBjXShVJ+YjkTqxeDFsB1ElG407822HdkSGFTIZ3GzFX3ZW6qrcRjoxB5jQ3QynzkfCudFv0X5i8WQYA+dEo2aAvUiRYUcubQatdpXtXbIQqUNzgLHuUYquI5qPhHRZUnXNxOLRMAbOWEOjWAdAhjVcWpd/sRipE3OASZ2Yj0Tp5OLFMA3EhoZLf5MO8/D/R8v/8JCuePinG/nPw/952AMPO3ApymU2nLEZ5VVp9+PneGkd6m/W9EF7qw9ruBTlMhvO2IzyqjT7iXO8pA71N2v6oL3VhzW8iXKZDWdsRnlVmv3EOV5Sh/qbdX3QxbzUhx1480nnyjiX2VBj8+3OgPOqHPYre6iyPMdLcm4otb9Z0wftrT6s4U2Uy2zosBliVWhuFud4SR3ub9b0QRfyVB9GvBmDVN5EucyGDpvtvCqs64h4GJ3jxftZSCf6m1X3zYJyo73UhxFvPiqKeFO0Gyt4uHMqNqO8KrxfzdT90DlevF8sVYf6m5Hu4aEXKX3Q3urDGn5FucyGDpt5XhXNzeIcL6lD/c2aPmhv9WENb6JcZkODzSKviuJXcY6X1KH+Zk0ftLf6MMGbPoJLA7+GcwOkzvefh//Dw3885NdnBn9Rvur73V4AAAAASUVORK5CYII=) !important; !important}`;
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

    .wb_card-wbCardDetail-3bz_l{background-color: rgb(35,36,39)!important;}
    .wb_card-topListItemBox-7rXH3{border-bottom: 1px solid rgb(47,48,53)!important;}
    .wb_card-wbCardWrap-2iAew{border-bottom: 1px solid rgb(47,48,53)!important;}
    .wb_card-wbInfo-CLCyv a{color: rgb(204,204,204)!important;}
    .wb_card-groupnameAndGrouplevel-1KuV5{background: rgb(47,48,53)!important;}
    .wb_handle-line-FzKRd{color: rgb(125,125,125)!important;}
    .wb_handle-wbRowLine-2qn-s li{background: rgb(47,48,53)!important;}
    .wb_card-wbText-3sLfN{color: rgb(167,167,167)!important;}

    .editor-editorWrapper-2y1wx{border: 1px solid rgb(47,48,53)!important;}
    .editor-editorPluginsWrapper-3MzrC{border-top: 1px solid rgb(47,48,53)!important;border-bottom: 1px solid rgb(47,48,53)!important;background-color: rgb(47,48,53)!important;}
    .index-dyPageGoNumber-2Ib1r,.index-topTypeStyle-3MKuW,.editor-editorNotLoginMask-35J9d{background-color: rgb(47,48,53)!important;color: rgb(125,125,125)!important;}
    .index-titleInput-1uVJS{border: 1px solid rgb(47,48,53)!important;background: rgb(47,48,53)!important;color: rgb(167,167,167)!important;}
    .index-dyPage-1CwXA span, .index-dyPage-1CwXA a{color: rgb(125,125,125)!important;background-color: rgb(47,48,53)!important;border: 1px solid rgb(47,48,53)!important;}
    .editor-editorContentRoot-3QvJi{color: rgb(167,167,167)!important;}


    .wb_card-wbCardDetail-wYiL6{background: rgb(35,36,39)!important;}
    .wb_handle-wbRowLine-L5WHa>li{background: rgb(47,48,53)!important;}
    .wb_handle-line-lCiNT{color: rgb(125,125,125)!important;}
    .wb_card-wbCardWrap-OQ\\+ac{border-bottom: rgba(47,48,53,1) solid 1px !important;}
    .wb_card-groupnameAndGrouplevel-Q8fGX{background: rgb(47,48,53)!important;color: rgb(125,125,125)!important;}
    .wb_card-hiddenText-oUz98{color: rgb(125,125,125)!important;}
    .wb_card-wbCardWrap-OQ+ac,.wb_card-topListItemBox-wRCrz{border-bottom:1px solid rgba(47,48,53,1)!important;}
    .index-topTypeStyle-WHbMC{background: rgb(47,48,53)!important;color: rgb(125,125,125)!important;}
    .index-tagWrapper-x5Bnl{color: rgb(125,125,125)!important;}

    .index-dyPage-\\+pup\\+ span, .index-dyPage-\\+pup\\+ a{background-color: rgb(47,48,53)!important;border: 1px solid rgb(125,125,125)!important;}
    input[type="text"], textarea{background-color: rgb(47,48,53)!important;border: 1px solid rgb(125,125,125)!important;}

    .style-newvoteHeadAttendView-JwNdc, .style-indexLefttabcontentItemVote-VxGBz{background: rgb(47,48,53)!important;}
    .style-newvoteHead-CetsR strong{color: rgb(125,125,125)!important;}
    .style-optionWrapper-GJ6RJ{background: rgb(125,125,125)!important;}
    .style-newvotestyleTitle-j27SH{color:rgb(47,48,53)!important;}

    .index-wrapperBox-fPzNk{background: rgb(35,36,39)!important;}
    .index-content-pC8LK,.index-hotTopTitle-q1ajK,.index-title-Hmt3k{color:rgb(167,167,167)!important;}
    .index-aboutTitle-gEBas,.index-title-Hmt3k,.index-itemTitle-M\\+\\+1W{color:rgb(167,167,167)!important;}
    .index-itemContent-ti7Xk{background:rgb(47,48,53)!important;}
    .index-controlBgL-tdJKP,.index-controlBg-Pexdr{background: transparent!important;}
    .index-wrapperBox-fPzNk{border:1px solid rgb(125,125,125) !important;}
    .wb_card-wbCardWrap-4JJpr,.wb_card-topListItemBox-035It{border-bottom:1px solid rgb(125,125,125)!important;}

    .index-aboutTopic-akyQd .index-itemWrap-6-qcp{background: rgb(47,48,53)!important;}
    .index-aboutTopic-akyQd .index-topicName-a5Qxh{color:rgb(167,167,167)!important;}

    .wb_card-wbCardDetail-HysKF{background: rgb(35,36,39)!important;}
    .wb_card-wbInfo-a7-LR a,.wb_card-wbText-mwDSN{color:rgb(167,167,167)!important;}
    .wb_card-groupnameAndGrouplevel-EbL7t{background: rgb(47,48,53)!important;color: rgb(125,125,125)!important;}
    .wb_handle-wbRowLine-6D3SZ a{background: rgb(47,48,53)!important;color: rgb(125,125,125)!important;}
    .wb_handle-line-Dd0zJ{color: rgb(125,125,125)!important;}
    `)
}

function cancelNightModeIframe() {
    StyleHook_removeIframe(document.getElementsByClassName("BottomGroup")[0].getElementsByTagName("iframe")[0].contentWindow.document, "Ex_Style_NightModeIframe")
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
    html += '<span class="postbird-box-title"><span>请输入直播间/直播流地址：</span><a style="float:right;color:royalblue;" href="http://live.douyuex.com/" target="_blank">DouyuEx联播</a></span>';
    html += '</div>'; // header
    html += '<div class="postbird-box-text">';
    html += '<input id="popup-player__url" value="https://www.douyu.com/4042402" style="height:30px;box-sizing:border-box" type="text" class="postbird-prompt-input" autofocus="true">';
    html += '<label style="margin-right:30px" title="【直播流模式】&#10;1. 速度快&#10;2. 延迟低&#10;3. 占用少&#10;4. 不会进入直播间&#10;5. 支持斗鱼/虎牙/Bilibili"><input id="popup-player__noiframe" type="radio" name="sex" value="无弹幕" checked="checked">无弹幕(推荐)</label>';
    html += '<label title="【框架模式】&#10;1. 速度慢&#10;2. 占用高&#10;3. 会进入直播间&#10;4. 仅支持斗鱼&#10;此模式拖动不是很灵活，请尽量在标题栏小幅度拖动&#10;若拖动无反应请点击页面任意处触发移动"><input id="popup-player__iframe" type="radio" name="sex" value="有弹幕">有弹幕</label>';
    html += '</div>'; // text
    html += '<div class="postbird-box-footer"><button id="popup-player__cancel" class="btn-footer btn-left-footer btn-footer-cancel" style="color:undefined;">取消</button><button id="popup-player__ok" class="btn-footer btn-right-footer btn-footer-ok" style="color:#0e90d2;">确定</button></div></div>'

    a.innerHTML = html;

    let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
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
            let isStream = false;
            if (roomUrl.length > 150) {
                let confirm = window.confirm("你输入的是直播流吗？");
                if (confirm == true) {
                    isStream = true;
                }
            }
            if (isStream) {
                createNewVideo_Stream(videoPlayerArr.length, roomUrl);
            } else {
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
                    } else {
                        createNewVideo_Stream(videoPlayerArr.length, roomUrl);
                    }
                } else {
                    createNewVideo_iframe(videoPlayerArr.length, roomUrl);
                }
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
            createNewVideo_Huya(id, a[a.length - 1], a[a.length - 1]);
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
            w = Math.max(400, ev.clientX - pos.x + pos.w)
            h = Math.max(0, ev.clientY - pos.y + pos.h)
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
    getRealLive_Douyu(rid, true, false, "1", (lurl) => {
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
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='进入直播间' target='_blank' href='https://www.douyu.com/" + rid + "'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span></a>";
            html += "<select class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光4M</option><option value='8'>蓝光8M</option></option><option value='0'>原画</option></select>";
            html += "<select style='display:none' class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路5</option><option value='3'>备用线路6</option></select>";
            html += "<a style='margin-left:5px' href='" + lurl_host + "' target='_blank'>无视频？</a>";
            html += `<input id='exVideoEmbed${String(id)}' type='button' value='嵌入视频' style='height:30px;'>`;
            html += `<input id='exVideoUnEmbed${String(id)}' type='button' value='恢复视频' style='height:30px;display:none;'>`;
            html += `<input id='exVideoCopy${String(id)}' type='button' value='复制直播流' style='height:30px;'>`;
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>";
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
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
    let exVideoEmbed = document.getElementById("exVideoEmbed" + String(id));
    let exVideoUnEmbed = document.getElementById("exVideoUnEmbed" + String(id));
    let originVideo = document.getElementById("__video2");
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
                    box.style.zIndex = 1428;
                }
            }
        }
    }
    let exVideoQn = document.getElementById("exVideoQn" + String(id));
    let exVideoCDN = document.getElementById("exVideoCDN" + String(id));
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    exVideoQn.onchange = function() {
        getRealLive_Douyu(rid, true, false, exVideoQn.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    exVideoCDN.onchange = function() {
        getRealLive_Douyu(rid, true, false, exVideoQn.value, (lurl) => {
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    exVideoClose.onclick = function() {
        originVideo.style.display = "block";
        videoPlayerArr[id].destroy();
        exVideoPlayer.remove();
        box.remove();
    }

    let exVideoCopy = document.getElementById("exVideoCopy" + String(id)) || document.getElementById("exVideoRID" + String(id));
    if (exVideoCopy) {
        exVideoCopy.onclick = function() {
            getRealLive_Douyu(rid, !exVideoCopy.innerHTML.includes("斗鱼音频流"), false, exVideoQn.value, (lurl) => {
                GM_setClipboard(String(lurl).replace("https", "http"));
                showMessage("复制成功", "success");
            })
        }
    }
    if (exVideoEmbed) {
        exVideoEmbed.onclick = function() {
            originVideo.style.display = "none";
            exVideoEmbed.style.display = "none";
            exVideoUnEmbed.style.display = "inline";
            box.style.height = "0px";
            originVideo.parentElement.insertBefore(exVideoPlayer, originVideo);
        }
    }
    if (exVideoUnEmbed) {
        exVideoUnEmbed.onclick = function() {
            originVideo.style.display = "block";
            exVideoUnEmbed.style.display = "none";
            exVideoEmbed.style.display = "inline";
            box.style.height = "250px";
            box.insertBefore(exVideoPlayer, box.childNodes[box.childNodes.length - 1]);
        }
    }
}

function createNewAudio_Douyu(id, rid) {
    getRealLive_Douyu(rid, false, true, "1", (lurl) => {
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
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='复制直播流地址'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "斗鱼音频流 - " + rid + "</span></a>";
            html += "<select style='display:none' class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='0'>蓝光</option></select>";
            html += "<select style='display:none' class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路5</option><option value='3'>备用线路6</option></select>";
            html += "<a style='margin-left:5px;display:none' href='" + lurl_host + "' target='_blank'>无视频？</a>";
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>";
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
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
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='进入直播间' target='_blank' href='https://live.bilibili.com/"+  rid + "'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "Bilibili - " + rid + "</span></a>";
            html += "<select class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光</option><option value='5'>原画</option></select>";
            html += "<select class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option><option value='4'>备用线路3</option></select>";
            html += `<input id='exVideoEmbed${String(id)}' type='button' value='    ' style='height:30px;'>`;
            html += `<input id='exVideoUnEmbed${String(id)}' type='button' value='恢复视频' style='height:30px;display:none;'>`;
            html += `<input id='exVideoCopy${String(id)}' type='button' value='复制直播流' style='height:30px;'>`;
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
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
                    box.style.zIndex = 1428;
                }
            }
        }
    }
    let exVideoQn = document.getElementById("exVideoQn" + String(id));
    let exVideoCDN = document.getElementById("exVideoCDN" + String(id));
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    let exVideoEmbed = document.getElementById("exVideoEmbed" + String(id));
    let exVideoUnEmbed = document.getElementById("exVideoUnEmbed" + String(id));
    let originVideo = document.getElementById("__video2");
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
        originVideo.style.display = "block";
        videoPlayerArr[id].destroy();
        exVideoPlayer.remove();
        box.remove();
    }
    exVideoEmbed.onclick = function() {
        originVideo.style.display = "none";
        exVideoEmbed.style.display = "none";
        exVideoUnEmbed.style.display = "inline";
        box.style.height = "0px";
        originVideo.parentElement.insertBefore(exVideoPlayer, originVideo);
    }

    exVideoUnEmbed.onclick = function() {
        originVideo.style.display = "block";
        exVideoUnEmbed.style.display = "none";
        exVideoEmbed.style.display = "inline";
        box.style.height = "250px";
        box.insertBefore(exVideoPlayer, box.childNodes[box.childNodes.length - 1]);
    }


    let exVideoCopy = document.getElementById("exVideoCopy" + String(id));
    exVideoCopy.onclick = function() {
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
            html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + "'><a title='进入直播间' target='_blank' href='" + rid + "'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>" + "Huya - " + rname + "</span></a>";
            html += "<select class='exVideoQn' id='exVideoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>超清</option><option value='3'>蓝光4M</option><option value='4'>原画</option></select>";
            // html += "<select class='exVideoCDN' id='exVideoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option></select>";
            html += `<input id='exVideoEmbed${String(id)}' type='button' value='嵌入视频' style='height:30px;'>`;
            html += `<input id='exVideoUnEmbed${String(id)}' type='button' value='恢复视频' style='height:30px;display:none;'>`;
            html += `<input id='exVideoCopy${String(id)}' type='button' value='复制直播流' style='height:30px;'>`;
            html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
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
    let exVideoEmbed = document.getElementById("exVideoEmbed" + String(id));
    let exVideoUnEmbed = document.getElementById("exVideoUnEmbed" + String(id));
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
                    box.style.zIndex = 1428;
                }
            }
        }
    }
    let exVideoQn = document.getElementById("exVideoQn" + String(id));
    // let exVideoCDN = document.getElementById("exVideoCDN" + String(id));
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    let originVideo = document.getElementById("__video2");
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
        originVideo.style.display = "block";
        videoPlayerArr[id].destroy();
        exVideoPlayer.remove();
        box.remove();
    }


    let exVideoCopy = document.getElementById("exVideoCopy" + String(id));
    exVideoCopy.onclick = function() {
        getRealLive_Huya(rid, exVideoQn.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            GM_setClipboard(lurl);
            showMessage("复制成功", "success");
        })
    }
    exVideoEmbed.onclick = function() {
        originVideo.style.display = "none";
        exVideoEmbed.style.display = "none";
        exVideoUnEmbed.style.display = "inline";
        box.style.height = "0px";
        originVideo.parentElement.insertBefore(exVideoPlayer, originVideo);
    }

    exVideoUnEmbed.onclick = function() {
        originVideo.style.display = "block";
        exVideoUnEmbed.style.display = "none";
        exVideoEmbed.style.display = "inline";
        box.style.height = "250px";
        box.insertBefore(exVideoPlayer, box.childNodes[box.childNodes.length - 1]);
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
    let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
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
        videoPlayerArr[id].destroy();
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
                    box.style.zIndex = 1428;
                }
            }
        }
    }
}

// 任意直播流
function createNewVideo_Stream(id, lurl) {
    if (lurl == "" || lurl == null) return;
    let a = document.createElement("div");
    let html = "";
    a.id = "exVideoDiv" + String(id);
    a.rid = rid;
    a.className = "exVideoDiv";
    html += "<div class='exVideoInfo' id='exVideoInfo" + String(id) + `'><span class='exVideoRID' id='exVideoRID" + String(id) + "' style='color:white'>直播流${id}</span>`;
    html += `<input id='exVideoEmbed${String(id)}' type='button' value='嵌入视频' style='height:30px;'>`;
    html += `<input id='exVideoUnEmbed${String(id)}' type='button' value='恢复视频' style='height:30px;display:none;'>`;
    html += `<input id='exVideoCopy${String(id)}' type='button' value='复制直播流' style='height:30px;'>`;
    html += "<a><div class='exVideoClose' id='exVideoClose" + String(id) + "'>X</div></a>";
    html += "</div>";
    html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
    a.innerHTML = html;
    let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
    b.insertBefore(a, b.childNodes[0]);
    setElementDrag(id);
    setElementResize(id);
    setElementVideo(id, lurl);
    setElementFunc_Stream(id);
}

function setElementFunc_Stream(id) {
    let box = document.getElementById("exVideoDiv" + String(id));
    let exVideoPlayer = document.getElementById("exVideoPlayer" + String(id));
    let info = document.getElementById("exVideoInfo" + String(id));
    let scale = document.getElementById("exVideoScale" + String(id));
    let exVideoEmbed = document.getElementById("exVideoEmbed" + String(id));
    let exVideoUnEmbed = document.getElementById("exVideoUnEmbed" + String(id));
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
                    box.style.zIndex = 1428;
                }
            }
        }
    }
    let exVideoClose = document.getElementById("exVideoClose" + String(id));
    let originVideo = document.getElementById("__video2");
    exVideoClose.onclick = function() {
        originVideo.style.display = "block";
        videoPlayerArr[id].destroy();
        exVideoPlayer.remove();
        box.remove();
    }

    exVideoEmbed.onclick = function() {
        originVideo.style.display = "none";
        exVideoEmbed.style.display = "none";
        exVideoUnEmbed.style.display = "inline";
        box.style.height = "0px";
        originVideo.parentElement.insertBefore(exVideoPlayer, originVideo);
    }

    exVideoUnEmbed.onclick = function() {
        originVideo.style.display = "block";
        exVideoUnEmbed.style.display = "none";
        exVideoEmbed.style.display = "inline";
        box.style.height = "250px";
        box.insertBefore(exVideoPlayer, box.childNodes[box.childNodes.length - 1]);
    }
}

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
            PostbirdAlertBox.confirm({
                'title': '提示',
                'content': '是否屏蔽弹幕前缀（如粉丝牌、钻粉、贵族等标志）',
                'okBtn': '确定',
                'cancelBtn': '取消',
                'onConfirm': function () {
                    setRefreshBarrage();
                    saveData_Refresh();
                },
                'onCancel': function () {
                }
            });
        } else {
            cancelRefreshBarrage();
            saveData_Refresh();
        }
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
            setRefreshBarrage();
        }
    }
}
 
function setRefreshBarrage() {
    let cssText = `
    .UserCsgoGameDataMedal,.Barrage-honor,.Barrage-listItem .Barrage-icon,.Barrage-listItem .FansMedal.is-made,.Barrage-listItem .RoomLevel,.Barrage-listItem .Motor,.Barrage-listItem .ChatAchievement,.Barrage-listItem .Barrage-hiIcon,.Barrage-listItem .Medal,.Barrage-listItem .MatchSystemTeamMedal{display:none !important;}
    /*.Barrage-listItem .UserLevel{display:none !important;}*/
    .Barrage-listItem .Baby{display:none !important;}
    .FansMedalWrap{display:none !important;}
    `;
    StyleHook_set("Ex_Style_RefreshBarrage", cssText);
    current_barrage_status = 1;
    document.getElementById("refresh-barrage").classList.add("ex-active");
    document.getElementById("refresh-barrage__text").style.color = "#fff";
    document.getElementById("refresh-barrage__text").innerText = "前缀";
    let svg = document.getElementById("refresh-barrage__svg");
    if (svg) {
        let p = svg.getElementsByTagName("path")[0];
        if (p) p.setAttribute("fill", "#ffffff");
    }
}

function cancelRefreshBarrage() {
    StyleHook_remove("Ex_Style_RefreshBarrage");
    current_barrage_status = 0;
    document.getElementById("refresh-barrage").classList.remove("ex-active");
    document.getElementById("refresh-barrage__text").style.color = "";
    document.getElementById("refresh-barrage__text").innerText = "前缀";
    let svg = document.getElementById("refresh-barrage__svg");
    if (svg) {
        let p = svg.getElementsByTagName("path")[0];
        if (p) p.setAttribute("fill", "#AFAFAF");
    }
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
    a.className = "refresh-barrage";
    a.id = "refresh-barrage-frame";
	a.innerHTML = '<svg t="1588051109604" id="refresh-barrage-frame__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16"><path d="M512 128 192 448h192v448h256V448h192L512 128z" fill="#AFAFAF" p-id="3096"></path></svg><i class="Barrage-toolbarIcon"></i><span id="refresh-barrage-frame__text" class="Barrage-toolbarText">拉高</span>';
	let b = document.getElementsByClassName("Barrage-toolbar")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Refresh_BarrageFrame_Func() {
	document.getElementById("refresh-barrage-frame").addEventListener("click", function() {
        let dom_rank = document.getElementsByClassName("layout-Player-rank")[0];
        let dom_activity = document.getElementById("js-room-activity");
        let dom_topBarrage = document.getElementsByClassName("Barrage")[0];
        if (dom_rank.style.display == "none") {
            // 被拉高
            dom_rank.style.display = "block";
            dom_activity.style.display = "block";
            dom_topBarrage.className = "Barrage";
            document.getElementById("refresh-barrage-frame__text").innerText = "拉高";
            document.getElementById("refresh-barrage-frame").classList.remove("ex-active");
            document.getElementById("refresh-barrage-frame__text").style.color = "";
            let svg = document.getElementById("refresh-barrage-frame__svg");
            if (svg) {
                let p = svg.getElementsByTagName("path")[0];
                if (p) p.setAttribute("fill", "#AFAFAF");
            }
            saveData_Refresh();

        } else {
            PostbirdAlertBox.confirm({
                'title': '提示',
                'content': '是否拉高弹幕框，隐藏日榜周榜',
                'okBtn': '确定',
                'cancelBtn': '取消',
                'onConfirm': function () {
                    dom_rank.style.display = "none";
                    dom_activity.style.display = "none";
                    dom_topBarrage.className = "Barrage top-0-important";
                    document.getElementById("refresh-barrage-frame__text").innerText = "拉高";
                    document.getElementById("refresh-barrage-frame").classList.add("ex-active");
                    document.getElementById("refresh-barrage-frame__text").style.color = "#fff";
                    let svg = document.getElementById("refresh-barrage-frame__svg");
                    if (svg) {
                        let p = svg.getElementsByTagName("path")[0];
                        if (p) p.setAttribute("fill", "#ffffff");
                    }
                    saveData_Refresh();
                },
                'onCancel': function () {
                }
            });
        }
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
            let dom_activity = document.getElementById("js-room-activity");
            dom_rank.style.display = "none";
            dom_activity.style.display = "none";
            document.getElementById("refresh-barrage-frame__text").innerText = "拉高";
            document.getElementById("refresh-barrage-frame").classList.add("ex-active");
            document.getElementById("refresh-barrage-frame__text").style.color = "#fff";
            let svg = document.getElementById("refresh-barrage-frame__svg");
            if (svg) {
                let p = svg.getElementsByTagName("path")[0];
                if (p) p.setAttribute("fill", "#ffffff");
            }
        }
    }
}

let video_num = 0;
function initPkg_Refresh_Video() {
    let timer = setInterval(() => {
        const controlbar = getValidDom([".right-e7ea5d", ".right-17e251"]);
        if (controlbar) {
            clearInterval(timer);
            initPkg_Refresh_Video_Dom();
            initPkg_Refresh_Video_Func();
            initPkg_Refresh_Video_Set();
        }
        video_num++;
        if (video_num >= 100) {
            clearInterval(timer);
        }
    }, 1500);
}

function initPkg_Refresh_Video_Dom() {
	Refresh_Video_insertIcon();
}
function Refresh_Video_insertIcon() {
	let a = document.createElement("li");
    a.id = "refresh-video";
    a.innerText = "简洁模式";
    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[b.childNodes.length -1]);

    a = document.createElement("div");
    a.id = "refresh-video2";
    a.title = "视频区简洁模式";
    a.innerHTML = '<svg t="1587295753406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6410" width="22" height="22"><path d="M218.88 64l73.728 23.168c-9.792 20.608-18.432 41.216-25.792 61.824h224.896v73.408H362.688c19.648 25.728 39.36 54.08 59.008 84.992l-77.44 42.496a1235.456 1235.456 0 0 0-66.368-127.552h-47.936L189.376 288c-14.72 20.608-34.432 43.776-59.008 69.504L64 307.328C135.296 235.2 186.944 154.112 218.88 64z m383.488 0l70.08 23.168c-7.36 20.608-16 41.216-25.792 61.824h261.824v73.408h-151.168c19.648 25.728 36.864 52.8 51.648 81.088l-66.368 42.496a1440.32 1440.32 0 0 0-70.08-123.584h-59.072a594.816 594.816 0 0 1-95.872 131.264L451.2 303.424C520 231.36 570.432 151.552 602.368 64zM259.456 334.336a491.52 491.52 0 0 1 84.8 108.16l-70.08 38.592c-17.216-36.032-43.008-72.064-77.44-108.16l62.72-38.592z m125.376 48.832H832v472.576c0 33.472-7.36 59.2-22.144 77.248-14.72 17.984-36.864 27.008-66.368 27.008-24.576 0-44.352-1.28-78.784-3.84l-18.432-64c39.36 2.56 71.296 3.84 95.872 3.84 17.216 0 25.792-18.048 25.792-54.08V448.832H384.832V383.168zM128 448h64v512H128V448z m512 64.448V832H320V512.448h320zM576 640V576H384.832v64H576z m-191.168 64v64H576v-64H384.832z" p-id="6411" id="refresh-video2-svg"></path></svg>';
    b = document.getElementsByClassName("PlayerToolbar")[0];
    b.insertBefore(a, b.childNodes[0]);

    if (!document.getElementById("refresh-video3")) {
        a = document.createElement("div");
        a.id = "refresh-video3";
        a.title = "关闭简洁模式";
        a.innerText = "简";
        a.style = "position:absolute;right:18px;bottom:58px;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);color:#fff;z-index:9999;cursor:pointer;user-select:none;font-size:18px;line-height:32px;opacity:0;transform:scale(.9);transition:opacity .15s ease,transform .15s ease,background-color .15s ease;pointer-events:none;";
        b = document.getElementById("js-player-dialog");
        if (b) b.insertBefore(a, b.childNodes[0]);
    }
}

function initPkg_Refresh_Video_Func() {
    new DomHook(".right-e7ea5d", true, () => {
        changeToolBarZIndex();
    });
    new DomHook(".right-17e251", true, () => {
        changeToolBarZIndex();
    });
    new DomHook(".video__VfhVg", true, (m) => {
        for (const record of m) {
            if(record.target.className.includes("toggle__P8TKM")){
                changeToolBarZIndex();
            }
        }
    });


    function changeToolBarZIndex() {
        let video_fullPage = false;
        let video_fullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        let chatPanel_isHidden = false;
        if (document.querySelector(".wfs-2a8e83.removed-9d4c42")) {
            video_fullPage = true;
        } else if (document.querySelector(".toggle__P8TKM")) {
            video_fullPage = true;
        }
        if(document.querySelector(".shrink__Sd0uK")){
            chatPanel_isHidden = true;
        }
        const dom_player_toolbar = document.getElementById("js-player-toolbar");
        dom_player_toolbar.style = video_fullPage? "z-index:20" : "z-index:30";
        const dom_casebar = document.getElementsByClassName("case__f4yex")[0];
        if(dom_casebar){
            dom_casebar.style = (video_fullScreen || (video_fullPage && chatPanel_isHidden)) && refresh_Video_getStatus() ? "bottom: -84px;" : "bottom: 0;";
        }
        const isBeta = !!document.getElementsByClassName("live-next-body")[0];
        if (isBeta) dom_player_toolbar.parentElement.style = "z-index:20";
    }

    let dom = getValidDom([".layout-Player-video", ".stream__T55I3"]);
    let dom_video = document.getElementsByClassName("room-Player-Box")[0];
    let refresh_video3 = document.getElementById("refresh-video3");
    let timer_timeout = 0;

    function hideRefreshVideo3() {
        if (!refresh_video3) return;
        refresh_video3.style.opacity = "0";
        refresh_video3.style.transform = "scale(.9)";
        refresh_video3.style.pointerEvents = "none";
        clearTimeout(timer_timeout);
    }

    function setRefreshVideo3Show() {
        if (!refresh_video3 || !refresh_Video_getStatus()) return;
        refresh_video3.style.opacity = "1";
        refresh_video3.style.transform = "scale(1)";
        refresh_video3.style.pointerEvents = "auto";
        clearTimeout(timer_timeout);
        timer_timeout = setTimeout(() => {
            hideRefreshVideo3();
        }, 2000);
    }

    if (dom && refresh_video3) {
        dom.addEventListener("mouseenter", () => { setRefreshVideo3Show(); });
        dom.addEventListener("mouseleave", () => { hideRefreshVideo3(); });
    }
    if (dom_video && refresh_video3) {
        dom_video.addEventListener("mousemove", () => { setRefreshVideo3Show(); });
    }
    if (refresh_video3) {
        refresh_video3.addEventListener("mouseenter", () => {
            if (!refresh_Video_getStatus()) return;
            refresh_video3.style.opacity = "1";
            refresh_video3.style.transform = "scale(1.08)";
            refresh_video3.style.pointerEvents = "auto";
            refresh_video3.style.backgroundColor = "rgba(0,0,0,.7)";
            clearTimeout(timer_timeout);
        });
        refresh_video3.addEventListener("mouseleave", () => {
            if (!refresh_Video_getStatus()) return;
            refresh_video3.style.transform = "scale(1)";
            refresh_video3.style.backgroundColor = "rgba(0,0,0,.55)";
        });
    }

	document.getElementById("refresh-video").addEventListener("click", (e) => {
        let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
        let dom_video = getValidDom([".layout-Player-video", ".stream__T55I3"]);
        let dom_refresh = document.getElementById("refresh-video");
        let dom_refresh2 = document.getElementById("refresh-video2");
        let dom_refresh3 = document.getElementById("refresh-video3");
        if (dom_toolbar.style.visibility == "hidden") {
            dom_toolbar.style.visibility = "visible";
            dom_video.style = "";
            dom_refresh2.style.display = "none";
            if (dom_refresh3) {
                dom_refresh3.style.opacity = "0";
                dom_refresh3.style.transform = "scale(.9)";
                dom_refresh3.style.pointerEvents = "none";
            }
            dom_refresh.innerText = "简洁模式";
            refresh_Video_removeStyle();
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_refresh2.style.display = "block";
            dom_refresh.innerText = "✓ 简洁模式";
            refresh_Video_setStyle();
        }
        changeToolBarZIndex();
        saveData_Refresh();
        resizeWindow();
    });
    document.getElementById("refresh-video2").addEventListener("click", () => {
        let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
        let dom_video = getValidDom([".layout-Player-video", ".stream__T55I3"]);
        let dom_refresh = document.getElementById("refresh-video");
        let dom_refresh2 = document.getElementById("refresh-video2");
        let dom_refresh3 = document.getElementById("refresh-video3");
        if (dom_toolbar.style.visibility == "hidden") {
            dom_toolbar.style.visibility = "visible";
            dom_video.style = "";
            dom_refresh2.style.display = "none";
            if (dom_refresh3) {
                dom_refresh3.style.opacity = "0";
                dom_refresh3.style.transform = "scale(.9)";
                dom_refresh3.style.pointerEvents = "none";
            }
            dom_refresh.innerText = "简洁模式";
            refresh_Video_removeStyle();
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_refresh2.style.display = "block";
            dom_refresh.innerText = "✓ 简洁模式";
            refresh_Video_setStyle();
        }
        changeToolBarZIndex();
        saveData_Refresh();
        resizeWindow();
    });

    if (refresh_video3) {
        refresh_video3.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!refresh_Video_getStatus()) return;
            let dom_refresh2 = document.getElementById("refresh-video2");
            if (dom_refresh2) dom_refresh2.click();
        });
    }
}

function refresh_Video_getStatus() {
    let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
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
            let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
            let dom_video = getValidDom([".layout-Player-video", ".stream__T55I3"]);
            let dom_refresh2 = document.getElementById("refresh-video2");
            let dom_refresh = document.getElementById("refresh-video");
            let dom_refresh3 = document.getElementById("refresh-video3");
            let dom_player_toolbar = document.getElementById("js-player-toolbar");
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_player_toolbar.style = "z-index:30";
            let ret = localStorage.getItem("ExSave_FullScreen");
            if (ret != null) {
                let retJson = JSON.parse(ret);
                if (retJson.isFullScreen) {
                    dom_player_toolbar.style = "z-index:20";
                }
            }
            const isBeta = !!document.getElementsByClassName("live-next-body")[0];
            if (isBeta) dom_player_toolbar.parentElement.style = "z-index:20";
            dom_refresh2.style.display = "block";
            if (dom_refresh3) {
                dom_refresh3.style.opacity = "0";
                dom_refresh3.style.transform = "scale(.9)";
                dom_refresh3.style.pointerEvents = "none";
            }
            dom_refresh.innerText = "✓ 简洁模式";
            refresh_Video_setStyle();
            resizeWindow();
        }
    }
}

function refresh_Video_setStyle() {
    StyleHook_set("Ex_Style_VideoRefresh", `
    .PELact,.pushTower-wrapper-gf1HG,.PkView-9f6a2c,.MorePk,.RandomPKBar,.LiveRoomLoopVideo,.LiveRoomDianzan,.maiMaitView-68e80c,.PkView{display:none !important;}
    `)
}

function refresh_Video_removeStyle() {
    StyleHook_remove("Ex_Style_VideoRefresh");
}

function initPkg_RemoveAD() {
    let t = setInterval(() => {
        let a = getValidDom([".PlayerToolbar-ContentCell .PlayerToolbar-Wealth", "#js-backpack-enter"]);
        if (a != undefined) {
            clearInterval(t);
            optimizePageStyle();

            initPkg_RemoveMsgNotice();
        }
    }, 1000);
}
// .dy-ModalRadius-mask,dy-ModalRadius-wrap{display:none !important;}
function removeAD() {
    StyleHook_set("Ex_Style_RemoveAD", `
    .ScreenBannerAd,.XinghaiAd,.CustomGroupGuide,.FudaiGiftToolBarTips,.UserInfo-tryEnterHiddenLead,.BargainingKit,.AnchorPocketTips,.FishShopTip,.FollowGuide,#js-bottom-right-cloudGame,.CloudGameLink,.RoomText-icon-horn,.RoomText-list,.Search-ad,.RedEnvelopAd,.noHandlerAd-0566b9,.PcDiversion,.DropMenuList-ad,.DropPane-ad,.WXTipsBox,.igl_bg-b0724a,.closure-ab91fb,.VideoAboveVivoAd,.css-widgetWrapper-EdVVC,.watermark-442a18,.FollowGuide-FadeOut,.MatchSystemChatRoomEntry-roomTabs,.FansMedalDialog-normal,.GameLauncher,.recommendAD-54569e,.recommendApp-0e23eb,.Title-ad,.Bottom-ad,.SignBarrage,.corner-ad-495ade,.SignBaseComponent-sign-ad,.SuperFansBubble,.is-noLogin,.PlayerToolbar-signCont,#js-widget,.Frawdroom,.HeaderGif-right,.HeaderGif-left,.liveos-workspace{display:none !important;}
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

    /*恢复emoji彩色 chrome加粗情况下emoji会变灰，需要找一个fontweight起始值在500的字体库才可以兼容*/

    /*右侧分享*/
    .SharePanel,.CommonShareToolkit{
        display: none!important;
    }
    /*去除还在电脑面前的mask*/
    .mask1-63237a,.mask2-a8df6e,.panel1-1484c9,.panel2-5ece0e{
        display: none!important;
    }
    /*左侧悬浮二维码广告*/
    .IconCardAdCard{
        display: none!important;
    }
    /*视频右侧的游戏手柄按钮AD*/
    .IconCardAd {
        display: none!important;
    }
    /*视频区视频广告*/
    .CloseVideoPlayerAd,.IconCardAdBoundsBox{
        display: none!important;
    }
    /*直播间顶部广告*/
    .room-top-banner-box {
        display: none!important;
    }
    /*弹幕框底部进场弹幕信息*/
    #js-barrage-extend-container {
        display: none!important;
        display: var(--enter-display, none) !important;
    }
    /*直播间右侧广告*/
    .LadderNav {
        display: none!important;
    }
    #js-bottom-right-recommendAd {
        display: none!important;
    }
    /*弹幕框顶部广告*/
    .aside-top-uspension-box {
        display: none!important;
    }
    #js-player-asideMain {
        top: 0!important;
    }
    /*右下角联系客服*/
    .bacpCommonKeFu {
        display: none!important;
    }

    .werbungContainer__2sv7h{display:none !important;}
    #js-player-asideTopSuspension{display:none !important;}
    .Search-Panel-Advert{display:none !important;}
    `);
    // body{transform: translateZ(0)!important;}
    // .RomanticDatePanelModal-middle--small{height:220px !important;}
    // .MainDialog-main--content{height:450px !important;}
    // .RomanticDatePanelModal-middle--rowItemBottom--rowItemBottomBtn{margin-left:0px !important;margin-top:0px !important;width:170px !important;height:40px !important;background:orange !important;}
    // }
}

function optimizePageStyle() {
    // 弹幕框滚动条隐藏
    let dom_barrage = document.getElementById("js-barrage-list").parentNode;
    dom_barrage.id = "js-barrage-list-parent";
}
let isRemoveMsgNotice = 0;
function initPkg_RemoveMsgNotice() {
	initPkg_RemoveMsgNotice_Dom();
    initPkg_RemoveMsgNotice_Func();
    initPkg_RemoveMsgNotice_Set();
}

function initPkg_RemoveMsgNotice_Dom() {
	let a = document.createElement("div");
    a.style = "position: absolute;right: 5px;top: 40px;cursor: pointer;"
    a.id = "ex-removeMsgNotice";
    a.innerHTML = `<label id="msg-removeNotice" style="cursor: pointer;"><input type="checkbox" />关闭角标提醒</label>`;
    a.title = "关闭角标提醒";
	let b = document.getElementsByClassName("PrivateLetter-frame")[0];
    if (b) {
        b.appendChild(a);
    }
}

function initPkg_RemoveMsgNotice_Func() {
    let dom = document.getElementById("msg-removeNotice");
    if (!dom) return;
    let checkbox = dom.querySelector("input");
    dom.addEventListener("click", () => {
        let ischecked = checkbox.checked;
		if (ischecked == true) {
            isRemoveMsgNotice = 1;
            removeMsgNotice();
		} else{
            isRemoveMsgNotice = 0;
            removeMsgNoticeCanel();
        }
        saveData_removeMsgNotice();
    })
}

function initPkg_RemoveMsgNotice_Set() {
    let ret = localStorage.getItem("ExSave_isRemoveMsgNotice");
    if (ret && ret == "1") {
        isRemoveMsgNotice = 1;
        removeMsgNotice();
        let dom = document.getElementById("msg-removeNotice");
        if (dom) {
            dom.querySelector("input").checked = true;
        }
    }
}

function removeMsgNotice() {
    StyleHook_set("Ex_Style_RemoveMsgNotice", `.UserInfo .Badge,.ChatLetter-PopUnread{display:none!important;}`);
}

function removeMsgNoticeCanel() {
    StyleHook_remove("Ex_Style_RemoveMsgNotice");
}

function saveData_removeMsgNotice() {
    localStorage.setItem("ExSave_isRemoveMsgNotice", isRemoveMsgNotice); 
}
function initPkg_ChangeDanmakuLengthLimit() {
  let count = 0;
  let timer = setInterval(() => {
    count++;
    if (count > 100) {
      clearInterval(timer);
      return;
    }
    let dom = document.getElementsByClassName("ChatSend-txt")[0];
    if (dom != undefined) {
      changeChatTextareaMaxLength();
      clearInterval(timer);
    }
  }, 1000);
}

function changeChatTextareaMaxLength() {
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

function initPkg_RestoreYuba() {
  responseHook((url, text) => {
    if (url.indexOf("group/getBindGroup") !== -1) {
      return text.replace('"group_status":4', '"group_status":0');
    }
    return text;
  });
}

function initPkg_RestoreYuba_restore() {
  // 恢复被关闭的鱼吧
  let oldId = null;
  let newId = null;
  oldId = RestoreYuba_getYubaId(window.location.href);
  const urlParams = new URLSearchParams(window.location.search);
  const exRestore = urlParams.get("exRestore");
  if (!exRestore) return;
  newId = Number(exRestore);

  if (oldId === newId) return;

  RestoreYuba_initHook(oldId, newId);
  RestoreYuba_changeDom(oldId, newId);
}

function RestoreYuba_checkRedirect() {
  const oldId = RestoreYuba_getYubaId(window.location.href);
  if (!oldId) return;
  getYubaStatus(oldId).then((data) => {
    if (data.status_code == 3002) {
      const url = "https://yuba.douyu.com/discussion/4815048/posts?exRestore=" + oldId;
      window.location.href = url;
    }
  });
}

function RestoreYuba_getYubaId(url) {
  const match = url.match(/\/discussion\/(\d+)/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

function RestoreYuba_initHook(oldId, newId) {
  // 排除的url的关键字
  const excludeUrl = ["web/group/head", "/follow/topic", "group/unfollowGroup"];

  // 检查URL是否应该被排除
  function shouldExcludeUrl(url) {
    if (typeof url !== "string") return false;
    return excludeUrl.some((keyword) => url.includes(keyword));
  }

  // 拦截XMLHttpRequest请求
  const originalOpen = unsafeWindow.XMLHttpRequest.prototype.open;
  const originalSend = unsafeWindow.XMLHttpRequest.prototype.send;

  // 修改open方法，拦截并修改URL
  unsafeWindow.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    if (typeof url === "string" && url.includes(oldId) && !shouldExcludeUrl(url)) {
      url = url.replace(new RegExp(oldId, "g"), newId);
    }
    return originalOpen.call(this, method, url, async, user, password);
  };

  // 修改send方法，拦截并修改请求体
  unsafeWindow.XMLHttpRequest.prototype.send = function (body) {
    // 获取当前请求的URL
    const url = this.responseURL || this._url || "";

    // 如果URL应该被排除，则不处理请求体
    if (shouldExcludeUrl(url)) {
      return originalSend.call(this, body);
    }

    if (body && typeof body === "string" && body.includes(oldId)) {
      body = body.replace(new RegExp(oldId, "g"), newId);
    } else if (body && body instanceof FormData) {
      // 对FormData的处理比较复杂，需要遍历每个键值对
      const newFormData = new FormData();
      for (let pair of body.entries()) {
        const key = pair[0];
        let value = pair[1];

        if (typeof value === "string" && value.includes(oldId)) {
          value = value.replace(new RegExp(oldId, "g"), newId);
        }

        newFormData.append(key, value);
      }
      body = newFormData;
    }

    return originalSend.call(this, body);
  };

  // 拦截fetch请求
  const originalFetch = unsafeWindow.fetch;
  unsafeWindow.fetch = function (input, init) {
    // 处理URL
    let url = "";
    if (typeof input === "string") {
      url = input;
      if (input.includes(oldId) && !shouldExcludeUrl(input)) {
        input = input.replace(new RegExp(oldId, "g"), newId);
      }
    } else if (input instanceof Request) {
      url = input.url;
      if (url.includes(oldId) && !shouldExcludeUrl(url)) {
        // 创建新的Request对象
        input = new Request(url.replace(new RegExp(oldId, "g"), newId), input);
      }
    }

    // 如果URL应该被排除，则不处理请求体
    if (shouldExcludeUrl(url)) {
      return originalFetch.call(unsafeWindow, input, init);
    }

    // 处理请求体
    if (init && init.body) {
      if (typeof init.body === "string" && init.body.includes(oldId)) {
        init.body = init.body.replace(new RegExp(oldId, "g"), newId);
      } else if (init.body instanceof FormData) {
        // 对FormData的处理与上面相同
        const newFormData = new FormData();
        for (let pair of init.body.entries()) {
          const key = pair[0];
          let value = pair[1];

          if (typeof value === "string" && value.includes(oldId)) {
            value = value.replace(new RegExp(oldId, "g"), newId);
          }

          newFormData.append(key, value);
        }
        init.body = newFormData;
      }
    }

    return originalFetch.call(unsafeWindow, input, init);
  };
}

async function RestoreYuba_changeDom(oldId, newId) {
  const anchorInfo = await getYubaAnchorInfo(newId);
  if (anchorInfo) {
    const info = anchorInfo.data.generalOP[0];
    const avatar = info.avatar;
    const nickname = info.nick_name;

    function changeTitle() {
      document.querySelector(".groupavatar__9mD1S .image__GNnZC").src = avatar;
      document.getElementsByClassName("groupname__BUzOM")[0].innerText = nickname;
      document.getElementsByClassName("groupdesc__b8-53")[0].innerText = `${nickname}的鱼吧`;
      document.title = `${nickname}的鱼吧`;
    }

    changeTitle();
    new DomHook(".groupavatar__9mD1S", false, () => {
      changeTitle();
    });
  }
}

function getYubaAnchorInfo(groupId) {
  return new Promise((resolve) => {
    fetch("https://yuba.douyu.com/wbapi/web/group/managersdetail?group_id=" + groupId)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        resolve(null);
      });
  });
}

function getYubaStatus(groupId) {
  return new Promise((resolve, reject) => {
    fetch("https://yuba.douyu.com/wbapi/web/group/head?group_id=" + groupId)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const roomVipExpireDayLimit = 5;
function initPkg_RoomVip() {
  setRoomVipExpireDays();
}

function initPkg_RoomVip_Dom() {
  let a = document.createElement("span");
  a.className = "room-vip";
  a.innerHTML = `
	距VIP到期 <span id="room-vip-expire-days">**</span> 天
	`;
  let b = getValidDom(["#js-backpack-enter"]);
  if (b) {
    b = b.parentElement;
    b && b.insertBefore(a, b.childNodes[0]);
  }
}

function setRoomVipExpireDays() {
  fetch("https://www.douyu.com/member/platform_task/effect_list", {
    method: "GET",
    mode: "no-cors",
    cache: "default",
    credentials: "include"
  })
    .then((res) => {
      return res.text();
    })
    .then(async (doc) => {
      doc = new DOMParser().parseFromString(doc, "text/html");
      const enterEffectDom = doc.getElementsByClassName("enter-wraper is-effect");
      if (!enterEffectDom) return;
      if (enterEffectDom.length == 0) return;
      const showEffectMoreDom = enterEffectDom[0].getElementsByClassName("show-effect-more");
      if (!showEffectMoreDom) return;
      if (showEffectMoreDom.length == 0) return;
      for (let i = 0; i < showEffectMoreDom.length; i++) {
        const detail = JSON.parse(showEffectMoreDom[i].getAttribute("data-detail"));
        if (String(detail.property_id) !== "1646") continue; // 1646是VIP的ID
        if (String(detail.show_id_list) !== String(rid)) continue;
        const expireTime = detail.expire_time * 1000;
        const days = Math.floor((expireTime - Date.now()) / (1000 * 60 * 60 * 24));
        if (days <= roomVipExpireDayLimit) {
          initPkg_RoomVip_Dom();
          document.getElementById("room-vip-expire-days").innerText = days;
        }
      }
    })
    .catch((err) => {
      console.log("请求失败!", err);
    });
}

let isRemoveDanmakuBackground = getLocalIsRemoveDanmakuBackground();
if (isRemoveDanmakuBackground) removeDanmakuBackground();
function initPkg_Shield_RemoveDanmakuBackground() {
  const shieldTool = document.getElementsByClassName("FilterKeywords")[0];
  shieldTool.insertAdjacentHTML(
    "afterbegin",
    `<div class="FilterSwitchStatus" id="ex-removeDanmakuBackground">
    <h3>屏蔽弹幕背景</h3>
    <div>
      <span class="FilterSwitchStatus-status ${isRemoveDanmakuBackground ? "is-checked" : "is-noChecked"}">${isRemoveDanmakuBackground ? "已开启" : "未开启"}</span>
      <span class="FilterSwitchStatus-switch ${isRemoveDanmakuBackground ? "is-checked" : "is-noChecked"}">
        <span class="FilterSwitchStatus-switch-inner"></span>
      </span>
    </div>
  </div>`
  );
  
  const dom = document.getElementById("ex-removeDanmakuBackground");
  const statusSpan = dom.querySelector(".FilterSwitchStatus-status");
  const switchSpan = dom.querySelector(".FilterSwitchStatus-switch");
  dom.addEventListener("click", () => {
    isRemoveDanmakuBackground = !isRemoveDanmakuBackground;
    if (isRemoveDanmakuBackground) {
      removeDanmakuBackground();
      statusSpan.className = statusSpan.className.replace("is-noChecked", "is-checked");
      statusSpan.textContent = "已开启";
      switchSpan.className = switchSpan.className.replace("is-noChecked", "is-checked");
    } else {
      StyleHook_remove("Ex_Style_RemoveDanmakuBackground");
      statusSpan.className = statusSpan.className.replace("is-checked", "is-noChecked");
      statusSpan.textContent = "未开启";
      switchSpan.className = switchSpan.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveDanmakuBackground();
  });
}

function getLocalIsRemoveDanmakuBackground() {
  const ret = localStorage.getItem("ExSave_isRemoveDanmakuBackground");
  return ret ? Number(ret) === 1 : false;
}

function saveRemoveDanmakuBackground() {
  localStorage.setItem("ExSave_isRemoveDanmakuBackground", isRemoveDanmakuBackground ? 1 : 0);
}

function removeDanmakuBackground() {
  StyleHook_set(
    "Ex_Style_RemoveDanmakuBackground",
    `
      .danmuItem-a8616a {
        background: none !important;
      }
      .danmuItem-a8616a div{
        background: none;
      }
      .danmuItem-a8616a > img {
        display: none;
      }
      .danmuItem-a8616a div > img {
        display: none;
      }
      .super-text-f60bfa {
        background: none !important;
      }
      .danmuItem-a8616a .noble-d35c82 {
        background: none !important;
      }
      .customBarrage {
        background: none !important;
        text-shadow: none !important;
      }
      .customBarrage > div {
        background: none !important;
      }
      .PlayerCustomBarrage-prefixPlugin--text {
        display: none !important;
      }
  `
  );
}
let isRemoveDanmakuImage = getLocalIsRemoveDanmakuImage();
function initPkg_Shield_RemoveDanmakuImage() {
  const shieldTool = document.getElementsByClassName("ShieldTool-list")[0];
  shieldTool.insertAdjacentHTML(
    "beforeend",
    `
      <div class="ShieldTool-listItem ${isRemoveDanmakuImage ? "is-checked" : "is-noChecked"}" id="ex-RemoveDanmakuImage">
          <span class="ShieldTool-checkIcon"></span>
          <h5 class="ShieldTool-checkText">屏蔽DouyuEx图片</h5>
      </div>`
  );
  if (isRemoveDanmakuImage) removeDanmakuImage();
  const dom = document.getElementById("ex-RemoveDanmakuImage");
  dom.addEventListener("click", () => {
    isRemoveDanmakuImage = !isRemoveDanmakuImage;
    if (isRemoveDanmakuImage) {
      removeDanmakuImage();
      dom.className = dom.className.replace("is-noChecked", "is-checked");
    } else {
      StyleHook_remove("Ex_Style_RemoveDanmakuImage");
      dom.className = dom.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveDanmakuImage();
  });
}

function getLocalIsRemoveDanmakuImage() {
  const ret = localStorage.getItem("ExSave_isRemoveDanmakuImage");
  return ret ? Number(ret) === 1 : false;
}

function saveRemoveDanmakuImage() {
  localStorage.setItem("ExSave_isRemoveDanmakuImage", isRemoveDanmakuImage ? 1 : 0);
}

function removeDanmakuImage() {
  StyleHook_set(
    "Ex_Style_RemoveDanmakuImage",
    `
    .danmuItem-a8616a a {
      display: none !important;
    }
  `
  );
}

let isRemoveEnterBarrage = getLocalIsRemoveEnterBarrage();
function initPkg_Shield_RemoveEnter() {
  const shieldTool = document.getElementsByClassName("FilterKeywords")[0];
  let isSupported = window.CSS && window.CSS.supports && window.CSS.supports('--enter-display', 'none'); //CSS变量兼容性检测
  let barrageExtendContainer = document.getElementById("js-barrage-extend-container");
  
  if (shieldTool == undefined || !isSupported)
      return;
  
  shieldTool.insertAdjacentHTML(
    "afterbegin",
    `<div class="FilterSwitchStatus" id="ex-removeEnterBarrage">
    <h3>屏蔽进场弹幕</h3>
    <div>
      <span class="FilterSwitchStatus-status ${isRemoveEnterBarrage ? "is-checked" : "is-noChecked"}">${isRemoveEnterBarrage ? "已开启" : "未开启"}</span>
      <span class="FilterSwitchStatus-switch ${isRemoveEnterBarrage ? "is-checked" : "is-noChecked"}">
        <span class="FilterSwitchStatus-switch-inner"></span>
      </span>
    </div>
  </div>`
  );
  
  if (isRemoveEnterBarrage) {
    barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "none", "important");
  } else {
    barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "block", "important");
  }
  const dom = document.getElementById("ex-removeEnterBarrage");
  const statusSpan = dom.querySelector(".FilterSwitchStatus-status");
  const switchSpan = dom.querySelector(".FilterSwitchStatus-switch");
  dom.addEventListener("click", () => {
    isRemoveEnterBarrage = !isRemoveEnterBarrage;
    if (isRemoveEnterBarrage) {
      barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "none", "important");
      statusSpan.className = statusSpan.className.replace("is-noChecked", "is-checked");
      statusSpan.textContent = "已开启";
      switchSpan.className = switchSpan.className.replace("is-noChecked", "is-checked");
    } else {
      barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "block", "important");
      statusSpan.className = statusSpan.className.replace("is-checked", "is-noChecked");
      statusSpan.textContent = "未开启";
      switchSpan.className = switchSpan.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveEnterBarrage();
  });
}

function getLocalIsRemoveEnterBarrage() {
  const ret = localStorage.getItem("ExSave_isRemoveEnterBarrage");
  return ret ? Number(ret) === 1 : false; // 默认为false（不屏蔽进场弹幕）
}

function saveRemoveEnterBarrage() {
  localStorage.setItem("ExSave_isRemoveEnterBarrage", isRemoveEnterBarrage ? 1 : 0);
}
let isRemoveRepeatedDanmaku = getLocalIsRemoveRepeatedDanmaku();
let repeatedDanmakuSeconds = getLocalRepeatedDanmakuSeconds();
let isEnlargeDanmaku = getLocalIsEnlargeDanmaku();
// 对象存储弹幕文本和过期时间戳
let repeatedDanmakuMap = {};
let repeatedDanmakuUuidMap = {};
// 存储弹幕文本到首次出现的DOM元素的映射
let repeatedDanmakuDomMap = {};
// 存储弹幕文本的重复次数
let repeatedDanmakuCountMap = {};
// 存储弹幕DOM元素的原始fontSize
let repeatedDanmakuOriginalFontSizeMap = new WeakMap();
// 清理定时器
let repeatedDanmakuCleanupTimer = null;
let repeatedDanmakuDomHook = null;

if (isRemoveRepeatedDanmaku) removeRepeatedDanmaku();

function initPkg_Shield_RemoveRepeatedDanmaku() {
  const shieldTool = document.getElementsByClassName("FilterKeywords")[0];
  shieldTool.insertAdjacentHTML(
    "afterbegin",
    `<div class="FilterSwitchStatus" id="ex-removeRepeatedDanmaku">
    <h3>屏蔽重复弹幕</h3>
    <div>
      <span class="FilterSwitchStatus-status ${isRemoveRepeatedDanmaku ? "is-checked" : "is-noChecked"}">${isRemoveRepeatedDanmaku ? "已开启" : "未开启"}</span>
      <span class="FilterSwitchStatus-switch ${isRemoveRepeatedDanmaku ? "is-checked" : "is-noChecked"}">
        <span class="FilterSwitchStatus-switch-inner"></span>
      </span>
    </div>
  </div>
  <p class="FilterKeywords-intelligentText" style="display: flex; align-items: center;justify-content: space-between;">
    <span>
      <input type="number" id="ex-repeatedDanmakuSeconds" min="1" max="300" value="${repeatedDanmakuSeconds}" style="width: 38px; height: 14px; text-align: center;" />
      <span>秒内重复的弹幕只显示一次</span>
    </span>
    <label style="margin-left: 10px;display: inline-flex; align-items: center;">
      <input type="checkbox" id="ex-enlargeDanmaku" ${isEnlargeDanmaku ? "checked" : ""} style="margin-right: 4px;" />
      放大重复弹幕
    </label>
  </p>`
  );

  const dom = document.getElementById("ex-removeRepeatedDanmaku");
  const statusSpan = dom.querySelector(".FilterSwitchStatus-status");
  const switchSpan = dom.querySelector(".FilterSwitchStatus-switch");
  const secondsInput = document.getElementById("ex-repeatedDanmakuSeconds");
  const enlargeCheckbox = document.getElementById("ex-enlargeDanmaku");

  // 阻止输入框和checkbox点击事件冒泡
  secondsInput.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  enlargeCheckbox.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 输入框值改变事件
  secondsInput.addEventListener("input", () => {
    let value = parseInt(secondsInput.value);
    if (isNaN(value) || value < 1) {
      value = 1;
      secondsInput.value = 1;
    } else if (value > 300) {
      value = 300;
      secondsInput.value = 300;
    }
    repeatedDanmakuSeconds = value;
    setLocalRepeatedDanmakuSeconds(value);

    // 如果功能已开启，需要重启以应用新设置
    if (isRemoveRepeatedDanmaku) {
      if (repeatedDanmakuDomHook) {
        repeatedDanmakuDomHook.closeHook();
        repeatedDanmakuDomHook = null;
      }
      stopRepeatedDanmakuCleanupTimer();
      removeRepeatedDanmaku();
    }
  });

  // checkbox改变事件
  enlargeCheckbox.addEventListener("change", () => {
    isEnlargeDanmaku = enlargeCheckbox.checked;
    setLocalIsEnlargeDanmaku(isEnlargeDanmaku);
  });

  dom.addEventListener("click", () => {
    isRemoveRepeatedDanmaku = !isRemoveRepeatedDanmaku;
    if (isRemoveRepeatedDanmaku) {
      removeRepeatedDanmaku();
      statusSpan.className = statusSpan.className.replace("is-noChecked", "is-checked");
      statusSpan.textContent = "已开启";
      switchSpan.className = switchSpan.className.replace("is-noChecked", "is-checked");
    } else {
      if (repeatedDanmakuDomHook) {
        repeatedDanmakuDomHook.closeHook();
        repeatedDanmakuDomHook = null;
      }
      stopRepeatedDanmakuCleanupTimer();
      StyleHook_remove("Ex_Style_RemoveRepeatedDanmaku");
      StyleHook_remove("Ex_Style_RemoveRepeatedDanmaku_Count");
      statusSpan.className = statusSpan.className.replace("is-checked", "is-noChecked");
      statusSpan.textContent = "未开启";
      switchSpan.className = switchSpan.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveRepeatedDanmaku();
  });
}

function initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook() {
  scriptHook({
    url: "/firstqueue",
    callback: (content) => {
      let newContent = content;
      // 给弹幕飘屏添加属性
      newContent = newContent.replace(`e.display=new e.renderer(e);`, `e.display=new e.renderer(e);e.display.raw.comment=e;`);
      return newContent;
    }
  });
}

function removeRepeatedDanmaku() {
  // 添加计数显示和动画的样式
  StyleHook_set(
    "Ex_Style_RemoveRepeatedDanmaku_Count",
    `
    /* 弹幕计数显示样式 */
    [data-repeat-count]::before {
      content: "x" attr(data-repeat-count);
      font-weight: bold;
      display: inline-block;
      position: absolute;
      right: -18px;
      bottom: 0;
      font-size: 16px;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      color: inherit;
    }
    
    /* 计数跳动动画 */
    @keyframes danmaku-combo-bounce {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    
    /* 应用动画的类 */
    .danmaku-combo-animation::before {
      animation: danmaku-combo-bounce 0.2s ease-out;
    }
    `
  );

  let timer = setInterval(() => {
    const dom = document.querySelector(".danmu-fbb2a3");
    if (dom) {
      clearInterval(timer);
      // 开启定期清理定时器
      startRepeatedDanmakuCleanupTimer();

      repeatedDanmakuDomHook = new DomHook(".danmu-fbb2a3", false, (m) => {
        if (m.length <= 0) return;
        if (!isRemoveRepeatedDanmaku) return;
        if (m[0].addedNodes.length <= 0 && m[0].removedNodes.length > 0) {
          const removedDom = m[0].removedNodes[0];
          const uuid = removedDom.comment.uuid;
          const endTime = removedDom.comment.startTime + removedDom.comment.duration;
          const now = Date.now();
          if (now > endTime) return;
          // 存储过期时间戳
          repeatedDanmakuUuidMap[uuid] = now + repeatedDanmakuSeconds * 1000;

          // 清理与该弹幕相关的DOM映射，防止内存泄露
          const danmakuText = removedDom.textContent ? removedDom.textContent.trim() : "";
          if (danmakuText && repeatedDanmakuDomMap[danmakuText] === removedDom) {
            // 移除DOM引用，避免内存泄露
            delete repeatedDanmakuDomMap[danmakuText];
            delete repeatedDanmakuCountMap[danmakuText];
            // 同时清理过期时间，因为首条弹幕已经被移除了
            delete repeatedDanmakuMap[danmakuText];
          }
          return;
        }

        if (m[0].addedNodes.length <= 0) return;
        const dom = m[0].addedNodes[0];
        if (!dom) return;
        const now = Date.now();
        const uuid = dom.comment.uuid;
        // 检查 UUID 是否存在且未过期
        const uuidExpireTime = repeatedDanmakuUuidMap[uuid];
        if (uuidExpireTime && now <= uuidExpireTime) return;

        const danmakuText = dom.textContent ? dom.textContent.trim() : "";
        if (!danmakuText || danmakuText.length === 0) return;

        // 检查弹幕是否在指定秒数内出现过
        const expireTime = repeatedDanmakuMap[danmakuText];

        if (expireTime && now <= expireTime) {
          // 这是重复弹幕，隐藏它
          dom.className += " repeated-danmaku";

          // 增加重复次数
          repeatedDanmakuCountMap[danmakuText] = (repeatedDanmakuCountMap[danmakuText] || 1) + 1;

          // 如果开启了放大重复弹幕功能，找到首次出现的弹幕DOM并增加fontSize
          if (isEnlargeDanmaku) {
            const firstDom = repeatedDanmakuDomMap[danmakuText];
            if (firstDom && firstDom.parentNode) {
              // 如果还没有保存原始fontSize，先保存
              if (!repeatedDanmakuOriginalFontSizeMap.has(firstDom)) {
                const computedStyle = window.getComputedStyle(firstDom);
                const originalFontSize = computedStyle.fontSize;
                repeatedDanmakuOriginalFontSizeMap.set(firstDom, originalFontSize);
              }

              // 获取原始fontSize的数值
              const originalFontSize = repeatedDanmakuOriginalFontSizeMap.get(firstDom);
              const baseFontSize = parseFloat(originalFontSize);

              // 计算新的fontSize：每多一条重复就+2，最大40
              const repeatCount = repeatedDanmakuCountMap[danmakuText];
              const newFontSize = Math.min(baseFontSize + (repeatCount - 1) * 2, 40);
              firstDom.style.fontSize = newFontSize + "px";

              // 更新计数显示
              firstDom.setAttribute("data-repeat-count", repeatCount);

              // 触发跳动动画
              firstDom.classList.remove("danmaku-combo-animation");
              // 强制重排以重新触发动画
              void firstDom.offsetWidth;
              firstDom.classList.add("danmaku-combo-animation");
            } else if (!firstDom || !firstDom.parentNode) {
              // 如果首条弹幕的DOM已经不存在了，清理相关数据，防止内存泄露
              delete repeatedDanmakuDomMap[danmakuText];
              delete repeatedDanmakuCountMap[danmakuText];
            }
          }
        } else {
          // 首次出现的弹幕
          repeatedDanmakuMap[danmakuText] = now + repeatedDanmakuSeconds * 1000;
          repeatedDanmakuDomMap[danmakuText] = dom;
          repeatedDanmakuCountMap[danmakuText] = 1;
        }
      });
    }
  }, 1000);
}

// 定期清理过期的弹幕记录
function cleanupExpiredRepeatedDanmaku() {
  const now = Date.now();
  // 删除过期的条目，清理Map防止内存泄露
  for (const [key, expireTime] of Object.entries(repeatedDanmakuMap)) {
    if (expireTime <= now) {
      delete repeatedDanmakuMap[key];
      // 同时清理相关的DOM映射和计数，防止内存泄露
      // 不恢复fontSize，让弹幕保持放大的效果
      delete repeatedDanmakuDomMap[key];
      delete repeatedDanmakuCountMap[key];
    }
  }
  // 清理过期的 UUID 记录
  for (const [uuid, expireTime] of Object.entries(repeatedDanmakuUuidMap)) {
    if (expireTime <= now) {
      delete repeatedDanmakuUuidMap[uuid];
    }
  }
}

// 启动清理定时器
function startRepeatedDanmakuCleanupTimer() {
  if (repeatedDanmakuCleanupTimer) return; // 避免重复启动
  repeatedDanmakuCleanupTimer = setInterval(cleanupExpiredRepeatedDanmaku, 20000);
}

// 停止清理定时器
function stopRepeatedDanmakuCleanupTimer() {
  if (repeatedDanmakuCleanupTimer) {
    clearInterval(repeatedDanmakuCleanupTimer);
    repeatedDanmakuCleanupTimer = null;
  }
  // 清空对象释放内存
  repeatedDanmakuMap = {};
  repeatedDanmakuUuidMap = {};
  repeatedDanmakuDomMap = {};
  repeatedDanmakuCountMap = {};
}

function saveRemoveRepeatedDanmaku() {
  setLocalIsRemoveRepeatedDanmaku(isRemoveRepeatedDanmaku);
}

function getLocalIsRemoveRepeatedDanmaku() {
  return localStorage.getItem("ExSave_isRemoveRepeatedDanmaku") === "1";
}

function setLocalIsRemoveRepeatedDanmaku(value) {
  localStorage.setItem("ExSave_isRemoveRepeatedDanmaku", value ? "1" : "0");
}

function getLocalRepeatedDanmakuSeconds() {
  const saved = localStorage.getItem("ExSave_repeatedDanmakuSeconds");
  if (saved) {
    const value = parseInt(saved);
    if (!isNaN(value) && value >= 1 && value <= 60) {
      return value;
    }
  }
  return 5; // 默认5秒
}

function setLocalRepeatedDanmakuSeconds(value) {
  localStorage.setItem("ExSave_repeatedDanmakuSeconds", value.toString());
}

function getLocalIsEnlargeDanmaku() {
  const saved = localStorage.getItem("ExSave_isEnlargeDanmaku");
  if (saved === null) {
    return false; // 默认不开启放大功能
  }
  return saved === "1";
}

function setLocalIsEnlargeDanmaku(value) {
  localStorage.setItem("ExSave_isEnlargeDanmaku", value ? "1" : "0");
}

function initPkg_Shield() {
  // let t = setInterval(() => {
  //     if (typeof document.getElementsByClassName("ShieldTool-list")[0] !== "undefined") {
  //         clearInterval(t);
  //         initPkg_Shield_RemoveEnter();
  //         initPkg_Shield_RemoveDanmakuBackground();
  //     }
  // }, 1000);

  let t = setInterval(() => {
    if (typeof document.getElementsByClassName("BarrageFilter")[0] !== "undefined") {
      clearInterval(t);
      new DomHook(".BarrageFilter", false, (m) => {
        if (m.length === 0) return;
        if (m[0].addedNodes.length > 0 && m[0].removedNodes.length === 0) {
          const domFilterKeywords = document.getElementsByClassName("FilterKeywords")[0];
          if (domFilterKeywords) {
            initPkg_Shield_Enable();
          } else {
            let t2 = setInterval(() => {
              const domFilterKeywords = document.getElementsByClassName("FilterKeywords")[0];
              if (domFilterKeywords) {
                clearInterval(t2);
                initPkg_Shield_Enable();
              }
            }, 50);
          }
        }
      });
    }
  }, 1000);
}

function initPkg_Shield_Enable() {
  initPkg_Shield_RemoveRepeatedDanmaku();
  initPkg_Shield_RemoveEnter();
  initPkg_Shield_RemoveDanmakuBackground();
}
function initPkg_ShowDanmaku() {
    responseHook((url, text) => {
        if (url.indexOf("/betard") !== -1) {
            return text.replace('player_barrage\":0', 'player_barrage\":1');
        }
        return text;
    });
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
		// initPkg_Sign_Motorcade();
		initPkg_Sign_Room(isAll);
		// initPkg_Sign_Ad_666(); // 此处移动到鱼塘鱼丸领取中去以免观看冲突
		// initPkg_Sign_Ad_Sign(); // 2022年9月1日23:41:59 失效
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

		// initPkg_Sign_TV(); // 2022年9月1日23:41:59 失效
		// initPkg_Sign_Yuba_Like(); // 2022年9月1日23:41:59 失效
        
		// initPkg_Sign_Renlei();
		initPkg_Sign_Act();
		initPkg_Sign_ActqzsUserTask();
		// initPkg_Sign_Bowuyuan();
		// initPkg_Sign_ZBXSL2();
		// initPkg_Sign_COD();
		// initPkg_Sign_Wangzhe();
		initPkg_Sign_ReadPosts();
		initPkg_Sign_Follow();
		initPkg_Sign_FansTree();
		initPkg_Sign_SuperFans();
		initPkg_Sign_OPFOY();
		initPkg_Sign_AnchorStar();
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

// 本地化的活动地址
// {
//     "version": "2021.01.29.01",
//     "data": [{
//             "name": "斗鱼党宣",
//             "script": [{
//                 "name": "signAct",
//                 "value": "XSDXZC"
//             }, {
//                 "name": "getActRemaining",
//                 "value": "610"
//             }]
//         },
//         {
//             "name": "春节签到",
//             "script": [{
//                 "name": "doSign",
//                 "value": "20210210lhqd"
//             }]
//         },
//     ]
// }
let actList = {};

function initPkg_Sign_Act() {
    getAct();
}

async function getAct() {
    // actList = JSON.parse(decodeURIComponent(escape(window.atob(actList))) || "{}");
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

async function initPkg_Sign_ActqzsUserTask() {
  const rids = ["5189167", "290935", "6979222", "5132174", "4042402"];
  let activityId = await getActivityId(dateFormat("yyyyMM", new Date()));
  if (!activityId) {
    const currentDate = new Date();
    const nextMonth = currentDate.getMonth() + 1;
    const prevMonth = currentDate.getMonth() - 1;
    const prevMonthDate = new Date(currentDate.getFullYear(), prevMonth, 1);
    const nextMonthDate = new Date(currentDate.getFullYear(), nextMonth, 1);
    activityId = await getActivityId(dateFormat("yyyyMM", prevMonthDate));
    if (!activityId) {
      activityId = await getActivityId(dateFormat("yyyyMM", nextMonthDate));
    }
  }
  let cardArenaId = await getCardArenaId(dateFormat("yyyyMM", new Date()));
  if (!cardArenaId) {
    const currentDate = new Date();
    const nextMonth = currentDate.getMonth() + 1;
    const prevMonth = currentDate.getMonth() - 1;
    const prevMonthDate = new Date(currentDate.getFullYear(), prevMonth, 1);
    const nextMonthDate = new Date(currentDate.getFullYear(), nextMonth, 1);
    cardArenaId = await getCardArenaId(dateFormat("yyyyMM", prevMonthDate));
    if (!cardArenaId) {
      cardArenaId = await getCardArenaId(dateFormat("yyyyMM", nextMonthDate));
    }
  }
  const actIds = [activityId, cardArenaId];

  for (const actId of actIds) {
    for (const rid of rids) {
      const signinActRet = await signinAct(actId, rid);
      if (signinActRet.error == 0) {
        let gift = signinActRet.data.awards.map(item => `${item.name}x${item.num}`).join("、");
        showMessage("【一键签到】右侧活动直播间已签到，获得" + gift, "success");
      }
      const signinCardArenaRet = await signinCardArena(actId, rid);
      if (signinCardArenaRet.error == 0) {
        let gift = signinCardArenaRet.data.awards.map(item => `${item.name}x${item.num}`).join("、");
        showMessage("【一键签到】右侧活动直播间已签到，获得" + gift, "success");
      }
    }
  }
}

function getActivityId(dateStr) {
  return new Promise((resolve) => {
    fetch(`https://webconf.douyucdn.cn/resource/common/activity/actqzs${dateStr}_w.json`)
      .then((res) => {
        return res.text();
      })
      .then((ret) => {
        let json = ret.substring(
          String("DYConfigCallback(").length,
          ret.length
        );
        json = json.substring(0, json.lastIndexOf(")"));
        try {
          json = JSON.parse(json);
          resolve(json.data.activity_setting.activity_id);
        } catch (err) {
          resolve(null);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
}

function getCardArenaId(dateStr) {
  return new Promise((resolve) => {
    fetch(`https://webconf.douyucdn.cn/resource/common/activity/cardArena${dateStr}_w.json`)
      .then((res) => {
        return res.text();
      })
      .then((ret) => {
        let json = ret.substring(
          String("DYConfigCallback(").length,
          ret.length
        );
        json = json.substring(0, json.lastIndexOf(")"));
        try {
          json = JSON.parse(json);
          resolve(json.data.activity_setting.activity_id);
        } catch (err) {
          resolve(null);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
}


function signinCardArena(activityId, rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/cardArena/userTask/signIn", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&activity_id=${activityId}&rid=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}

function signinAct(activityId, rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/actqzs/userTask/signIn", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&activity_id=${activityId}&rid=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
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
async function initPkg_Sign_AnchorStar() {
  const roomListRes = await getAnchorStarRoomList().catch(() => {});
  const roomList = roomListRes.data.rankItemList;
  if (!roomList || (roomList && roomList.length == 0)) return;
  for (let i = 0; i < 3; i++) {
    const rid = roomList[i].rid;
    if (!rid) continue;
    await signAnchorStar(rid);
    await sleep(500);
  }
  showMessage("【星推】签到任务完成", "success");
  for (let i = 0; i < 5; i++) {
    const rid = roomList[i].rid;
    if (!rid) continue;
    const res = await addFollowRoom(rid);
    await sleep(500);
    if (res.error == 1) {
      // 已关注（再关注回来）
      await removeFollowRoom(rid);
      await sleep(500);
      await addFollowRoom(rid);
    } else {
      await removeFollowRoom(rid);
    }
    await sleep(500);
  }
  showMessage("【星推】关注任务完成", "success");
}

function getAnchorStarRoomList() {
  return new Promise((resolve, reject) => {
    fetch(`https://www.douyu.com/japi/livebiznc/web/anchorstardiscover/rank/info?rid=${rid}&type=5&track=3`, {
      method: "GET",
      mode: "no-cors",
      credentials: "include"
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
        reject(err);
      });
  });
}

function signAnchorStar(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/livebiznc/web/anchorstardiscover/user/task/report", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&type=5&rid=${rid}`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
        reject(err);
      });
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
async function initPkg_Sign_FansTree() {
  for (let i = 0; i < myFansBadgeList.length; i++) {
    const roomId = myFansBadgeList[i];
    let ret = await signRoomTree(roomId);
    if (ret.error !== 0) {
      showMessage(`【粉丝家园】${roomId}${ret.msg}`, "error");
    } else {
      showMessage(`【粉丝家园】${roomId}签到成功！`, "success");
    }
  }
}

function signRoomTree(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/interactnc/web/fanshome/sign", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&rid=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}
async function initPkg_Sign_Follow() {
  // 此处为了完成斗鱼等级任务
  const room_id = "3186571";
  await followRoom(room_id);
  await unfollowRoom(room_id);
}

function unfollowRoom(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/wgapi/livenc/liveweb/follow/rm", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&rid=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}

function followRoom(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/wgapi/livenc/liveweb/follow/add", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&rid=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
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
	if (!mid || mid == "") {
		closePage();
		return;
	}
	console.log("mid是：", mid);
	mid = encodeURIComponent(mid);

	GM_xmlhttpRequest({
		method: "GET",
		url: 'https://msg.douyu.com/v3/motorcade/signs/weekly?mid=' + mid + '&timestamp=' + Math.random().toFixed(17),
		responseType: "json",
		headers: {
			'dy-device-id':'-',
			"dy-client": "web",
			"dy-csrf-token":getCookie("post-csrfToken"),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function(response) {
			let ret = response.response;
			console.log("weekly:", ret);
			if (ret.data.is_sign == "1") {
				closePage();
			} else {
				GM_xmlhttpRequest({
					method: "POST",
					url: 'https://msg.douyu.com/v3/msign/add?timestamp=' + Math.random().toFixed(17),
					data: "to_mid="+ mid +"&expression=" + String(Number(ret.data.total) + 1),
					responseType: "json",
					headers: {
						'dy-device-id':'-',
						"dy-client": "web",
						"dy-csrf-token":getCookie("post-csrfToken"),
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(response) {
						
						if (Math.floor(response.response.status_code / 100) == 2){
							console.log("【车队】签到成功")
						} else {
							console.log(response.response.message);
						}
						closePage();
					}
				});
			}
		}
	});
}

function motorcadeConnect() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://msg.douyu.com/v3/login/getusersig?t=' + String(new Date().getTime()) + '&timestamp=' + Math.random().toFixed(17),
            data: '{"State":"Online"}',
            responseType: "json",
            headers: {
                'dy-device-id':'-',
				"dy-client": "web",
				"dy-csrf-token":getCookie("post-csrfToken"),
				'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
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
				if (response.response.GroupIdList && response.response.GroupIdList.length > 0) {
					resolve(response.response.GroupIdList[0].GroupId);
				} else {
					resolve("");
				}
            }
        });
    })
}
async function initPkg_Sign_OPFOY() {
  const csrfToken = await getCsrfToken();
  const ret = await signOPFOY(csrfToken);
  if (ret.error == 0 || ret.error == 31200) {
    showMessage(`【积分任务】${ret.msg}`, "success");
  } else {
    showMessage(`【积分任务】${ret.msg}`, "error");
  }
}

function signOPFOY(csrfToken) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/carnivalApi/sign/doSign", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `csrfToken=${csrfToken}&signAlias=20250521OPFOY_qd2&useJiYan=false`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
        reject(err);
      });
  });
}

function initPkg_Sign_OPFOY_Timer() {
  checkOPFOYViewStatus();
  setInterval(checkOPFOYViewStatus, 5 * 60 * 1000);
}

async function checkOPFOYViewStatus() {
  const status = await getOPFOYViewStatus();
  const taskList = status.data.taskList;
  const startTime = status.data.startTime;
  if (!taskList) return;
  for (const id in taskList) {
    const task = taskList[id];
    if (task.status !== 2) continue;
    const ret = await getOPFOYGift(id, startTime);
    if (ret.error == 0) {
      showMessage(`【积分任务】观时积分领取成功`, "success");
    } else {
      showMessage(`【积分任务】${ret.msg}`, "error");
    }
  }
}

function getOPFOYViewStatus() {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/wgapi/activitync/gametask/viewStatus", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&actAlias=20250521OPFOY`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
        reject(err);
      });
  });
}

function getOPFOYGift(id, startTime) {
  return new Promise((resolve) => {
    fetch("https://www.douyu.com/wgapi/activitync/gametask/takeGift", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&id=${id}&actAlias=20250521OPFOY&startTime=${startTime}`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

async function initPkg_Sign_ReadPosts() {
	const counts = 5;
  for (let i = 0; i < counts; i++) {
    await readPosts();
		await sleep(2000);
  }
}

function readPosts() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://yuba.douyu.com/wbapi/web/post/detail/555691541586843641?cid=&timestamp=" + new Date().getTime(),
		responseType: "json",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
      "dy-token": dyToken,
      "dy-client": "pc"
		},
		onload: function(response) {
		}
	});
}

function initPkg_Sign_Room(isAll) {
	signAllRoom(isAll);
}
function signAllRoom(isAll) {
    // 1. get page counts(1428)
    // 2. for in all pages
    // 3. sign each room
    let pageCount = 0;
    let signedCount = 0;
    let count = 0;
    fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/list?page=1428',{
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
async function initPkg_Sign_SuperFans() {
  for (let i = 0; i < myFansBadgeList.length; i++) {
    const roomId = myFansBadgeList[i];
    let ret = await signSuperFans(roomId);
    if (ret.error !== 0) {
      // showMessage(`【钻粉联赛签到】${roomId}${ret.msg}`, "error");
    } else {
      showMessage(`【钻粉联赛签到】${roomId}签到成功！`, "success");
    }
  }
}

function signSuperFans(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/interactnc/web/dfansact/userSign", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&rid=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
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
let signCountMap = {};
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

async function signYuba(group_id, t) {
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
        onload: async function (response) {
            if (signCountMap[group_id] >= 10) {
                return;
            }
            if (response.response.message == "签到失败") {
                await sleep(2000);
                signYuba(group_id, t);
                return;
            }
            if (signCountMap[group_id]) {
                signCountMap[group_id]++;
            } else {
                signCountMap[group_id] = 1;
            }
            doneYuba++;
            if (response.response.message == "") {
                signedYuba++;
                // showMessage("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp, "success");
                // console.log("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
            } else {
                // showMessage("【鱼吧】" + group_id + response.response.message, "warning");
                // console.log("【鱼吧】" + group_id + response.response.message);
            }
            
            signYubaSupplementary(group_id);
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

async function signYubaSupplementary(group_id) {
    let result = await signSupplementary(group_id);
    for (let i = 0; i < result.data.supplementary_cards; i++) {
        await signSupplementary(group_id);
    }
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
    let pid = "555691541586843641";
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
                "Referer": "https://yuba.douyu.com/p/555691541586843641"
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
function initPkg_SyncJoy() {
	initPkg_SyncJoy_Dom();
	initPkg_SyncJoy_Func();
}

function initPkg_SyncJoy_Dom() {
	SyncJoy_insertIcon();
}
function SyncJoy_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-syncjoy";
	a.innerHTML = '<a class="ex-panel__icon" title="SyncJoy"><svg style="display:block;" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="42930" width="32" height="32"><path d="M1280.012 768.4c0-10.514-0.916-21.2-2.812-31.96l-66.76-423.2C1182.812 155.92 1044.012 64 638.212 64 238.012 64 97.432 154.92 69.572 313.2L2.812 736.4a183.96 183.96 0 0 0-2.812 31.96c0 103.78 89.16 191.62 203 191.62 99.38 0 187.56-60.12 219-149.28l15-42.72h406l15 42.72c31.44 89.16 119.62 149.28 219 149.28C1190.812 958.2 1280.012 872.2 1280.012 768.4zM494.212 496l-63.92-0.02-0.08 64.02c0 26.4-21.56 48-47.96 48-26.4 0-48.04-21.6-48.04-48l0.074-64.02-64.074 0.02c-26.4 0-47.96-21.6-47.96-48s21.54-48 47.96-48l64.08-0.022L334.212 336c0-26.4 21.64-48 48.04-48s47.96 21.6 47.96 48l0.074 63.98 63.926 0.02c26.4 0 48.04 21.6 48.04 48-0.04 26.4-19.84 48-48.04 48zM864.012 622.2c-44.18 0-80-35.84-80-80s35.82-80 80-80 80 35.84 80 80c0 46-35.8 80-80 80z m128-192c-44.18 0-80-35.84-80-80s35.82-80 80-80 80 35.84 80 80c0 46-35.8 80-80 80z" p-id="42931" fill="#533566"></path></svg><i id="SyncJoy__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_SyncJoy_Func() {
	document.getElementsByClassName("ex-syncjoy")[0].addEventListener("click", function() {
        openPage("https://sb.douyuex.com/");
	});
}


// 版本号
// 格式 yyyy.MM.dd.**
var curVersion = "2026.02.04.01"
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
	a.innerHTML = '<a class="ex-panel__icon" title="版本更新，当前版本' + curVersion + '"><svg t="1578767541873" style="display:block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23715" width="32" height="32"><path d="M768 810.7H512c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h256c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z" fill="#3688FF" p-id="23716"></path><path d="M554.7 938.7c-10.9 0-21.8-4.2-30.2-12.5l-128-128c-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0 16.7 16.7 16.7 43.7 0 60.3L487 768l97.8 97.8c16.7 16.7 16.7 43.7 0 60.3-8.3 8.4-19.2 12.6-30.1 12.6z" fill="#5F6379" p-id="23717"></path></svg><i id="ex-update__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Update_Func() {
	document.getElementsByClassName("ex-update")[0].addEventListener("click", Update_openUpdatePage);
}
function checkUpdate_Src() {
	return new Promise((resolve, reject) => {
		GM_xmlhttpRequest({
				method: "GET",
				url: `https://src.douyuex.com/src/douyuex_version.txt?t=${new Date().getTime()}`,
				responseType: "text",
				onload: function(response) {
					const txt = response.response;
					if(txt != undefined){
						if (txt != curVersion) {
							resolve([true, txt]);
						}
					}
					resolve(false);
				},
				onerror: function(err) {
					console.error('请求失败', err);
					reject();
				}
		});
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
	tmp = await checkUpdate_Src().catch(err => {
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
				showMessage(`【版本更新】当前版本${curVersion}已为最新，<a href="https://html.douyuex.com/update/" target="_blank">点击查看更新内容</a>`, "success")
			}
		}
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
			showMessage(`【版本更新】当前版本${curVersion}已为最新，<a href="https://html.douyuex.com/update/" target="_blank">点击查看更新内容</a>`, "success")
		}
	}
}

function Update_openUpdatePage() {
	openPage("https://html.douyuex.com/install/web.html", true);
}

function Update_showTip(a) {
	let count = 0;
	let timer = setInterval(() => {
		let d = document.getElementById("ex-update__tip");
		count++;
		if (count > 60) return clearInterval(timer);
		if (d) {
			clearInterval(timer);
			if (a) {
				if (d.style.display != "block") {
					d.style.display = "block";
				}
			} else {
				d.style.display = "none";
			}
		}
	}, 1000);
}
function Update_showMessage() {
	let msg = `【版本更新】最新版本：${lastestVersion}，点击<a href="https://html.douyuex.com/install/web.html" target="_blank">官方源</a>或者<a href="https://greasyfork.org/zh-CN/scripts/394497" target="_blank">GreasyFork源</a>更新，<a href="https://html.douyuex.com/update/" target="_blank">点击查看更新内容</a>`
	showMessage(msg, "error", {
		timeout: 50,
	});
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
    camera_anchorName = getValidDom([".Title-anchorName", ".anchorName__6NXv9"]).innerText;
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
    <div id="ex-camera-close">×</div>
    `;
    let b = document.getElementById("js-player-dialog");
    b.insertBefore(a, b.childNodes[0]);
}

function Camera_isHidden() {
    let saved = localStorage.getItem("ExSave_Camera_Hidden");
    if (!saved) return false;
    let time = parseInt(saved);
    return Date.now() < time;
}

function initPkg_VideoTools_Camera_Func() {
    let dom = getValidDom([".layout-Player-video", ".layout-Player-videoEntity"]);
    let dom_video = document.getElementsByClassName("room-Player-Box")[0];
    let camera = document.getElementById("ex-camera");
    let closeBtn = document.getElementById("ex-camera-close");
    let gif = null;
    let timer = 0;
    let downTime = 0;
    let imgBase64;
    let timer_timeout = 0;
    let isClosed = false;
    
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("是否7天内不再显示？")) {
            localStorage.setItem("ExSave_Camera_Hidden", Date.now() + 7 * 24 * 60 * 60 * 1000);
        } else {
            isClosed = true;
        }
        camera.style.display = "none";
    });
    
    if (Camera_isHidden()) return;
    
    dom.addEventListener("mouseenter", () => {
        if (isClosed || Camera_isHidden()) return;
        camera.style.display = "flex";
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    dom_video.addEventListener("mousemove", () => {
        if (isClosed || Camera_isHidden()) return;
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    camera.addEventListener("mouseenter", () => {
        if (isClosed || Camera_isHidden()) return;
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
    })
    dom.addEventListener("mouseleave", () => {
        camera.style.display = "none";
        clearTimeout(timer_timeout);
    })
    dom_video.addEventListener("mouseleave", () => {
        camera.style.display = "none";
        clearTimeout(timer_timeout);
    })
    camera.addEventListener("mousedown", (e) => {
        if (e.target.id === "ex-camera-close") return;
        downTime = new Date().getTime();
        // 动态获取当前视频的真实分辨率
        camera_canvas_img.width = liveVideoNode.videoWidth;
        camera_canvas_img.height = liveVideoNode.videoHeight;
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
        if (e.target.id === "ex-camera-close") return;
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
    <div id="ex-camera-close">×</div>
    `;
    let b = document.getElementsByClassName("Video")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function Camera_Video_isHidden() {
    let saved = localStorage.getItem("ExSave_Camera_Hidden");
    if (!saved) return false;
    let time = parseInt(saved);
    return Date.now() < time;
}

function initPkg_VideoTools_Camera_Video_Func() {
    let dom = document.getElementsByTagName("demand-video")[0];
    let dom_video = document.getElementsByClassName("Video")[0];
    let camera = document.getElementById("ex-camera");
    let closeBtn = document.getElementById("ex-camera-close");
    let gif = null;
    let timer = 0;
    let downTime = 0;
    let imgBase64;
    let timer_timeout = 0;
    let isClosed = false;
    
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("是否7天内不再显示？")) {
            localStorage.setItem("ExSave_Camera_Hidden", Date.now() + 7 * 24 * 60 * 60 * 1000);
        } else {
            isClosed = true;
        }
        camera.style.display = "none";
    });
    
    if (Camera_Video_isHidden()) return;
    
    dom.addEventListener("mouseenter", () => {
        if (isClosed || Camera_Video_isHidden()) return;
        camera.style.display = "flex";
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    dom.addEventListener("mousemove", () => {
        if (isClosed || Camera_Video_isHidden()) return;
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    camera.addEventListener("mouseenter", () => {
        if (isClosed || Camera_Video_isHidden()) return;
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
    })
    dom.addEventListener("mouseleave", () => {
        camera.style.display = "none";
        clearTimeout(timer_timeout);
    })
    if (dom_video) {
        dom_video.addEventListener("mouseleave", () => {
            camera.style.display = "none";
            clearTimeout(timer_timeout);
        })
    }
    camera.addEventListener("mousedown", (e) => {
        if (e.target.id === "ex-camera-close") return;
        downTime = new Date().getTime();
        // 动态获取当前视频的真实分辨率
        camera_canvas_img.width = liveVideoNode.videoWidth;
        camera_canvas_img.height = liveVideoNode.videoHeight;
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
        if (e.target.id === "ex-camera-close") return;
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
	// let a = document.createElement("div");
    // a.id = "ex-cinema";
    // a.innerHTML = `
    // <div class="cinema__wrap">
    //     <div class="cinema__panel">
    //         <ul>
    //             <li id="cinema__default">默认</li>
    //             <li id="cinema__cover">剪裁</li>
    //             <li id="cinema__fill">拉伸</li>
    //         </ul>
    //     </div>
    // </div>
    // <svg t="1595353641060" class="icon" viewBox="0 0 1877 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11101" width="24" height="24"><path d="M1877.333333 1024H0V0h1877.333333v1024zM128 896h1621.333333v-768h-1621.333333v768z" p-id="11102" fill="#ffffff"></path><path d="M384 256C452.266667 256 512 315.733333 512 384S452.266667 512 384 512 256 452.266667 256 384 315.733333 256 384 256zM972.8 768c-8.533333 0-17.066667 0-25.6-8.533333-17.066667-8.533333-17.066667-25.6 0-34.133334l153.6-153.6c8.533333-8.533333 25.6-8.533333 42.666667 0l136.533333 68.266667 238.933333-187.733333c8.533333-8.533333 68.266667-51.2 102.4 0V768h-648.533333z" p-id="11103" fill="#ffffff"></path></svg>
    // `;
    // let b = document.getElementsByClassName("right-e7ea5d")[0];
    // b.insertBefore(a, b.childNodes[0]);


    let a = document.createElement("li");
    a.id = "ex-cinema";
    a.innerHTML = `
    影院比例
    <ul class="cinema__wrap">
        <li id="cinema__default">默认</li>
        <li id="cinema__cover">剪裁</li>
        <li id="cinema__fill">拉伸</li>
    </ul>
    `;

    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[1]);
}

function initPkg_VideoTools_Cinema_Func() {
    document.getElementById("cinema__default").addEventListener("click", () => {
        StyleHook_remove("Ex_Style_Cinema");
    });
    document.getElementById("cinema__cover").addEventListener("click", () => {
        setVideoCinemaMode("cover");
    });
    document.getElementById("cinema__fill").addEventListener("click", () => {
        setVideoCinemaMode("fill");
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
let icon_joysound_on = `<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjIgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+am95c291bmQvc2VsZWN0ZWQ8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0YwQ0I5NSIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRTlCRTgwIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9ImpveXNvdW5kL3NlbGVjdGVkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyLjc4NTc1MCwgMC43MTQyMjUpIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMTYuNDI4NiwwIEwxNi40Mjg2LDkuNjQzIEMxNi40Mjg2LDE0LjEzNDU1MjcgMTIuODIzMzY2NywxNy43ODQyODggOC4zNDg5MzYxOCwxNy44NTYxNjk2IEw4LjE4NzE4MTUzLDE3Ljg1NzI1NjEgTDguMTg3MTgxNTMsMTcuODU3MjU2MSBMNy44NTcxLDE3Ljg1NzI1NjEgTDcuODU3MTM4OTYsMTcuODQ5NjQxIEMzLjQ5MjM4MDEzLDE3LjY2MjA3NDQgMCwxNC4wNTMxMzQxIDAsOS42NDMwNSBDMCw1LjExMzExNTA1IDMuNjg0NDAwMiwxLjQyODU1IDguMjE0MjUsMS40Mjg1NSBDOS43MDA3OTkxMywxLjQyODU1IDExLjA5NjI5ODUsMS44MjUzNTUwMiAxMi4zMDA0MTUxLDIuNTE4NjIzMzEgQzEyLjc0OTU2ODcsMS4wNjAxNjYwMSAxNC4xMDgyMjM2LDAgMTUuNzE0MzUsMCBMMTYuNDI4NiwwIFogTTguMjE0MjUsMi40Mjg1NSBDNC4yMzY2OTQ5NiwyLjQyODU1IDEsNS42NjUzODk3OCAxLDkuNjQzMDUgQzEsMTMuNTAwNzUwOCA0LjA0NDc3MzgsMTYuNjYxNzMzMyA3Ljg1NzA4ODk5LDE2Ljg0ODU2NjggTDcuODU3MDYyNTQsMTQuNTc1MDE3IEM2Ljc3Mjk4NjcxLDE0LjQ5NzMxMDMgNS43ODQ2MTcxOSwxNC4wNjg3NDc3IDUuMDA1MTgzMTEsMTMuNDAyNTU3OCBMNC45MjI0NzY5NywxMy4zMzAyNzYyIEw0LjgwNDkyNDY4LDEzLjIyMTc5NDEgQzMuODU5Mjk3NTksMTIuMzIwNjI4MyAzLjI2OTI1LDExLjA0OTU0OTYgMy4yNjkyNSw5LjY0MzAyNSBDMy4yNjkyNSw2LjkxNTg4MjYzIDUuNDg3MTA3NjMsNC42OTgwMjUgOC4yMTQyNSw0LjY5ODAyNSBDOS44MTQwMDc1Niw0LjY5ODAyNSAxMS4yMzg0NTI3LDUuNDYxMjEyMzMgMTIuMTQyNzY0NSw2LjY0MjcxMjE1IEwxMi4xNDI3NjQ1LDMuNTk0NjQ0OTEgQzExLjAxMTU4OTYsMi44NTczNjc2NSA5LjY2MTk5NDQ5LDIuNDI4NTUgOC4yMTQyNSwyLjQyODU1IFogTTguMjE0MjUsNS42OTgwMjUgQzYuMDM5MzkyMzcsNS42OTgwMjUgNC4yNjkyNSw3LjQ2ODE2NzM3IDQuMjY5MjUsOS42NDMwMjUgQzQuMjY5MjUsMTEuNjY5NTM3MyA1LjgwNjQ4MjY0LDEzLjM0NDc0OTggNy43NzU4ODgxNSwxMy41NjM1NjcyIEw3Ljg1NzEsMTMuNTcxNSBMOC4yMTQzNSwxMy41NzE1IEMxMC4zNDk2LDEzLjU3MTUgMTIuMDg2ODUsMTEuODY4IDEyLjE0MTYsOS43NDYgTDEyLjE0MjY0NjgsOS42NDMgTDEyLjE0MjY0NjgsOS4yODIzMzIzMyBDMTEuOTU5ODU4NSw3LjI3NTc1MDI2IDEwLjI2NzQ4MjMsNS42OTgwMjUgOC4yMTQyNSw1LjY5ODAyNSBaIE04LjIxNDI1LDcuNTAwMDI1IEM5LjM5NjE5Mjg0LDcuNTAwMDI1IDEwLjM1Nyw4LjQ2MDkzMzA5IDEwLjM1Nyw5LjY0MzAyNSBDMTAuMzU3LDEwLjgyNDkxNzQgOS4zOTYxNDIzNywxMS43ODU3NzUgOC4yMTQyNSwxMS43ODU3NzUgQzcuMDMyMTgyMTUsMTEuNzg1Nzc1IDYuMDcxNSwxMC44MjQ5OTE5IDYuMDcxNSw5LjY0MzAyNSBDNi4wNzE1LDguNDYwODU4NTUgNy4wMzIxMzE2OSw3LjUwMDAyNSA4LjIxNDI1LDcuNTAwMDI1IFogTTguMjE0MjUsOC41MDAwMjUgQzcuNTg0NDYzNDgsOC41MDAwMjUgNy4wNzE1LDkuMDEzMDk2MjcgNy4wNzE1LDkuNjQzMDI1IEM3LjA3MTUsMTAuMjcyNzMwNyA3LjU4NDQ5MDQyLDEwLjc4NTc3NSA4LjIxNDI1LDEwLjc4NTc3NSBDOC44NDM4NTc2MywxMC43ODU3NzUgOS4zNTcsMTAuMjcyNjMyNiA5LjM1Nyw5LjY0MzAyNSBDOS4zNTcsOS4wMTMxOTQzMyA4Ljg0Mzg4NDU3LDguNTAwMDI1IDguMjE0MjUsOC41MDAwMjUgWiIgaWQ9IuW9oueKtiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="joysound-on"/>`;
let icon_joysound_off = `<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjIgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+am95c291bmQvbm9ybWFsPC90aXRsZT4KICAgIDxnIGlkPSJqb3lzb3VuZC9ub3JtYWwiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNzg1NzUwLCAwLjcxNDIyNSkiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi40Mjg2LDAgTDE2LjQyODYsOS42NDMgQzE2LjQyODYsMTQuMTM0NTUyNyAxMi44MjMzNjY3LDE3Ljc4NDI4OCA4LjM0ODkzNjE4LDE3Ljg1NjE2OTYgTDguMTg3MTgxNTMsMTcuODU3MjU2MSBMOC4xODcxODE1MywxNy44NTcyNTYxIEw3Ljg1NzEsMTcuODU3MjU2MSBMNy44NTcxMzg5NiwxNy44NDk2NDEgQzMuNDkyMzgwMTMsMTcuNjYyMDc0NCAwLDE0LjA1MzEzNDEgMCw5LjY0MzA1IEMwLDUuMTEzMTE1MDUgMy42ODQ0MDAyLDEuNDI4NTUgOC4yMTQyNSwxLjQyODU1IEM5LjcwMDc5OTEzLDEuNDI4NTUgMTEuMDk2Mjk4NSwxLjgyNTM1NTAyIDEyLjMwMDQxNTEsMi41MTg2MjMzMSBDMTIuNzQ5NTY4NywxLjA2MDE2NjAxIDE0LjEwODIyMzYsMCAxNS43MTQzNSwwIEwxNi40Mjg2LDAgWiBNOC4yMTQyNSwyLjQyODU1IEM0LjIzNjY5NDk2LDIuNDI4NTUgMSw1LjY2NTM4OTc4IDEsOS42NDMwNSBDMSwxMy41MDA3NTA4IDQuMDQ0NzczOCwxNi42NjE3MzMzIDcuODU3MDg4OTksMTYuODQ4NTY2OCBMNy44NTcwNjI1NCwxNC41NzUwMTcgQzYuNzcyOTg2NzEsMTQuNDk3MzEwMyA1Ljc4NDYxNzE5LDE0LjA2ODc0NzcgNS4wMDUxODMxMSwxMy40MDI1NTc4IEw0LjkyMjQ3Njk3LDEzLjMzMDI3NjIgTDQuODA0OTI0NjgsMTMuMjIxNzk0MSBDMy44NTkyOTc1OSwxMi4zMjA2MjgzIDMuMjY5MjUsMTEuMDQ5NTQ5NiAzLjI2OTI1LDkuNjQzMDI1IEMzLjI2OTI1LDYuOTE1ODgyNjMgNS40ODcxMDc2Myw0LjY5ODAyNSA4LjIxNDI1LDQuNjk4MDI1IEM5LjgxNDAwNzU2LDQuNjk4MDI1IDExLjIzODQ1MjcsNS40NjEyMTIzMyAxMi4xNDI3NjQ1LDYuNjQyNzEyMTUgTDEyLjE0Mjc2NDUsMy41OTQ2NDQ5MSBDMTEuMDExNTg5NiwyLjg1NzM2NzY1IDkuNjYxOTk0NDksMi40Mjg1NSA4LjIxNDI1LDIuNDI4NTUgWiBNOC4yMTQyNSw1LjY5ODAyNSBDNi4wMzkzOTIzNyw1LjY5ODAyNSA0LjI2OTI1LDcuNDY4MTY3MzcgNC4yNjkyNSw5LjY0MzAyNSBDNC4yNjkyNSwxMS42Njk1MzczIDUuODA2NDgyNjQsMTMuMzQ0NzQ5OCA3Ljc3NTg4ODE1LDEzLjU2MzU2NzIgTDcuODU3MSwxMy41NzE1IEw4LjIxNDM1LDEzLjU3MTUgQzEwLjM0OTYsMTMuNTcxNSAxMi4wODY4NSwxMS44NjggMTIuMTQxNiw5Ljc0NiBMMTIuMTQyNjQ2OCw5LjY0MyBMMTIuMTQyNjQ2OCw5LjI4MjMzMjMzIEMxMS45NTk4NTg1LDcuMjc1NzUwMjYgMTAuMjY3NDgyMyw1LjY5ODAyNSA4LjIxNDI1LDUuNjk4MDI1IFogTTguMjE0MjUsNy41MDAwMjUgQzkuMzk2MTkyODQsNy41MDAwMjUgMTAuMzU3LDguNDYwOTMzMDkgMTAuMzU3LDkuNjQzMDI1IEMxMC4zNTcsMTAuODI0OTE3NCA5LjM5NjE0MjM3LDExLjc4NTc3NSA4LjIxNDI1LDExLjc4NTc3NSBDNy4wMzIxODIxNSwxMS43ODU3NzUgNi4wNzE1LDEwLjgyNDk5MTkgNi4wNzE1LDkuNjQzMDI1IEM2LjA3MTUsOC40NjA4NTg1NSA3LjAzMjEzMTY5LDcuNTAwMDI1IDguMjE0MjUsNy41MDAwMjUgWiBNOC4yMTQyNSw4LjUwMDAyNSBDNy41ODQ0NjM0OCw4LjUwMDAyNSA3LjA3MTUsOS4wMTMwOTYyNyA3LjA3MTUsOS42NDMwMjUgQzcuMDcxNSwxMC4yNzI3MzA3IDcuNTg0NDkwNDIsMTAuNzg1Nzc1IDguMjE0MjUsMTAuNzg1Nzc1IEM4Ljg0Mzg1NzYzLDEwLjc4NTc3NSA5LjM1NywxMC4yNzI2MzI2IDkuMzU3LDkuNjQzMDI1IEM5LjM1Nyw5LjAxMzE5NDMzIDguODQzODg0NTcsOC41MDAwMjUgOC4yMTQyNSw4LjUwMDAyNSBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" alt="joysound-off"/>`;

function initPkg_VideoTools_Joysound() {
    initPkg_VideoTools_Joysound_Dom();
    initPkg_VideoTools_Joysound_Func();
}

function initPkg_VideoTools_Joysound_Dom() {
    Joysound_insertIcon();
}

function Joysound_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-joysound";
    a.title = "Joysound音效增强"
    if (unsafeWindow.hasInstalledJoysound && localStorage.getItem("Ex_isJoysound") == 1) {
        a.innerHTML = icon_joysound_on;
    } else {
        a.innerHTML = icon_joysound_off;
    }
    let b = getValidDom([".right-e7ea5d", ".right-17e251"]);
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_Joysound_Func() {
    let dom = document.getElementById("ex-joysound");
    document.getElementById("ex-joysound").addEventListener("click", () => {
        if (unsafeWindow.hasInstalledJoysound) {
            if (localStorage.getItem("Ex_isJoysound") == 1) {
                unsafeWindow.disableJoysound();
                dom.innerHTML = icon_joysound_off;
            } else {
                unsafeWindow.enableJoysound();
                dom.innerHTML = icon_joysound_on;
            }
        } else {
            openPage("https://src.douyuex.com/src/joysound.user.js");
        }
    })
}
let videoMetaData = null;
function initPkg_VideoTools_MetaData() {
  MetaData_init();
}

function initPkg_VideoTools_MetaData_Dom() {
  if (!videoMetaData) return;
  if (!videoMetaData.dy_cpu_model && !videoMetaData.dy_gpu_model && !videoMetaData.dy_device_model && !videoMetaData.dy_os_version && !videoMetaData.z_canvas_code) return;
  let a = document.createElement("li");
    a.id = "ex-metadata";
    a.innerHTML = `
    主播配置信息
    <ul class="metadata__wrap">
      ${videoMetaData.dy_cpu_model ? `<li title="${videoMetaData.dy_cpu_model}">🤖CPU<br/>${videoMetaData.dy_cpu_model}</li>` : ``}
      ${videoMetaData.dy_gpu_model ? `<li title="${videoMetaData.dy_gpu_model}">🎮显卡<br/>${videoMetaData.dy_gpu_model}</li>` : ``}
      ${videoMetaData.dy_device_model ? `<li title="${videoMetaData.dy_device_model}">📱设备<br/>${videoMetaData.dy_device_model}</li>` : ``}
      ${videoMetaData.dy_os_version ? `<li title="${videoMetaData.dy_os_version}">🖥️系统<br/>${videoMetaData.dy_os_version}</li>` : ``}
      ${videoMetaData.z_canvas_code ? `<li title="${videoMetaData.z_canvas_code}">🎥场景<br/>${videoMetaData.z_canvas_code}</li>` : ``}
    </ul>
    `;

    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[1]);
}

function MetaData_init() {
  getRealLive_Douyu(rid, true, false, "1", (lurl) => {
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
      let id = "Fake"
      let a = document.createElement("div");
      let html = "";
      a.id = "exVideoDiv" + id;
      a.className = "exVideoDiv";
      html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
      a.innerHTML = html;
      let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
      b.insertBefore(a, b.childNodes[0]);
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById("exVideoPlayer" + id);
        let flvPlayer = flvjs.createPlayer(
          {
            type: "flv",
            url: lurl
          },
          { fixAudioTimestampGap: false }
        );
        flvPlayer.on("media_info", (e) => {
          if (e && e.metadata) {
            videoMetaData = e.metadata;
            let box = document.getElementById("exVideoDiv" + String(id));
            let exVideoPlayer = document.getElementById("exVideoPlayer" + String(id));
            flvPlayer.destroy();
            exVideoPlayer.remove();
            box.remove();
            initPkg_VideoTools_MetaData_Dom();
          }
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
      }
    }
  });
}
let currentBrightness = "";
let currentContrast = "";
let currentSaturate = "";
let liveVideoParentClassName = "";
let isMirror = false;
let rotateAngle = 0;
let isEnhanceQuality = false;
let transformCss = {
    rotateY: "",
    rotate: "",
    scale: "",
}
let panorama = null;

// 检测是否是 Edge 浏览器
function isEdgeBrowser() {
    return /Edg/i.test(navigator.userAgent);
}

function initPkg_VideoTools_Filter() {
    liveVideoParentClassName = liveVideoNode.parentNode.className;
    initPkg_VideoTools_Filter_Dom();
    initPkg_VideoTools_Filter_Func();
}

function initPkg_VideoTools_Filter_Dom() {
    Filter_insertIcon();
    // 只在 Edge 浏览器中插入画质增强 modal
    if (isEdgeBrowser()) {
        Filter_insertEnhanceModal();
    }
}

function Filter_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-filter";
    a.innerHTML = `
    <div class="filter__wrap">
        <div class="filter__panel">
            ${isEdgeBrowser() ? `<div class="filter__enhance">
                <span class="filter__title">画质增强（不掉帧）</span>
                <div class="filter__switch" id="switch__enhance">
                    <div class="filter__switch-slider" id="slider__enhance"></div>
                </div>
            </div>` : ''}
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
                <li id="filter__reset2">重置</li>
            </ul>
        </div>
    </div>
    <svg t="1598941324196" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3146" width="24" height="24"><path d="M921.6 766.634667L257.365333 102.4a68.266667 68.266667 0 0 0-96.597333 0L102.4 160.768a68.266667 68.266667 0 0 0 0 96.597333L766.634667 921.6a68.266667 68.266667 0 0 0 96.597333 0L921.6 863.232a68.266667 68.266667 0 0 0 0-96.597333zM139.605333 199.338667l59.733334-59.733334A13.312 13.312 0 0 1 208.896 136.533333a13.653333 13.653333 0 0 1 9.898667 4.096l83.968 82.944-79.189334 79.189334-83.968-83.968a13.653333 13.653333 0 0 1 0-19.456z m744.789334 625.322666l-59.733334 59.733334a13.312 13.312 0 0 1-9.557333 4.096 13.653333 13.653333 0 0 1-9.898667-4.096L262.144 341.333333 341.333333 262.144l543.061334 543.061333a13.653333 13.653333 0 0 1 0 19.456zM230.058667 589.824l-50.517334 92.501333-92.842666 50.858667 92.842666 50.517333 50.517334 92.842667 50.517333-92.842667 92.842667-50.517333-92.842667-50.858667-50.517333-92.501333zM541.013333 270.336l31.061334-57.344 57.344-31.402667-57.344-31.402666-31.061334-57.002667-31.402666 57.002667-57.344 31.402666 57.344 31.402667 31.402666 57.344zM827.392 377.173333l21.162667-38.912L887.466667 317.098667l-38.912-21.504-21.162667-38.912-21.504 38.912-38.570667 21.504 38.570667 21.162666 21.504 38.912z" p-id="3147" fill="#ffffff"></path></svg>
    `;
    let b = getValidDom([".right-e7ea5d", ".right-17e251"]);
    b.insertBefore(a, b.childNodes[0]);

    b = document.getElementsByClassName("menu-da2a9e")[0];

    let domPanorama = document.createElement("li");
    domPanorama.id = "filter__panorama";
    domPanorama.innerText = "全景";
    b.insertBefore(domPanorama, b.childNodes[1]);

    let domMirror = document.createElement("li");
    domMirror.id = "filter__mirror";
    domMirror.innerText = "镜像画面";
    b.insertBefore(domMirror, b.childNodes[1]);

    let domRotate = document.createElement("li");
    domRotate.id = "filter__rotate";
    domRotate.innerText = "旋转画面";
    b.insertBefore(domRotate, b.childNodes[1]);

    let domReset = document.createElement("li");
    domReset.id = "filter__reset";
    domReset.innerText = "重置";
    b.insertBefore(domReset, b.childNodes[1]);

    let domDivider = document.createElement("div");
    domDivider.className = "divider-f9d33d";
    b.insertBefore(domDivider, b.childNodes[1]);
}

function Filter_insertEnhanceModal() {
    let modal = document.createElement("div");
    modal.className = "enhance-modal__panel-wrap";
    modal.innerHTML = `
        <div class="enhance-modal__panel">
            <div class="enhance-modal__close">×</div>
            <div class="enhance-modal__content">
                <img class="enhance-modal__img" src="https://c-yuba.douyucdn.cn/yubavod/b/zEqAvQaXrd5L/c16fdac3db1903db3a39a6557c2b5ab5.gif" alt=""/>
                <div class="enhance-modal__text">
                    开启后，弹幕飘屏会被遮挡，请将鼠标移入到直播画面中并点击<img style="width:32px;" src="https://c-yuba.douyucdn.cn/yubavod/b/zEqAvQaXrd5L/2dd9e0d70e39a532a2675717eb054129.png" alt="">
                    <br />
                    完成后，再<b>刷新</b>以恢复弹幕飘屏，该功能会<b>自动保存</b>
                    <br />
                    <a style="color: #ff7700;" href="https://www.microsoft.com/zh-cn/edge/features/enhance-video?form=MT0160" target="_blank">没有增强图标？</a>
                </div>
            </div>
        </div>
    `;

    let root = document.querySelector("body");
    root.insertBefore(modal, root.childNodes[0]);

    // 添加关闭事件
    modal.getElementsByClassName("enhance-modal__close")[0].addEventListener("click", () => {
        modal.style.display = "none";
    });
}

function initPkg_VideoTools_Filter_Func() {
    document.onmouseup = function () {
        document.onmousemove = null; //弹起鼠标不做任何操作
    }
    // 只在 Edge 浏览器中添加画质增强功能的事件监听
    if (isEdgeBrowser()) {
        const switchEnhance = document.getElementById("switch__enhance");
        if (switchEnhance) {
            switchEnhance.addEventListener("click", () => {
        isEnhanceQuality = !isEnhanceQuality;
        const switchElement = document.getElementById("switch__enhance");
        const slider = document.getElementById("slider__enhance");
        const enhanceModal = document.getElementsByClassName("enhance-modal__panel-wrap")[0];
        const videoDom = document.querySelector("video");
        if (isEnhanceQuality) {
            slider.style.left = "20px";
            switchElement.style.background = "#369";
            liveVideoNode.style.imageRendering = "crisp-edges";
            liveVideoNode.style.imageRendering = "-webkit-optimize-contrast";
            liveVideoNode.style.imageRendering = "optimize-contrast";
            // 显示增强画质提示弹窗
            enhanceModal.style.display = "flex";
            videoDom.style.zIndex = "10";
            videoDom.style.cursor = "auto";
        } else {
            slider.style.left = "0px";
            switchElement.style.background = "#ccc";
            liveVideoNode.style.imageRendering = "";
            // 隐藏增强画质提示弹窗
            enhanceModal.style.display = "none";
            videoDom.style.zIndex = "0";
        }
            });
        }
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

    const filterButton = document.getElementById("ex-filter");
    const filterPanel = document.getElementsByClassName("filter__wrap")[0];
    let overPanel = false;
    let timeout = null;

    filterButton.addEventListener("mouseover", function () {
        if (timeout) clearTimeout(timeout);
        filterPanel.style.display = "block";
        timeout = setTimeout(() => {
            if(!overPanel) {
                filterPanel.style.display = "none";
            }
        }, 1500);
    });

    filterPanel.addEventListener("mouseover", function() {
        overPanel = true;
    })
    filterPanel.addEventListener("mouseleave", function () {
        setTimeout(() => {
            filterPanel.style.display = "none"
            overPanel = false;
        }, 500);
    });
    
    document.getElementById("filter__reset").addEventListener("click", () => {
        resetVideoFilter();
    });
    document.getElementById("filter__reset2").addEventListener("click", () => {
        resetVideoFilter();
    });
    document.getElementById("filter__mirror").addEventListener("click", () => {
        if (!isMirror) {
            isMirror = true;
            transformCss.rotateY = "rotateY(180deg)";
        } else {
            isMirror = false;
            transformCss.rotateY = "rotateY(0deg)";
        }
        liveVideoNode.parentNode.style.transition = "all .5s";
        liveVideoNode.parentNode.style.transform = transformCss.rotateY + " " + transformCss.rotate + " " + transformCss.scale;
    });

    document.getElementById("filter__rotate").addEventListener("click", () => {
        rotateAngle += 90;
        transformCss.rotate = `rotate(${String(rotateAngle)}deg)`;
        liveVideoNode.parentNode.style.transition = "all .5s";
        if ((rotateAngle/90) % 2 !== 0) {
            if (window.innerWidth > window.innerHeight) {
                transformCss.scale = "scale(" + String(liveVideoNode.videoHeight / liveVideoNode.videoWidth) + ")";
            } else {
                transformCss.scale = "scale(" + String(liveVideoNode.videoWidth / liveVideoNode.videoHeight) + ")";
            }
        } else {
            transformCss.scale = "";
        }
        liveVideoNode.parentNode.style.transform = transformCss.rotateY + " " + transformCss.rotate + " " + transformCss.scale;
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

    document.getElementById("filter__panorama").addEventListener("click", () => {
        let tmp = document.getElementById("ex-panorama");
        if (tmp) {
            tmp.remove();
            panorama = null;
        } else {
            let node = document.getElementById("__h5player");
            let dom = document.createElement("div");
            dom.id = "ex-panorama";
            dom.style = "width:100%;height:100%;z-index:1;background:black;"
            node.insertBefore(dom, node.childNodes[0]);
            panorama = new PanoramaVideo(dom, liveVideoNode);
            panoramaAnimation(panorama);
        }
    })
}

function resetVideoFilter() {
    StyleHook_remove("Ex_Style_Filter");
    document.getElementById("filter__select").selectedIndex = 0;
    liveVideoNode.style.filter = "";
    rotateAngle = 0;
    transformCss = {
        rotateY: "",
        rotate: "",
        scale: "",
    }
    liveVideoNode.parentNode.style.transform = "";
    document.getElementById("bar__bright").style.left = "100px";
    document.getElementById("bar__contrast").style.left = "100px";
    document.getElementById("bar__saturate").style.left = "100px";

    document.getElementById("mask__bright").style.width = "100px";
    document.getElementById("mask__contrast").style.width = "100px";
    document.getElementById("mask__saturate").style.width = "100px";

    // 重置增强画质（只在 Edge 浏览器中执行）
    if (isEdgeBrowser()) {
        isEnhanceQuality = false;
        const sliderEnhance = document.getElementById("slider__enhance");
        const switchEnhance = document.getElementById("switch__enhance");
        if (sliderEnhance) {
            sliderEnhance.style.left = "0px";
        }
        if (switchEnhance) {
            switchEnhance.style.background = "#ccc";
        }
        liveVideoNode.style.imageRendering = "";
        // 隐藏增强画质提示弹窗
        const enhanceModal = document.getElementsByClassName("enhance-modal__panel-wrap")[0];
        if (enhanceModal) {
            enhanceModal.style.display = "none";
        }
    }

    // 重置全景
    let domPanorama = document.getElementById("ex-panorama");
    if (domPanorama) {
        domPanorama.remove();
        panorama = null;
    }

    // 重置缩放
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];
    domVideoWrap.style.transform = "";
    domVideoWrap.style.transformOrigin = "";
    videoScale = 1;

    // 重置影院模式
    StyleHook_remove("Ex_Style_Cinema");

    // 重置视频倍速
    liveVideoNode.playbackRate = 1;
}

function panoramaAnimation(panorama) {
    requestAnimationFrame(() => {
        panoramaAnimation(panorama)
    })
    panorama.update();
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

var VideoRecall_keydownHandler = null;

function initPkg_VideoTools_VideoRecall_Func() {
    if (VideoRecall_keydownHandler) {
        document.removeEventListener("keydown", VideoRecall_keydownHandler, true);
    }

    VideoRecall_keydownHandler = (e) => {
        if (isInput) return;
        if (e.target && (e.target.isContentEditable || /^(input|textarea)$/i.test(e.target.tagName))) return;
        if (e.keyCode != 37 && e.keyCode != 39 && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        liveVideoNode = liveVideoNode || document.querySelector(".layout-Player-videoEntity video");
        if (!liveVideoNode) return;
        e.preventDefault();
        liveVideoNode.currentTime = Math.max(0, (liveVideoNode.currentTime || 0) + (e.keyCode == 37 || e.key === "ArrowLeft" ? -3 : 3));
    };

    document.addEventListener("keydown", VideoRecall_keydownHandler, true);
}

function initPkg_VideoTools_VideoSpeed() {
    initPkg_VideoTools_VideoSpeed_Dom();
    initPkg_VideoTools_VideoSpeed_Func();
}

function initPkg_VideoTools_VideoSpeed_Dom() {
    VideoSpeed_insertIcon();
}
function VideoSpeed_insertIcon() {
    let a = document.createElement("li");
    a.id = "ex-videospeed";
    a.innerHTML = `
    倍速播放
    <ul class="videospeed__wrap">
        <li id="videospeed__2.0">2.0x</li>
        <li id="videospeed__1.5">1.5x</li>
        <li id="videospeed__1.25">1.25x</li>
        <li id="videospeed__1.0">1.0x</li>
        <li id="videospeed__0.75">0.75x</li>
        <li id="videospeed__0.5">0.5x</li>
    </ul>
    `;

    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[1]);
}

function initPkg_VideoTools_VideoSpeed_Func() {
    document.getElementById("videospeed__2.0").addEventListener("click", () => {
        liveVideoNode.playbackRate = 2;
    });
    document.getElementById("videospeed__1.5").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1.5;
    });
    document.getElementById("videospeed__1.25").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1.25;
    });
    document.getElementById("videospeed__1.0").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1;
    });
    document.getElementById("videospeed__0.75").addEventListener("click", () => {
        liveVideoNode.playbackRate = 0.75;
    });
    document.getElementById("videospeed__0.5").addEventListener("click", () => {
        liveVideoNode.playbackRate = 0.5;
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
    if (b) {
        a.style.marginLeft = "20px";
        b.insertBefore(a, b.childNodes[3]);
    } else {
        a.style.marginLeft = "8px";
        b = getValidDom([".left-bfab3b"]);
        b.insertBefore(a, b.childNodes[2]);
    }
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
        const controlbar = getValidDom([".right-e7ea5d", ".right-17e251"]);
        if (controlbar) {
            clearInterval(timer);
            liveVideoNode = document.querySelector(".layout-Player-videoEntity video");
            document.getElementsByClassName("disable-23f484")[0].innerHTML = `DouyuEx_${curVersion}`;
            initPkg_VideoTools_Module();
            initPkg_VideoTools_Func();
        }
        videotools_num++;
        if (videotools_num >= 100) {
            clearInterval(timer);
        }
    }, 1500);
}

function initPkg_VideoTools_Module() {
    // 添加模块
    initPkg_VideoTools_Joysound();
    initPkg_VideoTools_VideoSpeed();
    initPkg_VideoTools_Cinema();
    initPkg_VideoTools_VideoSync();
    initPkg_VideoTools_VideoRecall();
    initPkg_VideoTools_Filter();
    initPkg_VideoTools_Camera();
    initPkg_VideoTools_VideoZoom();
    initPkg_VideoTools_MetaData();
}

function initPkg_VideoTools_Func() {
    document.getElementById("js-player-toolbar").addEventListener("mouseover", () => {
        document.getElementsByClassName("filter__wrap")[0].style.display = "none";
    });
    document.getElementById("js-player-asideMain").addEventListener("mouseover", () => {
        document.getElementsByClassName("filter__wrap")[0].style.display = "none";
    });
    getValidDom([".inputView-2a65aa", ".inputView-620ab7"]).addEventListener("focus", () => {
        isInput = true;
    });
    
    getValidDom([".inputView-2a65aa", ".inputView-620ab7"]).addEventListener("blur", () => {
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

let videoScale = 1;
var VideoZoom_wheelHandler = null;
var VideoZoom_moveHandler = null;
var VideoZoom_upHandler = null;
var VideoZoom_drag = null;
function initPkg_VideoTools_VideoZoom() {
    let domWrap = getValidDom([".layout-Player-videoEntity", ".layout-Player-video"]);
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];

    let tx = 0;
    let ty = 0;

    if (!domWrap || !domVideoWrap) return;
    domVideoWrap.style.transformOrigin = "0 0";
    domVideoWrap.style.transition = "transform 0.1s";

    if (VideoZoom_wheelHandler) window.removeEventListener("wheel", VideoZoom_wheelHandler, true);
    VideoZoom_wheelHandler = (e) => {
        if (!e.ctrlKey) return;
        domWrap = domWrap || getValidDom([".layout-Player-videoEntity", ".layout-Player-video"]);
        domVideoWrap = domVideoWrap || document.getElementsByClassName("layout-Player-videoEntity")[0];
        if (!domWrap || !domVideoWrap) return;
        const r = domWrap.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        let px = e.clientX - r.left;
        let py = e.clientY - r.top;
        let nextScale = videoScale + (e.deltaY < 0 ? 0.1 : -0.1);
        if (nextScale < 0.1) nextScale = 0.1;
        let wx = (px - tx) / videoScale;
        let wy = (py - ty) / videoScale;
        tx = px - wx * nextScale;
        ty = py - wy * nextScale;
        videoScale = nextScale;
        if (videoScale < 0.1) videoScale = 0.1;
        domVideoWrap.style.transform = `translate(${tx}px, ${ty}px) scale(${videoScale})`;
    };
    window.addEventListener("wheel", VideoZoom_wheelHandler, { capture: true, passive: false });

    if (VideoZoom_moveHandler) window.removeEventListener("mousemove", VideoZoom_moveHandler, true);
    if (VideoZoom_upHandler) window.removeEventListener("mouseup", VideoZoom_upHandler, true);
    window.addEventListener("mousedown", (e) => {
        if (!e.ctrlKey || e.button !== 0) return;
        const r = domWrap.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
        e.preventDefault();
        domVideoWrap.style.transition = "none";
        VideoZoom_drag = { x: e.clientX, y: e.clientY, tx, ty };
    }, true);

    VideoZoom_moveHandler = (e) => {
        if (!VideoZoom_drag) return;
        tx = VideoZoom_drag.tx + (e.clientX - VideoZoom_drag.x);
        ty = VideoZoom_drag.ty + (e.clientY - VideoZoom_drag.y);
        domVideoWrap.style.transform = `translate(${tx}px, ${ty}px) scale(${videoScale})`;
    };
    VideoZoom_upHandler = () => {
        if (!VideoZoom_drag) return;
        VideoZoom_drag = null;
        domVideoWrap.style.transition = "transform 0.1s";
    };
    window.addEventListener("mousemove", VideoZoom_moveHandler, true);
    window.addEventListener("mouseup", VideoZoom_upHandler, true);
}


function initPkg_WeeklyPanel() {
    if (isShowWeeklyPanel()) {
        initPkg_WeeklyPanel_Dom();
        initPkg_WeeklyPanel_Func();
    }
}

function initPkg_WeeklyPanel_Dom() {
	let a = document.createElement("div");
	a.className = "weeklypanel__panel-wrap";
	a.innerHTML = `
		<div class="weeklypanel__panel">
            <div class="weeklypanel__close">×</div>
			<div class="weeklypanel__content">
				<div class="weeklypanel__text">😳项目维护不易，如果觉得DouyuEx有帮助到你的话</div>
				<div class="weeklypanel__text">请点击下方链接，在右上角点个免费的⭐吧！</div>
				<div class="weeklypanel__text">以鼓励我长期维护下去，感谢使用😇</div>
				<div class="weeklypanel__text"><a href="https://github.com/qianjiachun/douyuEx" target="_blank">https://github.com/qianjiachun/douyuEx</a></div>
				<img style="width: 500px;margin-top:50px;" class="weeklypanel__img" src="https://img.douyucdn.cn/data/yuba/weibo/2022/01/18/202201181035499149780732227.png"/>
			</div>
		</div>
	`;
	
	let b = document.querySelector("body");
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_WeeklyPanel_Func() {
    let weeklyPanel = document.getElementsByClassName("weeklypanel__panel-wrap")[0];
    document.getElementsByClassName("weeklypanel__close")[0].addEventListener("click", () => {
        weeklyPanel.style.display = "none";
    });
}

function isShowWeeklyPanel() {
    const LOCAL_NAME = "Ex_WeeklyPanel_NextTime";
    let tt = new Date().getTime();
    let nt = tt + 604800000;
    let nextTime = Number(localStorage.getItem(LOCAL_NAME));
    if (nextTime) {
        if (tt >= nextTime) {
            localStorage.setItem(LOCAL_NAME, nt);
            return true;
        }
    } else {
        localStorage.setItem(LOCAL_NAME, nt);
        return true;
    }
    return false;
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
    // return new Promise(resolve => {
    //     fetch('http://src.douyuex.com/src/actList.txt',{
    //         method: 'GET',
    //         mode: 'cors',
    //         cache: 'no-store',
    //         credentials: 'omit',
    //     }).then(res => {
    //         return res.text();
    //     }).then(txt => {
    //         resolve(txt);
    //     }).catch(err => {
    //         console.error('请求失败', err);
    //     })
    // })
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


// https://blog.csdn.net/hongszh/article/details/104354252
/**
 * options:
 *  - width: 视频宽度
 *  - height: 视频高度
 *  - fontSize: 字体大小
 *  - color: 字体颜色
 *  - alpha: 字体透明度 0~256
 *  - stayTime: 弹幕停留时间
 */
class ASS {
    constructor(options) {
        let defaultOptions = {
            width: 1920,
            height: 1080,
            fontSize: 36,
            alpha: this._prefixInteger(Number(0).toString(16), 2), // 0~255 0不透明 255全透明
            stayTime: 10,
            title: "Default"
        };
        this.options = {
            ...defaultOptions,
            ...options,
            ...options ? options.alpha ? this._prefixInteger(this.options.alpha.toString(16), 2) : {} : {},
        };

        this.lines = 20; // 弹幕行数
        this.lineBase = this.options.height / this.lines; // 每行高度
        this.currentLine = 0; // 当前行数
        this.diffTime = 1500; // 如果上下两条在n秒内连续发送，就换行
    }

    generate(list) {
        /**
         * list<Array>: 
         *  - time: 时间，单位毫秒
         *  - txt: 文本
         *  - color: 颜色
         */
        let sortList = list.sort((a, b) => {
            return a.time - b.time;
        })
        let result = this._getScriptInfo() + this._getV4Styles() + this._getEvents();
        for (let i = 0; i < sortList.length; i++) {
            if (i > 0 && sortList[i].time - sortList[i-1].time <= this.diffTime) {
                this.currentLine++;
            } else {
                this.currentLine = 0;
            }
            if (this.currentLine >= this.lines) {
                this.currentLine = 0;
            }
            let item = sortList[i];
            let endTime = Number(item.time) + Number(this.options.stayTime) * 1000;
            let heightOffset = this.lineBase * this.currentLine + this.options.fontSize;
            let fontWidth = this.options.fontSize * item.txt.length;
            result += `Dialogue: 0,${formatSeconds2(Number(item.time)/1000)}.00,${formatSeconds2(endTime/1000)}.00,Color${item.color},,0,0,0,,{\\move(${this.options.width + fontWidth},${heightOffset},${-fontWidth},${heightOffset})}${item.txt}\n`;
        }
        return result;
    }

    _prefixInteger(num, length) {
        num = '' + num;
        return Array(length + 1 - num.length).join('0') + num;
    }

    _getScriptInfo() {
        return `[Script Info]
; DouyuEx -By qianjiachun
; https://github.com/qianjiachun/douyuEx
ScriptType: v4.00+
Title: ${this.options.title}
PlayResX: ${this.options.width}
PlayResY: ${this.options.height}
`
    }

    _getV4Styles() {
        return `
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Color0,黑体,${this.options.fontSize},&H${this.options.alpha}FFFFFF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color7,黑体,${this.options.fontSize},&H${this.options.alpha}5456FF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color8,黑体,${this.options.fontSize},&H${this.options.alpha}2375FF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color9,黑体,${this.options.fontSize},&H${this.options.alpha}B369FE,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color10,黑体,${this.options.fontSize},&H${this.options.alpha}00BCFF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color11,黑体,${this.options.fontSize},&H${this.options.alpha}46C978,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color12,黑体,${this.options.fontSize},&H${this.options.alpha}FF7F9E,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color13,黑体,${this.options.fontSize},&H${this.options.alpha}FF9B3D,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
`
    }

    _getEvents() {
        return `
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`
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
        const CONST_DOUBLE_TIME = 0; // 双击的间隔
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
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}
// 获取斗鱼视频站post body sign
// -By 小淳
// 用法: let dyVideoSign = new DyVideoSign("视频point_id"); let sign = dyVideoSign.getSign();
// 注意: 使用完记得将实例null，point_id为window.$DATA.ROOM.point_id

class DyVideoSign {
    constructor(pointId) {
        this.pointId = pointId;
        this.decoder = new TextDecoder();
    }
    
    getSign() {
        let did = "10000000000000000000000000001501"; // DEFAULT_DID$1
        let tt = parseInt((new Date).getTime() / 1e3, 10);
        return unsafeWindow[this.d539fa2cf7732d2a(256042, "9f4f419501570ad13334")](this.pointId, did, tt);
    }

    d539fa2cf7732d2a(e, t) {
        for (var n = CryptoJS.MM(e.toString()).toString(), r = n[0].charCodeAt(0), a = n[16].charCodeAt(0), i = [], o = 0; o < 4; o++) i[o] = r << 24 | r << 16 | r << 8 | r, i[o + 4] = a << 24 | a << 16 | a << 8 | a;
        var s = Math.floor(t.length / 16) % 4,
            l = [],
            d = t.length % 8,
            c = Math.floor(t.length / 8);
        for (o = 0; o < c; o++) l[o] = 255 & parseInt(t.substr(8 * o, 2), 16) | parseInt(t.substr(8 * o + 2, 2), 16) << 8 & 65280 | parseInt(t.substr(8 * o + 4, 2), 16) << 24 >>> 8 | parseInt(t.substr(8 * o + 6, 2), 16) << 24;
        var p = [];
        p = 0 == s ? e86500e2(l, i) : 1 == s ? this.c30070a4(l, i) : d831eb20(l, i);
        var h = [];
        for (o = 0; o < p.length; o++) {
            var f = 255 & p[o],
                u = p[o] >>> 8 & 255,
                m = p[o] >>> 16 & 255,
                g = p[o] >>> 24 & 255;
            f && h.push(f), u && h.push(u), m && h.push(m), g && h.push(g)
        }
        var b = Math.floor(d / 2);
        for (o = 0; o < b; o++) h.push(255 & parseInt(t.substr(8 * c + 2 * o, 2), 16));
        return this.decoder.decode(new Uint8Array(h))
    }

    c30070a4(e, t) {
        for (var n = Math.floor(e.length / 2), r = e.slice(0), a = 0; a < n; a++) {
            var i = this.f5a40d76(e.slice(2 * a, 2 * a + 2), 32, t.slice(4 * a % 8, 4 * a % 8 + 4));
            r[2 * a + 0] = i[0], r[2 * a + 1] = i[1]
        }
        return r
    }

    f5a40d76(e, t, n) {
        for (var r = 0; r < e.length; r += 2) {
            var a, i = e[r],
                o = e[r + 1],
                s = 2654435769 * t;
            for (a = 0; a < t; a++) i -= ((o -= (i << 4 ^ i >>> 5) + i ^ s + n[s >>> 11 & 3]) << 4 ^ o >>> 5) + o ^ (s -= 2654435769) + n[3 & s];
            e[r] = i, e[r + 1] = o
        }
        return e
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

function M3U8() {
    var _this = this; // access root scope

    this.ie = navigator.appVersion.toString().indexOf(".NET") > 0;
    this.ios = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);


    this.start = function(m3u8, options) {

        if (!options)
            options = {};

        var callbacks = {
            progress: null,
            finished: null,
            error: null,
            aborted: null
        }

        var recur; // the recursive download instance to later be initialized. Scoped here so callbakcs can access and manage it.

        function handleCb(key, payload) {
            if (key && callbacks[key])
                callbacks[key](payload);
        }

        if (_this.ios)
            return handleCb("error", "Downloading on IOS is not supported.");

        var startObj = {
            on: function(str, cb) {
                switch (str) {
                    case "progress": {
                        callbacks.progress = cb;
                        break;
                    }
                    case "finished": {
                        callbacks.finished = cb;
                        break;
                    }
                    case "error": {
                        callbacks.error = cb;
                        break;
                    }
                    case "aborted": {
                        callbacks.aborted = cb;
                        break;
                    }
                }

                return startObj;
            },
            abort: function() {
                ;
                recur && (recur.aborted = function() {
                    handleCb("aborted");
                });
            }
        }

        var download = new Promise(function(resolve, reject) {
            var url = new URL(m3u8);

            var req = fetch(m3u8)
                .then(function(d) {
                    return d.text();
                })
                .then(function(d) {

                    var filtered = filter(d.split(/(\r\n|\r|\n)/gi), function(item) {
                        return item.indexOf(".ts") > -1; // select only ts files
                    });

                    var mapped = map(filtered, function(v, i) {
                        if (v.indexOf("http") === 0 || v.indexOf("ftp") === 0) { // absolute url
                            return v;
                        }
                        return url.protocol + "//" + url.host + url.pathname + "/./../" + v; // map ts files into url
                    });

                    if (!mapped.length) {
                        reject("Invalid m3u8 playlist");
                        return handleCb("error", "Invalid m3u8 playlist");
                    }

                    recur = new RecurseDownload(mapped, function(data) {

                        var blob = new Blob(data, {
                            type: "octet/stream"
                        });

                        handleCb("progress", {
                            status: "Processing..."
                        });

                        if (!options.returnBlob) {
                            if (_this.ios) {
                                // handle ios?
                            } else if (_this.ie) {
                                handleCb("progress", {
                                    status: "Sending video to Internet Explorer... this may take a while depending on your device's performance."
                                });
                                window.navigator.msSaveBlob(blob, (options && options.filename) || "video.mp4");
                            } else {
                                handleCb("progress", {
                                    status: "Sending video to browser..."
                                });
                                var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                                a.href = URL.createObjectURL(blob);
                                a.download = (options && options.filename) || "video.mp4";
                                a.style.display = "none";
                                document.body.appendChild(a); // Firefox fix
                                a.click();
                                handleCb("finished", {
                                    status: "Successfully downloaded video",
                                    data: blob
                                });
                                resolve(blob);
                            }
                        } else {
                            handleCb("finished", {
                                status: "Successfully downloaded video",
                                data: blob
                            });
                            resolve(blob)
                        }


                    }, 0, []);

                    recur.onprogress = function(obj) {
                        handleCb("progress", obj);
                    }

                })
                .catch(function(err) {
                    handleCb("error", "Something went wrong when downloading m3u8 playlist: " + err);
                });
        });

        return startObj;

    }

    function RecurseDownload(arr, cb, i, data) { // recursively download asynchronously 2 at the time
        var _this = this;

        this.aborted = false;
        this.threadNum = 10;
        this.step = 0;

        recurseDownload(arr, cb, i, data);

        function recurseDownload(arr, cb, i, data) {
            let taskList = [];
            for (let j = 0; j < _this.threadNum; j++) {
                if (arr[i+j]) {
                    taskList.push(fetch(arr[i+j]).catch(err => {
                        fetch(arr[i+j]).catch(err => {
                            fetch(arr[i+j]);
                        })
                    }));
                } else {
                    taskList.push(Promise.resolve());
                    break;
                }
            }
            _this.step = taskList.length;
            var req = Promise.all(taskList) // HTTP protocol dictates only TWO requests can be simultaneously performed
                .then(function(d) {
                    return map(filter(d, function(v) {
                        return v && v.blob;
                    }), function(v) {
                        return v.blob();
                    });
                })
                .then(function(d) {
                    return Promise.all(d);
                })
                .then(function(d) {

                    var blobs = map(d, function(v, j) {
                        return new Promise(function(resolve, reject) {
                            var reader = new FileReader();

                            var read = reader.readAsArrayBuffer(new Blob([v], {
                                type: "octet/stream"
                            })); // IE can't read Blob.arrayBuffer :(

                            reader.addEventListener("loadend", function(event) { 

                                resolve(reader.result);;
                                (_this.onprogress && _this.onprogress({
                                    segment: i + j + 1,
                                    total: arr.length,
                                    percentage: ((i + j + 1) / arr.length * 100).toFixed(3),
                                    downloaded: formatNumber(+reduce(map(data, function(v) {
                                        return v.byteLength;
                                    }), function(t, c) {
                                        return t + c;
                                    }, 0)),
                                    status: "Downloading..."
                                }));
                            });
                        });
                    });

                    Promise.all(blobs).then(function(d) {
                        for (var n = 0; n < d.length; n++) { // polymorphism
                            data.push(d[n]);
                        }
                        let step = _this.step;
                        var increment = arr[i + 2] ? 2 : 1; 

                        if (_this.aborted) {
                            data = null; 
                            _this.aborted();
                            return; // exit promise
                        } else if (arr[i + step]) {
                            if (_this.ie) {
                                setTimeout(function() {
                                    recurseDownload(arr, cb, i + step, data);
                                }, 500);
                            } else {
                                recurseDownload(arr, cb, i + step, data);
                            }
                        } else {
                            cb(data);
                        }
                    });

                })
                .catch(function(err) {
                    ;
                    _this.onerror && _this.onerror("Something went wrong when downloading ts file, nr. " + i + ": " + err);
                });
        }

    }

    function filter(arr, condition) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (condition(arr[i], i)) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    function map(arr, condition) {
        var result = arr.slice(0);
        for (var i = 0; i < arr.length; i++) {
            result[i] = condition(arr[i], i);
        }
        return result;
    }

    function reduce(arr, condition, start) {
        var result = start;
        arr.forEach(function(v, i) {
            var res = +condition(result, v, i);
            result = res;
        });
        return result;
    }



    function formatNumber(n) {

        var ranges = [{
                divider: 1e18,
                suffix: "EB"
            },
            {
                divider: 1e15,
                suffix: "PB"
            },
            {
                divider: 1e12,
                suffix: "TB"
            },
            {
                divider: 1e9,
                suffix: "GB"
            },
            {
                divider: 1e6,
                suffix: "MB"
            },
            {
                divider: 1e3,
                suffix: "kB"
            }
        ]
        for (var i = 0; i < ranges.length; i++) {
            if (n >= ranges[i].divider) {
                var res = (n / ranges[i].divider).toString()

                return res.toString().split(".")[0] + ranges[i].suffix;
            }
        }
        return n.toString();
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
class PanoramaVideo {
	constructor(domContainer, domVideo) {
		this.domContainer = domContainer;
		this.domVideo = domVideo;
		this.camera = null;
		this.scene = null;
		this.renderer = null;

		this.isUserInteracting = false;
		this.lon = 0;
		this.lat = 0;
		this.phi = 0;
		this.theta = 0;
		this.distance = 50;
		this.onPointerDownPointerX = 0;
		this.onPointerDownPointerY = 0;
		this.onPointerDownLon = 0;
		this.onPointerDownLat = 0;
		this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
		this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
		this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
		this.onDocumentMouseWheel = this.onDocumentMouseWheel.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.init();
	}

	init() {
		var container, mesh

		container = this.domContainer;

		this.camera = new THREE.PerspectiveCamera(
			75,
			this.domVideo.videoWidth / this.domVideo.videoHeight,
			1,
			1100
		)
		this.camera.target = new THREE.Vector3(0, 0, 0)

		this.scene = new THREE.Scene()

		var geometry = new THREE.SphereBufferGeometry(500, 60, 40)
		// invert the geometry on the x-axis so that all of the faces point inward
		geometry.scale(-1, 1, 1)


		var texture = new THREE.VideoTexture(
			this.domVideo
		)
		texture.minFilter = THREE.LinearFilter;
		var material = new THREE.MeshBasicMaterial({
			map: texture
		})

		mesh = new THREE.Mesh(geometry, material)

		this.scene.add(mesh)

		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.domVideo.clientWidth, this.domVideo.clientHeight)
		container.appendChild(this.renderer.domElement)


		container.addEventListener(
			'mousedown',
			this.onDocumentMouseDown,
			false
		)
		container.addEventListener(
			'mousemove',
			this.onDocumentMouseMove,
			false
		)
		container.addEventListener('mouseup', this.onDocumentMouseUp, false)
		container.addEventListener('wheel', this.onDocumentMouseWheel, false)


		window.addEventListener('resize', this.onWindowResize, false)
	}

	onWindowResize() {
		this.camera.aspect = this.domVideo.videoWidth / this.domVideo.videoHeight
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(this.domVideo.clientWidth, this.domVideo.clientHeight)
	}

	onDocumentMouseDown(event) {
		// event.preventDefault()
		this.isUserInteracting = true

		this.onPointerDownPointerX = event.clientX
		this.onPointerDownPointerY = event.clientY
		
		this.onPointerDownLon = this.lon
		this.onPointerDownLat = this.lat
		
	}

	onDocumentMouseMove(event) {
		if (this.isUserInteracting === true) {
			
			this.lon =
				(this.onPointerDownPointerX - event.clientX) * 0.1 +
				this.onPointerDownLon
			this.lat =
				(event.clientY - this.onPointerDownPointerY) * 0.1 +
				this.onPointerDownLat
		}
	}

	onDocumentMouseUp() {
		this.isUserInteracting = false
	}

	onDocumentMouseWheel(event) {
		this.distance += event.deltaY * 0.05

		this.distance = THREE.Math.clamp(this.distance, 1, 50)
	}

	// animate() {
	// 	requestAnimationFrame(this.animate)
	// 	this.update()
	// }

	update() {
		this.lat = Math.max(-85, Math.min(85, this.lat))
		this.phi = THREE.Math.degToRad(90 - this.lat)
		this.theta = THREE.Math.degToRad(this.lon)

		this.camera.position.x = this.distance * Math.sin(this.phi) * Math.cos(this.theta)
		this.camera.position.y = this.distance * Math.cos(this.phi)
		this.camera.position.z = this.distance * Math.sin(this.phi) * Math.sin(this.theta)

		this.camera.lookAt(this.camera.target)
		this.renderer.render(this.scene, this.camera)
	}
}
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
            qn_data = "20000";
            break;
        default:
            qn_data = "80";
            break;
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=${room_id}&platform=web&qn=${qn_data}&protocol=0,1&format=0,1,2&codec=0,1`,
        responseType: "json",
        onload: function (response) {
            let ret = response.response;
            let rurl = "";
            for (let i = 0; i < ret.data.playurl_info.playurl.stream.length; i++) {
                const item = ret.data.playurl_info.playurl.stream[i];
                if (String(item.protocol_name).includes("stream") && item.format.length > 0) {
                    let url_info = item.format[0].codec[0].url_info[0];
                    let base_url = item.format[0].codec[0].base_url;
                    rurl = `${url_info.host}${base_url}${url_info.extra}`;
                }
            }
            let streamList = ret.data.durl;
            if (streamList) {
                rurl = streamList.length > 0 ? streamList[0].url : "";
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
    let arr = url.split("/");
    let rid = arr[arr.length - 1];
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://api.live.bilibili.com/room/v1/Room/room_init?id=" + rid,
        responseType: "json",
		onload: function(response) {
            let ret = response.response;
            realrid_callback(ret.data.room_id);
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
  // 第四个参数传入string(1,2,3,4),表示清晰度 流畅_550p(rate:1) 高清_1200p(rate:2) 超清_2000p(rate:3) 蓝光4M_4000p(rate:0) 填写1428则返回默认清晰度
  // 第五个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}

  let did = getCookieValue("dy_did") || "10000000000000000000000000001501";

  GM_xmlhttpRequest({
    method: "GET",
    url: `https://www.douyu.com/wgapi/livenc/liveweb/websec/getEncryption?did=${did}`,
    responseType: "json",
    onload: function (res) {
      if (res.response.error !== 0) return reallive_callback("None");

      let d = res.response.data;
      let ts = Math.round(Date.now() / 1000);
      let auth = getDouyuRealLiveAuth(room_id, did, ts, d.key, d.rand_str, d.enc_time, d.is_special);
      let rate = qn == "1428" ? "-1" : qn;
      let postData = `enc_data=${d.enc_data}&tt=${ts}&did=${did}&auth=${auth}&cdn=&rate=${rate}&hevc=0&fa=0&ive=0`;

      GM_xmlhttpRequest({
        method: "POST",
        url: `https://www.douyu.com/lapi/live/getH5PlayV1/${room_id}`,
        data: postData,
        responseType: "json",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        onload: function (res) {
          let ret = res.response;
          if (ret.error === 0) {
            let url = `${ret.data.rtmp_url}/${ret.data.rtmp_live}`;
            reallive_callback(is_video ? url : url + "&only-audio=1");
          } else {
            reallive_callback("None");
          }
        }
      });
    }
  });
}

function getDouyuRealLiveAuth(rid, did, ts, key, rand_str, enc_time, is_special) {
  let i = is_special === 1 ? "" : `${rid}${ts}`;
  let f = rand_str;
  for (let p = 0; p < enc_time; p++) f = hex_md5(f + key);
  return hex_md5(f + key + i);
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
function getRealLive_Huya(rid, qn, reallive_callback) {
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
        url: "https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=" + rid,
        responseType: 'json',
        onload: ret=>{
            let msg = "";
            let liveUrl = "";
            let multiLine = ret.response.data.stream.flv.multiLine;
            if (multiLine.length && multiLine.length > 0) {
                liveUrl = multiLine[0].url.replace("http", "https");
            }
            if (liveUrl == null || liveUrl == "") {
                msg = "房间暂未开播";
            }
            reallive_callback(liveUrl, msg);
        }
    })
}
let responseHookCallbackList = [];  
let requestBodyMap = new Map(); // 使用Map来存储请求体和XMLHttpRequest实例的关联  
  
function initResponseHook() {  
  // 保存原始的send方法  
  const originalSend = unsafeWindow.XMLHttpRequest.prototype.send;  
  
  // 重写send方法以捕获请求体  
  unsafeWindow.XMLHttpRequest.prototype.send = function(body) {  
    // 将请求体与当前XMLHttpRequest实例关联起来  
    requestBodyMap.set(this, body);  
  
    // 调用原始的send方法  
    originalSend.call(this, body);  
  
    // 注意：不要在这里清除请求体，因为响应可能还没有返回  
  };  
  
  // 重写responseText的getter以处理响应  
  let accessor = Object.getOwnPropertyDescriptor(unsafeWindow.XMLHttpRequest.prototype, 'responseText');  
  Object.defineProperty(unsafeWindow.XMLHttpRequest.prototype, 'responseText', {  
    get: function() {  
      let text = accessor.get.call(this);  
      // 从Map中获取当前XMLHttpRequest实例对应的请求体  
      let requestBody = requestBodyMap.get(this);  
  
      // 调用回调函数处理响应，并传入请求体  
      for (const callback of responseHookCallbackList) {  
        let newText = callback(this.responseURL, text, requestBody);  
        if (newText !== undefined) {  
          text = newText;  
        }  
      }  
  
      // 清除Map中对应的请求体（可选，取决于你是否需要保留这些信息）  
      requestBodyMap.delete(this);  
  
      return text;  
    },  
    configurable: true  
  });  
}  
  
/**  
 * 对网页上的请求进行hook  
 * @param {(url: string, text: string, body: any)} callback - 回调函数，接收URL、响应文本和请求体作为参数  
 */  
function responseHook(callback) {  
  responseHookCallbackList.push(callback);  
}  
/**
 * 拦截并修改特定 Script 标签的内容
 * 数组结构：
 * [
 *  { url: "", callback: (content: string) => string }
 * ]
 * 支持多个 callback，会按注册顺序依次执行，前一个 callback 的输出作为下一个 callback 的输入
 */
let scriptHookCallbackList = [];

function initScriptHook() {
  const originalAppendChild = Node.prototype.appendChild;

  // 覆盖原生的 appendChild 方法
  Node.prototype.appendChild = function (node) {
    // 1. 检查节点是否是 SCRIPT 标签
    if (node.tagName === "SCRIPT" && node.src) {
      const src = node.src;

      // 找到所有匹配的 callback
      const callbacks = [];
      for (let k = 0; k < scriptHookCallbackList.length; k++) {
        const item = scriptHookCallbackList[k];
        // 检查是否包含目标 URL
        if (src.includes(item.url)) callbacks.push(item);
      }

      if (callbacks.length > 0) {
        fetchAndReplace(src, callbacks, this);
        // 返回一个空节点，防止网站报错，且不插入原脚本
        return document.createDocumentFragment();
      }
    }

    // 如果不是目标脚本，或者没有 src (例如内联脚本或样式)，则执行原始方法
    return originalAppendChild.call(this, node);
  };
}

/**
 * 获取源码、修改并注入的函数
 * @param {string} url - 脚本URL
 * @param {Array} callbacks - 匹配到的回调函数列表
 * @param {Node} targetNode - 原始脚本应该插入的父节点
 */
function fetchAndReplace(url, callbacks, targetNode) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function (response) {
      let modifiedContent = response.responseText;

      // 依次执行所有匹配的 callback
      for (let m = 0; m < callbacks.length; m++) {
        const callback = callbacks[m];
        modifiedContent = callback.callback(modifiedContent);
      }

      // 创建新的可执行脚本
      const newScript = document.createElement("script");
      newScript.type = "text/javascript";
      newScript.textContent = modifiedContent;

      // 注入回原始目标节点
      targetNode.appendChild(newScript);
    },
    onerror: function (err) {
      console.error("Error loading script via GM_xmlhttpRequest:", err);
    }
  });
}

function scriptHook(callback) {
  scriptHookCallbackList.push(callback);
}
function stt_unescape(v) {
    if (!v) return
    return v.toString().replace(/@S/g, '/').replace(/@A/g, '@')
}

function stt_deserialize(raw) {
    if(!raw) return
    if (raw.includes('//')) {
        return raw.split('//').filter(e => e !== '').map(item => stt_deserialize(item))
    }

    if (raw.includes('@=')) {
        return raw.split('/').filter(e => e !== '').reduce((o, s) => {
            const [k, v] = s.split('@=')
            o[k] = stt_deserialize(stt_unescape(v))
            return o
        }, {})
    } else if (raw.includes('@A=')) {
        return stt_deserialize(stt_unescape(raw))
    } else {
        return raw.toString()
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
    constructor(rid, msgHandler) {
        if ("WebSocket" in window) {
            this.timer = 0;
            this.rid = rid;
            this.msgHandler = msgHandler;
            this.connect();
        }
    }

    connect() {
        this.ws = new WebSocket("wss://danmuproxy.douyu.com:850" + String(getRandom(2, 5)));
        this.ws.onopen = () => {
            this.ws.send(WebSocket_Packet("type@=loginreq/roomid@=" + this.rid));
            this.ws.send(WebSocket_Packet("type@=joingroup/rid@=" + this.rid + "/gid@=-9999/"));
            // this.ws.send(WebSocket_Packet("type@=sub/mt@=asr_caption/"));
            this.timer = setInterval(() => {
                this.ws.send(WebSocket_Packet("type@=mrkl/"));
            }, 40000);
        };

        this.ws.onerror = () => {
            this.close();
        };

        this.ws.onmessage = (e) => {
            let reader = new FileReader();
            reader.onload = () => {
                let arr = String(reader.result).split("\0"); // 分包
                reader = null;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].length > 12) {
                        // 过滤第一条和心跳包
                        this.msgHandler(arr[i]);
                    }
                }
            };
            reader.readAsText(e.data);
        };

        this.ws.onclose = () => {
            this.close();
            this.reconnect();
        };
    }

    reconnect() {
        setTimeout(() => {
            this.connect();
        }, 3000); // 3秒后尝试重新连接
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
    if (String(href).indexOf("yuba.douyu.com") !== -1) {
        // 鱼吧
        if (String(href).indexOf("?exRestore") !== -1) {
            initPkg_RestoreYuba_restore();
        } else if (String(href).indexOf("?exClean") !== -1) {
            initRouter_CleanYuba();
        } else {
            initRouter_Yuba();
        }
    } else if (String(href).indexOf("passport.douyu.com") !== -1 && String(href).indexOf("exid=chun") !== -1) {
        // 账号
        initRouter_Passport();
    } else if (String(href).indexOf("msg.douyu.com") !== -1) {
        // 车队
        if (href.indexOf("?exClean") !== -1) {
            initRouter_CleanMsg();
        } else {
            initRouter_Motorcade();
        }
    } else if (String(href).indexOf("v.douyu.com") !== -1) {
        // 视频
        if (String(href).indexOf("?exClean") !== -1) {
            initRouter_CleanVideo();
        } else if (String(href).indexOf("show/") !== -1) {
            initRouter_Video();
        }
    } else if (String(href).indexOf("cz.douyu.com") !== -1) {
        // 充值
        if (String(href).indexOf("?exClean") !== -1) {
            initRouter_CleanCz();
        }
    } else if (String(href).indexOf("getFansBadgeList") !== -1) {
        // 粉丝牌
        initRouter_FansBadgeList();
    } else {
        if (String(href).indexOf("exid=chun") !== -1) {
            // 主站
            initRouter_DouyuRoom_Popup();
        } else {
            if (String(href).indexOf("template/") !== -1 || String(href).indexOf("h5/") !== -1) {
                return;
            }
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
    removeAD();
    let intID = setInterval(() => {
        if (typeof (document.querySelector('div.wfs-2a8e83')) !== "undefined") {
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
        let dom1 = document.getElementsByClassName("BackpackButton")[0];
        let dom2 = document.getElementsByClassName("Barrage-main")[0];
        let dom3 = document.querySelector("#js-backpack-enter")
        if (!dom2 || (!dom1 && !dom3)) {
            return;
        }
        setTimeout(() => {
            initStyles();
            initPkg();
            initPkgSpecial();
            initTimer();
        }, 1500)
        clearInterval(intID);
    }, 1000);
}

function initPkgSpecial() {
}

// function initRouter_Novel() {
//     startWatchNovel();
// }

function initRouter_Yuba() {
    document.domain = "douyu.com";
    RestoreYuba_checkRedirect();
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
    if (unsafeWindow.$DATA && "ROOM" in unsafeWindow.$DATA) {
        // 在视频观看页面
        initStyles();
        initPkg_VideoTime();
        initPkg_VideoTools_Camera_Video();
        initPkg_DyVideoDownload();
        initPkg_DyVideoBarrageLine();
    }
}

function initRouter_FansBadgeList() {
    initPkg_FansBadgeList();
}


(async function () {
  initRouter(window.location.href);
})();
