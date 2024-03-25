let myLastBarrage = ""; // 浏览器弹幕框中的最后一条自己的弹幕内容
let barrageSendCheckTimer = 0;
let barrageSendCheckTimer2 = 0;
async function initPkg_LiveTool_BarrageSendCheck() {
  myName = await getUserName();
  new DomHook("#js-barrage-list", false, (m) => {
      if (m.length <= 0) return;
      if (m[0].addedNodes.length <= 0) return;
      let dom = m[0].addedNodes[0];
      let isSelf = dom.getElementsByClassName("is-self").length > 0;
      if (!isSelf) return;
      let localLastBarrage = dom.getElementsByClassName("Barrage-content")[0].innerText.trim();
      clearTimeout(barrageSendCheckTimer);
      barrageSendCheckTimer = setTimeout(() => {
        if (myLastBarrage !== "" && localLastBarrage !== "") {
          let data = stt_deserialize(myLastBarrage);
          if (!data.txt) return;
          if (data.txt.includes(`[douyuEx图片`)) {
            data.txt = data.txt.replace(/\[douyuEx图片[^\]]+\]/g, "");
          }
          if (data.txt.replace(/\s+/g, ' ') !== localLastBarrage.replace(/\s+/g, ' ')) {
            let contentDom = dom.getElementsByClassName("Barrage-content")[0];
            contentDom.style.textDecoration = "line-through gray 1px";
            if (contentDom && contentDom.parentNode) {
              contentDom.parentNode.insertBefore(createBarrageFailDom(), contentDom.nextSibling);
            }
          }
        }
      }, 300);
  });
  new DomHook(".danmu-6e95c1", false, (m) => {
    if (m.length <= 0) return;
    if (m[0].addedNodes.length <= 0) return;
    let dom = m[0].addedNodes[0];
    let isSelf = dom.innerHTML.includes("border:");
    if (!isSelf) return;
    let localLastBarrage = dom.getElementsByClassName("text-879f3e")[0].innerHTML.trim();
    clearTimeout(barrageSendCheckTimer2);
    barrageSendCheckTimer2 = setTimeout(() => {
      if (myLastBarrage !== "" && localLastBarrage !== "") {
        let data = stt_deserialize(myLastBarrage);
        if (!data.txt) return;
        if (data.txt.includes(`[douyuEx图片`)) {
          data.txt = data.txt.replace(/\[douyuEx图片[^\]]+\]/g, "");
        }
        if (data.txt.replace(/\s+/g, ' ') !== localLastBarrage.replace(/\s+/g, ' ')) {
          let contentDom = dom.getElementsByClassName("text-879f3e")[0];
          contentDom.style.textDecoration = "line-through gray 1px";
          if (contentDom && contentDom.parentNode) {
            contentDom.parentNode.insertBefore(createBarrageFailDom(), contentDom.nextSibling);
          }
        }
      }
    }, 300);
  });
}

function createBarrageFailDom() {
  let span = document.createElement("span");
  span.textContent = "(可能发送失败)";
  span.style.marginLeft = "4px";
  span.style.color = "gray";
  span.style.fontSize = "9px";
  span.style.cursor = "point";
  span.title = "该条弹幕发送失败，不会被其他人看到（可能会误判）";
  return span;
}

function initPkg_LiveTool_BarrageSendCheck_Handle(text) {
  if (getType(text) == "chatmsg") {
    if (!text.includes(myName)) return;
    myLastBarrage = text;
  }
}