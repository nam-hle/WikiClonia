var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  cleanCSS = require("gulp-clean-css"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync"),
  runSequence = require("run-sequence"),
  gulpIf = require("gulp-if"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  babel = require("gulp-babel"),
  react = require("gulp-react"),
  concat = require("gulp-concat"),
  eslint = require("gulp-eslint"),
  del = require("del"),
  cache = require("gulp-cache"),
  buffer = require("vinyl-buffer"),
      babelify = require('babelify'),
    source = require("vinyl-source-stream"),

  browserify = require("browserify");


gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task("images", function() {
  return gulp
    .src("src/asset/images/**/*.+(png|jpg|gif|svg)")
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest("dist/images"));
});

gulp.task("fonts", function() {
  return gulp.src("src/asset/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "dist/",
      index: "index.html"
    }
  });
});

gulp.task("sass", function() {
  return (
    gulp
      .src("src/scss/**/*.{sass,scss}")
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

gulp.task("pug", function() {
  return gulp
    .src("src/pug/**/*.pug")
    .pipe(sourcemaps.init())
    .pipe(pug({
      "prettier": true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("eslint", function() {
  return (
    gulp
      .src("src/**/*.{jsx,js}")
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
  );
});

gulp.task("babel", ['eslint'], function(){
    return browserify({
        entries: ["./src/index.jsx"]
    })
    .transform(babelify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify().on('error', console.error))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.{sass,scss}", ["sass"]);
  gulp.watch("src/pug/**/*.pug", ["pug", browserSync.reload]);
  gulp.watch("src/**/*.{jsx,js}", ["babel", browserSync.reload]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});




gulp.task("default", [
  // "clean:dist",
  "sass",
  "pug",
  "images",
  "fonts",
  "eslint",
  "babel",
  "browserSync",
  "watch"
]);
