function initPkg_ExPanel() {
	initPkg_ExPanel_insertDom();
}
function initPkg_ExPanel_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-panel";
	a.innerHTML = '<div class="ex-panel__wrap"></div>';
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}
