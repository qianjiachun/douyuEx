/*
    Get Douyu Real Live URL (http/https)
    By: 小淳
*/
function getRealLive_Douyu(room_id, is_https, qn, cdn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入bool,表示是否返回https地址。注意https地址只能使用一次，使用过以后需要再次获取；http地址无限制
    // 第三个参数传入string(1,2,3,4),表示清晰度 流畅_550p(rate:1) 高清_1200p(rate:2) 超清_2000p(rate:3) 蓝光4M_4000p(rate:4) 填写777则返回默认清晰度
    // 第四个参数传入string(1,2,3,4),表示线路 1:主线路(ws-h5) 2:备用线路1(tct-h5) 3:备用线路2(ali-h5) 此参数只对HTTPS有效
    // 第五个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}
    GM_xmlhttpRequest({
		method: "GET",
		url: 'https://m.douyu.com/' + room_id,
		responseType: "text",
		onload: function(response) {
            let a = response.response.match(/(function ub9.*)[\s\S](var.*)/i);
            let b = String(a[1]).replace(/eval.*;}/, 'strc;}');
            let c = b + String(a[2]);
            let tt2 = dateFormat("yyyyMMdd", new Date());
            let tt0 = String(Math.round(new Date().getTime()/1000).toString());
            RealLive_get_sign_url(tt2, room_id, tt0, c, is_https, qn, cdn, reallive_callback); // 传入参数无误
        }
	});
}

function RealLive_get_sign_url(post_v, r, tt, ub9, is_https, qn, cdn, reallive_callback) {
    let sign = RealLive_get_sign(r, post_v, tt, ub9);
    if (is_https != true) {
        let postData = 'v=2501' + post_v + '&did=10000000000000000000000000001501&tt=' + tt + '&sign=' + sign + '&ver=219032101&rid=' + r + '&rate=-1';
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://m.douyu.com/api/room/ratestream",
            data: postData,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'
            },
            onload: function(response) {
                let ret = response.response;
                let result = "";
                if (ret.code == "0") {
                    let url = ret.data.url;
                    if (String(url).indexOf("mix=1") != -1) {
                        result = "PKing"
                    } else {
                        let p = /live\/(\d{1,8}[0-9a-zA-Z]+)_?[\d]{0,4}\/playlist/i;
                        result = String(url).match(p)[1];
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
                        cl = "1200p"
                        break;
                }
                let realLive = "";
                if (result == "0") {
                    realLive = "None";
                } else {
                    if (qn == "777") {
                        // qn写777则不返回清晰度，即默认
                        realLive = "https://tx2play1.douyucdn.cn/live/" + result + ".flv?uuid=";
                    } else {
                        realLive = "https://tx2play1.douyucdn.cn/live/" + result + "_" + cl + ".flv?uuid=";
                    }
                }
                
                reallive_callback(realLive);
            }
        });
    } else {
        fetch("https://www.douyu.com/lapi/live/getH5Play/" + r, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'v=220120200219&did=' + getDyDid() + '&tt=' + tt + '&sign=' + sign + '&cdn=' + cdn + '&rate=' + qn + '&ver=Douyu_220021805&iar=0&ive=0'
        }).then(res => {
            return res.json();
        }).then(ret => {
            if (ret.data != "") {
                reallive_callback(ret.data.rtmp_url + "/" + ret.data.rtmp_live);
            } else {
                showMessage(ret.msg, "error");
                console.log(ret.msg);
            }
        })
    }
}

function RealLive_get_sign(r, post_v, tt, ub9) {
    let ub9_ex = String(ub9).replace("ub98484234", "ub98484234_ex");
    eval1(ub9_ex, "exScript1");
    let res2 = ub98484234_ex();
    let str3 = String(res2).replace(/\(function[\s\S]*toString\(\)/, "\'");
    let md5rb = hex_md5(r + '10000000000000000000000000001501' + tt + '2501' + post_v);
    let str4 = 'function get_sign(){var rb=\'' + md5rb + str3;
    let str5 = String(str4).replace(/return rt;}[\s\S]*/, 'return re;};');
    let str6 = String(str5).replace(/"v=.*&sign="\+/, '');
    str6 = String(str6).replace("get_sign", "get_sign_ex")
    eval1(str6, "exScript2");
    let sign = get_sign_ex(r + "10000000000000000000000000001501", tt);
    document.getElementById("exScript1").remove();
    document.getElementById("exScript2").remove();
    return sign;
}

function eval1(str, iid) {
    var sc = document.createElement("script");
    sc.id = iid
    sc.setAttribute("type","text\/javascript");
    sc.appendChild(document.createTextNode(str));
    document.body.appendChild(sc);
}