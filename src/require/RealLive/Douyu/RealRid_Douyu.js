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
    }).then(doc => {
        doc = (new DOMParser()).parseFromString(doc, 'text/html');
        let url = doc.getElementsByTagName('html')[0].innerHTML;
        let urlLen = ("$ROOM.room_id =").length;
        let ridPos = url.indexOf('$ROOM.room_id =');
        let rid = "";
        if (ridPos > 0) {
            rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
            rid = rid.trim();
        } else {
            rid = getStrMiddle(url, `roomID:`, `,`);
            if (rid) {
                rid = rid.trim();
            } else {
                let canonicalLink = doc.querySelector(`link[rel="canonical"]`);
                if (canonicalLink) {
                    let href = canonicalLink.getAttribute(`href`);
                    rid = href.split('/').pop().trim();
                }
            }
        }
        if (isRid(rid) == true) {
            realrid_callback(rid);
        } else {
            showMessage("获取直播间失败，请检查直播间地址是否正确！", "error");
        }
        
    }).catch(err => {
        console.log("请求失败!", err);
    })
}
