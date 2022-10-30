async function initPkg_Sign_FansTree() {
  for (let i = 0; i < myFansBadgeList.length; i++) {
    const roomId = myFansBadgeList[i];
    let ret = await signRoomTree(roomId);
    if (ret.error !== 0) {
      showMessage(`【粉丝家园】${roomId}${ret.msg}`, "error");
    } else {
      showMessage(`【粉丝家园】${roomId}签到成功！`, "success");
    }
  }
}

function signRoomTree(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/interactnc/web/fanshome/sign", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&rid=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}