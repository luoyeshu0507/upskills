const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

function getLang(headers) {
  var accept = headers['accept-language'];
  var cookie = headers['cookie'];
  var match = cookie.match(/(^|\s)hublang=([^;]*)(;|$)/);
  if (match) return match[2];
  else return accept.substr(0, 2).toLowerCase();
}

let fy = require('./public/baidu-fy/index.js');

app.use(cookieParser());

app.use((req, res, next) => {
  // console.log(req.headers);
  // console.log(req.header('User-Agent'));
  // console.log(req.header('user-agent'));
  next();
})

// app.use(express.static(path.join(__dirname, 'public')))
// app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/fy', function(req, res, next) {
  let json = JSON.parse(req.body.json);
  let result = {};
  let promise = [];
  let index = 0;
  for(let key in json) {
    promise.push(fy(json[key]).then(data => {
      console.log(index, data.data);
      index++;
      let translate = data.data.trans_result && data.data.trans_result[0].dst || data.data.error_msg;
      result[key] = translate;
      return translate;
    }, err => {
      console.log(index, err, json[key]);
      index++;
      result[key] = 'error';
      return err;
    }));
    // var str = '东一囊十丁魔七卜嚷耀壤九爆瓣蹲鹰乃刀又三于翻镰蹦骤土臂糠下大丈糟万上赢口巾穗螺乞瞧亿霞勺久藏戴夕丸激澡燃糖义之辩凝磨雕子卫衡赞镜刃赠器马乡丰蹄井开夫餐融橘颠云薄艺木薯慰遵不太颜摩历膛友匹车膝僻僵箭互箱瓦稼少稿中稻贝靠蝴见午踪手毛气踩长仁什片仆踏仇影仍瞎暴爪反介父瞒今凶霉乏公震醉醋飘樱槽丹匀撤播勾文撒慧缩骡翠谱蜜慢户漏心演引丑巴滴队办以漫予劝双书漆熄遮示末膏击打疑鲜扑扒膀扔去甘世膜节本魄鼻僚左算右石舞龙平锻锹赚蝇北占蜻旧帅嗽裳需磁酸遭榜叮电号田模蔑只蔽聚叼叫摔境叹四截失墙碧缠缝障仙辟殿群谨塞誉慎乎丛令用滩印滚溪匆册滔源处冬鸟满包饥主煌立闪兰半煤慈塑煎宁穴它粮写让意训韵议廉记永司尼民出解触腿加腹皮遥愈孕微对台矛像母傻催式筹锯键寺吉锦考托老锤锡圾扩错地置蜂蛾跟跪跳暗朽暖机权愚臣再鄙睡压鉴在有百龄督输匠夸雹零达雷死碰夹酬邪划迈毕概此贞槐尘想禁光当献吐蒸虫曲团同蓄蓬因吸吗屿蓝鹊回岂勤则蒜网年摊先丢搬竹迁乔伟摆塌搏摸肆伏优伐延瑞编嫂价份华絮隙疏粥谦谣向裕后行舟遍窝割合愉愧众慌溉创肌朵杂滋渡旨渴各名多温湿壮冲曾庄庆亦粪齐普次羡产善蛮妄装问闯馋然猴腔灯脾汗释番池艇忙兴宇守宅御街焦集许堡农讽筝筋寻那迅尽筒筛等阵稀收剩鹅毯奸智妇好短妈戏锐锈销链黑纤级喘蛛驰遗跑弄跌践喊晶最远赏运敞抚悲技坏扰拒暂殖硬厦走厨坝贡攻赤惑惠扮棚孝棉棍棵坟椅葵辜葱董散志扭欺期把报斯搅芽搂搁搜苍芳严揪博堤超趋杠越搭替杏极琴杨绿更骑豆续绪绩颈婚蛋还敢逮连步坚旱谎呈时吴助县里呆园谋密寄寇足惨男困吵惕员听惧悼情梁吼别岗帐婆针钉告我乱利深秀私每淡估体何但液渐渠伶佣低你住位淹身淋佛添彻役返余希清兽剪粒粗望竟章肠鹿康廊痕角痒减卵岛馆猛饮猫脸脖脚领悉床库疗应盒斜盘衔停冶您闲间偷判偶灿弟汪偿汽袋泛笛笼沈沉怀笨快完宋宏犁究甜铲铜证崭崖补初社识诉患唱累君蛇即啄晚啦迟野改悬忌眼陆阿陈阻附眯妖匙堂虚劲鸡驱纯辆纳纲辅纵袭票纹纺驴纽奉玩副救青梳梅梢规梦拢拔菜担坦押萝拐萌基者控拆掏抵掀势抱垃推掉拌幸排掩域拨择抬堵取理若茂继娘娱屑直展剥谊谈谅杯柜冤课松枪构杰祥袖扇诸画卧事刺请案卖宰码宾奔家奋宽悦垄悔轰悄悟斩轮软浪非叔肯齿些润浮肾浴海浩消涉味昆酒浙递烛烧昂兼瓶畜旅呼鸣部呢岸竞帖罗帜岭剖败资购效钓制知脊座准乖衰浆桨恋胸佳侍供颂爱版爹拿舰凭徐佩徒躬射迫臭欣征倦爬候径俱倘金命倒爸倾借笑秩积敌造氧缺肿胀钻钳钱峰胁周罢恩兔狐哭晃备眠晒饲变京享店党庙紧底剂较废净盲轿刻育原闹郑券卷破翅配栗炎逗速根核桃河沾株油泊沿桐注档桂框真恶获泽治荷性莲恭耻学宝宗定挨捡宙官空帘都试捐埋肩房捏捎盐起赶诞载该详建栽录匪盏顽蚕素弦班耗耕陕统限妹姑姐绝始驾络给绘练骄绕绑织勇贺驼绍经姻姥院陡珍玻毒昼屋封既项垮挎垦说误赴赵祝祖括拴扁挑语冠穿挤突宫室挥宣举甚革恨巷恼恰浑洲洋茫济荣染派洞药标枯浇洪相查柏柳柱洁剃炮要总威歪研逆类美砌养面差耍阁阀殃闻帝皆姿战点疤疫疯省疮尝迹亮亭哀显奖冒映星弯畏饼饶急怨虹虾蚁思蚂贸狠咽狱哗狡胞哈咬咳哪炭峡罚贱胜盆逃叙钢钥钩卸缸律追矩怎侵泉俘俗顺种秋科贷复竿便妥段二香蠢保促侮人秒八信疆儿鬼颤了攀警待拜力须钟剑钞食骨干士覆胖寸勉狭狮独小骂繁蹈个霜避懒饺亡糕门辨己眨已度膨庭削竖也临飞亲王鸦嘴轻残牵耐天薪五燕送厘劈前首支咸懂犬尤巨栏艘栋洒柄浊屯测切活胡止故荡黎冈墨嘱津恒蝶草化币斤氏挪按勿橡横挣鞋客聪指凤袄挺神趣六诱挠诵城退持挂撕方帮眉凳熊险斗娃嫩姨订察计认驻漂终怠柔垒熔精竭腐组刊未敲裹馒绞降巧孟膊泰珠古屈刷届布隶灭肃捕振询轧视乙蜘诚诗捉捆郎卡实哲蜡审业挽热恐壶且弊耽怜怕莫怖泼旦波沸泥泳泻泡泪桥泄愿校法样目索酷沫甲榨炊炒暮兄嘉撇璃付套嫁烈殊顾放郊代毙致白桌福仔府夜瓜甩晓粱狗滨溜句哨忽鱼犯滥唉昏外圆贼漠市股朋汁铃铅汇头酱牺辽乘奴腾召念腥贪边秘幼毁签笋债受值倚采矮执锣倡巩俯扫往罪扬的场耳遣侨路舱般亚跨照芝盟朴过协脂睬西厌存灰碌碑轨留皱赖楼和尖刮吓吊帆牧垂症岁刚肉摇图离唐携传站鼓岩咏乒乓摄魂件固缘骗料益典缎烘烦登伙屡属涛似涝全果具旺尚涂窗会流虎富浸慨烫涌转顷兆爷害态伞宵宴厕窄危湾雨滑争港焰衣袜枕袍被述板谁阔析童痛充茎闭茄关范米陵州陷陪江苗安储难傍讲绢绣验牌傅访导其策披筐捷招拦阳程拘授教稍掠阶如她羽据掘锅拍著勒锄拖锁菌欢买菊萍红营械约表喂检喝梯桶武环巡戚爽聋景遇雪驳戒喷雀努常量晨睁妙际张局吞尿暑距跃略灵译词诊晴掌启崇圈违扶银辉梨牢扯折均沟投抗植做沃坊葡葛葬壳联弃偏块声揉序船握冷劫花芹彩亩芦喜劳脱象够苏猪猎系趁杜材绸条丽辰隐犹狂隆庸否盗随肝商屠旋来率着旷串吩含断俩谷惜吧财伸淘作混歇渔灌兵秃俭适渗呜皇几牲邻看鞭邮惯吨工才燥与品盯千谜岔虽川弹及胃么广励婶趴医将两尸哑维绵盼是李斑村邀堪迎塔馅篮无猜提元言厚冻叛状芬煮援迷欲况鸽这砖却得额潮忘惹糊灶炸区敬抖树牙南篇棒棋洗森日荒茧浓没牛棕升带逼踢址移确仅题仓挖找风蕉增撞撑挡政型唯费尾妨忍纱为盛进孩形麦寿除寨纪蜓尺孔允幻幅帽旗端菠铸铺萄结抽细职艰锋豪顶接防阴培骆拉姓税孤孙艳描异捧答苦承貌球苹术可桑预能厉稳惩字话衫归颗怪禽格酿弱鲁猾剧炕申恳茅就辱慕唇另丧摘生摧禾冰读闸湖渣色仗负枣矿旬叠顿仪柴欧惰监斥饰鸭寒晌窜晕贤国昌裤蚊服务自畅肢肺伪明讨礼仰必易烤缓讯粉肤羞贫伍忠休填秤称鼠笔贩舌疲搞简朱疼疾病乳刑幕吃愁辞斧早舍楚秆师榆彼至饿倍罩健狼碎息碗狸列货共侧页而航脏睛途委脆翁侦侄伯责罐厂胶籍夺嚼近坐惭选吹碍感粘盾所劣很扛动惊蒙宿脉辫盖山歼界凯鞠透纠躲圣擦旁缴秧壁蚀删麻拳昨束任弓伤仿哄数饭女背叉施血醒谢专扎揭姜虏插到杀操饱妻他企裁愤炼厅毅嫌逐游沙烂柿丘躺道础比敏洽椒内符决调水抢林抓忧榴羊雁歌炉哥陶叶浅腊某批宜英从换分损衬汤觉雄宪欠奥拼蔬坛军拾傲设筑功正坡堆拥穷趟观线评火辣拣赔纷纸歉玉驶喉春奏现忆架怒蛙贯啊娇重抹露伴赌喇瘦层胳皂灾探参论雾依嗓垫窃辈质箩俊季居捞循月裂扣亏贴翼并荐窑由史枝恢央席墓物塘茶祸第刘凉夏族舅单朝凡肚腰落咐绳护容凑们求款奇强辛烟默乐铁音赛砍贿整誓杆滤绒芒良习涨紫假躁入览脑闷管逝响痰毫特奶阅免熟租高晋抄发丝咱交悠坑尊雅克霸贵德围修黄汉或呀逢胆售例朗使通抛肥静丙乌裙虑舒稠成隔潜唤龟叨镇盈新污';
    // result[key] = str.substr(Math.floor((Math.random() * 2500)), Math.floor(json[key].length / 3) + 1);
  }
  // return res.send(JSON.stringify(result));
  Promise.all(promise).then(data => {
    console.log(data);
    res.send(JSON.stringify(result));
  }, err => {
    res.send(JSON.stringify(result));
    console.log(err);
  })
});

// app.use('/', function(req, res, next) {
//   // var lang = getLang(req.headers);
//   // res.sendFile(path.join(__dirname, '/public/i18n-template', lang + '-index2.html'));
// });

app.listen(4000, () => {
  console.log(`App listening at port 4000`)
})