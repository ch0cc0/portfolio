$(document).ready(function() {

    // Initialize website title and theme from localStorage
    $('body').attr('data-theme', localStorage.getItem("theme") || 
                  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"));

    // Toggle theme
    $("#theme-toggle").click(function() {
        let newTheme = $('body').attr('data-theme') === "dark" ? "light" : "dark";
        $('body').attr('data-theme', newTheme);
        localStorage.setItem("theme", newTheme);
    });
});
