var exports={};
var TAB_OPTIONS = 'chrome-extension://' + chrome.runtime.id + '/views/options.html';
//var KEY_UUID = "com.b5m.orderassist.uuid";
var KEY_DATA = "com.b5m.orderassist.store";
var KEY_USER = "com.b5m.orderassist.mc";
//var server = "http://172.16.111.231:58081";//stage
//var server = "http://10.30.102.1:58081";//prod
//var server = "http://10.30.99.34:58081"; //IP正式环境
var server = "http://crm.b5m.com"; ///域名正式环境
var pageSize = 10;
var isAutoOrder = false;//用于开启是否需要全自动下单(临时过渡变量，一旦确定全自动下单上线，变量删除)
var dealOrder={
	optionsTabId:-1,//option.html页面的tabid 页面未打开 记录为-1
	flow:null,//保存Flow下单对象的一个实例化对象
	currentTab:-1,//当前活动选项卡的id
	currentTabUrl:'',//当前活动选项卡url
	hasopenjdcart:false,//是否加入京东购物车
	_self : this,
	init : function(request, callback){//启动方法
//		this.getUUID();
		this.chromeEvent();
		this.optionsTabId = -1;//option.html页面的tabid 页面未打开 记录为-1
		this.flow = null;//保存Flow下单对象的一个实例化对象
		this.currentTab = -1;//当前活动选项卡的id
		this.currentTabUrl = '';//当前活动选项卡url
		this.hasopenjdcart = false;//是否加入京东购物车
		if(callback){
			commonUtils.remove(KEY_DATA);
			callback();
		}
	},
	chromeEvent:function(){//加载chrome的一些监听事件
		chrome.browserAction.onClicked.addListener(function(){//插件图标点击事件
			if(dealOrder.optionsTabId === -1){
				chrome.tabs.create({url:'views/options.html'}, function(tab){
					dealOrder.optionsTabId = tab.id;
				});
			}else{
				chrome.tabs.get(dealOrder.optionsTabId, function(tab){
					if(tab){
						chrome.tabs.update(dealOrder.optionsTabId, {selected:true});
					}else{
						chrome.tabs.create({url:'views/options.html'}, function(tab){
							dealOrder.optionsTabId = tab.id;
						});
				}
				})
			}
		});
		chrome.runtime.onMessage.addListener(function(req,sender,callback){//消息监听器
			if(req&&req.topic&&req.tojs=='background'&&dealOrder[req.topic]) dealOrder[req.topic](req,callback);
		});
		chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {//页面被关闭时的事件监听
			
		});
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {//页面刷新事件监听
			if(!dealOrder.flow) return;
			dealOrder.flow.currentTab = tabId;
			if(tab.url.match(/https?:\/\/cart.jd.com\/addToCart.html/)){//检测到京东商品加入购物车成功页面就跳到下一个商品或者购物车结算页
//				dealOrder.tab.closeTab(tab.id,function(){
//					var url=dealOrder.flow.orders.goods[dealOrder.flow.running_i+1];
//					url=url||'http://cart.jd.com/cart';
//					if(!dealOrder.hasopenjdcart){
//						dealOrder.tab.openTab(url);
//						dealOrder.hasopenjdcart=true;
//					}
//				});
				var nextgood = dealOrder.flow.orders.goods[dealOrder.flow.running_i+1];
				if(nextgood) dealOrder.flow.running_i++;
				var url = nextgood && nextgood.url||'http://cart.jd.com/cart';//如果有下一个商品，则进入下一个商品页面，如果没有则进入购物车结算页面
				if(!dealOrder.hasopenjdcart){
					dealOrder.tab.updateTab(tab.id, {url:url, active:true});
					dealOrder.hasopenjdcart = true;
				}
			}else{
				dealOrder.hasopenjdcart = false;
			}
			if(tab && tab.url) {//检测 打开支付页面就跳转到商品列表页
				var newurl = '';
				//if(tab.url.match(/https?:\/\/mclient.alipay.com\/w\/trade_pay.do|https?:\/\/cashier\w+\.alipay.com\/standard\/lightpay\/lightPayCashier.htm/)){
				//	newurl='https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm';
				//}
				//if(tab.url.match(/https?:\/\/pay.m.jd.com\/pay\/index.html|https?:\/\/cashier.jd.com\/payment\/pay.action/)){
				//	newurl='http://order.jd.com/center/list.action';
				//}
				var domain = commonUtils.getDomain(tab.url);
				if(dealOrder.rules[domain] && dealOrder.rules[domain].redirectMyOrder && tab.url.match(dealOrder.rules[domain].redirectMyOrder.payURL)){
					newurl = dealOrder.rules[domain].redirectMyOrder.myOrderURL;
				}
				if(newurl && dealOrder.flow.actionFlow[dealOrder.flow.currentAction] == 'updateAddress') {
					dealOrder.flow.currentAction ++;//dealOrder.flow.paypage
					dealOrder.flow.currentActionFinished = true;
					dealOrder.tab.updateTab(dealOrder.flow.currentTab, {url:newurl, active:true});
				}
			}
		});
		chrome.tabs.onCreated.addListener(function(tab) {//页面创建监听
		});
		chrome.tabs.onActivated.addListener(function(tab) {//页面获得焦点监听
			dealOrder.tab.getTab(tab.tabId, function(tab) {
				if(tab.url.match(/chrome\-extension:\/\/.+\/views\/options.html/)){
					dealOrder.optionsTabId = tab.id;
				}else{
					dealOrder.currentTabUrl = tab.url;
					dealOrder.currentTab = tab.id;
				}
			})
		});
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
	isLogin : function(request, callback) {//判断是否登陆
		var user = this.cache.get(KEY_USER);
		user = user && user.value;
		if (user && user.kfName) {
			callback({ isLogin : 1, kfId : user.kfId, kfName : user.kfName});
		} else {
			callback({ isLogin : 0});
		}
	},
	login : function(request, callback) {//登陆
		//自动设置环境
		server = request.serverType ? request.serverType : server;
		$.ajax({
			type:'POST',
			url:server + '/user/user_login',
			data : { 'user.userName' : request.kfName, 'user.password' : request.pass },
			success:function(data){
				data = data && data.ok && data.data;
				if(data.id){
					dealOrder.cache.set(KEY_USER, {kfName : request.kfName, kfId : data.id}, {noexpire : true});
					dealOrder.sendMessage({topic:'reloadPage'})
				} else {
					dealOrder.sendMessage({topic:'showMsg',msg:'用户名信息填写错误，请重新登录'});
				}
			},
			error:function(){
				dealOrder.sendMessage({topic:'showMsg',msg:'用户名信息填写错误，请重新登录'});
			}
		})
	},
	logout : function(request, callback) {
		dealOrder.cache.remove(KEY_USER);
		callback();
	},
	cache : (function() {
		var storage = localStorage;
		var expire_time = 2 * 3600 * 1000;
		return {
			has : function(key) {
				return this.hasOwnProperty(key);
			},
			_is_expired : function(c) {
				return c.options && !c.options.noexpire && c.options.expire && c.options.expire < (new Date()).getTime();
			},
			get : function(key) {
				var v = storage.getItem(key);
				if (v) {
					try {
						v = JSON.parse(v);
						if (this._is_expired(v)) {
							this.remove(key);
							v = null;
							console.debug('cache expired [' + key + ']');
						} else {
							console.debug('cache hit [' + key + ']');
						}
					} catch (e) {
					}
				}
				return v;
			},
			set : function(key, value, options) {
				var opt = options || {};
				if (opt.skip) return;
				opt.expire = new Date().getTime() + (options && options.expire || expire_time);
				storage.setItem(key, JSON.stringify({
									key : key,
									value : value,
									options : opt
								}));
			},
			clear : function(key) {
				for (var i = 0, l = storage.length; i < l; i++) {
					this.remove(storage.key(i));
				}
			},
			remove : function(key) {
				storage.removeItem(key);
			}
		}
	})(),
