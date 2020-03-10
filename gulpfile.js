var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    pug = require('gulp-pug'),
    browserSync = require("browser-sync"),
    runSequence = require('run-sequence'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify');

// gulp.task('useref', function(){
//   return gulp.src('dist/*.html')
//     .pipe(useref())
//     // .pipe(gulpIf('*.js', uglify()))
//     // Minifies only if it's a CSS file
//     .pipe(gulpIf('*.css', cssnano())
//     .pipe(gulp.dest('dist'))
// });

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist/',
      index: "index.html",
    }
  })
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.{sass,scss}')      // Gets all files ending with
                                             // .scss in app/scss
                                             // and children dirs
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass,
                                             // log errors to console
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))             // Outputs it in the css folder
    .pipe(browserSync.reload({               // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('pug', function() {
  return gulp.src("src/pug/**/*.pug")
      .pipe(sourcemaps.init())
      .pipe(pug())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/"))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('src/scss/**/*.{sass,scss}', ['sass', 'useref']);
  gulp.watch('src/pug/**/*.pug', ['pug', browserSync.reload]);
  gulp.watch('src/js/**/*.js', [browserSync.reload]);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['sass', 'pug', 'browserSync', 'watch']);
