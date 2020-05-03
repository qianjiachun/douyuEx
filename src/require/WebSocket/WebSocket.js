/*
   DouyuEx WebSocket
    By: 小淳
*/
function Ex_WebSocket() {
    // 自定义数据类型
    // 调用方法：
    // 连接：let a = new Ex_WebSocket(); a.WebSocket_Connect("房间号");
    // 关闭连接: a.WebSocket_Close(); a = null; 记得null掉变量再重新连接
    if ("WebSocket" in window) {
        this.timer = 0;
        this.ws = new WebSocket("wss://danmuproxy.douyu.com:8502");
        this.ws.onopen = function() {
            console.log("WebSocket已连接");
        };
        this.ws.onmessage = function (e) { 
            let reader = new FileReader();
            reader.onload = function() {
                let content = reader.result;
                console.log(content);
            };
            reader.readAsText(e.data);
        };
        this.ws.onclose = function() { 
            console.log("WebSocket已关闭");
        };
        if (typeof this.WebSocket_Connect != "function") {
            Ex_WebSocket.prototype.WebSocket_Connect = function(rid) {
                this.ws.send(WebSocket_Packet("type@=loginreq/roomid@=" + rid));
                this.ws.send(WebSocket_Packet("type@=joingroup/rid@=" + rid + "/gid@=-9999/"));
                this.timer = setInterval(() => {
                    this.ws.send(WebSocket_Packet("type@=mrkl/"));
                }, 40000)
            };
            Ex_WebSocket.prototype.WebSocket_Close = function() {
                clearInterval(this.timer);
                this.ws.close();
            };
        }
    }
}


function WebSocket_Packet(str) {
    const MSG_TYPE = 689;
    let bytesArr = stringToByte(str);   
    let buffer = new Uint8Array(bytesArr.length + 4 + 4 + 2 + 1 + 1 + 1);
    let p_content = new Uint8Array(bytesArr.length); // 消息内容
    for (let i = 0; i < p_content.length; i++) {
        p_content[i] = bytesArr[i];
    }
    let p_length = new Uint32Array([bytesArr.length + 4 + 2 + 1 + 1 + 1]); // 消息长度
    let p_type = new Uint32Array([MSG_TYPE]); // 消息类型

    buffer.set(new Uint8Array(p_length.buffer), 0);
    buffer.set(new Uint8Array(p_length.buffer), 4);
    buffer.set(new Uint8Array(p_type.buffer), 8);
    buffer.set(p_content, 12);

    return buffer;
}

function stringToByte(str) {  
    var bytes = new Array();  
    var len, c;  
    len = str.length;  
    for(var i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  
}

function byteToString(arr) {
    if(typeof arr === 'string') {
        return arr;
    }
    var str = '',
        _arr = arr;
    for(var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for(var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
return str;
}

