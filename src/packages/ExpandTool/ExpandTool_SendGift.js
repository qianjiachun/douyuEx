function initPkg_ExpandTool_SendGift() {
    ExpandTool_SendGift_insertDom();
    ExpandTool_SendGift_insertFunc();
}

function ExpandTool_SendGift_insertDom() {
    let html = "";
    html += '<label>送礼：[用于打榜,例如送出999个飞机]</label><a style="margin-left:10px;color:blue;" href="http://open.douyucdn.cn/api/RoomApi/room/' + rid + '" target="_blank">礼物id示例</a><br />';
    html += '<label>礼物ID：</label><input id="extool__sendgift_id" type="text" style="width:50px;text-align:center;margin-right:10px;" value="20000" />';
    html += '<label>数量：</label><input id="extool__sendgift_cnt" type="text" style="width:30px;text-align:center;margin-right:10px;" value="1" />';
    html += '<br/><label>间隔ms：</label><input id="extool__sendgift_delay" type="text" style="width:30px;text-align:center;" value="0" />';
    html += '<input style="margin-left:10px;" type="button" id="extool__sendgift_btn" value="送出" />';
    let a = document.createElement("div");
    a.className = "extool__sendgift";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_SendGift_insertFunc() {
    document.getElementById("extool__sendgift_btn").addEventListener("click", async () => {
        if (confirm("确认送出？") != true) {
            return;
        }
        let gid = document.getElementById("extool__sendgift_id").value;
        let gcnt = document.getElementById("extool__sendgift_cnt").value;
        let delay = Number(document.getElementById("extool__sendgift_delay").value);
        let t_num = 0;
        let t_price = 0;
        for (let i = 0; i < Number(gcnt); i++) {
            sendGift_any(gid, 1, rid).then(ret => {
                if (ret.data != null) {
                    if (ret.msg != "鱼翅不足") {
                        t_num = t_num + 1;
                        t_price = t_price + Number(ret.data.priceType);
                    } else {
                        console.log("【送礼】" + gid + ret.msg);
                    }
                } else {
                    console.log("【送礼】" + gid + ret.msg);
                }
                if (i == Number(gcnt) - 1) {
                    showMessage("【送礼】赠送完毕！详细信息可以在F12控制台查看", "success");
                    console.log("【送礼】赠送完毕！详细信息可以在F12控制台查看");
                }
            }).catch(err => {
                console.log("请求失败!", err);
            })
            if (delay > 0) {
                await sleep(delay);
            }
        }
        showMessage("【送礼】执行中...", "info");
    });
}

function sendGift_any(gid, count, rid) {
	// 送任意东西
	// gid: 268是荧光棒
	// count: 数量
	// rid: 房间号
	return fetch("https://www.douyu.com/japi/gift/donate/mainsite/v1", {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: 'giftId=' + gid + '&giftCount=' + count + '&roomId=' + rid + '&bizExt=%7B%22yzxq%22%3A%7B%7D%7D'
	}).then(res => {
		return res.json();
	})
}