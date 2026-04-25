export function initPkg_Reset() {
  GM_registerMenuCommand("重置所有设置", () => {
    void Reset_run();
  });
}

function Reset_isPluginLocalStorageKey(key) {
  return (
    key.startsWith("ExSave_") ||
    key.startsWith("Ex_") ||
    key === "Ex_isJoysound" ||
    key === "freetimed"
  );
}

function Reset_clearPluginLocalStorage() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && Reset_isPluginLocalStorageKey(k)) {
        keys.push(k);
      }
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch (e) {}
}

async function Reset_clearGMStorage() {
  if (typeof GM_deleteValue !== "function") return;
  let keys = [];
  try {
    if (typeof GM_listValues === "function") {
      const ret = GM_listValues();
      keys = ret && typeof ret.then === "function" ? await ret : ret || [];
    } else if (typeof GM !== "undefined" && GM.listValues) {
      keys = await GM.listValues();
    }
  } catch (e) {
    return;
  }
  if (!Array.isArray(keys)) {
    keys = [];
  }
  for (let i = 0; i < keys.length; i++) {
    try {
      GM_deleteValue(keys[i]);
    } catch (e2) {}
  }
}

async function Reset_run() {
  if (
    !confirm(
      "确定要清空 DouyuEx 的所有本地设置吗？\n\n包括：油猴存储(GM)与本站 localStorage 中的插件数据。\n此操作不可恢复。"
    )
  ) {
    return;
  }
  await Reset_clearGMStorage();
  Reset_clearPluginLocalStorage();
  alert("已清空。请刷新斗鱼页面以使界面与功能恢复默认状态。");
}
