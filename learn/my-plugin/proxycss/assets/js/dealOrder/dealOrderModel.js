/**
 * Created by yuexing on 2015/11/5.
 * 这是处理下单的规则模型
 */
/***
 * 集成各个网站下单的规则
 * **/
dealOrderRules = {
	"taobao.com"	:  new dealFlowModel(taobao),
	"tmall.com"		:  new dealFlowModel(tmall),
	"jd.com"		:  new dealFlowModel(jd),
	"yhd.com"		:  new dealFlowModel(yhd)
}
/**
 * @constructor
 *  下单的模型类
 * @param {Object}   1.sku sku信息
 * @param {Object}   2.jquerychoose 页面动作，表示的选择器
 * @param {Object}   3.regExp 流程的跳转URL规则
 * @param {Array}    4.platformAddress 地址匹配规则
 * @param {boolean}  5.isIframeAddress 地址页面是否镶嵌在iframe内
 * @param {String}   6.mbasketurl 移动端购物车URl规则
 * @param {function} 7.matchAddress 地址校验check
 * @param {function} 8.updateAddress 地址自动选择更新
 * @param {function} 9.redirectMyOrder 用于检测页面是否支付成功，如果一旦支付成功，则进入[我的订单]页面
 * @param {function} 10.sendOrder 去订单列表页面抓取订单信息，进行汇总，把相应的数据发送到background，进行处理
 * 下面参数是非标准场合
 * @param {function} 11.getPageIdlist 获取页面里面的商品规格对象
 * @param {function} 12.detailAddress 填充商品详情页的地址
 * @param {function} 13.checkbill 检测是否需要填写发票信息
 * @param {function} 14.fillbill 自动填写发票信息
 * @param {boolean}  15.deleteAddress 是否需要删除一个地址
 */
function dealFlowModel(dealModel){
	this.order_flow = {};
	this.sku = dealModel.sku;
	this.jquerychoose = dealModel.jquerychoose;
	this.regExp = dealModel.regExp;
	this.platformAddress = dealModel.platformAddress;
	this.isIframeAddress = dealModel.isIframeAddress;
	this.mbasketurl = dealModel.mbasketurl;
	this.matchAddress = dealModel.matchAddress;
	this.updateAddress = dealModel.updateAddress;
	this.redirectMyOrder = dealModel.redirectMyOrder;
	this.sendOrder = dealModel.sendOrder;
	//下面参数是非标准场合
	this.getPageIdlist = dealModel.getPageIdlist;
	this.detailAddress = dealModel.detailAddress;
	this.checkbill = dealModel.checkbill;
	this.fillbill = dealModel.fillbill;
	this.deleteAddress = dealModel.deleteAddress;
	//以下是B5M独有的信息
	this.b5mAddress = ["name","prov","city","area","town","addressDetail","post","mobile","phoneCode"];
	this.dirProvince = ['上海','北京','天津','重庆'];
}

