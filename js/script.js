document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector("#contact form") || document.querySelector("form");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Stop the page from reloading
            
            // Pop-up thank you message
            alert("Thank you!");
            
            // Clear the form input fields
            contactForm.reset();
        });
    }
