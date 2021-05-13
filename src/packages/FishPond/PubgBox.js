function initPkg_FishPond_PubgBox_Timer() {
    getPubgBox();
}

function getPubgBox() {
    fetch('https://www.douyu.com/japi/carnivalApi/nc/crowdTask/baseTask/status?actAlias=20210508EQYDJ', {
        method: 'GET',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'include',
    }).then(res => {
        return res.json();
    }).then(ret => {
        if (ret.error == 0 && ret.data.third.taskStatus !== 1) {
            fetch('https://www.douyu.com/japi/carnival/nc/actTask/takePrize', {
                method: 'POST',
                mode: 'no-cors',
                cache: 'default',
                credentials: 'include',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `csrfToken=${getCSRF()}&taskAlias=${ret.data.third.taskAlias}&rid=${rid}`
            }).then(res => {
                return res.json();
            }).then(ret => {
                if (ret.error == 0) {
                    let prize_name = ret.data.sendRes.items[0].prizeName;
                    let prize_num = ret.data.sendRes.items[0].prizeNum;
                    showMessage("【PUBG寻宝】获得" + prize_name + "*" + prize_num, "success");
                }
            }).catch(err => {
                console.log("请求失败!", err);
            })
        }
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

// 领大的
// fetch('https://www.douyu.com/japi/carnivalApi/nc/crowdTask/takePrize', {
//         method: 'POST',
//         mode: 'no-cors',
//         cache: 'default',
//         credentials: 'include',
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//         body: `csrfToken=${getCSRF()}&actAlias=20210508EQYDJ&taskAlias=20210508EQYDJ_T8&exchangeBurst=true`
//     }).then(res => {
//         return res.json();
//     }).then(ret => {
//         console.log(ret)
//     }).catch(err => {
//         console.log("请求失败!", err);
//     })
