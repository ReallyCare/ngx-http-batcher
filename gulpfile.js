var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('compress', function() {
  gulp.src('dist/bundles/*.js')
    .pipe(minify({
        noSource: true,
        ext: {
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist/bundles/'))
});

gulp.task('copy', function () {
  gulp.src(['package.json','*.md'])
   .pipe(gulp.dest('dist'));
});
