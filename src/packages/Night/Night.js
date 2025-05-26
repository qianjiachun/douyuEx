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
    .layout-Main{background:rgba(35,36,39,1) !important;}
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
    ret += `{background-image: url(data:image/png;base64,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) !important; !important}`;
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