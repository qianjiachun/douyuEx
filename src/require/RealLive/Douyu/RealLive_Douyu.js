/*
    Get Douyu Real Live URL (http/https)
    By: 小淳
*/
function getRealLive_Douyu(room_id, is_video, is_https, qn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入bool,表示是视频还是音频
    // 第三个参数传入bool,表示是否返回https地址。注意https地址只能使用一次，使用过以后需要再次获取；http地址无限制
    // 第四个参数传入string(1,2,3,4),表示清晰度 流畅_550p(rate:1) 高清_1200p(rate:2) 超清_2000p(rate:3) 蓝光4M_4000p(rate:0) 填写1428则返回默认清晰度
    // 第五个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}
    let tt0 = Math.round(new Date().getTime()/1000).toString();
    if (is_video) {
        // 由于pc获取的流没办法通过在后缀增加&only-audio=1来实现音频流，所以分开来实现
        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://www.douyu.com/' + room_id,
            responseType: "text",
            onload: function(response) {
                let a = response.response.match(/(vdwdae325w_64we[\s\S]*?function ub98484234[\s\S]*?)function/i);
                let ub9_ex = String(a[1]).replace("ub98484234", "ub98484234_ex_pc");
                eval1(ub9_ex, "exScript2");
                // RealLive_get_sign_url(room_id, tt0, is_https, qn, reallive_callback, is_video);
                RealLive_get_sign_url_pc(room_id, tt0, true, qn, reallive_callback, is_video);
            }
        });
    } else {
        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://m.douyu.com/' + room_id,
            responseType: "text",
            onload: function(response) {
                let a = response.response.match(/(function ub9.*)[\s\S](var.*)/i);
                let ub9_ex = String(a[0]).replace("ub98484234", "ub98484234_ex");
                eval1(ub9_ex, "exScript1");
                // RealLive_get_sign_url(room_id, tt0, is_https, qn, reallive_callback, is_video);
                RealLive_get_sign_url(room_id, tt0, true, qn, reallive_callback, is_video);
            }
        });
    }
}

function RealLive_get_sign_url(r, tt, is_https, qn, reallive_callback, is_video) {
    let param1 = ub98484234_ex(r, getDyDid(), tt);
    let postData;
    if (qn == "1428") {
        postData = param1 + "&ver=219032101&rid=" + r + "&rate=1";
    } else {
        postData = param1 + "&ver=219032101&rid=" + r + "&rate=" + qn;
    }
    
    document.getElementById("exScript1").remove();
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://m.douyu.com/api/room/ratestream",
        data: postData,
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        onload: function(response) {
            let ret = response.response;
            let result = "";
            if (ret.code == "0") {
                let url = ret.data.url;
                if (String(url).indexOf("mix=1") != -1) {
                    result = "PKing"
                } else {
                    let p = /^[0-9a-zA-Z]*/;
                    let tmpArr = String(ret.data.url).split("/");
                    result = String(tmpArr[tmpArr.length - 1]).match(p)[0];
                }
            } else {
                result = "0";
            }
            let cl = "";
            switch (qn) {
                case "1":
                    cl = "550p"
                    break;
                case "2":
                    cl = "1200p"
                    break;
                case "3":
                    cl = "2000p"
                    break;    
                case "4":
                    cl = "4000p"
                    break;              
                default:
                    cl = ""
                    break;
            }
            let realLive = "";
            if (result == "0") {
                realLive = "None";
            } else {
                if (is_https == true) {
                    realLive = String(ret.data.url).replace("m3u8", "flv");
                    realLive = realLive.replace("http:", "https:");
                } else {
                    if (qn == "1428" || cl == "") {
                        // qn写1428则不返回清晰度，即默认
                        // realLive = "http://tx2play1.douyucdn.cn/live/" + result + ".xs";
                        // realLive = "http://dyscdnali1.douyucdn.cn/live/" + result + ".flv?uuid=";
                        realLive = "https://openflv-huos.douyucdn2.cn/dyliveflv1/" + result + ".flv?uuid=";
                    } else {
                        realLive = "https://openflv-huos.douyucdn2.cn/dyliveflv1/" + result + "_" + cl + ".flv?uuid=";
                        // realLive = "http://tx2play1.douyucdn.cn/live/" + result + "_" + cl + ".xs";
                    }
                }
                realLive = is_video ? realLive : realLive + "&only-audio=1";
            }
            reallive_callback(realLive);
        }
    });
}

function RealLive_get_sign_url_pc(r, tt, is_https, qn, reallive_callback) {
    let param1 = ub98484234_ex_pc(r, getDyDid(), tt);
    let postData;
    if (qn == "1428") {
        postData = param1 + "&ver=219032101&cdn=hs-h5&rid=" + r + "&rate=0";
    } else {
        postData = param1 + "&ver=219032101&cdn=hs-h5&rid=" + r + "&rate=" + qn;
    }
    document.getElementById("exScript2").remove();
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://www.douyu.com/lapi/live/getH5Play/" + r,
        data: postData,
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        onload: function(response) {
            let ret = response.response;
            let realLive = "";
            if (ret.error === 0) {
                realLive = `${ret.data.rtmp_url}/${ret.data.rtmp_live}`
            }
            reallive_callback(realLive);
        }
    });
}



function eval1(str, iid) {
    let sc = document.createElement("script");
    sc.id = iid
    sc.setAttribute("type","text\/javascript");
    sc.appendChild(document.createTextNode(str));
    document.body.appendChild(sc);
}
