// https://blog.csdn.net/hongszh/article/details/104354252
/**
 * options:
 *  - width: 视频宽度
 *  - height: 视频高度
 *  - fontSize: 字体大小
 *  - color: 字体颜色
 *  - alpha: 字体透明度 0~256
 *  - stayTime: 弹幕停留时间
 */
class ASS {
    constructor(options) {
        let defaultOptions = {
            width: 1920,
            height: 1080,
            fontSize: 36,
            alpha: this._prefixInteger(Number(0).toString(16), 2), // 0~255 0不透明 255全透明
            stayTime: 10,
            title: "Default"
        };
        this.options = {
            ...defaultOptions,
            ...options,
            ...options ? options.alpha ? this._prefixInteger(this.options.alpha.toString(16), 2) : {} : {},
        };

        this.lines = 20; // 弹幕行数
        this.lineBase = this.options.height / this.lines; // 每行高度
        this.currentLine = 0; // 当前行数
        this.diffTime = 1500; // 如果上下两条在n秒内连续发送，就换行
    }

    generate(list) {
        /**
         * list<Array>: 
         *  - time: 时间，单位毫秒
         *  - txt: 文本
         *  - color: 颜色
         */
        let sortList = list.sort((a, b) => {
            return a.time - b.time;
        })
        let result = this._getScriptInfo() + this._getV4Styles() + this._getEvents();
        for (let i = 0; i < sortList.length; i++) {
            if (i > 0 && sortList[i].time - sortList[i-1].time <= this.diffTime) {
                this.currentLine++;
            } else {
                this.currentLine = 0;
            }
            if (this.currentLine >= this.lines) {
                this.currentLine = 0;
            }
            let item = sortList[i];
            let endTime = Number(item.time) + Number(this.options.stayTime) * 1000;
            let heightOffset = this.lineBase * this.currentLine + this.options.fontSize;
            let fontWidth = this.options.fontSize * item.txt.length;
            result += `Dialogue: 0,${formatSeconds2(Number(item.time)/1000)}.00,${formatSeconds2(endTime/1000)}.00,Color${item.color},,0,0,0,,{\\move(${this.options.width + fontWidth},${heightOffset},${-fontWidth},${heightOffset})}${item.txt}\n`;
        }
        return result;
    }

    _prefixInteger(num, length) {
        num = '' + num;
        return Array(length + 1 - num.length).join('0') + num;
    }

    _getScriptInfo() {
        return `[Script Info]
; DouyuEx -By qianjiachun
; https://github.com/qianjiachun/douyuEx
ScriptType: v4.00+
Title: ${this.options.title}
PlayResX: ${this.options.width}
PlayResY: ${this.options.height}
`
    }

    _getV4Styles() {
        return `
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Color0,黑体,${this.options.fontSize},&H${this.options.alpha}FFFFFF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color7,黑体,${this.options.fontSize},&H${this.options.alpha}5456FF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color8,黑体,${this.options.fontSize},&H${this.options.alpha}2375FF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color9,黑体,${this.options.fontSize},&H${this.options.alpha}B369FE,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color10,黑体,${this.options.fontSize},&H${this.options.alpha}00BCFF,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color11,黑体,${this.options.fontSize},&H${this.options.alpha}46C978,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color12,黑体,${this.options.fontSize},&H${this.options.alpha}FF7F9E,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
Style: Color13,黑体,${this.options.fontSize},&H${this.options.alpha}FF9B3D,&H80000000,&H80000000,&H80000000,0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,134
`
    }

    _getEvents() {
        return `
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`
    }
}