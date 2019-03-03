//找回密码部分
define(["jquery"], function($){
	function ignore(){
		$(function(){
			var flag2 = false;
			var flag3 = false;
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
			//点击进行找回密码的时候 直接重设密码
			$("#btnSubmit").click(function(){
			if(!(flag2 && flag3)){
				alert("请完善信息再进行找回密码");
			}else{
				var phEmailVal = $("#phEmail").val();
				var pwdVal = $("#password").val();
				var data = {username: phEmailVal, password: pwdVal};
				$.ajax({
					type: "POST",
					url: "../php/modify.php",
					data: data,
					success: function(data){
						if(data == "修改成功，3s后跳转登录页面"){
							alert(data);
							setTimeout(function(){
								location.href = "../html/login.html";
							}, 3000);
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
	return {
		ignore: ignore
	}
})