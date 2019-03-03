console.log("登录页面加载完成");
//配置文件
require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"login": "login"
	}
})
//调用代码
require(["login"], function(login){
	login.login();
})