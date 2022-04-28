var gulp = require('gulp');
 
const gulpPutFile = require("gulp-putfile");

gulp.task('deploy', function () {
return gulp.src("dist/*").pipe(
  gulpPutFile({
    dest: "/var/www/html",
    host: "212.6.44.82",
    username: "test",
    password: "123456",
    port: 22,
  })
);
});