function initPkg_MiniProgram() {
	initPkg_MiniProgram_Dom();
	initPkg_MiniProgram_Func();
}

function initPkg_MiniProgram_Dom() {
	MiniProgram_insertIcon();
	MiniProgram_insertModal();
}
function MiniProgram_insertIcon() {
	let a = document.createElement("div");
	a.className = "MiniProgram";
	a.innerHTML = '<a class="ex-panel__icon" title="移动端"><svg style="display:block" t="1605503862776" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4759" width="32" height="32"><path d="M512.153785 1024a511.692431 511.692431 0 1 1 512.102523-511.692431 511.897477 511.897477 0 0 1-512.102523 511.692431z m207.967961-742.420505a163.21666 163.21666 0 0 0-246.670404 97.089308c0 29.372847 0 242.46696-2.306769 271.686023a86.529435 86.529435 0 0 1-134.048858 25.630757c-80.173008-77.609932 35.88306-125.898278 54.542251-135.279135a44.392471 44.392471 0 0 0-54.542251-67.665199 176.185823 176.185823 0 0 0-104.522227 130.768122 164.395675 164.395675 0 0 0 96.627954 153.37445c153.169403 51.671606 227.242291-70.894674 226.063276-108.264318V383.026031a82.428514 82.428514 0 0 1 156.603924 2.35803c11.790148 56.387665-76.892271 97.089307-74.790548 114.723268-16.454946 59.822187 54.542251 54.132159 54.54225 54.132158 207.762915-168.189027 28.501402-272.659992 28.501402-272.659992z" fill="#59B540" p-id="4760"></path></svg><i id="MiniProgram__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function MiniProgram_insertModal() {
	let a = document.createElement("div");
	a.className = "miniprogram__panel";
    a.innerHTML = `
		<div class="miniprogram__wrap">
			<div>DouyuEx移动端上线啦</div><div>微信扫码或<b>搜索DouyuEx</b></div><div>↓ 即刻体验 ↓</div>
			<img style="width: 200px;height: 200px;" src="https://qianjiachun.github.io/DouyuEx/DouyuExQRCode.jpg">
		</div>
		<div class="miniprogram__triangle"></div>
    `;
	let b = getValidDom([".PlayerToolbar-ContentCell .PlayerToolbar-Wealth", "#js-backpack-enter"]);
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_MiniProgram_Func() {
	document.getElementsByClassName("MiniProgram")[0].addEventListener("click", function() {
		let a = document.getElementsByClassName("miniprogram__panel")[0];
        if (a.style.display != "block") {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
	});
}

