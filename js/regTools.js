
//功能：把所有常见的正则进行封装
// 参数：
// 类型：如，"email" 表示要验证的是邮箱；再如："phone"表示要验证的是手机
// 字符串：
//返回值：true：通过；false：不通过

function regCheck(type,str){
    switch(type){
		//邮箱或者电话号码
        case "email":var reg = /^[(\w+@\w+\.(com|net|cn)$) | (1\d{10})]/; break;
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


