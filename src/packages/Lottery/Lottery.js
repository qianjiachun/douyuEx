// 获取自己所有的粉丝牌房间号
let myFansBadgeList = [];
let lotteryHasNoticed = {};
let lotteryHTML = "";
let isLotteryNotice = true;
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
	a.innerHTML = '<a class="ex-panel__icon" title="全站抽奖信息"><svg style="display:block;" t="1636077287311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26073" width="32" height="32"><path d="M54.1952 539.1104l404.1728-74.6752 463.8208 74.6752-433.9968 115.0208z" fill="#B52F05" p-id="26074"></path><path d="M465.664 717.2352l-85.5808 49.408a51.2 51.2 0 0 1-69.9392-18.7392L100.864 385.4336a51.2 51.2 0 0 1 18.7392-69.9392l85.5808-49.408a48.2304 48.2304 0 0 0 65.792 17.9712 48.2304 48.2304 0 0 0 17.3312-65.9712l101.1712-58.3936a51.2 51.2 0 0 1 69.9392 18.7392l209.28 362.4704a51.2 51.2 0 0 1-18.7392 69.9392l-101.1712 58.3936a48.2304 48.2304 0 0 0-65.792-17.9712 48.2304 48.2304 0 0 0-17.3312 65.9712z" fill="#FDAE0A" p-id="26075"></path><path d="M419.3792 797.4144l-85.5808 49.408a51.2 51.2 0 0 1-69.9392-18.7392l-209.28-362.496a51.2 51.2 0 0 1 18.7392-69.9392l85.5808-49.408a48.2304 48.2304 0 0 0 65.792 17.9712 48.2304 48.2304 0 0 0 17.3312-65.9712l101.1712-58.3936a51.2 51.2 0 0 1 69.9392 18.7392l209.28 362.4704a51.2 51.2 0 0 1-18.7392 69.9392l-101.1712 58.3936a48.2304 48.2304 0 0 0-65.792-17.9712 48.256 48.256 0 0 0-17.3312 65.9968z" fill="#F5D525" p-id="26076"></path><path d="M192.5632 479.3856l124.2624 73.5744-44.4928 25.6768 8.7552 15.1808 52.9408-30.5408 17.152 29.7472-52.9152 30.5408 8.7552 15.1808 52.9408-30.5408 27.52 47.6672 26.4448-15.2832-27.4944-47.6672 53.2224-30.7456-8.7808-15.1552-53.2224 30.72-17.1776-29.7472 53.2224-30.7456-8.7552-15.1808-44.8 25.8816-1.5872-144.4096-29.7728 17.2032 4.2752 130.304-110.72-68.864z" fill="#FFE78A" p-id="26077"></path><path d="M725.3504 604.16l-2.3808-68.224-307.0208 10.7264 2.3808 68.224c0.8192 23.552 70.2208 40.2432 155.008 37.2736 84.7616-2.944 152.832-24.448 152.0128-48z" fill="#F9A41D" p-id="26078"></path><path d="M569.015743 584.038003a42.6752 153.6 88 1 0-2.978686-85.298406 42.6752 153.6 88 1 0 2.978686 85.298406Z" fill="#FFD43D" p-id="26079"></path><path d="M496.4864 528.2816l48.384 14.8224-31.616 1.1008 0.1024 3.1744 40.832-1.3568 0.384 4.1216-41.088 1.2544 0.128 3.1488 41.088-1.152 0.256 7.3728 31.36-0.7424-0.256-7.5264 41.344-1.152-0.128-3.4048-41.3184 1.2544-0.1536-4.1472 41.3184-1.4336-0.128-3.3792-31.8464 1.1008 47.1552-19.712-35.328 1.6128-37.0432 16.6656-38.1184-13.2352z" fill="#FFDF3F" p-id="26080"></path><path d="M725.3504 527.36l-2.3808-68.224-307.0208 10.7264 2.3808 68.224c0.8192 23.552 70.2208 40.2432 155.008 37.2736s152.832-24.448 152.0128-48z" fill="#FFBC14" p-id="26081"></path><path d="M569.015743 507.238003a42.6752 153.6 88 1 0-2.978686-85.298406 42.6752 153.6 88 1 0 2.978686 85.298406Z" fill="#FFD43D" p-id="26082"></path><path d="M496.4864 451.4816l48.384 14.8224-31.616 1.1008 0.1024 3.1744 40.832-1.3568 0.384 4.1216-41.088 1.2544 0.128 3.1488 41.088-1.152 0.256 7.3728 31.36-0.7424-0.256-7.5264 41.344-1.152-0.128-3.4048-41.3184 1.2544-0.1536-4.1472 41.3184-1.4336-0.128-3.3792-31.8464 1.1008 47.1552-19.712-35.328 1.6128-37.0432 16.6656-38.1184-13.2352z" fill="#FFDF3F" p-id="26083"></path><path d="M886.5792 507.136l-35.1488-58.5216-263.3216 158.208 35.1488 58.5216c12.1344 20.1984 80.9216 1.152 153.6256-42.5472s121.856-95.4624 109.696-115.6608z" fill="#FFBC14" p-id="26084"></path><path d="M740.147421 565.345281a42.6752 153.6 59.003 1 0-43.954875-73.161874 42.6752 153.6 59.003 1 0 43.954875 73.161874Z" fill="#FFD43D" p-id="26085"></path><path d="M649.6256 551.7056l49.5104-10.4704-27.1104 16.2816 1.6128 2.7136 35.072-20.9664 2.3296 3.4048-35.328 21.0176 1.6384 2.7136 35.3536-20.9408 3.8144 6.3232 27.0848-15.872-3.8912-6.4256 35.584-21.0688-1.7408-2.9184-35.5328 21.1456-2.1504-3.584 35.456-21.248-1.7408-2.9184-27.3408 16.4096 31.6928-40.1152-30.1056 18.56-24.3456 32.512-39.7312 6.912z" fill="#FFDF3F" p-id="26086"></path><path d="M711.9616 515.2256l-37.1712-57.2416-257.6384 167.3216 37.1712 57.2416c12.8256 19.7632 80.9216-1.664 152.064-47.872s118.4-99.6864 105.5744-119.4496z" fill="#FFBC14" p-id="26087"></path><path d="M567.577635 578.525593a42.6752 153.6 57.003 1 0-46.481411-71.583303 42.6752 153.6 57.003 1 0 46.481411 71.583303Z" fill="#FFD43D" p-id="26088"></path><path d="M458.1632 481.2032l-60.288-32.0512-144.2304 271.2576 60.288 32.0512c20.8128 11.0592 69.9648-40.6784 109.7728-115.584s55.2448-144.6144 34.4576-155.6736z" fill="#FFBC14" p-id="26089"></path><path d="M362.614122 606.598472a42.6752 153.6 28.003 1 0-75.357832-40.073531 42.6752 153.6 28.003 1 0 75.357832 40.073531Z" fill="#FFD43D" p-id="26090"></path><path d="M278.016 641.4592l37.0176-34.4832-14.848 27.9296 2.7904 1.4848 19.2512-36.0192 3.7632 1.7152-19.456 36.1984 2.7904 1.4848 19.5328-36.1472 6.5024 3.456 15.0528-27.5456-6.6304-3.5328 19.6352-36.3776-2.9952-1.5872-19.584 36.4032-3.6608-1.9456 19.4304-36.48-2.9952-1.6128-14.9504 28.16 6.5024-50.7136-16.2816 31.4112-4.096 40.4224-30.5152 26.368zM460.7744 578.9696l48.7936-13.312-26.1376 17.8176 1.792 2.6112 33.792-22.9376 2.5344 3.2768-34.048 22.9888 1.7664 2.6112 34.1248-22.912 4.1472 6.0928 26.1376-17.3824-4.2496-6.2208 34.3296-23.0656-1.92-2.816-34.2784 23.1424-2.3296-3.4304 34.176-23.2704-1.92-2.7904-26.3424 17.9456 29.3376-41.856-29.0048 20.224-22.4256 33.8688-39.2704 9.1648z" fill="#FFDF3F" p-id="26091"></path><path d="M51.2 538.624l435.2 114.8928V1024L128 886.4512z" fill="#F74D18" p-id="26092"></path><path d="M921.6 538.9312l-76.8 347.52L486.4 1024V653.184z" fill="#E03B07" p-id="26093"></path><path d="M214.4 581.4016l11.6736 343.2704 89.728 33.6384-14.0032-354.8416z" fill="#FBD75A" p-id="26094"></path><path d="M667.4688 606.1312l102.8864-28.3648-28.8256 349.4912-94.6176 35.584z" fill="#F09D29" p-id="26095"></path><path d="M490.9312 382.8736l28.4416-109.4144L144.9984 47.4368 103.8592 149.376z" fill="#DC3A07" p-id="26096"></path><path d="M519.0656 270.4896l467.4816 36.224-25.1648 114.0992-470.272-38.6304z" fill="#F74D18" p-id="26097"></path><path d="M572.5952 72.9088l413.952 233.8048-467.2-33.3056L144.6144 47.5136z" fill="#FF6535" p-id="26098"></path><path d="M255.5136 113.8432L206.5664 211.328l81.5616 49.5104 44.8768-99.6608zM823.6544 295.2448l-32.8192 110.6432-97.9968-7.7056 28.8256-110.4384z" fill="#F09D29" p-id="26099"></path><path d="M541.2864 126.6176c-22.2976-41.7536-39.9104-69.9648-52.864-84.5824C443.4944-8.8064 409.344-6.7072 384.9728 15.2832c-34.9184 31.5136-31.0528 64 11.5968 97.536l39.9104 22.8352c21.7088 1.024 54.1696 8.9088 97.3568 23.7056s86.272 31.3856 129.2544 49.8176c20.9664-6.9888 36.9408-11.6736 47.9232-14.1056 10.9824-2.4064 21.9392-7.552 32.8448-15.3856l25.2672 2.5856-18.7648-11.776c15.0016-48.2048-3.1488-77.2608-54.4512-87.168-51.328-9.9072-101.1712 4.8384-149.5296 44.2624" fill="#FBCE47" p-id="26100"></path><path d="M254.9248 113.9712l173.824 9.472L680.96 208.0512l142.592 87.0656-101.2224-7.5008-187.5968-111.9744-201.8816-14.592z" fill="#FBD75A" p-id="26101"></path><path d="M535.4752 160.5632c-46.4128-86.7584-82.176-118.3232-107.2896-94.6688s-19.7376 44.3648 16.1024 62.08l91.1872 32.5888z" fill="#D7A93D" p-id="26102"></path><path d="M534.4256 160.1536c88.7296-38.4512 140.9024-45.8752 156.5184-22.272 23.4496 35.4048 2.6112 59.1616-7.3216 62.6432-9.9328 3.456-36.7104-3.3024-41.5488-4.8896l-107.648-35.4816z" fill="#D7A93D" p-id="26103"></path></svg><i id="lottery__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("ex-panel__wrap")[0];
	b.insertBefore(a, b.childNodes[0]);
	
}

