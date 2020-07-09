function initPkg_Point() {
	initPkg_Point_insertDom();
    initPkg_Point_Func();
    initPkg_Point_Constructor();
    initPkg_Point_Module();
}

function initPkg_Point_Module() {
    initPkg_Point_PointPanel();
}

function initPkg_Point_insertDom() {
	let a = document.createElement("div");
    a.id = "ex-point";
    a.innerHTML = `
    <span>💗 积分</span>
    <span id="point__value" class="PlayerToolbar-dataLoadding"></span>
    `;
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Point_Func() {
    document.getElementById("ex-point").addEventListener("click", () => {
        let a = document.getElementsByClassName("point__panel")[0];
        if (a.style.display != "block") {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
    })
}

async function initPkg_Point_Constructor() {
    let ret = await getUserPoint(dyToken);
    let valueDom = document.getElementById("point__value");
    if (ret.error == "0") {
        valueDom.className = "";
        valueDom.innerText = ret.data[0].point;
        document.getElementById("ex-point").title = `更新时间：${ ret.data[0].update_time }`;
    } else if (ret.error == "2") {
        alert(ret.msg);
    } else {
        valueDom.className = "";
        valueDom.innerText = "0";
    }
}

async function updateUserPoint() {
    let ret = await getUserPoint(dyToken);
    let valueDom = document.getElementById("point__value");
    if (ret.error == "0") {
        valueDom.className = "";
        valueDom.innerText = ret.data[0].point;
        document.getElementById("ex-point").title = `更新时间：${ ret.data[0].update_time }`;
        showMessage("【积分系统】积分更新完毕", "success");
    } else if (ret.error == "2") {
        alert(ret.msg);
    } else {
        valueDom.className = "";
        valueDom.innerText = "0";
    }
}
