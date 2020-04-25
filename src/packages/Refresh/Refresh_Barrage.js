var sheetIndex3 = 0; // 请在Night模块后加载
let num_css_barrage = 0;
let current_barrage_status = 0; // 0没被简化 1被简化
function initPkg_Refresh_Barrage() {
    sheetIndex3 = getAvailableSheet(sheetIndex2 + 1);
    if (sheetIndex3 == -1) {
        return;
    }
	initPkg_Refresh_Barrage_Dom();
    initPkg_Refresh_Barrage_Func();
    initPkg_Refresh_Barrage_Set();
}

function initPkg_Refresh_Barrage_Dom() {
	Refresh_Barrage_insertIcon();
}
function Refresh_Barrage_insertIcon() {
	let a = document.createElement("a");
    a.className = "refresh-barrage";
    a.id = "refresh-barrage";
	a.innerHTML = '<i class="Barrage-toolbarIcon"></i><span id="refresh-barrage__text" class="Barrage-toolbarText">去除前缀</span>';
	let b = document.getElementsByClassName("Barrage-toolbar")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Refresh_Barrage_Func() {
	document.getElementById("refresh-barrage").addEventListener("click", function() {
        if (current_barrage_status == 0) {
            // 简化
            current_barrage_status = 1;
            setRefreshBarrage();
        } else {
            current_barrage_status = 0;
            cancelRefreshBarrage();
        }
        saveData_Refresh();
    });
}


function refresh_Barrage_getStatus() {
    if (current_barrage_status == 1) {
        // 被简化
        return true;
    } else {
        // 没被简化
        return false;
    }
}

function initPkg_Refresh_Barrage_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("barrage" in retJson == false) {
            retJson.barrage = {status: false};
        }
        if (retJson.barrage.status == true) {
            current_barrage_status = 1;
            setRefreshBarrage();
        }
    }
}
 
function setRefreshBarrage() {
    setBarrageIcon("display:none !important;");
    setFansMedalIsMade("display:none !important;");
    setUserLevel("display:none !important;");
    setRoomLevel("display:none !important;");
    setMotor("display:none !important;");
    setChatAchievement("display:none !important;");
    setBarrageHiIcon("display:none !important;");
    setMedal("display:none !important;");
    setMatchSystemTeamMedal("display:none !important;");
}

function cancelRefreshBarrage() {
    let a = document.styleSheets[sheetIndex3];
    let idx = a.rules.length - 1;
    for (let i = 0; i < num_css_barrage; i++) {
        a.removeRule(idx);
        idx = idx - 1;
    }
    num_css_barrage = 0;
}



function setBarrageIcon(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .Barrage-icon", t);
    num_css_barrage = num_css_barrage + 1;
}

function setFansMedalIsMade(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .FansMedal.is-made", t);
    num_css_barrage = num_css_barrage + 1;
}

function setUserLevel(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .UserLevel", t);
    num_css_barrage = num_css_barrage + 1;
}

function setRoomLevel(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .RoomLevel", t);
    num_css_barrage = num_css_barrage + 1;
}

function setMotor(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .Motor", t);
    num_css_barrage = num_css_barrage + 1;
}

function setChatAchievement(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .ChatAchievement", t);
    num_css_barrage = num_css_barrage + 1;
}

function setBarrageHiIcon(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .Barrage-hiIcon", t);
    num_css_barrage = num_css_barrage + 1;
}

function setMedal(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .Medal", t);
    num_css_barrage = num_css_barrage + 1;
}

function setMatchSystemTeamMedal(t) {
    document.styleSheets[sheetIndex3].addRule(".Barrage-listItem .MatchSystemTeamMedal", t);
    num_css_barrage = num_css_barrage + 1;
}
