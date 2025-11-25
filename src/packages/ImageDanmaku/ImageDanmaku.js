function initPkg_ImageDanmaku() {
  initPkg_ImageDanmaku_Dom();
  initPkg_ImageDanmaku_Func();
}

function initPkg_ImageDanmaku_Dom() {
  const chatTool = document.getElementsByClassName("ChatToolBar__right")[0];
  const dom = document.createElement("div");
  dom.className = "BarrageFilter";
  dom.title = "添加图片弹幕（仅安装插件的用户可见）";
  dom.innerHTML = `
  <input id="ex-upload-image-input" type="file" id="ex-upload-image" style="display: none" accept="image/*">
  <svg id="ex-upload-image-svg" viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21426" width="18" height="18"><path d="M864.896 639.68a37.76 37.76 0 0 1 37.568 37.568v112.832h112.832a37.76 37.76 0 0 1 37.568 37.568 37.76 37.76 0 0 1-37.568 37.632H902.4v112.768a37.76 37.76 0 0 1-37.568 37.632 37.76 37.76 0 0 1-37.632-37.632V865.28h-112.832a37.76 37.76 0 0 1-37.568-37.632 37.76 37.76 0 0 1 37.568-37.568h112.832v-112.832a37.76 37.76 0 0 1 37.632-37.568zM930.688 0.384c46.656 0 84.608 37.952 84.608 84.608v474.688a37.632 37.632 0 0 1-75.2 0V398.208l-377.088 304.64a84.352 84.352 0 0 1-94.4 8.32l-1.28-0.768-209.216-127.616a9.344 9.344 0 0 0-7.552-0.256l-175.36 125.632v147.712c0 5.12 4.288 9.408 9.408 9.408H595.2a37.632 37.632 0 0 1 0 75.2H84.608A84.672 84.672 0 0 1 0 855.872V84.992C0 38.4 37.952 0.384 84.608 0.384z m0 75.2H84.608a9.536 9.536 0 0 0-9.408 9.408V615.68l135.552-97.152 1.792-1.024a84.032 84.032 0 0 1 82.432-0.256l1.344 0.768L505.6 645.632a9.344 9.344 0 0 0 10.048-1.152l0.128-0.128 424.32-342.848V84.992a9.536 9.536 0 0 0-9.344-9.408zM282.048 150.784c72.512 0 131.584 59.072 131.584 131.648a131.776 131.776 0 0 1-131.584 131.584A131.776 131.776 0 0 1 150.4 282.432c0-72.576 59.072-131.648 131.648-131.648z m0 75.264a56.448 56.448 0 0 0 0 112.768 56.448 56.448 0 0 0 0-112.768z" fill="#BBBBBB" p-id="21427"></path></svg>
  `;
  chatTool.insertBefore(dom, chatTool.firstChild);
}

