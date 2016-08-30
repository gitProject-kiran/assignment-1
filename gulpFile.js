







var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    stringify = require('stringify'),
    browserSync = require('browser-sync').create();

gulp.task('build',function(){
    return browserify('public/js/app.js')
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.html'] },
            minify: true
        })
        .bundle()
       .pipe(source('app.js'))
       .pipe(gulp.dest('./build/js'));
});


gulp.task('browser-sync', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./build",
            routes: {
                "/node_modules": "node_modules"
            }
        },
        browser:"chrome"
    });
});

gulp.task('default',['browser-sync'],function(){
    gulp.watch("./public/**/*.*", ["build"]);
    gulp.watch("./build/**/*.*").on('change', browserSync.reload);

});

