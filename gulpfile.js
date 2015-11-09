var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var ts = require('gulp-typescript');
var sass = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'typescript'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("app/styles/*.scss", ['sass']);
    gulp.watch("app/**/*.ts", ['typescript']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile typescript & auto-inject into browsers
gulp.task('typescript', function () {
    return gulp.src('./app/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('dist/app'));
        .pipe(browserSync.stream());
});
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/styles"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
