// 弹幕右键信息增强
// 1. 显示粉丝牌
// 2. 支持禁言
// 3. 支持查询最近10条弹幕
function initPkg_BarragePanel() {
	let timer = setInterval(() => {
        if (document.getElementsByClassName("danmuTips-1ee820").length > 0) {
            clearInterval(timer);
            document.getElementsByClassName("danmuTips-1ee820")[0].parentElement.id = "Ex_BarragePanel";
            setBarragePanelCallBack();
        }
    }, 1500);
}

function setBarragePanelCallBack() {
    let a = new DomHook("#Ex_BarragePanel", (m) => {
        let isAttributes = false;
        if (m.length > 0) {
            for (let i = 0; i < m.length; i++) {
                if (m[i].type == "attributes") {
                    isAttributes = true;
                    break;
                } 
            }
            if (isAttributes == false) {
                let addedNodes = m[0].addedNodes;
                if (addedNodes.length > 0) {
                    let barragePanel = addedNodes[0];
                    if ("getElementsByClassName" in barragePanel == false) {
                        return;
                    }
                    let userNameDom = barragePanel.getElementsByClassName("danmuAuthor-3d7b4a");
                    let id = "";
                    if (userNameDom.length > 0) {
                        id = userNameDom[0].innerHTML;
                        setUserFansMedal(userNameDom[0], id);
                        setMuteButton(barragePanel);
                        setSearchBarrageButton(barragePanel);
                        setMuteTimeButton(barragePanel);
                        setBarrgePanelFunc(barragePanel, id);
                    }
                }
            } else {
                let tmp = document.getElementsByClassName("barragePanel__funcPanel");
                if (tmp.length > 0) {
                    tmp[0].remove();
                }
                let barragePanel = document.getElementsByClassName("danmudiv-32f498")[0];
                let userNameDom = barragePanel.getElementsByClassName("danmuAuthor-3d7b4a");
                
                let id = "";
                if (userNameDom.length > 0) {
                    id = userNameDom[0].innerHTML;
                    setUserFansMedal(userNameDom[0], id);
                    
                    // setMuteButton(barragePanel);
                    // setSearchBarrageButton(barragePanel);
                    // setMuteTimeButton(barragePanel);
                    setBarrgePanelFunc(barragePanel, id);
                }

            }
            
        }
    });
}

function getUserFansMedal(userName) {
    let ret = false;
    let barrageList = document.getElementsByClassName("Barrage-listItem");
    for (let i = barrageList.length - 1; i >= 0; i--) {
        let barragePanel = barrageList[i].lastElementChild;
        if (barragePanel != null && barragePanel != undefined && barragePanel.innerHTML.indexOf(userName) != -1) {
            let fansElement = barragePanel.getElementsByClassName("FansMedal");
            if (fansElement.length > 0) {
                ret = fansElement[0].cloneNode(true);
                break;
            }
        }
    }
    return ret;
}
function getUserLevel(userName) {
    let ret = "";
    let barrageList = document.getElementsByClassName("Barrage-listItem");
    for (let i = barrageList.length - 1; i >= 0; i--) {
        let barragePanel = barrageList[i].lastElementChild;
        if (barragePanel != null && barragePanel != undefined && barragePanel.innerHTML.indexOf(userName) != -1) {
            let roomAdmin = barragePanel.getElementsByClassName("Barrage-icon--roomAdmin");
            if (roomAdmin.length > 0) {
                ret += "【房管】";
            }
            let noble = barragePanel.getElementsByClassName("Barrage-nobleImg");
            if (noble.length > 0) {
                ret += `【${ noble[0].title }】`;
            }
            let level = barragePanel.getElementsByClassName("UserLevel");
            if (level.length > 0) {
                ret += level[0].title;
            }
            break;
        }
    }
    return ret;
}

function setUserFansMedal(dom, userName) {
    dom.removeChild(dom.childNodes[0]);
    let userLevel = getUserLevel(userName);
    let a = document.createElement("span");
    a.innerHTML = userName;
    a.title = userLevel;
    dom.insertBefore(a, dom.childNodes[0]);

    let fansMedal = getUserFansMedal(userName);
    if (fansMedal != false) {
        a = document.createElement("div");
        a.style = "display:inline-block";
        a.appendChild(fansMedal);
        dom.insertBefore(a, dom.childNodes[0]);
    }
}

