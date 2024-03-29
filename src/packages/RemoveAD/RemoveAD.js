function initPkg_RemoveAD() {
    let t = setInterval(() => {
        let a = document.getElementsByClassName("PlayerToolbar-wealthNum")[0];
        if (a != undefined) {
            clearInterval(t);
            optimizePageStyle();
            removeChatLimit();
            removeShieldConfig();

            initPkg_RemoveMsgNotice();
        }
    }, 1000);
    
}
// .dy-ModalRadius-mask,dy-ModalRadius-wrap{display:none !important;}
function removeAD() {
    StyleHook_set("Ex_Style_RemoveAD", `
    .ScreenBannerAd,.XinghaiAd,.CustomGroupGuide,.FudaiGiftToolBarTips,.UserInfo-tryEnterHiddenLead,.BargainingKit,.AnchorPocketTips,.FishShopTip,.FollowGuide,#js-bottom-right-cloudGame,.CloudGameLink,.RoomText-icon-horn,.RoomText-list,.Search-ad,.RedEnvelopAd,.noHandlerAd-0566b9,.PcDiversion,.DropMenuList-ad,.DropPane-ad,.WXTipsBox,.igl_bg-b0724a,.closure-ab91fb,.VideoAboveVivoAd,.pwd-990896,.css-widgetWrapper-EdVVC,.watermark-442a18,.FollowGuide-FadeOut,.MatchSystemChatRoomEntry-roomTabs,.FansMedalDialog-normal,.GameLauncher,.recommendAD-54569e,.recommendApp-0e23eb,.Title-ad,.Bottom-ad,.SignBarrage,.corner-ad-495ade,.SignBaseComponent-sign-ad,.SuperFansBubble,.is-noLogin,.PlayerToolbar-signCont,#js-widget,.Frawdroom,.HeaderGif-right,.HeaderGif-left,.liveos-workspace{display:none !important;}
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
    `);
    // body{transform: translateZ(0)!important;}
    // .RomanticDatePanelModal-middle--small{height:220px !important;}
    // .MainDialog-main--content{height:450px !important;}
    // .RomanticDatePanelModal-middle--rowItemBottom--rowItemBottomBtn{margin-left:0px !important;margin-top:0px !important;width:170px !important;height:40px !important;background:orange !important;}
    // }
}
function removeChatLimit() {
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

function optimizePageStyle() {
    // 弹幕框滚动条隐藏
    let dom_barrage = document.getElementById("js-barrage-list").parentNode;
    dom_barrage.id = "js-barrage-list-parent";
}

function removeShieldConfig() {
    let shieldTool = document.getElementsByClassName("ShieldTool-list")[0];
    let isRemoveEnterBarrage = localStorage.getItem("ExSave_isRemoveEnterBarrage"); // '1'移除check
    let isChecked = (isRemoveEnterBarrage == null || isRemoveEnterBarrage == '1') ? true : false;
    let isSupported = window.CSS && window.CSS.supports && window.CSS.supports('--enter-display', 'none'); //CSS变量兼容性检测
    let barrageExtendContainer = document.getElementById("js-barrage-extend-container");
    barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", isChecked ? "none" : "block", "important");

    if (shieldTool == undefined || !isSupported)
        return;
    if (isRemoveEnterBarrage == null)
        isRemoveEnterBarrage = '1';

    shieldTool.insertAdjacentHTML("beforeend", `
        <div class="ShieldTool-listItem ${ isChecked ? 'is-checked' : 'is-noChecked'}" id="ex-enter-shield">
            <span class="ShieldTool-checkIcon"></span>
            <h5 class="ShieldTool-checkText">屏蔽进场弹幕</h5>
        </div>`);
    document.getElementById("ex-enter-shield").addEventListener("click", (e) => {
        let classList = e.currentTarget.classList;
        let noChecked = classList.toggle("is-noChecked");
        let chceked = classList.toggle("is-checked");
        let enterDisplay = (noChecked && !chceked) ? "block": "none";
        barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", enterDisplay, "important");
        localStorage.setItem("ExSave_isRemoveEnterBarrage", (noChecked && !chceked) ? "0" : "1"); // '1'移除check
        
    });
}