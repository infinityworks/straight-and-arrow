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


  $("#playerRegistrationForm").submit(function(event) {
   
    event.preventDefault();

    if(status = 'passwordsNotMatch'){
      $("#passwordsDifferent").removeClass("hidden");
      $("#passwordsDifferent").addClass("alert-danger");
    }

    else if(status = 'emailsNotMatch'){
      $("#emailsDifferent").removeClass("hidden");
      $("#emailsDifferent").addClass("alert-danger");
    }

    else if(status = 'emailTaken'){
      $("#emailExists").removeClass("hidden");
      $("#emailExists").addClass("alert-danger");
    }

    else if(status = 'invalidPassword'){
      $("#passwordInvalid").removeClass("hidden");
      $("#passwordInvalid").addClass("alert-danger");
    }

  })


});
