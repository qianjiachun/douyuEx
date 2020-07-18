class DomHook {
    constructor(selector, isSubtree, callback) {
        this.selector = selector;
        this.isSubtree = isSubtree;
        let targetNode = document.querySelector(this.selector);
        let observer = new MutationObserver(function(mutations) {
            callback(mutations);
        });
        observer.observe(targetNode, { attributes: true, childList: true, subtree: this.isSubtree });
    }
}