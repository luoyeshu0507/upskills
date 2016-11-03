var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');


gulp.task('default', ['watch'], function() {
  
	return gulp.src('es6/*.js')
	.pipe(plumber())
	.pipe(babel({
		presets: ['es2015', 'stage-0'],
		plugins: ['transform-runtime']
	}))
	.pipe(gulp.dest('js'));

});

gulp.task('watch', function() {
	gulp.watch(['es6/*.js'], ['default']);
});