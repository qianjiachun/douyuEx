let dyVideoBarrage_domhook_videoChange = null;
let dyVideoBarrage_hasRendered = false;
const dyVideoBarrage_domName = "ex-barrageLine";
const dyVideoBarrage_switchDomName = "ex-barrageLine-switch";
function initPkg_DyVideoBarrageLine() {
    let timer = setInterval(() => {
        let progress = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector(".ProgressBar-Safearea");
        let hashidShadow = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        let hashIdDom = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        if (progress && hashidShadow && hashIdDom) {
            clearInterval(timer);
            initPkg_DyVideoBarrageLine_Dom();
            renderVideoBarrageLine();
            let shareHoverDom = hashIdDom.querySelector("share-hover");
            dyVideoBarrage_domhook_videoChange = new MutationObserver(function(mutations) {
                renderVideoBarrageLine();
            });
            dyVideoBarrage_domhook_videoChange.observe(shareHoverDom, { attributes: true, childList: true, subtree: false });
        }
    }, 1000);
}

function initPkg_DyVideoBarrageLine_Dom() {
    let a = document.createElement("style");
    a.innerHTML = `.no-hasLR #ex-barrageLine {
        display: none !important;
    }`;
    
    let b = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot;
    b.append(a);
}


async function renderVideoBarrageLine() {
    if (dyVideoBarrage_hasRendered) return;
    dyVideoBarrage_hasRendered = true;
    setTimeout(() => {
        dyVideoBarrage_hasRendered = false;
    }, 1000);
    showMessage("弹幕高能进度条加载中，请耐心等待", "info");
    let progress = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot;
    let progressBar = progress.querySelector(".ProgressBar");
    let barrageLineDom = progress.querySelector("#" + dyVideoBarrage_domName);
    if (barrageLineDom) barrageLineDom.remove();
    let hashid = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot.querySelector("share-hover").getAttribute("hashid");
    let xAxisStepNum = 100;
    let progressTimeText = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("#time-label").innerText;
    let arr = progressTimeText.split("/");
    if (arr.length <= 0) return;
    let totalMs = timeText2Ms(arr[1]);
    let msStep = totalMs / (xAxisStepNum - 1);
    
    let list = new Array(xAxisStepNum).fill(0, 0, xAxisStepNum);
    let pre = 0;
    do {
        let data = await getVideoBarrageByTime(hashid, pre);
        pre = data.data.pre;
        if (data.data.list) {
            for (let i = 0; i < data.data.list.length; i++) {
                let item = data.data.list[i];
                let index = Math.floor(item.tl / msStep);
                list[index]++;
            }
        }
    } while (pre >= 0);


    // viewbox 长1000 高100
    let xStep = 1000 / list.length;
    let yStep = Math.max(...list) / 100;

    let positionArray = [];

    for (let i = 0; i < list.length; i++) {
        let barrageNum = list[i];
        let x = i * xStep;
        let y = barrageNum / yStep;
        positionArray.push([x, y]);
    }

    let d = "M 0 100 L 0 80 ";
    let c = "";
    for (let i = 0; i < positionArray.length - 1; i++) {
        let current = positionArray[i];
        let next = positionArray[i + 1];
        let [x1, y1] = current;
        let [x2, y2] = next;

        let cx1 = x1;
        let cy1 = (y1 + y2) / 2;
        let cx2 = x2;
        let cy2 = (y1 + y2) / 2;
        c += "C ";
        c += `${cx1} ${80 - cy1}, ${cx2} ${80 - cy2}, ${x2} ${80 - y2} `;
        // let smoothArr = smooth([current, next]);
        // for (let j = 1; j < smoothArr.length; j++) {
        //     c += `${smoothArr[j][0]} ${100 - smoothArr[j][1]}`;
        //     if (j === smoothArr.length - 1) {
        //         c += " ";
        //     } else {
        //         c += ", "
        //     }
        // }
    }
    c += "L 1000 100 Z";
    let path = d + c;
    let html = `
    <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1000 100" >
        <path fill="rgba(255,255,255,0.3)" d="${path}" />
    </svg>`;
    if (path.indexOf("NaN") !== -1) {
        console.log(path)
        showMessage("弹幕高能进度条加载失败", "error");
    }
    let a = document.createElement("div");
	a.id = dyVideoBarrage_domName;
    a.style = "position:absolute;width:100%;height:30px;bottom:0px;pointer-events:none;cursor: default;";
	a.innerHTML = html;
	
    progressBar.insertBefore(a, progressBar.childNodes[0]);
}