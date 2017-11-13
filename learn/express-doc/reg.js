let str = "条码代表在年度累积用量（@@CURRENCY@@）的基础上 ABC 分类数量变更条码代表在年度累积用量（@@CURRENCY_CODE@@）的基础上 ABC 分类数量变更条码代表在年度累积用量（@@CURRENCY@@）的基础上 ABC 分类数量变更";
var result = str.replace(/@x@(\w+)@@/g, function(match, catch1) {
  return catch1;
});
console.log(result);