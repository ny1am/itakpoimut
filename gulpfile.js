var gulp = require('gulp');
var sass = require('gulp-sass');
var handlebars = require('gulp-handlebars');
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

var baseUrl = require('./server/config/variables.js').baseUrl;
var hash = process.env.NODE_ENV === 'production' ? Math.random().toString(36).substr(2, 5) : '';

gulp.task('browserify', function() {
	return browserify('./public/js/src/browserify.js')
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

gulp.task('html', function() {
	return gulp.src('./server/hbs-views/src/**/*.handlebars')
		.pipe(inject.replace('#injected:{base_url}', baseUrl))
		.pipe(inject.replace('#injected:{hash-version}', hash))
		.pipe(gulp.dest('./server/hbs-views/dist'));
});

gulp.task('css', function () {
	return gulp.src('./public/css/src/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename('main-'+hash+'.css'))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('handlebars', function() {
	gulp.src('./server/hbs-views/src/partials/**/*.handlebars')
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			root: 'exports',
				noRedeclare: true // Avoid duplicate declarations
			}))
		.pipe(concat('templates.js'))
		.pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
		.pipe(gulp.dest('./public/js/src/'));
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
		['sprite', 'handlebars'],
		'css',
		'browserify',
		'uglify',
		'html'
	);
});

gulp.task('watch', function(){
	watch('./public/img/icons/*.png', function() {
		gulp.start('sprite-icon');
	});
	watch('./public/img/landing/*.png', function() {
		gulp.start('sprite-landing');
	});
	watch('./public/js/src/**/*.js', function() {
		gulp.start('browserify');
	});
	watch('./shared/js/**/*.js', function() {
		gulp.start('browserify');
	});
	watch('./server/hbs-views/src/**/*.handlebars', function() {
		gulp.start('html');
	});
	watch('./public/css/src/**/*.scss', function() {
		gulp.start('css');
	});
	watch('./server/hbs-views/src/partials/**/*.handlebars', function() {
		gulp.start('handlebars');
	});
	watch('./public/js/main.js', function() {
		gulp.start('uglify');
	});
});

gulp.task('prod', ['process']);
gulp.task('dev', ['process', 'watch']);

gulp.task('default', ['dev']);


//react config here

gulp.task('browserify-react', function() {
	return browserify('./public/js/src/browserify-react.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('watch-react', function(){
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

gulp.task('process-react', function() {
	runSequence(
		'sprite',
		['css', 'browserify-react']
		
	);
});

gulp.task('dev-react', ['process-react', 'watch-react']);