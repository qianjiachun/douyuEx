function initPkg_DyVideoDownload() {
    let timer = setInterval(() => {
        let toolBar = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector(".ToolBar-positiveUl");
        if (toolBar) {
            clearInterval(timer);
            initPkg_DyVideoDownload_Dom(toolBar);
            initPkg_DyVideoDownload_Func();
        }
    }, 1000);
}

function initPkg_DyVideoDownload_Dom(dom) {
    let html = `
    <span class="ToolBar-icon ">
        <svg t="1634113402576" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7734" width="28" height="28"><path d="M761.98 413.12c0.25-4.4 0.39-8.82 0.39-13.28 0-127.18-102.84-230.28-229.71-230.28s-229.71 103.1-229.71 230.28c0 0.67 0.02 1.33 0.03 2a213.156 213.156 0 0 0-38.91-3.58c-117.2 0-212.21 95.25-212.21 212.74 0 117.49 95.01 212.74 212.21 212.74 2.94 0 5.86-0.08 8.77-0.2 2.54 0.13 5.09 0.2 7.66 0.2h467.35c2.82 0 5.61-0.09 8.39-0.24 108.96-5.16 195.72-95.13 195.72-205.36 0.01-108.3-83.73-197.04-189.98-205.02zM616.33 584.24l-90.86 93.93c-0.78 1.11-1.66 2.17-2.63 3.17-3.95 4.09-8.9 6.62-14.09 7.61-8.34 1.77-17.38-0.51-23.97-6.89a25.975 25.975 0 0 1-3.16-3.68l-93.5-90.45c-10.53-10.19-10.81-26.99-0.62-37.52 10.19-10.53 26.99-10.81 37.52-0.62l45.09 43.62c0-0.06-0.01-0.12-0.01-0.18l-2.43-146.62c-0.3-17.83 13.92-32.52 31.75-32.82 17.83-0.3 32.52 13.92 32.82 31.75l2.43 146.63v0.17l43.52-44.99c10.19-10.53 26.99-10.81 37.52-0.62 10.53 10.17 10.81 26.97 0.62 37.51z" p-id="7735" fill="#515151"></path></svg>
    </span>
    <span class="ToolBar-iconText">下载</span>
    `

    let a = document.createElement("li");
	a.title = "下载视频";
	a.innerHTML = html;
    a.id = "btn-download";

    dom.appendChild(a);
}

function initPkg_DyVideoDownload_Func() {
    let $DATA = unsafeWindow.$DATA;

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#btn-download").addEventListener("click", async () => {
        const m3u8 = new M3U8();

        let dyVideoSign = new DyVideoSign($DATA.ROOM.point_id);
        let sign = dyVideoSign.getSign();
        let vid = $DATA.ROOM.vid;
        dyVideoSign = null;
        let ret = await getVideoStreamUrl(vid, sign);
        m3u8.start(ret.data.thumb_video.high.url);
    })
}

function getVideoStreamUrl(vid, sign) {
    return new Promise(resolve => {
        fetch("https://v.douyu.com/api/stream/getStreamUrl", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: `${sign}&vid=${vid}`
        }).then(result => {
            return result.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}