let isRemoveEnterBarrage = getLocalIsRemoveEnterBarrage();
function initPkg_Shield_RemoveEnter() {
  const shieldTool = document.getElementsByClassName("FilterKeywords")[0];
  let isSupported = window.CSS && window.CSS.supports && window.CSS.supports('--enter-display', 'none'); //CSS变量兼容性检测
  let barrageExtendContainer = document.getElementById("js-barrage-extend-container");
  
  if (shieldTool == undefined || !isSupported)
      return;
  
  shieldTool.insertAdjacentHTML(
    "afterbegin",
    `<div class="FilterSwitchStatus" id="ex-removeEnterBarrage">
    <h3>屏蔽进场弹幕</h3>
    <div>
      <span class="FilterSwitchStatus-status ${isRemoveEnterBarrage ? "is-checked" : "is-noChecked"}">${isRemoveEnterBarrage ? "已开启" : "未开启"}</span>
      <span class="FilterSwitchStatus-switch ${isRemoveEnterBarrage ? "is-checked" : "is-noChecked"}">
        <span class="FilterSwitchStatus-switch-inner"></span>
      </span>
    </div>
  </div>`
  );
  
  if (isRemoveEnterBarrage) {
    barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "none", "important");
  } else {
    barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "block", "important");
  }
  const dom = document.getElementById("ex-removeEnterBarrage");
  const statusSpan = dom.querySelector(".FilterSwitchStatus-status");
  const switchSpan = dom.querySelector(".FilterSwitchStatus-switch");
  dom.addEventListener("click", () => {
    isRemoveEnterBarrage = !isRemoveEnterBarrage;
    if (isRemoveEnterBarrage) {
      barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "none", "important");
      statusSpan.className = statusSpan.className.replace("is-noChecked", "is-checked");
      statusSpan.textContent = "已开启";
      switchSpan.className = switchSpan.className.replace("is-noChecked", "is-checked");
    } else {
      barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", "block", "important");
      statusSpan.className = statusSpan.className.replace("is-checked", "is-noChecked");
      statusSpan.textContent = "未开启";
      switchSpan.className = switchSpan.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveEnterBarrage();
  });
}

function getLocalIsRemoveEnterBarrage() {
  const ret = localStorage.getItem("ExSave_isRemoveEnterBarrage");
  return ret ? Number(ret) === 1 : false; // 默认为false（不屏蔽进场弹幕）
}

function saveRemoveEnterBarrage() {
  localStorage.setItem("ExSave_isRemoveEnterBarrage", isRemoveEnterBarrage ? 1 : 0);
}