let anchorPocketData = {
  t: 0,
  list: []
};

async function initPkg_CheckAnchorPocket() {
  await updateAnchorPocketData();
  new DomHook(".FansMedalPanel-enter", false, async (m) => {
    const targetDom = document.querySelector(".FansMedalInfo-head");
    if (!targetDom) return;

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    const anchorDate = new Date(anchorPocketData.t);
    const anchorDay = anchorDate.getDate();

    if (currentDay > anchorDay) {
      await updateAnchorPocketData();
    }

    const list = anchorPocketData.list;
    if (list.length === 0) return;
    const dom = document.createElement("div");
    dom.innerHTML = `
      <div style="display: flex; align-items: center;gap: 8px;margin-top: 4px;">
        ${list
          .map(
            (item) => `
          <div style="display: flex; align-items: center;">
            <img style="width: 20px; height: 20px;margin-right: 4px;" src="${item.webIcon}" alt="${item.name}">
            <span style="font-size: 12px;">${item.name}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    targetDom.appendChild(dom);
  });
}

async function updateAnchorPocketData() {
  const newList = await getAnchorPocketList(rid);
  anchorPocketData.list = newList;
  anchorPocketData.t = new Date().getTime();
}

async function getAnchorPocketList(rid) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.douyu.com/japi/interact/cdn/pocket/effective?rid=${rid}`, {
      method: "GET",
      mode: "no-cors",
      credentials: "include"
    })
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        if (!res.data) return resolve([]);
        resolve(res.data.list);
      })
      .catch((err) => {
        console.log("请求失败!", err);
      });
  });
}
