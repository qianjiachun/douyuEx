// 独立管理和渲染画中画增强功能的参数设置面板
function PictureInPictureControl_openSettingPanel() {

    let panel = document.getElementById("pip-setting-panel");

    const defaultConfigs = {
        fontSize: 18,
        speed: 2.5,
        area: "full",
        trackHeight: 28,
        mergeMode: "combo",
        lowPowerMode: false,
        filterRobotDanmaku: true,
        opacity: 1,
        danmakuVisible: true,
    };

    const save = () => {
        localStorage.setItem("ExSave_PipSet", JSON.stringify(pipConfig));
    };

    // 统一刷新面板 UI 显示的辅助函数
    const refreshPanelUI = () => {
        document.getElementById("pip-area").value = pipConfig.area;
        document.getElementById("pip-mergemode").value = pipConfig.mergeMode || "combo";
        document.getElementById("pip-lowpowermode").value = pipConfig.lowPowerMode === true ? "on" : "off";
        document.getElementById("pip-filterrobot").value = pipConfig.filterRobotDanmaku !== false ? "on" : "off";
        document.getElementById("pip-tabswitch").value = isTabSwitchEnabled() ? "on" : "off";

        document.getElementById("pip-fontsize").value = pipConfig.fontSize;
        document.getElementById("pip-fontsize-value").innerText = pipConfig.fontSize;

        document.getElementById("pip-trackheight").value = pipConfig.trackHeight || 28;
        document.getElementById("pip-trackheight-value").innerText = pipConfig.trackHeight || 28;

        document.getElementById("pip-speed").value = pipConfig.speed;
        document.getElementById("pip-speed-value").innerText = pipConfig.speed;

        const opacityPct = Math.round((pipConfig.opacity != null ? pipConfig.opacity : 1) * 100);
        document.getElementById("pip-opacity").value = opacityPct;
        document.getElementById("pip-opacity-value").innerText = opacityPct + "%";
    };

    if (panel) {
        panel.style.display = "block";
        refreshPanelUI();
        return;
    }

    panel = document.createElement("div");
    panel.id = "pip-setting-panel";

    panel.innerHTML = `
        <div class="pip-setting-header">
            <div class="pip-setting-title">画中画弹幕设置</div>
            <div class="pip-setting-header-actions">
                <span class="pip-setting-reset">恢复默认</span>
                <button type="button" class="pip-setting-dismiss" aria-label="关闭">×</button>
            </div>
        </div>

        <div class="pip-setting-item">
            <span>弹幕字号</span>
            <input id="pip-fontsize" type="range" min="12" max="48" value="${pipConfig.fontSize}">
            <span id="pip-fontsize-value">${pipConfig.fontSize}</span>
        </div>

        <div class="pip-setting-item">
            <span>弹幕上下间距</span>
            <input id="pip-trackheight" type="range" min="14" max="60" value="${pipConfig.trackHeight || 28}">
            <span id="pip-trackheight-value">${pipConfig.trackHeight || 28}</span>
        </div>

        <div class="pip-setting-item">
            <span>弹幕速度</span>
            <input id="pip-speed" type="range" min="1" max="10" step="0.5" value="${pipConfig.speed}">
            <span id="pip-speed-value">${pipConfig.speed}</span>
        </div>

        <div class="pip-setting-item">
            <span>弹幕透明度</span>
            <input id="pip-opacity" type="range" min="30" max="100" value="${Math.round((pipConfig.opacity != null ? pipConfig.opacity : 1) * 100)}">
            <span id="pip-opacity-value">${Math.round((pipConfig.opacity != null ? pipConfig.opacity : 1) * 100)}%</span>
        </div>

        <div class="pip-setting-item">
            <span>弹幕显示区域</span>
            <select id="pip-area">
                <option value="full">全屏</option>
                <option value="half">1/2</option>
                <option value="quarter">1/4</option>
            </select>
        </div>

        <div class="pip-setting-item item-vertical">
            <div class="item-label-row">
                <span>重复弹幕合并</span>
                <select id="pip-mergemode">
                    <option value="all">全部显示</option>
                    <option value="single">只显示一条</option>
                    <option value="combo">合并显示（如X5）</option>
                </select>
            </div>
            <div class="pip-setting-tip">短时间内多条相同弹幕内容时的显示方式</div>
        </div>

        <div class="pip-setting-item item-vertical">
            <div class="item-label-row">
                <span>屏蔽机器人弹幕</span>
                <select id="pip-filterrobot">
                    <option value="on">开启</option>
                    <option value="off">关闭</option>
                </select>
            </div>
            <div class="pip-setting-tip">开启后过滤无用户标识的机器人弹幕</div>
        </div>

        <div class="pip-setting-item item-vertical">
            <div class="item-label-row">
                <span>原网页低功耗</span>
                <select id="pip-lowpowermode">
                    <option value="on">开启</option>
                    <option value="off">关闭</option>
                </select>
            </div>
            <div class="pip-setting-tip">开启后，拉起画中画时将隐藏原网页视频区、飘屏弹幕与礼物动画，保留右侧弹幕列表，以降低 CPU 占用</div>
        </div>

        <div class="pip-setting-item item-vertical">
            <div class="item-label-row">
                <span>页签防冻结</span>
                <select id="pip-tabswitch">
                    <option value="on">开启</option>
                    <option value="off">关闭</option>
                </select>
            </div>
            <div class="pip-setting-tip">与扩展工具「防页签冻结」共用设置；开启后画中画期间保持源页解码并自动缓解卡屏（关闭需刷新页面后完全生效）</div>
        </div>

    `;

    // 避免重复追加相同的 <style> 标签
    if (!document.getElementById("pip-setting-style")) {
        const style = document.createElement("style");
        style.id = "pip-setting-style";
        style.innerHTML = `
            #pip-setting-panel {
                position: fixed;
                width: 440px;
                background: rgba(255, 255, 255, 0.98);
                border: 1px solid rgba(212, 212, 216, 1);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
                border-radius: 12px;
                padding: 24px;
                z-index: 999999;
                font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", sans-serif;
                color: #18181b;
                box-sizing: border-box;
                backdrop-filter: blur(10px);
            }

            .pip-setting-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: -24px -24px 24px;
                padding: 24px 24px 0;
                cursor: move;
                user-select: none;
            }

            .pip-setting-title {
                flex: 1;
                min-width: 0;
                font-size: 16px;
                font-weight: 600;
                color: #000000;
                letter-spacing: 0.5px;
                margin: 0;
            }

            .pip-setting-header-actions {
                display: flex;
                align-items: center;
                gap: 12px;
                flex-shrink: 0;
            }

            .pip-setting-reset {
                font-size: 13px;
                color: #71717a;
                cursor: pointer;
                transition: color 0.2s;
                text-decoration: underline;
                user-select: none;
                font-weight: 500;
                white-space: nowrap;
            }

            .pip-setting-reset:hover {
                color: #ff5d23;
            }

            .pip-setting-dismiss {
                flex-shrink: 0;
                width: 28px;
                height: 28px;
                margin: 0;
                padding: 0;
                border: none;
                border-radius: 6px;
                background: transparent;
                color: #71717a;
                font-size: 22px;
                line-height: 1;
                cursor: pointer;
                user-select: none;
                transition: background 0.2s, color 0.2s;
            }

            .pip-setting-dismiss:hover {
                background: #f4f4f5;
                color: #18181b;
            }

            .pip-setting-item {
                margin-bottom: 18px;
                display: flex;
                align-items: center;
                font-size: 13px;
            }

            .pip-setting-item.item-vertical {
                margin-bottom: 20px;
                flex-direction: column;
                align-items: flex-start;
            }

            .item-label-row {
                width: 100%;
                display: flex;
                align-items: center;
            }

            .pip-setting-item span:first-child {
                width: 100px;
                color: #3f3f46;
                font-weight: 600;
            }

            .pip-setting-item input[type="range"] {
                flex: 1;
                margin: 0 14px;
                -webkit-appearance: none;
                background: #d4d4d8;
                height: 4px;
                border-radius: 2px;
                outline: none;
            }

            .pip-setting-item input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #ff5d23;
                cursor: pointer;
                transition: transform 0.1s;
            }

            .pip-setting-item input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }

            .pip-setting-item select {
                flex: 1;
                background: #f4f4f5;
                color: #18181b;
                padding: 6px 10px;
                border-radius: 6px;
                border: 1px solid #cdcdd6;
                outline: none;
                font-size: 13px;
                cursor: pointer;
                transition: border-color 0.2s, background 0.2s;
                font-weight: 500;
            }

            .pip-setting-item select:focus {
                border-color: #ff5d23;
                background: #ffffff;
            }

            .pip-setting-item span:last-child {
                width: 32px;
                text-align: right;
                color: #ff5d23;
                font-weight: bold;
                font-family: monospace;
            }

            .pip-setting-tip {
                font-size: 11px;
                color: #52525b;
                margin-top: 6px;
                margin-left: 100px;
                line-height: 1.4;
            }

        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(panel);

    const left = Math.max(8, (window.innerWidth - panel.offsetWidth) / 2);
    const top = Math.max(8, (window.innerHeight - panel.offsetHeight) / 2);
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;

    PictureInPictureControl_initSettingPanelDrag(panel);

    const font = document.getElementById("pip-fontsize");
    const track = document.getElementById("pip-trackheight");
    const speed = document.getElementById("pip-speed");
    const area = document.getElementById("pip-area");
    const merge = document.getElementById("pip-mergemode");
    const lowPower = document.getElementById("pip-lowpowermode");
    const filterRobot = document.getElementById("pip-filterrobot");
    const tabSwitch = document.getElementById("pip-tabswitch");
    const opacity = document.getElementById("pip-opacity");

    area.value = pipConfig.area;
    merge.value = pipConfig.mergeMode || "combo";
    lowPower.value = pipConfig.lowPowerMode === true ? "on" : "off";
    filterRobot.value = pipConfig.filterRobotDanmaku !== false ? "on" : "off";
    tabSwitch.value = isTabSwitchEnabled() ? "on" : "off";

    font.addEventListener("input", () => {
        pipConfig.fontSize = parseInt(font.value);
        document.getElementById("pip-fontsize-value").innerText = pipConfig.fontSize;
        save();
    });

    track.addEventListener("input", () => {
        pipConfig.trackHeight = parseInt(track.value);
        document.getElementById("pip-trackheight-value").innerText = pipConfig.trackHeight;
        save();
    });

    speed.addEventListener("input", () => {
        pipConfig.speed = parseFloat(speed.value);
        document.getElementById("pip-speed-value").innerText = pipConfig.speed;
        save();
    });

    opacity.addEventListener("input", () => {
        pipConfig.opacity = parseInt(opacity.value, 10) / 100;
        document.getElementById("pip-opacity-value").innerText = opacity.value + "%";
        save();
        if (window.__pip_is_active__) {
            PictureInPictureControl_applyDanmakuStyle();
        }
    });

    area.addEventListener("change", () => {
        pipConfig.area = area.value;
        save();
    });

    merge.addEventListener("change", () => {
        pipConfig.mergeMode = merge.value;
        save();
    });

    filterRobot.addEventListener("change", () => {
        pipConfig.filterRobotDanmaku = filterRobot.value === "on";
        save();
    });

    lowPower.addEventListener("change", () => {
        pipConfig.lowPowerMode = lowPower.value === "on";
        save();
        if (window.__pip_is_active__) {
            PictureInPictureControl_toggleSourcePagePower(pipConfig.lowPowerMode);
        }
    });

    tabSwitch.addEventListener("change", () => {
        const enabled = tabSwitch.value === "on";
        setTabSwitchEnabled(enabled);
        if (enabled) {
            enableTabSwitch();
        } else {
            showMessage("已关闭页签防冻结，请刷新页面后完全生效", "info");
        }
        if (window.__pip_is_active__) {
            const pipWin = window.__pip_window__;
            const pipVideo = pipWin?.document.getElementById("pip-video");
            const sourceVideo = pipWin?.__pip_source_video__;
            if (enabled) {
                PictureInPictureControl_startTabAntiFreeze(sourceVideo, pipWin, pipVideo);
            } else {
                PictureInPictureControl_stopTabAntiFreeze();
            }
        }
    });

    panel.querySelector(".pip-setting-reset").addEventListener("click", () => {
        if (confirm("确定要将画中画设置恢复为默认配置吗？")) {
            Object.assign(pipConfig, defaultConfigs);
            save();
            refreshPanelUI();

            if (window.__pip_is_active__) {
                PictureInPictureControl_toggleSourcePagePower(pipConfig.lowPowerMode);
                PictureInPictureControl_applyDanmakuStyle();
                PictureInPictureControl_updateDanmakuToggleBtn();
            }
        }
    });

    panel.querySelector(".pip-setting-dismiss").addEventListener("click", () => {
        panel.style.display = "none";
    });
}

function PictureInPictureControl_initSettingPanelDrag(panel) {
    const header = panel.querySelector(".pip-setting-header");
    if (!header) {
        return;
    }

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const onMouseMove = (e) => {
        if (!dragging) {
            return;
        }
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        panel.style.left = `${Math.max(0, startLeft + dx)}px`;
        panel.style.top = `${Math.max(0, startTop + dy)}px`;
    };

    const onMouseUp = () => {
        dragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    header.addEventListener("mousedown", (e) => {
        if (e.button !== 0 || e.target.closest(".pip-setting-dismiss, .pip-setting-reset")) {
            return;
        }
        dragging = true;
        const rect = panel.getBoundingClientRect();
        panel.style.left = `${rect.left}px`;
        panel.style.top = `${rect.top}px`;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        e.preventDefault();
    });
}
