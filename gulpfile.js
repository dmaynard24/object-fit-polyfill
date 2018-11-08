var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    fs = require('fs'),
    runSequence = require('run-sequence');

/* --------------------------- development process for building ---------------------------------  */
gulp.task('default', function(callback) {
    runSequence('clean:dist',['js','watch'],callback)
});

/* minifies scroll-show.js and moves it */
gulp.task('js', function() {
    var partials = fs.readFileSync('src/js/scripts.js', 'utf-8');
    arrPartials = partials.replace(/["']/g, '').split(/\r?\n/);
    // remove empty lines
    for (var i = 0; i < arrPartials.length; i++) {
        if (arrPartials[i] == '' || arrPartials[i] == undefined) {
            arrPartials.splice(i, 1);
            i--;
        }
    }

    return gulp.src(arrPartials)
        .pipe(concat('scroll-show.min.js'))
        // .pipe(babel({
        //     presets: ['env']
        // }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

/* watchers to help browser sync auto reload */
gulp.task('watch', ['js'], function() {
    gulp.watch('src/js/**/*.js', ['js']);
});

/* cleans out folder */
gulp.task('clean:dist', function() {
    return del.sync('dist', {force: true});
});