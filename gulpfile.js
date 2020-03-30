//引入
const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");;
const babel = require("gulp-babel");
const es2015Preset = require("babel-preset-es2015");
gulp.task("copy",async function(){
	gulp.src("img/*.{png,jpg,mp4}")
	.pipe(gulp.dest("D:\\phpStudy\\www\\release\\img"));
	gulp.src("js/*.js")
	.pipe(gulp.dest("D:\\phpStudy\\www\\release\\js"));
})

gulp.task("watchall",async function(){
	gulp.watch("js/*.js",async function(){
	    gulp.src("js/*.js")
		// .pipe(babel({presets:[es2015Preset]}))
		// .pipe(uglify())
	    .pipe(gulp.dest("D:\\phpStudy\\www\\release\\js"));
	})
	gulp.watch("scss/*.scss",async function(){
	    gulp.src("scss/*.scss")
	    .pipe(sass())
	    .pipe(gulp.dest("css"));
	})
	gulp.watch("css/*.css",async function(){
		gulp.src("css/*.css")
		.pipe(gulp.dest("D:\\phpStudy\\www\\release\\css"));
	});
	gulp.watch("*.php",async function(){
		gulp.src("*.php")
		.pipe(gulp.dest("D:\\phpStudy\\www\\release"));
	});
	gulp.watch("*.html",async function(){
		gulp.src("*.html")
		.pipe(gulp.dest("D:\\phpStudy\\www\\release"));
	});
})