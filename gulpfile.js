const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const sassGlob = require('gulp-sass-glob');
const imagemin = require('gulp-imagemin');
const tinypng = require('gulp-tinypng-unlimited');
const svgo = require('imagemin-svgo');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gcmq())
        /* .pipe(cleanCSS({
            compatibility: 'ie8',
            format: 'keep-breaks'
        })) */
        .pipe(concat('style.css'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './public/'
        }
    });
    gulp.watch("./src/scss/**/*scss", gulp.series('sass'));
    gulp.watch("./src/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("./src/js/*.js", gulp.series('js'));
});

/* pug */
gulp.task('pug', function () {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/* js */
jsFiles = ['./node_modules/jquery/dist/jquery.min.js', './node_modules/imask/dist/imask.min.js', './src/js/main.js'];
gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/* end js */

