let currentBrightness = "";
let currentContrast = "";
let currentSaturate = "";
let liveVideoParentClassName = "";
let isMirror = false;
let rotateAngle = 0;
let transformCss = {
    rotateY: "",
    rotate: "",
    scale: "",
}
let panorama = null;

function initPkg_VideoTools_Filter() {
    liveVideoParentClassName = liveVideoNode.parentNode.className;
    initPkg_VideoTools_Filter_Dom();
    initPkg_VideoTools_Filter_Func();
}

function initPkg_VideoTools_Filter_Dom() {
    Filter_insertIcon();
}

function Filter_insertIcon() {
    let a = document.createElement("div");
    a.id = "ex-filter";
    a.innerHTML = `
    <div class="filter__wrap">
        <div class="filter__panel">
            <div class="filter__bright">
                <span class="filter__title">明亮度</span>
                <div class="filter__scroll" id="scroll__bright">
                    <div class="filter__scroll-bar" id="bar__bright"></div>
                    <div class="filter__scroll-mask" id="mask__bright"></div>
                </div>
            </div>
            <div class="filter__contrast">
                <span class="filter__title">对比度</span>
                <div class="filter__scroll" id="scroll__contrast">
                    <div class="filter__scroll-bar" id="bar__contrast"></div>
                    <div class="filter__scroll-mask" id="mask__contrast"></div>
                </div>
            </div>
            <div class="filter__saturate">
                <span class="filter__title">饱和度</span>
                <div class="filter__scroll" id="scroll__saturate">
                    <div class="filter__scroll-bar" id="bar__saturate"></div>
                    <div class="filter__scroll-mask" id="mask__saturate"></div>
                </div>
            </div>
            <div class="filter__filter">
                <p style="color:white;float:left;line-height:20px">滤镜</p>
                <select class="c3-4f78e3" id="filter__select">
                    <option class="option-b5745c" value="default">无</option>
                    <option class="option-b5745c" value="1977">1977</option>
                    <option class="option-b5745c" value="Aden">Aden</option>
                    <option class="option-b5745c" value="Amaro">Amaro</option>
                    <option class="option-b5745c" value="Brannan">Brannan</option>
                    <option class="option-b5745c" value="Brooklyn">Brooklyn</option>
                    <option class="option-b5745c" value="Claredon">Claredon</option>
                    <option class="option-b5745c" value="Earlybird">Earlybird</option>
                    <option class="option-b5745c" value="Gingham">Gingham</option>
                    <option class="option-b5745c" value="Hudson">Hudson</option>
                    <option class="option-b5745c" value="Inkwell">Inkwell</option>
                    <option class="option-b5745c" value="Lofi">Lofi</option>
                    <option class="option-b5745c" value="Maven">Maven</option>
                    <option class="option-b5745c" value="Perpetua">Perpetua</option>
                    <option class="option-b5745c" value="Reyes">Reyes</option>
                    <option class="option-b5745c" value="Stinson">Stinson</option>
                    <option class="option-b5745c" value="Toaster">Toaster</option>
                    <option class="option-b5745c" value="Walden">Walden</option>
                    <option class="option-b5745c" value="Valencia">Valencia</option>
                    <option class="option-b5745c" value="Xpro2">Xpro2</option>
                </select>
            </div>
            <ul style="clear:both">
                <li id="filter__reset2">重置</li>
            </ul>
        </div>
    </div>
    <svg t="1598941324196" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3146" width="24" height="24"><path d="M921.6 766.634667L257.365333 102.4a68.266667 68.266667 0 0 0-96.597333 0L102.4 160.768a68.266667 68.266667 0 0 0 0 96.597333L766.634667 921.6a68.266667 68.266667 0 0 0 96.597333 0L921.6 863.232a68.266667 68.266667 0 0 0 0-96.597333zM139.605333 199.338667l59.733334-59.733334A13.312 13.312 0 0 1 208.896 136.533333a13.653333 13.653333 0 0 1 9.898667 4.096l83.968 82.944-79.189334 79.189334-83.968-83.968a13.653333 13.653333 0 0 1 0-19.456z m744.789334 625.322666l-59.733334 59.733334a13.312 13.312 0 0 1-9.557333 4.096 13.653333 13.653333 0 0 1-9.898667-4.096L262.144 341.333333 341.333333 262.144l543.061334 543.061333a13.653333 13.653333 0 0 1 0 19.456zM230.058667 589.824l-50.517334 92.501333-92.842666 50.858667 92.842666 50.517333 50.517334 92.842667 50.517333-92.842667 92.842667-50.517333-92.842667-50.858667-50.517333-92.501333zM541.013333 270.336l31.061334-57.344 57.344-31.402667-57.344-31.402666-31.061334-57.002667-31.402666 57.002667-57.344 31.402666 57.344 31.402667 31.402666 57.344zM827.392 377.173333l21.162667-38.912L887.466667 317.098667l-38.912-21.504-21.162667-38.912-21.504 38.912-38.570667 21.504 38.570667 21.162666 21.504 38.912z" p-id="3147" fill="#ffffff"></path></svg>
    `;
    let b = getValidDom([".right-e7ea5d", ".right-17e251"]);
    b.insertBefore(a, b.childNodes[0]);

    b = document.getElementsByClassName("menu-da2a9e")[0];

    let domPanorama = document.createElement("li");
    domPanorama.id = "filter__panorama";
    domPanorama.innerText = "全景";
    b.insertBefore(domPanorama, b.childNodes[1]);

    let domMirror = document.createElement("li");
    domMirror.id = "filter__mirror";
    domMirror.innerText = "镜像画面";
    b.insertBefore(domMirror, b.childNodes[1]);

    let domRotate = document.createElement("li");
    domRotate.id = "filter__rotate";
    domRotate.innerText = "旋转画面";
    b.insertBefore(domRotate, b.childNodes[1]);

    let domReset = document.createElement("li");
    domReset.id = "filter__reset";
    domReset.innerText = "重置";
    b.insertBefore(domReset, b.childNodes[1]);

    let domDivider = document.createElement("div");
    domDivider.className = "divider-f9d33d";
    b.insertBefore(domDivider, b.childNodes[1]);
}

