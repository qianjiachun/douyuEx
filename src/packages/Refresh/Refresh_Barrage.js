function initPkg_Refresh_Barrage() {
    gDomObserver.waitForElement('.Barrage-toolbar').then(toolbar => {
        initPkg_Refresh_Barrage_Dom(toolbar);
        initPkg_Refresh_Barrage_Func(toolbar);
        initPkg_Refresh_Barrage_Set();
    });
}

function initPkg_Refresh_Barrage_Dom(toolbar) {
    if (!toolbar.querySelector(".Barrage-toolbarBtn")) {
        toolbar.insertAdjacentHTML(
            "afterbegin",
            `<a class="Barrage-toolbarBtn" id="btn-prefixHidden">
                <svg t="1588051109604" id="btn-prefixHidden__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16">
                    <path d="M588.416 516.096L787.2 317.312a54.016 54.016 0 1 0-76.416-76.416L512 439.68 313.216 241.024A54.016 54.016 0 1 0 236.8 317.376l198.784 198.848-198.016 197.888a54.016 54.016 0 1 0 76.416 76.416L512 592.576l197.888 197.952a54.016 54.016 0 1 0 76.416-76.416L588.416 516.096z" fill="#AFAFAF" p-id="3096"></path>
                </svg>
                <i class="Barrage-toolbarIcon"></i>
                <span class="Barrage-toolbarText" id="btn-prefixHidden__text">隐藏前缀</span>
            </a>
            <a class="Barrage-toolbarBtn" id="btn-rankHidden">
                <svg t="1588051109604" id="btn-rankHidden__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16">
                    <path d="M512 128 192 448h192v448h256V448h192L512 128z" fill="#AFAFAF" p-id="3096"></path>
                </svg>
                <i class="Barrage-toolbarIcon"></i>
                <span class="Barrage-toolbarText" id="btn-rankHidden__text">隐藏榜单</span>
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

    const KEY_DISPLAY = { 'space': '空格', 'arrowup': '↑', 'arrowdown': '↓', 'arrowleft': '←', 'arrowright': '→', 'escape': 'Esc' };
    const KEY_STORE = Object.fromEntries(Object.entries(KEY_DISPLAY).map(([k, v]) => [v, k]));
    const toDisplay = storeKey => KEY_DISPLAY[storeKey] ?? storeKey;
    const toStore = displayKey => KEY_STORE[displayKey] ?? displayKey;

    let currentPrefixKey = null, currentRankKey = null;
    const prefixHandler = () => { document.body.classList.toggle('is-prefixHidden'); saveData_Refresh(); };
    const rankHandler = () => { document.body.classList.toggle('is-rankHidden'); saveData_Refresh(); };

    const bindShortcuts = () => {
        if (currentPrefixKey) gHotkey.remove(currentPrefixKey, prefixHandler);
        if (currentRankKey) gHotkey.remove(currentRankKey, rankHandler);
        const newPrefixKey = loadData_Refresh('prefixHotkey', 'q');
        const newRankKey = loadData_Refresh('rankHotkey', 'b');
        if (newPrefixKey) {
            gHotkey.add(newPrefixKey, prefixHandler);
            currentPrefixKey = newPrefixKey;
        } else currentPrefixKey = null;
        if (newRankKey) {
            gHotkey.add(newRankKey, rankHandler);
            currentRankKey = newRankKey;
        } else currentRankKey = null;
    };

    gDomObserver.waitForElement('.SettingsPannel__iUSKg').then(settingsPannel => {
        new DomHook(settingsPannel, true, () => {
            const panel = settingsPannel.querySelector('[id$="panel-shortcut"]');
            if (!panel || panel.querySelector('.custom-shortcut-row')) return;
            const form = panel.querySelector('form');
            if (!form) return;

            const html = `
                <label class="row__Qxnba custom-shortcut-row" data-type="prefix">
                    <span class="label__lkA6r">隐藏用户前缀</span>
                    <span class="keyWrapper__kB1rx">
                        <div class="input__tmEUI input__ok1-t">
                            <input type="text" readonly class="shortcut-input"
                                value="${toDisplay(loadData_Refresh('prefixHotkey', 'q'))}" placeholder="按下按键">
                        </div>
                        <a class="clear__1lxt4 clear-btn">✖</a>
                    </span>
                </label>
                <label class="row__Qxnba custom-shortcut-row" data-type="rank">
                    <span class="label__lkA6r">隐藏侧栏榜单</span>
                    <span class="keyWrapper__kB1rx">
                        <div class="input__tmEUI input__ok1-t">
                            <input type="text" readonly class="shortcut-input"
                                value="${toDisplay(loadData_Refresh('rankHotkey', 'b'))}" placeholder="按下按键">
                        </div>
                        <a class="clear__1lxt4 clear-btn">✖</a>
                    </span>
                </label>`;
            const resetGroup = form.querySelector('.buttonGroup__qxbJd');
            if (resetGroup) resetGroup.insertAdjacentHTML('beforebegin', html);
            else form.insertAdjacentHTML('beforeend', html);

            const prefixRow = panel.querySelector('.custom-shortcut-row[data-type="prefix"]');
            const rankRow   = panel.querySelector('.custom-shortcut-row[data-type="rank"]');

            const setupRow = (row, storageType, defaultKey, otherRow) => {
                const input = row.querySelector('.shortcut-input');
                const clearBtn = row.querySelector('.clear-btn');
                let recording = false;
                let tempHandler = null;
                let offClickHandler = null;

                const stopRecording = () => {
                    if (!recording) return;
                    recording = false;
                    document.removeEventListener('keydown', tempHandler, true);
                    if (offClickHandler) {
                        document.removeEventListener('click', offClickHandler);
                        offClickHandler = null;
                    }
                    input.style.background = '';
                    if (input.value === '按下按键...') {
                        input.value = toDisplay(loadData_Refresh(storageType, defaultKey));
                    }
                };

                input.addEventListener('click', () => {
                    if (recording) return;
                    recording = true;
                    input.value = '按下按键...';
                    input.style.background = '#fff3cd';
                    tempHandler = e => {
                        if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'Meta') {
                            return;
                        }
                        if (e.key === 'Escape') { stopRecording(); return; }
                        e.preventDefault();
                        e.stopPropagation();
                        const storeKey = e.key === ' ' ? 'space' : e.key.toLowerCase();
                        const otherInputValue = otherRow.querySelector('.shortcut-input').value;
                        if (otherInputValue !== '按下按键...') {
                            const otherStoreKey = toStore(otherInputValue);
                            if (storeKey === otherStoreKey) {
                                alert(`快捷键"${toDisplay(storeKey)}"已被另一个功能使用，请更换。`);
                                stopRecording();
                                return;
                            }
                        }
                        input.value = toDisplay(storeKey);
                        saveData_Refresh(storageType, storeKey);
                        bindShortcuts();
                        stopRecording();
                    };
                    document.addEventListener('keydown', tempHandler, true);
                    setTimeout(() => {
                        offClickHandler = () => { if (recording) stopRecording(); };
                        document.addEventListener('click', offClickHandler);
                    }, 50);
                });

                clearBtn.addEventListener('click', e => {
                    e.stopPropagation();
                    stopRecording();
                    input.value = '';
                    saveData_Refresh(storageType, '');
                    bindShortcuts();
                });
            };

            setupRow(prefixRow, 'prefixHotkey', 'q', rankRow);
            setupRow(rankRow, 'rankHotkey', 'b', prefixRow);

            const resetBtn = form.querySelector('.buttonGroup__qxbJd button');
            if (resetBtn && !resetBtn.hasAttribute('data-custom-bound')) {
                resetBtn.setAttribute('data-custom-bound', 'true');
                resetBtn.addEventListener('click', () => {
                    saveData_Refresh('prefixHotkey', 'q');
                    saveData_Refresh('rankHotkey', 'b');
                    bindShortcuts();
                    prefixRow.querySelector('.shortcut-input').value = toDisplay('q');
                    rankRow.querySelector('.shortcut-input').value = toDisplay('b');
                });
            }
        }, false);
    });

    bindShortcuts();
}

function initPkg_Refresh_Barrage_Set() {
    if (loadData_Refresh("prefixHidden")) {
        document.body.classList.add("is-prefixHidden");
    }
    if (loadData_Refresh("rankHidden")) {
        document.body.classList.add("is-rankHidden");
    }
}