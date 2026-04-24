/*
   DouyuEx WebSocket UnLogin
    By: 小淳
*/
class Ex_WebSocket_UnLogin {
    constructor(rid, msgHandler) {
        if ("WebSocket" in window) {
            this.timer = 0;
            this.rid = rid;
            this.msgHandler = msgHandler;
            this.reconnectCount = 0;
            this.maxReconnect = 10;
            this.connect();
        }
    }

    connect() {
        this.ws = new WebSocket("wss://danmuproxy.douyu.com:850" + String(getRandom(2, 5)));
        this.ws.onopen = () => {
            this.reconnectCount = 0;
            this.ws.send(WebSocket_Packet("type@=loginreq/roomid@=" + this.rid));
            this.ws.send(WebSocket_Packet("type@=joingroup/rid@=" + this.rid + "/gid@=-9999/"));
            // this.ws.send(WebSocket_Packet("type@=sub/mt@=asr_caption/"));
            this.timer = setInterval(() => {
                this.ws.send(WebSocket_Packet("type@=mrkl/"));
            }, 40000);
        };

        this.ws.onerror = () => {
            this.close();
        };

        this.ws.onmessage = (e) => {
            let reader = new FileReader();
            reader.onload = () => {
                let arr = String(reader.result).split("\0"); // 分包
                reader = null;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].length > 12) {
                        // 过滤第一条和心跳包
                        this.msgHandler(arr[i]);
                    }
                }
            };
            reader.readAsText(e.data);
        };

        this.ws.onclose = () => {
            this.close();
            this.reconnect();
        };
    }

    reconnect() {
        if (this.reconnectCount >= this.maxReconnect) {
            return;
        }
        this.reconnectCount++;
        const delay = Math.min(3000 * Math.pow(1.5, this.reconnectCount - 1), 60000);
        setTimeout(() => {
            this.connect();
        }, delay);
    }

    close() {
        clearInterval(this.timer);
        this.ws.close();
    }
}
