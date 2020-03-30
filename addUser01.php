<?php
	
	header("content-type","text/html;charset=utf-8");
	
	//一、接收前端传来的数据
	$userId = $_POST["userId"];
	$userPass = $_POST["userPass"];
	
	//二、保存数据
	//1、建立连接并选择数据库
	$conn = mysql_connect("localhost","root","root");
	
	if(!$conn){
		//die("连接失败".mysql_error());
		echo "0";	
	}	
	mysql_select_db("caoben",$conn);
	
	//2、执行SQL语句
	$sqlStr = "insert into usertable(userId,userPass)
              values('".$userId."','".$userPass."')";
	//echo $sqlStr;
	
	mysql_query($sqlStr,$conn);
	
	//3、关闭数据库
	mysql_close($conn);
	
	//三、给前端响应
	echo "1";

?>