let videoScale = 1;
var VideoZoom_down = null;
var VideoZoom_wheelHandler = null;
function initPkg_VideoTools_VideoZoom() {
    let domWrap = getValidDom([".layout-Player-videoEntity", ".layout-Player-video"]);
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];

    let x = 0;
    let y = 0;

    if (!domWrap || !domVideoWrap) return;
    domVideoWrap.style.transition = "all 0.1s";

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
        x = e.clientX - r.left;
        y = e.clientY - r.top;
        videoScale += e.deltaY < 0 ? 0.1 : -0.1;
        if (videoScale < 0.1) videoScale = 0.1;
        domVideoWrap.style.transform = `scale(${videoScale})`;
        domVideoWrap.style.transformOrigin = `${x}px ${y}px`;
    };
    window.addEventListener("wheel", VideoZoom_wheelHandler, { capture: true, passive: false });

    document.addEventListener("mousedown", (e) => {
        if (!e.ctrlKey || e.button !== 0) return;
        const p = e.composedPath ? e.composedPath() : null;
        if (p ? (!p.includes(domWrap) && !p.includes(domVideoWrap)) : (!domWrap.contains(e.target) && !domVideoWrap.contains(e.target))) return;
        const r = domWrap.getBoundingClientRect();
        VideoZoom_down = { x: e.clientX - r.left, y: e.clientY - r.top };
    }, true);

    document.addEventListener("mouseup", (e) => {
        if (!VideoZoom_down || !e.ctrlKey || e.button !== 0) return;
        const p = e.composedPath ? e.composedPath() : null;
        if (p ? (!p.includes(domWrap) && !p.includes(domVideoWrap)) : (!domWrap.contains(e.target) && !domVideoWrap.contains(e.target))) return;
        const r = domWrap.getBoundingClientRect();
        x -= (e.clientX - r.left) - VideoZoom_down.x;
        y -= (e.clientY - r.top) - VideoZoom_down.y;
        if (domVideoWrap.style.transform) domVideoWrap.style.transformOrigin = `${x}px ${y}px`;
        VideoZoom_down = null;
    }, true);
}

