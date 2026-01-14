function initPkg_BarragePanel_Tip() {
    setBarragePanelTipCallBack();
}

function setBarragePanelTipCallBack() {
    new DomHook("#comment-dzjy-container", false, (m) => {
        if (m.length <= 0) {
            return;
        }
        if (m[0].addedNodes.length <= 0) {
            return;
        }
        renderBarragePanelTip();
        setBarragePanelTipFunc();
    })
}

function renderBarragePanelTip() {
    const labelDoms = document.getElementsByClassName("labelfisrt-407af4");
    if (labelDoms.length === 0) return;

    labelDoms[0].insertAdjacentHTML(
        "afterend",
        `<p class="sugun-e3fbf6">|</p>
         <div class="labelfisrt-407af4 thirdBtn-06cde5 fourBtn-0845d4" id="barrage-panel-tip__+1">+1</div>`
    );

    const btnsContainer = labelDoms[0].closest(".btnscontainer-4e2ed0");
    const btnsRect = btnsContainer.getBoundingClientRect();
    const menuCenterViewportX = btnsRect.left + btnsRect.width / 2;
    const menuHalfWidth = btnsContainer.offsetWidth / 2;
    const initialMenuLeft = menuCenterViewportX - menuHalfWidth;
    const initialMenuRight = menuCenterViewportX + menuHalfWidth;

    const SCROLLBAR_OFFSET = 18;
    const playerContainer = document.getElementById("js-player-main");
    const boundaryRect = (playerContainer || document.documentElement).getBoundingClientRect();
    const hasScrollbar = !playerContainer && document.documentElement.scrollWidth > document.documentElement.clientWidth;
    const boundaryLeft = boundaryRect.left;
    const boundaryRight = boundaryRect.right - (hasScrollbar && SCROLLBAR_OFFSET);

    const offsetX = (initialMenuLeft < boundaryLeft && boundaryLeft - initialMenuLeft) ||
                    (initialMenuRight > boundaryRight && boundaryRight - initialMenuRight);
    if(offsetX) {
        btnsContainer.style.transform = `translateX(calc(-50% + ${offsetX}px))`;
        btnsContainer.querySelector('.btnscontainerrect-6e7730').style.transform = `translateX(calc(-50% - ${offsetX}px))`;
    }
}

function setBarragePanelTipFunc() {
    document.getElementById("barrage-panel-tip__+1").onclick = () => {
        const dom = document.getElementById("comment-higher-container");
        if (dom.getElementsByClassName("ex-image-danmaku").length > 0) {
            const textDom = dom.getElementsByClassName("text-879f3e")[0];
            sendBarrage(textDom.innerHTML.replace(/<a[^>]*><img\s+(?:.*?\s+)?src="(.*?)"[^>]*?\/?><\/a>/g, (match, src) => {
                return getImageDanmakuFromImgSrc(src);
            }));
        } else {
            sendBarrage(dom.innerText);
        }
    }
}
