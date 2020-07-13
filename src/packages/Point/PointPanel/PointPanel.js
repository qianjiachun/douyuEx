function initPkg_Point_PointPanel() {
    initPkg_Point_PointPanel_insertDom();
    initPkg_Point_PointPanel_insertFunc();
}
function initPkg_Point_PointPanel_insertDom() {
	let a = document.createElement("div");
	a.className = "point__panel";
    a.innerHTML = `
            <div class="panel__wrap">
                <div id="panel__update" class="panel__cell">更新积分</div>
                <div id="panel__pointlist" class="panel__cell">积分榜</div>
				<div id="panel__exchange" class="panel__cell">兑换物品</div>
				<div id="panel__record" class="panel__cell">兑换记录</div>
				<div id="panel__rules" class="panel__cell">积分规则</div>
			</div>
			<div class="panel__triangle"></div>
    `;
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function initPkg_Point_PointPanel_insertFunc() {
    document.getElementById("panel__update").addEventListener("click",  () => {
        closePointPanel();
        updateUserPoint();
    });
    document.getElementById("panel__pointlist").addEventListener("click",  () => {
        closePointPanel();
        initPkg_Point_PointList();
    });
    document.getElementById("panel__exchange").addEventListener("click", async () => {
        closePointPanel();
        initPkg_Point_PointExchange();
    });
    document.getElementById("panel__record").addEventListener("click", async () => {
        closePointPanel();
        initPkg_Point_PointRecord();
    });
    document.getElementById("panel__rules").addEventListener("click",  async () => {
        closePointPanel();
        openPage("https://qianjiachun.github.io/DouyuEx/rules", true);
    });
}

function closePointPanel() {
    document.getElementsByClassName("point__panel")[0].style.display = "none";
}
