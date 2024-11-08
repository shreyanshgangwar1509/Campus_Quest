// JavaScript for Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Capture user details
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Welcome message (just for demo purposes)
    alert(`Welcome, ${name}! Your adventure begins now.`);

    // Here, you could add code to save user data, display more info, etc.
});
