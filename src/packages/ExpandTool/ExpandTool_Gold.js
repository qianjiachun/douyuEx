let user_name;
let animationNum = 0;

let goldBarrageHook;
let goldBarrageListHook;

let goldGiftHook;
function initPkg_ExpandTool_Gold() {
    ExpandTool_Gold_insertDom();
    ExpandTool_Gold_insertGiftDom();
    ExpandTool_Gold_insertFunc();
    ExpandTool_Gold_Set();
}

function ExpandTool_Gold_insertDom() {
    let html = "";
    html += '<label><input style="margin-top:5px;" id="extool__gold_start" type="checkbox">幻神模式</label>';
    html += '<label><input style="margin-top:5px;" id="extool__goldGift_start" type="checkbox">荧光棒变超火</label>';
    
    let a = document.createElement("div");
    a.className = "extool__gold";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_Gold_insertGiftDom() {
    let a = document.createElement("div");
    a.className = "ex_giftAnimation";
    let b = document.getElementsByClassName("Barrage-main")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_Gold_insertFunc() {
    document.getElementById("extool__gold_start").addEventListener("click", async function() {
        let ischecked = document.getElementById("extool__gold_start").checked;
        if (ischecked == true) {
            // 开启幻神模式  danmu-6e95c1
            goldBarrageHook = new DomHook(".danmu-e7f029", true, goldBarrage);
            goldBarrageListHook = new DomHook(".Barrage-list", true, goldBarrageList);
            goldFansMedal();
        } else{
            // 停止幻神模式
            goldBarrageHook.closeHook();
            goldBarrageListHook.closeHook();
            
        }
        saveData_Gold();
	});
    document.getElementById("extool__goldGift_start").addEventListener("click", async function() {
        user_name = await getUserName();
        let ischecked = document.getElementById("extool__goldGift_start").checked;
        if (ischecked == true) {
            goldGiftHook = new DomHook(".BarrageBanner", true, fansToSuperRocket);
        } else{
            goldGiftHook.closeHook();
        }
        saveData_GoldGift();
	});
}

function saveData_Gold() {
	let isGold = document.getElementById("extool__gold_start").checked;
	let data = {
		isGold: isGold
	}
	localStorage.setItem("ExSave_Gold", JSON.stringify(data)); // 存储弹幕列表
}

function saveData_GoldGift() {
	let isGoldGift = document.getElementById("extool__goldGift_start").checked;
	let data = {
		isGoldGift: isGoldGift
	}
	localStorage.setItem("ExSave_GoldGift", JSON.stringify(data)); // 存储弹幕列表
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
    ret = localStorage.getItem("ExSave_GoldGift");
	if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isGoldGift == true) {
            document.getElementById("extool__goldGift_start").click();
        }
    }
}

