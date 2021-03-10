'use strict';

let { src, dest , watch , parallel , series } = require('gulp');

let scss = require('gulp-sass'), /* Переводит SCSS и SASS в CSS */
	concat 	= require('gulp-concat'), /* Переименовывает и объединяет файлы в один */
	browserSync	= require('browser-sync').create(), /* Перезагружает страницу браузера */
	uglify	= require('gulp-uglify-es').default, /* Сжимает и объединяет javascript файлы */
	autoprefixer = require('gulp-autoprefixer'), /* Пишет приставки с стилям для старых браузеров */
	imagemin = require('gulp-imagemin'), /* Сжимает все изображения */
	del = require('del'); /* Удаляет выбранные файлы */

function stylesCSS() {
	return src(['app/scss/**/*.scss'])
		.pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
		.pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css/'))
		.pipe(browserSync.stream());
}

function scriptsJS() {
	return src([
		'node_modules/jquery/dist/jquery.min.js',
		'app/js/oop.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream())
}

function watching() {
	watch(['app/scss/**/*.scss'], stylesCSS);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scriptsJS);
	watch(['app/*.html']).on('change', browserSync.reload);
}

function browsersync() {
	browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function build () {
	return src([
		'app/fonts/**/*',
		'app/css/style.min.css',
		'app/js/main.min.js',
		'app/*.html'
	], {base:'app/'})
		.pipe(dest('dist/'))
}

function images() {
	return src('app/images/**/*')
		.pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.mozjpeg({quality: 75, progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		]))
		.pipe(dest('dist/images/'))
}

function cleanDist() {
	return del('dist/')
}


exports.stylesCSS = stylesCSS;
exports.scriptsJS = scriptsJS;


exports.watching 	= watching;
exports.browsersync = browsersync;

exports.images 		= images;
exports.cleanDist 	= cleanDist;

exports.build = series(cleanDist, images, build);

exports.default = parallel(stylesCSS, scriptsJS, browsersync, watching)