function signAct(alias) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'token=' + dyToken + "&signAlias=" + alias
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function userStatus(tasks) {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/actTask/userStatus", {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `tasks=${tasks}&token=${dyToken}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}


function takeActPrize(name) {
    // 该接口会在userStatus后自动执行
    // 关注20200911LMJX_T2
    // 分享20200911LMJX_T5
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/nc/actTask/takePrize',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `token=${ dyToken }&aid=android&taskAlias=${ name }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function addFollowRoom(rid) {
	return new Promise(resolve => {
        fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/add',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `rid=${ rid }&ctn=${ getCCN() }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}


function removeFollowRoom(rid) {
	return new Promise(resolve => {
        fetch('https://www.douyu.com/wgapi/livenc/liveweb/follow/rm',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `rid=${ rid }&ctn=${ getCCN() }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function shareAct(name) {
    // 20200911LMJX
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/carnival/common/share',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `actAlias=${ name }&token=${ dyToken }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

function getJackpot(id) {
	return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/lottery/jackpot", {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: `{"activityId":"${ id }","token":"${ dyToken }"}`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function getActRemaining(id) {
	return new Promise(resolve => {
        fetch("https://www.douyu.com/japi/carnival/nc/lottery/remaining?activityId=" + id, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

function getActList() {
    return new Promise(resolve => {
        fetch('https://www.douyuex.com/src/actList.txt',{
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'omit',
        }).then(res => {
            return res.text();
        }).then(txt => {
            resolve(txt);
        }).catch(err => {
            console.error('请求失败', err);
        })
    })
}





// function douyuVideo_createUp(cookie, vid, ctn) {
// 	// 斗鱼视频点赞
// 	return exHttpRequest("https://v.douyu.com/api/video/createUp", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_destroyUp(cookie, vid, ctn) {
// 	// 斗鱼视频取消点赞
// 	return exHttpRequest("https://v.douyu.com/api/video/destroyUp", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_createCollect(cookie, vid, ctn) {
// 	// 斗鱼视频收藏
// 	return exHttpRequest("https://v.douyu.com/api/video/createCollect", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_destroyCollect(cookie, vid, ctn) {
// 	// 斗鱼视频取消收藏
// 	return exHttpRequest("https://v.douyu.com/api/video/destroyCollect", "POST", {
// 		cookie: cookie
// 	}, "vid=" + vid + "&ccn=" + ctn);
// }

// function douyuVideo_createSub(cookie, uid, ctn) {
// 	// 斗鱼关注UP主
// 	return exHttpRequest("https://v.douyu.com/api/video/createSub", "POST", {
// 		cookie: cookie
// 	}, "uid=" + uid + "&ccn=" + ctn);
// }

// function douyuVideo_destroySub(cookie, uid, ctn) {
// 	// 斗鱼取消关注UP主
// 	return exHttpRequest("https://v.douyu.com/api/video/destroySub", "POST", {
// 		cookie: cookie
// 	}, "uid=" + uid + "&ccn=" + ctn);
// }

// function douyuVideo_shareVideo(token, vid) {
// 	// 斗鱼分享视频
// 	return exHttpRequest("https://apiv2.douyucdn.cn/mgapi/vodnc/share/success?token=" + token + "&client_sys=android", "POST", {}, "hash_id=" + vid + "&share_type=weixin");
// }

