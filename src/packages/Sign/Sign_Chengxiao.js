function initPkg_Sign_Chengxiao() {
    signChengxiao();
    getChengxiaoQuestion();
}
function signChengxiao() {
    fetch("https://www.douyu.com/japi/carnival/nc/signAct/signIn", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'token=' + dyToken + "&signAlias=" + "20200816cxll2"
	}).then(res => {
		return res.json();
	}).then(ret => {
        if (ret.error == "0") {
            showMessage("【程潇福利】恭喜你获得荧光棒x10", "success");
        } else {
            showMessage("【程潇福利】" + ret.msg, "warning");
        }
    })
}

function getChengxiaoQuestion() {   
    GM_xmlhttpRequest({
		method: "POST",
		url: "https://www.douyu.com/japi/carnival/nc/qa/getTargetStatus",
		data: `qaAlias=20200816cxll3dt&token=${ dyToken }`,
		responseType: "json",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function(response) {
			let ret = response.response;
			if (ret.error = "0") {
                if (ret.data.target[0].status != "2") {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "https://www.douyu.com/japi/carnival/nc/qa/submitAnswerV2",
                        data: `qaAlias=20200816cxll3dt&token=${ dyToken }&roundId=21&answer=%5B%7B%22questionId%22%3A36%2C%22options%22%3A%5B2%5D%7D%2C%7B%22questionId%22%3A37%2C%22options%22%3A%5B1%5D%7D%2C%7B%22questionId%22%3A38%2C%22options%22%3A%5B1%5D%7D%2C%7B%22questionId%22%3A39%2C%22options%22%3A%5B1%5D%7D%2C%7B%22questionId%22%3A40%2C%22options%22%3A%5B1%5D%7D%2C%7B%22questionId%22%3A41%2C%22options%22%3A%5B1%5D%7D%2C%7B%22questionId%22%3A42%2C%22options%22%3A%5B2%5D%7D%2C%7B%22questionId%22%3A43%2C%22options%22%3A%5B1%5D%7D%2C%7B%22questionId%22%3A44%2C%22options%22%3A%5B1%5D%7D%2C%7B%22questionId%22%3A45%2C%22options%22%3A%5B2%5D%7D%5D`,
                        responseType: "json",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        onload: function(response) {
                            let ret = response.response;
                            if (ret.error = "0") {
                                GM_xmlhttpRequest({
                                    method: "POST",
                                    url: "https://www.douyu.com/japi/carnival/nc/qa/takeReward",
                                    data: `qaAlias=20200816cxll3dt&roundId=21&level=1&token=${ dyToken }`,
                                    responseType: "json",
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    onload: function(response) {
                                        let ret = response.response;
                                        if (ret.error = "0") {
                                            showMessage("【程潇福利】恭喜你答题鱼丸*500", "success");
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
		}
	});
}