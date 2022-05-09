/*
    Get Bilibili Real Room ID
    By: 小淳 
*/

function getRealRid_Bilibili(url, realrid_callback) {
    let arr = url.split("/");
    let rid = arr[arr.length - 1];
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://api.live.bilibili.com/room/v1/Room/room_init?id=" + rid,
        responseType: "json",
		onload: function(response) {
            let ret = response.response;
            realrid_callback(ret.data.room_id);
        }
	});
}