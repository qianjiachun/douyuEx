function initPkg_LastLiveTime() {
  initPkg_LastLiveTime_Dom();
}

function initPkg_LastLiveTime_Dom() {
  const OVERLAY_ID = "ex-LastLiveTime-overlay";

  const html = document.body.innerHTML;
  const match = html.match(/show_time\\":(\d+)/);
  if (!match) return;
  const showTime = parseInt(match[1], 10) * 1000;

  const buildOverlay = () => {
    const formattedTime = dateFormat("yyyy-MM-dd hh:mm:ss", new Date(showTime));
    const agoText = timeago(showTime);

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1";
    overlay.style.pointerEvents = "none";

    const timeCard = document.createElement("div");
    timeCard.innerHTML = `
					<div style="display: flex; align-items: center; justify-content: center; font-size: 15px; color: #d6a848; margin-bottom: 8px;">
						<span style="display: inline-flex; width: 16px; height: 16px; margin-right: 6px;">
							<svg style="width: 100%; height: 100%; fill: currentColor;"><use xlink:href="#time_92d92c7"></use></svg>
						</span>
						上次开播时间
					</div>
					<div style="font-size: 26px; color: #f5d587; font-weight: bold; letter-spacing: 1px; margin-bottom: 6px;">${agoText}</div>
					<div style="font-size: 14px; color: rgba(245, 213, 135, 0.6); letter-spacing: 0.5px;">${formattedTime}</div>
				`;
    timeCard.style.padding = "24px 48px";
    timeCard.style.borderRadius = "12px";
    timeCard.style.backgroundColor = "rgba(24, 24, 24, 0.85)";
    timeCard.style.border = "1px solid rgba(214, 168, 72, 0.25)";
    timeCard.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.6)";
    timeCard.style.textAlign = "center";
    timeCard.style.fontFamily = '"PingFang SC", "Microsoft YaHei", sans-serif';
    timeCard.style.pointerEvents = "auto";

    overlay.appendChild(timeCard);
    return overlay;
  };

  const sync = () => {
    const player = document.querySelector(".room-Player");
    const douyuLastLive = document.getElementsByClassName("LastLiveTime").length > 0;
    const ourOverlay = document.getElementById(OVERLAY_ID);

    if (!douyuLastLive) {
      if (ourOverlay) ourOverlay.remove();
      return;
    }

    if (player && !ourOverlay) {
      player.appendChild(buildOverlay());
    }
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      sync();
    });
  };

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  sync();
}
