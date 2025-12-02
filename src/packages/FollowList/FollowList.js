function initPkg_FollowList() {
    (function() {
        const originalXHROpen = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string' && url.endsWith('/wgapi/vodnc/center/follow/getSubDynamicVodListWithLive')) {
                //console.log('DouyuEx 关注列表: 发现视频动态请求，修改URL...');
                url = url.replace('/getSubDynamicVodListWithLive', '/getSubDynamicVodList');
                this._isVideoDynamicListTarget = true;
            }
            return originalXHROpen.call(this, method, url, ...args);
        };
        const originalXHRSend = unsafeWindow.XMLHttpRequest.prototype.send;
        unsafeWindow.XMLHttpRequest.prototype.send = function(body) {
            if (this._isVideoDynamicListTarget) {
                //console.log('DouyuEx 关注列表: 修改视频动态请求上限为20...');
                try {
                    body = JSON.stringify({ ...JSON.parse(body || '{}'), limit: 20 });
                } catch (e) {
                    console.error('DouyuEx 关注列表: 解析视频动态body失败，使用原始body:', e);
                }
            }
            return originalXHRSend.call(this, body);
        };
    })();

    let intID = setInterval(() => {
        const followContent = document.getElementsByClassName("Header-follow-content")[0];
        if (!followContent) return;
        clearInterval(intID);
        new ResizeObserver(() => {
            const followListBox = followContent.querySelector('.Header-follow-listBox');
            if (!followListBox || followListBox.childElementCount === 0) return;
            handleFollowList(followListBox, followContent);
            updateFollowList(followListBox);
        }).observe(followContent);
    }, 1000);
}

function handleFollowList(followListBox, followContent) {
    const listBoxRect = followListBox.getBoundingClientRect();
    const dropMenuRect = followListBox.closest('.public-DropMenu-drop').getBoundingClientRect();
    const spaceAbove = listBoxRect.top;
    const spaceBelow = dropMenuRect.bottom - listBoxRect.bottom;
    const extraOffset = (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? 22 : 16;
    const maxHeightValue = `calc(100dvh - ${Math.round(spaceAbove + spaceBelow + extraOffset)}px)`;
    if (maxHeightValue !== followContent.style.getPropertyValue('--followlist-max-height')) {
        followContent.style.setProperty('--followlist-max-height', maxHeightValue);
    }
}

async function updateFollowList(followListBox) {
    let loadInCurrentPage = await GM_getValue("Ex_LoadInCurrentPage", false);
    const followListItems = followListBox.getElementsByClassName("DropPaneList");

    if (!followListBox.querySelector('#followlist-toolbar')) {
        followListBox.insertAdjacentHTML(
            'afterbegin',
            `<div id="followlist-toolbar">
                <label id="followlist-checkbox">
                    <input id="followlist-checkbox-input" type="checkbox">
                    <span id="followlist-checkbox-tip">在当前页面加载</span>
                </label>
                <span id="followlist-longclick-tip">长按弹出同屏播放</span>
            </div>`
        );
        const checkbox = followListBox.querySelector('#followlist-checkbox-input');
        checkbox.checked = loadInCurrentPage;
        checkbox.addEventListener("change", () => {
            loadInCurrentPage = checkbox.checked;
            for (let i = 0; i < followListItems.length; i++) {
                const anchor = followListItems[i].querySelector('a[href^="/"]');
                if (anchor) anchor.target = loadInCurrentPage ? '_self' : '_blank';
            }
            GM_setValue("Ex_LoadInCurrentPage", loadInCurrentPage);
            showMessage(`【关注列表】已${loadInCurrentPage ? "开启" : "关闭"}当前页加载功能（${loadInCurrentPage ? "当前页面直接加载关注的直播间" : "使用新网页打开关注的直播间"}）`, "info");
        });
    }

    for (let i = 0; i < followListItems.length; i++) {
        const list = followListItems[i];
        const anchor = list.querySelector('a');
        if (!anchor || anchor._enhanced) continue;
        anchor._enhanced = true;
        const href = anchor.getAttribute('href');
        if (!href || !href.startsWith('/')) continue;
        anchor.target = loadInCurrentPage ? '_self' : '_blank';
        if (list.classList.contains("FollowList")) {
            const roomId = href.split('/').pop();
            if (!roomId) continue;
            new CClick(anchor).longClick(() => {
                createNewVideo(videoPlayerArr.length, roomId, "Douyu");
                followListBox.closest(".public-DropMenu").className = "public-DropMenu";
            });
        }
    }
}