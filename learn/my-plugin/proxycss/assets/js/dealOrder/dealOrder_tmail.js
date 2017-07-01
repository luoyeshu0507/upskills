/**
 * Created by yuexing  on 2015/11/5.
 * 天猫的下单处理方式
 */
var tmall = {
	sku: {
		'type': '.tb-sku .tb-metatit',//sku的属性选择器
		'parent': 'dl',//sku单个属性的上级目录
		'property': /dt/i,//用来识别是否sku所在的html元素
		'text': 'li span',//单个sku选择的最终list
		'item': 'a',//应该选中的sku的html 类型
		'num': '.mui-amount-input',//商品数量
		'numadd': '.mui-amount-increase'//商品数量点击
	},
	jquerychoose: {
		basketpage: '#mc-menu-hd',
		buybtn: '#J_LinkBuy',
		addbasketbtn: '#J_LinkBasket',
		openAddress: '.modify:eq(0)',//打开隐藏的iframe地址按钮，如果isIframeAddress为true，这个可以选择不填写
		pcuserRemark: '.tc-inputmask textarea',
		submitOrder: '#J_Go'
	},
	regExp: {
		sku: /https?:\/\/detail\.tmall\.com\/item\.htm/,
		morderlist: /https?:\/\/buy.m.tmall.com\/order\/confirmOrderWap.htm/,
		openAddress: /https?:\/\/buy.tmall.com\/order\/confirm_order.htm/
	},
	platformAddress: ['fullName', 'prov', 'city', 'area', 'town', 'addressDetail', 'post', 'mobile', 'phoneCode'],
	isIframeAddress: true,
	mbasketurl: 'https://h5.m.taobao.com/awp/base/bag.htm',
	updateAddress: function(req) {
		dealOrderRules['taobao.com'].updateAddress(req);
	},
	matchAddress: function(req) {
		var $j_gobtn = $("#J_Go");
		if(!$j_gobtn.length) {
			window.setTimeout(function() {
				this.matchAddress(req);
			}, 200);
			return;
		}
		var $j_go = $("<a class='go-btn'>提交订单</a>")
			.click(function() {
			var reqadd = req.addressAll.trim().split(/\s/);
			var $container = $('.address-option-binded');
			if($container.find('.prov').text().trim().substr(0, 2) == reqadd[0].substr(0, 2) && $container.find('.city').text().trim().substr(0, 2) == reqadd[1].substr(0, 2) && $container.find('.phone').text().trim() == req.mobile) {
				$("#J_Go")[0].click();
				return;
			} else {
				if(window.confirm('地址可能有误，确定提交？')) {
					$("#J_Go")[0].click();
				}
			}
		}).insertAfter($j_gobtn);
		$j_gobtn.hide();
	}
}