function initPkg_VideoTools_VideoSpeed() {
    initPkg_VideoTools_VideoSpeed_Dom();
    initPkg_VideoTools_VideoSpeed_Func();
}

function initPkg_VideoTools_VideoSpeed_Dom() {
    VideoSpeed_insertIcon();
}
function VideoSpeed_insertIcon() {
    let a = document.createElement("li");
    a.id = "ex-videospeed";
    a.innerHTML = `
    倍速播放
    <ul class="videospeed__wrap">
        <li id="videospeed__2.0">2.0x</li>
        <li id="videospeed__1.5">1.5x</li>
        <li id="videospeed__1.25">1.25x</li>
        <li id="videospeed__1.0">1.0x</li>
        <li id="videospeed__0.75">0.75x</li>
        <li id="videospeed__0.5">0.5x</li>
    </ul>
    `;

    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[1]);
}

function initPkg_VideoTools_VideoSpeed_Func() {
    document.getElementById("videospeed__2.0").addEventListener("click", () => {
        liveVideoNode.playbackRate = 2;
    });
    document.getElementById("videospeed__1.5").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1.5;
    });
    document.getElementById("videospeed__1.25").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1.25;
    });
    document.getElementById("videospeed__1.0").addEventListener("click", () => {
        liveVideoNode.playbackRate = 1;
    });
    document.getElementById("videospeed__0.75").addEventListener("click", () => {
        liveVideoNode.playbackRate = 0.75;
    });
    document.getElementById("videospeed__0.5").addEventListener("click", () => {
        liveVideoNode.playbackRate = 0.5;
    });
}
