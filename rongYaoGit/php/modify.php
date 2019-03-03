<?php
	header('content-type:text/html;charset="utf-8"');
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	$password = md5(md5($password)."rongYao");
	//1、连接数据库
	$link = mysql_connect("localhost", "root", "123456");
	//2、判断是否连接成功
	if(!$link){
		echo "连接失败";
		exit;
	}
	//3、设置字符编码格式
	mysql_set_charset("utf8");
	//4、选择数据库
	mysql_select_db("qd1807");
	//5、准备sql语句
	//首先判断该用户名是否存在
	$sql = "SELECT * FROM rongYao WHERE phone='{$username}' OR email='{$username}'";
	$res = mysql_query($sql);
	//进行处理
	$row = mysql_fetch_assoc($res);
	if(!$row){
		echo "用户名或者邮箱有误，不能进行重设密码";
		exit;
	}
	//5、准备sql语句
	$sql = "UPDATE rongYao SET password='{$password}' where phone='{$username}';";
	//6、发送sql语句
	$res = mysql_query($sql);
	//进行处理
/*	$row = mysql_fetch_assoc($res);
	echo $row;*/
	if($res){
		echo "修改成功，3s后跳转登录页面";
	}
	//关闭数据库
	mysql_close($link);
?>