
document.getElementById("authForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let validUsername = "admin";
    let validPassword = "password123"

    let messageElement = document.getElementById("authMessage");

    if (username === validUsername && pasword == validPassword) {
        messageElement.textContent = "Authentication successful!";
        messageElement.style.color = "green";
        
        window.location.href = "home.html"; 
    } else {
        messageElement.textContent = "Username or Password incorrect failed! Try again.";
        messageElement.style.color = "red";
    }
});
