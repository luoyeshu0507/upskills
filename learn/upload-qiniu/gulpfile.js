var gulp = require('gulp');
var upQiniu = require('gulp-qiniu');

gulp.task('default', function() {
  return gulp.src(['./js/**', './images/*.jpg'])
  .pipe(upQiniu({
    accessKey: "7K5nPbHfjB_J5R6p9ekTLHtjFWsJ65lCmzOkmj0_",
    secretKey: "OQ6jWj59GEkhSEeYbuB8Uz81Z3HWwP7Fj6t50ORS",
    bucket: "testupload",
    private: false
  }, {
    dir: '',
    versioning: false,
    concurrent: 10
  }))
});