// 全局变量及公共函数
var exTimer = 0; // 总时钟句柄
var url = document.getElementsByTagName('html')[0].innerHTML;
var urlLen = ("$ROOM.room_id =").length;
var ridPos = url.indexOf('$ROOM.room_id =');
var rid = "";
if (ridPos > 0) {
	rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
	if (rid) rid = rid.trim();
} else {
	rid = getStrMiddle(url, `roomID:`, `,`);
	if (rid) {
		rid = rid.trim();
	} else {
		let canonicalLink = document.querySelector(`link[rel="canonical"]`);
		if (canonicalLink) {
			let href = canonicalLink.getAttribute(`href`);
			rid = href.split('/').pop().trim();
		}
	}
}

url = null;	
urlLen = null;
ridPos = null;
var my_uid = getCookieValue("acf_uid"); // 自己的uid
var myName = "";
var dyToken = getToken();
// 功能条的显示定时器
var exPanelTimer = null;

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function formatSeconds(value) {
	let secondTime = parseInt(value);
	let minuteTime = 0;
	let hourTime = 0;
	if (secondTime > 60) {
		minuteTime = parseInt(secondTime / 60);
		secondTime = parseInt(secondTime % 60);
		if (minuteTime > 60) {
			hourTime = parseInt(minuteTime / 60);
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	let result = "" + parseInt(secondTime) + "秒";
	if (minuteTime > 0) {
		result = "" + parseInt(minuteTime) + "分" + result;
	}
	if (hourTime > 0) {
		result = "" + parseInt(hourTime) + "小时" + result;
	}
	return result;
}

function formatSeconds2(value) {
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) {
		minuteTime = parseInt(secondTime / 60);
		secondTime = parseInt(secondTime % 60);
		if (minuteTime > 60) {
			hourTime = parseInt(minuteTime / 60);
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result ="" +(parseInt(secondTime) < 10? "0" + parseInt(secondTime): parseInt(secondTime));

	// if (minuteTime > 0) {
		result ="" + (parseInt(minuteTime) < 10? "0" + parseInt(minuteTime) : parseInt(minuteTime)) + ":" + result;
	// }
	// if (hourTime > 0) {
		result ="" + (parseInt(hourTime) < 10 ? "0" + parseInt(hourTime): parseInt(hourTime)) +":" + result;
	// }
	return result;
}

async function verifyFans(room_id, level) {
	return true; // 2020年12月22日18:28:18
	let ret = false;
	let doc = await fetch('https://www.douyu.com/member/cp/getFansBadgeList',{
		method: 'GET',
		mode: 'no-cors',
		cache: 'default',
		credentials: 'include',
	}).then(res => {
		return res.text();
	}).catch(err => {
		console.log("请求失败!", err);
	})
	doc = (new DOMParser()).parseFromString(doc, 'text/html');
	let a = doc.getElementsByClassName("fans-badge-list")[0].lastElementChild;
	let n = a.children.length;
	for (let i = 0; i < n; i++) {
		let rid = a.children[i].getAttribute("data-fans-room");
		let rlv = a.children[i].getAttribute("data-fans-level");
		if (rid == room_id && rlv >= level) {
			ret = true;
			break;
		} else {
			ret = false;
		}
	}
	return ret;
}

function getStrMiddle(str, before, after) {
	let m = str.match(new RegExp(before + '(.*?)' + after));
	return m ? m[1] : false;
}

function getToken() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "acf_uid=", ";") + "_" + getStrMiddle(cookie, "acf_biz=", ";") + "_" + getStrMiddle(cookie, "acf_stk=", ";") + "_" + getStrMiddle(cookie, "acf_ct=", ";") + "_" + getStrMiddle(cookie, "acf_ltkid=", ";");
	let ret = getCookieValue("acf_uid") + "_" + getCookieValue("acf_biz") + "_" + getCookieValue("acf_stk") + "_" + getCookieValue("acf_ct") + "_" + getCookieValue("acf_ltkid");
	return ret;
}

function getDyDid() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "dy_did=", ";");
	let ret = getCookieValue("dy_did");
	return ret;
}

