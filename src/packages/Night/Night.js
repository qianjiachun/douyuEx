var sheetIndex2 = 0; // 这里的sheetIndex2用的是弹幕大小的全局变量，所以这个模块包一定要在ExpanTool后面加载
let svg_night  = '<svg t="1587640254282" class="icon" viewBox="0 0 1055 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5670" width="26" height="26"><path d="M388.06497 594.013091c-96.566303-167.253333-39.067152-381.889939 128.217212-478.487273a348.656485 348.656485 0 0 1 256.248242-36.864C623.491879-5.306182 435.417212-11.170909 276.542061 80.616727 37.236364 218.763636-44.776727 524.815515 93.401212 764.152242c138.146909 239.305697 444.198788 321.318788 683.535515 183.140849 158.875152-91.725576 247.870061-257.520485 249.669818-428.559515a348.656485 348.656485 0 0 1-160.085333 203.496727c-167.253333 96.566303-381.889939 39.036121-478.487273-128.217212" p-id="5671" fill="#8a8a8a"></path></svg>';
let svg_day = '<svg t="1587640423416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2270" width="26" height="26"><path d="M270.016 197.248l-83.84-84.544-69.76 70.464 83.776 84.544 69.76-70.4zM139.648 465.024H0v93.888h139.648V465.024zM558.528 0H465.472v136.192h93.056V0z m349.056 183.168l-69.76-70.464-83.84 84.544L819.2 263.04l88.384-79.872z m-153.6 643.584l83.84 84.48 65.28-65.728L819.2 760.96l-65.216 65.792z m130.368-267.84H1024V465.024h-139.648v93.888zM512.064 230.08C358.4 230.08 232.768 356.992 232.768 512c0 155.008 125.632 281.856 279.296 281.856 153.6 0 279.232-126.848 279.232-281.856 0-154.944-125.632-281.856-279.232-281.856zM465.472 1024h93.056v-136.256H465.472V1024z m-349.056-183.232l69.76 70.4 83.84-84.48L204.8 760.96 116.48 840.768z" p-id="2271" fill="#8a8a8a"></path></svg>';
let num_css = 0; // 这个变量用于存储一共定义了多少个css
let currentMode = 0; // 0日间模式 1夜间模式
function initPkg_Night() {
    sheetIndex2 = getAvailableSheet(sheetIndex + 1);
    if (sheetIndex2 == -1) {
        return;
    }
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

function initPkg_Night_Set() {
    let ret = localStorage.getItem("ExSave_Mode");
    let a = document.getElementById("ex-night");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.mode == undefined) {
            retJson.mode = 0;
        }
        if (retJson.mode == 1) {
            currentMode = 1;
            a.innerHTML = svg_night;
            a.title = "切换日间模式";
            setNightMode();
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
    setBarrageLayoutBackgroundColor("background-color:rgba(37,38,42,1) !important;");
    setBarrageUserEnterBackgroundColor("background-color:rgba(37,38,42,1) !important;color:rgba(187,187,187,1) !important;");
    setBarrageContentColor("color:rgba(187,187,187,1) !important;");
    setBarrageTextColor("color:rgba(187,187,187,1) !important;");
    setBarrageNoticeBackgroundColor("background-color:rgba(37,38,42,1) !important;border:rgba(37,38,42,1) solid 1px !important;");
    setLayoutPlayerTitleBackgroundColor("background-color:rgba(35,36,39,1) !important;border:rgba(35,36,39,1) solid 1px !important;");
    setTitleHeaderColor("color:rgba(191,191,191,1) !important;");
    setTitleAnchorTextColor("color:rgba(107,176,125,1) !important;");
    setTitleRowTextColor("color:rgba(153,153,153,1) !important;");
    setAnchorNameColor("color:rgba(153,153,153,1) !important;");
    setLayoutPlayerToolbarBackgroundColor("background:rgb(37,38,42) !important;border:1px solid rgb(37,38,42) !important;");
    setWealthNumColor("color:rgb(191,191,191) !important;");
    setLayoutMainBackgroundColor("background-color:rgba(35,36,39,1) !important;");
    setRankWrapBackgroundColor("background:rgba(47,48,53,1) !important;border:rgba(47,48,53,1) solid 1px !important;");
    setBgIconBackgroundDisplay("display:none;");
    setChatRankWeekBackgroundColor("background-color:rgba(47,48,53,1) !important;");
    setNobleRankBackgroundColor("background-color:rgba(47,48,53,1) !important;");
    setAsideMainBorderColor("border:1px solid rgba(37,38,42,1) !important;background-color:rgb(47,48,53) !important;");
    setChatBackgroundColor("background:rgba(47,48,53,1) !important;color:rgb(187,187,187) !important;border-radius:0px !important;");
    setChatTabBackgroundColor("background:rgb(29,32,35) !important;border:1px solid rgb(47,48,53) !important;");
    setChatTabActiveBackgroundColor("background:rgb(47,48,53) !important;");
    setFansRankInfoBackgroundColor("background:rgb(37,43,51) !important;");
    setFansRankInfoTxtColor("color:rgb(121,127,137) !important;");
    setBarrageBorderColor("border:1px solid rgba(35,36,39,1) !important;");
    setLayoutPlayerChatBorderColor("border-top:1px solid rgba(47,48,53,1) !important;");
    setLayoutPlayerAnnounceBackgroundColor("background-color:rgb(29,32,35) !important;border:1px solid rgb(29,32,35) !important;");

    setFansRankBottomBorderColor("border-top:1px solid rgb(121,127,137) !important;");

    setChatBarrageCollectTipBackgroundColor("background:rgb(47,48,53) !important;");
    setTitleOfficialBackgroundColor("background:rgb(35,36,39) !important;");
    setHeaderBackgroundColor("background:rgb(45,46,54) !important;border-bottom:1px solid rgb(45,46,54) !important;");

    setHeaderTxtColor("color:rgb(191,191,191) !important");
    
    setSuperMenuBackgroundColor("background:rgb(47,48,53) !important;border:1px solid rgb(35,36,39) !important;");
    setGuessMainPanelBackgroundColor("background:rgb(47,48,53) !important;border:1px solid rgb(47,48,53) !important;");

    setDanmuAuthorBackgroundColor("color:rgb(234,234,234) !important;");
    setDanmuDivBackgroundColor("background:rgba(47,49,53,0.9) !important;");
    setDanmuContentBackgroundColor("background:rgba(35,36,39,0.9) !important;");
    setDanmuWordBackgroundColor("background:rgba(35,36,39,0.9) !important;color:rgb(187,187,187) !important;");
    setFansMedalPanelBackgroundColor("color:black !important;");
    setAnchorLikeBorderColor("border:1px solid rgb(35,36,39) !important;");
    setAnchorFriendCardColor("color:rgb(204,204,204) !important;");
}
function cancelNightMode() {
    let a = document.styleSheets[sheetIndex2];
    let idx = a.rules.length - 1;
    for (let i = 0; i < num_css; i++) {
        a.removeRule(idx);
        idx = idx - 1;
    }
}

function setBarrageLayoutBackgroundColor(t) {
    // background:rgb(37,38,42) !important;
    // document.styleSheets[sheetIndex2].removeRule(roleIndex_barrageLayout);
    document.styleSheets[sheetIndex2].addRule(".layout-Player-barrage", t);
    num_css = num_css + 1;
}

function setBarrageUserEnterBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".Barrage-userEnter", t);
    num_css = num_css + 1;
}

