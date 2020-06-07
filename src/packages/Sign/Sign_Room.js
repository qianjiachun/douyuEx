function initPkg_Sign_Room() {
	signAllRoom();
}
function signAllRoom() {
    // 1. get page counts(777)
    // 2. for in all pages
    // 3. sign each room
    let pageCount = 0;
    let signedCount = 0;
    fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/list?page=777',{
        method: 'GET',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'include',
    }).then(res => {
        return res.json();
    }).then(ret => {
        pageCount = Number(ret.data.pageCount);
        for (let nowPage = 1; nowPage <= pageCount; nowPage++) {
            fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/list?page=' + String(nowPage),{
                method: 'GET',
                mode: 'no-cors',
                cache: 'default',
                credentials: 'include',
            }).then(res => {
                return res.json();
            }).then(ret => {
                let roomCount = Number(ret.data.list.length);
                for (let i = 0; i < roomCount; i++) {
                    if (ret.data.list[i].show_status == "1") {
                        signRoom(ret.data.list[i].room_id);
                        signedCount++;
                    }
                    if (nowPage == pageCount && i == roomCount - 1) {
                        let rest = Number(ret.data.total) - signedCount;
                        showMessage("【房间签到】" + String(signedCount) + "个已开播房间签到已完成，" + String(rest) + "个房间未开播", "success");
                    }
                }
            }).catch(err => {
                console.log("请求失败!", err);
            })
        }
        showMessage("【房间签到】" + ret.data.total + "个房间正在签到中...", "info");
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

function signRoom(r) {
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://apiv2.douyucdn.cn/japi/roomuserlevel/apinc/checkIn",
		data: 'rid=' + r + '&ctn=' + getCCN(),
		responseType: "json",
		headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': dyToken,
            'cookie': document.cookie
		},
		onload: function(response) {
        }
	});
}