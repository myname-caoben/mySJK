<?php
	header("content-type","text/html;charset=utf-8");
	
	//1接收数据
	$userId = $_GET["userId"];
	//$userId = "baobao1";
	//2、在数据库中查询
	   //1)、建立连接，并选择数据库
	   $conn = mysql_connect("localhost","root","root");
	   mysql_select_db("caoben",$conn);
	   //2)、执行SQL语句（查询）
	   $sqlStr="select * from usertable where userId='".$userId."'";
	   
	   $result=mysql_query($sqlStr,$conn);
	   $rows = mysql_num_rows($result);
	   //3)、关闭连接
	   mysql_close($conn);
	//3、响应结果
	//获得$result的行数
		
	if($rows>0){//如果用户名存在，返回0；
		echo "0";	
	}else {//如果用户名不存在，返回1.
		echo "1";
	}	
?>