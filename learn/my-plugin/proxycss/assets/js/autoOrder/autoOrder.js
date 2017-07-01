/**
 * Created by yuexing on 2015/11/2.
 * 业务模块
 * 用于全自动化下单
 */
var autoOrder = (function(){//自动下单主对象
	var protype = {};
	/**
	 * 业务逻辑
	 * 1.先判断订单对象是否是全自动下单对象，如果不是，直接返回，如果是，进入下一步
	 * 2.判断用户是否登录，如果登录获取cooki，如果没有登录，提示用户登录，直接结束
	 * 3.解析order，按照匹配规则，把order对象解析后，封装成AutoOrder对象，
	 * 4.上一步解析得到AutoOrder对象，发送给全自动下单接口
	 *   按照全自动下单接口返回的结果，对请求结果状态进行分类，发回给background
	 */
	protype.sendAutoOrder = function(order,callback){
		var domain = commonUtils.getDomain(order.goods[0].url);
		//这里是特殊处理，如果是天猫的商品，用淘宝的自动下单规则
		domain = domain == "tmall.com" ? "taobao.com" : domain;
		if(LoginObject[domain]){//是全自动下单对象
			var cookie = getCookie(domain);
			if(cookie){
				var autoOrder = getAutoOrder(domain,order,cookie);
				sendAutoOrder(autoOrder,callback);
			}else{
				callback("请重新登录：" + domain);
			}
		}else{
			callback(SendAutoStatus["0000"]);
		}
	}

	/**
	 * 获取cookie
	 * @param {string} domain
	 * @return {string} cookie
	 * @internal 内部函数调用
	 */
	function getCookie(domain){
		return cookieUtils.getFilterCookies(domain,LoginObject[domain].errCookies);
	}
	/**
	 * 把order对象解析后，封装成AutoOrder对象返回
	 * @param {Object} order订单对象
	 * @return {AutoOrder}
	 * @internal 内部函数调用
	 */
	function getAutoOrder(domain,order,cookie){
		var autoOrder = new AutoOrder(cookie,order);
		//区域信息
		var addressInfo = {};
		addressInfo.provId = order.prov;//省份id
		addressInfo.cityId = order.city;//城市id
		addressInfo.areaId = order.area;//区域id
		addressInfo.townId = order.town;//街道id
		addressInfo.addressDetail = order.addressDetail;//详细地址
		addressInfo.fullName = order.name;//收货人姓名
		addressInfo.mobileCode = order.mobile;//收货人手机号码
		addressInfo.post = order.post;//邮政编码
		autoOrder.addressInfo = addressInfo;
		//商品list
		var itemList = [];
		var item = {};
		var list = order.goods;
		for(var i = 0;i < list.length; i++) {
			var good = list[i];
			item.platformId = domain;//平台来源code
			item.site = domain;//域名
			item.pid = good.url.match(/(\d)+/)[0];//商品ID
			item.price = good.goodPrice;//商品价格
			item.count = good.num;//商品数量
			item.uniqueId = "";//商品唯一ID//现在没有，默认给他传一个空
			item.url = good.url;//商品详情url
			item.shopId = good.shopId;//店铺ID
			item.skuId = good.skuId;//skuId，若无则为空，如果有必须非空
			itemList.push(item);
		}
		autoOrder.itemList = itemList;
		return autoOrder;
	}

	/**
	 * 把order对象解析后，封装成AutoOrder对象返回
	 * @param {Object} AutoOrder对象
	 * @return {Object} data
	 * @internal 内部函数调用
	 */
	function sendAutoOrder(autoOrder,callback){
		var url = PostObject.sendAuto[autoOrder.itemList[0].site].url;
		var sucessCallback = function(result){
			console.log("调用自动下单接口返回成功，状态码： " + result.code + " 消息msg：" + SendAutoStatus[result.code]);
			callback(result);
		};
		var errorCallback = function(e){
			console.error("调用自动下单接口错误信息： " + e.status);
			console.error("cookie：" + autoOrder.cookie);
			console.error("autoOrder：" + JSON.stringify(autoOrder).toString());
			callback(SendAutoStatus["50170002"]);
		};
		cmnAjax.ajaxPost(url,JSON.stringify(autoOrder),sucessCallback,errorCallback);
	};

	return protype;
})();