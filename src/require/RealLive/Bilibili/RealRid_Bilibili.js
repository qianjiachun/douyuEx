/*
    Get Bilibili Real Room ID
    By: 小淳 
*/

function getRealRid_Bilibili(url, realrid_callback) {
    GM_xmlhttpRequest({
		method: "GET",
		url: url,
        responseType: "text",
		onload: function(response) {
            let ret = response.response;
            let rid = "";
            rid =  getStrMiddle(ret, 'room_id":', ',');
            rid = rid.trim();
            if (rid == "") {
                rid = "-1";
            }
            realrid_callback(rid);
        }
	});
}