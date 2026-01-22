function initPkg_Refresh() {
	initPkg_Refresh_Video();
	initPkg_Refresh_Barrage();
}

let refreshCache = null;
const REFRESH_KEY = "ExSave_Refresh";
function initRefreshCache() {
	try {
		refreshCache = JSON.parse(localStorage.getItem(REFRESH_KEY)) || {};
	} catch (err) {
		console.warn("DouyuEx: ExSave_Refresh JSON 解析失败", err);
		refreshCache = {};
	}
}
function saveData_Refresh() {
	if (refreshCache == null) initRefreshCache();
	refreshCache.simpleMode = { status: document.body.classList.contains("is-simpleMode") };
	refreshCache.prefixHidden = { status: document.body.classList.contains("is-prefixHidden") };
	refreshCache.rankHidden = { status: document.body.classList.contains("is-rankHidden") };
	localStorage.setItem(REFRESH_KEY, JSON.stringify(refreshCache));
}
function loadData_Refresh(key) {
	if (refreshCache == null) initRefreshCache();
	const { status = false } = refreshCache[key] || {};
	return status;
}