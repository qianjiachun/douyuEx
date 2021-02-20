function initPkg_Sign_Yuba_Like() {
    likeYuba();
}

function likeYuba() {
    let pid = "184419561592747400";
    likeYubaPostComment(pid, "1483548421625277411", "-1").then(() => {likeYubaPostComment(pid, "1483548421625277411", "1")});
    // likeYubaPostComment(pid, "1483548421625277411", "-1").then(() => {likeYubaPostComment(pid, "1483548421625277411", "1")});
    // likeYubaPostComment(pid, "1482171839375552044", "-1").then(() => {likeYubaPostComment(pid, "1482171839375552044", "1")});
    // likeYubaPostComment(pid, "1481389816302095706", "-1").then(() => {likeYubaPostComment(pid, "1481389816302095706", "1")});
    // likeYubaPostComment(pid, "1470603012833589758", "-1").then(() => {likeYubaPostComment(pid, "1470603012833589758", "1")});
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
                "Referer": "https://yuba.douyu.com/p/184419561592747400"
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}