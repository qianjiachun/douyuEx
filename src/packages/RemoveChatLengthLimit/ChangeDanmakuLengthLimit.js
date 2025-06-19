function initPkg_ChangeDanmakuLengthLimit() {
  let count = 0;
  let timer = setInterval(() => {
    count++;
    if (count > 100) {
      clearInterval(timer);
      return;
    }
    let dom = document.getElementsByClassName("ChatSend-txt")[0];
    if (dom != undefined) {
      changeChatTextareaMaxLength();
      clearInterval(timer);
    }
  }, 1000);
}

function changeChatTextareaMaxLength() {
  let a;

  a = document.getElementsByClassName("ChatSend-button")[0];
  if (a != undefined) {
    a.className = "ChatSend-button";
  }
  a = document.getElementsByClassName("ChatSend-txt")[0];
  if (a != undefined) {
    a.maxLength = a.maxLength + 20; // 原来为50字符，修改成70字符
  }
}
