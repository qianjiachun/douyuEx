function initPkg_VideoTools_VideoSync() {
    initPkg_VideoTools_VideoSync_Dom();
    initPkg_VideoTools_VideoSync_Func();
}

function initPkg_VideoTools_VideoSync_Dom() {
    VideoSync_insertIcon();
}
function VideoSync_insertIcon() {
	let a = document.createElement("div");
    a.id = "ex-videosync";
    a.title = "同步时间";
    a.innerHTML = `
    <svg t="1595680402158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7532" width="22" height="22"><path d="M938.1888 534.016h-80.7936c0.4096-7.3728 0.6144-14.6432 0.6144-22.016 0-218.624-176.8448-400.7936-389.12-400.7936C257.024 111.2064 80.6912 293.1712 80.6912 512c0 218.7264 176.4352 400.7936 388.1984 400.7936 74.752 0 149.0944-22.016 208.1792-60.0064l42.7008 68.608c-75.0592 48.9472-161.9968 74.8544-250.7776 74.752C209.8176 996.1472 0 779.264 0 512S209.8176 27.8528 468.8896 27.8528C728.3712 27.8528 938.7008 244.736 938.7008 512c0 7.3728-0.2048 14.6432-0.512 22.016z m-261.12 318.7712z m-26.4192-158.1056L426.7008 556.032V291.9424h64v226.5088L689.5616 635.904l-38.912 58.7776z m245.3504-6.656L768 512h256L896 688.0256z" fill="#ffffff" p-id="7533"></path></svg>
    `;
    let b = document.getElementsByClassName("left-d3671e")[0];
    if (b) {
        a.style.marginLeft = "20px";
        b.insertBefore(a, b.childNodes[3]);
    } else {
        a.style.marginLeft = "8px";
        b = getValidDom([".left-bfab3b"]);
        b.insertBefore(a, b.childNodes[2]);
    }
}

function initPkg_VideoTools_VideoSync_Func() {
    document.getElementById("ex-videosync").addEventListener("click", () => {
        setVideoSync();
    })
}

function setVideoSync() {
    let buffered = liveVideoNode.buffered;
        if (buffered.length == 0) {
            // 暂停中
            return;
        }
    liveVideoNode.currentTime = buffered.end(0);
}