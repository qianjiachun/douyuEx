let icon_pipcontrol_set = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB2klEQVR4AcyUgXHCMAxF7S7SsglsApMAk0AngU1gE/qeiRxMgFC43jXnH8mK9b9sJflIf3z9P4HT6fQFpoGxA3h6BxBKvIHwAHYB4gewZH5zPCUAwZxsibW46ZhS2qfz9YURmOEYFYB8SpqVY5Kkk5zzJPWXYt/9tPVGBVge5Nuc8yznfETUI1JY8gWxPTGPcIdtjuuhAIvnCMT21/gxJNev5Ew8QuPmMD2PhwIs+QSOFVVabUJUEmNHYqVyJpJjynAnsSaNCUT1JbO7KSQkklj4yP4I/YoxAYnqYh2qNjbD10YBpT/EYo57HmMCkRC2ZF2ITPAdC47ONSIRqDu5K0CCzRKSDl5DSOyBu/C5qG+bk8BNgY48EsqbEgnXlrX2wlczGtsUMxAgwaovybdB6jOwBBugldgmr7o1fif1eIw1AiRZxV1yEnwmmUVoBeHkUQ3IE1cjwNwvFJM8lqZygpJjkqQ+E/qutdlN5am7qkBXvWGbZ7K+H5bVBrlkaxqsFfp1bUm4ulUB4m4T0w9Er8kfkvWZvVcFqEoBt+lb4T/e5l1W/mtyZaqAE7AARQTrR6OoR/ESORztv8hdAH8D/u99K2zey+QDAQMCERvtTpy+hesjeovsVvIPAAAA//+5v3LIAAAABklEQVQDAFMMzjFiZ8i8AAAAAElFTkSuQmCC"/>`;
let icon_pipcontrol_send = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAs0lEQVR4AeyU3Q2AIAyE1UkcRTfTyXQTR8GW5MgFCCQFXwxELD/HfaRpWKaP248AzrnL9WsPMs8p2rDYIa7wYIBfmxubN6FfAqC9LsMBqKaxmCJULVxqc+g4FgEstI6LAFQszGtz6DgWASy0jgegmrkkRVKKq3TzyxoTE4AI9KltfVlv8fFfDqAbN0rSGHc10Z4DHGIaBCpq6TFgF/OzxTA+ywA1D7mLhdZ5AMjNu5vrpV4AAAD//9kfWOoAAAAGSURBVAMAe2CtMQj8RU0AAAAASUVORK5CYII="/>`;
let pip_ws_instance = null;
let pipConfig = {
    fontSize: 18,
    speed: 2.5,
    area: "full",
    trackHeight: 28,
    mergeMode: "combo",
    lowPowerMode: false,
    /** 为 true 时丢弃无 `dms` 字段的 chatmsg（通常为机器人弹幕） */
    filterRobotDanmaku: true,
    opacity: 1,
    danmakuVisible: true,
};
let pipControlbarHook = null;
let pipDocObserver = null;
let pipControlbarSyncRaf = null;
let pipDocSyncRaf = null;
let pipNativeTriggerBtn = null;
let pipMenuHideTimer = null;
let pipMenuAnchorBtn = null;