function setCookie(cookiename, value){
	let exp = new Date();
	exp.setTime(exp.getTime() + 3*60*60*1000);
	document.cookie = cookiename + "="+ escape (value) + "; path=/; expires=" + exp.toGMTString();
}

function getCookieValue(name){
	let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}
function getCCN() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "acf_ccn=", ";");
	let ret = getCookieValue("acf_ccn");
	if (ret == null) {
		setCookie("acf_ccn", "1");
		ret = "1";
	}
	return ret;
}

function getCTN() {
	// let cookie = document.cookie;
	// let ret = getStrMiddle(cookie, "acf_ccn=", ";");
	let ret = getCookieValue("acf_ctn");
	if (ret == null) {
		setCookie("acf_ctn", "1");
		ret = "1";
	}
	return ret;
}

function getCSRF() {
	let ret = getCookieValue("cvl_csrf_token");
	if (ret == null) {
		setCookie("cvl_csrf_token", "1");
		ret = "1";
	}
	return ret;
}

function getUID() {
	let ret = getCookieValue("acf_uid");
	return ret;
}

function showMessage(msg, type="success", options) {
	// type: success[green] error[red] warning[orange] info[blue]
	let option = {
		text: msg,
		type: type,
		position: 'bottomLeft',
		...options
	}
	new NoticeJs(option).show();
}

function openPage(url, b=true) {
	GM_openInTab(url, {
		active: b
	});
}

function closePage() {
	if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
		window.location.href = "about:blank";
		window.close();
	} else {
		window.opener = null;
		window.open("", "_self");
		window.close();
	}
}

function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	if (window.location.hash.indexOf("?") < 0) {
		return null;
	}
	let r = window.location.hash.split("?")[1].match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

function dateFormat(fmt, date) {
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	};
	fmt = fmt.replace(/(y+)/, (match, group) => {
		return (date.getFullYear() + "").slice(4 - group.length);
	});
	for (let k in o) {
		fmt = fmt.replace(new RegExp("(" + k + ")"), (match, group) => {
			const val = o[k];
			return group.length === 1 ? val : val.padStart(group.length, "0");
		});
	}
	return fmt;
}

function timeago(old) {
	let returnText = "";
	const nowDate = new Date().getTime(); //当前时间
	const setDate = new Date(old).getTime();
	const times = Math.floor((nowDate - setDate) / 1000);
	if (times > 60 * 60 * 24 * 365) {
		returnText = Math.floor(times / (60 * 60 * 24 * 365)) + "年前";
	} else if (times > 60 * 60 * 24 * 30) {
		returnText = Math.floor(times / (60 * 60 * 24 * 30)) + "个月前";
	} else if (times > 60 * 60 * 24) {
		returnText = Math.floor(times / (60 * 60 * 24)) + "天前";
	} else if (times > 60 * 60) {
		returnText = Math.floor(times / (60 * 60)) + "小时前";
	} else if (times >= 60) {
		returnText = Math.floor(times / 60) + "分钟前";
	} else {
		returnText = "刚刚";
	}
	return returnText;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function isRid(str) {
	if (/^[0-9]+$/.test(str)) {
		return true;
	} else {
		return false;
	}
}
function getAvailableSheet(index) {
    let ret = -1;
    for (let i = index; i < document.styleSheets.length - index; i++) {
        if (document.styleSheets[i].href == null) {
            ret = i;
            break;
        } else {
            ret = -1;
        }
    }
    return ret;
}

function showMessageWindow(title, content, callback){
    if(window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) {
            var notice_ = new Notification(title, { body: content });
            notice_.onclick = function() {
                callback();
            }
        });
    }   
}

function getUserName() {
	return new Promise(resovle => {
		fetch('https://www.douyu.com/member/cp',{
			method: 'GET',
			mode: 'no-cors',
			credentials: 'include',
		}).then(res => {
			return res.text();
		}).then(txt => {
			txt = (new DOMParser()).parseFromString(txt, 'text/html');
			let ret = txt.getElementsByClassName("uname_con")[0].title;
			resovle(ret);
		}).catch(err => {
			console.error('请求失败', err);
		})
	})
}

