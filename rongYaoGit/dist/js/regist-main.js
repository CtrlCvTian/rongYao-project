console.log("注册页加载完成");
//配置文件
require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"regist": "regist"
	}
})
//调用代码
require(["regist"], function(regist){
	regist.regist();
})