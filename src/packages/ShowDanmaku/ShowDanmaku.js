function initPkg_ShowDanmaku() {
    responseHook((url, text) => {
        if (url.indexOf("/betard") !== -1) {
            return text.replace('player_barrage\":0', 'player_barrage\":1');
        }
        return text;
    });
}

function initPkg_ShowDanmakuOriginAction() {
    scriptHook({
        url: "/firstqueue",
        callback: (content) => {
            let newContent = content;
            // 加一按钮
            newContent = newContent.replace(`if(s&&s.isOpenFireFBComment)`, `if(true)`);
            // 回复按钮
            newContent = newContent.replace(`if(A&&!this.isFireOpenRank(a))if(parseInt(A,10)&&M&&S>=R&&(!L||L&&I))`, `if(true)if(true) `);
            // 点赞按钮
            newContent = newContent.replace(`else if(1==+Object(m.B)("barrage_praise"))`, `if(true) `);
            return newContent;
        }
    });
}