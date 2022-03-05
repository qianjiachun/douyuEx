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
    a.innerHTML = `<label id="msg-removeNotice" style="cursor: pointer;"><input type="checkbox" />关闭提醒</label>`;
    a.title = "关闭消息提醒";
	let b = document.getElementsByClassName("PrivateLetter-frame")[0];
	b.appendChild(a);
}

function initPkg_RemoveMsgNotice_Func() {
    let dom = document.getElementById("msg-removeNotice");
    let checkbox = dom.querySelector("input");
    dom.addEventListener("click", () => {
        let ischecked = checkbox.checked;
		if (ischecked == true) {
            isRemoveMsgNotice = 1;
            StyleHook_set("Ex_Style_RemoveMsgNotice", `.ChatLetter-PopUnread{display:none!important;}`)
		} else{
            isRemoveMsgNotice = 0;
            StyleHook_remove("Ex_Style_RemoveMsgNotice")
        }
        saveData_removeMsgNotice();
    })
}

function initPkg_RemoveMsgNotice_Set() {
    let ret = localStorage.getItem("ExSave_isRemoveMsgNotice");
    if (ret && ret == "1") {
        isRemoveMsgNotice = 1;
        StyleHook_set("Ex_Style_RemoveMsgNotice", `.ChatLetter-PopUnread{display:none!important;}`);
        document.getElementById("msg-removeNotice").querySelector("input").checked = true;
    }
}

function saveData_removeMsgNotice() {
    localStorage.setItem("ExSave_isRemoveMsgNotice", isRemoveMsgNotice); 
}