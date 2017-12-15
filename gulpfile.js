var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var scsslint = require('gulp-scss-lint');

gulp.task('sass', function() {
  return gulp.src('assets/scss/app.scss')
    .pipe($.sass({
      includePaths: 'assets/scss',

    })
    .on('error', $.sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('uglify', function () {

    gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream())
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['sass', 'uglify'], function() {
    browserSync.init({
        server: './dist/',
        open: true,
        notify: false
    });
		gulp.watch('assets/scss/*.scss',['sass']);
		gulp.watch('assets/js/*.js', ['uglify']);
		 gulp.watch("dist/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['serve']);

