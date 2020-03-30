console.log(location.href);
    console.log(location.search);
	//从数据库请求数据
	let goods1 = location.search.split("=")[0].replace("?","");
	let goods =decodeURIComponent(location.search.split("=")[1])  ;
	console.log(goods1);
	console.log(goods);
	
    $.get("list.php",{"goodsType":goods1,"goodsId":goods},function(data){
		// $.get("sss.php",{"goodsType":"包"},function(data){
		console.log(data)
        let arr = JSON.parse(data);
        let htmlStr="";
		let head = `<div>
			${goods}
		</div>
		<img src="image/15797544011631983_content_HeroRegularStandard_1600x675_1570631411_HeroRegularStandard_S01CRUISE-HERO-014_001_Default.jpg">`;
		$("#content_hade").html(head);
        for(let j=0;j<20;j++){
		 	for(let i=0;i<arr.length;i++){
		 		htmlStr +=`
		 			<li  class="goodslist_a">
		 				<a href="gooddeta.html?goodsId=${arr[i].goodsId}"></a>
		 				<img src="${arr[i].goodsImg}" >
		 				<div class="list_deta">
		 					<a href="gooddeta.html?goodsId=${arr[i].goodsId}"></a>
		 					<img src="${arr[i].beiyong1}" >
		 					<p>${arr[i].goodsName}</p>
		 					<span>￥${arr[i].goodsPrice}</span>
		 					<a href="#">立即购买 ></a>
		 				</div>
		 			</li>
		 		`;
		 	}; 
		} 
        $("#goodslist").html(htmlStr);
		// let arr1 = ["OLED","yejing"]
		// for(let s=0;s<$(".ball11").length;s++){
		// 	$(".ball11")[s].onclick = function(){
		//  		console.log(s);
		//  		ss(arr1[s]);
		//  	};
		// }
		// $(".ball11").each(function(i){
		// 	$(".ball11").eq(i).click(function(){
		// 		console.log(i);
		// 		ss(arr1[i]);
		// 	});
		// })
		// function ss(str){
		// 	htmlStr = "";
		// 	 	for(let i=0;i<arr.length;i++){
		// 			if(arr[i].beiyong9 == str){
		// 				htmlStr +=`
		// 	 			<li  class="goodslist_a">
		// 	 				<a href="gooddeta.html?goodsId=${arr[i].goodsId}"></a>
		// 	 				<img src="${arr[i].goodsImg}" >
		// 	 				<div class="list_deta">
		// 	 					<a href="gooddeta.html?goodsId=${arr[i].goodsId}"></a>
		// 	 					<img src="${arr[i].beiyong1}" >
		// 	 					<p>${arr[i].goodsName}</p>
		// 	 					<span>￥${arr[i].goodsPrice}</span>
		// 	 					<a href="#">立即购买 ></a>
		// 	 				</div>
		// 	 			</li>
		// 	 		`;
		// 			}
		// 	 	};
		// 	$("#goodslist").html(htmlStr);
		// }
		//隐藏多余的商品
		for(let i=0;i<$(".goodslist_a").length;i++){
			if(i>19){
				$(".goodslist_a").eq(i).css({
					"display":"none"
				})
			}
		}
		//鼠标移入转换   移出返回
		$(".goodslist_a").each(function(i){
				$(".goodslist_a").eq(i).mouseenter(function(){
					$(".list_deta").eq(i).css({
						"display":"block"
					});
					this.firstElementChild.style.cssText="height: 667px;z-index: 2;";
				});
				$(".goodslist_a").eq(i).mouseleave(function(){
					$(".list_deta").eq(i).css({
						"display":"none"
					});
					this.firstElementChild.style.cssText="height: 100%;z-index: 1;";
				})
			});
			$(".move span").click(function(){
				$(this).css("display","none");
				$(this).parent().css("display","none");
				$(".goodslist_a").css({
					"display":"block"
				});
			}); 
    });
