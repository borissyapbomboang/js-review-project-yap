// Store users in an array (in a real app, this would be a database)
let users = [];

// Show Login Form
function showLogin() {
    const content = document.querySelector('div[style*="padding"]');
    content.innerHTML = `
        <div style="max-width: 400px; margin: 50px auto; background: white; padding: 30px; border-radius: 8px;">
            <h2>Login</h2>
            <form id="loginForm">
                <div style="margin-bottom: 15px;">
                    <label>Email:</label>
                    <input type="email" id="loginEmail" required style="width: 100%; padding: 8px; margin-top: 5px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Password:</label>
                    <input type="password" id="loginPassword" required style="width: 100%; padding: 8px; margin-top: 5px;">
                </div>
                <button type="submit" style="width: 100%; padding: 10px; background-color: #333; color: white; border: none; border-radius: 4px; cursor: pointer;">Login</button>
            </form>
            <p style="margin-top: 15px; text-align: center;">
                Don't have an account? <a href="#register" onclick="showRegister()">Register</a>
            </p>
        </div>
    `;

    // Add submit event listener
    document.getElementById('loginForm').addEventListener('submit', login);
}

// Show Register Form
function showRegister() {
    const content = document.querySelector('div[style*="padding"]');
    content.innerHTML = `
        <div style="max-width: 400px; margin: 50px auto; background: white; padding: 30px; border-radius: 8px;">
            <h2>Register</h2>
            <form id="registerForm">
                <div style="margin-bottom: 15px;">
                    <label>Name:</label>
                    <input type="text" id="registerName" required style="width: 100%; padding: 8px; margin-top: 5px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Email:</label>
                    <input type="email" id="registerEmail" required style="width: 100%; padding: 8px; margin-top: 5px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Password:</label>
                    <input type="password" id="registerPassword" required style="width: 100%; padding: 8px; margin-top: 5px;">
                </div>
                <button type="submit" style="width: 100%; padding: 10px; background-color: #333; color: white; border: none; border-radius: 4px; cursor: pointer;">Register</button>
            </form>
            <p style="margin-top: 15px; text-align: center;">
                Already have an account? <a href="#login" onclick="showLogin()">Login</a>
            </p>
        </div>
    `;

    // Add submit event listener
    document.getElementById('registerForm').addEventListener('submit', register);
}

// Register Function
function register(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    
    if (userExists) {
        alert('User already exists! Please login.');
        return;
    }

    // Add new user
    users.push({ name, email, password });
    alert('Registration successful! Please login.');
    showLogin();
}

// Login Function
function login(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('Login successful! Welcome, ' + user.name);
        showDashboard(user);
    } else {
        alert('Invalid email or password!');
    }
}

// Show Dashboard (after successful login)
function showDashboard(user) {
    const content = document.querySelector('div[style*="padding"]');
    content.innerHTML = `
        <div style="max-width: 800px; margin: 50px auto;">
            <h1>Welcome, ${user.name}!</h1>
            <p style="margin-top: 20px;">You are now logged in.</p>
            <button onclick="logout()" style="margin-top: 20px; padding: 10px 20px; background-color: #333; color: white; border: none; border-radius: 4px; cursor: pointer;">Logout</button>
        </div>
    `;
}

// Logout Function
function logout() {
    location.reload(); // Reload the page
}

// Add click event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.querySelector('a[href="#login"]');
    const registerLink = document.querySelector('a[href="#register"]');

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLogin();
    });

    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        showRegister();
    });
});