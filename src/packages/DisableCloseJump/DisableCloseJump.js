function initPkg_DisableCloseJump_Timer() {
  setInterval(() => {
    const x = document.querySelector(".ClosingRecommend .dy-ModalRadius-close-x");
    if (!x) return;
    x.click();
  }, 1000);
}