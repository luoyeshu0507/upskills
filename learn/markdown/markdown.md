##### 项目启动

```cmd
$ cd portal-v4/portal/front
$ gulp serve:app --app=kodo -p http://portalv4.dev.qiniu.io
$ gulp serve -p http://portalv4.dev.qiniu.io --kodo http://192.168.180.147:3002
```

##### 测试jenkins

```
https://jenkins.qiniu.io/job/portalv4-staging-pipeline/
```


##### 测试账户

```
账号：general_storage_001@test.qiniu.io
密码：Test@12345

kodo-log@qiniu.com
ea5Eg3ahW@u
```

##### x5发布
```
构建：portalv4-product-pipeline
分支：master
进程：portalv4-front
机器：xs5
```

##### 发布流程
1. jenkins 上 使用 portalv4-product-pipeline 构建一个包。
2. 修改 deploy 项目中包的版本配置文件portalv4-kodo.csv，提PR。
3. 登录跳板机 先连 qiniuVPN

```
$ ssh -p 18022 lizhiwei@10.8.0.1
$ floy push portalv4-kodo
$ floy switch portalv4-kodo // 上一步显示的hash
$ floy switch portalv4-kodo // 上一步显示的xs的hash xs5

$ qssh xs5 // 登录一台机器
$ supervistorctl status
$ supervistorctl restart xxx
```

```
/deploy/nodes/xs5/root/opt/nginx/sites-available/qiniu.com/portalv4.conf
/deploy/floy/nginx/env_nb230/_package/sites-available/qiniu.com/portalv4.conf
/deploy/floy/nginx/env_nb231/_package/sites-available/qiniu.com/portalv4.conf

$ floy push nginx _ nb230
$ floy switch nginx _ nb230

# nginx -s reload
```

##### hotfix
1. 把pr合到master
七牛-朱阁  17:40:09
2. Jenkins里构建portalv4-product-pipeline， 构建前得到构建包名(*.tar.gz)
3. 到deploy/floy/portalv4/portalv4.csv 在xs5一行修改刚才的包名

#### io
http://adminv2.dev.qiniu.io/
http://portal.qiniu.io/

#### api
```url
https://github.com/qbox/product/blob/a349f4101c033fb0aa1b8c626de63679013f22e3/portal-v4/kodo.md
```


##### todo
1. 修改 bucket 列表页面文案
2. 自定义图片处理预览图问题
3. https://jira.qiniu.io/browse/PV4-3735


##### 跨区域同步前端问题
https://jira.qiniu.io/browse/KODO-1385


![image](http://oikum8hcn.bkt.clouddn.com/uploadurls.jpg)







##### okr
O1. 跨区域同步功能前端部分实现   20%
O2. 接手portal-v4前端代码库的kodo部分  40%
熟悉portal-v4的前端代码  10%
熟悉portal-v4前端代码的修改、测试、发布流程  10%
持续优化和扩展代码库的功能  20%
O3. portal-v4前端代码库，kodo部分的抽出工作  40%
以一种新的技术结构和构建方式，抽出kodo部分的代码，梳理、重构kodo部分的前端代码  25%
完成kodo的前端代码独立出来，独立构建，独立发布，使各个项目之前的前端代码解耦  15%
