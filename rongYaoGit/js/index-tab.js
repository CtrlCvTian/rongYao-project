//首页选项卡加载数据
define(["jquery", "jquery-cookie"], function($){
	function indexTab(){
		// 搜索框
		$(".navBox nav input[type=text]").focus(function(){
			$(".navBox nav .other").hide();
		})
		$(".navBox nav input[type=text]").blur(function(){
			$(".navBox nav .other").show();
		})
		var currentIndex = 0;
		//移入商品列表
		$(".navBox .product>li").mouseenter(function(){
			//记录划过的是哪个
			var _this = $(this).index();
			$.ajax({
				type: "GET",
				url: "../data/header.json",
				data: `type=${_this}`,
				success: function(arr){
					//移入先将之前的内容清空
					$(".product-wraps .product-wrap .prolist").html("");
					for(var i = 0; i < arr.length; i++){
						var obj = arr[i];
						if(obj.type == _this){
							$( `<li class="pro-items"><a href="" class="thumb">
								<p class="pro-pic"><img src="${obj.img}" alt=""></p>
								<div class="pro-title">${obj.name}</div>
								<div class="pro-price">${obj.price}</div>
								</a></li>`).appendTo($(".product-wraps .product-wrap").eq(_this).find(".prolist"));
							}
					}
				},
				error: function(msg){
					alert(msg);
				}
			})
			//改变层级
			currentIndex++;
			$(this).find("a").addClass("p-hover");
			//将大的进行动画显示
			$(".product-details").stop().slideDown(200);
			$(".product-details .product-wraps .product-wrap").eq($(this).index()).
			css("zIndex",currentIndex);
		})
		//移出商品列表
		$(".navBox .product>li").mouseleave(function(){
			//记录划过的是哪个
			var _this = $(this).find("a");
			//移入详细的商品
			$(".navBox .product-details").mouseenter(function(){
				//将商品列表的样式保留
				$(".navBox .product li").find("a").removeClass("p-hover");
				_this.addClass("p-hover");
			})
			//移出商品列表
			$(".navBox .product").mouseleave(function(){
				//将详细的商品的z-index设置为0
				currentIndex = 0;
				$(".navBox .product-details .product-wraps .product-wrap")
				.css("zIndex",0);
				$(".product-details").hide();
				//移入详细的商品
				$(".navBox .product-details").mouseenter(function(){
					//将商品列表的样式保留
					$(".navBox .product>li").find("a").removeClass("p-hover");
					_this.addClass("p-hover");
				})
			})
			$(this).find("a").removeClass("p-hover");
		})
		//在下拉菜单移出
		$(".navBox .product-details").mouseleave(function(){
			//将详细的商品隐藏
			$(".product-details").hide();
			currentIndex = 0;
			$(".navBox .product>li").find("a").removeClass("p-hover");
		})
		/*详细的手机列表*/
		$(".navBox .product-details .product-wraps .product-wrap .product-title .p-t-2 .series-pro .series-items").
		hover(function(){
			$(this).css({
				color: "#00b5e2"
			})
		},function(){
			$(this).css({
				color: "#717171"
			})
		})
		$(".navBox .product-details .product-title .p-t-1 a").hover(function(){
			$(this).css({
				color: "#00b5e2"
			})
		},function(){
			$(this).css({
				color: "black"
			})
		})
		//事件委托绑定事件
		$(".prolist").on("mouseover", ".pro-items", function(){
			$(this).find(".pro-title").css({
				color: "#00b5e2"
			})
		})
		$(".prolist").on("mouseout", ".pro-items", function(){
			$(this).find(".pro-title").css({
				color: "black"
			})
		})
	}
	return {
		indexTab: indexTab
	}
})