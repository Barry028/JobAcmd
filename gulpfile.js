// gulpfile.js
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');

// 合併檔案
const concat = require('gulp-concat');


// Sass
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require("cssnano");
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

// const  autoprefixer = require('gulp-autoprefixer');
// 圖片壓縮
// const gulpImagemin = require('gulp-imagemin');

gulp.task('img', () => {
	return gulp
		.src('img/**')
		.pipe(gulpImagemin())
		.pipe(gulp.dest('dist/img/'));
});

// 將編譯器調整為 Dart Sass
// sass.compiler = require('dart-sass');

// Sass 編譯
gulp.task('sass', () => {
	return gulp
		.src('assets/scss/*.scss')
		// 找尋 Scss 檔案 (只會編譯沒有_的檔案)
		// .pipe(sourcemaps.init({
		// 	loadMaps: false
		// }))
		.pipe(sass({
				outputStyle: 'expanded' // compressed , expanded
			})
			.on('error', sass.logError))
		// .pipe(postcss([autoprefixer()]))
		.pipe(postcss([autoprefixer(), cssnano()]))
    	.pipe(cleanCSS({compatibility: 'ie9'}))

		// .pipe(sourcemaps.write('.', {
		// 	sourceRoot: '../scss/'
		// 		// 寫入Sourcemaps 到當前資料夾(以下下列 dest('assets/css')為基準點，
		// 		// SourceRoot：以匯出的資料夾為基準點找他原本的 scss資 料夾位置。
		// }))
		.pipe(gulp.dest('assets/css'))
		// 輸出的路徑設定
});

gulp.task('watch', () => {
	gulp.watch('assets/scss/*.scss', gulp.series('sass'));
});

// gulp.task('deploy', () => {
//     return gulp
//         .src('dist/**/*')
//         .pipe($.ghPages());
// });


// We don't have to expose the reload function
// It's currently only useful in other functions

// function scripts() {
//     return gulp.src(paths.src, {
//             sourcemaps: true
//         })
//         .pipe(babel()) // 使用babel轉成瀏覽器所看的懂的JavaScript
//         .pipe(uglify()) // 將程式碼壓縮成一行
//         //.pipe(concat('index.min.js')) // 合併所有檔案
//         .pipe(gulp.dest(paths.dest)); // 編譯後產出到指定資料夾中
// }
