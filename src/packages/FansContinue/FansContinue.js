export function initPkg_FansContinue() {
  initPkg_FansContinue_Dom();
  initPkg_FansContinue_Func();
}

function initPkg_FansContinue_Dom() {
  FansContinue_insertIcon();
}
function FansContinue_insertIcon() {
  let a = document.createElement("div");
  a.className = "fans-continue";
  a.innerHTML =
    '<a class="ex-panel__icon" title="一键续牌"><img style="width: 32px;height: 32px;" src="https://gfs-op.douyucdn.cn/dygift/1705/7db9beee246848252f1c7fe916259f4e.png"/><i id="fans-continue__tip" class="ex-panel__tip"></i></a>';

  let b = document.getElementsByClassName("ex-panel__wrap")[0];
  b.insertBefore(a, b.childNodes[0]);
}

function initPkg_FansContinue_Func() {
  document.getElementsByClassName("fans-continue")[0].addEventListener("click", function () {
    PostbirdAlertBox.prompt({
      title: "每个直播间赠送几根荧光棒？(输入0则平均赠送)",
      okBtn: "确定",
      cancelBtn: "取消",
      defaultValue: "1",
      contentColor: "rgb(51,51,51)",
      onConfirm: function (res) {
        if (res == null) return;
        let sendNum = Number(res);
        if (Number.isNaN(sendNum) || sendNum < 0) return;
        FansContinue_startSend(sendNum);
      },
      onCancel: function () {}
    });
  });
}

function FansContinue_startSend(sendNum) {
  let giftId = 0;
  let conut = 0;

  getBagGifts(rid, (ret) => {
    let chunkNum = ret.data?.list?.length || 0;

    if (chunkNum == 0) {
      showMessage("背包礼物为空", "error");
      return;
    }

    for (let i = 0; i < chunkNum; i++) {
      if (ret.data.list[i].id == 268 || ret.data.list[i].id == 2358) {
        giftId = ret.data.list[i].id;
        count = ret.data.list[i].count;
        break;
      }
    }

    if (giftId == 0) {
      showMessage("没有足够的道具", "error");
      return;
    }

    fetch("https://www.douyu.com/member/cp/getFansBadgeList", {
      method: "GET",
      mode: "no-cors",
      cache: "default",
      credentials: "include"
    })
      .then((res) => {
        return res.text();
      })
      .then(async (doc) => {
        doc = new DOMParser().parseFromString(doc, "text/html");
        let a = doc.getElementsByClassName("fans-badge-list")[0].lastElementChild;
        let n = a.children.length;
        if (sendNum == 0) sendNum = Math.floor(count / n);

        for (let i = 0; i < n; i++) {
          let rid = a.children[i].getAttribute("data-fans-room"); // 获取房间号
          await sleep(250).then(() => {
            sendGift_bag(giftId, sendNum, rid)
              .then((data) => {
                if (data.msg == "success") {
                  showMessage("【续牌】" + rid + "赠送荧光棒成功", "success");
                  // console.log(rid + "赠送一根荧光棒成功");
                } else {
                  showMessage("【续牌】" + rid + "赠送失败 " + data.msg, "error");
                  // console.log(rid + "赠送失败");
                  console.log(rid, data);
                }
              })
              .catch((err) => {
                showMessage("【续牌】" + rid + "赠送失败", "error");
                console.log(rid, err);
              });
          });
        }
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

async function sendGift_bag(gid, count, rid) {
  // 送背包里的东西
  // gid: 268是荧光棒
  // count: 数量
  // rid: 房间号
  const res = await fetch("https://www.douyu.com/japi/prop/donate/mainsite/v1", {
    method: "POST",
    mode: "no-cors",
    credentials: "include",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "propId=" + gid + "&propCount=" + count + "&roomId=" + rid + "&bizExt=%7B%22yzxq%22%3A%7B%7D%7D"
  });
  return await res.json();
}
