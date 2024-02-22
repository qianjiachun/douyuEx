async function initPkg_Sign_ActqzsUserTask() {
  const rids = ["5189167", "290935", "6979222", "5132174", "63136"];
  const activityId = await getActivityId();
  if (!activityId) return;
  
  for (const rid of rids) {
    const ret = await signinAct(activityId, rid);
    if (ret.error == 0) {
      let gift = ret.data.awards.map(item => `${item.name}x${item.num}`).join("、");
      showMessage("【一键签到】右侧活动直播间已签到，获得" + gift, "success");
    } else {
      showMessage("【一键签到】右侧活动直播间签到失败，" + ret.msg, "warning");
    }
  }
}

function getActivityId() {
  const dateStr = dateFormat("yyyyMM", new Date());
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

function signinAct(activityId, rid) {
  return new Promise((resolve, reject) => {
    fetch("https://www.douyu.com/japi/interactnc/web/actqzsUserTask/signIn", {
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