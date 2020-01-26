/*
    Get Huya Real Live URL (https)
    By: 小淳
*/
function getRealLive_Huya(url, qn, cdn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入string(1,2,3,4),表示清晰度 流畅_500(1) 超清_2500(2) 蓝光4M_4500(3) 原画(4)
    // 第三个参数传入string(1,2,3,4),表示线路 1:主线路 2:备用线路1 3:备用线路2 4:备用线路3 
    // 第四个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url, msg) => {console.log(url, msg)}
    // 这个回调函数有2个参数，第一个是直播流地址，第二个是信息，用于判断错误
    let qn_data = "500";
    switch (qn) {
        case "1":
            qn_data = "500";
            break;
        case "2":
            qn_data = "2500";
            break;
        case "3":
            qn_data = "4500";
            break;
        case "4":
            qn_data = "0";
            break;
        default:
            qn_data = "500";
            break;
    }
    let cdn_data = Number(cdn) - 1;
    GM_xmlhttpRequest({
		method: "GET",
		url: url,
		responseType: "text",
		onload: function(response) {
            let html = String(response.response);
            let lurl = ""; // 直播源
            let msg = ""; // 信息 预留
            let lurl_sFlvUrl = "";
            let lurl_sStreamName = "";
            let lurl_sFlvUrlSuffix = "";
            let lurl_sFlvAntiCode = "";
            if (getStrMiddle(html, '"state":"', '",') == "ON") {
                let tlen = ("hyPlayerConfig = ").length;
                let tpos = html.indexOf("hyPlayerConfig = ");
                let json = JSON.parse(html.substring(tpos + tlen, html.indexOf('};', tpos + tlen)) + '}');
                if (json.stream != null) {
                    if (json.stream.data[0].gameStreamInfoList.length >= cdn_data) {
                        lurl_sFlvUrl = json.stream.data[0].gameStreamInfoList[cdn_data].sFlvUrl;
                        lurl_sFlvUrl = String(lurl_sFlvUrl).replace("http", "https");
                        lurl_sStreamName = json.stream.data[0].gameStreamInfoList[cdn_data].sStreamName;
                        lurl_sFlvUrlSuffix = json.stream.data[0].gameStreamInfoList[cdn_data].sFlvUrlSuffix;
                        lurl_sFlvAntiCode = json.stream.data[0].gameStreamInfoList[cdn_data].sFlvAntiCode;

                        lurl = lurl_sFlvUrl + "/" + lurl_sStreamName + "." + lurl_sFlvUrlSuffix + "?" + lurl_sFlvAntiCode;
                        lurl = lurl.replace(/amp;/g, "");
                        if (qn_data != "0") {
                            lurl = lurl + "&ratio=" + qn_data;
                        }
                    } else {
                        msg = "暂无该线路";
                    }
                }
            } else {
                msg = "该房间未开播";
            }
            reallive_callback(lurl, msg);
        }
	});
}
