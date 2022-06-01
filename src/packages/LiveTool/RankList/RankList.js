let rankListData = {
    day: {},
    week: {},
    all: {}
};
function initPkg_LiveTool_RankList() {
}

function initPkg_LiveTool_RankList_Handle(text) {
    if (getType(text) == "ranklist") {
        let data = stt_deserialize(text);
        if (data.list_day) {
            rankListData.day = setRankListData(data.list_day);
        }
        if (data.list) {
            rankListData.week = setRankListData(data.list);
        }
        if (data.list_all) {
            rankListData.day = setRankListData(data.list_all);
        }
        let rankItems = document.getElementsByClassName("ChatRankWeek-listItem--nickname");
        for (let i = 0; i < rankItems.length; i++) {
            let rankItem = rankItems[i];
            let rankItemName = rankItem.innerText;
            let rankItemParent = rankItem.parentElement;
            let rankItemType = rankItem.parentElement.parentElement.parentElement.className.includes("DayRank") ? "day" : "week";

            let rankContent = rankItemType === "day" ? rankListData.day[rankItemName] : rankListData.week[rankItemName];
            if (rankItemParent.className.includes("--top")) {
                rankItem.innerHTML += `<span class="exRankPoint--top">${rankContent}</span>`;
            } else {
                rankItem.innerHTML += `<span class="exRankPoint">${rankContent}</span>`;
            }
        }
    }
}

function setRankListData(list) {
    let obj = {};
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        obj[item.nickname] = Number(item.gold) / 100;
    }
    return obj;
}