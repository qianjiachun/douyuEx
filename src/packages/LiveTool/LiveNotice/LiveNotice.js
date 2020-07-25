let timer_closing;
let closingNum = 0;
function initPkg_LiveTool_LiveNotice() {
}

function initPkg_LiveTool_LiveNotice_Handle(text) {
    if (getType(text) == "rss") {
        let rid = getStrMiddle(text, "rid@=", "/");
        let ss = getStrMiddle(text, "ss@=", "/");
        if (ss == "1") {
            showMessageWindow("开播提醒", "直播间：" + rid + "开播了，点我签到", () => {
                signRoom(rid);
            });
        } else {
            clearInterval(timer_closing);
            timer_closing = setInterval(() => {
                if (closingNum > 30) {
                    clearInterval(timer_closing);
                    closingNum = 0;
                }
                let x = document.getElementsByClassName("dy-ModalRadius-close-x");
                if (x.length > 0) {
                    clearInterval(timer_closing);
                    x[0].click();
                }
                closingNum++;
            }, 500);
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