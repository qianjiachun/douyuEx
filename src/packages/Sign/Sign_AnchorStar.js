async function initPkg_Sign_AnchorStar() {
  const roomListRes = await getAnchorStarRoomList().catch(() => {});
  const roomList = roomListRes.data.rankItemList;
  if (!roomList || (roomList && roomList.length == 0)) return;
  for (let i = 0; i < 3; i++) {
    const rid = roomList[i].rid;
    if (!rid) continue;
    await signAnchorStar(rid);
    await sleep(500);
  }
  showMessage("【星推】签到任务完成", "success");
  for (let i = 0; i < 5; i++) {
    const rid = roomList[i].rid;
    if (!rid) continue;
    const res = await addFollowRoom(rid);
    await sleep(500);
    if (res.error == 1) {
      // 已关注（再关注回来）
      await removeFollowRoom(rid);
      await sleep(500);
      await addFollowRoom(rid);
    } else {
      await removeFollowRoom(rid);
    }
    await sleep(500);
  }
  showMessage("【星推】关注任务完成", "success");
}

function getAnchorStarRoomList() {
  return new Promise((resolve, reject) => {
    fetch(`https://www.douyu.com/japi/livebiznc/web/anchorstardiscover/rank/info?rid=${rid}&type=5&track=3`, {
      method: "GET",
      mode: "no-cors",
      credentials: "include"
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
        reject(err);
      });
  });
}

function signAnchorStar(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/livebiznc/web/anchorstardiscover/user/task/report", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&type=5&rid=${rid}`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
        reject(err);
      });
  });
}