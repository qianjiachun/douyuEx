import { getValidDom } from "../../../common.js";

let videoScale = 1;
let videoZoomTx = 0;
let videoZoomTy = 0;
var VideoZoom_wheelHandler = null;
var VideoZoom_moveHandler = null;
var VideoZoom_upHandler = null;
var VideoZoom_drag = null;

export function getVideoToolsVideoScale() {
    return videoScale;
}

export function setVideoToolsVideoScale(value) {
    videoScale = Number.isFinite(value) ? Math.max(0.1, value) : 1;
}

export function resetVideoToolsVideoZoomState() {
    videoScale = 1;
    videoZoomTx = 0;
    videoZoomTy = 0;
    const domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];
    if (!domVideoWrap) return;
    domVideoWrap.style.transform = "";
    domVideoWrap.style.transformOrigin = "";
}

export function initPkg_VideoTools_VideoZoom() {
    let domWrap = getValidDom([".layout-Player-videoEntity", ".layout-Player-video"]);
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];

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
        let wx = (px - videoZoomTx) / videoScale;
        let wy = (py - videoZoomTy) / videoScale;
        videoZoomTx = px - wx * nextScale;
        videoZoomTy = py - wy * nextScale;
        setVideoToolsVideoScale(nextScale);
        domVideoWrap.style.transform = `translate(${videoZoomTx}px, ${videoZoomTy}px) scale(${videoScale})`;
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
        VideoZoom_drag = { x: e.clientX, y: e.clientY, tx: videoZoomTx, ty: videoZoomTy };
    }, true);

    VideoZoom_moveHandler = (e) => {
        if (!VideoZoom_drag) return;
        videoZoomTx = VideoZoom_drag.tx + (e.clientX - VideoZoom_drag.x);
        videoZoomTy = VideoZoom_drag.ty + (e.clientY - VideoZoom_drag.y);
        domVideoWrap.style.transform = `translate(${videoZoomTx}px, ${videoZoomTy}px) scale(${videoScale})`;
    };
    VideoZoom_upHandler = () => {
        if (!VideoZoom_drag) return;
        VideoZoom_drag = null;
        domVideoWrap.style.transition = "transform 0.1s";
    };
    window.addEventListener("mousemove", VideoZoom_moveHandler, true);
    window.addEventListener("mouseup", VideoZoom_upHandler, true);
}

