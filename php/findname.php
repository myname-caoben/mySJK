<?php
    header("Content-type:text/html;charset=utf-8");
    //1、接收前端的数据
    $username = $_GET['username'];

    //2、处理（连接数据库）
    //1）、连接数据库服务器（搭桥）
    // mysql_connect();
    $conn = mysql_connect("localhost","root","root");

    if(!$conn){
        echo "出错了……";
    }else{
         //2）、选择数据库的名字（目的地）
        mysql_select_db("mydb1912",$conn);
        
        //3）、传输数据（增删改查）SQL语句
        
        $sqlstr="select * from vip where username='$username'";
        $result = mysql_query($sqlstr,$conn);//查询语句的返回值是表格；
        
        //4）、关闭数据库（过河拆桥）
        mysql_close($conn);

        //3、响应
        if(mysql_num_rows($result)==0){
            echo "1";
        }else{
            echo "0";
        }
    }
?>