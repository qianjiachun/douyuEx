let videoStartTime = 0;
let videoTime_domhook_videoChange = null;
let videoTime_domhook_showtime = null;
let videoTime_timeout = 0;
function initPkg_VideoTime() {
    let timer = setInterval(() => {
        VideoTime_setData();
        let videoDom = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("__video");
        let showtimeDom = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector("demand-video-controller-preview");

        if (videoDom !== undefined && videoDom !== null) {
            clearInterval(timer);
            videoTime_domhook_videoChange = new MutationObserver(function(mutations) {
                VideoTime_setData();
            });
            videoTime_domhook_videoChange.observe(videoDom, { attributes: true, childList: true, subtree: false });

            videoTime_domhook_showtime = new MutationObserver(function(mutations) {
                for (let i = 0; i < mutations.length; i++) {
                    let item = mutations[i];
                    if (item.attributeName == "showtime") {
                        // 此时修改时间
                        let showtime = Number(VideoTime_getShowTime());
                        VideoTime_setShowTime(String(dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(videoStartTime + showtime * 1000)))) + "<br/>" + formatSeconds2(showtime));
                        break;
                    } else if (item.attributeName == "isshow") {
                        clearTimeout(videoTime_timeout);
                        let showtime = Number(VideoTime_getShowTime());
                        // 宏任务 模拟nextTick
                        videoTime_timeout = setTimeout(() => {
                            VideoTime_setShowTime(String(dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(videoStartTime + showtime * 1000)))) + "<br/>" + formatSeconds2(showtime));
                        }, 0);
                        break;
                    }
                }
            });
            videoTime_domhook_showtime.observe(showtimeDom, { attributes: true, childList: true, subtree: false });
        }
    }, 1000)
}

function VideoTime_setData() {
    let pathnameArr = String(window.location.pathname).split("/");
    let videoId = pathnameArr[pathnameArr.length - 1];
    fetch("https://v.douyu.com/video/video/getVideoUrl?vid=" + videoId, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(res => {
        return res.json();
    }).then(ret => {
        let imgUrl = ret.data.viewthumb[0].url;
        let timeStr = getStrMiddle(imgUrl, "--", "/");
        videoStartTime = new Date(timeStr.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3 $4:$5:$6")).getTime();
    }).catch(err => {
        console.log("请求失败!", err);
    })
}

function VideoTime_getShowTime() {
    let t = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector("demand-video-controller-preview").getAttribute("showtime");
    return Number(t).toFixed(0);
}

function VideoTime_setShowTime(timeStr) {
    let dom = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector("demand-video-controller-preview").shadowRoot.querySelector(".Preview-Time");
    if (dom) {
        dom.style.position = "relative";
        dom.style.bottom = "60px"
        dom.style.backgroundColor = "rgba(0,0,0,0.4)";
        dom.innerHTML = timeStr;
    }
}