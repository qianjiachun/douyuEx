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