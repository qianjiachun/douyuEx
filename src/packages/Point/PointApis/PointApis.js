function getUserPoint(token) {
    // 获取用户积分
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/query_by_uid",
            data: "token=" + token,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function getItemList(token) {
    // 获取物品列表
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/query_item",
            data: "token=" + token,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function exchangeItem(token, item_id, id, info) {
    // 兑换物品
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/exchange",
            data: "token=" + token + "&item_id=" + item_id + "&id=" + id + "&info=" + info,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}


function getExchangeRecord(token, offset) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/query_exchange",
            data: "token=" + token + "&offset=" + offset,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}

function getPointList(token) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://122.51.5.63:27999/douyu/point/5189167/point_list",
            data: "token=" + token,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    })
}