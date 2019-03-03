//首页的头部JS代码
define(["shopNum_ballMove", "jquery", "jquery-cookie"], function(shopNum_ballMove, $){
	function indexHeader(){
		// 头部
		// 客户服务下拉列表
		$(".ulRight").find('li').eq(3).mouseover(function(){
			$(this).find(".b").css("backgroundColor", "#fff");
		})
		$(".ulRight").find('li').eq(3).mouseout(function(){
			$(".ulRight li:eq(3) .b").mouseover(function(){
				$(this).css({
					backgroundColor: "#fff",
					display: "block"
				})
				$(".ulRight li:eq(3)").css("backgroundColor","#fff");
			})
		})
		$(".ulRight li:eq(3) .b").mouseout(function(){
			$(this).hide();
		})
		//头部导航共同的移入移出事件
		$(".ulRight").find('li').slice(3,6).mouseover(function(){
			$(this).find(".t a i").html("&#xe64f;");
			$(this).css("backgroundColor","#fff");
			$(this).find(".b").show();
		})
		$(".ulRight").find('li').slice(3,6).mouseout(function(){
			$(this).css("backgroundColor","#f9f9f9");
			$(this).find(".t a i").html("&#xe847;");
			$(this).find(".b").hide();
		})
		// 购物车的移入移出事件
		//购物车里没有东西
		$(".ulRight").find('li:last-child').mouseenter(function(){
			$(this).css("backgroundColor","#fff");
			$(this).find(".cart-content").show();
			if($("#cart-totals").html() != 0){
				//动态加载购物车内的内容
				sc_msg();
				//购物车内有东西
				$(this).find(".cart-empty").hide();
				$(this).find(".minicart-list").show();
			}else{
				//购物车内没有东西
				$(this).find(".minicart-list").hide();
				$(this).find(".cart-empty").show();
			}
		})
		$(".ulRight").find('li:last-child').mouseleave(function(){
			$(this).css("backgroundColor","#f2f2f2");
			$(this).find(".cart-content").hide();
		})
		//动态加载购物车内的内容
		function sc_msg(){
			//先清除原先的内容
			$(".minicart-goods-list").html("");
			$(".minicart-settleup").html("");
			$.ajax({
				url: "../data/product-details.json",
				type: "GET",
				success: function(goodsArr){
					if($.cookie("projects")){
						var cookieStr = $.cookie("projects");
						var cookieArr = eval(cookieStr);
						var newArr = [];// 进行存储新的数据
						//筛选出要加入购物车的商品
						for(var i = 0; i < goodsArr.length; i++){
							var obj = goodsArr[i];
							//遍历出来图片路径
							for(var j = 0; j < cookieArr.length; j++){
								if(obj.id == cookieArr[j].id){
									var size = cookieArr[j].desc.substring(30);
									//说明是我要加到购物车的物品 将需要的属性添加进来
									cookieArr[j].imgSrc = obj.listItems[0];
									cookieArr[j].price = obj.price;
									cookieArr[j].size = size;
									//添加到新的数组中
									newArr.push(cookieArr[j]);
								}
							}
						}
						//通过循环添加购物车
						for(var i = 0; i < newArr.length; i++){
							var oneTotalPrice = newArr[i].num * newArr[i].price;
							$(`<li class="pro-info clear">
									<div class="product-num clear">
										<p class="product-num-btn clear">
											<span class="num-plus" id="${newArr[i].id}">+</span>
											<span class="num-minus" id="${newArr[i].id}">-</span>
										</p>
									</div>
									<div class="goodsImg"><a href=""><img src="${newArr[i].imgSrc}" alt=""></a></div>
									<div class="goodsName"><a href="" title="">${newArr[i].desc}</a></div>
									<div class="goodsSize clear"><span>${newArr[i].size}</span></div>
									<div class="goodsStatus">
										<strong><em>X</em><span>${newArr[i].num}</span></strong>
									</div>
								</li>`).appendTo($(".minicart-goods-list"));
						}
						$(`<span class="button-minicart" id="clearShop">清空购物车</span>
							<span class="button-minicart">结算</span>`).appendTo($(".minicart-settleup"));
					}
				},
				error: function(msg){
					console.log(1);
				}
			})
		}
		//通过事件委托进行增加和删除
		$(".minicart-goods-list").on("click", "span", function(){
			var ids = this.id; //相当于拿到了商品的id
			//将要增减的商品找到
			var cookieStr = $.cookie("projects");
			var cookieArr = eval(cookieStr);
			for(var i = 0; i < cookieArr.length; i++){
				if(cookieArr[i].id == ids){
					//判断+还是-
					if($(this).attr("class") == "num-plus"){
						cookieArr[i].num++;
						//更改数量
						var oneTotalPrice = cookieArr[i].num * cookieArr[i].price;
						$(this).closest(".product-num").nextAll(".goodsStatus").find("span").html(cookieArr[i].num);
						$.cookie("projects", JSON.stringify(cookieArr), {
							expries: 7
						})
						break;
					}else{
						//判断数量是不是1
						if(cookieArr[i].num == 1){
							$(this).closest(".pro-info").remove();//直接删除
							//删除cookie中的这个商品
							cookieArr.splice(i, 1);
							//如果cookieArr的长度为0，说明没有商品了
							if(cookieArr.length == 0){
								$.cookie("projects", null);
							}else{
								$.cookie("projects", JSON.stringify(cookieArr), {
									expries: 7
								})
							}
						}else{
							//数量不是1
							cookieArr[i].num--;
							$(this).closest(".product-num").nextAll(".goodsStatus").find("span").html(cookieArr[i].num);
							$.cookie("projects", JSON.stringify(cookieArr), {
								expries: 7
							})
						}
					}
				}
			}
			shopNum_ballMove.shop_num($("#cart-total"));
			shopNum_ballMove.shop_num($("#cart-totals"));
		})
		//清空购物车
		$(".minicart-settleup").on("click", "#clearShop", function(){
			var isAgree = confirm("您确认要清空购物车吗?");
			if(!isAgree){
				return false;
			}else{
				$.cookie("projects", null);
				//实时刷新
				shopNum_ballMove.shop_num($("#cart-total"));
				shopNum_ballMove.shop_num($("#cart-totals"));
			}
		})
	}
	return {
		indexHeader: indexHeader
	}
})