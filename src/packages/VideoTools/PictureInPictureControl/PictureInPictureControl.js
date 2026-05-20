let icon_pipcontrol = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAApElEQVR4AexTAQ6AIAisftJP6if9rKfUU/qJkds5RppsYbOWoyg4OUHomsLrQwTOucXZrRmV5yUaYDTQE2JwAm9rby4fhL1OBMxn8vkTZMv4vhKhCZFafRnQsGsmPjrJyCqnNROfnuRcdPhRa6nhh67vDnAyrX4+A+qSqMgTR0FklDiewSadiX8NbsXeQEDd0NOTFGwgwCWO/IeMwAcCGKx1cYIdAAD//3oahzQAAAAGSURBVAMAxtKrMXdkXvIAAAAASUVORK5CYII="/>`;
let icon_pipcontrol_set = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB2klEQVR4AcyUgXHCMAxF7S7SsglsApMAk0AngU1gE/qeiRxMgFC43jXnH8mK9b9sJflIf3z9P4HT6fQFpoGxA3h6BxBKvIHwAHYB4gewZH5zPCUAwZxsibW46ZhS2qfz9YURmOEYFYB8SpqVY5Kkk5zzJPWXYt/9tPVGBVge5Nuc8yznfETUI1JY8gWxPTGPcIdtjuuhAIvnCMT21/gxJNev5Ew8QuPmMD2PhwIs+QSOFVVabUJUEmNHYqVyJpJjynAnsSaNCUT1JbO7KSQkklj4yP4I/YoxAYnqYh2qNjbD10YBpT/EYo57HmMCkRC2ZF2ITPAdC47ONSIRqDu5K0CCzRKSDl5DSOyBu/C5qG+bk8BNgY48EsqbEgnXlrX2wlczGtsUMxAgwaovybdB6jOwBBugldgmr7o1fif1eIw1AiRZxV1yEnwmmUVoBeHkUQ3IE1cjwNwvFJM8lqZygpJjkqQ+E/qutdlN5am7qkBXvWGbZ7K+H5bVBrlkaxqsFfp1bUm4ulUB4m4T0w9Er8kfkvWZvVcFqEoBt+lb4T/e5l1W/mtyZaqAE7AARQTrR6OoR/ESORztv8hdAH8D/u99K2zey+QDAQMCERvtTpy+hesjeovsVvIPAAAA//+5v3LIAAAABklEQVQDAFMMzjFiZ8i8AAAAAElFTkSuQmCC"/>`;
let icon_pipcontrol_send = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAs0lEQVR4AeyU3Q2AIAyE1UkcRTfTyXQTR8GW5MgFCCQFXwxELD/HfaRpWKaP248AzrnL9WsPMs8p2rDYIa7wYIBfmxubN6FfAqC9LsMBqKaxmCJULVxqc+g4FgEstI6LAFQszGtz6DgWASy0jgegmrkkRVKKq3TzyxoTE4AI9KltfVlv8fFfDqAbN0rSGHc10Z4DHGIaBCpq6TFgF/OzxTA+ywA1D7mLhdZ5AMjNu5vrpV4AAAD//9kfWOoAAAAGSURBVAMAe2CtMQj8RU0AAAAASUVORK5CYII="/>`;
// 全局配置项与 WebSocket 实例状态
let pip_ws_instance = null;
let pipConfig = {
    fontSize: 18,
    speed: 2.5,
    area: "full",
    trackHeight: 28,
    mergeMode: "combo",
    lowPowerMode: false
};

function initPkg_PictureInPictureControl() {
    initPkg_PictureInPictureControl_Dom();
    initPkg_PictureInPictureControl_Func();
}

function initPkg_PictureInPictureControl_Dom() {
    PictureInPictureControl_insertIcon();
}

function PictureInPictureControl_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-pipcontrol";
    a.title = "画中画增强";
    a.innerHTML = icon_pipcontrol;

    let b = document.querySelector(".icon-7e38e8");
    b.after(a);
}

function initPkg_PictureInPictureControl_Func() {
    document.getElementById("ex-pipcontrol").addEventListener("click", () => {
        const video = document.getElementById('__video2');
        if (!video) {
            showMessage("【画中画增强】当前直播间不支持画中画增强功能", "error");
            return;
        }

        if (!window.documentPictureInPicture) {
            showMessage("【画中画增强】当前浏览器不支持画中画增强功能，建议使用 Chrome 116+ 或 Edge 116+", "error");
            return;
        }

        const saved = localStorage.getItem("ExSave_PipSet");
        if (saved) {
            try {
                const obj = JSON.parse(saved);
                Object.assign(pipConfig, obj);
            } catch (e) { }
        }

        PictureInPictureControl_handle();
    });
}

