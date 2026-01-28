function initPkg_Refresh_Video() {
    Promise.all([
        gDomObserver.waitForElement('#js-player-dialog'),
        gDomObserver.waitForElement('.menu-da2a9e'),
        gDomObserver.waitForElement('.PlayerToolbar-ContentRow'),
    ]).then(([playerDialog, playerMenu, dom_toolbar]) => {
        initPkg_Refresh_Video_Dom(playerDialog, playerMenu);
        const toggleRefreshVideo = initPkg_Refresh_Video_Func(playerDialog, playerMenu, dom_toolbar);
        initPkg_Refresh_Video_Set(toggleRefreshVideo);
    }).catch(err => {
        console.error('DouyuEx 简洁模式: 初始化简洁模式失败：', err);
    });
}

function initPkg_Refresh_Video_Dom(playerDialog, playerMenu) {
	let a = document.createElement("li");
    a.id = "refresh-video";
    a.innerText = "简洁模式";
    let b = playerMenu;
    b.insertBefore(a, b.childNodes[b.childNodes.length -1]);

    if (!document.getElementById("refresh-video3")) {
        a = document.createElement("div");
        a.id = "refresh-video3";
        a.title = "开启简洁模式";
        a.innerText = "简";
        a.style = "position:absolute;right:18px;bottom:58px;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);color:#fff;z-index:9999;cursor:pointer;user-select:none;font-size:18px;line-height:32px;opacity:0;transform:scale(.9);transition:opacity .15s ease,transform .15s ease,background-color .15s ease;pointer-events:none;";
        b = playerDialog;
        if (b) b.insertBefore(a, b.childNodes[0]);
    }
}

function initPkg_Refresh_Video_Func(playerDialog, playerMenu, dom_toolbar) {
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
        let video_fullPage = !!(document.querySelector(".wfs-2a8e83.removed-9d4c42") || document.querySelector(".toggle__P8TKM"));
        let video_fullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        let chatPanel_isHidden = !!document.querySelector(".shrink__Sd0uK");
        const dom_player_toolbar = document.getElementById("js-player-toolbar");
        dom_player_toolbar.style.zIndex = video_fullPage ? "20" : "30";
        const dom_casebar = document.getElementsByClassName("case__f4yex")[0];
        if (dom_casebar) dom_casebar.style = (video_fullScreen || (video_fullPage && chatPanel_isHidden)) && refresh_Video_getStatus() ? "bottom: -84px;" : "bottom: 0;";
        const isBeta = !!document.getElementsByClassName("live-next-body")[0];
        if (isBeta) dom_player_toolbar.parentElement.style.zIndex = "20";
    }

    let dom = playerDialog.closest('.layout-Player-video') || playerDialog.closest('.stream__T55I3');
    let refresh_video3 = playerDialog.querySelector("#refresh-video3");
    let refresh_video = playerMenu.querySelector("#refresh-video");
    let timer_timeout = 0;

    function hideRefreshVideo3() {
        if (!refresh_video3) return;
        refresh_video3.style.opacity = "0";
        refresh_video3.style.transform = "scale(.9)";
        refresh_video3.style.pointerEvents = "none";
        clearTimeout(timer_timeout);
    }

    function setRefreshVideo3Show() {
        if (!refresh_video3) return;
        refresh_video3.style.opacity = "1";
        refresh_video3.style.transform = "scale(1)";
        refresh_video3.style.pointerEvents = "auto";
        clearTimeout(timer_timeout);
        timer_timeout = setTimeout(() => {
            hideRefreshVideo3();
        }, 2000);
    }

    dom.addEventListener("mouseenter", () => { setRefreshVideo3Show(); });
    dom.addEventListener("mouseleave", () => { hideRefreshVideo3(); });
    gDomObserver.waitForElement('.room-Player-Box').then(dom_video => {
        dom_video.addEventListener("mousemove", () => { setRefreshVideo3Show(); });
    });
    playerDialog.addEventListener("mouseover", e => {
        const refresh_video3 = e.target.closest("#refresh-video3");
        if (!refresh_video3 || e.relatedTarget && refresh_video3.contains(e.relatedTarget)) return;
        refresh_video3.style.opacity = "1";
        refresh_video3.style.transform = "scale(1.08)";
        refresh_video3.style.pointerEvents = "auto";
        refresh_video3.style.backgroundColor = "rgba(0,0,0,.7)";
        clearTimeout(timer_timeout);
    });
    playerDialog.addEventListener("mouseout", e => {
        const refresh_video3 = e.target.closest("#refresh-video3");
        if (!refresh_video3 || e.relatedTarget && refresh_video3.contains(e.relatedTarget)) return;
        refresh_video3.style.transform = "scale(1)";
        refresh_video3.style.backgroundColor = "rgba(0,0,0,.55)";
    });

    function toggleRefreshVideo(isSimple) {
        if (!isSimple) {
            dom_toolbar.style.visibility = "visible";
            dom.style.bottom = "";
            dom.style.zIndex = "";
            if (refresh_video3) {
                refresh_video3.style.opacity = "0";
                refresh_video3.style.transform = "scale(.9)";
                refresh_video3.style.pointerEvents = "none";
                refresh_video3.title = "开启简洁模式";
            }
            refresh_video.innerText = "简洁模式";
            refresh_Video_removeStyle();
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom.style.bottom = "0";
            dom.style.zIndex = "25";
            refresh_video.innerText = "✓ 简洁模式";
            if (refresh_video3) refresh_video3.title = "关闭简洁模式";
            refresh_Video_setStyle();
        }
        changeToolBarZIndex();
        saveData_Refresh();
        resizeWindow();
    }

    playerDialog.addEventListener("click", e => {
        if (!e.target.closest("#refresh-video3")) return;
        e.stopPropagation();
        toggleRefreshVideo(!refresh_Video_getStatus());
    });
    playerMenu.addEventListener("click", e => {
        if (!e.target.closest("#refresh-video")) return;
        e.stopPropagation();
        toggleRefreshVideo(!refresh_Video_getStatus());
    });

    return toggleRefreshVideo;
}

function refresh_Video_getStatus() {
    let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
    return dom_toolbar ? dom_toolbar.style.visibility === "hidden" : false;
}
// FullPageFollowGuide
function initPkg_Refresh_Video_Set(toggleRefreshVideo) {
    if (typeof toggleRefreshVideo !== "function") return;
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("video" in retJson == false) {
            retJson.video = {status: false};
        }
        if (retJson.video.status == true) {
            toggleRefreshVideo(true);
        }
    }
}

function refresh_Video_setStyle() {
    StyleHook_set("Ex_Style_VideoRefresh", `
    .PELact,.pushTower-wrapper-gf1HG,.PkView-9f6a2c,.MorePk,.RandomPKBar,.LiveRoomLoopVideo,.LiveRoomDianzan,.maiMaitView-68e80c,.PkView{display:none !important;}
    `)
}

function refresh_Video_removeStyle() {
    StyleHook_remove("Ex_Style_VideoRefresh");
}
