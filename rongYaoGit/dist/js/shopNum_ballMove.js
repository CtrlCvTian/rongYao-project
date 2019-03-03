//实时刷新购物车数量和抛物线运动
define(["parabola", "jquery", "jquery-cookie"], function(parabola, $){
	//改变购物车上的数量
	function shop_num(node){
		$(function(){
			var cookieStr = $.cookie("projects");
			if(cookieStr){
				var cookieArr = eval(cookieStr);
				var sum = 0;
				for(var i = 0; i < cookieArr.length; i++){
					sum += cookieArr[i].num;
				}
				//页面上显示
				node.html(sum);
			}else{
				node.html(0);
			}
		})
	}
	//小球进行抛物线运动
	function ballMove(node){
		$(function(){
			//node是点击的按钮
			//将小球移动到按钮的位置
			$("#ball").css({
				display: "block",
				left: node.offset().left,
				top: node.offset().top
			})
			var offsetX = $(".shop-cart").offset().left - $("#ball").offset().left;
			var offsetY = $(".shop-cart").offset().top - $("#ball").offset().top;
			//创建抛物线对象 配置参数
			var bool = new Parabola({
				el: "#ball",
				targetEl: null,
				offset: [offsetX, offsetY],
				curvature: 0.0005,
				duration: 600,
				callback: function(){
					$("#ball").hide();
				}
			})
			bool.start();
		})
	}
	return{
		shop_num: shop_num,
		ballMove: ballMove
	}
})