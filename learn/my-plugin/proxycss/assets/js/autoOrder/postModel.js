/**
 * Created by yuexing  on 2015/11/2.
 * 用于自动下单的各种模型
 */
/**
 * @constructor
 *  用于自动下单，发送给接口的类
 * @param {String} cookie cookie信息
 * @param {Object} orderInfo 订单信息
 * @param {String} retry 重试次数
 * @param {String} timeout 请求超时时间
 * @param {Array} itemList 商品列表信息
 * @param {Object} addressInfo 地址信息
 */
function AutoOrder( cookie,orderInfo, retry, timeout, itemList,addressInfo){
	this.cookie = cookie;
	this.orderInfo = orderInfo || {};
	this.retry = retry || "2";
	this.timeout = timeout || "5000";
	this.itemList = itemList || [];
	this.addressInfo = addressInfo || {};
};