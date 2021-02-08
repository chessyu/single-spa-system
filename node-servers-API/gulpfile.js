const gulp = require("gulp");

gulp.task(
    "test",function(){
        return gulp
        .src('./service/*.js')
        .pipe(gulp.dest('./output',{ sourcemaps: true }));
    }
);



