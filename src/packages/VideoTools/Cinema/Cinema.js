function initPkg_VideoTools_Cinema() {
    initPkg_VideoTools_Cinema_Dom();
    initPkg_VideoTools_Cinema_Func();
}

function initPkg_VideoTools_Cinema_Dom() {
    Cinema_insertIcon();
}
function Cinema_insertIcon() {
	let a = document.createElement("div");
    a.id = "ex-cinema";
    a.innerHTML = `
    <div class="cinema__wrap">
        <div class="cinema__panel">
            <ul>
                <li id="cinema__default">默认</li>
                <li id="cinema__cover">剪裁</li>
                <li id="cinema__fill">拉伸</li>
            </ul>
        </div>
    </div>
    <svg t="1595353641060" class="icon" viewBox="0 0 1877 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11101" width="24" height="24"><path d="M1877.333333 1024H0V0h1877.333333v1024zM128 896h1621.333333v-768h-1621.333333v768z" p-id="11102" fill="#ffffff"></path><path d="M384 256C452.266667 256 512 315.733333 512 384S452.266667 512 384 512 256 452.266667 256 384 315.733333 256 384 256zM972.8 768c-8.533333 0-17.066667 0-25.6-8.533333-17.066667-8.533333-17.066667-25.6 0-34.133334l153.6-153.6c8.533333-8.533333 25.6-8.533333 42.666667 0l136.533333 68.266667 238.933333-187.733333c8.533333-8.533333 68.266667-51.2 102.4 0V768h-648.533333z" p-id="11103" fill="#ffffff"></path></svg>
    `;
    let b = document.getElementsByClassName("right-e7ea5d")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_Cinema_Func() {
	document.getElementById("ex-cinema").addEventListener("mouseover", function() {
        document.getElementsByClassName("cinema__wrap")[0].style.display = "block";
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementsByClassName("cinema__wrap")[0].addEventListener("mouseout", function() {
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });

    document.getElementById("cinema__default").addEventListener("click", () => {
        StyleHook_remove("Ex_Style_Cinema");
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });
    document.getElementById("cinema__cover").addEventListener("click", () => {
        setVideoCinemaMode("cover");
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });
    document.getElementById("cinema__fill").addEventListener("click", () => {
        setVideoCinemaMode("fill");
        document.getElementsByClassName("cinema__wrap")[0].style.display = "none";
    });

}

function setVideoCinemaMode(fit) {
    let video = document.querySelector(".layout-Player-videoEntity video");
    let newHeigth = String(parseInt(video.style.width) / 2.39) + "px";
    StyleHook_remove("Ex_Style_Cinema");
    let style = `
    .layout-Player-videoEntity video{object-fit:${ fit } !important;height:${ newHeigth } !important;}
    `;
    StyleHook_set("Ex_Style_Cinema", style);
}