function NoLogin_applyDouyuRateRecord() {
  const NO_LOGIN_RATE_KEY = "rateRecordTime_h5p_room";
    try {
        const raw = localStorage.getItem(NO_LOGIN_RATE_KEY);
        let data = raw ? JSON.parse(raw) : {};
        if (typeof data !== "object" || data === null) {
            data = {};
        }
        if (data.v === "v") {
            return;
        }
        data.v = "v";
        localStorage.setItem(NO_LOGIN_RATE_KEY, JSON.stringify(data));
    } catch (e) {}
}

function initPkg_NoLogin() {
    NoLogin_applyDouyuRateRecord();
}
