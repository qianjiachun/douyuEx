async function initPkg_Sign_OPFOY() {
  const csrfToken = await getCsrfToken();
  const ret = await signOPFOY(csrfToken);
  if (ret.error == 0 || ret.error == 31200) {
    showMessage(`【积分任务】${ret.msg}`, "success");
  } else {
    showMessage(`【积分任务】${ret.msg}`, "error");
  }
}

function signOPFOY(csrfToken) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/carnivalApi/sign/doSign", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `csrfToken=${csrfToken}&signAlias=20250521OPFOY_qd2&useJiYan=false`
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

function initPkg_Sign_OPFOY_Timer() {
  checkOPFOYViewStatus();
  setInterval(checkOPFOYViewStatus, 5 * 60 * 1000);
}

async function checkOPFOYViewStatus() {
  const status = await getOPFOYViewStatus();
  const taskList = status.data.taskList;
  const startTime = status.data.startTime;
  if (!taskList) return;
  for (const id in taskList) {
    const task = taskList[id];
    if (task.status !== 2) continue;
    const ret = await getOPFOYGift(id, startTime);
    if (ret.error == 0) {
      showMessage(`【积分任务】观时积分领取成功`, "success");
    } else {
      showMessage(`【积分任务】${ret.msg}`, "error");
    }
  }
}

function getOPFOYViewStatus() {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/wgapi/activitync/gametask/viewStatus", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&actAlias=20250521OPFOY`
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

function getOPFOYGift(id, startTime) {
  return new Promise((resolve) => {
    fetch("https://www.douyu.com/wgapi/activitync/gametask/takeGift", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&id=${id}&actAlias=20250521OPFOY&startTime=${startTime}`
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret);
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}
