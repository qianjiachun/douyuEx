function initPkg_Sign_Yuba() {
    signYubaList();
}

function signYubaFast() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://mapi-yuba.douyu.com/wb/v3/fastSign",
        responseType: "json",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "client": "android",
            "token": dyToken,
        },
        onload: function (response) {
            if (response.response.message == "" && response.response.data != 0) {
                showMessage("【鱼吧】一键签到成功! 获得经验" + response.response.data, "success");
                // console.log("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
            } else if (response.response.data == 0) {
                showMessage("【鱼吧】没有7级以上的鱼吧或极速签到已完成", "warning");
                // console.log("【鱼吧】" + group_id + response.response.message);
            } else {
                showMessage("【鱼吧】" + response.response.message, "warning");
            }

        }
    });
}

function signYuba(group_id, t) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://yuba.douyu.com/ybapi/topic/sign",
        data: 'group_id=' + group_id,
        responseType: "json",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "dy-client": "pc",
            "dy-token": t,
            'Referer': 'https://yuba.douyu.com/group/' + group_id
        },
        onload: function (response) {
            if (response.response.message == "") {
                showMessage("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp, "success");
                // console.log("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
            } else {
                showMessage("【鱼吧】" + group_id + response.response.message, "warning");
                // console.log("【鱼吧】" + group_id + response.response.message);
            }

        }
    });
}

function signYubaList() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://mapi-yuba.douyu.com/wb/v3/signAggregation?page=1",
        responseType: "json",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "client": "android",
            "token": dyToken
        },
        onload: function (response) {
            signYubaFast();
            for (let i = 0; i < response.response.data.list.length; i++) {
                if (response.response.data.list[i].level < 7) {
                    signYuba(response.response.data.list[i].group_id, dyToken);
                }
            }

        }
    });

}