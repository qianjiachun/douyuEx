function initPkg_ShowDanmaku() {
    let accessor = Object.getOwnPropertyDescriptor(unsafeWindow.XMLHttpRequest.prototype, 'responseText');
    Object.defineProperty(unsafeWindow.XMLHttpRequest.prototype, 'responseText', {
        get: function() {
            let text = accessor.get.call(this);
            if (this.responseURL.indexOf("/betard") !== -1) {
                return text.replace('player_barrage\":0', 'player_barrage\":1');
            }
            return text;
        },
        configurable: true
    });
}