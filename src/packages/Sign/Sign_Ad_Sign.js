function initPkg_Sign_Ad_Sign() {
	getFishBall_Ad_Sign();
}

function getFishBall_Ad_Sign() {
    let fishBallNum = "0";
    let posid_ad_sign = "1064246";
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/inspire/getFishBallNum?posId=" + posid_ad_sign + "&ct=1&token=" + dyToken,
		responseType: "json",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function(response) {
            let ret = response.response;
            if (ret.error == "0") {
                fishBallNum = ret.data.num;
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://apiv2.douyucdn.cn/japi/inspire/api/ad/inspire/sendFishBall?uid=" + getUID() + "&posCode=" + posid_ad_sign + "&ct=1&token=" + dyToken,
                    responseType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    onload: function(response) {
                        let ret = response.response;
                        if (ret.error == "0") {
                            showMessage("【签到鱼丸】成功领取" + fishBallNum + "个鱼丸", "success");
                        } else {
                            if (ret.msg == "null") {
                                showMessage("【签到鱼丸】未绑定手机" , "warning");
                            } else {
                                showMessage("【签到鱼丸】" + ret.msg, "warning");
                            }
                        }
                    }
                });
            }
		}
	});
    
    
	
}