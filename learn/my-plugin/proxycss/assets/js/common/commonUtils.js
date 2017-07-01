/***
 * Created by yuexing on 2015/10/29.
 * @author yuexing
 * 共通模块
 * 一些常用共通处理方式
 * **/
var commonUtils = (function(){
	/**
	 * @constructor
	 * @name protype
     * @returns {} protype
	 */
	var protype = {};

	/**
	 * localStorage移除数据
	 * @param {string} localStorageKey localStorage key
	 * @returns {}
	 */
	protype.remove = function(localStorageKey){
		localStorage.removeItem(localStorageKey);
	}

	/**
	 * localStorage加密设置
	 * @param {string} localStorageKey localStorage key
	 * @param {} targetData 加密对象
	 * @returns {}
	 */
	protype.setEncryptedLocalStorage = function(localStorageKey, targetData){
		try{
			localStorage.setItem(localStorageKey, des.encryptByDES(targetData,""));
		}catch(e){
			console.error("@Function:setEncryptedLocalStorage@localStorageKey:" + localStorageKey + "@ErrorMsg:" + e);
		}
	}
	
	/**
	 * localStorage数据还原
	 * @param {string} localStorageKey localStorage key
	 * @returns {} resultData localStorage数据还原
	 */
	protype.getDecryptedLocalStorage = function(localStorageKey){
		var resultData = localStorage.getItem(localStorageKey)
		try{
		//如果数据是不是空的，返回还原后后的数据
			if(resultData)
				resultData = des.decryptByDES(resultData,"");
		}catch(e){
			console.error( "@Function:getDecryptedLocalStorage@localStorageKey:" + localStorageKey + "@ErrorMsg:" + e);
		}finally{
			return resultData
		}
	}

	/**
	 * date类型转换成YYYYMMDDHHNNSS的Number类型，便于时间计算
	 * @param {object} date date
	 * @returns {Number} YYYYMMDDHHNNSS 数値化
	 */
	protype.dateFormatYYYYMMDDHHNNSS = function(date){
		var YYYY = date.getYear();
		if (YYYY < 1900){YYYY += 1900}
		var MM = String(date.getMonth()+1);
		if (MM.length < 2){MM = "0" + MM}
		var DD = String(date.getDate());
		if (DD.length < 2){DD = "0" + DD}
		var HH = String(date.getHours());
		if (HH.length < 2){HH = "0" + HH}
		var NN = String(date.getMinutes());
		if (NN.length < 2){NN = "0" + NN}
		var SS = String(date.getSeconds());
		if (SS.length < 2){SS = "0" + SS}
		return Number(String(YYYY) + MM + DD + HH + NN + SS);
	}
	/**
	 * 判断一个对象是否有一个属性
	 *
	 * @param {Object} obj需要判断对象
	 * @param {String} obj是否具有的属性名字
	 * @returns {} domain
	 */
	protype.hasProp = function(obj,prop) {
		if(prop&&obj){
			return Object.prototype.hasOwnProperty.call(obj, prop);
		}else return false;
	};
	/**
	 * 清理商品url乱七八糟的参数
	 *（这个函数需要改进，因为混入了具体的规则）
	 * @param {string} url
	 * @param {Array} clearRules,清理规则
	 * @returns {String} 返回清理后的参数
	 */
	protype.cleanPath = function(url,clearRules) {
		if (!url) return '';
		var l = clearRules.length;
		var m = null;
		for (var i = 0; i < l; i++) {
			m = url.match(clearRules[i]);
			if (m) {
				if(m.length > 2)return m[1] + m[2];
				return m[0];
			}
		}
		m = url.match(/https?:\/\/a\.m\.taobao\.com\/i(\d+)\.htm/);
		if(m) return 'https://item.taobao.com/item.htm?id='+m[1];
		m = url.match(/https?:\/\/a\.m\.tmall\.com\/i(\d+)\.htm/);
		if(m) return 'https://detail.tmall.com/item.htm?id='+m[1];
		return url.replace(/[#?].*/,'');
	};
	/**
	 * 获取一个url的域名 如 taobao.com
	 * @param {string} url
	 * @returns {} domain
	 */
	protype.getDomain = function(url) {
		var hostname = '';
		try {
			hostname = url || (window.location||document.location).hostname;
			hostname = hostname.match(/([-\w]+\.\b(?:net\.cn|com\.hk|com\.cn|com|cn|net|org|cc|tv$|hk)\b)/)[1];
		} catch (e) {
		}
		return hostname;
	};
	/**
	 * 获取url后面的所有参数 url为传过来的链接
	 * @param {string} id为参数名
	 * @returns {} 参数值
	 */
	protype.getParams = function (url) {
		var name,value;
		var str = url; //取得整个地址栏
		var num = str.indexOf("?")
		str = str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
		var arr = str.split("&"); //各个参数放到数组里
		var params = [];
		for(var i = 0;i < arr.length; i++){
			num = arr[i].indexOf("=");
			if(num > 0){
				name = arr[i].substring(0,num);
				value = arr[i].substr(num+1);
				params[name] = value;
			}
		}
		return params;
	}
	/**
	 * 获取url后面的指定的参数
	 * url为传过来的链接（此方法因为谷歌的安全策略（eval函数不允许执行），在background里面是不允许执行的）
	 * @param {string} id为参数名
	 * @returns {} 参数值
	 */
	protype.getParam = function (url, id) {
		url = url + "";
		var regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/";
		var reg = eval(regstr);//eval可以将 regstr字符串转换为 正则表达式
		//var reg = new RegExp(regstr);
		var result = url.match(reg);//匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]
		if (result && result[2]) {
			return result[2];
		}else{
			return "";
		}
	};
	protype.shieldElemet = '';
	/**
	 * 当ajax通信时弹出层
	 */
	protype.showShield = function(){
		$("#shield-pannel").remove();
		this.shieldElemet = document.createElement("div");
		this.shieldElemet.id = "shield-pannel";
		document.body.appendChild(this.shieldElemet);
	};
	/**
	 * 当ajax通信完成时消除层
	 */
	protype.hideShield = function(){
		this.shieldElemet = undefined;
		$("#shield-pannel").remove();
	}
	return protype;
}());
