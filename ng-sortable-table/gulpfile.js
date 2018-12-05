const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('scripts', () => {
  return gulp.src('src/scripts/ng-sortable-table.module.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', () => {
  gulp.src('src/styles/**/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('resources', () => {
  return gulp.src('src/resources/**/*')
    .pipe(gulp.dest('./dist/resources'));
});

gulp.task('watch', () => {
  gulp.watch('src/scripts/ng-sortable-table.module.js', ['scripts']).on('change', () => reload());
  gulp.watch('src/styles/**/*.+(scss|sass)', ['styles']).on('change', () => reload());
  gulp.watch('src/resources/**/*', ['resources']).on('change', () => reload());
});

gulp.task('server', ['scripts', 'styles', 'resources'], () => {
  browserSync.init({
    server: {
      baseDir: "./",
      directory: true,
    }
  });
  gulp.start('watch');
});

gulp.task('default', ['server']);
