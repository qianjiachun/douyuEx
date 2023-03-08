let timeout;
function initPkg_BagInfo() {
	initPkg_BagInfo_Func();
}

function initPkg_BagInfo_Func() {
    let backpackDom = document.getElementsByClassName("BackpackButton")[0];
    if (!backpackDom) {
        return;
    }
	document.getElementsByClassName("BackpackButton")[0].addEventListener("click", function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (document.getElementsByClassName("Backpack JS_Backpack").length > 0) {
                getBagGifts(rid, (ret) => {
                    let chunkNum = ret.data.list.length;
                    if (chunkNum > 0) {
                        let totalPrice = 0;
                        let totalIntimate = 0;
                        for (let i = 0; i < chunkNum; i++) {
                            let chunk = document.getElementsByClassName("Backpack-prop")[i];
                            let isValuable = ret.data.list[i].isValuable; // 判断是否是有价值的礼物
                            let expiry = ret.data.list[i].expiry; // 过期时间
                            let price = ret.data.list[i].price; // 注意这个要除100才是真实价格，否则是亲密度
                            let intimate = ret.data.list[i].intimate; // 亲密度
                            let count = ret.data.list[i].count; // 数量
                            if (isValuable == "1") {
                                totalPrice = totalPrice + Number(price) * Number(count);
                            }
                            totalIntimate = totalIntimate + Number(intimate) * Number(count);
                            let expiryDiv = document.createElement("div");
                            expiryDiv.className = "bag-info";
                            expiryDiv.innerHTML = expiry - 1;
                            chunk.insertBefore(expiryDiv, chunk.childNodes[0]);
                        }
                        let html = document.getElementsByClassName("BackpackHeader-extInfo")[0].innerHTML;
                        document.getElementsByClassName("BackpackHeader-extInfo")[0].innerHTML = `<span style="float: left">` + "总价值：" + String(Number(totalPrice / 100).toFixed(2)) + " 总亲密度：" + String(totalIntimate) + `<span class="bag-button" id="Backpack__clearbag">清空背包</span></span>` + html;
                        
                        document.getElementById("Backpack__clearbag").addEventListener("click", () => {
                            if (confirm("确认清空？") != true) {
                                return;
                            }
                            showMessage("【清空背包】执行中...", "info");
                            getBagGifts(rid, (ret) => {
                                clearBagGifts(ret, rid);
                            })
                        })

                    }
                });
            }
        }, 500);
    });
}

async function clearBagGifts(bagGiftsJson, room_id) {
    // 赠送背包内所有的礼物
    let chunkNum = bagGiftsJson.data.list.length;
    if (chunkNum > 0) {
        for (let i = 0; i < chunkNum; i++) {
            let gift_id = bagGiftsJson.data.list[i].id;
            let gift_cnt = bagGiftsJson.data.list[i].count;
            if (Object.keys(bagGiftsJson.data.list[i].batchInfo).length > 0) {
                await sleep(100).then(() => {
                    sendGift_bag(gift_id, gift_cnt, room_id);
                })
            } else {
                for (let j = 0; j < gift_cnt; j++) {
                    await sleep(100).then(() => {
                        sendGift_bag(gift_id, 1, room_id);
                    })
                }
            }
        }
        showMessage("【清空背包】执行完毕！", "success");
    } else {
        showMessage("背包礼物为空", "error");
    }
}