function initPkg_AudioLine() {
	initPkg_AudioLine_Dom();
	initPkg_AudioLine_Func();
}

function initPkg_AudioLine_Dom() {
	AudioLine_insertIcon();
}
function AudioLine_insertIcon() {
	let a = document.createElement("div");
    a.className = "Title-blockInline";
    a.id = "ex-audio-line";
	a.innerHTML = '<div class="TitleShare"><div class="TitleShare-shareBox "><div class="Title-row-span  is-right"><span class="Title-row-icon "><svg t="1613808136306" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2829" width="16" height="16"><path d="M496 64A48 48 0 0 1 544 112v800a48 48 0 0 1-96 0v-800A48 48 0 0 1 496 64z m-224 128A48 48 0 0 1 320 240v544a48 48 0 0 1-96 0v-544A48 48 0 0 1 272 192z m448 0A48 48 0 0 1 768 240v544a48 48 0 0 1-96 0v-544A48 48 0 0 1 720 192z m-672 128A48 48 0 0 1 96 368v288a48 48 0 0 1-96 0v-288A48 48 0 0 1 48 320z m896 0a48 48 0 0 1 48 48v288a48 48 0 0 1-96 0v-288a48 48 0 0 1 48-48z" p-id="2830"></path></svg></span><span class="Title-row-text ">切换音频线路</span></div></div></div>';
    let b = document.getElementsByClassName("Title-col")[4];
    if (b && b.childNodes.length > 1) {
        b.insertBefore(a, b.childNodes[1]);
    } else {
        b = getValidDom([".subTitleContainer__-vzhr"]);
        b.appendChild(a);
    }
}

function initPkg_AudioLine_Func() {
	document.getElementById("ex-audio-line").addEventListener("click", function() {
        let pause = getValidDom([".pause-c594e8", ".icon-c8be96"]);
        if (pause) pause.click(); // 暂停视频播放
        getRealLive_Douyu(rid, true, false, "1428", (lurl) => {
            createNewAudio_Douyu(videoPlayerArr.length, rid);
        })
    });
}