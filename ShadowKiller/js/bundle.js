(function () {
    'use strict';

    window.JJSdkConf = {
        app_key : 'f5afdd5bda97fdb0f351a74e8ba1f640',                       // appkey
        req_domain : 'https://api.jiujiuhuyu.com',                          // 请求地址
        version : '1.0.0',                                                  // 小游戏版本号
        get_location : false,                                               // 是否获取用户地理位置
        share_success_time : 3,                                             // 秒,分享大于该时间认定为成功
        storage_req_queue : 'jiujiu_req_queue',                             // 请求缓存队列
        storage_req_queue_max_len : 50,                                     // 请求缓存队列最大长度，前端可根据游戏实际存储调整大小
        is_submit_click_event: false                                        // 是否上报点击事件
    };

    if (window["wx"] != null) {
    "use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){function e(){this.concurrency=4,this.queue=[],this.tasks=[],this.active_count=0;var e=this;this.push=function(a){this.tasks.push(new Promise(function(t,n){var o=function(){e.active_count++,a().then(function(e){t(e);}).then(function(){e.next();});};e.active_count<e.concurrency?o():e.queue.push(o);}));},this.all=function(){return Promise.all(this.tasks)},this.next=function(){e.active_count--,e.queue.length>0&&e.queue.shift()();};}function a(){try{return wx.getStorageSync("jiu_open_id")}catch(e){}return !1}function t(){return new Promise(function(e,t){var n=a();n?e(n):wx.login({success:function(a){a.code?wx.request({url:window.JJSdkConf.req_domain+"/minigame/login",data:{code:a.code,app_key:window.JJSdkConf.app_key},success:function(a){if(0===a.data.code){try{wx.setStorageSync("jiu_open_id",a.data.data);}catch(e){}e(a.data.data);}else t("获取用户OpenId失败，"+a.data.msg);}}):t("登录失败！"+a.errMsg);}});})}function n(){return new Promise(function(e,a){wx.getNetworkType({success:function(a){e(a);},fail:function(){e("");}});})}function o(){return window.JJSdkConf.get_location?new Promise(function(e,a){wx.getLocation({success:function(a){e(a);},fail:function(){e("");}});}):""}function r(){return new Promise(function(e,a){try{e(wx.getSystemInfoSync());}catch(e){}e("");})}function i(e){e.app_key=window.JJSdkConf.app_key,e.req_time=Date.now(),e.data.launch_param=g,t().then(function(a){e.open_id=a,-1!==l.indexOf(e.event+"_"+e.behavior)?u(e):s(e);},function(e){console.error(e);});}function d(e,a){try{var t=wx.getStorageSync(e);t="object"!==w(t)?[]:t;}catch(e){}if("object"===w(t)&&t.length>0){var n=t.filter(function(t){return e===window.JJSdkConf.storage_req_queue+"_banner_show"?t.event===a.event&&t.behavior===a.behavior&&t.data.pageName===a.data.pageName&&t.data.adUnitId===a.data.adUnitId:e===window.JJSdkConf.storage_req_queue+"_icon_click"?t.event===a.event&&t.behavior===a.behavior&&t.data.id===a.data.id:e===window.JJSdkConf.storage_req_queue+"_rewardedVideo_click"?t.event===a.event&&t.behavior===a.behavior&&t.data.adUnitId===a.data.adUnitId&&t.data.isEnded===a.data.isEnded:e===window.JJSdkConf.storage_req_queue+"_share_share"?t.event===a.event&&t.behavior===a.behavior&&t.data.id===a.data.id&&t.data.active===a.data.active:e===window.JJSdkConf.storage_req_queue+"_event_event"&&(t.event===a.event&&t.behavior===a.behavior&&t.data.name===a.data.name&&JSON.stringify(t.data.param)===JSON.stringify(a.data.param))});"object"===w(n)&&1===n.length?n[0].data.num+=1:t.push(a);}else t.push(a);try{wx.setStorageSync(e,t);}catch(e){}return t.length}function u(e){if(d(window.JJSdkConf.storage_req_queue+"_"+e.event+"_"+e.behavior,e)>=window.JJSdkConf.storage_req_queue_max_len)try{var a=wx.getStorageSync(window.JJSdkConf.storage_req_queue+"_"+e.event+"_"+e.behavior);for(var t in a)s(a[t]);wx.setStorageSync(window.JJSdkConf.storage_req_queue+"_"+e.event+"_"+e.behavior,[]);}catch(e){console.error(e);}}function s(e){function a(){return new Promise(function(a,t){wx.request({url:window.JJSdkConf.req_domain+"/count",data:e,method:"GET",fail:function(){t("");},success:function(e){a(200==e.statusCode?"":"status error");}});})}wx.JJReqQueue.push(a);}function c(){for(var e in l){var a=wx.getStorageSync(window.JJSdkConf.storage_req_queue+"_"+l[e]);for(var t in a)s(a[t]);wx.setStorageSync(window.JJSdkConf.storage_req_queue+"_"+l[e],[]);}}function v(){var e=window.JJSdkConf.version,a=wx.getAccountInfoSync();return a.miniProgram.version&&(e=a.miniProgram.version),e}function f(e){for(var a in e)if("object"==_typeof(e[a])&&null!==e[a])return !0;return !1}function w(e){function a(e){return Object.prototype.toString.call(e)}var t={};return "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(e,a){t["[object "+e+"]"]=e.toLowerCase();}),function(){return null==e?e:"object"==(void 0===e?"undefined":_typeof(e))||"function"==typeof e?t[a.call(e)]||"object":void 0===e?"undefined":_typeof(e)}()}function h(){function e(e){return !/^\d+(.\d+)*$/.test(e.stageId)||e.stageId.length>32||isNaN(Number(e.stageId))?(console.warn("关卡stageId必须符合传参规则,请参考文档。"),!1):!("string"!==w(e.stageName)||e.stageName.length>32)||(console.warn("关卡名称为必传字段,且长度小于32个字符,请参考文档"),!1)}var a=0;this.onStart=function(t){if(e(t)){a=Date.now();var n={data:{}};n.data.stageInitTime=Date.now(),n.data.stageId=t.stageId,n.data.stageName=t.stageName,n.event="stage",n.behavior="start",i(n);}},this.onRunning=function(a){if(e(a)){if("string"!==w(a.event)&&-1===m.join(",").indexOf(a.event+","))return void console.warn("关卡running状态中仅支持"+m.join(",")+"事件类型，且为必传字段，详情请参考文档。");if("object"!==w(a.params))return void console.warn("关卡running状态中params为必传字段，且该字段需为Object类型，详情请参考文档。");if("string"!==w(a.params.itemName)||a.params.itemName.length>32)return void console.warn("道具/商品名称为必传字段，且长度小于32个字符，详情请参考文档");var t={data:{}};t.event="stage",t.behavior="running",t.data=a,"number"!==w(a.params.itemCount)&&(t.data.params.itemCount=1),-1!==a.event.indexOf("pay")&&"number"!==w(a.params.itemMoney)&&(t.data.params.itemMoney=0),i(t);}},this.onEnd=function(t){if(e(t)){if(void 0===t.event||-1===_.join(",").indexOf(t.event+","))return void console.warn("关卡结束事件仅支持"+_.join(",")+",且为必传字段。详情请参考文档");var n={data:{}};n.event="stage",n.behavior="end",n.data=t,0!==a&&(n.data.stage_take_time=Date.now()-a),i(n);}};}var g=wx.getLaunchOptionsSync(),l=["banner_show","icon_click","rewardedVideo_click","share_share","event_event"];void 0===wx.JJReqQueue&&(wx.JJReqQueue=new e,wx.JJReqQueue.all()),function(){return void 0===window.JJSdkConf&&console.error("jiujiu_sdk_conf.js必须放置在jiujiu_sdk.js、jiujiu_pull_sdk.js之前"),Promise.all([n(),o(),r()])}().then(function(e){var a={data:{}};a.event="init",a.behavior="init",a.data.nt=e[0]?e[0].networkType||"":"",a.data.lat=e[1]?e[1].latitude||"":"",a.data.lnt=e[1]?e[1].longitude||"":"",a.data.spd=e[1]?e[1].speed||"":"",a.data.wvv=e[2]?e[2].fontSizeSetting:"",a.data.wsdk=e[2]?e[2].SDKVersion:"",a.data.br=e[2]?e[2].brand||"":"",a.data.md=e[2]?e[2].model||"":"",a.data.pr=e[2]?e[2].pixelRatio:"",a.data.sw=e[2]?e[2].screenWidth:"",a.data.sh=e[2]?e[2].screenHeight:"",a.data.ww=e[2]?e[2].windowWidth:"",a.data.wh=e[2]?e[2].windowHeight:"",a.data.lg=e[2]?e[2].language:"",a.data.wv=e[2]?e[2].version:"",a.data.sv=e[2]?e[2].system:"",a.data.bh=e[2]?e[2].benchmarkLevel:"",a.data.gv=v(),i(a);});var p=Date.now();wx.onShow(function(e){p=Date.now();var a={data:{}};a.event="onShow",a.behavior="onShow",a.data.scene=e.scene,a.data.query=e.query,a.data.shareTicket=e.shareTicket,a.data.referrerInfo=e.referrerInfo,i(a);}),wx.onHide(function(e){c();var a={data:{}};a.event="onHide",a.behavior="onHide",a.data.game_time=Date.now()-p,i(a);}),wx.onError(function(e){var a={data:{}};a.event="onError",a.behavior="onError",a.data=e,i(a);});var m=["payStart","paySuccess","payFail","die","revive","tools","award"],_=["complete","fail"];wx.JJStage=new h;for(var J={JJSendIconExposure:function(e){var a={data:{}};a.data=e(),a.event="icon",a.behavior="show",i(a);},JJNavigateToMiniProgram:function(e){var a={data:{}};return a.data=e(),"object"!==w(a.data)?void console.error("统计: 打开小游戏参数必须为Object类型"):void 0===a.data.id||"number"!==w(a.data.id)?void console.error("统计：打开小游戏参数必须包含创意id"):"string"!==w(a.data.appId)||void 0===a.data.appId?void console.error("统计： 打开小游戏参数appid错误"):"string"!==w(a.data.path)||void 0===a.data.path?void console.error("统计： 打开小游戏参数path错误"):(a.event="icon",a.behavior="click",a.data.num=1,window.JJSdkConf.is_submit_click_event&&i(a),new Promise(function(e,t){wx.navigateToMiniProgram({appId:a.data.appId,path:a.data.path?a.data.path:"",extraData:a.data.extraData?a.data.extraData:"",envVersion:a.data.envVersion?a.data.envVersion:"release",success:function(t){a.behavior="jump",i(a),e(t);},fail:function(e){t(e);}});}))},JJBannerAdShowCount:function(e){var a={data:{}};return a.data=e(),"object"!==w(a.data)?void console.error("统计: JJBannerAdShowCount参数必须为Object类型"):void 0===a.data.adUnitId||"string"!==w(a.data.adUnitId)?void console.error("统计：JJBannerAdShowCount必须传入adUnitId参数"):void 0===a.data.adUnitName||"string"!==w(a.data.adUnitName)?void console.error("统计：JJBannerAdShowCount必须传入adUnitName参数"):void 0===a.data.pageName||"string"!==w(a.data.pageName)?void console.error("统计：JJBannerAdShowCount必须传入pageName参数"):(a.event="banner",a.behavior="show",a.data.num=1,void i(a))},JJSendVideoAdCount:function(e){var a={data:{}};return a.data=e(),"object"!==_typeof(a.data)?void console.error("发送激励视频数据参数必须为对象"):void 0===a.data.adUnitId?void console.error("发送激励视频数据参数必须包含广告位ID"):void 0===a.data.adUnitName?void console.error("发送激励视频数据参数必须包含广告位名称"):void 0===a.data.isEnded?void console.error("发送激励视频数据参数必须包含用户是否观看完整标识(isEnded)"):(a.event="rewardedVideo",a.behavior="click",a.data.num=1,void i(a))},JJShareAppMessage:function(e){var t=Date.now(),n={data:{}};n.data=e();var o="",r=a();o=void 0!==n.data.query?n.data.query+"&jiu_share_src="+r:"jiu_share_src="+r,n.data.query=o,n.event="share",n.behavior="share",n.data.active=1,n.data.num=1;var d=n.data;return i(n),wx.shareAppMessage(n.data),new Promise(function(e,a){wx.onShow(function(a){if(Date.now()-t>=1e3*window.JJSdkConf.share_success_time){var n={data:{}};n.event="share",n.behavior="success",n.data=d,i(n),e(!0);}else e(!1);});})},JJOnShareAppMessage:function(e){wx.onShareAppMessage(function(){var t={data:{}};t.data=e();var n="",o=a();return n=void 0!==t.data.query?t.data.query+"&jiu_share_src="+o:"jiu_share_src="+o,t.data.query=n,t.event="share",t.behavior="share",t.data.active=0,t.data.num=1,i(t),e()});},JJSendEvent:function(e){var a={data:{}};return a.event="event",a.behavior="event",a.data=e(),"object"!=_typeof(a.data)?void console.error("事件参数必须是Object类型"):""===a.data.name||"string"!=typeof a.data.name||a.data.name.length>255?void console.error("事件名称必须为String类型且不能超过255个字符"):JSON.stringify(a.data).length>=255?void console.error("自定义事件参数不能超过255个字符"):void 0!==a.data.param&&f(a.data.param)?void console.error("事件参数，参数内部只支持Number,String等类型，请参考接入文档"):(a.data.num=1,void i(a))}},S=["JJSendIconExposure","JJNavigateToMiniProgram","JJBannerAdShowCount","JJSendVideoAdCount","JJShareAppMessage","JJOnShareAppMessage","JJSendEvent"],b=S.length-1;b>=0;b--)!function(e,a){Object.defineProperty(wx,e,{value:a,writable:!1,enumerable:!0,configurable:!0});}(S[b],J[S[b]]);}();
    }

    "use strict";!function(){function n(n){var e="?";for(var o in n)e+=o+"="+n[o]+"&";return e}function e(e,o,i){return new Promise(function(r,d){var a=new XMLHttpRequest;a.withCredentials=!0,a.onreadystatechange=function(){4===a.readyState&&200==a.status&&r(JSON.parse(a.responseText));},a.onerror=function(n){d("");},a.ontimeout=function(n){d("");},a.open(e,o+n(i),!1),a.send();})}!function(){void 0===window.JJSdkConf&&console.error("jiujiu_sdk_conf.js必须放置在jiujiu_sdk.js、jiujiu_pull_sdk.js之前");}();for(var o={JJGameConfigs:function(){return e("GET",window.JJSdkConf.req_domain+"/game/configs",{version:window.JJSdkConf.version,app_key:window.JJSdkConf.app_key})},JJGameConfigByKeys:function(n){return e("GET",window.JJSdkConf.req_domain+"/get/configs/by/keys",{version:window.JJSdkConf.version,app_key:window.JJSdkConf.app_key,config_key:n})},JJGameShares:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e("GET",window.JJSdkConf.req_domain+"/game/shares",{app_key:window.JJSdkConf.app_key,p_code:n})},JJGameAds:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e("GET",window.JJSdkConf.req_domain+"/ads",{app_key:window.JJSdkConf.app_key,position_id:n})},JJGetGameConfigAdShare:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o={};return n&&(o=n()),o.app_key=window.JJSdkConf.app_key,o.version=window.JJSdkConf.version,void 0===o.version?void console.error("配置三合一接口必须小游戏传递版本号"):e("GET",window.JJSdkConf.req_domain+"/batch/configs",o)}},i=["JJGameConfigs","JJGameConfigByKeys","JJGameShares","JJGameAds","JJGetGameConfigAdShare"],r=i.length-1;r>=0;r--)!function(n,e){Object.defineProperty(window,n,{value:e,writable:!1,enumerable:!0,configurable:!0});}(i[r],o[i[r]]);}();

    class CustomAdMgr {
        constructor() {
            this.gridIdArr = [];
            this.gridAdArr = [];
            this.totalCount = 1;
            this.createIndex = 0;
            this.showTimes = 0;
            this.currentIndex = 0;
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new CustomAdMgr();
            }
            return this._instance;
        }
        get sysInfo() {
            return window['wx'].getSystemInfoSync();
        }
        initCustomAd() {
            this.gridIdArr = JJMgr.instance.dataConfig.front_more_gezi_list;
            if (!this.gridIdArr) {
                return;
            }
            this.showTimes = 0;
            this.currentIndex = 0;
            this.createIndex = 0;
            this.gridIdArr = JJMgr.instance.shuffleArr(this.gridIdArr);
            this.totalCount = this.gridIdArr.length;
            this.createCustomAd();
        }
        getCustomAd(id, style, onLoadCB = null, errorCB = null) {
            let gridAd = Laya.Browser.window['wx'].createCustomAd({ adUnitId: id, adIntervals: JJMgr.instance.dataConfig.front_more_gezi_time / 1000, style: style });
            gridAd.onError((res) => {
                console.log('全屏格子加载失败');
                errorCB && errorCB();
                gridAd.offError();
                gridAd.offLoad();
            });
            gridAd.onLoad(() => {
                onLoadCB && onLoadCB();
                gridAd.offError();
                gridAd.offLoad();
            });
            return gridAd;
        }
        createCustomAd() {
            if (this.createIndex >= this.gridIdArr.length || this.gridAdArr.length >= this.totalCount) {
                return;
            }
            let style = { left: 0, top: 70 };
            let customAd = this.getCustomAd(this.gridIdArr[this.createIndex], style, () => {
                this.gridAdArr.push(customAd);
                this.createIndex++;
                this.createCustomAd();
            }, () => {
                this.createIndex++;
                this.createCustomAd();
            });
        }
        showGrid() {
            if (Laya.Browser.onWeiXin && this.getIsError()) {
                this.initCustomAd();
                return;
            }
            if (Laya.Browser.onWeiXin && this.gridAdArr.length > 0) {
                this.gridAdArr[this.currentIndex].show();
                this.showTimes++;
            }
        }
        hideGrid() {
            if (Laya.Browser.onWeiXin && this.gridAdArr.length > 0) {
                this.gridAdArr[this.currentIndex].hide();
                if (this.showTimes >= JJMgr.instance.dataConfig.front_more_gezi_refresh_num) {
                    this.showTimes = 0;
                    this.currentIndex++;
                    if (this.currentIndex >= this.gridAdArr.length) {
                        this.currentIndex = 0;
                    }
                }
            }
        }
        getIsError() {
            return this.gridAdArr.length <= 0;
        }
        getIsShow() {
            if (this.gridAdArr.length <= 0)
                return false;
            return this.gridAdArr[this.currentIndex].isShow();
        }
    }

    var AppConfig = {
        wechat: {
            videoAdUnitId: ["adunit-4f7fe046b8fd4a96"],
            interstitialAdUnitId: ["adunit-1318ed63a0585809"],
            customAd: ["adunit-cbd22053d04a6f0a", "adunit-de625c20fcc846ef"],
            finishCustomAd: ["adunit-86e79a5d3f546ab7"]
        },
    };

    class FinishCustomAdMgr {
        constructor() {
            this.gridIdArr = [];
            this.gridAdArr = [];
            this.totalCount = 1;
            this.createIndex = 0;
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new FinishCustomAdMgr();
            }
            return this._instance;
        }
        get sysInfo() {
            return window['wx'].getSystemInfoSync();
        }
        initCustomAd() {
            if (!Laya.Browser.onWeiXin) {
                return;
            }
            this.gridIdArr = AppConfig.wechat.finishCustomAd;
            this.totalCount = 1;
            this.createIndex = 0;
            this.createCustomAd();
        }
        getCustomAd(id, style, onLoadCB = null, errorCB = null) {
            let gridAd = Laya.Browser.window['wx'].createCustomAd({ adUnitId: id, adIntervals: JJMgr.instance.dataConfig.front_more_gezi_time / 1000, style: style });
            gridAd.onError((res) => {
                console.log('结算格子加载失败');
                errorCB && errorCB();
                gridAd.offError();
                gridAd.offLoad();
            });
            gridAd.onLoad(() => {
                onLoadCB && onLoadCB();
                gridAd.offError();
                gridAd.offLoad();
            });
            return gridAd;
        }
        createCustomAd() {
            if (this.createIndex >= this.gridIdArr.length || this.gridAdArr.length >= this.totalCount) {
                return;
            }
            let style = { left: 0, top: this.sysInfo.screenHeight / 2 - 220, width: this.sysInfo.screenWidth };
            let customAd = this.getCustomAd(this.gridIdArr[this.createIndex], style, () => {
                this.gridAdArr.push(customAd);
                this.createIndex++;
                this.createCustomAd();
            }, () => {
                this.createIndex++;
                this.createCustomAd();
            });
        }
        showGrid() {
            if (Laya.Browser.onWeiXin && this.getIsError()) {
                this.initCustomAd();
                return;
            }
            if (Laya.Browser.onWeiXin && this.gridAdArr.length > 0) {
                this.gridAdArr[0].show();
            }
        }
        hideGrid() {
            if (Laya.Browser.onWeiXin && this.gridAdArr.length > 0) {
                this.gridAdArr[0].hide();
            }
        }
        getIsError() {
            return this.gridAdArr.length <= 0;
        }
    }

    class JJWxBannerAd {
        constructor() {
            this.bannerAdArr = [];
            this.bannerTimeArr = [];
            this.bannerErrorArr = [];
            this.bannerCountArr = [];
            this.currentIndex = 0;
            this.indexTime = 0;
        }
        static get Instance() {
            if (!JJWxBannerAd._instance) {
                JJWxBannerAd._instance = new JJWxBannerAd;
            }
            return JJWxBannerAd._instance;
        }
        get sysInfo() {
            if (!this._sysInfo) {
                this._sysInfo = wx["getSystemInfoSync"]();
            }
            return this._sysInfo;
        }
        initAd(bannerIds = []) {
            this.bannerIds = [];
            this.bannerIds = this.bannerIds.concat(bannerIds);
            this.showBanner = this.showBannerFun;
            this.hideBanner = this.hideBannerFun;
            this.createBannerAd();
        }
        createBannerAd() {
            if (!Laya.Browser.onWeiXin)
                return;
            this.bannerAdArr = [];
            this.bannerTimeArr = [];
            this.bannerErrorArr = [];
            this.currentIndex = 0;
            for (let i = 0; i < this.bannerIds.length; i++) {
                this.bannerErrorArr.push(false);
                this.bannerTimeArr.push(0);
                this.bannerCountArr.push(0);
                let bannerAd = this.getBannerAd(i);
                this.bannerAdArr.push(bannerAd);
            }
        }
        getBannerAd(index, isRand = false) {
            let bannerAd = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: isRand ? JJMgr.instance.getRandomItemInArr(this.bannerIds) : this.bannerIds[index],
                style: {
                    top: this.sysInfo.screenHeight * 0.8,
                    width: 10,
                    left: this.sysInfo.screenWidth / 2 - 150
                },
                adIntervals: JJMgr.instance.dataConfig.front_banner_auto_refresh_time / 1000
            });
            bannerAd.onError(() => {
                console.log('banner加载失败：', index);
                this.bannerErrorArr[index] = true;
            });
            bannerAd.onLoad(() => { this.bannerErrorArr[index] = false; });
            bannerAd.onResize(() => {
                bannerAd.style.top = this.sysInfo.screenHeight - bannerAd.style.realHeight;
                bannerAd.style.left = this.sysInfo.screenWidth / 2 - bannerAd.style.realWidth / 2;
            });
            return bannerAd;
        }
        getIsAllError() {
            let isAllError = true;
            for (let i = 0; i < this.bannerErrorArr.length; i++) {
                if (!this.bannerErrorArr[i]) {
                    isAllError = false;
                    break;
                }
            }
            return isAllError;
        }
        showBannerFun() {
            if (!Laya.Browser.onWeiXin)
                return false;
            if (this.currentIndex >= this.bannerAdArr.length)
                this.currentIndex = 0;
            if (this.bannerCountArr[this.currentIndex] >= JJMgr.instance.dataConfig.front_banner_refresh_num) {
                this.bannerCountArr[this.currentIndex] = 0;
                this.currentIndex++;
                console.log('切换id:', this.currentIndex);
                if (this.currentIndex >= this.bannerAdArr.length)
                    this.currentIndex = 0;
            }
            let hasBanner = false;
            for (let i = 0; i < this.bannerErrorArr.length; i++) {
                if (this.bannerErrorArr[i] == false) {
                    hasBanner = true;
                    break;
                }
            }
            for (let i = 0; i < this.bannerErrorArr.length; i++) {
                if (this.bannerErrorArr[this.currentIndex]) {
                    this.bannerTimeArr[this.currentIndex] = 0;
                    this.bannerCountArr[this.currentIndex] = 0;
                    this.bannerAdArr[this.currentIndex] = this.getBannerAd(this.currentIndex);
                    this.currentIndex++;
                    if (this.currentIndex >= this.bannerAdArr.length) {
                        this.currentIndex = 0;
                    }
                }
                else {
                    break;
                }
            }
            this.hideBannerFun();
            if (this.bannerAdArr[this.currentIndex]) {
                this.bannerAdArr[this.currentIndex].show();
                this.bannerCountArr[this.currentIndex]++;
            }
            Laya.timer.clear(this, this.updateBannerTime);
            Laya.timer.loop(100, this, this.updateBannerTime);
            return true;
        }
        showBannerFun2() {
            this.hideBannerFun();
            this.showBannerFun();
        }
        showBannerFun2Fun() {
            this.showBannerFun();
        }
        hideBannerFun(clear) {
            if (!Laya.Browser.onWeiXin)
                return;
            Laya.timer.clear(this, this.updateBannerTime);
            for (let i = 0; i < this.bannerAdArr.length; i++) {
                this.bannerAdArr[i] && this.bannerAdArr[i].hide();
            }
            if (clear) {
                this.hideBannerFun2();
            }
        }
        hideBannerFun2() {
        }
        checkBannerTimeOut() {
            if (!Laya.Browser.onWeiXin)
                return;
            let front_banner_refresh_time = JJMgr.instance.dataConfig.front_banner_refresh_time;
            if (!JJWxTrap.Instance.NewWuchu2) {
                front_banner_refresh_time = 30000;
            }
            if (this.bannerTimeArr[this.currentIndex] >= front_banner_refresh_time / 1000) {
                Laya.timer.clear(this, this.updateBannerTime);
                this.hideBannerFun();
                this.bannerAdArr[this.currentIndex].destroy();
                this.bannerTimeArr[this.currentIndex] = 0;
                this.bannerErrorArr[this.currentIndex] = true;
                this.bannerAdArr[this.currentIndex] = this.getBannerAd(this.currentIndex);
                this.bannerAdArr[this.currentIndex].show();
                Laya.timer.loop(100, this, this.updateBannerTime);
            }
        }
        updateBannerTime() {
            let self = this;
            self.bannerTimeArr[self.currentIndex] += 0.1;
            self.checkBannerTimeOut();
        }
        countIndexTime() {
            Laya.timer.loop(100, this, this.updateIndexTime);
        }
        updateIndexTime() {
            let self = this;
            self.indexTime += 0.1;
            if (self.indexTime >= JJMgr.instance.dataConfig.front_assign_banner_time / 1000) {
                self.hideBannerFun();
                self.currentIndex++;
                self.showBannerFun();
                self.indexTime = 0;
            }
        }
        stopCountIndexTime() {
            Laya.timer.clear(this, this.updateIndexTime);
        }
        showHideBanner() {
            Laya.timer.once(JJMgr.instance.dataConfig.front_gezi_time, this, this.showHideBannerShow);
        }
        showHideBannerShow() {
            this.showBannerFun();
            Laya.timer.once(1000, this, this.showHideBannerHide);
        }
        showHideBannerHide() {
            this.hideBannerFun();
            Laya.timer.once(JJMgr.instance.dataConfig.front_gezi_time, this, this.showHideBannerShow);
        }
        clearShowHideBanner() {
            Laya.timer.clear(this, this.showHideBannerHide);
            Laya.timer.clear(this, this.showHideBannerShow);
            this.hideBannerFun();
        }
    }

    class JJWxAd {
        constructor() {
            this.videoIsError = false;
        }
        static get Instance() {
            if (!JJWxAd._instance) {
                JJWxAd._instance = new JJWxAd;
            }
            return JJWxAd._instance;
        }
        set bannerLoadError(v) { }
        get bannerLoadError() { return JJWxBannerAd.Instance.getIsAllError(); }
        init() {
            if (Laya.Browser.onWeiXin) {
                this.sysInfo = wx.getSystemInfoSync();
                this.videoId = AppConfig.wechat.videoAdUnitId[0];
                this.interId = AppConfig.wechat.interstitialAdUnitId[0];
                this.gridId = AppConfig.wechat.customAd;
            }
        }
        loadVideoAd() {
            if (Laya.Browser.onWeiXin) {
                var self = this;
                var videoAd = this.videoAd;
                if (videoAd != null) {
                    videoAd.offLoad(onLoadVideo);
                    videoAd.offError(onErrorVideo);
                    videoAd.offClose(onCloseVideo);
                }
                var videoAd = Laya.Browser.window['wx'].createRewardedVideoAd({ adUnitId: self.videoId });
                videoAd.onLoad(onLoadVideo);
                videoAd.onError(onErrorVideo);
                videoAd.onClose(onCloseVideo);
                this.videoAd = videoAd;
            }
            function onLoadVideo() {
                console.log('video 加载成功');
                self.existVideoAd = true;
            }
            function onErrorVideo(err) {
                this.videoIsError = true;
                console.error('video 加载错误', err);
            }
            function onCloseVideo(res) {
                let isEnded = (res && res.isEnded || res === undefined) ? true : false;
                if (isEnded) {
                    self.videoEndCallback && self.videoEndCallback();
                    self.videoEndCallback = null;
                }
                self.videoCloseCallback && self.videoCloseCallback(isEnded);
                self.videoCloseCallback = null;
                videoAd.load();
            }
        }
        showVideoAd(endCB, closeCB, notShow = false) {
            if (!Laya.Browser.onWeiXin) {
                endCB && endCB();
                closeCB && closeCB();
                return;
            }
            this.videoEndCallback = endCB;
            this.videoCloseCallback = closeCB;
            if (!this.existVideoAd) {
                this.loadVideoAd();
            }
            if (notShow)
                return;
            if (Laya.Browser.onWeiXin) {
                var videoAd = this.videoAd;
                videoAd.show().then(() => {
                }).catch(err => {
                    videoAd.load().then(() => videoAd.show().then(() => {
                    })).catch(err => {
                        this.videoEndCallback && this.videoEndCallback();
                        this.videoEndCallback = null;
                        this.videoCloseCallback && this.videoCloseCallback(true);
                        this.videoCloseCallback = null;
                    });
                });
            }
            else {
                this.videoEndCallback && this.videoEndCallback();
                this.videoEndCallback = null;
                this.videoCloseCallback && this.videoCloseCallback(true);
                this.videoCloseCallback = null;
            }
        }
        createInterAd() {
            if (Laya.Browser.onWeiXin) {
                let self = this;
                this.interAd = wx["createInterstitialAd"]({ adUnitId: self.interId });
                this.interAd.onLoad(() => {
                    console.log("插屏广告加载成功");
                });
                this.interAd.onError((err) => {
                    console.error("插屏广告加载失败");
                    this.interAd = null;
                });
            }
        }
        showInterAd() {
            if (this.interAd) {
                this.interAd.show();
            }
        }
        createGameCustomAd() {
            if (Laya.Browser.onWeiXin && !this.gameGridAd && JJMgr.instance.dataConfig.front_dangezi_switch) {
                this.gameGridAd = [];
                for (let i = 0; i < 2; i++) {
                    let style2 = this.getGridPos(i, 80 * (Math.floor(i / 2) + 1));
                    let gridAd = wx["createCustomAd"]({ adUnitId: this.gridId[i], adIntervals: 30, style: style2 });
                    this.gameGridAd.push(gridAd);
                    gridAd.onLoad(() => { });
                }
            }
        }
        hideGameCustomAd() {
            if (Laya.Browser.onWeiXin && this.gameGridAd) {
                for (let i = 0; i < 2; i++) {
                    this.gameGridAd[i].hide();
                }
            }
        }
        showGameCustomAd() {
            if (Laya.Browser.onWeiXin && this.gameGridAd) {
                for (let i = 0; i < 2; i++) {
                    this.gameGridAd[i].show();
                }
            }
        }
        getGridPos(index, top = 120) {
            let style = { width: 20, height: 20 };
            if (index % 2 == 0) {
                style.left = 20;
                style.top = top;
            }
            else {
                style.left = this.sysInfo.windowWidth - 90;
                style.top = top;
            }
            return style;
        }
    }

    class JJWxTrap {
        constructor() {
            this.dataConfig = JJMgr.instance.dataConfig;
            this._Level = 0;
        }
        static get Instance() {
            if (!JJWxTrap._instance) {
                JJWxTrap._instance = new JJWxTrap;
            }
            return JJWxTrap._instance;
        }
        get Level() {
            return this._Level;
        }
        set Level(value) {
            this._Level = value;
        }
        get NewWuchu() {
            return true;
        }
        get NewWuchu2() {
            return JJMgr.instance.dataConfig.is_allow_area && this.allowScene;
        }
        inHomePage(moreGameBtn, drawBtn) {
            console.log("本地保存场景值：", Laya.LocalStorage.getItem("localScene"));
            console.log("本地保存路径值：", Laya.LocalStorage.getItem("wxgamecid"));
            console.log("allowScene:", this.allowScene);
            this.moreGameBtn = moreGameBtn;
            this.drawBtn = drawBtn;
            if (moreGameBtn)
                Laya.timer.loop(100, this, this.updateMoreGameBtn);
            if (drawBtn)
                Laya.timer.loop(100, this, this.updateDrawBtn);
            DuilianAdMgr.instance.hideGrid();
            new Promise((resolve, reject) => {
                if (!this.isSplash && JJWxTrap.Instance.NewWuchu2 && JJMgr.instance.dataConfig.front_home_hot_tuijian) {
                    this.showGridUI4(() => {
                        resolve(0);
                    });
                }
                else {
                    resolve(0);
                }
            }).then((result) => {
                return new Promise((resolve, reject) => {
                    if (!this.isSplash && JJWxTrap.Instance.NewWuchu2 && Math.random() * 100 < JJMgr.instance.dataConfig.front_home_vi_chance) {
                        JJWxAd.Instance.showVideoAd(null, (isEnded) => {
                        });
                        resolve(1);
                    }
                    else {
                        resolve(1);
                    }
                });
            }).then((result) => {
                return new Promise((resolve, reject) => {
                    if (!this.isSplash && JJWxTrap.Instance.NewWuchu2 && Math.random() * 100 < JJMgr.instance.dataConfig.front_home_box_chance) {
                        this.showHomeBox(() => {
                            resolve(2);
                        });
                    }
                    else {
                        resolve(2);
                    }
                });
            }).then((result) => {
                return new Promise((resolve, reject) => {
                    this.gridInt = setInterval(() => {
                        this.testGrid();
                    }, 1000);
                    resolve(3);
                });
            }).then((result) => {
                JJWxBannerAd.Instance.showBannerFun2();
                this.isSplash = true;
                return;
            });
        }
        testGrid() {
            if (DuilianAdMgr.instance.gridAdArr.length > 0) {
                DuilianAdMgr.instance.showGrid();
                clearInterval(this.gridInt);
            }
        }
        updateMoreGameBtn() {
            this.moreGameBtn.visible = JJWxTrap.Instance.NewWuchu2 && JJMgr.instance.dataConfig.front_haowan_switch;
        }
        updateDrawBtn() {
            this.drawBtn.visible = JJWxTrap.Instance.NewWuchu2 && JJMgr.instance.dataConfig.front_chouti_switch;
        }
        inGame(btnDraw, btnMore) {
            if (btnDraw) {
                btnDraw.visible = JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_chouti_switch;
            }
            if (btnMore) {
                btnMore.visible = JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_jingxi_gezi_switch;
            }
        }
        clickShop(notHideBanner) {
            DuilianAdMgr.instance.hideGrid();
            if (!notHideBanner) {
                JJWxBannerAd.Instance.hideBannerFun(true);
            }
            Laya.timer.clear(this, this.updateMoreGameBtn);
            Laya.timer.clear(this, this.updateDrawBtn);
        }
        clickStartGame(cb) {
            DuilianAdMgr.instance.hideGrid();
            JJWxBannerAd.Instance.hideBannerFun(true);
            Laya.timer.clear(this, this.updateMoreGameBtn);
            Laya.timer.clear(this, this.updateDrawBtn);
            if (!JJWxTrap.Instance.NewWuchu2) {
                cb && cb();
                return;
            }
            new Promise((resolve, reject) => {
                this.showGridUI3(() => {
                    resolve(0);
                });
            }).then((result) => {
                return new Promise((resolve, reject) => {
                    if (Math.random() * 100 < JJMgr.instance.dataConfig.front_start_vi_chance) {
                        JJWxAd.Instance.showVideoAd(null, (isEnded) => {
                        });
                        resolve(1);
                    }
                    else {
                        resolve(1);
                    }
                });
            }).then((result) => {
                return new Promise((resolve, reject) => {
                    this.showStartBox(() => {
                        resolve(2);
                    });
                });
            }).then((result) => {
                JJWxAd.Instance.showGameCustomAd();
                cb && cb();
                return;
            });
        }
        clickHomeMoreGame() {
            DuilianAdMgr.instance.hideGrid();
            JJWxBannerAd.Instance.hideBannerFun(true);
            this.showGridUI(() => { DuilianAdMgr.instance.showGrid(); JJWxBannerAd.Instance.showBanner(); }, false, true);
        }
        clickDraw() {
            DuilianAdMgr.instance.hideGrid();
            JJWxBannerAd.Instance.hideBannerFun(true);
            this.showGridUI(() => { DuilianAdMgr.instance.showGrid(); JJWxBannerAd.Instance.showBanner(); }, false, true);
        }
        clickFinishMoreGame() {
            FinishCustomAdMgr.instance.hideGrid();
            JJWxAd.Instance.hideGameCustomAd();
            JJWxBannerAd.Instance.hideBannerFun(true);
            this.showGridUI(() => {
                JJWxAd.Instance.showGameCustomAd();
                JJWxBannerAd.Instance.showBanner();
                if (this.dataConfig.front_jiesuanye_switch && this.NewWuchu) {
                    if (Math.random() * 100 < this.dataConfig.front_daochu_gezi_chance) {
                    }
                    else {
                        FinishCustomAdMgr.instance.showGrid();
                    }
                }
            }, false, true);
        }
        showGameBanner() {
            if (this.NewWuchu && JJMgr.instance.dataConfig.front_game_banner_switch) {
                JJWxBannerAd.Instance.showBannerFun2();
            }
        }
        showGameOver(cb) {
            JJWxAd.Instance.hideGameCustomAd();
            JJWxBannerAd.Instance.hideBannerFun(true);
            this.showGridUI(() => {
                this.showEndBox(cb);
            }, true);
        }
        showFinishUI(finishPage, drawBtn) {
            JJWxBannerAd.Instance.hideBannerFun(true);
            JJWxAd.Instance.showGameCustomAd();
            if (drawBtn) {
                drawBtn.visible = JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_chouti_switch;
            }
            JJWxBannerAd.Instance.showBannerFun2();
            if (this.NewWuchu && JJMgr.instance.dataConfig.front_daochulan_switch) {
                this.showFinishScroll(finishPage);
            }
            if (this.dataConfig.front_jiesuanye_switch && this.NewWuchu) {
                if (Math.random() * 100 < this.dataConfig.front_daochu_gezi_chance) {
                    this.showFinishExport(finishPage);
                }
                else {
                    FinishCustomAdMgr.instance.showGrid();
                }
            }
            if (JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_jiesaunye_chaping_switch) {
                JJWxAd.Instance.showInterAd();
            }
        }
        closeFinishUI(cb) {
            JJWxAd.Instance.hideGameCustomAd();
            JJWxBannerAd.Instance.hideBannerFun(true);
            FinishCustomAdMgr.instance.hideGrid();
            new Promise((resolve, reject) => {
                if (this.NewWuchu2 && Math.random() * 100 < JJMgr.instance.dataConfig.front_jiesuanye_vi_chance) {
                    JJWxAd.Instance.showVideoAd(null, (isEnded) => {
                        resolve(1);
                    });
                }
                else {
                    resolve(1);
                }
            }).then((result) => {
                return new Promise((resolve, reject) => {
                    this.showGridUI2(() => {
                        resolve(2);
                        if (this.dataConfig.front_wx_ad_switch && this.NewWuchu) {
                            JJWxAd.Instance.showInterAd();
                        }
                    }, true);
                });
            }).then((result) => {
                cb && cb();
                return;
            });
        }
        showGridUI(ccb, isInterAd = false, isMoreGame = false) {
            Laya.Scene.open('JJExport/GridUI.scene', false, {
                ccb: ccb,
                isInterAd: isInterAd,
                isMoreGame: isMoreGame
            }, Laya.Handler.create(this, (v) => { Laya.stage.addChild(v); }));
        }
        showGridUI2(ccb, isFinishUI = false) {
            Laya.Scene.open('JJExport/GridUI2.scene', false, {
                ccb: ccb,
                isFinishUI: isFinishUI
            }, Laya.Handler.create(this, (v) => { Laya.stage.addChild(v); }));
        }
        showGridUI3(ccb) {
            Laya.Scene.open('JJExport/GridUI3.scene', false, {
                ccb: ccb
            }, Laya.Handler.create(this, (v) => { Laya.stage.addChild(v); }));
        }
        showGridUI4(ccb) {
            Laya.Scene.open('JJExport/GridUI4.scene', false, {
                ccb: ccb
            }, Laya.Handler.create(this, (v) => { Laya.stage.addChild(v); }));
        }
        showRunUI(ccb) {
            ccb && ccb();
            return;
            Laya.Scene.open('JJExport/RunUI.scene', false, {
                ccb: ccb
            }, Laya.Handler.create(this, (v) => { Laya.stage.addChild(v); }));
        }
        showFinishExport(finishPage) {
            Laya.Scene.open('JJExport/FinishGameUI.scene', false, null, Laya.Handler.create(this, (v) => { finishPage.addChild(v); }));
        }
        showFinishScroll(finishPage) {
            Laya.Scene.open('JJExport/FinishScrollUI.scene', false, null, Laya.Handler.create(this, (v) => { finishPage.addChild(v); }));
        }
        showHomeBox(cb) {
            Laya.Scene.open('JJExport/StartBoxUI.scene', false, { ccb: cb }, Laya.Handler.create(this, (v) => {
                Laya.stage.addChild(v);
            }));
        }
        showStartBox(cb) {
            if (this.getRandom0To100 < JJMgr.instance.dataConfig.front_fbox_wuchu_change && JJMgr.instance.dataConfig.front_level_fbox_num <= this.Level && JJMgr.instance.dataConfig.is_allow_area && this.allowScene) {
                if (JJMgr.instance.dataConfig.front_fbox_status == 1) {
                    Laya.Scene.open('JJExport/EndBoxUI.scene', false, { lianxu_num: JJMgr.instance.dataConfig.front_fbox_lianxu_num, ccb: cb }, Laya.Handler.create(this, (v) => {
                        Laya.stage.addChild(v);
                    }));
                }
                if (JJMgr.instance.dataConfig.front_fbox_status == 2) {
                    Laya.Scene.open('JJExport/StartBoxUI.scene', false, { lianxu_num: JJMgr.instance.dataConfig.front_fbox_lianxu_num, ccb: cb }, Laya.Handler.create(this, (v) => {
                        Laya.stage.addChild(v);
                    }));
                }
            }
            else {
                cb && cb();
            }
        }
        showEndBox(cb) {
            if (this.getRandom0To100 < JJMgr.instance.dataConfig.front_tbox_wuchu_change && JJMgr.instance.dataConfig.front_level_tbox_num <= this.Level && JJMgr.instance.dataConfig.is_allow_area && this.allowScene) {
                if (JJMgr.instance.dataConfig.front_tbox_status == 1) {
                    Laya.Scene.open('JJExport/EndBoxUI.scene', false, { lianxu_num: JJMgr.instance.dataConfig.front_tbox_lianxu_num, ccb: cb }, Laya.Handler.create(this, (v) => {
                        Laya.stage.addChild(v);
                    }));
                }
                if (JJMgr.instance.dataConfig.front_tbox_status == 2) {
                    Laya.Scene.open('JJExport/StartBoxUI.scene', false, { lianxu_num: JJMgr.instance.dataConfig.front_tbox_lianxu_num, ccb: cb }, Laya.Handler.create(this, (v) => {
                        Laya.stage.addChild(v);
                    }));
                }
            }
            else {
                cb && cb();
            }
        }
        getRandomIndex() {
            return Math.floor(Math.random() * JJMgr.instance.navDataArr.length);
        }
        get getRandom0To100() {
            return Math.random() * 100;
        }
        get allowScene() {
            if (Laya.Browser.onWeiXin) {
                if (!this.dataConfig.front_wuchu_scene)
                    return true;
                let sceneId = window['wx'].getEnterOptionsSync().scene;
                let query = window['wx'].getEnterOptionsSync().query;
                let localScene = Number(Laya.LocalStorage.getItem("localScene"));
                if (!localScene) {
                    localScene = sceneId;
                    Laya.LocalStorage.setItem("localScene", localScene.toString());
                    if (query.wxgamecid) {
                        Laya.LocalStorage.setItem("wxgamecid", query.wxgamecid.toString());
                    }
                }
                if (this.dataConfig.front_first_scv_swtich) {
                    sceneId = localScene;
                }
                let wxgamecid = Laya.LocalStorage.getItem("wxgamecid");
                if (!this.dataConfig.front_is_source) {
                    wxgamecid = "true";
                }
                let s = this.dataConfig.front_wuchu_scene.toString();
                if (s.search('|') == -1) {
                    let sInt = parseInt(s);
                    return sInt != sceneId;
                }
                let sArr = s.split('|');
                for (let i = 0; i < sArr.length; i++) {
                    let sInt = parseInt(sArr[i]);
                    if (sInt == sceneId && wxgamecid) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        }
        switch(str) {
            let strTmp = '';
            for (let i = str.length - 1; i >= 0; i--) {
                strTmp += str[i];
            }
            return strTmp;
        }
        addClickEvent(btn, caller, callBack, param, isScale) {
            btn.offAllCaller(caller);
            if (btn instanceof Laya.Button && !isScale) {
                let callback = (event) => {
                    if (callBack)
                        callBack.call(caller, event);
                };
                btn.on(Laya.Event.CLICK, caller, callback, [param]);
            }
            else {
                let scaleTime = 60;
                let wRatio = 1;
                let scaleX = btn.scaleX * wRatio;
                let scaleY = btn.scaleY * wRatio;
                let size = 0.9 * wRatio;
                let isPressed = false;
                let cbDown = (event) => {
                    isPressed = true;
                    Laya.Tween.to(btn, { scaleX: size, scaleY: size }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_DOWN, caller, cbDown, [param]);
                let cbUp = (event) => {
                    if (isPressed == false)
                        return;
                    isPressed = false;
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime, null, new Laya.Handler(caller, () => {
                        if (callBack)
                            callBack.call(caller, event);
                    }));
                };
                btn.on(Laya.Event.MOUSE_UP, caller, cbUp, [param]);
                let cbOut = (event) => {
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, [param]);
            }
        }
    }

    class DuilianAdMgr {
        constructor() {
            this.gridIdArr = [];
            this.gridAdArr = [];
            this.hadHide = false;
            this.totalCount = 2;
            this.createIndex = 0;
            this.showTimes = 0;
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new DuilianAdMgr();
            }
            return this._instance;
        }
        get sysInfo() {
            return window['wx'].getSystemInfoSync();
        }
        initCustomAd() {
            if (!Laya.Browser.onWeiXin || !JJMgr.instance.dataConfig.front_duilian_gezi_switch || !JJWxTrap.Instance.NewWuchu2) {
                return;
            }
            this.gridIdArr = JJMgr.instance.dataConfig.front_duilian_gezi_list;
            if (!this.gridIdArr) {
                return;
            }
            this.totalCount = 2;
            this.createIndex = 0;
            this.createCustomAd();
        }
        getCustomAd(id, style, onLoadCB = null, errorCB = null) {
            let gridAd = Laya.Browser.window['wx'].createCustomAd({ adUnitId: id, adIntervals: JJMgr.instance.dataConfig.front_more_gezi_time / 1000, style: style });
            gridAd.onError((res) => {
                console.log('对联格子加载失败');
                errorCB && errorCB();
                gridAd.offError();
                gridAd.offLoad();
            });
            gridAd.onLoad(() => {
                if (!this.hadHide)
                    gridAd.show();
                onLoadCB && onLoadCB();
                gridAd.offError();
                gridAd.offLoad();
            });
            return gridAd;
        }
        createCustomAd() {
            if (this.createIndex >= this.gridIdArr.length || this.gridAdArr.length >= this.totalCount) {
                return;
            }
            let style = {
                left: this.gridAdArr.length == 0 ? 0 : this.sysInfo.screenWidth - 65,
                top: 120
            };
            let customAd = this.getCustomAd(this.gridIdArr[this.createIndex], style, () => {
                this.gridAdArr.push(customAd);
                this.createIndex++;
                this.createCustomAd();
            }, () => {
                this.createIndex++;
                this.createCustomAd();
            });
        }
        showGrid() {
            if (Laya.Browser.onWeiXin && this.getIsError() && this.showTimes > 0) {
                this.initCustomAd();
                return;
            }
            if (Laya.Browser.onWeiXin && this.gridAdArr.length > 0) {
                for (let i = 0; i < this.gridAdArr.length; i++) {
                    this.gridAdArr[i].show();
                }
            }
            this.showTimes++;
        }
        hideGrid() {
            this.hadHide = true;
            if (Laya.Browser.onWeiXin && this.gridAdArr.length > 0) {
                for (let i = 0; i < this.gridAdArr.length; i++) {
                    this.gridAdArr[i].hide();
                }
            }
        }
        getIsError() {
            return this.gridAdArr.length <= 0;
        }
    }

    var SceneDir;
    (function (SceneDir) {
        SceneDir["SCENE_RECOMMENDUI"] = "JJExport/RecommendUI.scene";
        SceneDir["SCENE_FULLGAMEUI"] = "JJExport/FullGameUI.scene";
        SceneDir["SCENE_FINISHGAMEUI"] = "JJExport/FinishGameUI.scene";
        SceneDir["SCENE_FINISH2GAMEUI"] = "JJExport/Finish2GameUI.scene";
        SceneDir["SCENE_BOX1"] = "JJExport/Box1.scene";
        SceneDir["SCENE_BOX2"] = "JJExport/Box2.scene";
        SceneDir["SCENE_BOX3"] = "JJExport/Box3.scene";
    })(SceneDir || (SceneDir = {}));
    var ScreenOrientationType;
    (function (ScreenOrientationType) {
        ScreenOrientationType["PORTRAIT"] = "portrait";
        ScreenOrientationType["LANDSCAPE"] = "landscape";
    })(ScreenOrientationType || (ScreenOrientationType = {}));
    class JJMgr {
        constructor() {
            this.screenOrientation = ScreenOrientationType.PORTRAIT;
            this.eventDispatcher = new Laya.EventDispatcher;
            this.navDataArr = [];
            this.closeCBScenes = [];
            this.dataConfig = {};
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new JJMgr();
            }
            return this._instance;
        }
        set shareCount(value) {
            this.dataConfig.front_share_number = value;
        }
        get shareCount() {
            return this.dataConfig.front_share_number;
        }
        set shareContext(value) {
            this.shareConfig = value;
        }
        get shareContext() {
            return this.shareConfig;
        }
        initJJ(completeCB, screenOrientation = ScreenOrientationType.PORTRAIT) {
            let sceneId = window['wx'].getEnterOptionsSync().scene;
            console.log(window['wx'].getEnterOptionsSync());
            console.log("本次场景值：", sceneId);
            this.screenOrientation = screenOrientation;
            JJWxAd.Instance.init();
            Laya.Browser.window.JJGetGameConfigAdShare().then((res) => {
                console.log("获取游戏配置：", res.data.config);
                this.updateDataConfig(res.data.config);
                console.log("获取导出配置：", res.data.ad);
                this.updateNavData(res.data.ad);
                console.log("获取分享配置：", res.data.share);
                var shareConfig = res.data.share[0];
                if (shareConfig) {
                    this.shareContext = { title: shareConfig.share_content, imageUrl: shareConfig.share_img, id: shareConfig.id };
                }
                if (Laya.Browser.onWeiXin) {
                    this.JJOnShareAppMessage(this.shareContext);
                }
                let dataConfig = JJMgr.instance.dataConfig;
                CustomAdMgr.instance.initCustomAd();
                DuilianAdMgr.instance.initCustomAd();
                JJWxAd.Instance.createInterAd();
                JJWxAd.Instance.createGameCustomAd();
                FinishCustomAdMgr.instance.initCustomAd();
                let bannerIds = dataConfig.front_banner_ids;
                JJWxBannerAd.Instance.initAd(bannerIds);
                if (Laya.Browser.onWeiXin && JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_leave_return_switch) {
                    Laya.Browser.window['wx'].onShow(() => {
                        JJWxAd.Instance.showInterAd();
                    });
                }
                completeCB && completeCB(true);
            }, () => {
                completeCB && completeCB(false);
            });
            this.showShareMenuWithTicket(true);
        }
        openScene(sceneDir, closeOther = false, param, closeCB = () => { }, parent, completeCB) {
            Laya.Scene.open(sceneDir, closeOther, param, Laya.Handler.create(this, (v) => {
                if (parent) {
                    parent.addChild(v);
                }
                else {
                    Laya.stage.addChild(v);
                }
                completeCB && completeCB();
                if (closeCB) {
                    this.closeCBScenes.push({ scene: v, closeCB: closeCB });
                }
            }));
        }
        closeScene(scene) {
            if (scene instanceof Laya.Scene) {
                Laya.Scene.close(scene.url);
                let sceneTargets = this.closeCBScenes.filter(w => { return w.scene === scene; });
                if (sceneTargets && sceneTargets.length > 0) {
                    let sceneTarget = sceneTargets[0];
                    sceneTarget.closeCB();
                    this.closeCBScenes.splice(this.closeCBScenes.indexOf(sceneTarget), 1);
                }
            }
            else {
                Laya.Scene.close(scene);
            }
        }
        NavigateApp(index, cancelCB, successCB) {
            if (this.navDataArr.length == 0)
                return;
            console.log("跳转", this.navDataArr[index].appid);
            if (Laya.Browser.onWeiXin) {
                var self = this;
                var promiseObj = wx["JJNavigateToMiniProgram"](() => {
                    return {
                        appId: self.navDataArr[index].appid,
                        path: self.navDataArr[index].path,
                        id: self.navDataArr[index].id
                    };
                });
                promiseObj.then((res) => {
                    console.log('success');
                    successCB && successCB(res);
                }, (err) => {
                    console.log('fail', err);
                    if (err.errMsg.indexOf("cancel") != -1) {
                        cancelCB && cancelCB(true);
                    }
                    else {
                        cancelCB && cancelCB(false);
                    }
                });
            }
            else {
                cancelCB && cancelCB(false);
            }
        }
        getTitle(data, sub = true) {
            if (data == null)
                return " ";
            if (sub) {
                if (data.subtitle && data.subtitle != '') {
                    return data.subtitle;
                }
                else {
                    return data.title;
                }
            }
            else {
                return data.title;
            }
        }
        updateDataConfig(config) {
            var configs = config.data;
            this.dataConfig.is_allow_area = config.is_allow_area;
            this.dataConfig.is_allow_export = config.is_allow_export;
            this.dataConfig.front_wuchu_scene = config.front_wuchu_scene;
            for (let key in configs) {
                this.dataConfig[key] = configs[key].config_val;
            }
            console.log(this.dataConfig);
        }
        updateNavData(data) {
            this.navDataArr = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var navData = new JJNavData;
                navData.appid = dataItem.channel_game_appid;
                navData.title = dataItem.channel_game_name;
                navData.path = dataItem.path;
                navData.subtitle = dataItem.originality.copywriting;
                navData.icon = dataItem.originality.material;
                navData.id = dataItem.originality.id;
                this.navDataArr.push(navData);
            }
        }
        get allowScene() {
            if (Laya.Browser.onWeiXin) {
                var launchInfo = wx["getLaunchOptionsSync"]();
                console.log("当前场景：", launchInfo.scene);
                var isAllow = true;
                let s = JJMgr.instance.dataConfig.front_wuchu_scene;
                if (s == null)
                    isAllow = true;
                if (s.search('|') == -1) {
                    let sInt = parseInt(s);
                    isAllow = sInt != launchInfo.scene;
                }
                let sArr = s.split('|');
                for (let i = 0; i < sArr.length; i++) {
                    let sInt = parseInt(sArr[i]);
                    if (sInt == launchInfo.scene) {
                        isAllow = false;
                    }
                }
                return isAllow;
            }
            return true;
        }
        shuffleArr(arr) {
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
            return arr;
        }
        addClickEvent(btn, caller, callBack, param, isScale) {
            btn.offAllCaller(caller);
            if (btn instanceof Laya.Button && !isScale) {
                let callback = (event) => {
                    if (callBack)
                        callBack.call(caller, event);
                };
                btn.on(Laya.Event.CLICK, caller, callback, [param]);
            }
            else {
                let scaleTime = 60;
                let scaleX = btn.scaleX;
                let scaleY = btn.scaleY;
                let size = 0.9;
                let isPressed = false;
                let cbDown = (event) => {
                    isPressed = true;
                    Laya.Tween.to(btn, { scaleX: size, scaleY: size }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_DOWN, caller, cbDown, [param]);
                let cbUp = (event) => {
                    if (isPressed == false)
                        return;
                    isPressed = false;
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
                    if (callBack)
                        callBack.call(caller, event);
                };
                btn.on(Laya.Event.MOUSE_UP, caller, cbUp, [param]);
                let cbOut = (event) => {
                    Laya.Tween.to(btn, { scaleX: scaleX, scaleY: scaleY }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, [param]);
            }
        }
        toRotaion(target, angle, duration, isLoop = false, isReset = false, completeCB) {
            if (!target || target.destroyed)
                return;
            var curAngle = target.rotation;
            rotate1();
            function rotate1() {
                if (isLoop) {
                    var handler = new Laya.Handler(this, rotate2);
                }
                else if (isReset) {
                    var handler = new Laya.Handler(this, rotate4);
                }
                Laya.Tween.to(target, { rotation: angle }, duration, null, handler);
            }
            function rotate2() {
                if (!target || target.destroyed)
                    return;
                Laya.Tween.to(target, { rotation: -angle }, duration * 2, null, Laya.Handler.create(this, rotate3));
            }
            function rotate3() {
                if (!target || target.destroyed)
                    return;
                Laya.Tween.to(target, { rotation: angle }, duration * 2, null, Laya.Handler.create(this, rotate2));
            }
            function rotate4() {
                if (!target || target.destroyed)
                    return;
                Laya.Tween.to(target, { rotation: curAngle }, duration, null, Laya.Handler.create(this, () => {
                    completeCB && completeCB();
                }));
            }
        }
        rewardClick(rewardCallback, cancelCallback, isVideo) {
            this.rewardCallback = rewardCallback;
            this.cancelCallback = cancelCallback;
            if (!Laya.Browser.onWeiXin) {
                this.rewardCallback();
                return;
            }
            if (isVideo || this.shareCount == 0) {
                JJWxAd.Instance.showVideoAd((isEnded) => {
                    if (isEnded) {
                        rewardCallback();
                    }
                    else {
                        cancelCallback && cancelCallback();
                    }
                });
            }
            else {
                this.shareGame((isShared) => {
                    if (isShared) {
                        rewardCallback();
                        this.shareCount -= 1;
                        Laya.LocalStorage.setItem("shareCount", JSON.stringify(this.shareCount));
                    }
                    else {
                        this.showModal(this.shareFailContext);
                    }
                });
            }
        }
        get shareFailContext() {
            let str = [
                '请分享到活跃的群！',
                '请分享到不同群！',
                '请分享给好友！',
                '请分享给20人以上的群！'
            ];
            let index = Math.floor(Math.random() * 4);
            return str[index];
        }
        showModal(content) {
            if (!Laya.Browser.onWeiXin)
                return;
            var self = this;
            Laya.Browser.window.wx.showModal({
                title: "提示",
                content: content,
                showCancel: true,
                confirmText: "重新分享",
                success(res) {
                    if (res.confirm) {
                        console.log("点击确定");
                        self.shareGame(self.rewardCallback);
                    }
                    else if (res.cancel) {
                        console.log("点击取消");
                        self.cancelCallback && self.cancelCallback();
                    }
                }
            });
        }
        shareGame(callBack) {
            if (Laya.Browser.onWeiXin) {
                console.log("分享游戏");
                var object = JJMgr.instance.shareContext;
                this.JJShareAppMessage(object, callBack);
            }
        }
        regisiterWxCallback() {
            if (Laya.Browser.onWeiXin) {
                Laya.Browser.window.wx.offShow(this.onShowEvent);
                Laya.Browser.window.wx.onShow(this.onShowEvent);
                Laya.Browser.window.wx.offHide(this.onHideEvent);
                Laya.Browser.window.wx.onHide(this.onHideEvent);
            }
        }
        GetRandom(mix, max, isInt = true) {
            let w = max - mix + 1;
            let r1 = Math.random() * w;
            r1 += mix;
            return isInt ? Math.floor(r1) : r1;
        }
        onShowEvent(e) {
            JJMgr.instance.eventDispatcher.event("wx_awake_event");
        }
        onHideEvent(e) {
            JJMgr.instance.eventDispatcher.event("wx_sleep_event");
        }
        showShareMenuWithTicket(ticket) {
            if (Laya.Browser.onWeiXin) {
                wx.showShareMenu({
                    withShareTicket: ticket,
                    success: function () { },
                    fail: function () { },
                    complete: function () { }
                });
            }
        }
        regisiterWXShareCallback() {
            var shareId = 1;
            if (Laya.Browser.onWeiXin) {
                var object = this.shareContext;
                Laya.Browser.window.wx.onShareAppMessage(function () {
                    console.log("用户点击了转发按钮");
                    let shareObj = {
                        title: object.title,
                        imageUrl: object.image,
                        query: "share_id=" + shareId,
                        success: function (res) {
                        },
                        fail: function () {
                        },
                    };
                    return shareObj;
                });
            }
        }
        JJSendEvent(eventName, params) {
            console.log("埋点：", eventName);
            if (this.dataConfig.front_report_event_point_switch && Laya.Browser.onWeiXin) {
                wx["JJSendEvent"](() => {
                    return {
                        name: eventName,
                        param: params
                    };
                });
            }
        }
        JJBannerAdShowCount() {
            if (Laya.Browser.onWeiXin) {
                wx["JJBannerAdShowCount"](() => {
                    return {
                        adUnitId: "",
                        adUnitName: "banner",
                        pageName: 'all'
                    };
                });
            }
        }
        JJSendVideoAdCount(isEnded, videoName) {
            if (Laya.Browser.onWeiXin) {
                wx["JJSendVideoAdCount"](() => {
                    return {
                        adUnitId: JJWxAd.Instance.videoId,
                        adUnitName: videoName,
                        isEnded: isEnded
                    };
                });
            }
        }
        JJShareAppMessage(shareData, cb) {
            wx["JJShareAppMessage"](() => {
                return {
                    title: shareData.title,
                    imageUrl: shareData.imageUrl,
                    id: shareData.id
                };
            }).then(res => {
                cb(res);
            });
        }
        JJOnShareAppMessage(shareData) {
            wx["JJOnShareAppMessage"](() => {
                return {
                    title: shareData.title,
                    imageUrl: shareData.imageUrl,
                    id: shareData.id
                };
            });
        }
        refreshData() {
            let timeJsonData = Laya.LocalStorage.getItem("dayTime");
            if (timeJsonData) {
                var gameTime = Number(JSON.parse(timeJsonData));
            }
            else {
                gameTime = (new Date().getTime() - 86400000) / 86400000;
                Laya.LocalStorage.setItem("dayTime", JSON.stringify(gameTime));
            }
            var curTime = Math.floor(new Date().getTime() / 86400000);
            if (gameTime != curTime) {
                console.log("刷新缓存数据");
                Laya.LocalStorage.setItem("shareCount", JSON.stringify(this.dataConfig.front_share_number));
                Laya.LocalStorage.setItem("dayTime", JSON.stringify(curTime));
            }
            else {
                this.dataConfig.front_share_number = JSON.parse(Laya.LocalStorage.getItem("shareCount"));
            }
        }
        getRandomItemInArr(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }
    class JJNavData {
    }
    class SceneTaget {
    }

    class EndBoxUI extends Laya.Scene {
        constructor() {
            super();
            this.clickCount = 0;
            this.lianxu_num = 0;
            this.ccb = null;
            this.showCallback = null;
            this.hadShowBanner = false;
            this.preTime = 0;
            this.rateTime = 0;
            this.isforce = false;
        }
        onOpened(param) {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            this.ccb = param.ccb;
            this.lianxu_num = param.lianxu_num;
            this.showUI();
        }
        onClosed() {
            if (Laya.Browser.onWeiXin)
                window['wx'].offShow(this.showCallback);
            Laya.timer.clearAll(this);
            if (this.lianxu_num > 0) {
                this.lianxu_num--;
                Laya.timer.once(100, this, () => {
                    this.openAgain();
                });
            }
            else {
                this.ccb && this.ccb();
            }
        }
        openAgain() {
            Laya.Scene.open('JJExport/EndBoxUI.scene', false, { lianxu_num: this.lianxu_num, ccb: this.ccb }, Laya.Handler.create(this, (v) => {
                Laya.stage.addChild(v);
            }));
        }
        showUI(cb) {
            this.clickCount = 0;
            this.minclicknum = Number(JJMgr.instance.dataConfig.front_box_clicks[0]);
            this.maxclicknum = Number(JJMgr.instance.dataConfig.front_box_clicks[1]);
            this.needClick = JJMgr.instance.GetRandom(this.minclicknum, this.maxclicknum - JJMgr.instance.dataConfig.front_progress_bar_reduce);
            this.isforce = JJMgr.instance.dataConfig.front_is_box_force;
            this.addProgerss = 1 / this.maxclicknum;
            JJWxTrap.Instance.addClickEvent(this.clickBtn, this, this.clickCB);
            console.log('this.needClick:', this.needClick);
            console.log('this.addProgerss:', this.addProgerss);
            JJWxBannerAd.Instance.hideBannerFun(true);
            this.hadShowBanner = false;
            this.pBar.value = 0;
            this.rateTime = 0;
            this.preTime = 0;
            Laya.timer.frameLoop(1, this, this.DecBar);
            if (Laya.Browser.onWeiXin) {
                this.showCallback = () => {
                    this.close();
                };
                window['wx'].onShow(this.showCallback);
            }
        }
        closeCB() {
            this.close();
        }
        clickCB() {
            this.clickCount++;
            this.pBar.value += this.addProgerss;
            if (this.pBar.value > 1) {
                this.pBar.value = 1;
            }
            this.shakeBox();
            if (!this.hadShowBanner) {
                this.isforce = JJMgr.instance.dataConfig.front_is_box_force;
                let closeTime = JJMgr.instance.dataConfig.front_box_hide_time;
                let cb = () => {
                    this.hadShowBanner = true;
                    Laya.timer.once(closeTime, this, () => {
                        JJWxBannerAd.Instance.hideBannerFun(true);
                        if (Laya.Browser.onWeiXin && this.isforce) {
                            if (JJWxBannerAd.Instance.getIsAllError()) {
                                this.closeCB();
                            }
                            this.hadShowBanner = false;
                        }
                        else {
                            this.closeCB();
                        }
                    });
                    JJWxBannerAd.Instance.showBanner();
                };
                let diff = this.rateTime - this.preTime;
                let arr = JJMgr.instance.dataConfig.front_box_sulv_qujian;
                let randNum = this.getRandomItemInArr(arr);
                let strArr = randNum.split('|');
                let v1 = strArr[0];
                let v2 = strArr[1];
                if (this.pBar.value * 100 >= JJMgr.instance.dataConfig.front_box_sulv_start && parseFloat(v1) <= diff && diff <= parseFloat(v2)) {
                    if (JJMgr.instance.dataConfig.front_sulv_wuchu_switch) {
                        this.isforce = true;
                        closeTime = JJMgr.instance.dataConfig.front_fbox_hide_time;
                    }
                    console.log('宝箱触发频率：', diff);
                    cb();
                    return;
                }
                this.preTime = this.rateTime;
                if (this.pBar.value >= this.needClick * this.addProgerss && !this.hadShowBanner) {
                    console.log('宝箱触发进度');
                    cb();
                    return;
                }
                if (this.clickCount >= JJMgr.instance.dataConfig.front_box_click_count) {
                    console.log('点击次数', this.clickCount);
                    this.clickCount = 0;
                    cb();
                }
            }
        }
        shakeBox() {
            Laya.Tween.to(this.box, { rotation: -10 }, 100, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(this.box, { rotation: 10 }, 200, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(this.box, { rotation: 0 }, 100, null, Laya.Handler.create(this, () => {
                    }));
                }));
            }));
        }
        DecBar() {
            this.updateTest();
            this.pBar.value -= JJMgr.instance.dataConfig.front_progress_bar_return;
            if (this.pBar.value < 0) {
                this.pBar.value = 0;
            }
        }
        updateTest() {
            this.rateTime += Laya.timer.delta / 1000;
        }
        GetRandom(mix, max, isInt = true) {
            let w = max - mix;
            let r1 = Math.random() * w;
            r1 += mix;
            return isInt ? Math.floor(r1) : r1;
        }
        getRandomItemInArr(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }

    class ScaleLoop extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.myOwnwer = this.owner;
            this.scaleLoop(this.myOwnwer, 1.1, 400);
        }
        scaleLoop(node, rate, t) {
            var tw = Laya.Tween.to(node, { scaleX: rate, scaleY: rate }, t, null, new Laya.Handler(this, () => {
                Laya.Tween.to(node, { scaleX: 1, scaleY: 1 }, t, null, new Laya.Handler(this, () => {
                    this.scaleLoop(node, rate, t);
                }));
            }));
        }
    }

    class RotateLoop extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.myOwnwer = this.owner;
            this.rotateLoop(this.myOwnwer, 3000);
        }
        rotateLoop(node, t) {
            var tw = Laya.Tween.to(node, { rotation: 360 }, t, null, new Laya.Handler(this, () => {
                this.myOwnwer.rotation = 0;
                this.rotateLoop(node, t);
            }));
        }
    }

    class FinishExportUI extends Laya.Scene {
        constructor() {
            super(...arguments);
            this.navData = [];
            this.hotArr = [];
            this.fingerId = 0;
        }
        onOpened(param) {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            if (param && param.posY) {
                this.navList.y = param.posY;
            }
            this.initList();
        }
        updateNavData() {
            this.fingerId = Math.floor(Math.random() * 6);
            this.navData = [].concat(JJMgr.instance.shuffleArr(JJMgr.instance.navDataArr)).slice(0, 6);
            this.hotArr = [];
            for (let i = 0; i < this.navData.length; i++) {
                this.hotArr.push(i);
            }
            this.hotArr = this.getRandomItemInArrWithoutSelf(-1, this.hotArr, 4);
            this.navList.array = this.navData;
        }
        initList() {
            this.fingerId = Math.floor(Math.random() * 6);
            this.navData = [].concat(JJMgr.instance.shuffleArr(JJMgr.instance.navDataArr)).slice(0, 6);
            this.hotArr = [];
            for (let i = 0; i < this.navData.length; i++) {
                this.hotArr.push(i);
            }
            this.hotArr = this.getRandomItemInArrWithoutSelf(-1, this.hotArr, 2);
            this.navList.vScrollBarSkin = '';
            this.navList.repeatX = 3;
            this.navList.repeatY = 2;
            this.navList.array = this.navData;
            this.navList.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            Laya.timer.once(1000, this, () => {
                this.showTween();
            });
        }
        onListRender(cell, index) {
            if (index >= this.navList.array.length) {
                return;
            }
            var item = cell.getChildByName('item');
            var icon = item.getChildByName('icon');
            var finger = item.getChildByName('finger');
            finger.visible = index == this.fingerId;
            var hot = item.getChildByName('hot');
            hot.visible = this.hotArr.indexOf(index) != -1;
            icon.skin = this.navData[index].icon;
            index = JJMgr.instance.navDataArr.indexOf(this.navData[index]);
            item.off(Laya.Event.CLICK, this, this.navCB, [index]);
            item.on(Laya.Event.CLICK, this, this.navCB, [index]);
        }
        navCB(index) {
            console.log('click id:', index);
            JJMgr.instance.NavigateApp(index, () => {
                if (JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_quxiao_switch) {
                    JJWxTrap.Instance.clickFinishMoreGame();
                }
            }, () => { });
            this.updateNavData();
        }
        showTween() {
            var index = Math.floor(Math.random() * this.navData.length);
            ;
            var image = this.navList.cells[index];
            image.rotation = 0;
            JJMgr.instance.toRotaion(image, 20, 150, false, true);
            Laya.timer.once(300, this, () => {
                image.rotation = 0;
                JJMgr.instance.toRotaion(image, -20, 150, false, true);
                Laya.timer.once(300, this, () => {
                    image.rotation = 0;
                    JJMgr.instance.toRotaion(image, 10, 50, false, true);
                    Laya.timer.once(100, this, () => {
                        image.rotation = 0;
                        JJMgr.instance.toRotaion(image, -10, 50, false, true);
                        Laya.timer.once(300, this, () => {
                            this.updateNavData();
                        });
                    });
                });
            });
            Laya.timer.once(4000, this, this.showTween);
        }
        onClosed() {
            Laya.timer.clear(this, this.showTween);
        }
        shuffleArr(arr) {
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
            return arr;
        }
        getRandomItemInArrWithoutSelf(self, arr, count = 1) {
            let temp = [].concat(arr);
            temp.splice(temp.indexOf(self), 1);
            temp = this.shuffleArr(temp);
            return temp.slice(0, count);
        }
    }

    class FinishScrollUI extends Laya.Scene {
        constructor() {
            super();
            this.navList = this['navList'];
            this.navData = [];
            this.scrollDir = 1;
            this.preIndex = -1;
            this.hotArr = [];
        }
        onOpened() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            this.initList();
        }
        onClosed() {
            Laya.timer.clearAll(this);
        }
        initList() {
            this.navData = [].concat(JJMgr.instance.navDataArr);
            for (let i = 0; i < this.navData.length; i++) {
                this.hotArr.push(i);
            }
            this.hotArr = this.getRandomItemInArrWithoutSelf(-1, this.hotArr, 4);
            this.navList.hScrollBarSkin = '';
            this.navList.repeatX = this.navData.length;
            this.navList.repeatY = 1;
            this.navList.array = this.navData;
            this.navList.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this.navList.mouseHandler = new Laya.Handler(this, this.mouseHandler);
            this.scrollLoop();
        }
        mouseHandler(e, index) {
            Laya.timer.clear(this, this.scrollLoop);
            Laya.timer.once(1000, this, this.scrollLoop);
        }
        scrollLoop() {
            Laya.timer.once(1000, this, () => {
                let num = Math.floor(this.navList.startIndex);
                if (this.scrollDir == 1) {
                    num++;
                    if (num >= this.navData.length - 4) {
                        this.scrollDir = -this.scrollDir;
                    }
                }
                else {
                    num--;
                    if (num < 0) {
                        this.scrollDir = -this.scrollDir;
                    }
                }
                this.navList.tweenTo(num, 1000, Laya.Handler.create(this, this.scrollLoop));
            });
        }
        onListRender(cell, index) {
            if (index >= this.navList.array.length) {
                return;
            }
            var item = cell.getChildByName('item');
            var hot = item.getChildByName('hot');
            hot.visible = this.hotArr.indexOf(index) != -1;
            item.skin = this.navData[index].icon;
            item.off(Laya.Event.CLICK, this, this.navCB, [index]);
            item.on(Laya.Event.CLICK, this, this.navCB, [index]);
        }
        navCB(index) {
            console.log('click id:', index);
            JJMgr.instance.NavigateApp(index, () => {
                if (JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_quxiao_switch) {
                    JJWxTrap.Instance.clickFinishMoreGame();
                }
            });
        }
        shuffleArr(arr) {
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
            return arr;
        }
        getRandomItemInArrWithoutSelf(self, arr, count = 1) {
            let temp = [].concat(arr);
            temp.splice(temp.indexOf(self), 1);
            temp = this.shuffleArr(temp);
            return temp.slice(0, count);
        }
    }

    class GridUI extends Laya.Scene {
        constructor() {
            super();
            this.ccb = null;
            this.hadClick = false;
            this.isShowHide = false;
        }
        onAwake() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
        }
        onOpened(param) {
            let isMoreGame = false;
            if (param) {
                if (param.ccb) {
                    this.ccb = param.ccb;
                }
                if (param.isMoreGame) {
                    isMoreGame = param.isMoreGame;
                }
            }
            if (!isMoreGame && (!JJWxTrap.Instance.NewWuchu2 || !JJMgr.instance.dataConfig.front_all_gezi_switch)) {
                this.continueBtnCB();
                return;
            }
            CustomAdMgr.instance.showGrid();
            if (param.isInterAd && JJWxTrap.Instance.NewWuchu && JJMgr.instance.dataConfig.front_wx_chaping_switch) {
                JJWxAd.Instance.showInterAd();
            }
            JJWxTrap.Instance.addClickEvent(this.continueBtn, this, this.continueBtnCB);
            this.isShowHide = Math.random() * 100 < JJMgr.instance.dataConfig.front_hot_youxi;
            if (JJMgr.instance.dataConfig.is_allow_area && JJWxTrap.Instance.allowScene && this.isShowHide)
                JJWxBannerAd.Instance.showHideBanner();
        }
        onClosed() {
            JJWxBannerAd.Instance.clearShowHideBanner();
            Laya.timer.clearAll(this);
            this.ccb && this.ccb();
        }
        continueBtnCB() {
            if (JJWxTrap.Instance.NewWuchu && this.isShowHide && !this.hadClick) {
                this.hadClick = true;
                return;
            }
            CustomAdMgr.instance.hideGrid();
            this.visible = false;
            Laya.timer.once(100, this, () => {
                this.close();
            });
        }
    }

    class GridUI2 extends Laya.Scene {
        constructor() {
            super();
            this.ccb = null;
            this.hadClick = false;
            this.isShowHide = false;
        }
        onAwake() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
        }
        onClosed() {
            Laya.timer.clearAll(this);
            this.ccb && this.ccb();
        }
        onOpened(param) {
            let isFinishUI = false;
            if (param) {
                if (param.ccb) {
                    this.ccb = param.ccb;
                }
                if (param.isFinishUI) {
                    isFinishUI = param.isFinishUI;
                }
            }
            if (!JJWxTrap.Instance.NewWuchu2 || !JJMgr.instance.dataConfig.front_gezi_two_switch) {
                this.visible = false;
                Laya.timer.once(100, this, () => {
                    this.close();
                });
                return;
            }
            CustomAdMgr.instance.showGrid();
            JJWxTrap.Instance.addClickEvent(this.giveupBtn, this, this.continueBtnCB);
            this.isShowHide = Math.random() * 100 < JJMgr.instance.dataConfig.front_hot_tuijian;
            if (JJMgr.instance.dataConfig.is_allow_area && JJWxTrap.Instance.allowScene && this.isShowHide)
                JJWxBannerAd.Instance.showHideBanner();
        }
        continueBtnCB() {
            if (JJWxTrap.Instance.NewWuchu && this.isShowHide && !this.hadClick) {
                this.hadClick = true;
                return;
            }
            JJWxBannerAd.Instance.clearShowHideBanner();
            CustomAdMgr.instance.hideGrid();
            this.visible = false;
            Laya.timer.once(100, this, () => {
                this.close();
            });
        }
        adBtnCB() {
            this.continueBtnCB();
        }
    }

    class GridUI3 extends Laya.Scene {
        constructor() {
            super();
            this.ccb = null;
            this.hadClick = false;
            this.isShowHide = false;
        }
        onAwake() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
        }
        onClosed() {
            Laya.timer.clearAll(this);
            this.ccb && this.ccb();
        }
        onOpened(param) {
            if (param) {
                if (param.ccb) {
                    this.ccb = param.ccb;
                }
            }
            if (!JJWxTrap.Instance.NewWuchu2 || !JJMgr.instance.dataConfig.front_play_gezi_switch) {
                this.visible = false;
                Laya.timer.once(100, this, () => {
                    this.close();
                });
                return;
            }
            CustomAdMgr.instance.showGrid();
            JJWxTrap.Instance.addClickEvent(this.adBtn, this, this.adBtnCB);
            this.isShowHide = Math.random() * 100 < JJMgr.instance.dataConfig.front_hot_xiaochengxu;
            if (JJMgr.instance.dataConfig.is_allow_area && JJWxTrap.Instance.allowScene && this.isShowHide)
                JJWxBannerAd.Instance.showHideBanner();
        }
        continueBtnCB() {
            if (JJWxTrap.Instance.NewWuchu && this.isShowHide && !this.hadClick) {
                this.hadClick = true;
                return;
            }
            JJWxBannerAd.Instance.clearShowHideBanner();
            CustomAdMgr.instance.hideGrid();
            this.visible = false;
            Laya.timer.once(100, this, () => {
                this.close();
            });
        }
        adBtnCB() {
            this.continueBtnCB();
        }
    }

    class GridUI4 extends Laya.Scene {
        constructor() {
            super();
            this.ccb = null;
            this.hadClick = false;
            this.isShowHide = false;
        }
        onAwake() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
        }
        onClosed() {
            Laya.timer.clearAll(this);
            this.ccb && this.ccb();
        }
        onOpened(param) {
            if (param) {
                if (param.ccb) {
                    this.ccb = param.ccb;
                }
            }
            if (!JJWxTrap.Instance.NewWuchu2 || !JJMgr.instance.dataConfig.front_play_gezi_switch) {
                this.visible = false;
                Laya.timer.once(100, this, () => {
                    this.close();
                });
                return;
            }
            this.testGrid();
            Laya.timer.loop(1000, this, this.testGrid);
            JJWxTrap.Instance.addClickEvent(this.adBtn, this, this.adBtnCB);
            if (JJWxTrap.Instance.NewWuchu2)
                JJWxBannerAd.Instance.showHideBanner();
        }
        testGrid() {
            if (CustomAdMgr.instance.gridAdArr.length > 0 && !this.hadShow) {
                this.hadShow = true;
                CustomAdMgr.instance.showGrid();
            }
        }
        continueBtnCB() {
            if (JJWxTrap.Instance.NewWuchu && !this.hadClick) {
                this.hadClick = true;
                return;
            }
            JJWxBannerAd.Instance.clearShowHideBanner();
            CustomAdMgr.instance.hideGrid();
            this.visible = false;
            Laya.timer.once(100, this, () => {
                this.close();
            });
        }
        adBtnCB() {
            this.continueBtnCB();
        }
    }

    class RunUI extends Laya.Scene {
        constructor() {
            super();
            this.ccb = null;
            this.hadClick = false;
        }
        onOpened(param) {
            if (param) {
                if (param.ccb) {
                    this.ccb = param.ccb;
                }
            }
            if (!JJWxTrap.Instance.NewWuchu || !JJMgr.instance.dataConfig.front_run_switch) {
                this.visible = false;
                Laya.timer.once(100, this, () => {
                    this.close();
                });
                return;
            }
            JJWxTrap.Instance.addClickEvent(this.getBtn, this, this.getBtnCB);
            JJWxTrap.Instance.addClickEvent(this.adBtn, this, this.adBtnCB);
            this.gsMove();
            JJWxBannerAd.Instance.showBanner();
        }
        onAwake() {
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
        }
        onClosed() {
            JJWxBannerAd.Instance.hideBanner();
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this.gsNode);
            Laya.Tween.clearAll(this.renNode);
            this.ccb && this.ccb();
        }
        gsMove() {
            Laya.Tween.to(this.gsNode, { x: 750 - 100 }, 500, null, new Laya.Handler(this, () => {
                Laya.Tween.to(this.gsNode, { x: 750 + 100 }, 1000, null, new Laya.Handler(this, () => {
                    Laya.Tween.to(this.gsNode, { x: 750 }, 500, null, new Laya.Handler(this, () => {
                        this.gsMove();
                    }));
                }));
            }));
        }
        renMove1() {
            Laya.Tween.to(this.renNode, { x: 224 - 100 }, 500, null, new Laya.Handler(this, () => {
                Laya.Tween.to(this.renNode, { x: 224 + 100 }, 1000, null, new Laya.Handler(this, () => {
                    Laya.Tween.to(this.renNode, { x: 224 }, 500, null, new Laya.Handler(this, () => {
                        this.renMove1();
                    }));
                }));
            }));
        }
        renMove2(isAd = false) {
            if (isAd)
                this.ren.play(0, true, 'ani2');
            Laya.Tween.clearAll(this.renNode);
            this.renNode.x = 224;
            Laya.Tween.to(this.renNode, { x: 224 - 500 }, isAd ? 500 : 1000, null, new Laya.Handler(this, () => {
                this.close();
            }));
        }
        getBtnCB() {
            this.renMove2();
        }
        adBtnCB() {
            JJWxAd.Instance.showVideoAd(() => {
                this.renMove2(true);
            });
        }
    }

    class StartBoxUI extends Laya.Scene {
        constructor() {
            super();
            this.clickCount = 0;
            this.lianxu_num = 0;
            this.ccb = null;
            this.showCallback = null;
            this.hadShowBanner = false;
            this.preTime = 0;
            this.rateTime = 0;
            this.isforce = false;
        }
        onClosed() {
            if (Laya.Browser.onWeiXin)
                window['wx'].offShow(this.showCallback);
            Laya.timer.clearAll(this);
            CustomAdMgr.instance.hideGrid();
            JJWxBannerAd.Instance.hideBannerFun(true);
            if (this.lianxu_num > 0) {
                this.lianxu_num--;
                Laya.timer.once(100, this, () => {
                    this.openAgain();
                });
            }
            else {
                this.ccb && this.ccb();
            }
        }
        openAgain() {
            Laya.Scene.open('JJExport/StartBoxUI.scene', false, { lianxu_num: this.lianxu_num, ccb: this.ccb }, Laya.Handler.create(this, (v) => {
                Laya.stage.addChild(v);
            }));
        }
        onOpened(param) {
            this.clickCount = 0;
            this.size(Laya.stage.displayWidth, Laya.stage.displayHeight);
            this.minclicknum = Number(JJMgr.instance.dataConfig.front_box_clicks[0]);
            this.maxclicknum = Number(JJMgr.instance.dataConfig.front_box_clicks[1]);
            this.needClick = JJMgr.instance.GetRandom(this.minclicknum, this.maxclicknum - JJMgr.instance.dataConfig.front_progress_bar_reduce);
            this.isforce = JJMgr.instance.dataConfig.front_is_box_force;
            this.addProgerss = 1 / this.maxclicknum;
            JJWxTrap.Instance.addClickEvent(this.clickBtn, this, this.clickCB);
            console.log('this.needClick:', this.needClick);
            console.log('this.addProgerss:', this.addProgerss);
            JJWxBannerAd.Instance.hideBannerFun(true);
            this.ccb = param.ccb;
            this.lianxu_num = param.lianxu_num;
            this.hadShowBanner = false;
            this.pBar.value = 0;
            this.rateTime = 0;
            this.preTime = 0;
            Laya.timer.frameLoop(1, this, this.DecBar);
            if (Laya.Browser.onWeiXin) {
                this.showCallback = () => {
                    this.close();
                };
                window['wx'].onShow(this.showCallback);
            }
            JJWxBannerAd.Instance.showBanner();
        }
        closeCB() {
            this.close();
        }
        clickCB() {
            this.clickCount++;
            this.pBar.value += this.addProgerss;
            if (this.pBar.value > 1) {
                this.pBar.value = 1;
            }
            this.shakeBox();
            if (!this.hadShowBanner) {
                this.isforce = JJMgr.instance.dataConfig.front_is_box_force;
                let closeTime = JJMgr.instance.dataConfig.front_box_hide_time;
                let cb = () => {
                    this.hadShowBanner = true;
                    Laya.timer.once(closeTime, this, () => {
                        CustomAdMgr.instance.hideGrid();
                        if (Laya.Browser.onWeiXin && this.isforce) {
                            if (CustomAdMgr.instance.getIsError()) {
                                this.closeCB();
                            }
                            this.hadShowBanner = false;
                        }
                        else {
                            this.closeCB();
                        }
                    });
                    CustomAdMgr.instance.showGrid();
                };
                let diff = this.rateTime - this.preTime;
                let arr = JJMgr.instance.dataConfig.front_box_sulv_qujian;
                let randNum = this.getRandomItemInArr(arr);
                let strArr = randNum.split('|');
                let v1 = strArr[0];
                let v2 = strArr[1];
                if (this.pBar.value * 100 >= JJMgr.instance.dataConfig.front_box_sulv_start && parseFloat(v1) <= diff && diff <= parseFloat(v2)) {
                    console.log('宝箱触发频率：', diff);
                    if (JJMgr.instance.dataConfig.front_sulv_wuchu_switch) {
                        this.isforce = true;
                        closeTime = JJMgr.instance.dataConfig.front_fbox_hide_time;
                    }
                    cb();
                    return;
                }
                this.preTime = this.rateTime;
                if (this.pBar.value >= this.needClick * this.addProgerss && !this.hadShowBanner) {
                    console.log('宝箱触发进度');
                    cb();
                    return;
                }
                if (this.clickCount >= JJMgr.instance.dataConfig.front_box_click_count) {
                    console.log('点击次数', this.clickCount);
                    this.clickCount = 0;
                    cb();
                }
            }
        }
        shakeBox() {
            Laya.Tween.to(this.box, { rotation: -10 }, 100, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(this.box, { rotation: 10 }, 200, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(this.box, { rotation: 0 }, 100, null, Laya.Handler.create(this, () => {
                    }));
                }));
            }));
        }
        DecBar() {
            this.updateTest();
            this.pBar.value -= JJMgr.instance.dataConfig.front_progress_bar_return;
            if (this.pBar.value < 0) {
                this.pBar.value = 0;
            }
        }
        updateTest() {
            this.rateTime += Laya.timer.delta / 1000;
        }
        GetRandom(mix, max, isInt = true) {
            let w = max - mix;
            let r1 = Math.random() * w;
            r1 += mix;
            return isInt ? Math.floor(r1) : r1;
        }
        getRandomItemInArr(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }

    class EventMgr {
        static on(type, caller, listener, arg) {
            this.eventDispatcher.on(type, caller, listener, arg);
        }
        static event(type, data) {
            this.eventDispatcher.event(type, data);
        }
        static off(type, caller, listener) {
            this.eventDispatcher.off(type, caller, listener);
        }
        static offAllCaller(caller) {
            this.eventDispatcher.offAllCaller(caller);
        }
    }
    EventMgr.eventDispatcher = new Laya.EventDispatcher();

    var SceneUrl;
    (function (SceneUrl) {
        SceneUrl["Load"] = "scenes/Load.scene";
        SceneUrl["Home"] = "scenes/Home.scene";
        SceneUrl["Game"] = "scenes/Game.scene";
        SceneUrl["Over"] = "scenes/Over.scene";
    })(SceneUrl || (SceneUrl = {}));
    var ResType;
    (function (ResType) {
        ResType["SubPackage"] = "\u5206\u5305";
        ResType["Scene3D"] = "3D\u573A\u666F";
        ResType["SDK"] = "SDK";
    })(ResType || (ResType = {}));
    var EventType;
    (function (EventType) {
        EventType["Scene_GoHome"] = "Scene_GoHome";
        EventType["Scene_GoGame"] = "Scene_GoGame";
        EventType["Scene_GoOver"] = "Scene_GoOver";
        EventType["Progress_Load_Update"] = "Progress_Load_Update";
        EventType["Platform_Wake_Do"] = "Platform_Wake_Do";
        EventType["Platform_Hide_Do"] = "Platform_Hide_Do";
        EventType["Game_Coin_Update"] = "Game_Coin_Update";
        EventType["Game_ShipOn_Event"] = "Game_ShipOn_Event";
        EventType["Game_Over_Event"] = "Game_Over_Event";
        EventType["Game_EnemyAlive_Event"] = "Game_EnemyAlive_Event";
        EventType["Game_NpcCount_Event"] = "Game_NpcCount_Event";
        EventType["Game_SkinChange_Event"] = "Game_SkinChange_Event";
        EventType["Home_OpenShop_Event"] = "Home_OpenShop_Event";
        EventType["Home_CloseShop_Event"] = "Home_CloseShop_Event";
        EventType["Over_WeaponShow_Event"] = "Over_WeaponShow_Event";
        EventType["Over_ClothShow_Event"] = "Over_ClothShow_Event";
        EventType["Over_OpenEndItem_Event"] = "Over_OpenEndItem_Event";
        EventType["Over_CloseEndItem_Event"] = "Over_CloseEndItem_Event";
        EventType["Game_MoneyCount_Add"] = "Game_MoneyCount_Add";
    })(EventType || (EventType = {}));
    var SoundType;
    (function (SoundType) {
        SoundType["Bgm"] = "BGM";
        SoundType["Button"] = "Button";
        SoundType["FootStep"] = "FootStep";
        SoundType["CutGrass"] = "CutGrass";
        SoundType["Rescue"] = "Rescue";
        SoundType["Kill"] = "Kill";
        SoundType["EnemyHit"] = "EnemyHit";
        SoundType["BreakCase"] = "BreakCase";
        SoundType["Blast"] = "Blast";
        SoundType["Vent"] = "Vent";
        SoundType["Water"] = "Water";
        SoundType["BossShoot"] = "BossShoot";
        SoundType["BossHit"] = "BossHit";
        SoundType["Leave"] = "Leave";
        SoundType["GetDiamonds"] = "GetDiamonds";
        SoundType["Win"] = "Win";
        SoundType["Fail"] = "Fail";
    })(SoundType || (SoundType = {}));
    var FxType;
    (function (FxType) {
        FxType["BoomFX"] = "BoomFX";
        FxType["KillFX"] = "KillFX";
    })(FxType || (FxType = {}));

    class Platform {
        constructor() {
            this.isSubPackage = true;
            this.isVibrate = true;
        }
        init() {
            Platform.instance = this;
        }
        loadSubPackage(loadName, callback) {
            if (this.platformApi && this.isSubPackage) {
                let loadTask = this.platformApi.loadSubpackage({
                    name: loadName,
                    success: function (res) {
                        console.log("分包加载成功：", loadName);
                        callback.call(true, res);
                    },
                    fail: function (res) {
                        console.error("分包加载失败：", loadName, JSON.stringify(res));
                        callback.call(false, res);
                    }
                });
            }
            else {
                console.log("没有平台API");
                callback(true);
            }
        }
        showToast(msg, duration = 1000) {
            console.log(msg, duration.toString() + "ms");
        }
        vibrateShort() {
            if (this.platformApi && this.isVibrate)
                this.platformApi.vibrateShort();
        }
        vibrateLong() {
            if (this.platformApi && this.isVibrate)
                this.platformApi.vibrateLong();
        }
        regisiterCallback() {
            if (this.platformApi) {
                this.platformApi.offShow(this.onShowEvent);
                this.platformApi.onShow(this.onShowEvent);
                this.platformApi.offHide(this.onHideEvent);
                this.platformApi.onHide(this.onHideEvent);
            }
        }
        onShowEvent(e) {
            EventMgr.event(EventType.Platform_Wake_Do, e);
        }
        onHideEvent(e) {
            EventMgr.event(EventType.Platform_Hide_Do, e);
        }
        showVideo(success, fail) {
            this.showToast("无视频，默认发放奖励");
            success && success();
        }
    }

    class SaveData {
        static AddGrade() {
            let data = this.GetPlayerData();
            data.grade++;
            if (parseInt(data.grade) > 99) {
                data.grade = 99;
            }
            JJWxTrap.Instance.Level = data.grade;
            this.SavePlayerData(data);
        }
        static ReadGrade() {
            let data = this.GetPlayerData();
            return parseInt(data.grade);
        }
        static addClothRange() {
            let data = this.GetPlayerData();
            data.clothRange++;
            this.SavePlayerData(data);
        }
        static clearClothRange() {
            let data = this.GetPlayerData();
            data.clothRange = 0;
            this.SavePlayerData(data);
        }
        static addWeaponRange() {
            let data = this.GetPlayerData();
            data.weaponRange++;
            this.SavePlayerData(data);
        }
        static clearWeaponRange() {
            let data = this.GetPlayerData();
            data.weaponRange = 0;
            this.SavePlayerData(data);
        }
        static changeTargetCloth(value) {
            let data = this.GetPlayerData();
            data.targetCloth = value;
            this.SavePlayerData(data);
        }
        static changeTargetWeapon(value) {
            let data = this.GetPlayerData();
            data.targetWeapon = value;
            this.SavePlayerData(data);
        }
        static readEndInfo() {
            let data = this.GetPlayerData();
            return {
                targetCloth: data.targetCloth,
                targetWeapon: data.targetWeapon,
                clothRange: data.clothRange,
                weaponRange: data.weaponRange,
            };
        }
        static AddCoin(count) {
            let data = this.GetPlayerData();
            data.coin += count;
            if (data.coin > 99999)
                data.coin = 99999;
            Math.floor(data.coin);
            this.SavePlayerData(data);
            EventMgr.event(EventType.Game_Coin_Update);
        }
        static CostCoin(count) {
            let isBuy = false;
            if (this.ReadCoin() >= count) {
                this.AddCoin(-count);
                isBuy = true;
            }
            else {
                Platform.instance.showToast("金币不足");
            }
            return isBuy;
        }
        static ReadCoin() {
            let data = this.GetPlayerData();
            return Math.floor(data.coin);
        }
        static ReadClothUnlock(index) {
            let data = this.GetPlayerData();
            return data.clothUnlock[index];
        }
        static UnlockCloth(index) {
            let data = this.GetPlayerData();
            data.clothUnlock[index] = true;
            this.SavePlayerData(data);
        }
        static ReadWeaponUnlock(index) {
            let data = this.GetPlayerData();
            return data.weaponUnlcok[index];
        }
        static UnlockWeapon(index) {
            let data = this.GetPlayerData();
            data.weaponUnlcok[index] = true;
            this.SavePlayerData(data);
        }
        static ReadNowCloth() {
            let data = this.GetPlayerData();
            return data.nowCloth;
        }
        static SetNowCloth(index) {
            let data = this.GetPlayerData();
            data.nowCloth = index;
            this.SavePlayerData(data);
            EventMgr.event(EventType.Game_SkinChange_Event);
        }
        static ReadNowWeapon() {
            let data = this.GetPlayerData();
            return data.nowWeapon;
        }
        static SetNowWeapon(index) {
            let data = this.GetPlayerData();
            data.nowWeapon = index;
            this.SavePlayerData(data);
            EventMgr.event(EventType.Game_SkinChange_Event);
        }
        static GetPlayerData() {
            let data;
            data = Laya.LocalStorage.getJSON('PlayerData');
            if (data) {
                return data;
            }
            else {
                data = this.data;
                Laya.LocalStorage.setJSON('PlayerData', data);
                return data;
            }
        }
        static SavePlayerData(data) {
            Laya.LocalStorage.setJSON('PlayerData', data);
        }
        static ClearPlayerData() {
            Laya.LocalStorage.clear();
        }
        static CheckPlayerData() {
            let data;
            data = Laya.LocalStorage.getJSON('PlayerData');
            if (!data || !data.ver || data.ver != this.data.ver) {
                data = this.data;
                Laya.LocalStorage.setJSON('PlayerData', data);
                console.log("触发存档重置条件");
            }
            console.log(this.GetPlayerData());
        }
    }
    SaveData.data = {
        'ver': "ShadowKiller_0.9.0",
        'grade': 1,
        'coin': 0,
        'clothUnlock': [true, false, false, false, false, false, false, false, false],
        'weaponUnlcok': [true, false, false, false, false, false, false, false, false],
        'nowCloth': 0,
        'nowWeapon': 0,
        'clothRange': 0,
        'weaponRange': 0,
        'targetCloth': 1,
        'targetWeapon': 1,
    };

    class MainScene extends Laya.Scene {
        onAwake() {
            this.size(Laya.stage.width, Laya.stage.height);
            this.init();
            this.initEvent();
        }
        onClosed() {
            EventMgr.offAllCaller(this);
            Laya.timer.clearAll(this);
        }
        init() {
        }
        initEvent() {
        }
    }

    class Game extends MainScene {
        init() {
            Game.instance = this;
            if (SaveData.ReadGrade() == 1) {
                this.stage1Tips.set_visible(true);
            }
            else {
                this.stage1Tips.set_visible(false);
            }
        }
        initEvent() {
            EventMgr.on(EventType.Game_EnemyAlive_Event, this, this.enemyTargetUpdate);
            EventMgr.on(EventType.Game_NpcCount_Event, this, this.npcTargetUpdate);
        }
        enemyTargetUpdate(value) {
            let enemyItem = this.targetList.getChildByName("enemyItem");
            enemyItem.getChildByName("finishImage").set_visible(value.now == value.max);
            enemyItem.getChildByName("value").set_visible(value.now != value.max);
            enemyItem.getChildByName("value").value = value.now.toString() + "/" + value.max.toString();
        }
        npcTargetUpdate(value) {
            let npcItem = this.targetList.getChildByName("npcItem");
            npcItem.getChildByName("finishImage").set_visible(value.now == value.max);
            npcItem.getChildByName("value").set_visible(value.now != value.max);
            npcItem.getChildByName("value").value = value.now.toString() + "/" + value.max.toString();
        }
    }

    class SoundMgr {
        static init() {
            this._soundCtx = {};
            this._soundFile = [];
            this.loopSounds = [];
            for (var key in SoundType) {
                let sound = SoundType[key];
                this._soundFile.push(sound);
            }
            console.log("音效：", this._soundFile);
            let path = this._pathRoot;
            let file = "";
            let soundFile = this._soundFile;
            let soundCount = this._soundFile.length;
            for (let i = 0; i < soundCount; ++i) {
                file = soundFile[i];
                let innerAudioContext = new Laya.SoundChannel;
                innerAudioContext.url = path + file + this.soundType;
                Laya.SoundManager.addChannel(innerAudioContext);
                this._soundCtx[file] = true;
            }
            Laya.SoundManager.autoStopMusic = true;
            if (Laya.Browser.onWeiXin) {
                EventMgr.on(EventType.Platform_Wake_Do, this, this.randomPlayMusic);
                Laya.timer.once(1000, this, this.randomPlayMusic);
            }
        }
        static setSoundVolume(name, value) {
            if (this._soundCtx[name]) {
                Laya.SoundManager.setSoundVolume(value, this._pathRoot + name + this.soundType);
            }
        }
        static play(name, isLoop = false) {
            if (this._soundCtx[name]) {
                if (isLoop && this.loopSounds.indexOf(name) == -1) {
                    this.loopSounds.push(name);
                    return Laya.SoundManager.playSound(this._pathRoot + name + this.soundType, 0);
                }
                else {
                    return Laya.SoundManager.playSound(this._pathRoot + name + this.soundType);
                }
            }
        }
        static stop(name, isLoop = false) {
            if (this._soundCtx[name]) {
                if (isLoop) {
                    let index = this.loopSounds.indexOf(name);
                    if (index != -1)
                        this.loopSounds.splice(index, 1);
                }
                Laya.SoundManager.stopSound(this._pathRoot + name + this.soundType);
            }
        }
        static playMusic(name) {
            let soundChannel;
            Laya.SoundManager.stopMusic();
            if (name) {
                soundChannel = Laya.SoundManager.playMusic(this._pathRoot + name + this.soundType, 0);
                this.currentBgm = name;
            }
            else if (this.currentBgm) {
                soundChannel = Laya.SoundManager.playMusic(this._pathRoot + this.currentBgm + this.soundType, 0);
            }
            else {
                soundChannel = Laya.SoundManager.playMusic(this._pathRoot + SoundType.Bgm + this.soundType, 0);
            }
            return soundChannel;
        }
        static stopMusic() {
            Laya.SoundManager.stopMusic();
        }
        static randomPlayMusic() {
            let url = SoundType.Bgm;
            let channel = SoundMgr.playMusic(url);
            let time = GlData.musicTime;
            Laya.timer.once(time, this, this.randomPlayMusic);
        }
        static soundSwitch(isActive) {
            this.isSound = isActive;
            Laya.SoundManager.soundMuted = !this.isSound;
        }
        static muiscSwitch(isActive) {
            this.isMusic = isActive;
            Laya.SoundManager.musicMuted = !this.isMusic;
        }
        static playSoundLimit(name) {
            let isCanPlay = true;
            if (this.CDs[name]) {
                if (this.CDs[name] != 0) {
                    isCanPlay = false;
                }
            }
            if (isCanPlay) {
                let channel = this.play(name);
                if (channel)
                    this.CDs[name] = channel.duration * 200;
                Laya.timer.once(this.CDs[name], this, () => { this.CDs[name] = 0; });
            }
        }
    }
    SoundMgr._pathRoot = "res/sounds/";
    SoundMgr.soundType = ".mp3";
    SoundMgr.isSound = true;
    SoundMgr.isMusic = true;
    SoundMgr.CDs = {};

    class GlData {
        static bornGrassFx(pos) {
            if (this.isCanPlayGrassFx) {
            }
        }
        static playFootStepSound() {
            if (this.isCanPlayFootStepSound) {
                SoundMgr.playSoundLimit(SoundType.FootStep);
                this.isCanPlayFootStepSound = false;
                Laya.timer.once(this.footStepSoundCD, this, () => {
                    this.isCanPlayFootStepSound = true;
                });
            }
        }
        static playWaterSound() {
            if (this.isCanPlayWaterSound) {
                SoundMgr.playSoundLimit(SoundType.Water);
                this.isCanPlayWaterSound = false;
                Laya.timer.once(this.waterSoundCD, this, () => {
                    this.isCanPlayWaterSound = true;
                });
            }
        }
    }
    GlData.coinUrl = "ui/game/gold.png";
    GlData.musicTime = 66000;
    GlData.navJson = [];
    GlData.clothUnlockCount = [6, 10, 14, 18, 22, 26, 30, 34, 38];
    GlData.weaponUnlockCount = [8, 12, 16, 20, 24, 28, 32, 36, 40];
    GlData.killEnemy = 0;
    GlData.saveNpc = 0;
    GlData.diamondAdd = 10;
    GlData.killEnemyAdd = [15, 20];
    GlData.npcSaveDiamondAdd = 50;
    GlData.killBossDiamondAdd = [80, 100];
    GlData.nowMapIndex = 0;
    GlData.nowShipIndex = 2;
    GlData.nowLevelIndex = 0;
    GlData.colliderCount = 0;
    GlData.isShadowOn = true;
    GlData.isNpcCollider = true;
    GlData.isDropObj = true;
    GlData.nowNpcCount = 0;
    GlData.maxNpcCount = 0;
    GlData.groundMinX = 0;
    GlData.groundMaxX = 0;
    GlData.groundMinZ = 0;
    GlData.groundMaxZ = 0;
    GlData.grassCD = 25;
    GlData.isCanPlayGrassFx = true;
    GlData.footStepSoundCD = 650;
    GlData.isCanPlayFootStepSound = true;
    GlData.waterSoundCD = 650;
    GlData.isCanPlayWaterSound = true;

    class D3Tween {
        constructor() {
            this.tween = new Laya.Tween();
            this.tweens = [];
        }
        getTimeByFrame(frame) {
            return Math.round(1000 / 100 * frame);
        }
        toTween(target, value, time, completeFun, ease, isLocal = true) {
            this.target = target;
            this.isLocal = isLocal;
            if (!target || target.destroyed)
                return;
            var ov = {};
            var tv = {};
            if (value.pos) {
                var targetPos = isLocal ? target.transform.localPosition.clone() : target.transform.position.clone();
                ov.posX = targetPos.x;
                ov.posY = targetPos.y;
                ov.posZ = targetPos.z;
                tv.posX = value.pos.x;
                tv.posY = value.pos.y;
                tv.posZ = value.pos.z;
            }
            if (value.rot) {
                var targetRot = isLocal ? target.transform.localRotation.clone() : target.transform.rotation.clone();
                ov.rotX = targetRot.x;
                ov.rotY = targetRot.y;
                ov.rotZ = targetRot.z;
                ov.rotW = targetRot.w;
                tv.rotX = value.rot.x;
                tv.rotY = value.rot.y;
                tv.rotZ = value.rot.z;
                tv.rotW = value.rot.w;
            }
            if (value.sca) {
                var targetSca = target.transform.getWorldLossyScale().clone();
                ov.scaX = targetSca.x;
                ov.scaY = targetSca.y;
                ov.scaZ = targetSca.z;
                tv.scaX = value.sca.x;
                tv.scaY = value.sca.y;
                tv.scaZ = value.sca.z;
            }
            this.tween.to(ov, {
                posX: tv.posX, posY: tv.posY, posZ: tv.posZ,
                rotX: tv.rotX, rotY: tv.rotY, rotZ: tv.rotZ, rotW: tv.rotW,
                scaX: tv.scaX, scaY: tv.scaY, scaZ: tv.scaZ
            }, time, ease, Laya.Handler.create(this, () => {
                completeFun && completeFun();
                var nextTWeen = this.tweens.shift();
                if (!target || target.destroyed)
                    return;
                if (nextTWeen) {
                    this.toTween(this.target, nextTWeen.value, nextTWeen.time, nextTWeen.completeFun, ease);
                }
                else {
                    if (this.updateTweenCallback) {
                        this.updateTweenCallback = null;
                    }
                }
            }));
            var progressTimer = 0;
            this.tween.update = new Laya.Handler(this, () => {
                if (!target || target.destroyed)
                    return;
                progressTimer += Laya.timer.delta;
                let progress = progressTimer / time;
                if (progress > 1)
                    progress = 1;
                if (value.pos) {
                    if (isLocal) {
                        target.transform.localPosition = new Laya.Vector3(ov.posX, ov.posY, ov.posZ);
                    }
                    else {
                        target.transform.position = new Laya.Vector3(ov.posX, ov.posY, ov.posZ);
                    }
                }
                if (value.rot) {
                    if (isLocal) {
                        target.transform.localRotation = new Laya.Quaternion(ov.rotX, ov.rotY, ov.rotZ, ov.rotW);
                    }
                    else {
                        target.transform.rotation = new Laya.Quaternion(ov.rotX, ov.rotY, ov.rotZ, ov.rotW);
                    }
                }
                if (value.sca) {
                    target.transform.setWorldLossyScale(new Laya.Vector3(ov.scaX, ov.scaY, ov.scaZ));
                }
                this.updateTweenCallback && this.updateTweenCallback(progress);
            });
            return this;
        }
        clearTween(value) {
            this.tweens = [];
            this.tween.clear();
            if (this.target && value) {
                if (value.pos) {
                    if (this.isLocal) {
                        this.target.transform.localPosition = new Laya.Vector3(value.pos.x, value.pos.y, value.pos.z);
                    }
                    else {
                        this.target.transform.position = new Laya.Vector3(value.pos.x, value.pos.y, value.pos.z);
                    }
                }
                if (value.rot) {
                    this.target.transform.rotation = new Laya.Quaternion(value.rot.x, value.rot.y, value.rot.z, value.rot.w);
                }
                if (value.sca) {
                    this.target.transform.setWorldLossyScale(new Laya.Vector3(value.sca.x, value.sca.y, value.sca.z));
                }
            }
        }
        then(value, time, completeFun) {
            this.tweens.push({ value: value, time: time, completeFun: completeFun });
            return this;
        }
        toScaleTween(target, startScale, endScale, time, completeFun, ease = Laya.Ease.elasticOut) {
            if (target && !target.destroyed) {
                target.transform.localScale = startScale;
                this.toTween(target, { sca: endScale }, time, completeFun, ease);
            }
        }
    }

    class D3Comp extends Laya.Script3D {
        onAwake() {
            this.self = this.owner;
            this.selfTween = new D3Tween();
            this.init();
        }
        init() { }
        onDestroy() {
            Laya.timer.clearAll(this);
            this.selfTween.clearTween();
            EventMgr.offAllCaller(this);
            this.whenDestory();
        }
        whenDestory() { }
        tweenBornDo() {
            let tween = this.selfTween;
            tween.clearTween();
            this.self.transform.localScale = new Laya.Vector3(0, 0, 0);
            tween.toTween(this.self, { sca: new Laya.Vector3(1, 1, 1) }, 500, null, Laya.Ease.elasticOut);
        }
        tweenBornDo_Smooth() {
            let tween = this.selfTween;
            tween.clearTween();
            this.self.transform.localScale = new Laya.Vector3(0, 0, 0);
            tween.toTween(this.self, { sca: new Laya.Vector3(1, 1, 1) }, 500, null);
        }
        keepRotate() {
            Laya.timer.frameLoop(1, this, () => {
                let dt = Laya.timer.delta / 1000;
                this.self.transform.rotate(new Laya.Vector3(0, dt * 40, 0), false, false);
            });
        }
    }

    class BornController {
        static bornStageObj(name, parent = this.mainScene) {
            let prefab = this.prefabs.getChildByName(name);
            if (!prefab) {
                console.warn("生成物体不存在", name);
                return null;
            }
            let obj = Laya.Sprite3D.instantiate(prefab, parent);
            obj.transform.localPosition = new Laya.Vector3();
            this.stageObj.push(obj);
            this.fxPool = [];
            return obj;
        }
        static stageObjClear() {
            for (let i = this.stageObj.length - 1; i >= 0; i--) {
                if (this.stageObj[i] && !this.stageObj[i].destroyed) {
                    this.stageObj[i].destroy();
                }
            }
            this.stageObj.length = 0;
        }
        static bornFxDestroy(name, parent, destroyTime = 1000, scale = 1, offset = new Laya.Vector3()) {
            if (!this.isFxOn)
                return null;
            let prefab = this.fxs.getChildByName(name);
            let obj = prefab.clone();
            parent.addChild(obj);
            obj.transform.localPosition = offset;
            obj.transform.localRotationEuler = new Laya.Vector3();
            obj.transform.localScale = new Laya.Vector3(scale, scale, scale);
            Laya.timer.once(destroyTime, this, () => { obj.destroy(); });
            return obj;
        }
        static bornFxFromPool(name, parent, recyleTime = 1000, scale = 1, offset = new Laya.Vector3()) {
            let obj;
            for (let i = this.fxPool.length - 1; i >= 0; i--) {
                if (this.fxPool[i].name == name) {
                    obj = this.fxPool.splice(i, 1)[0];
                    obj.active = true;
                    break;
                }
            }
            if (!obj) {
                let prefab = this.fxs.getChildByName(name);
                obj = prefab.clone();
            }
            parent.addChild(obj);
            this.stageObj.push(obj);
            obj.transform.localPosition = offset;
            obj.transform.localRotationEuler = new Laya.Vector3();
            Laya.timer.once(recyleTime, this, () => {
                if (obj && !obj.destroyed) {
                    this.mainScene.addChild(obj);
                    obj.active = false;
                    this.fxPool.push(obj);
                }
            });
            return obj;
        }
        static bornFxStage(name, parent, scale = 1, offset = new Laya.Vector3()) {
            let prefab = this.fxs.getChildByName(name);
            let obj = prefab.clone();
            parent.addChild(obj);
            obj.transform.localPosition = offset;
            obj.transform.localRotationEuler = new Laya.Vector3();
            obj.transform.localScale = new Laya.Vector3(scale, scale, scale);
            this.stageObj.push(obj);
            return obj;
        }
    }
    BornController.stageObj = [];
    BornController.isFxOn = true;
    BornController.fxPool = [];

    class Vector3 {
        static add(v1, v2) {
            var v = new Laya.Vector3;
            Laya.Vector3.add(v1, v2, v);
            return v.clone();
        }
        static subtract(v1, v2) {
            var v = new Laya.Vector3;
            Laya.Vector3.subtract(v1, v2, v);
            return v.clone();
        }
        static mull(v1, multipy) {
            var v = new Laya.Vector3;
            Laya.Vector3.scale(v1, multipy, v);
            return v.clone();
        }
        static dot(v1, v2) {
            return Laya.Vector3.dot(v1, v2);
        }
        static cross(v1, v2) {
            var v = new Laya.Vector3;
            Laya.Vector3.cross(v1, v2, v);
            return v.clone();
        }
        static normalized(v) {
            var vTmp = new Laya.Vector3;
            Laya.Vector3.normalize(v, vTmp);
            return vTmp.clone();
        }
        static distance(v1, v2) {
            var vT = Vector3.subtract(v1, v2);
            var dis = Laya.Vector3.scalarLength(vT);
            return dis;
        }
    }

    class RoadData {
        constructor() {
            this.pos = new Laya.Vector3;
            this.rot = new Laya.Quaternion;
            this.state = "empty";
        }
    }
    class Paths extends D3Comp {
        updateCul() {
            let lastPoint = null;
            let roadLength = 0;
            for (let i = 0; i < this.self.numChildren; i++) {
                let point = this.self.getChildAt(i);
                if (lastPoint != null) {
                    let pointPos = point.transform.position.clone();
                    let pointRot = point.transform.rotation.clone();
                    let lastPointPos = lastPoint.transform.position.clone();
                    let lastPointRot = lastPoint.transform.rotation.clone();
                    if (point.name.indexOf("circle") == -1) {
                        roadLength += Vector3.distance(pointPos, lastPointPos);
                        this.endPos = pointPos;
                        this.endRot = pointRot;
                    }
                    else {
                        let data = point.name.split("_");
                        let center = pointPos;
                        let angle = 90;
                        let distance = Vector3.distance(center, lastPointPos);
                        let normal = new Laya.Vector3(0, 1, 0);
                        let way1 = Vector3.normalized(Vector3.subtract(center, lastPointPos));
                        let way2 = Vector3.cross(way1, normal);
                        let endPos1 = Vector3.mull(way1, distance);
                        let endPos2 = Vector3.mull(way2, distance);
                        let endPos3 = Vector3.add(endPos1, endPos2);
                        let endPos = Vector3.add(lastPointPos, endPos3);
                        roadLength += Math.PI / 2 * distance;
                        this.endPos = endPos;
                        this.endRot = pointRot;
                    }
                }
                else {
                }
                lastPoint = point;
            }
            this.roadLength = roadLength;
        }
        getPathNowPos(axis, horizontal) {
            let data = new RoadData();
            let pos = new Laya.Vector3();
            let rot = new Laya.Quaternion();
            let lastPoint = null;
            for (let i = 0; i < this.self.numChildren; i++) {
                let point = this.self.getChildAt(i);
                let dis = 0;
                if (lastPoint != null) {
                    let pointPos = point.transform.position.clone();
                    let pointRot = point.transform.rotation.clone();
                    let lastPointPos = lastPoint.transform.position.clone();
                    let lastPointRot = lastPoint.transform.rotation.clone();
                    if (point.name.indexOf("circle") == -1) {
                        dis = Vector3.distance(pointPos, lastPointPos);
                        if (axis < dis) {
                            let way = Vector3.normalized(Vector3.subtract(pointPos, lastPointPos));
                            pos = Vector3.add(lastPointPos, Vector3.mull(way, axis));
                            rot = pointRot;
                            break;
                        }
                    }
                    else {
                        let center = pointPos;
                        let distance = Vector3.distance(center, lastPointPos);
                        dis = Math.PI / 2 * distance;
                        if (axis < dis) {
                            let way1 = Vector3.normalized(Vector3.subtract(center, lastPointPos));
                            let normal = new Laya.Vector3(0, 1, 0);
                            let way2 = Vector3.cross(way1, normal);
                            let precentAxis = axis / dis;
                            let angleAxis = Math.PI / 2 * precentAxis;
                            let pos1 = Vector3.mull(way1, distance * (1 - Math.cos(angleAxis)));
                            let pos2 = Vector3.mull(way2, distance * Math.sin(angleAxis));
                            let pos3 = Vector3.add(pos1, pos2);
                            pos = Vector3.add(lastPointPos, pos3);
                            Laya.Quaternion.lerp(lastPointRot, pointRot, precentAxis, rot);
                            break;
                        }
                    }
                }
                axis -= dis;
                lastPoint = point;
            }
            data.pos = pos;
            data.rot = rot;
            return data;
        }
    }

    var RoadType;
    (function (RoadType) {
        RoadType["Road_1"] = "Road_1";
        RoadType["Road_2"] = "Road_2";
        RoadType["Road_3"] = "Road_3";
        RoadType["Road_4"] = "Road_4";
        RoadType["Road_5"] = "Road_5";
    })(RoadType || (RoadType = {}));
    class Set extends D3Comp {
        updateLength() {
            this.roadLength = 0;
            let endPos = this.self.transform.position.clone();
            let endRot = this.self.transform.rotation.clone();
            let Roads = this.self.getChildByName("Roads");
            for (let i = 0; i < Roads.numChildren; i++) {
                let obj = Roads.getChildAt(i);
                obj.transform.position = endPos;
                obj.transform.rotation = endRot;
                let path = obj.getChildByName("Path").getComponent(Paths);
                path.updateCul();
                endPos = path.endPos;
                endRot = path.endRot;
                this.roadLength += path.roadLength;
            }
            this.endPos = endPos;
            this.endRot = endRot;
        }
    }

    class Stage extends D3Comp {
        constructor() {
            super(...arguments);
            this.endAxis = 0;
        }
        setUpdate() {
            let endPos = this.self.transform.position.clone();
            let endRot = this.self.transform.rotation.clone();
            this.endAxis = 0;
            for (let i = 0; i < this.self.numChildren; i++) {
                let obj = this.self.getChildAt(i);
                obj.transform.position = endPos;
                obj.transform.rotation = endRot;
                let comp = obj.getComponent(Set);
                comp.updateLength();
                endPos = comp.endPos;
                endRot = comp.endRot;
                this.endAxis += comp.roadLength;
            }
        }
        getNowPos(axis, horizontal) {
            let data = new RoadData();
            let pos = new Laya.Vector3();
            let rot = new Laya.Quaternion();
            if (axis < 0) {
                data.pos = pos;
                data.rot = rot;
                data.state = "startPoint";
                return data;
            }
            let set = null;
            for (let i = 0; i < this.self.numChildren; i++) {
                set = this.self.getChildAt(i).getComponent(Set);
                if (set) {
                    if (axis < set.roadLength) {
                        break;
                    }
                    else {
                        axis -= set.roadLength;
                        set = null;
                    }
                }
            }
            if (set != null) {
                for (let i = 0; i < set.self.getChildByName("Roads").numChildren; i++) {
                    let obj = set.self.getChildByName("Roads").getChildAt(i);
                    if (obj.name.indexOf("Road") != -1) {
                        let path = obj.getChildByName("Path").getComponent(Paths);
                        if (axis < path.roadLength) {
                            data = path.getPathNowPos(axis, horizontal);
                            data.state = set.self.name + "_" + obj.name + "_" + axis.toString();
                            break;
                        }
                        else {
                            axis -= path.roadLength;
                        }
                    }
                }
            }
            else {
                set = this.self.getChildAt(this.self.numChildren - 1).getComponent(Set);
                axis = set.roadLength - 0.0001;
                for (let i = 0; i < set.self.getChildByName("Roads").numChildren; i++) {
                    let obj = set.self.getChildByName("Roads").getChildAt(i);
                    if (obj.name.indexOf("Road") != -1) {
                        let path = obj.getChildByName("Path").getComponent(Paths);
                        if (axis < path.roadLength) {
                            data = path.getPathNowPos(axis, horizontal);
                            break;
                        }
                        else {
                            axis -= path.roadLength;
                        }
                    }
                }
                data.state = "endPoint";
            }
            return data;
        }
    }

    class PosSet extends D3Comp {
        constructor() {
            super(...arguments);
            this.axis = 0;
            this.horizontal = 0;
        }
        init(...data) {
            this.model = this.self.getChildByName("Model");
            if (!this.model)
                this.model = this.self.getChildAt(0);
        }
        go() {
            if (this.stage != null) {
                let data = this.stage.getNowPos(this.axis, this.horizontal);
                this.self.transform.position = data.pos;
                this.self.transform.rotation = data.rot;
                if (!this.model)
                    this.model = this.self.getChildAt(0);
                if (this.model) {
                    this.model.transform.localPosition = new Laya.Vector3(-this.horizontal, this.model.transform.localPosition.y, this.model.transform.localPosition.z);
                    this.model.transform.localRotation = new Laya.Quaternion();
                }
            }
            else {
                if (BornController.stage) {
                    this.stage = BornController.stage.getComponent(Stage);
                }
            }
        }
    }

    class Player_RunMove extends D3Comp {
        constructor() {
            super(...arguments);
            this.forwardSpeed_Data = 2;
            this.speedAxis = 1;
            this.isCamCtrl = true;
            this.isMove = false;
            this.axis = 0;
            this.horizontal = 0;
            this.modelMoveRange = 10;
            this.camPointMoveRange = 2;
            this.forwardSpeed = 0;
            this.horizontalSensity = 0.12;
            this.forwardSensity = 0.15;
            this.wayAxis = 0;
            this.targetYpos = 0;
            this.lastHorizontal = 0;
            this.horizontalDt = 0;
            this.targetHorizontal = 0;
            this.inHorizontal = 0;
            this.isHit = false;
            this.hitTime = 250;
        }
        init() {
            Player_RunMove.instance = this;
            this.player = this.self;
            this.model = this.player.getChildByName("Model");
            this.camPoint = this.player.getChildByName("CamPoint");
            this.startCamPoint = this.player.getChildByName("CamStartPoint");
            this.mainCamera = Tool.d3_FindNodeByName(this.camPoint, "Main Camera");
            this.endCamPoint = this.player.getChildByName("CamEndPoint");
            this.forwardSpeed = this.forwardSpeed_Data;
            this.posSet = this.player.getComponent(PosSet);
        }
        reset(axis, horizontal) {
            this.isHit = false;
            this.axis = axis;
            this.horizontal = horizontal;
            this.targetHorizontal = horizontal;
            this.lastHorizontal = horizontal;
            this.speedAxis = 1;
            this.horizontalDt = 0;
            this.posSet.axis = axis;
            this.posSet.horizontal = this.modelMoveRange * this.horizontal;
            this.posSet.go();
            this.model.transform.localRotation = new Laya.Quaternion();
        }
        onUpdate() {
            let dtAxis = Laya.timer.delta / 16;
            if (this.forwardSpeed >= 0) {
                if (this.isMove) {
                    this.axis += this.forwardSpeed * this.forwardSensity * dtAxis * this.speedAxis;
                }
            }
            else if (this.forwardSpeed < 0) {
                this.axis += this.forwardSpeed * this.forwardSensity * dtAxis * this.speedAxis;
            }
            this.wayAxis = this.targetHorizontal - this.horizontal;
            this.horizontal += this.wayAxis * this.horizontalSensity * dtAxis;
            this.horizontalDt = this.horizontal - this.lastHorizontal;
            this.lastHorizontal = this.horizontal;
            if (this.isMove) {
                this.posSet.axis = this.axis;
            }
            this.posSet.horizontal = this.modelMoveRange * this.horizontal;
            ;
            this.posSet.go();
            if (this.isCamCtrl) {
                let camPos = this.camPoint.transform.localPosition.clone();
                camPos.x = this.startCamPoint.transform.localPosition.x - this.camPointMoveRange * this.horizontal;
                this.camPoint.transform.localPosition = camPos;
            }
        }
        changeHegiht(value) {
        }
        checkWay(targetWay) {
            let isEdge = false;
            this.targetHorizontal = this.inHorizontal + targetWay;
            if (this.targetHorizontal > 0.5) {
                this.targetHorizontal = 0.5;
                this.checkOut();
                isEdge = true;
            }
            else if (this.targetHorizontal < -0.5) {
                this.targetHorizontal = -0.5;
                this.checkOut();
                isEdge = true;
            }
            return isEdge;
        }
        checkOut() {
            this.inHorizontal = this.targetHorizontal;
        }
        Hit(sca = 1) {
            this.forwardSpeed = -0.35 * sca;
            this.isHit = true;
            Laya.timer.once(this.hitTime, this, this.HitEnd);
            Laya.timer.frameLoop(1, this, this.HitUpdate);
        }
        HitEnd() {
            this.isHit = false;
        }
        HitUpdate() {
            this.forwardSpeed += 0.035 * Laya.timer.delta / 16;
            if (this.forwardSpeed >= this.forwardSpeed_Data) {
                Laya.timer.clear(this, this.HitUpdate);
                this.forwardSpeed = this.forwardSpeed_Data;
            }
        }
        HitHorizontal(setHorizontal) {
            this.horizontal = (this.horizontal + setHorizontal) / this.modelMoveRange * 2;
            this.targetHorizontal = this.horizontal;
            this.checkOut();
        }
        onDisable() {
        }
    }

    class BossBullet extends D3Comp {
        constructor() {
            super(...arguments);
            this.speed = 2;
            this.direction = new Laya.Vector3;
            this.dis = 0;
            this.endDis = 10000;
        }
        init() {
            BossBullet.bullet.push(this);
            this.findCollider();
        }
        findCollider() {
            this.colliderSprite = Tool.d3_FindNodeHasName(this.self, "collider_box");
            var info = this.colliderSprite.name.split("_");
            this.range = parseFloat(info[2]);
            this.width = parseFloat(info[3]);
            this.isColliderActive = true;
        }
        onUpdate() {
            let dt = Laya.timer.delta / 1000;
            if (dt > 0.05)
                dt = 0.05;
            let pos = this.self.transform.position.clone();
            let goDis = this.speed * 1 * dt;
            pos = Vector3.add(pos, Vector3.mull(this.direction, goDis));
            this.dis += goDis;
            this.self.transform.position = pos;
            if (this.dis >= this.endDis) {
                this.colliderDo();
            }
        }
        colliderDo() {
            this.self.active = false;
            this.isColliderActive = false;
        }
    }
    BossBullet.bullet = [];

    class Nimo3D {
        static BoxToBox(a, b) {
            return (a.minX <= b.maxX && a.maxX >= b.minX) &&
                (a.minY <= b.maxY && a.maxY >= b.minY) &&
                (a.minZ <= b.maxZ && a.maxZ >= b.minZ);
        }
        static SphereToSphere(sphere1, sphere2) {
            let distancePow2 = Math.pow(sphere1.x - sphere2.x, 2) + Math.pow(sphere1.y - sphere2.y, 2) + Math.pow(sphere1.z - sphere2.z, 2);
            let radiusPow2 = Math.pow(sphere1.radius, 2) + Math.pow(sphere2.radius, 2);
            return distancePow2 < radiusPow2;
        }
        static SphereToBox(sphere, box) {
            var x = Math.max(box.minX, Math.min(sphere.x, box.maxX));
            var y = Math.max(box.minY, Math.min(sphere.y, box.maxY));
            var z = Math.max(box.minZ, Math.min(sphere.z, box.maxZ));
            var distance = Math.sqrt((x - sphere.x) * (x - sphere.x) +
                (y - sphere.y) * (y - sphere.y) +
                (z - sphere.z) * (z - sphere.z));
            return distance < sphere.radius;
        }
        static calcBounds(meshObj) {
            let pos = [];
            meshObj.meshFilter.sharedMesh.getPositions(pos);
            let newSprtit3D = new Laya.Sprite3D();
            meshObj.addChild(newSprtit3D);
            for (let i = 0; i < pos.length; i++) {
                newSprtit3D.transform.localPosition = new Laya.Vector3(pos[i].x, pos[i].y, pos[i].z);
                pos[i] = newSprtit3D.transform.position.clone();
            }
            let maxX = pos[0].x;
            let maxY = pos[0].y;
            let maxZ = pos[0].z;
            let minX = maxX;
            let minY = maxY;
            let minZ = maxZ;
            for (var i = 0; i < pos.length; i++) {
                maxX = Math.max(maxX, pos[i].x);
                maxY = Math.max(maxY, pos[i].y);
                maxZ = Math.max(maxZ, pos[i].z);
                minX = Math.min(minX, pos[i].x);
                minY = Math.min(minY, pos[i].y);
                minZ = Math.min(minZ, pos[i].z);
            }
            let xDis = maxX - minX;
            let yDis = maxY - minY;
            let zDis = maxZ - minZ;
            return {
                maxX: maxX,
                maxY: maxY,
                maxZ: maxZ,
                minX: minX,
                minY: minY,
                minZ: minZ,
                raidus: (xDis + yDis + zDis) / 6
            };
        }
        static calculateDistance(pt1, pt2, pt) {
            if (CollderController.isTestOn)
                GlData.colliderCount += 2;
            let egdeV1 = Vector3.subtract(pt2, pt1);
            let egdeV2 = Vector3.subtract(pt, pt1);
            let v1Norm = Vector3.normalized(egdeV1.clone());
            let v2Norm = Vector3.normalized(egdeV2.clone());
            let cos1 = Vector3.dot(v1Norm, v2Norm);
            let egdeV3 = Vector3.subtract(pt, pt2);
            let egdeV4 = Vector3.subtract(pt1, pt2);
            let v3Norm = Vector3.normalized(egdeV3.clone());
            let v4Norm = Vector3.normalized(egdeV4.clone());
            let cos2 = Vector3.dot(v3Norm, v4Norm);
            cos2 = Math.abs(cos2);
            if (cos2 > 0 && cos1 > 0) {
                let sin = Math.sqrt(1 - cos1 * cos1);
                let yDistance = Vector3.distance(pt1, pt);
                let distance = yDistance * sin;
                let xDistance = yDistance * cos1;
                let dir = Vector3.mull(Vector3.normalized(egdeV1.clone()), xDistance);
                let targetPt = Vector3.add(pt1.clone(), dir);
                return { 'pt1': pt1, 'pt2': pt2, 'pt': pt, 'distance': distance, 'goDistance': xDistance, 'rayDistance': Vector3.distance(pt1, pt2) };
            }
            return null;
        }
    }

    class CamFollow extends Laya.Script {
        constructor() {
            super(...arguments);
            this.offset = new Laya.Vector3(0, 0, 0);
            this.offsetXMin = 0;
            this.offsetXMax = 0;
            this.offsetZMin = 0;
            this.offsetZMax = 0;
            this.speed = 1;
        }
        onAwake() {
            CamFollow.instance = this;
            this.self = this.owner;
            this.camera = this.self.getChildAt(0).getChildAt(0);
        }
        setTarget(target, offset) {
            this.target = target;
            this.offset = offset;
        }
        onLateUpdate() {
            if (this.target) {
                let dt = Laya.timer.delta / 1000;
                var targetPos = this.target.transform.position.clone();
                var selfPos = this.self.transform.position.clone();
                var nowOffset = Vector3.subtract(selfPos, targetPos);
                if (nowOffset.x < this.offset.x + this.offsetXMin) {
                    nowOffset.x = this.offset.x + this.offsetXMin;
                }
                else if (nowOffset.x > this.offset.x + this.offsetXMax) {
                    nowOffset.x = this.offset.x + this.offsetXMax;
                }
                else if (this.offsetXMin == 0 && this.offsetXMax == 0) {
                    nowOffset.x = this.offset.x;
                }
                if (nowOffset.z < this.offset.z + this.offsetZMin) {
                    nowOffset.z = this.offset.z + this.offsetZMin;
                }
                else if (nowOffset.z > this.offset.z + this.offsetZMax) {
                    nowOffset.z = this.offset.z + this.offsetZMax;
                }
                else if (this.offsetZMin == 0 && this.offsetZMax == 0) {
                    nowOffset.z = this.offset.z;
                }
                var shouldGoPos = Vector3.add(targetPos, nowOffset);
                var goPos = new Laya.Vector3();
                let lerpAxis = 10 * this.speed * dt;
                if (lerpAxis > 1)
                    lerpAxis = 1;
                Laya.Vector3.lerp(selfPos, shouldGoPos, lerpAxis, goPos);
                this.self.transform.position = goPos;
            }
        }
        GoPointRightNow(point) {
            this.target = point;
            this.self.transform.position = point.transform.position.clone();
            this.self.transform.rotation = point.transform.rotation.clone();
        }
        GoPosRightNow(pos, rot) {
            this.self.transform.position = pos;
            this.self.transform.rotation = rot;
        }
        GoTargetNow() {
            if (this.target) {
                var targetPos = this.target.transform.position.clone();
                var selfPos = this.self.transform.position.clone();
                var nowOffset = Vector3.subtract(selfPos, targetPos);
                if (nowOffset.x < this.offset.x + this.offsetXMin) {
                    nowOffset.x = this.offset.x + this.offsetXMin;
                }
                else if (nowOffset.x > this.offset.x + this.offsetXMax) {
                    nowOffset.x = this.offset.x + this.offsetXMax;
                }
                else if (this.offsetXMin == 0 && this.offsetXMax == 0) {
                    nowOffset.x = this.offset.x;
                }
                if (nowOffset.z < this.offset.z + this.offsetZMin) {
                    nowOffset.z = this.offset.z + this.offsetZMin;
                }
                else if (nowOffset.z > this.offset.z + this.offsetZMax) {
                    nowOffset.z = this.offset.z + this.offsetZMax;
                }
                else if (this.offsetZMin == 0 && this.offsetZMax == 0) {
                    nowOffset.z = this.offset.z;
                }
                var shouldGoPos = Vector3.add(targetPos, nowOffset);
                this.self.transform.position = shouldGoPos;
            }
        }
    }

    var TouchEventType;
    (function (TouchEventType) {
        TouchEventType["start"] = "touchStart";
        TouchEventType["move"] = "touchMove";
        TouchEventType["end"] = "touchEnd";
        TouchEventType["getAxis"] = "GetAxis";
        TouchEventType["slideWay"] = "slideWay";
        TouchEventType["singleTouchStart"] = "singleTouchStart";
        TouchEventType["singleTouchMove"] = "singleTouchMove";
        TouchEventType["singleTouchEnd"] = "singleTouchEnd";
        TouchEventType["secondTouchStart"] = "secondTouchStart";
        TouchEventType["secondTouchMove"] = "secondTouchMove";
        TouchEventType["secondTouchEnd"] = "secondTouchEnd";
        TouchEventType["getAxisAlways"] = "getAxisAlways";
        TouchEventType["keyDown"] = "keyDown";
        TouchEventType["joyAxis"] = "joyAxis";
    })(TouchEventType || (TouchEventType = {}));
    class TouchScan extends Laya.Script {
        constructor() {
            super(...arguments);
            this.isPressed = false;
            this.hOriginal = 0;
            this.vOriginal = 0;
            this.hAxis = 0;
            this.vAxis = 0;
            this.outAxis = 0;
            this.touchId = -1;
        }
        onEnable() {
            TouchScan.instance = this;
        }
        onMouseDown(e) {
            EventMgr.event(TouchEventType.start, [e]);
        }
        onMouseMove(e) {
            EventMgr.event(TouchEventType.move, [e]);
        }
        onMouseOut(e) {
            EventMgr.event(TouchEventType.end, [e]);
        }
        onMouseOver(e) {
            EventMgr.event(TouchEventType.end, [e]);
        }
        onMouseUp(e) {
            EventMgr.event(TouchEventType.end, [e]);
        }
    }

    class NavMeshAgent extends D3Comp {
        constructor() {
            super(...arguments);
            this.navMeshGroup = null;
            this.navEnabled = false;
            this.updateRotation = false;
            this._pathPending = false;
            this._path = null;
            this._pathp = 0;
            this._pathlen = 0;
            this._remainingDistance = 1;
            this.destination = null;
            this.speed = 1;
            this.steeringTarget = new Laya.Vector3();
            this._velocity = new Laya.Vector3();
            this.out = new Laya.Vector3();
        }
        init() {
            let navJson = GlData.navJson[GlData.nowLevelIndex];
            let zoneNodes = NevMesh.buildNodesByJson(navJson);
            let name = 'stageNav';
            NevMesh.setZoneData(name, zoneNodes);
            this.navMeshGroup = NevMesh.getGroup(name, this.self.transform.position.clone());
            this.zoneName = name;
        }
        go(targetPos) {
            this.navEnabled = false;
            this.path = [];
            let calculatedPath = NevMesh.findPath(this.self.transform.position.clone(), targetPos, this.zoneName, this.navMeshGroup);
            if (calculatedPath && calculatedPath.length) {
                var debugPath = (calculatedPath);
                var p = [];
                for (var i = 0; i < debugPath.length; i++) {
                    p.push(new Laya.Vector3(debugPath[i].x, debugPath[i].y, debugPath[i].z));
                }
                this._pathlen = 0;
                this._pathp = 0;
                this.path = [this.self.transform.position.clone()].concat(p);
                this.navEnabled = true;
            }
            else {
                this.navEnabled = false;
            }
        }
        canGoOrNot(targetPos) {
            if (NevMesh.checkPointCanGo(targetPos, this.zoneName, this.navMeshGroup)) {
                return true;
            }
            else {
                return false;
            }
        }
        onUpdate() {
            if (this.navEnabled) {
                if (this._path) {
                    var v = new Laya.Vector3;
                    var tp = null;
                    for (var i = this._pathp; i < this._path.length - 1; i++) {
                        var p0 = this._path[i];
                        var p1 = this._path[i + 1];
                        this._pathlen = this._pathlen + this.speed * Laya.timer.delta / 1000;
                        var tlen = Laya.Vector3.distance(p0, p1);
                        if (this._pathlen > tlen) {
                            this._pathlen -= tlen;
                            this._pathp++;
                        }
                        else {
                            tp = p0.clone();
                            p1.cloneTo(this.steeringTarget);
                            Laya.Vector3.subtract(p1, p0, v);
                            Laya.Vector3.normalize(v, v);
                            Laya.Vector3.scale(v, this._pathlen, v);
                            Laya.Vector3.add(p0, v, tp);
                            break;
                        }
                    }
                    if (tp == null) {
                        this._pathPending = false;
                        tp = this._path[this._path.length - 1];
                        this._path[this._path.length - 1].cloneTo(this.steeringTarget);
                    }
                    this.self.transform.position = tp;
                }
                else {
                    var now = this.self.transform.position.clone();
                    this.out.x = now.x + this.velocity.x * Laya.timer.delta / 1000;
                    this.out.y = now.y + this.velocity.y * Laya.timer.delta / 1000;
                    this.out.z = now.z + this.velocity.z * Laya.timer.delta / 1000;
                    if (this.navMeshGroup == null) {
                        this.out.cloneTo(now);
                        this.self.transform.position = now;
                    }
                }
            }
        }
        get remainingDistance() {
            if (this.destination && this.self) {
                return Vector3.distance(this.destination, this.self.transform.position.clone());
            }
            return this._remainingDistance;
        }
        set remainingDistance(value) {
            this._remainingDistance = value;
        }
        get velocity() {
            return this._velocity;
        }
        set velocity(value) {
            this._velocity = value;
            this.destination = null;
        }
        get path() {
            return this._path;
        }
        set path(value) {
            this._path = value;
            if (value) {
                this._pathPending = true;
            }
            else {
                this._pathPending = false;
            }
            this._pathp = 0;
            this._pathlen = 0;
        }
    }

    class Character_Third extends D3Comp {
        constructor() {
            super(...arguments);
            this.speed = 5;
            this.isDead = false;
            this.xAxis = 0;
            this.zAxis = 0;
            this.nowAngle = 0;
            this.isControl = false;
            this.isWater = false;
            this.isCover = false;
            this.isVent = false;
            this.isOtherAnimUsing = false;
            this.isFast = true;
            this.fastScale = 2;
            this.slowScale = 0.5;
            this.attackDoRange = 1.5;
            this.rotLerpAxis = 0.1;
        }
        init() {
            Character_Third.charaters.push(this);
            this.agent = this.self.addComponent(NavMeshAgent);
            this.agent.navEnabled = false;
            this.model = this.self.getChildByName("Model");
            this.anim = this.model.getComponent(Laya.Animator);
            this.cover = this.self.getChildByName("Cover");
            this.cover.active = false;
            this.water = this.self.getChildByName("Water");
            this.water.active = false;
            this.noCover();
            this.noWater();
            this.nowAngle = 0;
            this.model.transform.localRotation = new Laya.Quaternion();
            this.skin = this.model.getChildByName("Skin");
            this.dead = this.model.getChildByName("Dead");
            this.backWeapon = Tool.d3_FindNodeByName(this.model, "BackWeapon");
            this.weaponGrip = Tool.d3_FindNodeByName(this.model, "WeaponGrip");
            this.findCollider();
            this.isDead = false;
            this.idle();
            this.skinChange();
            this.specialInit();
        }
        specialInit() {
        }
        findCollider() {
            this.colliderSprite = Tool.d3_FindNodeHasName(this.self, "collider_box");
            var info = this.colliderSprite.name.split("_");
            this.range = parseFloat(info[2]);
            this.width = parseFloat(info[3]);
            this.isColliderActive = true;
        }
        onUpdate() {
        }
        skinChange(skinIndex = 1, weaponIndex = 1, isDead = false, isEnemy = false, isBoss = false, isWeaponShow = true) {
            let enemyIndex = this.skin.numChildren - 1;
            let bossIndex = this.skin.numChildren;
            let index;
            if (isEnemy) {
                index = enemyIndex;
                weaponIndex = enemyIndex;
            }
            else if (isBoss) {
                index = bossIndex;
                weaponIndex = bossIndex;
            }
            else {
                index = skinIndex;
            }
            index--;
            weaponIndex--;
            this.backWeapon.active = false;
            this.weaponGrip.active = false;
            this.skin.active = false;
            let deadSkin = this.dead.getChildByName("Skin");
            if (isDead) {
            }
            else {
                Tool.d3_unactiveAllChildren(deadSkin);
                deadSkin.getChildAt(index).active = true;
                Tool.d3_unactiveAllChildren(this.skin);
                Tool.d3_unactiveAllChildren(this.weaponGrip);
                this.skin.active = true;
                this.weaponGrip.active = true;
                this.skin.getChildAt(index).active = true;
                this.weaponGrip.getChildAt(weaponIndex).active = true;
            }
            if (!isEnemy && !isBoss && !isDead) {
                this.backWeapon.active = true;
                Tool.d3_unactiveAllChildren(this.backWeapon);
                this.backWeapon.getChildAt(index).active = true;
            }
            if (!isWeaponShow)
                this.weaponGrip.active = false;
        }
        beCover() {
            this.isCover = true;
            this.beCoverSpecail();
            this.waterAndCoverChange();
        }
        noCover() {
            this.isCover = false;
            this.noCoverSpecail();
            this.waterAndCoverChange();
        }
        beWater() {
            this.isWater = true;
            this.beWaterSpecail();
            this.waterAndCoverChange();
        }
        noWater() {
            this.isWater = false;
            this.noWaterSpecail();
            this.waterAndCoverChange();
        }
        waterAndCoverChange() {
            let coverActive = !this.isWater && this.isCover && !this.isVent;
            if (!this.cover.active && coverActive) {
            }
            this.cover.active = coverActive;
            let waterActive = this.isWater && !this.isVent;
            if (!this.water.active && waterActive) {
                GlData.playWaterSound();
            }
            this.water.active = waterActive;
            let modelRot = this.model.transform.rotation.clone();
            this.cover.transform.rotation = modelRot;
            this.water.transform.rotation = modelRot;
            this.model.transform.localScale = !this.isWater && !this.isCover ? new Laya.Vector3(0.8, 0.8, 0.8) : new Laya.Vector3(0, 0, 0);
            if (this.isVent) {
                this.model.transform.localScale = new Laya.Vector3(0.8, 0.8, 0.8);
            }
        }
        beWaterSpecail() { }
        noWaterSpecail() { }
        beCoverSpecail() { }
        noCoverSpecail() { }
        idle() {
            if (this.isDead)
                return;
            this.anim.speed = 1;
            this.anim.crossFade("idle", 0.1, 0, 0);
            this.isOtherAnimUsing = false;
        }
        fastCheck() {
            this.isFast = Character_Enemy.checkAliveEnemy() != 1;
            if (Character_Enemy.checkLastAliveEnemyIsBoss()) {
                this.isFast = true;
            }
            if (this.self.name == "Player") {
                if (this.isFast) {
                    Laya.timer.scale = 1;
                }
                else {
                    Laya.timer.scale = 0.5;
                }
            }
        }
        jump() {
            if (this.isOtherAnimUsing) {
                this.jumpEnd();
                return;
            }
            if (this.isWater) {
                this.jumpEnd();
                return;
            }
            this.isOtherAnimUsing = true;
            this.controlOff();
            this.anim.crossFade("jump", 0.1, 0, 0);
            this.anim.getControllerLayer(1).defaultWeight = 0;
            Laya.timer.once(600, this, this.jumpEnd);
        }
        jumpEnd() {
            this.xAxis = 0;
            this.zAxis = 0;
            this.controlOn();
            this.idle();
        }
        attack(attackTarget) {
            if (this.isOtherAnimUsing) {
                return;
            }
            if (this.isWater) {
                this.attackEnd();
                return;
            }
            this.fastCheck();
            if (this.isFast) {
                this.anim.speed = this.fastScale;
            }
            else {
            }
            this.anim.crossFade("attack", 0.1, 0, 0);
            this.isOtherAnimUsing = true;
            this.attackTarget = attackTarget;
            let attackDoTime = 600;
            let attackEndTime = 800;
            if (this.isFast) {
                attackDoTime /= this.fastScale;
                attackEndTime /= this.fastScale;
            }
            else {
            }
            Laya.timer.once(attackDoTime, this, this.attackDo);
            Laya.timer.once(attackEndTime, this, this.attackEnd);
            this.attackSpecial();
        }
        attackMove() {
            this.moveControl(this.xAxis * 0.2, this.zAxis * 0.2);
        }
        attackSpecial() {
        }
        attackDo() {
            if (this.isDead)
                return;
            let dir = Vector3.subtract(this.self.transform.position.clone(), this.attackTarget.self.transform.position.clone());
            let dis = Laya.Vector3.scalarLength(dir);
            let forward = new Laya.Vector3;
            this.model.transform.getForward(forward);
            let isInRange = dis < this.attackDoRange && Tool.getAngle(forward, dir) < 90;
            if (isInRange) {
                this.attackDoSpecial();
                this.attackTarget.goDead();
            }
            if (Laya.timer.scale == 0.5) {
                Laya.timer.scale = 1;
            }
        }
        attackEnd() {
            if (this.isDead)
                return;
            this.idle();
            this.attackEndSpecial();
        }
        attackEndSpecial() {
        }
        attackDoSpecial() {
        }
        goDead() {
            this.isDead = true;
            this.anim.speed = 1;
            this.cover.active = false;
            this.model.transform.localScale = new Laya.Vector3(0.8, 0.8, 0.8);
            this.moveControl(0, 0, false);
            this.rotControl(0, 0);
            this.anim.play("dead", 0, 0);
            this.noWater();
            this.noCover();
            this.deadSpecial();
        }
        deadSpecial() {
        }
        controlOn() {
            this.isControl = true;
        }
        controlOff() {
            this.isControl = false;
        }
        joyControl(x, y) {
            this.xAxis = x;
            this.zAxis = y;
        }
        moveControl(x, y, isMove = true) {
            var dt = Laya.timer.delta / 1000;
            if (dt > 1)
                dt = 1;
            var pos = this.self.transform.position.clone();
            this.agent.speed = this.speed;
            var delta = new Laya.Vector3(x, 0, y);
            if (!this.isOtherAnimUsing) {
                var length = Laya.Vector3.scalarLength(delta);
                if (length > 1) {
                    delta = Vector3.normalized(delta);
                    length = 1;
                }
                if (length > 0.75 && !this.isWater && !this.isCover && !this.isDead) {
                    GlData.playFootStepSound();
                }
                else if (length > 0.75 && this.isWater && !this.isDead) {
                    GlData.playWaterSound();
                }
            }
            else {
                var length = 0;
            }
            this.anim.getControllerLayer(1).defaultWeight = length;
            var deltaX = delta.x * this.speed * dt;
            var deltaZ = delta.z * this.speed * dt;
            pos.x -= deltaX;
            pos.z += deltaZ;
            if (isMove) {
                if (this.agent.canGoOrNot(pos)) {
                    this.self.transform.position = pos;
                }
                else {
                    pos.x += deltaX;
                    if (this.agent.canGoOrNot(pos)) {
                        this.self.transform.position = pos;
                    }
                    else {
                        pos.x -= deltaX;
                        pos.z -= deltaZ;
                        if (this.agent.canGoOrNot(pos)) {
                            this.self.transform.position = pos;
                        }
                    }
                }
            }
        }
        rotControl(x, y) {
            var dt = Laya.timer.delta / 1000;
            let xAxis = x;
            let zAxis = y;
            let joyAngle;
            if (xAxis == 0 && zAxis == 0) {
                joyAngle = this.nowAngle;
            }
            if (zAxis == 1 && xAxis == 0) {
                joyAngle = 0;
            }
            else if (zAxis == -1 && xAxis == 0) {
                joyAngle = 180;
            }
            else {
                let hudu = Math.atan2(xAxis, zAxis);
                joyAngle = hudu * 180 / Math.PI;
            }
            let goAngle = joyAngle;
            let distance = goAngle - this.nowAngle;
            if (goAngle - this.nowAngle > 180) {
                distance -= 360;
            }
            else if (this.nowAngle - goAngle > 180) {
                distance += 360;
            }
            let lerpAxis = this.rotLerpAxis;
            let goAxis = distance * lerpAxis;
            this.nowAngle += goAxis;
            if (this.nowAngle > 180) {
                this.nowAngle -= 360;
            }
            else if (this.nowAngle <= -180) {
                this.nowAngle += 360;
            }
            let angle = -this.nowAngle;
            let nowRot = this.model.transform.rotationEuler.clone();
            let targetRot = nowRot.clone();
            targetRot.y = angle;
            this.model.transform.rotationEuler = targetRot;
        }
    }
    Character_Third.charaters = [];

    class Character_Player extends Character_Third {
        constructor() {
            super(...arguments);
            this.follow = null;
            this.oldPoses = [];
            this.isArrive = false;
            this.oldPos = new Laya.Vector3;
            this.arriveCount = 0;
            this.isColliderActive = false;
            this.hasCollider = [];
        }
        specialInit() {
            Character_Player.instance = this;
            this.skinChange(1, 1);
            this.attackDoRange = 2;
            this.oldPoses.length = 0;
            this.arriveCount = 0;
            let selfPos = this.self.transform.position.clone();
            Laya.timer.frameOnce(1, this, () => {
                CamFollow.instance.GoTargetNow();
            });
            this.isArrive = false;
            for (let i = 0; i < 100; i++) {
                this.oldPoses.push(selfPos);
            }
            this.follow = this.self.getChildByName("Follow");
        }
        controlOn() {
            this.isControl = true;
            this.agent.navEnabled = false;
            EventMgr.on(TouchEventType.joyAxis, this, this.joyControl);
            if (Character_Third.charaters.indexOf(this) == -1) {
                Character_Third.charaters.unshift(this);
            }
        }
        controlOff() {
            this.isControl = false;
            this.xAxis = 0;
            this.zAxis = 0;
            EventMgr.off(TouchEventType.joyAxis, this, this.joyControl);
        }
        attackSpecial() {
            if (!this.isFast) {
                Laya.Tween.to(CamFollow.instance.camera, { fieldOfView: 40 }, 1200, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(CamFollow.instance.camera, { fieldOfView: 70 }, 1200, null);
                }));
            }
        }
        attackEnd() {
            if (this.isDead)
                return;
            this.idle();
            this.controlOn();
        }
        deadSpecial() {
            this.skinChange(1, 1, true, false, false);
            this.controlOff();
            let point = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.self);
            Tool.faceToast("ui/game/skull_evil01.png", Game.instance, new Laya.Vector2(point.x, point.y), new Laya.Vector2(point.x, point.y - 100));
            EventMgr.event(EventType.Game_Over_Event);
        }
        onUpdate() {
            if (this.isArrive) {
                let delta = Vector3.subtract(this.self.transform.position.clone(), this.oldPos);
                let playerPos = this.self.transform.position.clone();
                let distance = Vector3.distance(playerPos, this.oldPoses[0]);
                if (this.arriveCount >= 16) {
                    if (this.oldPoses.length > 300) {
                        this.oldPoses.pop();
                    }
                    this.oldPoses.unshift(playerPos);
                    this.arriveCount = 0;
                }
                else {
                    this.arriveCount += Laya.timer.delta;
                }
                this.followUpdate();
                if (delta.x < 0.3 && delta.x > -0.3 && delta.z < 0.3 && delta.z > -0.3) {
                    return;
                }
                this.oldPos = this.self.transform.position.clone();
                this.moveControl(delta.x, delta.z, false);
                this.rotControl(-delta.x, delta.z);
                return;
            }
            if (this.isControl) {
                this.rotControl(this.xAxis, this.zAxis);
                this.moveControl(this.xAxis, this.zAxis);
            }
            else {
                this.attackMove();
                this.rotControl(this.xAxis, this.zAxis);
            }
            let playerPos = this.self.transform.position.clone();
            let distance = Vector3.distance(playerPos, this.oldPoses[0]);
            if (distance > 0.1) {
                if (this.oldPoses.length > 300) {
                    this.oldPoses.pop();
                }
                this.oldPoses.unshift(playerPos);
            }
            if (this.xAxis == 0 && this.zAxis == 0 && !this.isOtherAnimUsing && !this.isDead && this.isControl) {
                this.beCover();
            }
            else {
                this.noCover();
            }
            this.followUpdate();
        }
        followUpdate() {
            for (let i = 0; i < this.follow.numChildren; i++) {
                let targetPos = this.oldPoses[10 + i * 10];
                let comp = this.follow.getChildAt(i).getComponent(Character_Npc);
                comp.isVent = this.isVent;
                comp.follow(targetPos);
            }
            GlData.nowNpcCount = this.follow.numChildren;
        }
        tp(pos, callback) {
            let dis = Vector3.distance(this.self.transform.position.clone(), pos);
            this.self.transform.position = pos;
            CamFollow.instance.speed = 0.5;
            for (let i = 0; i < 100; i++) {
                this.oldPoses.pop();
                this.oldPoses.unshift(pos);
            }
            Laya.timer.once(dis * 60, this, () => {
                CamFollow.instance.speed = 0.5;
                callback && callback();
            });
        }
        colliderDeal(collider) {
            if (this.isWater)
                return;
            if (this.hasCollider.indexOf(collider) == -1) {
                this.hasCollider.push(collider);
                this.colliderEnter(collider);
            }
            else {
                this.colliderStay(collider);
            }
        }
        colliderEnter(collider) {
            if (collider.self.name == "Enemy") {
                this.controlOff();
                this.attack(collider);
                var dir = Vector3.subtract(this.self.transform.position.clone(), collider.self.transform.position.clone());
                dir = Vector3.normalized(dir);
                this.xAxis = dir.x;
                this.zAxis = -dir.z;
            }
            else if (collider.self.name == "Boss") {
                this.controlOff();
                this.attack(collider);
                var dir = Vector3.subtract(this.self.transform.position.clone(), collider.self.transform.position.clone());
                dir = Vector3.normalized(dir);
                this.xAxis = dir.x;
                this.zAxis = -dir.z;
            }
        }
        colliderStay(collider) {
        }
        colliderExit(collider) {
            this.hasCollider.splice(this.hasCollider.indexOf(collider), 1);
        }
    }

    class Character_Npc extends Character_Third {
        constructor() {
            super(...arguments);
            this.isFollow = false;
            this.oldPos = new Laya.Vector3();
        }
        specialInit() {
            Character_Npc.npc.push(this);
            this.skinChange(1, 1);
            let light = this.model.getChildByName("Light");
            light.active = false;
            this.rotLerpAxis = 0.1;
            this.speed = 3;
            this.oldPos = this.self.transform.position.clone();
            this.isFollow = false;
        }
        follow(pos) {
            this.isFollow = true;
            let dt = Laya.timer.delta / 1000;
            let selfPos = this.self.transform.position.clone();
            let delta = Vector3.subtract(pos, selfPos);
            let dis = Laya.Vector3.scalarLength(delta);
            delta = Vector3.normalized(delta);
            Laya.Vector3.lerp(selfPos, pos, 10 * dt, selfPos);
            if (!Character_Player.instance.isCover) {
                this.noCover();
            }
            else {
                this.beCover();
            }
            this.self.transform.position = selfPos;
        }
        onUpdate() {
            if (this.isDead)
                return;
            let dt = Laya.timer.delta / 1000;
            let delta = Vector3.subtract(this.self.transform.position.clone(), this.oldPos);
            this.oldPos = this.self.transform.position.clone();
            let dis = Laya.Vector3.scalarLength(delta);
            delta = Vector3.normalized(delta);
            delta = Vector3.mull(delta, dis / dt / 3);
            if (this.isFollow)
                this.moveControl(delta.x, delta.z, false);
            if (dis > dt * 1) {
                this.rotControl(-delta.x, delta.z);
            }
            else if (this.isFollow) {
                this.rotControl(0, 0);
            }
        }
        deadSpecial() {
            Tool.d3_addChildNotMove(this.self, BornController.mainScene);
            this.skinChange(1, 1, true, false, false);
            let point = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.self);
            Tool.faceToast("ui/game/skull_evil02.png", Game.instance, new Laya.Vector2(point.x, point.y), new Laya.Vector2(point.x, point.y - 100));
            this.anim.play("dead", 0, 0);
        }
    }
    Character_Npc.npc = [];

    class D2Comp extends Laya.Script {
        onAwake() {
            this.self = this.owner;
            this.init();
        }
        init(...data) { }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventMgr.offAllCaller(this);
        }
    }

    class JoystickComponent extends D2Comp {
        constructor() {
            super(...arguments);
            this.xAxis = 0;
            this.yAxis = 0;
            this.stopSpeed = 0.1;
            this.canMove = true;
        }
        onUpdate() {
            if (!this.isPressed) {
                if (Math.abs(this.xAxis) < this.stopSpeed) {
                    this.xAxis = 0;
                }
                else {
                    this.xAxis = Laya.MathUtil.lerp(this.xAxis, 0, 0.1);
                }
                if (Math.abs(this.yAxis) < this.stopSpeed) {
                    this.yAxis = 0;
                }
                else {
                    this.yAxis = Laya.MathUtil.lerp(this.yAxis, 0, 0.1);
                }
            }
            EventMgr.event(TouchEventType.joyAxis, [this.xAxis, this.yAxis]);
        }
        init(...data) {
            this.joyBg = this.self;
            this.joystick = this.joyBg.getChildAt(0);
            this.joyBg.x = Laya.stage.width / 2;
            this.joyBg.y = Laya.stage.height - 275 - this.joyBg.height / 2;
            this.joystick.x = this.joyBg.width / 2;
            this.joystick.y = this.joyBg.height / 2;
            this.controlOn();
            JoystickComponent.instance = this;
        }
        controlOn() {
            EventMgr.on(TouchEventType.singleTouchStart, this, this.onMouseDownEvent);
            EventMgr.on(TouchEventType.singleTouchMove, this, this.onMouseMoveEvent);
            EventMgr.on(TouchEventType.singleTouchEnd, this, this.onMouseUpEvent);
        }
        controlOff() {
            EventMgr.off(TouchEventType.singleTouchStart, this, this.onMouseDownEvent);
            EventMgr.off(TouchEventType.singleTouchMove, this, this.onMouseMoveEvent);
            EventMgr.off(TouchEventType.singleTouchEnd, this, this.onMouseUpEvent);
        }
        onMouseDownEvent(e) {
            if (!this.firstTouchId) {
                this.firstTouchId = e.touchId;
                this.firstTouchPoint = new Laya.Point(e.stageX, e.stageY);
                this.joyBg.pos(e.stageX, e.stageY);
                this.joystick.x = this.joyBg.width / 2;
                this.joystick.y = this.joyBg.height / 2;
                this.isPressed = true;
            }
        }
        onMouseUpEvent(e) {
            if (this.firstTouchId == e.touchId) {
                this.firstTouchId = null;
                this.isPressed = false;
                this.joyBg.x = Laya.stage.width / 2;
                this.joyBg.y = Laya.stage.height - 275 - this.joyBg.height / 2;
                this.joystick.x = this.joyBg.width / 2;
                this.joystick.y = this.joyBg.height / 2;
            }
        }
        onMouseMoveEvent(e) {
            if (this.firstTouchId == e.touchId) {
                this.moveCtrl(e);
            }
        }
        moveCtrl(e) {
            if (this.isPressed) {
                var vec1 = new Laya.Vector2(0, -1);
                var vec2 = new Laya.Vector2(e.stageX - this.firstTouchPoint.x, e.stageY - this.firstTouchPoint.y);
                var touchMoveDis = Laya.Vector2.scalarLength(vec2);
                let raidus = (this.joyBg.width / 2);
                if (touchMoveDis == 0) {
                    this.canMove = false;
                }
                else {
                    this.joyBg.pos(this.firstTouchPoint.x, this.firstTouchPoint.y);
                    var lastStatus = this.canMove;
                    this.canMove = touchMoveDis > 5;
                    var cosAngle = Laya.Vector2.dot(vec1, vec2) / (Laya.Vector2.scalarLength(vec1) * Laya.Vector2.scalarLength(vec2));
                    var hudu = Math.acos(cosAngle);
                    this.angle = 180 * hudu / Math.PI;
                    if (e.stageX < this.firstTouchPoint.x) {
                        this.angle = -this.angle;
                    }
                    let xAxis = (e.stageX - this.firstTouchPoint.x) / raidus;
                    let yAxis = -(e.stageY - this.firstTouchPoint.y) / raidus;
                    if (xAxis > 1) {
                        xAxis = 1;
                    }
                    else if (xAxis < -1) {
                        xAxis = -1;
                    }
                    if (yAxis > 1) {
                        yAxis = 1;
                    }
                    else if (yAxis < -1) {
                        yAxis = -1;
                    }
                    this.xAxis = xAxis;
                    this.yAxis = yAxis;
                }
                if (this.canMove) {
                    if (e.stageX < this.firstTouchPoint.x) {
                        this.joystick.x = raidus + Math.max(-raidus, (e.stageX - this.firstTouchPoint.x));
                    }
                    else {
                        this.joystick.x = raidus + Math.min(raidus, (e.stageX - this.firstTouchPoint.x));
                    }
                    if (e.stageY < this.firstTouchPoint.y) {
                        this.joystick.y = raidus + Math.max(-raidus, (e.stageY - this.firstTouchPoint.y));
                    }
                    else {
                        this.joystick.y = raidus + Math.min(raidus, (e.stageY - this.firstTouchPoint.y));
                    }
                    if (touchMoveDis > raidus) {
                        var v = new Laya.Vector2(e.stageX - this.firstTouchPoint.x, e.stageY - this.firstTouchPoint.y);
                        Laya.Vector2.normalize(v, v);
                        Laya.Vector2.scale(v, raidus, v);
                        this.joystick.pos(raidus + v.x, raidus + v.y);
                    }
                }
            }
        }
    }

    class Grass extends D3Comp {
        constructor() {
            super(...arguments);
            this.dead = false;
        }
        init() {
        }
        startDown() {
            let dir = Vector3.subtract(this.self.transform.position.clone(), Character_Player.instance.self.transform.position.clone());
            dir = Vector3.normalized(dir);
            let rotate = new Laya.Vector3(dir.z * 0.5 * Math.PI * 5, 0, -dir.x * 0.5 * Math.PI * 5);
            Laya.timer.once(500, this, () => {
                Laya.timer.clearAll(this);
                this.self.active = false;
            });
            Laya.timer.frameLoop(1, this, () => {
                this.self.transform.rotate(Vector3.mull(rotate, Laya.timer.delta / 1000), false);
            });
        }
    }

    class DropObj extends D3Comp {
        constructor() {
            super(...arguments);
            this.yForceMin = 1;
            this.yForceMax = 2;
            this.xForceMin = 0.5;
            this.xForceMax = 1;
            this.zForceMin = 15;
            this.zForceMax = 25;
            this.dir = new Laya.Vector3(0, 1, 0);
            this.gravity = 0;
            this.yforce = 0;
            this.xForce = 0;
            this.zForce = 0;
            this.rotate = new Laya.Vector3;
            this.dorpDeadY = -2;
            this.dropDeadChangeX = 4;
            this.isDestory = true;
            this.isActive = true;
        }
        init() {
            this.setData();
        }
        changeDropData(upForce, horizonlF, fowardF, dir, rotate, gravity) {
            this.yForceMin = upForce.x;
            this.yForceMax = upForce.y;
            this.xForceMin = horizonlF.x;
            this.xForceMax = horizonlF.y;
            this.zForceMin = fowardF.x;
            this.zForceMax = fowardF.y;
            this.rotate = rotate;
            this.dir = dir;
            this.gravity = gravity;
            this.setData();
        }
        setTimeDestroy(value = 1000) {
            Laya.timer.once(value, this, () => {
                this.self.destroy();
            });
        }
        setData() {
            this.xForce = Tool.randomNumber(this.xForceMin, this.xForceMax);
            this.yforce = Tool.randomNumber(this.yForceMin, this.yForceMax);
            this.zForce = Tool.randomNumber(this.zForceMin, this.zForceMax);
        }
        onUpdate() {
            if (!this.isActive)
                return;
            let dt = Laya.timer.delta / 1000;
            this.yforce -= this.gravity * dt;
            let self = this.self;
            if (self && !self.destroyed) {
                self.transform.translate(new Laya.Vector3(this.dir.x * this.xForce * dt, this.yforce * dt, this.dir.z * this.zForce * dt), false);
                self.transform.rotate(Vector3.mull(this.rotate, dt), true);
                if (this.self.transform.position.y < this.dorpDeadY) {
                    if (this.isDestory)
                        this.self.destroy();
                    else {
                        this.isActive = false;
                    }
                }
            }
        }
    }

    class DropObj_Plane extends DropObj {
        constructor() {
            super(...arguments);
            this.dirScale = 1;
            this.isColliderActive = false;
            this.isLandRotate = true;
            this.hitGroundAxis = 0.3;
            this.blockAxis = 0.05;
        }
        init() {
            super.init();
            if (!GlData.isDropObj) {
                this.self.active = false;
                this.isActive = false;
                return;
            }
            let data = Nimo3D.calcBounds(this.self);
            this.dorpDeadY = data.raidus;
            this.isDestory = false;
            this.isLandRotate = true;
            this.isActive = true;
            this.yforce = 0;
            let dir = new Laya.Vector3(1, 1, 1);
            this.changeDropData(new Laya.Vector2(10, 20), new Laya.Vector2(-7, 7), new Laya.Vector2(-7, 7), dir, new Laya.Vector3(Tool.randomNumber(-2.5, 2.5), Tool.randomNumber(0.1, 0.1), Tool.randomNumber(-2.5, 2.5)), 50);
        }
        onUpdate() {
            let dt = Laya.timer.delta / 1000;
            if (this.isActive) {
                this.yforce -= this.gravity * dt;
                let self = this.self;
                if (self && !self.destroyed) {
                    let forward = new Laya.Vector3();
                    let right = new Laya.Vector3();
                    this.self.transform.getForward(forward);
                    this.self.transform.getRight(right);
                    let way1 = Vector3.mull(forward, this.zForce * -dt * this.dirScale);
                    let way2 = Vector3.mull(right, this.xForce * dt * this.dirScale);
                    let way3 = Vector3.mull(new Laya.Vector3(0, 1, 0), this.yforce * this.dirScale * dt);
                    let way = Vector3.add(way1, way2);
                    way = Vector3.add(way, way3);
                    self.transform.translate(way, false);
                    self.transform.rotate(Vector3.mull(this.rotate, dt * this.dirScale), false);
                    if (this.dorpDeadY >= 0) {
                        let pos = this.self.transform.position.clone();
                        pos.y = 0;
                        if (pos.x > GlData.groundMaxX || pos.x < GlData.groundMinX || pos.z > GlData.groundMaxZ || pos.z < GlData.groundMinZ) {
                            this.dorpDeadY = -1000;
                        }
                    }
                    if (this.self.transform.position.y <= this.dorpDeadY) {
                        this.isColliderActive = true;
                        if (this.isDestory)
                            this.self.destroy();
                        else {
                            let dis = -(this.self.transform.position.y - this.dorpDeadY);
                            this.yforce *= -this.hitGroundAxis;
                            this.xForce *= this.hitGroundAxis;
                            this.zForce *= this.hitGroundAxis;
                            this.rotate = new Laya.Vector3(this.zForce * 0.1 * Math.PI * 5, 0, this.xForce * 0.1 * Math.PI * 5);
                            if (this.xForce + this.zForce + this.yforce <= this.blockAxis) {
                                this.isActive = false;
                            }
                            self.transform.position = new Laya.Vector3(this.self.transform.position.x, this.dorpDeadY + dis, this.self.transform.position.z);
                        }
                    }
                }
            }
        }
    }

    var ObjType;
    (function (ObjType) {
        ObjType["OilTank_1"] = "OilTank_1";
        ObjType["Ship1_1"] = "Ship1_1";
        ObjType["Grass_1"] = "Grass_1";
        ObjType["Prison"] = "Prison";
        ObjType["Water_1"] = "Water_1";
        ObjType["Water_2"] = "Water_2";
        ObjType["Vent_1"] = "Vent_1";
        ObjType["Box_1"] = "Box_1";
        ObjType["Diamond"] = "Diamond";
    })(ObjType || (ObjType = {}));
    class Obj extends D3Comp {
        constructor() {
            super(...arguments);
            this.range = 0;
            this.width = 0;
            this.ventGroup = 0;
            this.staticIndex = [new Laya.Vector2, new Laya.Vector2];
            this.isColliderActive = false;
            this.hasColliderSprite = [];
        }
        init() {
            Obj.objs.push(this);
            switch (this.self.name) {
                case ObjType.OilTank_1:
                    this.findCollider();
                    break;
                case ObjType.Ship1_1:
                    this.findCollider();
                    var model = this.self.getChildByName("Model");
                    for (let i = 0; i < model.numChildren; i++) {
                        model.getChildAt(i).active = i == GlData.nowShipIndex;
                    }
                    break;
                case ObjType.Grass_1:
                    this.findCollider();
                    var model = this.self.getChildByName("Model").getChildAt(GlData.nowMapIndex);
                    for (let i = 0; i < model.numChildren; i++) {
                        let grass = model.getChildAt(i);
                        grass.addComponent(Grass);
                        let pos = grass.transform.localPosition.clone();
                        pos.x += Tool.randomNumber(-0.1, 0.1);
                        pos.z += Tool.randomNumber(-0.1, 0.1);
                        grass.transform.localPosition = pos;
                        grass.transform.rotate(new Laya.Vector3(0, Tool.randomNumber(0, 360), 0), true, false);
                    }
                    break;
                case ObjType.Prison:
                    this.findCollider();
                    let charterPoint = this.self.getChildByName("CharterPoint");
                    let charter = BornController.bornStageObj("Charter", charterPoint);
                    this.charater = charter.addComponent(Character_Npc);
                    GlData.maxNpcCount++;
                    break;
                case ObjType.Water_1:
                    this.findCollider();
                    break;
                case ObjType.Water_2:
                    break;
                case ObjType.Vent_1:
                    this.findCollider();
                    Obj.vents.push(this);
                    break;
                case ObjType.Box_1:
                    this.findCollider();
                    break;
                case ObjType.Diamond:
                    this.findCollider();
                    break;
                default:
                    console.log("不存在这个类型", this.self.name);
                    break;
            }
        }
        findCollider() {
            this.colliderSprite = Tool.d3_FindNodeHasName(this.self, "collider_box");
            var info = this.colliderSprite.name.split("_");
            this.range = parseFloat(info[2]);
            this.width = parseFloat(info[3]);
            this.isColliderActive = true;
            this.staticIndex = CollderController.getStaticIndex(this.colliderSprite, this.range, this.width);
        }
        colliderDeal(colliderSpirte) {
            if (this.hasColliderSprite.indexOf(colliderSpirte) == -1) {
                this.hasColliderSprite.push(colliderSpirte);
                this.colliderEnter(colliderSpirte);
            }
            else {
                this.colliderStay(colliderSpirte);
            }
        }
        colliderEnter(colliderSpirte) {
            let model;
            let pos;
            switch (this.self.name) {
                case ObjType.OilTank_1:
                    this.isColliderActive = false;
                    model = this.self.getChildByName("Model");
                    for (let i = 0; i < model.numChildren; i++) {
                        let obj = model.getChildAt(i);
                        obj.addComponent(DropObj_Plane);
                    }
                    let target = Character_Player.instance;
                    if (Character_Player.instance.follow.numChildren > 0) {
                        target = Character_Player.instance.follow.getChildAt(0).getComponent(Character_Npc);
                    }
                    target.goDead();
                    pos = this.self.transform.position.clone();
                    SoundMgr.play(SoundType.Blast);
                    BornController.bornFxFromPool(FxType.BoomFX, BornController.mainScene, 1000, 1, pos);
                    break;
                case ObjType.Ship1_1:
                    this.isColliderActive = false;
                    let shipIndex = GlData.nowShipIndex;
                    let door = this.self.getChildByName("Model").getChildAt(shipIndex).getChildAt(1);
                    let doorRotLast = door.transform.rotation.clone();
                    let doorRot;
                    let doorRotWay1 = shipIndex != 2 ? new Laya.Vector3(0, -90, 0) : new Laya.Vector3(-90, 0, 0);
                    let doorRotWay2 = shipIndex != 2 ? new Laya.Vector3(0, 90, 0) : new Laya.Vector3(90, 0, 0);
                    door.transform.rotate(doorRotWay1, true, false);
                    doorRot = door.transform.rotation.clone();
                    door.transform.rotation = doorRotLast;
                    this.selfTween.toTween(door, { rot: doorRot }, 500);
                    let targetPos = this.self.transform.position.clone();
                    targetPos.z -= 1.4;
                    Character_Player.instance.isArrive = true;
                    JoystickComponent.instance.self.set_visible(false);
                    let dis = Vector3.distance(targetPos, Character_Player.instance.self.transform.position.clone());
                    Character_Player.instance.selfTween.toTween(Character_Player.instance.self, { pos: targetPos }, dis * 300, () => {
                        targetPos.z += 0.4;
                        targetPos.y += 1;
                        Character_Player.instance.selfTween.toTween(Character_Player.instance.self, { pos: targetPos }, 1.1 * 300, () => {
                            targetPos.z += 1;
                            Character_Player.instance.selfTween.toTween(Character_Player.instance.self, { pos: targetPos }, 1 * 300, () => {
                                Laya.timer.once(1000, this, () => {
                                    doorRotLast = door.transform.rotation.clone();
                                    doorRot;
                                    door.transform.rotate(doorRotWay2, true, false);
                                    doorRot = door.transform.rotation.clone();
                                    door.transform.rotation = doorRotLast;
                                    this.selfTween.toTween(door, { rot: doorRot }, 500, () => {
                                        let pos = this.self.transform.position.clone();
                                        pos.y += 20;
                                        Character_Player.instance.self.active = false;
                                        this.selfTween.toTween(this.self, { pos: pos }, 2000, () => {
                                        }, Laya.Ease.linearIn, false);
                                        SoundMgr.play(SoundType.Leave);
                                    });
                                });
                            }, null, false);
                        }, null, false);
                    });
                    EventMgr.event(EventType.Game_ShipOn_Event);
                    break;
                case ObjType.Grass_1:
                    break;
                case ObjType.Prison:
                    this.isColliderActive = false;
                    Tool.d3_addChildNotMove(this.charater.self, Character_Player.instance.follow);
                    pos = this.self.transform.position.clone();
                    SoundMgr.play(SoundType.Rescue);
                    this.self.active = false;
                    break;
                case ObjType.Water_1:
                    break;
                case ObjType.Vent_1:
                    let anim = this.self.getChildByName("Model").getComponent(Laya.Animator);
                    anim.play("open", 0, 0);
                    if (Character_Player.instance.isControl) {
                        Character_Player.instance.jump();
                        let delta = Vector3.subtract(this.self.transform.position.clone(), Character_Player.instance.self.transform.position.clone());
                        Character_Player.instance.xAxis = -delta.x;
                        Character_Player.instance.zAxis = delta.z;
                        for (let i = 0; i < Obj.vents.length; i++) {
                            if (Obj.vents[i].ventGroup == this.ventGroup && Obj.vents[i].self != this.self) {
                                SoundMgr.play(SoundType.Vent);
                                Laya.timer.once(500, this, () => {
                                    Character_Player.instance.tp(Obj.vents[i].self.transform.position.clone());
                                });
                                break;
                            }
                        }
                    }
                    break;
                case ObjType.Box_1:
                    this.isColliderActive = false;
                    model = this.self.getChildByName("Model").getChildAt(GlData.nowMapIndex);
                    for (let i = 0; i < model.numChildren; i++) {
                        let obj = model.getChildAt(i);
                        let comp = obj.addComponent(DropObj_Plane);
                        comp.dirScale = 0.2;
                    }
                    SoundMgr.play(SoundType.BreakCase);
                    break;
                case ObjType.Diamond:
                    this.self.active = false;
                    this.isColliderActive = false;
                    let point = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.self);
                    Tool.d2_coinCollectAnim(GlData.coinUrl, new Laya.Vector2(point.x, point.y), new Laya.Vector2(100, 50), Game.instance, 1, 1, () => {
                        EventMgr.event(EventType.Game_MoneyCount_Add, GlData.diamondAdd);
                    });
                    break;
                default:
                    console.log(colliderSpirte.name + "enter", this.self.name);
                    break;
            }
        }
        colliderStay(colliderSpirte) {
            switch (this.self.name) {
                case ObjType.OilTank_1:
                    break;
                case ObjType.Ship1_1:
                    break;
                case ObjType.Grass_1:
                    var pos = colliderSpirte.transform.position.clone();
                    var model = this.self.getChildByName("Model").getChildAt(GlData.nowMapIndex);
                    for (var i = model.numChildren - 1; i >= 0; i--) {
                        var child = model.getChildAt(i);
                        let comp = child.getComponent(Grass);
                        if (comp.dead)
                            continue;
                        var childPos = child.transform.position.clone();
                        var colliderData = Tool.BoxCheck_2D_Normal(pos.z, pos.x, Character_Player.instance.range, Character_Player.instance.width, childPos.z, childPos.x, 0, 0);
                        if (colliderData.isHit) {
                            comp.dead = true;
                            comp.startDown();
                            SoundMgr.playSoundLimit(SoundType.CutGrass);
                        }
                    }
                    break;
                case ObjType.Prison:
                    break;
                case ObjType.Water_1:
                    break;
                case ObjType.Vent_1:
                    Character_Player.instance.isVent = true;
                    break;
                case ObjType.Box_1:
                    break;
                default:
                    console.log(colliderSpirte.name + "stay", this.self.name);
                    break;
            }
        }
        colliderExit(colliderSpirte) {
            this.hasColliderSprite.splice(this.hasColliderSprite.indexOf(colliderSpirte), 1);
            switch (this.self.name) {
                case ObjType.OilTank_1:
                    break;
                case ObjType.Ship1_1:
                    break;
                case ObjType.Grass_1:
                    break;
                case ObjType.Prison:
                    break;
                case ObjType.Water_1:
                    break;
                case ObjType.Vent_1:
                    let anim = this.self.getChildByName("Model").getComponent(Laya.Animator);
                    anim.play("close", 0, 0);
                    Character_Player.instance.isVent = false;
                    break;
                case ObjType.Box_1:
                    break;
                default:
                    console.log(colliderSpirte.name + "exit", this.self.name);
                    break;
            }
        }
    }
    Obj.objs = [];
    Obj.vents = [];

    var EnemyState;
    (function (EnemyState) {
        EnemyState[EnemyState["path"] = 0] = "path";
        EnemyState[EnemyState["found"] = 1] = "found";
        EnemyState[EnemyState["alarm"] = 2] = "alarm";
        EnemyState[EnemyState["attack"] = 3] = "attack";
    })(EnemyState || (EnemyState = {}));
    class Character_Enemy extends Character_Third {
        constructor() {
            super(...arguments);
            this.pathSpeed = 1;
            this.traceSpeed = 3;
            this.path = [];
            this.nowState = EnemyState.path;
            this.pathId = 0;
            this.scanRot = 0;
            this.scanRotAxis = 1;
            this.oldPos = new Laya.Vector3;
            this.alarmCD = 0;
            this.changeSightTime = 2000;
            this.lastPos = new Laya.Vector3;
            this.sightDeltaTime = 32;
            this.foundPos = null;
            this.isTracing = false;
            this.sightRange = 6;
            this.sightAngle = 20;
        }
        static checkAliveEnemy() {
            let count = 0;
            for (let i = 0; i < Character_Enemy.enemys.length; i++) {
                let enemy = Character_Enemy.enemys[i];
                if (!enemy.isDead) {
                    count++;
                }
            }
            return count;
        }
        static checkLastAliveEnemyIsBoss() {
            let count = 0;
            let isBoss = false;
            for (let i = 0; i < Character_Enemy.enemys.length; i++) {
                let enemy = Character_Enemy.enemys[i];
                if (!enemy.isDead) {
                    count++;
                    if (enemy.self.name == "Boss") {
                        isBoss = true;
                        if (enemy.nowHp >= enemy.maxHp - 1)
                            isBoss = false;
                    }
                }
            }
            return count == 1 && isBoss;
        }
        specialInit() {
            Character_Enemy.enemys.push(this);
            this.range += 1;
            this.width += 1;
            this.skinChange(1, 1, false, true, false);
            this.createSight();
            this.nowAngle = -this.self.transform.rotationEuler.clone().y;
            Laya.timer.frameOnce(1, this, () => {
                this.controlOn();
            });
            this.light = this.model.getChildByName("Light");
            if (this.light) {
                Laya.timer.frameLoop(1, this, this.lightUpdateSet);
            }
            this.attackDoRange = 2.5;
            let light = this.model.getChildByName("Light");
            Tool.d3_unactiveAllChildren(light);
            light.getChildAt(0).active = true;
        }
        lightUpdateSet() {
            let pos = this.self.transform.position.clone();
            pos.y = 0.13;
            this.light.transform.position = pos;
            let index = 0;
            if (this.self.name == "Boss")
                index = 1;
            let light = this.light.getChildAt(index);
            Tool.d3_swtichMatColor(light, this.nowState == EnemyState.path ? new Laya.Vector4(1, 1, 1, 1) : new Laya.Vector4(1, 0, 0, 1));
        }
        controlOn() {
            this.isControl = true;
            this.agent.navEnabled = true;
            this.goPath();
        }
        controlOff() {
            this.isControl = false;
            this.agent.navEnabled = false;
        }
        goPath() {
            if (this.pathId >= this.path.length) {
                this.pathId = 0;
            }
            this.agent.go(this.path[this.pathId].pos);
            this.pathId++;
        }
        onUpdate() {
            if (this.isDead)
                return;
            switch (this.nowState) {
                case EnemyState.path:
                    this.speed = this.pathSpeed;
                    if (!this.agent._pathPending) {
                        this.goPath();
                    }
                    this.rotLerpAxis = 0.1;
                    let dis = Vector3.distance(this.self.transform.position.clone(), this.path[0].pos.clone());
                    if (this.path.length == 1 && dis < 0.1) {
                        this.nowAngle = -(this.path[0].rotY + this.scanRot);
                        this.scanRot += this.scanRotAxis * 0.1;
                        if (this.scanRot > 45) {
                            this.scanRotAxis = -1;
                        }
                        else if (this.scanRot < -45) {
                            this.scanRotAxis = 1;
                        }
                    }
                    else {
                        this.scanRot = 0;
                        this.scanRotAxis = 1;
                    }
                    break;
                case EnemyState.found:
                    this.speed = this.traceSpeed;
                    this.rotLerpAxis = 0.05;
                    if (this.foundPos != null) {
                        this.lastPos = this.foundPos;
                    }
                    if (Vector3.distance(this.self.transform.position.clone(), Character_Player.instance.self.transform.position.clone()) < this.attackDoRange) {
                        this.attackDeal();
                    }
                    else {
                        if (!this.agent._pathPending) {
                            let endCb = () => {
                                this.isTracing = false;
                                this.alarmCD = 6000;
                                this.changeSightTime = this.alarmCD - 1000;
                                this.nowState = EnemyState.alarm;
                            };
                            if (this.foundPos != null) {
                                this.isTracing = true;
                                this.agent.go(this.foundPos);
                                this.foundPos = null;
                            }
                            else {
                                endCb();
                            }
                        }
                    }
                    break;
                case EnemyState.alarm:
                    this.speed = 1;
                    this.alarmCD -= Laya.timer.delta;
                    let cb = () => {
                        let x = Tool.randomNumber(3, 5) * (Tool.halfPercent() ? -1 : 1);
                        let z = Tool.randomNumber(3, 5) * (Tool.halfPercent() ? -1 : 1);
                        let dir = new Laya.Vector3(x, 0, z);
                        let pos = Vector3.add(dir, this.lastPos);
                        this.agent.go(pos);
                        this.lastPos = pos;
                        this.changeSightTime -= 2000;
                        if (!this.agent.navEnabled) {
                            this.nowState = EnemyState.path;
                            this.goPath();
                        }
                    };
                    if (this.alarmCD <= this.changeSightTime) {
                        cb();
                    }
                    if (this.alarmCD <= 0) {
                        this.nowState = EnemyState.path;
                        this.goPath();
                    }
                    break;
                case EnemyState.attack:
                    this.attackMove();
                    break;
                default:
                    console.log("敌人不存在这个状态");
                    break;
            }
            let delta = Vector3.subtract(this.self.transform.position.clone(), this.oldPos);
            delta = Vector3.normalized(delta);
            delta = Vector3.mull(delta, this.speed / 3);
            this.oldPos = this.self.transform.position.clone();
            this.moveControl(delta.x, delta.z, false);
            this.rotControl(-delta.x, delta.z);
        }
        deadSpecial() {
            this.skinChange(1, 1, true, true, false);
            this.hideSight();
            this.agent.navEnabled = false;
            let point = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.self);
            SoundMgr.play(SoundType.Kill);
            BornController.bornFxFromPool(FxType.KillFX, BornController.mainScene, 1000, 1, this.self.transform.position.clone());
            Tool.d2_coinCollectAnim(GlData.coinUrl, new Laya.Vector2(point.x, point.y), new Laya.Vector2(100, 50), Game.instance, 5, 1, () => {
                EventMgr.event(EventType.Game_MoneyCount_Add, Tool.randomInt(GlData.killEnemyAdd[0], GlData.killEnemyAdd[1]));
            });
        }
        attackDeal() {
            if (this.nowState == EnemyState.found) {
                let target = Character_Player.instance;
                if (Character_Player.instance.follow.numChildren > 0) {
                    target = Character_Player.instance.follow.getChildAt(0).getComponent(Character_Npc);
                }
                this.attack(target);
                this.nowState = EnemyState.attack;
            }
        }
        attackEndSpecial() {
            this.isTracing = false;
            this.alarmCD = 6000;
            this.changeSightTime = this.alarmCD - 1000;
            this.nowState = EnemyState.alarm;
        }
        attackDoSpecial() {
            SoundMgr.play(SoundType.EnemyHit);
        }
        createSight() {
            Laya.timer.once(this.sightDeltaTime, this, this.sightUpdate);
        }
        hideSight() {
            Laya.timer.clear(this, this.lightUpdateSet);
            let light = this.light;
            let pos = light.transform.position.clone();
            pos.y -= 10;
            light.transform.position = pos;
            Laya.timer.clear(this, this.sightUpdate);
        }
        sightCheck() {
            let playerPos = Character_Player.instance.self.transform.position.clone();
            let selfPos = this.self.transform.position.clone();
            let dir = Vector3.subtract(selfPos, playerPos);
            let distance = Laya.Vector3.scalarLength(dir);
            let forward = new Laya.Vector3;
            this.model.transform.getForward(forward);
            let isInRange = distance < this.sightRange && Tool.getAngle(forward, dir) < this.sightAngle;
            if (isInRange) {
                var charaterEnemyIndex = CollderController.getStaticIndex(this.self, this.sightRange, this.sightRange);
                let lightColliders = CollderController.lightCollider;
                for (let i = 0; i < lightColliders.length; i++) {
                    let collider = lightColliders[i];
                    let index = CollderController.lightColliderIndex[i];
                    let isIn = false;
                    for (let k = 0; k < charaterEnemyIndex.length; k++) {
                        if (isIn) {
                            break;
                        }
                        for (let l = 0; l < index.length; l++) {
                            if (charaterEnemyIndex[k].x == index[l].x && charaterEnemyIndex[k].y == index[l].y) {
                                isIn = true;
                                break;
                            }
                        }
                    }
                    if (!isIn)
                        continue;
                    let pos = collider.transform.position.clone();
                    let comp;
                    switch (collider.parent.name) {
                        case ObjType.OilTank_1:
                            comp = collider.parent.getComponent(Obj);
                            if (!comp.isColliderActive) {
                                continue;
                            }
                            break;
                        case ObjType.Box_1:
                            comp = collider.parent.getComponent(Obj);
                            if (!comp.isColliderActive) {
                                continue;
                            }
                            break;
                        default:
                            break;
                    }
                    let rayData = Nimo3D.calculateDistance(playerPos, selfPos, pos);
                    let colliderRaidus = parseFloat(collider.name.split("_")[2]);
                    if (rayData) {
                        if (rayData.goDistance < rayData.rayDistance && rayData.distance < colliderRaidus) {
                            return false;
                        }
                    }
                }
                let grassLight = CollderController.grass;
                for (let i = 0; i < grassLight.length; i++) {
                    let pos = grassLight[i].self.transform.position.clone();
                    let isIn = false;
                    for (let k = 0; k < charaterEnemyIndex.length; k++) {
                        if (isIn) {
                            break;
                        }
                        for (let l = 0; l < grassLight[i].staticIndex.length; l++) {
                            if (charaterEnemyIndex[k].x == grassLight[i].staticIndex[l].x && charaterEnemyIndex[k].y == grassLight[i].staticIndex[l].y) {
                                isIn = true;
                                break;
                            }
                        }
                    }
                    if (!isIn)
                        continue;
                    let rayData = Nimo3D.calculateDistance(playerPos, selfPos, pos);
                    if (rayData && rayData.distance < 0.5) {
                        let grassModel = grassLight[i].self.getChildByName("Model").getChildAt(GlData.nowMapIndex);
                        for (let j = 0; j < grassModel.numChildren; j++) {
                            let grass = grassModel.getChildAt(j);
                            if (grass.active) {
                                pos = grass.transform.position.clone();
                                rayData = Nimo3D.calculateDistance(selfPos, playerPos, pos);
                                if (rayData) {
                                    if (rayData.goDistance < rayData.rayDistance && rayData.distance < 0.2) {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                return false;
            }
            return true;
        }
        whenDestory() {
        }
        sightUpdate() {
            if (this.isDead)
                return;
            Laya.timer.once(this.sightDeltaTime, this, this.sightUpdate);
            let playerPos = Character_Player.instance.self.transform.position.clone();
            let isSaw = this.sightCheck();
            if (!isSaw)
                return;
            if (!Character_Player.instance.isCover && !Character_Player.instance.isWater) {
                this.nowState = EnemyState.found;
                if (this.foundPos == null && !this.isTracing) {
                    this.isTracing = true;
                    this.agent.go(playerPos);
                }
                else {
                    this.foundPos = playerPos;
                }
            }
        }
    }
    Character_Enemy.enemys = [];

    class CollderController {
        static On() {
            Laya.timer.loop(this.deltaTime, this, this.fixUpdate);
            if (this.isTestOn)
                Laya.timer.loop(16, this, this.fixTest);
        }
        static Off() {
            Laya.timer.clear(this, this.fixUpdate);
            Laya.timer.clear(this, this.fixTest);
        }
        static Clear() {
            this.lightCollider.length = 0;
            this.lightColliderIndex.length = 0;
            Obj.objs.length = 0;
            Character_Enemy.enemys.length = 0;
            Character_Player.instance.hasCollider.length = 0;
            Character_Npc.npc.length = 0;
            BossBullet.bullet.length = 0;
        }
        static getStaticIndex(sprite, range, width) {
            let maxZ = Math.floor((sprite.transform.position.z + range / 2) / 3);
            let minZ = Math.floor((sprite.transform.position.z - range / 2) / 3);
            let maxX = Math.floor((sprite.transform.position.x + range / 2) / 3);
            let minX = Math.floor((sprite.transform.position.x - range / 2) / 3);
            let index = [];
            for (let i = minZ; i <= maxZ; i++) {
                for (let j = minX; j <= maxX; j++) {
                    index.push(new Laya.Vector2(i, j));
                }
            }
            return index;
        }
        static fixTest() {
            console.log(GlData.colliderCount);
            GlData.colliderCount = 0;
        }
        static fixUpdate() {
            this.grass.length = 0;
            var charaterPlayer = Character_Player.instance;
            var charaterPlayerColliderSprite = charaterPlayer.colliderSprite;
            var charaterPlayerPos = charaterPlayerColliderSprite.transform.position.clone();
            var charaterPlayerRange = charaterPlayer.range;
            var charaterPlayerWidth = charaterPlayer.width;
            let isWater = false;
            var charcaterPlayerIndex = CollderController.getStaticIndex(charaterPlayerColliderSprite, charaterPlayer.range, charaterPlayer.width);
            for (var j = 0; j < Obj.objs.length; j++) {
                var obj = Obj.objs[j];
                if (!obj.isColliderActive)
                    continue;
                if (obj.self.name == ObjType.Grass_1) {
                    this.grass.push(obj);
                }
                var isIn = false;
                for (let k = 0; k < obj.staticIndex.length; k++) {
                    if (isIn) {
                        break;
                    }
                    for (let l = 0; l < charcaterPlayerIndex.length; l++) {
                        if (obj.staticIndex[k].x == charcaterPlayerIndex[l].x && obj.staticIndex[k].y == charcaterPlayerIndex[l].y) {
                            isIn = true;
                            break;
                        }
                    }
                }
                if (isIn) {
                    var objColliderSprite = obj.colliderSprite;
                    var objPos = objColliderSprite.transform.position.clone();
                    var objRange = obj.range;
                    var objWidth = obj.width;
                    var colliderData = Tool.BoxCheck_2D_Normal(charaterPlayerPos.z, charaterPlayerPos.x, charaterPlayerRange, charaterPlayerWidth, objPos.z, objPos.x, objRange, objWidth);
                    if (colliderData.isHit) {
                        obj.colliderDeal(charaterPlayerColliderSprite);
                        if (obj.self.name == ObjType.Water_1) {
                            isWater = true;
                        }
                    }
                    else {
                        obj.hasColliderSprite.indexOf(charaterPlayerColliderSprite) != -1 && obj.colliderExit(charaterPlayerColliderSprite);
                    }
                }
                else {
                    obj.hasColliderSprite.indexOf(charaterPlayerColliderSprite) != -1 && obj.colliderExit(charaterPlayerColliderSprite);
                }
            }
            if (isWater) {
                charaterPlayer.beWater();
            }
            else {
                charaterPlayer.noWater();
            }
            if (GlData.isNpcCollider) {
                for (let i = 0; i < Character_Npc.npc.length; i++) {
                    var charaterNpc = Character_Npc.npc[i];
                    if (charaterNpc.isDead || !charaterNpc.isFollow)
                        continue;
                    isWater = false;
                    var charaterNpcColliderSprite = charaterNpc.colliderSprite;
                    var charaterNpcPos = charaterNpcColliderSprite.transform.position.clone();
                    var charaterNpcRange = charaterNpc.range;
                    var charaterNpcWidth = charaterNpc.width;
                    var charcaterNpcIndex = CollderController.getStaticIndex(charaterNpcColliderSprite, charaterNpc.range, charaterNpc.width);
                    for (var j = 0; j < Obj.objs.length; j++) {
                        var obj = Obj.objs[j];
                        if (!obj.isColliderActive)
                            continue;
                        if (obj.self.name != ObjType.Water_1) {
                            continue;
                        }
                        var isIn = false;
                        for (let k = 0; k < obj.staticIndex.length; k++) {
                            if (isIn) {
                                break;
                            }
                            for (let l = 0; l < charcaterNpcIndex.length; l++) {
                                if (obj.staticIndex[k].x == charcaterNpcIndex[l].x && obj.staticIndex[k].y == charcaterNpcIndex[l].y) {
                                    isIn = true;
                                    break;
                                }
                            }
                        }
                        if (isIn) {
                            var objColliderSprite = obj.colliderSprite;
                            var objPos = objColliderSprite.transform.position.clone();
                            var objRange = obj.range;
                            var objWidth = obj.width;
                            var colliderData = Tool.BoxCheck_2D_Normal(charaterNpcPos.z, charaterNpcPos.x, charaterNpcRange, charaterNpcWidth, objPos.z, objPos.x, objRange, objWidth);
                            if (colliderData.isHit) {
                                obj.colliderDeal(charaterNpcColliderSprite);
                                if (obj.self.name == ObjType.Water_1) {
                                    isWater = true;
                                }
                            }
                            else {
                                obj.hasColliderSprite.indexOf(charaterNpcColliderSprite) != -1 && obj.colliderExit(charaterNpcColliderSprite);
                            }
                        }
                    }
                    if (isWater) {
                        charaterNpc.beWater();
                    }
                    else {
                        charaterNpc.noWater();
                    }
                }
            }
            for (var i = 0; i < Character_Enemy.enemys.length; i++) {
                var charaterEnemy = Character_Enemy.enemys[i];
                if (charaterEnemy.isDead)
                    continue;
                var charaterEnemyColliderSprite = charaterEnemy.colliderSprite;
                var charaterEnemyPos = charaterEnemyColliderSprite.transform.position.clone();
                var charaterEnemyRange = charaterEnemy.range;
                var charaterEnemyWidth = charaterEnemy.width;
                var charaterEnemyIndex = CollderController.getStaticIndex(charaterEnemyColliderSprite, charaterEnemy.range, charaterEnemy.width);
                for (let k = 0; k < charaterEnemyIndex.length; k++) {
                    if (isIn) {
                        break;
                    }
                    for (let l = 0; l < charcaterPlayerIndex.length; l++) {
                        if (charaterEnemyIndex[k].x == charcaterPlayerIndex[l].x && charaterEnemyIndex[k].y == charcaterPlayerIndex[l].y) {
                            isIn = true;
                            break;
                        }
                    }
                }
                if (isIn) {
                    var colliderData = Tool.BoxCheck_2D_Normal(charaterPlayerPos.z, charaterPlayerPos.x, charaterPlayerRange, charaterPlayerWidth, charaterEnemyPos.z, charaterEnemyPos.x, charaterEnemyRange, charaterEnemyWidth);
                    if (colliderData.isHit) {
                        charaterPlayer.colliderDeal(charaterEnemy);
                    }
                    else {
                        charaterPlayer.hasCollider.indexOf(charaterEnemy) != -1 && charaterPlayer.colliderExit(charaterEnemy);
                    }
                }
            }
            for (var i = 0; i < BossBullet.bullet.length; i++) {
                let bullet = BossBullet.bullet[i];
                if (!bullet.isColliderActive)
                    continue;
                var bulletColliderSprite = bullet.colliderSprite;
                var bulletPos = bulletColliderSprite.transform.position.clone();
                var bulletRange = bullet.range;
                var bulletWidth = bullet.width;
                var colliderData = Tool.BoxCheck_2D_Normal(charaterPlayerPos.z, charaterPlayerPos.x, charaterPlayerRange, charaterPlayerWidth, bulletPos.z, bulletPos.x, bulletRange, bulletWidth);
                if (colliderData.isHit) {
                    let target = Character_Player.instance;
                    if (Character_Player.instance.follow.numChildren > 0) {
                        target = Character_Player.instance.follow.getChildAt(0).getComponent(Character_Npc);
                    }
                    target.goDead();
                    SoundMgr.play(SoundType.BossHit);
                    bullet.colliderDo();
                    break;
                }
            }
        }
    }
    CollderController.deltaTime = 100;
    CollderController.lightCollider = [];
    CollderController.lightColliderIndex = [];
    CollderController.grass = [];
    CollderController.isTestOn = false;

    class Tool {
        static d3_getSpritePosBySprite3DPoint(cam, target, offset = new Laya.Vector3(0, 0, 0)) {
            var pos = target.transform.position.clone();
            pos.x += offset.x;
            pos.y += offset.y;
            pos.z += offset.z;
            var outPos = new Laya.Vector4;
            cam.viewport.project(pos, cam.projectionViewMatrix, outPos);
            var pos2d = new Laya.Vector2(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
            return new Laya.Point(pos2d.x, pos2d.y);
        }
        static d3_FindNodeByName(rootNode, name) {
            let targetNode = null;
            let funC = (node) => {
                for (let i = 0; i < node.numChildren; i++) {
                    if (node.getChildAt(i).name == name) {
                        targetNode = node.getChildAt(i);
                        return;
                    }
                    else {
                        funC(node.getChildAt(i));
                    }
                }
            };
            funC(rootNode);
            return targetNode;
        }
        static d3_FindNodeHasName(rootNode, name) {
            let targetNode = null;
            let funC = (node) => {
                for (let i = 0; i < node.numChildren; i++) {
                    if (node.getChildAt(i).name.indexOf(name) != -1) {
                        targetNode = node.getChildAt(i);
                        return;
                    }
                    else {
                        funC(node.getChildAt(i));
                    }
                }
            };
            funC(rootNode);
            return targetNode;
        }
        static d3_FindAllNodeHasName(rootNode, name) {
            let targetNode = [];
            let funC = (node) => {
                for (let i = 0; i < node.numChildren; i++) {
                    if (node.getChildAt(i).name.indexOf(name) != -1) {
                        targetNode.push(node.getChildAt(i));
                    }
                    funC(node.getChildAt(i));
                }
            };
            funC(rootNode);
            return targetNode;
        }
        static d3_switchAllMathInChildren(node, color) {
            if (node.meshRenderer) {
                let mat = node.meshRenderer.material.clone();
                mat.albedoColor = Tool.d3_getRgbByHex(color);
                node.meshRenderer.material = mat;
            }
            for (let i = 0; i < node.numChildren; i++) {
                let obj = node.getChildAt(i);
                if (obj.meshRenderer) {
                    let mat = new Laya.BlinnPhongMaterial();
                    let c = Tool.d3_getRgbByHex(color);
                    mat.albedoColor = new Laya.Vector4(c.x, c.y, c.z, 1);
                    mat.specularColor = new Laya.Vector4(0, 0, 0, 1);
                    obj.meshRenderer.material = mat;
                }
                this.d3_switchAllMathInChildren(obj, color);
            }
        }
        static d3_swtichMatColor(sprite, color) {
            let mat1 = sprite.meshRenderer.material.clone();
            mat1.albedoColor = color;
            sprite.meshRenderer.material = mat1;
        }
        static d3_switchAllMatInChildren_Alpha(node, alpha) {
            if (node.meshRenderer) {
                let mat = node.meshRenderer.material.clone();
                mat.albedoColor.w = alpha;
                node.meshRenderer.material = mat;
            }
            for (let i = 0; i < node.numChildren; i++) {
                let obj = node.getChildAt(i);
                this.d3_switchAllMatInChildren_Alpha(obj, alpha);
            }
        }
        static d3_unactiveAllChildren(node) {
            for (let i = 0; i < node.numChildren; i++) {
                node.getChildAt(i).active = false;
            }
        }
        static d3_addChildNotMove(obj, parent) {
            let pos = obj.transform.position.clone();
            let rot = obj.transform.rotation.clone();
            parent.addChild(obj);
            obj.transform.position = pos;
            obj.transform.rotation = rot;
        }
        static d3_getRgbByHex(_hexColor) {
            var color = [], rgb = [];
            let hexColor = _hexColor.replace(/#/, "");
            if (hexColor.length == 3) {
                var tmp = [];
                for (var i = 0; i < 3; i++) {
                    tmp.push(hexColor.charAt(i) + hexColor.charAt(i));
                }
                hexColor = tmp.join("");
            }
            for (var i = 0; i < 3; i++) {
                color[i] = "0x" + hexColor.substr(i * 2, 2);
                rgb.push(parseInt(color[i]));
            }
            return new Laya.Vector4(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 0);
        }
        static d3_objectShake(target, shakeTime = 1, shakeAmount = 0.7) {
            var shake = shakeTime;
            var decreaseFactor = 1;
            var originalPos = target.transform.localPosition.clone();
            Laya.timer.frameLoop(1, this, updateShake);
            function randomPos() {
                var x = Math.random() > 0.5 ? Math.random() : -(Math.random());
                var y = Math.random() > 0.5 ? Math.random() : -(Math.random());
                return new Laya.Vector3(x, y, 0);
            }
            function updateShake() {
                if (shake > 0) {
                    var pos = new Laya.Vector3();
                    Laya.Vector3.scale(randomPos(), shakeAmount, pos);
                    Laya.Vector3.add(originalPos, pos, pos);
                    target.transform.localPosition = pos;
                    shake -= 0.02 * decreaseFactor;
                }
                else {
                    shake = 0;
                    target.transform.localPosition = originalPos;
                    Laya.timer.clear(this, updateShake);
                }
            }
        }
        static getAngle(v1, v2) {
            var a = Laya.Vector3.dot(v1, v2);
            var b = Laya.Vector3.scalarLength(v1) * Laya.Vector3.scalarLength(v2);
            if (b == 0) {
                if (v1.z > v2.z)
                    return 0;
                else if (v1.z < v2.z)
                    return 180;
                if (v1.y > v2.y)
                    return 90;
                else if (v1.y < v2.y)
                    return -90;
            }
            var cosAngle = a / b;
            if (cosAngle < -1) {
                cosAngle = -1;
            }
            if (cosAngle > 1) {
                cosAngle = 1;
            }
            var angle = Math.acos(cosAngle) * 180 / Math.PI;
            return angle;
        }
        static getAngleUp(v1, v2, up) {
            let angle = Tool.getAngle(v1, v2);
            let crossNoraml = new Laya.Vector3();
            Laya.Vector3.cross(v2, v1, crossNoraml);
            if (Tool.getAngle(up, crossNoraml) > 90) {
                angle *= -1;
            }
            return angle;
        }
        static getProjection(dir, normal) {
            let upProject = Vector3.mull(normal, Vector3.dot(dir, normal));
            let downProject = Vector3.subtract(dir, upProject);
            return downProject;
        }
        static d2_AddClickEvent(btn, caller, callBack, args, isStopPropagation = false, isSound = true, isTween = true) {
            btn.offAllCaller(caller);
            let tweenTime = 60;
            let oldSize = btn.scaleX;
            let newSize = oldSize * 0.9;
            let isPressed = false;
            let cbDown = (evt) => {
                isPressed = true;
                if (isTween)
                    Laya.Tween.to(btn, { scaleX: newSize, scaleY: newSize }, tweenTime);
                if (isStopPropagation)
                    evt.stopPropagation;
            };
            btn.on(Laya.Event.MOUSE_DOWN, caller, cbDown, args);
            let cbUp = (evt) => {
                if (isPressed == false)
                    return;
                isPressed = false;
                if (isStopPropagation)
                    evt.stopPropagation;
                if (isTween)
                    Laya.Tween.to(btn, { scaleX: oldSize, scaleY: oldSize }, tweenTime, null, Laya.Handler.create(btn, () => {
                        if (callBack)
                            callBack.call(caller, evt);
                    }));
                else {
                    if (callBack)
                        callBack.call(caller, evt);
                }
                if (isSound)
                    SoundMgr.play(SoundType.Button);
            };
            btn.on(Laya.Event.MOUSE_UP, caller, cbUp, args);
            let cbOut = (evt) => {
                if (isPressed == false)
                    return;
                isPressed = false;
                if (isTween)
                    Laya.Tween.to(btn, { scaleX: oldSize, scaleY: oldSize }, tweenTime);
                if (isStopPropagation)
                    evt.stopPropagation;
            };
            btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, args);
        }
        static getAngle2DWay(v1, v2) {
            var a = Laya.Vector2.dot(v1, v2);
            var b = Laya.Vector2.scalarLength(v1) * Laya.Vector2.scalarLength(v2);
            var angle = Math.acos(a / b) * 180 / Math.PI;
            var axis = v1.x * v2.y - v2.x * v1.y;
            if (axis > 0) {
                angle *= 1;
            }
            else if (axis < 0) {
                angle *= -1;
            }
            else {
                angle = 0;
            }
            return angle;
        }
        static d2_numberLabelToast(value, target) {
            let color = value >= 0 ? this.greenColor : this.redColor;
            let url = value >= 0 ? "+" : "-";
            let point = Tool.d3_getSpritePosBySprite3DPoint(Player_RunMove.instance.mainCamera, target, new Laya.Vector3(0, 0.2, 0));
            Tool.d2_labelToast(url + value + "$", color, Laya.stage, 1, new Laya.Vector2(point.x, point.y));
        }
        static d2_coinCollectAnim(url, startPos, endPos, parent, amount = 15, scale = 1, callBack = null, coinArriveCallBack = null) {
            var amountTmp = amount;
            for (var i = 0; i < amount; i++) {
                let coin = Laya.Pool.getItemByClass("coin", Laya.Image);
                coin.skin = url;
                coin.x = startPos.x;
                coin.y = startPos.y;
                coin.scale(scale, scale);
                parent.addChild(coin);
                let time = 300 + Math.random() * 100 - 50;
                Laya.Tween.to(coin, { x: coin.x + Math.random() * 250 - 125, y: coin.y + Math.random() * 250 - 125 }, time);
                Laya.timer.once(time + 50, this, function () {
                    Laya.Tween.to(coin, { x: endPos.x, y: endPos.y }, 400, null, new Laya.Handler(this, function () {
                        parent.removeChild(coin);
                        Laya.Pool.recover("coin", coin);
                        amountTmp--;
                        coinArriveCallBack && coinArriveCallBack();
                        if (amountTmp == 0 && callBack)
                            callBack(parent);
                    }));
                });
            }
        }
        static d2_coinCollectAnimAni(ani, startPos, endPos, parent, amount = 15, callBack = null) {
            var amountTmp = amount;
            for (var i = 0; i < amount; i++) {
                let coin = Laya.Pool.getItemByClass("coinAnim", Laya.Clip);
                coin.skin = ani.skin;
                coin.index = ani.index;
                coin.clipX = ani.clipX;
                coin.clipY = ani.clipY;
                coin.autoPlay = ani.autoPlay;
                coin.x = startPos.x;
                coin.y = startPos.y;
                coin.scale(0.8, 0.8);
                parent.addChild(coin);
                let time = 300 + Math.random() * 100 - 50;
                Laya.Tween.to(coin, { x: coin.x + Math.random() * 250 - 125, y: coin.y + Math.random() * 250 - 125 }, time);
                Laya.timer.once(time + 50, this, function () {
                    Laya.Tween.to(coin, { x: endPos.x, y: endPos.y }, 400, null, new Laya.Handler(this, function () {
                        parent.removeChild(coin);
                        Laya.Pool.recover("coinAnim", coin);
                        amountTmp--;
                        if (amountTmp == 0 && callBack)
                            callBack(parent);
                    }));
                });
            }
        }
        static faceToast(faceUrl, parent, startPos, endPos) {
            let image = new Laya.Image(faceUrl);
            image.anchorX = 0.5;
            image.anchorY = 0.5;
            image.alpha = 1;
            image.scaleX = 1;
            image.scaleY = 1;
            parent.addChild(image);
            image.x = startPos.x;
            image.y = startPos.y;
            Laya.Tween.to(image, { x: endPos.x, y: endPos.y, alpha: 0.9 }, 1000, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                if (image && !image.destroyed) {
                    Laya.Tween.to(image, { x: endPos.x, y: endPos.y - 100, alpha: 0 }, 1000, null, Laya.Handler.create(this, () => {
                        if (image && !image.destroyed) {
                            image.destroy();
                        }
                    }));
                }
            }));
        }
        static d2_fontClipToast(clipUrl, value, parent, scale, startPos) {
            if (!this.wordToastOk)
                return;
            let clip = Laya.Pool.getItemByClass("fontClip_d2", Laya.FontClip);
            clip.skin = clipUrl;
            clip.sheet = "0123456789";
            clip.value = value;
            clip.anchorX = 0.5;
            clip.anchorY = 0.5;
            clip.alpha = 1;
            clip.scaleX = scale;
            clip.scaleY = scale;
            parent.addChild(clip);
            clip.x = startPos.x;
            clip.y = startPos.y;
            let endPos = new Laya.Vector2(startPos.x + (Tool.halfPercent() ? Tool.randomInt(-100, -75) : Tool.randomInt(75, 100)), startPos.y - 50);
            Laya.Tween.to(clip, { x: endPos.x, y: endPos.y, alpha: 0.9 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                Laya.Tween.to(clip, { x: endPos.x, y: endPos.y - 90, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                    parent.removeChild(clip);
                    Laya.Pool.recover("fontClip_d2", clip);
                }));
            }));
        }
        static d2_imageToast(wordUrl, parent, startPos) {
            if (!this.wordToastOk)
                return;
            Tool.wordToastOk = false;
            let image = new Laya.Image(wordUrl);
            image.anchorX = 0.5;
            image.anchorY = 0.5;
            image.alpha = 1;
            parent.addChild(image);
            image.x = startPos.x;
            image.y = startPos.y;
            image.scaleX = 0;
            image.scaleY = 0;
            Laya.Tween.to(image, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                Tool.wordToastOk = true;
                if (image && !image.destroyed) {
                    Laya.Tween.to(image, { top: 200, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                        if (image && !image.destroyed) {
                            image.destroy();
                        }
                    }));
                }
            }));
        }
        static d2_labelToast(value, color, parent, scale, startPos) {
            let label = Laya.Pool.getItemByClass("label_d2", Laya.Label);
            label.text = value;
            label.color = color;
            label.anchorX = 0.5;
            label.anchorY = 0.5;
            label.alpha = 1;
            label.scaleX = scale;
            label.scaleY = scale;
            label.font = "Microsoft YaHei";
            label.fontSize = 50;
            label.bold = true;
            parent.addChild(label);
            label.x = startPos.x;
            label.y = startPos.y;
            let endPos = new Laya.Vector2(startPos.x + (Tool.halfPercent() ? Tool.randomInt(-100, -75) : Tool.randomInt(75, 100)), startPos.y - 50);
            Laya.Tween.to(label, { x: endPos.x, y: endPos.y, alpha: 0.9 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                Laya.Tween.to(label, { x: endPos.x, y: endPos.y - 90, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                    parent.removeChild(label);
                    Laya.Pool.recover("label_d2", label);
                }));
            }));
        }
        static clamp01(v) {
            if (v > 1)
                return 1;
            if (v < 0)
                return 0;
            return v;
        }
        static clamp(value, min, max) {
            if (value < min)
                return min;
            if (value > max)
                return max;
            return value;
        }
        static get getCurrentTime() {
            return new Date().getTime();
        }
        static get getCurrentTime_Second() {
            return Math.floor(Date.parse((new Date()).toString()) / 1000);
        }
        static math_gcd(a, b) {
            return b == 0 ? a : this.math_gcd(b, a % b);
        }
        static numberTo(base, target, dt) {
            if (Math.abs((target - base)) < dt) {
                base = target;
            }
            else if (base < target) {
                base += dt;
            }
            else if (base > target) {
                base -= dt;
            }
            return base;
        }
        static randomNumber(a, b) {
            return a + (b - a) * Math.random();
        }
        static randomInt(a, b) {
            return Math.floor(a + (b + 1 - a) * Math.random());
        }
        static halfPercent() {
            return Math.random() < 0.5;
        }
        static percent(axis) {
            return Math.random() < axis;
        }
        static cloneArray(array) {
            let outArray = [].concat(array);
            return outArray;
        }
        static getRandomInArray(array) {
            if (array.length) {
                let r = Math.random() * array.length;
                r = Math.floor(r);
                return array[r];
            }
            else {
                console.error("传入错误参数,返回空");
                return null;
            }
        }
        static takeRandomInArray(array) {
            if (array.length) {
                let r = Math.random() * array.length;
                r = Math.floor(r);
                let obj = array[r];
                array.splice(r, 1);
                return obj;
            }
            else {
                console.error("传入错误参数,返回空");
                return null;
            }
        }
        static randomArray(array) {
            let newArray = new Array(array.length);
            let length = newArray.length;
            for (let i = 0; i < length; i++) {
                let obj = this.takeRandomInArray(array);
                newArray[i] = obj;
            }
            return newArray;
        }
        static BoxCheck_2D_Normal(axis1, horizontal1, range1, width1, axis2, horizontal2, range2, width2) {
            if (CollderController.isTestOn)
                GlData.colliderCount += 1;
            let axisWay = axis2 - axis1;
            let horizontalWay = horizontal2 - horizontal1;
            let horizontalDis = Math.abs(horizontalWay);
            let axisDis = Math.abs(axisWay);
            let horizontalRange = (width1 + width2) / 2;
            let axisRange = (range1 + range2) / 2;
            return { isHit: horizontalDis < horizontalRange && axisDis < axisRange, axisDis: axisDis, axisRange: axisRange, horizontalDis: horizontalDis, horizontalRange: horizontalRange, axisWay: axisWay, horizontalWay: horizontalWay };
        }
        static CircleCheck_2D(z1, x1, radius1, z2, x2, radius2) {
            let distancePow2 = Math.pow(z1 - z2, 2) + Math.pow(x1 - x2, 2);
            let rangePow2 = Math.pow(radius1 + radius2, 2);
            return { isHit: distancePow2 < rangePow2, distancePow2: distancePow2, rangePow2: rangePow2 };
        }
    }
    Tool.greenColor = "#00FF00";
    Tool.redColor = "#FF0000";
    Tool.wordToastOk = true;

    class TouchWayCheck extends Laya.Script {
        constructor() {
            super(...arguments);
            this.calls = [];
            this.firstId = -1;
            this.secondId = -1;
            this.firstOriginalPoint = new Laya.Vector2();
            this.secondOriginalPoint = new Laya.Vector2();
            this.isSecond = false;
            this.orignalHorizontal = 0;
            this.orignalAxis = 0;
            this.orignalHorizontalAlways = 0;
            this.orignalAxisAlways = 0;
            this.offset = new Laya.Vector3();
        }
        onEnable() {
            EventMgr.on(TouchEventType.start, this, this.onMouseDown);
            EventMgr.on(TouchEventType.move, this, this.onMouseMove);
            EventMgr.on(TouchEventType.end, this, this.onMouseUp);
        }
        onDisable() {
            EventMgr.off(TouchEventType.start, this, this.onMouseDown);
            EventMgr.off(TouchEventType.move, this, this.onMouseMove);
            EventMgr.off(TouchEventType.end, this, this.onMouseUp);
        }
        onMouseDown(e) {
            if (this.isSecond == false) {
                if (this.firstId == -1) {
                    this.checkOut(e);
                    this.firstId = e.touchId;
                    EventMgr.event(TouchEventType.singleTouchStart, e);
                    this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
                }
                else if (this.firstId != e.touchId && this.secondId == -1) {
                    this.secondId = e.touchId;
                    this.isSecond = true;
                    EventMgr.event(TouchEventType.secondTouchStart, e);
                    this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
                }
            }
            else {
                if (this.firstId == -1) {
                    this.firstId = e.touchId;
                    this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
                }
                else if (this.secondId == -1) {
                    this.secondId = e.touchId;
                    this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
                }
            }
            this.checkOutAlways(e);
        }
        onMouseMove(e) {
            if (this.isSecond == false) {
                if (e.touchId == this.firstId) {
                    this.checkWay(e);
                    this.checkOut(e);
                    EventMgr.event(TouchEventType.singleTouchMove, e);
                }
            }
            else {
                if (this.firstId != -1 && this.secondId != -1) {
                    let data = {
                        distance: 0,
                        angle: 0,
                    };
                    let lastDir = this.Vector2Reduce(this.secondOriginalPoint, this.firstOriginalPoint);
                    let lastDistance = Laya.Vector2.scalarLength(lastDir);
                    let nowDir;
                    if (e.touchId == this.firstId) {
                        nowDir = this.Vector2Reduce(this.secondOriginalPoint, new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height));
                    }
                    else if (e.touchId == this.secondId) {
                        nowDir = this.Vector2Reduce(new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height), this.firstOriginalPoint);
                    }
                    if (nowDir) {
                        let nowDistance = Laya.Vector2.scalarLength(nowDir);
                        data.distance = (nowDistance - lastDistance);
                        data.angle = Tool.getAngle2DWay(lastDir, nowDir);
                        EventMgr.event(TouchEventType.secondTouchMove, data);
                    }
                }
            }
            if (e.touchId == this.firstId) {
                this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
            }
            if (e.touchId == this.secondId) {
                this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
            }
            this.checkWayAlways(e);
        }
        onMouseUp(e) {
            this.checkOutAlways(e);
            if (e.touchId == this.firstId) {
                this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
            }
            if (e.touchId == this.secondId) {
                this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
            }
            if (this.isSecond == false) {
                if (e.touchId == this.firstId) {
                    this.checkOut(e);
                    EventMgr.event(TouchEventType.singleTouchEnd, e);
                    this.firstId = -1;
                }
            }
            else {
                if (e.touchId == this.firstId) {
                    this.firstId = -1;
                }
                if (e.touchId == this.secondId) {
                    this.secondId = -1;
                }
                if (this.firstId == -1 && this.secondId == -1) {
                    this.isSecond = false;
                }
            }
        }
        WayCheck() {
            let dir = this.Vector2Reduce(this.nowPos, this.startPos);
            let scale = Laya.Vector2.scalarLength(dir);
            let sensitivity = 100;
            if (scale > sensitivity) {
                let angle = Math.atan2(dir.y, dir.x) / Math.PI * 180;
                let call = "none";
                if (angle > -135 && angle < -45) {
                    call = "up";
                }
                else if (angle > -45 && angle < 45) {
                    call = "right";
                }
                else if (angle < 135 && angle > 45) {
                    call = "down";
                }
                else if (angle < -135 || angle > 135) {
                    call = "left";
                }
                switch (call) {
                    case "none":
                        break;
                    case "up":
                        break;
                    case "right":
                        break;
                    case "down":
                        break;
                    case "left":
                        break;
                }
                this.isDown = false;
            }
            this.startPos = this.nowPos;
        }
        onDestroy() {
            if (this.touchTimer) {
                clearTimeout(this.touchTimer);
            }
        }
        checkWay(e) {
            let horizontal = e.stageX - this.orignalHorizontal;
            let axis = e.stageY - this.orignalAxis;
            EventMgr.event(TouchEventType.getAxis, [{ x: horizontal, y: axis }]);
        }
        checkOut(e) {
            this.orignalHorizontal = e.stageX;
            this.orignalAxis = e.stageY;
        }
        checkWayAlways(e) {
            let horizontal = e.stageX / Laya.stage.width - this.orignalHorizontalAlways;
            let axis = e.stageY / Laya.stage.height - this.orignalAxisAlways;
            this.checkOutAlways(e);
            EventMgr.event(TouchEventType.getAxisAlways, [{ x: horizontal, y: axis }]);
        }
        checkOutAlways(e) {
            this.orignalHorizontalAlways = e.stageX / Laya.stage.width;
            this.orignalAxisAlways = e.stageY / Laya.stage.height;
        }
        modelRotateControlDown() {
            let mousePos = new Laya.Vector3(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY, 0);
            this.startPosition = mousePos.clone();
            this.prePosition = mousePos.clone();
        }
        modelRotateControlMove() {
            let mousePos = new Laya.Vector3(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY, 0);
            Laya.Vector3.subtract(mousePos, this.prePosition, this.offset);
            this.prePosition = mousePos.clone();
            var offset = new Laya.Vector3(this.offset.x, this.offset.y, 0);
            let rot = new Laya.Vector3();
            Laya.Vector3.cross(offset, new Laya.Vector3(0, 0, 1), rot);
            Laya.Vector3.normalize(rot, rot);
        }
        modelRotateControlUp() {
            let mousePos = new Laya.Vector3(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY, 0);
        }
        onKeyDown(e) {
            EventMgr.event(TouchEventType.keyDown, e);
        }
        Vector2Reduce(a, b) {
            return new Laya.Vector2(a.x - b.x, a.y - b.y);
        }
    }

    class CoinComp extends D2Comp {
        init(...data) {
            this.value = this.self.getChildByName("value");
            this.coinUpdate();
            EventMgr.on(EventType.Game_Coin_Update, this, this.coinUpdate);
        }
        coinUpdate() {
            this.value.value = SaveData.ReadCoin().toString();
        }
    }

    class LoadResMgr {
        static addLoadRes(type) {
            this.loadingList.push(type);
            this.loadingCount++;
        }
        static removeLoadRes(type) {
            let index = this.loadingList.indexOf(type);
            if (index == -1)
                console.log("完成了不存在的资源加载");
            else {
                this.loadingList.splice(index, 1);
            }
            EventMgr.event(EventType.Progress_Load_Update);
        }
    }
    LoadResMgr.loadingList = [];
    LoadResMgr.loadingCount = 0;

    class Platform_wx extends Platform {
        init() {
            super.init();
            this.platformApi = Laya.Browser.window.wx;
            this.showShareMenuWithTicket(true);
            this.regisiterWXShareCallback();
        }
        showToast(msg, duration = 1500) {
            Laya.Browser.window.wx.showToast({
                title: msg,
                icon: "none",
                duration: duration,
            });
        }
        showShareMenuWithTicket(ticket) {
            wx.showShareMenu({
                withShareTicket: ticket,
                success: function () { },
                fail: function () { },
                complete: function () { }
            });
        }
        regisiterWXShareCallback() {
            var shareId = 1;
            if (Laya.Browser.onWeiXin) {
                var object = { title: "分享", image: "" };
                Laya.Browser.window.wx.onShareAppMessage(function () {
                    console.log("用户点击了转发按钮");
                    let shareObj = {
                        title: object.title,
                        imageUrl: object.image,
                        query: "share_id=" + shareId,
                    };
                    return shareObj;
                });
            }
        }
        showVideo(success, fail) {
            JJWxAd.Instance.showVideoAd(() => {
            }, (isEnded) => {
                if (isEnded) {
                    this.showToast("视频解锁成功");
                    success && success();
                }
                else {
                    this.showToast("视频解锁失败");
                    fail && fail();
                }
            });
        }
    }

    class MainMgr {
        static init() {
            if (this.isStatShow) {
                Laya.Stat.show();
                SoundMgr.muiscSwitch(false);
            }
            this.game = new GameMgr();
            this.goLoad();
            LoadResMgr.addLoadRes(ResType.SubPackage);
            LoadResMgr.addLoadRes(ResType.Scene3D);
            SoundMgr.init();
            SaveData.CheckPlayerData();
            if (Laya.Browser.onWeiXin) {
                LoadResMgr.addLoadRes(ResType.SDK);
                JJMgr.instance.initJJ(() => {
                    JJWxTrap.Instance.Level = SaveData.ReadGrade();
                    LoadResMgr.removeLoadRes(ResType.SDK);
                });
                this.platform = new Platform_wx();
            }
            else {
                this.platform = new Platform();
            }
            this.platform.init();
            let cb = (isSuccess) => {
                if (isSuccess) {
                    LoadResMgr.removeLoadRes(ResType.SubPackage);
                    this.load3DRes(this.scene3DUrl);
                }
            };
            this.platform.loadSubPackage(this.subPackageName, cb);
        }
        static sceneEventOn() {
            EventMgr.on(EventType.Scene_GoHome, this, this.goHome);
            EventMgr.on(EventType.Scene_GoGame, this, this.goGame);
            EventMgr.on(EventType.Scene_GoOver, this, this.goOver);
        }
        static goLoad() {
            this.sceneEventOn();
            this.openScene(SceneUrl.Load);
        }
        static goHome() {
            this.game.levelInit();
            if (!this.isStatShow) {
                SoundMgr.muiscSwitch(true);
            }
            SoundMgr.stop(SoundType.Win, true);
            this.closeScene(SceneUrl.Load);
            this.closeScene(SceneUrl.Over);
            this.openScene(SceneUrl.Home);
        }
        static goGame() {
            if (this.game.playCount == 0)
                SoundMgr.randomPlayMusic();
            this.closeScene(SceneUrl.Home);
            this.openScene(SceneUrl.Game);
            this.game.gameStart();
        }
        static goOver() {
            SoundMgr.muiscSwitch(false);
            this.closeScene(SceneUrl.Game);
            JJWxTrap.Instance.showGameOver(() => {
                this.openScene(SceneUrl.Over);
            });
        }
        static load3DRes(scene3DUrl) {
            var resource = [
                { url: scene3DUrl, clas: Laya.Scene3D, priority: 1 },
            ];
            Laya.loader.create(resource, Laya.Handler.create(this, this.onLoadFinished, [{ target: "3dRes" }], false), Laya.Handler.create(this, this.onLoading, null, false));
            Laya.loader.on(Laya.Event.ERROR, this, err => {
                console.error("资源加载失败", err);
                this.load3DRes(scene3DUrl);
            });
        }
        static onLoadFinished(evt) {
            console.log("资源加载完成", evt);
            this.loadSceneRes();
            LoadResMgr.removeLoadRes(ResType.Scene3D);
        }
        static onLoading(pres) {
        }
        static loadSceneRes() {
            let index = 0;
            let scene = Laya.loader.getRes(this.scene3DUrl);
            Laya.stage.addChild(scene);
            Laya.stage.setChildIndex(scene, index);
            this.game.mainScene = scene;
            this.game.firstIn();
        }
        static openScene(url, callback) {
            Laya.Scene.open(url, false, null, Laya.Handler.create(this, s => {
                Laya.stage.addChild(s);
                callback && callback();
            }));
        }
        static closeScene(url, callback) {
            if (Laya.Scene.close(url)) {
                callback && callback();
            }
            else {
            }
        }
        static checkPerformance(high, mid, low) {
            let highCB = () => {
            };
            let midCB = () => {
                this.game.disabelRetinalCanvas();
            };
            let lowCB = () => {
                this.game.hideShadow(this.game.light);
                this.game.disabelRetinalCanvas();
            };
            let value = 0;
            let count = 100;
            let curCount = count;
            Laya.timer.loop(100, this, addValue);
            function addValue() {
                value += 1000 / Laya.timer.delta;
                curCount--;
                if (curCount <= 0) {
                    Laya.timer.clear(this, addValue);
                    let fps = value / count;
                    if (fps > 50) {
                        high && high();
                    }
                    else if (fps > 40) {
                        mid && mid();
                    }
                    else {
                        low && low();
                    }
                }
            }
        }
    }
    MainMgr.subPackageName = "scene";
    MainMgr.scene3DUrl = "res/scene/Conventional/ResScene.ls";
    MainMgr.isStatShow = false;

    class Character_Boss extends Character_Enemy {
        constructor() {
            super(...arguments);
            this.nowHp = 0;
            this.maxHp = 3;
            this.pathId = 0;
            this.isHurtFast = false;
            this.isAttaking = false;
            this.isCanAttack = true;
        }
        specialInit() {
            Character_Enemy.enemys.push(this);
            this.range += 2;
            this.width += 2;
            this.model.transform.localScale = new Laya.Vector3(1.6, 1.6, 1.6);
            this.skinChange(1, 1, false, false, true);
            this.createSight();
            Laya.timer.frameOnce(1, this, () => {
                this.controlOn();
            });
            this.light = this.model.getChildByName("Light");
            let SpotLight = this.light.getChildAt(0);
            SpotLight.spotAngle = 90;
            this.sightAngle = 45;
            if (this.light) {
                Laya.timer.frameLoop(1, this, this.lightUpdateSet);
            }
            this.attackDoRange = 10;
            this.sightRange = 6.5;
            this.nowAngle = -this.self.transform.rotationEuler.clone().y;
            Laya.timer.frameOnce(1, this, () => {
                this.nowHp = 0;
                this.maxHp = this.path.length;
            });
            let light = this.light;
            Tool.d3_unactiveAllChildren(light);
            light.getChildAt(1).active = true;
        }
        goPath() {
            if (this.pathId >= this.path[this.nowHp].length) {
                this.pathId = 0;
            }
            this.agent.go(this.path[this.nowHp][this.pathId].pos);
            let dis = Vector3.distance(this.self.transform.position.clone(), this.path[this.nowHp][this.pathId].pos.clone());
            this.pathId++;
            return dis;
        }
        onUpdate() {
            if (this.isDead)
                return;
            let isAttack = false;
            let speedAxis = 1;
            let state = this.nowState;
            if (this.isHurtFast) {
                speedAxis = 10;
                state = EnemyState.path;
            }
            switch (state) {
                case EnemyState.path:
                    this.speed = this.pathSpeed;
                    if (!this.agent._pathPending) {
                        this.goPath();
                    }
                    this.rotLerpAxis = 0.1;
                    let dis = Vector3.distance(this.self.transform.position.clone(), this.path[this.nowHp][0].pos.clone());
                    if (this.path[this.nowHp].length == 1 && dis < 0.1) {
                        this.nowAngle = -(this.path[this.nowHp][0].rotY + this.scanRot);
                        this.scanRot += this.scanRotAxis * 0.1;
                        if (this.scanRot > 45) {
                            this.scanRotAxis = -1;
                        }
                        else if (this.scanRot < -45) {
                            this.scanRotAxis = 1;
                        }
                    }
                    else {
                        this.scanRot = 0;
                        this.scanRotAxis = 1;
                    }
                    break;
                case EnemyState.found:
                    this.speed = this.traceSpeed;
                    this.rotLerpAxis = 0.05;
                    if (this.foundPos != null) {
                        this.lastPos = this.foundPos;
                    }
                    if (Vector3.distance(this.self.transform.position.clone(), Character_Player.instance.self.transform.position.clone()) < this.attackDoRange) {
                        this.attackDeal();
                    }
                    else {
                        if (!this.agent._pathPending) {
                            let endCb = () => {
                                this.isTracing = false;
                                this.alarmCD = 1000;
                                this.changeSightTime = this.alarmCD - 1000;
                                this.nowState = EnemyState.alarm;
                            };
                            if (this.foundPos != null) {
                                this.isTracing = true;
                                this.agent.go(this.foundPos);
                                this.foundPos = null;
                            }
                            else {
                                endCb();
                            }
                        }
                    }
                    break;
                case EnemyState.alarm:
                    this.speed = 1;
                    this.alarmCD -= Laya.timer.delta;
                    let cb = () => {
                        let x = Tool.randomNumber(3, 5) * (Tool.halfPercent() ? -1 : 1);
                        let z = Tool.randomNumber(3, 5) * (Tool.halfPercent() ? -1 : 1);
                        let dir = new Laya.Vector3(x, 0, z);
                        let pos = Vector3.add(dir, this.lastPos);
                        this.agent.go(pos);
                        this.lastPos = pos;
                        this.changeSightTime -= 2000;
                        if (!this.agent.navEnabled) {
                            this.nowState = EnemyState.path;
                            this.goPath();
                        }
                    };
                    if (this.alarmCD <= this.changeSightTime) {
                    }
                    if (this.alarmCD <= 0) {
                        this.nowState = EnemyState.path;
                        this.goPath();
                    }
                    break;
                case EnemyState.attack:
                    isAttack = true;
                    this.speed = 0;
                    this.agent.go(new Laya.Vector3(10000, 0, 0));
                    this.attackMove();
                    break;
                default:
                    console.log("敌人不存在这个状态");
                    break;
            }
            this.agent.speed = this.speed * speedAxis;
            if (!isAttack) {
                let delta = Vector3.subtract(this.self.transform.position.clone(), this.oldPos);
                delta = Vector3.normalized(delta);
                delta = Vector3.mull(delta, this.speed / 3);
                this.oldPos = this.self.transform.position.clone();
                this.moveControl(delta.x, delta.z, false);
                this.rotControl(-delta.x, delta.z);
            }
            else if (this.isAttaking) {
                let dir = Vector3.subtract(Character_Player.instance.self.transform.position.clone(), this.self.transform.position.clone());
                let xAxis = -dir.x;
                let zAxis = dir.z;
                let angle = this.nowAngle;
                if (xAxis == 0 && zAxis == 0) {
                    return;
                }
                let joyAngle;
                if (zAxis == 1 && xAxis == 0) {
                    joyAngle = 0;
                }
                else if (zAxis == -1 && xAxis == 0) {
                    joyAngle = 180;
                }
                else {
                    let hudu = Math.atan2(xAxis, zAxis);
                    joyAngle = hudu * 180 / Math.PI;
                }
                let goAngle = joyAngle;
                let distance = goAngle - angle;
                if (goAngle - angle > 180) {
                    distance -= 360;
                }
                else if (angle - goAngle > 180) {
                    distance += 360;
                }
                let lerpAxis = 1;
                let goAxis = distance * lerpAxis;
                angle += goAxis;
                if (0 > 180) {
                    angle -= 360;
                }
                else if (angle <= -180) {
                    angle += 360;
                }
                this.nowAngle = angle;
                angle *= -1;
                let nowRot = this.self.transform.rotationEuler.clone();
                let targetRot = nowRot.clone();
                targetRot.y = angle;
                this.self.transform.rotationEuler = targetRot;
            }
        }
        moveControl(x, y, isMove = true) {
            var dt = Laya.timer.delta / 1000;
            var pos = this.self.transform.position.clone();
            var delta = new Laya.Vector3(x, 0, y);
            if (!this.isOtherAnimUsing) {
                var length = Laya.Vector3.scalarLength(delta);
                if (length > 1) {
                    delta = Vector3.normalized(delta);
                    length = 1;
                }
            }
            else {
                var length = 0;
            }
            this.anim.getControllerLayer(1).defaultWeight = length;
            var deltaX = delta.x * this.speed * dt;
            var deltaZ = delta.z * this.speed * dt;
            pos.x -= deltaX;
            pos.z += deltaZ;
            if (isMove) {
                if (this.agent.canGoOrNot(pos)) {
                    this.self.transform.position = pos;
                }
                else {
                    pos.x += deltaX;
                    if (this.agent.canGoOrNot(pos)) {
                        this.self.transform.position = pos;
                    }
                    else {
                        pos.x -= deltaX;
                        pos.z -= deltaZ;
                        if (this.agent.canGoOrNot(pos)) {
                            this.self.transform.position = pos;
                        }
                    }
                }
            }
        }
        goDead() {
            this.nowHp++;
            SoundMgr.play(SoundType.Kill);
            BornController.bornFxFromPool(FxType.KillFX, BornController.mainScene, 1000, 1, this.self.transform.position.clone());
            if (this.nowHp >= this.maxHp) {
                this.isDead = true;
                this.anim.speed = 1;
                this.cover.active = false;
                this.model.transform.localScale = new Laya.Vector3(0.8, 0.8, 0.8);
                this.moveControl(0, 0, false);
                this.rotControl(0, 0);
                this.anim.play("dead", 0, 0);
                this.noWater();
                this.noCover();
                this.deadSpecial();
            }
            else {
                this.hurtFast();
            }
        }
        hurtFast() {
            this.isHurtFast = true;
            this.attackEnd();
            this.nowState = EnemyState.path;
            Laya.timer.clear(this, this.attackDo);
            Laya.timer.clear(this, this.attackEnd);
            let dis = this.goPath();
            Laya.timer.once(dis * 110, this, () => {
                this.isHurtFast = false;
            });
        }
        deadSpecial() {
            this.skinChange(1, 1, true, false, true);
            this.hideSight();
            this.agent.navEnabled = false;
            let point = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.self);
            Tool.d2_coinCollectAnim(GlData.coinUrl, new Laya.Vector2(point.x, point.y), new Laya.Vector2(100, 50), Game.instance, 20, 1, () => {
                EventMgr.event(EventType.Game_MoneyCount_Add, Tool.randomInt(GlData.killBossDiamondAdd[0], GlData.killBossDiamondAdd[1]));
            });
        }
        attackDeal() {
            if (this.nowState == EnemyState.found) {
                let target = Character_Player.instance;
                if (Character_Player.instance.follow.numChildren > 0) {
                    target = Character_Player.instance.follow.getChildAt(0).getComponent(Character_Npc);
                }
                this.attack(target);
                this.nowState = EnemyState.attack;
            }
        }
        attack(attackTarget) {
            if (this.isOtherAnimUsing) {
                return;
            }
            if (this.isWater) {
                this.attackEnd();
                return;
            }
            this.attackTarget = attackTarget;
            this.isAttaking = true;
            this.anim.crossFade("Gun", 0.1, 0, 0);
            this.isOtherAnimUsing = true;
            let attackDoTime = 300;
            let attackEndTime = 1200;
            Laya.timer.once(attackDoTime, this, this.attackDo);
            Laya.timer.once(attackEndTime, this, this.attackEnd);
            this.attackSpecial();
        }
        attackMove() {
            this.moveControl(0, 0, false);
        }
        attackSpecial() {
        }
        attackDo() {
            if (this.isDead)
                return;
            let bullet;
            let comp;
            for (let i = 0; i < BossBullet.bullet.length; i++) {
                if (!BossBullet.bullet[i].self.active) {
                    bullet = BossBullet.bullet[i].self;
                    bullet.active = true;
                    comp = BossBullet.bullet[i];
                    comp.dis = 0;
                    comp.endDis = 10000;
                    break;
                }
            }
            if (!bullet) {
                bullet = BornController.bornStageObj("BossBullet", BornController.mainScene);
                comp = bullet.addComponent(BossBullet);
            }
            let bulletPos = this.weaponGrip.transform.position.clone();
            let playerPos = Character_Player.instance.self.transform.position.clone();
            playerPos.y += 0.5;
            bulletPos.y = playerPos.y;
            bullet.transform.position = bulletPos;
            bullet.transform.rotation = this.model.transform.rotation.clone();
            let dir = Vector3.subtract(playerPos, bulletPos);
            let dis = Laya.Vector3.scalarLength(dir);
            dir = Vector3.normalized(dir);
            this.model.transform.getForward(dir);
            dir.y = 0;
            dir.z *= -1;
            dir.x *= -1;
            comp.direction = dir;
            comp.endDis = this.sightRange;
            comp.isColliderActive = true;
            SoundMgr.play(SoundType.BossShoot);
        }
        attackEnd() {
            if (this.isDead)
                return;
            this.idle();
            this.isAttaking = false;
            this.attackEndSpecial();
        }
        attackEndSpecial() {
            this.isTracing = false;
            this.alarmCD = 1000;
            this.changeSightTime = this.alarmCD - 1000;
            this.nowState = EnemyState.alarm;
        }
    }

    var UnlockType;
    (function (UnlockType) {
        UnlockType[UnlockType["has"] = 0] = "has";
        UnlockType[UnlockType["choose"] = 1] = "choose";
        UnlockType[UnlockType["coin"] = 2] = "coin";
        UnlockType[UnlockType["video"] = 3] = "video";
    })(UnlockType || (UnlockType = {}));
    var ChooseType;
    (function (ChooseType) {
        ChooseType[ChooseType["cloth"] = 0] = "cloth";
        ChooseType[ChooseType["weapon"] = 1] = "weapon";
    })(ChooseType || (ChooseType = {}));
    class Shop extends D2Comp {
        constructor() {
            super(...arguments);
            this.nowType = ChooseType.cloth;
        }
        init() {
            Shop.instance = this;
            this.self.width = Laya.stage.width;
            this.self.height = Laya.stage.height;
            this.self.x = 0;
            this.self.y = 0;
            this.mainPanel = this.self.getChildByName("mainPanel");
            this.closeBtn = this.self.getChildByName("closeBtn");
            this.bg = this.self.getChildByName("bg");
            this.showImage = this.self.getChildByName("showImage");
            this.clothType = this.mainPanel.getChildByName("clothType");
            this.weaponType = this.mainPanel.getChildByName("weaponType");
            this.buyButton = this.mainPanel.getChildByName("buyButton");
            this.nowType = ChooseType.cloth;
            this.switchType(this.nowType);
            this.initEvent();
        }
        initEvent() {
            Tool.d2_AddClickEvent(this.closeBtn, this, this.onCloseClick);
            Tool.d2_AddClickEvent(this.clothType, this, this.switchType, [ChooseType.cloth], false, true, false);
            Tool.d2_AddClickEvent(this.weaponType, this, this.switchType, [ChooseType.weapon], false, true, false);
            Tool.d2_AddClickEvent(this.buyButton, this, this.buy);
        }
        onCloseClick() {
            this.self.set_visible(false);
            EventMgr.event(EventType.Home_CloseShop_Event);
            this.closeCB && this.closeCB();
        }
        switchType(typeId) {
            this.nowType = typeId;
            let clothMask = this.clothType.getChildAt(0);
            let weaponMask = this.weaponType.getChildAt(0);
            clothMask.set_visible(true);
            weaponMask.set_visible(true);
            switch (this.nowType) {
                case ChooseType.cloth:
                    clothMask.set_visible(false);
                    this.nowChooseIndex = SaveData.ReadNowCloth();
                    break;
                case ChooseType.weapon:
                    weaponMask.set_visible(false);
                    this.nowChooseIndex = SaveData.ReadNowWeapon();
                    break;
                default:
                    console.error("选择错误的类型", typeId);
                    break;
            }
            this.initList();
            this.updateShow();
        }
        initList() {
            this.list = this.mainPanel.getChildByName("list");
            this.list.selectEnable = false;
            this.list.array = new Array(9);
            this.list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this.list.hScrollBarSkin = "";
            this.list.repeatX = 3;
            this.list.repeatY = 3;
        }
        onListRender(cell, index) {
            let item = cell.getChildByName("Item");
            let icon = item.getChildByName("icon");
            let coin = item.getChildByName("coin");
            let choose = item.getChildByName("choose");
            let black = item.getChildByName("black");
            let unlockType = UnlockType.has;
            switch (this.nowType) {
                case ChooseType.cloth:
                    icon.skin = "ui/game/baby/baby0" + (index + 1) + ".png";
                    break;
                case ChooseType.weapon:
                    icon.skin = "ui/game/weapon/weapon0" + (index + 1) + ".png";
                    break;
                default:
                    break;
            }
            let isUnlock = false;
            switch (this.nowType) {
                case ChooseType.cloth:
                    isUnlock = SaveData.ReadClothUnlock(index);
                    break;
                case ChooseType.weapon:
                    isUnlock = SaveData.ReadWeaponUnlock(index);
                    break;
            }
            let isChoose = index == this.nowChooseIndex;
            choose.set_visible(isChoose);
            black.set_visible(!isUnlock);
            coin.set_visible(!isUnlock);
            let coinNeed = index * 500;
            if (index >= 6) {
                coinNeed += (index - 6) * 500;
            }
            coin.getChildByName("value").value = coinNeed.toString();
            if (isUnlock) {
                icon.x = 78;
                icon.y = 90;
            }
            else {
                icon.x = 78;
                icon.y = 72;
            }
            let value;
            value = coin.getChildAt(0);
            item.scale(1, 1);
            Tool.d2_AddClickEvent(item, this, this.clickEvent, [{ id: index, type: this.nowType, unlockType: isUnlock }]);
        }
        clickEvent(data) {
            let id = data.id;
            let type = data.type;
            let unlockType = data.unlockType;
            let chooseCB = (id) => {
                this.nowChooseIndex = id;
                if (unlockType) {
                    switch (type) {
                        case ChooseType.cloth:
                            SaveData.SetNowCloth(this.nowChooseIndex);
                            break;
                        case ChooseType.weapon:
                            SaveData.SetNowWeapon(this.nowChooseIndex);
                            break;
                    }
                }
            };
            chooseCB(id);
            this.updateShow();
            this.list.refresh();
        }
        updateShow() {
            let url;
            let index = this.nowChooseIndex;
            switch (this.nowType) {
                case ChooseType.cloth:
                    url = "ui/game/baby/baby0" + (index + 1) + ".png";
                    break;
                case ChooseType.weapon:
                    url = "ui/game/weapon/weapon0" + (index + 1) + ".png";
                    break;
                default:
                    url = "";
                    break;
            }
            let isUnlock = false;
            switch (this.nowType) {
                case ChooseType.cloth:
                    isUnlock = SaveData.ReadClothUnlock(index);
                    break;
                case ChooseType.weapon:
                    isUnlock = SaveData.ReadWeaponUnlock(index);
                    break;
            }
            this.buyButton.set_visible(!isUnlock);
            let coinNeed = index * 500;
            if (index >= 6) {
                coinNeed += (index - 6) * 500;
            }
            let isCoinEnough = SaveData.ReadCoin() >= coinNeed;
            this.buyButton.skin = !isCoinEnough ? "ui/game/sljm_gg_dk.png" : "ui/game/shop_gold_dk.png";
        }
        buy() {
            let type = this.nowType;
            let index = this.nowChooseIndex;
            let coinNeed = index * 500;
            if (index >= 6) {
                coinNeed += (index - 6) * 500;
            }
            let isCoinEnough = SaveData.ReadCoin() >= coinNeed;
            switch (type) {
                case ChooseType.cloth:
                    if (isCoinEnough) {
                        SaveData.AddCoin(-coinNeed);
                        SaveData.UnlockCloth(index);
                        SaveData.SetNowCloth(index);
                    }
                    else {
                        Platform.instance.showVideo(() => {
                            SaveData.AddCoin(500);
                        }, null);
                    }
                    break;
                case ChooseType.weapon:
                    if (isCoinEnough) {
                        SaveData.AddCoin(-coinNeed);
                        SaveData.UnlockWeapon(index);
                        SaveData.SetNowWeapon(index);
                    }
                    else {
                        Platform.instance.showVideo(() => {
                            SaveData.AddCoin(500);
                        }, null);
                    }
                    break;
            }
            this.updateShow();
            this.list.refresh();
        }
    }

    class D2Tween {
        static toAlpha(target, startValue, endValue, duration, ease, completeCB, isReset = false, isLoop = false) {
            if (!target || target.destroyed)
                return;
            this.clearTween(target);
            target.alpha = startValue;
            alpha1();
            function alpha1() {
                let handler = isLoop || isReset ? new Laya.Handler(this, alpha2) : new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(target, { alpha: endValue }, duration, ease, handler);
            }
            function alpha2() {
                let handler = isLoop ? new Laya.Handler(this, alpha1) : new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(target, { alpha: startValue }, duration, ease, handler);
            }
        }
        static toScale(target, startValue, endValue, duration, ease, completeCB, isReset = false, isLoop = false) {
            if (!target || target.destroyed)
                return;
            this.clearTween(target);
            target.scale(startValue, startValue);
            scale1();
            function scale1() {
                let handler = isLoop || isReset ? new Laya.Handler(this, scale2) : new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(target, { scaleX: endValue, scaleY: endValue }, duration, ease, handler);
            }
            function scale2() {
                let handler = isLoop ? new Laya.Handler(this, scale1) : new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(target, { scaleX: startValue, scaleY: startValue }, duration, ease, handler);
            }
        }
        static toPosition(target, position, duration, ease, completeCB, isLoop = false, loopType = 0) {
            if (!target || target.destroyed)
                return;
            this.clearTween(target);
            let curPos = {}, targetPos = {};
            if (position.x != null) {
                curPos.x = target.x;
                targetPos.x = position.x;
            }
            if (position.y != null) {
                curPos.y = target.y;
                targetPos.y = position.y;
            }
            pos1();
            function pos1() {
                if (isLoop) {
                    var handler = loopType == 0 ? new Laya.Handler(this, pos2) : new Laya.Handler(this, pos3);
                }
                else {
                    handler = new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                }
                Laya.Tween.to(target, targetPos, duration, ease, handler);
            }
            function pos2() {
                Laya.Tween.to(target, curPos, duration, ease, Laya.Handler.create(this, pos1));
            }
            function pos3() {
                target.pos(curPos.x, curPos.y);
                pos1();
            }
        }
        static toRotaion(target, angle, duration, ease, completeCB, isReset = false, isLoop = false) {
            if (!target || target.destroyed)
                return;
            this.clearTween(target);
            let curAngle = target.rotation;
            let targetAngle = curAngle + angle;
            let loopAngle = (curAngle - angle) + curAngle;
            rotate1();
            function rotate1() {
                let handler = isLoop ? new Laya.Handler(this, rotate2) : isReset ? new Laya.Handler(this, rotate4) : new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(target, { rotation: targetAngle }, duration, ease, handler);
            }
            function rotate2() {
                Laya.Tween.to(target, { rotation: loopAngle }, duration * 2, ease, Laya.Handler.create(this, rotate3));
            }
            function rotate3() {
                Laya.Tween.to(target, { rotation: targetAngle }, duration * 2, ease, Laya.Handler.create(this, rotate2));
            }
            function rotate4() {
                let handler = new Laya.Handler(this, () => { completeCB && completeCB(); completeCB = null; });
                Laya.Tween.to(target, { rotation: curAngle }, duration, ease, handler);
            }
        }
        static showViewByScale(target, completeCB, scaleValue = 1, scaleTime = 200) {
            this.toScale(target, 0, scaleValue, scaleTime, Laya.Ease.bounceOut, completeCB, true, false);
        }
        static clearTween(target) {
            Laya.Tween.clearAll(target);
        }
    }

    class getItemComp extends D2Comp {
        init() {
            getItemComp.instance = this;
            this.backBtn = this.self.getChildByName("backBtn");
            this.videoBtn = this.self.getChildByName("videoBtn");
            this.giveUpBtn = this.self.getChildByName("giveUpBtn");
            this.showImage = this.self.getChildByName("showImage");
            Tool.d2_AddClickEvent(this.backBtn, this, this.backBtnClick);
            Tool.d2_AddClickEvent(this.videoBtn, this, this.videoBtnClick);
            Tool.d2_AddClickEvent(this.giveUpBtn, this, this.giveUpBtnClick);
        }
        open(type, id) {
            this.type = type;
            this.targetId = id;
            this.giveUpBtn.alpha = 0;
            this.backBtn.set_visible(false);
            Laya.timer.once(2000, this, () => {
                D2Tween.toAlpha(this.giveUpBtn, 0, 1, 1000);
            });
            EventMgr.event(EventType.Over_OpenEndItem_Event, { type: type, id: id });
        }
        giveUpBtnClick() {
            this.closePanel();
        }
        videoBtnClick() {
            Platform.instance.showVideo(() => {
                this.backBtn.set_visible(true);
                this.videoBtn.set_visible(false);
                this.giveUpBtn.set_visible(false);
                switch (this.type) {
                    case "cloth":
                        SaveData.UnlockCloth(this.targetId);
                        SaveData.SetNowCloth(this.targetId);
                        break;
                    case "weapon":
                        SaveData.UnlockWeapon(this.targetId);
                        SaveData.SetNowWeapon(this.targetId);
                        break;
                    default:
                        console.log("getItemComp type error");
                        break;
                }
            }, () => { });
        }
        backBtnClick() {
            this.closePanel();
        }
        closePanel() {
            EventMgr.event(EventType.Over_CloseEndItem_Event);
            this.self.set_visible(false);
            this.closeCB && this.closeCB();
        }
    }

    class Over extends MainScene {
        constructor() {
            super(...arguments);
            this.coinUrl = GlData.coinUrl;
            this.endCB = (cb) => { cb && cb(); };
        }
        init() {
            Over.instance = this;
            this.icon.skin = GameMgr.instance.isWin ? "ui/game/slbt.png" : "ui/game/dbbt.png";
            this.btnContinue.skin = GameMgr.instance.isWin ? "ui/game/sljm_gold_dk.png" : "ui/game/sljm_xcks_dk.png";
            this.videoCheckBox.selected = JJMgr.instance.dataConfig.front_tili_switch ? true : false;
            let clip = this.btnContinue.getChildByName("coinValue");
            clip.value = (this.videoCheckBox.selected ? GameMgr.instance.moneyCount * 5 : GameMgr.instance.moneyCount).toString();
            clip.set_visible(GameMgr.instance.isWin);
            this.videoCheckBox.set_visible(GameMgr.instance.isWin);
            D2Tween.toScale(this.icon, 0, 1, 500, Laya.Ease.elasticOut);
            this.endPanelDeal();
            if (GameMgr.instance.isWin) {
                SoundMgr.play(SoundType.Win, true);
            }
            else {
                SoundMgr.play(SoundType.Fail);
            }
            JJWxTrap.Instance.showFinishUI(this, this.btnDraw);
        }
        initEvent() {
            this.videoCheckBox.on("change", this, () => {
                let clip = this.btnContinue.getChildByName("coinValue");
                clip.value = (this.videoCheckBox.selected ? GameMgr.instance.moneyCount * 5 : GameMgr.instance.moneyCount).toString();
            });
            Tool.d2_AddClickEvent(this.btnContinue, this, this.onBtnContinueClick);
            Tool.d2_AddClickEvent(this.btnDraw, this, () => {
                JJWxTrap.Instance.clickFinishMoreGame();
            });
        }
        onBtnContinueClick() {
            let self = this;
            let endCB = (isVideo) => {
                this.btnContinue.offAllCaller(this);
                if (GameMgr.instance.isWin) {
                    if (isVideo)
                        SaveData.AddCoin(GameMgr.instance.moneyCount * 5);
                    else {
                        SaveData.AddCoin(GameMgr.instance.moneyCount);
                    }
                }
                if (GameMgr.instance.isWin) {
                    Tool.d2_coinCollectAnim(this.coinUrl, new Laya.Vector2(self.btnContinue.x, self.btnContinue.y), new Laya.Vector2(125, 125), self.scene, 10, 1, () => {
                        SaveData.AddGrade();
                        JJWxTrap.Instance.closeFinishUI(() => {
                            this.endCB(() => {
                                EventMgr.event(EventType.Scene_GoHome);
                            });
                        });
                    });
                }
                else {
                    JJWxTrap.Instance.closeFinishUI(() => {
                        this.endCB(() => {
                            EventMgr.event(EventType.Scene_GoHome);
                        });
                    });
                }
            };
            if (this.videoCheckBox.selected) {
                if (GameMgr.instance.isWin) {
                    Platform.instance.showVideo(() => {
                        endCB(true);
                    }, () => {
                        Platform.instance.showToast("未看完视频，没有奖励");
                    });
                }
                else {
                    endCB(false);
                }
            }
            else {
                endCB(false);
            }
        }
        statShowUpdate() {
            let valueCoin = this.statShow.getChildByName("value1");
            let valueNpc = this.statShow.getChildByName("value2");
            let valueEnemy = this.statShow.getChildByName("value3");
            valueCoin.value = GameMgr.instance.moneyCount.toString();
            valueNpc.value = GlData.saveNpc.toString();
            valueEnemy.value = GlData.killEnemy.toString();
        }
        endPanelDeal(cb) {
            if (GameMgr.instance.isWin) {
                let endInfo = SaveData.readEndInfo();
                let targetCloth = endInfo.targetCloth;
                let targetWeapon = endInfo.targetWeapon;
                let clothRange;
                let weaponRange;
                let hasCloth;
                let cb1 = () => {
                    hasCloth = SaveData.ReadClothUnlock(targetCloth);
                    if (hasCloth) {
                        SaveData.clearClothRange();
                        for (let i = 1; i < 9; i++) {
                            if (!SaveData.ReadClothUnlock(i)) {
                                SaveData.changeTargetCloth(i);
                                hasCloth = false;
                                break;
                            }
                        }
                    }
                };
                let hasWeapon;
                let cb2 = () => {
                    hasWeapon = SaveData.ReadWeaponUnlock(targetWeapon);
                    if (hasWeapon) {
                        SaveData.clearWeaponRange();
                        for (let i = 1; i < 9; i++) {
                            if (!SaveData.ReadWeaponUnlock(i)) {
                                SaveData.changeTargetWeapon(i);
                                hasWeapon = false;
                                break;
                            }
                        }
                    }
                };
                cb1();
                cb2();
                let clothUnlock = false;
                if (!hasCloth) {
                    SaveData.addClothRange();
                    endInfo = SaveData.readEndInfo();
                    targetCloth = endInfo.targetCloth;
                    clothRange = endInfo.clothRange;
                    if (clothRange >= GlData.clothUnlockCount[targetCloth]) {
                        clothUnlock = true;
                        SaveData.changeTargetCloth(targetCloth + 1);
                        SaveData.clearClothRange();
                        clothRange = GlData.clothUnlockCount[targetCloth];
                    }
                    this.clothShow.getChildByName("icon").skin = "ui/game/baby/baby0" + (targetCloth + 1).toString() + ".png";
                    let bar = this.clothShow.getChildByName("bar");
                    let value = bar.getChildByName("value");
                    bar.value = clothRange / GlData.clothUnlockCount[targetCloth];
                    value.value = clothRange.toString() + "/" + GlData.clothUnlockCount[targetCloth].toString();
                }
                if (!hasCloth) {
                    EventMgr.event(EventType.Over_ClothShow_Event, targetCloth);
                }
                this.clothShow.set_visible(!hasCloth);
                let weaponUnlock = false;
                if (!hasWeapon) {
                    SaveData.addWeaponRange();
                    endInfo = SaveData.readEndInfo();
                    targetWeapon = endInfo.targetWeapon;
                    weaponRange = endInfo.weaponRange;
                    if (weaponRange >= GlData.weaponUnlockCount[targetWeapon]) {
                        SaveData.changeTargetWeapon(targetWeapon + 1);
                        SaveData.clearWeaponRange();
                        weaponUnlock = true;
                        weaponRange = GlData.weaponUnlockCount[targetWeapon];
                    }
                    this.weaponShow.getChildByName("icon").skin = "ui/game/weapon/weapon0" + (targetWeapon + 1).toString() + ".png";
                    let bar = this.weaponShow.getChildByName("bar");
                    let value = bar.getChildByName("value");
                    bar.value = weaponRange / GlData.weaponUnlockCount[targetWeapon];
                    value.value = weaponRange.toString() + "/" + GlData.weaponUnlockCount[targetWeapon].toString();
                }
                this.weaponShow.set_visible(!hasWeapon);
                if (!hasWeapon) {
                    EventMgr.event(EventType.Over_WeaponShow_Event, targetWeapon);
                }
                let endCB = (cb) => {
                    if (clothUnlock) {
                        let self = this;
                        this.showNewItem("cloth", targetCloth, () => {
                            if (weaponUnlock) {
                                self.showNewItem("weapon", targetWeapon, () => { cb && cb(); });
                            }
                            else {
                                cb && cb();
                            }
                        });
                    }
                    else {
                        if (weaponUnlock) {
                            this.showNewItem("weapon", targetWeapon, () => { cb && cb(); });
                        }
                        else {
                            cb && cb();
                        }
                    }
                };
                this.endCB = endCB;
                this.statShowUpdate();
            }
            else {
                this.statShow.set_visible(false);
                this.clothShow.set_visible(false);
                this.weaponShow.set_visible(false);
            }
        }
        showNewItem(type, id, cb) {
            Laya.timer.once(1000, this, () => {
                this.mainPanel.set_visible(false);
                this.getItemPanel.set_visible(true);
                let comp = this.getItemPanel.getComponent(getItemComp);
                comp.open(type, id);
                comp.closeCB = () => {
                    cb && cb();
                };
            });
        }
    }

    class GameMgr {
        constructor() {
            this.stageJson = [];
            this.dropObjs = [];
            this.moneyCount = 0;
            this.nowRound = 0;
            this.playCount = 0;
            this.isWin = false;
            this.isReadJsonOrScene = true;
            this.isBornStage = true;
            this.isStart = false;
            this.lastValue = 0;
            this.isPressed = false;
            this.orignal = 0;
            GameMgr.instance = this;
            this.init();
        }
        init() {
            this.initEvent();
            this.readJson();
        }
        createShadow(light) {
            light.shadowMode = Laya.ShadowMode.SoftLow;
            light.shadowDistance = 25;
            light.shadowResolution = 1024;
            light.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;
            light.shadowNormalBias = 0.6;
            light.shadowStrength = 0.4;
        }
        createSightLight(light) {
            light.shadowMode = Laya.ShadowMode.Hard;
            light.shadowDistance = 10;
            light.shadowResolution = 256;
            light.shadowStrength = 1;
            light.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;
        }
        hideShadow(light) {
            light.shadowMode = Laya.ShadowMode.None;
        }
        useRetinalCanvas() {
            Laya.stage.useRetinalCanvas = true;
        }
        disabelRetinalCanvas() {
            Laya.stage.useRetinalCanvas = false;
        }
        setFog(isOpen, scene, color) {
            scene.enableFog = isOpen;
            if (isOpen) {
                scene.fogColor = color;
                scene.fogStart = 10;
                scene.fogRange = 30;
            }
        }
        readJson() {
            LoadResMgr.addLoadRes("json");
            let path = [];
            for (let i = 1; i <= 10; i++) {
                let folderUrl = "res/json/Stage/" + i.toString() + "/";
                let navUrl = folderUrl + "NavMesh.json";
                let stageUrl = folderUrl + "Stage.json";
                path.push(navUrl);
                path.push(stageUrl);
            }
            let cb = () => {
                Laya.loader.load(path, Laya.Handler.create(this, (isSuccess) => {
                    if (isSuccess) {
                        for (let i = 0; i < path.length; i++) {
                            let data = Laya.loader.getRes(path[i]);
                            if (i % 2 == 0) {
                                GlData.navJson.push(data);
                            }
                            else {
                                this.stageJson.push(data);
                            }
                        }
                        LoadResMgr.removeLoadRes("json");
                    }
                    else {
                        console.log("load json fail,reload after 1s");
                        Laya.timer.once(1000, this, cb);
                    }
                }), null, Laya.Loader.JSON);
            };
            if (path.length > 0) {
                cb();
            }
        }
        JsonV3(V3, fix) {
            if (!fix) {
                return new Laya.Vector3(parseFloat(V3.x), parseFloat(V3.y), parseFloat(V3.z));
            }
            else {
                let x = Math.round(parseFloat(V3.x) * Math.pow(10, fix)) / Math.pow(10, fix);
                let y = Math.round(parseFloat(V3.y) * Math.pow(10, fix)) / Math.pow(10, fix);
                let z = Math.round(parseFloat(V3.z) * Math.pow(10, fix)) / Math.pow(10, fix);
                return new Laya.Vector3(x, y, z);
            }
        }
        V3ToJson(v3) {
            return {
                x: v3.x.toString(),
                y: v3.y.toString(),
                z: v3.z.toString()
            };
        }
        JsonV4(V4, fix) {
            if (!fix) {
                return new Laya.Vector4(parseFloat(V4.x), parseFloat(V4.y), parseFloat(V4.z), parseFloat(V4.w));
            }
            else {
                let x = Math.round(parseFloat(V4.x) * Math.pow(10, fix)) / Math.pow(10, fix);
                let y = Math.round(parseFloat(V4.y) * Math.pow(10, fix)) / Math.pow(10, fix);
                let z = Math.round(parseFloat(V4.z) * Math.pow(10, fix)) / Math.pow(10, fix);
                let w = Math.round(parseFloat(V4.w) * Math.pow(10, fix)) / Math.pow(10, fix);
                return new Laya.Vector4(x, y, z, w);
            }
        }
        JsonQuater(V4) {
            return new Laya.Quaternion(parseFloat(V4.x), parseFloat(V4.y), parseFloat(V4.z), parseFloat(V4.w));
        }
        V4ToJson(v4) {
            return {
                x: v4.x.toString(),
                y: v4.y.toString(),
                z: v4.z.toString(),
                w: v4.w.toString()
            };
        }
        firstIn() {
            console.log("首次进入处理");
            BornController.mainScene = this.mainScene;
            for (let i = 0; i < this.mainScene.numChildren; i++) {
                let child = this.mainScene.getChildAt(i);
                switch (child.name) {
                    case "Prefabs":
                        BornController.prefabs = child;
                        BornController.prefabs.active = false;
                        break;
                    case "Light":
                        this.light = child;
                        break;
                    case "Fxs":
                        BornController.fxs = child;
                        Laya.timer.once(1000, this, () => {
                            BornController.fxs.active = false;
                        });
                        break;
                    case "Stage":
                        this.stage = child;
                        this.player = this.stage.getChildByName("Player");
                        this.playerComp = this.player.addComponent(Character_Player);
                        this.camPoint = this.stage.getChildByName("CamPoint");
                        let comp = this.camPoint.addComponent(CamFollow);
                        var offset = Vector3.subtract(this.camPoint.transform.position.clone(), this.player.transform.position.clone());
                        comp.setTarget(this.player, offset);
                        this.mainCam = this.camPoint.getChildByName("MainCam");
                        this.mainCamera = this.mainCam.getChildByName("Main Camera");
                        this.shop = this.stage.getChildByName("Shop");
                        let shopCharter = this.shop.getChildByName("Charter");
                        let shopWeapon = this.shop.getChildByName("WeaponEnd");
                        let shopCharterComp = shopCharter.addComponent(Character_Third);
                        let shopWeaponComp = shopWeapon.addComponent(D3Comp);
                        shopCharterComp.keepRotate();
                        shopWeaponComp.keepRotate();
                        this.renderInit();
                        break;
                    default:
                        break;
                }
            }
            this.createShadow(this.light);
            MainMgr.checkPerformance(() => {
            }, () => {
            }, () => {
                this.hideShadow(this.light);
                GlData.isShadowOn = false;
                GlData.isDropObj = false;
            });
        }
        initEvent() {
            EventMgr.on(EventType.Game_SkinChange_Event, this, this.changeSkin);
            EventMgr.on(EventType.Home_OpenShop_Event, this, this.shopShow);
            EventMgr.on(EventType.Home_CloseShop_Event, this, this.shopClose);
            EventMgr.on(EventType.Over_OpenEndItem_Event, this, this.itemOpen);
            EventMgr.on(EventType.Over_CloseEndItem_Event, this, this.itemClose);
            EventMgr.on(EventType.Over_ClothShow_Event, this, this.endClothShow);
            EventMgr.on(EventType.Over_WeaponShow_Event, this, this.endWeaponShow);
            EventMgr.on(EventType.Game_MoneyCount_Add, this, this.addMoenyCount);
        }
        levelInit() {
            this.shop.active = false;
            this.isStart = false;
            Laya.timer.clear(this, this.gameUpdate);
            BornController.stageObjClear();
            CollderController.Clear();
            this.dropObjs.length = 0;
            Obj.vents.length = 0;
            this.nowRound = 0;
            this.moneyCount = 0;
            GlData.groundMinX = 0;
            GlData.groundMaxX = 0;
            GlData.groundMinZ = 0;
            GlData.groundMaxZ = 0;
            GlData.nowNpcCount = 0;
            GlData.maxNpcCount = 0;
            if (SaveData.ReadGrade() <= 10) {
                GlData.nowLevelIndex = (SaveData.ReadGrade() - 1) % 10;
            }
            else {
                if ((SaveData.ReadGrade()) % 5 == 0) {
                    GlData.nowLevelIndex = Tool.halfPercent() ? 4 : 9;
                }
                else {
                    GlData.nowLevelIndex = Tool.percent(3 / 7) ? Tool.randomInt(1, 3) : Tool.randomInt(5, 8);
                }
            }
            GlData.nowShipIndex = (SaveData.ReadGrade() - 1) % 3;
            GlData.nowMapIndex = GlData.nowLevelIndex >= 5 ? 1 : 0;
            var isBornStage = this.isBornStage;
            if (isBornStage) {
                let level = this.stage.getChildByName("Level");
                if (this.isReadJsonOrScene) {
                    if (level) {
                        level.active = false;
                    }
                    level = this.stageJson[GlData.nowLevelIndex];
                }
                else {
                    level.active = false;
                    var infoLevel = [];
                    for (let i = 0; i < level.numChildren; i++) {
                        var stage = level.getChildAt(i);
                        var infoStage = { map: [], objs: [], enemys: [], points: [] };
                        var map = stage.getChildByName("Map");
                        var objs = stage.getChildByName("Objs");
                        var enemys = stage.getChildByName("Enemys");
                        var points = stage.getChildByName("Points");
                        for (let j = 0; j < map.numChildren; j++) {
                            var obj = map.getChildAt(j);
                            var v4 = new Laya.Vector4(obj.transform.localRotation.x, obj.transform.localRotation.y, obj.transform.localRotation.z, obj.transform.localRotation.w);
                            var objData = {
                                name: obj.name.split(' ')[0],
                                pos: this.V3ToJson(obj.transform.localPosition.clone()),
                                rot: this.V4ToJson(v4),
                                sca: this.V3ToJson(obj.transform.localScale.clone()),
                            };
                            infoStage.map.push(objData);
                        }
                        for (let j = 0; j < objs.numChildren; j++) {
                            var obj = objs.getChildAt(j);
                            var v4 = new Laya.Vector4(obj.transform.localRotation.x, obj.transform.localRotation.y, obj.transform.localRotation.z, obj.transform.localRotation.w);
                            let info = null;
                            let name = obj.name.split(' ')[0];
                            if (name == ObjType.Vent_1) {
                                let groupInfo = Tool.d3_FindNodeHasName(obj, "VentGroup");
                                info = groupInfo.name.split("_")[1];
                            }
                            let objData = {
                                name: name,
                                pos: this.V3ToJson(obj.transform.localPosition.clone()),
                                rot: this.V4ToJson(v4),
                                sca: this.V3ToJson(obj.transform.localScale.clone()),
                                info: info
                            };
                            infoStage.objs.push(objData);
                        }
                        for (let j = 0; j < enemys.numChildren; j++) {
                            var obj = enemys.getChildAt(j);
                            var v4 = new Laya.Vector4(obj.transform.localRotation.x, obj.transform.localRotation.y, obj.transform.localRotation.z, obj.transform.localRotation.w);
                            let name = obj.name.split(' ')[0];
                            var path = obj.getChildByName("Path");
                            var pathData = [];
                            if (name == "Boss") {
                                for (let k = 0; k < path.numChildren; k++) {
                                    let smallPath = path.getChildAt(k);
                                    let smallPathData = [];
                                    for (let l = 0; l < smallPath.numChildren; l++) {
                                        let pos = path.getChildAt(k).getChildAt(l).transform.position.clone();
                                        pos.y = 0;
                                        let rot = path.getChildAt(k).getChildAt(l).transform.rotationEuler.clone();
                                        smallPathData.push({
                                            pos: this.V3ToJson(pos),
                                            rotY: rot.y
                                        });
                                    }
                                    pathData.push(smallPathData);
                                }
                            }
                            else {
                                for (let k = 0; k < path.numChildren; k++) {
                                    let pos = path.getChildAt(k).transform.position.clone();
                                    pos.y = 0;
                                    let rot = path.getChildAt(k).transform.rotationEuler.clone();
                                    pathData.push({
                                        pos: this.V3ToJson(pos),
                                        rotY: rot.y,
                                    });
                                }
                            }
                            var objDataEnemy = {
                                name: name,
                                pos: this.V3ToJson(obj.transform.localPosition.clone()),
                                rot: this.V4ToJson(v4),
                                sca: this.V3ToJson(obj.transform.localScale.clone()),
                                path: pathData,
                            };
                            infoStage.enemys.push(objDataEnemy);
                        }
                        for (let j = 0; j < points.numChildren; j++) {
                            var obj = points.getChildAt(j);
                            var v4 = new Laya.Vector4(obj.transform.localRotation.x, obj.transform.localRotation.y, obj.transform.localRotation.z, obj.transform.localRotation.w);
                            var objData = {
                                name: obj.name.split(' ')[0],
                                pos: this.V3ToJson(obj.transform.localPosition.clone()),
                                rot: this.V4ToJson(v4),
                                sca: this.V3ToJson(obj.transform.localScale.clone()),
                            };
                            infoStage.points.push(objData);
                        }
                        infoLevel.push(infoStage);
                    }
                    console.log(JSON.stringify(infoLevel));
                    level = infoLevel;
                }
                var levelIndex = 0;
                var stage = level[levelIndex];
                var map = stage.map;
                var objs = stage.objs;
                var enemys = stage.enemys;
                var points = stage.points;
                var stageSprite = new Laya.Sprite3D("Stage" + levelIndex.toString());
                this.stage.addChild(stageSprite);
                stageSprite.transform.localPosition = new Laya.Vector3();
                stageSprite.transform.localRotation = new Laya.Quaternion();
                stageSprite.transform.localScale = new Laya.Vector3(1, 1, 1);
                BornController.stageObj.push(stageSprite);
                for (let i = 0; i < map.length; i++) {
                    var url = map[i].name;
                    var obj = BornController.bornStageObj(url, stageSprite);
                    var pos = this.JsonV3(map[i].pos);
                    var v4 = this.JsonV4(map[i].rot);
                    var rot = new Laya.Quaternion(v4.x, v4.y, v4.z, v4.w);
                    var sca = this.JsonV3(map[i].sca);
                    obj.transform.localPosition = pos;
                    obj.transform.localRotation = rot;
                    obj.transform.localScale = sca;
                    let sightColliders = Tool.d3_FindAllNodeHasName(obj, "collider_circle");
                    if (sightColliders.length > 0) {
                        CollderController.lightCollider = CollderController.lightCollider.concat(sightColliders);
                    }
                    if (map[i].name == "Ground") {
                        if (pos.x - 5 < GlData.groundMinX) {
                            GlData.groundMinX = pos.x - 5;
                        }
                        if (pos.x + 5 > GlData.groundMaxX) {
                            GlData.groundMaxX = pos.x + 5;
                        }
                        if (pos.z < GlData.groundMinZ) {
                            GlData.groundMinZ = pos.z;
                        }
                        if (pos.z + 20 > GlData.groundMaxZ) {
                            GlData.groundMaxZ = pos.z + 20 * sca.z;
                        }
                    }
                    var model = obj.getChildByName("Model");
                    for (let j = 0; j < model.numChildren; j++) {
                        model.getChildAt(j).active = j == GlData.nowMapIndex;
                    }
                }
                for (let i = 0; i < objs.length; i++) {
                    var url = objs[i].name;
                    var obj = BornController.bornStageObj(url, stageSprite);
                    var pos = this.JsonV3(objs[i].pos);
                    var v4 = this.JsonV4(objs[i].rot);
                    var rot = new Laya.Quaternion(v4.x, v4.y, v4.z, v4.w);
                    var sca = this.JsonV3(objs[i].sca);
                    obj.transform.localPosition = pos;
                    obj.transform.localRotation = rot;
                    obj.transform.localScale = sca;
                    let comp = obj.addComponent(Obj);
                    if (objs[i].name == ObjType.Vent_1) {
                        comp.ventGroup = parseInt(objs[i].info);
                    }
                    if (objs[i].name == ObjType.Grass_1 || objs[i].name == ObjType.Box_1) {
                        var model = obj.getChildByName("Model");
                        for (let j = 0; j < model.numChildren; j++) {
                            model.getChildAt(j).active = j == GlData.nowMapIndex;
                        }
                    }
                    if (objs[i].name == ObjType.Ship1_1) {
                        this.firstShip = obj;
                    }
                    if (objs[i].name == ObjType.Prison) {
                        this.firstNpc = obj;
                    }
                    let sightColliders = Tool.d3_FindAllNodeHasName(obj, "collider_circle");
                    if (sightColliders.length > 0) {
                        CollderController.lightCollider = CollderController.lightCollider.concat(sightColliders);
                    }
                }
                for (let i = 0; i < enemys.length; i++) {
                    var url = "Charter";
                    var obj = BornController.bornStageObj(url, stageSprite);
                    var pos = this.JsonV3(enemys[i].pos);
                    var v4 = this.JsonV4(enemys[i].rot);
                    var rot = new Laya.Quaternion(v4.x, v4.y, v4.z, v4.w);
                    var sca = this.JsonV3(enemys[i].sca);
                    obj.transform.localPosition = pos;
                    obj.transform.localRotation = rot;
                    obj.transform.localScale = sca;
                    if (enemys[i].name == "Enemy") {
                        var comp = obj.addComponent(Character_Enemy);
                        obj.name = enemys[i].name;
                        for (let j = 0; j < enemys[i].path.length; j++) {
                            comp.path.push({
                                pos: this.JsonV3(enemys[i].path[j].pos),
                                rotY: parseFloat(enemys[i].path[j].rotY),
                            });
                        }
                        this.firstEnemy = obj;
                    }
                    else if (enemys[i].name == "Boss") {
                        var comp = obj.addComponent(Character_Boss);
                        obj.name = enemys[i].name;
                        for (let j = 0; j < enemys[i].path.length; j++) {
                            let smallPath = [];
                            for (let k = 0; k < enemys[i].path[j].length; k++) {
                                smallPath.push({
                                    pos: this.JsonV3(enemys[i].path[j][k].pos),
                                    rotY: parseFloat(enemys[i].path[j][k].rotY),
                                });
                            }
                            comp.path.push(smallPath);
                        }
                    }
                }
                for (let i = 0; i < points.length; i++) {
                    switch (points[i].name) {
                        case "StartPoint":
                            var pos = this.JsonV3(points[i].pos);
                            var v4 = this.JsonV4(points[i].rot);
                            var rot = new Laya.Quaternion(v4.x, v4.y, v4.z, v4.w);
                            this.player.transform.localPosition = pos;
                            this.player.transform.localRotation = rot;
                            break;
                    }
                }
            }
            for (let j = 0; j < CollderController.lightCollider.length; j++) {
                let colliderRaidus = parseFloat(CollderController.lightCollider[j].name.split("_")[2]);
                CollderController.lightColliderIndex.push(CollderController.getStaticIndex(CollderController.lightCollider[j], colliderRaidus, colliderRaidus));
            }
            this.playerComp.self.active = true;
            this.playerComp.init();
            this.changeSkin();
            Laya.timer.frameLoop(1, this, this.gameUpdate);
        }
        renderInit() {
            let shopCam = this.shop.getChildByName("Camera");
            let shopCamEnd = this.shop.getChildByName("CameraEnd");
            shopCam.active = false;
            shopCamEnd.active = false;
            shopCam.renderingOrder = -1;
            if (!this.shopRenderTexture) {
                this.shopRenderTexture = new Laya.RenderTexture(Laya.stage.width, Laya.stage.height, Laya.RenderTextureFormat.R8G8B8A8, Laya.RenderTextureDepthFormat.DEPTHSTENCIL_24_8);
            }
            shopCam.renderTarget = this.shopRenderTexture;
            shopCamEnd.renderingOrder = -1;
            if (!this.shopEndRenderTexture) {
                this.shopEndRenderTexture = new Laya.RenderTexture(Laya.stage.width, Laya.stage.height, Laya.RenderTextureFormat.R8G8B8A8, Laya.RenderTextureDepthFormat.DEPTHSTENCIL_24_8);
            }
            shopCamEnd.renderTarget = this.shopEndRenderTexture;
            this.shopRenderTexture.lock = false;
            this.shopEndRenderTexture.lock = false;
            this.shopTexture = new Laya.Texture(this.shopRenderTexture);
            this.shopEndTexture = new Laya.Texture(this.shopEndRenderTexture);
        }
        itemClose() {
            this.shop.active = false;
        }
        itemOpen(e) {
            let type = e.type;
            let id = e.id;
            this.shop.active = true;
            CamFollow.instance.camera.active = false;
            CamFollow.instance.camera.active = true;
            let shopCam = this.shop.getChildByName("Camera");
            let shopCamEnd = this.shop.getChildByName("CameraEnd");
            let shopCharter = this.shop.getChildByName("Charter");
            let shopWeapon = this.shop.getChildByName("WeaponEnd");
            if (type == "cloth") {
                let comp = shopCharter.getComponent(Character_Third);
                comp.skinChange(id + 1, 1, false, false, false, false);
                shopCharter.transform.localRotation = new Laya.Quaternion();
                shopCam.active = true;
                shopCam.renderTarget = this.shopRenderTexture;
                let scene3DImage = getItemComp.instance.showImage;
                scene3DImage.source = this.shopTexture;
                scene3DImage.width = Laya.stage.width / 1.5;
                scene3DImage.height = Laya.stage.height / 1.5;
            }
            else if (type == "weapon") {
                for (let i = 0; i < shopWeapon.numChildren; i++) {
                    shopWeapon.getChildAt(i).active = i == id;
                }
                shopWeapon.transform.localRotation = new Laya.Quaternion();
                shopCamEnd.active = true;
                let scene3DImage = getItemComp.instance.showImage;
                scene3DImage.source = this.shopEndTexture;
                scene3DImage.width = Laya.stage.width / 1.25;
                scene3DImage.height = Laya.stage.height / 1.25;
            }
        }
        endClothShow(id) {
            this.shop.active = true;
            CamFollow.instance.camera.active = false;
            CamFollow.instance.camera.active = true;
            let shopCam = this.shop.getChildByName("Camera");
            let shopCharter = this.shop.getChildByName("Charter");
            let comp = shopCharter.getComponent(Character_Third);
            comp.skinChange(id + 1, 1, false, false, false, false);
            shopCharter.transform.localRotation = new Laya.Quaternion();
            shopCam.active = true;
            shopCam.renderTarget = this.shopRenderTexture;
            let scene3DImage = Over.instance.clothShow.getChildByName("icon");
            let axis = Laya.stage.height / Laya.stage.width;
            scene3DImage.width = 200;
            scene3DImage.height = 200 * axis;
            scene3DImage.source = this.shopTexture;
        }
        endWeaponShow(id) {
            this.shop.active = true;
            CamFollow.instance.camera.active = false;
            CamFollow.instance.camera.active = true;
            let shopCamEnd = this.shop.getChildByName("CameraEnd");
            let shopWeapon = this.shop.getChildByName("WeaponEnd");
            for (let i = 0; i < shopWeapon.numChildren; i++) {
                shopWeapon.getChildAt(i).active = i == id;
            }
            shopWeapon.transform.localRotation = new Laya.Quaternion();
            shopCamEnd.active = true;
            let scene3DImage = Over.instance.weaponShow.getChildByName("icon");
            let axis = Laya.stage.height / Laya.stage.width;
            scene3DImage.width = 200;
            scene3DImage.height = 200 * axis;
            scene3DImage.source = this.shopEndTexture;
        }
        shopClose() {
            this.shop.active = false;
        }
        shopShow() {
            this.shop.active = true;
            let shopCharter = this.shop.getChildByName("Charter");
            let comp = shopCharter.getComponent(Character_Third);
            shopCharter.transform.localRotation = new Laya.Quaternion();
            let nowSkin = SaveData.ReadNowCloth() + 1;
            let nowWeapon = SaveData.ReadNowWeapon() + 1;
            comp.skinChange(nowSkin, nowWeapon, false, false, false);
            let scene3DImage = Shop.instance.showImage;
            let shopCam = this.shop.getChildByName("Camera");
            shopCam.active = true;
            scene3DImage.source = this.shopTexture;
            scene3DImage.width = Laya.stage.width / 3;
            scene3DImage.height = Laya.stage.height / 3;
            scene3DImage.x = Laya.stage.width / 2;
            scene3DImage.y = Laya.stage.height / 4.5;
        }
        changeSkin() {
            let nowSkin = SaveData.ReadNowCloth() + 1;
            let nowWeapon = SaveData.ReadNowWeapon() + 1;
            this.playerComp.skinChange(nowSkin, nowWeapon, false, false, false);
            for (let i = 0; i < Character_Npc.npc.length; i++) {
                Character_Npc.npc[i].skinChange(nowSkin, nowWeapon, false, false, false);
            }
            let shopCharter = this.shop.getChildByName("Charter");
            let comp = shopCharter.getComponent(Character_Third);
            comp.skinChange(nowSkin, nowWeapon, false, false, false);
        }
        gameStart() {
            this.isStart = true;
            this.controlOn();
            this.roundInit();
            this.playCount++;
            CollderController.On();
        }
        levelEnd(isWin) {
            this.isStart = false;
            this.isWin = isWin;
            EventMgr.off(EventType.Game_Over_Event, this, this.Lose);
            EventMgr.off(EventType.Game_ShipOn_Event, this, this.roundEnd);
            this.controlOff();
            this.onMouseUp();
            CollderController.Off();
            this.moneyCount += GlData.saveNpc * GlData.npcSaveDiamondAdd;
            let time = this.isWin ? 4000 : 1000;
            Laya.timer.once(time, this, () => {
                EventMgr.event(EventType.Scene_GoOver);
            });
        }
        roundInit() {
            if (!this.isStart)
                return;
            let camTween;
            switch (this.nowRound) {
                case 0:
                    this.playerComp.controlOn();
                    EventMgr.on(EventType.Game_Over_Event, this, this.Lose);
                    EventMgr.on(EventType.Game_ShipOn_Event, this, this.roundEnd);
                    break;
                case 1:
                    this.playerComp.controlOff();
                    this.levelEnd(true);
                    break;
                default:
                    console.log("多次触发跳关了");
                    break;
            }
        }
        roundEnd() {
            this.nowRound++;
            this.roundInit();
        }
        Lose() {
            this.levelEnd(false);
        }
        gameUpdate() {
            let dt = Laya.timer.delta / 1000;
            switch (this.nowRound) {
                case 0:
                    if (Game.instance) {
                        if (SaveData.ReadGrade() == 1 && this.isStart) {
                            let shipPoint = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.firstShip, new Laya.Vector3(0, -0.5, 0));
                            let npcPoint = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.firstNpc, new Laya.Vector3(0, -1.5, 0));
                            let enemyPoint = Tool.d3_getSpritePosBySprite3DPoint(CamFollow.instance.camera, this.firstEnemy, new Laya.Vector3(0, -1, 0));
                            let shipImage = Game.instance.stage1Tips.getChildByName("ship");
                            let npcImage = Game.instance.stage1Tips.getChildByName("npc");
                            let enemyImage = Game.instance.stage1Tips.getChildByName("enemy");
                            shipImage.set_visible(this.firstShip.active);
                            npcImage.set_visible(this.firstNpc.active);
                            let enemyComp = this.firstEnemy.getComponent(Character_Enemy);
                            enemyImage.set_visible(!enemyComp.isDead);
                            shipImage.x = shipPoint.x;
                            shipImage.y = shipPoint.y;
                            npcImage.x = npcPoint.x;
                            npcImage.y = npcPoint.y;
                            enemyImage.x = enemyPoint.x;
                            enemyImage.y = enemyPoint.y;
                        }
                        else {
                            Game.instance.stage1Tips.visible = false;
                        }
                        GlData.killEnemy = Character_Enemy.enemys.length - Character_Enemy.checkAliveEnemy();
                        GlData.saveNpc = GlData.nowNpcCount;
                        EventMgr.event(EventType.Game_EnemyAlive_Event, {
                            now: Character_Enemy.enemys.length - Character_Enemy.checkAliveEnemy(),
                            max: Character_Enemy.enemys.length
                        });
                        EventMgr.event(EventType.Game_NpcCount_Event, {
                            now: GlData.nowNpcCount,
                            max: GlData.maxNpcCount
                        });
                    }
                    break;
                case 1:
                    if (Game.instance) {
                        Game.instance.stage1Tips.visible = false;
                    }
                    break;
                default:
                    break;
            }
        }
        addMoenyCount(value) {
            this.moneyCount += value;
            SoundMgr.play(SoundType.GetDiamonds);
        }
        controlOn() {
            EventMgr.on(TouchEventType.singleTouchStart, this, this.onMouseDown);
            EventMgr.on(TouchEventType.singleTouchMove, this, this.onMouseMove);
            EventMgr.on(TouchEventType.singleTouchEnd, this, this.onMouseUp);
        }
        controlOff() {
            EventMgr.off(TouchEventType.singleTouchStart, this, this.onMouseDown);
            EventMgr.off(TouchEventType.singleTouchMove, this, this.onMouseMove);
            EventMgr.off(TouchEventType.singleTouchEnd, this, this.onMouseUp);
        }
        onMouseDown(e) {
            this.isPressed = true;
        }
        onMouseMove(e) {
            if (this.isPressed) {
            }
        }
        onMouseUp() {
            this.isPressed = false;
        }
    }

    class Home extends MainScene {
        init() {
            if (GameMgr.instance.playCount > 0) {
            }
            JJWxTrap.Instance.inHomePage(this.btnMore, this.btnDraw);
        }
        initEvent() {
            Tool.d2_AddClickEvent(this.btnStart, this, this.onBtnStartClick);
            Tool.d2_AddClickEvent(this.btnShop, this, this.onBtnShopClick);
            Tool.d2_AddClickEvent(this.btnMore, this, () => {
                JJWxTrap.Instance.clickHomeMoreGame();
            });
            Tool.d2_AddClickEvent(this.btnDraw, this, () => {
                JJWxTrap.Instance.clickHomeMoreGame();
            });
        }
        onBtnStartClick() {
            JJWxTrap.Instance.clickStartGame(() => {
                JJWxTrap.Instance.showGameBanner();
                EventMgr.event(EventType.Scene_GoGame);
            });
        }
        onBtnShopClick() {
            JJWxTrap.Instance.clickShop();
            this.shopPanel.set_visible(true);
            EventMgr.event(EventType.Home_OpenShop_Event);
        }
    }

    class StageComp extends D2Comp {
        init(...data) {
            this.value = this.self.getChildByName("value");
            this.value.value = SaveData.ReadGrade().toString();
        }
        changeBar(value) {
            this.bar.value = value;
        }
    }

    class Load extends MainScene {
        init() {
            Laya.timer.frameOnce(1, this, this.loadProgressUpdate);
        }
        initEvent() {
            EventMgr.on(EventType.Progress_Load_Update, this, this.loadProgressUpdate);
        }
        loadProgressUpdate() {
            let loadingList = LoadResMgr.loadingList;
            if (loadingList.length == 0) {
                console.log("加载完毕");
                EventMgr.event(EventType.Scene_GoHome);
            }
            else {
                console.log("正在加载", loadingList[0]);
            }
            this.loadBar.value = (LoadResMgr.loadingCount - loadingList.length) / LoadResMgr.loadingCount;
        }
    }

    class RotUITween extends Laya.Script {
        onEnable() {
            let target = this.owner;
            Laya.timer.loop(10, this, () => {
                target.rotation++;
            });
        }
        onDisable() {
            let target = this.owner;
            D2Tween.clearTween(target);
            Laya.timer.clearAll(this);
        }
    }

    class PosUITween extends Laya.Script {
        constructor() {
            super(...arguments);
            this.delayTime = 0;
        }
        onEnable() {
            let target = this.owner;
            let y = target.y;
            Laya.timer.once(this.delayTime, this, () => {
                D2Tween.toPosition(target, { y: y + 15 }, 1000, Laya.Ease.sineInOut, () => { }, true);
            });
        }
        onDisable() {
            let target = this.owner;
            D2Tween.clearTween(target);
            Laya.timer.clearAll(this);
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("JJExport/View/EndBoxUI.ts", EndBoxUI);
            reg("JJExport/Component/ScaleLoop.ts", ScaleLoop);
            reg("JJExport/Common/RotateLoop.ts", RotateLoop);
            reg("JJExport/View/FinishExportUI.ts", FinishExportUI);
            reg("JJExport/View/FinishScrollUI.ts", FinishScrollUI);
            reg("JJExport/View/GridUI.ts", GridUI);
            reg("JJExport/View/GridUI2.ts", GridUI2);
            reg("JJExport/View/GridUI3.ts", GridUI3);
            reg("JJExport/View/GridUI4.ts", GridUI4);
            reg("JJExport/View/RunUI.ts", RunUI);
            reg("JJExport/View/StartBoxUI.ts", StartBoxUI);
            reg("Scenes/Game.ts", Game);
            reg("Tools/ctrl/TouchCtrl.ts", TouchWayCheck);
            reg("Tools/ctrl/TouchScan.ts", TouchScan);
            reg("UIComps/JoystickComponent.ts", JoystickComponent);
            reg("UIComps/CoinComp.ts", CoinComp);
            reg("Scenes/Home.ts", Home);
            reg("UIComps/StageComp.ts", StageComp);
            reg("UIComps/ShopComp.ts", Shop);
            reg("Scenes/Load.ts", Load);
            reg("Scenes/Over.ts", Over);
            reg("Tools/uiTween/RotUITween.ts", RotUITween);
            reg("UIComps/getItemComp.ts", getItemComp);
            reg("Tools/uiTween/PosUITween.ts", PosUITween);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "JJExport/EndBoxUI.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            MainMgr.init();
        }
    }
    new Main();

}());
