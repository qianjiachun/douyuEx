let icon_pipcontrol = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAApElEQVR4AexTAQ6AIAisftJP6if9rKfUU/qJkds5RppsYbOWoyg4OUHomsLrQwTOucXZrRmV5yUaYDTQE2JwAm9rby4fhL1OBMxn8vkTZMv4vhKhCZFafRnQsGsmPjrJyCqnNROfnuRcdPhRa6nhh67vDnAyrX4+A+qSqMgTR0FklDiewSadiX8NbsXeQEDd0NOTFGwgwCWO/IeMwAcCGKx1cYIdAAD//3oahzQAAAAGSURBVAMAxtKrMXdkXvIAAAAASUVORK5CYII="/>`;
let pip_ws_instance = null;

const danmakuTracks = [];
const DANMAKU_HEIGHT = 28;

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

    let b = getValidDom([".right-e7ea5d", ".right-17e251"]);
    b.insertBefore(a, b.childNodes[0]);
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

        PictureInPictureControl_handle();
    });
}

// 主逻辑
async function PictureInPictureControl_handle() {

    const video = document.getElementById('__video2');

    if (pip_ws_instance) {
        try { pip_ws_instance.close(); } catch (e) { }
        pip_ws_instance = null;
    }

    video.style.visibility = "hidden";

    // 创建PIP窗口
    const pipWindow = await documentPictureInPicture.requestWindow({
        width: 960,
        height: 540,
        disallowReturnToOpener: true
    });

    pipWindow.document.body.innerHTML = `
        <style>
            html,body{
                margin:0;
                width:100%;
                height:100%;
                overflow:hidden;
                background:black;
            }

            #wrap{
                position:relative;
                width:100%;
                height:100%;
            }

            video{
                width:100%;
                height:100%;
                object-fit:contain;
            }

            #danmaku{
                position:absolute;
                inset:0;
                pointer-events:none;
                overflow:hidden;
            }

            .dm{
                position:absolute;
                white-space:nowrap;
                will-change:transform;
                font-size:16px;
                text-shadow: 1px 1px 2px #000, 1px 1px 2px #000, 1px 1px 1px rgba(0, 0, 0, 0.5);
            }
        </style>

        <div id="wrap">
            <video id="pip-video" autoplay muted playsinline></video>
            <div id="danmaku"></div>
        </div>
    `;

    const pipVideo = pipWindow.document.getElementById("pip-video");
    const danmakuLayer = pipWindow.document.getElementById("danmaku");

    pipVideo.srcObject = video.captureStream();
    await pipVideo.play().catch(() => { });

    PictureInPictureControl_bindVideoSync(video, pipVideo);

    pip_ws_instance = new Ex_WebSocket_UnLogin(rid, (ret) => {
        const msg = PictureInPictureControl_parseWSMsg(ret);
        PictureInPictureControl_renderDanmaku(msg, pipWindow, danmakuLayer);
    });

    PictureInPictureControl_bindCleanup(video, pipWindow, pipVideo);
}

// WS解析
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
        color: obj.col ? parseInt(obj.col) : 0
    };
}

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

// 轨道系统
function PictureInPictureControl_getTrack(pipHeight) {

    const maxTracks = Math.floor(pipHeight / DANMAKU_HEIGHT);

    for (let i = 0; i < danmakuTracks.length; i++) {
        if (!danmakuTracks[i]) {
            danmakuTracks[i] = true;
            return i;
        }
    }

    if (danmakuTracks.length < maxTracks) {
        const index = danmakuTracks.length;
        danmakuTracks.push(true);
        return index;
    }

    return 0;
}

function PictureInPictureControl_releaseTrack(index) {
    danmakuTracks[index] = false;
}

// 弹幕渲染
function PictureInPictureControl_renderDanmaku(msg, pipWindow, danmakuLayer) {

    if (!msg || !msg.text) return;

    const el = document.createElement("div");
    el.className = "dm";
    el.innerText = msg.text;

    const w = pipWindow.innerWidth;
    const h = pipWindow.innerHeight;

    const track = PictureInPictureControl_getTrack(h);
    const y = track * DANMAKU_HEIGHT;

    let x = w;

    el.style.top = y + "px";
    el.style.transform = `translateX(${x}px)`;
    el.style.color = PictureInPictureControl_getDanmakuColor(msg.color);

    danmakuLayer.appendChild(el);

    const speed = 2.5;

    requestAnimationFrame(() => {

        function move() {
            x -= speed;
            el.style.transform = `translateX(${x}px)`;

            const width = el.offsetWidth;

            if (x < -width) {
                el.remove();
                PictureInPictureControl_releaseTrack(track);
                return;
            }

            requestAnimationFrame(move);
        }

        move();
    });
}

// 视频同步
function PictureInPictureControl_bindVideoSync(video, pipVideo) {

    function syncVideo() {
        if (video.paused) pipVideo.pause();
        else pipVideo.play().catch(() => { });
    }

    video.addEventListener("play", syncVideo);
    video.addEventListener("pause", syncVideo);
}

// 关闭PIP清理资源
function PictureInPictureControl_bindCleanup(video, pipWindow, pipVideo) {

    function cleanup() {

        video.style.visibility = "";

        if (pip_ws_instance) {
            try { pip_ws_instance.close(); } catch (e) { }
            pip_ws_instance = null;
        }

        video.removeEventListener("play", syncVideo);
        video.removeEventListener("pause", syncVideo);

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