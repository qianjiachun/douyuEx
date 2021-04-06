function initPkg_FansBadgeList() {
    setFansBadgeList();
}

function setFansBadgeList() {
    // document.querySelectorAll(".fans-badge-list tr")[1].getAttribute("data-fans-gbdgts")
    let nowTime = new Date().getTime();
    let items = document.querySelectorAll(".fans-badge-list tr");
    if (items.length <= 1) {
        return;
    }
    // items[0].getElementsByTagName("th")[1].setAttribute("width", "30%");
    // 跳过表头
    for (let i = 1; i < items.length; i++) {
        let item = items[i];
        let tt = Number(item.getAttribute("data-fans-gbdgts")) * 1000;
        let ttStr = dateFormat("yyyy-MM-dd hh:mm:ss",new Date(tt)); // 获取日期
        let days = Math.floor((nowTime - tt) / 86400000); // 距今天数
        let style = days >= 300 ? "font-weight:600;color:red;" : "";
        let td = item.getElementsByTagName("td")[1];
        // td.innerHTML += `获取于：${ttStr}（${days}天）`;
        td.innerHTML += `
        已获取 <span style="${style}">${days}</span> 天<br/>
        ${ttStr}`;
        // td.innerHTML += `于${ttStr}获取（${days}天）`;
    }
}