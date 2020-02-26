let videoPlayerArr = [];

function initPkg_PopupPlayer() {
    initPkg_PopupPlayer_Dom();
    initPkg_PopupPlayer_Func();
}

function initPkg_PopupPlayer_Dom() {
    PopupPlayer_insertIcon();
    PopupPlayer_insertPrompt();
}

function PopupPlayer_insertIcon() {
    let a = document.createElement("div");
    a.className = "popup-player";
    a.innerHTML = '<a class="ex-panel__icon" title="同屏播放"><svg style="display:block;" t="1579448049771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1804" width="30" height="30"><path d="M353.024 900.416H109.952c-57.856 0-109.952-46.336-109.952-98.432V153.6c0-52.096 52.096-98.432 109.952-98.432h810.176c57.856 0 104.192 46.336 104.192 98.496v185.472c0 28.928-23.168 52.096-46.336 52.096s-46.272-23.168-46.272-52.096V159.36H98.368V807.68h248.896c34.688 0 52.032 17.408 52.032 46.336 0 28.928-17.344 46.272-46.272 46.272" fill="#f26b1f" p-id="1805"></path><path d="M619.2 631.488c-5.76 0-5.76 5.76-5.76 11.52v223.04c0 5.76 5.76 11.52 5.76 11.52h289.344c5.76 0 11.584-5.76 11.584-11.52v-222.976c0-5.824-5.76-11.584-11.52-11.584H619.136z m289.344 338.688h-289.28a103.68 103.68 0 0 1-104.192-104.128v-222.976c0-57.92 46.272-109.952 104.128-109.952h289.344c57.856 0 104.128 46.272 104.128 109.952v222.976c5.824 57.856-40.448 104.128-104.128 104.128z" fill="#f26b1f" p-id="1806"></path></svg><i id="popup-player__tip" class="ex-panel__tip"></i></a>';

    let b = document.getElementsByClassName("ex-panel__wrap")[0];
    b.insertBefore(a, b.childNodes[0]);

}

function PopupPlayer_insertPrompt() {
    let a = document.createElement("div");
    let html = "";
    a.className = "postbird-box-container";
    a.id = "popup-player__prompt"
    html += '<div class="postbird-box-dialog">';
    html += '<div class="postbird-box-content">';
    html += '<div class="postbird-box-header">';
    html += '<span class="postbird-box-title"><span>请输入直播间地址：</span></span>';
    html += '</div>'; // header
    html += '<div class="postbird-box-text">';
    html += '<input id="popup-player__url" value="https://www.douyu.com/5189167" style="height:30px;box-sizing:border-box" type="text" class="postbird-prompt-input" autofocus="true">';
    html += '<label style="margin-right:30px" title="【直播流模式】&#10;1. 速度快&#10;2. 延迟低&#10;3. 占用少&#10;4. 不会进入直播间&#10;5. 支持斗鱼/虎牙/Bilibili"><input id="popup-player__noiframe" type="radio" name="sex" value="无弹幕" checked="checked">无弹幕(推荐)</label>';
    html += '<label title="【框架模式】&#10;1. 速度慢&#10;2. 占用高&#10;3. 会进入直播间&#10;4. 仅支持斗鱼&#10;此模式拖动不是很灵活，请尽量在标题栏小幅度拖动&#10;若拖动无反应请点击页面任意处触发移动"><input id="popup-player__iframe" type="radio" name="sex" value="有弹幕">有弹幕</label>';
    html += '</div>'; // text
    html += '<div class="postbird-box-footer"><button id="popup-player__cancel" class="btn-footer btn-left-footer btn-footer-cancel" style="color:undefined;">取消</button><button id="popup-player__ok" class="btn-footer btn-right-footer btn-footer-ok" style="color:#0e90d2;">确定</button></div></div>'

    a.innerHTML = html;

    let b = document.getElementsByClassName("layout-Main")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_PopupPlayer_Func() {
    document.getElementsByClassName("popup-player")[0].addEventListener("click", function () {
        document.getElementById("popup-player__prompt").style.display = "block";
    });
    document.getElementById("popup-player__cancel").addEventListener("click", function() {
        document.getElementById("popup-player__prompt").style.display = "none";
    })
    document.getElementById("popup-player__ok").addEventListener("click", function() {
        let roomUrl = document.getElementById("popup-player__url").value;
        if (roomUrl != "") {
            let isIframe = document.getElementById("popup-player__noiframe").checked;
            if (isIframe == true) {
                if (roomUrl.indexOf("douyu.com") != -1) {
                    getRealRid_Douyu(roomUrl, (rid) => {
                        createNewVideo(videoPlayerArr.length, rid, "Douyu");
                    });
                } else if (roomUrl.indexOf("bilibili.com") != -1) {
                    getRealRid_Bilibili(roomUrl, (rid) => {
                        createNewVideo(videoPlayerArr.length, rid, "Bilibili");
                    });
                } else if (roomUrl.indexOf("huya.com") != -1) {
                    createNewVideo(videoPlayerArr.length, roomUrl, "Huya");
                }
            } else {
                createNewVideo_iframe(videoPlayerArr.length, roomUrl);
            }
            
        } else {
            showMessage("请输入地址", "error");
        }
        document.getElementById("popup-player__prompt").style.display = "none";
    })
    document.getElementById("popup-player__prompt").addEventListener("keydown", function(event) {
        let theEvent = window.event || e;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            document.getElementById("popup-player__ok").click();
        }
    })
}

