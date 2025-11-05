let isRemoveRepeatedDanmaku = getLocalIsRemoveRepeatedDanmaku();
// 对象存储弹幕文本和过期时间戳
let repeatedDanmakuMap = {};
let repeatedDanmakuUuidMap = {};
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
  <p class="FilterKeywords-intelligentText">五秒内重复的弹幕飘屏只显示一次</p>`
  );

  const dom = document.getElementById("ex-removeRepeatedDanmaku");
  const statusSpan = dom.querySelector(".FilterSwitchStatus-status");
  const switchSpan = dom.querySelector(".FilterSwitchStatus-switch");
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
      statusSpan.className = statusSpan.className.replace("is-checked", "is-noChecked");
      statusSpan.textContent = "未开启";
      switchSpan.className = switchSpan.className.replace("is-checked", "is-noChecked");
    }
    saveRemoveRepeatedDanmaku();
  });
}

function removeRepeatedDanmaku() {
  let timer = setInterval(() => {
    const dom = document.querySelector(".danmu-6e95c1");
    if (dom) {
      clearInterval(timer);
      // 开启定期清理定时器
      startRepeatedDanmakuCleanupTimer();

      repeatedDanmakuDomHook = new DomHook(".danmu-6e95c1", false, (m) => {
        if (m.length <= 0) return;
        if (!isRemoveRepeatedDanmaku) return;
        if (m[0].addedNodes.length <= 0 && m[0].removedNodes.length > 0) {
          const removedDom = m[0].removedNodes[0];
          const uuid = removedDom.comment.uuid;
          const endTime = removedDom.comment.startTime + removedDom.comment.duration;
          const now = Date.now();
          if (now > endTime) return;
          // 存储过期时间戳（5秒后过期）
          repeatedDanmakuUuidMap[uuid] = now + 5000;
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
        
        const danmakuText = dom.innerText ? dom.innerText.trim() : "";
        if (!danmakuText || danmakuText.length === 0) return;

        // 检查弹幕是否在5秒内出现过
        const expireTime = repeatedDanmakuMap[danmakuText];

        if (expireTime && now <= expireTime) {
          dom.className += " repeated-danmaku";
        } else {
          repeatedDanmakuMap[danmakuText] = now + 5000;
        }
      });
    }
  }, 1000);
}

// 定期清理过期的弹幕记录
function cleanupExpiredRepeatedDanmaku() {
  const now = Date.now();
  // 删除过期的条目
  for (const [key, expireTime] of Object.entries(repeatedDanmakuMap)) {
    if (expireTime <= now) {
      delete repeatedDanmakuMap[key];
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
