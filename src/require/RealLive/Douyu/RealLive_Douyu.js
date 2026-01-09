/*
    Get Douyu Real Live URL (http/https)
    By: 小淳
*/
function getRealLive_Douyu(room_id, is_video, is_https, qn, reallive_callback) {
  // 第一个参数传入string,表示房间号（注意是真实房间号）
  // 第二个参数传入bool,表示是视频还是音频
  // 第三个参数传入bool,表示是否返回https地址。注意https地址只能使用一次，使用过以后需要再次获取；http地址无限制
  // 第四个参数传入string(1,2,3,4),表示清晰度 流畅_550p(rate:1) 高清_1200p(rate:2) 超清_2000p(rate:3) 蓝光4M_4000p(rate:0) 填写1428则返回默认清晰度
  // 第五个参数传入回调函数，最好是箭头函数，用于处理返回的地址，例: (url) => {console.log(url)}

  let did = getCookieValue("dy_did") || "10000000000000000000000000001501";

  GM_xmlhttpRequest({
    method: "GET",
    url: `https://www.douyu.com/wgapi/livenc/liveweb/websec/getEncryption?did=${did}`,
    responseType: "json",
    onload: function (res) {
      if (res.response.error !== 0) return reallive_callback("None");

      let d = res.response.data;
      let ts = Math.round(Date.now() / 1000);
      let auth = getDouyuRealLiveAuth(room_id, did, ts, d.key, d.rand_str, d.enc_time, d.is_special);
      let rate = qn == "1428" ? "-1" : qn;
      let postData = `enc_data=${d.enc_data}&tt=${ts}&did=${did}&auth=${auth}&cdn=&rate=${rate}&hevc=0&fa=0&ive=0`;

      GM_xmlhttpRequest({
        method: "POST",
        url: `https://www.douyu.com/lapi/live/getH5PlayV1/${room_id}`,
        data: postData,
        responseType: "json",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        onload: function (res) {
          let ret = res.response;
          if (ret.error === 0) {
            let url = `${ret.data.rtmp_url}/${ret.data.rtmp_live}`;
            reallive_callback(is_video ? url : url + "&only-audio=1");
          } else {
            reallive_callback("None");
          }
        }
      });
    }
  });
}

function getDouyuRealLiveAuth(rid, did, ts, key, rand_str, enc_time, is_special) {
  let i = is_special === 1 ? "" : `${rid}${ts}`;
  let f = rand_str;
  for (let p = 0; p < enc_time; p++) f = hex_md5(f + key);
  return hex_md5(f + key + i);
}