function Lottery_insertModal() {
	let a = document.createElement("div");
	a.className = "exlottery";
	a.innerHTML = `
        <div class="lottery__func">
            <div id="lottery-refresh">
                <svg t="1636115506027" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2454" width="16" height="16"><path d="M927.999436 531.028522a31.998984 31.998984 0 0 0-31.998984 31.998984c0 51.852948-10.147341 102.138098-30.163865 149.461048a385.47252 385.47252 0 0 1-204.377345 204.377345c-47.32295 20.016524-97.6081 30.163865-149.461048 30.163865s-102.138098-10.147341-149.461048-30.163865a385.47252 385.47252 0 0 1-204.377345-204.377345c-20.016524-47.32295-30.163865-97.6081-30.163865-149.461048s10.147341-102.138098 30.163865-149.461048a385.47252 385.47252 0 0 1 204.377345-204.377345c47.32295-20.016524 97.6081-30.163865 149.461048-30.163865a387.379888 387.379888 0 0 1 59.193424 4.533611l-56.538282 22.035878A31.998984 31.998984 0 1 0 537.892156 265.232491l137.041483-53.402685a31.998984 31.998984 0 0 0 18.195855-41.434674L639.723197 33.357261a31.998984 31.998984 0 1 0-59.630529 23.23882l26.695923 68.502679a449.969005 449.969005 0 0 0-94.786785-10.060642c-60.465003 0-119.138236 11.8488-174.390489 35.217667a449.214005 449.214005 0 0 0-238.388457 238.388457c-23.361643 55.252253-35.22128 113.925486-35.22128 174.390489s11.8488 119.138236 35.217668 174.390489a449.214005 449.214005 0 0 0 238.388457 238.388457c55.252253 23.368867 113.925486 35.217667 174.390489 35.217667s119.138236-11.8488 174.390489-35.217667A449.210393 449.210393 0 0 0 924.784365 737.42522c23.368867-55.270316 35.217667-113.925486 35.217667-174.390489a31.998984 31.998984 0 0 0-32.002596-32.006209z" fill="" p-id="2455"></path></svg>
            </div>
            <div class="lottery__notice">
                <label class="lottery__notice"><input class="lottery__notice" id="lottery-notice" type="checkbox" checked="checked">开启提醒</label>
            </div>
        </div>
        <div class="lottery__wrap"></div>
    `;
	let b = document.getElementsByClassName("layout-Player-chat")[0];
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
                showMessage(`<a style="font-size:14px;border:none;" target="_blank" href="https://www.douyu.com/${item.room_id}">【${lotteryInfo.data.prize_name}x${lotteryInfo.data.prize_num}】${joinText}</a>`, "special", {timeout: 100});
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
        fetch("https://www.douyu.com/lapi/interact/lottery/getHallList", {
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
        if (retJson.isNotice == false) {
            document.getElementById("lottery-notice").click();
        }
    }
}
