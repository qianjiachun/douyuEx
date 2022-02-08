"use strict";
// ==UserScript==
// @name         DouyuEx-斗鱼直播间增强插件
// @namespace    https://github.com/qianjiachun
// @icon         https://s2.ax1x.com/2020/01/12/loQI3V.png
// @version      2022.02.08.01
// @description  弹幕自动变色防检测循环发送 一键续牌 查看真实人数/查看主播数据 已播时长 一键签到(直播间/车队/鱼吧/客户端) 一键领取鱼粮(宝箱/气泡/任务) 一键寻宝 送出指定数量的礼物 一键清空背包 屏蔽广告 调节弹幕大小 自动更新 同屏画中画/多直播间小窗观看/可在斗鱼看多个平台直播(虎牙/b站) 获取真实直播流地址 自动抢礼物红包 背包信息扩展 简洁模式 夜间模式 开播提醒 幻神模式 关键词回复 关键词禁言 自动谢礼物 自动抢宝箱 弹幕右键信息扩展 防止下播自动跳转 影院模式 直播时间流控制 弹幕投票 直播滤镜 直播音频流 账号多开/切换 显示粉丝牌获取日期 月消费数据显示 弹幕时速 相机截图录制gif 全景播放器 斗鱼视频下载/弹幕下载 直播画面局部缩放 全站抽奖信息
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
// @require      https://lib.baomitu.com/three.js/80/three.min.js
// @require      https://lib.baomitu.com/xlsx/0.16.4/xlsx.full.min.js
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
// @connect      rrocr.com
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
	initPkg_FishFood();
	initPkg_Sign();
	initPkg_BarragePanel();
	initPkg_AdVideo();
	initPkg_AccountList();
	initPkg_ChatTools();
	initPkg_MonthCost();
	initPkg_TabSwitch();
	initPkg_WeeklyPanel();
}
function initPkg_Timer() {
	initPkg_FishPond_Timer();
}
function initTimer() {
	initPkg_Timer();
	exTimer = setInterval(initPkg_Timer, 35000);
}

function initStyles() {
	let style = document.createElement("style");
	style.appendChild(document.createTextNode(`/*编译器标记 勿删*/`));
	document.head.appendChild(style);
}

// 编译器标记 勿删

(async function() {
	initRouter(window.location.href);
})();