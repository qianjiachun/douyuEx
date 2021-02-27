/*
    Style Hook
    用于替换页面的原样式
    By 小淳
*/
function StyleHook_set(styleName, styleText) {
    // styleName：样式id名，建议以Ex_Style_大驼峰的形式命名
    if (document.getElementById(styleName) == null) {
        let styleElement = document.createElement("style");
        styleElement.id = styleName;
        styleElement.innerHTML = styleText;
        document.body.append(styleElement);
    }
}

function StyleHook_remove(styleName) {
    let e = document.getElementById(styleName);
    if (e !== null) {
        document.getElementById(styleName).remove();
    }
}

function StyleHook_setIframe(dom, styleName, styleText) {
    // styleName：样式id名，建议以Ex_Style_大驼峰的形式命名
    // document.getElementsByClassName("BottomGroup")[0].getElementsByTagName("iframe")[0].contentWindow.document
    if (dom.getElementById(styleName) == null) {
        let styleElement = dom.createElement("style");
        styleElement.id = styleName;
        styleElement.innerHTML = styleText;
        dom.body.append(styleElement);
    }
}

function StyleHook_removeIframe(dom, styleName) {
    let e = dom.getElementById(styleName);
    if (e !== null) {
        dom.getElementById(styleName).remove();
    }
}