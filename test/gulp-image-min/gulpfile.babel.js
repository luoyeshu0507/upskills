import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import fs from 'fs';
import path from 'path';

function miniImageFn(p) {
  fs.readdir(p, {
    withFileTypes: true,
  }, async function(err, files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let name = file.name;
      if (!name.match(/\.(jpg|png|svg)/) && !file.isDirectory()) {
        console.log(name);
      }
      if (file.isDirectory()) {
        miniImageFn(path.join(p, file.name));
      } else if (!file.name.startsWith('.')) {
        gulp.src(path.join(p, name))
          .pipe(imagemin({
            verbose: true,
          }))
          .pipe(gulp.dest(path.join('dist', p)))
      }
    }
  });
}

miniImageFn('img');



// const gulp = require('gulp');
// const imagemin = require('gulp-imagemin').default;
// defaultTask = function() {
//   return gulp.src('src/images/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/images'))
// }

// exports.default = defaultTask