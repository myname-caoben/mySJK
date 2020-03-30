	window.onload = function (){
		/*轮播图*/
			var mySwiper = new Swiper ('.swiper-container', {
				loop: true, // 循环模式选项
				autoplay: {
					delay: 7000,
					stopOnLastSlide: false,
					disableOnInteraction: true,
				},
				effect : 'fade',
				fadeEffect: {
				crossFade: true,
				},
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
					clickable :true,
				},
				
				// 如果需要前进后退按钮
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},
				
			  })    
			/*轮播图2*/
			var mySwiper2 = new Swiper ('.swiper-container2', {
				loop: true, // 循环模式选项
				autoplay: {
					delay: 1000,
					stopOnLastSlide: false,
					disableOnInteraction: true,
				},
				effect : 'fade',
				fadeEffect: {
				crossFade: true,
				},
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination2',
					clickable :true,
				},
			  });
			/*轮播图3*/ 
			var mySwiper3 = new Swiper ('.swiper-container3', {
			  	loop: true, // 循环模式选项
			  	autoplay: {
			  		delay: 1000,
			  		stopOnLastSlide: false,
			  		disableOnInteraction: true,
			  	},
			  	effect : 'fade',
			  	fadeEffect: {
			  	crossFade: true,
			  	},
			  	// 如果需要分页器
			  	pagination: {
			  		el: '.swiper-pagination3',
			  		clickable :true,
			  	},
			    });
			window.onscroll=function(event){
				let evt=event||window.event;
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop>=60){
					$("#nav").css({
						"background-color": "#1b1b1b",
						"top":`${scrollTop}px`,
						"position": "absolute"
					});
					$("#nav_menu").css({
						"top":0
					});
					$(".down_menu").css({
						"position": "absolute",
						"top":"60px"
					});
					$("#login_head").html(`<span class="iconfont icon-geren"></span>`);
					
				}else if(scrollTop<=60){
					initUI();
					$("#nav").css({
						"top":`${60}px`,
						"position": "absolute",
						"background-color": "transparent"
					});
					$("#nav_menu").css({
						"top":0
					});
					$(".down_menu").css({
						"position": "absolute",
						"top":"60px"
					});
				}
			}
		// 解决下拉菜单直接display none轮播图失效的问题
		for(let i=0;i<$(".down_menu").length;i++){
			$(".down_menu").eq(i).css("display","none")
		};
		//下拉菜单的显示隐藏
		$(".menu").each(function(i){
			$(this).mouseenter(function(){
				let p=true;
				for(let j=0;j<$(".down_menu").length;j++){
					if($(".down_menu").eq(j).css("display") === "block"){
						p = false;
						break;
					}
				}
				if(p != false){
						$(".down_menu").eq(i).slideDown(500)
				}else{
					setTimeout(()=>{
						$(".down_menu").eq(i).css("display","block")
					},200)
				}
		});
			$(this).mouseleave(function(){
				var myTime = setTimeout(()=>{
					$(".down_menu").eq(i).css("display","none")
					let $img = $(".menu>a>img")
				},200)
				$(".down_menu").mouseenter(function(){
					clearTimeout(myTime);
					$(this).css({
						"display":"block"
					})
				})
				$(".down_menu").mouseleave(function(){
					$(this).css({
						"display":"none"
					})
				});
			})
		})
	initUI();
	$(".tuiChu").click(function(){
		removeCookie("username");
		initUI();
		$("#shoppingNum").html("");
	});
	//跳转页面
	$(".beibao").click(function(){
		location.href = "goods.html";
	});
	//搜索框
	$(".icon-fangdajing").click(function(){
		$(".sousuo").css({
			"display":"block"
		})
	});
	$(".icon-shanchuyixuanqunchengyuanchacha").click(function(){
		$(".sousuo").css({
			"display":"none"
		})
	});
	$("#sousuo").click(function(){
		let str = $("#souSuo").val();
		$.get("sousuo.php",{goodsType:$("#souSuo").val()},function(data){
			if(data == "0"){
				location.href =`goods.html?goodsType=${str}`;
			}else{
				alert("您搜索的物品不存在")
			}
		})
	})
	$("#souSuo")[0].onkeydown = function(event){
		let e = event ? event : (window.event ? window.event : null);
		if(e.keyCode == 13){
			let str = $("#souSuo").val();
			$.get("sousuo.php",{goodsType:$("#souSuo").val()},function(data){
				if(data == "0"){
					location.href =`goods.html?goodsType=${str}`;
				}else{
					alert("您搜索的物品不存在")
				}
			})
		}
	};
};
//新年页面
$(".newyear").click(function(){
	location.href =`newyear.html?beiyong13=newyear`;
})
$(".nv").click(function(){
	location.href =`goods.html?beiyong9=女士系列`;
})
$(".nan").click(function(){
	location.href =`goods.html?beiyong9=男士系列`;
})
//登录
function initUI(){
		let username = getCookie("username");
		console.log(username);
		if(username){
			$("#login_head").html(`我的账户`);
			$(".login_index").mouseenter(function(){
					$(".geren").fadeIn(1000);
			});
			$(".login_index").mouseleave(function(){
					$(".geren").fadeOut(1000);
			});
			//购物车
			$.get("getShoppingCart.php",{"vipName":username},function(data){
				let arr = JSON.parse(data);
				console.log(arr);
				let num = 0;
				for(let i=0;i<arr.length;i++){
					num += parseInt(arr[i].goodsCount);
				}
				$("#shoppingNum").html(num);
			});
			
		}else{
			$("#login_head").html("登录");
			$(".login_index").mouseenter(function(){
					$(".geren").stop();
			});
			$(".login_index").mouseleave(function(){
					$(".geren").css({
						"display":"none"
					});
			});
		}
	}
	
	
	
	//功能：保存cookie
	//参数：
	//key：键
	//value：值
	//dayCount：有效期（单位是天）
	//返回值：无
	function saveCookie(key,value,dayCount){
		var d = new Date();
		d.setDate(d.getDate()+dayCount);
		document.cookie = encodeURIComponent(key+"="+value)+";expires="+d.toGMTString();	
	}
	//功能：读取cookie（根据键读取对应的值）
	//参数：
	//key：键
	//返回值：值，""：表示没有找到对应的cookie；
	
	//cssfile=red; aauserName=ttt; userName=jzm
	function getCookie(key){	
		var str = decodeURIComponent(document.cookie);
		//1、转换成数组
		var arr = str.split("; ");
		//2、根据键找到对应的数组元素
		var index=-1;
		for(var i=0;i<arr.length;i++){
			if(arr[i].indexOf(key+"=")==0){
				index = i;
				break;
			}
		}
		//3、截取出值
		if(index==-1){
			return "";
		}else{
			return arr[index].substring(key.length+1);
		}
	}
	
	//功能：删除cookie(根据键删除cookie)
	//参数：
	//key：键；
	function removeCookie(key){
		saveCookie(key,"",-1);
	};