const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const requirements = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    symbol: document.getElementById("symbol")
};
const strengthBar = document.getElementById("strengthBar").firstElementChild;
const matchMessage = document.getElementById("matchMessage");
const submitButton = document.getElementById("submitButton");

function validatePassword() {
    const pwd = passwordInput.value;

    const validations = {
        length: pwd.length >= 8,
        uppercase: /[A-Z]/.test(pwd),
        lowercase: /[a-z]/.test(pwd),
        number: /\d/.test(pwd),
        symbol: /[\W_]/.test(pwd)
    };

    let strength = 0;

    for (const key in validations) {
        const valid = validations[key];
        requirements[key].className = valid ? "valid" : "invalid";
        if (valid) strength++;
    }

    const colors = ["#ff4d4f", "#ff9800", "#ffc107", "#4caf50", "#388e3c"];
    strengthBar.style.width = `${(strength / 5) * 100}%`;
    strengthBar.style.background = colors[strength - 1] || "#ddd";

    return strength === 5;
}

function validateMatch() {
    const match =
        passwordInput.value === confirmPasswordInput.value &&
        confirmPasswordInput.value !== "";
    matchMessage.textContent = match
        ? "Las contraseñas coinciden"
        : "Las contraseñas no coinciden";
    matchMessage.className = `match-message ${match ? "valid" : "invalid"}`;
    return match;
}

function updateFormValidity() {
    const validPassword = validatePassword();
    const passwordsMatch = validateMatch();
    submitButton.disabled = !(validPassword && passwordsMatch);
}

passwordInput.addEventListener("input", updateFormValidity);
confirmPasswordInput.addEventListener("input", updateFormValidity);

document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("¡Contraseña válida y registrada!");
});
