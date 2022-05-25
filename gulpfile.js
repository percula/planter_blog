const Gulp = require("gulp");
const URL = require("url");
const Cheerio = require("gulp-cheerio");

var tag = "planter05-20";

Gulp.task("affiliate-links", () => {
    return Gulp.src(["public/posts/**/*.html"])
    .pipe(Cheerio(function($, file) {
        var url;
        $("a").each(function() {
            var a = $(this);
            url = URL.parse(a.attr("href"));
            if(a.attr("href").startsWith("https://www.amazon.com/") && !a.attr("href").includes("?tag=")) {
                if (!url.searchParams.length) {
                    // No query params in url
                    a.attr("href", url.protocol + "//" + url.hostname + url.pathname + "?tag=" + tag);
                } else {
                    a.attr("href", a.attr("href") + "&tag=" + tag);
                }
            }
        });
    }))
    .pipe(Gulp.dest(function (file) {
            return file.base;
        }));
});

Gulp.task("build", Gulp.series("affiliate-links"));