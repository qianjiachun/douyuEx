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

function showExPanel() {
	// 显示功能条
	let a = document.getElementsByClassName("ex-panel")[0];
	if (a.style.visibility !== 'visible') {
        a.style.visibility = 'visible';
        a.style.opacity = '1';
        clearTimeout(exPanelTimer);
    } else {
        a.style.visibility = 'hidden';
        a.style.opacity = '0';
        clearTimeout(exPanelTimer);
    }
}

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
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
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
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
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
	let arr = text.split(":");
	if (arr.length === 1) {
		ret = Number(arr[0]);
	} else if (arr.length === 2) {
		ret = Number(arr[0]) * 60 + Number(arr[1]);
	} else if (arr.length === 3) {
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
				for (const line of setCookie) {
					const match = line.match(/cvl_csrf_token=([^;]+)/);
					if (match) {
						csrfToken = match[1]; // 返回提取到的 token
						break;
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

function getValidDom(queryList) {
	for (const query of queryList) {
		let dom = null;
		if (typeof query === "string") {
			dom = document.querySelector(query);
		} else {
			dom = query;
		}
		if (dom) return dom;
	}
	return null;
}

function getValidDomList(queryList) {
	for (const query of queryList) {
		let dom = [];
		if (typeof query === "string") {
			dom = document.querySelectorAll(query);
		} else {
			dom = query;
		}
		if (dom.length > 0) return dom;
	}
	return [];
}