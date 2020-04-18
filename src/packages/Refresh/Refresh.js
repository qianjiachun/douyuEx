function initPkg_Refresh() {
	initPkg_Refresh_BarrageFrame();
}

function saveData_Refresh() {
	// 此处为保存简洁模式的数据，请在每次操作后都调用这个函数以保存状态
	// 数据结构
	// {功能1:{子功能1:{}}}
	// 每个子模块需要提供相应的返回数据函数
	let data = {
		barrageFrame: {
			status: refresh_BarrageFrame_getStatus(),
		}
	}
	
	localStorage.setItem("ExSave_Refresh", JSON.stringify(data)); // 存储弹幕列表
}