function initPkg_DisableCloseJump_Timer() {
  setInterval(() => {
    let x = document.getElementsByClassName("dy-ModalRadius-close-x");
    if (x.length > 0) {
      clearInterval(timer_closing);
      x[0].click();
    }
  }, 1000);
}