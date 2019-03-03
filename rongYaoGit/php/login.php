<?php
	header('content-type:text/html;charset="utf-8"');
	//取出post传过来的数据
	$username = $_POST['username'];
	$password = $_POST['password'];
	//将取出的密码进行加密
	$password = md5(md5($password)."rongYao");
	//1、连接数据库
	$link = mysql_connect("localhost", "root", "123456");
	//判断是否连接成功
	if(!$link){
		echo "连接数据库失败";
		exit;
	}
	//2、设置字符编码
	mysql_set_charset("utf8");
	//4、选择数据库
	mysql_select_db("qd1807");
	//5、准备sql语句
	$sql = "SELECT * FROM rongYao WHERE phone='{$username}' AND password='{$password}' OR email='{$username}' AND password='{$password}'";
	//6、发送sql语句
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	//7、进行处理结果
	if($row){
		echo "登录成功,3s后跳转";
	}else{
		echo "用户名或者密码错误";
	}
	//8、关闭数据库
	mysql_close($link);
?>