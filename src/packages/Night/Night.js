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
    .Backpack-propPage,.BatchProp-content{background-color:rgb(35,36,39) !important;}
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
    `;
    StyleHook_set("Ex_Style_NightMode", cssText);

}
function cancelNightMode() {
    StyleHook_remove("Ex_Style_NightMode");
}