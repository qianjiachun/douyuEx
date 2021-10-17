let videoScale = 1;
function initPkg_VideoTools_VideoZoom() {
    let domWrap = document.getElementsByClassName("layout-Player-video")[0];
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];
    
    domVideoWrap.style.transition = "all 0.1s";
    domWrap.addEventListener("mousewheel", e => {
        if (!e.ctrlKey) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        let delta = e.wheelDelta || -e.detail;
        let x = e.screenX - domWrap.getBoundingClientRect().left;
        let y = e.screenY - domWrap.getBoundingClientRect().top;
        if (delta >= 0) {
            videoScale += 0.1;
        } else {
            videoScale -= 0.1;
        }
        domVideoWrap.style.transform = `scale(${videoScale})`;
        domVideoWrap.style.transformOrigin = `${x}px ${y}px`;
    }, true);

}

