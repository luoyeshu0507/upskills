- 触发线定义
    - 上触发线：距离滑动区域的顶部15%
    - 下触发线：距离滑动区域的顶部45%
  - 自动播放逻辑
    - 同一时间只有一个卡在播放，即按照触发线规则，触发了某张卡，某张卡播放，上一个播放的卡片即停止
    - 上滑
      - 载入页面后，未产生滑动时，第一张卡片开始播放
      - 开始往下滑动时，播放第二个卡片，直到第三个卡片顶部触发了上触发线，再播放第三个卡片
      - 左部卡
        - 卡顶部与下触发线（45%）相触开始播放
      - 右部卡
        - 卡顶部与上部线（15%）相触开始播放
    - 下滑
      - 右部卡
        - 左部卡顶部与下触发线（45%）相触，开始播放上一行的右部卡
      - 左部卡
        - 左部卡卡顶部与上部线（15%）相触，开始播放同一行的左部卡
      - 回到顶部，播放第一张卡片