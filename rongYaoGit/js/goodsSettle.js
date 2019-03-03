//商品列表页的部分
define(["shopNum_ballMove", "indexHeader", "indexTab", "indexBottom", "jquery", "jquery-cookie"], function(shopNum_ballMove, indexHeader, indexTab, indexBottom, $){
	function goodsSettle(){
		$(function(){
			//头部JS代码
			indexHeader.indexHeader();
			//底部代码
			indexBottom.indexBottom();
			//实时刷新购物车
			shopNum_ballMove.shop_num($("#cart-total"));
			// 通过cookie加载数据 生成页面
			goodsSettle();
			function goodsSettle(){
				//每次先将之前的内容清空
				$(".form-pro").html("");
				$.ajax({
					url: "../data/product-details.json",
					type: "GET",
					success: function(goodsArr){
						var cookieStr = $.cookie("projects");
						var cookieArr = eval(cookieStr);
						var newArr = [];//进行存储新的数据
						if(cookieStr){
							for(var i = 0; i < goodsArr.length; i++){
								var obj = goodsArr[i];
								for(var j = 0; j < cookieArr.length; j++){
									//找出对应的商品
									if(cookieArr[j].id == obj.id){
										//将没有的属性添加上
										cookieArr[j].img = obj.img;
										cookieArr[j].price = obj.price;
										newArr.push(cookieArr[j]);
									}
								}
							}
							//通过循环生成页面
							var sumMoney = 0;//获得最终的金额
							var sumNum = 0; //最终的数量
							for(var k = 0; k < newArr.length; k++){
								var totalPrice = newArr[k].num * Number(newArr[k].price);
								sumMoney += totalPrice;
								sumNum += newArr[k].num;
								$(`<div class="form-pros clear">
								<div class="onePros clear">
									<label for=""><input type="checkbox" checked="true" class="oneSelected"></label>
									<!-- 详细信息 -->
									<div class="sc-pro-area">
										<div class="sc-pro-main clear">
											<a href="" target="_blank" class="main-img">
												<img src="${newArr[k].img}" alt="">
											</a>
											<ul class="clear">
												<li><a href="" class="main-product">${newArr[k].desc}</a></li>
												<li class="one-price"><span>￥${newArr[k].price}</span></li>
												<li class="oneNum"><div class="product-stock clear">
														<input type="text" id="pro-quantity" class="product-stock-text" value="${newArr[k].num}" placeholder="1">
														<p class="product-stock-btn clear">
															<span class="stock-plus" id="${newArr[k].id}">+</span>
															<span class="stock-minus" id="${newArr[k].id}">-</span>
														</p>
													</div>
												</li>
												<li class="priceTotal">￥${totalPrice}</li>
												<li><span class="p-del" id="${newArr[k].id}">删除</span></li>
											</ul>
										</div>
									</div>
								</div>
							</div>`).appendTo($(".form-pro"));
							}
							//生成全选底部列表
							$(`<label class="clear" for=""><input type="checkbox" checked="true" class="allSelected"><span>全选</span></label>
								<ul class="clear">
									<li>商品</li>
									<li>单价</li>
									<li>数量</li>
									<li>小计</li>
									<li>操作</li>
								</ul>`).appendTo($(".sc-pro-title"));
							$(`<div class="sc-total-tool clear">
								<div class="sc-total-control clear">
									<label class="clear" for=""><input type="checkbox" checked="true" class="allSelected"><span>全选</span></label>
									<span class="allDelete">删除</span>
								</div>
								<!-- 立即结算 -->
								<div class="sc-total-btn">
									<span class="promotBuy">立即结算</span>
								</div>
								<!-- 总价 -->
								<div class="sc-total-price">
									<p class="total-price"><label for="">总计：</label><span sumMoney="${sumMoney}">¥${sumMoney}</span></p>
									<div class="chooseNum">
										已选择<em sumNum="${sumNum}">${sumNum}</em>件商品
									</div>
								</div>
							</div>`).appendTo($("#sc-fixed"));
						}else{
							$(".sc-list").remove();
							$("#sc-fixed").removeAttr("sc-total-fixed");
							$("#sc-fixed").css("display", "none");
							$(".buy-empty").show();
						}
					},
					error: function(msg){
						console.log(msg);
					}
				})
			}
			// 点击加减实现功能
			// 减
			$(".form-pro").on("click", ".stock-minus", function(){
				//判断当前的框是否选中
				var flag = $(this).closest(".sc-pro-area").prevAll("label").find("input").prop("checked");
				var ids = this.id;
				//先拿到原先的单价，和总金额
				var onePrice = Number($(this).closest("li").prevAll(".one-price").find("span").html().substring(1));
				var oneTotal = Number($(this).closest("li").nextAll(".priceTotal").html().substring(1));
				var totalPrice = Number($(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find("p").find("span").html().substring(1));
				var totalNum = Number($(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html());
				//改变input框中的值
				//先判断值是不是1
				var iVal = $(this).closest(".product-stock-btn").prevAll("#pro-quantity").val();
				if(iVal == 1){
					alert("不能再进行减了");
					return false;
				}else{
					if(flag){
						iVal--;
						$(this).closest(".product-stock-btn").prevAll("#pro-quantity").val(iVal);
						$(this).closest("li").nextAll(".priceTotal").html("￥" + (oneTotal - onePrice));
						$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find("p").find("span").html("￥" + (totalPrice - onePrice));
						$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html(totalNum - 1);
						//减的时候
						var cookieStr = $.cookie("projects");
						var cookieArr = eval(cookieStr);
						for(var i = 0; i < cookieArr.length; i++){
							if(ids == cookieArr[i].id){
								cookieArr[i].num--;
							}
						}
						//再将cookie赋值回去
						$.cookie("projects", JSON.stringify(cookieArr), {
							expries: 7
						})
						//刷新购物车的数量
						shopNum_ballMove.shop_num($("#cart-total"));
					}else{
						iVal--;
						$(this).closest(".product-stock-btn").prevAll("#pro-quantity").val(iVal);
						$(this).closest("li").nextAll(".priceTotal").html("￥" + (oneTotal - onePrice));
						//减的时候
						var cookieStr = $.cookie("projects");
						var cookieArr = eval(cookieStr);
						for(var i = 0; i < cookieArr.length; i++){
							if(ids == cookieArr[i].id){
								cookieArr[i].num--;
							}
						}
						//再将cookie赋值回去
						$.cookie("projects", JSON.stringify(cookieArr), {
							expries: 7
						})
						//刷新购物车的数量
						shopNum_ballMove.shop_num($("#cart-total"));
					}
				}
			});
			// 加
			$(".form-pro").on("click", ".stock-plus", function(){
				//判断当前的框是否选中
				var flag = $(this).closest(".sc-pro-area").prevAll("label").find("input").prop("checked");
				//先拿到原先的单价，和总金额
				var ids = this.id;
				var onePrice = Number($(this).closest("li").prevAll(".one-price").find("span").html().substring(1));
				var oneTotal = Number($(this).closest("li").nextAll(".priceTotal").html().substring(1));
				var totalPrice = Number($(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find("p").find("span").html().substring(1));
				var totalNum = Number($(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html());
				//改变input框中的值
				var iVal = $(this).closest(".product-stock-btn").prevAll("#pro-quantity").val();
				if(flag){
					iVal++;
					$(this).closest(".product-stock-btn").prevAll("#pro-quantity").val(iVal);
					$(this).closest("li").nextAll(".priceTotal").html("￥" + (oneTotal + onePrice));
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find("p").find("span").html("￥" + (totalPrice + onePrice));
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html(totalNum + 1);
					//加的时候
					var cookieStr = $.cookie("projects");
					var cookieArr = eval(cookieStr);
					for(var i = 0; i < cookieArr.length; i++){
						if(ids == cookieArr[i].id){
							cookieArr[i].num++;
						}
					}
					//再将cookie赋值回去
					$.cookie("projects", JSON.stringify(cookieArr), {
						expries: 7
					})
					//刷新购物车的数量
					// goodsSettle();
					shopNum_ballMove.shop_num($("#cart-total"));
				}else{
					iVal++;
					$(this).closest(".product-stock-btn").prevAll("#pro-quantity").val(iVal);
					$(this).closest("li").nextAll(".priceTotal").html("￥" + (oneTotal + onePrice));
					//加的时候
					var cookieStr = $.cookie("projects");
					var cookieArr = eval(cookieStr);
					for(var i = 0; i < cookieArr.length; i++){
						if(ids == cookieArr[i].id){
							cookieArr[i].num++;
						}
					}
					//再将cookie赋值回去
					$.cookie("projects", JSON.stringify(cookieArr), {
						expries: 7
					})
					//刷新购物车的数量
					// goodsSettle();
					shopNum_ballMove.shop_num($("#cart-total"));
				}
			})
			// 给固定定位添加事件
			$(window).on("scroll", function(){
				//获取到总的高度
				var allHeight = $(".headerBox").outerHeight() + $(".cartBox").outerHeight() + 
				$('.login-promot').outerHeight() + $(".sc-list").outerHeight();
				if($(window).scrollTop() >= allHeight){
					$("#sc-fixed").removeClass("sc-total-fixed");
				}else{
					$("#sc-fixed").addClass("sc-total-fixed");
				}
			})
			//事件委托、点击单项的删除实现删除1、删除当前节点2、删除cookie中对应的商品
			$(".form-pro").on("click", ".p-del", function(){
				var isAgree = confirm("确认要删除该商品吗");
				var ids = this.id;
				//改变input框中的值
				if(!isAgree){
					//不删除商品
					return false;
				}else{
					//先拿到原先的单价，和总金额
					var onePrice = Number($(this).closest("li").prevAll(".one-price").find("span").html().substring(1));
					var oneTotal = Number($(this).closest("li").prevAll(".priceTotal").html().substring(1));
					var totalPrice = Number($(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find("p").find("span").html().substring(1));
					var totalNum = Number($(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html());
					var oneNum = Number($(this).closest("li").prevAll(".oneNum").find(".product-stock").find("input").val());
					//改变数量和价格
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find("p").find("span").html("￥" + (totalPrice - oneNum * onePrice));
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html(totalNum - oneNum);
					//删除商品
					$(this).closest(".form-pros").remove();
					//删除cookie中的内容
					var cookieStr = $.cookie("projects");
					var cookieArr = eval(cookieStr);
					for(var i = 0; i < cookieArr.length; i++){
						if(ids == cookieArr[i].id){
							cookieArr.splice(i, 1);
						}
					}
					//再将cookie赋值回去
					$.cookie("projects", JSON.stringify(cookieArr), {
						expries: 7
					})
					if(eval($.cookie("projects")).length == 0){
						$.cookie("projects", null);
						$(".sc-list").remove();
						$("#sc-fixed").removeAttr("sc-total-fixed");
						$("#sc-fixed").css("display", "none");
						$(".buy-empty").show();
					}
				}
				//刷新购物车的数量
				shopNum_ballMove.shop_num($("#cart-total"));
			})
			//全部删除
			$("#sc-fixed").on("click", ".allDelete", function(){
				var isSame = $(this).prevAll("label").find("input").prop("checked");
				if(!isSame){
					alert("请先选中按钮再进行删除");
					return false;
				}else{
					var isAgree = confirm("确认要删除全部的商品吗");
					if(!isAgree){
						//不删除
						return false;
					}else{
						$.cookie("projects", null);
						$(".sc-list").remove();
						$("#sc-fixed").removeAttr("sc-total-fixed");
						$("#sc-fixed").css("display", "none");
						$(".buy-empty").show();
						//刷新购物车的数量
						shopNum_ballMove.shop_num($("#cart-total"));
					}
				}
			})
			//全选进行删除商品   上面的全选
			$(".sc-pro-title").on("click", ".allSelected", function(){
				var totalPrices = addPrice();
				var totalNums = addNum();
				if(this.checked){
					//选中的时候
					$(this).attr("checked", true);
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-tool").find(".sc-total-price").find("p").find("span").html("￥" + (Number(totalPrices.sumPrice1) + Number(totalPrices.sumPrice)));
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html(Number(totalNums.sumNum1) + Number(totalNums.sumNum));
					$(".allSelected").attr("checked", "true");
					$(".oneSelected").attr("checked", "true");
				}else{
					$(this).attr("checked", false);
					//取消全选的时候
					$(".allSelected").removeAttr("checked");
					$(".oneSelected").removeAttr("checked");
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-tool").find(".sc-total-price").find("p").find("span").html("￥" + 0);
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-price").find(".chooseNum").find("em").html(0);
				}
			})
			//全选进行删除商品   下面的全选
			$("#sc-fixed").on("click", ".allSelected", function(){
				var totalPrices = addPrice();
				var totalNums = addNum();
				if(this.checked){
					$(this).closest(".sc-total-control").nextAll(".sc-total-price").find("p").find("span").html("￥" + (Number(totalPrices.sumPrice1) + Number(totalPrices.sumPrice)));
					$(this).closest(".sc-total-control").nextAll(".sc-total-price").find(".chooseNum").find("em").html(Number(totalNums.sumNum1) + Number(totalNums.sumNum));
					//选中的时候
					$(".allSelected").attr("checked", "true");
					$(".oneSelected").attr("checked", "true");
				}else{
					//取消全选的时候
					$(".allSelected").removeAttr("checked");
					$(".oneSelected").removeAttr("checked");
					$(this).closest(".sc-total-control").nextAll(".sc-total-price").find("p").find("span").html("￥" + 0);
					$(this).closest(".sc-total-control").nextAll(".sc-total-price").find(".chooseNum").find("em").html(0);
				}
			})
			//单个选择进行改变
			$(".form-pro").on("click", ".oneSelected", function(){
				var totalPrices = addPrice();
				var totalNums = addNum();
				if(this.checked){
					$(this).attr("checked", true);
					//选中某个单项的时候
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-tool")
					.find(".sc-total-price").find(".total-price").find("span").html("￥" + (totalPrices.sumPrice));
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-tool")
					.find(".sc-total-price").find(".chooseNum").find("em").html(totalNums.sumNum);
					$(".oneSelected").each(function(index, item){
						var flag = $(item).prop("checked");
						if(!flag){
							return false;
						}else if(index == $(".oneSelected").length - 1){
							$(".allSelected").attr("checked", "true");
						}
					})
				}else{
					$(this).attr("checked", false);
					//某一个单项不选中的时候
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-tool")
					.find(".sc-total-price").find(".total-price").find("span").html("￥" + (totalPrices.sumPrice));
					$(this).closest(".sc-list").nextAll("#sc-fixed").find(".sc-total-tool")
					.find(".sc-total-price").find(".chooseNum").find("em").html(totalNums.sumNum);
					$(".allSelected").removeAttr("checked");
				}
			})
			function addNum(){
				var sumNum = 0;
				var sumNum1 = 0;
				$(".oneSelected:checked").each(function(index, item){
					sumNum += Number($(this).closest("label").nextAll(".sc-pro-area").find(".sc-pro-main")
					.find("ul").find(".oneNum").find(".product-stock").find("input").val());
				})
				$(".oneSelected:not([checked])").each(function(index, item){
					sumNum1 += Number($(this).closest("label").nextAll(".sc-pro-area").find(".sc-pro-main")
					.find("ul").find(".oneNum").find(".product-stock").find("input").val());
				})
				return {
					sumNum: sumNum,
					sumNum1: sumNum1
				};
			}
			function addPrice(){
				var sumPrice = 0;
				var sumPrice1 = 0;
				$(".oneSelected:checked").each(function(index, item){
					sumPrice += Number($(this).closest("label").nextAll(".sc-pro-area").find(".sc-pro-main")
					.find("ul").find(".priceTotal").html().substring(1));
				})
				$(".oneSelected:not([checked])").each(function(index, item){
					sumPrice1 += Number($(this).closest("label").nextAll(".sc-pro-area").find(".sc-pro-main")
					.find("ul").find(".priceTotal").html().substring(1));
				})
				return {
					sumPrice: sumPrice,
					sumPrice1: sumPrice1
				};
			}
		})
	}
	return {
		goodsSettle: goodsSettle
	}
})