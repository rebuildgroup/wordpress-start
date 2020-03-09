(function($) {
    $(document).ready(function() {
      var $hamburger = $(".hamburger");
  
      $hamburger.on("click", function(e) {
          $hamburger.toggleClass("is-active");
      // Do something else, like open/close menu
      });
    });
  })(jQuery);
  