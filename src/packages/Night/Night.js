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

    /*新背包*/
    .BackpackHeader{border-bottom: 1px solid rgb(37,38,42) !important;}
    .BackpackHeader-tabItem{color:rgb(121,127,137)!important;}
    .RightsPropsList{background-color: rgb(35,36,39) !important;color: rgb(149,149,149)!important;}
    .RightsPropsList-item{background: rgb(47,48,53) !important;}

    /*加入公会*/
    .SociatyLabelPop-content{background:rgb(35,36,39) !important;}
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
    ret += `{background-image: url(data:image/png;base64,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) !important}`;
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
    `)
}

function cancelNightModeIframe() {
    StyleHook_removeIframe(document.getElementsByClassName("BottomGroup")[0].getElementsByTagName("iframe")[0].contentWindow.document, "Ex_Style_NightModeIframe")
}