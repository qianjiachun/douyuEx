function initPkg_Console() {
    console_watermark_douyEx();
}

function console_watermark_douyEx() {
    // console.log("DouyuEx插件官网 http://www.douyuex.com")
    console.log(`%c
   ______                    _____)
  (, /    )                /
    /    / ___             )__   __/
  _/___ /_(_)(_(_(_/_(_(_/        /(__
(_/___ /        .-/     (_____)  /
               (_/

%cver ${curVersion}`,'color:rgb(255,121,35);font-size:20px;font-weight:bold;', "color:red;font-size:16px;")
    return;
}