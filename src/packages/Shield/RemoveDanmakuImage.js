let isRemoveDanmakuImage = getLocalIsRemoveDanmakuImage();
function initPkg_Shield_RemoveDanmakuImage() {
  const shieldTool = document.getElementsByClassName("ShieldTool-list")[0];
  shieldTool.insertAdjacentHTML(
    "beforeend",
    `
      <div class="ShieldTool-listItem ${isRemoveDanmakuImage ? "is-checked" : "is-noChecked"}" id="ex-RemoveDanmakuImage">
          <span class="ShieldTool-checkIcon"></span>
          <h5 class="ShieldTool-checkText">屏蔽DouyuEx图片</h5>
      </div>`
  );
  if (isRemoveDanmakuImage) removeDanmakuImage();
  const dom = document.getElementById("ex-RemoveDanmakuImage");
  dom.addEventListener("click", () => {
    isRemoveDanmakuImage = !isRemoveDanmakuImage;
    if (isRemoveDanmakuImage) {
      removeDanmakuImage();
      dom.className = dom.className.replace("is-noChecked", "is-checked");
    } else {
      StyleHook_remove("Ex_Style_RemoveDanmakuImage");
      dom.className = dom.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveDanmakuImage();
  });
}

function getLocalIsRemoveDanmakuImage() {
  const ret = localStorage.getItem("ExSave_isRemoveDanmakuImage");
  return ret ? Number(ret) === 1 : false;
}

function saveRemoveDanmakuImage() {
  localStorage.setItem("ExSave_isRemoveDanmakuImage", isRemoveDanmakuImage ? 1 : 0);
}

function removeDanmakuImage() {
  StyleHook_set(
    "Ex_Style_RemoveDanmakuImage",
    `
    .danmuItem-a8616a a {
      display: none !important;
    }
  `
  );
}
