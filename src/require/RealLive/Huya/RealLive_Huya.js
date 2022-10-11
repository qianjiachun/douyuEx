/*
    Get Huya Real Live URL (https)
    By: 小淳
*/
function getRealLive_Huya(rid, qn, reallive_callback) {
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
    GM_xmlhttpRequest({
        method: 'GET',
        url: "https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=" + rid,
        responseType: 'json',
        onload: ret=>{
            let msg = "";
            let liveUrl = "";
            let multiLine = ret.response.data.stream.flv.multiLine;
            if (multiLine.length && multiLine.length > 0) {
                liveUrl = multiLine[0].url.replace("http", "https");
            }
            if (liveUrl == null || liveUrl == "") {
                msg = "房间暂未开播";
            }
            reallive_callback(liveUrl, msg);
        }
    })
}