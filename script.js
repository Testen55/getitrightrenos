document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    
    // Show confirmation
    alert(`Thank you, ${name}! Your request has been sent. We'll contact you at ${phone} soon.`);
    
    // Clear form
    document.getElementById("contact-form").reset();
    
    // TODO: Connect to Zapier webhook for lead capture
});