function initPkg_WeeklyPanel() {
    if (isShowWeeklyPanel()) {
        initPkg_WeeklyPanel_Dom();
        initPkg_WeeklyPanel_Func();
    }
}

function initPkg_WeeklyPanel_Dom() {
	let a = document.createElement("div");
	a.className = "weeklypanel__panel-wrap";
	a.innerHTML = `
		<div class="weeklypanel__panel">
            <div class="weeklypanel__close">×</div>
			<div class="weeklypanel__content">
				<div class="weeklypanel__text">😳项目维护不易，如果觉得DouyuEx有帮助到你的话</div>
				<div class="weeklypanel__text">请点击下方链接，在右上角点个免费的⭐吧！</div>
				<div class="weeklypanel__text">以鼓励我长期维护下去，感谢使用😇</div>
				<div class="weeklypanel__text"><a href="https://github.com/qianjiachun/douyuEx" target="_blank">https://github.com/qianjiachun/douyuEx</a></div>
				<img style="width: 500px;margin-top:50px;" class="weeklypanel__img" src="https://img.douyucdn.cn/data/yuba/weibo/2022/01/18/202201181035499149780732227.png"/>
			</div>
		</div>
	`;
	
	let b = document.querySelector("body");
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_WeeklyPanel_Func() {
    let weeklyPanel = document.getElementsByClassName("weeklypanel__panel-wrap")[0];
    document.getElementsByClassName("weeklypanel__close")[0].addEventListener("click", () => {
        weeklyPanel.style.display = "none";
    });
}

function isShowWeeklyPanel() {
    const LOCAL_NAME = "Ex_WeeklyPanel_NextTime";
    let tt = new Date().getTime();
    let nt = tt + 604800000;
    let nextTime = Number(localStorage.getItem(LOCAL_NAME));
    if (nextTime) {
        if (tt >= nextTime) {
            localStorage.setItem(LOCAL_NAME, nt);
            return true;
        }
    } else {
        localStorage.setItem(LOCAL_NAME, nt);
        return true;
    }
    return false;
}