const PIP_MENU_SVG_NATIVE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="7" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`;
const PIP_MENU_SVG_ENHANCED = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 10h5.5M7 13h3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
function PictureInPictureControl_getDanmakuOpacity() {
    const v = pipConfig.opacity;
    if (v == null || Number.isNaN(v)) {
        return 1;
    }
    return Math.min(1, Math.max(0.3, v));
}

function PictureInPictureControl_applyDanmakuStyle(pipWindow) {
    const win = pipWindow || window.__pip_window__;
    if (!win || win.closed) {
        return;
    }
    const layer = win.document.getElementById("danmaku");
    const combo = win.document.getElementById("combo-container");
    const opacity = PictureInPictureControl_getDanmakuOpacity();
    const visible = pipConfig.danmakuVisible !== false;
    if (layer) {
        layer.style.opacity = String(opacity);
        layer.style.visibility = visible ? "visible" : "hidden";
    }
    if (combo) {
        combo.style.opacity = String(opacity);
        combo.style.display = visible ? "" : "none";
    }
}

function PictureInPictureControl_updateDanmakuToggleBtn(pipWindow) {
    const win = pipWindow || window.__pip_window__;
    const btn = win?.document.getElementById("pip-danmaku-toggle");
    if (!btn) {
        return;
    }
    const visible = pipConfig.danmakuVisible !== false;
    btn.textContent = "\u5f39";
    btn.title = visible ? "\u9690\u85cf\u5f39\u5e55" : "\u663e\u793a\u5f39\u5e55";
    btn.classList.toggle("is-off", !visible);
}

function PictureInPictureControl_initPipUiText(pipWindow) {
    const doc = pipWindow.document;
    const inputField = doc.getElementById("pip-input-field");
    const submitBtn = doc.getElementById("pip-submit-btn");
    if (inputField) {
        inputField.setAttribute("placeholder", "\u53d1\u6761\u5f39\u5e55\u5427...");
    }
    if (submitBtn) {
        submitBtn.textContent = "\u53d1\u9001";
    }
    PictureInPictureControl_updateDanmakuToggleBtn(pipWindow);
}

function PictureInPictureControl_openPipInputPanel(pipWindow) {
    const win = pipWindow || window.__pip_window__;
    if (!win || win.closed) {
        return;
    }
    const inputPanel = win.document.getElementById("input-panel");
    const inputField = win.document.getElementById("pip-input-field");
    if (!inputPanel || !inputField) {
        return;
    }
    inputPanel.classList.add("active");
    inputField.focus();
}

function PictureInPictureControl_getMenuHtml() {
    return `
        <div class="ex-pip-menu">
            <ul class="ex-pip-menu__list" role="presentation">
                <li>
                    <button type="button" class="ex-pip-opt" data-ex-pip-mode="native">
                        <span class="ex-pip-opt__icon">${PIP_MENU_SVG_NATIVE}</span>
                        <span class="ex-pip-opt__label">原版画中画</span>
                    </button>
                </li>
                <li>
                    <button type="button" class="ex-pip-opt ex-pip-opt--ex" data-ex-pip-mode="enhanced">
                        <span class="ex-pip-opt__icon">${PIP_MENU_SVG_ENHANCED}</span>
                        <span class="ex-pip-opt__body">
                            <span class="ex-pip-opt__row">
                                <span class="ex-pip-opt__label">加强版画中画</span>
                                <span class="ex-pip-opt__mark">DouyuEx</span>
                            </span>
                            <span class="ex-pip-opt__hint">带弹幕，可窗口发弹幕</span>
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    `;
}

function initPkg_PictureInPictureControl() {
    initPkg_PictureInPictureControl_Dom();
}

function initPkg_PictureInPictureControl_Dom() {
    PictureInPictureControl_ensureMenuPanel();
    PictureInPictureControl_startDocObserver();
    if (pipControlbarHook) {
        pipControlbarHook.closeHook();
    }
    const controlbar = document.getElementById("js-player-controlbar");
    if (!controlbar) {
        return;
    }
    pipControlbarHook = new DomHook("#js-player-controlbar", true, PictureInPictureControl_onControlbarMutation);
    PictureInPictureControl_tryBindPipButton();
}

function PictureInPictureControl_isPipBindingValid() {
    const bar = document.getElementById("js-player-controlbar");
    return !!(pipNativeTriggerBtn && pipNativeTriggerBtn.isConnected && bar && bar.contains(pipNativeTriggerBtn));
}

function PictureInPictureControl_stopDocObserver() {
    if (pipDocObserver) {
        pipDocObserver.disconnect();
        pipDocObserver = null;
    }
    if (pipDocSyncRaf != null) {
        cancelAnimationFrame(pipDocSyncRaf);
        pipDocSyncRaf = null;
    }
}

function PictureInPictureControl_startDocObserver() {
    if (pipDocObserver || PictureInPictureControl_isPipBindingValid()) {
        return;
    }
    pipDocObserver = new MutationObserver((records) => {
        if (PictureInPictureControl_isPipBindingValid()) {
            PictureInPictureControl_stopDocObserver();
            return;
        }
        let pipTooltipAdded = false;
        for (const rec of records) {
            for (const node of rec.addedNodes) {
                if (PictureInPictureControl_isPipTooltipNode(node)) {
                    pipTooltipAdded = true;
                    PictureInPictureControl_suppressPipTooltipElement(node);
                    break;
                }
                if (node.nodeType !== 1) {
                    continue;
                }
                for (const child of node.children) {
                    if (PictureInPictureControl_isPipTooltipNode(child)) {
                        pipTooltipAdded = true;
                        PictureInPictureControl_suppressPipTooltipElement(child);
                        break;
                    }
                }
                if (pipTooltipAdded) {
                    break;
                }
            }
            if (pipTooltipAdded) {
                break;
            }
        }
        if (!pipTooltipAdded) {
            return;
        }
        PictureInPictureControl_scheduleDocSync();
    });
    pipDocObserver.observe(document.body, { childList: true, subtree: true });
}

function PictureInPictureControl_isPipTooltipNode(node) {
    return node?.nodeType === 1
        && node.classList?.contains("mantine-Tooltip-tooltip")
        && (node.textContent || "").trim() === "开启画中画";
}

function PictureInPictureControl_scheduleDocSync() {
    if (PictureInPictureControl_isPipBindingValid()) {
        return;
    }
    if (pipDocSyncRaf != null) {
        return;
    }
    pipDocSyncRaf = requestAnimationFrame(() => {
        pipDocSyncRaf = null;
        if (PictureInPictureControl_isPipBindingValid()) {
            return;
        }
        PictureInPictureControl_tryBindPipButton();
        PictureInPictureControl_showMenuIfAnchorHovered();
    });
}

function PictureInPictureControl_scheduleControlbarSync() {
    if (PictureInPictureControl_isPipBindingValid()) {
        return;
    }
    if (pipControlbarSyncRaf != null) {
        return;
    }
    pipControlbarSyncRaf = requestAnimationFrame(() => {
        pipControlbarSyncRaf = null;
        PictureInPictureControl_syncControlbar();
    });
}

function PictureInPictureControl_syncControlbar() {
    if (PictureInPictureControl_isPipBindingValid()) {
        PictureInPictureControl_stopDocObserver();
        return;
    }
    if (pipNativeTriggerBtn && !pipNativeTriggerBtn.isConnected) {
        pipNativeTriggerBtn = null;
    }
    PictureInPictureControl_tryBindPipButton();
    if (PictureInPictureControl_isPipBindingValid()) {
        PictureInPictureControl_stopDocObserver();
    }
}

function PictureInPictureControl_onControlbarMutation(mutations) {
    if (PictureInPictureControl_isPipBindingValid()) {
        return;
    }
    if (pipNativeTriggerBtn && !pipNativeTriggerBtn.isConnected) {
        pipNativeTriggerBtn = null;
    }
    if (mutations && !PictureInPictureControl_mutationsMayAffectPip(mutations)) {
        return;
    }
    PictureInPictureControl_scheduleControlbarSync();
}

function PictureInPictureControl_mutationsMayAffectPip(mutations) {
    for (const m of mutations) {
        if (m.type === "childList") {
            for (const node of m.addedNodes) {
                if (PictureInPictureControl_nodeMayBePipRelated(node)) {
                    return true;
                }
            }
            for (const node of m.removedNodes) {
                if (node === pipNativeTriggerBtn) {
                    return true;
                }
                if (node.nodeType === 1 && pipNativeTriggerBtn && node.contains(pipNativeTriggerBtn)) {
                    return true;
                }
            }
        } else if (m.type === "attributes") {
            const target = m.target;
            if (target === pipNativeTriggerBtn) {
                return true;
            }
            if (target.nodeType === 1 && (m.attributeName === "aria-label" || m.attributeName === "title" || m.attributeName === "aria-describedby")) {
                const label = (target.getAttribute("aria-label") || target.title || "").trim();
                if (label.includes("画中画")) {
                    return true;
                }
            }
        }
    }
    return false;
}

function PictureInPictureControl_nodeMayBePipRelated(node) {
    if (node.nodeType !== 1) {
        return false;
    }
    if (node.matches?.("button, [role='button']")) {
        const label = (node.getAttribute("aria-label") || node.title || "").trim();
        if (label.includes("画中画")) {
            return true;
        }
    }
    return !!node.querySelector?.("button[aria-label*='画中画'], [role='button'][aria-label*='画中画']");
}

function PictureInPictureControl_findNativePipButton() {
    const bar = document.getElementById("js-player-controlbar");
    if (!bar) {
        return null;
    }
    const candidates = bar.querySelectorAll("button, [role='button']");
    for (const btn of candidates) {
        const label = (btn.getAttribute("aria-label") || btn.title || "").trim();
        if (label.includes("画中画")) {
            return btn;
        }
    }
    return null;
}

function PictureInPictureControl_findNativePipButtonFromTooltip() {
    const tooltips = document.querySelectorAll(".mantine-Tooltip-tooltip");
    for (const tooltip of tooltips) {
        if ((tooltip.textContent || "").trim() !== "开启画中画" || !tooltip.id) {
            continue;
        }
        const btn = document.querySelector(`[aria-describedby="${tooltip.id}"]`);
        if (btn) {
            return btn;
        }
    }
    return null;
}

function PictureInPictureControl_tryBindPipButton() {
    let btn = PictureInPictureControl_findNativePipButton();
    if (!btn) {
        btn = PictureInPictureControl_findNativePipButtonFromTooltip();
    }
    if (!btn || btn.dataset.exPipBound === "1") {
        return;
    }
    btn.dataset.exPipBound = "1";
    pipNativeTriggerBtn = btn;
    btn.addEventListener("mouseenter", PictureInPictureControl_onPipBtnEnter);
    btn.addEventListener("mouseleave", PictureInPictureControl_scheduleHideMenu);
    btn.addEventListener("focus", PictureInPictureControl_onPipBtnEnter);
    btn.addEventListener("blur", PictureInPictureControl_scheduleHideMenu);
    PictureInPictureControl_suppressNativeTooltip(btn);
    PictureInPictureControl_stopDocObserver();
    PictureInPictureControl_showMenuIfAnchorHovered();
}

function PictureInPictureControl_showMenuIfAnchorHovered() {
    const btn = pipNativeTriggerBtn;
    if (btn && btn.matches(":hover")) {
        pipMenuAnchorBtn = btn;
        PictureInPictureControl_suppressNativeTooltip(btn);
        PictureInPictureControl_showMenu(btn);
    }
}

function PictureInPictureControl_ensureMenuPanel() {
    if (document.getElementById("ex-pip-menu-panel")) {
        return;
    }
    const panel = document.createElement("div");
    panel.id = "ex-pip-menu-panel";
    panel.className = "ex-pip-menu-root";
    panel.setAttribute("role", "menu");
    panel.innerHTML = PictureInPictureControl_getMenuHtml();
    document.body.appendChild(panel);

    panel.addEventListener("mouseenter", PictureInPictureControl_cancelHideMenu);
    panel.addEventListener("mouseleave", PictureInPictureControl_scheduleHideMenu);

    panel.querySelector('[data-ex-pip-mode="native"]').addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        PictureInPictureControl_hideMenu();
        PictureInPictureControl_launchNative();
    });

    panel.querySelector('[data-ex-pip-mode="enhanced"]').addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        PictureInPictureControl_hideMenu();
        PictureInPictureControl_launchEnhanced();
    });
}

function PictureInPictureControl_onPipBtnEnter(e) {
    pipMenuAnchorBtn = e.currentTarget;
    PictureInPictureControl_suppressNativeTooltip(pipMenuAnchorBtn);
    PictureInPictureControl_showMenu(pipMenuAnchorBtn);
}

function PictureInPictureControl_showMenu(anchorBtn) {
    PictureInPictureControl_cancelHideMenu();
    const panel = document.getElementById("ex-pip-menu-panel");
    if (!panel || !anchorBtn) {
        return;
    }

    panel.classList.add("is-visible", "is-measuring");
    panel.style.removeProperty("visibility");
    panel.style.left = "-9999px";
    panel.style.top = "0";

    const rect = anchorBtn.getBoundingClientRect();
    const pw = panel.offsetWidth;
    const ph = panel.offsetHeight;
    const gap = 4;

    let left = rect.left + rect.width / 2 - pw / 2;
    let top = rect.top - ph - gap;

    left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
    if (top < 8) {
        top = rect.bottom + gap;
    }

    panel.classList.remove("is-measuring");
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
}

function PictureInPictureControl_hideMenu() {
    const panel = document.getElementById("ex-pip-menu-panel");
    if (panel) {
        panel.classList.remove("is-visible", "is-measuring");
    }
    pipMenuAnchorBtn = null;
}

function PictureInPictureControl_cancelHideMenu() {
    if (pipMenuHideTimer) {
        clearTimeout(pipMenuHideTimer);
        pipMenuHideTimer = null;
    }
}

function PictureInPictureControl_scheduleHideMenu() {
    PictureInPictureControl_cancelHideMenu();
    pipMenuHideTimer = setTimeout(() => {
        const panel = document.getElementById("ex-pip-menu-panel");
        if (!panel || !panel.classList.contains("is-visible")) {
            return;
        }
        if (panel.matches(":hover")) {
            return;
        }
        if (pipMenuAnchorBtn && pipMenuAnchorBtn.matches(":hover")) {
            return;
        }
        PictureInPictureControl_hideMenu();
    }, 180);
}

function PictureInPictureControl_suppressPipTooltipElement(el) {
    if (!el || el.dataset.exPipTooltipHidden === "1") {
        return;
    }
    el.dataset.exPipTooltipHidden = "1";
    el.style.setProperty("display", "none", "important");
}

function PictureInPictureControl_suppressNativeTooltip(btn) {
    if (btn) {
        const tipId = btn.getAttribute("aria-describedby");
        if (tipId) {
            const tip = document.getElementById(tipId);
            if (tip && (tip.textContent || "").trim() === "开启画中画") {
                PictureInPictureControl_suppressPipTooltipElement(tip);
                return;
            }
        }
    }
    document.querySelectorAll(".mantine-Tooltip-tooltip").forEach((el) => {
        if ((el.textContent || "").trim() === "开启画中画") {
            PictureInPictureControl_suppressPipTooltipElement(el);
        }
    });
}

function PictureInPictureControl_launchNative() {
    const btn = pipNativeTriggerBtn || PictureInPictureControl_findNativePipButton();
    if (btn) {
        btn.click();
        return;
    }
    const video = document.getElementById("__video2") || document.querySelector(".layout-Player-videoEntity video");
    if (video && typeof video.requestPictureInPicture === "function") {
        video.requestPictureInPicture().catch(() => {
            showMessage("【画中画】无法开启原版画中画", "error");
        });
        return;
    }
    showMessage("【画中画】未找到原版画中画按钮", "error");
}

function PictureInPictureControl_launchEnhanced() {
    const video = document.getElementById("__video2");
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


function PictureInPictureControl_closePipWebSocket() {
    if (!pip_ws_instance) {
        return;
    }
    const ws = pip_ws_instance;
    pip_ws_instance = null;
    ws.msgHandler = () => { };
    try {
        ws.close();
    } catch (e) { }
}

async function PictureInPictureControl_handle() {
    const video = document.getElementById('__video2');

    PictureInPictureControl_closePipWebSocket();
    PictureInPictureControl_clearWsDedup();
    window.__pip_track_state__ = [];

    const pipWindow = await documentPictureInPicture.requestWindow({
        width: 670,
        height: 380,
        disallowReturnToOpener: true,
        preferInitialWindowPlacement: true
    });

    pipWindow.document.body.innerHTML = PictureInPictureControl_getTemplate();
    window.__pip_window__ = pipWindow;

    const pipVideo = pipWindow.document.getElementById("pip-video");
    const danmakuLayer = pipWindow.document.getElementById("danmaku");
    const mainView = pipWindow.document.getElementById("main-view");
    const inputPanel = pipWindow.document.getElementById("input-panel");
    const setBtn = pipWindow.document.getElementById("pip-set");
    const sendBtn = pipWindow.document.getElementById("pip-send");
    const dmToggleBtn = pipWindow.document.getElementById("pip-danmaku-toggle");
    const toast = pipWindow.document.getElementById("pip-toast");

    PictureInPictureControl_applyDanmakuStyle(pipWindow);
    PictureInPictureControl_initPipUiText(pipWindow);

    PictureInPictureControl_toggleMainVideoVisibility(true);

    if (pipConfig.lowPowerMode !== false) {
        PictureInPictureControl_toggleSourcePagePower(true);
    }

    pipVideo.srcObject = video.captureStream();
    await pipVideo.play().catch(() => { });

    if (dmToggleBtn) {
        dmToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            pipConfig.danmakuVisible = pipConfig.danmakuVisible === false;
            localStorage.setItem("ExSave_PipSet", JSON.stringify(pipConfig));
            PictureInPictureControl_applyDanmakuStyle(pipWindow);
            PictureInPictureControl_updateDanmakuToggleBtn(pipWindow);
        });
    }

    setBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        PictureInPictureControl_openSettingPanel();
        toast.innerText = "已在斗鱼直播页面打开设置面板";
        toast.classList.add("show");
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove("show"), 5000);
    });

    sendBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (inputPanel.classList.contains("active")) {
            inputPanel.classList.remove("active");
        } else {
            PictureInPictureControl_openPipInputPanel(pipWindow);
        }
    });

    const onPipKeydown = (e) => {
        if (e.key !== "Enter") {
            return;
        }
        const inputField = pipWindow.document.getElementById("pip-input-field");
        if (pipWindow.document.activeElement === inputField) {
            return;
        }
        e.preventDefault();
        PictureInPictureControl_openPipInputPanel(pipWindow);
    };
    pipWindow.document.addEventListener("keydown", onPipKeydown);
    pipWindow.__pip_keydown_handler__ = onPipKeydown;

    mainView.addEventListener("click", () => {
        if (inputPanel.classList.contains("active")) {
            inputPanel.classList.remove("active");
        }
    });

    PictureInPictureControl_bindSendEvents(pipWindow, danmakuLayer);
    PictureInPictureControl_bindVideoSync(video, pipVideo);
    PictureInPictureControl_startComboCleaner();

    pip_ws_instance = new Ex_WebSocket_UnLogin(rid, (ret) => {
        if (!window.__pip_is_active__) {
            return;
        }
        if (PictureInPictureControl_isDuplicateWsPacket(ret)) {
            return;
        }
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
        window.__pip_window__ = null;

        if (pipWindow.__pip_keydown_handler__) {
            pipWindow.document.removeEventListener("keydown", pipWindow.__pip_keydown_handler__);
            pipWindow.__pip_keydown_handler__ = null;
        }

        PictureInPictureControl_toggleSourcePagePower(false);
        
        PictureInPictureControl_toggleMainVideoVisibility(false);

        PictureInPictureControl_closePipWebSocket();
        PictureInPictureControl_clearWsDedup();
        window.__pip_track_state__ = [];
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