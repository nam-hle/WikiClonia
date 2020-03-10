var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    pug = require('gulp-pug'),
    browserSync = require("browser-sync"),
    runSequence = require('run-sequence'),
    useref = require('gulp-useref');

// gulp.task('useref', function(){
//   return gulp.src('src/*.html')
//     .pipe(useref())
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
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass,
                                             // log errors to console
    .pipe(gulp.dest('dist'))             // Outputs it in the css folder
    .pipe(browserSync.reload({               // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('pug', function() {
  return gulp.src("src/pug/**/*.pug")
      .pipe(pug())
      .pipe(gulp.dest("dist/"))
      .pipe(browserSync.reload({ // Reloading with Browser Sync
        stream: true
      }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('src/scss/**/*.{sass,scss}', ['sass']);
  gulp.watch('src/pug/**/*.pug', ['pug', browserSync.reload]);
  gulp.watch('src/js/**/*.js', [browserSync.reload]);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['sass', 'pug', 'browserSync', 'watch']);
