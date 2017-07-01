/***
 * Created by yuexing on 2015/10/31.
 * @author yuexing
 * 共通模块
 * 各种cookie操作api
 * 只能在chrome插件background内用
 * **/
if (!chrome.cookies) {
	chrome.cookies = chrome.experimental.cookies;
}
var cache = new CookieCache();
var cookieUtils = (function(){
	var protype = {};
	var _self = protype;
	/**
	 * 获取指定域名的所有cookie的拼接字符串
	 * 这是从chrome插件内直接取得，并且带callback的（适合业务不复杂的情况）
	 * @param {string} domain 如果传空默认获得所有的cookie
	 * @param {array} errDomain 不需要的返回的cookie domain
	 * @param {function} callback
	 */
	protype.getAllCookies = function(domain,errDomain,callback){
		var g = '';//cookie字符串拼接
		var cookieCallback = function(c){
			for(var i = 0,len = c.length; i < len; i++) {
				if(!errDomain || !isFilterDomain(c[i],errDomain)){//如果没有要排除的cookie，则全部传回
					g += c[i].name + '=' + c[i].value +';'
					//测试代码，可以注释
					console.log("domain: " + c[i].domain + " name: " + c[i].name + " value: " + c[i].value );
				}
			}
			callback(g.substring(0, g.length-2));
		}
		chrome.cookies.getAll({domain:domain},cookieCallback);
	};
	/**
	 * 获取指定域名的所有cookie的拼接字符串
	 * 这是从中间变量CookieCache内取得（也是最新的，不是缓存），并且不带callback的（适合业务比较复杂的情况）
	 * 如果要获取taobao.com 和 login.taobao.com的域名，传入taobao或者taobao.com就可以了
	 * @param {string} domain 如果传空默认获得所有的cookie
	 * @param {array} errDomain 不需要的返回的cookie domain
	 * @return {string} cookie的字符串
	 */
	protype.getFilterCookies = function(domain,errDomain) {
		var cookies = this.getAllForFilter(domain);
		var g = '';//cookie字符串拼接
		cookies.forEach(function(c){
			for(var i = 0,len = c.length; i < len; i++) {
				if(!errDomain || !isFilterDomain(c[i],errDomain)){//如果没有要排除的cookie，则全部传回
					g += c[i].name + '=' + c[i].value +';'
					//测试代码，可以注释
					console.log("domain: " + c[i].domain + " name: " + c[i].name + " value: " + c[i].value );
				}
			}
		});
		return  g.substring(0, g.length-2);
	}
	/**
	 * 获取指定域名的cookie name获取相应的value
	 * @param {string} domain 如果传空默认获得所有的cookie
	 * @param {String} name cooie
	 * @return {string} cookie对应的value值
	 */
	protype.getCookieByName = function(domain,name) {
		var cookies = this.getAllForFilter(domain);
		var value = ""
		cookies.forEach(function(c){
			for(var i = 0,len = c.length; i < len; i++) {
				if(c[i].name === name){
					value = c[i].value;
					break;
				}
			}
		});
		return  value;
	}
	/**
	 * 判断这个cookie是否在拦截范围内
	 * @param {Object} cookie cookie
	 * @param {array} errDomain 不需要的返回的cookie domain
	 * @return {boolean} true 说明是拦截范围内的，false则不是
	 * @internal 一般函数内部调用
	 */
	function isFilterDomain(cookie,errDomains){
		for(var i = 0,len = errDomains.length; i < len; i++) {
			var errDomain = errDomains[i];
			if(errDomain === cookie.domain){
				return true;
			}
		}
		return false;
	}
	/**
	 * 通过指定的网站名称获取该域名内所有的cookies
	 * 如果要获取taobao.com 和 login.taobao.com的域名，传入taobao或者taobao.com就可以了
	 * @param {string} filter
	 * @return {array} cookie List
	 */
	protype.getAllForFilter = function(filter) {
		var cookieArry = [];
		cache.getDomains(filter).forEach(function(domain) {
			cookieArry.push(cache.getCookies(domain));
		});
		return cookieArry;
	}
	/**
	 * 删除单条cookie
	 * @internal 函数内部调用
	 * **/
	function removeCookie(cookie) {
		var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
			cookie.path;
		chrome.cookies.remove({"url": url, "name": cookie.name});
	}
	/**
	 * 通过指定的网站名称删除该域名内所有的cookies
	 * 如果要删除taobao.com 和 login.taobao.com的域名，传入taobao或者taobao.com就可以了
	 * @param {string} filter
	 */
	protype.removeAllForFilter = function(filter) {
		cache.getDomains(filter).forEach(function(domain) {
			_self.removeCookiesForDomain(domain);
		});
	}
	/**
	 * 通过指定的域名删除该域名内所有的cookies
	 * taobao.com 和 login.taobao.com是两个不同域名,
	 * 所以: 1.传入taobao.com,只会删除taobao.com的cookie
	 *       2.传入taobao ,什么都不会删除
	 *       3.大部分的不是www开头的域名，chrome会默认在前面加上小数点。
	 *         比如：taobao.com 实际cookie是 .taobao.com
	 *               login.taobao.com 实际cookie是 .login.taobao.com
	 *               而www.taobao.com 实际cookie就是 www.taobao.com
	 * @param {string} domain
	 */
	protype.removeCookiesForDomain = function(domain) {
		cache.getCookies(domain).forEach(function(cookie) {
			removeCookie(cookie);
		});
	}

	/**
	 * 删除浏览器所有的cookie
	 */
	protype.removeAll = function () {
		var all_cookies = [];
		cache.getDomains().forEach(function(domain) {
			cache.getCookies(domain).forEach(function(cookie) {
				all_cookies.push(cookie);
			});
		});
		cache.reset();
		var count = all_cookies.length;
		var timer = new Timer();
		for (var i = 0; i < count; i++) {
			removeCookie(all_cookies[i]);
		}
		timer.reset();
		chrome.cookies.getAll({}, function(cookies) {
			for (var i in cookies) {
				cache.add(cookies[i]);
				removeCookie(cookies[i]);
			}
		});
	};
	/**
	 * 用监听浏览器的所有域名下的cookie
	 * @internal 一般函数内部调用
	 */
	function listener(info) {
		cache.remove (info.cookie);
		if (!info.removed) {
			cache.add (info.cookie);
		}
	};
	/**
	 * 启动监听
	 * @internal 一般函数内部调用
	 */
	function startListening() {
		chrome.cookies.onChanged.addListener(listener);
	};
	/**
	 * 对于整个浏览器开始启动监听，把浏览器所有的cookie进行
	 */
	protype.onload = function () {
		var timer = new Timer();
		chrome.cookies.getAll({}, function(cookies) {
			startListening();
			var start = new Date();
			for (var i in cookies) {
				cache.add(cookies[i]);
			}
			timer.reset();
		});
	}
	return protype;
})();

