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
  babelify = require("babelify"),
  source = require("vinyl-source-stream"),
  browserify = require("browserify"),
  reactify = require("reactify"),
  envify = require("envify");

const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
var watchify = require('watchify');

var production = process.env.NODE_ENV === 'production';

gulp.task("clean:dist", function() {
  return del.sync("dist");
});

gulp.task("images", function() {
  return gulp
    .src("src/asset/images/**/*.+(png|jpg|gif|svg)")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest("dist/images"));
});

gulp.task("fonts", function() {
  return gulp.src("src/asset/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "dist/",
      index: "index.html",
    },
  });
});

gulp.task("sass", function() {
  return gulp
    .src("src/scss/**/*.{sass,scss}")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("pug", function() {
  return gulp
    .src("src/pug/**/*.pug")
    .pipe(sourcemaps.init())
    .pipe(
      pug({
        prettier: true,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("eslint", function() {
  return gulp
    .src("src/**/*.{jsx,js}")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task("babel", ["eslint"], function() {
  return browserify({
    entries: ["./src/index.jsx"],
    standalone: "openpgp",
    cache: {},
    packageCache: {},
    debug: true,
  })
    .transform(babelify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", console.error))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));
});

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify({
    basedir: __dirname,
    debug: !production,
    entries: './src/index.jsx',
    cache: {},
    packageCache: {},
    fullPaths: watch
  });
  if(watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(babelify);
  bundler.transform({global: true}, envify);

  if(production) {
    bundler.transform({global: true}, uglifyify);
  }

  rebundle = function() {
    var stream = bundler.bundle();

    stream = stream.pipe(source('bundle.js'));

    if(production) {
      stream.pipe(gStreamify(uglify()));
    }

    return stream.pipe(gulp.dest('dist'));
  };
  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('scripts', ['eslint'], function() {
  return scripts(false);
});

gulp.task('watchScripts', ['eslint'], function() {
  return scripts(true);
});



gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.{sass,scss}", ["sass"]);
  gulp.watch("src/pug/**/*.pug", ["pug", browserSync.reload]);
  gulp.watch("src/**/*.{jsx,js}", ["watchScripts", browserSync.reload]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("default", [
  // "clean:dist",
  "sass",
  "pug",
  "images",
  "fonts",
  "eslint",
  "scripts",
  "browserSync",
  "watch",
]);
