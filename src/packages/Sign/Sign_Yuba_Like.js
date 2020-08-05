function initPkg_Sign_Yuba_Like() {
    likeYuba();
}

function likeYuba() {
    let pid = "479725451596644862";
    likeYubaPostComment(pid, "1517012660302061924", "-1").then(() => {likeYubaPostComment(pid, "1517012660302061924", "1")});
    likeYubaPostComment(pid, "1517012829374456125", "-1").then(() => {likeYubaPostComment(pid, "1517012829374456125", "1")});
    likeYubaPostComment(pid, "1517013103069569447", "-1").then(() => {likeYubaPostComment(pid, "1517013103069569447", "1")});
    likeYubaPostComment(pid, "1517013231197168052", "-1").then(() => {likeYubaPostComment(pid, "1517013231197168052", "1")});
    likeYubaPostComment(pid, "1517013448084627821", "-1").then(() => {likeYubaPostComment(pid, "1517013448084627821", "1")});
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
                "Referer": "https://yuba.douyu.com/p/479725451596644862"
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}