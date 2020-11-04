const axios = require('axios');

async function getData() {
  const { data } = await axios.get('http://bbs.camgle.com/forum.php\?mod\=forumdisplay\&fid\=10\&orderby\=dateline\&orderby\=dateline\&filter\=author\&page\=1');
  console.log(typeof data);
  // return data.match(/\<th\sclass\=\"new.*\r.*href\=\"([^"]*)[^>]*>(.*)<\/a\>/img);
  // return data.match(/\<th\sclass\=\"new.*\r\n.*em/img);
  return data.match(/\<a\shref\=\"[^"]*\"\sonclick.*s\sxst\">(.*)\<\/a>/img);
}

getData().then(console.log, console.log);

// <th class="common">
//  <em>[<a href="forum.php?mod=forumdisplay&amp;fid=10&amp;filter=typeid&amp;typeid=6">出售</a>]</em> <a href="forum.php?mod=viewthread&amp;tid=781427&amp;extra=page%3D1%26filter%3Dauthor%26orderby%3Ddateline%26orderby%3Ddateline" onclick="atarget(this)" class="s xst">尼康镜头皮桶皮套镜头盅日本京东光学  78包邮</a>
// </th>
// <a href="forum.php?mod=viewthread&amp;tid=781425&amp;extra=page%3D1%26filter%3Dauthor%26orderby%3Ddateline%26orderby%3Ddateline" onclick="atarget(this)" class="s xst">美能达sr-1 55/1.8 套机268包邮非偏远</a>