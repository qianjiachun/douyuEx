let followListHook;
function initPkg_FollowList() {
    let intID = setInterval(() => {
        if (getValidDom([".Header-follow-content", "#js-backpack-enter"])) {
            followListHook = new DomHook(".Header-follow-content", false, handleFollowList);
            clearInterval(intID);
        }
    }, 1000);
}

function handleFollowList(m) {
    const followListBox = m[0].target.querySelector(".Header-follow-listBox");
    if (!followListBox || followListBox.childElementCount === 0) return;
    const listBoxRect = followListBox.getBoundingClientRect();
    const dropMenuRect = followListBox.closest('.public-DropMenu-drop').getBoundingClientRect();
    const spaceAbove = listBoxRect.top;
    const spaceBelow = dropMenuRect.bottom - listBoxRect.bottom;
    const extraOffset = 12;
    followListBox.style.setProperty(
        'max-height',
        `calc(100dvh - ${spaceAbove}px - ${spaceBelow}px - ${extraOffset}px)`,
        'important'
    );
    updateFollowList(followListBox);
}

async function updateFollowList(followListBox) {
    const loadInCurrentPage = await GM_getValue("Ex_LoadInCurrentPage", false);
    const isVideoDynamic = followListBox.classList.contains('is-videoDynamic');
    const followListItems = followListBox.getElementsByClassName("DropPaneList");

    if (!followListBox.querySelector('#followlist-toolbar')) {
        followListBox.insertAdjacentHTML(
            'afterbegin',
            `<div id="followlist-toolbar" style="color: grey; position: absolute; top: 0px; cursor: default; display: flex; justify-content: space-between; width: 100%; padding: 0 5px; box-sizing: border-box;">
                <label style="display: flex; cursor: pointer;">
                    <input type="checkbox" id="loadInCurrentPageCheckbox" style="margin-right: 5px;">
                    <span>在当前页面加载</span>
                </label>
                <span id="followlist-tip">长按弹出同屏播放</span>
            </div>`
        );
        const checkbox = followListBox.querySelector('#loadInCurrentPageCheckbox');
        checkbox.checked = loadInCurrentPage;
        checkbox.addEventListener("change", () => {
            const isChecked = checkbox.checked;
            for (let i = 0; i < followListItems.length; i++) {
                const anchor = followListItems[i].querySelector('a[href^="/"]');
                if (anchor) anchor.target = isChecked ? '_self' : '_blank';
            }
            GM_setValue("Ex_LoadInCurrentPage", isChecked);
            showMessage(`【关注列表】已${isChecked ? "开启" : "关闭"}当前页加载功能（${isChecked ? "当前页面直接加载关注的直播间" : "使用新网页打开关注的直播间"}）`, "info");
        });
        followListBox.querySelector('#followlist-tip').style.display = isVideoDynamic ? 'none' : '';
    }

    for (let i = 0; i < followListItems.length; i++) {
        const list = followListItems[i];
        const anchor = list.querySelector('a');
        if (!anchor || anchor._enhanced) continue;
        anchor._enhanced = true;
        const href = anchor.getAttribute('href');
        if (!href || !href.startsWith('/')) continue;
        anchor.target = loadInCurrentPage ? '_self' : '_blank';
        if (!isVideoDynamic) {
            const roomId = href.split('/').pop();
            if (!roomId) continue;
            new CClick(anchor).longClick(() => {
                createNewVideo(videoPlayerArr.length, roomId, "Douyu");
                followListBox.closest(".public-DropMenu").className = "public-DropMenu";
            });
        }
    }
}