function DOMContentLoaded() {
  document.getElementById('J_IdleHeader').innerHTML = `
    <h1 class="idle-logo"><a href="http://2.taobao.com" target="_top"><img src="//img.alicdn.com/tps/i3/TB1ys1sHVXXXXcrXVXXL_ZfHFXX-208-46.png" alt="闲鱼" width="208" height="46"></a></h1>

    <div class="idle-nav">
      <div class="idle-menu">
        <ul>
          <li class="m-home active"><a href="//2.taobao.com/">首页</a></li>
          <li class="m-app"><a href="//2.taobao.com/app/index">手机二手</a></li>
          <li><a href="//www.taobao.com/markets/paimai/usedcar">二手车估价</a></li>
          <li class="m-auction"><a href="//2.taobao.com/auction/list">降降降</a></li>
        </ul>
      </div>

      <div class="idle-manage">
        <span class="idle-manage-sp">|</span>
        <ul>
          <li><a class="pub-overlay-btn">发布闲置</a></li>
          <li id="J_IdleLi" class="my-idle-li">
            <a class="my-idle-link" id="J_IdleLink" href="//trade.2.taobao.com">我的闲置<i class="iconfont icon-down"></i><i class="iconfont icon-up"></i></a>
         </li>
        </ul>
      </div>
    </div>

    <div class="idle-search">
      <form method="get" action="//s.2.taobao.com/list/list.htm" name="search" target="_top">
        <input class="input-search" id="J_HeaderSearchQuery" name="q" type="text" value="" placeholder="搜闲鱼" />
        <input type="hidden" name="search_type" value="item" autocomplete="off" />
        <input type="hidden" name="app" value="shopsearch" autocomplete="off" />
        <button class="btn-search" type="submit"><i class="iconfont">&#xe602;</i><span class="search-img"></span></button>
      </form>
    </div>
  `;
  
}
window.onload = DOMContentLoaded;
