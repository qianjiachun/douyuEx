function initPkg_Sign_Motorcade() {
	signMotorcade();
}

function signMotorcade() {
	openPage("https://msg.douyu.com/motorcade/#/motorcade/list/recommend?exid=chun", false);
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
async function signMotorcade_Sign() {
	let retConnect = await motorcadeConnect();
	let retConnect2 = await motorcadeConnect2(retConnect.data.uid, retConnect.data.sig);
	let mid = await getMotorcadeID(retConnect2.TinyId, retConnect2.A2Key, retConnect.data.uid);
	if (mid == null) {
		closePage();
		return;
	}
	if (mid == undefined) {
		closePage();
		return;
	}
	if (mid == "") {
		closePage();
		return;
	}
	console.log("mid是：", mid);
	mid = encodeURIComponent(mid);
	fetch('https://msg.douyu.com/v3/motorcade/signs/weekly?mid=' + mid + '&timestamp=' + Math.random().toFixed(17), {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'dy-device-id':'-',
			"dy-client": "web",
			"dy-csrf-token":getCookie("post-csrfToken"),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	}).then(res => {
		return res;
	}).then(ret => {
		console.log("weekly:", ret);
		if (ret.data.is_sign == "1") {
			closePage();
		} else {
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
				body: "to_mid="+ mid +"&expression=" + String(Number(ret.data.total) + 1)
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
	}).catch(err => {
		console.log("请求失败!", err)
	})
}

function motorcadeConnect() {
    return new Promise(resolve => {
        fetch('https://msg.douyu.com/v3/login/getusersig?t=' + String(new Date().getTime()) + '&timestamp=' + Math.random().toFixed(17), {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'dy-device-id':'-',
				"dy-client": "web",
				"dy-csrf-token":getCookie("post-csrfToken"),
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		}).then(res => {
			return res;
		}).then(ret => {
			resolve(ret);
		}).catch(err => {
			console.log("请求失败!", err)
		})
    })
}

function motorcadeConnect2(identifier, sig) {
    let url = "https://webim.tim.qq.com/v4/openim/login?identifier=" + identifier + "&usersig=" + sig +"&contenttype=json&sdkappid=1400029396";
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: '{"State":"Online"}',
            responseType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            onload: function(response) {
                resolve(response.response);
            }
        });
    })
}
function getMotorcadeID(tinyid, a2, identifier) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://webim.tim.qq.com/v4/group_open_http_svc/get_joined_group_list?tinyid=" + tinyid + "&a2=" + a2 + "&contenttype=json&sdkappid=1400029396",
            data: '{"Member_Account":"' + identifier + '"}',
            responseType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
				if (response.response.GroupIdList.length > 0) {
					resolve(response.response.GroupIdList[0].GroupId);
				} else {
					resolve("");
				}
            }
        });
    })
}