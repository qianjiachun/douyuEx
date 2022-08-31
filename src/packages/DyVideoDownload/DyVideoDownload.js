function initPkg_DyVideoDownload() {
    let timer = setInterval(() => {
        let toolBarShadow = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        if (toolBarShadow) {
            clearInterval(timer);
            let toolbar = toolBarShadow.querySelector(".ToolBar-positiveUl");
            initPkg_DyVideoDownload_Style();
            initPkg_DyVideoDownload_Dom(toolbar);
            initPkg_DyVideoDownload_Func();
        }
    }, 1000);
}

function initPkg_DyVideoDownload_Style() {
    let style = document.createElement("style");
    style.innerHTML = `
    #btn-download:hover .download__panel {
        display: block;
    }
    .download__panel {
        width:150px;
        position:absolute;
        text-align: center;
        cursor: default;
        margin-top: 29px;
        margin-left: -38px;
        box-shadow: 0px 3px 10px 0px;
        display: none;
        background: white;
    }
    .download__item {
        height: 30px;
        line-height: 30px;
        width: 100%;
        cursor: pointer;
    }
    .download__item:hover {
        color: rgb(255,119,0)
    }
    `;
    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.appendChild(style);
}

function initPkg_DyVideoDownload_Dom(dom) {
    let html = `
    <div class="download__panel">
        <div class="download__item" id="download__default" title="文件超过2GB时可能会下载失败">
            <span class="ToolBar-iconText">浏览器下载</span>
        </div>
        <div class="download__item" id="download__copy" title="可将链接填至第三方下载器中下载">
            <span class="ToolBar-iconText">复制m3u8链接</span>
        </div>
        <div class="download__item" id="download__barrage" title="下载弹幕(.xlsx)">
            <span class="ToolBar-iconText">下载弹幕(.xlsx)</span>
        </div>
        <div class="download__item" id="download__barrageass" title="下载弹幕(.ass)">
            <span class="ToolBar-iconText">下载弹幕(.ass)</span>
        </div>
    </div>
    <span class="ToolBar-icon ">
        <svg t="1634113402576" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7734" width="28" height="28"><path d="M761.98 413.12c0.25-4.4 0.39-8.82 0.39-13.28 0-127.18-102.84-230.28-229.71-230.28s-229.71 103.1-229.71 230.28c0 0.67 0.02 1.33 0.03 2a213.156 213.156 0 0 0-38.91-3.58c-117.2 0-212.21 95.25-212.21 212.74 0 117.49 95.01 212.74 212.21 212.74 2.94 0 5.86-0.08 8.77-0.2 2.54 0.13 5.09 0.2 7.66 0.2h467.35c2.82 0 5.61-0.09 8.39-0.24 108.96-5.16 195.72-95.13 195.72-205.36 0.01-108.3-83.73-197.04-189.98-205.02zM616.33 584.24l-90.86 93.93c-0.78 1.11-1.66 2.17-2.63 3.17-3.95 4.09-8.9 6.62-14.09 7.61-8.34 1.77-17.38-0.51-23.97-6.89a25.975 25.975 0 0 1-3.16-3.68l-93.5-90.45c-10.53-10.19-10.81-26.99-0.62-37.52 10.19-10.53 26.99-10.81 37.52-0.62l45.09 43.62c0-0.06-0.01-0.12-0.01-0.18l-2.43-146.62c-0.3-17.83 13.92-32.52 31.75-32.82 17.83-0.3 32.52 13.92 32.82 31.75l2.43 146.63v0.17l43.52-44.99c10.19-10.53 26.99-10.81 37.52-0.62 10.53 10.17 10.81 26.97 0.62 37.51z" p-id="7735" fill="#515151"></path></svg>
    </span>
    <span class="ToolBar-iconText" id="download-text">下载</span>
    `

    let a = document.createElement("li");
	a.title = "下载视频";
	a.innerHTML = html;
    a.id = "btn-download";

    dom.appendChild(a);
}

