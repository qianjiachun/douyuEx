function initPkg_DanmakuTail() {
    initPkg_DanmakuTail_insertDom();
    initPkg_DanmakuTail_Set();
    initPkg_DanmakuTail_Func();
}

function initPkg_DanmakuTail_insertDom() {
    let div = document.createElement("div");
    div.className = "ChatToolBar-DanmakuTail";
    div.innerHTML = `<div class="ChatToolBar-DanmakuTail-tip" title="弹幕小尾巴" ></div>`;
    let b = document.getElementsByClassName("ChatToolBar__left")[0];
    b.appendChild(div);

    let panel = document.createElement("div");
    panel.className = "ChatToolBar-DanmakuTail-Panel";
    let chat_panel = document.getElementsByClassName("layout-Player-chat")[0];
    chat_panel.insertBefore(panel, chat_panel.childNodes[0]);

    if (!window.location.href.includes("/beta")) {
        panel.style.bottom = "120px";
    }

    panel.innerHTML = `
        <div class="ChatToolBar-DanmakuTail-title">弹幕小尾巴</div>
        <input type="text" class="DanmakuTail-input" id="DanmakuTail-input" placeholder="请输入小尾巴内容"/>
        <label class="DanmakuTail-checkbox-label">
            <input type="checkbox" class="DanmakuTail-checkbox" id="DanmakuTail-checkbox" />
            启用小尾巴
        </label>
    `;
}

function initPkg_DanmakuTail_Set() {
    let ret = localStorage.getItem("ExSave_DanmakuTail");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        document.getElementById("DanmakuTail-checkbox").checked = retJson.isTailEnabled;
        document.getElementById("DanmakuTail-input").value = retJson.tailContent || "";
        document.getElementById("DanmakuTail-input").disabled = retJson.isTailEnabled;
        if (retJson.isTailEnabled) {
            document.querySelector(".ChatToolBar-DanmakuTail-tip").classList.add("ChatToolBar-DanmakuTail-tip-active");
        }
    }
}


function saveData_DanmakuTail() {
    let data = {
        isTailEnabled: document.getElementById("DanmakuTail-checkbox").checked,
        tailContent: document.getElementById("DanmakuTail-input").value
    }
    localStorage.setItem("ExSave_DanmakuTail", JSON.stringify(data));
}


function initPkg_DanmakuTail_Func() {
    document.getElementsByClassName("ChatToolBar-DanmakuTail")[0].addEventListener("click", function () {
        showExRightPanel("弹幕小尾巴");
    });

    initPkg_DanmakuTail_HandleFunc("#DanmakuTail-checkbox", "#DanmakuTail-input");

    document.getElementById("DanmakuTail-checkbox").addEventListener("change", function () {
        saveData_DanmakuTail();
    });
    document.getElementById("DanmakuTail-input").addEventListener("input", function () {
        saveData_DanmakuTail();
    });

}


function initPkg_DanmakuTail_HandleFunc(checkboxSelector, inputSelector) {
    let keydownHandler = null;
    let clickHandler = null;

    // 开启
    function enable(content) {
        if (window.location.href.includes("/beta")) {
            let textarea = document.querySelector("div.ChatSend-txt");
            const button = document.querySelector(".ChatSend-button");
            if (!textarea || !button) return;

            disable(); // 防止重复绑定

            keydownHandler = function (e) {
                if (!e.isTrusted) return;
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    button.click();
                }
            };

            clickHandler = function (e) {
                if (textarea.innerText.trim() == "") return;
                if (!textarea.innerText.endsWith(content)) {
                    textarea.innerText = textarea.innerText + content;
                    textarea.dispatchEvent(new Event("input", { bubbles: true }));
                }
            };
            textarea.addEventListener("keydown", keydownHandler, true);
            button.addEventListener("click", clickHandler, true);
        } else {
            let textarea = document.querySelector("textarea.ChatSend-txt");
            const button = document.querySelector(".ChatSend-button");
            if (!textarea || !button) return;

            disable(); // 防止重复绑定

            keydownHandler = function (e) {
                if (!e.isTrusted) return;
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    button.click();
                }
            };

            clickHandler = function (e) {
                if (textarea.value.trim() == "") return;
                if (!textarea.value.endsWith(content)) {
                    textarea.value = textarea.value + content;
                    textarea.dispatchEvent(new Event("input", { bubbles: true }));
                }
            };

            textarea.addEventListener("keydown", keydownHandler, true);
            button.addEventListener("click", clickHandler, true);
        }
    }

    // 关闭
    function disable() {
        const textarea = document.querySelector("textarea.ChatSend-txt");
        const button = document.querySelector(".ChatSend-button");
        if (textarea && keydownHandler) {
            textarea.removeEventListener("keydown", keydownHandler, true);
        }
        if (button && clickHandler) {
            button.removeEventListener("click", clickHandler, true);
        }
        keydownHandler = null;
        clickHandler = null;
    }

    // 监听 checkbox
    const checkbox = document.querySelector(checkboxSelector);
    const input = document.querySelector(inputSelector);

    if (checkbox) {
        checkbox.addEventListener("change", function () {

            if (input.value.trim() === "") {
                checkbox.checked = false;
                showMessage("【弹幕小尾巴】请输入弹幕小尾巴内容", "error");
                return;
            }

            input.disabled = checkbox.checked;
            document.querySelector(".ChatToolBar-DanmakuTail-tip").classList.remove("ChatToolBar-DanmakuTail-tip-active");

            disable();
            if (checkbox.checked && input) {
                document.querySelector(".ChatToolBar-DanmakuTail-tip").classList.add("ChatToolBar-DanmakuTail-tip-active");
                let content = input.value.trim();
                enable(content);
            }
        });

        if (checkbox.checked && input) {
            enable(input.value.trim());
        }
    }

    return { enable, disable };
}

