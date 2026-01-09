function initPkg_ExpandTool_BarrageSize() {
    ExpandTool_BarrageSize_insertDom();
    ExpandTool_BarrageSize_insertFunc();
    initPkg_ExpandTool_BarrageSize_Set();

    setBarrageSize(getBarrageSize());
    
}

function ExpandTool_BarrageSize_insertDom() {
    let a = document.createElement("div");
    a.className = "extool__bsize";
    a.innerHTML = '<label>弹幕大小(默认24px)：</label><input id="extool__bsize_value" type="text" style="width:50px;text-align:center;" value="24" /><input style="margin-left:10px;" type="button" id="extool__bsize_btn" value="确认" />';
    
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function setBarrageSize(s) {
    cancelBarrageSize();
    StyleHook_set("Ex_Style_DanmuSize", ".danmuItem-a8616a{font-size:" + s + "px !important;}");
}

function cancelBarrageSize() {
    StyleHook_remove("Ex_Style_DanmuSize");
}

function getBarrageSize() {
    return document.getElementById("extool__bsize_value").value;
}
function ExpandTool_BarrageSize_insertFunc() {
    document.getElementById("extool__bsize_btn").addEventListener("click", function() {
        setBarrageSize(getBarrageSize());
        saveData_BarrageSize();
    });
}

function saveData_BarrageSize() {
	let data = {
		size: getBarrageSize()
	}
	localStorage.setItem("ExSave_BarrageSize", JSON.stringify(data)); // 存储弹幕列表
}
function initPkg_ExpandTool_BarrageSize_Set() {
	// 设置初始化
	let ret = localStorage.getItem("ExSave_BarrageSize");
	if (ret != null) {
		let retJson = JSON.parse(ret);
		document.getElementById("extool__bsize_value").value = retJson.size;
	}
}