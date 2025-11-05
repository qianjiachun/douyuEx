function initPkg_Shield() {
  // let t = setInterval(() => {
  //     if (typeof document.getElementsByClassName("ShieldTool-list")[0] !== "undefined") {
  //         clearInterval(t);
  //         initPkg_Shield_RemoveEnter();
  //         initPkg_Shield_RemoveDanmakuBackground();
  //     }
  // }, 1000);

  let t = setInterval(() => {
    if (typeof document.getElementsByClassName("BarrageFilter")[0] !== "undefined") {
      clearInterval(t);
      new DomHook(".BarrageFilter", false, (m) => {
        if (m.length === 0) return;
        if (m[0].addedNodes.length > 0 && m[0].removedNodes.length === 0) {
          const domFilterKeywords = document.getElementsByClassName("FilterKeywords")[0];
          if (domFilterKeywords) {
            initPkg_Shield_Enable();
          } else {
            let t2 = setInterval(() => {
              const domFilterKeywords = document.getElementsByClassName("FilterKeywords")[0];
              if (domFilterKeywords) {
                clearInterval(t2);
                initPkg_Shield_Enable();
              }
            }, 50);
          }
        }
      });
    }
  }, 1000);
}

function initPkg_Shield_Enable() {
  initPkg_Shield_RemoveRepeatedDanmaku();
  initPkg_Shield_RemoveEnter();
  initPkg_Shield_RemoveDanmakuBackground();
}