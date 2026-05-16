/* 
    Get Douyu Real Room ID
    By: 小淳
*/

function getRealRid_Douyu(url, realrid_callback) {
    fetch(url,{
        method: 'GET',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'include',
    }).then(res => {
        return res.text();
    }).then(htmlText => {
        let match = htmlText.match(/(?:\$ROOM\.room_id\s*=|"room_id"\s*:|roomID\s*:|rid"\s*:|room_id\s*=|rel="canonical"\s+href="[^"]*\/)\s*(\d+)/);
        let rid = match ? match[1].trim() : null;
        if (rid && isRid(rid) === true) {
            realrid_callback(rid);
        } else {
            let urlMatch = url.match(/douyu\.com\/(\d+)/);
            if (urlMatch && urlMatch[1] && isRid(urlMatch[1]) === true) {
                realrid_callback(urlMatch[1]);
            } else {
                showMessage("获取直播间失败，请检查直播间地址是否正确！", "error");
            }
        }
    }).catch(err => {
        console.log("请求失败!", err);
    })
}