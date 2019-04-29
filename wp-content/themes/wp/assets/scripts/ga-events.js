(function($) {
    /**  Form Submissions
    *********************/
  
    jQuery( document ).on( 'cf.form.submit', function ( event, data ) {
  
      function setFromPage() {
           
        // Current Page Title (first part)
        var title = document.title;
            title = title.split(" |", 1).pop();
  
        // Send GA Event
        return ga('send', 'event', 'Form', 'Submit', event_label);
      }
      
      setFromPage();

    });
  
  
    /**  Form - Name
     *   Click - Next Button
    *********************/
    const formNextButton = document.querySelector('.btn-form-next');
  
    if(formNextButton) {
      formNextButton.addEventListener('click', function(e) {
        e.preventDefault;
  
        function setFromPageStep(category, action) {
          // GA Event Label
          var event_label;
      
          // Current Page Title (first part)
          var title = document.title;
              title = title.split(" |", 1).pop();
          
          // Check hidden field for value
          var elFromField = document.getElementsByClassName('from-page');
          var from_page_field = Array.prototype.slice.call(elFromField);
      
          // Use page title unless there is a from_page value
          if (from_page_field === undefined || from_page_field.length == 0) {
            event_label = title;
          } else {
            event_label= from_page_field[0].value;
          }
      
          // Send GA Event
          return ga('send', 'event', category, action, event_label);
        }
  
        setFromPageStep('Page', 'Next');
  
      });
    }
  
    
    /**  Button w/ ID
    *********************/
    $("#buttonID").click(function() {
      ga('send', 'event', 'Button', 'click');
    });
    
  })(jQuery);