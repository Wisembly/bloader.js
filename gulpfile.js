var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    insert = require ('gulp-insert'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

gulp.task('default', function () {
    gulp.start('scripts', 'styles', 'concat', 'clean');
});

gulp.task('scripts', function () {
    return gulp.src(['bloader.js'])
        .pipe(concat('bloader.js'))
        .pipe(gulp.dest('build'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(insert.wrap('<script type="text/javascript">', '</script>'))
        .pipe(gulp.dest('build/temp'));
});

gulp.task('styles', function () {
    return gulp.src(['bloader.css'])
        .pipe(gulp.dest('build'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build'))
        .pipe(insert.wrap('<style type="text/css">', '</style>'))
        .pipe(gulp.dest('build/temp'));
});

gulp.task('concat', ['styles', 'scripts'], function () {
    return gulp.src(['build/temp/*'])
        .pipe(concat('bloader.min.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('clean', ['concat'], function() {
  return gulp.src(['build/temp'], {read: false})
    .pipe(clean())
    .pipe(notify({ message: 'Bloader build complete' }));
});
