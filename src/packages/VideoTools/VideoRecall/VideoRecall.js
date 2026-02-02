function initPkg_VideoTools_VideoRecall() {
    initPkg_VideoTools_VideoRecall_Func();
}

var VideoRecall_keydownHandler = null;

function initPkg_VideoTools_VideoRecall_Func() {
    if (VideoRecall_keydownHandler) {
        document.removeEventListener("keydown", VideoRecall_keydownHandler, true);
    }

    VideoRecall_keydownHandler = (e) => {
        if (isInput) return;
        if (e.target && (e.target.isContentEditable || /^(input|textarea)$/i.test(e.target.tagName))) return;
        if (e.keyCode != 37 && e.keyCode != 39 && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        liveVideoNode = liveVideoNode || document.querySelector(".layout-Player-videoEntity video");
        if (!liveVideoNode) return;
        e.preventDefault();
        liveVideoNode.currentTime = Math.max(0, (liveVideoNode.currentTime || 0) + (e.keyCode == 37 || e.key === "ArrowLeft" ? -3 : 3));
    };

    document.addEventListener("keydown", VideoRecall_keydownHandler, true);
}
