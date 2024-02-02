function initPkg_ExpandTool_FullScreen() {
    ExpandTool_FullScreen_insertDom();
    ExpandTool_FullScreen_insertFunc();
    initPkg_ExpandTool_FullScreen_Set();
}

function ExpandTool_FullScreen_insertDom() {
    let a = document.createElement("span");
    // a.className = "extool__bsize";
    a.innerHTML = '<label title="自动网页全屏+最高画质"><input style="margin-top:5px;" id="extool__fullscreen" type="checkbox">自动全屏+最高画质</label>';
    
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function getFullScreen() {
    return document.getElementById("extool__fullscreen").checked;
}
function ExpandTool_FullScreen_insertFunc() {
    document.getElementById("extool__fullscreen").addEventListener("click", function() {
        saveData_FullScreen();
        if (getFullScreen()) {
            showMessage("刷新页面生效", "success");
        }
    });
}

function saveData_FullScreen() {
	let data = {
		isFullScreen: getFullScreen()
	}
	localStorage.setItem("ExSave_FullScreen", JSON.stringify(data)); // 存储弹幕列表
}
function initPkg_ExpandTool_FullScreen_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_FullScreen");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isFullScreen) {
            document.getElementById("extool__fullscreen").checked = retJson.isFullScreen;
        }
	}
}


function initFullScreen() {
	let ret = localStorage.getItem("ExSave_FullScreen");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isFullScreen) {
            fullScreen();
        }
	}
}

function fullScreen() {
    let count = 0;
    let intID1 = setInterval(() => {
        count++;
        if (count > 100) clearInterval(intID1);
        if (document.getElementsByClassName("wfs-2a8e83").length > 0) {
            clearInterval(intID1);
            document.querySelector("div.wfs-2a8e83").click();
            document.querySelectorAll(".tipItem-898596 > ul > li")[0].click();
        }
    }, 1000);
}