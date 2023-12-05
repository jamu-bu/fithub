// Sign up function
const signupHandler = async (event) => {
    event.preventDefault();
    // grab values from form
    const name = document.querySelector('#usernameSignup').value.trim(); // Need to add id of input field
    const email = document.querySelector('#emailSignup').value.trim(); // Need to add id of input field
    const password = document.querySelector('#passwordSignup').value.trim(); // Need to add id of input field
    // Verify username, password, email
    if (name && email && password) {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log({ name, email, password })
        // Redirect when complete
        if (response.ok) {
          document.location.replace('/yours'); //redirect to homepage
        } else {
          alert(response.statusText);
        }
      }
};
// Log in function
const loginHandler = async (event) => {
    event.preventDefault();
    // grab values from form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    // Verify email and password
    if (email && password) {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        // Redirect when complete
        if (response.ok) {
          document.location.replace('/yours'); //redirect to homepage
        } else {
          alert('Incorrect Email or Password.');
        }
      }
};

// Event listeners
document.querySelector('#signupButton').addEventListener('click', signupHandler);
document.querySelector('#loginButton').addEventListener('click', loginHandler);