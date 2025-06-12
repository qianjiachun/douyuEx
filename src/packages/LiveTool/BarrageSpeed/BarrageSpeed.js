let barrageSpeed_count = 0;
function initPkg_LiveTool_BarrageSpeed() {
    // LiveTool_BarrageSpeed_Dom();
    setInterval(() => {
        let barrageSpeed = Number((barrageSpeed_count / 5) * 60).toFixed(0);
        barrageSpeed_count = 0;
        const dom = document.getElementsByClassName("ChatSend-txt")[0];
        const text = `弹幕时速：${barrageSpeed }条/分`;
        dom.placeholder = text + " 按↑↓查看历史弹幕 视频ctrl+滚轮缩放";
        dom.setAttribute("data-placeholder", text);
        // document.getElementsByClassName("barrageSpeed__value")[0].innerText = barrageSpeed;
    }, 5000)
}

function LiveTool_BarrageSpeed_Dom() {
    let a = document.createElement("div");
    a.className = "barrageSpeed";
    let html = `
        弹幕时速：<span class='barrageSpeed__value'>**</span>条/分 按↑↓查看历史弹幕 视频ctrl+滚轮缩放
    `
    a.innerHTML = html;
    
    let b = document.getElementsByClassName("Chat")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_LiveTool_BarrageSpeed_Handle(text) {
    if (getType(text) == "chatmsg") {
        barrageSpeed_count++;
    }
}