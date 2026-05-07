document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        message: document.querySelector('textarea[name="message"]').value,
        timestamp: new Date().toISOString()
    };
    
    console.log("Form submitted:", formData);
    
    // Show success message
    alert("✓ Request received! We'll contact you shortly with your free quote.");
    
    // Reset form
    document.getElementById("contact-form").reset();
    
    // TODO: Send to Zapier webhook for automatic lead capture and email
});