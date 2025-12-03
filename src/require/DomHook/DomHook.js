class DomHook {
    constructor(elementOrSelector, isSubtree, callback, observeAttributes = false) {
        let targetNode = null;
        if (elementOrSelector instanceof Element) {
            targetNode = elementOrSelector;
        } else if (typeof elementOrSelector === "string") {
            targetNode = document.querySelector(elementOrSelector);
        }
        if (targetNode == null) {
            console.warn("DouyuEx DomHook: 目标节点不存在或已销毁", elementOrSelector);
            return;
        }
        let observer = new MutationObserver(function(mutations) {
            callback(mutations);
        });
        this.observer = observer;
        this.observer.observe(targetNode, { attributes: observeAttributes, childList: true, subtree: isSubtree });
    }
    closeHook() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}