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
            newContent = newContent.replace(`if(c&&c.isOpenFireFBComment)`, `if(true)`);
            // 回复按钮
            newContent = newContent.replace(`if(z&&!this.isFireOpenRank(s))if(parseInt(z,10)&&W&&M>=U&&(!G||G&&B))`, `if(true)if(true) `);
            // 点赞按钮
            newContent = newContent.replace(`else if(1==+Object(r.A)("barrage_praise"))`, `if(true) `);
            return newContent;
        }
    });
}