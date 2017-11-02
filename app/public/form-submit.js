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
      $("#submitMessage").removeClass("hidden");
      if(data.status === 'pass'){
        $("#submitMessage").removeClass("alert-danger");
        $("#submitMessage").addClass("alert-success");
        $("#registerForm").addClass("hidden");
      }
      else{
        $("#submitMessage").addClass("alert-danger");
      }
    });
  });


$("#playerRegistrationForm").validate({
       rules: {
           name: {
               required: true,
               minlength: 2
           },
           dob: {
               required: true
           },
           email: {
               required: true,
               email: true
           },
           cemail: {
               required: true,
               email:true,
               equalTo: "#email"
           },
           password: {
               required: true,
               minlength: 5
           },
           cpassword: {
               required: true,
               minlength: 5,
               equalTo: "#password"
           },
       },
       messages: {
           name: {
               required: "Please enter a name",
               minlength: "Your username must consist of at least 2 characters"
           },
           password: {
               required: "Please provide a password",
               minlength: "Your password must be at least 5 characters long"
           },
           cpassword: {
               required: "Please provide a password",
               minlength: "Your password must be at least 5 characters long",
               equalTo: "Please enter the same password as above"
           },
           email: {
               required: "Please provide an email",
               minlength: "must be a valid email",
           },
           cemail: {
               required: "Please provide an email",
               minlength: "must be a valid email",
               equalTo: "Please enter the same email as above"
           },
       }
   });


});
