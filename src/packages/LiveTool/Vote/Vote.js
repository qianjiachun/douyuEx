let isVoteOn = false;
let voteList = {};
let voteNameList = {};
let voteWordList = {};
let voteTotalNum = 0;
let timer_Vote;
let isRepeat = false;
function initPkg_LiveTool_Vote() {
    LiveTool_Vote_insertDom();
    LiveTool_Vote_insertDom_VotePanel();
    LiveTool_Vote_insertFunc();
    initPkg_Vote_Set();
}

function LiveTool_Vote_insertDom() {
    let a = document.createElement("div");
    a.className = "livetool__cell";
    let cell = `
        <div class='livetool__cell_title'>
            <span id='vote__title'>弹幕投票</span><span id='vote__show-result'>面板</span>
        </div>
        <div class='livetool__cell_option'>
            <label style="margin-right:10px;"><input id="vote__repeat" type="checkbox">重复投票</label>
            <div class="onoffswitch livetool__cell_switch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="vote__switch" tabindex="0" checked>
                <label class="onoffswitch-label" for="vote__switch"></label>
            </div>
        </div>
    `;
    let panel = `
        <div class='vote__panel'>
            <select id='vote__select'>
            </select>
            <input style="width:40px;margin-left:10px;" type="button" id="vote__add" value="添加"/>
            <input style="width:40px;margin-left:10px;" type="button" id="vote__del" value="删除"/>
            <label style="margin-left:5px">限时：<input id="vote__time" type="text" placeholder="秒" /></label>
            <div class="vote__option">
                <label>主题：<input id="vote__theme" type="text"/></label>
                <label>选项：<input id="vote__options" type="text" placeholder="用空格隔开每个选项"/></label>
            </div>
        </div>
    `;
    a.innerHTML = cell + panel;
    
    let b = document.getElementsByClassName("livetool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function LiveTool_Vote_insertFunc() {
    document.getElementById("vote__switch").addEventListener("click", () => {
        let ischecked = document.getElementById("vote__switch").checked;
        let selectDom = document.getElementById("vote__select");
        let title = selectDom.options[selectDom.selectedIndex].text;
        let options = voteList[title].options;
        let time = voteList[title].time;
		if (ischecked == true) {
            // 开启关键词禁言
            let arr = String(options).split(" ");
            for (let i = 0; i < arr.length; i++) {
                voteWordList[arr[i]] = {
                    num: 0,
                    index: i
                };
            }
            document.getElementById("vote__repeat").disabled = true;
            voteTotalNum = 0;
            initVoteOptionsPanel(title, options);


            isRepeat = document.getElementById("vote__repeat").checked;
            isVoteOn = true;
            timer_Vote = setTimeout(() => {
                voteNameList = {};
                voteWordList = {};
                isVoteOn = false;
                document.getElementById("vote__repeat").disabled = false;
                document.getElementById("vote__switch").checked = false;
            }, time * 1000);

            document.getElementsByClassName("vote__result")[0].style.display = "block";
		} else{
            // 关闭关键词禁言
            clearTimeout(timer_Vote);
            voteNameList = {};
            voteWordList = {};
            isVoteOn = false;
            document.getElementById("vote__repeat").disabled = false;
        }
    });
    document.getElementById("vote__title").addEventListener("click", () => {
        let a = document.getElementsByClassName("vote__panel")[0];
		if (a.style.display != "block") {
            a.style.display = "block";
            if (document.getElementsByClassName("mute__panel")[0].style.display == "block") {
                document.getElementsByClassName("mute__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("enter__panel")[0].style.display == "block") {
				document.getElementsByClassName("enter__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("gift__panel")[0].style.display == "block") {
				document.getElementsByClassName("gift__panel")[0].style.display = "none";
            }
            if (document.getElementsByClassName("reply__panel")[0].style.display == "block") {
				document.getElementsByClassName("reply__panel")[0].style.display = "none";
            }
		} else {
			a.style.display = "none";
		}
    });
    
    document.getElementById("vote__select").onclick = function() {
        if (this.options.length == 0) {
            return;
        }
        let title = this.options[this.selectedIndex].text;
        let options = voteList[title].options;
        let time = voteList[title].time;
        document.getElementById("vote__theme").value = title;
        document.getElementById("vote__options").value = options;
        document.getElementById("vote__time").value = time;
    };

    document.getElementById("vote__add").addEventListener("click", () => {
        let select_wordList = document.getElementById("vote__select");
        let title = document.getElementById("vote__theme").value;
        let options = document.getElementById("vote__options").value;
        let time = document.getElementById("vote__time").value;

        if (title == "" || options == "" || time == "") {
            return;
        }

        // 构造json并添加json
        voteList[title] = {
            options: options,
            time: time
        }

        // 添加到select中去
        select_wordList.options.add(new Option(title, ""));

        saveDate_Vote();
    });

    document.getElementById("vote__del").addEventListener("click", () => {
        let select_wordList = document.getElementById("vote__select");
        let title = select_wordList.options[select_wordList.selectedIndex].text;

        // 删除json内的对象
        delete voteList[title];

        // 删除select里的option
        select_wordList.options.remove(select_wordList.selectedIndex);
        saveDate_Vote();
    });

    document.getElementById("vote__show-result").addEventListener("click", () => {
        let a = document.getElementsByClassName("vote__result")[0];
		if (a.style.display != "block") {
			a.style.display = "block";
		} else {
			a.style.display = "none";
		}
    })
}

function initPkg_Vote_Set() {
    document.getElementById("vote__switch").checked = isReplyOn;
	// 设置初始化
	let ret = localStorage.getItem("ExSave_Vote");
	
	if (ret != null) {
        let retJson = JSON.parse(ret);
        voteList = retJson;
        let select_wordList = document.getElementById("vote__select");
		for (let key in retJson) {
            if (retJson.hasOwnProperty(key)) {
                select_wordList.options.add(new Option(key, ""));
            }
        }
    }
}

function initPkg_LiveTool_Vote_Handle(text) {
    if (isVoteOn == false) {
        return;
    }
    if (getType(text) == "chatmsg") {
        let uid = getStrMiddle(text, "uid@=", "/");
        let txt = getStrMiddle(text, "txt@=", "/");
        if (isRepeat) {
            if (Object(voteWordList).hasOwnProperty(txt)) {
                voteWordList[txt].num++;
                voteTotalNum++;
                changeOptionsData();
            }
        } else {
            if (Object(voteNameList).hasOwnProperty(uid) == false) {
                if (Object(voteWordList).hasOwnProperty(txt)) {
                    voteNameList[uid] = 0;
                    voteWordList[txt].num++;
                    voteTotalNum++;
                    changeOptionsData();
                }
            }
        }
    }
    
}

function saveDate_Vote() {
    let data = voteList;
	localStorage.setItem("ExSave_Vote", JSON.stringify(data)); // 存储弹幕列表
}


function LiveTool_Vote_insertDom_VotePanel() {
    let a = document.createElement("div");
    a.className = "vote__result";
    let panel = `
        <div id="vote__result-theme">投票主题</div>
        <div id="vote__result-close">X</div>
        <div id="vote__result-options"></div>
    `;
    a.innerHTML = panel;
    
    let b = getValidDom([".layout-Player-main", "main"]);
    b.insertBefore(a, b.childNodes[0]);

    let box = document.getElementsByClassName("vote__result")[0];
    box.onmousedown = function (event) {
        event.stopPropagation();
        let xx = event.clientX - box.offsetLeft;
        let yy = event.clientY - box.offsetTop;
        let mouseX;
        let mouseY;
        document.onmousemove = function (event) {
            event.stopPropagation();
            mouseX = event.clientX - xx;
            mouseY = event.clientY - yy;
            box.style.left = mouseX + "px";
            box.style.top = mouseY + "px";
        }
        document.onmouseup = function (event) {
            event.stopPropagation();
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

    document.getElementById("vote__result-close").addEventListener("click", () => {
        document.getElementsByClassName("vote__result")[0].style.display = "none";
    })
}


function initVoteOptionsPanel(theme, options) {
    // 设置标题
    document.getElementById("vote__result-theme").innerText = theme;

    // 设置结果面板
    document.getElementById("vote__result-options").innerHTML = ""; // 清空信息面板
    setVoteOptionsDom(options);
}

function setVoteOptionsDom(options) {
    let arr = options.split(" ");
    let b = document.getElementById("vote__result-options");
    for (let i = 0; i < arr.length; i++) {
        let a = document.createElement("div");
        a.className = "vote__option-wrap";
        a.innerHTML = `
            <div class="vote__option-choice">${ arr[i] }</div>
            <div class="vote__option-num"></div>
            <div class="vote__progress">
                <div class="vote__progress-bar"></div>
            </div>
        `;
        b.appendChild(a);
    }
}

function changeOptionsData() {
    for (const key in voteWordList) {
        let item = voteWordList[key];
        
        let domNum = document.getElementsByClassName("vote__option-num")[item.index];
        let domBar = document.getElementsByClassName("vote__progress-bar")[item.index];

        let percent = String(Number(Number(item.num / voteTotalNum) * 100).toFixed(1)) + "%";
        domNum.innerText = `${ item.num }（${ percent }）`;
        domBar.style.width = percent;
    }
}