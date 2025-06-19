function initPkg_ExPanel() {
    initPkg_ExPanel_insertDom();

    let exPanelDOM = document.querySelector('.ex-panel');
    exPanelDOM.addEventListener('mouseenter', () => {
        clearTimeout(exPanelTimer);
    });
    exPanelDOM.addEventListener('mouseleave', () => {
        clearTimeout(exPanelTimer);
        exPanelTimer = setTimeout(autoCloseExPanelHandle, 800);
    });
}
function initPkg_ExPanel_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-panel";
	a.innerHTML = '<div class="ex-panel__wrap"></div>';
	
    let b = document.querySelector(".PlayerToolbar-ContentCell .PlayerToolbar-Wealth");
    if (!b) {
        b = document.querySelector(".PlayerToolbar-ContentRow");
        a.style.bottom = "76px";
    }
    b.insertBefore(a, b.childNodes[0]);
	
}
function autoCloseExPanelHandle() {
    let exPanelDOM = document.querySelector('.ex-panel');
    exPanelDOM.style.visibility = 'hidden';
    exPanelDOM.style.opacity = '0';
    exPanelTimer = null;
}