function getTextareaPosition(element) {
	// 如果元素是textarea，直接使用selectionStart获取位置
	if (element.tagName === 'TEXTAREA') {
			return element.selectionStart;
	}
	// 否则处理为contenteditable元素
	let cursorPos = 0;
	// 兼容旧版IE
	if (document.selection) {
			const selectRange = document.selection.createRange();
			const textRange = element.createTextRange();
			const preCaretRange = textRange.duplicate();
			preCaretRange.moveToBookmark(selectRange.getBookmark());
			preCaretRange.setEndPoint('EndToEnd', textRange);
			cursorPos = preCaretRange.text.length;
	} 
	// 现代浏览器
	else if (window.getSelection) {
			const selection = window.getSelection();
			if (selection.rangeCount > 0) {
					const range = selection.getRangeAt(0).cloneRange();
					range.selectNodeContents(element);
					range.setEnd(selection.rangeCount > 0 ? selection.getRangeAt(0).endContainer : element, 
											selection.rangeCount > 0 ? selection.getRangeAt(0).endOffset : 0);
					cursorPos = range.toString().length;
			}
	}
	return cursorPos;
}

function showExRightPanel(name) {
	let panels = [
		{
			name: "弹幕发送小助手",
			className: "bloop",
		},
		{
			name: "扩展功能",
			className: "extool",
		},
		{
			name: "直播间工具",
			className: "livetool",
		},
		{
			name: "全站抽奖信息",
			className: "exlottery"
		},
		{
			name: "弹幕小尾巴",
			className: "ChatToolBar-DanmakuTail-Panel"
		},
	];
	for (let i = 0; i < panels.length; i++) {
		let item = panels[i];
		let dom = document.getElementsByClassName(item.className)[0];
		if (dom) {
			if (name === item.name) {
				dom.style.display = dom.style.display !== "block" ? "block" : "none";
			} else {
				dom.style.display = "none";
			}
		}
	}
}

function getTimeDiff(t1, t2) {
	if (t1 < t2) {
		return -1;
	} else{
		let ret = "";
		let date3 = Math.abs(t1 - t2);
		let days = Math.floor(date3/(24*3600*1000));
		ret += days > 0 ? days + "天" : "";
		let leave1 = date3%(24*3600*1000);
		let hours = Math.floor(leave1/(3600*1000));
		ret += hours > 0 ? hours + "时" : "";
		let leave2 = leave1%(3600*1000);
		let minutes = Math.floor(leave2/(60*1000));
		ret += minutes > 0 ? minutes + "分" : "";
		let leave3 = leave2%(60*1000);
		let seconds = Math.round(leave3/1000);
		ret += seconds > 0 ? seconds + "秒" : "";
		return ret;
	}
}

function debounce(func, wait) {
    let timer;
    return function() {
      let context = this;
      let args = arguments;
      if (timer) clearTimeout(timer);
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if (callNow) func.apply(context, args);
    }
}

function exportJsonToExcel(header, body, fileName = 'download.xlsx') {
    let aoa = [];
    aoa.push(header, ...body);
    let sheet = XLSX.utils.aoa_to_sheet(aoa);
    openDownloadDialog(sheet2blob(sheet), fileName);
}
 
