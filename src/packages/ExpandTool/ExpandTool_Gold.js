let gold_timer; // 时钟句柄
function initPkg_ExpandTool_Gold() {
    ExpandTool_Gold_insertDom();
    ExpandTool_Gold_insertFunc();
    ExpandTool_Gold_Set();
}

function ExpandTool_Gold_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px" id="extool__gold_start" type="checkbox">幻神模式</label>';
    
    let a = document.createElement("div");
    a.className = "extool__gold";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);

}
function ExpandTool_Gold_insertFunc() {
    document.getElementById("extool__gold_start").addEventListener("click", function() {
        let ischecked = document.getElementById("extool__gold_start").checked;
        if (ischecked == true) {
            // 开启幻神模式
            gold_timer = setInterval(() => {
                goldBarrageList();
                goldBarrage();
                goldFansMedal();
            }, 300);
        } else{
            // 停止幻神模式
            clearInterval(gold_timer);
        }
        saveData_Gold();
	});

}

function saveData_Gold() {
	let isGold = document.getElementById("extool__gold_start").checked;
	let data = {
		isGold: isGold
	}
	localStorage.setItem("ExSave_Gold", JSON.stringify(data)); // 存储弹幕列表
}

function ExpandTool_Gold_Set() {
	// 设置初始化
    let ret = localStorage.getItem("ExSave_Gold");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isGold == true) {
            document.getElementById("extool__gold_start").click();
        }
	}
}


function goldBarrageList() {
    let barrageArr = document.getElementsByClassName('Barrage-listItem');
    if (barrageArr.length < 1) {
        return;
    }
    for (let i = 0; i < barrageArr.length; i++) {
        let chatArea = barrageArr[i].lastElementChild;
        if (chatArea != null && chatArea.innerHTML.indexOf("is-self") != -1) {
            barrageArr[i].className = "Barrage-listItem js-noblefloating-barrage";
            chatArea.className = "js-noblefloating-barragecont Barrage-notice--noble";
            chatArea.setAttribute('style','background-color: #fff3df');
            let nickNameObj = chatArea.getElementsByClassName("Barrage-nickName")[0];
            nickNameObj.setAttribute('class','Barrage-nickName is-self js-nick');

            let userLevelObj = chatArea.querySelector(".UserLevel");
            if( userLevelObj!=null){
                userLevelObj.className = "UserLevel UserLevel--120";
                userLevelObj.setAttribute("title", "用户等级：120");
            }
            let roomLevelObj = chatArea.querySelector(".RoomLevel");
            if( roomLevelObj!=null){
                roomLevelObj.className = "RoomLevel RoomLevel--18";
                roomLevelObj.setAttribute("title","房间等级：18");
            }
            let fansMedal = barrageArr[i].querySelector(".FansMedal");
            if(fansMedal!=null){
                fansMedal.className = "FansMedal level-30 js-fans-hover js-fans-dysclick Barrage-icon";
                fansMedal.setAttribute("粉丝牌等级", "等级：30");
            }
            let nobleIconObj = barrageArr[i].querySelector(".Barrage-nobleImg");
            if(nobleIconObj != null){
                nobleIconObj.src = "//res.douyucdn.cn/resource/2019/08/15/common/4e85776071ffbae2867bb9d116e9a43c.gif";
                nobleIconObj.title = "幻神"
            } else {
                let royalTag = document.createElement("span");
                let royalImg = document.createElement("img");
                royalTag.className = "Barrage-icon Barrage-noble";
                royalImg.className = "Barrage-nobleImg";
                royalImg.setAttribute("src", "//res.douyucdn.cn/resource/2019/08/15/common/4e85776071ffbae2867bb9d116e9a43c.gif");
                royalImg.setAttribute("title", "幻神");
                royalTag.appendChild(royalImg);
                chatArea.insertBefore(royalTag, chatArea.firstElementChild);
            }
        }
        
    }
}

function goldFansMedal() {
    document.getElementsByClassName("FansMedalEnter-enterContent")[0].setAttribute("data-medal-level","30");
}

function goldBarrage() {
    let fatherNode = document.querySelector(".danmu-6e95c1");
    for(let i = fatherNode.children.length-1;i>=0;i--){
        if(fatherNode.children[i].className.indexOf("noble-bf13ad")==-1 && fatherNode.children[i].innerHTML.indexOf("border: 2px solid rgb(2, 255, 255)")!=-1){//find self and remove redupliction
            //transform parent node
            let liStyle = fatherNode.children[i].getAttribute("style");
            let characterLength = liStyle.substring(liStyle.indexOf("translateX(-")+12,liStyle.indexOf("px); transition"));
            let transformLength = liStyle.substring(liStyle.indexOf("transform ")+10,liStyle.indexOf("s linear"));
            let screenOpacity = liStyle.substring(liStyle.indexOf("opacity:")+8,liStyle.indexOf("; z-index:"));
            let characterStyle = "opacity: "+ screenOpacity +"; z-index: 30; background: rgba(0, 0, 0, 0); top: 4px; transform: translateX(-"+ characterLength +"px); transition: transform "+ transformLength +"s linear 0s;"
            fatherNode.children[i].className = "danmuItem-31f924 noble-bf13ad";
            fatherNode.children[i].setAttribute("style",characterStyle);
            //noble icon without redupliction remove
            let nobleImgTag = document.createElement("img");
            nobleImgTag.className = "super-noble-icon-9aacaf";
            nobleImgTag.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h1_dcd226.png");
            nobleImgTag.setAttribute("style","margin-left: -57px; margin-top: -4px;");
            fatherNode.children[i].insertBefore(nobleImgTag,fatherNode.children[i].firstElementChild);
            //user avatar img
            let userIconTag = document.createElement("img");
            userIconTag.className = "super-user-icon-574f31";
            let userIconObj = document.getElementsByClassName("Avatar is-circle")[0];
            if(userIconObj !=undefined){
                userIconObj = userIconObj.getElementsByTagName("img")[0].getAttribute("src");
                userIconTag.setAttribute("src", userIconObj.replace((new RegExp("_middle")),"_small"));
            }else{
                console.error("未能获取到用户头像");
            }
            fatherNode.children[i].insertBefore(userIconTag,fatherNode.children[i].firstElementChild);
            //remove out tail tag
            let tailTag = fatherNode.children[i].getElementsByClassName("afterpic-8a2e13")[0];
            tailTag.remove();
            //transform barrage effect
            let textContent = fatherNode.children[i].getElementsByClassName("text-879f3e")[0];
            textContent.className = "super-text-0281ca";
            textContent.setAttribute("style","font: bold 23px SimHei, 'Microsoft JhengHei', Arial, Helvetica, sans-serif; color: rgb(255, 255, 255); background: url('https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h2_8e5e64.png'); height: 44px;");
            //add tag tail includes fire icon or sign icon
            let afterpicTag = document.createElement("div");
            afterpicTag.setAttribute("class","afterpic-8a2e13");
            afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -1px;");// afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -43px;");
            textContent.appendChild(afterpicTag);
            //tail icon
            let superTailImg = document.createElement("img");
            superTailImg.className = "super-tail-bffa58";
            superTailImg.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h3_fd2e5b.png");
            fatherNode.children[i].appendChild(superTailImg);
        }
    }
}