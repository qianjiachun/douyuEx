let signedYuba = 0;
let totalYuba = 0;
let doneYuba = 0;
let signCountMap = {};
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
                // showMessage("【鱼吧】一键签到成功! 获得经验" + response.response.data, "success");
                // console.log("【极速鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
            } else if (response.response.data == 0) {
                // showMessage("【鱼吧】没有7级以上的鱼吧或极速签到已完成", "warning");
                // console.log("【极速鱼吧】" + group_id + response.response.message);
            } else {
                // showMessage("【鱼吧】" + response.response.message, "warning");
                // console.log("【极速鱼吧】" + response.response.message);
            }

        }
    });
}

async function signYuba(group_id, t) {
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
        onload: async function (response) {
            if (signCountMap[group_id] >= 10) {
                return;
            }
            if (response.response.message == "签到失败") {
                await sleep(2000);
                signYuba(group_id, t);
                return;
            }
            if (signCountMap[group_id]) {
                signCountMap[group_id]++;
            } else {
                signCountMap[group_id] = 1;
            }
            doneYuba++;
            if (response.response.message == "") {
                signedYuba++;
                // showMessage("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp, "success");
                // console.log("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
            } else {
                // showMessage("【鱼吧】" + group_id + response.response.message, "warning");
                // console.log("【鱼吧】" + group_id + response.response.message);
            }
            
            signYubaSupplementary(group_id);
            if (doneYuba == totalYuba) {
                // 完成全部签到
                if (signedYuba > 0) {
                    if (totalYuba - signedYuba == 0) {
                        showMessage("【鱼吧】" + String(signedYuba) + "个鱼吧签到完成", "success")
                    } else {
                        showMessage("【鱼吧】" + String(signedYuba) + "个鱼吧签到完成，" + String(totalYuba - signedYuba) + "个鱼吧已签到", "success");
                    }
                    
                } else {
                    showMessage("【鱼吧】"+ String(totalYuba) + "个鱼吧已签到", "warning");
                }
                signedYuba = null;
                totalYuba = null;
                doneYuba = null;
            }
        }
    });
}

async function signYubaSupplementary(group_id) {
    let result = await signSupplementary(group_id);
    for (let i = 0; i < result.data.supplementary_cards; i++) {
        await signSupplementary(group_id);
    }
}

async function signYubaList() {
    let yubaList = [];
    let ret = await getYubaPage(1);
    yubaList = yubaList.concat(ret.list);
    let pageNum = Number(ret.count_page) - 1;
    if (pageNum >= 1) {
        for (let i = 0; i < pageNum; i++) {
            let curPage = 2 + i;
            ret = await getYubaPage(curPage);
            yubaList = yubaList.concat(ret.list);
        }
    }
    totalYuba = yubaList.length;
    signYubaFast();
    for (let i = 0; i < yubaList.length; i++) {
        signYuba(yubaList[i].group_id, dyToken);
    }

}


function getYubaPage(page) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://yuba.douyu.com/wbapi/web/group/myFollow?page=" + String(page) + "&limit=30",
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "dy-client": "pc",
              "dy-token": dyToken
            },
            onload: function(response) {
                resolve(response.response.data)
            }
        });
    })
}

function getSupplementaryNums(group_id) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://yuba.douyu.com/wbapi/web/signDetail?group_id=" + group_id,
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "dy-client": "pc",
              "dy-token": dyToken
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}

function signSupplementary(group_id) {   
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://mapi-yuba.douyu.com/wb/v3/supplement",
            responseType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "client": "android",
                "token": dyToken,
            },
            data: "group_id=" + group_id,
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}