function initPkg_ImageDanmaku_Func() {
  const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
  document.addEventListener("paste", async (event) => {
    if (document.activeElement !== chatDom) return;
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (let index in items) {
      let item = items[index];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        chatDom.value += `[DouyuEx图片上传中]`;
        let blob = item.getAsFile();
        const url = await getUploadImageUrl(blob);
        addImageDanmaku(url);
        break;
      }
    }
  });

  let timer = setInterval(() => {
    if (typeof document.getElementById("js-barrage-list") != "undefined") {
      clearInterval(timer);
      new DomHook("#js-barrage-list", false, (m) => {
        if (m.length <= 0) return;
        if (m[0].addedNodes.length <= 0) return;
        let dom = m[0].addedNodes[0];
        const contentDom = dom.getElementsByClassName("Barrage-content");
        if (!contentDom || (contentDom && contentDom.length === 0)) return;
        const text = contentDom[0].innerHTML;
        if (!text.includes("[DouyuEx图片")) return;
        let newText = text.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
        dom.getElementsByClassName("Barrage-content")[0].innerHTML = newText;
      });
    }
  }, 1000);

  let timer2 = setInterval(() => {
    if (typeof document.getElementsByClassName("danmu-fbb2a3")[0] != "undefined") {
      clearInterval(timer2);
      new DomHook(".danmu-fbb2a3", false, (m) => {
        if (m.length <= 0) return;
        if (m[0].addedNodes.length <= 0) return;
        let dom = m[0].addedNodes[0];
        if (!dom || (dom && !dom.innerHTML)) return;
        const text = dom.innerHTML;
        if (!text.includes("[DouyuEx图片")) return;
        let newText = text.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
        dom.innerHTML = newText;
      });
    }
  }, 1000);

  document.getElementById("ex-upload-image-svg").addEventListener("click", () => {
    document.getElementById("ex-upload-image-input").click();
  });

  document.getElementById("ex-upload-image-input").addEventListener("change", async (e) => {
    chatDom.value += `[DouyuEx图片上传中]`;
    let file = e.target.files[0];
    const url = await getUploadImageUrl(file).catch((err) => console.log(err));
    addImageDanmaku(url);
  });
}

function getImageDanmakuHtml(str) {
  if (!isValidImageFile(str)) return "";
  const split = str.split(".");
  const url = decompressImageUrl(split[0]);
  const realImageUrl = DOMPurify.sanitize(`https://img.douyucdn.cn/data/yuba/weibo/${url.slice(0, 4) + "/" + url.slice(4, 6) + "/" + url.slice(6, 8) + "/" + url}.200x0.${split[1]}`);
  const imgHtml = `<a href="${realImageUrl.replace("200x0.", "")}" target="_blank"><img class="ex-image-danmaku" src="${realImageUrl}" alt=""></a>`;
  return DOMPurify.sanitize(imgHtml);
}

function addImageDanmaku(url) {
  const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
  const split = url.split(".");
  chatDom.value = chatDom.value.replace("[DouyuEx图片上传中]", `[DouyuEx图片${compressImageUrl(split[0])}.${split[1]}]`);
}

function compressImageUrl(text) {
  let number = BigInt(text);
  return number.toString(36);
}

function decompressImageUrl(base36Str) {
  const base36Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let decimal = 0n;
  let multiplier = 1n;

  for (let i = base36Str.length - 1; i >= 0; i--) {
    const char = base36Str[i].toUpperCase();
    const charIndex = base36Chars.indexOf(char);
    if (charIndex === -1) {
      throw new Error(`Invalid base36 character: ${char}`);
    }
    decimal += BigInt(charIndex) * multiplier;
    multiplier *= 36n;
  }

  return decimal.toString();
}

function getUploadPreRequest() {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: `https://yuba.douyu.com/wbapi/web/image/preRequest?source=&timestamp=${new Date().getTime()}`,
      responseType: "json",
      headers: {
        "dy-client": "pc",
        "dy-token": dyToken
      },
      onload: function (response) {
        resolve(response.response);
      }
    });
  });
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

function getUploadImageUrl(file) {
  return new Promise(async (resolve, reject) => {
    const preRequestRet = await getUploadPreRequest();
    const preRequestData = preRequestRet.data;
    if (!preRequestData) return;
    let formData = new FormData();

    for (let key in preRequestData) {
      formData.append(key, preRequestData[key]);
    }
    formData.append("file", file);

    let request = new XMLHttpRequest();
    request.open("POST", "https://img.douyucdn.cn/upload", true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        try {
          let json = JSON.parse(this.response);
          const ret = json.uri.split("/").pop().split("?")[0];
          resolve(ret);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("图片上传失败");
      }
    };
    request.send(formData);
  });
}

function getImageDanmakuFromImgSrc(src) {
  const split = src.split("/");
  const url = split.pop();
  const split2 = url.split(".");
  return `[DouyuEx图片${compressImageUrl(split2[0])}.${split2[2]}]`;
}
