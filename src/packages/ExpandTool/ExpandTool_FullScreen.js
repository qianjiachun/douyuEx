function initPkg_ExpandTool_Player() {
    initPkg_ExpandTool_Player_insertDom();
    initPkg_ExpandTool_FullScreenPage_Set();
    initPkg_ExpandTool_FullScreenPage_insertFunc();
    initPkg_ExpandTool_HighestVideoQuality_Set();
    initPkg_ExpandTool_HighestVideoQuality_insertFunc();
}

function initPkg_ExpandTool_Player_insertDom() {
    document.getElementsByClassName("extool")[0].insertAdjacentHTML(
        "afterbegin",
        `<span>
            <label title="自动网页全屏"><input id="extool__fullscreenpage" type="checkbox">自动网页全屏</label>
            <label title="自动折叠侧栏"><input id="extool__hideplayersidebar" type="checkbox">自动折叠侧栏</label>
            <label title="自动最高画质"><input id="extool__highestvideoquality" type="checkbox">自动最高画质</label>
        </span>`
    );
}

function initPkg_ExpandTool_FullScreenPage_insertFunc() {
    const fullscreenpage = document.getElementById("extool__fullscreenpage");
    const hideplayersidebar = document.getElementById("extool__hideplayersidebar");
    fullscreenpage.addEventListener("click", function() {
        const isFullScreenPage = fullscreenpage.checked;
        saveData_ExpandTool("isFullScreenPage", isFullScreenPage);
        hideplayersidebar.disabled = !isFullScreenPage;
        if (isFullScreenPage) {
            showMessage("刷新页面生效", "success");
        }
    });
    hideplayersidebar.addEventListener("click", function() {
        const isHidePlayerSidebar = hideplayersidebar.checked;
        saveData_ExpandTool("isHidePlayerSidebar", isHidePlayerSidebar);
        if (isHidePlayerSidebar) {
            showMessage("刷新页面生效", "success");
        }
    });
}

function initPkg_ExpandTool_FullScreenPage_Set() {
    let isFullScreenPage = loadData_ExpandTool("isFullScreenPage");
    // 旧设置迁移
    if (isFullScreenPage === undefined) {
        try {
            const old = JSON.parse(localStorage.getItem("ExSave_FullScreen") || {}).isFullScreen;
            isFullScreenPage = typeof old === "boolean" ? old : false;
        } catch (err) {
            isFullScreenPage = false;
        }
        saveData_ExpandTool("isFullScreenPage", isFullScreenPage);
        localStorage.removeItem("ExSave_FullScreen");
    }
    // 设置初始化
    const hideplayersidebar = document.getElementById("extool__hideplayersidebar");
    if (isFullScreenPage) {
        document.getElementById("extool__fullscreenpage").checked = true;
        fullScreenpage();
    } else {
        hideplayersidebar.disabled = true;
    }
    if (loadData_ExpandTool("isHidePlayerSidebar")) {
        hideplayersidebar.checked = true;
    }
}

function fullScreenpage() {
    gDomObserver.waitForElement('.wfs-2a8e83, .icon-c8be96:has([d="M20 25h6v-6M14 7H8v6"])', 90000).then(fullScreenPageButton => {
        console.log("DouyuEx 自动网页全屏: 点击 fullScreenPageButton", fullScreenPageButton);
        fullScreenPageButton.click();
        if (document.getElementById("extool__hideplayersidebar").checked) {
            gDomObserver.waitForElement('.toggle__P8TKM button').then(toggleButton => {
                console.log("DouyuEx 自动折叠侧栏: 点击弹幕侧边栏显示切换按钮", toggleButton);
                toggleButton.click();
            });
        }
    });
}

function initPkg_ExpandTool_HighestVideoQuality_insertFunc() {
    const highestvideoquality = document.getElementById("extool__highestvideoquality");
    highestvideoquality.addEventListener("click", function() {
        const isHighestVideoQuality = highestvideoquality.checked;
        saveData_ExpandTool("isHighestVideoQuality", isHighestVideoQuality);
        if (isHighestVideoQuality) {
            showMessage("刷新页面生效", "success");
        }
    });
}

function initPkg_ExpandTool_HighestVideoQuality_Set() {
    let isHighestVideoQuality = loadData_ExpandTool("isHighestVideoQuality");
    // 旧设置迁移
    if (isHighestVideoQuality === undefined) {
        try {
            const old = JSON.parse(localStorage.getItem("ExSave_HighestVideoQuality") || {}).isHighestVideoQuality;
            isHighestVideoQuality = typeof old === "boolean" ? old : false;
        } catch (err) {
            isHighestVideoQuality = false;
        }
        saveData_ExpandTool("isHighestVideoQuality", isHighestVideoQuality);
        localStorage.removeItem("ExSave_HighestVideoQuality");
    }
    // 设置初始化
    if (isHighestVideoQuality) {
        document.getElementById("extool__highestvideoquality").checked = true;
        highestVideoQuality();
    }
}

function highestVideoQuality() {
    gDomObserver.waitForElement('.reload-0876b5', 90000).then(reloadDiv => {
        console.log("DouyuEx 自动最高画质: 检测到reloadDiv，直播已开启", reloadDiv);
        let reloadDivDomHook = new DomHook(reloadDiv, true, () => {
            if (reloadDiv.offsetParent !== null) {
                console.log("DouyuEx 自动最高画质: 直播流异常，点击reloadDiv", reloadDiv);
                reloadDiv.click();
                return;
            }
        }, true);
        gDomObserver.waitForElement('.selected-ab049e').then(selectedItem => {
            const highestQualityOption = selectedItem.parentElement.querySelector(':first-child');
            if (highestQualityOption !== selectedItem) {
                console.log("DouyuEx 自动最高画质: 点击 highestQualityOption", highestQualityOption);
                highestQualityOption.click();
            } else {
                console.log("DouyuEx 自动最高画质: 保持 highestQualityOption", highestQualityOption);
            }
            reloadDivDomHook.closeHook();
            reloadDivDomHook = null;
        });
    });
}