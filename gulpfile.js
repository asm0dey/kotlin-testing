const gulp = require('gulp');
const {archiver, cleanCss, concat, htmlReplace, htmlmin, imagemin, rename, sass, sourcemaps, uglifyEs} = require('gulp-load-plugins')({
    postRequireTransforms: {
        uglifyEs: function (uglifyEs) {
            return uglifyEs.default;
        }
    }
});
const merge = require('merge-stream');
const del = require('del');
const browserSync = require('browser-sync').create();
sass.compiler = require('node-sass');

const htmlminOptions = {collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true};
const css = ['css/reset.css', 'css/additional.css', 'css/theme/league.css', 'css/fonts.css', 'lib/css/zenburn.css', 'plugin/verticator/verticator.css'];
gulp.task('styles', () => {
    let sassStream = gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(concat('sassFiles.css'))
        .pipe(sourcemaps.init());

    let cssStream = gulp
        .src(css)
        .pipe(sourcemaps.init())
        .pipe(concat('cssFiles.css'));

    let printCss = gulp.src('css/print/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCss({compatibility: 'ie10'}))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest('dist/css/print/'));

    const cssBundle = merge(sassStream, cssStream)
        .pipe(concat('styles.min.css'))
        .pipe(cleanCss({compatibility: 'ie10'}))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest('./dist/css'));

    return merge(cssBundle, printCss)
        .pipe(browserSync.stream());
});

const js = ['js/reveal.js',
    'plugin/verticator/verticator.js',
    'plugin/markdown/marked.js',
    'plugin/markdown/markdown.js',
    'plugin/notes/notes.js',
    'plugin/highlight/highlight.js'];


gulp.task('js', () => {
    const localjs = gulp.src(js)
        .pipe(sourcemaps.init())
        .pipe(rename(function (path) {
            path.extname = '.min.js'
        }))
        .pipe(uglifyEs())
        .pipe(sourcemaps.write("./maps")) // Inline source maps.
        .pipe(gulp.dest('./dist/js'));


    const notesHtml = gulp.src('plugin/notes/notes.html')
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest('./dist/js'));

    return merge(localjs, notesHtml)
        .pipe(browserSync.stream());
});

gulp.task('md', () => {
    return gulp
        .src('slides/*.md')
        .pipe(gulp.dest('dist/slides/'));
});

gulp.task('img', () => {
    return gulp
        .src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp
        .src('index.html')
        .pipe(htmlReplace({
            "css": "css/styles.min.css"
        }, {
            resolvePaths: true
        }))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
});

gulp.task('index', gulp.series(gulp.parallel('styles', 'js', 'md', 'img'), 'html'));

gulp.task('clean', () => del(['dist']));
gulp.task('default', gulp.series('clean', 'index'));

gulp.task('serve', gulp.series('default', function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('slides/*', gulp.series('md'));
    gulp.watch('index.html', gulp.series('html'));
    gulp.watch('images/', gulp.series('img'));
    gulp.watch(js, gulp.series('js'));
    gulp.watch('gulpfile.js', gulp.series('index'));
    gulp.watch(css, gulp.series('styles'));
    gulp.watch('./css/*.scss', gulp.series('styles'));
    gulp.watch("dist/**/*").on('change', browserSync.reload);
}));

gulp.task('zip', gulp.series('default', () => {
    return gulp.src('dist/**/*', '!dist/build.zip')
        .pipe(archiver('build.zip'))
        .pipe(gulp.dest('dist'))
}));
