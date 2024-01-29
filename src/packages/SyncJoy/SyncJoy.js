function initPkg_SyncJoy() {
	initPkg_SyncJoy_Dom();
	initPkg_SyncJoy_Func();
}

function initPkg_SyncJoy_Dom() {
	SyncJoy_insertIcon();
}
function SyncJoy_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-syncjoy";
	a.innerHTML = '<a class="ex-panel__icon" title="SyncJoy"><svg style="display:block;" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="42930" width="32" height="32"><path d="M1280.012 768.4c0-10.514-0.916-21.2-2.812-31.96l-66.76-423.2C1182.812 155.92 1044.012 64 638.212 64 238.012 64 97.432 154.92 69.572 313.2L2.812 736.4a183.96 183.96 0 0 0-2.812 31.96c0 103.78 89.16 191.62 203 191.62 99.38 0 187.56-60.12 219-149.28l15-42.72h406l15 42.72c31.44 89.16 119.62 149.28 219 149.28C1190.812 958.2 1280.012 872.2 1280.012 768.4zM494.212 496l-63.92-0.02-0.08 64.02c0 26.4-21.56 48-47.96 48-26.4 0-48.04-21.6-48.04-48l0.074-64.02-64.074 0.02c-26.4 0-47.96-21.6-47.96-48s21.54-48 47.96-48l64.08-0.022L334.212 336c0-26.4 21.64-48 48.04-48s47.96 21.6 47.96 48l0.074 63.98 63.926 0.02c26.4 0 48.04 21.6 48.04 48-0.04 26.4-19.84 48-48.04 48zM864.012 622.2c-44.18 0-80-35.84-80-80s35.82-80 80-80 80 35.84 80 80c0 46-35.8 80-80 80z m128-192c-44.18 0-80-35.84-80-80s35.82-80 80-80 80 35.84 80 80c0 46-35.8 80-80 80z" p-id="42931" fill="#533566"></path></svg><i id="SyncJoy__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_SyncJoy_Func() {
	document.getElementsByClassName("ex-syncjoy")[0].addEventListener("click", function() {
        openPage("https://sb.douyuex.com/");
	});
}

