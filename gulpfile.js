'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var es = require('event-stream');

gulp.task('sass', function () {
  return gulp.src('./scss/styles.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('public/'));
});

gulp.task('babel', function(done) {
    glob('./public/js/**.jsx', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            var fileName = entry.substring(0, entry.length - 3) + 'js';
            return browserify({ entries: [entry], extensions: ['.jsx'] })
                .transform("babelify", {presets: ["es2015", "react"]})
                .bundle()
                .pipe(source(fileName))
                .pipe(gulp.dest('.'));
        });
        es.merge(tasks).on('end', done);
    })
});

gulp.task('watch', function () {
    gulp.watch(
        ['./scss/*/*.scss','./scss/*.scss', './public/js/*.jsx', './public/js/react/*/*.jsx', './public/js/react/*/*/*.jsx'],
        ['sass', 'babel']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['sass', 'babel']);



