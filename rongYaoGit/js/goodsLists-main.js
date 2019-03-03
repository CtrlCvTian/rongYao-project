console.log("商品列表页加载完成");
//配置文件
require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		"indexHeader": "index-header",
		"indexTab": "index-tab",
		"indexBottom": "index-bottom",
		"goodsLists": "goodsLists",
		"shopNum_ballMove": "shopNum_ballMove"
	},
	shim: {
		//配置hquery-cookie依赖于jquery
		"jquery-cookie": ["jquery"]
	}
})
//调用代码
require(["goodsLists"], function(goodsLists){
	goodsLists.goodsLists();
})