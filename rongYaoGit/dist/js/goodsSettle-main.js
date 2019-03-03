console.log("商品结算页加载完成");
//配置文件
require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		"indexHeader": "index-header",
		"indexTab": "index-tab",
		"indexBottom": "index-bottom",
		"parabola": "parabola",
		"goodsSettle": "goodsSettle",
		"shopNum_ballMove": "shopNum_ballMove"
	},
	shim: {
		//配置hquery-cookie依赖于jquery
		"jquery-cookie": ["jquery"],
		//声明不适用AMD规范的模块
		"parabola": {
			exports: "_"
		}
	}
})
//调用代码
require(["goodsSettle"], function(goodsSettle){
	goodsSettle.goodsSettle();
})