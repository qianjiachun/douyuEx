function initPkg_HistoryList() {
    (function() {
        const originalXHROpen = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string' && /\/(japi\/watchHistory\/apinc\/getHistoryList|wgapi\/vodnc\/front\/live\/history\/getList)/.test(url)) {
                //console.log('DouyuEx 历史列表: 发现历史列表请求，修改URL...');
                try {
                    url = url.replace(/([?&](?:num|limit))=\d+/, '$1=99');
                    //console.log('DouyuEx 历史列表: 已将历史列表请求数量改为 99');
                } catch (e) {
                    console.error('DouyuEx 历史列表: 修改历史列表请求数量失败', e);
                }
            }
            return originalXHROpen.call(this, method, url, ...args);
        };
    })();

    gDomObserver.waitForElement('.Header-history-content').then(historyContent => {
        new ResizeObserver(() => {
            const dropPane = historyContent.querySelector('.DropPane-drop');
            if (!dropPane || dropPane.childElementCount === 0) return;
            handleHistoryList(dropPane, historyContent);
        }).observe(historyContent);
    });
}

function handleHistoryList(dropPane, historyContent) {
    const dropPaneRect = dropPane.getBoundingClientRect();
    const dropMenuRect = dropPane.closest('.public-DropMenu-drop').getBoundingClientRect();
    const spaceAbove = dropPaneRect.top;
    const spaceBelow = dropMenuRect.bottom - dropPaneRect.bottom;
    const extraOffset = (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? 22: 16;
    const maxHeightValue = `calc(100dvh - ${Math.round(spaceAbove + spaceBelow + extraOffset)}px)`;
    if (maxHeightValue !== historyContent.style.getPropertyValue("--historylist-max-height")) {
        historyContent.style.setProperty('--historylist-max-height', maxHeightValue);
    }
}