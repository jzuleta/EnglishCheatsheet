var gulp = require("gulp"),
    rename = require("gulp-rename"),
    autoprefixer = require("gulp-autoprefixer");

gulp.task("add-prefixes", function () {
    gulp.src("resources/css/dev-css.css")
        .pipe(autoprefixer({
            cascade: false,
            remove: true
        }))
        .pipe(rename("app.css"))
        .pipe(gulp.dest("resources/css/"));
});