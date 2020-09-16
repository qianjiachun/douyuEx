function initPkg_FishPond() {
	initPkg_FishPond_Dom();
	initPkg_FishPond_Func();
}

function initPkg_FishPond_Timer() {
	// 这里挂载每个子模块的时钟周期函数
	initPkg_FishPond_Bubble_Timer();
	initPkg_FishPond_Box_Timer();
	initPkg_FishPond_Task_Timer();
	initPkg_FishPond_RoomSign_Timer();
}
function initPkg_FishPond_Func() {
}
function initPkg_FishPond_Dom() {
	FishPond_insertIcon();
}
function FishPond_insertIcon() {
	
}

function getAllFishPond() {
	initPkg_FishPond_Bubble();
	initPkg_FishPond_Box();
	initPkg_FishPond_Task();
	initPkg_FishPond_RoomSign();
}

function FishPond_showTip(a) {
	// let d = document.getElementById("fish-pond__tip");
	// if (a == true) {
	// 	if (d.style.display != "block") {
	// 		showMessage("【鱼粮】有鱼粮可以领取啦！", "info");
	// 		d.style.display = "block";
	// 	}
	// } else {
	// 	d.style.display = "none";
	// }
}