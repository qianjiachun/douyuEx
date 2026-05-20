// ?????????????????????? HTML ?????
function PictureInPictureControl_getTemplate() {
    return `
        <style>
            html,body{margin:0;width:100%;height:100%;overflow:hidden;background:black;font-family: sans-serif;}
            #wrap{position:relative;width:100%;height:100%;display:flex;flex-direction:column;}
            #main-view{position:relative;flex:1;width:100%;overflow:hidden;}
            video{width:100%;height:100%;object-fit:contain;}
            #danmaku{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
            
            #pip-back-opener {
                position: absolute;
                top: 10px;
                right: -140px;
                left: auto;
                z-index: 10001;
                padding: 6px 12px;
                font-size: 15px;
                font-weight: 600;
                line-height: 1.25;
                color: #fff;
                background: rgba(0, 0, 0, 0.65);
                border: 1px solid rgba(255, 255, 255, 0.35);
                border-radius: 6px;
                cursor: pointer;
                font-family: "Microsoft YaHei", "SimHei", sans-serif;
                transition: right 0.3s, background 0.2s, border-color 0.2s;
                white-space: nowrap;
                user-select: none;
            }
            #pip-back-opener:hover {
                background: rgba(0, 0, 0, 0.88);
                border-color: rgba(255, 255, 255, 0.55);
            }
            #wrap:hover #pip-back-opener {
                right: 10px;
            }

            #combo-container {
                position: absolute;
                top: 6px;
                left: 6px;
                right: 6px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: flex-start;
                align-content: flex-start;
                gap: 4px;
                max-height: 44px;
                overflow: hidden;
                pointer-events: none;
                z-index: 9999;
            }
            .combo-item {
                background: rgba(0, 0, 0, 0.55);
                color: #fff;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
                line-height: 1.3;
                max-width: calc(50% - 4px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                border: 1px solid rgba(255, 193, 7, 0.45);
                text-shadow: 0 1px 2px #000;
                box-sizing: border-box;
            }
            .combo-item--more {
                max-width: none;
                flex-shrink: 0;
                color: #d4d4d8;
                border-color: rgba(255, 255, 255, 0.2);
                background: rgba(0, 0, 0, 0.4);
                font-size: 10px;
                font-weight: 500;
            }
            .combo-count {
                color: #ffeb3b;
                margin-left: 4px;
                font-weight: 700;
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
                    1px 0 1px rgba(0, 0, 0, 0.85),
                    -1px 0 1px rgba(0, 0, 0, 0.85),
                    0 1px 1px rgba(0, 0, 0, 0.85),
                    0 -1px 1px rgba(0, 0, 0, 0.85);
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
                width: 36px;
                height: 36px;
                min-width: 36px;
                min-height: 36px;
                padding: 0;
                box-sizing: border-box;
                flex-shrink: 0;
                border: 2px solid #FFF;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #00000094;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s;
                margin: 5px 0;
            }

            .pip-btn img,
            .pip-btn svg {
                display: block;
                width: 24px;
                height: 24px;
                color: #fff;
            }

            .pip-btn:hover {background:#000000c4;}
            .pip-btn-danmaku {
                position: relative;
                font-size: 15px;
                font-weight: 700;
                color: #fff;
                line-height: 1;
                font-family: "Microsoft YaHei", "SimHei", sans-serif;
            }
            .pip-btn-danmaku.is-off {
                opacity: 0.65;
                border-color: #999;
                color: #ccc;
            }
            .pip-btn-danmaku.is-off::after {
                content: "";
                position: absolute;
                left: 18%;
                top: 50%;
                width: 64%;
                height: 2px;
                background: rgba(255, 255, 255, 0.95);
                transform: translateY(-50%) rotate(-45deg);
                border-radius: 1px;
                pointer-events: none;
            }
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
                <div id="pip-back-opener"></div>
                <div id="pip-btns">
                    <div id="pip-reload" class="pip-btn pip-btn-reload">${PIP_BTN_SVG_RELOAD}</div>
                    <div id="pip-danmaku-toggle" class="pip-btn pip-btn-danmaku"></div>
                    <div id="pip-set" class="pip-btn">${icon_pipcontrol_set}</div>
                    <div id="pip-send" class="pip-btn">${icon_pipcontrol_send}</div>
                </div>
                <video id="pip-video" autoplay muted playsinline></video>
                <div id="danmaku"></div>
                <div id="combo-container"></div>
                <div id="pip-toast"></div>
            </div>
            
            <div id="input-panel">
                <input type="text" id="pip-input-field" placeholder="" maxlength="50" autocomplete="off" />
                <button id="pip-submit-btn" type="button"></button>
            </div>
        </div>
    `;
}