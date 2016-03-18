var gulp = require( 'gulp' );

var sass = require( 'gulp-sass' );
var concat = require( 'gulp-concat' );
var autoprefixer = require( 'gulp-autoprefixer' );

//Compile CSS from scss files
gulp.task( 'css', function() {
	gulp.src( 'scss/*.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( concat( 'site.css' ) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe( gulp.dest( 'public/css' ) );
});

//Watch scss folder and autocompile css
gulp.task( 'watch', function() {

	gulp.watch( ['scss/**/*'], [ 'css' ] );

});
