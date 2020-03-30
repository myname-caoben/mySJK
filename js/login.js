
//显示\关闭注册页面
	$("#reg").click(function(){
		$("#registered_content").css("display","block")
	})
	$("#guanBi").click(function(){
		$("#registered_content").css("display","none")
	})
	


//  登 录  
$("#name").blur(function(){
	if(regCheck("emailphone",$(this).val()) == false){
		cuowu($(this),"请输入正确的手机号码/电子邮箱");
	}else{
		zhengQue($(this));
	}
	if($(this).val() == ""){
		cuowu($(this),"请输入手机号码/电子邮箱");
	}
})
$("#pass").blur(function(){
	if(regCheck("pass",$(this).val()) == false){
		cuowu($(this),"至少6个字符含数字大小写字母");
	}else{
		zhengQue($(this));
	}
	if($(this).val() == ""){
		cuowu($(this),"密码不能为空");
	}
})
$(".zdlogin").click(function(){
	if($(".zdlogin span").html() != "√"){
		$(".zdlogin span").html("√");
	}else{
		$(".zdlogin span").html("");
	}
});
//正则判断
function regCheck(type,str){
    switch(type){
		//邮箱或者电话号码
        case "emailphone":var reg = /^\w+@\w+\.(com|net|cn)|1\d{10}$/; break;
		//邮箱
		case "email":var reg = /^\w+@\w+\.(com|net|cn)$/;break;
		//邮政编码
        case "post":var reg = /^[1-9]\d{5}$/; break;
		//身份证
        case "card":var reg = /^[1-9]\d{16}[0-9x]$/i; break;
		//电话
        case "phone":var reg = /^(1\d{10})$/;break;
		//密码 6-16位  不得少于6位  你得大于16位
		case "pass":var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;break;
        default:"";
    }
    // if(reg.test(str)==true){
    //     return true;
    // }
    // return false;
    return reg.test(str);
}
function zhengQue(this1){
	this1.next().html("");
	this1.next().css({
		"color":"red",
		"font-size":"12px",
		"line-height":"20px"
	})
	this1.css({
		"background-color":"white",
		"border":"none"
	})
};
function zhengQue01(this1){
	this1.next().html("");
	this1.next().css({
		"color":"red",
		"font-size":"12px",
		"line-height":"20px"
	})
	this1.css({
		"background-color":"#f5f5f5",
		"border":"none"
	})
};
function cuowu(this1,str){
	this1.next().html(str);
	this1.next().css({
		"color":"red",
		"font-size":"12px",
		"line-height":"20px"
	})
	this1.css({
		"background-color":"rgba(255,0,0,.3)",
		"border":"1px solid red"
	})
};
$("#loginbtn").click(function(){
	let name = $("#name").val();
	let pass = $("#pass").val();
	$.post("login.php",{"userId":name,"userPass":pass},function(data){
		console.log(data);
		if(data == "1"){
			if($(".zdlogin span").html() != "" && data == "1"){
					saveCookie("username",$("#name").val(),7);
					setTimeout(function() {
						location.href="index.html";
					},1000);
					
				}else{
					saveCookie("username",$("#name").val());
					setTimeout(function() {
						location.href="index.html";
					},1000);
				}
		}else{
			cuowu($("#pass"),"用户名或者密码错误");
		}
	})	
})
//注册
//验证重名
$("#reg_name").blur(function(){
	if(regCheck("phone",$(this).val()) == false){
		cuowu($(this),"请输入正确的手机号码");
	}else{
		$.get("checkUser.php",{"userId":$(this).val()},function(data){
		if(data == "0"){
			cuowu($("#reg_name"),"该手机号已经被注册");
		}else{
			zhengQue01($("#reg_name"));
		}
	});
	}
	if($(this).val() == ""){
		cuowu($(this),"请输入手机号码");
	}
});
//密码
$("#reg_pass").blur(function(){
	if(regCheck("pass",$(this).val()) == false){
		cuowu($(this),"至少6个字符含数字大小写字母");
	}else{
			zhengQue01($("#reg_pass"));
	};
	if($(this).val() == ""){
		cuowu($(this),"请输入密码");
	}
});
$("#reg_pass_1").blur(function(){
	if($(this).val() != $("#reg_pass").val()){
		cuowu($(this),"密码输入不一致");
	}else{
			zhengQue01($("#reg_pass"));
	};
	if($(this).val() == ""){
		cuowu($(this),"请再次输入密码");
	}
});
//图形验证码
$("#reg_img").blur(function(){
	console.log(verVal);
	if($(this).val() != verVal){
		$("#p_img").html("请输入正确的验证码");
		$("#p_img").css({
			"color":"red",
			"font-size":"12px",
			"line-height":"20px"
		})
		$(this).css({
			"background-color":"rgba(255,0,0,.3)",
			"border":"1px solid red"
		})
	}else{
		$("#p_img").html("");
		$("#p_img").css({
			"color":"red",
			"font-size":"12px",
			"line-height":"20px"
		})
		$(this).css({
			"background-color":"#f5f5f5",
			"border":"none"
		})
	}
	if($(this).val() == ""){
		$("#p_img").html("请输入验证码");
		$("#p_img").css({
			"color":"red",
			"font-size":"12px",
			"line-height":"20px"
		})
		$(this).css({
			"background-color":"rgba(255,0,0,.3)",
			"border":"1px solid red"
		})
	}
	
})
$("#zhuCe").click(function(){
	if($(".yz").html() == "" && notNall() == true && $(".radio_i").html() == "√"){
		let name1 = $("#reg_name").val();
		let pass1 = $("#reg_pass").val();
		$.post("addUser01.php",{"userId":name1,"userPass":pass1},function(data){
			if(data == "1"){
				$(".zccg").css({
					"display":"block"
				})
				setTimeout(function(){
					$(".zccg").css({
						"display":"none"
					});
					$("#registered_content").css({
						"display":"none"
					})
				},1000)
			}
		})
	}
})
$(".radio_i").click(function(){
	if($(this).html() != "√"){
		$(this).html("√");
	}else{
		$(this).html("");
	}
});
$(".radio_i").mouseenter(function(){
	$(this).css({
		"cursor":"pointer"
	})
})
function notNall(){
	if($("reg_content input").val() != ""){
		return true;
	}else{
		return false;
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