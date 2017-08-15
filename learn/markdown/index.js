var marked = require('marked');
var str = '# hello';
console.log(marked(str));

var md = `
##### 项目启动
##### 测试jenkins
##### 测试账户
##### x5发布
##### 发布流程
1. jenkins 上 使用 portalv4-product-pipeline 构建一个包。
2. 修改 deploy 项目中包的版本配置文件portalv4-kodo.csv，提PR。
3. 登录跳板机 先连 qiniuVPN
##### hotfix
1. 把pr合到master
七牛-朱阁  17:40:09
2. Jenkins里构建portalv4-product-pipeline， 构建前得到构建包名(*.tar.gz)
3. 到deploy/floy/portalv4/portalv4.csv 在xs5一行修改刚才的包名
#### io
http://adminv2.dev.qiniu.io/
http://portal.qiniu.io/
#### api
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
`;
console.log(marked(md));