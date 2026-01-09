function initPkg_ExpandTool_P2P() {
    ExpandTool_P2P_insertDom();
    ExpandTool_P2P_insertFunc();
    initPkg_ExpandTool_P2P_Set();
}

function ExpandTool_P2P_insertDom() {
    let a = document.createElement("span");
    // a.className = "extool__bsize";
    a.innerHTML = '<label title="阻止p2p在后台占用网速，开启后直播画面会在刚进入页面时卡一下"><input id="extool__p2p" type="checkbox">阻止p2p上传</label>';
    
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function getP2P() {
    return document.getElementById("extool__p2p").checked;
}
function ExpandTool_P2P_insertFunc() {
    document.getElementById("extool__p2p").addEventListener("click", function() {
        saveData_P2P();
        if (getP2P()) {
            showMessage("阻止p2p上传成功，刷新页面生效", "success");
        }
    });
}

function saveData_P2P() {
	let data = {
		isKillP2P: getP2P()
	}
	localStorage.setItem("ExSave_P2P", JSON.stringify(data)); // 存储弹幕列表
}
function initPkg_ExpandTool_P2P_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_P2P");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isKillP2P) {
            document.getElementById("extool__p2p").checked = retJson.isKillP2P;
        }
	}
}


function initKillP2P() {
	let ret = localStorage.getItem("ExSave_P2P");
	if (ret != null) {
		let retJson = JSON.parse(ret);
        if (retJson.isKillP2P) {
            killP2P();
        }
	}
}

function killP2P() {
    let funNameList = [
        'RTCPeerConnection',
        'webkitRTCPeerConnection',
        'mozRTCPeerConnection',
        'msRTCPeerConnectio',
    ]
    funNameList.forEach(name => {
        if (typeof unsafeWindow.RTCPeerConnection === "undefined") unsafeWindow.RTCPeerConnection = unsafeWindow[name];
        if (typeof unsafeWindow[name] !== "undefined") unsafeWindow[name] = MyPeerConnection;
    })

    function MyPeerConnection() {
        return undefined;
    }
}