function setBarrageContentColor(t) {
    // color:rgb(187,187,187) !important;
    // document.styleSheets[sheetIndex2].removeRule(roleIndex_barrageContent);
    document.styleSheets[sheetIndex2].addRule(".Barrage-content", t);
    num_css = num_css + 1;
}

function setBarrageTextColor(t) {
    // color:rgb(187,187,187) !important;
    // document.styleSheets[sheetIndex2].removeRule(roleIndex_barrageText);
    document.styleSheets[sheetIndex2].addRule(".Barrage-text", t);
    num_css = num_css + 1;
}

function setBarrageNoticeBackgroundColor(t) {
    // color:rgb(187,187,187) !important;
    // document.styleSheets[sheetIndex2].removeRule(roleIndex_barrageNotice);
    document.styleSheets[sheetIndex2].addRule(".Barrage-notice--noble", t);
    num_css = num_css + 1;
}

function setLayoutPlayerTitleBackgroundColor(t) {
    // background:rgb(37,38,42) !important;
    document.styleSheets[sheetIndex2].addRule(".layout-Player-title", t);
    num_css = num_css + 1;
}


function setTitleHeaderColor(t) {
    document.styleSheets[sheetIndex2].addRule(".Title-header", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("Title-header")[0].style.color = t;
}

function setFollowNumColor(t) {
    document.styleSheets[sheetIndex2].addRule(".Title-followNum", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("Title-followNum")[0].style.color = t;
}

function setTitleAnchorTextColor(t) {
    document.styleSheets[sheetIndex2].addRule(".Title-anchorText", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("Title-anchorText")[0].style.color = t;
}

function setAnchorNameColor(t) {
    document.styleSheets[sheetIndex2].addRule(".Title-anchorName", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("Title-anchorName")[0].style.color = t;
}

function setTitleRowTextColor(t) {
    // background:rgb(37,38,42) !important;
    document.styleSheets[sheetIndex2].addRule(".Title-row-text", t);
    num_css = num_css + 1;
}

function setLayoutPlayerToolbarBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule("#js-player-toolbar", t);
    num_css = num_css + 1;
    // document.getElementById("js-player-toolbar").style.backgroundColor = t;
}


function setWealthNumColor(t) {
    document.styleSheets[sheetIndex2].addRule(".PlayerToolbar-wealthNum", t);
    num_css = num_css + 1;
}


function setLayoutMainBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".layout-Main", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("layout-Main")[0].style.backgroundColor = t;
}

function setRankWrapBackgroundColor(t) {
    // 47,48,53
    document.styleSheets[sheetIndex2].addRule(".ChatRank-rankWraper", t);
    num_css = num_css + 1;
}

function setBgIconBackgroundDisplay(t) {
    document.styleSheets[sheetIndex2].addRule(".bg-icon", t);
    num_css = num_css + 1;
}

function setChatRankWeekBackgroundColor(t) {
    // ChatRankWeek-headerContent is-active
    document.styleSheets[sheetIndex2].addRule(".ChatRankWeek-headerContent", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("ChatRankWeek-headerContent")[0].style.backgroundColor = t;
}

function setNobleRankBackgroundColor(t) {
    // document.getElementsByClassName("NobleRank")[0].style.backgroundColor = t;
    // document.getElementsByClassName("NobleRankTips")[0].style.backgroundColor = t;
    document.styleSheets[sheetIndex2].addRule(".NobleRank", t);
    num_css = num_css + 1;
    document.styleSheets[sheetIndex2].addRule(".NobleRankTips", t);
    num_css = num_css + 1;
}

function setAsideMainBorderColor(t) {
    document.styleSheets[sheetIndex2].addRule("#js-player-asideMain", t);
    num_css = num_css + 1;
    // document.getElementById("js-player-asideMain").style.border = t;
}

function setChatBackgroundColor(t) {
    // document.getElementsByClassName("Chat")[0].style.background = t;
    // document.getElementsByClassName("ChatSend-txt")[0].style.background = t;
    document.styleSheets[sheetIndex2].addRule(".Chat", t);
    num_css = num_css + 1;
    document.styleSheets[sheetIndex2].addRule(".ChatSend-txt", t);
    num_css = num_css + 1;
}

function setChatTabBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".ChatTabContainer-titleWraper--tabLi", t);
    num_css = num_css + 1;
}

function setChatTabActiveBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".ChatTabContainer-titleWraper--tabLi.is-active", t);
    num_css = num_css + 1;
}


