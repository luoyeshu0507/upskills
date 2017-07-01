/***
 * Created by yuexing on 2015/10/29.
 * @author yuexing
 * 用于各种自动登录页面
 * contents对象
 * **/
var contentAutoLogin = (function(){//
	var protype = {};
	protype.sendMessage = function(req,callback){//负责和background通信
		req.tojs=req.tojs || 'background';
		chrome.runtime.sendMessage(req,callback);
	};

	/**
	 * 业务逻辑：
	 * 1.判断是否自动登录的URL
	 * 2.如果URL检测到是crm传过来的值,按照匹配规则，进行重定向，进入到相应的真正的登录URL
	 * **/
	protype.init = function(){
		var url = window.location.href;
		var domain = commonUtils.getDomain(url);
		var loginObj = LoginObject[domain];
		var origin =  url.match(/([a-zA-z]+:\/\/[^\s]*\?)/);
		if(loginObj && origin){//如果是自动登录的页面
			var un = commonUtils.getParam(url,"un");
			var up = commonUtils.getParam(url,"up");
			if(un && up) {//如果URL检测到是crm传过来的值,则进入重定向，真正登录的页面
				location.assign(loginObj.loginUrl);
			}
		}
	};
	protype.login = function(data){//自动登录
		var loginInfo = data.loginInfo;
		if(loginInfo){
			autoLogin.login(loginInfo);
		}
		//contents.sendMessage({topic : "isAutoUrl"},null);
	};
	chrome.runtime.onMessage.addListener(function(req, sender, response) {//谷歌消息监听
		console.log("1111");
		if (req.topic  && contentAutoLogin[req.topic]) {
			contentAutoLogin[req.topic](req, response);
		}
	});
	return protype;
})();
contentAutoLogin.init();
