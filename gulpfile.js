var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');

// run 'gulp' which runs 'watch' first, which in itself run 'browser-sync' first
gulp.task('default', ['js', 'sass', 'html', 'img'], function() {
    console.log('Did stuff!');
});

// browser-sync server
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        server: {
			proxy: "http://localhost:5000",
            baseDir: "public",
        }
    });
});
gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

// watch files for changes and reload browser
gulp.task('watch', ['default', 'browser-sync'], function () {

    // watch for any js file changes in app and run 'js' gulp task and browserSync reload
    gulp.watch("angularApp/**/*.js", ['js']);

    // watch for any scss file changes in app and run 'sass' gulp task
    gulp.watch("angularApp/assets/scss/*.scss", ['sass']);

    // watch for html file changes in app and run browserSync reload
    gulp.watch("angularApp/**/*.html", ['html']).on('change', browserSync.reload);
    gulp.watch("angularApp/assets/img/**/*", ['img']).on('change', browserSync.reload);
});

gulp.task('img', function() {
  return gulp.src("angularApp/assets/img/**/*")
            .pipe(gulp.dest("public/assets/img"))
            .pipe(browserSync.stream());
});
gulp.task('html', function() {
  return gulp.src("angularApp/**/*.html")
            .pipe(gulp.dest("public"))
            .pipe(browserSync.stream());
});
gulp.task('sass', function() {
  // compile scss files into css and stream so that reloads
  return gulp.src("angularApp/assets/scss/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("public/assets/css"))
            .pipe(browserSync.stream());
});

gulp.task('js', function() {
    // concatenate all javascript files into one, ignoring those in
    // libraries or distribution, annotating properly for angularjs, minifying
    return gulp.src(['angularApp/**/*.js'])
            .pipe(concat('bundle.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest("public/assets/js"))
            .pipe(browserSync.stream());
});