function goldBarrageList(m) {
    if (m.length == 0) {
        return;
    }
    if (m[0].addedNodes.length == 0) {
        return;
    }
    
    let itemNode = m[0].addedNodes[0];
    let chatArea = itemNode.lastElementChild;
    if (chatArea != null && chatArea.innerHTML.indexOf("is-self") != -1) {
        let barrageListTimeout = setTimeout(() => {
            itemNode.className = "Barrage-listItem js-noblefloating-barrage";
        chatArea.className = "js-noblefloating-barragecont Barrage-notice--noble";
        chatArea.setAttribute('style','background-color: #fff3df');
        let nickNameObj = chatArea.getElementsByClassName("Barrage-nickName")[0];
        nickNameObj.setAttribute('class','Barrage-nickName is-self js-nick');

        let userLevelObj = chatArea.querySelector(".UserLevel");
        if( userLevelObj!=null){
            userLevelObj.className = "UserLevel UserLevel--150";
            userLevelObj.setAttribute("title", "用户等级：150");
        }
        let roomLevelObj = chatArea.querySelector(".RoomLevel");
        if( roomLevelObj!=null){
            roomLevelObj.className = "RoomLevel RoomLevel--18";
            roomLevelObj.setAttribute("title","房间等级：18");
        }
        let fansMedal = itemNode.querySelector(".FansMedal");

        if(fansMedal!=null){
            fansMedal.style = "display:none;";
        }
        let fansMedalName = document.getElementsByClassName("FansMedal-name")[0];//fans medal
            let fansBackgroundImg = document.getElementsByClassName("DiamondsFansRankList-item DiamondsFansRankList-item--top")[0];
            if(fansMedalName){
                let fansTag = document.createElement("div");
                let fansSpan = document.createElement("span");
                fansTag.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
                // fansTag.setAttribute("data-rid",roomId);//id is same to roomId
                fansSpan.className = "FansMedal-name js-fans-dysclick";
                // fansSpan.setAttribute("data-rid",roomId);
                fansSpan.innerHTML = fansMedalName.innerText;
                fansTag.appendChild(fansSpan);
                chatArea.insertBefore(fansTag,chatArea.querySelector(".UserLevel"));
                // if(fansBackgroundImg && fansBackgroundImg.innerHTML.indexOf("background-image:")==-1){//common fans medal
                //     let fansTag = document.createElement("div");
                //     let fansSpan = document.createElement("span");
                //     fansTag.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
                //     // fansTag.setAttribute("data-rid",roomId);//id is same to roomId
                //     fansSpan.className = "FansMedal-name js-fans-dysclick";
                //     // fansSpan.setAttribute("data-rid",roomId);
                //     fansSpan.innerHTML = fansMedalName.innerText;
                //     fansTag.appendChild(fansSpan);
                //     chatArea.insertBefore(fansTag,chatArea.querySelector(".UserLevel"));
                // }else{//special fans medal
                //     let fansTag1 = document.createElement("div");
                //     fansTag1.className="FansMedal is-made js-fans-dysclick Barrage-icon";
                //     fansTag1.setAttribute("style", fansBackgroundImg.getElementsByClassName("FansMedal is-made")[0].getAttribute("style") );
                //     // fansTag1.setAttribute("data-rid",roomId);
                //     let fansSpan1 = document.createElement("span");
                //     fansSpan1.className = "FansMedal-name js-fans-dysclick";
                //     // fansSpan1.setAttribute("data-rid",roomId);
                //     fansSpan1.innerHTML = fansMedalName.innerText;
                //     fansTag1.appendChild(fansSpan1);
                //     chatArea.insertBefore(fansTag1,chatArea.querySelector(".UserLevel"));
                // }
            }else{//point to a fans medal when room have none of fans medal
                let fansTag2 = document.createElement("div");
                fansTag2.className="FansMedal level-50 js-fans-dysclick Barrage-icon";
                fansTag2.setAttribute("data-rid","4042402");
                let fansSpan2 = document.createElement("span");
                fansSpan2.className = "FansMedal-name js-fans-dysclick";
                fansSpan2.setAttribute("data-rid","4042402");
                fansSpan2.innerHTML = "二九汪";
                fansTag2.appendChild(fansSpan2);
                chatArea.insertBefore(fansTag2,chatArea.querySelector(".UserLevel"));
            }

        let nobleIconObj = itemNode.querySelector(".Barrage-nobleImg");
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
        clearTimeout(barrageListTimeout);
        }, 100);
    }
    
}

function goldFansMedal() {
    document.getElementsByClassName("FansMedalEnter-enterContent")[0].setAttribute("data-medal-level","50");
}

