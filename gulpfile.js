const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const gls = require('gulp-live-server');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
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
        .pipe(gulp.dest('./dist'))
});

// Converts scss to css
gulp.task('scss', () => {
    return gulp.src('./src/client/Styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/client'));
});

// Transfers index
gulp.task('index', () => {
    return gulp.src(['./src/client/HTML/*.html', './src/client/favicon.ico'])
        .pipe(gulp.dest('./dist/client'));
});

// Transfers icons
gulp.task('icons', () => {
    return gulp.src('./src/client/icons/*')
        .pipe(gulp.dest('./dist/client/icons'));
});

// Transfers audio
gulp.task('audio', () => {
    return gulp.src('./src/client/audio/*')
        .pipe(gulp.dest('./dist/client/audio'));
});

// Transfers images
gulp.task('images', () => {
    return gulp.src('./src/client/img/*')
        .pipe(gulp.dest('./dist/client/img'));
});

// Transfers PokeData.json
gulp.task('pokedata', () => {
    return gulp.src('./src/*.json')
        .pipe(gulp.dest('./dist'));
});

// Browser Sync
gulp.task('browser-sync', () => {
    browserSync.init({
        browser: 'default',
        port: 4000,
        server: { baseDir: './dist/client' }
    });
});

// Browser Sync live reload
gulp.task('browser-sync-watch', () => {
    gulp.watch('./dist/client/*.css').on('change', browserSync.reload);
    gulp.watch('./dist/client/app.js').on('change', browserSync.reload);
    gulp.watch('./dist/client/*.html').on('change', browserSync.reload);
});

// Watch scss files
gulp.task('watch-scss', () => {
    return gulp.watch('./src/client/Styles/*.scss', gulp.series('scss'));
});

// Watch html files
gulp.task('watch-html', () => {
    return gulp.watch('./src/client/HTML/*.html', gulp.series('index'));
});

// Watch tsc files
gulp.task('watch-tsc', () => {
    return gulp.watch('./src/client/Typescript/*.ts', gulp.series('bundle'));
});

// Watch server tsc files
gulp.task('watch-server-tsc', () => {
    return gulp.watch('./src/server/Typescript/*.ts', gulp.series('bundle'));
});

// Initial ts compile
gulp.task('tsc', cb => {
    exec('tsc', (err, msg) => {
        cb();
    });
});

// Watch ts files and recompile
gulp.task('tsc-w', () => {
    exec('tsc -w');
});

// Build all
gulp.task('build', gulp.series(
    'clean',
    'scss',
    'index',
    'icons',
    'images',
    'pokedata',
    'audio',
    'tsc',
    'bundle',
));

// Heroku clean files
gulp.task('heroku-clean', () => {
    return gulp.src([
        './deploy/server.js',
        './deploy/Procfile',
        './deploy/package.json',
        './deploy/package-lock.json',
        './deploy/dist',
    ], { allowEmpty: true })
        .pipe(clean());
});

// Heroku copy dist files
gulp.task('heroku-copy-dist', () => {
    return gulp.src([
        './dist/client/app.js',
        './dist/client/app.js.map',
        './dist/client/discover.js',
        './dist/client/discover.js.map',
        './dist/client/favicon.ico',
        './dist/client/index.html',
        './dist/client/discover.html',
        './dist/client/style.css',
        './dist/client/landing.css',
    ])
        .pipe(gulp.dest('./deploy/dist'));
});

// Heroku copy dist audio folder
gulp.task('heroku-audio', () => {
    return gulp.src('./dist/client/audio/*')
        .pipe(gulp.dest('./deploy/dist/audio'));
});

// Heroku copy dist icons folder
gulp.task('heroku-icons', () => {
    return gulp.src('./dist/client/icons/*')
        .pipe(gulp.dest('./deploy/dist/icons'));
});

// Heroku copy dist icons folder
gulp.task('heroku-img', () => {
    return gulp.src('./dist/client/img/*')
        .pipe(gulp.dest('./deploy/dist/img'));
});

// Heroku copy root files
gulp.task('heroku-copy-root', () => {
    return gulp.src([
        './package.json',
        './package-lock.json',
        './Procfile',
        './dist/server/heroku-server.js',
        './dist/server/queries.js',
    ])
        .pipe(gulp.dest('./deploy'));
});


// Start express
gulp.task('server', function () {
    const server = gls.new('./dist/server/server.js');
    server.start();
})

// Heroku deploy
gulp.task('deploy', gulp.series(
    'heroku-clean',
    'build',
    'heroku-copy-root',
    'heroku-copy-dist',
    'heroku-audio',
    'heroku-icons',
    'heroku-img',
));

// Run all together
gulp.task('default', gulp.series(
    'build',
    gulp.parallel(
        'browser-sync',
        'browser-sync-watch',
        'watch-scss',
        'watch-html',
        'watch-tsc',
        'watch-server-tsc',
        'tsc-w',
        'server',
    ),
));
