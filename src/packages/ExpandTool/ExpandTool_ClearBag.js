function initPkg_ExpandTool_ClearBag() {
    ExpandTool_ClearBag_insertDom();
    ExpandTool_ClearBag_insertFunc();
}

function ExpandTool_ClearBag_insertDom() {
    let html = "";
    html += '<label>背包送礼：[速度并不快,间隔>0.1s]</label><a id="extool__clearbag_showid" style="margin-left:10px;color:blue;" href="javascript:void(0);">礼物id示例</a><br />';
    html += '<label>礼物ID：</label><input id="extool__clearbag_id" type="text" style="width:50px;text-align:center;margin-right:10px;" value="268" />';
    html += '<label>数量：</label><input id="extool__clearbag_cnt" type="text" style="width:30px;text-align:center;" value="1" />';
    html += '<input style="margin-left:10px;" type="button" id="extool__clearbag_sendbtn" value="送出" />';
    // html += '<input style="width:60px;margin-left:10px;" type="button" id="extool__clearbag_clearbtn" value="清空背包" />';
    let a = document.createElement("div");
    a.className = "extool__clearbag";
    a.innerHTML = html;
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_ClearBag_insertFunc() {
    document.getElementById("extool__clearbag_sendbtn").addEventListener("click", async function() {
        if (confirm("确认送出？") != true) {
            return;
        }
        let id = document.getElementById("extool__clearbag_id").value;
        let n = Number(document.getElementById("extool__clearbag_cnt").value);
        showMessage("【背包送礼】执行中...", "info");
        for (let i = 0; i < n; i++) {
            await sleep(100).then(() => {
                sendGift_bag(id, 1, rid).then(data => {
                    if (data.msg != "success") {
                        showMessage("【背包送礼】" + rid + "赠送失败 " + data.msg, "error");
                        console.log(rid, data);
                    }
                }).catch(err => {
                    showMessage("【背包送礼】" + rid + "赠送失败", "error");
                    console.log(rid, err);
                })
            })
            
        }
        showMessage("【背包送礼】执行完毕！", "success");
    });
    // document.getElementById("extool__clearbag_clearbtn").addEventListener("click", function() {
    //     if (confirm("确认清空？") != true) {
    //         return;
    //     }
    //     showMessage("【清空背包】执行中...", "info");
    //     getBagGifts(rid, (ret) => {
    //         clearBagGifts(ret, rid);
    //     })
    // });
    document.getElementById("extool__clearbag_showid").addEventListener("click", function() {
        getBagGifts(rid, (ret) => {
            let chunkNum = ret.data.list.length;
            if (chunkNum > 0) {
                for (let i = 0; i < chunkNum; i++) {
                    let gift_id = ret.data.list[i].id;
                    let gift_name = ret.data.list[i].name;
                    console.log("【" + gift_name + "】 id:" + gift_id);
                }
                showMessage("请按F12到控制台(console)查看背包礼物id", "success");
            } else {
                showMessage("背包礼物为空", "error");
            }
        });
    });
}

function getBagGifts(room_id, callback) {
    // 获取背包内所有礼物信息(json)，传给回调函数
    fetch('https://www.douyu.com/japi/prop/backpack/web/v1?rid=' + room_id, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
    }).then(result => {
        return result.json();
    }).then(ret => {
        callback(ret);
    }).catch(err => {
        console.log("请求失败!", err)
    })
}