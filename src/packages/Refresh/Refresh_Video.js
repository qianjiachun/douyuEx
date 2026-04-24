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
    a.innerText = "隐藏礼物栏";
    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[b.childNodes.length -1]);

    if (!document.getElementById("refresh-video3")) {
        a = document.createElement("div");
        a.id = "refresh-video3";
        a.title = "点击隐藏礼物栏";
        a.innerHTML = `<div style="display:flex;align-items:center;gap:6px;">
            <div style="font-size:12px;">隐藏礼物栏</div>
            <div id="ex-refresh-switch" style="width:26px;height:14px;background:rgba(255,255,255,0.3);border-radius:7px;position:relative;transition:background 0.3s;">
                <div id="ex-refresh-switch-circle" style="width:10px;height:10px;background:#fff;border-radius:50%;position:absolute;top:2px;left:2px;transition:left 0.3s, background 0.3s;"></div>
            </div>
        </div>`;
        a.style = "position:absolute;right:18px;bottom:58px;padding:0 10px;height:28px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);color:#fff;z-index:9999;cursor:pointer;user-select:none;opacity:0;transform:scale(.9);transition:opacity .15s ease,transform .15s ease,background-color .15s ease,box-shadow .3s ease;pointer-events:none;";
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
    let isHoveringRefresh3 = false;

    function hideRefreshVideo3() {
        if (!refresh_video3) return;
        if (isHoveringRefresh3) return;
        refresh_video3.style.transition = "opacity .15s ease,transform .15s ease,background-color .15s ease,box-shadow .3s ease";
        refresh_video3.style.opacity = "0";
        refresh_video3.style.transform = "scale(.9)";
        refresh_video3.style.pointerEvents = "none";
        clearTimeout(timer_timeout);
    }

    function setRefreshVideo3Show() {
        if (!refresh_video3) return;
        refresh_video3.style.transition = "opacity .15s ease,transform .15s ease,background-color .15s ease,box-shadow .3s ease";
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
            isHoveringRefresh3 = true;
            refresh_video3.style.transition = "opacity .15s ease,transform .15s ease,background-color .15s ease,box-shadow .3s ease";
            refresh_video3.style.opacity = "1";
            refresh_video3.style.transform = "scale(1.08)";
            refresh_video3.style.pointerEvents = "auto";
            refresh_video3.style.backgroundColor = "rgba(0,0,0,.7)";
            clearTimeout(timer_timeout);
        });
        refresh_video3.addEventListener("mouseleave", () => {
            isHoveringRefresh3 = false;
            refresh_video3.style.transform = "scale(1)";
            refresh_video3.style.backgroundColor = "rgba(0,0,0,.55)";
            setRefreshVideo3Show();
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
                dom_refresh3.title = "点击隐藏礼物栏";
            }
            dom_refresh.innerText = "隐藏礼物栏";
            updateRefreshSwitchUI(false);
            refresh_Video_removeStyle();
        } else {
            dom_toolbar.style.visibility = "hidden";
            dom_video.style = "bottom:0;z-index:25";
            dom_refresh.innerText = "✓ 隐藏礼物栏";
            if (dom_refresh3) dom_refresh3.title = "点击显示礼物栏";
            updateRefreshSwitchUI(true);
            
            if (dom_refresh3) {
                dom_refresh3.style.transition = "opacity .3s ease,transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275),background-color .3s ease,box-shadow .3s ease";
                dom_refresh3.style.opacity = "1";
                dom_refresh3.style.transform = "scale(1.1)";
                dom_refresh3.style.pointerEvents = "auto";
                dom_refresh3.style.backgroundColor = "rgba(0,0,0,.8)";
                dom_refresh3.style.boxShadow = "0 0 15px rgba(255, 102, 0, 0.6)";
                
                clearTimeout(timer_timeout);
                timer_timeout = setTimeout(() => {
                    dom_refresh3.style.transition = "opacity .15s ease,transform .15s ease,background-color .15s ease,box-shadow .15s ease";
                    dom_refresh3.style.transform = "scale(1)";
                    dom_refresh3.style.backgroundColor = "rgba(0,0,0,.55)";
                    dom_refresh3.style.boxShadow = "none";
                    timer_timeout = setTimeout(() => {
                        hideRefreshVideo3();
                    }, 1500);
                }, 800);
            }
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

function updateRefreshSwitchUI(isSimpleMode) {
    let swBg = document.getElementById("ex-refresh-switch");
    let swCircle = document.getElementById("ex-refresh-switch-circle");
    if (swBg && swCircle) {
        if (isSimpleMode) {
            swBg.style.background = "#f60";
            swCircle.style.left = "14px";
        } else {
            swBg.style.background = "rgba(255,255,255,0.3)";
            swCircle.style.left = "2px";
        }
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
                dom_refresh3.title = "点击显示礼物栏";
            }
            dom_refresh.innerText = "✓ 隐藏礼物栏";
            refresh_Video_setStyle();
            resizeWindow();
            setTimeout(() => {
                updateRefreshSwitchUI(true);
            }, 500);
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
