function initPkg_Shield_RemoveEnter() {
  let shieldTool = document.getElementsByClassName("ShieldTool-list")[0];
  let isRemoveEnterBarrage = localStorage.getItem("ExSave_isRemoveEnterBarrage"); // '1'移除check
  let isChecked = (isRemoveEnterBarrage == null || isRemoveEnterBarrage == '1') ? true : false;
  let isSupported = window.CSS && window.CSS.supports && window.CSS.supports('--enter-display', 'none'); //CSS变量兼容性检测
  let barrageExtendContainer = document.getElementById("js-barrage-extend-container");
  barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", isChecked ? "none" : "block", "important");

  if (shieldTool == undefined || !isSupported)
      return;
  if (isRemoveEnterBarrage == null)
      isRemoveEnterBarrage = '1';

  shieldTool.insertAdjacentHTML("beforeend", `
      <div class="ShieldTool-listItem ${ isChecked ? 'is-checked' : 'is-noChecked'}" id="ex-enter-shield">
          <span class="ShieldTool-checkIcon"></span>
          <h5 class="ShieldTool-checkText">屏蔽进场弹幕</h5>
      </div>`);
  document.getElementById("ex-enter-shield").addEventListener("click", (e) => {
      let classList = e.currentTarget.classList;
      let noChecked = classList.toggle("is-noChecked");
      let chceked = classList.toggle("is-checked");
      let enterDisplay = (noChecked && !chceked) ? "block": "none";
      barrageExtendContainer && barrageExtendContainer.style.setProperty("--enter-display", enterDisplay, "important");
      localStorage.setItem("ExSave_isRemoveEnterBarrage", (noChecked && !chceked) ? "0" : "1"); // '1'移除check
      
  });
}