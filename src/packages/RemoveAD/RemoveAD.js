function initPkg_RemoveAD() {
    let t = setInterval(() => {
        let a = document.getElementsByClassName("PlayerToolbar-wealthNum")[0];
        if (a != undefined) {
            removeAD();
            clearInterval(t);
        }
    }, 1000);
	removeAD();
}

function removeAD() {
    let a;
    a = document.getElementsByClassName("recommendAD-54569e")[0]; // 左
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("recommendApp-0e23eb")[0]; // 右
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("Title-ad")[0]; // 分享左
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("Bottom-ad")[0]; // 鱼吧ad
    if (a != undefined) {
        a.style.display = "none";
    }
    a = document.getElementsByClassName("SignBarrage")[0];
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("corner-ad-495ade")[0];
    if (a != undefined) {
        a.remove();
    }
    a = document.getElementsByClassName("SignBaseComponent-sign-ad");
    if (a != undefined) {
        for (let i = 0; i < a.length; i++) {
            // a[i].style.display = "none";
            a[i].remove();
        }
    }
    a = document.getElementsByClassName("SuperFansBubble")[0];
    if (a != undefined) {
        a.remove();
    }
    // a = document.getElementsByClassName("js-room-activity")[0];
    // if (a != undefined) {
    //     a.remove();
    // }
    
}