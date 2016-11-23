var gulp = require('gulp');
var sass = require('gulp-sass');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject-string');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');

var hash = '';

gulp.task('browserify', function() {
	return browserify('./public/js/src/browserify-react.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('uglify', function() {
	return gulp.src('./public/js/main.js')
		.pipe(uglify())
		.pipe(rename('main-'+hash+'.js'))
		.pipe(gulp.dest('./public/js'));
});


gulp.task('css', function () {
	return gulp.src('./public/css/src/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename('main-'+hash+'.css'))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('sprite-icon', function () {
  var spriteData = gulp.src('./public/img/icons/*.png').pipe(spritesmith({
    imgName: 'icons-sprite.png',
    imgPath: '../img/icons-sprite.png',
    cssName: 'icons-sprite.scss',
    cssVarMap: function (sprite) {
		  sprite.name = 'sprite-icon-' + sprite.name;
		}
  }));
  var imgStream = spriteData.img.pipe(gulp.dest('./public/img/'));
  var cssStream = spriteData.css.pipe(rename('_icons-sprite.scss')).pipe(gulp.dest('./public/css/src/'));
  return merge(imgStream, cssStream);
});

gulp.task('sprite-landing', function () {
  var spriteData = gulp.src('./public/img/landing/*.png').pipe(spritesmith({
    imgName: 'landing-sprite.png',
    imgPath: '../img/landing-sprite.png',
    cssName: 'landing-sprite.scss',
    cssVarMap: function (sprite) {
		  sprite.name = 'sprite-landing-' + sprite.name;
		}
  }));
  var imgStream = spriteData.img.pipe(gulp.dest('./public/img/'));
  var cssStream = spriteData.css.pipe(rename('_landing-sprite.scss')).pipe(gulp.dest('./public/css/src/'));
  return merge(imgStream, cssStream);
});

gulp.task('sprite', ['sprite-icon', 'sprite-landing']);

gulp.task('process', function() {
	runSequence(
		'sprite',
		['css', 'browserify'],
		'uglify'
	);
});

gulp.task('watch', function(){
	watch('./public/img/icons/*.png', function() {
		gulp.start('sprite-icon');
	});
	watch('./public/img/landing/*.png', function() {
		gulp.start('sprite-landing');
	});
	watch('./public/js/src/**/*.js*', function() {
		gulp.start('browserify-react');
	});
	watch('./server/react-views/**/*.js*', function() {
		gulp.start('browserify-react');
	});
	watch('./public/css/src/**/*.scss', function() {
		gulp.start('css');
	});
});

gulp.task('prod', ['process']);
gulp.task('dev', ['process', 'watch']);

gulp.task('default', ['dev']);