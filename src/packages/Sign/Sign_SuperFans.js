async function initPkg_Sign_SuperFans() {
  for (let i = 0; i < myFansBadgeList.length; i++) {
    const roomId = myFansBadgeList[i];
    let ret = await signSuperFans(roomId);
    if (ret.error !== 0) {
      // showMessage(`【钻粉联赛签到】${roomId}${ret.msg}`, "error");
    } else {
      showMessage(`【钻粉联赛签到】${roomId}签到成功！`, "success");
    }
  }
}

function signSuperFans(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/interactnc/web/dfansact/userSign", {
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