const gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  fs = require('fs'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create();

let options = {
  cssFilename: 'styles',
  jsFilename: 'scripts'
};

// flag for catching errors and passing between tasks
let caughtError = false;

/* --------------------------- development process for building ---------------------------------  */
gulp.task('default', function(callback) {
  runSequence('clean:dist', ['html', 'js', 'init:browserSync', 'watch'], callback);
});

/* browser sync auto reloads the browser */
gulp.task('init:browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
});

/* trigger a manual reload */
gulp.task('browserSync', function(done) {
  if (!caughtError) {
    browserSync.reload();
  }
  done();
});

/* minifies scroll-show.js and moves it */
gulp.task('js', function() {
  var partials = fs.readFileSync('src/js/scripts.js', 'utf-8');
  arrPartials = partials.replace(/["';]/g, '').split(/\r?\n/);
  // remove empty lines
  for (var i = 0; i < arrPartials.length; i++) {
    if (arrPartials[i] == '' || arrPartials[i] == undefined) {
      arrPartials.splice(i, 1);
      i--;
    }
  }

  return (
    gulp
      .src(arrPartials)
      .pipe(concat('object-fit-polyfill.min.js'))
      // .pipe(babel({
      //     presets: ['env']
      // }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/'))
  );
});

/* watchers to run tasks automatically then trigger browser reload */
gulp.task('watch', function() {
  gulp.watch('src/*.html', function() {
    runSequence('html', ['browserSync']);
  });
  gulp.watch(['src/js/**/*.js', `src/js/${options.jsFilename}.js`], function() {
    runSequence('js', ['browserSync']);
  });
});

/* cleans out folder */
gulp.task('clean:dist', function() {
  return del.sync('dist', { force: true });
});

gulp.task('html', function() {
  return gulp.src(['src/**/*.html']).pipe(gulp.dest('dist/'));
});
