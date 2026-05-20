// 弹幕渲染、轨道计算与高能合并

const danmakuTracks = [];
const comboMap = new Map();
let comboCleanerTimer = null;

// 解析斗鱼原始 WebSocket 弹幕文本协议数据
function PictureInPictureControl_parseWSMsg(ret) {
    if (!ret || !ret.startsWith("type@=chatmsg/")) return null;

    const obj = {};
    const parts = ret.split("/");

    for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const idx = p.indexOf("@=");
        if (idx === -1) continue;
        obj[p.substring(0, idx)] = p.substring(idx + 2);
    }

    const txt = obj.txt ? decodeURIComponent(obj.txt) : "";
    if (!txt) return null;

    return {
        text: txt,
        color: obj.col ? parseInt(obj.col) : 0,
        uid: obj.uid || "",
    };
}

// 将斗鱼弹幕协议中的颜色代码转换为 CSS 可识别的十六进制颜色值
function PictureInPictureControl_getDanmakuColor(col) {
    switch (col) {
        case 1: return "#ff3b30";
        case 2: return "#0a84ff";
        case 3: return "#34c759";
        case 4: return "#ff9500";
        case 5: return "#af52de";
        case 6: return "#ff2d55";
        default: return "#ffffff";
    }
}

// 基于防碰撞与追赶算法，计算并分配当前弹幕应该渲染的防重叠最佳轨道索引
function PictureInPictureControl_getTrack(pipWindow, textWidth) {
    let maxTracks = Math.floor(pipWindow.innerHeight / pipConfig.trackHeight);
    if (pipConfig.area === "half") {
        maxTracks = Math.floor(maxTracks / 2);
    } else if (pipConfig.area === "quarter") {
        maxTracks = Math.floor(maxTracks / 4);
    }
    maxTracks = Math.max(1, maxTracks);

    if (!window.__pip_track_state__) {
        window.__pip_track_state__ = [];
    }

    const state = window.__pip_track_state__;
    const screenWidth = pipWindow.innerWidth;
    const baseDuration = 15 / pipConfig.speed;
    const duration = Math.max(baseDuration * 0.7, Math.min(baseDuration * 1.4, baseDuration + (textWidth / 120) / pipConfig.speed));
    const currentSpeed = (screenWidth + textWidth) / duration;

    let bestTrack = -1;

    for (let i = 0; i < maxTracks; i++) {
        const lastDanmaku = state[i];

        if (!lastDanmaku) {
            state[i] = { textWidth, speed: currentSpeed, startTime: Date.now(), duration: duration * 1000 };
            return i;
        }

        const elapsed = Date.now() - lastDanmaku.startTime;
        
        if (elapsed >= lastDanmaku.duration) {
            state[i] = { textWidth, speed: currentSpeed, startTime: Date.now(), duration: duration * 1000 };
            return i;
        }

        const lastDistance = lastDanmaku.speed * (elapsed / 1000);
        const lastHeadX = screenWidth - lastDistance; 
        const lastTailX = lastHeadX + lastDanmaku.textWidth;
        const safeGap = 16;

        if (lastTailX > screenWidth - safeGap) {
            continue;
        }

        if (currentSpeed > lastDanmaku.speed) {
            const timeLeftForLast = lastDanmaku.duration - elapsed;
            const catchUpTime = lastHeadX / (currentSpeed - lastDanmaku.speed);
            
            if (catchUpTime * 1000 < timeLeftForLast) {
                continue;
            }
        }

        bestTrack = i;
        break;
    }

    if (bestTrack === -1) {
        let minTailX = Infinity;
        for (let i = 0; i < maxTracks; i++) {
            const ld = state[i];
            if (!ld) { bestTrack = i; break; }
            const elapsed = Date.now() - ld.startTime;
            const lastTailX = (screenWidth - ld.speed * (elapsed / 1000)) + ld.textWidth;
            if (lastTailX < minTailX) {
                minTailX = lastTailX;
                bestTrack = i;
            }
        }
    }

    state[bestTrack] = {
        textWidth,
        speed: currentSpeed,
        startTime: Date.now(),
        duration: duration * 1000
    };

    return bestTrack;
}


// 模糊字符串匹配查找算法，用于对高能刷屏弹幕进行归类去重
function PictureInPictureControl_findMatchKey(text) {
    if (comboMap.has(text)) return text;
    
    const getCleanKey = (str) => {
        return str.replace(/\s+/g, "").split("").filter((v, i, a) => a.indexOf(v) === i).join("");
    };

    const currentClean = getCleanKey(text);
    if (!currentClean) return text;

    for (const existingKey of comboMap.keys()) {
        const existingClean = getCleanKey(existingKey);
        
        if (currentClean === existingClean) {
            if (Math.abs(text.length - existingKey.length) <= 6) {
                return existingKey;
            }
        }
        if (text.includes(existingKey) || existingKey.includes(text)) {
            if (Math.abs(text.length - existingKey.length) <= 4) {
                return existingKey;
            }
        }
    }
    return text;
}

