// include gulp
var gulp = require('gulp');

// include plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat_css = require('gulp-concat-css');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var pages = require('gulp-gh-pages');

// other variables
var sass_option = {
    outputStyle: 'expanded'
};

var csso_option = {
    restructure: false
};

var autoprefixer_option = {
    browsers: ['last 2 versions'],
    cascade : false
};

var htmlmin_option = {
    collapseWhitespace  : true,
    conservativeCollapse: true,
    removeComments      : true
};

// compile scss
gulp.task('sass', function() {
    'use strict';
    return gulp.src('src/scss/styles.scss')
               .pipe(sass(sass_option))
               .pipe(autoprefixer(autoprefixer_option))
               .pipe(gulp.dest('src/css/'));
});

// concat and minify css
gulp.task('css', ['sass'], function() {
    'use strict';
    return gulp.src(['src/css/styles.css'])
               .pipe(concat_css('styles.min.css'))
               .pipe(csso(csso_option))
               .pipe(gulp.dest('dist/css/'));
});

// minify html
gulp.task('html', function() {
    'use strict';
    return gulp.src('src/index.html')
               .pipe(htmlmin(htmlmin_option))
               .pipe(gulp.dest('dist'));
});

// deploy task
gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(pages());
});

// build task
gulp.task('build', ['css','html']);