import 'jQuery'
import 'jquery-scrollify';
import 'slick-carousel';
import '../scss/pangea-global.scss';

// scrollify .panel scrolljack + scrollsnap
function scroll_page() {
    if (window.innerWidth < 1024) {
        if (window.innerHeight > window.innerWidth) {
            $.scrollify.destroy();
        }
    }
    else {
        $(function () {
            $.scrollify({
                section: ".panel",
                before: function (i, panels) {

                    var ref = panels[i].attr("data-section-name");

                    $(".pagination .active").removeClass("active");

                    $(".pagination").find("a[href=\"#" + ref + "\"]").parent().addClass("active");
                },
                afterRender: function () {
                    var pagination = "<ol class=\"pagination\">";
                    var activeClass = "";
                    $(".panel").each(function (i) {
                        var section = $(this).attr("data-section-name");
                        var prettyname = section.split('-').join(' ');
                        activeClass = "";
                        if (i === $.scrollify.currentIndex()) {
                            activeClass = "active";
                        }
                        pagination += "<li class=\"" + activeClass + "\"><a href=\"#" + section + "\"><span class=\"hover-text\">" + prettyname.charAt(0).toUpperCase() + prettyname.slice(1) + "</span></a></li>";
                    });

                    pagination += "</ol>";

                    $("#main-content").append(pagination);
                    /*

                    Tip: The two click events below are the same:

                    $(".pagination a").on("click",function() {
                      $.scrollify.move($(this).attr("href"));
                    });

                    */
                    $(".pagination a").on("click", $.scrollify.move);
                }
            });
        });
    }
}

scroll_page();

window.addEventListener('resize', function (event) {
    scroll_page();
});