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
            initPkg_Shield_Enable(domFilterKeywords);
          } else {
            let t2 = setInterval(() => {
              const domFilterKeywords = document.getElementsByClassName("FilterKeywords")[0];
              if (domFilterKeywords) {
                clearInterval(t2);
                initPkg_Shield_Enable(domFilterKeywords);
              }
            }, 50);
          }
        }
      });
    }
  }, 1000);
}

function initPkg_Shield_Enable(domFilterKeywords) {
  new ResizeObserver(entries => {
    const asideMainHeight = entries[0].contentRect.height;
    const headerHeight = document.getElementsByClassName("AssembleExpressHeader-head")[0].offsetHeight;
    const chatHeight = domFilterKeywords.closest('.layout-Player-chat').offsetHeight;
    const maxHeightValue = `calc(${Math.round(asideMainHeight - headerHeight - chatHeight)}px)`;
    if (maxHeightValue !== domFilterKeywords.style.getPropertyValue('--filterkeywords-max-height')) {
        domFilterKeywords.style.setProperty('--filterkeywords-max-height', maxHeightValue);
    }
  }).observe(domFilterKeywords.closest('#js-player-asideMain'));
  initPkg_Shield_RemoveRepeatedDanmaku(domFilterKeywords);
  initPkg_Shield_RemoveEnter(domFilterKeywords);
  initPkg_Shield_RemoveDanmakuBackground(domFilterKeywords);
}