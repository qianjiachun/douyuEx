function initPkg_VideoTools_Camera() {
    camera_anchorName = getValidDom([".Title-anchorName", ".anchorName__6NXv9"]).innerText;
    camera_width = liveVideoNode.videoWidth * 0.25;
    camera_height = liveVideoNode.videoHeight * 0.25;
    camera_canvas = document.createElement("canvas");
    camera_canvas.width = camera_width;
    camera_canvas.height = camera_height;

    camera_canvas_img = document.createElement("canvas");
    camera_canvas_img.width = liveVideoNode.videoWidth;
    camera_canvas_img.height = liveVideoNode.videoHeight;

    initPkg_VideoTools_Camera_Dom();
    initPkg_VideoTools_Camera_Func();
}

function initPkg_VideoTools_Camera_Dom() {
    Camera_insertIcon();
}

function Camera_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-camera";
    a.title = "单击截图 长按录制gif"
    a.innerHTML = `
    <svg t="1620266708389" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2080" width="38" height="38"><path d="M512 337.371136c-119.543808 0-216.800256 97.255424-216.800256 216.798208 0 119.543808 97.256448 216.800256 216.800256 216.800256s216.800256-97.256448 216.800256-216.800256C728.800256 434.625536 631.543808 337.371136 512 337.371136zM680.479744 554.16832c0 92.911616-75.579392 168.501248-168.479744 168.501248-92.900352 0-168.480768-75.589632-168.480768-168.501248 0-92.923904 75.579392-168.521728 168.480768-168.521728C604.899328 385.646592 680.479744 461.24544 680.479744 554.16832z" p-id="2081" fill="#ffffff"></path><path d="M831.209472 337.349632l-47.167488 0c-13.647872 0-24.751104 11.083776-24.751104 24.707072 0 13.635584 11.103232 24.7296 24.751104 24.7296l47.167488 0c13.646848 0 24.75008-11.094016 24.75008-24.7296C855.959552 348.433408 844.85632 337.349632 831.209472 337.349632z" p-id="2082" fill="#ffffff"></path><path d="M700.505088 171.497472c4.235264 0 6.403072 0.405504 7.232512 0.612352 1.47968 1.514496 4.790272 6.218752 11.717632 20.685824 2.83648 5.910528 8.6272 18.86208 15.888384 35.533824l11.788288 27.063296 29.518848 0 96.535552 0c35.122176 0 63.695872 28.535808 63.695872 63.609856l0 469.933056c0 35.05152-28.573696 63.567872-63.695872 63.567872L150.811648 852.503552c-35.121152 0-63.694848-28.516352-63.694848-63.567872L87.1168 319.0016c0-35.062784 28.573696-63.589376 63.694848-63.589376l99.35872 0 29.110272 0 11.964416-26.537984c4.698112-10.421248 8.416256-19.063808 11.058176-25.70752 9.86112-24.829952 15.207424-30.125056 16.239616-30.974976 0.52736-0.161792 2.64192-0.695296 7.673856-0.695296L700.505088 171.496448M700.505088 126.441472 326.216704 126.441472c-32.519168 0-47.275008 13.479936-65.787904 60.096512-3.180544 7.999488-7.689216 18.122752-10.257408 23.819264l-99.35872 0c-59.96544 0-108.750848 48.738304-108.750848 108.645376l0 469.933056c0 59.894784 48.785408 108.623872 108.750848 108.623872l722.37568 0c59.96544 0 108.751872-48.729088 108.751872-108.623872L981.940224 319.0016c0-59.91936-48.786432-108.665856-108.751872-108.665856l-96.535552 0c-4.458496-10.236928-12.420096-28.372992-16.574464-37.031936C744.823808 141.448192 733.973504 126.441472 700.505088 126.441472L700.505088 126.441472z" p-id="2083" fill="#ffffff"></path></svg>
    <div id="ex-camera-close">×</div>
    `;
    let b = document.getElementById("js-player-dialog");
    b.insertBefore(a, b.childNodes[0]);
}

function Camera_isHidden() {
    let saved = localStorage.getItem("ExSave_Camera_Hidden");
    if (!saved) return false;
    let time = parseInt(saved);
    return Date.now() < time;
}

function initPkg_VideoTools_Camera_Func() {
    let dom = getValidDom([".layout-Player-video", ".layout-Player-videoEntity"]);
    let dom_video = document.getElementsByClassName("room-Player-Box")[0];
    let camera = document.getElementById("ex-camera");
    let closeBtn = document.getElementById("ex-camera-close");
    let gif = null;
    let timer = 0;
    let downTime = 0;
    let imgBase64;
    let timer_timeout = 0;
    let isClosed = false;
    
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("是否7天内不再显示？")) {
            localStorage.setItem("ExSave_Camera_Hidden", Date.now() + 7 * 24 * 60 * 60 * 1000);
        } else {
            isClosed = true;
        }
        camera.style.display = "none";
    });
    
    if (Camera_isHidden()) return;
    
    dom.addEventListener("mouseenter", () => {
        if (isClosed || Camera_isHidden()) return;
        camera.style.display = "flex";
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    dom_video.addEventListener("mousemove", () => {
        if (isClosed || Camera_isHidden()) return;
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
        timer_timeout = setTimeout(() => {
            camera.style.display = "none";
        }, 2000);
    })
    camera.addEventListener("mouseenter", () => {
        if (isClosed || Camera_isHidden()) return;
        camera.style.display = "flex";
        clearTimeout(timer_timeout);
    })
    dom.addEventListener("mouseleave", () => {
        camera.style.display = "none";
    })
    camera.addEventListener("mousedown", (e) => {
        if (e.target.id === "ex-camera-close") return;
        downTime = new Date().getTime();
        // 动态获取当前视频的真实分辨率
        camera_canvas_img.width = liveVideoNode.videoWidth;
        camera_canvas_img.height = liveVideoNode.videoHeight;
        camera_canvas_img.getContext('2d').drawImage(liveVideoNode, 0, 0, camera_canvas_img.width, camera_canvas_img.height);
        imgBase64 = camera_canvas_img.toDataURL("image/png");

        gif = new GIF({
            workers: 5,
            quality: 3,
            width: camera_width,
            height: camera_height,
            workerScript: gifworkerBlob
        });;
        cameraAddFrame(liveVideoNode, camera_canvas, gif, camera_fps);
        timer = setInterval(() => {cameraAddFrame(liveVideoNode, camera_canvas, gif, camera_fps)}, camera_fps);
    })
    camera.addEventListener("mouseup", (e) => {
        if (e.target.id === "ex-camera-close") return;
        let upTime = new Date().getTime();
        clearInterval(timer);
        if (upTime - downTime >= 800) {
            showMessage("【录制】正在生成gif...", "info");
            gif.on('finished', blob => {
                let el = document.createElement('a');
                el.href = URL.createObjectURL(blob);
                el.download = `【${camera_anchorName}】${dateFormat("yyyy-MM-dd hh-mm-ss",new Date())}`;
                document.body.appendChild(el);
                let evt = document.createEvent("MouseEvents");
                evt.initEvent("click", false, false);
                el.dispatchEvent(evt);
                document.body.removeChild(el);
            });
            gif.render();
        } else {
            let el = document.createElement("a");
            el.download = `【${camera_anchorName}】${dateFormat("yyyy-MM-dd hh-mm-ss",new Date())}`;
            el.href = imgBase64;
            document.body.appendChild(el);
            let evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            el.dispatchEvent(evt);
            document.body.removeChild(el);
        }

    })
}