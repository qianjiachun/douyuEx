let rankListData = {
    day: {},
    week: {},
    all: {}
};
function initPkg_LiveTool_RankList() {
    let a = new DomHook(".layout-Player-rankAll", false, (m) => {
        let dom = document.getElementsByClassName("RankAllMain-container");
        if (dom.length > 0) {
            if (Object.keys(rankListData.all).length > 0) {
                setRankListData("all", document.querySelectorAll(".layout-Player-rankAll .ChatRankWeek-listItem--nickname"));
            }
        }
    })
}

function initPkg_LiveTool_RankList_Handle(text) {
    if (getType(text) == "ranklist") {
        let data = stt_deserialize(text);
        if (data.list_day) {
            rankListData.day = getRankListData(data.list_day);
            setRankListData("day", document.querySelectorAll(".layout-Player-rank .ChatDayRank .ChatRankWeek-listItem--nickname"));
        }
        if (data.list) {
            rankListData.week = getRankListData(data.list);
            setRankListData("week", document.querySelectorAll(".layout-Player-rank .ChatRankWeek .ChatRankWeek-listItem--nickname"));
        }
        if (data.list_all) {
            rankListData.all = getRankListData(data.list_all);
        }
        setRankListData();
    }
}

function setRankListData(rankItemType, rankItems) {
    if (!rankItems) return;
    for (let i = rankItemType === "week" ? 10 : 0; i < rankItems.length; i++) {
        let rankItem = rankItems[i];
        let rankItemName = rankItem.innerHTML.split("<span")[0];
        let rankItemParent = rankItem.parentElement;
        let rankContent =  rankListData[rankItemType][rankItemName];
        if (rankItemParent.className.includes("--top")) {
            rankItem.innerHTML = `${rankItemName}<span class="exRankPoint--top">${rankContent}</span>`;
        } else {
            rankItem.innerHTML = `${rankItemName}<span class="exRankPoint">${rankContent}</span>`;
        }
    }
}

function getRankListData(list) {
    let obj = {};
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        obj[item.nickname] = Number(item.gold) / 100;
    }
    return obj;
}