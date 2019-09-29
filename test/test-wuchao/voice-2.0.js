// import './pcmdata.js';
// import './libamr-2.0.1.min.js';


const RongIMVoice = {
    /**
    * 初始化声音库
    */
    init() {
        if (this.isIE()) {
            var div = document.createElement("div");
            div.setAttribute("id", "flashContent");
            document.body.appendChild(div);
            var script = document.createElement("script");
            script.src = "https://cdn.ronghub.com/swfobject-2.0.0.min.js";
            var header = document.getElementsByTagName("head")[0];
            header.appendChild(script);
            setTimeout(function () {
                var swfVersionStr = "11.4.0";
                var flashvars = {};
                var params = {};
                params.quality = "high";
                params.bgcolor = "#ffffff";
                params.allowScriptAccess = "always";
                params.allowfullscreen = "true";
                var attributes = {};
                attributes.id = "player";
                attributes.name = "player";
                attributes.align = "middle";
                swfobject.embedSWF("https://cdn.ronghub.com/player-2.0.2.swf", "flashContent", "1", "1", swfVersionStr, null, flashvars, params, attributes);
            }, 200);
        }
        else {
            var list = ["https://cdn.ronghub.com/pcmdata-2.0.0.min.js", "https://cdn.ronghub.com/libamr-2.0.1.min.js"];
            for (var i = 0, len = list.length; i < len; i++) {
                var script = document.createElement("script");
                script.src = list[i];
                document.body.appendChild(script);
            }
        }
        this.isInit = true;
    },
    /**
    * 开始播放声音
    * @param data {string} amr 格式的 base64 码
    * @param duration {number} 播放大概时长 用 data.length / 1024
    */
    play(data, duration) {
        // this.checkInit("play");
        var me = this;
        if (me.isIE()) {
            console.log('this is IE');
            me.thisMovie().doAction("init", data);
        }
        else {
            var lastAudio = window.localStorage.getItem('lastAudio') || null;
            if (lastAudio) {
                if (lastAudio === data) {
                    if (me.element.ended) {
                        me.palyVoice(data);
                        me.onCompvared(duration);
                    } else {
                        me.stop();
                    }
                } else {
                    window.localStorage.setItem('lastAudio', data);
                    me.stop();
                    me.palyVoice(data);
                    me.onCompvared(duration);
                }
            } else {
                window.localStorage.setItem('lastAudio', data);
                me.palyVoice(data);
                me.onCompvared(duration);
            }
        }
    },
    /**
    * 停止播放声音
    */
    stop() {
        this.checkInit("stop");
        var me = this;
        if (me.isIE()) {
            me.thisMovie().doAction("stop");
        }
        else {
            if (me.element) {
                me.element.stop();
            }
        }
    },
    /**
    * 播放声音时调用的方法
    */
    onprogress() {
        this.checkInit("onprogress");
    },
    checkInit(postion) {
        if (!this.isInit) {
            throw new Error("RongIMVoice not initialized,postion:" + postion);
        }
    },
    thisMovie() {
        return eval("window['player']");
    },
    onCompvared(duration) {
        var me = this;
        var count = 0;
        var timer = setInterval(function () {
            count++;
            me.onprogress();
            if (count >= duration) {
                clearInterval(timer);
            }
        }, 1000);
        if (me.isIE()) {
            me.thisMovie().doAction("play");
        }
    },
    base64ToBlob(base64Data, type) {
        var mimeType;
        if (type) {
            mimeType = { type: type };
        }
        base64Data = base64Data.replace(/^(.*)[,]/, '');
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);      // 将base64解码
        var bytesLength = byteCharacters.length;    
        var slicesCount = Math.ceil(bytesLength / sliceSize);   // 字节长度除以1024得到千字节
        var byteArrays = new Array(slicesCount);
        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);
            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, mimeType);
    },
    palyVoice(base64Data) {
        var reader = new FileReader(), blob = this.base64ToBlob(base64Data, "audio/amr"), me = this;
        reader.onload = function() {
            var samples = new AMR({
                benchmark: true
            }).decode(reader.result);
            me.element = AMR.util.play(samples);
            // try {
            //     var ele = me.element,
            //         result = render.result;
            //     localStorage.setItem('lastAudio', JSON.stringify({ele: ele, result: base64Data}));
            // } catch(error) {
            //     throw error;
            // }
        };
        reader.readAsBinaryString(blob);
    },
    isIE() {
        return /Trident/.test(navigator.userAgent);
    }
};
