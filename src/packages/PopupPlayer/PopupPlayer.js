let videoPlayerArr = [];

function initPkg_PopupPlayer() {
    initPkg_PopupPlayer_Dom();
    initPkg_PopupPlayer_Func();
}

function initPkg_PopupPlayer_Dom() {
    PopupPlayer_insertIcon();
}

function PopupPlayer_insertIcon() {
    let a = document.createElement("div");
    a.className = "popup-player";
    a.innerHTML = '<a class="ex-panel__icon" title="同屏播放"><svg style="display:block;" t="1579448049771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1804" width="30" height="30"><path d="M353.024 900.416H109.952c-57.856 0-109.952-46.336-109.952-98.432V153.6c0-52.096 52.096-98.432 109.952-98.432h810.176c57.856 0 104.192 46.336 104.192 98.496v185.472c0 28.928-23.168 52.096-46.336 52.096s-46.272-23.168-46.272-52.096V159.36H98.368V807.68h248.896c34.688 0 52.032 17.408 52.032 46.336 0 28.928-17.344 46.272-46.272 46.272" fill="#f26b1f" p-id="1805"></path><path d="M619.2 631.488c-5.76 0-5.76 5.76-5.76 11.52v223.04c0 5.76 5.76 11.52 5.76 11.52h289.344c5.76 0 11.584-5.76 11.584-11.52v-222.976c0-5.824-5.76-11.584-11.52-11.584H619.136z m289.344 338.688h-289.28a103.68 103.68 0 0 1-104.192-104.128v-222.976c0-57.92 46.272-109.952 104.128-109.952h289.344c57.856 0 104.128 46.272 104.128 109.952v222.976c5.824 57.856-40.448 104.128-104.128 104.128z" fill="#f26b1f" p-id="1806"></path></svg><i id="popup-player__tip" class="ex-panel__tip"></i></a>';

    let b = document.getElementsByClassName("ex-panel__wrap")[0];
    b.insertBefore(a, b.childNodes[0]);

}

function initPkg_PopupPlayer_Func() {
    document.getElementsByClassName("popup-player")[0].addEventListener("click", function () {
        let roomUrl = prompt("请输入直播间地址", "https://www.douyu.com/5189167");
        if (roomUrl == null) {
            return;
        }
        if (roomUrl != "") {
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
            showMessage("请输入地址", "error");
        }
    });
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
    getRealLive_Douyu(rid, true, "1", "1", (lurl) => {
        if (lurl != "" || lurl != null) {
            let a = document.createElement("div");
            let html = "";
            a.id = "videoDiv" + String(id);
            a.rid = rid;
            a.className = "videoDiv";
            html += "<div class='videoInfo' id='videoInfo" + String(id) + "'><a title='复制直播流地址'><span class='videoRID' id='videoRID" + String(id) + "' style='color:white'>" + "斗鱼 - " + rid + "</span></a>";
            html += "<select class='videoQn' id='videoQn" + String(id) + "'><option value='1'>流畅</option><option value='2'>高清</option><option value='3'>超清</option><option value='4'>蓝光4M</option></select>";
            html += "<select class='videoCDN' id='videoCDN" + String(id) + "'><option value='1'>主线路</option><option value='2'>备用线路5</option><option value='3'>备用线路6</option></select>";
            html += "<a><div class='videoClose' id='videoClose" + String(id) + "'>X</div></a>"
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
        getRealLive_Douyu(rid, true, videoQn.value, videoCDN.value, (lurl) => {
            videoPlayerArr[id].destroy();
            setElementVideo(id, lurl);
        })
    }
    videoCDN.onchange = function() {
        getRealLive_Douyu(rid, true, videoQn.value, videoCDN.value, (lurl) => {
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
            GM_setClipboard(lurl);
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
