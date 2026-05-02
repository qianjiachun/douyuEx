import { dateFormat, timeago } from '../../common.js';

export function initPkg_LastLiveTime() {
  initPkg_LastLiveTime_Dom();
}

function initPkg_LastLiveTime_Dom() {
  const OVERLAY_ID = "ex-LastLiveTime-overlay";
  const html = document.body.innerHTML;
  const statusMatch = html.match(/show_status\\":(\d+)/) || html.match(/"show_status":(\d+)/);
  const isLive = statusMatch && statusMatch[1] === "1";

  if (isLive) {
    return;
  }

  const match = html.match(/show_time\\":(\d+)/) || html.match(/"show_time":(\d+)/);
  if (!match) {
    return;
  }

  const showTime = parseInt(match[1], 10) * 1000;
  const formattedTime = dateFormat("yyyy-MM-dd hh:mm:ss", new Date(showTime));
  const agoText = timeago(showTime);

  let pollCount = 0;
  const maxPolls = 180;

  const timer = setInterval(() => {
    pollCount++;
    if (pollCount > maxPolls) {
      clearInterval(timer);
      return;
    }

    const player = document.querySelector(".room-Player");
    const hasLastLiveTime = document.getElementsByClassName("LastLiveTime").length > 0;

    if (player && hasLastLiveTime) {
      clearInterval(timer);

      if (document.getElementById(OVERLAY_ID)) {
        return;
      }

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

      const styleBlock = document.createElement("style");
      styleBlock.textContent = `
        .ex-llt-card {
            position: relative;
            padding: 32px 64px;
            border-radius: 16px;
            background: rgba(24, 24, 24, 0.65);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 215, 0, 0.15);
            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            text-align: center;
            font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
            pointer-events: auto;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            animation: ex-llt-fade-in 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .ex-llt-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 215, 0, 0.35);
            background: rgba(30, 30, 30, 0.75);
        }
        @keyframes ex-llt-fade-in {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ex-llt-close {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 22px;
            line-height: 1;
            color: rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.05);
            transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .ex-llt-close:hover {
            background: rgba(255, 69, 58, 0.9);
            color: #fff;
            transform: rotate(90deg) scale(1.1);
            box-shadow: 0 4px 12px rgba(255, 69, 58, 0.4);
        }
        .ex-llt-title {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            color: #e5b855;
            margin-bottom: 12px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            font-weight: 500;
        }
        .ex-llt-time-ago {
            font-size: 36px;
            color: #eebb4d;
            font-weight: 900;
            letter-spacing: 2px;
            margin-bottom: 10px;
            text-shadow: 0 0 15px rgba(238, 187, 77, 0.35), 0 4px 12px rgba(0,0,0,0.6);
        }
        .ex-llt-time-exact {
            font-size: 15px;
            color: rgba(229, 184, 85, 0.75);
            letter-spacing: 1px;
            font-family: monospace;
            font-weight: 500;
        }
      `;

      overlay.appendChild(styleBlock);

      const timeCard = document.createElement("div");
      timeCard.className = "ex-llt-card";

      timeCard.innerHTML = `
					<div class="ex-llt-title">
						<span style="display: inline-flex; width: 18px; height: 18px; margin-right: 8px;">
							<svg style="width: 100%; height: 100%; fill: currentColor;"><use xlink:href="#time_92d92c7"></use></svg>
						</span>
						上次开播时间
					</div>
					<div class="ex-llt-time-ago">${agoText}</div>
					<div class="ex-llt-time-exact">${formattedTime}</div>
                    <button type="button" class="ex-llt-close" aria-label="关闭">×</button>
				`;

      const closeBtn = timeCard.querySelector(".ex-llt-close");
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.3s ease";
        timeCard.style.transform = "translateY(10px) scale(0.95)";
        setTimeout(() => overlay.remove(), 300);
      });

      overlay.appendChild(timeCard);
      player.appendChild(overlay);
    }
  }, 1000);
}
