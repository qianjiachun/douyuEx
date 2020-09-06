let followListHook;
let isFollowListHandle = false;
function initPkg_FollowList() {
    let intID = setInterval(() => {
        if (typeof(document.getElementsByClassName("DropPane-icon Follow-icon")[0]) != "undefined") {
            followListHook = new DomHook(".Header-follow-wrap .public-DropMenu-drop-main", true, handleFollowList)
            clearInterval(intID);
        }
    }, 1000);
    
}

function handleFollowList(m) {
    if (isFollowListHandle == true) {
        return;
    }
    let panel = document.querySelector(".Follow .DropPane-drop");
    if (panel == null) {
        return;
    }
    isFollowListHandle = true;
    followListHook.closeHook();
    
    setNewFollowList(panel);
}

async function setNewFollowList(panel) {
    let followList = await getFollowList();
    if (followList.error != "0") {
        return;
    }
    const FOLLOWLIST_LIMIT = 10; // 关注列表最多显示个数
    let limit = 0;
    let html = `<div id="refreshFollowList"><svg t="1599379719000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2379" width="18" height="18"><path d="M510.073 923.196 510.073 923.196c99.662-0.041 191.5-35.831 262.533-95.089 82.025-68.3 137.014-168.503 146.441-281.309L1023 546.863 859.829 348.752 696.358 546.63l108.763 0.067c-9.025 77.869-47.909 146.288-105.186 194.105-51.65 42.962-117.496 68.71-189.979 68.829-92.159 0.054-174.147-41.569-228.976-107.283-7.901-9.504-15.229-19.52-21.901-29.953l-74.663 90.969c3.072 3.948 6.133 7.862 9.338 11.668C268.988 865.627 383.075 923.369 510.073 923.196L510.073 923.196zM213.972 479.495c8.545-78.735 47.634-148.019 105.423-196.281 51.654-42.959 117.551-68.693 189.95-68.815 92.191-0.068 174.18 41.553 229.011 107.266 9.072 10.907 17.317 22.471 24.766 34.569l75.223-91.067c-4.111-5.485-8.317-10.931-12.728-16.199-75.285-90.528-189.382-148.303-316.402-148.164-99.597 0.1-191.468 35.896-262.463 95.142l-0.236 0.188c-82.564 68.788-137.647 169.924-146.484 283.672L1 480.086l163.856 197.511 162.78-198.406L213.972 479.495 213.972 479.495z" p-id="2380" fill="#8a8a8a"></path></svg></div>`;
    let nowTime = Math.floor(Date.now()/1000);
    for (let i = 0; i < followList.data.list.length; i++) {
        let item = followList.data.list[i];
        if (item.show_status == "1" && item.videoLoop == "0") {
            // 开播且非录播
            html += `<li class="DropPaneList FollowList"><a href="/${ item.room_id }" target="_blank"><div class="DropPaneList-cover"><div class="DyImg "><img src="${ String(item.avatar_small).replace("_big","_small") }" alt="${ item.nickname }" class="DyImg-content is-normal "></div></div><div class="DropPaneList-info"><p><span class="DropPaneList-hot"><i></i>${ item.online }</span><span class="DropPaneList-title">${ item.room_name }</span></p><p><span class="DropPaneList-name">${ item.nickname }</span><span class="DropPaneList-time">已播${ formatSeconds(nowTime - Number(item.show_time)) }</span></p></div></a></li>`
            limit++;
        }
        if (limit >= FOLLOWLIST_LIMIT) {
            break;
        }
    }
    panel.innerHTML = html;

    document.getElementById("refreshFollowList").addEventListener("click", () => {
        let a = document.querySelector(".Follow .DropPane-drop");
        if (a != null) {
            setNewFollowList(panel);
        }
    })
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