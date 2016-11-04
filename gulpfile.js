var gulp = require('gulp');
var compressor = require('gulp-compressor');
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
	return gulp.src('./server/views/src/**/*.handlebars')
		.pipe(inject.replace('#injected:{base_url}', baseUrl))
		.pipe(inject.replace('#injected:{hash-version}', hash))
		.pipe(compressor({'remove-intertag-spaces': true}))
		.pipe(gulp.dest('./server/views/dist'));
});

gulp.task('css', function () {
	return gulp.src('./public/css/src/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename('main-'+hash+'.css'))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('handlebars', function() {
	gulp.src('./server/views/src/partials/**/*.handlebars')
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

gulp.task('process', function() {
	runSequence(
		['handlebars', 'css'],
		'browserify',
		'uglify',
		'html'
	);
});

gulp.task('watch', function(){
	watch('./public/js/src/**/*.js', function() {
		gulp.start('browserify');
	});
	watch('./shared/js/**/*.js', function() {
		gulp.start('browserify');
	});
	watch('./server/views/src/**/*.handlebars', function() {
		gulp.start('html');
	});
	watch('./public/css/src/**/*.scss', function() {
		gulp.start('css');
	});
	watch('./server/views/src/partials/**/*.handlebars', function() {
		gulp.start('handlebars');
	});
	watch('./public/js/main.js', function() {
		gulp.start('uglify');
	});
});

gulp.task('prod', ['process']);
gulp.task('dev', ['process', 'watch']);

gulp.task('default', ['dev']);