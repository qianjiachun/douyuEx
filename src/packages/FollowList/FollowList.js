let followListHook;
function initPkg_FollowList() {
    let intID = setInterval(() => {
        if (getValidDom([".PlayerToolbar-ContentCell .PlayerToolbar-Wealth", "#js-backpack-enter"])) {
            followListHook = new DomHook(".Header-follow-content", false, handleFollowList);
            clearInterval(intID);
        }
    }, 1000);
}

function handleFollowList(m) {
    let active = document.getElementsByClassName("Header-follow-tab is-active")[0].innerText;
    if (active === "特别关注" || active === "视频动态") {
        return;
    }
    let panel = document.getElementsByClassName("Header-follow-listWrap");
    if (panel.length == 0) {
        return;
    }
    // panel[0].style.marginTop = "12px";
    document.getElementsByClassName("Header-follow-listBox")[0].style.display = "none";
    setNewFollowList(panel[0]);
}
async function setNewFollowList(panel) {
    let followList = await getFollowList();
    if (followList.error != "0") {
        return;
    }
    const FOLLOWLIST_LIMIT = 10; // 关注列表最多显示个数
    let limit = 0;
    let html = `<div id="refreshFollowList"><span style="margin-left:3px">长按弹出同屏播放</span></div>`;
    let nowTime = Math.floor(Date.now()/1000);
    for (let i = 0; i < followList.data.list.length; i++) {
        let item = followList.data.list[i];
        if (item.show_status == "1" && item.videoLoop == "0") {
            // 开播且非录播
            html += `<li class="DropPaneList FollowList ExFollowListItem" rid="${ item.room_id }"><a><div class="DropPaneList-cover"><div class="LazyLoad is-visible DyImg "><img src="${ String(item.avatar_small).replace("_big","_small") }" alt="${ item.nickname }" class="DyImg-content is-normal "></div></div><div class="DropPaneList-info"><p><span class="DropPaneList-hot"><i></i>${ item.online }</span><span class="DropPaneList-title">${ item.room_name }</span></p><p><span class="DropPaneList-name">${ item.nickname }</span><span class="DropPaneList-time">已播${ formatSeconds(nowTime - Number(item.show_time)) }</span></p></div></a></li>`
            // html += `<li class="DropPaneList FollowList ExFollowListItem" rid="${ item.room_id }"><a><div class="DropPaneList-cover"><div class="DyImg "><img src="${ String(item.avatar_small).replace("_big","_small") }" alt="${ item.nickname }" class="DyImg-content is-normal "></div></div><div class="DropPaneList-info"><p><span class="DropPaneList-hot"><i></i>${ item.online }</span><span class="DropPaneList-title">${ item.room_name }</span></p><p><span class="DropPaneList-name">${ item.nickname }</span><span class="DropPaneList-time">已播${ formatSeconds(nowTime - Number(item.show_time)) }</span></p></div></a></li>`
            limit++;
        }
        if (limit >= FOLLOWLIST_LIMIT) {
            break;
        }
    }
    panel.innerHTML += html;


    let followListItems = document.getElementsByClassName("ExFollowListItem");
    for (let i = 0; i < followListItems.length; i++) {
        let cclick = new CClick(followListItems[i]);
        cclick.longClick(() => {
            createNewVideo(videoPlayerArr.length, followListItems[i].getAttribute("rid"), "Douyu");
            document.querySelector(".Follow .public-DropMenu").className = "public-DropMenu";
        });
        cclick.click(() => {
            openPage("https://www.douyu.com/" + followListItems[i].getAttribute("rid"), true);
        });
        followListItems[i].addEventListener("mousedown", (event) => {
            if (event.button == 1) {
                // 鼠标中键
                openPage("https://www.douyu.com/" + followListItems[i].getAttribute("rid"), false);
            }
        })
    }
}

function getFollowList() {
    return new Promise(resolve => {
        fetch("https://www.douyu.com/wgapi/livenc/liveweb/follow/list?sort=1&cid1=0", {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}