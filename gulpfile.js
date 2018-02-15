const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');


//Minify js and Concatenate
gulp.task('js', function() {
	return gulp.src('src/js/*.js')
	  .pipe(concat('main.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('dist/js'))
	  .pipe(browserSync.stream());
});

//Comiple SASS, Minify CSS and Concatenate
gulp.task('css', function() {
	return gulp.src('src/scss/*.scss')
	  .pipe(sass().on('error', sass.logError))
	  .pipe(autoprefixer('last 2 versions'))
	  .pipe(concat('main.css'))
	  .pipe(minifyCSS({compatibility: 'ie8'}))
	  .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});

//Optimize images
gulp.task('imagemin', function() {
	return gulp.src('src/img/*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('dist/img'))
	  .pipe(browserSync.stream());
});

// Watch SASS & Serve
gulp.task('serve', ['css', 'js', 'imagemin'], function() {

    browserSync.init({
        server: "./dist"  
    });

    gulp.watch(['css', 'js', 'imagemin']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

//Default
gulp.task('default', ['serve']);

