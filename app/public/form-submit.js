		// Attach a submit handler to the form

$(document).ready(function(){
  $("#registerForm").submit(function(event) {
   
    // Stop form from submitting normally
    event.preventDefault();
   
    // Get some values from elements on the page:
    var $form = $(this),
      name = $form.find( "input[name='fullname']" ).val(),
      email = $form.find( "input[name='email']" ).val(),
      url = $form.attr( "action" );
   
    // Send the data using post
    var posting = $.post( url, { fullname:name, email:email } );
   
    // Put the results in a div
    posting.done(function(data) {
      $("#submitMessage").empty().append(data.message);
    });
  });
});
