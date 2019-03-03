console.log("找回密码页面加载完成");
//配置文件
require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"ignore": "ignore"
	}
})
//调用代码
require(["ignore"], function(ignore){
	ignore.ignore();
})