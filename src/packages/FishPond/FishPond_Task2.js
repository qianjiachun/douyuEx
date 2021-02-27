function initPkg_FishPond_Task2() {
	getFishPond_Task2();
}

function initPkg_FishPond_Task2_Timer() {
    getFishPond_Task2();
}


async function getFishPond_Task2() {
    let taskList = await getFishPond_Task2List();
    if (taskList.data == null) {
        return;
    }
    getFishPond_Task2Panel(taskList.data.panel);
    getFishPond_Task2Bubble(taskList.data.bubble);
}

function getFishPond_Task2List() {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/japi/fishpoolTask/w/apinc/taskList',{
			method: 'POST',
			mode: 'no-cors',
			credentials: 'include',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			body: 'rid=' + rid + '&ctn=' + getCCN()
		}).then(res => {
			return res.json();
		}).then(ret => {
            resolve(ret);
		}).catch(err => {
			console.log("请求失败!", err);
		})
    })
}

function getFishPond_Task2Panel(panelList) {
    for (let i = 0; i < panelList.length; i++) {
        let item = panelList[i];
        for (let j = 0; j < item.taskList.length; j++) {
            let taskItem = item.taskList[j].task;
            if (taskItem.status == 2) {
                let id = taskItem.id;
                // 领取
                getFishPond_Task2GetPrize(id);
            }
        }
    }
}

function getFishPond_Task2GetPrize(id) {
    fetch('https://www.douyu.com/japi/fishpoolTask/w/apinc/getPrize',{
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'id=' + id + '&rid=' + rid + '&ctn=' + getCCN()
    }).then(res => {
        return res.json();
    }).then(ret => {
        if (ret.error == 0) {
            showMessage("【高级鱼塘】" + ret.data.msg, "success");
        } else {
            showMessage("【高级鱼塘】" + ret.msg, "error");
        }
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

function getFishPond_Task2Bubble(bubbleList) {
    for (let i = 0; i < bubbleList.length; i++) {
        let item = bubbleList[i];
        if (item.status == 2) {
            let id = item.id;
            getFishPond_Task2GetPrize(id);
        }
    }
}
