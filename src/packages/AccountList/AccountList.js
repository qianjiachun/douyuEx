const ACCOUNTLIST_STORAGE_NAME = "Ex_accountList"
const ACCOUNT_NULL = `"[{"expirationDate":1645537043,"domain":".douyu.com","httpOnly":false,"secure":false,"session":false,"name":"Hm_lvt_4dc4fb0549a56fe03ba53c022b1ff455","path":"/","sameSite":"unspecified","value":"1613997905","hostOnly":false},{"expirationDate":1929361044,"domain":".douyu.com","httpOnly":false,"secure":false,"session":false,"name":"dy_did","path":"/","sameSite":"unspecified","value":"20c642d9cf8899405492523400011601","hostOnly":false},{"expirationDate":1929361044,"domain":"www.douyu.com","httpOnly":false,"secure":false,"session":false,"name":"acf_did","path":"/","sameSite":"unspecified","value":"20c642d9cf8899405492523400011601","hostOnly":true},{"expirationDate":1645537044,"domain":".douyu.com","httpOnly":false,"secure":false,"session":false,"name":"Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7","path":"/","sameSite":"unspecified","value":"1613883184,1613897106,1613997835,1613997850","hostOnly":false},{"domain":"www.douyu.com","httpOnly":true,"secure":false,"session":true,"name":"PHPSESSID","path":"/","sameSite":"unspecified","value":"lk6ts02j1ooac6jkmt4c2esju3","hostOnly":true},{"domain":".douyu.com","httpOnly":false,"secure":false,"session":true,"name":"Hm_lpvt_4dc4fb0549a56fe03ba53c022b1ff455","path":"/","sameSite":"unspecified","value":"1614001044","hostOnly":false},{"domain":".douyu.com","httpOnly":false,"secure":false,"session":true,"name":"Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7","path":"/","sameSite":"unspecified","value":"1614001044","hostOnly":false}]"`
let svg_accountList = `<svg t="1613993967937" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2122" width="16" height="16"><path d="M217.472 311.808l384.64 384.64-90.432 90.56-384.64-384.64z" fill="#8A8A8A" p-id="2123"></path><path d="M896.32 401.984l-384.64 384.64-90.56-90.496 384.64-384.64z" fill="#8A8A8A" p-id="2124"></path></svg>`

function initPkg_AccountList() {
    initPkg_AccountList_Dom();
    initPkg_AccountList_Func();
}

function initPkg_AccountList_Dom() {
    AccountList_insertIcon();
}

function AccountList_insertIcon() {
    let a = document.createElement("div");
    a.style = "position: absolute;right: -14px;top: 32px;cursor: pointer;"
    a.id = "ex-accountList-icon";
    let html = `
        <div id="ex-accountList-wrap" class="public-DropMenu-drop">
            <div class="public-DropMenu-drop-main">
                <div style="width: 300px;font-size: 14px;padding: 10px;">
                    ${getAccountListHtml()}
                </div>
            </div>
            <i></i>
        </div>
    `;
    a.innerHTML = svg_accountList + html;
    // a.innerHTML = svg_accountList + `<div id="ex-accountList-wrap" class="public-DropMenu-drop"><div class="public-DropMenu-drop-main"><div style="width: 300px;font-size: 14px;"></div></div><i></i></div>`;
    // a.title = "账号列表";
    let b = document.getElementsByClassName("Header-right")[0];
    b.appendChild(a);
}


function initPkg_AccountList_Func() {
    document.getElementById("ex-accountList-icon").addEventListener("mouseenter", () => {
        document.getElementById("ex-accountList-wrap").style.display = "block";
    });
    document.getElementById("ex-accountList-icon").addEventListener("mouseleave", () => {
        document.getElementById("ex-accountList-wrap").style.display = "block";
    });
    document.getElementById("ex-accountList-item-add").addEventListener("click", () => {
        // console.log(GM_listValues(ACCOUNTLIST_STORAGE_NAME));

        // GM_deleteValue(ACCOUNTLIST_STORAGE_NAME);
        // console.log(GM_listValues(ACCOUNTLIST_STORAGE_NAME));

        // switchAccount("null");
        // window.location.href = "https://passport.douyu.com/member/login";


        let lock = 0;
        GM_cookie("list", {
            path: "/"
        }, (cookies) => {
            if (cookies) {
                for (let i = 0; i < cookies.length; i++) {
                    GM_cookie("delete", {
                        name: cookies[i]["name"]
                    }, function (error) {
                        console.log(error || "del " + cookies[i]["name"]);
                        lock++;
                        if (lock >= cookies.length){
                            window.location.href = "https://passport.douyu.com/?exid=chun";
                        }
                    });
                }
            } else {
                window.location.href = "https://passport.douyu.com/?exid=chun";
            }
        });
    });
}

function getAccountListHtml() {
    addAccount()
    let ret = "";
    ret += `<div class="ex-accountList-item"></div>`;
    ret += `
    <div id="ex-accountList-item-add" class="ex-accountList-item" style="margin-bottom:0px;">
        <svg t="1613995373702" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2832" width="32" height="32"><path d="M577.088 0H448.96v448.512H0v128h448.96V1024h128.128V576.512H1024v-128H577.088z" p-id="2833" fill="#8A8A8A"></path></svg>
    </div>
    `;
    return ret;
}

function switchAccount(uid) {
    let list = JSON.parse(GM_getValue(ACCOUNTLIST_STORAGE_NAME));
    let l = list[uid]["data"];
    console.log("瞎比",l);
    let delock = 0;
    GM_cookie("list", { path: "/" }, function(cookies) {
        for(let i = 0; i < cookies.length; i++){
            GM_cookie("delete", {name: cookies[i]["name"]}, function(error) {
                delock++;
                if (delock >= cookies.length) {
                    let addlock = 0;
                    for(let i = 0; i < l.length; i++){
                        GM_cookie("set", {
                            name: l[i]['name'], 
                            value: l[i]['value'], 
                            domain: l[i]['domain'], 
                            path: l[i]['path'], 
                            secure: l[i]['secure'], 
                            httpOnly: l[i]['httpOnly'], 
                            sameSite: l[i]['sameSite'], 
                            expirationDate: l[i]['expirationDate'], 
                            hostOnly: l[i]['hostOnly']
                        }, function(error) {
                            addlock++;
                            if (addlock >= l.length) {
                                window.location.reload()
                            };
                        });
                    }
                };
            });
        }
    });
};

function addAccount() {
    let accountListData = JSON.parse(GM_getValue(ACCOUNTLIST_STORAGE_NAME) || "{}");
    let item = {};
    let uid = "";
    GM_cookie("list", { path: "/" }, function(cookies) {
        let c = [];
        for(let i = 0; i < cookies.length; i++) {
            let name = cookies[i]["name"];
            let value = cookies[i]["value"];
            if (name == "acf_nickname") {
                item.nickname = value;
            }
            if (name == "acf_uid") {
                item.uid = value;
                uid = value;
            }
            if (name == "acf_avatar") {
                item.avatar = value;
            }
            c.push(cookies[i]);
        }
        if (uid == "") {
            item.uid = "null";
            uid = "null";
        }
        item.data = c;
        item.ts = String(new Date().getTime());
        accountListData[uid] = item;
        console.log("芜湖！",accountListData)
        GM_setValue(ACCOUNTLIST_STORAGE_NAME, JSON.stringify(accountListData));
    });
};
