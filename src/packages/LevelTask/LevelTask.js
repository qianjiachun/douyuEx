async function initPkg_LevelTask_Timer() {
  checkLevelTask();
  setInterval(checkLevelTask, 35 * 1000);
}

async function checkLevelTask() {
  let ids = await getLevelTaskIds(rid);
  let tasks = await getLevelTasks(ids);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskId = task.taskId;
    const taskName = task.name
    const taskStatus = task.taskStatus;
    const prizeStatus = task.prizeStatus;
    if (taskStatus == 1 && prizeStatus == 0) {
      let result = await finishLevelTask(rid, taskId);
      for (let j = 0; j < result.length; j++) {
        showMessage(`【等级任务】${taskName} 获得${result[j].name}${result[j].num}`, "success");
      }
    }
  }
}

function getLevelTaskIds(rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/interactnc/web/userLevel/userLevelDetail?rid=" + rid, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(res => {
        return res.json();
    }).then(ret => {
        let ids = ret.data.taskIds.join(",");
        resolve(ids);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}

function getLevelTasks(ids) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/tasksys/userLevelTask/getTaskStatus?taskIds=" + ids, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret.data.list);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}

function finishLevelTask(rid, taskid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/tasksys/userLevelTask/getPrize", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&taskIds=${taskid}&roomId=${rid}`
    }).then(res => {
        return res.json();
    }).then(ret => {
        resolve(ret.data.list);
    }).catch(err => {
        console.log("请求失败!", err);
        reject(err);
    })
  })
}
