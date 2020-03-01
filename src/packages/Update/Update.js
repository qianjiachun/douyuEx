// 版本号
// 格式 yyyy.MM.dd.**
// var curVersion = "2020.01.12.01";
var curVersion = "2020.03.01.01"
function initPkg_Update() {
	initPkg_Update_Dom();
	initPkg_Update_Func();

	Update_checkVersion(); // 首次检查更新
}

function initPkg_Update_Dom() {
	Update_insertIcon();
}
function Update_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-update";
	a.innerHTML = '<a class="ex-panel__icon" title="版本更新"><svg t="1578767541873" style="display:block;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23715" width="32" height="32"><path d="M768 810.7H512c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h256c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z" fill="#3688FF" p-id="23716"></path><path d="M554.7 938.7c-10.9 0-21.8-4.2-30.2-12.5l-128-128c-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0 16.7 16.7 16.7 43.7 0 60.3L487 768l97.8 97.8c16.7 16.7 16.7 43.7 0 60.3-8.3 8.4-19.2 12.6-30.1 12.6z" fill="#5F6379" p-id="23717"></path></svg><i id="ex-update__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_Update_Func() {
	document.getElementsByClassName("ex-update")[0].addEventListener("click", Update_openUpdatePage);
}

function Update_checkVersion() {
	fetch('https://greasyfork.org/zh-CN/scripts/394497',{
		method: 'GET',
		mode: 'cors',
		cache: 'no-store',
		credentials: 'omit',
	}).then(res => {
		return res.text();
	}).then(txt => {
		txt = (new DOMParser()).parseFromString(txt, 'text/html');
		let v = txt.getElementsByClassName("script-show-version")[1];
		if(v != undefined){
			if (v.innerText != curVersion) {
				Update_showTip(true);
			}
		}
	}).catch(err => {
		console.error('请求失败', err);
	})
}

function Update_openUpdatePage() {
	openPage("https://greasyfork.org/zh-CN/scripts/394497", true);
}

function Update_showTip(a) {
	let d = document.getElementById("ex-update__tip");
	if (a == true) {
		if (d.style.display != "block") {
			showMessage("【版本更新】插件有新版本，请及时更新~", "error");
			d.style.display = "block";
		}
	} else {
		d.style.display = "none";
	}
}