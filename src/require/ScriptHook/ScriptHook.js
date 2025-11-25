/**
 * 拦截并修改特定 Script 标签的内容
 * 数组结构：
 * [
 *  { url: "", callback: (content: string) => string }
 * ]
 * 支持多个 callback，会按注册顺序依次执行，前一个 callback 的输出作为下一个 callback 的输入
 */
let scriptHookCallbackList = [];

function initScriptHook() {
  new DomHook("head", true, function (mutations) {
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      const addedNodes = mutation.addedNodes || [];
      for (let j = 0; j < addedNodes.length; j++) {
        const node = addedNodes[j];
        if (node.tagName !== "SCRIPT") continue;
        const src = node.getAttribute("src");
        if (!src) continue;
        // 找到所有匹配的 callback
        const callbacks = [];
        for (let k = 0; k < scriptHookCallbackList.length; k++) {
          const item = scriptHookCallbackList[k];
          if (src.includes(item.url)) callbacks.push(item);
        }
        if (callbacks.length === 0) continue;
        fetch(node.src)
          .then((response) => response.text())
          .then((content) => {
            // 依次执行所有匹配的 callback，前一个的输出作为下一个的输入
            let modifiedContent = content;
            for (let m = 0; m < callbacks.length; m++) {
              const callback = callbacks[m];
              modifiedContent = callback.callback(modifiedContent);
            }
            const newScript = document.createElement("script");
            newScript.textContent = modifiedContent;
            node.parentNode.replaceChild(newScript, node);
          })
          .catch((err) => console.error("Error loading script:", err));
      }
    }
  });
}

function scriptHook(callback) {
  scriptHookCallbackList.push(callback);
}