// 轮询监控清理器
function PictureInPictureControl_startComboCleaner() {
    if (comboCleanerTimer) clearInterval(comboCleanerTimer);

    comboCleanerTimer = setInterval(() => {
        const now = Date.now();
        for (const [key, info] of comboMap.entries()) {
            const recentCount = info.timestamps.filter(t => now - t <= 8000).length;

            if (recentCount < 10) {
                if (info.dom) {
                    info.dom.remove();
                    info.dom = null;
                }
                comboMap.delete(key);
            }
        }
    }, 1000);
}


// 核心决策方法：判定弹幕进入高能合并展示状态还是走普通轨道飘屏渲染
function PictureInPictureControl_handleComboAndRender(msg, pipWindow, danmakuLayer) {
    if (!msg || !msg.text) return;

    if (my_uid && msg.uid === my_uid) {
        return;
    }

    const currentMode = pipConfig.mergeMode || "combo";

    // 全部显示模式
    if (currentMode === "all") {
        PictureInPictureControl_renderDanmaku(msg, pipWindow, danmakuLayer);
        return;
    }

    const now = Date.now();
    const matchedKey = PictureInPictureControl_findMatchKey(msg.text);

    if (!comboMap.has(matchedKey)) {
        comboMap.set(matchedKey, { timestamps: [], dom: null, displayCount: 0 });
    }

    const info = comboMap.get(matchedKey);
    info.timestamps.push(now);

    // 只显示一条模式
    if (currentMode === "single") {
        const singleFrequency = info.timestamps.filter(t => now - t <= 4000).length; // 独立保持 4 秒冷却
        if (singleFrequency > 1) {
            return;
        }
        PictureInPictureControl_renderDanmaku(msg, pipWindow, danmakuLayer);
        return;
    }

    // 合并显示模式
    info.timestamps = info.timestamps.filter(t => now - t <= 8000);
    const recentFrequency = info.timestamps.length;

    if (recentFrequency >= 10) {
        if (info.displayCount === 0) {
            info.displayCount = Math.max(10, recentFrequency);
        } else {
            info.displayCount += 1;
        }

        const container = pipWindow.document.getElementById("combo-container");
        if (container) {
            if (!info.dom) {
                info.dom = pipWindow.document.createElement("div");
                info.dom.className = "combo-item";
                container.appendChild(info.dom);
            }
            info.dom.innerHTML = `${matchedKey} <span class="combo-count">X ${info.displayCount}</span>`;
        }
    } else {
        if (info.dom) {
            info.dom.remove();
            info.dom = null;
            info.displayCount = 0; 
        }
        PictureInPictureControl_renderDanmaku(msg, pipWindow, danmakuLayer);
    }
}

// 执行单条普通弹幕（或个人弹幕）在画中画独立图层上的 CSS 动画渲染与销毁
function PictureInPictureControl_renderDanmaku(msg, pipWindow, danmakuLayer, isSelf = false) {
    if (!msg || !msg.text) return;

    const el = pipWindow.document.createElement("div");
    el.className = "dm" + (isSelf ? " dm-self" : "");
    el.innerText = msg.text;

    el.style.fontSize = pipConfig.fontSize + "px";
    el.style.color = isSelf ? "#00ff66" : PictureInPictureControl_getDanmakuColor(msg.color);
    
    if (!isSelf) {
        el.style.textShadow = "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000";
    }
    
    el.style.visibility = "hidden";
    danmakuLayer.appendChild(el);
    const textWidth = el.offsetWidth;

    const screenWidth = pipWindow.innerWidth;
    const track = PictureInPictureControl_getTrack(pipWindow, textWidth);
    const y = track * pipConfig.trackHeight;

    const currentTrackState = window.__pip_track_state__[track];
    const animDuration = currentTrackState.duration / 1000;

    el.style.top = y + "px";
    el.style.left = screenWidth + "px";
    el.style.visibility = "visible";

    const animationName = `exPipMove_${Math.random().toString(36).substring(2, 9)}`;
    const pipDoc = pipWindow.document;
    
    let styleSheet = pipDoc.getElementById("ex-danmaku-styles");
    if (!styleSheet) {
        styleSheet = pipDoc.createElement("style");
        styleSheet.id = "ex-danmaku-styles";
        pipDoc.head.appendChild(styleSheet);
    }

    styleSheet.sheet.insertRule(`
        @keyframes ${animationName} {
            from { transform: translateX(0); }
            to { transform: translateX(-${screenWidth + textWidth + 30}px); }
        }
    `, 0);

    el.style.animation = `${animationName} ${animDuration}s linear forwards`;

    el.addEventListener("animationend", () => {
        el.remove();
        try {
            const sheet = styleSheet.sheet;
            for (let i = 0; i < sheet.cssRules.length; i++) {
                if (sheet.cssRules[i].name === animationName) {
                    sheet.deleteRule(i);
                    break;
                }
            }
        } catch (e) {}
    });
}