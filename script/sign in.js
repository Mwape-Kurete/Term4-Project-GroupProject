// Validation function
function validateInputs() {
    let valid = true;
  
    const emailValue = $('#email').val().trim();
    const passwordValue = $('#password').val().trim();
  
    if (emailValue === '') {
      setError($('#email'), 'Email is required');
      valid = false;
    } else if (!isValidEmail(emailValue)) {
      setError($('#email'), 'Please enter a valid email address');
      valid = false;
    } else {
      setSuccess($('#email'));
    }
  
    if (passwordValue === '') {
      setError($('#password'), 'Password is required');
      valid = false;
    } else if (passwordValue.length < 6) {
      setError($('#password'), 'Password must be at least 6 characters.');
      valid = false;
    } else {
      setSuccess($('#password'));
    }
  
    return valid;
  }
  
  // Email validation function
  function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Error and success functions
  function setError(element, message) {
    const inputControl = element.closest('.form-group');
    const errorDisplay = inputControl.find('.invalid-feedback');
  
    errorDisplay.text(message);
    inputControl.addClass('was-validated');
  }
  
  function setSuccess(element) {
    const inputControl = element.closest('.form-group');
    const errorDisplay = inputControl.find('.invalid-feedback');
  
    errorDisplay.text('');
    inputControl.removeClass('was-validated');
  }
  
  // Run code when the document loads
  $(document).ready(function() {
    // Sign-in form
    $('#signInForm').submit(function(event) {
      event.preventDefault();
  
      if (this.checkValidity() === false) {
        event.stopPropagation();
      } else {
        // Add input field validation code
        if (validateInputs()) {
          // Add code to save the sign-in data to local storage or perform other actions
          // For example, you can check credentials and then redirect to index.html
          const email = $('#email').val().trim();
          const password = $('#password').val().trim();
  
         // If authentication is successful, redirect to index.html
    console.log('Authentication successful. Redirecting to index.html');
    window.location.href = 'index.html';

        }
      }
  
      $(this).addClass('was-validated');
    });
  });
  
  

// Run code when the document loads
$(document).ready(function () {
    // Sign-in form
    $('#signInForm').submit(function (event) {
      event.preventDefault();
  
      if (this.checkValidity() === false) {
        event.stopPropagation();
      } else {
        // Add input field validation code
        if (validateInputs()) {
          // Retrieve email and password
          const email = $('#email').val().trim();
          const password = $('#password').val().trim();
  
          // Add code to save the sign-in data to local storage
          const signInData = {
            email: email,
            password: password,
          };
  
          // Convert to JSON and store in local storage
          localStorage.setItem('signInData', JSON.stringify(signInData));
  
          // If authentication is successful, redirect to index.html
          console.log('Authentication successful. Redirecting to index.html');
          window.location.href = '../index.html';
        }
      }
  
      $(this).addClass('was-validated');
    });
  });
  