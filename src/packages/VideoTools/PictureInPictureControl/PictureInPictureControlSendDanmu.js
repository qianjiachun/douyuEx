// 弹幕发送事件绑定与接口调用逻辑

// 绑定画中画输入框、发送按钮的键盘与鼠标事件，处理本地即时渲染
function PictureInPictureControl_bindSendEvents(pipWindow, danmakuLayer) {
    const inputField = pipWindow.document.getElementById("pip-input-field");
    const submitBtn = pipWindow.document.getElementById("pip-submit-btn");
    const panel = pipWindow.document.getElementById("input-panel");

    async function doSubmit() {
        const content = inputField.value.trim();
        if (!content) return;

        inputField.value = "";
        panel.classList.remove("active");

        const toast = pipWindow.document.getElementById("pip-toast");
        toast.innerText = "发送成功";
        toast.classList.add("show");
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove("show"), 2000);

        PictureInPictureControl_renderDanmaku({
            text: content,
            color: 0
        }, pipWindow, danmakuLayer, true);

        try {
            await PictureInPictureControl_SendDanmaku(content);
        } catch (err) {
            console.error("弹幕发送接口调用失败:", err);
        }
    }

    inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            doSubmit();
        }
    });

    submitBtn.addEventListener("click", () => {
        doSubmit();
    });
}

// 发送弹幕
async function PictureInPictureControl_SendDanmaku(text) {
    let textarea = document.querySelector("div.ChatSend-txt");
    const button = document.querySelector(".ChatSend-button");
    textarea.innerText = text;
    button.click();
    return true;
}