function initPkg_VideoTools_Filter_Func() {
    document.onmouseup = function () {
        document.onmousemove = null; //弹起鼠标不做任何操作
    }
    setScrollFunc(document.getElementById("scroll__bright"), document.getElementById("bar__bright"), document.getElementById("mask__bright"), (data) => {
        currentBrightness = `brightness(${ data }%)`;
        liveVideoNode.style.filter = `${ currentBrightness } ${ currentContrast } ${ currentSaturate }`;
    });
    setScrollFunc(document.getElementById("scroll__contrast"), document.getElementById("bar__contrast"), document.getElementById("mask__contrast"), (data) => {
        currentContrast = `contrast(${ data }%)`;
        liveVideoNode.style.filter = `${ currentBrightness } ${ currentContrast } ${ currentSaturate }`;
    });
    setScrollFunc(document.getElementById("scroll__saturate"), document.getElementById("bar__saturate"), document.getElementById("mask__saturate"), (data) => {
        currentSaturate = `saturate(${ data }%)`;
        liveVideoNode.style.filter = `${ currentBrightness } ${ currentContrast } ${ currentSaturate }`;
    });

    const filterButton = document.getElementById("ex-filter");
    const filterPanel = document.getElementsByClassName("filter__wrap")[0];
    let overPanel = false;
    let timeout = null;

    filterButton.addEventListener("mouseover", function () {
        if (timeout) clearTimeout(timeout);
        filterPanel.style.display = "block";
        timeout = setTimeout(() => {
            if(!overPanel) {
                filterPanel.style.display = "none";
            }
        }, 1500);
    });

    filterPanel.addEventListener("mouseover", function() {
        overPanel = true;
    })
    filterPanel.addEventListener("mouseleave", function () {
        setTimeout(() => {
            filterPanel.style.display = "none"
            overPanel = false;
        }, 500);
    });
    
    document.getElementById("filter__reset").addEventListener("click", () => {
        resetVideoFilter();
    });
    document.getElementById("filter__reset2").addEventListener("click", () => {
        resetVideoFilter();
    });
    document.getElementById("filter__mirror").addEventListener("click", () => {
        if (!isMirror) {
            isMirror = true;
            transformCss.rotateY = "rotateY(180deg)";
        } else {
            isMirror = false;
            transformCss.rotateY = "rotateY(0deg)";
        }
        liveVideoNode.parentNode.style.transition = "all .5s";
        liveVideoNode.parentNode.style.transform = transformCss.rotateY + " " + transformCss.rotate + " " + transformCss.scale;
    });

    document.getElementById("filter__rotate").addEventListener("click", () => {
        rotateAngle += 90;
        transformCss.rotate = `rotate(${String(rotateAngle)}deg)`;
        liveVideoNode.parentNode.style.transition = "all .5s";
        if ((rotateAngle/90) % 2 !== 0) {
            if (window.innerWidth > window.innerHeight) {
                transformCss.scale = "scale(" + String(liveVideoNode.videoHeight / liveVideoNode.videoWidth) + ")";
            } else {
                transformCss.scale = "scale(" + String(liveVideoNode.videoWidth / liveVideoNode.videoHeight) + ")";
            }
        } else {
            transformCss.scale = "";
        }
        liveVideoNode.parentNode.style.transform = transformCss.rotateY + " " + transformCss.rotate + " " + transformCss.scale;
    });

    document.getElementById("filter__select").onchange = function() {
        let option = this.options[this.selectedIndex].text;
        switch (option) {
            case "default":
                StyleHook_remove("Ex_Style_Filter")
                break;
            case "1977":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(110%)brightness(110%)saturate(130%);filter:contrast(110%)brightness(110%)saturate(130%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:screen;background:rgba(243,106,188,0.3);z-index:10}`)
                break;
            case "Aden":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(120%)saturate(85%)hue-rotate(20deg);filter:contrast(90%)brightness(120%)saturate(85%)hue-rotate(20deg)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:darken;background:-webkit-linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(66,10,14,0));background:linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(66,10,14,0));z-index:10}`)
                break;  
            case "Amaro":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(110%)saturate(150%)hue-rotate(-10deg);filter:contrast(90%)brightness(110%)saturate(150%)hue-rotate(-10deg)}`)
                break;
            case "Brannan":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(140%)sepia(50%);filter:contrast(140%)sepia(50%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:lighten;background:rgba(161,44,199,0.31);z-index:10}`)
                break;
            case "Brooklyn":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(110%);filter:contrast(90%)brightness(110%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:overlay;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(168,223,193,0.4)1,rgba(183,196,200,0.2));background:radial-gradient(50%50%,circle closest-corner,rgba(168,223,193,0.4)1,rgba(183,196,200,0.2));z-index:10}`)
                break;   
            case "Claredon":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(120%)saturate(125%);filter:contrast(120%)saturate(125%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:overlay;background:rgba(127,187,227,0.2);z-index:10}`)
                break;
            case "Earlybird":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)sepia(20%);filter:contrast(90%)sepia(20%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:overlay;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(208,186,142,1)20,rgba(29,2,16,0.2));background:radial-gradient(50%50%,circle closest-corner,rgba(208,186,142,1)20,rgba(29,2,16,0.2));z-index:10}`)
                break;
            case "Gingham":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:brightness(105%)hue-rotate(350deg);filter:brightness(105%)hue-rotate(350deg)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:darken;background:-webkit-linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(0,0,0,0));background:linear-gradient(to right,rgba(66,10,14,0.2)1,rgba(0,0,0,0));z-index:10}`)
                break;  
            case "Hudson":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(90%)brightness(120%)saturate(110%);filter:contrast(90%)brightness(120%)saturate(110%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:multiply;opacity:0.5;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(255,177,166,1)50,rgba(52,33,52,1));background:radial-gradient(50%50%,circle closest-corner,rgba(255,177,166,1)50,rgba(52,33,52,1));z-index:10}`)
                break;
            case "Inkwell":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(110%)brightness(110%)sepia(30%)grayscale(100%);filter:contrast(110%)brightness(110%)sepia(30%)grayscale(100%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;background:rgba(0,0,0,0);z-index:10}`)
                break;
            case "Lofi":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(150%)saturate(110%);filter:contrast(150%)saturate(110%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:multiply;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(0,0,0,0)70,rgba(34,34,34,1));background:radial-gradient(50%50%,circle closest-corner,rgba(0,0,0,0)70,rgba(34,34,34,1));z-index:10}`);
                break;   
            case "Maven":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(95%)brightness(95%)saturate(150%)sepia(25%);filter:contrast(95%)brightness(95%)saturate(150%)sepia(25%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:hue;background:rgba(3,230,26,0.2);z-index:10}`)
                break;
            case "Perpetua":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:soft-light;opacity:0.5;background:-webkit-linear-gradient(to bottom,rgba(0,91,154,1)1,rgba(61,193,230,0));background:linear-gradient(to bottom,rgba(0,91,154,1)1,rgba(61,193,230,0));z-index:10}`)
                break;
            case "Reyes":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(85%)brightness(110%)saturate(75%)sepia(22%);filter:contrast(85%)brightness(110%)saturate(75%)sepia(22%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:soft-light;opacity:0.5;background:rgba(173,205,239,1);z-index:10}`)
                break;  
            case "Stinson":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(75%)brightness(115%)saturate(85%);filter:contrast(75%)brightness(115%)saturate(85%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:soft-light;background:rgba(240,149,128,0.2);z-index:10}`)
                break;
            case "Toaster":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(150%)brightness(90%);filter:contrast(150%)brightness(90%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:screen;opacity:0.5;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(15,78,128,1)1,rgba(59,0,59,1));background:radial-gradient(50%50%,circle closest-corner,rgba(15,78,128,1)1,rgba(59,0,59,1));z-index:10}`)
                break;
            case "Walden":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:brightness(110%)saturate(160%)sepia(30%)hue-rotate(350deg);filter:brightness(110%)saturate(160%)sepia(30%)hue-rotate(350deg)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:screen;opacity:0.3;background:rgba(204,68,0,1);z-index:10}`)
                break;   
            case "Valencia":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:contrast(108%)brightness(108%)sepia(8%);filter:contrast(108%)brightness(108%)sepia(8%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:exclusion;opacity:0.5;background:rgba(58,3,57,1);z-index:10}`)
                break;
            case "Xpro2":
                setVideoFilter(`.${ liveVideoParentClassName }{position:relative;-webkit-filter:sepia(30%);filter:sepia(30%)}.${ liveVideoParentClassName }::before{content:"";display:block;height:100%;width:100%;top:0;left:0;position:absolute;pointer-events:none;mix-blend-mode:color-burn;background:-webkit-radial-gradient(50%50%,circle closest-corner,rgba(224,231,230,1)40,rgba(43,42,161,0.6));background:radial-gradient(50%50%,circle closest-corner,rgba(224,231,230,1)40,rgba(43,42,161,0.6));z-index:10}`)
                break;
            default:
                StyleHook_remove("Ex_Style_Filter")
                break;
        }
    }

    document.getElementById("filter__panorama").addEventListener("click", () => {
        let tmp = document.getElementById("ex-panorama");
        if (tmp) {
            tmp.remove();
            panorama = null;
        } else {
            let node = document.getElementById("__h5player");
            let dom = document.createElement("div");
            dom.id = "ex-panorama";
            dom.style = "width:100%;height:100%;z-index:1;background:black;"
            node.insertBefore(dom, node.childNodes[0]);
            panorama = new PanoramaVideo(dom, liveVideoNode);
            panoramaAnimation(panorama);
        }
    })
}

