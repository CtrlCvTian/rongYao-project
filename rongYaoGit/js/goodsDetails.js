//商品列表页的部分
define(["shopNum_ballMove", "parabola", "indexHeader", "indexTab", "indexBottom", "jquery", "jquery-cookie"], function(shopNum_ballMove, parabola, indexHeader, indexTab, indexBottom, $){
	function goodsDetails(){
		$(function(){
			//计算购物数量
			shopNum_ballMove.shop_num($("#cart-totals"));
			shopNum_ballMove.shop_num($("#cart-total"));
			//头部JS代码
			indexHeader.indexHeader();
			//下拉选项卡代码
			indexTab.indexTab();
			//底部代码
			indexBottom.indexBottom();
			$.ajax({
				type: "GET",
				url: "../data/product-details.json",
				success: function(data){
					var href = window.location.href;//http://localhost:8080/html/goodsDetails.html?id=0&type=0
					var start = href.indexOf("?");
					var end = href.indexOf("&");
					var ids = href.substring(start + 1, end).split("=")[1];
					var type = href.substring(end).split("=")[1];
					for(i = 0; i < data.length; i++){
						var obj = data[i];
						if(ids == obj.id){
							for(j = 0; j < obj.listItems.length; j++){
								$(`<li class="product-listItems">
									<a class="listItems" href="">
									<img src="${obj.listItems[j]}" alt=""></a></li>`).appendTo($(".product-listItem"));
							}
							$(`<div class="small">
								<div class="s-pic">
									<img src="${obj.img}" alt="">
								</div>
								<!-- 遮罩层 -->
								<div id="mask"></div>
							</div>`).insertBefore($(".product-listImg"));
							$(`<div class="b-pic">
								<img src="../images/details-V20-1.png" alt="">
							</div>`).appendTo($(".big"));
							$(`<p id="pro-name">${obj.proName}</p>
								<div class="product-slogan">
									<span class="product-slogan-link">购机享多重权益，稀缺现货，欲购从速</span>
									<span>${obj.character}</span>
								</div>`).appendTo($(".product-meta"));
							$(`<div id="p-price"><span>￥${obj.price}</span></div>`).appendTo($(".product-price"));
							//选择颜色
							for(var color in obj.color){
								var colors = obj.color;
								var colName = colors[color].substring(0, 3);
								var colImg = colors[color].substring(3);
								$(`<li>
									<div class="sku"><a class="sku-color"><img src="${colImg}" alt=""><p><span>${colName}</span></p></a></div>
								</li>`).appendTo($(".pro-color"));
							}
							//选择版本
							for(var size in obj.size){
								$(`<li>
										<div class="sku"><a class="sku-size"><p><span>${obj.size[size]}</span></p></a></div>
									</li>`).appendTo($(".pro-size"));
							}
							//创建按钮
							$(`<span class="pro-join" id="${obj.id}">加入购物车</span>
								<span class="pro-buy id="${obj.id}">立即下单</span>`).appendTo(".product-button");
						}
						if(i == data.length - 1){
							$(`<p class="classify">${data[i][type]}</p>`).appendTo($(".buy-top"));
						}
					}
				},
				error: function(msg){
					console.log(msg);
				}
			})
			// 放大镜效果
			// 移到小图片的时候
			$(".product-magnify").on("mouseenter", ".small", function(){
				//让其显示
				$(this).find("#mask").show();
				$(".big").show();
			})
			//移出的时候
			$(".product-magnify").on("mouseleave", ".small", function(){
				//让其显示
				$(this).find("#mask").hide();
				$(".big").hide();
			})
			//控制遮罩层的位置
			$(".product-magnify").on("mousemove", ".small", function(ev){
				var l = ev.pageX - $(this).offset().left - 100;
				var t = ev.pageY - $(this).offset().top - 50;
				//控制出界
				if(l <= 0){
					l = 0;
				}
				if(l >= $(this).outerWidth() - $("#mask").outerWidth()){
					l = $(this).outerWidth() - $("#mask").outerWidth();
				}
				if(t <= 0){
					t = 0;
				}
				if(t >= $(this).outerHeight() - $("#mask").outerHeight()){
					t = $(this).outerHeight() - $("#mask").outerHeight();
				}
				$("#mask").css({
					left: l,
					top: t
				})
				//实时移动大图片的位置
				$(".b-pic").css({
					left: - l * 2,
					top: - t * 2
				})
			})
			//移入到整个左边下面列表小图片
			$(".product-magnify").on("mouseenter", ".listItems", function(){
				$(".listItems").removeClass("current");
				$(this).addClass("current");
				//更改大图片和移入的图片
				var src = $(this).find("img").attr("src");//../images/details-V20-4.1.jpg
				console.log(src.substring(0, 23) + src.substring(25));
				//改变移入小图片的img
				$(".small").find("img").attr("src", src.substring(0, 23) + src.substring(25));
				//改变移入大图片的img
				$(".big").find("img").attr("src", src.substring(0, 23) + src.substring(25));
			})
			var flag1 = false;
			var flag2 = false;
			//点击选择颜色和版本改变border
			$(".pro-color").on("click", ".sku-color", function(ev){
				$(".pro-skus .sku-color").removeClass("current");
				$(this).addClass("current");
				//先清除原先的内容
				$(".product-selected").html("");
				//选择商品内容的变化  判断哪个是被点击了
				$(".product-selected").html($(this).find("p span").html());
				flag1 = true;
			})
			$(".pro-size").on("click", ".sku-size", function(){
				$(".pro-skus .sku-size").removeClass("current");
				$(this).addClass("current");
				//先清除原先的内容
				// $(".product-selected").html("");
				//选择商品内容的变化  判断哪个是被点击了
				if($(".product-selected").html().length == 3){
					var original = $(".product-selected").html();
					$(".product-selected").html(original  + $(this).find("p span").html());
				}else{
					original = $(".product-selected").html().substring(0, 3);
					$(".product-selected").html(original + $(this).find("p span").html());
				}
				//头部信息随时改变
				if($("#pro-name").html().length == 30){
					var originalPro = $("#pro-name").html();
					$("#pro-name").html(originalPro + $(".product-selected").html())
				}else{
					originalPro = $("#pro-name").html().substring(0 , 30);
					$("#pro-name").html(originalPro + $(".product-selected").html())
				}
				flag2 = true;
			})
			//两个点击的按钮可以点击
			$(".product-back").click(function(){
				//移动位置 先判断当前位置是不是第一个
				if($(".product-Imgs ul").position().left == 0){
					alert("已经是第一个了");
					return false;
				}else{
					$(".product-Imgs ul").animate({
						"left": $(".product-Imgs ul").position().left + 73
					},100);
				}
			})
			$(".product-next").click(function(){
				//移动位置 先判断当前位置是不是最后一个
				if($(".product-Imgs ul").position().left == -146){
					alert("已经是最后一个了");
					return false;
				}else{
					$(".product-Imgs ul").animate({
						"left": $(".product-Imgs ul").position().left - 73
					},100);
				}
			})
			// 点击加减实现功能
			// 减
			$(".stock-minus").click(function(){
				//改变input框中的值
				//先判断值是不是1
				var iVal = $("#pro-quantity").val();
				if(iVal == 1){
					alert("不能再进行减了");
					return false;
				}else{
					iVal--;
					$("#pro-quantity").val(iVal);
				}
			})
			// 加
			$(".stock-plus").click(function(){
				//改变input框中的值
				var iVal = $("#pro-quantity").val();
				iVal++;
				$("#pro-quantity").val(iVal);
			})
			//加入购物车操作
			$(".product-button").on("click", ".pro-join", function(){
				if(!(flag1 && flag2)){
					alert("请先选择类型再进行购买");
					return false;
				}else{
					$(".minicart-goods-list").html("");
					shopNum_ballMove.ballMove($(this));
					// 1、是不是第一次添加商品 是就为true
					//取出当前商品的id和数量,介绍
					var ids = this.id;
					var nums = parseInt($("#pro-quantity").val());
					var introduce = $("#pro-name").html();
					var first = $.cookie("projects") == null ? true : false;
					if(first){
						//直接设置cookie
						var arr = [{id: ids, num: nums, desc: introduce}];
						$.cookie("projects", JSON.stringify(arr), {
							expries: 7
						})
					}else{
						//判断之前加没加过这种商品
						var cookieStr = $.cookie("projects");
						var cookieArr = eval(cookieStr);
						var isSame = false; //之前没有添加过
						//遍历改变数量
						for(var i = 0; i < cookieArr.length; i++){
							if(cookieArr[i].id == ids){
								//改变数量
								cookieArr[i].num = parseInt(cookieArr[i].num) + nums;
								isSame = true;
								console.log($.cookie("projects"));
								break;
							}
						}
						//之前没有添加过
						if(!isSame){
							var obj = {id: ids, num: nums, desc: introduce};
							cookieArr.push(obj);
						}
						//重新存储在cookie中
						$.cookie("projects", JSON.stringify(cookieArr), {
							expries: 7
						})
					}
					//计算购物数量
					shopNum_ballMove.shop_num($("#cart-totals"));
					shopNum_ballMove.shop_num($("#cart-total"));
				}		
			})
		})
	}
	return {
		goodsDetails: goodsDetails
	}
})