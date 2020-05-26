/*
   DouyuEx WebSocket UnLogin
    By: 小淳
*/
function Ex_WebSocket_UnLogin(rid, callback) {
    // 自定义数据类型
    // 调用方法：
    // 连接：let a = new Ex_WebSocket_UnLogin("房间号", 消息回调函数);
    // 关闭连接: a.WebSocket_Close(); a = null; 记得null掉变量再重新连接
    // 消息回调函数建议用箭头函数，示例：(msg) => {// TODO}
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
                let arr = String(reader.result).split("type@="); // 分包
                reader = null;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].length > 12) {
                        // 过滤第一条和心跳包
                        callback("type@=" + arr[i]);
                    }
                }
            };
            reader.readAsText(e.data);
        };
        // this.ws.onclose = () => { 
        //     console.log("WebSocket已关闭");
        // };
        if (typeof this.close != "function") {
            
            Ex_WebSocket_UnLogin.prototype.close = () => {
                clearInterval(this.timer);
                this.ws.close();
            };
        }
    }
}


