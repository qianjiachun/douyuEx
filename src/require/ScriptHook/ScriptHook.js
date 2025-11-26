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
  const originalAppendChild = Node.prototype.appendChild;

  // 覆盖原生的 appendChild 方法
  Node.prototype.appendChild = function (node) {
    // 1. 检查节点是否是 SCRIPT 标签
    if (node.tagName === "SCRIPT" && node.src) {
      const src = node.src;

      // 找到所有匹配的 callback
      const callbacks = [];
      for (let k = 0; k < scriptHookCallbackList.length; k++) {
        const item = scriptHookCallbackList[k];
        // 检查是否包含目标 URL
        if (src.includes(item.url)) callbacks.push(item);
      }

      if (callbacks.length > 0) {
        fetchAndReplace(src, callbacks, this);
        // 返回一个空节点，防止网站报错，且不插入原脚本
        return document.createDocumentFragment();
      }
    }

    // 如果不是目标脚本，或者没有 src (例如内联脚本或样式)，则执行原始方法
    return originalAppendChild.call(this, node);
  };
}

/**
 * 获取源码、修改并注入的函数
 * @param {string} url - 脚本URL
 * @param {Array} callbacks - 匹配到的回调函数列表
 * @param {Node} targetNode - 原始脚本应该插入的父节点
 */
function fetchAndReplace(url, callbacks, targetNode) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function (response) {
      let modifiedContent = response.responseText;

      // 依次执行所有匹配的 callback
      for (let m = 0; m < callbacks.length; m++) {
        const callback = callbacks[m];
        modifiedContent = callback.callback(modifiedContent);
      }

      // 创建新的可执行脚本
      const newScript = document.createElement("script");
      newScript.type = "text/javascript";
      newScript.textContent = modifiedContent;

      // 注入回原始目标节点
      targetNode.appendChild(newScript);
    },
    onerror: function (err) {
      console.error("Error loading script via GM_xmlhttpRequest:", err);
    }
  });
}

function scriptHook(callback) {
  scriptHookCallbackList.push(callback);
}