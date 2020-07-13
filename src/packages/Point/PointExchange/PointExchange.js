function initPkg_Point_PointExchange() {
    initPkg_Point_PointExchange_insertDom();
    initPkg_Point_PointExchange_insertFunc();
}
function initPkg_Point_PointExchange_insertDom() {
	renderExchangePanel();
}

function initPkg_Point_PointExchange_insertFunc() {

}


async function renderExchangePanel() {
    if (document.getElementById("ex-exchange") !== null) {
        return;
    }

    let ret = await getItemList(dyToken);
    if (ret.error != "0") {
        showMessage("【积分系统】获取物品列表失败：" + ret.msg, "error");
        return;
    }
    if (ret.data == null) {
        showMessage("【积分系统】暂无可兑换的物品", "error");
        return;
    }

    let a = document.createElement("div");
    a.id = "ex-exchange";
    
    let html = `<div class="exchange__panel"><div class="exchange__close">X</div>
    <div class="exchange__wrap">`;
    for (let i = 0; i < ret.data.length; i++) {
        html = html + `
            <div class="item__wrap">
                <img class="item__pic" src="${ ret.data[i].pic }" />
                <span class="item__name">${ ret.data[i].name }</span>
                <span class="item__description">${ ret.data[i].description }</span>
                <span class="item__num">剩余 ${ ret.data[i].num } 件</span>
                <span class="item__price">💗${ ret.data[i].price }</span>
                <div class="item__exchange">兑换</div>
            </div>
        `;
    }
    html = html + "</div></div>";

    a.innerHTML = html;

    let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
    b.insertBefore(a, b.childNodes[0]);
    
    bindExchangePanel(ret);
}

function bindExchangePanel(itemJson) {
    let dom = document.getElementsByClassName("item__exchange");
    for (let i = 0; i < dom.length; i++) {
        dom[i].onclick = () => {
            exchangeItemEvent(itemJson.data[i].id, itemJson.data[i].num, itemJson.data[i].price);
        }
    }
    document.getElementsByClassName("exchange__close")[0].onclick = () => {
        let a = document.getElementById("ex-exchange");
        if (a !== null) {
            a.remove();
        }
    }
}
async function exchangeItemEvent(item_id, item_num, item_price){
    if (item_num <= 0) {
        showMessage("【积分系统】兑换失败：物品数量不足", "error");
        return;
    }
    let currentPoint = document.getElementById("point__value").innerText;
    if (currentPoint - item_price < 0) {
        showMessage("【积分系统】兑换失败：积分不足", "error");
        return;
    }

    showPrompt("请填写备注信息（联系方式/收获地址）",async (info) => {
        if (info == "") {
            showMessage("【积分系统】兑换失败：未填写备注信息", "error");
            return;
        }
        
        let id = await getUserName();
        let ret = await exchangeItem(dyToken, item_id, id, info);
        if (ret.error == "0") {
            showMessage("【积分系统】" + ret.msg, "success");
            if (ret.data.length > 0) {
                document.getElementById("point__value").innerText = ret.data[0].point;
                document.getElementById("ex-point").title = `更新时间：${ ret.data[0].update_time }`;
            }
        } else {
            showMessage("【积分系统】" + ret.msg, "error");
        }
    }, () => {return});
    
}
