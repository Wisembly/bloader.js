var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.start('scripts', 'styles');
});

gulp.task('scripts', function () {
    return gulp.src(['bloader.js'])
        .pipe(concat('bloader.js'))
        .pipe(gulp.dest('build'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('styles', function () {
    return gulp.src(['bloader.css'])
        .pipe(gulp.dest('build'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build'))
        .pipe(notify({ message: 'Styles task complete' }));
});
