let isRemoveDanmakuBackground = getLocalIsRemoveDanmakuBackground();
function initPkg_Shield_RemoveDanmakuBackground() {
  const shieldTool = document.getElementsByClassName("ShieldTool-list")[0];
  shieldTool.insertAdjacentHTML(
    "beforeend",
    `
      <div class="ShieldTool-listItem ${isRemoveDanmakuBackground ? "is-checked" : "is-noChecked"}" id="ex-removeDanmakuBackground">
          <span class="ShieldTool-checkIcon"></span>
          <h5 class="ShieldTool-checkText">屏蔽弹幕背景</h5>
      </div>`
  );
  if (isRemoveDanmakuBackground) removeDanmakuBackground();
  const dom = document.getElementById("ex-removeDanmakuBackground");
  dom.addEventListener("click", () => {
    isRemoveDanmakuBackground = !isRemoveDanmakuBackground;
    if (isRemoveDanmakuBackground) {
      removeDanmakuBackground();
      dom.className = dom.className.replace("is-noChecked", "is-checked");
    } else {
      StyleHook_remove("Ex_Style_RemoveDanmakuBackground");
      dom.className = dom.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveDanmakuBackground();
  });
}

function getLocalIsRemoveDanmakuBackground() {
  const ret = localStorage.getItem("ExSave_isRemoveDanmakuBackground");
  return ret ? Number(ret) === 1 : false;
}

function saveRemoveDanmakuBackground() {
  localStorage.setItem("ExSave_isRemoveDanmakuBackground", isRemoveDanmakuBackground ? 1 : 0);
}

function removeDanmakuBackground() {
  StyleHook_set(
    "Ex_Style_RemoveDanmakuBackground",
    `
      .danmuItem-f8e204 {
        background: none !important;
      }
      .danmuItem-f8e204 div{
        background: none;
      }
      .danmuItem-f8e204 > img {
        display: none;
      }
      .danmuItem-f8e204 div > img {
        display: none;
      }
      .super-text-188279 {
        background: none !important;
      }
      .danmuItem-f8e204 .noble-f439ef {
        background: none !important;
      }
      .customBarrage {
        background: none !important;
        text-shadow: none !important;
      }
      .customBarrage > div {
        background: none !important;
      }
  `
  );
}