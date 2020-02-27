function initPkg_Sign_Yuba() {
	signYubaList();
}

function signYuba(group_id, t) {
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://yuba.douyu.com/ybapi/topic/sign",
		data: 'group_id=' + group_id,
		responseType: "json",
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded",
		  "dy-client": "pc",
		  "dy-token": t,
		  'Referer': 'https://yuba.douyu.com/group/' + group_id
		},
		onload: function(response) {
			if (response.response.message == "") {
				showMessage("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp, "success");
				// console.log("【鱼吧】" + group_id + "签到成功! 连续" + response.response.data.count + "天 获得经验" + response.response.data.exp);
			} else {
				showMessage("【鱼吧】" + group_id + response.response.message, "warning");
				// console.log("【鱼吧】" + group_id + response.response.message);
			}
		 
		}
	});
}

function signYubaList() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://yuba.douyu.com/wbapi/web/group/myFollow?page=1&limit=999",
		responseType: "json",
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded",
		  "dy-client": "pc",
		  "dy-token": dyToken
		},
		onload: function(response) {
			for (let i = 0; i < response.response.data.list.length; i++) {
				signYuba(response.response.data.list[i].group_id, dyToken);
			}
		 
		}
	});
	
}
