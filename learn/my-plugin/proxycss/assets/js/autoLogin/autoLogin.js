/***
 * Created by yuexing on 2015/10/29.
 * @author yuexing
 * 业务模块
 * 真正登录用的JS
 * **/
var key = "12345678";
var autoLogin = (function(){//自动登录对象
	var protype = {};
	protype.login = function(loginInfo, callback){//登录函数
		var loginObj = LoginObject[loginInfo.domain];
		$(loginObj.$userName).val(decodeURIComponent(loginInfo.userName));//用户名写入
		$(loginObj.$passWord).val(des.decode(loginInfo.passWord,key));//密码写入
		if(loginInfo.isLoginFlg){//只有是登录flg为true的时候才会登录，因为有可能自动登录超出了次数限制
			//select(loginObj.$submit).click();//点击登录按钮登录
			document.getElementById(loginObj.submit).click();
			//$(loginObj.$submit).click();//点击登录按钮登录
			//var successCallback = function(e){
			//	console.log("succc!" + e)
			//};
			//var errorCallback = function(e){
			//	console.log("error!" + e);
			//}
			//cmnAjax.ajaxPostJSONByFormId(loginObj.loginUrl,loginObj.$fromId,successCallback,errorCallback)//提交整个from表单登录
		}
	};
	return protype;
}());
