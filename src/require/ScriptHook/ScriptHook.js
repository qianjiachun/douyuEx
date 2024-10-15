/**
 * 拦截并修改特定 Script 标签的内容
 * 数组结构：
 * [
 *  { url: "", callback: (content: string) => string }
 * ]
 */
let scriptHookCallbackList = [];

function initScriptHook() {
  new DomHook("head", true, function (mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName !== "SCRIPT") return;
        const src = node.getAttribute("src");
        if (!src) return;
        const callback = scriptHookCallbackList.find((item) => src.includes(item.url));
        if (!callback) return;
        fetch(node.src)
          .then((response) => response.text())
          .then((content) => {
            const modifiedContent = callback.callback(content);
            const newScript = document.createElement("script");
            newScript.textContent = modifiedContent;
            node.parentNode.replaceChild(newScript, node);
          })
          .catch((err) => console.error("Error loading script:", err));
      });
    });
  });
}

function scriptHook(callback) {
  scriptHookCallbackList.push(callback);
}