
$(function(){
	 let name = getCookie("username");
	$.get("getShoppingCart.php",{"vipName":name},function(data){
		console.log(data);
		let arr = JSON.parse(data);
		let htmlStr = "";
		if(name != ""){
			for(let i=0;i<arr.length;i++){
				htmlStr += `
				<li>
					<div class="list">
						<input type="checkbox" checked="checked"; class="danxuan"/>
						<img src=${arr[i].beiyong12} >
						<div class="car_deta">
							<span>${arr[i].goodsName}</span>
							<p>款号# ${arr[i].beiyong11}</p>
							<p>款式：${arr[i].beiyong10}</p>
						</div>
					</div>
					<div class="car_price">
						<div>
							<select  class="car_num" selectedIndex="${arr[i].goodsCount}">
								<option value ="1">数量:1</option>
								<option value ="2">数量:2</option>
								<option value ="3">数量:3</option>
								<option value ="4">数量:4</option>
								<option value ="5">数量:5</option>
							</select>
						</div>
						<span class="xiaoJi">￥${arr[i].goodsPrice}</span>
						<p class="data_shop"><span class="data_shop1">删除</span></p>
						<span class="xiaoJi1" style="display: none;"></span>
					</div>
				</li>
				`;
			}
		}else{
				htmlStr = `
				<p style="text-align:center;"><a href="login+reg.html" id="dengLU" style="font-size:30px;text-align:center;color:black;">请先登录</a></p>
					
				`;
			}
		$("#dengLU").mouseenter(function(){
			$(this).css({
				"color":"#333",
				"text-decoration": "line-through"
			})
		})
		$(".car").html(htmlStr);
		for(let z=0;z<arr.length;z++){
			var select = document.getElementsByClassName("car_num")[z]; 
		    for (var j = 0; j< select.children.length; j++){  
		        if (select.children[j].value == arr[z].goodsCount ){  
		            select.children[j].selected = true;  
		            break;  
		        }  
		    }  
		}
		    
		
		$(".xiaoJi").each(function(i){
			//删除欧无车
			$(".data_shop1").eq(i).click(function(){
				$(this).parent().parent().parent().remove();
				$.get("deleteGoods.php",{vipName:"高级人造帆布邮差包",goodsId:arr[i].goodsId},function(data){
					zongHe();
				})
			})
			//获取价格
				var num = $(".xiaoJi").eq(i).html().replace(/[^0-9]/ig,"");
				//小计
				 $(".xiaoJi1").eq(i).html(num*$(".car_num").val());
				 //数量变化
				 	$(".car_num").eq(i).change( function() {
				 	zongHe();
				 	$.get("updateGoodsCount.php",{"vipName":getCookie("username"),"goodsId":arr[i].goodsId,"goodsCount":$(this).val()},function(data){
				 		if(data == 1){
							console.log(data);
						}
				 	})
				 })
			})
			var num1=0;
			for(var i=0;i<$(".xiaoJi").length;i++){
				num1 += parseInt($(".xiaoJi1").eq(i).html());
			}
			$(".sum1").html(num1);
			
			
			$(".danxuan").change( function() {
				zongHe();
			});
			$("#checkallid").change( function() {
				zongHe();
			});
			//全选按钮
			$("#checkallid").bindCheck($(".danxuan"));
			//总和
			zongHe()
			$(".shopbtn").click(function(){
				location.href = "index.html"
			})
	})
})




function zongHe(){
	$(".xiaoJi").each(function(i){
		var num = $(".xiaoJi").eq(i).html().replace(/[^0-9]/ig,"");
		//小计
		var t = parseInt($(".car_num").eq(i).val());
		 $(".xiaoJi1").eq(i).html(num*t);
	})
	var num2=0;
	var num3=0;
	for(let i=0;i<$(".list").length;i++){
		if($(".danxuan")[i].checked == true){
			num3++;
				num2 += parseInt($(".xiaoJi1").eq(i).html());
		}
	}
	//选中数量
	$(".xuanzhong").html(num3);
	$(".sum1").html(num2);
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
	
	
//插件：就是给jQuery对象增加方法（函数）
jQuery.fn.extend({
    checkAll:function($sonCheckbox){
        // this:是checkAll函数的所属对象 ，$("#checkallid")
        $sonCheckbox.prop("checked",this.prop("checked"));
    },    
    bindLeaderCHK:function($leaderCHK){
        //this:是bindLeaderCHK函数所属的对象
        let isAll = true;//假定全部选中
        this.each(function(){
            //this:是循环过程中的当前元素（dom元素）
            if(!$(this).prop("checked")){
                isAll = false;
            }
        });
        $leaderCHK.prop("checked",isAll);
    },
    unCheck:function($leaderCHK){
        // this:
        this.each(function(){
            this.checked = !this.checked;
        });
        this.bindLeaderCHK($leaderCHK);
    },
    bindCheck:function($sonCheckbox,$unBtn){
        let $leaderCHK = this;
        $leaderCHK.click(function(){        
            $leaderCHK.checkAll($sonCheckbox);
        });
        $sonCheckbox.click(function(){
            $sonCheckbox.bindLeaderCHK($leaderCHK);
        });
        if($unBtn){
            $unBtn.click(function(){
                $sonCheckbox.unCheck($leaderCHK);
            });
        }
    }
});
