/*
   DouyuEx WebSocket UnLogin
    By: 小淳
*/
class Ex_WebSocket_UnLogin {
    // 调用方法：
    // 连接：let a = new Ex_WebSocket_UnLogin("房间号", 消息回调函数);
    // 关闭连接: a.WebSocket_Close(); a = null; 记得null掉变量再重新连接
    // 消息回调函数建议用箭头函数，示例：(msg) => {// TODO}
    constructor(rid, callback, closeHandler) {
        if ("WebSocket" in window) {
            this.timer = 0;
            this.roomid = rid;
            this.ws = new WebSocket("wss://danmuproxy.douyu.com:850" + String(getRandom(2,5))); // 负载均衡 8502~8504都可以用
            this.ws.onopen = () => {
                this.ws.send(WebSocket_Packet("type@=loginreq/roomid@=" + rid));
                this.ws.send(WebSocket_Packet("type@=joingroup/rid@=" + rid + "/gid@=-9999/"));
                this.timer = setInterval(() => {
                    this.ws.send(WebSocket_Packet("type@=mrkl/"));
                }, 40000)
                // console.log("WebSocket已连接");
            };
            this.ws.onmessage = (e) => { 
                let reader = new FileReader();
                reader.onload = () => {
                    let arr = String(reader.result).split("\0"); // 分包
                    reader = null;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].length > 12) {
                            // 过滤第一条和心跳包
                            callback(arr[i]);
                        }
                    }
                };
                reader.readAsText(e.data);
            };
            this.ws.onclose = () => { 
                showMessage("弹幕服务器连接丢失，正在重连", "warning");
                closeHandler && closeHandler();
            };
        }
    }
    close() {
        clearInterval(this.timer);
        this.ws.close();
    }
}