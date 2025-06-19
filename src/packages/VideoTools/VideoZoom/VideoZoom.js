let videoScale = 1;
function initPkg_VideoTools_VideoZoom() {
    let domWrap = getValidDom([".layout-Player-video", ".layout-Player-videoEntity"]);
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];

    let x = 0;
    let y = 0;

    let mousedownX = 0;
    let mousedownY = 0;
    let mouseupX = 0;
    let mouseupY = 0;

    domVideoWrap.style.transition = "all 0.1s";
    domWrap.addEventListener("mousewheel", e => {
        if (!e.ctrlKey) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        let delta = e.wheelDelta || -e.detail;
        x = e.screenX - domWrap.getBoundingClientRect().left;
        y = e.screenY - domWrap.getBoundingClientRect().top;
        if (delta >= 0) {
            videoScale += 0.1;
        } else {
            videoScale -= 0.1;
        }
        domVideoWrap.style.transform = `scale(${videoScale})`;
        domVideoWrap.style.transformOrigin = `${x}px ${y}px`;
    });

    domWrap.addEventListener("mousedown", e => {
        if (!e.ctrlKey) {
            return;
        }
        if (e.button === 0) {
            mousedownX = e.clientX - domWrap.getBoundingClientRect().left;
            mousedownY = e.clientY - domWrap.getBoundingClientRect().top;
        }
    });

    domWrap.addEventListener("mouseup", e => {
        if (!e.ctrlKey) {
            return;
        }
        if (e.button === 0) {
            mouseupX = e.clientX - domWrap.getBoundingClientRect().left;
            mouseupY = e.clientY - domWrap.getBoundingClientRect().top;

            let delX = mouseupX - mousedownX;
            let delY = mouseupY - mousedownY;

            x -= delX;
            y -= delY;
            if (domVideoWrap.style.transform !== "") {
                domVideoWrap.style.transformOrigin = `${x}px ${y}px`;
            }
        }
    });
}

