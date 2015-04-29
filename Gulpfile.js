var gulp = require('gulp'),
  connect = require('gulp-connect-multi')(),
  stylus = require('gulp-stylus'),
  jade = require('gulp-jade'),
  spritesmith = require('gulp.spritesmith'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace');

var build_path = 'build/',
    src_path = 'src/';

gulp.task('connect', connect.server({
  root: ['src'],
  livereload: true,
  open: {browser: 'chrome'}
}));

gulp.task('stylus', function () {
  gulp.src(src_path + 'stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(src_path + 'css'))
    .pipe(connect.reload());
});

gulp.task('stylus:build', function () {
  gulp.src(src_path + 'stylus/*.styl')
    .pipe(stylus({ compress: true }))
    .pipe(replace(/src\/\.\.\//g, ''))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(build_path + 'css'));
});

gulp.task('sprite', function () {
  gulp.src(src_path + 'img/icons/*.png')
    .pipe(spritesmith({
      imgName: 'img/icons.png',
      cssName: 'stylus/_partial/_sprites.styl',
      padding: 50
    }))
    .pipe(gulp.dest(src_path));
});

gulp.task('jade', function () {
  gulp.src(src_path + 'jade/*.jade')
    .pipe(jade({ pretty: true, locals: {style_link: 'style.css'} }))
    .pipe(gulp.dest(src_path))
    .pipe(connect.reload());
});
gulp.task('jade:build', function () {
  gulp.src(src_path + 'jade/*.jade')
    .pipe(jade({
      pretty: true,
      locals: {style_link: 'style.min.css'}
    }))
    .pipe(gulp.dest(build_path));
});

gulp.task('imagemin', function () {
  return gulp.src('src/img/*.{jpg,png}')
    .pipe(imagemin({ optimizationLevel: 7 }))
    .pipe(gulp.dest(build_path + '/img'));
});

gulp.task('watch', function () {
  gulp.watch([src_path + 'jade/**/*'], ['jade']);
  gulp.watch([src_path + 'stylus/**/*'], ['stylus']);
});

gulp.task('default', ['connect', 'stylus', 'jade', 'watch']);
gulp.task('build', ['stylus:build', 'jade:build', 'imagemin']);