function setMuteButton(dom) {
    let a = document.createElement("div");
    a.className = "ReportButton-41fa9e";
    a.id = "barragePanel__mute";
    a.innerText = "禁言";
    a.style = "margin-top:120px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setSearchBarrageButton(dom) {
    let a = document.createElement("div");
    a.className = "HideButton-d22988";
    a.innerText = "查弹幕";
    a.id = "barragePanel__search";
    a.style = "margin-top:120px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setMuteTimeButton(dom) {
    let a = document.createElement("div");
    a.className = "barragePanel__muteTime";
    a.innerHTML = `
    <select id="barragePanel__muteSelect" style='width:55px'>
        <option value="1">1分钟</option>
        <option value="10">10分钟</option>
        <option value="30">30分钟</option>
        <option value="60">1小时</option>
        <option value="480">8小时</option>
        <option value="1440">1天</option>
        <option value="4320">3天</option>
        <option value="10080">7天</option>
        <option value="43200">30天</option>
        <option value="259200">180天</option>
        <option value="518400">360天</option>
    </select>
    `;
    dom.insertBefore(a, dom.childNodes[0]);
}

function setBarrgePanelFunc(parentDom, id) {
    document.getElementById("barragePanel__mute").onclick = async () => {
        let value = document.getElementById("barragePanel__muteSelect").value || "1";
        let ret = await addMuteUser(rid, id, value);
        if (ret.msg == "添加成功") {
            showMessage(`【禁言】${id}已被禁言${value}分钟`, "success");
        } else {
            showMessage(ret.msg, "error");
        }
    };
    
    document.getElementById("barragePanel__search").onclick = async () => {
        insertBarragePanel_SearchBarrage_Dom(parentDom);
        barragePanelLastName = id;
        let ret = await getUserRecentBarrage(id);
        let retJson = JSON.parse(ret.data);
        let panel = document.getElementById("barragePanel__searchPanel");
        if(retJson.msg == "成功") {
            if ("danmuVoList" in retJson.data == false) {
                return;
            }
            for (let i = 0; i < retJson.data.danmuVoList.length; i++) {
                let item = retJson.data.danmuVoList[i];
                let a = document.createElement("li");
                a.className = "layui-timeline-item";
                a.innerHTML = `
                <i class="layui-icon layui-timeline-axis"></i>
                <div class="layui-timeline-content layui-text">
                    <h3 class="layui-timeline-title">${item.time}</h3>
                    <p>
                        <span style="font-size:12px">${item.anchorName}：</span><br/>
                        ${item.txt}
                    </p>
                </div>
                `;
                if (panel != null || panel != undefined) {
                    panel.appendChild(a);
                }
            }
            let end = document.createElement("li");
            end.className = "layui-timeline-item";
            end.innerHTML = `
            <i class="layui-icon layui-timeline-axis"></i>
            <div class="layui-timeline-content layui-text">
                <div class="layui-timeline-title"></div>
            </div>
            `;
            if (panel != null || panel != undefined) {
                panel.appendChild(end);
            }
            

        } else {
            showMessage("【查弹幕】查询失败", "error");
        }
    };
}

function insertBarragePanel_SearchBarrage_Dom(parentDom) {
    let pMarginLeft = parseInt(parentDom.style.marginLeft);
    let newMarginLeft = "-237px";
    if (pMarginLeft > 237) {
        newMarginLeft = "-237px";
    } else {
        newMarginLeft = "237px";
    }
    
    let a = document.createElement("div");
    a.className = "barragePanel__funcPanel";
    a.style = `margin-left:${newMarginLeft}`;
    a.innerHTML = `
    <ul class="layui-timeline" id="barragePanel__searchPanel">
        
    </ul>
    `;

    parentDom.insertBefore(a, parentDom.childNodes[0]);
}


function getUserRecentBarrage(name) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://dyapi.fz996.com/api/Wx/GetDataBarrage?keyword=" + name,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                resolve(ret);
            }
        });
    });
}