function goldBarrage(m) {
    if (m.length == 0) {
        return;
    }
    if (m[0].addedNodes.length == 0) {
        return;
    }
    let itemNode = m[0].addedNodes[0];
    if(itemNode.className.indexOf("noble-f439ef")==-1 && itemNode.innerHTML.indexOf("border: 2px solid rgb(2, 255, 255)")!=-1){//find self and remove redupliction
        itemNode.style.zIndex = "30";
        itemNode.className = "danmuItem-f8e204 noble-f439ef";
        // itemNode.setAttribute("style",characterStyle);
        //noble icon without redupliction remove
        let nobleImgTag = document.createElement("img");
        nobleImgTag.className = "super-noble-icon-54c62c";
        nobleImgTag.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h1_dcd226.png");
        nobleImgTag.setAttribute("style","margin-left: -57px; margin-top: -4px;");
        itemNode.insertBefore(nobleImgTag,itemNode.firstElementChild);
        //user avatar img
        let userIconTag = document.createElement("img");
        userIconTag.className = "super-user-icon-253711";
        let userIconObj = document.getElementsByClassName("Avatar is-circle")[0];
        if(userIconObj !=undefined){
            userIconObj = userIconObj.getElementsByTagName("img")[0].getAttribute("src");
            userIconTag.setAttribute("src", userIconObj.replace((new RegExp("_middle")),"_small"));
        }else{
            // console.error("未能获取到用户头像");
        }
        itemNode.insertBefore(userIconTag,itemNode.firstElementChild);
        //remove out tail tag
        let tailTag = itemNode.getElementsByClassName("afterpic-f864c2")[0];
        tailTag.remove();
        //transform barrage effect
        let textContent = itemNode.getElementsByClassName("text-edf4e7")[0];
        textContent.className = "super-text-188279";
        textContent.setAttribute("style","font: bold 23px SimHei, 'Microsoft JhengHei', Arial, Helvetica, sans-serif; color: rgb(255, 255, 255); background: url('https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h2_8e5e64.png'); height: 44px;");
        //add tag tail includes fire icon or sign icon
        let afterpicTag = document.createElement("div");
        afterpicTag.setAttribute("class","afterpic-f864c2");
        afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -1px;");// afterpicTag.setAttribute("style","margin-top: 7px; margin-left: -43px;");
        textContent.appendChild(afterpicTag);
        //tail icon
        let superTailImg = document.createElement("img");
        superTailImg.className = "super-tail-6a0446";
        superTailImg.setAttribute("src","https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/h3_fd2e5b.png");
        itemNode.appendChild(superTailImg);
        console.log(superTailImg)
    }
}

function fansToSuperRocket(m) {
    if (m.length == 0) {
        return;
    }
    if (m[0].addedNodes.length == 0) {
        return;
    }
    let dom_gift = m[0].addedNodes[0];
    if (dom_gift.getElementsByClassName("Banner4gift-senderName")[0].title == user_name) {
        let giftName = dom_gift.getElementsByClassName("Banner4gift-objectName")[0].title;
        if (giftName == "粉丝荧光棒") {
            dom_gift.className = "Banner4gift Banner4gift--size2";
            dom_gift.getElementsByClassName("Banner4gift-bg")[0].src = "https://gfs-op.douyucdn.cn/dygift/2019/03/15/6651f2de52dd359c7b553a77b9d00020.png"; // 修改横幅
            dom_gift.getElementsByClassName("Banner4gift-objectName")[0].title = "超级火箭";
            dom_gift.getElementsByClassName("Banner4gift-objectName")[0].innerText = "超级火箭";
            dom_gift.getElementsByClassName("Banner4gift-headerImg")[0].src = "https://gfs-op.douyucdn.cn/dygift/2018/11/27/3adbb0c17d9886c1440d55c9711f4c79.gif"; // 修改gif

            if (document.getElementsByClassName("ex_giftAnimation_exist").length > 0) {
                return;
            }
            animationNum++;

            let a = document.createElement("div");
            let idName = "ex_giftAnimation_" + String(animationNum);
            a.id = idName;
            a.className = "ex_giftAnimation_exist";
            let b = document.getElementsByClassName("ex_giftAnimation")[0];
            b.appendChild(a);

            let player = new SVGA.Player("#" + idName);
            let parser = new SVGA.Parser("#" + idName);
            parser.load('https://gfs-op.douyucdn.cn/dygift/2018/11/27/6c6349672e662750ad5c019b240d57f2.svga', (videoItem) => {
                player.setVideoItem(videoItem);
                player.startAnimation();
                setTimeout(() => {
                    player = null;
                    parser = null;
                    document.getElementById(idName).remove();
                }, 4000);
            });
            
        }
    }
}

