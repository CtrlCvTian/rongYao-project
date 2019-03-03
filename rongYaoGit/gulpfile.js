//gulp任务
var gulp = require("gulp");
//拷贝html文件
gulp.task("copy-html",function(){
	return gulp.src("html/*.html")
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload());
})
//拷贝php页面
gulp.task("copy-php",function(){
	return gulp.src("php/*")
	.pipe(gulp.dest("dist/php"))
	.pipe(connect.reload());
})
//拷贝图片
gulp.task("images",function(){
	return gulp.src("images/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})
//拷贝iconfont
gulp.task("iconfont", function(){
	return gulp.src("iconfont/*")
	.pipe(gulp.dest("dist/iconfont"));
})
//拷贝iconfont2
gulp.task("iconfont2", function(){
	return gulp.src("iconfont2/*")
	.pipe(gulp.dest("dist/iconfont2"));
})
//拷贝js代码
gulp.task("scripts",function(){
	return gulp.src(["js/*.js", "!gulpfile.js", "!index.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})
//index.js单独进行处理
//	gulp-uglify	进行压缩
//	gulp-rename	重命名
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
gulp.task("scripts-index",function(){
	return gulp.src("js/index.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
	/*.pipe(uglify())
	.pipe(rename("index.min.js")) jQuery代码不能压缩*/
})
/*
	拷贝数据
 */
gulp.task("data",function(){
	return gulp.src(["*.json", "!package.json", "!package-lock.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})
/*处理其他css文件*/
gulp.task("sass-other",function(){
	return gulp.src(["css/*.scss", "!index.scss"])
	.pipe(sass())//转成css文件
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*
	处理indexcss文件
	gulp-sass	写css代码
	gulp-minify-css	压缩css文件
 */
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
gulp.task("sass-index",function(){
	return gulp.src("css/index.scss")
	.pipe(sass())//转成css文件
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*
	在运行文件之前先将所有的任务运行一遍
	build  同时执行多个任务
 */
gulp.task("build",["copy-html", "images", "scripts", "scripts-index", "data", "sass-index", "sass-other", "iconfont", "iconfont2", "copy-php"], function(){
	console.log("任务执行完成,项目已经建立");
})

// 监听  实时进行刷新(任务
gulp.task("watch", function(){
	gulp.watch("html/*.html", ["copy-html"]);
	gulp.watch("images/*", ["images"]);
	gulp.watch(["js/*.js", "!gulpfile.js", "!index.js"],["scripts"]);
	gulp.watch(["*.json", "!package.json", "!package-lock.json"],["data"]);
	gulp.watch("js/index.js",["scripts-index"]);
	gulp.watch("css/index.scss", ["sass-index"]);
	gulp.watch(["css/*.scss", "!index.scss"], ["sass-other"]);
	gulp.watch("iconfont/*", ["iconfont"]);
	gulp.watch("iconfont2/*", ["iconfont2"]);
	gulp.watch("php/*", ["copy-php"]);
})

/*
	实时刷新任务
 */
var connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root: "dist",
		//是否实时刷新
		livereload: true
	})
})

//设置默认任务
gulp.task("default", ["watch", "server"]);
// 在命令行中先输入 gulp build
// 再去执行 gulp 建立项目路径