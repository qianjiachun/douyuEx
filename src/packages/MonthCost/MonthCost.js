let totalMonthCost = 0;
let typeNum = 0;
let typeCount = 0;
let typeDetail = [];

let svg_see = `<svg t="1619141525444" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4635" width="16" height="16" style="/* display: inline-block; */"><path d="M1009.592 531.212C863.184 730.624 696.96 832 512 832c-184.96 0-351.184-101.376-497.592-300.788C10.384 525.864 8 519.212 8 512s2.384-13.864 6.408-19.212C160.816 293.376 327.04 192 512 192c184.96 0 351.184 101.376 497.592 300.788 4.024 5.348 6.408 12 6.408 19.212s-2.384 13.864-6.408 19.212zM512 768c156.864 0 300.54-84.332 432.012-256C812.54 340.332 668.864 256 512 256c-156.864 0-300.54 84.332-432.012 256C211.46 683.668 355.136 768 512 768z m0-64c-106.04 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z m0-64c70.692 0 128-57.308 128-128s-57.308-128-128-128-128 57.308-128 128 57.308 128 128 128z" p-id="4636" fill="#707070"></path></svg>`;
let svg_unsee = `<svg t="1619143157694" class="icon" viewBox="0 0 1186 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733" width="16" height="16"><path d="M591.707784 915.740462A642.870487 642.870487 0 0 1 2.965954 526.459025a39.298888 39.298888 0 0 1 0-28.91805 632.489649 632.489649 0 0 1 584.292899-388.539948h8.897862a630.265183 630.265183 0 0 1 584.292899 388.539948 39.298888 39.298888 0 0 1 0 28.91805 637.680068 637.680068 0 0 1-336.635757 337.377245 646.577929 646.577929 0 0 1-252.106073 51.904192zM77.856287 512.370744a565.755688 565.755688 0 0 0 1026.961505 0 556.116338 556.116338 0 0 0-508.661077-329.220872h-8.897862a556.857827 556.857827 0 0 0-509.402566 329.220872z" p-id="1734" fill="#707070"></path><path d="M590.966296 732.592814a218.739093 218.739093 0 1 1 222.446535-218.739093 218.739093 218.739093 0 0 1-222.446535 218.739093z m0-362.587852a144.590248 144.590248 0 1 0 148.29769 143.848759 148.29769 148.29769 0 0 0-148.29769-143.848759z" p-id="1735" fill="#707070"></path><path d="M1137.443284 1023.997776a37.074423 37.074423 0 0 1-24.469119-8.897862L20.761677 65.253208A37.074423 37.074423 0 0 1 68.958426 8.900086l1092.212489 946.880752a37.074423 37.074423 0 0 1 0 52.64568 35.591446 35.591446 0 0 1-23.727631 15.571258z" p-id="1736" fill="#707070"></path></svg>`;

let seeStatus = 1; // 0 不可视 1 可视
function initPkg_MonthCost() {
	// if (document.getElementsByClassName("SociatyLabel")[0].innerText == "伐木累") {
	// 	return;
	// }
	initPkg_MonthCost_Dom();
	initPkg_MonthCost_Func();
	seeStatus = MonthCost_getSeeStatus();
	const icon = document.getElementsByClassName("monthcost__icon")[0];
	if (!icon) return;
	if (seeStatus == 1) {
		icon.innerHTML = svg_see;
		MonthCost_updateCost();
	} else {
		icon.innerHTML = svg_unsee;
	}
}

function initPkg_MonthCost_Dom() {
	MonthCost_insertIcon();
}

function MonthCost_insertIcon() {
	let a = document.createElement("span");
	a.className = "month-cost";
	a.innerHTML = `
	本月已消费 <span id="monthcost__money">***</span> 元
	<span class="monthcost__icon"></span>
	`;
	a.title = "数据每日更新，根据个人中心消费数据统计"
	let b = getValidDom([".PlayerToolbar-ContentCell .PlayerToolbar-Wealth"]);
	b && b.insertBefore(a, b.childNodes[0]);
}

function initPkg_MonthCost_Func() {
	const icon = document.getElementsByClassName("monthcost__icon")[0];
	if (!icon) return;
	icon.addEventListener("click", () => {
		if (seeStatus == 1) {
			seeStatus = 0;
			document.getElementById("monthcost__money").innerText = "***";
			document.getElementsByClassName("monthcost__icon")[0].innerHTML = svg_unsee;
		} else {
			seeStatus = 1;
			document.getElementsByClassName("monthcost__icon")[0].innerHTML = svg_see;
			MonthCost_updateCost();
		}
		MonthCost_ContentAttrTitle();
		MonthCost_saveSeeStatus();
	})
}


function MonthCost_saveSeeStatus() {
	localStorage.setItem("ExSave_MonthCost_SeeStatus", seeStatus);
}