function openDownloadDialog(url, saveName)
{
	if(typeof url == 'object' && url instanceof Blob)
	{
		url = URL.createObjectURL(url); // 创建blob地址
	}
	var aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	var event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else
	{
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}
function sheet2blob(sheet, sheetName) {
	sheetName = sheetName || 'sheet1';
	var workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	var wbout = XLSX.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		if (typeof s !== 'string') return new ArrayBuffer(0);
		var length = s.length;
		var buf = new ArrayBuffer(length);
		var view = new Uint8Array(buf);
		for (var i = 0; i < length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}

function downloadFile(name, data) {
    var urlObject = unsafeWindow.URL || unsafeWindow.webkitURL || unsafeWindow;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;

    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, unsafeWindow, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(ev);
} 

function timeText2Ms(text) {
	let ret = 0;
	let arr = text.split(":"), length = arr.length;
	if (length === 1) {
		ret = Number(arr[0]);
	} else if (length === 2) {
		ret = Number(arr[0]) * 60 + Number(arr[1]);
	} else if (length === 3) {
		ret = Number(arr[0]) * 3600 + Number(arr[1]) * 60 + Number(arr[2]);
	}
	return ret * 1000;
}

function resizeWindow() {
  const resizeEvent = new Event("resize");
  window.dispatchEvent(resizeEvent);
}

function isValidImageFile(filename) {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico", ".tiff", ".tif"];
  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  return validExtensions.includes(ext);
}

function getCsrfToken() {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://www.douyu.com/japi/carnival/nc/common/generateCsrf',
      headers: {
        "Content-Type": "application/json",
        "Cookie": document.cookie,
      },
      anonymous: false,
      withCredentials: true,
      onload: function(response) {
        // 获取 Set-Cookie
        const setCookie = response.responseHeaders.match(/set-cookie:[^\n\r]+/gi);
        // 从set-cookie中获取csrfToken
        let csrfToken = "";
        if (setCookie) {
          for (let i = 0, len = setCookie.length; i < len; i++) {
            const line = setCookie[i];
            const match = line.match(/cvl_csrf_token=([^;]+)/);
            if (match) {
              csrfToken = match[1]; // 返回提取到的 token
              break;
            }
          }
        }
        resolve(csrfToken);
      },
      onerror: function(err) {
        resolve("");
      }
    });
  });
}

