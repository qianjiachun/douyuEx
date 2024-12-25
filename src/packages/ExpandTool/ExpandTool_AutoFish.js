let autoFishInfo = [];
let baitId = null;
let nextFishEndTime = 0;
let isFishing = false;
let timerAutoFish = 0;

function initPkg_ExpandTool_AutoFish() {
  ExpandTool_AutoFish_insertDom();
  ExpandTool_AutoFish_insertFunc();
  ExpandTool_AutoFish_Set();
}

function ExpandTool_AutoFish_insertDom() {
  let html = "";
  html += '<label><input style="margin-top:5px;" id="extool__autofish_start" type="checkbox">自动钓鱼</label>';

  let a = document.createElement("div");
  a.className = "extool__autofish";
  a.innerHTML = html;
  let b = document.getElementsByClassName("extool")[0];
  b.insertBefore(a, b.childNodes[0]);
}
function ExpandTool_AutoFish_insertFunc() {
  document.getElementById("extool__autofish_start").addEventListener("click", async () => {
    saveData_AutoFish();
    const isStart = document.getElementById("extool__autofish_start").checked;
    if (!isStart) return clearInterval(timerAutoFish);
    showMessage("【自动钓鱼】开始自动钓鱼", "info");
    autoFishInfo = await AutoFish_getFishInfo();
    const homepageRes = await AutoFish_getHomepageData();
    if (homepageRes.data) {
      baitData = homepageRes.data.baits.find((item) => item.inUse);
      if (!baitData) {
        document.getElementById("extool__autofish_start").checked = false;
        return showMessage("【自动钓鱼】请设置鱼饵", "error");
      }
      baitId = baitData.id;
    } else {
      document.getElementById("extool__autofish_start").checked = false;
      return showMessage("【自动钓鱼】未能获取活动信息", "error");
    }
    saveData_AutoFish();

    if (homepageRes.data.fishing.stat == 0) {
      // 未开始钓鱼
      isFishing = false;
      nextFishEndTime = 0;
    }

    if (homepageRes.data.fishing.stat == 1) {
      // 还在钓鱼中
      isFishing = true;
      nextFishEndTime = homepageRes.data.fishing.fishEtMs;
    }

    if (homepageRes.data.fishing.stat == 2) {
      // 上一次未收杆
      await endFish();
      await sleep(1000);
    }

    timerAutoFish = setInterval(async () => {
      if (isFishing) {
        // 正在钓鱼中，检测是否到时间收杆
        const now = new Date().getTime();
        if (now <= nextFishEndTime) return;
        await endFish();
      } else {
        const fishRes = await AutoFish_startFish();
        if (fishRes.error !== 0) {
          showMessage(fishRes.msg, "error");
          console.log(fishRes, "钓鱼失败");
          if (fishRes.error == 1001007) {
            // 操作失败
            await endFish();
          }
          if (fishRes.error == 1005003) {
            // 鱼饵不足
            clearInterval(timerAutoFish);
          }
          return;
        }
        isFishing = true;

        nextFishEndTime = fishRes.data.fishing.fishEtMs;
      }
    }, 1500);
  });
}

async function endFish() {
  const fishRes = await AutoFish_endFish();
  if (fishRes.error !== 0) {
    console.log(fishRes, "收杆失败");
    const homepageRes = await AutoFish_getHomepageData();
    if (homepageRes.data.fishing.stat == 0) {
      // 钓鱼已完成
      isFishing = false;
      nextFishEndTime = 0;
    }
    return;
  }
  let str = `【自动钓鱼】`;
  let fishData = autoFishInfo.find((item) => item.fishId == fishRes.data.fish.id);
  if (fishData) {
    str += `获得${fishData.name}${fishRes.data.fish.wei}斤`;
  }
  if (fishRes.data.awards && fishRes.data.awards.length > 0) {
    for (let i = 0; i < fishRes.data.awards.length; i++) {
      let award = fishRes.data.awards[i];
      str += `${fishData ? "，" : ""}获得${award.awardName}x${award.awardNum}`;
    }
  }
  if (str !== "【自动钓鱼】") showMessage(str, "success");
  isFishing = false;
}

function saveData_AutoFish() {
  let value = document.getElementById("extool__autofish_start").checked;
  let data = {
    isAutoFish: value
  };
  localStorage.setItem("ExSave_AutoFish", JSON.stringify(data)); // 存储弹幕列表
}

function ExpandTool_AutoFish_Set() {
  // 设置初始化
  let ret = localStorage.getItem("ExSave_AutoFish");
  if (ret != null) {
    let retJson = JSON.parse(ret);
    if (!retJson.isAutoFish) return;
    document.getElementById("extool__autofish_start").click();
  }
}

function AutoFish_getFishInfo() {
  return new Promise((resolve) => {
    fetch(`https://www.douyu.com/japi/revenuenc/web/actfans/achieve/accList?rid=${rid}&type=1&period=1`, {
      method: "GET",
      mode: "no-cors",
      cache: "default",
      credentials: "include"
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        if (ret.data) {
          resolve(ret.data.accList);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}

function AutoFish_getHomepageData() {
  return new Promise((resolve) => {
    fetch(`https://www.douyu.com/japi/revenuenc/web/actfans/fishing/homePage?rid=${rid}&opt=1`, {
      method: "GET",
      mode: "no-cors",
      cache: "default",
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
      });
  });
}

function AutoFish_startFish() {
  return new Promise((resolve) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/actfans/fishing/fishing", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&rid=${rid}&baitId=${baitId}`
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

function AutoFish_endFish() {
  return new Promise((resolve) => {
    fetch("https://www.douyu.com/japi/revenuenc/web/actfans/fishing/reelIn", {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `ctn=${getCCN()}&rid=${rid}`
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
