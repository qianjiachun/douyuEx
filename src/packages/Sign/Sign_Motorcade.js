function initPkg_Sign_Motorcade() {
	signMotorcade();
}

function signMotorcade() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://msgm.douyu.com/mapi/v1.0/motorcade_battle/home",
		responseType: "json",
		headers: {
		  "dy-client": "android",
		  "dy-token": dyToken,
		},
		onload: function(response) {
			if (Object.keys(response.response).length != 0) {
				if (Object.keys(response.response.data.joined_motorcade).length != 0) {
					let mid = encodeURIComponent(response.response.data.joined_motorcade.id);
					GM_xmlhttpRequest({
						method: "GET",
						url: "https://msg.douyu.com/v3/motorcade/signs/weekly?mid=" + mid,
						responseType: "json",
						headers: {
							"dy-client": "android",
							"dy-token": dyToken,
						},
						onload: function(response) {
							if (response.response.data.is_sign == "1") {
								showMessage("【车队签到】车队已签到", "warning");
							} else {
								showMessage("【车队签到】即将打开车队签到页面", "info");
								openPage("https://msg.douyu.com/motorcade/#/motorcade/" + mid + "/task?total=" + String(Number(response.response.data.total) + 1) + "&mid=" + mid + "&exid=chun", false);
							}
						}
					});
				} 
			}
		}
	});
}

function getCookie(cookieName) {
	let csrfToken = "";
	let strCookie = document.cookie;
	let arrCookie = strCookie.split("; ");
	for(let i = 0; i < arrCookie.length; i++) {
		let arr = arrCookie[i].split("=");
		if(cookieName == arr[0]){
			csrfToken = arr[1];
		}
	}
	if(csrfToken == ""){
		csrfToken = Math.random().toString(36).substr(2);
		document.cookie = "post-csrfToken="+ escape(csrfToken)+";path=/";
	}
	return csrfToken;
}
function signMotorcade_Sign(m, t) {
	fetch('https://msg.douyu.com/v3/msign/add?timestamp=' + Math.random().toFixed(17), {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'dy-device-id':'-',
			"dy-client": "web",
			"dy-csrf-token":getCookie("post-csrfToken"),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: "to_mid="+ m +"&expression=" + t
	}).then(res => {
		return res;
	}).then(ret => {
		if (Math.floor(ret.status_code / 100) == 2){
			console.log("【车队】签到成功")
		} else {
			console.log(ret.message);
		}
		closePage();
	}).catch(err => {
		console.log("请求失败!", err)
		closePage();
	})
}