function MonthCost_getSeeStatus() {
	let storage = localStorage.getItem("ExSave_MonthCost_SeeStatus");
	if (storage == null) {
		storage = 1;
	}
	return storage;
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


async function getMonthCost_gift() {
	const [start, end] = getMonthTimeRange();
	const [formattedStart, formattedEnd] = getFormattedMonthTimeRange();
	let direction = 1;
	let data = [];
	let hasMoreData = true;
	let id = 0;

	while (hasMoreData) {
		let url = `https://www.douyu.com/wjapi/nc/exchange/consume/giftList?queryType=0&consumeType=0&startDate=${start}&endDate=${end}&tradeStartDate=${formattedStart}&tradeEndDate=${formattedEnd}&direction=${direction}`;
		if (id !== 0) {
			url += `&id=${id}`;
		}
		
		let ret = await MonthCost_queryData(url);
		if (ret.error == 1000) {
			await new Promise(resolve => setTimeout(resolve, 2000));
		} else {
			data = data.concat(ret.data);
			if (ret.data.length < 20) {
				hasMoreData = false;
			} else {
				id = ret.data[ret.data.length - 1].id;
			}
		}
	}

	data.forEach(item => {
		totalMonthCost += Math.abs(item.amount)
	});

	let categorizedData = {};
	data.forEach(item => {
		if (!categorizedData[item.consumeTypeDesc]) {
			categorizedData[item.consumeTypeDesc] = 0;
		}
		categorizedData[item.consumeTypeDesc] += Math.abs(item.amount);
	});

	for (let type in categorizedData) {
		typeDetail[typeNum] = { 'title': type, 'money': categorizedData[type] };
		typeNum++;
	}

}

async function getMonthCost_diamondFans() {
	let type = 0;
	let page = 1;
	let data = [];
	let hasMoreData = true;

	while (hasMoreData) {
		let url = `https://www.douyu.com/japi/interactnc/web/dFansbadge/myLogs?type=${type}&page=${page}`;
		let ret = await MonthCost_queryData(url);
		ret.data.list.forEach(item => {
			let consumeDate = new Date(item.consumeTime * 1000);
			let currentDate = new Date();
			if (consumeDate.getMonth() === currentDate.getMonth() && consumeDate.getFullYear() === currentDate.getFullYear()) {
				data.push(item);
			}
		});
		if (!ret.data.list[ret.data.list.length - 1]) break;
		let lastItemDate = new Date(ret.data.list[ret.data.list.length - 1].consumeTime * 1000);
		if (ret.data.list.length < 20 || lastItemDate.getMonth() !== new Date().getMonth() || lastItemDate.getFullYear() !== new Date().getFullYear()) {
			hasMoreData = false;
		} else {
			page++;
		}
	}

	let diamondFansMoney = 0;
	data.forEach(item => {
		diamondFansMoney += Math.abs(item.consumeMoney)
	});
	if (diamondFansMoney > 0) {
		typeDetail.push({ 'title': '钻粉充值/续费', 'money': diamondFansMoney });
	}
	totalMonthCost += diamondFansMoney;
}

async function getMonthCost() {
	totalMonthCost = 0;
	typeDetail = [];
	await getMonthCost_gift();
	await getMonthCost_diamondFans();
	MonthCost_saveData();
	MonthCost_ContentAttrTitle();
	document.getElementById("monthcost__money").innerText = String(totalMonthCost / 100);
}

function MonthCost_ContentAttrTitle(){
	let a = document.getElementsByClassName("month-cost")[0];
	if(seeStatus == 1 && typeDetail.length > 0){
		let titleContent = "数据每日更新，根据个人中心消费数据统计。\n--- ---\n";
		typeDetail.forEach(detail => {
			titleContent += `${detail.title}: ${String(detail.money / 100)} 元\n`;
		});
		a.title = titleContent;
	}else{
		a.title = "数据每日更新，根据个人中心消费数据统计。"
	}
}

function getFormattedMonthTimeRange() {
	let now = new Date();
	let nowMonth = now.getMonth();
	let nowYear = now.getFullYear();
	let monthStartDate = new Date(nowYear, nowMonth, 1);

	let formatDate = (date) => {
		let year = date.getFullYear();
		let month = (date.getMonth() + 1).toString().padStart(2, '0');
		let day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	return [formatDate(monthStartDate), formatDate(now)];
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
		updateTime: new Date().getTime(),
		typeDetail: typeDetail 
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
	let tmpTypeDetail = [];
	// 默认为1，也就是要更新
	let now = new Date().getDate();

	let storage = MonthCost_getData();
	if (my_uid in storage) {
		let item = storage[my_uid];
		timeDiff = Math.abs(now - new Date(item.updateTime).getDate());
		tmpCost = item.monthCost;
		tmpTypeDetail = item.typeDetail || [];
		document.getElementById("monthcost__money").innerText = String(tmpCost / 100);
		typeDetail = tmpTypeDetail;
		MonthCost_ContentAttrTitle();
	}else{
		document.getElementById("monthcost__money").innerHTML = `<span class="PlayerToolbar-dataLoadding"></span>`;
	}

	if (timeDiff >= 1) {
		getMonthCost();
	}
}