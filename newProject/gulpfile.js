import gulp from "gulp"
import gulpSass from "gulp-sass"              // конвертує SASS в CSS
import concat from "gulp-concat"              // об'єднання файлів (конкатенація)
import uglify from "gulp-uglify"              // мінімізація JS
import cleanCSS from "gulp-clean-css"         // мінімізація CSS
import browserSync from "browser-sync"        // автоматичне відновлення браузера після зміни коду
import autoprefixer from "gulp-autoprefixer"  // додавання префіксів в СSS для підтримки старих браузерів
import sassCompiler from "node-sass"

const sass = gulpSass(sassCompiler)

const path = {
    build: {
        html: "./dist/",
        css: "./dist/css",
        js: "./dist/js",
        imgs: "./dist/imgs",
        icons: "./dist/icons"
    },
    app: {
        html: "./app/**/*.html",
        js: "./app/js/**/*.js",
        css: "./app/css/*.css",
        sass: "./app/sass/**/*.scss",
        img: "./app/img/**/*.+(png|jpg|jpeg|svg|webp)",
        icons: "./app/icons/*.png"
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
    return gulp.src(path.app.css)
        .pipe(sass())
        .pipe(concat("styles.css"))    // об'єднання файлів в один
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream())        // для відслідковування змін у файлі та відновленні браузера через browserSync  
})

// Об'єднання і стиснення js-файлів в один
gulp.task("scripts", function() {
    return gulp.src(path.app.js)
        .pipe(concat("script.min.js"))
        .pipe(uglify())  // стиснення коду
        .pipe(gulp.dest(path.build.js))
})

// Копіювання картинок в dist
gulp.task("imgs", function() {
    return gulp.src(path.app.img)
        .pipe(gulp.dest(path.build.imgs))
})

// Копіювання іконок в dist
gulp.task("icons", function() {
    return gulp.src(path.app.icons)
        .pipe(gulp.dest(path.build.icons))
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
    gulp.watch(path.app.css, gulp.series("sass"))
    gulp.watch(path.app.img, gulp.series("imgs"))
    gulp.watch(path.app.icons, gulp.series("icons"))
})

gulp.task("default", gulp.series("scripts", "html", "imgs", "icons", "sass", gulp.parallel("browserSync", "watch")))