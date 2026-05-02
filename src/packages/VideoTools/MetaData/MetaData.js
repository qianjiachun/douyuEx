import { getValidDom, rid, showMessage } from "../../../common.js";
import { getRealLive_Douyu } from "../../../require/RealLive/Douyu/RealLive_Douyu.js";
import flvjs from 'flv.js'

let videoMetaData = null;
export function initPkg_VideoTools_MetaData() {
  MetaData_init();
}

function initPkg_VideoTools_MetaData_Dom() {
  if (!videoMetaData) return;
  if (!videoMetaData.dy_cpu_model && !videoMetaData.dy_gpu_model && !videoMetaData.dy_device_model && !videoMetaData.dy_os_version && !videoMetaData.z_canvas_code) return;
  let a = document.createElement("li");
    a.id = "ex-metadata";
    a.innerHTML = `
    主播配置信息
    <ul class="metadata__wrap">
      ${videoMetaData.dy_cpu_model ? `<li title="${videoMetaData.dy_cpu_model}">🤖CPU<br/>${videoMetaData.dy_cpu_model}</li>` : ``}
      ${videoMetaData.dy_gpu_model ? `<li title="${videoMetaData.dy_gpu_model}">🎮显卡<br/>${videoMetaData.dy_gpu_model}</li>` : ``}
      ${videoMetaData.dy_device_model ? `<li title="${videoMetaData.dy_device_model}">📱设备<br/>${videoMetaData.dy_device_model}</li>` : ``}
      ${videoMetaData.dy_os_version ? `<li title="${videoMetaData.dy_os_version}">🖥️系统<br/>${videoMetaData.dy_os_version}</li>` : ``}
      ${videoMetaData.z_canvas_code ? `<li title="${videoMetaData.z_canvas_code}">🎥场景<br/>${videoMetaData.z_canvas_code}</li>` : ``}
    </ul>
    `;

    let b = document.getElementsByClassName("menu-da2a9e")[0];
    b.insertBefore(a, b.childNodes[1]);
}

function MetaData_init() {
  getRealLive_Douyu(rid, true, false, "1", (lurl) => {
    if (lurl != "" || lurl != null) {
      if (lurl == "None") {
        showMessage("房间未开播或其他错误", "error");
        return;
      }
      let lurl_host_arr = String(lurl).split("/live");
      let lurl_host = "";
      if (lurl_host_arr.length > 0) {
        lurl_host = lurl_host_arr[0];
      }
      let id = "Fake"
      let a = document.createElement("div");
      let html = "";
      a.id = "exVideoDiv" + id;
      a.className = "exVideoDiv";
      html += "<video controls='controls' class='exVideoPlayer' id='exVideoPlayer" + String(id) + "'></video><div class='exVideoScale' id='exVideoScale" + String(id) + "'></div>";
      a.innerHTML = html;
      let b = getValidDom([".layout-Main", ".playerWrap__8wGvw", ".live-next-body"]);
      b.insertBefore(a, b.childNodes[0]);
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById("exVideoPlayer" + id);
        let flvPlayer = flvjs.createPlayer(
          {
            type: "flv",
            url: lurl
          },
          { fixAudioTimestampGap: false }
        );
        flvPlayer.on("media_info", (e) => {
          if (e && e.metadata) {
            videoMetaData = e.metadata;
            let box = document.getElementById("exVideoDiv" + String(id));
            let exVideoPlayer = document.getElementById("exVideoPlayer" + String(id));
            flvPlayer.destroy();
            exVideoPlayer.remove();
            box.remove();
            initPkg_VideoTools_MetaData_Dom();
          }
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
      }
    }
  });
}