function initPkg_DyVideoBarrageLine() {
    let timer = setInterval(() => {
        let progress = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector(".ProgressBar-Safearea");
        let hashidShadow = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        if (progress && hashidShadow) {
            clearInterval(timer);
            let hashid = hashidShadow.querySelector("share-hover").getAttribute("hashid");
            let vid = $DATA.ROOM.vid;
            if (hashid !== vid) {
                showMessage("视频内容已改变，请刷新网页后重试", "error");
                return;
            }
            renderVideoBarrageLine(hashid);
        }
    }, 1000);
}


function initPkg_DyVideoBarrageLine_Func() {
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

async function renderVideoBarrageLine(hashid) {
    let progressTimeText = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("#time-label").innerText;
    let arr = progressTimeText.split("/");
    if (arr.length <= 0) return;
    let totalMs = timeText2Ms(arr[1]);
    let step = totalMs / 100;
    
    let list = new Array(101).fill(0, 0, 101);
    let pre = 0;
    do {
        let data = await getVideoBarrageByTime(hashid, pre);
        pre = data.data.pre;
        for (let i = 0; i < data.data.list.length; i++) {
            let item = data.data.list[i];
            let index = Math.floor(item.tl / step);
            list[index]++;
        }
    } while (pre >= 0);
    console.log("哈哈",list)
}