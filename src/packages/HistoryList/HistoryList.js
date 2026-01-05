function initPkg_HistoryList() {
    (function() {
        const originalXHROpen = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string' && /\/(japi\/watchHistory\/apinc\/getHistoryList|wgapi\/vodnc\/front\/live\/history\/getList)/.test(url)) {
                //console.log('DouyuEx 历史列表: 发现历史列表请求，修改URL...');
                try {
                    url = url.replace(/([?&](?:num|limit))=\d+/, '$1=8');
                    //console.log('DouyuEx 历史列表: 已将历史列表请求数量改为 8');
                } catch (e) {
                    console.error('DouyuEx 历史列表: 修改历史列表请求数量失败', e);
                }
            }
            return originalXHROpen.call(this, method, url, ...args);
        };
    })();
}
