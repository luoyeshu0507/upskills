var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;
var mustache = require('gulp-mustache');
var path = require('path');

var i18nconf = require('./i18nconfig.json');

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./public",
      routes: {
        "/bower_components": "bower_components"
      },
      middleware: function (req, res, next) {
        res.setHeader('xxx', '123');
        next();
      }
    },
    notify: false,
    port:3012
  });

  gulp.watch(['public/**/*.html', "!node_modules/**"]).on('change', reload);
});

gulp.task('mustache', function() {
  for (var i = 0; i < i18nconf.lang.length; i++) {
    gulp.src("./public/*2.html")
    .pipe(
      mustache(
        require(
          path.resolve(i18nconf.localePath, i18nconf.lang[i] + '.json')
        )
      )
    )
    .pipe(gulp.dest("./public/i18n-template2/" + i18nconf.lang[i]));
  }
});

gulp.task('default', ['serve']);