function initPkg_DyVideoDownload_Func() {
    let $DATA = unsafeWindow.$DATA;
    let domDownloadText = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download-text");
    let domDownloadPanel = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector(".download__panel");

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#btn-download").addEventListener("click", () => {
        if (domDownloadText.innerText === "下载完成") {
            showMessage("请刷新页面后再下载", "warning");
        }
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__default").addEventListener("click", async () => {
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        let vid = $DATA.ROOM.vid;
        if (hashid !== vid) {
            showMessage("视频内容已改变，请刷新网页后重试", "error");
            return;
        }

        showMessage("开始下载视频...当视频超过2GB时可能会下载失败", "info");
        const m3u8 = new M3U8();

        let dyVideoSign = new DyVideoSign($DATA.ROOM.point_id);
        let sign = dyVideoSign.getSign();
        
        dyVideoSign = null;
        let ret = await getVideoStreamUrl(vid, sign);

        let url = "";
        if ("super" in ret.data.thumb_video) {
            url = ret.data.thumb_video.super.url;
        } else if ("high" in ret.data.thumb_video) {
            url = ret.data.thumb_video.high.url;
        } else if ("normal" in ret.data.thumb_video) {
            url = ret.data.thumb_video.normal.url;
        } else {
            let keys = Object.keys(ret.data.thumb_video);
            url = keys.length > 0 ? ret.data.thumb_video[keys[0]].url : "";
        }
        if (url !== "") {
            let download = m3u8.start(url, {
                filename: $DATA.ROOM.name + ".mp4"
            });

            download.on("progress", progress => {
                domDownloadText.innerText = `${Number(progress.percentage).toFixed(2)}%`;
            }).on("finished", finished => {
                domDownloadText.innerText = "下载完成";
                showMessage("视频下载完成", "success");
            }).on("error", message => {
                domDownloadText.innerText = "下载失败";
                showMessage(message, "success");
            }).on("aborted", () => {
                domDownloadText.innerText = "下载中止";
            });
        } else {
            showMessage("获取m3u8链接失败", "error");
        }

        // domDownloadPanel.style.display = "none";
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__copy").addEventListener("click", async () => {
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        let vid = $DATA.ROOM.vid;
        if (hashid !== vid) {
            showMessage("视频内容已改变，请刷新网页后重试", "error");
            return;
        }

        showMessage("正在获取m3u8链接...", "info");

        let dyVideoSign = new DyVideoSign($DATA.ROOM.point_id);
        let sign = dyVideoSign.getSign();
        
        dyVideoSign = null;
        let ret = await getVideoStreamUrl(vid, sign);

        let url = "";
        if ("super" in ret.data.thumb_video) {
            url = ret.data.thumb_video.super.url;
        } else if ("high" in ret.data.thumb_video) {
            url = ret.data.thumb_video.high.url;
        } else if ("normal" in ret.data.thumb_video) {
            url = ret.data.thumb_video.normal.url;
        } else {
            let keys = Object.keys(ret.data.thumb_video);
            url = keys.length > 0 ? ret.data.thumb_video[keys[0]].url : "";
        }
        if (url !== "") {
            GM_setClipboard(url);
            showMessage("复制成功，可将链接复制到第三方下载器中下载", "success");
        } else {
            showMessage("获取m3u8链接失败", "error");
        }
        // domDownloadPanel.style.display = "none";
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__barrage").addEventListener("click", async () => {
        let videoTitle = document.getElementsByTagName("demand-video-title")[0].shadowRoot.querySelector(".Title-Main").innerText;
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        showMessage("正在获取弹幕数据，请勿切换页面...", "info");
        
        let pre = 0;
        let header = ["vid", "hashid", "uid", "昵称", "弹幕", "时间", "发送时间"];
        let body = [];
        do {
            let data = await getVideoBarrageByTime(hashid, pre);
            pre = data.data.pre;
            for (let i = 0; i < data.data.list.length; i++) {
                let item = data.data.list[i];
                body.push([item.vid, hashid, item.uid, item.nn, item.ctt, formatSeconds2(item.tl / 1000), dateFormat("yyyy-MM-dd hh:mm:ss", new Date(item.sts * 1000))]);
            }
        } while (pre >= 0);

        exportJsonToExcel(header, body, `【${videoTitle}】弹幕数据.xlsx`);
    })

    document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("#download__barrageass").addEventListener("click", async () => {
        let videoTitle = document.getElementsByTagName("demand-video-title")[0].shadowRoot.querySelector(".Title-Main").innerText;
        let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
        showMessage("正在获取弹幕数据，请勿切换页面...", "info");
        let pre = 0;
        let ass = new ASS({title: videoTitle});
        let list = [];
        do {
            let data = await getVideoBarrageByTime(hashid, pre);
            pre = data.data.pre;
            for (let i = 0; i < data.data.list.length; i++) {
                let item = data.data.list[i];
                list.push({
                    time: Number(item.tl),
                    txt: item.ctt,
                    color: item.col,
                });
            }
        } while (pre >= 0);
        let result = ass.generate(list);
        downloadFile(`${videoTitle}.ass`, result);
    })
}