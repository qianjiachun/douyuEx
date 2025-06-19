function initPkg_BarragePanel() {
	let timer = setInterval(() => {
        if (document.getElementsByClassName("danmuTips-1ee820").length > 0) {
            clearInterval(timer);
            document.getElementsByClassName("danmuTips-1ee820")[0].parentElement.id = "Ex_BarragePanel";
            setBarragePanelCallBack();
        }
    }, 1500);

    initPkg_BarragePanel_Tip();
}

function setBarragePanelCallBack() {
    let a = new DomHook("#Ex_BarragePanel", true, (m) => {
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
                        id = userNameDom[0].innerText;
                        setUserFansMedal(userNameDom[0], id);
                        setMuteButton(barragePanel);
                        setSearchBarrageButton(barragePanel);
                        setMuteTimeButton(barragePanel);
                        setReplyBarrageButton(barragePanel);
                        setBarrgePanelFunc(barragePanel, id);
                    }
                }
            } else {
                let tmp = document.getElementsByClassName("barragePanel__funcPanel");
                if (tmp.length > 0) {
                    tmp[0].remove();
                }
                let barragePanel = document.getElementsByClassName("danmudiv-32f498")[0];
                if (barragePanel == undefined) {
                    return;
                }
                let userNameDom = barragePanel.getElementsByClassName("danmuAuthor-3d7b4a");
                
                let id = "";
                if (userNameDom.length > 0) {
                    id = userNameDom[0].innerText;
                    setUserFansMedal(userNameDom[0], id);
                    setMuteButton(barragePanel);
                    setSearchBarrageButton(barragePanel);
                    setMuteTimeButton(barragePanel);
                    setReplyBarrageButton(barragePanel);
                    setBarrgePanelFunc(barragePanel, id);
                }
                const contentDom = document.getElementsByClassName("danmuContent-25f266")[0];
                if (!contentDom) return;
                if (!contentDom.innerHTML.includes(`[DouyuEx图片`)) return;
                let newText = contentDom.innerHTML.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
                contentDom.innerHTML = newText;
            }
        }
    });

    new DomHook("#Ex_BarragePanel", false, (m) => {
        const contentDom = document.getElementsByClassName("danmuContent-25f266")[0];
        if (!contentDom) return;
        if (!contentDom.innerHTML.includes(`[DouyuEx图片`)) return;
        let newText = contentDom.innerHTML.replace(/\[DouyuEx图片(.*?)\]/g, (match, str) => getImageDanmakuHtml(str));
        contentDom.innerHTML = newText;
    })
    
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
function getUserLevelText(userName) {
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
    if (document.getElementById("barragePanel__id") == undefined) {
        dom.removeChild(dom.childNodes[0]);
        let userLevel = getUserLevelText(userName);
        let a = document.createElement("span");
        a.innerHTML = userName;
        a.title = userLevel;
        a.id = "barragePanel__id";
        dom.insertBefore(a, dom.childNodes[0]);
    }
    

    let fansMedal = getUserFansMedal(userName);
    if (fansMedal != false) {
        a = document.createElement("div");
        a.style = "display:inline-block";
        a.appendChild(fansMedal);
        dom.insertBefore(a, dom.childNodes[0]);
    }
}

function setMuteButton(dom) {
    if (document.getElementById("barragePanel__mute") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "ReportButton-41fa9e";
    a.id = "barragePanel__mute";
    a.innerText = "禁言";
    a.style = "margin-top:120px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setSearchBarrageButton(dom) {
    if (document.getElementById("barragePanel__search") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "HideButton-d22988";
    a.innerText = "查弹幕";
    a.id = "barragePanel__search";
    a.style = "margin-top:120px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setReplyBarrageButton(dom) {
    if (document.getElementById("barragePanel__reply") != null) {
        return;
    }
    let a = document.createElement("div");
    a.className = "HideButton-d22988";
    a.innerText = "回复";
    a.id = "barragePanel__reply";
    a.style = "margin-top:90px;z-index:5";
    dom.insertBefore(a, dom.childNodes[0]);
}

function setMuteTimeButton(dom) {
    if (document.getElementsByClassName("barragePanel__muteTime").length > 0) {
        return;
    }
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
    document.getElementById("barragePanel__reply").onclick = () => {
        let txt = parentDom.getElementsByClassName("danmuContent-25f266")[0].innerText;
        const chatDom = document.getElementsByClassName("ChatSend-txt")[0];
        const value = `@${ id }：${ txt }`;
        if (chatDom.tagName == "TEXTAREA") {
            chatDom.value = value;
        } else {
            chatDom.innerText = value;
        }
    };

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
        let uid = await getUserUid(id);
        if (uid !== "") {
            openPage(`https://www.doseeing.com/data/fan/${uid}?type=chat&dt=0`, true);
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
            url: "http://dyapi.fz996.com/api/Wx/GetDataBarrage?keyword=" + name,
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

function getUserUid(name) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://www.doseeing.com/api/suggest_all?type=room&nickname=" + encodeURIComponent(name),
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                let ret = response.response;
                let success = true;
                if (!ret.suggest) success = false;
                if (!ret.suggest.fan) success = false;
                if (ret.suggest.fan.length === 0) success = false;
                if (ret.suggest.fan[0].nickname !== name) success = false;
                if (success) {
                    resolve(ret.suggest.fan[0].user_id);
                } else {
                    resolve("");
                    return;
                }
            }
        });
    });
}


