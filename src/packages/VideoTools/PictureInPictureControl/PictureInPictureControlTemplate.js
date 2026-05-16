// 返回画中画独立窗口内部结构及对应控制器的完整 HTML 字符串模板
function PictureInPictureControl_getTemplate() {
    return `
        <style>
            html,body{margin:0;width:100%;height:100%;overflow:hidden;background:black;font-family: sans-serif;}
            #wrap{position:relative;width:100%;height:100%;display:flex;flex-direction:column;}
            #main-view{position:relative;flex:1;width:100%;overflow:hidden;}
            video{width:100%;height:100%;object-fit:contain;}
            #danmaku{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
            
            #combo-container {
                position: absolute;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                pointer-events: none;
                z-index: 9999;
            }
            .combo-item {
                background: rgba(0, 0, 0, 0.75);
                color: #fff;
                padding: 4px 14px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                white-space: nowrap;
                border: 1px solid rgba(255, 193, 7, 0.7);
                text-shadow: 1px 1px 2px #000;
            }
            .combo-count {
                color: #ffeb3b;
                font-style: italic;
                margin-left: 6px;
                display: inline-block;
                transform: scale(1.1);
            }

            .dm{
                position:absolute;
                white-space:nowrap;
                will-change:transform;
                box-sizing: border-box;
                font-weight: 700;
                line-height: 1.2;
                font-family: "SimHei", "Microsoft YaHei", "Arial Black", "Segoe UI Historic", sans-serif;
                text-shadow: 
                    -1px -1px 0 #000,  1px -1px 0 #000, -1px  1px 0 #000,  1px  1px 0 #000,
                    -1px  0px 0 #000,  1px  0px 0 #000,  0px -1px 0 #000,  0px  1px 0 #000,
                     0px  0px 2px rgba(0,0,0,0.8);
            }
            
            .dm-self {
                background-color: rgba(0, 0, 0, 0.35);
                border: 1px solid #00ff66 !important;
                padding: 2px 8px;
                border-radius: 4px;
                box-shadow: 0 0 4px rgba(0, 255, 102, 0.4), inset 0 0 4px rgba(0, 255, 102, 0.15);
            }

            #pip-btns{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                justify-content: center;
                left: -50px;
                padding: 4px;
                z-index: 1000;
                transition: all 0.3s;
                flex-direction: column;
            }

            .pip-btn {
                border: 2px solid #FFF;
                border-radius: 50%;
                display: flex;
                align-content: center;
                justify-content: center;
                padding: 4px;
                background: #00000094;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s;
                margin: 5px 0;
            }

            .pip-btn:hover {background:#000000c4;}
            #wrap:hover #pip-btns {left:10px}

            #pip-toast{
                position:absolute;
                left:50%;top:50%;
                transform:translate(-50%,-50%);
                background:rgba(0,0,0,.75);
                color:#fff;
                padding:10px 16px;
                border-radius:10px;
                font-size:14px;
                z-index:99999;
                opacity:0;
                transition:opacity .3s;
                pointer-events:none;
                text-align:center;
            }
            #pip-toast.show{opacity:1;}

            #input-panel {
                display: none;
                background: #18181c;
                padding: 8px 12px;
                box-sizing: border-box;
                border-top: 1px solid #2f2f35;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                position: absolute;
                bottom: 0;
                width: 100%;
            }
            #input-panel.active {
                display: flex;
            }
            #pip-input-field {
                flex: 1;
                background: #2a2a30;
                border: 1px solid #3f3f46;
                border-radius: 6px;
                color: #fff;
                padding: 6px 10px;
                font-size: 14px;
                outline: none;
            }
            #pip-input-field:focus {
                border-color: #ff5d23;
            }
            #pip-submit-btn {
                background: #ff5d23;
                color: #fff;
                border: none;
                padding: 6px 14px;
                border-radius: 6px;
                font-size: 14px;
                cursor: pointer;
                font-weight: bold;
                transition: background 0.2s;
            }
            #pip-submit-btn:hover {
                background: #e04e1b;
            }
        </style>

        <div id="wrap">
            <div id="main-view">
                <div id="pip-btns">
                    <div id="pip-set" class="pip-btn">${icon_pipcontrol_set}</div>
                    <div id="pip-send" class="pip-btn">${icon_pipcontrol_send}</div>
                </div>
                <video id="pip-video" autoplay muted playsinline></video>
                <div id="danmaku"></div>
                <div id="combo-container"></div>
                <div id="pip-toast"></div>
            </div>
            
            <div id="input-panel">
                <input type="text" id="pip-input-field" placeholder="发条弹幕吧..." maxlength="50" autocomplete="off" />
                <button id="pip-submit-btn">发送</button>
            </div>
        </div>
    `;
}