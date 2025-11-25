let isRemoveDanmakuBackground = getLocalIsRemoveDanmakuBackground();
if (isRemoveDanmakuBackground) removeDanmakuBackground();
function initPkg_Shield_RemoveDanmakuBackground() {
  const shieldTool = document.getElementsByClassName("FilterKeywords")[0];
  shieldTool.insertAdjacentHTML(
    "afterbegin",
    `<div class="FilterSwitchStatus" id="ex-removeDanmakuBackground">
    <h3>屏蔽弹幕背景</h3>
    <div>
      <span class="FilterSwitchStatus-status ${isRemoveDanmakuBackground ? "is-checked" : "is-noChecked"}">${isRemoveDanmakuBackground ? "已开启" : "未开启"}</span>
      <span class="FilterSwitchStatus-switch ${isRemoveDanmakuBackground ? "is-checked" : "is-noChecked"}">
        <span class="FilterSwitchStatus-switch-inner"></span>
      </span>
    </div>
  </div>`
  );
  
  const dom = document.getElementById("ex-removeDanmakuBackground");
  const statusSpan = dom.querySelector(".FilterSwitchStatus-status");
  const switchSpan = dom.querySelector(".FilterSwitchStatus-switch");
  dom.addEventListener("click", () => {
    isRemoveDanmakuBackground = !isRemoveDanmakuBackground;
    if (isRemoveDanmakuBackground) {
      removeDanmakuBackground();
      statusSpan.className = statusSpan.className.replace("is-noChecked", "is-checked");
      statusSpan.textContent = "已开启";
      switchSpan.className = switchSpan.className.replace("is-noChecked", "is-checked");
    } else {
      StyleHook_remove("Ex_Style_RemoveDanmakuBackground");
      statusSpan.className = statusSpan.className.replace("is-checked", "is-noChecked");
      statusSpan.textContent = "未开启";
      switchSpan.className = switchSpan.className.replace("is-checked", "is-noChecked");
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
      .danmuItem-a8616a {
        background: none !important;
      }
      .danmuItem-a8616a div{
        background: none;
      }
      .danmuItem-a8616a > img {
        display: none;
      }
      .danmuItem-a8616a div > img {
        display: none;
      }
      .super-text-f60bfa {
        background: none !important;
      }
      .danmuItem-a8616a .noble-d35c82 {
        background: none !important;
      }
      .customBarrage {
        background: none !important;
        text-shadow: none !important;
      }
      .customBarrage > div {
        background: none !important;
      }
      .PlayerCustomBarrage-prefixPlugin--text {
        display: none !important;
      }
  `
  );
}