//	getUUID : function() {
//		var uuid = this.cache.get(KEY_UUID);
//		if (!uuid) {
//			uuid = [];	
//			var arr16 = '0123456789abcdef'.split('');
//			for (var i = 0; i < 32; i++) {
//				uuid.push(arr16[Math.floor(Math.random() * 16)]);
//			}
//			uuid = uuid.join('');
//			this.cache.set(KEY_UUID, uuid, {noexpire:true});
//		}
//		return uuid;
//	},
	getOrders : function(request, callback, options) {//获取订单列表
		var cache = dealOrder.cache.get(KEY_DATA);
		if(options && options.reload) cache = '';
		var filterData = function(data) {
			data.forEach(function(it, i, self){
				it.status = it.status || 0 ;
				if(!dealOrder.flow && (it.status + '').match(/^[125]$/)) {
					it.status = 0 ;
				}
				it.goods.forEach(function(one, j, obj){
					if(typeof one.sku == 'string') {
						if(one.sku.match(/\{.*\}/)) {
							try {
								one.sku = JSON.parse(one.sku.replace(/\\/g,'\\\\'));
							} catch (e) {
								it.status = 7;
								if(!it._error) {
									dealOrder.sendErrorOrder({workNo:it.workNo,status:7,tojs:'options'},function(data){
										if(data&&data.msg) dealOrder.sendMessage({topic:'showMsg',msg:data.msg});
									});
									it._error = 1;
								}
							}
						} else {
							one.beizhu = one.sku;
						}
					}
					if(dealOrder.rules[dealOrder.getDomain(one.url)]){//因为测试那边经常会出现一些完全不符合规则的数据，所以需要加一个判断
						one.site=one.site || dealOrder.rules[dealOrder.getDomain(one.url)].name;
						one.url = dealOrder.cleanPath(one.url);
					}
				});
				it.orderInfo = it.orderInfo || '--';
			});
		}
		if(!cache || !cache.value) {
			var user = dealOrder.cache.get(KEY_USER).value;
			$.ajax({
				url : server + '/autoOrderTask/getTaskList' + '?pageSize=' + pageSize,
				data : {handlerId : user.kfId || ''},
				success : function(data) {
					if(data && data.data) {
						data = data.data;
						filterData(data);
						dealOrder.cache.set(KEY_DATA, data, {noexpire : true});
						dealOrder.sendMessage({topic:'reloadPage'});
					}else{
						dealOrder.sendMessage({topic:'showMsg',msg:data.msg});
					}
				},
				error : function(xhr, statusCode, e) {
					dealOrder.sendMessage({topic:'showMsg',msg:'服务器获取订单出错！'});
				}
			})
		} else {
			data = cache.value;
			filterData(data);
			dealOrder.cache.set(KEY_DATA, data, {noexpire : true});
			callback(data);
		}
	},
	getDomain : function(url) {//获取url的host
        return commonUtils.getDomain(url);
    },
	cleanPath : function(url) {//清除url乱七八糟的参数
    	return commonUtils.cleanPath(url,this.clear_rules);
	},
	clear_rules : [//清理url对应的正则
		/^(https?:\/\/item\.taobao\.com\/item\.htm\?).*?(id=\d+)/,
	    /^(https?:\/\/detail\.tmall\.com\/item.htm\?).*?(id=\d+)/
	],
	rules:{
		'alipay.com' : {//这是给淘宝和天猫的跳转链接
			name:'支付宝',
			cps:true,
			redirectMyOrder:{
				payURL:  /https?:\/\/mclient.alipay.com\/w\/trade_pay.do|https?:\/\/cashier\w+\.alipay.com\/standard\/lightpay\/lightPayCashier.htm/,
				myOrderURL: 'https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm'
			}
		},
		'taobao.com' : {
			name:'淘宝网',
			cps:true
		},
		'tmall.com' : {
			name:'天猫网',
			cps:true
		},
		'jd.com' :{
			name:'京东',
			cps:true,
			redirectMyOrder:{
				payURL:  /https?:\/\/pay.m.jd.com\/pay\/index.html|https?:\/\/cashier.jd.com\/payment\/pay.action|https?:\/\/cashier.jd.com\/payment\/payResult.action/,
				myOrderURL: 'http://order.jd.com/center/list.action'
			}
		},
		'dangdang.com' :{
			name:'当当网'
		},
		'yhd.com' :{
			name:'一号店',
			redirectMyOrder:{
				payURL:  /https?:\/\/my.yhd.com\/order\/finishOrder.do/,
				myOrderURL: "http://my.yhd.com/order/myOrder.do"
			}
		}
	},
	sendErrorOrder : function(request, callback){//取消订单
		var workNo = request && request.workNo;
		if (!workNo) {
			callback({msg:'获取订单号失败！'});
		}
		var status = request.status;
		var url = server + '/autoOrderTask/failUpdate';
		$.ajax({
			url : url,
			data : {workNo : request.workNo},
			dataType:'text',
			success : function(data) {
				data=JSON.parse(data);
				if (!data || data.ok == 0) {
					data.topic='showMsg'
					dealOrder.sendMessage(data);
				} else {
					request.status = request.status || 7;
					dealOrder.endflow(request);
				}
			},
			error : function(data) {
				dealOrder.sendMessage({topic:'showMsg',msg:'取消订单失败，请重新尝试！'});
			}
		});
	},
	updateStatus:function(req,callback){//刷新状态
		var data = dealOrder.cache.get(KEY_DATA).value;
		if(data && data.length) {
			data.forEach(function(item,index,obj){
				if(item.workNo==req.workNo) item.status=req.status;
			});
			dealOrder.cache.set(KEY_DATA, data, {noexpire : true});
			dealOrder.sendMessage({topic : 'refreshOrderStatus'});
		}
	},
	sendMessage:function(req,callback){
		//req用来判断到底调用哪个function，默认情况下是options，
		// 如果是options则代表回调options.js,同样req则代表options.js的代码
		req.tojs=req.tojs || 'options';
		chrome.runtime.sendMessage(req,callback);
	},
	runOrder : function(orders, callback) {
		//业务逻辑：
		// 0.先判断是否自动下单失败单子，如果自动下单失败的单子，走半自动模式
		// 1.订单去走一遍全自动下单
		// 2.1.全自动下单结果返回，如果没有问题,更新订单状态
		// 2.2.全自动下单结果返回，cookie失效，显示MSG
		// 2.3.全自动下单结果返回，如果有问题，显示msg，暂时中止下单流程
		// 3.进入半自动下单模式，半自动下单新建一个Flow对象实例表示下单的全过程
		var autoOrderCallback = function(result){
			if(result == SendAutoStatus["0000"]){
				dealOrderFlowFun();
			}else if(result.code == "2000"){
				//业务逻辑：2.1
				dealOrder.autoSubmitOrder(result,orders);
			}else if(result.code == "50170009"){
				dealOrder.sendMessage({topic:'showMsg',msg: SendAutoStatus[result.code]});
				dealOrder.updateStatus({workNo :  orders.workNo, status : 0});
			}else{
				//业务逻辑：2.2
				dealOrder.sendMessage({topic:'showMsg',msg: SendAutoStatus[result.code]});
				dealOrder.updateStatus({workNo :  orders.workNo, status : 12});
			}
		};
		var dealOrderFlowFun = function(){//业务逻辑：3
			if(!dealOrder.flow){
				dealOrder.flow=new dealOrder.Flow(orders);
			}else return;
			if (dealOrder.flow instanceof dealOrder.Flow) {
				dealOrder.flow['openGoods'](orders);
			}
			setTimeout(dealOrder.isCanceled,500);//判断订单是否被取消
		};
		if(isAutoOrder){//全自动下单开启
			if(orders.status == "12"){//业务逻辑：0
				dealOrder.updateStatus({workNo : orders.workNo, status : 13});
				dealOrderFlowFun();
			}else{
				//autoOrderCallback("请求成功");
				dealOrder.updateStatus({workNo : orders.workNo, status : 1});
				autoOrder.sendAutoOrder(orders,autoOrderCallback);//业务逻辑：1
			}
		}else{
			dealOrder.updateStatus({workNo : orders.workNo, status : 1});
			dealOrderFlowFun();
		}
	},
	isCanceled : function(){//整个订单流程，会不断的check，如果一旦发现用户取消了，则标记成不用下单
		var self = dealOrder;
		if(!self.flow) return;
		var id = self.flow.orders.workNo;
		self.isOrderCanceled(id, function(data) {
			if(data == 1) {
				self.sendMessage({topic:'showMsg',msg:'订单已经被取消，不用下单了！'});
				self.endflow({workNo : id, status : 11});
			} else if(data === 0) {
				setTimeout(self.isCanceled,3000)
			}
		})
	},
	isOrderCanceled : function(id, callback) {//
		var url = 'http://order.b5m.com' +'/dh/bang5mai/order/goods/' + id + '/isCanceled.htm';
		$.ajax({
			url : url,
			success : function(data) {
				if(data && data.code == 200 && data.data == 1 ) {
					callback(1);
				} else if (data && data.data == 0) {
					callback(0);
				}
			},
			error : function(xhr, statusCode, e) {
				callback(-1);
			}
		})
	},
	addBasketPage:function(req,callback){//加入购物车成功页面，跳转下一个商品url或去购物车页(这是有下一个商品的订单页才会进入的这个函数)
		if(this.flow&&(this.flow.fromSite==req.domain||(req.domain.match(/taobao.com|tmall.com/)&&this.flow.fromSite.match(/taobao.com|tmall.com/)))&&this.flow.currentAction==1){
			var nextorder=this.flow.orders.goods[this.flow.running_i+1];
			if(nextorder){//如果加入购物车成功了，则进入下一个商品页
				this.flow.running_i++;
				callback(nextorder.cpsUrl||nextorder.url);
			}
			else if(this.flow.currentActionFinished) callback(null);
		}
	},
	morderlist:function(req,callback){
		if(this.flow&&this.flow.orders.userRemark&&this.flow.orders.userRemark!="无备注信息"){
			callback(this.flow.orders.userRemark);
		}else{
			callback(null);
		}
	},
	orderlist:function(req,callback){//jd独有（不确定）
		var flow=this.flow;
		if(flow&&flow.actionFlow[flow.currentAction]=='paypage'){
			callback(1);
		}else callback(0);
	},
	nextAction:function(req,callback){//执行下单的下一个步骤
		if(this.flow&&req&&this.flow.checkAction(req.nextAction)){
			this.flow[req.nextAction](req,callback);
		}
	},
	reloadData : function(request, callback) {//换一批数据
		this.flow=null;
		this.getOrders(request, callback, {reload : 1});
	},
	endflow:function(req){//结束一个下单流程
		this.updateStatus({workNo : req.workNo, status : req.status});
		if(this.optionsTabId != this.currentTab) {
			this.tab.closeTab(this.currentTab);
		}
		chrome.tabs.query({url:TAB_OPTIONS},function(tab){
			var tabId = tab[0] && tab[0].id;
			chrome.tabs.update(tabId, {active : true}, function(){});
		});
		this.flow=null;
	},
	autoSubmitOrder:function(result,orders) {//从全自动下单工具返回后的发送给CRM后台，
	// result:全自动下单工具返回的结果集合,orders Crm原先的商品集合
		if(!orders.workNo) {
			console.log('cannot get workNo');
		} else {
			var orderList = result.data.orderList[0];
			var itmeList = orderList.itemList;
			var goods = [];
			var good = {};
			var user = this.cache.get(KEY_USER).value;
			for(var i = 0;i < itmeList.length;i++){
				good.b5mid = orders.goods[i].b5mid;
				for(var j = 0;j < orders.goods; j++){
					if(orders.goods[j].pid == itmeList[i].pid){
						good.b5mid = orders.goods[j].b5mid;
						break;
					}
				}
				good.goodsPrice = itmeList[i].price;//商品价格
				good.goodsNum = itmeList[i].count;//数量
				if(i == 0) good.goodsFee = orderList.postfee || 0;
				else good.goodsFee = 0;//运费
				goods.push(good);
			}
			var domain = commonUtils.getDomain(orders.goods[0].url);
			var postData = JSON.stringify({
				workNo : orders.workNo,//工单号
				platform : this.rules[domain].name,//平台
				handlerId : user.kfId || '',//认领ID
				totalPrice : orderList.price,//总价
				callFee : orderList.postfee,//总运费
				thirdLoginAccount : cookieUtils.getCookieByName(domain,LoginObject[domain].cookieUserName),//第三方支付帐号
				paypalOrderId : orderList.orderNo,//第三方订单号
				goods : goods   //商品信息
			});
			var self = dealOrder;
			var success = function(data){
				if(data && data.ok){
					self.updateStatus({workNo : orders.workNo, status : 3});
					console.log(data + '--order success:' + orders.workNo + ',' + orders.workNo);
				} else {
					console.log('server error on send order, b5mid=' + orders.workNo + ',fail');
					self.updateStatus({workNo : orders.workNo, status : 8});
				}
			};
			var error = function(data){
				console.log(data + ',server error on send order, b5mid=' + orders.workNo + ',fail');
				self.updateStatus({workNo : orders.workNo, status : 8});
			}
			cmnAjax.ajaxPost(server + '/autoOrderTask/successUpdate',postData,success,error);
		}
	},
	submitOrder:function(request){//收集所有的信息，发送给CRM后台
		if(!request.workNo) {
			console.log('cannot get workNo');
		} else {
			var self=dealOrder;
			var orderId = request.orderId;
			var user = this.cache.get(KEY_USER).value,kf;
			var platform=this.rules[this.getDomain(request.goods[0].url)].name;
			var goods=request.goods;
			for(var i=0;i<goods.length;i++){
				delete goods[i].title;
				delete goods[i].url;
				delete goods[i].cpsUrl;
				delete goods[i].sku;
				goods[i].goodsNum=goods[i].num;//数量
				delete goods[i].num;
				goods[i].goodsPrice=goods[i].goodPrice;//商品价格
				delete goods[i].goodPrice;
				if(i==0) goods[i].goodsFee=request.callFee||0;
				else goods[i].goodsFee=0;//运费
			}
			//var g = JSON.stringify(goods);
			var postData=JSON.stringify({
				workNo : request.workNo,//工单号
				platform : platform,//平台
				handlerId : user.kfId || '',//认领ID
				totalPrice : request.totalPrice,//总价
				callFee : request.callFee,//总运费
				thirdLoginAccount : request.thirdLoginAccount,//第三方支付帐号
				paypalOrderId : orderId,//第三方订单号
				goods : goods   //商品信息
			});
			$.ajax({
				url : server + '/autoOrderTask/successUpdate',
				data : postData,
				type:"POST",
				dataType:"json",
				contentType:"application/json",
				success : function(data) {
					if(data && data.ok){
						self.endflow({workNo : request.workNo, status : request.status});
						console.log(data + '--order success:' + request.workNo + ',' + request.workNo);
					} else {
						console.log('server error on send order, b5mid=' + request.workNo + ',fail');
						request.status = 8;
						self.endflow({workNo : request.workNo, status : request.status});
					}
				},
				error : function(data) {
					console.log(data + ',server error on send order, b5mid=' + request.workNo + ',fail');
					request.status = 8;
					self.endflow({workNo : request.workNo, status : request.status});
				}
			});
		}
	}
};
dealOrder.Flow = function(orders){//下单流程构造方法  每个订单对应一个Flow实例
	if(!orders.workNo){
		dealOrder.sendMessage({topic:'showMsg',msg:'订单号不存在！'});
		return null;
	}
	this.running_i = 0;//多子订单下正在处理的商品下标
	this.currentAction = 0;//正在执行的下单步骤下标
	this.currentActionFinished = false;//当前步骤是否执行完毕
	this.fromSite = dealOrder.getDomain(orders.goods[0].url);//来源网站
	this.orders = orders;//保存订单信息
}
dealOrder.Flow.prototype={
	actionFlow:['openGoods', 'sku', 'updateAddress', 'paypage', 'sendOrder'],//下单流程
	checkAction:function(action){//判断是否是当前步骤或者是下一个步骤且上一个步骤已经完成
		if(this.actionFlow[this.currentAction]==action){
			return true;
		}else if(this.actionFlow[this.currentAction+1]==action&&this.currentActionFinished){
			//用于判断是否需要进入下一步，防止步骤漏掉（当前业务逻辑，是不能后退的）
			this.currentAction ++;
			this.currentActionFinished = false;
			return true;
		}
		return false;
	},
	openGoods:function(){
		var self = this;
		if(self.orders.status != 0 && self.orders.status != 12) return;
		var goodlist = self.orders.goods;
		self.orders.status=1;
		if(dealOrder.rules[self.fromSite].cps){//如果需要转换返利链接 则调接口转换
			var postdata = {};
			for(var i=0;i<goodlist.length;i++){
				postdata[goodlist[i].b5mid]=goodlist[i].url;
			}
			$.ajax({
				url : server + '/work/getCpsUrl',
				data : postdata,
				type:"POST",
				dataType:"json",
				success : function(data) {
					if(data.ok){
						var cps=data.data;
						for(var j = 0;j < goodlist.length; j++){
							goodlist[j].cpsUrl = decodeURIComponent(cps[goodlist[j].b5mid]);
						}
					}
					openUrl();
				},
				error : function(data) {
					openUrl();
				}
			});
		}else{
			openUrl();
		}
		function openUrl(){
			var o={
				topic:'markcps'
			};
			$.each(goodlist, function(i,item) {
				if(!item.cpsUrl){
					o[item.b5mid] = item.b5mid;
				}
			});
			if(Object.keys(o).length>1){
				dealOrder.sendMessage(o);//发送转链失败的商品id list给optionjs 标记转链失败商品
			}
			var url = goodlist[0].cpsUrl || goodlist[0].url;
			dealOrder.tab.openTab(url, function(tab) {
				dealOrder.currentTab = tab.id;
				dealOrder.flow.currentActionFinished=true;
			});
		}
	},
	sku:function(req,callback){//当页面的url=商品列表当前url或下一个商品url的时候 发送商品信息给content.js
		var pageurl = dealOrder.cleanPath(req.url),
			goods = this.orders.goods,
			index = this.running_i,
			orderUrl = dealOrder.cleanPath(goods[index].url),
			len = goods.length,
			oneorder = goods[index],
			fromSite = this.fromSite,
			urlmatch = false;//用于标记商品链接是否和当前的商品URL是一样的，现在是false，代表不匹配
		if(fromSite == req.domain){//用于对比domain，防止打开其他网站进入这个页面
			if(pageurl.split('//')[1] == orderUrl.split('//')[1]||(req.idliststr && req.idliststr.indexOf(goods[index].url.match(/(\d)+/)[0])>-1)){
				urlmatch = true;//如果是当前的URL和contentsJS发过来的商品URL是一样，标记true
			}else if(goods[index+1]&&(pageurl.split('//')[1]==dealOrder.cleanPath(goods[index+1].url).split('//')[1]||(req.jd&&req.jd.indexOf(goods[index+1].url.match(/(\d)+/)[0])>-1))){
				index = ++this.running_i;
				urlmatch = true;//如果是当前的下一个商品的URL和contentsJS发过来的商品URL是一样，标记true
			}
		}else if((fromSite=='taobao.com'||fromSite=='tmall.com')&&(req.domain=='taobao.com'||req.domain=='tmall.com')){
			//如果当前的URL从taobao变成了天猫，或者从天猫变成了淘宝
			var url1 = dealOrder.cleanPath(goods[index].url),
				url2 = dealOrder.cleanPath(goods[index+1]&&goods[index+1].url),
				url3 = dealOrder.cleanPath(req.url),
				m1 = url1.match(/id=(\d+)/),
				m2 = url2.match(/id=(\d+)/),
				m3 = url3.match(/id=(\d+)/);
			if(m1 && m3 && m1[1] == m3[1]) {
				urlmatch = true;
			}else if(m2 && m3 && m2[1] == m3[1]){
				index = ++this.running_i;
				urlmatch = true;
			}
		}
		if(!urlmatch) return;
		var nextOrderUrl='';
		if(goods[index+1]){
			nextOrderUrl=goods[index+1].cpsUrl||goods[index+1].url;
		}else{
			this.currentActionFinished=true;
		}
		oneorder=goods[index];
		callback({
			url : oneorder.url,
			sku : oneorder.sku,
			num : oneorder.num,
			beizhu : oneorder.beizhu,
			workNo:this.orders.workNo,
			userRemark:this.orders.userRemark,
			bill:this.orders.bill,
			goodRemark:oneorder.goodRemark,
			nextOrderUrl:nextOrderUrl,
			addressAll:this.orders.addressAll
		});
	},
	updateAddress:function(req,callback){//把当前订单的信息回传给contentsJS里面的openAddress或者updateAddress
		if(this.fromSite==req.domain||(req.domain.match(/taobao.com|tmall.com/)&&this.fromSite.match(/taobao.com|tmall.com/))){
			callback(this.orders);
			this.currentActionFinished=true;
		}else callback(null);
	},
	sendOrder:function(req,callback){//获取页面订单信息发送订单
		this.updateAddress(req,callback);
	}
};
dealOrder.init();
