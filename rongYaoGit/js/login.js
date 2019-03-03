//登录页的部分
define(["jquery"], function($){
	function login(){
		$(function(){
			// 选项卡操作
			$(".h span").click(function(){
				var _this = $(this).index();
				$(".h span").removeClass("active");
				$(this).addClass("active");
				$(".twoLogin > div").hide();
				if(_this == 0){
					$(".twoLogin > div").eq(_this).show();
					$(".thirdLoginBlock").show();
				}else{
					$(".twoLogin > div").eq(_this).show();
					$(".thirdLoginBlock").hide();
				}
				
			})
			$("#btnLogin").click(function(){
				var oUser = $("#username").val();
				var oPwd = $("#password").val();
				var data = {username: oUser, password: oPwd};
				if(!(oUser && oPwd)){
					alert('请完善信息再进行登录');
				}else{
					$.ajax({
						type: "POST",
						url: "../php/login.php",
						data: data,
						success: function(data){
							if(data == "登录成功,3s后跳转"){
								alert(data);
								setTimeout(function(){
									location.href = "../html/index.html";
								}, 3000)
							}else{
								alert(data);
							}
						},
						error: function(msg){
							console.log(msg);
						}
					})
				}
			})
		})
	}
	return {
		login: login
	}
})