//底部图片的更换
define(["jquery", "jquery-cookie"], function($){
	function indexBottom(){
		$(".bottomBox .service .f1-r .weixin").hover(function(){
			$(this).find(".wei-pic").show();
			$(this).css("backgroundPosition","-331px -171px");
		},function(){
			$(this).find(".wei-pic").hide();
			$(this).css("backgroundPosition","-355px -171px");
		})
		$(".bottomBox .service .f1-r .toutiao").hover(function(){
			$(this).css("backgroundPosition","-379px -171px");
		},function(){
			$(this).css("backgroundPosition","-403px -171px");
		})
		$(".bottomBox .service .f1-r .weibo").hover(function(){
			$(this).css("backgroundPosition","-426px -171px");
		},function(){
			$(this).css("backgroundPosition","-450px -171px");
		})
		$(".bottomBox .service .f1-r .huawei").hover(function(){
			$(this).css("backgroundPosition","-476px -171px");
		},function(){
			$(this).css("backgroundPosition","-500px -171px");
		})
	}
	return {
		indexBottom: indexBottom
	}
})