function initPkg_RemoveAD() {
    let t = setInterval(() => {
        let a = getValidDom([".PlayerToolbar-ContentCell .PlayerToolbar-Wealth", "#js-backpack-enter"]);
        if (a != undefined) {
            clearInterval(t);
            optimizePageStyle();

            initPkg_RemoveMsgNotice();
        }
    }, 1000);
}
// .dy-ModalRadius-mask,dy-ModalRadius-wrap{display:none !important;}
function removeAD() {
    StyleHook_set("Ex_Style_RemoveAD", `
    .ScreenBannerAd,.XinghaiAd,.CustomGroupGuide,.FudaiGiftToolBarTips,.UserInfo-tryEnterHiddenLead,.BargainingKit,.AnchorPocketTips,.FishShopTip,.FollowGuide,#js-bottom-right-cloudGame,.CloudGameLink,.RoomText-icon-horn,.RoomText-list,.Search-ad,.RedEnvelopAd,.noHandlerAd-0566b9,.PcDiversion,.DropMenuList-ad,.DropPane-ad,.WXTipsBox,.igl_bg-b0724a,.closure-ab91fb,.VideoAboveVivoAd,.css-widgetWrapper-EdVVC,.watermark-442a18,.FollowGuide-FadeOut,.MatchSystemChatRoomEntry-roomTabs,.FansMedalDialog-normal,.GameLauncher,.recommendAD-54569e,.recommendApp-0e23eb,.Title-ad,.Bottom-ad,.SignBarrage,.corner-ad-495ade,.SignBaseComponent-sign-ad,.SuperFansBubble,.is-noLogin,.PlayerToolbar-signCont,#js-widget,.Frawdroom,.HeaderGif-right,.HeaderGif-left,.liveos-workspace{display:none !important;}
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
    /*直播间右侧广告*/
    .LadderNav {
        display: none!important;
    }
    #js-bottom-right-recommendAd {
        display: none!important;
    }
    /*弹幕框顶部广告*/
    .aside-top-uspension-box {
        display: none!important;
    }
    #js-player-asideMain {
        top: 0!important;
    }
    /*右下角联系客服*/
    .bacpCommonKeFu {
        display: none!important;
    }

    .activeItem__d6uUm:nth-child(1){display: none !important;}
    .activeItem__d6uUm:nth-child(2){right: 0 !important;}
    .activeItem__d6uUm:nth-child(3){right: 75px !important;}
    .activeItem__d6uUm:nth-child(4){right: 150px !important;}
    .activeItem__d6uUm:nth-child(5){right: 225px !important;}
    .activeItem__d6uUm:nth-child(6){right: 300px !important;}
    .werbungContainer__2sv7h{display:none !important;}
    #js-player-asideTopSuspension{display:none !important;}
    .Search-Panel-Advert{display:none !important;}
    `);
    // body{transform: translateZ(0)!important;}
    // .RomanticDatePanelModal-middle--small{height:220px !important;}
    // .MainDialog-main--content{height:450px !important;}
    // .RomanticDatePanelModal-middle--rowItemBottom--rowItemBottomBtn{margin-left:0px !important;margin-top:0px !important;width:170px !important;height:40px !important;background:orange !important;}
    // }
}

function optimizePageStyle() {
    // 弹幕框滚动条隐藏
    let dom_barrage = document.getElementById("js-barrage-list").parentNode;
    dom_barrage.id = "js-barrage-list-parent";
}