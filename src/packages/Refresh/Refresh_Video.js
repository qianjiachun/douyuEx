function initPkg_Refresh_Video() {
    Promise.all([
        gDomObserver.waitForElement('#js-player-dialog'),
        gDomObserver.waitForElement('.menu-da2a9e'),
        gDomObserver.waitForElement('.shieldSettingPanel-074097'),
    ]).then(([playerDialog, playerMenu, settingPanel]) => {
        initPkg_Refresh_Video_Dom(playerDialog, playerMenu, settingPanel);
        initPkg_Refresh_Video_Func(playerDialog, settingPanel);
        initPkg_Refresh_Video_Set();
    }).catch(err => {
        console.error('DouyuEx 隐藏礼物栏: 初始化失败：', err);
    });
}

function initPkg_Refresh_Video_Dom(playerDialog, playerMenu, settingPanel) {
    if (!document.getElementById("menu-simpleMode")) {
        playerMenu.insertAdjacentHTML(
            "beforeend",
            `<li id="menu-simpleMode">隐藏礼物栏</li>`
        );
    }

    if (!document.getElementById("dialog-simpleMode")) {
        playerDialog.insertAdjacentHTML(
            "afterbegin",
            `<div id="dialog-simpleMode" title="点击隐藏礼物栏">
                <div>隐藏礼物栏</div>
                <div id="ex-refresh-switch">
                    <div id="ex-refresh-switch-circle"></div>
                </div>
            </div>`
        );
    }

    if (!document.getElementById("item-simpleMode")) {
        settingPanel.insertAdjacentHTML(
            "afterbegin",
            `<div class="shieldSettingItem-4b3b84" id="item-simpleMode">
                <i class="checkButton-98c84e">
                    <svg fill="none" viewBox="0 0 16 16" class="unchecked-b96102" id="item-simpleMode__svg">
                        <rect opacity="0.6" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="currentColor" id="item-simpleMode__rect"></rect>
                        <path d="M4 8.308L6.8 11 12 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="item-simpleMode__path"></path>
                    </svg>
                </i>
                <label class="shieldSettingLabel-be2859">隐藏礼物栏</label>
            </div>`
        );
    }
}

function initPkg_Refresh_Video_Func(playerDialog, settingPanel) {
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
    let refresh_video = document.getElementById("menu-simpleMode");
    let refresh_video2 = document.getElementById("item-simpleMode");
    let refresh_video3 = document.getElementById("dialog-simpleMode");
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
        const svg = document.getElementById("item-simpleMode__svg");
        if (svg) {
            svg.setAttribute("class", isSimpleMode ? "checked-13adb7" : "unchecked-b96102");
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
    if (refresh_video2) {
        refresh_video2.addEventListener("click", e => {
            e.stopPropagation();
            toggleRefreshVideo();
        });
    }
    if (refresh_video3) {
        refresh_video3.addEventListener("click", e => {
            e.stopPropagation();
            toggleRefreshVideo();
        });
    gHotkey.add("s", () => toggleRefreshVideo());
    }
}

// FullPageFollowGuide
function initPkg_Refresh_Video_Set() {
    if (loadData_Refresh("simpleMode")) {
        document.body.classList.add("is-simpleMode");
        let dom_refresh2_svg = document.getElementById("item-simpleMode__svg");
        if (dom_refresh2_svg) {
            dom_refresh2_svg.setAttribute("class", "checked-13adb7");
        }
        let dom_refresh3 = document.getElementById("dialog-simpleMode");
        if (dom_refresh3) {
            dom_refresh3.title = "点击显示礼物栏";
        }
        resizeWindow();
    }
}
