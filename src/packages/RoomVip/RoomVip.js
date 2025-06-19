const roomVipExpireDayLimit = 3;
function initPkg_RoomVip() {
  setRoomVipExpireDays();
}

function initPkg_RoomVip_Dom() {
  let a = document.createElement("span");
  a.className = "room-vip";
  a.innerHTML = `
	距VIP到期 <span id="room-vip-expire-days">**</span> 天
	`;
  let b = getValidDom([".PlayerToolbar-ContentCell .PlayerToolbar-Wealth"]);
  b && b.insertBefore(a, b.childNodes[0]);
}

function setRoomVipExpireDays() {
  fetch("https://www.douyu.com/member/platform_task/effect_list", {
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
      const enterEffectDom = doc.getElementsByClassName("enter-wraper is-effect");
      if (!enterEffectDom) return;
      if (enterEffectDom.length == 0) return;
      const showEffectMoreDom = enterEffectDom[0].getElementsByClassName("show-effect-more");
      if (!showEffectMoreDom) return;
      if (showEffectMoreDom.length == 0) return;
      for (let i = 0; i < showEffectMoreDom.length; i++) {
        const detail = JSON.parse(showEffectMoreDom[i].getAttribute("data-detail"));
        if (String(detail.property_id) !== "1646") continue; // 1646是VIP的ID
        if (String(detail.show_id_list) !== String(rid)) continue;
        const expireTime = detail.expire_time * 1000;
        const days = Math.floor((expireTime - Date.now()) / (1000 * 60 * 60 * 24));
        if (days <= roomVipExpireDayLimit) {
          initPkg_RoomVip_Dom();
          document.getElementById("room-vip-expire-days").innerText = days;
        }
      }
    })
    .catch((err) => {
      console.log("请求失败!", err);
    });
}
