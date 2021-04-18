let totalMonthCost = 0;
let typeNum = 0;
let typeCount = 0;
function initPkg_MonthCost() {
	// if (document.getElementsByClassName("SociatyLabel")[0].innerText == "伐木累") {
	// 	return;
	// }
	initPkg_MonthCost_Dom();
	MonthCost_updateCost();
}

function initPkg_MonthCost_Dom() {
	MonthCost_insertIcon();
}
function MonthCost_insertIcon() {
	let a = document.createElement("span");
	a.className = "month-cost";
	a.innerHTML = `本月已消费 <span id="monthcost__money">***</span> 元`;
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function MonthCost_queryData(url) {
    return new Promise(resolve => {
        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        })
    })
}

async function getMonthCost() {
	totalMonthCost = 0;
	let ret = await MonthCost_queryData("https://www.douyu.com/member/cp/getYcConsumeTypeList");
	typeNum = ret.data.length - 1;
	if (ret.code == 0) {
		// 跳过第一个 也就是全部，全部不支持查询月数据
		for (let i = 1; i < ret.data.length; i++) {
			let item = ret.data[i];
			calcMonthCost(item.type);
		}
	}
}

async function calcMonthCost(type) {
	// type: 礼物(1) 太空魔盒(3) 福袋礼物(5) 甜蜜告白(6) 音乐学徒(19)
    let [beginTime, endTime] = getMonthTimeRange();
    let host = "https://www.douyu.com/member/cp/getYcTransactionList";

    let lastId = "";
    let currentNum = 0;
    let currentPage = 1;
    let total = 0;
    let ret;

    do {
        ret = await MonthCost_queryData(host + "?" + `firstId=&lastId=${lastId}&propType=0&beginTime=${beginTime}&endTime=${endTime}&type=${type}&pageNum=${currentPage}&pageSize=100`)
        if (ret.code == "0") {
            let len = ret.data.details.length;
            if (len == 0) {
                break;
            }
            lastId = ret.data.details[len - 1].id;
            total = Number(ret.data.total);
            currentNum += Number(ret.data.pageSize);
            currentPage++;
            
            for (let i = 0; i < ret.data.details.length; i++) {
                let item = ret.data.details[i];
				totalMonthCost += Number(item.price) * Number(item.number);
            }
            
        } else {
            console.log(ret.msg);
            break;
        }
    } while (currentNum < total);
	typeCount++;
	if (typeCount >= typeNum) {
		// 结束
		MonthCost_saveData();
		document.getElementById("monthcost__money").innerText = String(totalMonthCost/ 100);
	}
}

function getMonthTimeRange() {
	let now = new Date();
    let nowMonth = now.getMonth();
    let nowYear = now.getFullYear(); 
    let monthStartDate = new Date(nowYear, nowMonth, 1); 
	return [Math.round(new Date(monthStartDate).getTime() / 1000).toString(), Math.round(now.getTime() / 1000).toString()];
}

function MonthCost_saveData() {
	let data = {
		monthCost: totalMonthCost,
		updateTime: new Date().getTime()
	}
	let storage = localStorage.getItem("ExSave_MonthCost");
	if (storage !== null) {
		storage = JSON.parse(storage);
	} else {
		storage = {};
	}
	storage[my_uid] = data;
	localStorage.setItem("ExSave_MonthCost", JSON.stringify(storage));
}

function MonthCost_getData() {
	let storage = localStorage.getItem("ExSave_MonthCost");
	if (storage !== null) {
		storage = JSON.parse(storage);
	} else {
		storage = {};
	}
	return storage;
}

function MonthCost_updateCost() {
	let timeDiff = 1;
	let tmpCost = 0;
	// 默认为1，也就是要更新
	let now = new Date().getDate();

	let storage = MonthCost_getData();
	if (my_uid in storage) {
		let item = storage[my_uid];
		timeDiff = Math.abs(now - new Date(item.updateTime).getDate());
		tmpCost = item.monthCost;
	}

	if (timeDiff >= 1) {
		getMonthCost();
	} else {
		document.getElementById("monthcost__money").innerText = String(tmpCost/ 100);
	}
}