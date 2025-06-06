function initPkg_DanmakuCollect() {
  initPkg_DanmakuCollect_Dom();
  const textarea = document.getElementsByClassName("ChatSend-txt")[0];
  const collectButton = document.getElementsByClassName("ChatBarrageCollect")[0];
  textarea.addEventListener("keyup", () => {
    const length = textarea.value.length;
    if (length > 25) {
      collectButton.style.display = "none";
    } else {
      collectButton.style.display = "";
    }
  });
  document.getElementsByClassName("ChatSend-button")[0].addEventListener("click", () => {
    collectButton.style.display = "";
  });
  responseHook((url, text) => {
    if (url.includes(`bulletscreen/query`)) {
      let obj = JSON.parse(text);
      obj.data.list.unshift(...getLocalDanmakuCollect().map(item => {
        return {
          content: item.content,
          type: 2,
          id: item.id
        }
      }));
      return JSON.stringify(obj);
    }
  });

  responseHook((url, text, body) => {
    if (url.includes(`bulletscreen/add`)) {
      let obj = JSON.parse(text);
      if (obj.error == 0) return text;
      let { content } = JSON.parse(body);
      addLocalDanmakuCollect(content);
      obj.msg = "收藏成功，云收藏已达上限，将收藏至本地（由DouyuEx插件实现无限收藏）";

      // 关闭并重新打开弹幕收藏以更新新添加的弹幕
      document.querySelector(".ChatBarrageCollect-tip").click();
      document.querySelector(".ChatBarrageCollect-tip").click();
      return JSON.stringify(obj);
    }
  });

  responseHook((url, text, body) => {
    if (url.includes(`bulletscreen/del`)) {
      let { id } = JSON.parse(body);
      delLocalDanmakuCollect(id);
    }
  });
}

function initPkg_DanmakuCollect_Dom() {
  let timer = setInterval(() => {
    if (typeof document.getElementsByClassName("ChatBarrageCollect")[0] != "undefined") {
      clearInterval(timer);
      new DomHook(".ChatBarrageCollect", false, (m) => {
        const titleDom = document.getElementsByClassName("ChatBarrageCollectPop-title");
        if (!titleDom) {
          document.getElementById("ex-danmaku-collect-search").removeEventListener("input", searchCollectDanmaku);
          return;
        }
        if (titleDom.length === 0) return;
        let inputDom = document.createElement("input");
        inputDom.id = "ex-danmaku-collect-search";
        inputDom.placeholder = "搜索弹幕";
        inputDom.style.marginLeft = "6px";
        titleDom[0].appendChild(inputDom);

        inputDom.addEventListener("input", searchCollectDanmaku);
      });
    }
  }, 1000);
}

function searchCollectDanmaku(e) {
  const searchText = e.target.value;
  let parentDom = document.getElementsByClassName("ChatBarrageCollectPop-barrageContent")[0].parentElement;
  let danmakuDoms = parentDom.getElementsByClassName("TagItem");
  // 找出所有doms里面包含searchText的dom，其他全部display为none，如果searchText为空，则全部显示
  for (let i = 0; i < danmakuDoms.length; i++) {
    let danmakuDom = danmakuDoms[i];
    if (danmakuDom.innerText.includes(searchText)) {
      danmakuDom.style.display = "";
    } else {
      danmakuDom.style.display = "none";
    }
  }
}

function getLocalDanmakuCollect() {
  let ret = localStorage.getItem("ExSave_DanmakuCollect");
  try {
    ret = JSON.parse(ret) || [];
  } catch (error) {
    ret = [];
  }
  return ret;
}

function addLocalDanmakuCollect(content) {
  let ret = getLocalDanmakuCollect();
  ret.unshift({
    content,
    id: new Date().getTime()
  });
  localStorage.setItem("ExSave_DanmakuCollect", JSON.stringify(ret));
}

function delLocalDanmakuCollect(id) {
  let ret = getLocalDanmakuCollect();
  localStorage.setItem("ExSave_DanmakuCollect", JSON.stringify(ret.filter(item => item.id !== id)));
}