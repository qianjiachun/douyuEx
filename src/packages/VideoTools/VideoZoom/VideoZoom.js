let videoScale = 1;
var VideoZoom_wheelHandler = null;
var VideoZoom_moveHandler = null;
var VideoZoom_upHandler = null;
var VideoZoom_drag = null;
function initPkg_VideoTools_VideoZoom() {
    let domWrap = getValidDom([".layout-Player-videoEntity", ".layout-Player-video"]);
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];

    let tx = 0;
    let ty = 0;

    if (!domWrap || !domVideoWrap) return;
    domVideoWrap.style.transformOrigin = "0 0";
    domVideoWrap.style.transition = "transform 0.1s";

    if (VideoZoom_wheelHandler) window.removeEventListener("wheel", VideoZoom_wheelHandler, true);
    VideoZoom_wheelHandler = (e) => {
        if (!e.ctrlKey) return;
        domWrap = domWrap || getValidDom([".layout-Player-videoEntity", ".layout-Player-video"]);
        domVideoWrap = domVideoWrap || document.getElementsByClassName("layout-Player-videoEntity")[0];
        if (!domWrap || !domVideoWrap) return;
        const r = domWrap.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        let px = e.clientX - r.left;
        let py = e.clientY - r.top;
        let nextScale = videoScale + (e.deltaY < 0 ? 0.1 : -0.1);
        if (nextScale < 0.1) nextScale = 0.1;
        let wx = (px - tx) / videoScale;
        let wy = (py - ty) / videoScale;
        tx = px - wx * nextScale;
        ty = py - wy * nextScale;
        videoScale = nextScale;
        if (videoScale < 0.1) videoScale = 0.1;
        domVideoWrap.style.transform = `translate(${tx}px, ${ty}px) scale(${videoScale})`;
    };
    window.addEventListener("wheel", VideoZoom_wheelHandler, { capture: true, passive: false });

    if (VideoZoom_moveHandler) window.removeEventListener("mousemove", VideoZoom_moveHandler, true);
    if (VideoZoom_upHandler) window.removeEventListener("mouseup", VideoZoom_upHandler, true);
    window.addEventListener("mousedown", (e) => {
        if (!e.ctrlKey || e.button !== 0) return;
        const r = domWrap.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
        e.preventDefault();
        domVideoWrap.style.transition = "none";
        VideoZoom_drag = { x: e.clientX, y: e.clientY, tx, ty };
    }, true);

    VideoZoom_moveHandler = (e) => {
        if (!VideoZoom_drag) return;
        tx = VideoZoom_drag.tx + (e.clientX - VideoZoom_drag.x);
        ty = VideoZoom_drag.ty + (e.clientY - VideoZoom_drag.y);
        domVideoWrap.style.transform = `translate(${tx}px, ${ty}px) scale(${videoScale})`;
    };
    VideoZoom_upHandler = () => {
        if (!VideoZoom_drag) return;
        VideoZoom_drag = null;
        domVideoWrap.style.transition = "transform 0.1s";
    };
    window.addEventListener("mousemove", VideoZoom_moveHandler, true);
    window.addEventListener("mouseup", VideoZoom_upHandler, true);
}

