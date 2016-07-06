/*
 * Gulp file automates website development.
 * Runs ExpressJs server using Nodemon.
 * Runs AngularJs using Browsersync.
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// "compile" web app into "public" folder 
gulp.task('default', ['html', 'img', 'sass', 'js'], function() {
    console.log('Publishing web application into public folder');
});

// after compiling web app and starting browser-sync, 
// watch for file changes and reload browser
gulp.task('watch', ['default', 'browser-sync'], function () {

    // watch for js file changes in app and run 'js' gulp task
    gulp.watch("angularApp/**/*.js", ['js']);

    // watch for scss file changes in app and run 'sass' gulp task
    gulp.watch("angularApp/assets/scss/*.scss", ['sass']);

    // watch for img file changes in app and run 'img' gulp task
    gulp.watch("angularApp/assets/img/**/*", ['img']);

    // watch for html file changes in app and run browserSync reload
    gulp.watch("angularApp/**/*.html", ['html']).on('change', browserSync.reload);
});

// after starting nodemon, start browser-sync server to run AngularJs and hot reload code
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        server: {
            // ExpressJs server runs in Vagrant virtual machine on localhost:5000 
			proxy: "http://localhost:5000",
            // "Compiled" web application will be published here
            baseDir: "public",
            // Browsersync defaults to running on port 3000 
        }
    });
});

// start nodemon to run ExpressJs server
gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

// move html files into public
gulp.task('html', function() {
  return gulp.src("angularApp/**/*.html")
            .pipe(gulp.dest("public"))
            .pipe(browserSync.stream());
});

// move images into public
gulp.task('img', function() {
  return gulp.src("angularApp/assets/img/**/*")
            .pipe(gulp.dest("public/assets/img"))
            .pipe(browserSync.stream());
});

// compile scss files into css and stream so that reloads
gulp.task('sass', function() {
  return gulp.src("angularApp/assets/scss/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("public/assets/css"))
            .pipe(browserSync.stream());
});

// concatenate all javascript files into one, ignoring those in libraries
// annotating properly for angularjs, minifying
gulp.task('js', function() {
    return gulp.src(['angularApp/**/*.js', '!angularApp/assets/**'])
            .pipe(concat('bundle.js'))
            //.pipe(ngAnnotate())
            //.pipe(uglify())
            .pipe(gulp.dest("public/assets/js"))
            .pipe(browserSync.stream());
});
