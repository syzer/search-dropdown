const gulp = require('gulp')
const react = require('gulp-react')
const watch = require('gulp-watch')
const nodemon = require('gulp-nodemon')
const browserify = require('gulp-browserify')

gulp.task('build', done =>
    gulp.src('./src/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('src/build'))
)

gulp.task('scripts', ['build'], () =>
    gulp.src('./src/build/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest('./public/js'))
)

gulp.task('watch', ['build', 'scripts'], done =>
    gulp.watch('src/*.jsx', ['build', 'scripts'])
)

gulp.task('nodemon', ['build', 'scripts'], done =>
    nodemon({
        script: 'index.js',
        ext: 'html js'
    })
)

gulp.task('default', ['build', 'scripts', 'watch', 'nodemon'])