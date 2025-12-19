const text = "Full Stack Developer";
const typingElement = document.querySelector(".typewriter");
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Speed of typing
    } else {
        // Optional: Erase and restart (Loop)
        setTimeout(() => {
            typingElement.innerHTML = "";
            index = 0;
            typeWriter();
        }, 3000); // Wait 3 seconds before restarting
    }
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_j68dtijD",
        "template_7z480s6",
        this
    ).then(
        function () {
            alert("✅ Message sent successfully!");
            document.getElementById("contact-form").reset();
        },
        function (error) {
            alert("❌ Failed to send message. Try again.");
            console.error("EmailJS Error:", error);
        }
    );
});
(function () {
    emailjs.init("6TBW-lRf9A0V7lB_P");
})();

// Start animation when page loads
window.onload = typeWriter;