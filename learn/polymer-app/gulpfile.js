var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;

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

gulp.task('default', ['serve']);