document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const successMessage = document.getElementById('successMessage');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const userIcon = document.querySelector('.animated-icon');
    const labels = document.querySelectorAll('.label-animated');

    // Animate labels on load
    animateLabelsSequentially();

    function animateLabelsSequentially() {
        labels.forEach((label, index) => {
            setTimeout(() => {
                label.style.opacity = '0';
                label.style.transform = 'translateX(-10px)';

                setTimeout(() => {
                    label.style.transition = 'all 0.5s ease';
                    label.style.opacity = '1';
                    label.style.transform = 'translateX(0)';
                }, 100);
            }, index * 150);
        });
    }

    // Username icon animation on focus/blur
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('focus', function () {
        userIcon.style.animation = 'excitedIcon 0.5s ease infinite';
        userIcon.style.color = 'var(--primary)';
    });

    usernameInput.addEventListener('blur', function () {
        userIcon.style.animation = 'floatIcon 3s ease-in-out infinite';
        if (!this.value) {
            userIcon.style.color = 'var(--gray)';
        }
    });

    // Password visibility toggle
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });

    // Form validation
    form.addEventListener('submit', function (e) {
        e.preventDefault();


        // Reset all error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });

        let isValid = true;

        // Validate username/email
        const username = document.getElementById('username');
        if (!username.value.trim()) {
            showError(username, 'usernameError');
            isValid = false;
        }

        // Validate password
        if (!passwordInput.value) {
            showError(passwordInput, 'passwordError');
            isValid = false;
        }

        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'passwordError2');
            isValid = false;
        }

        // If form is valid, show success message and then redirect
        if (isValid) {
            form.style.display = 'none';
            successMessage.style.display = 'flex';

            localStorage.setItem('token', "token");

            // Enhanced success animation
            const successIcon = successMessage.querySelector('i');
            successIcon.style.animation = 'bounceIn 1.0s ease';

            // Redirect to home page after showing success message
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500); // 1.5 seconds delay
        }
    });

    function showError(inputElement, errorElementId) {
        const errorElement = document.getElementById(errorElementId);
        inputElement.style.borderColor = '#e74c3c';
        errorElement.style.display = 'flex';
        inputElement.focus();

        // Add shake animation to the input field
        inputElement.classList.add('error-shake');
        setTimeout(() => {
            inputElement.classList.remove('error-shake');
        }, 500);
    }
});