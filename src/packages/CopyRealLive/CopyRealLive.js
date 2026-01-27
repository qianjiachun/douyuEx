function initPkg_CopyRealLive() {
    const subTitleContainer = getValidDom([".subTitleContainer__-vzhr", ".Title-col"])
    initPkg_CopyRealLive_Dom(subTitleContainer);
    initPkg_CopyRealLive_Func(subTitleContainer);
}

function initPkg_CopyRealLive_Dom(subTitleContainer) {
    if (!subTitleContainer.querySelector('#copy-real-live')) {
        subTitleContainer.insertAdjacentHTML(
            "beforeend",
            `<div class="Title-blockInline" id="copy-real-live">
                <div class="TitleShare">
                    <div class="TitleShare-shareBox">
                        <div class="Title-row-span is-right">
                            <span class="Title-row-icon ">
                                <svg t="1585641756842" class="icon" viewBox="0 0 1237 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5646" width="16" height="16">
                                    <path d="M648.448 946.347l0.256-1.622-0.256 1.622z m84.31 13.354c-0.769 4.608-0.769 4.608-4.182 13.483-8.533 16.768-8.533 16.768-49.835 22.784-24.149-14.293-24.149-14.293-27.605-22.613-2.475-5.718-2.475-5.718-3.541-9.387L476.416 335.36l-103.083 499.2c-1.109 5.12-1.109 5.12-4.821 13.27-6.827 12.117-6.827 12.117-35.285 22.527-30.294-7.253-30.294-7.253-38.742-19.37-4.522-8.15-4.522-8.15-6.058-13.227l-74.582-262.357H0v-85.334h278.272l45.781 161.11 104.022-503.424c1.024-4.694 1.024-4.694 4.394-12.502 6.102-11.989 6.102-11.989 35.968-23.338 31.83 8.533 31.83 8.533 39.254 20.736 4.053 7.808 4.053 7.808 5.376 12.544l165.888 609.237 113.92-716.885c0.896-5.248 0.896-5.248 4.864-14.592 9.088-15.574 9.088-15.574 44.928-22.4C868.48 12.587 868.48 12.587 873.6 22.443c3.285 6.912 3.285 6.912 4.523 11.52l112 446.549h221.738v85.333H923.563l-78.507-312.917-112.299 706.773z" p-id="5647"></path>
                                </svg>
                            </span>
                            <span class="Title-row-text">复制直播流</span>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
}

function CopyRealLive_getQn(qnName) {
    if (String(qnName).includes("蓝光8M")) return 8;
    if (String(qnName).includes("蓝光4M")) return 4;
    if (String(qnName).includes("超清")) return 3;
    if (String(qnName).includes("高清")) return 2;
    return 0;
}

function CopyRealLive_copyUrl(qn) {
    getRealLive_Douyu(rid, true, false, qn, (lurl) => {
        if (lurl == "None") {
            showMessage("房间未开播或其他错误", "error");
        } else {
            let str = String(lurl);
            // GM_setClipboard(String(lurl).replace("https", "http"));
            GM_setClipboard(str);
            showMessage("复制成功", "success");
        }
    })
}

function initPkg_CopyRealLive_Func(subTitleContainer) {
    subTitleContainer.querySelector('#copy-real-live').addEventListener("click", function() {
        const item = document.getElementsByClassName("selected-ab049e")[0];
        if (item && item.closest('.tipItem-e17801')) {
            CopyRealLive_copyUrl(CopyRealLive_getQn(item.textContent));
            return;
        }
        CopyRealLive_copyUrl(0);
    });

    let titNode = document.getElementsByClassName("RecommendViewTit-04ebd8");
    let tit = "";
    if (titNode.length > 0) {
        tit = titNode[0].innerText + "\n";
    }
}