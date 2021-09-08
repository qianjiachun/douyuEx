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