var emojis = {
	'微笑': 'smile',
	'哭': 'cry',
	'哈哈': 'laugh',
	'跳跃': 'jump'
};

var str = '今天天气不错[微笑]，就是地铁好挤啊[哭][哭][哭][没有这个表情][跳跃]。';
str = str.replace(/\[(.*?)\]/g, function(match, a) {
	return emojis[a] && ('<img src="http://www.luoyeshu.com/'+ emojis[a] +'"></img>') || match;
});

console.log(str);