function initPkg_VideoTools_VideoRecall() {
    initPkg_VideoTools_VideoRecall_Func();
}


function initPkg_VideoTools_VideoRecall_Func() {
    document.getElementsByClassName("layout-Player-video")[0].addEventListener("keydown", (e) => {
        if (isInput == true) {
            return;
        }
        if (e.keyCode == 37) {
            liveVideoNode.currentTime += -3;
        } else if (e.keyCode == 39) {
            liveVideoNode.currentTime += 3;
        }
    });
}
