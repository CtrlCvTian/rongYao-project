//注册页的部分
define(["jquery"], function($){
	function regist(){
		$(function(){
			var flag1 = false;
			var flag2 = false;
			var flag3 = false;
			var flag4 = false;
			//选项卡操作
			$(".reg-tab").find("a").click(function(){
				var _this = $(this).index();
				$(".reg-tab").find("a").removeAttr("blo");
				$(this).attr("blo", "current");
				$(".reg-details > div").hide().eq(_this).show();
			})
			//判断验证
			//手机号验证
			$("#phone").blur(function(){
				var pVal = $(this).val();
				var ridVal = pVal.replace(/ /g, "");
				$(this).val(ridVal);
				pVal = ridVal;
				if(pVal == null || pVal == ""){
					return false;
					flag1 = false;
				}else if(!/^1\d{10}$/.test(pVal)){
					$("#phoneTitle").show();
					$(this).closest(".input-container").css("border", "1px solid #b40707");
					flag1 = false;
				}else{
					flag1 = true;
				}
			})
			$("#phone").focus(function(){
				$("#phoneTitle").hide();
				$(this).closest(".input-container").css("border", "1px solid #d9d9d9");
			})
			//密码判断
			$("#password").blur(function(){
				var pVal = $(this).val();
				var ridVal = pVal.replace(/ /g, "");
				$(this).val(ridVal);
				pVal = ridVal;
				if(pVal == null || pVal == ""){
					return false;
					flag2 = false;
				}else if(pVal.length < 6 || pVal.length > 18){
					$("#pwdTitle").show();
					$("#pwdTitle").html("密码长度为6-18位");
					$(this).closest(".input-container").css("border", "1px solid #b40707");
					flag2 = false;
				}else if(!/(?!^(\d+|[a-zA-Z]+|[~.!@#$%^&*?]+)$)^[\w~.!@#$%^&*?]{6,18}$/.test(pVal)){
					$("#pwdTitle").show();
					$("#pwdTitle").html("至少包含字母、数字、符号中的2种");
					$(this).closest(".input-container").css("border", "1px solid #b40707");
					flag2 = false;
				}else{
					flag2 = true;
				}
			})
			$("#password").focus(function(){
				$("#pwdTitle").hide();
				$(this).closest(".input-container").css("border", "1px solid #d9d9d9");
			})
			//确认密码
			$("#confirmPwd").blur(function(){
				//拿到密码框输入的密码
				var pwdVal = $("#password").val();
				var pVal = $(this).val();
				var ridVal = pVal.replace(/ /g, "");
				$(this).val(ridVal);
				pVal = ridVal;
				if(pVal == null || pVal == ""){
					return false;
					flag3 = false;
				}else if(pwdVal != pVal){
					$("#conTitle").show();
					$(this).closest(".input-container").css("border", "1px solid #b40707");
					flag3 = false;
				}else{
					flag3 = true;
				}
			})
			$("#confirmPwd").focus(function(){
				$("#conTitle").hide();
				$(this).closest(".input-container").css("border", "1px solid #d9d9d9");
			})
			//判断邮件地址
			$("#email").blur(function(){
				var pVal = $(this).val();
				var ridVal = pVal.replace(/ /g, "");
				$(this).val(ridVal);
				pVal = ridVal;
				if(pVal == null || pVal == ""){
					return false;
					flag4 = false;
				}else if(pVal.length < 4 || pVal.length > 50){
					$("#emailTitle").show();
					$("#emailTitle").html("华为帐号限制在4~50个字符");
					$(this).closest(".input-container").css("border", "1px solid #b40707");
					flag4 = false;
				}else if(!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(pVal)){
					console.log(/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(pVal));
					$("#emailTitle").show();
					$("#emailTitle").html("对不起，您输入的电子邮箱错误");
					$(this).closest(".input-container").css("border", "1px solid #b40707");
					flag4 = false;
				}else{
					flag4 = true;
				}
			})
			$("#email").focus(function(){
				$("#emailTitle").hide();
				$(this).closest(".input-container").css("border", "1px solid #d9d9d9");
			})
			//判断能否进行注册
			$("#btnSubmit").click(function(){
				if(!(flag1 && flag2 && flag3 && flag4)){
					alert("请完善信息再进行注册");
					return false;
				}else{
					// 进行注册
					var phoneVal = $("#phone").val();
					var pwdVal = $("#password").val();
					var emaVal = $("#email").val();
					var data = {phone: phoneVal, password: pwdVal, email: emaVal};
					// console.log(data);
					$.ajax({
						type: "POST",
						url: "../php/regist.php",
						data: data,
						success: function(data){
							if(data == "注册成功，3s后跳转登录页面"){
								alert(data);
								setTimeout(function(){
									location.href = "../html/login.html";
								}, 3000)
							}else{
								alert(data);
							}
						},
						error: function(error){
							console.log(error);
						}
					})
				}
			})
		})
	}
	return{
		regist: regist
	}
})