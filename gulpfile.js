const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
const connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('watch',function()
{
    gulp.watch('src/**/*.scss' , ['sass']);
    gulp.watch('src/**/*.pug' , ['pug']);
    gulp.watch('src/**/*.js' , ['concat']);
});

gulp.task('sass',function(){
     return gulp.src('src/sass/*.scss')
           .pipe(sass())
           .on('error', sass.logError)

           .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
           }))
           .on('error', sass.logError)
            // to minify css file
          .pipe(cleanCSS({
            debug: true
            }, function(details) {
            console.log(details.name + ': ' + Math.round(details.stats.originalSize / 1024) + 'kb');
            console.log(details.name + ': ' + Math.round(details.stats.minifiedSize / 1024) + 'kb');
           }))
           .pipe(gulp.dest('assets/css'))
           .pipe(connect.reload())
});
        // to minify js
gulp.task('minify', function() {
            gulp.src('src/js/*.js')
            .pipe(minify({
             ext:{
                     src:'-debug.js',
                      min:'.js'
                  },
             exclude: ['tasks'],
             ignoreFiles: ['.combo.js', '-min.js']
                }))
            .pipe(gulp.dest('src/js/dist'))
            });

            // to concatenat 
gulp.task('concat', function(){
                return gulp.src(['./src/js/vendor/*.js', './src/js/partials/*.js'])
                .pipe(concat('all.js'))
                .pipe(gulp.dest('./assets/js'));
                            
});


gulp.task('pug', function(){

            return gulp.src('src/pug/*.pug')
            .pipe(pug({
             pretty:true
             }))
            .pipe(gulp.dest('./'))
            .pipe(connect.reload())
             });

gulp.task('connect', function() {
            connect.server({
                port: 8000,
                root:'./',
                livereload:true
                })

            });


  

gulp.task('default', ['connect', 'watch']);