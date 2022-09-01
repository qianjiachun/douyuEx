function initPkg_DyVideoBarrageLine() {
    let timer = setInterval(() => {
        let progress = document.getElementsByTagName("demand-video")[0].shadowRoot.getElementById("demandcontroller-bar").shadowRoot.querySelector("demand-video-controller-progress").shadowRoot.querySelector(".ProgressBar-Safearea");
        let hashidShadow = document.getElementsByTagName("demand-video-toolbar")[0].shadowRoot;
        if (progress && hashidShadow) {
            clearInterval(timer);
            let hashid = hashidShadow.querySelector("share-hover").getAttribute("hashid");
            // let vid = $DATA.ROOM.vid;
            // if (hashid !== vid) {
            //     showMessage("视频内容已改变，请刷新网页后重试", "error");
            //     return;
            // }
            renderVideoBarrageLine(hashid);
        }
    }, 1000);
}

async function renderVideoBarrageLine(hashid) {
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
        for (let i = 0; i < data.data.list.length; i++) {
            let item = data.data.list[i];
            let index = Math.floor(item.tl / msStep);
            list[index]++;
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
        console.log([current, next])
        let smoothArr = smooth([current, next]);
        c += "C ";
        for (let j = 1; j < smoothArr.length; j++) {
            c += `${smoothArr[j][0]} ${100 - smoothArr[j][1]} `
        }
    }
    c += "L 1000 100 Z";
    console.log("嘿嘿", d + c);
}