function createNewVideo(id, rid, platform) {
    switch (platform) {
        case "Douyu":
            createNewVideo_Douyu(id, rid);
            break;
        case "Bilibili":
            createNewVideo_Bilibili(id, rid);
            break;
        case "Huya":
            let a = String(rid).split("/");
            createNewVideo_Huya(id, rid, a[a.length - 1]);
            break;
        default:
            createNewVideo_Douyu(id, rid);
            break;
    }
    
}

function setElementVideo(id, l) {
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoPlayer" + String(id));
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: l
        },{fixAudioTimestampGap: false});
        if (id > videoPlayerArr.length - 1) {
			videoPlayerArr.push(flvPlayer);
		} else {
			videoPlayerArr[id] = flvPlayer;
		}
        
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
}

function setElementResize(id) {
    let box = document.getElementById("videoDiv" + String(id));
    
    let scale = document.getElementById("videoScale" + String(id));
    scale.onmousedown = function (e) {
        // 阻止冒泡,避免缩放时触发移动事件
        e.stopPropagation();
        e.preventDefault();
        let pos = {
            'w': box.offsetWidth,
            'h': box.offsetHeight,
            'x': e.clientX,
            'y': e.clientY
        };
        let w;
        let h;
        document.onmousemove = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            w = Math.max(300, ev.clientX - pos.x + pos.w)
            h = Math.max(150, ev.clientY - pos.y + pos.h)
            w = w >= document.offsetWidth - box.offsetLeft ? document.offsetWidth - box.offsetLeft : w
            h = h >= document.offsetHeight - box.offsetTop ? document.offsetHeight - box.offsetTop : h
        }
        document.onmouseup = function (e) {
            e.stopPropagation();
            e.preventDefault();
            box.style.width = w + 'px';
            box.style.height = h + 'px';
            
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

}

function setElementDrag(id) {
    let box = document.getElementById("videoDiv" + String(id));
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
        }
        document.onmouseup = function (event) {
            event.stopPropagation();
            box.style.left = mouseX + "px";
            box.style.top = mouseY + "px";
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}



// Douyu
function createNewVideo_Douyu(id, rid) {
    getRealLive_Douyu(rid, false, "1", "1", (lurl) => {
        if (lurl != "" || lurl != null) {
            if (lurl == "None") {
                showMessage("房间未开播或其他错误", "error");
                return;
            }
            let lurl_host_arr = String(lurl).split("/live");
            let lurl_host = "";
            if (lurl_host_arr.length > 0) {
                lurl_host = lurl_host_arr[0];
            }
            let a = document.createElement("div");
            let html = "";
            a.id = "videoDiv" + String(id);
            a.rid = rid;
            a.className = "videoDiv";
            html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><a title='复制直播流地址'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span></a>";
            html += "<select class='videoQn' id='videoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光4M</option></select>";
            html += "<select style='display:none' class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路5</option><option value='3'>备用线路6</option></select>";
            html += "<a style='margin-left:5px' href='" + lurl_host + "' target='_blank'>无视频？</a>";
            html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>";
            html += "</div>";
            html += "<video controls='controls' class='videoPlayer' id='videoPlayer" + String(id) + "'></video><div class='videoScale' id='videoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = document.getElementsByClassName("layout-Main")[0];
            b.insertBefore(a, b.childNodes[0]);
            setElementDrag(id);
            setElementResize(id);
            setElementFunc_Douyu(id, rid);
            setElementVideo(id, lurl);
        }
    });
}


function setElementFunc_Douyu(id, rid) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoPlayer = document.getElementById("videoPlayer" + String(id));
    let info = document.getElementById("videoInfo" + String(id));
    let scale = document.getElementById("videoScale" + String(id));
    videoPlayer.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (scale.style.display != "block") {
            scale.style.display = "block";
            info.style.display = "block";
        } else {
            scale.style.display = "none";
            info.style.display = "none";
        }
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
    let videoQn = document.getElementById("videoQn" + String(id));
    let videoCDN = document.getElementById("videoCDN" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoQn.onchange = function() {
        getRealLive_Douyu(rid, false, videoQn.value, videoCDN.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoCDN.onchange = function() {
        getRealLive_Douyu(rid, false, videoQn.value, videoCDN.value, (lurl) => {
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoClose.onclick = function() {
        box.remove();
    }

    let videoRID = document.getElementById("videoRID" + String(id));
    videoRID.onclick = function() {
        getRealLive_Douyu(rid, false, videoQn.value, videoCDN.value, (lurl) => {
            GM_setClipboard(String(lurl).replace("https", "http"));
            showMessage("复制成功", "success");
        })
    }
}


// Bilibili
function createNewVideo_Bilibili(id, rid){
    getRealLive_Bilibili(rid, "1", "1", (lurl) => {
        if (lurl != "" || lurl != null) {
            let a = document.createElement("div");
            let html = "";
            a.id = "videoDiv" + String(id);
            a.rid = rid;
            a.className = "videoDiv";
            html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><a title='复制直播流地址'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "Bilibili - " + rid + "</span></a>";
            html += "<select class='videoQn' id='videoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光</option><option value='5'>原画</option></select>";
            html += "<select class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option><option value='4'>备用线路3</option></select>";
            html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='videoPlayer' id='videoPlayer" + String(id) + "'></video><div class='videoScale' id='videoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = document.getElementsByClassName("layout-Main")[0];
            b.insertBefore(a, b.childNodes[0]);
            setElementDrag(id);
            setElementResize(id);
            setElementFunc_Bilibili(id, rid);
            setElementVideo(id, lurl);
        }
    });
}

function setElementFunc_Bilibili(id, rid) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoPlayer = document.getElementById("videoPlayer" + String(id));
    let info = document.getElementById("videoInfo" + String(id));
    let scale = document.getElementById("videoScale" + String(id));
    videoPlayer.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (scale.style.display != "block") {
            scale.style.display = "block";
            info.style.display = "block";
        } else {
            scale.style.display = "none";
            info.style.display = "none";
        }
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
    let videoQn = document.getElementById("videoQn" + String(id));
    let videoCDN = document.getElementById("videoCDN" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoQn.onchange = function() {
        getRealLive_Bilibili(rid, videoQn.value, videoCDN.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoCDN.onchange = function() {
        getRealLive_Bilibili(rid, videoQn.value, videoCDN.value, (lurl) => {
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoClose.onclick = function() {
        box.remove();
    }


    let videoRID = document.getElementById("videoRID" + String(id));
    videoRID.onclick = function() {
        getRealLive_Bilibili(rid, videoQn.value, videoCDN.value, (lurl) => {
            GM_setClipboard(lurl);
            showMessage("复制成功", "success");
        })
    }
}

// Huya
function createNewVideo_Huya(id, rid, rname){
    getRealLive_Huya(rid, "1", "1", (lurl, msg) => {
        if (lurl != "" || lurl != null) {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            let a = document.createElement("div");
            let html = "";
            a.id = "videoDiv" + String(id);
            a.rid = rid;
            a.className = "videoDiv";
            html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><a title='复制直播流地址'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "Huya - " + rname + "</span></a>";
            html += "<select class='videoQn' id='videoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>超清</option><option value='3'>蓝光4M</option><option value='4'>原画</option></select>";
            html += "<select class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路1</option><option value='3'>备用线路2</option></select>";
            html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>"
            html += "</div>";
            html += "<video controls='controls' class='videoPlayer' id='videoPlayer" + String(id) + "'></video><div class='videoScale' id='videoScale" + String(id) + "'></div>";
            a.innerHTML = html;
            let b = document.getElementsByClassName("layout-Main")[0];
            b.insertBefore(a, b.childNodes[0]);
            setElementDrag(id);
            setElementResize(id);
            setElementFunc_Huya(id, rid);
            setElementVideo(id, lurl);
        }
    });
}

function setElementFunc_Huya(id, rid) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoPlayer = document.getElementById("videoPlayer" + String(id));
    let info = document.getElementById("videoInfo" + String(id));
    let scale = document.getElementById("videoScale" + String(id));
    videoPlayer.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (scale.style.display != "block") {
            scale.style.display = "block";
            info.style.display = "block";
        } else {
            scale.style.display = "none";
            info.style.display = "none";
        }
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
    let videoQn = document.getElementById("videoQn" + String(id));
    let videoCDN = document.getElementById("videoCDN" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoQn.onchange = function() {
        getRealLive_Huya(rid, videoQn.value, videoCDN.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoCDN.onchange = function() {
        getRealLive_Huya(rid, videoQn.value, videoCDN.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
			videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoClose.onclick = function() {
        box.remove();
    }


    let videoRID = document.getElementById("videoRID" + String(id));
    videoRID.onclick = function() {
        getRealLive_Huya(rid, videoQn.value, videoCDN.value, (lurl, msg) => {
            if (msg != "") {
                showMessage(msg, "error");
                return;
            }
            GM_setClipboard(lurl);
            showMessage("复制成功", "success");
        })
    }
}


// iframe
function createNewVideo_iframe(id, url) {
    if (String(url).indexOf("douyu.com") == -1) {
        showMessage("有弹幕模式仅支持斗鱼直播", "error");
        return;
    }
    let rid_arr = String(url).split("/");
    let rid = rid_arr[rid_arr.length - 1];
    let a = document.createElement("div");
    let html = "";
    a.id = "videoDiv" + String(id);
    a.rid = rid;
    a.className = "videoDiv";
    html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span>";
    html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>"
    html += "</div>";
    html += "<iframe class='videoPlayer' id='videoPlayer" + String(id) + "' src=" + url + "?exid=chun></iframe>" 
    html += "<div class='videoScale' id='videoScale" + String(id) + "'></div>";
    a.innerHTML = html;
    let b = document.getElementsByClassName("layout-Main")[0];
    b.insertBefore(a, b.childNodes[0]);
    setElementDrag(id);
    setElementResize(id);
    if (id > videoPlayerArr.length - 1) {
        videoPlayerArr.push("iframe");
    } else {
        videoPlayerArr[id] = "iframe";
    }
    setElementFunc_iframe(id);
}

function setElementFunc_iframe(id) {
    let box = document.getElementById("videoDiv" + String(id));
    let videoClose = document.getElementById("videoClose" + String(id));
    videoClose.onclick = function() {
        box.remove();
    }
    box.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        for (let i = 0; i < videoPlayerArr.length; i++) {
            let box = document.getElementById("videoDiv" + String(i));
            if (box != null) {
                if (i == id) {
                    box.style.zIndex = 7778;
                } else {
                    box.style.zIndex = 7777;
                }
            }
        }
    }
}