function initPkg_Point() {
	initPkg_Point_insertDom();
    initPkg_Point_Func();
    initPkg_Point_Constructor();
}
function initPkg_Point_insertDom() {
	let a = document.createElement("div");
    a.className = "ex-icon";
    a.id = "ex-point";
    a.innerHTML = `
    <span>💎 积分</span>
    <span id="point__value" class="PlayerToolbar-dataLoadding"></span>
    `;
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Point_Func() {
    document.getElementById("ex-point").addEventListener("click", () => {
        alert(`
这是骆歆直播间积分系统的试运行版
只在骆歆直播间生效，不影响插件其他功能与效率
目前只有查询自己的积分功能
后续会加入积分兑换功能（类似于鱼购精选）
当前积分规则：
1. 每日在开播期间进入直播间，+1分，限1次
2. 每日在开播期间发送带有#签到的弹幕，+1分，限1次
3. 每日在直播间发送任意弹幕，+1分，加分冷却时间1小时，限4次，
        `);
    })
}

async function initPkg_Point_Constructor() {
    let ret = await getUserPoint(dyToken);
    let valueDom = document.getElementById("point__value");
    if (ret.error == "0") {
        valueDom.className = "";
        valueDom.innerText = ret.data[0].point;
        valueDom.title = `更新时间：${ ret.data[0].update_time }`;
    } else {
        valueDom.className = "";
        valueDom.innerText = "0";
    }
}

function getUserPoint(token) {
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