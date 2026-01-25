class DomHook {
    static _observers = new WeakMap();
    constructor(elementOrSelector, isSubtree, callback, observeAttributes = false) {
        if (typeof callback !== 'function') {
            console.error("DouyuEx DomHook: callback 不是一个函数", callback);
            return;
        }
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

        let configMap = DomHook._observers.get(targetNode);
        if (!configMap) {
            configMap = new Map();
            DomHook._observers.set(targetNode, configMap);
        }

        const configKey = `${isSubtree}|${observeAttributes}`;
        let observerEntry = configMap.get(configKey);
        if (!observerEntry) {
            const callbacks = new Map();
            const observer = new MutationObserver(mutations => {
                for (const [hook, callback] of callbacks) {
                    if (!hook._targetNode.isConnected) {
                        hook.closeHook();
                        continue;
                    }
                    try {
                        callback.call(hook, mutations);
                    } catch (err) {
                        console.error("DouyuEx DomHook: 观察实例回调执行错误", targetNode, configKey, err);
                    }
                }
            });

            try {
                observer.observe(targetNode, {
                    attributes: observeAttributes,
                    childList: true,
                    subtree: isSubtree
                });
                observerEntry = { observer, callbacks };
                configMap.set(configKey, observerEntry);
                //console.log("DouyuEx DomHook: 目标节点配置唯一，新建观察实例", targetNode, configKey);
            } catch (err) {
                console.error("DouyuEx DomHook: 观察实例初始化失败", targetNode, configKey, err);
                observer.disconnect();
                return;
            }
        } else {
            //console.log("DouyuEx DomHook: 目标节点配置相同，复用观察实例", targetNode, configKey);
        }

        observerEntry.callbacks.set(this, callback);
        this._targetNode = targetNode;
        this._configKey = configKey;
    }

    closeHook() {
        if (!this._targetNode) return;
        const configMap = DomHook._observers.get(this._targetNode);
        if (configMap) {
            const observerEntry = configMap.get(this._configKey);
            if (observerEntry) {
                observerEntry.callbacks.delete(this);
                if (observerEntry.callbacks.size === 0) {
                    observerEntry.observer.disconnect();
                    configMap.delete(this._configKey);
                    if (configMap.size === 0) {
                        DomHook._observers.delete(this._targetNode);
                        //console.log("DouyuEx DomHook: 目标节点已无其他配置，停止观察实例", this._targetNode);
                    } else {
                        //console.log(`DouyuEx DomHook: 移除当前配置观察实例，节点剩余实例: ${configMap.size}`, this._targetNode);
                    }
                } else {
                    //console.log(`DouyuEx DomHook: 移除节点回调，当前观察实例剩余回调: ${observerEntry.callbacks.size}`, this._targetNode, this._configKey);
                }
            } else {
                console.warn("DouyuEx DomHook: 尝试关闭一个不存在或已销毁的观察实例", this._targetNode, this._configKey);
            }
        }
        this._targetNode = null;
    }
}