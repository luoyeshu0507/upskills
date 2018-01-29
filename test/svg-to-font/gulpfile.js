var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'Icons';

gulp.task('iconfont', function(){
  gulp.src(['svg/**/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
    }))
    .pipe(iconfont({
      fontName: fontName
     }))
    .pipe(gulp.dest('app/assets/fonts/icons/'));
});