
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form inputs
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Construct Gmail compose URL
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rudranathsinha7@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open Gmail compose window in a new tab
    window.open(gmailComposeUrl, '_blank');

    // Clear the form after submission
    document.getElementById('contactForm').reset();
});
