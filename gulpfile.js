var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var gnf = require('gulp-npm-files');

// Copy dependencies to build/node_modules/ 
gulp.task('copyNpmDependenciesOnly', function () {
  gulp.src(gnf(), {base: './'}).pipe(gulp.dest('./dist/popis'));
});
gulp.task('copyAllNpmDependencies', function () {
  gulp.src(gnf(true), {base: './'}).pipe(gulp.dest('./resources/vendor'));
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('resources/scss/**/*.scss', ['sass']);
  // Other watchers
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('resources/js/**/*.js', browserSync.reload);
});


gulp.task('build', function (callback) {
  runSequence('clean:dist',
  ['sass', 'useref', 'images', 'fonts'],
  callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync'], 'watch',
  callback
  );
});

gulp.task('sass', function () {
  return gulp.src('resources/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
  .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
  .pipe(gulp.dest('resources/css')) // Outputs it in the css folder
  .pipe(browserSync.reload({// Reloading with Browser Sync
    stream: true
  }));
});


gulp.task('useref', function () {
  return gulp.src('*.html')
  .pipe(useref())
  .pipe(gulpIf('resources/js/**/*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('dist'));
});

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback);
});

gulp.task('clean:dist', function () {
  return del.sync(['dist/**/*', '!dist/resources/img', '!dist/resources/img/**/*']);
});

gulp.task('images', function () {
  return gulp.src('resources/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
    // Setting interlaced to true
    interlaced: true
  }))
  .pipe(gulp.dest('dist/resources/img'));
});

gulp.task('fonts', function () {
  return gulp.src('resources/fonts/**/*')
  .pipe(gulp.dest('dist/resources/fonts'));
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});