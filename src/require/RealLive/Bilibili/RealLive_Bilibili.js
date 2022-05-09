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
            qn_data = "10000";
            break;
        default:
            qn_data = "80";
            break;
    }
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://api.live.bilibili.com/room/v1/Room/playUrl?cid=" + room_id + "&qn=" + qn_data + "&platform=web",
		responseType: "json",
		onload: function(response) {
            let ret = response.response;
            let rurl = "";
            if (ret.data.durl != null && ret.data.durl.length > 0) {
                if (Number(cdn) > ret.data.durl.length - 1) {
                    rurl = ret.data.durl[0].url;
                } else {
                    rurl = ret.data.durl[Number(cdn)].url;
                }
            } else {
                rurl = "";
            }
            reallive_callback(rurl);
        }
	});
}