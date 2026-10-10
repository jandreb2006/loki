// Get the registered accounts from browser storage
function getUsers() {
    return JSON.parse(
        localStorage.getItem("users") || "[]"
    );
}

// REGISTER ACCOUNT
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("registerEmail")
            .value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const error = document.getElementById("registerError");

        error.textContent = "";

        if (password.length < 8) {
            error.textContent =
                "Password must be at least 8 characters.";
            return;
        }

        if (password !== confirmPassword) {
            error.textContent = "Passwords do not match.";
            return;
        }

        const users = getUsers();

        if (users.some(user => user.email === email)) {
            error.textContent =
                "This email is already registered.";
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("users", JSON.stringify(users));

        // Automatically log in after registration
        localStorage.setItem("currentUser", JSON.stringify({
            name: name,
            email: email
        }));

        window.location.href = "index.html";
    });
}

// LOG IN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email")
            .value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const error = document.getElementById("error");

        const users = getUsers();

        const user = users.find(function(account) {
            return account.email === email &&
                   account.password === password;
        });

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify({
                name: user.name,
                email: user.email
            }));

            window.location.href = "index.html";
        } else {
            error.textContent =
                "Incorrect email or password.";
        }
    });
}

// DISPLAY THE LOGGED-IN USER'S NAME
const welcomeMessage = document.getElementById("welcomeMessage");

if (welcomeMessage) {
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
        window.location.replace("login.html");
    } else {
        welcomeMessage.textContent =
            "Welcome, " + currentUser.name + "!";
    }
}

// LOG OUT
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("currentUser");
        window.location.replace("login.html");
    });
}