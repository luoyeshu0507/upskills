$(function(){
	var userInfo = JSON.parse(commonUtils.getDecryptedLocalStorage("com.b5m.orderassist.mc.userInfo"));
	//var server = userInfo ? userInfo.serverType : "http://10.30.99.34:58081"; //ip正式环境
	var server = userInfo ? userInfo.serverType : "http://crm.b5m.com"; //域名正式环境
	var SCHEMA_SELECT = true;//默认状态下，是可以选择环境的，发布给MC部门使用就需要改成false
	var TEXT_STATUS = [];//定义不同的状态值对应的订单状态
	var order_queue = [];//每一次需要处理的订单列表list
	var order_map = {};//每一次需要处理的订单集合map
	TEXT_STATUS[0]='未操作';
	TEXT_STATUS[1]='正在操作中...';
	TEXT_STATUS[2]='正在排队';
	TEXT_STATUS[3]='已完成下单';
	TEXT_STATUS[4]='订单已跳过';
	TEXT_STATUS[5]='等待操作';
	TEXT_STATUS[6]='服务器异常';
	TEXT_STATUS[7]='订单有误';
	TEXT_STATUS[8]='服务器异常, 请取消订单';
	TEXT_STATUS[9]='订单号没找到';
	TEXT_STATUS[10]='安排退款处理';
	TEXT_STATUS[11]='订单已经被取消了';
	TEXT_STATUS[12]='自动下单失败';
	TEXT_STATUS[13]='正在操作中...';//自动下单失败之后的再次回调
	var Order={
		init:function(){//启动方法
			if(SCHEMA_SELECT == false){
				$("#schemaSelect").hide();
			}else{
				//如果是开发者模式，默认填写好用户名和密码
				if(userInfo){
					$("#serverType").val(userInfo.serverType);
					$("#kfName").val(userInfo.kfName);
					$("#pass").val(userInfo.pass);
				}else{
					$("#kfName").val("order_test");
					$("#pass").val("izene123");
				}
			}
			var self = this;
			self.isLogin({}, function(data) {
				if(!data || !data.isLogin) {
					$('.login').show();
					return;
				} else {
					$('#userInfo').text('客服:' + data.kfName).closest('ul').show();
				}
				self.refreshOrderStatus();
			});
			$('#logout_btn').click(function(e){
				Order.logout();
				return false;
			});
			$('#login_btn').click(function(e){
				Order.login();
				return false;
			});
			$('#clear_storage_btn').click(function(e){
				Order.clearStorage();
				return false;
			});
		},
		isLogin : function(request, callback) {//判断是否登陆
			request = request || {};
			request.topic = 'isLogin';
			Order.sendMessage(request , callback);
		},
		login : function() {//登陆
			var req = {}, params = ['serverType','kfName', 'pass'];
			for(var i = 0, l = params.length; i < l; i++) {
				req[params[i]] = $.trim($('#' + params[i]).val());
				if(!req[params[i]]) return alert('请填写用户名、密码'); 
			}
			server = req.serverType;
			commonUtils.setEncryptedLocalStorage("com.b5m.orderassist.mc.userInfo",JSON.stringify(req).toString());
			req.topic = 'login';
			Order.sendMessage(req , function(data) {
				if(data == 'undefined' || data.error) {
					return alert('用户名信息填写错误，请重新登录');
				} else {
					location.reload();
				}
			});
		},
		logout : function(req, callback) {//退出登录
			req = req || {};
			req.topic = 'logout';
			if (window.confirm("确认退出")) {
				Order.sendMessage(req , function(){
					location.reload();
				});
			}
		},
		clearStorage : function(req, callback) {//清除localStorage内数据
			req = req || {};
			req.topic = 'init';
			var self = this;
			if (window.confirm("请确认是否删除Storage，如果删除了，当前所有未完成的订单状态将不再保存！已经完成的订单不会再出现页面内，但是不影响MC人员下单的数据！")) {
				//location.reload();
				commonUtils.remove("com.b5m.orderassist.store");
				Order.sendMessage({topic:'reloadData'},function(data){
					if(data && data.error){
						return alert('服务器数据错误');
					}
				})
			}
		},
		showMsg:function(request){//弹出提示信息
			commonUtils.hideShield();
			if(request.msg) alert(request.msg);
		},
		markcps:function(request){//标记转链失败的商品,本身是不调用的，是给background.js调用的
			commonUtils.hideShield();
			var o=null;
			for(var key in request){
				if(!(key=='topic')){
					o=$("#orders tr[data-id="+request[key]+"] td:eq(1)");
					o.html("<span style='color:red'>[cps]</span>"+o.text());
				}
			}
		},
		run : function(order) {
			commonUtils.showShield();
			order.topic = 'runOrder';
			Order.sendMessage(order);
		},
		end : function(req) {
			req = req || {};
			req.topic = 'end';
			Order.sendMessage(
				req, 
				function(status) {
					
				});
		},
		getOrders : function(callback) {
			Order.sendMessage({topic : 'getOrders'},callback);
		},
		renderList : function(callback) {
			var self = this;
			self.getOrders(function(orders){
				if(!orders || orders.error) {
					return Order.showMsg({msg:'服务器数据错误'});
				}
				var html = [
					'<table class="table order-ls">',
						'<thead>',
							'<tr><th>订单ID</th><th>标题</th><th style="width:75px;">商家</th><th>已提交订单信息</th><th>状态</th><th style="width:138px;">操作</th></tr>',
						'</thead>',
						'<tbody>',
							(function(){
								var h = [], clazz, btnClazz, disabled, skipDisabled;
								orders.forEach(function(order){
									clazz = '';
									btnClazz = 'btn btn-primary '
									if(order.status == 1){
										clazz = 'active';
										btnClazz += 'active ';
									} else if((order.status + '').match(/[25]/)) {
										clazz = 'info';
									}else if(order.status == 3){
										clazz = 'success';
									} else if(order.status == 4){
										clazz = 'warning';
									} else if((order.status + '').match(/[46789]|10|11|13/)){
										clazz = 'danger';
									}
									disabled = (order.status + '').match(/[1346789]|10|11|13/) ? 'disabled="disabled" ' :'';
									skipDisabled = order.status != 1 ? 'disabled="disabled" ' :'';
									if(order.status == "12"){//自动下单失败
										disabled = '',
										skipDisabled = '';
										clazz = 'info'
									}
									var list=order.goods;
									for(var orderItem in list){
										var oneitem=list[orderItem];
										h.push([
											'<tr class="' + clazz + '" data-id="' + oneitem.b5mid + '" data-workno="'+order.workNo+'">',
												'<td><a target="_blank" href="' + server + order.workDetailUrl + '">'+ oneitem.b5mid + '</td>',
												'<td>'+ oneitem.title + '</td>',
												'<td>'+ oneitem.site + (oneitem.selfSupportType=='2'?'<span style="color:red">[超划算]</span>':'')+'</td>',
												'<td>'+ (oneitem.b5mid ? oneitem.b5mid + '<br>总价:(' + oneitem.goodPrice + ')':'--') + '</td>',
												'<td class="center" id="st_' + oneitem.b5mid + '">'+  TEXT_STATUS[order.status] + (oneitem.reason?'('+oneitem.reason+')' : '') + '</td>',
												orderItem==0?
												'<td class="center" rowspan="'+list.length+'">'+
													'<button class="' + btnClazz + 'btn-run" '+ disabled +'id="btn_' + oneitem.b5mid + '">下单</button>'+
													'<div class="btn-group">'+
														'<button class="btn btn-primary btn-sm dropdown-toggle btn-end" data-toggle="dropdown" type="button" data-toggle="dropdown" aria-expanded="false" '+ skipDisabled +'>'+
													    '终止<span class="caret"></span>'+
													  '</button>'+
													  '<ul class="dropdown-menu" role="menu">'+
														  '<li><a href="#">缺货</a></li>'+
														  '<li><a href="#">差价</a></li>'+
														  '<li><a href="#">其他</a></li>'+
													  '</ul>'+
													'</div>'+
												'</td>':'',
											'</tr>'
										].join(''));
									}	
								});
								return h.join('');
							})(),
						'</tbody>',
					'</table>',
					'<div><button id="reload_btn" class="pull-right btn btn-primary">换一批</button></div>'
				].join('');
				$('#orders').html(html);
				if(typeof callback === 'function') callback(orders);
			});
		},
		refreshOrderStatus : function() {
			commonUtils.hideShield();
			this.renderList(function(orders) {
				order_queue = orders;
				order_queue.forEach(function(order) {
					order_map[order.workNo + ''] = order;
				});
				$('.dropdown-toggle').click(function(){
					$(this).next().toggle();
				}).blur(function(){
					$(this).next().hide(500);
				});
				$('.dropdown-menu li a').click(function(e){//取消订单
					Order.sendMessage({topic : 'sendErrorOrder',status : 10, reason: $(this).text() ,workNo:$(this).closest('tr').attr('data-workNo')},
						function(data){
							if(data&&data.msg) alert(data.msg);
						});
					return false;
				});
				$('.order-ls .btn-run').click(function() {
					var order = order_map[$(this).closest('tr').attr('data-workNo')];
					Order.run(order);
				});
				$('#reload_btn').click(function() {
					Order.reloadData();
				});
			});
		},
		reloadData : function() {//换一批数据
			var todo = order_queue.some(function(order,index,orders) {
					//	[0]='未操作';
					//  [1]='正在操作中...';
					//  [2]='正在排队';
					//  [5]='等待操作';(以上场合被返回)
					return (order.status + '').match(/^[0125]$/);
				});
			if(todo) {
				return alert('还有未处理的订单');
			}
			if (window.confirm("确定重新换一批？")) {
				commonUtils.showShield();
				Order.sendMessage({topic:'reloadData'},function(data){
					if(data && data.error){
						return alert('服务器数据错误');
					}
					Order.refreshOrderStatus()
				})
			}
		},
		reloadPage : function(){//刷新页面
			commonUtils.hideShield();
			location.reload();
		},
		hideShield : function(){//hideShield
			commonUtils.hideShield();
		},
		sendMessage:function(req,callback){//req：设置和background通信到底用哪个function，和该function需用到哪一些参数，
			req.tojs='background';//设置请求的background名字（这里默认的就是background名就是background）
			chrome.runtime.sendMessage(req,callback);//发起请求
		}
	}
	chrome.runtime.onMessage.addListener(function(request, sender, callback) {//谷歌消息监听
		if(request&&request.topic&&request.tojs=='options'&&Order[request.topic]) {
			Order[request.topic](request,callback);
		}
	});
	Order.init();
});
