/**
 * Created by yuexing  on 2015/11/5.
 * 京东的下单处理方式
 * 处理流程
 * 1.getPageIdlist：获取skuIdlist，因为JD定义一个商品ID是按照skuID来定义的，一个商品，按照SKUID其实是一个商品组合
 * 2.detailAddress：填写详情页地址
 * 3.
 */
var jd = {
	sku: {
		'num': '#buy-num',
		'numadd': '.btn-add',
	},
	jquerychoose: {
		basketpage: '#settleup-url',
		openAddress: '.extra-r:eq(0) a',
		submitOrder: '#order-submit',
		deleteAddress: '.del-consignee',
		makeSureDelete: '.ui-dialog .ac a',
		addressForm: '#consignee-form',
		orderlist: 'a[href^="//order.jd.com/normal/item.action?orderid"]',
		orderId: '#orderid',
		cpspagebtn: '.btn-append,.l_info_b a,.gobuy a'
	},
	regExp: {
		sku: /https?:\/\/item.jd.com\/\d+.html/,
		openAddress: /https?:\/\/trade.jd.com\/shopping\/order\/getOrderInfo.action/,
		updateAddress: /https?:\/\/trade.jd.com\/shopping\/dynamic\/consignee\/editConsignee.action/,
		orderlist: /https?:\/\/order.jd.com\/center\/lists?.action/,
		sendOrder: /https?:\/\/order.jd.com\/normal\/item.action/,
		cpspage: /https?:\/\/re.jd.com\/cps\/item\//
	},
	platformAddress: ['consigneeParam.name', 'consigneeParam.provinceId', 'consigneeParam.cityId', 'consigneeParam.countyId', '', 'consigneeParam.address', '', 'consigneeParam.mobile', 'consigneeParam.phone'],
	isIframeAddress: true,
	mbasketurl: '//p.m.jd.com/cart/cart.action',
	matchAddress: function(req) {//地址校验
		var $j_gobtn = $("#order-submit");
		if(!$j_gobtn.length) {
			window.setTimeout(function() {
				this.matchAddress(req);
			}, 200);
			return;
		}
		var dirProvince = this.dirProvince;
		$("<button class='checkout-submit btn-1'>提交订单</button>")
			.click(function() {
			var reqadd = req.addressAll.trim().split(/\s/);
			if(dirProvince.indexOf(reqadd[0].substr(0, 2)) > -1) reqadd.shift();
			var pageadd = $("#consignee-list .addr-info:eq(0)").attr('title').trim().split(/\s/);
			var pagephone = $("#consignee-list .addr-tel:eq(0)").text().trim();
			var regphone = req.mobile.substr(0, 3) + "****" + req.mobile.substr(7, 4);
			if(pageadd[0].substr(0, 2) == reqadd[0].substr(0, 2) && pageadd[1].substr(0, 2) == reqadd[1].substr(0, 2) && pagephone == regphone) {
				$("#order-submit")[0].click();
				return;
			} else {
				if(window.confirm('地址可能有误，确定提交？')) {
					$("#order-submit")[0].click();
				}
			}
		}).insertAfter($j_gobtn);
		$j_gobtn.hide();
	},
	updateAddress: function(req) {
		if(!req) return;
		var $form = $(this.jquerychoose.addressForm);
		if($form.length) {
			var cfg = req;
			var b5mAddress = this.b5mAddress;
			var adr = this.platformAddress;
			if($form.length) {
				$.each(b5mAddress, function(i, it) {
					if(adr[i]) {
						$form.find('input[name="' + adr[i] + '"],textarea[name="' + adr[i] + '"]').val($.trim(cfg[it]) || '');
					}
				});
				window.setTimeout(function() {
					var province_jd = getJDArea(cfg.prov);
					var city_jd = getJDArea(cfg.city);
					var county_jd = getJDArea(cfg.area);
					if(province_jd.zh_name.match(/上海|天津|重庆|北京/)){//因为直辖市只有3级地址，所以需要把地址往前挪一位
						city_jd = county_jd;
						county_jd =  getJDArea(cfg.town);
					}
					if(province_jd) {
						var selPro = $form.find('select[name="consigneeParam.provinceId"]')[0];
						// selPro.value = provinceId_jd;
						selPro.selectedIndex = 0;
						selPro.children[0].value = province_jd.area_no;
						selPro.children[0].textContent = province_jd.zh_name;
						if(city_jd) {
							var selCit = $form.find('select[name="consigneeParam.cityId"]')[0];
							// selCit.value = cityId_jd;
							selCit.selectedIndex = 0;
							selCit.children[0].value = city_jd.area_no;
							selCit.children[0].textContent = city_jd.zh_name;
							if(county_jd) {
								var selCou = $form.find('select[name="consigneeParam.countyId"]')[0];
								// selCou.value = countyId_jd;
								selCou.selectedIndex = 0;
								selCou.children[0].value = county_jd.area_no;
								selCou.children[0].textContent = county_jd.zh_name;
								$('#span_town').hide();
								$.ajax({
									url: '//trade.jd.com/shopping/dynamic/consignee/getTowns.action',
									type: 'post',
									data: {
										'consigneeParam.countyId': county_jd.area_no
									},
									success: function(seltext) {
										seltext && $('#span_town').html(seltext).show();
									}
								})
								// $(selCou).trigger('change');
							} else {
								$.ajax({
									url: '//trade.jd.com/shopping/dynamic/consignee/getCountys.action',
									type: 'post',
									data: {
										'consigneeParam.cityId': city_jd.area_no
									},
									success: function(seltext) {
										seltext && $('#span_county').html(seltext).show();
									}
								})
								$('#span_town').html('').hide();
							}
						} else {
							$.ajax({
								url: '//trade.jd.com/shopping/dynamic/consignee/getCitys.action',
								type: 'post',
								data: {
									'consigneeParam.provinceId': province_jd.area_no
								},
								success: function(seltext) {
									seltext && $('#span_city').html(seltext).show();
								}
							})
							$('#span_county').html('<select class="selt" id="consignee_county" name="consigneeParam.countyId" tabindex="4"><option selected="" value="">请选择：</option></select>').show();
							$('#span_town').html('').hide();
						}
					}
					var addresstip = cfg.addressAll.replace(/\s+/g, ' / ');
					var $addressTip = $('<div id="address-tip">' + addresstip + '</div>');
					$addressTip.css({
						position: 'static',
						margin: '-10px auto 5px 75px'
					});
					$("#name_div").after($addressTip);
					if(!province_jd || !city_jd || !county_jd) {
						alert('请手动完善地址');
					}
				}, 300);

				//发票
				var invoice = $('.invoice');
				var bill = cfg.bill || cfg['name'];
				if(invoice.length) {
					invoice.find('.abtn')[0].click();
					setTimeout(function() {
						invoice.find('input').val(bill);
						invoice.find('.title').text(bill)
					}, 200);
				}
			}
		} else {
			window.setTimeout(function(req) {
				this.updateAddress(req);
			}, 300);
		}
	},
	sendOrder: function(orders, pageOrderInfo) {//抓取页面订单数据//业务逻辑，搜集订单信息，发送给CRM后台
		var thirdLoginAccount = $('.link-user').text();
		if(!thirdLoginAccount) {
			this.order_flow.sendOrder();
			return;
		}
		var goods = orders.goods;
		var goodsLen = goods.length;
		var pickid = /(\d+)/;
		var onesid = "";
		var onegoodid = "";
		var $pageorderlist = $(".p-list tr");
		var price = $(".extra .ftx04 b").text().replace(/[^\d.]/g, '');
		var fee = $(".total ul li:eq(2)").text().replace(/[^\d.]/g, '');
		for(var i = 1; i < $pageorderlist.length; i++) {
			onesid = "id" + $pageorderlist.eq(i).find("td").eq(0).text().replace(/[^\d.]/g, '');
			pageOrderInfo[onesid] = {};
			pageOrderInfo[onesid]["num"] = $pageorderlist.eq(i).find("td").eq(5).text().replace(/[^\d.]/g, '');
			pageOrderInfo[onesid]["price"] = $pageorderlist.eq(i).find("td").eq(3).text().replace(/[^\d.]/g, '');
		}
		for(i = 0; i < goods.length; i++) {
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
	},
	getPageIdlist: function() {//获取页面里面的商品规格对象
		var t = window.setInterval(function() {
			if($("#btn-easybuy-submit").length) {
				$("#btn-easybuy-submit").hide();
				window.clearInterval(t);
			}
		}, 200);
		return $("head").html().match(/colorSize\:[\s|\S]*\}\]/)[0];
	},
	detailAddress: function(req) {//填充商品详情页的地址
		if(req.nextOrderUrl) return;
		var add = req.addressAll.trim().split(/\s/);
		if(this.dirProvince.indexOf(add[0].substr(0, 2)) > -1) add.shift();
		window.setTimeout(function() {
			//查找地址
			var province = $('#stock_province_item li a:contains(' + add[0].substr(0, 2) + ')');
			if(province.length) {
				province[0].click();
			} else {
				window.setTimeout(function() {
					this.detailAddress(req);
				}, 200);
				return;
			}
			window.setTimeout(function() {
				$('#stock_city_item li a:contains(' + add[1].substr(0, 2) + ')')[0].click();
				window.setTimeout(function() {
					$('#stock_area_item li a')[0].click();
					window.setTimeout(function() {
						$('#stock_town_item li a')[0] && $('#stock_town_item li a')[0].click();
					}, 300);
				}, 300);
			}, 300);
		}, 100);
	},
	checkbill: function(req) {//检测是否需要填写发票信息
		var $container = $("#part-inv");
		var $billList = $container.find(".mr10");
		if($billList.length > 0 &&(($billList.eq(1).text().trim() == req.bill) ||(!req.bill && $billList.eq(1).text().trim() == '个人'))) return true;
		else {
			$container.find(".invoice-edit")[0].click();
			this.fillbill(req);
			return false;
		}
	},
	fillbill: function(req) {
		var callee = arguments.callee;
		window.setTimeout(function() {
			var doc = window.frames['dialogIframe'].document;
			if(doc && doc.getElementById('click_1')) {
				doc.getElementById('click_1').click();
				window.setTimeout(function() {
					var bill = req.bill;
					var list = doc.querySelectorAll("#invoice-tit-list .invoice-item");
					if(!bill || bill == '个人') {
						list[0].click();
					} else if(list.length > 1) {
						list[1].click();
						list[1].querySelector('input[type=text]').value = bill;
					} else if(list.length == 1) {
						doc.querySelector("#add-invoice").click();
						doc.querySelectorAll("#invoice-tit-list .invoice-item")[1].querySelector('input[type=text]').value = bill;
					}
					var typeofbill = doc.querySelector("#electro_book_content_radio li");
					if(typeofbill && typeofbill.innerText.trim() == '不开发票') doc.querySelectorAll("#electro_book_content_radio li")[1].click();
					doc.querySelector(".op-btns .btn-9").click();
					window.setTimeout(function() {
						$('#gotomobile')[0].click();
					}, 1000);
				}, 300);
			} else callee();
		}, 300);
	},
	deleteAddress: true
}