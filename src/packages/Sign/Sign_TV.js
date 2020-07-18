function initPkg_Sign_TV() {
	signTV();
}

function signTV() {
    let did = window.btoa(getDyDid());
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://apitv.douyucdn.cn/user/sign/index?token=" + dyToken + "&client_sys=android",
		responseType: "json",
		headers: {
			'User-Device': did
		},
		onload: function(response) {
			let ret = response.response;
			if (ret.error == "0") {
                showMessage("【电视端】签到成功！获得100鱼丸", "success");
			} else {
                showMessage("【电视端】" + ret.data.msg, "warning");
			}
		}
	});
}
