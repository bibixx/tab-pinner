/* global __dirname */

// General
const gulp = require( "gulp" );
const fs = require( "fs" );
const rimraf = require( "rimraf" );
const browserSync = require( "browser-sync" );
const watch = require( "gulp-watch" );
const gutil = require( "gulp-util" );
const sourcemaps = require( "gulp-sourcemaps" );
const gulpif = require( "gulp-if" );
const through = require( "through2" );

// JS
const babelify = require( "babelify" ); // eslint-disable-line no-unused-vars
const browserify = require( "browserify" );
const buffer = require( "vinyl-buffer" );
const source = require( "vinyl-source-stream" );
const stripDebug = require( "gulp-strip-debug" );
const uglify = require( "gulp-uglify" );
const watchify = require( "watchify" );

// SASS
const autoprefixer = require( "gulp-autoprefixer" );
const filter = require( "gulp-filter" );
const sass = require( "gulp-sass" );
const cleanCSS = require( "gulp-clean-css" );

// PUG
const pug = require( "gulp-pug" );

const BUILD_FOLDER = "./build/";
const STATIC_FOLDER = "./static/";
const SOURCE_FOLDER = "./src/";

// General
function isProduction() {
  return process.env.NODE_ENV === "production";
}

function logError( err ) {
  if ( err.fileName ) {
    gutil.log( `${gutil.colors.red( err.name )}: ${gutil.colors.yellow( err.fileName.replace( `${__dirname}/src/js/`, "" ) )}: Line ${gutil.colors.magenta( err.lineNumber )} & Column ${gutil.colors.magenta( err.columnNumber || err.column )}: ${gutil.colors.blue( err.description )}` );
  } else {
    // Browserify error..
    gutil.log( `${gutil.colors.red( err.name )}: ${gutil.colors.yellow( err.message )}` );
  }
}


// Static
function cleanBuild( cb ) {
  if ( fs.existsSync( BUILD_FOLDER ) ) {
    fs.readdir( BUILD_FOLDER, ( err, files ) => {
      if ( err ) {
        throw err;
      }

      if ( files.length <= 0 ) {
        cb();
      }

      let filesDone = 0;
      const areAllFinished = () => {
        filesDone++;

        if ( filesDone >= files.length ) {
          cb();
        }
      };

      files.forEach( file => {
        fs.lstat( BUILD_FOLDER + file, ( err, stats ) => {
          if ( err ) {
            throw err;
          }

          if ( stats.isDirectory() ) {
            rimraf( `${BUILD_FOLDER}${file}/`, areAllFinished );
          } else {
            fs.unlink( BUILD_FOLDER + file, ( err ) => {
              if ( err ) {
                throw err;
              }

              areAllFinished();
            } );
          }
        } );
      } );
    } );
  } else {
    cb();
  }
}

function copyStatic() {
  gulp.src( [ `${STATIC_FOLDER}/**/*`, `!${STATIC_FOLDER}/**/*.psd` ] )
    .pipe( gulp.dest( BUILD_FOLDER ) );
}

function watchStatic() {
  return gulp.src( [ `${STATIC_FOLDER}/**/*`, `!${STATIC_FOLDER}/**/*.psd` ] )
    .pipe( watch( `${STATIC_FOLDER }/**/*` ) )
    .pipe( gulp.dest( BUILD_FOLDER ) );
}


// JS
function buildScript( toWatch, path ) {
  const filename = path.split( "/" ).pop();
  let bundler = browserify( path, {
    basedir: __dirname,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: toWatch,
    plugin: [ watchify ],
  } );

  if ( toWatch ) {
    bundler = watchify( bundler );
  }

  bundler.transform( "babelify", { presets: [ "es2015" ] } );

  const rebundle = () => {
    const timer = Date.now();

    const stream = bundler.bundle().on( "end", () => {
      gutil.log( `Started '${gutil.colors.cyan( "scripts" )}' ('${gutil.colors.cyan( filename )}')...` );
    } );

    const showDuration = ( t ) => {
      if ( t >= 1000 ) {
        return `${t / 1000} s`;
      }

      if ( t <= 1 ) {
        return `${t * 1000} μs`;
      }

      return `${t} ms`;
    };

    return stream
      .on( "error", logError )
      .pipe( source( filename ) )
      .pipe( buffer() )
      .pipe( sourcemaps.init( { loadMaps: true } ) )
      .pipe( gulpif( isProduction(), stripDebug() ) )
      .pipe( gulpif( isProduction(), uglify() ) )
      .pipe( gulpif( !isProduction(), sourcemaps.write( "./" ) ) )
      .pipe( gulp.dest( `${BUILD_FOLDER}/js` ) )
      .on( "end", () => {
        const taskName = `'${gutil.colors.cyan( "scripts" )}' ('${gutil.colors.cyan( filename )}')`;
        const taskTime = gutil.colors.magenta( showDuration( Date.now() - timer ) );
        gutil.log( `Finished ${taskName} after ${taskTime}` );
      } )
      .pipe( browserSync.stream() );
  };

  bundler.on( "update", rebundle );
  return rebundle();
}

function watchScripts() {
  gulp.src( `${SOURCE_FOLDER}/js/*.js` )
  .pipe( through.obj( ( chunk, enc, cb ) => {
    buildScript( true, chunk.path.replace( __dirname, "." ) );
    cb( null, chunk );
  } ) );
}

// SASS
function buildSass() {
  const options = {
    sourcemap: true,
    style: "expanded",
  };

  return gulp.src( `${SOURCE_FOLDER}/sass/**/*.sass` )
    .pipe( sourcemaps.init() )
    .pipe( sass( options ) )
    .pipe( autoprefixer( "last 1 version", "> 1%" ) )
    .pipe( gulpif( !isProduction(), sourcemaps.write( "./" ) ) )
    .pipe( gulpif( isProduction(), cleanCSS( { compatibility: "ie8" } ) ) )
    .pipe( gulp.dest( `${BUILD_FOLDER}/css` ) )
    .pipe( filter( [ "**/*.css" ] ) )
    .pipe( browserSync.stream() );
}

function watchSASS() {
  watch( `${SOURCE_FOLDER}/sass/**/*.sass`, () => {
    gulp.start( "buildSass" );
  } );
}

// Pug
function buildPug() {
  return gulp.src( `${SOURCE_FOLDER}/**/*.pug` )
    .pipe(
      pug( {
        "pretty": true,
      } )
    )
    .pipe( gulp.dest( BUILD_FOLDER ) )
    .pipe(
      browserSync.stream()
    );
}

function watchPug() {
  watch( [ `${SOURCE_FOLDER}/*.pug`, `${SOURCE_FOLDER}/includes/**/*.pug` ], () => {
    gulp.start( "buildPug" );
  } );
}

// BrowserSync
function serve() {
  const options = {
    server: {
      baseDir: BUILD_FOLDER,
    },
    open: false,
  };

  browserSync( options );

  watchStatic();
  watchSASS();
  watchPug();
}

gulp.task( "cleanBuild", cleanBuild );

gulp.task( "copyStatic", copyStatic );
gulp.task( "watchScripts", watchScripts );
gulp.task( "buildSass", buildSass );
gulp.task( "buildPug", buildPug );

gulp.task( "build", [ "cleanBuild" ], () => {
  gulp.start( "copyStatic" );
  gulp.start( "watchScripts" );
  gulp.start( "buildSass" );
  gulp.start( "buildPug" );
} );

gulp.task( "default", [ "build" ], serve );
