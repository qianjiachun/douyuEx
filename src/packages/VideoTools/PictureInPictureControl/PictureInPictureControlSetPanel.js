// 独立管理和渲染画中画增强功能的参数设置面板
function PictureInPictureControl_openSettingPanel() {

    let panel = document.getElementById("pip-setting-panel");

    const defaultConfigs = {
        fontSize: 18,
        speed: 2.5,
        area: "full",
        trackHeight: 28,
        mergeMode: "combo",
        lowPowerMode: false
    };

    // 统一刷新面板 UI 显示的辅助函数
    const refreshPanelUI = () => {
        document.getElementById("pip-area").value = pipConfig.area;
        document.getElementById("pip-mergemode").value = pipConfig.mergeMode || "combo";
        document.getElementById("pip-lowpowermode").value = pipConfig.lowPowerMode !== false ? "on" : "off";
        
        document.getElementById("pip-fontsize").value = pipConfig.fontSize;
        document.getElementById("pip-fontsize-value").innerText = pipConfig.fontSize;

        document.getElementById("pip-trackheight").value = pipConfig.trackHeight || 28;
        document.getElementById("pip-trackheight-value").innerText = pipConfig.trackHeight || 28;

        document.getElementById("pip-speed").value = pipConfig.speed;
        document.getElementById("pip-speed-value").innerText = pipConfig.speed;
    };

    if (panel) {
        panel.style.display = "block";
        refreshPanelUI();
        return;
    }

    panel = document.createElement("div");
    panel.id = "pip-setting-panel";

    panel.innerHTML = `
        <div class="pip-setting-title">画中画弹幕设置</div>

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
                <span>原网页低功耗</span>
                <select id="pip-lowpowermode">
                    <option value="on">开启</option>
                    <option value="off">关闭</option>
                </select>
            </div>
            <div class="pip-setting-tip">开启后，拉起画中画时将切断并隐藏原网页的视频、礼物与网页弹幕，大幅压低 CPU 占用</div>
        </div>

        <div class="pip-footer-row">
            <span class="pip-setting-reset">恢复默认</span>
            <div class="pip-setting-close">完成</div>
        </div>
    `;

    // 避免重复追加相同的 <style> 标签
    if (!document.getElementById("pip-setting-style")) {
        const style = document.createElement("style");
        style.id = "pip-setting-style";
        style.innerHTML = `
            #pip-setting-panel {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
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

            .pip-setting-title {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 24px;
                color: #000000;
                text-align: center;
                letter-spacing: 0.5px;
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

            .pip-footer-row {
                margin-top: 28px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .pip-setting-reset {
                font-size: 13px;
                color: #71717a;
                cursor: pointer;
                transition: color 0.2s;
                text-decoration: underline;
                user-select: none;
                font-weight: 500;
            }

            .pip-setting-reset:hover {
                color: #ff5d23;
            }

            .pip-setting-close {
                background: #ff5d23;
                color: #fff;
                text-align: center;
                padding: 8px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                transition: background 0.2s, transform 0.1s;
                box-shadow: 0 4px 12px rgba(255, 93, 35, 0.15);
            }

            .pip-setting-close:hover {
                background: #e04e1b;
            }

            .pip-setting-close:active {
                transform: scale(0.98);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(panel);

    const font = document.getElementById("pip-fontsize");
    const track = document.getElementById("pip-trackheight");
    const speed = document.getElementById("pip-speed");
    const area = document.getElementById("pip-area");
    const merge = document.getElementById("pip-mergemode");
    const lowPower = document.getElementById("pip-lowpowermode");

    // 初始化载入值
    area.value = pipConfig.area;
    merge.value = pipConfig.mergeMode || "combo";
    lowPower.value = pipConfig.lowPowerMode !== false ? "on" : "off";

    const save = () => {
        localStorage.setItem("ExSave_PipSet", JSON.stringify(pipConfig));
    };

    // 事件流绑定
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

    area.addEventListener("change", () => {
        pipConfig.area = area.value;
        save();
    });

    merge.addEventListener("change", () => {
        pipConfig.mergeMode = merge.value;
        save();
    });

    lowPower.addEventListener("change", () => {
        pipConfig.lowPowerMode = lowPower.value === "on";
        save();
        if (window.__pip_is_active__) {
            PictureInPictureControl_toggleSourcePagePower(pipConfig.lowPowerMode);
        }
    });

    panel.querySelector(".pip-setting-reset").addEventListener("click", () => {
        if (confirm("确定要将画中画设置恢复为默认配置吗？")) {
            Object.assign(pipConfig, defaultConfigs);
            save();
            refreshPanelUI();
            
            if (window.__pip_is_active__) {
                PictureInPictureControl_toggleSourcePagePower(pipConfig.lowPowerMode);
            }
        }
    });

    panel.querySelector(".pip-setting-close").addEventListener("click", () => {
        panel.style.display = "none";
    });
}