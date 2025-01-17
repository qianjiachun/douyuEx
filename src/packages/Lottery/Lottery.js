// 获取自己所有的粉丝牌房间号
let myFansBadgeList = [];
let lotteryHasNoticed = {};
let lotteryHTML = "";
let isLotteryNotice = false;
let timer_lottery = 0;

function initPkg_Lottery() {
    setFansBadgeList();
	initPkg_Lottery_Dom();
	initPkg_Lottery_Func();
    Lottery_Set();
    timer_lottery = setInterval(() => {
        initPkg_Lottery_Timer();
    }, 60000);
}

function initPkg_Lottery_Dom() {
    Lottery_insertModal();
	Lottery_insertIcon();
}
function Lottery_insertIcon() {
	let a = document.createElement("div");
	a.className = "ex-lottery";
	a.innerHTML = '<a class="ex-panel__icon" title="全站抽奖信息"><svg style="display:block;" t="1636332741708" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19181" width="32" height="32"><path d="M508.858182 986.042182c-261.748364 0-473.925818-212.177455-473.925818-473.925818S247.109818 38.190545 508.858182 38.190545s473.925818 212.177455 473.925818 473.925819-212.200727 473.925818-473.925818 473.925818m0-981.690182C228.421818 4.352 1.093818 231.703273 1.093818 512.116364s227.351273 507.764364 507.764364 507.764363c280.413091 0 507.787636-227.351273 507.787636-507.764363S789.271273 4.352 508.858182 4.352" fill="#FF4517" p-id="19182"></path><path d="M322.536727 512.302545l0.023273-1.326545-313.064727-1.931636c0 1.093818-0.093091 2.164364-0.093091 3.281454 0 90.88 24.785455 175.918545 67.84 248.925091l270.173091-155.997091a185.274182 185.274182 0 0 1-24.878546-92.951273zM416.791273 350.440727L264.029091 82.013091A492.986182 492.986182 0 0 0 77.498182 262.981818l270.173091 155.997091a186.717091 186.717091 0 0 1 69.12-68.538182zM602.856727 351.697455l151.831273-259.211637A488.261818 488.261818 0 0 0 508.718545 21.690182l0.023273 304.453818c34.350545 0 66.513455 9.355636 94.114909 25.553455zM258.536727 939.450182a488.471273 488.471273 0 0 0 241.710546 63.674182c2.839273 0 5.632-0.139636 8.448-0.186182V698.507636a185.064727 185.064727 0 0 1-94.068364-25.553454l-156.090182 266.496zM927.325091 270.452364l-257.466182 148.666181a185.204364 185.204364 0 0 1 25.041455 93.207273l-0.046546 1.070546 296.168727 1.838545c0.023273-0.977455 0.069818-1.931636 0.069819-2.909091 0-87.994182-23.249455-170.496-63.767273-241.873454zM600.855273 674.094545l148.573091 261.073455a492.776727 492.776727 0 0 0 178.106181-181.387636l-257.466181-148.642909a187.042909 187.042909 0 0 1-69.213091 68.95709z" fill="#FF4517" p-id="19183"></path><path d="M644.142545 512.302545a135.400727 135.400727 0 0 0-135.424-135.400727l-84.619636-160.791273 20.642909 173.824c-42.658909 22.784-71.400727 70.609455-71.400727 122.368a135.447273 135.447273 0 0 0 270.801454 0z m-133.492363 70.097455a68.491636 68.491636 0 1 1 0.023273-136.96 68.491636 68.491636 0 0 1-0.023273 136.96z" fill="#FF4517" p-id="19184"></path></svg><i id="lottery__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function Lottery_insertModal() {
	let a = document.createElement("div");
	a.className = "exlottery ex-dialog";
	a.innerHTML = `
        <div class="lottery__func">
            <div id="lottery-refresh">
                <svg t="1636115506027" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2454" width="16" height="16"><path d="M927.999436 531.028522a31.998984 31.998984 0 0 0-31.998984 31.998984c0 51.852948-10.147341 102.138098-30.163865 149.461048a385.47252 385.47252 0 0 1-204.377345 204.377345c-47.32295 20.016524-97.6081 30.163865-149.461048 30.163865s-102.138098-10.147341-149.461048-30.163865a385.47252 385.47252 0 0 1-204.377345-204.377345c-20.016524-47.32295-30.163865-97.6081-30.163865-149.461048s10.147341-102.138098 30.163865-149.461048a385.47252 385.47252 0 0 1 204.377345-204.377345c47.32295-20.016524 97.6081-30.163865 149.461048-30.163865a387.379888 387.379888 0 0 1 59.193424 4.533611l-56.538282 22.035878A31.998984 31.998984 0 1 0 537.892156 265.232491l137.041483-53.402685a31.998984 31.998984 0 0 0 18.195855-41.434674L639.723197 33.357261a31.998984 31.998984 0 1 0-59.630529 23.23882l26.695923 68.502679a449.969005 449.969005 0 0 0-94.786785-10.060642c-60.465003 0-119.138236 11.8488-174.390489 35.217667a449.214005 449.214005 0 0 0-238.388457 238.388457c-23.361643 55.252253-35.22128 113.925486-35.22128 174.390489s11.8488 119.138236 35.217668 174.390489a449.214005 449.214005 0 0 0 238.388457 238.388457c55.252253 23.368867 113.925486 35.217667 174.390489 35.217667s119.138236-11.8488 174.390489-35.217667A449.210393 449.210393 0 0 0 924.784365 737.42522c23.368867-55.270316 35.217667-113.925486 35.217667-174.390489a31.998984 31.998984 0 0 0-32.002596-32.006209z" fill="" p-id="2455"></path></svg>
            </div>
            <div class="lottery__notice">
                <label class="lottery__notic ex-label"><input class="lottery__notice ex-checkbox" id="lottery-notice" type="checkbox">开启提醒</label>
            </div>
        </div>
        <div class="lottery__nodata">暂无数据</div>
        <div class="lottery__wrap"></div>
    `;
	let b = document.getElementsByClassName("ex-mask")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_Lottery_Func() {
    let dom_notice = document.getElementById("lottery-notice");
    document.getElementsByClassName("ex-lottery")[0].addEventListener("click", () => {
        showExRightPanel("全站抽奖信息");
        let dom = document.getElementsByClassName("lottery__wrap")[0];
        if (dom) {
            dom.innerHTML = lotteryHTML;
        }
    })

    document.getElementById("lottery-refresh").addEventListener("click", debounce(() => {
        initPkg_Lottery_Timer();
    }, 3000))

    dom_notice.addEventListener("click", () => {
        let ischecked = dom_notice.checked;
        if (ischecked == true) {
            // 开启提醒
            isLotteryNotice = true;
        } else{
            // 停止提醒
            isLotteryNotice =  false;
        }
        saveData_Lottery();
    })
}


async function initPkg_Lottery_Timer() {
    let html = "";
    let lotteryList = await getExLotteryList();
    if (!lotteryList.data.list) return;
    for (let i = 0; i < lotteryList.data.list.length; i++) {
        let item = lotteryList.data.list[i];
        if (item.status !== 0) {
            // status不为0说明已经开奖
            continue;
        }
        let lotteryInfo = await getExLotteryInfo(item.room_id);
        let condition = lotteryInfo.data.join_condition;
        let joinText = "command_content" in condition ? `发送弹幕` : `赠送 ${condition.gift_name}（${condition.gift_price}）x${condition.gift_num}`;
        let expireTime = Number(lotteryInfo.data.start_at) + Number(lotteryInfo.data.join_condition.expire_time);
        let expireText = getTimeDiff(expireTime * 1000, new Date().getTime());
        expireText = expireText == -1 ? "已结束" : "距结束：" + expireText;
        // 有这个房间的牌子或者不需要成为粉丝的 就都能参加
        let canJoin = myFansBadgeList.indexOf(String(item.room_id)) !== -1 || condition.lottery_range <= 1;

        if (canJoin && isLotteryNotice) {
            let keyName = `${lotteryInfo.data.prize_name}|${lotteryInfo.data.start_at}`;
            if (!(keyName in lotteryHasNoticed)) {
                lotteryHasNoticed[keyName] = 1;
                showMessage(`<a style="font-size:14px;border:none;" target="_blank" href="https://www.douyu.com/${item.room_id}">【${lotteryInfo.data.prize_name}x${lotteryInfo.data.prize_num}】${joinText}</a>`, "special", {
                    timeout: 100,
                });
            }
        }

        html += `
            <a class="lottery__a" href="https://www.douyu.com/${item.room_id}" target="_blank">
                <div class="lottery__item">
                    <div class="lottery__img">
                        <div class="lottery__anchor">${item.anchor_name}</div>
                        <img loading="lazy" src="${item.verticalSrc}"/>
                        <div class="lottery__expireTime">${expireText}</div>
                    </div>
                    <div class="lottery__info">
                        <div class="lottery__prize">${lotteryInfo.data.prize_name}x${lotteryInfo.data.prize_num}</div>
                        <div class="lottery__jointext">${joinText}</div>
                        <div style="color:${canJoin ? "#64ce83" : "#e74c3c"}" class="lottery__condition">${getJoinCondition(condition)}</div>
                    </div>
                </div>
            </a>
        `;
    }

    let domNodata = document.getElementsByClassName("lottery__nodata")[0];
    if (html.trim() !== "") {
        domNodata.style.display = "none";
    } else {
        domNodata.style.display = "block";
    }
    lotteryHTML = html;
    let dom = document.getElementsByClassName("lottery__wrap")[0];
    if (dom) {
        dom.innerHTML = lotteryHTML;
    }
}

function getJoinCondition(condition) {
    let ret = "";
    switch (condition.lottery_range) {
        case 0:
            ret = "所有人可参与";
            break;
        case 1:
            ret = "关注主播";
            break;
        case 2:
            ret = "成为粉丝";
            break;
        case 3:
            ret = "关注主播+成为粉丝";
            break;
        default:
            break;
    }
    return ret;
}

function getExLotteryList() {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://www.douyu.com/lapi/interact/lottery/getHallList",
            responseType: "json",
            onload: response => {
                let ret = response.response;
                resolve(ret);
            },
            onerror: err => {
                reject(err);
            }
        });
    })
}

function getExLotteryInfo(room_id) {
    return new Promise((resolve, reject) => {
        fetch("https://www.douyu.com/member/lottery/activity_info?room_id=" + room_id, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            reject(err);
        })
    })
}

async function setFansBadgeList() {
	let ret = [];
	let doc = await fetch('https://www.douyu.com/member/cp/getFansBadgeList',{
		method: 'GET',
		mode: 'no-cors',
		cache: 'default',
		credentials: 'include',
	}).then(res => {
		return res.text();
	}).catch(err => {
		console.log("请求失败!", err);
	})
	doc = (new DOMParser()).parseFromString(doc, 'text/html');
	let a = doc.getElementsByClassName("fans-badge-list")[0].lastElementChild;
	let n = a.children.length;
	for (let i = 0; i < n; i++) {
		let rid = a.children[i].getAttribute("data-fans-room");
		ret.push(rid);
	}
	myFansBadgeList = ret;
}


function saveData_Lottery() {
	let data = {
		isNotice: isLotteryNotice
	}
	localStorage.setItem("ExSave_Lottery", JSON.stringify(data));
}

function Lottery_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Lottery");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isNotice == true) {
            document.getElementById("lottery-notice").click();
        }
    }
}
