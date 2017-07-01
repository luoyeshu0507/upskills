/**
 * Created by yuexing  on 2015/11/5.
 * taobao的下单处理方式
 */
var taobao = {
	sku : {
		'type' : '#J_isku .tb-property-type',
		'parent':'dl',
		'property': /dt/i,
		'text':'li span',
		'item':'li',
		'num':'#J_IptAmount'
	},
	jquerychoose:{
		aitbpage:'.right-btn',//爱淘宝页面的去看看按钮
		basketpage:'#mc-menu-hd',//顶部点击去购物车按钮
		buybtn:'.tb-btn-buy',//立即购买按钮
		addbasketbtn:'.tb-btn-add',//加入购物车按钮
		checkBaskedGoods:'.J_CheckBoxShop:eq(1)',//购物车页勾选商品的按钮
		openAddress:'.J_Modify:eq(0)',//打开隐藏的iframe地址按钮，如果isIframeAddress为true，这个可以选择不填写
		pcuserRemark:'textarea.memo-input',
		submitOrder:'#J_Go',
		mbasketpage:'.c-f-checkbox:eq(0)',
		addressForm:'#J_FormDeliver',
		morderlist:'[data-reactid=".0.1.$=1$.$confirmOrder_1.$submitOrder_1.0.1.0.0"]',
		orderId:'[data-reactid=".0.3.2.$0.0.0.0.1.1.0.3"]'
	},
	regExp:{
		aitb:/https?:\/\/ai.taobao.com\/auction\/edetail.htm/,//爱淘宝页面
		sku:/https?:\/\/.*item\.taobao\.com/,//商品详情页
		addBasketPage:/https?:\/\/cart\.taobao\.com\/add_cart_succeed.htm/,//加入购物车成功页面
		backetPage:/https?:\/\/cart\.taobao\.com\/cart\.htm/,
		openAddress:/https?:\/\/buy.taobao.com\/auction\/order\/confirm_order.htm/,
		updateAddress:/member1.taobao.com\/member\/fresh\/deliver_address_frame.htm/,
		mbasketpage:/https?:\/\/h5.m.taobao.com\/awp\/base\/bag.htm/,
		morderlist:/https?:\/\/h5.m.taobao.com\/cart\/order.html\?buyNow/,
		sendOrder:/https?:\/\/buyertrade.taobao.com\/trade\/itemlist\/list_bought_items.htm/
	},
	platformAddress:['fullName','prov','city','area','town','addressDetail','post','mobile','phoneCode'],
	isIframeAddress:true,//地址填写的form是否在iframe中
	mbasketurl:'https://h5.m.taobao.com/awp/base/bag.htm',
	matchAddress:function(req){//提交订单的时候检测地址是否填正确
		var $j_gobtn=$("#J_Go");
		if(!$j_gobtn.length){
			window.setTimeout(function(){
				this.matchAddress(req);
			},200);
			return;
		}
		var $j_go=$('<div id="tbsubbtn">提交订单</div>');
		$j_go.click(function(){
			var pageadd=$("#address-list .selected .user-address").text().trim().split(/\s/);
			var reqadd=req.addressAll.trim().split(/\s/);
			if(pageadd[0].substr(0,2)==reqadd[0].substr(0,2)&&pageadd[1].substr(0,2)==reqadd[1].substr(0,2)&&pageadd.indexOf(req.mobile)>-1){
				$("#J_Go")[0].click();
				return;
			}else{
				if(window.confirm('地址可能有误，确定提交？')){
					$("#J_Go")[0].click();
				}
			}
		})
			.offset($j_gobtn.offset())
			.appendTo($('body'));
		window.setInterval(function(){
			$("#tbsubbtn").offset($("#J_Go").offset());
		},200);
	},
	updateAddress:function(req){
		if(!req) return;
		var $form=$(this.jquerychoose.addressForm);
		if($form.length){
			var cfg = req;
			var b5mAddress = this.b5mAddress;
			var adr = this.platformAddress;
			if ($form.length) {
				$.each(b5mAddress,function(i, it) {
					if(adr[i]){
						$form.find('input[name="' + adr[i] + '"],textarea[name="'+adr[i]+'"]').val($.trim(cfg[it]) || '');
					}
				});
				var $cityTitle = this.order_flow.addressTip(req,1);
				$('#city-title').text($cityTitle);
				var $addressTip=$('<div id="address-tip">'+$cityTitle+' /'+cfg.addressDetail+'</div>');
				$addressTip.css({
					top:'26px',
					left:'205px'
				});
				$("body").append($addressTip);
			}
		}else{
			window.setTimeout(function(req){this.updateAddress(req);},500);
		}
	},
	sendOrder:function(orders,pageOrderInfo){//抓取页面订单数据
		var thirdLoginAccount = $('#J_UserAvatar img')[0].alt.replace('的头像','');
		if(!thirdLoginAccount){
			this.order_flow.sendOrder();
			return;
		}
		var goods = orders.goods;
		var goodsLen = goods.length;
		var tbdatareg = /\"mainOrders\"\:\[(.*?)\,\{\"extra\"/;
		var tbpagedata = JSON.parse($("#J_Col_Main").find("script:eq(0)").html().match(tbdatareg)[1]);
		orderId = tbpagedata.mainOrderId  ? tbpagedata.mainOrderId : tbpagedata.id;
		price = tbpagedata.payInfo.price ? tbpagedata.payInfo.price : tbpagedata.payInfo.actualFee;
		fee = tbpagedata.payInfo.postFees[0].value;
		var pickid=/id=(\d+)(&|$)/;
		var onesid="";
		var onegoodid="";
		var haspagedata=false;//是否在页面找到数据
		var $pageorderlist=tbpagedata.subOrders;
	/***
	 * 旧版代码，这个版本有bug，会引发同一个商品，多个规格的时候，会遗漏某一件商品，但是原因找不到，所以未删除，找到后可以删除
		for(var i=0;i<$pageorderlist.length;i++){
			if($pageorderlist[i].id == 0){
				continue;
			}
			onesid="id"+$pageorderlist[i].itemInfo.id;
			pageOrderInfo[onesid]={};
			pageOrderInfo[onesid]["num"]=$pageorderlist[i].quantity;
			pageOrderInfo[onesid]["price"]=$pageorderlist[i].priceInfo.realTotal;
		}

		for(i=0;i<goods.length;i++){
			onegoodid="id"+goods[i].url.match(pickid)[1];
			if(pageOrderInfo[onegoodid]) haspagedata=true;
			goods[i].goodPrice=(pageOrderInfo[onegoodid]&&pageOrderInfo[onegoodid].price)||goods[i].goodPrice;
			goods[i].num=(pageOrderInfo[onegoodid]&&pageOrderInfo[onegoodid].num)||goods[i].num;
		}
		if(!haspagedata) {
			location.reload();
			return;
		}
***/
		var pageOrderList = [] ,//当前页面订单取到的值
		 		orderTemp;//中间变量
		for(var i=0;i<$pageorderlist.length;i++){
			if($pageorderlist[i].id == 0 || !$pageorderlist[i].id
				|| ($pageorderlist[i].priceInfo && !$pageorderlist[i].priceInfo.original)  ){//剔除不合理部分的数据
				continue;
			}
			onesid="id"+$pageorderlist[i].itemInfo.id;
			orderTemp = {
				num : $pageorderlist[i].quantity,
				price : $pageorderlist[i].priceInfo.realTotal
			};
			pageOrderList.push(orderTemp);
		}
		if(pageOrderList.length != goods.length){//如果获取的到的订单和缓存里面的订单数量不一致，重新加载
			location.reload();
			return;
		}
		for(i=0;i<goods.length;i++){
			goods[i].goodPrice = (pageOrderList[i].price)||goods[i].goodPrice;
			goods[i].num= (pageOrderList[i].num)||goods[i].num;
		}

		alert(orderId + ':\r\n总价：' + price + '(含运费 ' + fee + ')');
		this.order_flow.sendMessage({
			topic : 'submitOrder',
			status : 3,
			orderId : pageOrderInfo.orderId,
			frameUrl : location.href,
			totalPrice : price,
			callFee : fee,
			workNo : orders.workNo,
			goods : goods,
			thirdLoginAccount : thirdLoginAccount
		});
	}
}
