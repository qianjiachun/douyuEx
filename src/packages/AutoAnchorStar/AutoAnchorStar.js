function initPkg_AutoAnchorStar() {
	initPkg_AutoAnchorStar_Dom();
	initPkg_AutoAnchorStar_Func();
}

function initPkg_AutoAnchorStar_Dom() {
	AutoAnchorStar_insertIcon();
}
function AutoAnchorStar_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-auto-anchor-star";
	a.innerHTML = `<a class="ex-panel__icon" title="全自动代抢星推荐红包"><img style="width:36px;height:36px;" src="https://shark2.douyucdn.cn/front-publish/live-new-anchor-support-master/assets/images/entryIcon_ee486a8.png"/></a>`;
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_AutoAnchorStar_Func() {
	document.getElementsByClassName("ex-auto-anchor-star")[0].addEventListener("click", function() {
        openPage("https://xtj.douyuex.com/");
	});
}

