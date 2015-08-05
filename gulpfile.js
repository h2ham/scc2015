'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('serve', ['sass', 'html'], function() {

  browserSync.init({
    server: 'html'
  });

  gulp.watch(['_source/css/*.scss'], ['sass']);
  gulp.watch(['_source/**/*.html'], ['html']);
});

gulp.task('sass', function() {
  return gulp.src(['_source/css/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('html/css'))
    .pipe(browserSync.stream());
});

gulp.task('metalsmith-build', function (done) {
  return require('child_process').spawn('npm', ['run', 'metalsmith'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('html', ['metalsmith-build'], function () {
  return gulp.src(['.tmphtml/**/*.html'])
    .pipe(gulp.dest('html'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
