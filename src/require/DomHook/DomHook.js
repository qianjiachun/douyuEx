class DomHook {
    constructor(selector, callback) {
        this.selector = selector;
        let targetNode = document.querySelector(this.selector);
        let observer = new MutationObserver(function(mutations) {
            callback(mutations);
        });
        observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    }
}