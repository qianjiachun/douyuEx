function getVideoStreamUrl(vid, sign) {
  return new Promise(resolve => {
      fetch("https://v.douyu.com/api/stream/getStreamUrl", {
          method: 'POST',
          mode: 'no-cors',
          credentials: 'include',
          headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
          body: `${sign}&vid=${vid}`
      }).then(result => {
          return result.json();
      }).then(ret => {
          resolve(ret);
      }).catch(err => {
          console.log("请求失败!", err);
      })
  })
}

function getVideoBarrageByTime(vid, pre = 0) {
  // pre来自接口返回值data.pre中
  // 若为-1则不再获取
  if (pre < 0) {
      return;
  }
  return new Promise(resolve => {
      fetch(`https://v.douyu.com/wgapi/vod/center/getBarrageListByPage?vid=${vid}&offset=${pre}`, {
          method: 'GET',
          mode: 'no-cors',
          credentials: 'include',
      }).then(result => {
          return result.json();
      }).then(ret => {
          resolve(ret);
      }).catch(err => {
          console.log("请求失败!", err);
      })
  })
}