function resetVideoFilter() {
    StyleHook_remove("Ex_Style_Filter");
    document.getElementById("filter__select").selectedIndex = 0;
    liveVideoNode.style.filter = "";
    rotateAngle = 0;
    transformCss = {
        rotateY: "",
        rotate: "",
        scale: "",
    }
    liveVideoNode.parentNode.style.transform = "";
    document.getElementById("bar__bright").style.left = "100px";
    document.getElementById("bar__contrast").style.left = "100px";
    document.getElementById("bar__saturate").style.left = "100px";

    document.getElementById("mask__bright").style.width = "100px";
    document.getElementById("mask__contrast").style.width = "100px";
    document.getElementById("mask__saturate").style.width = "100px";

    // 重置全景
    let domPanorama = document.getElementById("ex-panorama");
    if (domPanorama) {
        domPanorama.remove();
        panorama = null;
    }

    // 重置缩放
    let domVideoWrap = document.getElementsByClassName("layout-Player-videoEntity")[0];
    domVideoWrap.style.transform = "";
    domVideoWrap.style.transformOrigin = "";
    videoScale = 1;

    // 重置影院模式
    StyleHook_remove("Ex_Style_Cinema");

    // 重置视频倍速
    liveVideoNode.playbackRate = 1;
}

function panoramaAnimation(panorama) {
    requestAnimationFrame(() => {
        panoramaAnimation(panorama)
    })
    panorama.update();
}

function setVideoFilter(style) {
    // liveVideoNode.style.filter = text;
    // liveVideoNode.style.webkitFilter = text;
    StyleHook_remove("Ex_Style_Filter");
    StyleHook_set("Ex_Style_Filter", style);
    document.getElementsByClassName("filter__wrap")[0].style.display = "none";
}

function setScrollFunc(scrollDom, barDom, maskDom, callback) {
    let scroll = scrollDom;
    let bar = barDom;
    let mask = maskDom;
    let barleft = 0;
    bar.onmousedown = function (e) {
        let event = e || window.event;
        let leftVal = event.clientX - this.offsetLeft;
        let that = this;
        // 拖动一定写到 down 里面才可以
        document.onmousemove = function (e) {
            let event = e || window.event;
            barleft = event.clientX - leftVal;
            if (barleft < 0)
                barleft = 0;
            else if (barleft > scroll.offsetWidth - bar.offsetWidth)
                barleft = scroll.offsetWidth - bar.offsetWidth;
            mask.style.width = barleft + 'px';
            that.style.left = barleft + "px";
            callback(parseInt(barleft / (scroll.offsetWidth - bar.offsetWidth) * 255));

            //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
}