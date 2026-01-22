function initPkg_Refresh_Video() {
    Promise.all([
        gDomObserver.waitForElement('#js-player-dialog'),
        gDomObserver.waitForElement('.menu-da2a9e'),
        gDomObserver.waitForElement('.shieldSettingPanel-074097'),
    ]).then(([playerDialog, playerMenu, settingPanel]) => {
        initPkg_Refresh_Video_Dom(playerDialog, playerMenu, settingPanel);
        initPkg_Refresh_Video_Func(playerDialog, playerMenu, settingPanel);
        initPkg_Refresh_Video_Set();
    }).catch(err => {
        console.error('DouyuEx 简洁模式: 初始化简洁模式失败：', err);
    });
}

function initPkg_Refresh_Video_Dom(playerDialog, playerMenu, settingPanel) {
    if (!playerDialog.querySelector("#dialog-playerSimple")) {
        playerDialog.insertAdjacentHTML(
            "afterbegin",
            `<div id="dialog-playerSimple" title="关闭简洁模式">简</div>`
        );
    }

    if (!playerMenu.querySelector("#menu-playerSimple")) {
        playerMenu.insertAdjacentHTML(
            "beforeend",
            `<li id="menu-playerSimple">简洁模式</li>`
        );
    }

    if (!settingPanel.querySelector("#item-playerSimple")) {
        settingPanel.insertAdjacentHTML(
            "afterbegin",
            `<div class="shieldSettingItem-4b3b84" id="item-playerSimple">
                <i class="checkButton-98c84e">
                    <svg fill="none" viewBox="0 0 16 16" class="unchecked-b96102" id="item-playerSimple__svg">
                        <rect opacity="0.6" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="currentColor" id="item-playerSimple__rect"></rect>
                        <path d="M4 8.308L6.8 11 12 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="item-playerSimple__path"></path>
                    </svg>
                </i>
                <label class="shieldSettingLabel-be2859">视频简洁模式</label>
            </div>`
        );
    }
}

function initPkg_Refresh_Video_Func(playerDialog, playerMenu, settingPanel) {
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
        const dom_dialog = e.target.closest("#dialog-playerSimple");
        if (!dom_dialog || e.relatedTarget && dom_dialog.contains(e.relatedTarget)) return;
        document.body.classList.add("simple-hover");
        clearTimeout(timer_timeout);
    });
    playerDialog.addEventListener("mouseout", e => {
        const dom_dialog = e.target.closest("#dialog-playerSimple");
        if (!dom_dialog || e.relatedTarget && dom_dialog.contains(e.relatedTarget)) return;
        document.body.classList.remove("simple-hover");
    });

    function toggleSimpleMode() {
        document.body.classList.toggle("is-playerSimple");
        const svg = settingPanel.querySelector("#item-playerSimple__svg");
        if (document.body.classList.contains("is-playerSimple")) {
            svg.setAttribute("class", "checked-13adb7");
        } else {
            svg.setAttribute("class", "unchecked-b96102");
        }
        saveData_Refresh();
        resizeWindow();
    }

    playerDialog.addEventListener("click", e => {
        if (!e.target.closest("#dialog-playerSimple")) return;
        e.stopPropagation();
        toggleSimpleMode();
    });
    playerMenu.addEventListener("click", e => {
        if (!e.target.closest("#menu-playerSimple")) return;
        e.stopPropagation();
        toggleSimpleMode();
    });
    settingPanel.addEventListener("click", e => {
        if (!e.target.closest("#item-playerSimple")) return;
        e.stopPropagation();
        toggleSimpleMode();
    });
}

function refresh_Video_getStatus() {
    return document.body.classList.contains("is-playerSimple");
}
// FullPageFollowGuide
function initPkg_Refresh_Video_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.video && retJson.video.status === true) {
            document.body.classList.add("is-playerSimple");
            gDomObserver.waitForElement('#item-playerSimple__svg').then(svg => {
                svg.setAttribute("class", "checked-13adb7");
            });
        }
    }
}
