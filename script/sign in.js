// Validation function
function validateInputs() {
    let valid = true;

    const usernameValue = $('#username').val().trim();
    const emailValue = $('#email').val().trim();
    const passwordValue = $('#password').val().trim();
    const password2Value = $('#password2').val().trim();

    if (usernameValue === '') {
        setError($('#username'), 'Username is required');
        valid = false;
    } else {
        setSuccess($('#username'));
    }

    if (emailValue === '') {
        setError($('#email'), 'Email is required');
        valid = false;
    } else if (!isValidEmail(emailValue)) {
        setError($('#email'), 'Provide a valid email address');
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

    if (password2Value === '') {
        setError($('#password2'), 'Please confirm your password');
        valid = false;
    } else if (password2Value !== passwordValue) {
        setError($('#password2'), "Passwords don't match");
        valid = false;
    } else {
        setSuccess($('#password2'));
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
    const inputControl = element.closest('.input-control');
    const errorDisplay = inputControl.find('.error');

    errorDisplay.text(message);
    inputControl.addClass('error');
    inputControl.removeClass('success');
}

function setSuccess(element) {
    const inputControl = element.closest('.input-control');
    const errorDisplay = inputControl.find('.error');

    errorDisplay.text('');
    inputControl.addClass('success');
    inputControl.removeClass('error');
}

// Run code when the document loads
$(document).ready(function() {
    // Sign-up form
    $('#signupForm').submit(function(event) {
        event.preventDefault();

        if (this.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Add input field validation code
            if (validateInputs()) {
                // Add code to save the sign-up data to local storage
                const formData = {
                    username: $('#username').val().trim(),
                    email: $('#email').val().trim(),
                    password: $('#password').val().trim(),
                };
                localStorage.setItem('signupData', JSON.stringify(formData));

                // Redirect to the sign-in page
                window.location.href = 'sign-in.html';
            }
        }
        $(this).addClass('was-validated');
    });
});
