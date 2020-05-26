let roomAvatar = "";

function initPkg_LiveTool_LiveNotice() {
	getRoomAvatar();
}

function initPkg_LiveTool_LiveNotice_Handle(text) {
    if (getType(text) == "rss") {
        let rid = getStrMiddle(text, "rid@=", "/");
        let ss = getStrMiddle(text, "ss@=", "/");
        if (ss == "1") {
            showMessageWindow(roomAvatar, "开播提醒", "直播间：" + rid + "开播了，点我跳转并签到", () => {
                signRoom(rid);
                window.focus();
            });
        }
    }
}

function getRoomAvatar() {
    fetch('https://www.douyu.com/betard/' + rid,{
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include'
    }).then(res => {
        return res.json();
    }).then(ret => {
        roomAvatar = ret.room.avatar.middle;
    }).catch(err => {
        console.log("请求失败!", err);
    })
}