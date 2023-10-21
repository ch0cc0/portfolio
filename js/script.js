$(document).ready(function() {

    var isAnimating = false;  // Global flag

    // Initialize website title and theme from localStorage
    $('body').attr('data-theme', localStorage.getItem("theme") || 
                  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"));

     // Cache the header and navbar for performance
    const $header = $("header");
    const $navbar = $(".navbar");

    // On scroll, check the position
    $(window).on('scroll', function() {
        if (isAnimating) return; 
        if ($(window).scrollTop() > $header.outerHeight()) {
            $navbar.addClass('fixed-top');
        } else {
            $navbar.removeClass('fixed-top');
        }
    });

    $('nav a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        var target = $($(this).attr('href'));
        
        if (target.length) {
            isAnimating = true;  // Start of animation
            $('html, body').animate({
                scrollTop: target.offset().top - 60  /* Adjust based on your navbar's height */
            }, 1000, function() {
                isAnimating = false;  // End of animation
            });
        }
    });
    

    // Toggle theme
    $("#theme-toggle").click(function() {
        let newTheme = $('body').attr('data-theme') === "dark" ? "light" : "dark";
        $('body').attr('data-theme', newTheme);
        localStorage.setItem("theme", newTheme);
    });
});
