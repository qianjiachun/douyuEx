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
