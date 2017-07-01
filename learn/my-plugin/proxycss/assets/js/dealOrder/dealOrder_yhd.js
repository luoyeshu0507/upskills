/**
 * Created by yuexing  on 2015/11/5.
 * 一号店的下单处理方式
 */
var yhd = {
	sku: {
		'type': '#sku_unit dt',
		'parent': 'dl',
		'text': 'li',
		'item': 'li',
		'num': '#product_amount'
	},
	jquerychoose: {
		basketpage: '.hd_prism_cart',//去购物车按钮。顶部点击去购物车按钮
		addbasketbtn: '.tb-btn-add',//加入购物车按钮
		openAddress: '',
		deleteAddress: '.slt .closeSTB',//删除第一个选中的地址
		makeSureDelete: 'span.Bt.Bty2',//点击删除地址后弹出的层
		orderlist: "a[href^='/order/orderDetail.do?orderCode']",//用于从[我的订单]列表里面找到第一个待付款的单子，
		orderId: '#orderdetailCode'//订单ID
	},
	regExp: {
		sku: /https?:\/\/item.yhd.com\/item\/|https?:\/\/t.yhd.com\/detail\//,//商品详情页
		openAddress: /https?:\/\/buy.yhd.com\/checkoutV3\/index.do/,
		updateAddress: /https?:\/\/buy.yhd.com\/checkoutV3\/index.do/,
		orderlist: /http?:\/\/my.yhd.com\/order\/myOrder.do/,
		sendOrder: /http?:\/\/my.yhd.com\/order\/orderDetail.do/
	},
	platformAddress: ['receiverName', 'province', 'city', 'county', 'town', 'detailAddress', 'post', 'mobile', 'phone'],
	isIframeAddress: false,//地址填写的form是否在iframe中,true代表地址页是iframe
	mbasketurl: 'https://h5.m.taobao.com/awp/base/bag.htm',
	getPageIdlist: function() {//获取商品IDlist，用于判断是否是同一个商品
		var list = $('body script:eq(1)').text().replace(/\s/g, '').match(/vardefultAtrrValueMap\=.*varsubAttrList/);
		if(list){//一号店商城
			return list[0];
		}else{//一号店自营
			var list = [];
			$("li[pmid]").each(function(e){
				list.push($(this).attr('pmid'));
			});
			return list.toString();
		}
	},
	detailAddress: function(req) {//填充商品详情页的地址
		var add = req.addressAll.trim().split(/\s/);
		var _self = this;
		var provinceFun = function(){
			var province = $('.sec_level1 a:contains(' + add[0].substr(0, 2) + ')');
			if(province.length) {
				province[0].click();
				var cityFun = function(){
					$('.sec_level2 a:contains(' + add[1].substr(0, 2) + ')')[0].click();
					var areaFun = function(){
						$('.sec_level3 a:contains(' + add[2].substr(0, 2) + ')')[0].click();
					}
					window.setTimeout(areaFun,300);//三级地址
				}
				window.setTimeout(cityFun,300);//二级地址
			} else {//如果没有呼出地址，则再次呼出一次
				window.setTimeout(function() {
					_self.detailAddress(req);
				}, 200);
				return;
			}
		}
		window.setTimeout(provinceFun, 300);//一级地址
	},
	matchAddress: function(req) {//提交订单的时候检测地址是否填正确
		var $j_gobtn = $("#J_Go");
		if(!$j_gobtn.length) {
			window.setTimeout(function() {
				this.matchAddress(req);
			}, 200);
			return;
		}
		var $j_go = $('<div id="tbsubbtn">提交订单</div>');
		$j_go.click(function() {
			var pageadd = $("#address-list .selected .user-address").text().trim().split(/\s/);
			var reqadd = req.addressAll.trim().split(/\s/);
			if(pageadd[0].substr(0, 2) == reqadd[0].substr(0, 2) && pageadd[1].substr(0, 2) == reqadd[1].substr(0, 2) && pageadd.indexOf(req.mobile) > -1) {
				$("#J_Go")[0].click();
				return;
			} else {
				if(window.confirm('地址可能有误，确定提交？')) {
					$("#J_Go")[0].click();
				}
			}
		})
			.offset($j_gobtn.offset())
			.appendTo($('body'));
		window.setInterval(function() {
			$("#tbsubbtn").offset($("#J_Go").offset());
		}, 200);
	},
	updateAddress: function(req) {
		//业务逻辑：
		//1.如果有之前的地址，先删除之前第一个的地址
		//2.打开一个地址
		if(!req) return;
		$("#addAddressOperatBt .Btw2").eq(0).click();
		$("#receiverName").focus().val(req.name);//姓名
		$("#detailAddress").focus().val(req.addressDetail);//详细地址
		$("#mobile").focus().val(req.mobile);//手机号码
		$("#saveEditAddress").click();//确定地址
		//
	},
	sendOrder: function(orders, pageOrderInfo) {//抓取页面订单数据
		var thirdLoginAccount = $(".hd_login_name").text();//第三方账号
		if(!thirdLoginAccount) {
			this.order_flow.sendOrder();
			return;
		}
		var goods = orders.goods;
		var goodsLen = goods.length;
		var pickid = /(\d+)/;
		var onesid = "";
		var onegoodid = "";
		var $pageorderlist = $(".product_tab tbody tr");
		var price = $("#remainToPay span").text().replace(/[^\d.]/g, '');//总价
		var fee = $(".order_detail_info span").eq(1).text().replace(/[^\d.]/g, '');//运费
		for(var i = 0; i < $pageorderlist.length; i++) {
			onesid = "id" + $pageorderlist.eq(i).find("a[href^='http://item.yhd.com/item/']")[0].href.match(/[\d]+/);
			pageOrderInfo[onesid] = {};
			pageOrderInfo[onesid]["num"] = $pageorderlist.eq(i).find("td").eq(2).text().replace(/[^\d.]/g, '');
			pageOrderInfo[onesid]["price"] = $pageorderlist.eq(i).find("td").eq(3).text().replace(/[^\d.]/g, '');
		}
		for(i = 0; i < goodsLen ; i++) {
			onegoodid = "id" + goods[i].url.match(pickid)[1];
			goods[i].goodPrice =(pageOrderInfo[onegoodid] && pageOrderInfo[onegoodid].price) || goods[i].goodPrice;
			goods[i].num =(pageOrderInfo[onegoodid] && pageOrderInfo[onegoodid].num) || goods[i].num;
		}
		alert(pageOrderInfo.orderId + ':\r\n总价：' + price + '(含运费 ' + fee + ')');
		this.order_flow.sendMessage({
			topic: 'submitOrder',
			status: 3,
			orderId: pageOrderInfo.orderId,
			frameUrl: location.href,
			totalPrice: price,
			callFee: fee,
			workNo: orders.workNo,
			goods: goods,
			thirdLoginAccount: thirdLoginAccount
		});
	}
}