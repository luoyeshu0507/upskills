/***
 * Created by yuexing on 2015/10/29.
 * @author yuexing
 * 整个插件的控制台，类似于后台的功能
 * **/
var loginAutoTotal = 5;
var backgroundAutoLogin = {
	loginInfo : {},//用于保存用户的登录信息
	loginUserName : "",//用于保存登录用户名，用于传输给自动邮费接口
	loginSucc : false,//用于保存是否是成功登录，默认是失败登录
	autoFlg   : false,//用于保存是否在自动登录，默认是不登录的
	autoTotal : loginAutoTotal,//自动登录次数，超过次数，不在自动登录
	autoDate  : 0,//用于保存是上一次登录的时间（因为大型网站都有登录check，它会识别是否是人工登录，所以需要尽量模拟成人的行为习惯）
	timeout   : 2,//用于保存下次登录的间隔的时间默认2秒
	init:function(){//启动方法
		this.chromeEvent();
		cookieUtils.onload();//开始记录cookie
		backgroundAutoLogin.loginInfo = {};
		backgroundAutoLogin.loginUserName = "";
		backgroundAutoLogin.loginSucc = false;
		backgroundAutoLogin.autoFlg   = false;
		backgroundAutoLogin.autoTotal = loginAutoTotal;
	},
	tab:{//浏览器选项卡操作
		getCurrentTab : function(callback) {
			chrome.tabs.getCurrent(callback);
		},
		openTab : function(url, callback) {
			chrome.tabs.create({url : url}, callback);
		},
		updateTab : function(id, obj, callback) {
			chrome.tabs.update(id, obj, callback);
		},
		closeTab : function(tabId, callback) {
			chrome.tabs.remove(tabId, callback);
		},
		getTab : function(id, callback) {
			chrome.tabs.get(id, callback);
		}
	},
	chromeEvent:function(){//加载chrome的一些监听事件
		chrome.browserAction.onClicked.addListener(function(){//插件图标点击事件
			//以下代码用于测试
			var domain = "taobao.com";
			//var callback = function(tab){
			//	console.log("buyertrade");
			//	backgroundAutoLogin.sendCookies(domain);
			//};
			//backgroundAutoLogin.tab.openTab("https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm",callback);
			//var callback2 = function(tab){
			//	console.log("cart");
			//	backgroundAutoLogin.sendCookies(domain);
			//};
			//backgroundAutoLogin.tab.openTab("https://cart.taobao.com/cart.htm",callback2);
			//cookieUtils.removeAllForFilter(domain);
			console.log("cookie length:" + cookieUtils.getAllForFilter(domain).length);
			var cookie = cookieUtils.getFilterCookies(domain,LoginObject[domain].errCookies);
			console.log("cookie:" + cookie);
		});
		chrome.cookies.onChanged.addListener(function(info) {
			//console.log("onChanged" + JSON.stringify(info));
		});
		chrome.runtime.onMessage.addListener(function(req,sender,callback){//消息监听器
			if(req&&req.topic&&req.tojs=='background'&&backgroundAutoLogin[req.topic]) backgroundAutoLogin[req.topic](req,callback);
		});
		chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {//页面被关闭时的事件监听
			
		});
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {//页面刷新事件监听
			backgroundAutoLogin.isAutoUrl(tab);
		});
		chrome.tabs.onCreated.addListener(function(tab) {//页面创建监听
			backgroundAutoLogin.isAutoUrl(tab);
		});
	},
	sendMessage :function(req,callback){//发送消息
		req.tojs=req.tojs || 'contentAutoLogin';
		chrome.runtime.sendMessage(req,callback);
	},
	/**
	 * 业务逻辑：
	 * 1.URL是插件重定向过来，清除原来的cookie，保存登录信息loginInfo
	 * 2.检测到是真正的登录URL了，开始到contents里面进入登录，自动登录计时开始
	 * 备注：淘宝有自动检测登录机制，所以在逻辑2里面，需要判断是否已经成功登录了(功能暂时删除)
	 * 3.检测到URL是成功登录的URL，则标记成成功登录
	 * **/
	isAutoUrl :function(tab){//用于判断是否是自动登录URL
		var callFun = function(tab) {
			var url = tab.url;
			var params = commonUtils.getParams(url);
			if(params["un"] && params["up"]){//如果是CRM登录过来的地址，就重置基本信息
				backgroundAutoLogin.loginInfo = {};
				backgroundAutoLogin.loginUserName = "";
				backgroundAutoLogin.loginSucc = false;
				backgroundAutoLogin.autoFlg   = false;
				backgroundAutoLogin.autoTotal = loginAutoTotal;
			}
			var domain = commonUtils.getDomain(url);
			var loginObj = LoginObject[domain];
			if(loginObj){
				var origin = url.match(/([a-zA-z]+:\/\/[^\s]*\?)/);
				if(url != loginObj.loginUrl){//如果URL不是直接的登录地址，说明不是插件重定向过来的
					if(origin && loginObj.loginUrl == origin[0].slice(0,-1) && params["un"] && params["up"]){
						//业务逻辑：1
						//清除原来的cookie
						cookieUtils.removeAllForFilter(domain);
						//如果是登录页面，保存登录信息
						backgroundAutoLogin.loginInfo.domain = domain;
						backgroundAutoLogin.loginInfo.userName = params["un"];
						backgroundAutoLogin.loginInfo.passWord = params["up"];
						backgroundAutoLogin.loginInfo.isLoginFlg = true;
						backgroundAutoLogin.loginSucc = false;
						backgroundAutoLogin.autoTotal = loginAutoTotal;//重置登录次数
					}
					else if(origin && loginObj.succUrl == origin[0].slice(0,-1) && backgroundAutoLogin.loginSucc == false){
						//业务逻辑：3
						//如果是成功登录页面
						backgroundAutoLogin.loginUserName = backgroundAutoLogin.loginInfo.userName;
						backgroundAutoLogin.loginInfo = {};//如果成功登录信息重新清除
						backgroundAutoLogin.loginSucc = true;
						backgroundAutoLogin.autoTotal = loginAutoTotal;//重置登录次数
						backgroundAutoLogin.sendCookies(domain);
					}else{
						//处理暂无
					}
				}else{
					//业务逻辑：2
					if(backgroundAutoLogin.loginInfo.userName){//如果有登录信息，才会进入登录
						console.log("total:" + backgroundAutoLogin.autoTotal);
						if(backgroundAutoLogin.autoTotal <= 0){//如果还在登录次数内，正常登录如果登录次数超过登录了，那么只输入密码，不在点击登录按钮
							backgroundAutoLogin.loginInfo.isLoginFlg = false;
						}
						backgroundAutoLogin.autoTotal --;
						chrome.tabs.sendMessage(tab.id,{
							topic:'login',
							loginInfo:backgroundAutoLogin.loginInfo
						});
					}
				}
			}
		};
		backgroundAutoLogin.tab.getTab(tab.id, callFun);
	},
	/**
	 * 通过域名获取指定的cookies，发送给CRM自动获取邮费系统
	 * @param {string} domain
	 */
	sendCookies:function(domain){
		var callback = function(ckStr) {
			console.log("url" + PostObject.sendPostage.url);
			var sendData =JSON.stringify({
				cookieStatus: "1",
				cookieText: ckStr,
				name:backgroundAutoLogin.loginUserName
			});
			console.log (" sendData: " + sendData );
			var succCallback = function (result) {
				console.log (result);
			};
			var errorCallback = function (err) {
				console.log (err);
			};
			cmnAjax.ajaxPost(PostObject.sendPostage.url, sendData, succCallback, errorCallback);
		}
		cookieUtils.getAllCookies(domain,LoginObject[domain].errCookies,callback);
	}
};
backgroundAutoLogin.init();