//商品列表页的部分
define(["shopNum_ballMove", "indexHeader", "indexTab", "indexBottom", "jquery", "jquery-cookie"], function(shopNum_ballMove, indexHeader, indexTab, indexBottom, $){
	function goodsLists(){
		$(function(){
			//实时刷新购物车数量
			shopNum_ballMove.shop_num($("#cart-totals"));
			shopNum_ballMove.shop_num($(".s-cart span"));
			//头部JS代码
			indexHeader.indexHeader();
			//下拉选项卡代码
			indexTab.indexTab();
			//底部代码
			indexBottom.indexBottom();
			//自己的代码请求数据
			$.ajax({
				type: "GET",
				url: "../data/allLists.json",
				success: function(data){
					var href = window.location.href;
					var start = href.indexOf("?");
					var arr = href.substring(start + 1, href.length).split("=");
					var target = arr[1];
					for(var i = 0; i < data.length; i++){
						var obj = data[i];
						if(target == obj.type){
							$(`<li class="contents-items">
								<a class="c-href" href="http://localhost:8080/html/goodsDetails.html?id=${obj.id}&type=${obj.type}"><img src="${obj.img}" alt=""></a>
								<div class="c-name">${obj.phoneName}</div>
								<div class="c-price">${obj.phonePrice}</div>
								<div class="c-buttons clear">
									<a class="c-buy" href='http://localhost:8080/html/goodsDetails.html?id=${obj.id}&type=${obj.type}' id="${obj.id}">选购</a>
									<p class="c-estimate">${obj.estimate}</p>
								</div>
								<div class="modified"><img src="${obj.modified}" alt=""></div>
							</li>`).appendTo($(".contentBox .contentDetails .contents"));
						}
						if(i == data.length - 1){
							$(`<p class="classify">${data[i][target]}</p>`).appendTo($(".top"));
						}
					}
				},
				error: function(error){
					alert(error);
				}
			})
			//事件委托添加事件
			$(".contents").on("mouseenter", ".contents-items", function(){
				$(this).css("borderColor", "#00b5e2");
			})
			$(".contents").on("mouseleave", ".contents-items", function(){
				$(this).css("borderColor", "#dedede");
			})
		})
	}
	return {
		goodsLists: goodsLists
	}
})