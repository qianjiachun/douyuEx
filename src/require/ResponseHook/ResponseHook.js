let responseHookCallbackList = [];  
let requestBodyMap = new Map(); // 使用Map来存储请求体和XMLHttpRequest实例的关联  
  
function initResponseHook() {  
  // 保存原始的send方法  
  const originalSend = unsafeWindow.XMLHttpRequest.prototype.send;  
  
  // 重写send方法以捕获请求体  
  unsafeWindow.XMLHttpRequest.prototype.send = function(body) {  
    // 将请求体与当前XMLHttpRequest实例关联起来  
    requestBodyMap.set(this, body);  
  
    // 调用原始的send方法  
    originalSend.call(this, body);  
  
    // 注意：不要在这里清除请求体，因为响应可能还没有返回  
  };  
  
  // 重写responseText的getter以处理响应  
  let accessor = Object.getOwnPropertyDescriptor(unsafeWindow.XMLHttpRequest.prototype, 'responseText');  
  Object.defineProperty(unsafeWindow.XMLHttpRequest.prototype, 'responseText', {  
    get: function() {  
      let text = accessor.get.call(this);  
      // 从Map中获取当前XMLHttpRequest实例对应的请求体  
      let requestBody = requestBodyMap.get(this);  
  
      // 调用回调函数处理响应，并传入请求体  
      for (const callback of responseHookCallbackList) {  
        let newText = callback(this.responseURL, text, requestBody);  
        if (newText !== undefined) {  
          text = newText;  
        }  
      }  
  
      // 清除Map中对应的请求体（可选，取决于你是否需要保留这些信息）  
      requestBodyMap.delete(this);  
  
      return text;  
    },  
    configurable: true  
  });  
}  
  
/**  
 * 对网页上的请求进行hook  
 * @param {(url: string, text: string, body: any)} callback - 回调函数，接收URL、响应文本和请求体作为参数  
 */  
function responseHook(callback) {  
  responseHookCallbackList.push(callback);  
}  