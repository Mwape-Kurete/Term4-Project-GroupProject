const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateInputs()) {
        saveFormDataToLocalStorage();

        window.location.href="../index.html";
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let valid = true;

    if (usernameValue === '') {
        setError(username, 'Username is required');
        valid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        valid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        valid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        valid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        valid = false;
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
        valid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
        valid = false;
    } else {
        setSuccess(password2);
    }

    return valid;
};

document.addEventListener("DOMContentLoaded", function () {
    // Check if there's user data in local storage
    const storedData = localStorage.getItem("formData");

    // Check if stored data exists and parse it from JSON
    if (storedData) {
        const userData = JSON.parse(storedData);

        // Assuming you have an element in your navbar with the id "user-greeting" to display the username
        const userGreeting = document.getElementById("user-greeting");

        // Update the content of the "user-greeting" element with the stored username
        userGreeting.textContent = `Hello, ${userData.username}!`;

      
    }
});

const saveFormDataToLocalStorage = () => {
    // Create an object to store the form data
    const formData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
    };

    // Convert the object to a JSON string and store it in local storage
    localStorage.setItem('formData', JSON.stringify(formData));
};


