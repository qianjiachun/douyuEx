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
	if (refreshCache.prefixHotkey === undefined) refreshCache.prefixHotkey = 'q';
	if (refreshCache.rankHotkey === undefined) refreshCache.rankHotkey = 'b';
}
function saveData_Refresh(key, value) {
	if (refreshCache == null) initRefreshCache();
	if (key === undefined) {
		refreshCache.simpleMode = { status: document.body.classList.contains("is-simpleMode") };
		refreshCache.prefixHidden = { status: document.body.classList.contains("is-prefixHidden") };
		refreshCache.rankHidden = { status: document.body.classList.contains("is-rankHidden") };
	} else {
		refreshCache[key] = value;
	}
	localStorage.setItem(REFRESH_KEY, JSON.stringify(refreshCache));
}
function loadData_Refresh(key, defaultValue = false) {
	if (refreshCache == null) initRefreshCache();
	const item = refreshCache[key];
	if (item && typeof item === 'object' && 'status' in item) {
		return item.status;
	}
	return item !== undefined ? item : defaultValue;
}