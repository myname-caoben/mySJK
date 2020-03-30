
//ajax请求的封装
//参数：
// 请求方式
// 请求的地址
// 请求的参数
// 回调函数
// 是否异步
//返回值：无

function ajax1912(method,url,parameters,fn,isAsync){
    //1、创建对象
    let xhr = new XMLHttpRequest();

    //2、设置请求参数
    let urlAndParam = url;
    if(method.toLowerCase()==="get"){
        urlAndParam += "?"+parameters;
    }
    xhr.open(method,urlAndParam,isAsync)

    //3、设置回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
			console.log(xhr.responseText);
            fn(xhr.responseText);
        }
    }

    //4、发送请求
    if(method.toLowerCase()==="get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(parameters);
    }

}


//ajax请求的封装
//参数：
// 请求方式
// 请求的地址
// 请求的参数
// 回调函数
// 是否异步
//返回值：无

function ajax191202(obj){
    let defaultObj ={
        method:"get",
        url:"#",
        parameters:"",
        fn:null,
        isAsync:true
    }
    for(let key in defaultObj){
        if(obj[key]!=undefined){
            defaultObj[key] = obj[key];
        }
    }
    ajax1912(defaultObj.method,defaultObj.url,defaultObj.parameters,defaultObj.fn,defaultObj.isAsync)

}