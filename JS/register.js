document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const countrySelect = document.getElementById('country');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const emailIcon = document.querySelector('.animated-icon');
    const labels = document.querySelectorAll('.label-animated');
    const card = document.querySelector('.registration-card');

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

    // Email icon animation on focus/blur
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('focus', function () {
        emailIcon.style.animation = 'excitedIcon 0.5s ease infinite';
        emailIcon.style.color = 'var(--primary)';
    });

    emailInput.addEventListener('blur', function () {
        emailIcon.style.animation = 'floatIcon 3s ease-in-out infinite';
        if (!this.value) {
            emailIcon.style.color = 'var(--gray)';
        }
    });

    // Password visibility toggle
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });

    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });

    // Password strength indicator
    passwordInput.addEventListener('input', updatePasswordStrength);

    function updatePasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;

        // Check length
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;

        // Check for mixed case
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;

        // Check for numbers
        if (password.match(/\d/)) strength += 1;

        // Check for special chars
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

        // Update strength meter
        let width = '0%';
        let color = '#e74c3c';
        let text = 'Weak';
        let textColor = '#e74c3c';

        switch (strength) {
            case 0:
                width = '0%';
                color = '#e74c3c';
                text = 'Weak';
                textColor = '#e74c3c';
                break;
            case 1:
                width = '25%';
                color = '#ff6348';
                text = 'Fair';
                textColor = '#ff6348';
                break;
            case 2:
                width = '50%';
                color = '#f39c12';
                text = 'Good';
                textColor = '#f39c12';
                break;
            case 3:
                width = '75%';
                color = '#27ae60';
                text = 'Strong';
                textColor = '#27ae60';
                break;
            case 4:
            case 5:
                width = '100%';
                color = '#2ecc71';
                text = 'Excellent';
                textColor = '#2ecc71';
                break;
        }

        strengthMeter.style.width = width;
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = textColor;
    }

    // Enhanced country select animation
    countrySelect.addEventListener('focus', function () {
        const selectArrow = this.parentElement.querySelector('.select-arrow');
        selectArrow.style.transform = 'translateY(-50%) rotate(180deg)';
        selectArrow.style.color = 'goldenrod';

        // Add highlight animation
        this.classList.add('select-focus');

        // Animate options appearing
        document.documentElement.style.setProperty('--select-expand', 'scale(1.02)');
    });

    countrySelect.addEventListener('blur', function () {
        const selectArrow = this.parentElement.querySelector('.select-arrow');
        selectArrow.style.transform = 'translateY(-50%)';
        selectArrow.style.color = '#e0e0e0';

        // Remove highlight animation
        this.classList.remove('select-focus');

        // Reset expansion
        document.documentElement.style.setProperty('--select-expand', 'scale(1)');
    });

    // Change event for selection animation
    countrySelect.addEventListener('change', function () {
        if (this.value) {
            this.style.fontWeight = '600';
            this.style.color = 'var(--secondary)';

            // Briefly animate the selected option
            this.classList.add('option-selected');
            setTimeout(() => {
                this.classList.remove('option-selected');
            }, 300);
        }
    });

    // Populate countries list
    populateCountries();

    function populateCountries() {
        // Clear existing options
        countrySelect.innerHTML = '<option value="" disabled selected>Select your country</option>';

        // Comprehensive list of countries
        const countries = [
            { name: "Albania" },
            { name: "Algeria" },
            { name: "Andorra" },
            { name: "Angola" },
            { name: "Antigua and Barbuda" },
            { name: "Argentina" },
            { name: "Armenia" },
            { name: "Australia" },
            { name: "Austria" },
            { name: "Azerbaijan" },
            { name: "Bahamas" },
            { name: "Bahrain" },
            { name: "Bangladesh" },
            { name: "Barbados" },
            { name: "Belarus" },
            { name: "Belgium" },
            { name: "Belize" },
            { name: "Benin" },
            { name: "Bhutan" },
            { name: "Bolivia" },
            { name: "Bosnia and Herzegovina" },
            { name: "Botswana" },
            { name: "Brazil" },
            { name: "Brunei" },
            { name: "Bulgaria" },
            { name: "Burkina Faso" },
            { name: "Burundi" },
            { name: "Cabo Verde" },
            { name: "Cambodia" },
            { name: "Cameroon" },
            { name: "Canada" },
            { name: "Central African Republic" },
            { name: "Chad" },
            { name: "Chile" },
            { name: "China" },
            { name: "Colombia" },
            { name: "Comoros" },
            { name: "Congo (DRC)" },
            { name: "Congo (Republic)" },
            { name: "Costa Rica" },
            { name: "Croatia" },
            { name: "Cuba" },
            { name: "Cyprus" },
            { name: "Czech Republic" },
            { name: "Denmark" },
            { name: "Djibouti" },
            { name: "Dominica" },
            { name: "Dominican Republic" },
            { name: "Ecuador" },
            { name: "Egypt" },
            { name: "El Salvador" },
            { name: "Equatorial Guinea" },
            { name: "Eritrea" },
            { name: "Estonia" },
            { name: "Eswatini" },
            { name: "Ethiopia" },
            { name: "Fiji" },
            { name: "Finland" },
            { name: "France" },
            { name: "Gabon" },
            { name: "Gambia" },
            { name: "Georgia" },
            { name: "Germany" },
            { name: "Ghana" },
            { name: "Greece" },
            { name: "Grenada" },
            { name: "Guatemala" },
            { name: "Guinea" },
            { name: "Guinea-Bissau" },
            { name: "Guyana" },
            { name: "Haiti" },
            { name: "Honduras" },
            { name: "Hungary" },
            { name: "Iceland" },
            { name: "India" },
            { name: "Indonesia" },
            { name: "Iran" },
            { name: "Iraq" },
            { name: "Ireland" },
            { name: "Italy" },
            { name: "Jamaica" },
            { name: "Japan" },
            { name: "Jordan" },
            { name: "Kazakhstan" },
            { name: "Kenya" },
            { name: "Kiribati" },
            { name: "Korea, North" },
            { name: "Korea, South" },
            { name: "Kuwait" },
            { name: "Kyrgyzstan" },
            { name: "Laos" },
            { name: "Latvia" },
            { name: "Lebanon" },
            { name: "Lesotho" },
            { name: "Liberia" },
            { name: "Libya" },
            { name: "Liechtenstein" },
            { name: "Lithuania" },
            { name: "Luxembourg" },
            { name: "Madagascar" },
            { name: "Malawi" },
            { name: "Malaysia" },
            { name: "Maldives" },
            { name: "Mali" },
            { name: "Malta" },
            { name: "Marshall Islands" },
            { name: "Mauritania" },
            { name: "Mauritius" },
            { name: "Mexico" },
            { name: "Micronesia" },
            { name: "Moldova" },
            { name: "Monaco" },
            { name: "Mongolia" },
            { name: "Montenegro" },
            { name: "Morocco" },
            { name: "Mozambique" },
            { name: "Myanmar" },
            { name: "Namibia" },
            { name: "Nauru" },
            { name: "Nepal" },
            { name: "Netherlands" },
            { name: "New Zealand" },
            { name: "Nicaragua" },
            { name: "Niger" },
            { name: "Nigeria" },
            { name: "North Macedonia" },
            { name: "Norway" },
            { name: "Oman" },
            { name: "Pakistan" },
            { name: "Palau" },
            { name: "Palestine" },
            { name: "Panama" },
            { name: "Papua New Guinea" },
            { name: "Paraguay" },
            { name: "Peru" },
            { name: "Philippines" },
            { name: "Poland" },
            { name: "Portugal" },
            { name: "Qatar" },
            { name: "Romania" },
            { name: "Russian Federation" },
            { name: "Rwanda" },
            { name: "Saint Kitts and Nevis" },
            { name: "Saint Lucia" },
            { name: "Saint Vincent and the Grenadines" },
            { name: "Samoa" },
            { name: "San Marino" },
            { name: "Sao Tome and Principe" },
            { name: "Saudi Arabia" },
            { name: "Senegal" },
            { name: "Serbia" },
            { name: "Seychelles" },
            { name: "Sierra Leone" },
            { name: "Singapore" },
            { name: "Slovakia" },
            { name: "Slovenia" },
            { name: "Solomon Islands" },
            { name: "Somalia" },
            { name: "South Africa" },
            { name: "South Sudan" },
            { name: "Spain" },
            { name: "Sri Lanka" },
            { name: "Sudan" },
            { name: "Suriname" },
            { name: "Sweden" },
            { name: "Switzerland" },
            { name: "Syria" },
            { name: "Taiwan" },
            { name: "Tajikistan" },
            { name: "Tanzania" },
            { name: "Thailand" },
            { name: "Timor-Leste" },
            { name: "Togo" },
            { name: "Tonga" },
            { name: "Trinidad and Tobago" },
            { name: "Tunisia" },
            { name: "Turkey" },
            { name: "Turkmenistan" },
            { name: "Tuvalu" },
            { name: "Uganda" },
            { name: "Ukraine" },
            { name: "United Arab Emirates" },
            { name: "United Kingdom" },
            { name: "United States" },
            { name: "Uruguay" },
            { name: "Uzbekistan" },
            { name: "Vanuatu" },
            { name: "Vatican City" },
            { name: "Venezuela" },
            { name: "Vietnam" },
            { name: "Yemen" },
            { name: "Zambia" },
            { name: "Zimbabwe" }

        ];

        // Sort countries alphabetically
        countries.sort((a, b) => a.name.localeCompare(b.name));

        // Add countries to select element
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
    }

    // Form validation
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset all error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });

        let isValid = true;

        // Validate first name
        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showError(firstName, 'firstNameError');
            isValid = false;
        }

        // Validate last name
        const lastName = document.getElementById('lastName');
        if (!lastName.value.trim()) {
            showError(lastName, 'lastNameError');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'emailError');
            isValid = false;
        }

        // Validate password
        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'passwordError');
            isValid = false;
        }

        // Validate confirm password
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'confirmPasswordError');
            isValid = false;
        }

        // Validate country
        const country = document.getElementById('country');
        if (!country.value) {
            showError(country, 'countryError');
            isValid = false;
        }

        // Validate address
        const address = document.getElementById('address');
        if (!address.value.trim()) {
            showError(address, 'addressError');
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            form.style.display = 'none';
            successMessage.style.display = 'flex';

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

    // 3D tilt effect has been removed
});