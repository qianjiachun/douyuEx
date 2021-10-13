// 获取斗鱼视频站post body sign
// -By 小淳
// 用法: let dyVideoSign = new DyVideoSign("视频point_id"); let sign = dyVideoSign.getSign();
// 注意: 使用完记得将实例null，point_id为window.$DATA.ROOM.point_id

class DyVideoSign {
    constructor(pointId) {
        this.pointId = pointId;
        this.decoder = new TextDecoder();
    }
    
    getSign() {
        let did = "10000000000000000000000000001501"; // DEFAULT_DID$1
        let tt = parseInt((new Date).getTime() / 1e3, 10);
        return unsafeWindow[this.d539fa2cf7732d2a(256042, "9f4f419501570ad13334")](this.pointId, did, tt);
    }

    d539fa2cf7732d2a(e, t) {
        for (var n = CryptoJS.MM(e.toString()).toString(), r = n[0].charCodeAt(0), a = n[16].charCodeAt(0), i = [], o = 0; o < 4; o++) i[o] = r << 24 | r << 16 | r << 8 | r, i[o + 4] = a << 24 | a << 16 | a << 8 | a;
        var s = Math.floor(t.length / 16) % 4,
            l = [],
            d = t.length % 8,
            c = Math.floor(t.length / 8);
        for (o = 0; o < c; o++) l[o] = 255 & parseInt(t.substr(8 * o, 2), 16) | parseInt(t.substr(8 * o + 2, 2), 16) << 8 & 65280 | parseInt(t.substr(8 * o + 4, 2), 16) << 24 >>> 8 | parseInt(t.substr(8 * o + 6, 2), 16) << 24;
        var p = [];
        p = 0 == s ? e86500e2(l, i) : 1 == s ? this.c30070a4(l, i) : d831eb20(l, i);
        var h = [];
        for (o = 0; o < p.length; o++) {
            var f = 255 & p[o],
                u = p[o] >>> 8 & 255,
                m = p[o] >>> 16 & 255,
                g = p[o] >>> 24 & 255;
            f && h.push(f), u && h.push(u), m && h.push(m), g && h.push(g)
        }
        var b = Math.floor(d / 2);
        for (o = 0; o < b; o++) h.push(255 & parseInt(t.substr(8 * c + 2 * o, 2), 16));
        return this.decoder.decode(new Uint8Array(h))
    }

    c30070a4(e, t) {
        for (var n = Math.floor(e.length / 2), r = e.slice(0), a = 0; a < n; a++) {
            var i = this.f5a40d76(e.slice(2 * a, 2 * a + 2), 32, t.slice(4 * a % 8, 4 * a % 8 + 4));
            r[2 * a + 0] = i[0], r[2 * a + 1] = i[1]
        }
        return r
    }

    f5a40d76(e, t, n) {
        for (var r = 0; r < e.length; r += 2) {
            var a, i = e[r],
                o = e[r + 1],
                s = 2654435769 * t;
            for (a = 0; a < t; a++) i -= ((o -= (i << 4 ^ i >>> 5) + i ^ s + n[s >>> 11 & 3]) << 4 ^ o >>> 5) + o ^ (s -= 2654435769) + n[3 & s];
            e[r] = i, e[r + 1] = o
        }
        return e
    }
}
