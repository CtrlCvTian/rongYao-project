//主页的代码
define(["shopNum_ballMove", "indexHeader", "indexTab", "indexBottom", "jquery", "jquery-cookie"], function(shopNum_ballMove, indexHeader, indexTab, indexBottom, $){
	function index(){
		$(function(){
			//实时刷新购物车数量
			shopNum_ballMove.shop_num($("#cart-totals"));
			indexHeader.indexHeader();
			// banner轮播图
			banner();
			function banner(){
				var oSpan = $(".bannerBox .banner-list span");
				var oUl = $(".bannerBox ul");
				//动态加载banner图的数据
				$.ajax({
					type: "GET",
					url: "../data/banner.json",
					success: function(data){
						for(var i = 0; i < data.length; i++){
							var obj = data[i];
							$(`<li><a href=""><img src="${obj.img}" alt=""></a></li>`).appendTo(oUl);
						}
					},
					error: function(msg){
						alert(msg);
					}
				})
				var iNow = 0;//记录当前的下标
				var timer = null; //设置定时器的值
				//自动进行滚动
				Interval();
				//列表的点移入移出事件
				oSpan.click(function(){
					iNow = $(this).index();
					tab();
					clearInterval(timer);
				})
				oSpan.mouseout(function(){
					clearInterval(timer);
					Interval();
				})
				oUl.hover(function(){
					clearInterval(timer);
				},function(){
					clearInterval(timer);
					Interval();
				})
				function tab(){
					if(iNow == oUl.find("li").size()){
						iNow = 0;
					}
					oSpan.attr("class","").eq(iNow).attr("class","active");
					oUl.find("li").eq(iNow).fadeIn(1100).siblings().fadeOut(200); 
				}
				//定时器事件
				function Interval(){
					timer = setInterval(function(){
						tab();
						iNow++;
					},4000)
				}
			}
			//下拉详细手机介绍
			indexTab.indexTab();
			//荣耀手机下的轮播特效
			phoneBox();
			function phoneBox(){
				var oUl = $(".phoneBox .phoneList .drag-list");
				var timer = null;
				var nodes = oUl.find("li").clone(true);
				nodes.appendTo(oUl);
				//将ul的宽度变成原来的两倍
				oUl.css({
					width: oUl.outerWidth() * 2
				})
				//启动定时器
				clearInterval(timer);
				Interval();
				//点击左边按钮也可以进行移动
				$(".phoneBox .phoneList .drag-btn").click(function(){
					var timerOut = null;
					if(oUl.position().left == 0){
						alert("已经是第一个了");
						return false;
					}else{
						oUl.stop().animate({
							left: oUl.position().left + oUl.find("li").outerWidth()
						},2000)
						clearInterval(timer);
						setTimeout(Interval,3000);
						clearInterval(timerOut);
					}
				})
				//点击右边按钮也可以进行移动
				$(".phoneBox .phoneList .drag-btnNext").click(function(){
					var timerOut = null;
					if(oUl.position().left == - 1200){
						alert("已经是最后一个了");
						return false;
					}else{
						oUl.stop().animate({
							left: oUl.position().left - oUl.find("li").outerWidth()
						},2000)
						clearInterval(timer);
						setTimeout(Interval,3000);
						clearInterval(timerOut);
					}
				})
				//让其进行滚动
				function Interval(){
					clearInterval(timer);
					timer = setInterval(function(){
						oUl.animate({
							left: oUl.position().left - oUl.find("li").outerWidth()
						},3000,function(){
							if(oUl.position().left <= - (oUl.outerWidth() / 2 - oUl.find("li").outerWidth())){
								oUl.css("left",0);
							}
						})
					},5000)
				}
				//给每一个手机添加移入事件
				oUl.find("li").hover(function(){
					$(this).css({
						boxShadow: "0px 10px 10px 10px #eaeaea",
						transform: "translate3d(0px,-2px,0px)",
						zIndex:2
					})
					clearInterval(timer);
				},function(){
					$(this).css({
						boxShadow: "",
						transform: "",
						zIndex:0
					})
					clearInterval(timer);
					Interval();
				})
			}
			//动态加载手机的数据
			$.ajax({
				type: "GET",
				url: "../data/phone.json",
				success: function(data){
					for(var i = 0; i < data.length; i++){
						var obj = data[i];
						$(`<a href="" class="${obj.style}">
							<img src="${obj.img}" alt="">
							<div class="p-text">
								<div class="bar"></div>
								<div class="phone-name">${obj.phoneName}</div>
								<div class="character">${obj.character}</div>
								<div class="price">${obj.price}</div>
							</div>
						</a>`).appendTo($(".phoneBox main article"));
					}
				},
				error: function(msg){
					alert(msg);
				}
			})
			//动态加载电脑的数据
			$.ajax({
				type: "GET",
				url: "../data/computer.json",
				success: function(data){
					for(var i = 0; i < data.length; i++){
						var obj = data[i];
						$(`<a href="" class="${obj.style}">
							<img src="${obj.img}" alt="">
							<div class="p-text">
								<div class="bar"></div>
								<div class="phone-name">${obj.phoneName}</div>
								<div class="character">${obj.character}</div>
								<div class="price">${obj.price}</div>
							</div>
						</a>`).appendTo($(".notebookBox main article"));
					}
				},
				error: function(msg){
					alert(msg);
				}
			})
			//动态加载穿戴的数据
			$.ajax({
				type: "GET",
				url: "../data/wear.json",
				success: function(data){
					for(var i = 0; i < data.length; i++){
						var obj = data[i];
						$(`<a href="" class="${obj.style}">
							<img src="${obj.img}" alt="">
							<div class="p-text">
								<div class="bar"></div>
								<div class="phone-name">${obj.phoneName}</div>
								<div class="character">${obj.character}</div>
								<div class="price">${obj.price}</div>
							</div>
						</a>`).appendTo($(".wearBox main article"));
					}
				},
				error: function(msg){
					alert(msg);
				}
			})
			//动态加载炫彩配件的数据
			$.ajax({
				type: "GET",
				url: "../data/parts.json",
				success: function(data){
					for(var i = 0; i < data.length; i++){
						var obj = data[i];
						$(`<a href="" class="${obj.style}">
							<img src="${obj.img}" alt="">
							<div class="p-text">
								<div class="bar"></div>
								<div class="phone-name">${obj.phoneName}</div>
								<div class="character">${obj.character}</div>
								<div class="price">${obj.price}</div>
							</div>
						</a>`).appendTo($(".partsBox main article"));
					}
				},
				error: function(msg){
					alert(msg);
				}
			})
			//动态加载智能家居的数据
			$.ajax({
				type: "GET",
				url: "../data/household.json",
				success: function(data){
					for(var i = 0; i < data.length; i++){
						var obj = data[i];
						$(`<a href="" class="${obj.style}">
							<img src="${obj.img}" alt="">
							<div class="p-text">
								<div class="bar"></div>
								<div class="phone-name">${obj.phoneName}</div>
								<div class="character">${obj.character}</div>
								<div class="price">${obj.price}</div>
							</div>
						</a>`).appendTo($(".houseBox main article"));
					}
				},
				error: function(msg){
					alert(msg);
				}
			})
			//底部图片更换
			indexBottom.indexBottom();
		})
	}
	return {
		index: index
	}
})