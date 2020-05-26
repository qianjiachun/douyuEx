function initPkg_LiveTool_Treasure() {
}

function initPkg_LiveTool_Treasure_Handle(text) {
    if (getType(text) == "tsboxb") {
        let ot = getStrMiddle(text, "ot@=", "/");
        let rpid = getStrMiddle(text, "rpid@=", "/");
        let rid = getStrMiddle(text, "rid@=", "/");
        let did = getCookieValue("dy_did");
        let timeout = Number(ot) - Math.floor(Date.now()/1000);
        console.log("ot:",ot,"rpid:",rpid);
        console.log("timeout:",timeout);
        setTimeout(() => {
            getTreasure(rid, rpid, did);
        }, timeout*1000 + 500);
    }
}

function getTreasure(roomid, rpid, deviceid) {
    fetch("https://www.douyu.com/member/task/redPacketReceive", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'room_id=' + roomid + '&package_room_id=' + roomid + '&device_id=' + deviceid + '&packerid=' + rpid + '&gt_version=v4&version=1'
    }).then(res => {
        return res.json();
    }).then(ret => {
        console.log(ret);
    })
}