function initPkg_Sign_Yuba_Like() {
    likeYuba();
}

function likeYuba() {
    let pid = "555691541586843641";
    // likeYubaPostComment(pid, "1483548421625277411", "-1").then(() => {likeYubaPostComment(pid, "1483548421625277411", "1")});
    // likeYubaPostComment(pid, "1483548421625277411", "-1").then(() => {likeYubaPostComment(pid, "1483548421625277411", "1")});
    // likeYubaPostComment(pid, "1482171839375552044", "-1").then(() => {likeYubaPostComment(pid, "1482171839375552044", "1")});
    // likeYubaPostComment(pid, "1481389816302095706", "-1").then(() => {likeYubaPostComment(pid, "1481389816302095706", "1")});
    // likeYubaPostComment(pid, "1470603012833589758", "-1").then(() => {likeYubaPostComment(pid, "1470603012833589758", "1")});
    likeYubaPost(pid, "-1").then(() => {likeYubaPost(pid, "1")});
    showMessage("【鱼吧点赞】已完成", "success");
}

function likeYubaPostComment(post_id, commnet_id, type) {
    let data = `pid=${ post_id }&comment_id=${ commnet_id }&type=${ type }`;
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://yuba.douyu.com/ybapi/follow/like",
            data: data,
            responseType: "json",
            headers: {
                "dy-token": dyToken,
                "dy-client": "pc",
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": "https://yuba.douyu.com/p/555691541586843641"
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function likeYubaPost(post_id, type) {
    let data = `pid=${ post_id }&type=${ type }`;
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://yuba.douyu.com/ybapi/follow/like",
            data: data,
            responseType: "json",
            headers: {
                "dy-token": dyToken,
                "dy-client": "pc",
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": "https://yuba.douyu.com/p/" + post_id
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}