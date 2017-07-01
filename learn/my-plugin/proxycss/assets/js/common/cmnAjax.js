/***
 * Created by yuexing on 2015/10/31.
 * @author yuexing
 * 共通模块
 * 各种AJAX的操作
 * **/
var cmnAjax = (function(){
	var protype = {};
	/**
	 * get处理，非同期
	 * @param url URL
	 * @param sendData
	 * @param successCallback
	 * @param errorCallback
	 */
	protype.ajaxGet = function(url, sendData, successCallback, errorCallback) {
		this.ajaxCommunicate(url, sendData, successCallback, errorCallback, null, "GET", "html",true);
	};
	/**
	 * jsonp的get处理，非同期
	 * @param url URL。
	 * @param sendData
	 * @param successCallback
	 * @param errorCallback
	 * @param jsonpCallback
	 * @param timeout
	 */
	protype.ajaxGetJSONP = function(url, sendData, successCallback, errorCallback, jsonpCallback, timeout) {
		this.ajaxCommunicate(url, sendData, successCallback, errorCallback, jsonpCallback,"GET", "jsonp", true, timeout);
	};

	/**
	 * post处理，同期
	 * @param url URL
	 * @param sendData
	 * @param successCallback
	 * @param errorCallback
	 */
	protype.ajaxPost = function(url, sendData, successCallback, errorCallback) {
		this.ajaxCommunicate(url, sendData, successCallback, errorCallback, null,"POST", "json");
	};
	/**
	 * jsonp的post处理，同期
	 * @param url URL。
	 * @param sendData
	 * @param successCallback
	 * @param errorCallback
	 * @param jsonpCallback
	 * @param timeout
	 */
	protype.ajaxPostJSONP = function(url, sendData, successCallback, errorCallback, jsonpCallback, timeout) {
		this.ajaxCommunicate(url, sendData, successCallback, errorCallback, jsonpCallback,"POST", "jsonp",false,timeout);
	};
	/**
	 *  以fromId为提交方式的post处理，非同期，json
	 * @param url URL。
	 * @param formId form
	 * @param successCallback
	 * @param errorCallback
	 */
	protype.ajaxPostJSONByFormId = function(url, formId, successCallback, errorCallback) {
		// from内元素系列化，返回json数据处理结构
		var sendData = this.ajaxSerializeFormData(formId);
		this.ajaxCommunicate(url, sendData, successCallback, errorCallback, null, "POST", "json", true);
	};

	/**
	 * 函数内部用的ajax，一般外部不调用
	 * @param url				1.接口的URL
	 * @param sendData			2.需要传输的data
	 * @param successCallback	3.正常结束返回的函数。
	 * @param errorCallback		4.错误返回函数。
	 * @param jsonpCallback		5.JSONP回调函数。
	 * @param execType			6.处理方式（GET / POST）
	 * @param ajaxDataType		7.处理方式（json / html / jsonp）
	 * @param isAsync			8.true:非同期处理、false:同期处理
	 * @param timeout			9.超时处理
	 * @param completeFunc		10.不管错误与否，都会调这个函数
	 * @internal
	 */
	protype.ajaxCommunicate = function(
		url,
		sendData,
		successCallback,
		errorCallback,
		jsonpCallback,
		execType,
		ajaxDataType,
		isAsync,
		timeout,
		completeFunc) {

		// Ajax通信param格式化
		var paramObj = {
			url:			url,
			async:			isAsync ? true : false,
			type:			execType,
			dataType:		ajaxDataType,
			data:			sendData,
			success:		successCallback,
			complete:		completeFunc ? completeFunc : {},
			error:			errorCallback,
			timeout:		timeout,
			contentType:	ajaxDataType == "json" ? "application/json" : "application/text"
		};
		if (ajaxDataType == "jsonp" && !jsonpCallback) {// 如果是jsonp的格式
			paramObj.jsonpCallback = jsonpCallback;
		};
		// Ajax通信
		$.ajax(paramObj);
	};
	/**
	 * 把from内的元素进行系列化，以json字符串的方式返回
	 * @param formId
	 * @return json字符串的方式返回
	 * @internal
	 */
	protype.ajaxSerializeFormData = function(formId) {
		// formId如果没有设定
		if (formId) {
			return "";
		}
		// formId如果没有设置#,则手动加上#
		var id = formId;
		if (id.charAt(0) != "#") {
			id = "#" + id;
		};
		var $form = $(id);
		if ($form) {
			return "";
		};
		//return $(id).serialize();//返回普通字符串的方式
		return $(id).serializeArray();//返回json字符串的方式
	};
	return protype;
})();

