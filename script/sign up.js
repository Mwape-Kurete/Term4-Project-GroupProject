// Run code when the document loads
$(document).ready(function() {

    // ---------------------------------------------------------------------------------------------------
    // Sign up form
    // ---------------------------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------------------------
    // On Submit, prevent the default form submission

    $('#signupForm').submit(function(event) {

        event.preventDefault();
        
        if (this.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Add any submission code here, like saving the data to localStorage
            window.location.href = 'pages/browse.html';
        }
        $(this).addClass('was-validated');
    });
});