import gulp from 'gulp';
import gulpsass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import * as saSs from 'sass';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import fs from 'fs/promises'

const sasscompiler = saSs;

const sass = gulpsass(sasscompiler);



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js', function(done){
    console.log('Minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});

gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpeg|gif|jpeg|svg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('clean:assets', async function(done){
   try{
    await fs.rm('./public/assets', {
        recursive: true
    })
   }catch(error){
    console.log(`Error deleting assets: ${error.message}`);
   }
 });

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('building assets')
    done();
});