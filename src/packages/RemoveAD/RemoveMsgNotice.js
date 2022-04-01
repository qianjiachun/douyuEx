let isRemoveMsgNotice = 0;
function initPkg_RemoveMsgNotice() {
	initPkg_RemoveMsgNotice_Dom();
    initPkg_RemoveMsgNotice_Func();
    initPkg_RemoveMsgNotice_Set();
}

function initPkg_RemoveMsgNotice_Dom() {
	let a = document.createElement("div");
    a.style = "position: absolute;right: 5px;top: 40px;cursor: pointer;"
    a.id = "ex-removeMsgNotice";
    a.innerHTML = `<label id="msg-removeNotice" style="cursor: pointer;"><input type="checkbox" />关闭角标提醒</label>`;
    a.title = "关闭角标提醒";
	let b = document.getElementsByClassName("PrivateLetter-frame")[0];
    if (b) {
        b.appendChild(a);
    }
}

function initPkg_RemoveMsgNotice_Func() {
    let dom = document.getElementById("msg-removeNotice");
    if (!dom) return;
    let checkbox = dom.querySelector("input");
    dom.addEventListener("click", () => {
        let ischecked = checkbox.checked;
		if (ischecked == true) {
            isRemoveMsgNotice = 1;
            removeMsgNotice();
		} else{
            isRemoveMsgNotice = 0;
            removeMsgNoticeCanel();
        }
        saveData_removeMsgNotice();
    })
}

function initPkg_RemoveMsgNotice_Set() {
    let ret = localStorage.getItem("ExSave_isRemoveMsgNotice");
    if (ret && ret == "1") {
        isRemoveMsgNotice = 1;
        removeMsgNotice();
        let dom = document.getElementById("msg-removeNotice");
        if (dom) {
            dom.querySelector("input").checked = true;
        }
    }
}

function removeMsgNotice() {
    StyleHook_set("Ex_Style_RemoveMsgNotice", `.UserInfo .Badge,.ChatLetter-PopUnread{display:none!important;}`);
}

function removeMsgNoticeCanel() {
    StyleHook_remove("Ex_Style_RemoveMsgNotice");
}

function saveData_removeMsgNotice() {
    localStorage.setItem("ExSave_isRemoveMsgNotice", isRemoveMsgNotice); 
}