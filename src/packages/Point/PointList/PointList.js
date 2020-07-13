function initPkg_Point_PointList() {
    initPkg_Point_PointList_insertDom();
}
function initPkg_Point_PointList_insertDom() {
    renderPointList();
}

function initPkg_Point_PointList_insertFunc() {
    document.getElementsByClassName("pointlist__close")[0].onclick = () => {
        let a = document.getElementById("ex-pointlist");
        if (a !== null) {
            a.remove();
        }
    }
}

async function renderPointList() {
    if (document.getElementById("ex-pointlist") !== null) {
        return;
    }

    let ret = await getPointList(dyToken);
    if (ret.error != "0") {
        showMessage("【积分系统】获取积分榜失败：" + ret.msg, "error");
        return;
    }
    if (ret.data == null) {
        showMessage("【积分系统】积分榜暂无数据", "error");
        return;
    }

    let a = document.createElement("div");
    a.id = "ex-pointlist";
    
    let html = `<div class="pointlist__close">X</div>
    <div class="pointlist__wrap">
    <table>
        <tr>
            <th>排名</th>
            <th>昵称</th>
            <th>积分</th>
        </tr>`;
    for (let i = 0; i < ret.data.length; i++) {
        html = html + `
        <tr>
            <td>${ i + 1 }</td>
            <td>${ ret.data[i].id }</td>
            <td>${ ret.data[i].point }</td>
        </tr>
        `;
    }
    html = html + "</table></div>";

    a.innerHTML = html;

    let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
    b.insertBefore(a, b.childNodes[0]);

    // 异步函数所以要把绑定函数放在最后
    initPkg_Point_PointList_insertFunc();
}