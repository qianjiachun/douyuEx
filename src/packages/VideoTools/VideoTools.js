let videotools_num = 0;
function initPkg_VideoTools() {
    let timer = setInterval(() => {
        if (document.getElementsByClassName("right-e7ea5d").length > 0) {
            clearInterval(timer);
            initPkg_VideoTools_Module();
            initPkg_VideoTools_Func();
        }
        videotools_num++;
        if (videotools_num >= 15) {
            clearInterval(timer);
        }
    }, 1500);
}

function initPkg_VideoTools_Module() {
    // 添加模块
    initPkg_VideoTools_VideoSpeed();
    initPkg_VideoTools_Cinema();
    initPkg_VideoTools_VideoSync();
    initPkg_VideoTools_VideoRecall();
}

function initPkg_VideoTools_Func() {

}
