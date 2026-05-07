document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message")
  };

  try {
    const response = await fetch("https://hooks.zapier.com/hooks/catch/27506973/4y44lgl/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    console.log("✅ Sent to Zapier:", data);

    alert("✅ Request sent successfully!");
    this.reset();

  } catch (error) {
    console.error("❌ Zapier error:", error);
    alert("❌ Failed to send request");
  }
});