function setFansRankInfoBackgroundColor(t) {
    // #fff9f3 原
    // 37,43,51
    document.styleSheets[sheetIndex2].addRule(".FansRankInfo", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("FansRankInfo")[0].style.background = t;
}

function setFansRankInfoTxtColor(t) {
    // #3c3c3c 原
    // 121,127,137
    document.styleSheets[sheetIndex2].addRule(".FansRankInfo-txt", t);
    num_css = num_css + 1;
}

function setBarrageBorderColor(t) {
    // .Barrage
    document.styleSheets[sheetIndex2].addRule(".Barrage", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("Barrage")[0].style.border = t;
}

function setLayoutPlayerChatBorderColor(t) {
    document.styleSheets[sheetIndex2].addRule(".layout-Player-chat", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("layout-Player-chat")[0].style.borderTop = t;
}

function setLayoutPlayerAnnounceBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".layout-Player-announce", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("layout-Player-announce")[0].style.backgroundColor = t;
}


function setFansRankBottomBorderColor(t) {
    // 1px solid #e8e8e8; 原版
    document.styleSheets[sheetIndex2].addRule(".FansRankBottom", t);
    num_css = num_css + 1;
}


function setChatBarrageCollectTipBackgroundColor(t) {
    // #ffe9d5原版
    document.styleSheets[sheetIndex2].addRule(".ChatBarrageCollect-tip", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("ChatBarrageCollect-tip")[0].style.background = t;
}

function setTitleOfficialBackgroundColor(t) {
    // #fff0e2原版
    document.styleSheets[sheetIndex2].addRule(".Title-official", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("Title-official")[0].style.background = t;
}

function setHeaderBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".Header-wrap", t);
    num_css = num_css + 1;
    // document.getElementsByClassName("Header-wrap")[0].style.background = t;
}


function setHeaderTxtColor(t) {
    // .Header-wrap .Header-menu-link>a
    document.styleSheets[sheetIndex2].addRule(".Header-wrap .Header-menu-link>a", t);
    document.styleSheets[sheetIndex2].addRule(".public-DropMenu-link", t);
    document.styleSheets[sheetIndex2].addRule(".Header-icon", t);
    num_css = num_css + 3;
}


function setSuperMenuBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".layout-Menu", t);
    num_css = num_css + 1;
}

function setGuessMainPanelBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".GuessMainPanel", t);
    num_css = num_css + 1;
}

function setDanmuDivBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".danmudiv-32f498", t);
    num_css = num_css + 1;
}

function setDanmuAuthorBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".danmuAuthor-3d7b4a", t);
    num_css = num_css + 1;
}

function setDanmuContentBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".danmuContent-25f266", t);
    num_css = num_css + 1;
}

function setDanmuWordBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".word-89c053", t);
    num_css = num_css + 1;
}

function setFansMedalPanelBackgroundColor(t) {
    document.styleSheets[sheetIndex2].addRule(".FansMedalPanel-Panel", t);
    num_css = num_css + 1;
}

function setAnchorLikeBorderColor(t) {
    document.styleSheets[sheetIndex2].addRule(".AnchorLike-ItemBox", t);
    num_css = num_css + 1;
}

function setAnchorFriendCardColor(t) {
    document.styleSheets[sheetIndex2].addRule(".AnchorFriendCard-info>h3", t);
    num_css = num_css + 1;
}

