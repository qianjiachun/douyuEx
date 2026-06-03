/**
 * 拦截并修改特定 Script 标签的内容
 * 数组结构：
 * [
 *  { url: "", callback: (content: string) => string },
 *  { inline: true, callback: (content: string) => string }
 * ]
 * 支持多个 callback，会按注册顺序依次执行，前一个 callback 的输出作为下一个 callback 的输入
 */
let scriptHookCallbackList = [];

function applyInlineScriptHooks(node) {
  if (node.tagName !== "SCRIPT" || node.src || !node.textContent) {
    return node;
  }

  const inlineCallbacks = scriptHookCallbackList.filter((item) => item.inline);
  if (inlineCallbacks.length === 0) {
    return node;
  }

  let content = node.textContent;
  for (let i = 0; i < inlineCallbacks.length; i++) {
    content = inlineCallbacks[i].callback(content);
  }

  if (content !== node.textContent) {
    node.textContent = content;
  }

  return node;
}

function handleExternalScript(node, insertFn, targetNode) {
  const src = node.src;
  const callbacks = [];

  for (let k = 0; k < scriptHookCallbackList.length; k++) {
    const item = scriptHookCallbackList[k];
    if (!item.inline && src.includes(item.url)) {
      callbacks.push(item);
    }
  }

  if (callbacks.length === 0) {
    return false;
  }

  fetchAndReplace(src, callbacks, targetNode);
  return true;
}

function initScriptHook() {
  const originalAppendChild = Node.prototype.appendChild;
  const originalInsertBefore = Node.prototype.insertBefore;

  Node.prototype.appendChild = function (node) {
    if (node.tagName === "SCRIPT") {
      if (node.src && handleExternalScript(node, originalAppendChild, this)) {
        return document.createDocumentFragment();
      }
      node = applyInlineScriptHooks(node);
    }

    return originalAppendChild.call(this, node);
  };

  Node.prototype.insertBefore = function (node, referenceNode) {
    if (node.tagName === "SCRIPT") {
      if (node.src && handleExternalScript(node, originalInsertBefore, this)) {
        return document.createDocumentFragment();
      }
      node = applyInlineScriptHooks(node);
    }

    return originalInsertBefore.call(this, node, referenceNode);
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

      for (let m = 0; m < callbacks.length; m++) {
        modifiedContent = callbacks[m].callback(modifiedContent);
      }

      const newScript = document.createElement("script");
      newScript.type = "text/javascript";
      newScript.textContent = modifiedContent;
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
