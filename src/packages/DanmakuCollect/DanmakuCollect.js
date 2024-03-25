function initPkg_DanmakuCollect() {
  const textarea = document.getElementsByClassName("ChatSend-txt")[0];
  const collectButton = document.getElementsByClassName("ChatBarrageCollect")[0];
  textarea.addEventListener("input", function() {
    const length = textarea.value.length;
    if (length > 25) {
      collectButton.style.display = "none";
    } else if (collectButton.style.display == "none") {
      collectButton.style.display = "";
    }
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