class DyWacthAd {
    constructor(posid, token, rid) {
        this.posid = posid;
        this.token = token;
        this.rid = rid;
        
        this._uid = String(token).split("_")[0];
        this._mid = 0;
        this._infoBack = "";

    }
    
    async start() {
        let info = await this.getInfo(this.posid, this.token, this.rid);
        if (info == false) {
            return false;
        }
        this._mid = info.mid;
        this._infoBack = info.infoBack;
        let isStart = await this.getStart(this.posid, this.token, this._uid, this._mid, this._infoBack);
        return isStart;
    }

    async finish() {
        let isFinish = await this.getFinish(this.posid, this.token, this._uid, this._mid, this._infoBack);
        return isFinish;
    }

    getInfo(posid, token, rid) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://rtbapi.douyucdn.cn/japi/sign/app/getinfo?token=" + token + "&mdid=phone" + "&client_sys=android",
                data: "posid=" + posid + "&roomid=" + rid + "&cate1=1&cate2=1&chanid=30" + '&device={"nt":"1"}',
                responseType: "json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                onload: function(response) {
                    let ret = response.response;
                    if (ret.error == "0") {
                        if (ret.data.length == 0) {
                            resolve(false);
                            return;
                        }
                        let mid = ret.data[0].mid;
                        let infoBack = encodeURIComponent(JSON.stringify(ret.data));
                        resolve({mid: mid, infoBack: infoBack});
                    }
                }
            });
        })
    }

    getStart(posid, token, uid, mid, infoBack) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/start?client_sys=android",
                data: "&uid=" + uid + "&roomId=" + rid + "&posCode=" + posid + "&token=" + token + "&clientType=1&creativeId=" + mid + "&infoBack=" + infoBack,
                responseType: "json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                onload: function(response) {
                    let ret = response.response;
                    if (ret.error == "0") {
                        resolve(true);
                    }
                }
            });
    
        })
    }
    
    getFinish(posid, token, uid, mid, infoBack) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/fishpond/mobile/finish?client_sys=android",
                data: "uid=" + uid + "&clientType=1&posCode=" + posid + "&creativeId=" + mid + "&roomId=" + rid + "&token=" + token + "&infoBack=" + infoBack,
                responseType: "json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                onload: function(response) {
                    let ret = response.response;
                    if (ret.error == "0") {
                        if (ret.data == "1") {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                }
            });
    
        })
    }
}
