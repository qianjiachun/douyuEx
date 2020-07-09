let currentOffset = 0;
let maxOffset = 99999;
function initPkg_Point_PointRecord() {
    currentOffset = 0;
    initPkg_Point_PointRecord_insertDom();
    initPkg_Point_PointRecord_insertFunc();
}
function initPkg_Point_PointRecord_insertDom() {
    renderRecordWrap();
    renderRecord(currentOffset);
}

function initPkg_Point_PointRecord_insertFunc() {
    document.getElementsByClassName("record__close")[0].onclick = () => {
        let a = document.getElementById("ex-record");
        if (a !== null) {
            a.remove();
        }
    }
    document.getElementsByClassName("record__prev")[0].onclick = () => {
        if (currentOffset < 10) {
            showMessage("【积分系统】兑换系统已到首页", "error");
            return;
        }
        currentOffset = currentOffset - 10;
        renderRecord(currentOffset);
    }
    document.getElementsByClassName("record__next")[0].onclick = () => {
        if (currentOffset >= maxOffset) {
            showMessage("【积分系统】兑换系统已到尾页", "error");
            return;
        }
        currentOffset = currentOffset + 10;
        renderRecord(currentOffset);
    }
}


function renderRecordWrap() {
    if (document.getElementById("ex-record") !== null) {
        return;
    }
    let a = document.createElement("div");
    a.id = "ex-record";
    
    let html = `
    <div class="record__close">X</div>
    <div class="records__wrap"></div>
    <div class="record__pagenav">
        <div class="record__prev">上一页</div>
        <div class="record__next">下一页</div>
    </div>
    `;
    a.innerHTML = html;
    let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
    b.insertBefore(a, b.childNodes[0]);
}

async function renderRecord(offset) {
    let dom = document.getElementsByClassName("records__wrap");
    if (dom.length <= 0) {
        return;
    }
    dom[0].innerHTML = "";


    let recordList = await getExchangeRecord(dyToken, offset);
    if (recordList.error != "0") {
        showMessage("【积分系统】" + recordList.msg, "error");
        return;
    }
    if (recordList.data == null) {
        maxOffset = currentOffset;
        showMessage("【积分系统】无兑换记录", "error");
        return;
    }
    
    

    let html = "";


    for (let i = 0; i < recordList.data.length; i++) {
        html += `
        <div class="record__wrap">
            <div class="record__left">
                <div class="record__name">${ recordList.data[i].item_name }</div>
                <div class="record__updatetime">${ recordList.data[i].update_time }</div>
            </div>
            <div class="record__right">
                <div class="record__price">💗${ recordList.data[i].price }</div>
            </div>
        </div>
        `;
    }

    dom[0].innerHTML = html;

    bindRecord(recordList);
}

function bindRecord(recordJson) {
    let dom = document.getElementsByClassName("record__wrap");
    for (let i = 0; i < dom.length; i++) {
        dom[i].onclick = () => {
            PostbirdAlertBox.alert({
                'title': '备注信息',
                'content': recordJson.data[i].info,
                'okBtn': '确定',
                'contentColor': 'rgb(51,51,51)',
            });
        }
    }
}