function PictureInPictureControl_toggleMainVideoVisibility(hide) {
    const mainVideo = document.getElementById('__video2');
    if (!mainVideo) return;
    
    if (hide) {
        mainVideo.style.setProperty('opacity', '0.01', 'important');
        mainVideo.style.setProperty('pointer-events', 'none', 'important');
    } else {
        mainVideo.style.removeProperty('opacity');
        mainVideo.style.removeProperty('pointer-events');
    }
}

// 低功耗模式
function PictureInPictureControl_toggleSourcePagePower(enable) {
    const powerHogs = [
        '.layout-Player',
        ".room-html5-player",
        ".Barrage-list",
        ".DiamondsFansRankList",
        ".wm-view",
        ".wm-tabv2",
        ".comment-37342a",
        ".DanmuEffectDom",
        ".layout-Player-asideMainTop"
    ];

    const freezeWhitelists = [
        ".ChatSend-txt",
        ".ChatSend-button"
    ];

    powerHogs.forEach(selector => {
        const el = document.querySelector(selector);
        if (!el) return;

        if (enable) {
            el.style.setProperty('display', 'none', 'important');
        } else {
            el.style.removeProperty('display');
        }
    });

    freezeWhitelists.forEach(selector => {
        const el = document.querySelector(selector);
        if (!el) return;

        if (enable) {
            el.style.setProperty('opacity', '0.01', 'important');
            el.style.setProperty('pointer-events', 'none', 'important');
        } else {
            el.style.removeProperty('opacity');
            el.style.removeProperty('pointer-events');
        }
    });
}


async function PictureInPictureControl_handle() {
    const video = document.getElementById('__video2');

    if (pip_ws_instance) {
        try { pip_ws_instance.close(); } catch (e) { }
        pip_ws_instance = null;
    }

    const pipWindow = await documentPictureInPicture.requestWindow({
        width: 670,
        height: 380,
        disallowReturnToOpener: true,
        preferInitialWindowPlacement: true
    });

    pipWindow.document.body.innerHTML = PictureInPictureControl_getTemplate();

    const pipVideo = pipWindow.document.getElementById("pip-video");
    const danmakuLayer = pipWindow.document.getElementById("danmaku");
    const setBtn = pipWindow.document.getElementById("pip-set");
    const sendBtn = pipWindow.document.getElementById("pip-send");
    const toast = pipWindow.document.getElementById("pip-toast");

    PictureInPictureControl_toggleMainVideoVisibility(true);

    if (pipConfig.lowPowerMode !== false) {
        PictureInPictureControl_toggleSourcePagePower(true);
    }

    pipVideo.srcObject = video.captureStream();
    await pipVideo.play().catch(() => { });

    setBtn.addEventListener("click", () => {
        PictureInPictureControl_openSettingPanel();
        toast.innerText = "已在斗鱼直播页面打开设置面板";
        toast.classList.add("show");
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove("show"), 5000);
    });

    sendBtn.addEventListener("click", () => {
        const panel = pipWindow.document.getElementById("input-panel");
        const inputField = pipWindow.document.getElementById("pip-input-field");
        if (panel.classList.contains("active")) {
            panel.classList.remove("active");
        } else {
            panel.classList.add("active");
            inputField.focus();
        }
    });

    PictureInPictureControl_bindSendEvents(pipWindow, danmakuLayer);
    PictureInPictureControl_bindVideoSync(video, pipVideo);
    PictureInPictureControl_startComboCleaner();

    pip_ws_instance = new Ex_WebSocket_UnLogin(rid, (ret) => {
        const msg = PictureInPictureControl_parseWSMsg(ret);
        PictureInPictureControl_handleComboAndRender(msg, pipWindow, danmakuLayer);
    });

    PictureInPictureControl_bindCleanup(video, pipWindow, pipVideo);
}

function PictureInPictureControl_bindVideoSync(video, pipVideo) {
    function syncVideo() {
        if (video.paused) pipVideo.pause();
        else pipVideo.play().catch(() => { });
    }
    video.addEventListener("play", syncVideo);
    video.addEventListener("pause", syncVideo);
}

function PictureInPictureControl_bindCleanup(video, pipWindow, pipVideo) {
    window.__pip_is_active__ = true;

    function cleanup() {
        window.__pip_is_active__ = false;

        PictureInPictureControl_toggleSourcePagePower(false);
        
        PictureInPictureControl_toggleMainVideoVisibility(false);

        if (pip_ws_instance) {
            try { pip_ws_instance.close(); } catch (e) { }
            pip_ws_instance = null;
        }
        if (comboCleanerTimer) {
            clearInterval(comboCleanerTimer);
            comboCleanerTimer = null;
        }
        comboMap.clear();
        try { pipVideo.srcObject = null; } catch (e) { }
        try { pipWindow.close(); } catch (e) { }
    }

    pipWindow.addEventListener("pagehide", cleanup);
    const timer = setInterval(() => {
        if (pipWindow.closed) {
            clearInterval(timer);
            cleanup();
        }
    }, 2000);
}