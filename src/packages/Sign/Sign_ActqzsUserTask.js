async function initPkg_Sign_ActqzsUserTask() {
  const rids = ["5189167", "290935", "6979222", "5132174", "63136"];
  let activityId = await getActivityId(dateFormat("yyyyMM", new Date()));
  if (!activityId) {
    const currentDate = new Date();
    const nextMonth = currentDate.getMonth() + 1;
    const nextMonthDate = new Date(currentDate.getFullYear(), nextMonth, 1);
    activityId = await getActivityId(dateFormat("yyyyMM", nextMonthDate));
  }
  let cardArenaId = await getCardArenaId(dateFormat("yyyyMM", new Date()));
  if (!cardArenaId) {
    const currentDate = new Date();
    const nextMonth = currentDate.getMonth() + 1;
    const nextMonthDate = new Date(currentDate.getFullYear(), nextMonth, 1);
    cardArenaId = await getCardArenaId(dateFormat("yyyyMM", nextMonthDate));
  }
  const actIds = [activityId, cardArenaId];

  for (const actId of actIds) {
    for (const rid of rids) {
      const signinActRet = await signinAct(actId, rid);
      if (signinActRet.error == 0) {
        let gift = signinActRet.data.awards.map(item => `${item.name}x${item.num}`).join("、");
        showMessage("【一键签到】右侧活动直播间已签到，获得" + gift, "success");
      }
      const signinCardArenaRet = await signinCardArena(actId, rid);
      if (signinCardArenaRet.error == 0) {
        let gift = signinCardArenaRet.data.awards.map(item => `${item.name}x${item.num}`).join("、");
        showMessage("【一键签到】右侧活动直播间已签到，获得" + gift, "success");
      }
    }
  }
}

function getActivityId(dateStr) {
  return new Promise((resolve) => {
    fetch(`https://webconf.douyucdn.cn/resource/common/activity/actqzs${dateStr}_w.json`)
      .then((res) => {
        return res.text();
      })
      .then((ret) => {
        let json = ret.substring(
          String("DYConfigCallback(").length,
          ret.length
        );
        json = json.substring(0, json.lastIndexOf(")"));
        try {
          json = JSON.parse(json);
          resolve(json.data.activity_setting.activity_id);
        } catch (err) {
          resolve(null);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
}

function getCardArenaId(dateStr) {
  return new Promise((resolve) => {
    fetch(`https://webconf.douyucdn.cn/resource/common/activity/cardArena${dateStr}_w.json`)
      .then((res) => {
        return res.text();
      })
      .then((ret) => {
        let json = ret.substring(
          String("DYConfigCallback(").length,
          ret.length
        );
        json = json.substring(0, json.lastIndexOf(")"));
        try {
          json = JSON.parse(json);
          resolve(json.data.activity_setting.activity_id);
        } catch (err) {
          resolve(null);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
}


function signinCardArena(activityId, rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/cardArena/userTask/signIn", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&activity_id=${activityId}&rid=${rid}`
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

function signinAct(activityId, rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/actqzs/userTask/signIn", {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `ctn=${getCCN()}&activity_id=${activityId}&rid=${rid}`
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