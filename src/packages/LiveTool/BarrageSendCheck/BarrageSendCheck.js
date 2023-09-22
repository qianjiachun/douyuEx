let myLastBarrage = ""; // 浏览器弹幕框中的最后一条自己的弹幕内容
let barrageSendCheckTimer = 0;
async function initPkg_LiveTool_BarrageSendCheck() {
  myName = await getUserName();
  let a = new DomHook("#js-barrage-list", false, (m) => {
      if (m.length <= 0) return;
      if (m[0].addedNodes.length <= 0) return;
      let dom = m[0].addedNodes[0];
      let isSelf = dom.getElementsByClassName("is-self").length > 0;
      if (!isSelf) return;
      let localLastBarrage = dom.getElementsByClassName("Barrage-content")[0].innerText.trim();
      clearTimeout(barrageSendCheckTimer);
      barrageSendCheckTimer = setTimeout(() => {
        if (!myLastBarrage.replace(/\s+/g, ' ').includes(localLastBarrage.replace(/\s+/g, ' '))) {
          dom.style.display = "none";
          showMessage(`弹幕【${localLastBarrage}】发送失败`, "error");
        };
      }, 250);
  })
}

function initPkg_LiveTool_BarrageSendCheck_Handle(text) {
  if (getType(text) == "chatmsg") {
    if (!text.includes(myName)) return;
    myLastBarrage = text;
  }
}