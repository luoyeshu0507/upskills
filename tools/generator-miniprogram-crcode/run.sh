#!/bin/bash

# SDK AppID  wx35812b6cadc9fa06
# App Key 50b37d0e1138c136dd2ec2e264a03338
# curl "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx35812b6cadc9fa06&secret=50b37d0e1138c136dd2ec2e264a03338"

# 通过上面一行获取 存下来 有效期7200s 不要频繁请求
accessToken="55_WAmoIRuSHwA0s6k3eqGXtQZhoUJTqaDH5NYWmBQFhIIFHckhacG0Z5JYzJ0mQAb85XYPGPDMmd1E27BvAkcYbeqjGye669qhRKXMARZExuLVim5Jz5a5xx52GXtWcfiM4ewjwSYTsNnXhu9BPTPeACATXT"

# 扫码进入的小程序页面路径，最大长度 128 字节，不能为空；对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"，即可在 wx.getLaunchOptionsSync 接口中的 query 参数获取到 {foo:"bar"}
path=pages/home/home?activity=covid

# 要打开的小程序版本。正式版为 release，体验版为 trial，开发版为 develop
env_version=release

# 二维码的宽度，单位 px。最小 280px，最大 1280px
width=430

# 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
auto_color=false

# auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
line_color=

# 是否需要透明底色，为 true 时，生成透明底色的小程序码
is_hyaline=false

# output 图片输出路径 默认当前
output=./

url="https://api.weixin.qq.com/wxa/getwxacode?access_token=${accessToken}"
json={\"path\":\"${path}\",\"env_version\":\"${env_version}\",\"width\":${width},\"auto_color\":${auto_color:-false},\"line_color\":${line_color:-\{\}},\"is_hyaline\":${is_hyaline:-false}}

echo $url
echo $json
curl -X POST $url -d $json -o $output/crcode.png