/**
 * 用来缓存浏览器所有的cookie，这个适用所有的浏览器
 * **/
function CookieCache(){
	this.cookies_ = {};
	/**
	 * 对cookie进行重置
	 * @return 返回排序好的array
	 * **/
	this.reset = function () {
		this.cookies_ = {};
	};
	/**
	 * 添加一个cookie
	 * **/
	this.add = function (cookie) {
		var domain = cookie.domain;
		if (!this.cookies_[domain]) {
			this.cookies_[domain] = [];
		}
		this.cookies_[domain].push (cookie);
	};

	/**
	 * revmove单条cookie
	 * **/
	this.remove = function (cookie) {
		var domain = cookie.domain;
		if (this.cookies_[domain]) {
			var i = 0;
			while (i < this.cookies_[domain].length) {
				if (cookieMatch (this.cookies_[domain][i], cookie)) {
					this.cookies_[domain].splice (i, 1);
				} else {
					i++;
				}
			}
			if (this.cookies_[domain].length == 0) {
				delete this.cookies_[domain];
			}
		}
	};
	/**
	 * 通过一定条件进行筛选，获取所有该条件下的domain
	 * 比如taobao.com login.taobao.com （按照浏览器的同源规则，这是两个不同域）
	 * 如果传入filter:"taobao",那么返回的就可以得到以上两个cookie
	 * **/
	this.getDomains = function(filter) {
		var result = [];
		sortedKeys(this.cookies_).forEach(function(domain) {
			if (!filter || domain.indexOf(filter) != -1) {
				result.push(domain);
			}
		});
		return result;
	};
	/**
	 * 获取某个域名的cookie
	 * 比如淘宝的cookie，按照域名的规则会有下面几条
	 * taobao.com 27条
	 * login.taobao.com 2条（按照浏览器的同源规则，这是两个不同域的cookie）
	 * 如果传入"taobao.com",那么返回的就是taobao.com 的27条，login.taobao.com的2条不会传回
	 * **/
	this.getCookies = function(domain) {
		return this.cookies_[domain];
	};
	/**
	 * 比对cookie是否是一样的，
	 * @internal 函数内部调用
	 * @return 如果一样返回true
	 * **/
	 function cookieMatch (c1, c2) {
		return (c1.name == c2.name) && (c1.domain == c2.domain) &&
			(c1.hostOnly == c2.hostOnly) && (c1.path == c2.path) &&
			(c1.secure == c2.secure) && (c1.httpOnly == c2.httpOnly) &&
			(c1.session == c2.session) && (c1.storeId == c2.storeId);
	};
	/**
	 * 返回排序好的array
	 * @internal 函数内部调用
	 * @return 返回排序好的array
	 * **/
	function sortedKeys (array) {
		var keys = [];
		for (var i in array) {
			keys.push(i);
		}
		keys.sort();
		return keys;
	}
}

// A simple Timer class.
function Timer() {
	this.start_ = new Date();
	this.elapsed = function() {
		return (new Date()) - this.start_;
	}
	this.reset = function() {
		this.start_ = new Date();
	}
}
