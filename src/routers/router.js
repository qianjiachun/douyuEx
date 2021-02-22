function initRouter(href) {
    if (String(href).indexOf("passport.douyu.com") != -1 && String(href).indexOf("exid=chun")) {
        initRouter_Passport();
	} else if (String(href).indexOf("msg.douyu.com") != -1) {
        initRouter_Motorcade();
    } else {
        if (String(href).indexOf("exid=chun") != -1) {
            initRouter_DouyuRoom_Popup();
        } else {
            initRouter_DouyuRoom_Main();
        }
    }
}

function initRouter_Motorcade() {
    // 车队
    if (getQueryString("exid") == "chun") {
        signMotorcade_Sign();
    }
}

function initRouter_DouyuRoom_Popup() {
    // 画中画
    let intID = setInterval(() => {
        if (typeof(document.querySelector('div.wfs-2a8e83')) != "undefined") {
            document.querySelector('div.wfs-2a8e83').click();
            document.querySelector('label.layout-Player-asidetoggleButton').click();
            let l = document.querySelectorAll(".tip-e3420a > ul > li").length;
            document.querySelectorAll(".tip-e3420a > ul > li")[l - 1].click();
            clearInterval(intID);
        }
    }, 1000);
}


function initRouter_DouyuRoom_Main() {
    // 主要
    init();
    let intID = setInterval(() => {
        if (typeof(document.getElementsByClassName("BackpackButton")[0]) != "undefined") {
            setTimeout(() => {
                initStyles();
                initPkg();
                initPkgSpecial();
                initTimer();
            }, 1500)
            clearInterval(intID);
        }
    }, 1000);
}

function initPkgSpecial() {
    if (rid == "5189167") {
        initPkg_Point();
    }
}

// function initRouter_Novel() {
//     startWatchNovel();
// }


function initRouter_Passport() {
    let lock = 0;
    GM_cookie("list", {
        path: "/"
    }, (cookies) => {
        if (cookies) {
            for (let i = 0; i < cookies.length; i++) {
                GM_cookie("delete", {
                    name: cookies[i]["name"]
                }, function (error) {
                    console.log(error || "del " + cookies[i]["name"]);
                    lock++;
                    if (lock >= cookies.length){
                    }
                });
            }
        } else {
        }
    });
}