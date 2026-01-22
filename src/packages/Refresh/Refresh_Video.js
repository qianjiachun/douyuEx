function initPkg_Refresh_Video() {
    Promise.all([
        gDomObserver.waitForElement('#js-player-dialog'),
        gDomObserver.waitForElement('.menu-da2a9e'),
    ]).then(([playerDialog, playerMenu]) => {
        initPkg_Refresh_Video_Dom(playerDialog, playerMenu);
        initPkg_Refresh_Video_Func(playerDialog);
        initPkg_Refresh_Video_Set();
    }).catch(err => {
        console.error('DouyuEx 隐藏礼物栏: 初始化失败：', err);
    });
}

function initPkg_Refresh_Video_Dom(playerDialog, playerMenu) {
    if (!document.getElementById("refresh-video")) {
        playerMenu.insertAdjacentHTML(
            "beforeend",
            `<li id="refresh-video">隐藏礼物栏</li>`
        );
    }

    if (!document.getElementById("refresh-video3")) {
        playerDialog.insertAdjacentHTML(
            "afterbegin",
            `<div id="refresh-video3" title="点击隐藏礼物栏">
                <div>隐藏礼物栏</div>
                <div id="ex-refresh-switch">
                    <div id="ex-refresh-switch-circle"></div>
                </div>
            </div>`
        );
    }
}

function initPkg_Refresh_Video_Func(playerDialog) {
/*  旧版UI
    gDomObserver.waitForElement('.right-17e251, .right-e7ea5d').then(rightControlBar => {
        new DomHook(rightControlBar, true, () => {
            changeToolBarZIndex();
        });
    });
    new DomHook(".video__VfhVg", true, (m) => {
        for (const record of m) {
            if(record.target.className.includes("toggle__P8TKM")){
                changeToolBarZIndex();
            }
        }
    });


    function changeToolBarZIndex() {
        let video_fullPage = false;
        let video_fullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        let chatPanel_isHidden = false;
        if (document.querySelector(".wfs-2a8e83.removed-9d4c42")) {
            video_fullPage = true;
        } else if (document.querySelector(".toggle__P8TKM")) {
            video_fullPage = true;
        }
        if(document.querySelector(".shrink__Sd0uK")){
            chatPanel_isHidden = true;
        }
        const dom_player_toolbar = document.getElementById("js-player-toolbar");
        dom_player_toolbar.style = video_fullPage? "z-index:20" : "z-index:30";
        const dom_casebar = document.getElementsByClassName("case__f4yex")[0];
        if(dom_casebar){
            dom_casebar.style = (video_fullScreen || (video_fullPage && chatPanel_isHidden)) && refresh_Video_getStatus() ? "bottom: -84px;" : "bottom: 0;";
        }
        const isBeta = !!document.getElementsByClassName("live-next-body")[0];
        if (isBeta) dom_player_toolbar.parentElement.style = "z-index:20";
    }
 */

    let dom = playerDialog.closest('.stream__T55I3') || playerDialog.closest('.layout-Player-video');
    let refresh_video = document.getElementById("refresh-video");
    let refresh_video3 = document.getElementById("refresh-video3");
    let timer_timeout = 0;
    let isHoveringRefresh3 = false;

    dom.addEventListener("mouseenter", () => {
        document.body.classList.add("simple-show");
        clearTimeout(timer_timeout);
    });
    dom.addEventListener("mouseleave", () => {
        if (!isHoveringRefresh3) document.body.classList.remove("simple-show");
        clearTimeout(timer_timeout);
    });
    gDomObserver.waitForElement('.room-Player-Box').then(dom_video => {
        dom_video.addEventListener("mousemove", () => {
            document.body.classList.add("simple-show");
            clearTimeout(timer_timeout);
            timer_timeout = setTimeout(() => {
                if (!isHoveringRefresh3) document.body.classList.remove("simple-show");
            }, 2000);
        });
    });
    if (refresh_video3) {
        refresh_video3.addEventListener("mouseenter", () => {
            isHoveringRefresh3 = true;
            document.body.classList.add("simple-hover");
            clearTimeout(timer_timeout);
        });
        refresh_video3.addEventListener("mouseleave", () => {
            isHoveringRefresh3 = false;
            document.body.classList.remove("simple-hover");
            timer_timeout = setTimeout(() => {
                document.body.classList.remove("simple-show");
            }, 1500);
        });
    }

    function toggleRefreshVideo() {
        document.body.classList.toggle("is-simpleMode");
        const isSimpleMode = document.body.classList.contains("is-simpleMode");
        if (refresh_video3) refresh_video3.title = isSimpleMode ? "点击显示礼物栏" : "点击隐藏礼物栏";
        if (isSimpleMode) {
            document.body.classList.add("simple-activate-anim");
            setTimeout(() => {
                document.body.classList.remove("simple-activate-anim");
            }, 1500);
        }
        saveData_Refresh();
        resizeWindow();
    }

    if (refresh_video) {
        refresh_video.addEventListener("click", e => {
            e.stopPropagation();
            toggleRefreshVideo();
        });
    }

    if (refresh_video3) {
        refresh_video3.addEventListener("click", e => {
            e.stopPropagation();
            toggleRefreshVideo();
        });
    }
}

function refresh_Video_getStatus() {
    return document.body.classList.contains("is-simpleMode");
}
// FullPageFollowGuide
function initPkg_Refresh_Video_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.video && retJson.video.status === true) {
            document.body.classList.add("is-simpleMode");
            let dom_refresh3 = document.getElementById("refresh-video3");
            if (dom_refresh3) {
                dom_refresh3.title = "点击显示礼物栏";
            }
            resizeWindow(); 
        }
    }
}
