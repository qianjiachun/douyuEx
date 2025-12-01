let isRemoveRepeatedDanmaku = getLocalIsRemoveRepeatedDanmaku();
let repeatedDanmakuSeconds = getLocalRepeatedDanmakuSeconds();
let isEnlargeDanmaku = getLocalIsEnlargeDanmaku();
// 对象存储弹幕文本和过期时间戳
let repeatedDanmakuMap = {};
let repeatedDanmakuUuidMap = {};
// 存储弹幕文本到首次出现的DOM元素的映射
let repeatedDanmakuDomMap = {};
// 存储弹幕文本的重复次数
let repeatedDanmakuCountMap = {};
// 存储弹幕DOM元素的原始fontSize
let repeatedDanmakuOriginalFontSizeMap = new WeakMap();
// 清理定时器
let repeatedDanmakuCleanupTimer = null;
let repeatedDanmakuDomHook = null;

if (isRemoveRepeatedDanmaku) removeRepeatedDanmaku();

function initPkg_Shield_RemoveRepeatedDanmaku() {
  const shieldTool = document.getElementsByClassName("FilterKeywords")[0];
  shieldTool.insertAdjacentHTML(
    "afterbegin",
    `<div class="FilterSwitchStatus" id="ex-removeRepeatedDanmaku">
    <h3>屏蔽重复弹幕</h3>
    <div>
      <span class="FilterSwitchStatus-status ${isRemoveRepeatedDanmaku ? "is-checked" : "is-noChecked"}">${isRemoveRepeatedDanmaku ? "已开启" : "未开启"}</span>
      <span class="FilterSwitchStatus-switch ${isRemoveRepeatedDanmaku ? "is-checked" : "is-noChecked"}">
        <span class="FilterSwitchStatus-switch-inner"></span>
      </span>
    </div>
  </div>
  <p class="FilterKeywords-intelligentText" style="display: flex; align-items: center;justify-content: space-between;">
    <span>
      <input type="number" id="ex-repeatedDanmakuSeconds" min="1" max="300" value="${repeatedDanmakuSeconds}" style="width: 38px; height: 14px; text-align: center;" />
      <span>秒内重复的弹幕只显示一次</span>
    </span>
    <label style="margin-left: 10px;display: inline-flex; align-items: center;">
      <input type="checkbox" id="ex-enlargeDanmaku" ${isEnlargeDanmaku ? "checked" : ""} style="margin-right: 4px;" />
      放大重复弹幕
    </label>
  </p>`
  );

  const dom = document.getElementById("ex-removeRepeatedDanmaku");
  const statusSpan = dom.querySelector(".FilterSwitchStatus-status");
  const switchSpan = dom.querySelector(".FilterSwitchStatus-switch");
  const secondsInput = document.getElementById("ex-repeatedDanmakuSeconds");
  const enlargeCheckbox = document.getElementById("ex-enlargeDanmaku");

  // 阻止输入框和checkbox点击事件冒泡
  secondsInput.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  enlargeCheckbox.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 输入框值改变事件
  secondsInput.addEventListener("input", () => {
    let value = parseInt(secondsInput.value);
    if (isNaN(value) || value < 1) {
      value = 1;
      secondsInput.value = 1;
    } else if (value > 300) {
      value = 300;
      secondsInput.value = 300;
    }
    repeatedDanmakuSeconds = value;
    setLocalRepeatedDanmakuSeconds(value);

    // 如果功能已开启，需要重启以应用新设置
    if (isRemoveRepeatedDanmaku) {
      if (repeatedDanmakuDomHook) {
        repeatedDanmakuDomHook.closeHook();
        repeatedDanmakuDomHook = null;
      }
      stopRepeatedDanmakuCleanupTimer();
      removeRepeatedDanmaku();
    }
  });

  // checkbox改变事件
  enlargeCheckbox.addEventListener("change", () => {
    isEnlargeDanmaku = enlargeCheckbox.checked;
    setLocalIsEnlargeDanmaku(isEnlargeDanmaku);
  });

  dom.addEventListener("click", () => {
    isRemoveRepeatedDanmaku = !isRemoveRepeatedDanmaku;
    if (isRemoveRepeatedDanmaku) {
      removeRepeatedDanmaku();
      statusSpan.className = statusSpan.className.replace("is-noChecked", "is-checked");
      statusSpan.textContent = "已开启";
      switchSpan.className = switchSpan.className.replace("is-noChecked", "is-checked");
    } else {
      if (repeatedDanmakuDomHook) {
        repeatedDanmakuDomHook.closeHook();
        repeatedDanmakuDomHook = null;
      }
      stopRepeatedDanmakuCleanupTimer();
      StyleHook_remove("Ex_Style_RemoveRepeatedDanmaku");
      StyleHook_remove("Ex_Style_RemoveRepeatedDanmaku_Count");
      statusSpan.className = statusSpan.className.replace("is-checked", "is-noChecked");
      statusSpan.textContent = "未开启";
      switchSpan.className = switchSpan.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveRepeatedDanmaku();
  });
}

function initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook() {
  scriptHook({
    url: "/firstqueue",
    callback: (content) => {
      let newContent = content;
      // 给弹幕飘屏添加属性
      newContent = newContent.replace(`e.display=new e.renderer(e);`, `e.display=new e.renderer(e);e.display.raw.comment=e;`);
      return newContent;
    }
  });
}

function removeRepeatedDanmaku() {
  // 添加计数显示和动画的样式
  StyleHook_set(
    "Ex_Style_RemoveRepeatedDanmaku_Count",
    `
    /* 弹幕计数显示样式 */
    [data-repeat-count]::before {
      content: "x" attr(data-repeat-count);
      font-weight: bold;
      display: inline-block;
      position: absolute;
      right: -18px;
      bottom: 0;
      font-size: 16px;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      color: inherit;
    }
    
    /* 计数跳动动画 */
    @keyframes danmaku-combo-bounce {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    
    /* 应用动画的类 */
    .danmaku-combo-animation::before {
      animation: danmaku-combo-bounce 0.2s ease-out;
    }
    `
  );

  let timer = setInterval(() => {
    const dom = document.querySelector(".danmu-fbb2a3");
    if (dom) {
      clearInterval(timer);
      // 开启定期清理定时器
      startRepeatedDanmakuCleanupTimer();

      repeatedDanmakuDomHook = new DomHook(".danmu-fbb2a3", false, (m) => {
        if (m.length <= 0) return;
        if (!isRemoveRepeatedDanmaku) return;
        if (m[0].addedNodes.length <= 0 && m[0].removedNodes.length > 0) {
          const removedDom = m[0].removedNodes[0];
          const uuid = removedDom.comment.uuid;
          const endTime = removedDom.comment.startTime + removedDom.comment.duration;
          const now = Date.now();
          if (now > endTime) return;
          // 存储过期时间戳
          repeatedDanmakuUuidMap[uuid] = now + repeatedDanmakuSeconds * 1000;

          // 清理与该弹幕相关的DOM映射，防止内存泄露
          const danmakuText = removedDom.textContent ? removedDom.textContent.trim() : "";
          if (danmakuText && repeatedDanmakuDomMap[danmakuText] === removedDom) {
            // 移除DOM引用，避免内存泄露
            delete repeatedDanmakuDomMap[danmakuText];
            delete repeatedDanmakuCountMap[danmakuText];
            // 同时清理过期时间，因为首条弹幕已经被移除了
            delete repeatedDanmakuMap[danmakuText];
          }
          return;
        }

        if (m[0].addedNodes.length <= 0) return;
        const dom = m[0].addedNodes[0];
        if (!dom) return;
        const now = Date.now();
        const uuid = dom.comment.uuid;
        // 检查 UUID 是否存在且未过期
        const uuidExpireTime = repeatedDanmakuUuidMap[uuid];
        if (uuidExpireTime && now <= uuidExpireTime) return;

        const danmakuText = dom.textContent ? dom.textContent.trim() : "";
        if (!danmakuText || danmakuText.length === 0) return;

        // 检查弹幕是否在指定秒数内出现过
        const expireTime = repeatedDanmakuMap[danmakuText];

        if (expireTime && now <= expireTime) {
          // 这是重复弹幕，隐藏它
          dom.className += " repeated-danmaku";

          // 增加重复次数
          repeatedDanmakuCountMap[danmakuText] = (repeatedDanmakuCountMap[danmakuText] || 1) + 1;

          // 如果开启了放大重复弹幕功能，找到首次出现的弹幕DOM并增加fontSize
          if (isEnlargeDanmaku) {
            const firstDom = repeatedDanmakuDomMap[danmakuText];
            if (firstDom && firstDom.parentNode) {
              // 如果还没有保存原始fontSize，先保存
              if (!repeatedDanmakuOriginalFontSizeMap.has(firstDom)) {
                const computedStyle = window.getComputedStyle(firstDom);
                const originalFontSize = computedStyle.fontSize;
                repeatedDanmakuOriginalFontSizeMap.set(firstDom, originalFontSize);
              }

              // 获取原始fontSize的数值
              const originalFontSize = repeatedDanmakuOriginalFontSizeMap.get(firstDom);
              const baseFontSize = parseFloat(originalFontSize);

              // 计算新的fontSize：每多一条重复就+2，最大40
              const repeatCount = repeatedDanmakuCountMap[danmakuText];
              const newFontSize = Math.min(baseFontSize + (repeatCount - 1) * 2, 40);
              firstDom.style.fontSize = newFontSize + "px";

              // 更新计数显示
              firstDom.setAttribute("data-repeat-count", repeatCount);

              // 触发跳动动画
              firstDom.classList.remove("danmaku-combo-animation");
              // 强制重排以重新触发动画
              void firstDom.offsetWidth;
              firstDom.classList.add("danmaku-combo-animation");
            } else if (!firstDom || !firstDom.parentNode) {
              // 如果首条弹幕的DOM已经不存在了，清理相关数据，防止内存泄露
              delete repeatedDanmakuDomMap[danmakuText];
              delete repeatedDanmakuCountMap[danmakuText];
            }
          }
        } else {
          // 首次出现的弹幕
          repeatedDanmakuMap[danmakuText] = now + repeatedDanmakuSeconds * 1000;
          repeatedDanmakuDomMap[danmakuText] = dom;
          repeatedDanmakuCountMap[danmakuText] = 1;
        }
      });
    }
  }, 1000);
}

// 定期清理过期的弹幕记录
function cleanupExpiredRepeatedDanmaku() {
  const now = Date.now();
  // 删除过期的条目，清理Map防止内存泄露
  for (const [key, expireTime] of Object.entries(repeatedDanmakuMap)) {
    if (expireTime <= now) {
      delete repeatedDanmakuMap[key];
      // 同时清理相关的DOM映射和计数，防止内存泄露
      // 不恢复fontSize，让弹幕保持放大的效果
      delete repeatedDanmakuDomMap[key];
      delete repeatedDanmakuCountMap[key];
    }
  }
  // 清理过期的 UUID 记录
  for (const [uuid, expireTime] of Object.entries(repeatedDanmakuUuidMap)) {
    if (expireTime <= now) {
      delete repeatedDanmakuUuidMap[uuid];
    }
  }
}

// 启动清理定时器
function startRepeatedDanmakuCleanupTimer() {
  if (repeatedDanmakuCleanupTimer) return; // 避免重复启动
  repeatedDanmakuCleanupTimer = setInterval(cleanupExpiredRepeatedDanmaku, 20000);
}

// 停止清理定时器
function stopRepeatedDanmakuCleanupTimer() {
  if (repeatedDanmakuCleanupTimer) {
    clearInterval(repeatedDanmakuCleanupTimer);
    repeatedDanmakuCleanupTimer = null;
  }
  // 清空对象释放内存
  repeatedDanmakuMap = {};
  repeatedDanmakuUuidMap = {};
  repeatedDanmakuDomMap = {};
  repeatedDanmakuCountMap = {};
}

function saveRemoveRepeatedDanmaku() {
  setLocalIsRemoveRepeatedDanmaku(isRemoveRepeatedDanmaku);
}

function getLocalIsRemoveRepeatedDanmaku() {
  return localStorage.getItem("ExSave_isRemoveRepeatedDanmaku") === "1";
}

function setLocalIsRemoveRepeatedDanmaku(value) {
  localStorage.setItem("ExSave_isRemoveRepeatedDanmaku", value ? "1" : "0");
}

function getLocalRepeatedDanmakuSeconds() {
  const saved = localStorage.getItem("ExSave_repeatedDanmakuSeconds");
  if (saved) {
    const value = parseInt(saved);
    if (!isNaN(value) && value >= 1 && value <= 60) {
      return value;
    }
  }
  return 5; // 默认5秒
}

function setLocalRepeatedDanmakuSeconds(value) {
  localStorage.setItem("ExSave_repeatedDanmakuSeconds", value.toString());
}

function getLocalIsEnlargeDanmaku() {
  const saved = localStorage.getItem("ExSave_isEnlargeDanmaku");
  if (saved === null) {
    return false; // 默认不开启放大功能
  }
  return saved === "1";
}

function setLocalIsEnlargeDanmaku(value) {
  localStorage.setItem("ExSave_isEnlargeDanmaku", value ? "1" : "0");
}
