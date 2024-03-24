function initPkg_ImageDanmaku() {
  initPkg_ImageDanmaku_Func();
}

function initPkg_ImageDanmaku_Func() {
  const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
  document.addEventListener("paste", async (event) => {
    if (document.activeElement !== chatDom) return;
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (let index in items) {
      let item = items[index];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        chatDom.value += `[douyuEx图片上传中]`;
        let blob = item.getAsFile();
        const url = await getUploadImageUrl(blob);
        addImageDanmaku(url);
        break;
      }
    }
  });

  new DomHook("#js-barrage-list", false, (m) => {
    if (m.length <= 0) return;
    if (m[0].addedNodes.length <= 0) return;
    let dom = m[0].addedNodes[0];
    const text = dom.getElementsByClassName("Barrage-content")[0].innerText;
    if (!text.includes("[douyuEx图片")) return;
    let newText = text.replace(/\[douyuEx图片(.*?)\]/g, (match, str) => {
      const split = str.split(".");
      const url = decompressImageUrl(split[0]);
      const realImageUrl = `https://img.douyucdn.cn/data/yuba/weibo/${url.slice(0, 4) + "/" + url.slice(4, 6) + "/" + url.slice(6, 8) + "/" + url}.${split[1]}`;
      return realImageUrl;
    });
    console.log(newText);
  })
}

function addImageDanmaku(url) {
  const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
  const split = url.split(".");
  chatDom.value = chatDom.value.replace("[douyuEx图片上传中]", `[douyuEx图片${compressImageUrl(split[0])}.${split[1]}]`);
}


function compressImageUrl(text) {
  let number = BigInt(text);
  return number.toString(36);
}
// TODO: 需要更加准确的36进制转10进制
function decompressImageUrl(text) {
  return String(BigInt("0x" + parseInt(text, 36).toString(16)))
}

function getUploadPreRequest() {
  return new Promise(resolve => {
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
  })
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
          resolve(json.uri.split("/").pop().split("?")[0]);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("图片上传失败");
      }
    };
    request.send(formData);
  })
}