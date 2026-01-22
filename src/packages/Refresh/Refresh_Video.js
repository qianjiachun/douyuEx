function initPkg_Refresh_Video() {
    Promise.all([
        gDomObserver.waitForElement('#js-player-dialog'),
        gDomObserver.waitForElement('.menu-da2a9e'),
    ]).then(([playerDialog, playerMenu]) => {
        initPkg_Refresh_Video_Dom(playerDialog, playerMenu);
        initPkg_Refresh_Video_Func(playerDialog, playerMenu);
        initPkg_Refresh_Video_Set();
    }).catch(err => {
        console.error('DouyuEx 简洁模式: 初始化简洁模式失败：', err);
    });
}

function initPkg_Refresh_Video_Dom(playerDialog, playerMenu) {
    if (!playerDialog.querySelector("#refresh-video3")) {
        playerDialog.insertAdjacentHTML(
            "afterbegin",
            `<div id="refresh-video3" title="关闭简洁模式">简</div>`
        );
    }

    if (!playerMenu.querySelector("#refresh-video")) {
        playerMenu.insertAdjacentHTML(
            "beforeend",
            `<li id="refresh-video">简洁模式</li>`
        );
    }
}

function initPkg_Refresh_Video_Func(playerDialog, playerMenu) {
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
        let video_fullPage = !!(document.querySelector(".wfs-2a8e83.removed-9d4c42") || document.querySelector(".toggle__P8TKM"));
        let video_fullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        let chatPanel_isHidden = !!document.querySelector(".shrink__Sd0uK");
        const dom_player_toolbar = document.getElementById("js-player-toolbar");
        dom_player_toolbar.style.zIndex = video_fullPage ? "20" : "30";
        const dom_casebar = document.getElementsByClassName("case__f4yex")[0];
        if (dom_casebar) dom_casebar.style = (video_fullScreen || (video_fullPage && chatPanel_isHidden)) && refresh_Video_getStatus() ? "bottom: -84px;" : "bottom: 0;";
        const isBeta = !!document.getElementsByClassName("live-next-body")[0];
        if (isBeta) dom_player_toolbar.parentElement.style.zIndex = "20";
    } */

    let dom = playerDialog.closest('.layout-Player-video') || playerDialog.closest('.stream__T55I3');
    let timer_timeout = 0;

    dom.addEventListener("mouseenter", () => {
        document.body.classList.add("simple-show");
        clearTimeout(timer_timeout);
    });
    dom.addEventListener("mouseleave", () => {
        document.body.classList.remove("simple-show");
        clearTimeout(timer_timeout);
    });
    gDomObserver.waitForElement('.room-Player-Box').then(dom_video => {
        dom_video.addEventListener("mousemove", () => {
            document.body.classList.add("simple-show");
            clearTimeout(timer_timeout);
            timer_timeout = setTimeout(() => {
                document.body.classList.remove("simple-show");
            }, 2000);
        });
    });
    playerDialog.addEventListener("mouseover", e => {
        const refresh_video3 = e.target.closest("#refresh-video3");
        if (!refresh_video3 || e.relatedTarget && refresh_video3.contains(e.relatedTarget)) return;
        document.body.classList.add("simple-hover");
        clearTimeout(timer_timeout);
    });
    playerDialog.addEventListener("mouseout", e => {
        const refresh_video3 = e.target.closest("#refresh-video3");
        if (!refresh_video3 || e.relatedTarget && refresh_video3.contains(e.relatedTarget)) return;
        document.body.classList.remove("simple-hover");
    });

    function toggleSimpleMode() {
        document.body.classList.toggle("is-simpleMode");
        saveData_Refresh();
        resizeWindow();
    }

    playerDialog.addEventListener("click", e => {
        if (!e.target.closest("#refresh-video3")) return;
        e.stopPropagation();
        toggleSimpleMode();
    });
    playerMenu.addEventListener("click", e => {
        if (!e.target.closest("#refresh-video")) return;
        e.stopPropagation();
        toggleSimpleMode();
    });
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
        }
    }
}
