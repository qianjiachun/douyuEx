import { getVideoToolsIsInput, getVideoToolsLiveVideoNode, setVideoToolsLiveVideoNode } from '../VideoTools.js';

export function initPkg_VideoTools_VideoRecall() {
    initPkg_VideoTools_VideoRecall_Func();
}

var VideoRecall_keydownHandler = null;

function initPkg_VideoTools_VideoRecall_Func() {
    if (VideoRecall_keydownHandler) {
        document.removeEventListener("keydown", VideoRecall_keydownHandler, true);
    }

    VideoRecall_keydownHandler = (e) => {
        if (getVideoToolsIsInput()) return;
        if (e.target && (e.target.isContentEditable || /^(input|textarea)$/i.test(e.target.tagName))) return;
        if (e.keyCode != 37 && e.keyCode != 39 && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        const videoNode = getVideoToolsLiveVideoNode() || document.querySelector(".layout-Player-videoEntity video");
        if (!videoNode) return;
        setVideoToolsLiveVideoNode(videoNode);
        e.preventDefault();
        videoNode.currentTime = Math.max(0, (videoNode.currentTime || 0) + (e.keyCode == 37 || e.key === "ArrowLeft" ? -3 : 3));
    };

    document.addEventListener("keydown", VideoRecall_keydownHandler, true);
}
