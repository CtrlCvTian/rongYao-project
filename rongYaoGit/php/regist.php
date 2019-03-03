<?php
	header('content-type:text/html;charset="utf-8"');
	//取出post传过来的数据
	$phone = $_POST['phone'];
	$password = $_POST['password'];
	$email = $_POST['email'];
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
	
	//查看是否用户名已经存在
	$sql = "SELECT * FROM rongYao WHERE phone='{$phone}' OR email='{$email}'";
	//得到结果
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	//如果取出来数据
	if($row){
		echo "用户名或者邮箱地址已经存在,请重新输入信息";
		exit;
	}
	//5、准备sql语句
	$sql = "INSERT INTO rongYao(phone,password,email) VALUES('{$phone}','{$password}','{$email}');";
	//6、发送sql语句
	$res = mysql_query($sql);
	//7、进行处理结果
	if($res){
		echo "注册成功，3s后跳转登录页面";
	}
	//8、关闭数据库
	mysql_close($link);
?>