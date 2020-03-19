var text = `answer: prefix + "这个很贵很贵的，<a href='https://www.awesomes.cn/repo/we-plugin/we-cropper' target='_blank'>我本来就是个link</a>;再来一个高亮的网站1：'<em class='highlight'>h</em><em class='highlight'>t</em><em class='highlight'>t</em><em class='highlight'>p</em>://<em class='highlight'>w</em><em class='highlight'>w</em><em class='highlight'>w</em>.<em class='highlight'>baidu</em>.<em class='highlight'>c</em><em class='highlight'>o</em><em class='highlight'>m</em>/1234abcd<em class='highlight'>def111</em>/%2334234/test.<em class='highlight'>gif</em>?param1=<em class='highlight'>23423</em>&amp;param2=<em class='highlight'>4567</em>';一个链接如：<em class='highlight'>https</em>://www.2222.com/aa?a=1&b=2说样文色'<em class='highlight'>https</em>://www.2345.<em class='highlight'>com</em>/'加质可精百。做问都体 #乐悠悠<em class='highlight'>旅行十日游</em>乐悠悠旅行十日游十日游乐悠悠旅行十日游；最后是一张图片：<img src='https://thirdqq.qlogo.cn/g?b=oidb&k=ovPzSdYSic5JGkdJ6PlPGKw&s=100&t=1555897928&t=1569768082'>"//.substr(300, Math.round(Math.random() * 800))`;


var match = text.match(/(<em class='highlight'>)?h(<em class='highlight'>|<\/em>){0,2}t(<em class='highlight'>|<\/em>){0,2}t(<em class='highlight'>|<\/em>){0,2}/g);
var highlightWords = text.match(/<em class='highlight'>.*?<\/em>/g);
var mapTemp = {};
var highlightWordsArr = [];
highlightWords && highlightWords.forEach(function(item) {
  var key = item.match(/<em class='highlight'>(.*?)<\/em>/)[1];
  if (!mapTemp[key]) {
    mapTemp[key] = true;
    highlightWordsArr.push(key);
  }
})
console.log(highlightWordsArr);
