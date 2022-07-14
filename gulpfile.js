const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');

const webpackConfig = require('./webpack.config.js');

// Removes previous dist
gulp.task('clean', () => {
  return gulp.src('./dist', { allowEmpty: true })
    .pipe(clean());
});

// Creates js bundle from several js files
gulp.task('bundle', () => {
  return webpack(webpackConfig)
    .pipe(gulp.dest('./dist/client/finaleCodeBundle'))
});

// Converts scss to css
gulp.task('scss', () => {
  return gulp.src('./src/client/Styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/client/Styles'));
});

// Transfers index
gulp.task('index', () => {
  return gulp.src(['./src/client/HTML/*.html'])
    .pipe(gulp.dest('./dist/client/HTML'));
});

// Transfers images
gulp.task('image', () => {
  return gulp.src(['./src/client/img/*'])
    .pipe(gulp.dest('./dist/client/img'));
});

// Transfers svg's
gulp.task('svg', () => {
  return gulp.src(['./src/client/icons/*'])
    .pipe(gulp.dest('./dist/client/icons'));
});

// Transfers index
gulp.task('icon', () => {
  return gulp.src(['./src/client/favicon.ico'])
    .pipe(gulp.dest('./dist/client'));
});

// Transfers Audio
gulp.task('Audio', () => {
  return gulp.src(['./src/client/Audio/*'])
    .pipe(gulp.dest('./dist/Audio'));
});

// Watch scss files
gulp.task('watch-scss', () => {
  return gulp.watch('./src/client/**/*.scss', gulp.series('scss'));
});

// Watch html files
gulp.task('watch-html', () => {
  return gulp.watch(['./src/client/**/*.html'], gulp.series('index'));
});

// Watch tsc files
gulp.task('watch-tsc', () => {
  return gulp.watch('./dist/tsc/client/**/*.js', gulp.series('bundle'));
});

// Initial ts compile
gulp.task('tsc', cb => {
  exec('tsc', () => cb());
});

// Watch ts files and recompile
gulp.task('tsc-w', () => {
  const tsc = exec('tsc -w --preserveWatchOutput --pretty');

  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));

  tsc.on('close', code => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task('express', () => {
  const tsc = exec('nodemon --watch ./src/server ./src/server/server.ts');
  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));
});

// Build all
gulp.task('build', gulp.series(
  'clean',
  'scss',
  'index',
  'icon',
  'Audio',
  'image',
  'svg',
  'tsc',
  'bundle',
));

// Heroku copy dist files
gulp.task('heroku-copy-client-html', () => {
  return gulp.src([
    './dist/client/HTML/*.html',
  ])
    .pipe(gulp.dest('./deploy/client/HTML'));
});

gulp.task('heroku-copy-client-icons', () => {
  return gulp.src([
    './dist/client/icons/*',
  ])
    .pipe(gulp.dest('./deploy/client/icons'));
});

gulp.task('heroku-copy-client-img', () => {
  return gulp.src([
    './dist/client/img/*',
  ])
    .pipe(gulp.dest('./deploy/client/img'));
});

gulp.task('heroku-copy-client-styles', () => {
  return gulp.src([
    './dist/client/Styles/*.css',
  ])
    .pipe(gulp.dest('./deploy/client/Styles'));
});

gulp.task('heroku-copy-client-typescript', () => {
  return gulp.src([
    './dist/client/finaleCodeBundle/*.js',
    './dist/client/finaleCodeBundle/*.js.map',
  ])
    .pipe(gulp.dest('./deploy/client/javascript'));
});

gulp.task('heroku-copy-client-favicon', () => {
  return gulp.src([
    './dist/client/favicon.ico',
  ])
    .pipe(gulp.dest('./deploy/client'));
});

// Heroku copy dist files
gulp.task('heroku-copy-server', () => {
  return gulp.src([
    './dist/server/pokeData.js',
    './dist/server/pokeData.js.map',
    './dist/server/server.js',
    './dist/server/server.js.map',
  ])
    .pipe(gulp.dest('./deploy/server'));
});

// Heroku copy root files
gulp.task('heroku-copy-root', () => {
  return gulp.src([
    './package.json',
    './package-lock.json',
    './Procfile',
  ])
    .pipe(gulp.dest('./deploy'));
});

// Heroku clean files
gulp.task('heroku-clean', () => {
  return gulp.src([
    './deploy/server.js',
    './deploy/Procfile',
    './deploy/package.json',
    './deploy/package-lock.json',
    './deploy/client',
    './deploy/server',
  ], { allowEmpty: true })
    .pipe(clean());
});

// Heroku deploy
gulp.task('deploy', gulp.series(
  'heroku-clean',
  'build',
  'heroku-copy-root',
  'heroku-copy-client-html',
  'heroku-copy-client-icons',
  'heroku-copy-client-img',
  'heroku-copy-client-typescript',
  'heroku-copy-client-styles',
  'heroku-copy-client-favicon',
  'heroku-copy-server',
));

// Run all (without express)
gulp.task('dev', gulp.series(
  'build',
  gulp.parallel(
    'watch-scss',
    'watch-html',
    'watch-tsc',
    'tsc-w',
  ),
));

// Run all together
gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch-scss',
    'watch-html',
    'watch-tsc',
    'tsc-w',
    'express',
  ),
));
