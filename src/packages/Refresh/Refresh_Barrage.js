function initPkg_Refresh_Barrage() {
    gDomObserver.waitForElement('.Barrage-toolbar').then(toolbar => {
        initPkg_Refresh_Barrage_Dom(toolbar);
        initPkg_Refresh_Barrage_Func(toolbar);
        initPkg_Refresh_Barrage_Set();
    });
}

function initPkg_Refresh_Barrage_Dom(toolbar) {
    if (!toolbar.querySelector(".refresh-barrage")) {
        toolbar.insertAdjacentHTML(
            "afterbegin",
            `<a class="Barrage-toolbarBtn" id="btn-prefixHidden">
                <svg t="1588051109604" id="btn-prefixHidden__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16">
                    <path d="M588.416 516.096L787.2 317.312a54.016 54.016 0 1 0-76.416-76.416L512 439.68 313.216 241.024A54.016 54.016 0 1 0 236.8 317.376l198.784 198.848-198.016 197.888a54.016 54.016 0 1 0 76.416 76.416L512 592.576l197.888 197.952a54.016 54.016 0 1 0 76.416-76.416L588.416 516.096z" fill="#AFAFAF" p-id="3096"></path>
                </svg>
                <i class="Barrage-toolbarIcon"></i>
                <span class="Barrage-toolbarText" id="btn-prefixHidden__text">前缀</span>
            </a>
            <a class="Barrage-toolbarBtn" id="btn-rankHidden">
                <svg t="1588051109604" id="btn-rankHidden__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16">
                    <path d="M512 128 192 448h192v448h256V448h192L512 128z" fill="#AFAFAF" p-id="3096"></path>
                </svg>
                <i class="Barrage-toolbarIcon"></i>
                <span class="Barrage-toolbarText" id="btn-rankHidden__text">拉高</span>
            </a>`
        );
    }
}

function initPkg_Refresh_Barrage_Func(toolbar) {
    toolbar.addEventListener("click", e => {
        if (e.target.closest("#btn-prefixHidden")) {
            if (document.body.classList.contains("is-prefixHidden")) {
                document.body.classList.remove("is-prefixHidden");
                saveData_Refresh();
            } else {
                PostbirdAlertBox.confirm({
                    'title': '提示',
                    'content': '是否屏蔽弹幕前缀（如粉丝牌、钻粉、贵族等标志）',
                    'okBtn': '确定',
                    'cancelBtn': '取消',
                    'onConfirm': function () {
                        document.body.classList.add("is-prefixHidden");
                        saveData_Refresh();
                    },
                    'onCancel': function () {
                    }
                });
            }
        } else if (e.target.closest("#btn-rankHidden")) {
            if (document.body.classList.contains("is-rankHidden")) {
                document.body.classList.remove("is-rankHidden");
                saveData_Refresh();
            } else {
                PostbirdAlertBox.confirm({
                    'title': '提示',
                    'content': '是否拉高弹幕框，隐藏日榜周榜',
                    'okBtn': '确定',
                    'cancelBtn': '取消',
                    'onConfirm': function () {
                        document.body.classList.add("is-rankHidden");
                        saveData_Refresh();
                    },
                    'onCancel': function () {
                    }
                });
            }
        }
    });
}

function initPkg_Refresh_Barrage_Set() {
    if (loadData_Refresh("prefixHidden")) {
        document.body.classList.add("is-prefixHidden");
    }
    if (loadData_Refresh("rankHidden")) {
        document.body.classList.add("is-rankHidden");
    }
}