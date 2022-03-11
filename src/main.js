"use strict";
// ==UserScript==
// @name         DouyuEx-斗鱼直播间增强插件
// @namespace    https://github.com/qianjiachun
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABMZJREFUWEfFV19MW2UU/51LywoL6MCJZAwiQpgBXGzhtpSNDd2De9heFn2ZuIVkiZFE4rLpAybb4owRZww+ELNlmc754tREH0zMYlaZvaW33KJRELLJFNjMMmBx/KftPeZrudiWy1rYA/flpv3O+Z3fd87vnO+7hHV+aJ3jY00EKisrM7Oz8wvCFCkQG7Bwxp2ZmfE7fX19C6vdUNoEHC6XnXVpP4FeANhpGojZwyR9T1LkR627O5gOmZQEnE5nUVi3tIK4FYA1HrRwfg4SA7dstuRYITB1WKRwh9/vH30QkQcSsMv1Owl8DkCFANk1MY7ymWlsmZ9DyewsrKxHsUNEGLVlYdRmQ//GHPy8Kc+IOUyEt3v8yucrkViRgF12nyTghHDMDYfx6sjfqJ66n05WcSV/My4/UYhZKSNqz8CpoKqcNHM2JVDjdDcx46Jw2DM+hkO3R9IKnGz0ydYSeB+NZYNBDUHVey3ZZhmBaM05wwugeNv0FNqGrq8puOF0tqgE12IlGbRQZE+yJpYRcNTWfwDiY48vzOPDwf6HCm44nyirwFBWNsB0Rgt4j8eDJhAQrQZd6s5gthz760+qmpo0JXCpsAi9ubkYs2ZGB8nmhQVsn7yPl/8xF/zNrGy8U1quhyQpAkl3xbdoAgG7XH+cwO0N98ZxZHTYNPhrT1dj0mIxXcsJh9H5x2+ma+e3FMOTl79MkIkZqK27CqLdh2+P4PnxsWVArduqMGGNjQIC2vVwxheSFNF1iZsJ9Ib4Py8UQsfA78t8hQ6EHgDya6rXZRgsERDj1bbxkXmxcOrGIEpnZxJAzhWVoGuxvzVVifrV1Lh2i3dPT7dHvB2ym8W7cWIMzbcSO2fYloW28m1RzLnpfzcYY3uJQG1tw1adwsNiwJy+MbBsB0crKnE3M1OksD2oKm85FrMV6zH2aAFfY43sPs1AW8HCPM6YCNgQo8SW4kCgK8pwicCzLtd+SZe+TSV7C0W2h1mqAOjLRFt+SWK6rhN6U2FITAcCAe83CQTstTv2EenfpXImHdWA/hhL0tWEdtL1Rl23TpAl8msqDGY6EEwmYJQAQK+mKvZkEIfsFhOpjMEfBVXf0RVK8D4Db4qho6lKrOBxj112qwTUmpYgXoQSQw4ElEC8s0OuvwTwQfGfIUKHXPdi7LfvcrwIAf5MU32HE4I7dz5DHMuOqQijAIawGC1aQOk0ycIEgE2LtXuXGF+JNgxxxkGK7Vw89zRVWToODQyHXH8I4E9XbENhaAwiIlzo8SvNZrV0yHVDAD1pXme+qam+UlM/p/ssGEeST0azUewTjUVE+3r83itmYHa5rp1AIv1Fi+vDDP46qPqMLCTW3rnDQcw/AWyFpNetOIpjZYgdRgCGNFV5KpWi01k3xJfyMBJg8ccxAV09qrIrnSAr2Tic7gtgCEGmdxwLoPgLCRidWkBpWQsJu+y+SECT8E37QmIEir+SgXGXiZuCqu+HdIjYnXUtxPQegJxY8FVeyf4nkXgpBfg8ERQdUn9ulvUXj8czJ2zL9u7dkDsxWUXMVQCeA/gVQ5xrvpQaJOKu5a8DyEzIAGEAjAiAyqTMLIDp44e+lseDrtuHiVnN1+XTLB3xrcUm5afZWkBX4/MfqLkcPz+XsJwAAAAASUVORK5CYII=
// @version      2022.03.07.02
// @description  弹幕自动变色防检测循环发送 一键续牌 查看真实人数/查看主播数据 已播时长 一键签到(直播间/车队/鱼吧/客户端) 一键领取鱼粮(宝箱/气泡/任务) 一键寻宝 送出指定数量的礼物 一键清空背包 屏蔽广告 调节弹幕大小 自动更新 同屏画中画/多直播间小窗观看/可在斗鱼看多个平台直播(虎牙/b站) 获取真实直播流地址 自动抢礼物红包 背包信息扩展 简洁模式 夜间模式 开播提醒 幻神模式 关键词回复 关键词禁言 自动谢礼物 自动抢宝箱 弹幕右键信息扩展 防止下播自动跳转 影院模式 直播时间流控制 弹幕投票 直播滤镜 直播音频流 账号多开/切换 显示粉丝牌获取日期 月消费数据显示 弹幕时速 相机截图录制gif 全景播放器 斗鱼视频下载/弹幕下载 直播画面局部缩放 全站抽奖信息 直播音效增强
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
	// initPkg_FishFood();
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
	// initPkg_FishPond_Timer();
}
function initTimer() {
	// initPkg_Timer();
	// exTimer = setInterval(initPkg_Timer, 35000);
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