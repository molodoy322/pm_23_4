import gulp from "gulp"
import sass from "gulp-sass"                  // конвертує SASS в CSS
import concat from "gulp-concat"              // об'єднання файлів (конкатенація)
import uglify from "gulp-uglify"              // мінімізація JS
import imagemin from "gulp-imagemin"          // стиснення зображень
import cleanCSS from "gulp-clean-css"         // мінімізація CSS
import browserSync from "browser-sync"        // автоматичне відновлення браузера після зміни коду
import autoprefixer from "gulp-autoprefixer"  // додавання префіксів в СSS для підтримки старих браузерів

// TODO:
// Створити gulp-таски для збірки web-проекту,
// відслідковування змін у файлах (gulp watch) та автоматичного оновлення сторінок з
// використанням розширення Browser Sync

const path = {
    build: {
        html: "./dist/html",
        css: "./dist/css",
        js: "./dist/js",
        imgs: "./dist/images"
    },
    app: {
        html: "./app/**/*.html",
        js: "./app/js/**/*.js",
        css: "./app/css/**/*.css",
        sass: "./app/sass/**/*.sass",
        img: "./app/img/**/*.png"
    }
}

// Копіювання HTML файлів в папку dist
gulp.task("html", function() {
    return gulp.src("app/*.html")
        .pipe(gulp.dest(path.build.html))  // директорія вивантаження результуючих файлів після відпрацювання плагіна.
        .pipe(browserSync.stream())        // для відслідковування змін у файлі та відновленні браузера через browserSync  
})

// Об'єднання, компіляція Sass в CSS, додавання префіксів і подальша мінімізація коду
gulp.task("sass", function() {
    return gulp.src(path.app.sass)
        .pipe(sass())
        .pipe(concat("styles.min.css"))    // об'єднання файлів в один
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
})

// Об'єднання і стиснення js-файлів в один
gulp.task("scripts", function() {
    return gulp.src(path.app.js)
        .pipe(concat("script.min.js"))
        .pipe(uglify())  // стиснення коду
        .pipe(gulp.dest(path.build.js))
})

// Стискання зображень
gulp.task("imgs", function() {
    return gulp.src(path.app.img)
        .pipe(imagemin())  // стиснення зображень
        .pipe(gulp.dest(path.build.imgs))
})

// Автоматичне оновлення сторінок
gulp.task("browserSync", function() {
    browserSync.init({
        server: {
            baseDir: path.build.html
        }
    })
})

// Відслідковування змін у файлах
gulp.task("watch", function() {
    gulp.watch(path.app.html, gulp.series("html"))
    gulp.watch(path.app.js, gulp.series("scripts"))
    gulp.watch(path.app.sass, gulp.series("sass"))
    gulp.watch(path.app.img, gulp.series("imgs"))
})

gulp.task("default", gulp.series("scripts", "html", "imgs", gulp.parallel("browserSync", "watch")))