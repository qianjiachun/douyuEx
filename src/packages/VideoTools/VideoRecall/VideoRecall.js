function initPkg_VideoTools_VideoRecall() {
    initPkg_VideoTools_VideoRecall_Func();
}


function initPkg_VideoTools_VideoRecall_Func() {
    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 37) {
            let video = document.querySelector(".layout-Player-videoEntity video");
            video.currentTime += -3;
        } else if (e.keyCode == 39) {
            let video = document.querySelector(".layout-Player-videoEntity video");
            video.currentTime += 3;
        }
    });
}
