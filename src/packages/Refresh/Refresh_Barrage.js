let current_barrage_status = 0; // 0没被简化 1被简化

function initPkg_Refresh_Barrage() {
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
	a.innerHTML = '<svg t="1588051109604" id="refresh-barrage__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16"><path d="M588.416 516.096L787.2 317.312a54.016 54.016 0 1 0-76.416-76.416L512 439.68 313.216 241.024A54.016 54.016 0 1 0 236.8 317.376l198.784 198.848-198.016 197.888a54.016 54.016 0 1 0 76.416 76.416L512 592.576l197.888 197.952a54.016 54.016 0 1 0 76.416-76.416L588.416 516.096z" fill="#AFAFAF" p-id="3096"></path></svg><i class="Barrage-toolbarIcon"></i><span id="refresh-barrage__text" class="Barrage-toolbarText">前缀</span>';
	let b = document.getElementsByClassName("Barrage-toolbar")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Refresh_Barrage_Func() {
	document.getElementById("refresh-barrage").addEventListener("click", function() {
        if (current_barrage_status == 0) {
            // 简化
            setRefreshBarrage();
        } else {
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
            setRefreshBarrage();
        }
    }
}
 
function setRefreshBarrage() {
    let cssText = `
    .UserCsgoGameDataMedal,.Barrage-honor,.Barrage-listItem .Barrage-icon,.Barrage-listItem .FansMedal.is-made,.Barrage-listItem .RoomLevel,.Barrage-listItem .Motor,.Barrage-listItem .ChatAchievement,.Barrage-listItem .Barrage-hiIcon,.Barrage-listItem .Medal,.Barrage-listItem .MatchSystemTeamMedal{display:none !important;}
    /*.Barrage-listItem .UserLevel{display:none !important;}*/
    .Barrage-listItem .Baby{display:none !important;}
    .FansMedalWrap{display:none !important;}
    `;
    StyleHook_set("Ex_Style_RefreshBarrage", cssText);
    current_barrage_status = 1;
    document.getElementById("refresh-barrage").style.backgroundColor = "rgb(18,150,219)";
    document.getElementById("refresh-barrage__text").style.color = "#fff";
}

function cancelRefreshBarrage() {
    StyleHook_remove("Ex_Style_RefreshBarrage");
    current_barrage_status = 0;
    document.getElementById("refresh-barrage").style.backgroundColor = "";
    document.getElementById("refresh-barrage__text").style.color = "";
}