var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream');

// Transform JSX to regular JavaScript
gulp.task('transform', function () {
  var tf = browserify({
    entries: ['./app/js/index.js'],
    transform: [reactify],
    debug: true
  });

  return tf.bundle()
        .pipe(source('./dist/js/'))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// Copy HTML file
gulp.task('copy-html', function () {
  return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});

// Watch file changes
gulp.task('watch', function () {
  gulp.watch(['./app/js/*.js', './app/js/**/*.js'], ['transform']);
  gulp.watch(['./app/index.html'], ['copy-html']);
});

// Express server
gulp.task('serve', function () {
  nodemon({
    script: 'server.js'
  });
});

gulp.task('default', ['copy-html', 'transform', 'serve', 'watch']);
