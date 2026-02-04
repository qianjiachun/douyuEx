let video_num = 0;
function initPkg_Refresh_Video() {
    let timer = setInterval(() => {
        const controlbar = getValidDom([".right-e7ea5d", ".right-17e251"]);
        if (controlbar) {
            clearInterval(timer);
            initPkg_Refresh_Video_Dom();
            initPkg_Refresh_Video_Func();
            initPkg_Refresh_Video_Set();
        }
        video_num++;
        if (video_num >= 100) {
            clearInterval(timer);
        }
    }, 1500);
}

function initPkg_Refresh_Video_Dom() {
	Refresh_Video_insertIcon();
}
function Refresh_Video_insertIcon() {
	let a = document.createElement("li");
    a.id = "refresh-video";
    a.innerText = "简洁模式";
    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[b.childNodes.length -1]);

    if (!document.getElementById("refresh-video3")) {
        a = document.createElement("div");
        a.id = "refresh-video3";
        a.title = "开启简洁模式";
        a.innerText = "简";
        a.style = "position:absolute;right:18px;bottom:58px;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);color:#fff;z-index:9999;cursor:pointer;user-select:none;font-size:18px;line-height:32px;opacity:0;transform:scale(.9);transition:opacity .15s ease,transform .15s ease,background-color .15s ease;pointer-events:none;";
        b = document.getElementById("js-player-dialog");
        if (b) b.insertBefore(a, b.childNodes[0]);
    }
}

function initPkg_Refresh_Video_Func() {
    new DomHook(".right-e7ea5d", true, () => {
        changeToolBarZIndex();
    });
    new DomHook(".right-17e251", true, () => {
        changeToolBarZIndex();
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

    let dom = getValidDom([".layout-Player-video", ".stream__T55I3"]);
    let dom_video = document.getElementsByClassName("room-Player-Box")[0];
    let refresh_video3 = document.getElementById("refresh-video3");
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

    if (dom && refresh_video3) {
        dom.addEventListener("mouseenter", () => { setRefreshVideo3Show(); });
        dom.addEventListener("mouseleave", () => { hideRefreshVideo3(); });
    }
    if (dom_video && refresh_video3) {
        dom_video.addEventListener("mousemove", () => { setRefreshVideo3Show(); });
    }
    if (refresh_video3) {
        refresh_video3.addEventListener("mouseenter", () => {
            refresh_video3.style.opacity = "1";
            refresh_video3.style.transform = "scale(1.08)";
            refresh_video3.style.pointerEvents = "auto";
            refresh_video3.style.backgroundColor = "rgba(0,0,0,.7)";
            clearTimeout(timer_timeout);
        });
        refresh_video3.addEventListener("mouseleave", () => {
            refresh_video3.style.transform = "scale(1)";
            refresh_video3.style.backgroundColor = "rgba(0,0,0,.55)";
        });
    }

    function toggleRefreshVideo() {
        let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
        let dom_video = getValidDom([".layout-Player-video", ".stream__T55I3"]);
        let dom_refresh = document.getElementById("refresh-video");
        let dom_refresh3 = document.getElementById("refresh-video3");
        if (!dom_toolbar || !dom_video || !dom_refresh) return;

        if (dom_toolbar.style.visibility == "hidden") {
            dom_toolbar.style.visibility = "visible";
            dom_video.style = "";
            if (dom_refresh3) {
                dom_refresh3.style.opacity = "0";
                dom_refresh3.style.transform = "scale(.9)";
                dom_refresh3.style.pointerEvents = "none";
                dom_refresh3.title = "开启简洁模式";
            }
            dom_refresh.innerText = "简洁模式";
            refresh_Video_removeStyle();
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_refresh.innerText = "✓ 简洁模式";
            if (dom_refresh3) dom_refresh3.title = "关闭简洁模式";
            refresh_Video_setStyle();
        }
        changeToolBarZIndex();
        saveData_Refresh();
        resizeWindow();
    }

	document.getElementById("refresh-video").addEventListener("click", (e) => {
        toggleRefreshVideo();
    });

    if (refresh_video3) {
        refresh_video3.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleRefreshVideo();
        });
    }
}

function refresh_Video_getStatus() {
    let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
    if (dom_toolbar.style.visibility == "hidden") {
        return true;
    } else {
        return false;
    }
}
// FullPageFollowGuide
function initPkg_Refresh_Video_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("video" in retJson == false) {
            retJson.video = {status: false};
        }
        if (retJson.video.status == true) {
            let dom_toolbar = document.getElementsByClassName("PlayerToolbar-ContentRow")[0];
            let dom_video = getValidDom([".layout-Player-video", ".stream__T55I3"]);
            let dom_refresh = document.getElementById("refresh-video");
            let dom_refresh3 = document.getElementById("refresh-video3");
            let dom_player_toolbar = document.getElementById("js-player-toolbar");
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_player_toolbar.style = "z-index:30";
            let ret = localStorage.getItem("ExSave_FullScreen");
            if (ret != null) {
                let retJson = JSON.parse(ret);
                if (retJson.isFullScreen) {
                    dom_player_toolbar.style = "z-index:20";
                }
            }
            const isBeta = !!document.getElementsByClassName("live-next-body")[0];
            if (isBeta) dom_player_toolbar.parentElement.style = "z-index:20";
            if (dom_refresh3) {
                dom_refresh3.style.opacity = "0";
                dom_refresh3.style.transform = "scale(.9)";
                dom_refresh3.style.pointerEvents = "none";
                dom_refresh3.title = "关闭简洁模式";
            }
            dom_refresh.innerText = "✓ 简洁模式";
            refresh_Video_setStyle();
            resizeWindow();
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
