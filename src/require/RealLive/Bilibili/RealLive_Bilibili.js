/*
    Get Bilibili Real Live URL (https)
    By: 小淳
*/
function getRealLive_Bilibili(room_id, qn, cdn, reallive_callback) {
    // 第一个参数传入string,表示房间号（注意是真实房间号）
    // 第二个参数传入string(1,2,3,4,5),表示清晰度 流畅_80(1) 高清_150(2) 超清_250(3) 蓝光_400p(4) 原画_10000p(5)
    // 第三个参数传入string(1,2,3,4),表示线路 1:主线路 2:备用线路1 3:备用线路2 4:备用线路3 此参数只对HTTPS有效
    // 第四个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}
    let qn_data = "80";
    switch (qn) {
        case "1":
            qn_data = "80";
            break;
        case "2":
            qn_data = "150";
            break;
        case "3":
            qn_data = "250";
            break;
        case "4":
            qn_data = "400";
            break;
        case "5":
            qn_data = "20000";
            break;
        default:
            qn_data = "80";
            break;
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=${room_id}&platform=web&qn=${qn_data}&protocol=0,1&format=0,1,2&codec=0,1`,
        responseType: "json",
        onload: function (response) {
            let ret = response.response;
            let rurl = "";
            for (let i = 0; i < ret.data.playurl_info.playurl.stream.length; i++) {
                const item = ret.data.playurl_info.playurl.stream[i];
                if (String(item.protocol_name).includes("hls") && item.format.length > 0) {
                    let url_info = item.format[0].codec[0].url_info[0];
                    let base_url = item.format[0].codec[0].base_url;
                    rurl = `${url_info.host}${base_url}${url_info.extra}`;
                }
            }
            let streamList = ret.data.durl;
            if (streamList) {
                rurl = streamList.length > 0 ? streamList[0].url : "";
            }
            reallive_callback(rurl);
        }
    });
}