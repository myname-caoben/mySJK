$(function(){
	// location.search; //?goodsId=01001
    let goodsId = location.search.split("=")[1];
   console.log(goodsId);
    $.get("getGoodsInfo.php",{"goodsId":goodsId},function(data){
        let obj = JSON.parse(data);
        let htmlStr=`
                    <div id="ball">
                    	<ul>
                    		<li></li>
                    		<li></li>
                    		<li></li>
                    		<li></li>
                    		<li></li>
                    		<li></li>
                    	</ul>
                    </div>
                    <!-- 图片部分 -->
                    <div id="detaImg">
                    	<ul>
                    		<li>
                    			<img src="${obj.beiyong2}" >
                    		</li>
                    		<li>
                    			<img src="${obj.beiyong3}" >
                    		</li>
                    		<li>
                    			<img src="${obj.beiyong4}" >
                    		</li>
                    		<li>
                    			<img src="${obj.beiyong5}" >
                    		</li>
                    		<li>
                    			<img src="${obj.beiyong6}" >
                    		</li>
                    		<li>
                    			<img src="${obj.beiyong7}" >
                    		</li>
                    		<li>
                    			<img src="${obj.beiyong8}" >
                    		</li>
                    	</ul>
                    </div>
                    <!-- 介绍部分 -->
                    <div id="deta">
                    	<div class="deta">
                    		<!-- 简介 -->
                    		<div class="deta_name bottom">
                    			<h3>${obj.goodsName}</h3>
                    			<i>￥${obj.goodsPrice}</i>
                    		</div>
                    		<div class="deta_logo">
                    			<span>款号474139 K5ICN 1095</span>
                    			<div class="deta_logo_1">
                    				<img src="image/litle.jpg" ><span>GG Supreme高级人造帆布邮差包</span>
                    			</div>
                    		</div>
                    		<div class="deta_add">
                    			<p>有货</p>
                    			<i>预计24小时内发货</i>
                    			<span class="buybtn deta_btn">加入购物袋</span>
                    		</div>
                    		<div class="deta_finde bottom">
                    			<span><span class="iconfont icon-xinxi"></span>在线顾问</span>
                    			<span><span class="iconfont icon-huchudianhuatianchong"></span>选购咨询 400.8210.582</span>
                    		</div>
                    		<div class="deta_share bottom">
                    			分享：<span class="iconfont icon-weixin"></span>
                    			<span class="iconfont icon-weibo"></span>
                    		</div>
                    		<div class="deta_details bottom">
                    			产品细节
                    			<span>></span>
                    		</div>
                    		<div class="deta_qurey">
                    			<span><span class="iconfont icon-daohangdizhi"></span>查找有货直营店</span>
                    			<i>选择标准配送，免运费</i>
                    		</div>
                    	</div>
                    </div>
                `;
        $("#content").html(htmlStr);
		let index = $("#shoppingNum").html();
		let username1 = getCookie("username");
		//添加购物车
		$(".deta_btn").click(function(){
			console.log(username1);
			$.get("addShoppingCart.php",{"vipName":username1,"goodsId":obj.goodsId,"goodsCount":1},function(){
				if(getCookie("username") == ""){
					alert("请先登录")
				}else{
					if(data != ""){
					index++;
					$("#shoppingNum").html(index);
				}else{
					console.log(data);
					alert("添加失败")
				}
				}
				
			})
		})
		$("#detaImg img").each(function(i){
			$("#detaImg img").eq(i).click(function(){
				let index = gunDong();
				console.log(index);
				if($(this).css("position") == "absolute"){
					bianXia(i);
				}else{
					bianDa(i,index);
					$(this).mousemove(function(e){
						//一、处理数据
						//1、
						let width1 = document.documentElement.clientWidth - $(this).width();
						let height1 = document.documentElement.clientHeight - $(this).height();
						let www = width1/(document.documentElement.clientWidth)
						let hhh = height1/(document.documentElement.clientHeight)
						let left1 = parseInt((e.pageX)*www);
						let top1 =  parseInt((e.pageY-gunDong())*hhh);
						//2、
						console.log(left1);
						console.log(top1);
						//二、改变外观
						$(this).css({
							"left":`${left1}px`,
							"top":`${top1}px`
						})
					});
				}
			
		})
		})
		
    });
	
	
});
function bianDa(i,index){
	$("body").css({
			"overflow":"hidden",
		})
		$("#detaImg li").eq(i).animate({
			"width":"2400px",
			"height":"2400px",
			"z-index":998,
			"top":`${index}px`,
		},500);
		$("#detaImg li").eq(i).css({
			"position":"absolute",
			"left":0
		})
		$("#detaImg img").eq(i).animate({
			"width":"2400px",
			"height":"2400px",
			"z-index":999,
			"top":0,
			"left":0
		},500)
		$("#detaImg img").eq(i).css({
		"position":"absolute"
	})
}
function bianXia(i){
	$("body").css({
		"overflow":"visible"
	})
	$("#detaImg img").eq(i).css({
		"position":"static"
	})
	$("#detaImg img").eq(i).animate({
		"width":"800px",
		"height":"800px",
	},500);
	$("#detaImg li").eq(i).animate({
		"width":"800px",
		"height":"800px",
	},500);
	$("#detaImg li").eq(i).css({
		"position":"static"
	})
}
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
function gunDong(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    return scrollTop;
}