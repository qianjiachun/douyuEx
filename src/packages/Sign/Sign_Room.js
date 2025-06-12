
function initPkg_Sign_Room(isAll) {
	signAllRoom(isAll);
}
function signAllRoom(isAll) {
    // 1. get page counts(1428)
    // 2. for in all pages
    // 3. sign each room
    let pageCount = 0;
    let signedCount = 0;
    let count = 0;
    fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/list?page=1428',{
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
            }).then(ret1 => {
                let roomCount = Number(ret1.data.list.length);
                for (let i = 0; i < roomCount; i++) {
                    if (isAll == false) {
                        if (ret1.data.list[i].show_status == "1") {
                            signRoom(ret1.data.list[i].room_id);
                            signedCount++;
                        }
                    } else {
                        signRoom(ret1.data.list[i].room_id);
                        signedCount++;
                    }
                    count++;
                    if (count == ret1.data.total && i == roomCount - 1) {
                        let rest = Number(ret1.data.total) - signedCount;
                        showMessage("【房间签到】" + String(signedCount) + "个房间签到已完成，" + String(rest) + "个房间未签到", "success");
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
		url: "https://apiv2.douyucdn.cn/japi/roomuserlevel/apinc/checkIn?client_sys=android",
		data: 'rid=' + r,
		responseType: "json",
		headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': dyToken,
            'aid': 'android1'
		},
		onload: function(response) {
        }
	});
}