function _rawQuery(selector, isList, rethrow) {
    if (typeof selector !== 'string') {
        if (rethrow) throw new Error(`Invalid selector: "${selector}"`);
        return isList ? [] : null;
    }
    let length = selector.length;
    if (length === 0) {
        if (rethrow) throw new Error(`Invalid selector: "${selector}"`);
        return isList ? [] : null;
    }
    let firstCode = selector.charCodeAt(0);
    if (firstCode <= 32 || selector.charCodeAt(length - 1) <= 32) {
        selector = selector.trim();
        length = selector.length;
        if (length === 0) {
            if (rethrow) throw new Error(`Invalid selector: "${selector}"`);
            return isList ? [] : null;
        }
        firstCode = selector.charCodeAt(0);
    }
    if (length > 1 && firstCode === 35) {
        const value = selector.slice(1);
        if (!/[\s>+~,.#:()[\]\\]/.test(value)) {
            const element = document.getElementById(value);
            return isList ? (element ? [element] : []) : element;
        }
    } else if (length > 1 && firstCode === 46) {
        const value = selector.slice(1);
        if (!/[\s>+~,.#:()[\]\\]/.test(value)) {
            const list = document.getElementsByClassName(value);
            return isList ? list : (list[0] || null);
        }
    } else if (/^[a-zA-Z][\w-]*$/.test(selector)) {
        const list = document.getElementsByTagName(selector);
        return isList ? list : (list[0] || null);
    }
    try {
        return isList ? document.querySelectorAll(selector)
                      : document.querySelector(selector);
    } catch (err) {
        if (rethrow) throw err;
        return isList ? [] : null;
    }
}

function getValidDom(queryList) {
    if (queryList == null) return null;
    if (typeof queryList === 'string') return _rawQuery(queryList);
    const length = queryList.length >>> 0;
    for (let i = 0; i < length; i++) {
        const query = queryList[i];
        if (!query) continue;
        if (typeof query === "string") {
            const dom = _rawQuery(query);
            if (dom) return dom;
        } else if (query.nodeType) {
            return query;
        } else if (typeof query.length === "number" && query[0] && query[0].nodeType) {
            return query[0];
        }
    }
    return null;
}

function getValidDomList(queryList) {
    if (queryList == null) return [];
    if (typeof queryList === 'string') return _rawQuery(queryList, true);
    const length = queryList.length >>> 0;
    for (let i = 0; i < length; i++) {
        const query = queryList[i];
        if (!query) continue;
        if (typeof query === "string") {
            const list = _rawQuery(query, true);
            if (list.length > 0) return list;
        } else if (query.nodeType) {
            return [query];
        } else if (typeof query.length === "number" && query[0] && query[0].nodeType) {
            return query;
        }
    }
    return [];
}

/*
 * gDomObserver - 全局 DOM 观察服务单例：
 *   - 复用单个 MutationObserver 实例观察 DOM 结构变化，避免重复创建观察器；
 *   - 提供 waitForElement(selector, timeout) 方法，返回 Promise，目标元素出现时 resolve，选择器无效或超时则 reject；
 *   - 提供 raceForElement(selectors, timeout) 方法，返回 Promise，最先出现的元素 resolve，选择器数组为空或超时则 reject；
 *   - 使用 Map 统一管理所有等待任务，相同 selector 的调用合并至同一等待组，DOM 变化时批量检查；
 *   - 按需启动观察服务以节省资源，任务全部完成时自动停止。
 */
const gDomObserver = (() => {
    let _observer = null, _rafId = null;
    const _pendingMap = new Map();
    class Task {
        constructor(deadline, resolve, reject) {
            this.deadline = deadline;
            this.resolve = resolve;
            this.reject = reject;
        }
    }
    function _disconnect() {
        if (_pendingMap.size === 0 && _observer) {
            _observer.disconnect();
            _observer = null;
            console.log("DouyuEX gDomObserver: 所有任务完成，停止观察实例");
        }
    }
    function _parseTimeout(timeout) {
        if (timeout == null) return null;
        if (typeof timeout === "number") return timeout >= 0 ? timeout : null;
        if (typeof timeout === "string") {
            const num = parseFloat(timeout);
            if (isNaN(num) || num < 0) return null;
            if (/^\s*\d+(\.\d+)?\s*(s|sec|second|seconds)$/i.test(timeout)) return num * 1000;
            if (/^\s*\d+(\.\d+)?\s*(m|min|minute|minutes)$/i.test(timeout)) return num * 60000;
            return num; // 默认 ms
        }
        return null;
    }
    function _checkElements() {
        if (_rafId) cancelAnimationFrame(_rafId);
        _rafId = requestAnimationFrame(() => {
            const current = performance.now();
            for (const [selector, group] of _pendingMap) {
                const element = _rawQuery(selector);
                for (const task of group.tasks) {
                    if (current >= task.deadline) {
                        console.warn("DouyuEX gDomObserver: 计时到达上限，终止等待任务", selector);
                        task.reject(new Error(`DouyuEX waitForElement: Timeout - "${selector}"`));
                        group.tasks.delete(task);
                        continue;
                    }
                    if (element) {
                        console.log("DouyuEX gDomObserver: 目标元素出现，完成等待任务", element);
                        task.resolve(element);
                        group.tasks.delete(task);
                    }
                }
                if (group.tasks.size === 0) _pendingMap.delete(selector);
            }
            _disconnect();
            _rafId = null;
        });
    }
    return {
        /*
         * 异步等待指定选择器对应的元素出现在 DOM 中：
         *   @description
         *     - 选择器无效时，不创建监听任务，直接以 rejected 状态返回 Promise；
         *     - 若元素已存在，不创建监听任务，直接以 resolved 状态返回 Promise；
         *     - 若元素不存在，则使用 MutationObserver 监听 DOM 变化，元素出现时 resolve，超时或外部中止则 reject；
         *     - 相同 selector 的调用合并至同一等待组，各自持有独立的 Promise 和超时设定；
         *     - 未设置超时或传入 null 的任务将无限等待直到元素出现。
         *   @param {string} selector - CSS 选择器字符串
         *   @param {null|number|string} timeout - 超时时长：
         *     - `null`：永不超时（默认）；
         *     - `number`：毫秒数，0 表示立即超时，负数则永不超时；
         *     - `string`：支持 `ms`、`s`、`m`，例如 `"500ms"`、`"2s"`、`"1m"`，解析为 0 则立即超时，负数或无法解析则永不超时。
         *   @param {null|AbortSignal} signal - 可选的中止信号，触发后以 AbortError 拒绝 Promise
         *   @returns {Promise<Element>} - 目标元素出现时 resolve，选择器无效、超时或外部中止则 reject
         *   @example
         *     const controller = new AbortController();
         *     gDomObserver.waitForElement('#id', 5000, controller.signal) // 等待 5 秒
         *         .then(element => { console.log('元素已出现:', element); })
         *         .catch(error => { console.error('选择器无效、等待超时或已取消:', error); });
         *     // 主动取消：
         *     controller.abort();
         */
        waitForElement(selector, timeout = null, signal = null) {
            if (signal && signal.aborted) {
                console.warn("DouyuEX gDomObserver: 信号已中止，拒绝创建任务", selector);
                return Promise.reject(signal.reason || new DOMException("Aborted", "AbortError"));
            }
            const selectorTrimmed = typeof selector === "string" ? selector.trim() : "";
            let element;
            try {
                element = _rawQuery(selectorTrimmed, false, true);
            } catch (err) {
                console.error("DouyuEX gDomObserver: 非法的选择器，拒绝创建任务", selector, err);
                return Promise.reject(new Error(`DouyuEX waitForElement: Invalid selector - "${selector}", ${err.message}`));
            }
            const existing = _pendingMap.get(selectorTrimmed);
            if (element) {
                if (existing) {
                    console.log("DouyuEX gDomObserver: 目标元素存在，完成已有任务", element);
                    for (const task of existing.tasks) task.resolve(element);
                    _pendingMap.delete(selectorTrimmed);
                    _disconnect();
                } else {
                    console.log("DouyuEX gDomObserver: 目标元素存在，直接返回结果", element);
                }
                return Promise.resolve(element);
            }
            const parsedTimeout = _parseTimeout(timeout), current = performance.now();
            const deadline = parsedTimeout == null ? Infinity : current + parsedTimeout;
            const deadlineLabel = parsedTimeout == null ? "等待不限时长" : `等待时长: ${parsedTimeout}ms`;
            let resolveFn, rejectFn;
            const promise = new Promise((resolve, reject) => { resolveFn = resolve; rejectFn = reject; });
            const task = new Task(deadline, resolveFn, rejectFn);
            if (signal) {
                signal.addEventListener("abort", () => {
                    console.warn("DouyuEX gDomObserver: 收到外部信号，终止等待任务", selectorTrimmed);
                    task.reject(signal.reason || new DOMException("Aborted", "AbortError"));
                    const group = _pendingMap.get(selectorTrimmed);
                    if (!group) return;
                    group.tasks.delete(task);
                    if (group.tasks.size === 0) _pendingMap.delete(selectorTrimmed);
                    _disconnect();
                }, { once: true });
            }
            if (existing) {
                console.log("DouyuEX gDomObserver: 等待元素相同，添加新的任务", selectorTrimmed, deadlineLabel);
                existing.tasks.add(task);
            } else {
                _pendingMap.set(selectorTrimmed, { tasks: new Set([task]) });
                if (!_observer) {
                    const root = document.body || document.documentElement || document;
                    _observer = new MutationObserver(_checkElements);
                    _observer.observe(root, { childList: true, subtree: true });
                    console.log("DouyuEX gDomObserver: 启动观察实例，创建首个任务", selectorTrimmed, deadlineLabel);
                } else {
                    console.log("DouyuEX gDomObserver: 复用观察实例，加入任务队列", selectorTrimmed, deadlineLabel);
                }
            }
            return promise;
        },
        /*
         * 异步等待多个选择器中“最先出现”的那个元素：
         *   @description
         *     - 为各 selector 创建独立的等待任务，共享同一个 AbortController；
         *     - 超时统一由竞速层管理，与各等待任务的生命周期完全独立；
         *     - 任意元素率先出现后，立即取消其余所有等待任务；
         *     - 竞速超时后立即取消所有等待任务并 reject。
         *   @param {string[]} selectors - CSS 选择器数组，例如 `["#id", ".item", "[data-x]"]`
         *     - 每个选择器独立等待，竞速结果返回最先出现的元素。
         *   @param {null|number|string} timeout - 超时时长，格式与 waitForElement 的 timeout 相同
         *   @returns {Promise<{selector: string, element: Element}>} - 返回的 Promise 中包含：
         *     - `selector`：最先出现元素对应的选择器；
         *     - `element`：最先出现的元素对象。
         *   @example
         *     gDomObserver.raceForElement([".a", ".b"], 90000)
         *         .then(({ selector, element }) => { console.log("最先出现的是:", selector, element); })
         *         .catch(error => { console.error("竞速失败:", error); });
         */
        raceForElement(selectors, timeout = null) {
            if (!Array.isArray(selectors) || selectors.length === 0) {
                console.error("DouyuEX gDomObserver: 无效的选择器，竞速任务中止");
                return Promise.reject(new Error(`DouyuEX raceForElement: Empty array of selectors - ${selectors}`));
            }
            const controller = new AbortController(), parsedTimeout = _parseTimeout(timeout);
            let finished = false, rejectedCount = 0, timeoutId = null;
            console.log("DouyuEX gDomObserver: 启动竞速任务，等待元素列表", selectors);
            return new Promise((resolve, reject) => {
                if (parsedTimeout != null) {
                    timeoutId = setTimeout(() => {
                        if (finished) return;
                        finished = true;
                        console.warn("DouyuEX gDomObserver: 超过最大时长，竞速任务失败");
                        const timeoutError = new Error(`DouyuEX raceForElement: No elements appeared within the timeout - ${selectors}`);
                        controller.abort(timeoutError);
                        reject(timeoutError);
                    }, parsedTimeout);
                }
                for (const selector of selectors) {
                    this.waitForElement(selector, null, controller.signal).then(element => {
                        if (finished) return;
                        finished = true;
                        clearTimeout(timeoutId);
                        console.log("DouyuEX gDomObserver: 竞速任务完成，首先出现元素", selector, element);
                        controller.abort();
                        resolve({ selector, element });
                    }).catch(err => {
                        if (finished) return;
                        if (++rejectedCount === selectors.length) {
                            finished = true;
                            clearTimeout(timeoutId);
                            console.warn("DouyuEX gDomObserver: 无效的选择器，竞速任务失败", err);
                            reject(new Error(`DouyuEX raceForElement: All selectors are invalid - ${selectors}`));
                        }
                    });
                }
            });
        },
    };
})();

/*
 * gHotkey - 全局快捷键服务单例。
 *   - 复用单个 keydown 监听器实例，避免重复绑定。
 *   - 支持普通按键、F1-F12 以及 Alt / Ctrl / Meta / Shift 的组合。
 *   - 提供 add / remove / enable / disable / list 等多种管理方法。
 *   - 相同快捷键可注册多个回调，自动合并，不会覆盖并按顺序触发。
 *   - 自动忽略输入框、文本域和可编辑区域的普通输入，避免误触。
 *   - 使用示例：
 *       // 注册一个或多个快捷键
 *       gHotkey.add("ctrl+f5", () => console.log("按下 Ctrl+F5"));
 *       gHotkey.add({
 *           h: () => console.log("按下 H"),
 *           "ctrl+shift+x": () => console.log("按下 Ctrl+Shift+X")
 *       });
 *
 *       // 移除某个快捷键的某个回调
 *       const fn = () => console.log("只移除这个回调");
 *       gHotkey.add("ctrl+k", fn);
 *       gHotkey.remove("ctrl+k", fn);
 *
 *       // 移除整个快捷键（所有回调一起删除）
 *       gHotkey.remove("ctrl+f5");
 *
 *       // 禁用某个快捷键（不会触发，但仍保留回调）
 *       gHotkey.disable("ctrl+s");
 *
 *       // 重新启用快捷键
 *       gHotkey.enable("ctrl+s");
 *
 *       // 查看当前所有快捷键
 *       console.table(gHotkey.list());
 */
const gHotkey = (function () {
    let _listener = null;
    const hotkeyMap = new Map();
    // 判断是否应忽略该事件
    function _ignoreEvent(e) {
        const t = e.target;
        const isInput = t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
        return isInput && !e.altKey && !e.ctrlKey && !e.metaKey;
    }
    // 判断用户按键是否匹配
    function _matchHotkey(e, keys) {
        if (keys.includes("alt") && !e.altKey) return false;
        if (keys.includes("ctrl") && !e.ctrlKey) return false;
        if (keys.includes("meta") && !e.metaKey) return false;
        if (keys.includes("shift") && !e.shiftKey) return false;
        return keys.includes(e.key.toLowerCase()) || keys.includes(e.code.toLowerCase());
    }
    return {
        /*
         * 注册快捷键
         *   - 自动复用全局 keydown 监听器
         *   - 同一个快捷键可绑定多个回调，按注册顺序依次执行
         * @param {string|Object} keyOrCombo
         *   - 字符串：单个快捷键，如 "h"、"ctrl+h"、"shift+f5"
         *   - 对象：批量注册，如 { h: callback1, x: callback2 }
         * @param {Function} [callback]
         *   - 当 keyOrCombo 为字符串时，提供回调函数
         *   - 当 keyOrCombo 为对象时忽略此参数
         */
        add(keyOrCombo, callback) {
            // 支持对象批量注册
            if (typeof keyOrCombo === "object") {
                for (const hotkey in keyOrCombo) {
                    this.add(hotkey, keyOrCombo[hotkey]);
                }
                return;
            }
            keyOrCombo = keyOrCombo.toLowerCase().split(" ").join("");
            const keys = keyOrCombo.split("+");
            // 快捷键相同时追加 callback
            if (hotkeyMap.has(keyOrCombo)) {
                hotkeyMap.get(keyOrCombo).callbacks.push(callback);
            } else {
                hotkeyMap.set(keyOrCombo, { keys, callbacks: [callback], enabled: true });
            }
            // 复用单例监听器
            if (_listener) return;
            _listener = e => {
                if (_ignoreEvent(e)) return;
                for (const { keys, callbacks, enabled } of hotkeyMap.values()) {
                    if (!enabled) continue;
                    if (_matchHotkey(e, keys)) {
                        for (let i = 0, len = callbacks.length; i < len; i++) {
                            callbacks[i](e);
                        }
                    }
                }
            };
            document.addEventListener("keydown", _listener);
        },
        /*
         * 移除某个快捷键或某个回调
         *   - 若某个快捷键所有回调被删空，则自动移除该快捷键
         *   - 若所有快捷键都被移除，则自动解绑 keydown 监听器
         * @param {string} keyOrCombo - 快捷键，如 "ctrl+s"
         * @param {Function} [callback] - 若提供，则仅移除该回调；若省略，则移除整个快捷键
         */
        remove(keyOrCombo, callback) {
            keyOrCombo = keyOrCombo.toLowerCase().split(" ").join("");
            const item = hotkeyMap.get(keyOrCombo);
            if (!item) return;
            if (!callback) {
                hotkeyMap.delete(keyOrCombo);
            } else {
                let write = 0, callbacks = item.callbacks;
                for (let read = 0, length = callbacks.length; read < length; read++) {
                    if (callbacks[read] !== callback) {
                        callbacks[write++] = callbacks[read];
                    }
                }
                callbacks.length = write;
                if (write === 0) {
                    hotkeyMap.delete(keyOrCombo);
                }
            }
            // 若无任何快捷键，自动解绑监听器
            if (hotkeyMap.size === 0 && _listener) {
                document.removeEventListener("keydown", _listener);
                _listener = null;
            }
        },
        /*
         * 禁用某个快捷键（不会触发，但仍保留回调）
         *   - 回调仍保留，可随时 enable 恢复
         *   - 不会影响其他快捷键
         * @param {string} keyOrCombo - 快捷键，如 "ctrl+s"
         */
        disable(keyOrCombo) {
            keyOrCombo = keyOrCombo.toLowerCase().split(" ").join("");
            const item = hotkeyMap.get(keyOrCombo);
            if (item) item.enabled = false;
        },
        /*
         * 启用某个快捷键（恢复触发）
         *   - 恢复之前被 disable 的快捷键，使其重新生效
         * @param {string} keyOrCombo - 快捷键，如 "ctrl+s"
         */
        enable(keyOrCombo) {
            keyOrCombo = keyOrCombo.toLowerCase().split(" ").join("");
            const item = hotkeyMap.get(keyOrCombo);
            if (item) item.enabled = true;
        },
        /*
         * 列出所有快捷键
         *   - 可用于调试或展示快捷键列表
         * 返回格式：
         *   [
         *     { keyOrCombo: "ctrl+s", callbacks: 2, enabled: true },
         *     { keyOrCombo: "h", callbacks: 1, enabled: false }
         *   ]
         */
        list() {
            const result = [];
            for (const [keyOrCombo, { callbacks, enabled }] of hotkeyMap.entries()) {
                result.push({
                    keyOrCombo: keyOrCombo,
                    callbacks: callbacks.length,
                    enabled
                });
            }
            return result;
        }
    };
})();
