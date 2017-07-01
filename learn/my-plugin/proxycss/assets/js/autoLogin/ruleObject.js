/***
 * Created by yuexing on 2015/10/29.
 * @author yuexing
 * 用于配置各种规则
 * **/
var stage_server = 'http://172.16.111.231:58081';
var prod_server = 'http://10.30.102.1:58081';
var b5m_server = 'http://10.30.99.34:58081';
var Constant = {//定义一些常用变量
	autoServer      : 'http://10.30.120.8:8182',
	postageServer   : b5m_server
};
var PostObject = {//定义一些常用接口需要用到的参数
	sendAuto : {//全自动下单的接口
		'taobao.com':{//全自动淘宝自动下单的接口
			url: Constant.autoServer + '/spider-ttpost/taobao/autoOrder.json'
		}
	},
	sendPostage: {//自动获取邮费接口
		url: Constant.postageServer + '/account/updateCookie'
	}
};
var LoginObject = {//用于配置各种自动登录规则
	'taobao.com' : {
		name      : '淘宝',
		$userName : '#TPL_username_1',
		$passWord : '#TPL_password_1',
		$submit   : '#J_SubmitStatic',
		$fromId   : '#J_StaticForm',
		loginUrl  : 'https://login.taobao.com/member/login.jhtml',
		succUrl   : 'https://i.taobao.com/my_taobao.htm',
		cookieUserName : 'tracknick',
		errCookies :['.err.taobao.com','.toy.taobao.com','.login.taobao.com',
					'item.taobao.com','detailskip.taobao.com','allot-mpp.taobao.com',
					'login.taobao.com','www.taobao.com']
	},
	'tmall.com' : {
		name      : '天猫',
		$userName : '#TPL_username_1',
		$passWord : '#TPL_password_1',
		$submit   : '#J_SubmitStatic',
		$fromId   : '#J_StaticForm',
		loginUrl  : 'https://login.taobao.com/member/login.jhtml',
		succUrl   : 'https://i.taobao.com/my_taobao.htm',
		cookieUserName : 'tracknick',
		errCookies :['err.taobao.com','toy.taobao.com','login.taobao.com']
	},
	'b5m.com' : {
		name      : '帮5买',
		$userName : '#email',
		$passWord : '#password',
		$submit   : '#submit_btn',
		loginUrl  : 'http://ucenter.b5m.com'
	}
};
var SendAutoStatus = {//全自动下单返回的状态码，参照http://wiki.izene.com/index.php//taobao/autoOrder.json
	"0000": 	"next",//代表不是全自动下单对象，接口那边没有定义
	"2000": 	"请求成功",
	"50170000": "参数异常",
	"50170001": "系统异常",
	"50170002": "请求失败",
	"50170003": "添加购物车失败",
	"50170004": "获取购物车信息失败",
	"50170005": "确认订单失败",
	"50170006": "创建订单失败",
	"50170007": "获取订单信息失败",
	"50170009": "下单账号cookie失效,请重新登录！"
};

