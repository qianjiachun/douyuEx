let timeout;
function initPkg_BagInfo() {
	initPkg_BagInfo_Func();
}

function initPkg_BagInfo_Func() {
    let backpackDom = getValidDom([".BackpackButton", "#js-backpack-enter"])
    if (!backpackDom) {
        return;
    }
	backpackDom.addEventListener("click", function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const isBeta = !!document.getElementsByClassName("BackpackExpandPanel")[0];
            if (getValidDom([".Backpack.JS_Backpack", ".BackpackExpandPanel"])) {
                getBagGifts(rid, (ret) => {
                    let chunkNum = ret.data.list.length;
                    if (chunkNum > 0) {
                        let totalPrice = 0;
                        let totalIntimate = 0;
                        for (let i = 0; i < chunkNum; i++) {
                            let chunk = getValidDomList([".Backpack-prop", ".ToolbarBackpack-giftItem"])[i];
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
                            if (isBeta) {
                                expiryDiv.style.left = "8px";
                                expiryDiv.style.bottom = "auto";
                            }
                            expiryDiv.innerHTML = expiry - 1;
                            chunk.insertBefore(expiryDiv, chunk.childNodes[0]);
                        }
                        const headerDom = getValidDom([".BackpackHeader-extInfo", ".BackpackExpandPanel-backpackHeader"]);
                        if (isBeta) {
                            headerDom.innerHTML = headerDom.innerHTML + 
                            `<span style="width: 100%;display: flex;justify-content: space-between;align-items: center;flex: 1;margin-left: 12px;">
                                <span>
                                    <span>总价值:</span>
                                    <span>￥${String(Number(totalPrice / 100).toFixed(2))}</span>
                                    <span>总亲密度:</span>
                                    <span>${String(totalIntimate)}</span>
                                </span>
                                <span class="bag-button" id="Backpack__clearbag" style="background: rgb(70, 171, 255) !important;color: white !important;">清空背包</span>
                            </span>`
                        } else {
                            headerDom.innerHTML = `<span style="float: left">` + "总价值：" + String(Number(totalPrice / 100).toFixed(2)) + " 总亲密度：" + String(totalIntimate) + `<span class="bag-button" id="Backpack__clearbag">清空背包</span></span>` + headerDom.innerHTML;
                        }
                        
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