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
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var proxy = require('proxy-middleware');
var url = require('url');
const exec = require('child_process').exec;


gulp.task('default', ['full-reload']);


// after compiling web app and starting browser-sync,
// watch for file changes and reload browser
gulp.task('server', ['full-reload', 'nodemon', 'browser-sync'], function () {
	// watch for js file changes in app and run 'js' gulp task
	gulp.watch("angularApp/**/*.js", ['js']);

	// watch for scss file changes in app and run 'sass' gulp task
	gulp.watch("angularApp/assets/scss/*.scss", ['sass']);

	// watch for img file changes in app and run 'img' gulp task
	gulp.watch("angularApp/assets/img/**/*", ['img']);

	// watch for html file changes in app and run browserSync reload
	gulp.watch("angularApp/**/*.html", ['html']).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
	var proxyOptions = url.parse('http://localhost:5000/api');
	proxyOptions.route = '/api';


	//We want the ip of the server.
	var ipCommand = "ifconfig eth1 | grep 'inet addr' | cut -d: -f2 | awk '{print $1}'";
	//That command will get it.
	//Exec will run it, and give us a callback.
	exec(ipCommand, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		var ip = stdout.replace(/[^0-9]*$/, '');//Remove newline
		//Now we have hte IP.
		browserSync.init({
			open: false,//Don't try to open a browser window
			//Set browsersync port to 4000
			port: 4000,
			host: ip,//Set external IP
			server: {
				baseDir: "public",
				//Middleware does proxy stuff, so it will redirect all :3000/api calls to :5000/api
				middleware: [proxy(proxyOptions)]
			}
		});
	});
});

// start nodemon to run ExpressJs server
gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js',
		watch: ['server.js', 'nodeCode/*'],
		legacyWatch: true
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});//.on('restart', 'default');
});


/**
 * Compile assets and whatnot
 **/

// "compile" web app into "public" folder
gulp.task('full-reload', ['html', 'img', 'sass', 'js'], function() {
	console.log('Publishing web application into public folder');
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

// compile  files into css and stream so that reloads
gulp.task('sass', function() {
	return gulp.src("angularApp/assets/scss/*.scss")
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
		.pipe(gulp.dest("public/assets/css"))
		.pipe(browserSync.stream());
});

// concatenate all javascript files into one, ignoring those in libraries
// annotating properly for angularjs, minifying
gulp.task('js', function() {
	return gulp.src(['angularApp/**/*.js', '!angularApp/assets/**'])
		.pipe(order([
			'app.js',
			'**/*Modules.js',
			'**/*.js'
		]))
		.pipe(concat('bundle.js'))
		//.pipe(ngAnnotate())
		//.pipe(uglify())
		.pipe(gulp.dest("public/assets/js"))
		.pipe(browserSync.stream());
});
