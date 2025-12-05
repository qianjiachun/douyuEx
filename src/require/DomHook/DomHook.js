class DomHook {
    constructor(selector, isSubtree, callback, observeAttributes = false) {
        this.selector = selector;
        this.isSubtree = isSubtree;
        let targetNode = document.querySelector(this.selector);
        if (targetNode == null) {
            return;
        }
        let observer = new MutationObserver(function(mutations) {
            callback(mutations);
        });
        this.observer = observer;
        this.observer.observe(targetNode, { attributes: observeAttributes, childList: true, subtree: this.isSubtree });
    }
    closeHook() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}