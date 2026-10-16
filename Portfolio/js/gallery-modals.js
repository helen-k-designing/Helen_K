'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. СЕЛЕКТОРИ ДЛЯ МОДАЛЬНОГО ВІКНА ВХОДУ (SIGN IN)
    // ==========================================================================
    const loginModal = document.getElementById('loginModalOverlay');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const cancelLoginBtn = document.getElementById('cancelLoginBtn');
    const loginForm = document.getElementById('loginForm');
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // ==========================================================================
    // 2. СЕЛЕКТОРИ ДЛЯ МОДАЛЬНОГО ВІКНА РЕЄСТРАЦІЇ (REGISTRATION)
    // ==========================================================================
    const registerModal = document.getElementById('registerModalOverlay');
    const closeRegisterBtn = document.getElementById('closeRegisterBtn');
    const registrationForm = document.getElementById('registrationForm');

    const lastNameInput = document.getElementById('lastName');
    const firstNameInput = document.getElementById('firstName');
    const emailRegInput = document.getElementById('emailReg') || document.getElementById('email-reg');
    const phoneInput = document.getElementById('phone');
    const regPasswordInput = document.getElementById('password-reg');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const lastNameError = document.getElementById('lastNameError');
    const firstNameError = document.getElementById('firstNameError');
    const emailRegError = document.getElementById('emailRegError');
    const phoneError = document.getElementById('phoneError');
    const passwordRegError = document.getElementById('passwordRegError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError = document.getElementById('genderError');

    // Нативні радіо-кнопки статі
    const genderFemale = document.getElementById('genderFemale');
    const genderMale = document.getElementById('genderMale');

    // Змінна для повернення фокусу
    let lastActiveElement;

    // ==========================================================================
    // 3. УНІВЕРСАЛЬНІ ФУНКЦІЇ ВІДКРИТТЯ ТА ЗАКРИТТЯ ВІКОН
    // ==========================================================================
    
    function openModal(modalElement, firstInput) {
        if (!modalElement) return;
        lastActiveElement = document.activeElement;
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if (firstInput) firstInput.focus();
        }, 50);
    }

    function closeModal(modalElement, formElement, errorSpans = []) {
        if (!modalElement) return;
        modalElement.classList.remove('active');
        document.body.style.overflow = '';
        
        if (formElement) formElement.reset();

        errorSpans.forEach(span => {
            if (span) span.textContent = '';
        });

        const inputs = formElement?.querySelectorAll('input');
        inputs?.forEach(input => input.setCustomValidity(''));

        // Скидаємо хеш в URL, щоб кнопка відкриття працювала повторно
        if (window.location.hash) {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }

        if (lastActiveElement) lastActiveElement.focus();
    }

    // ==========================================================================
    // 4. НАВІГАЦІЯ ЧЕРЕЗ ХЕШІ (#open-login / #open-register-modal)
    // ==========================================================================
    
    function checkUrlHash() {
        const hash = window.location.hash;
        
        if (hash === '#open-login') {
            openModal(loginModal, emailInput);
        } else if (hash === '#open-register-modal') {
            openModal(registerModal, lastNameInput);
        }
    }

    checkUrlHash();
    window.addEventListener('hashchange', checkUrlHash);

    // ==========================================================================
    // 5. ОБРОБНИКИ ПОДІЙ ЗАКРИТТЯ ВІКОН
    // ==========================================================================
    
    closeLoginBtn?.addEventListener('click', () => closeModal(loginModal, loginForm, [emailError, passwordError]));
    cancelLoginBtn?.addEventListener('click', () => closeModal(loginModal, loginForm, [emailError, passwordError]));
    loginModal?.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal, loginForm, [emailError, passwordError]);
    });

    closeRegisterBtn?.addEventListener('click', () => closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]));
    registerModal?.addEventListener('click', (e) => {
        if (e.target === registerModal) closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (loginModal?.classList.contains('active')) {
                closeModal(loginModal, loginForm, [emailError, passwordError]);
            }
            if (registerModal?.classList.contains('active')) {
                closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]);
            }
        }
    });

    // ==========================================================================
    // 6. ЛОГІКА ОКА (ПОКАЗ/ПРИХОВАННЯ ПАРОЛІВ)
    // ==========================================================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;

            const openEye = this.querySelector('.eye-open');
            const closedEye = this.querySelector('.eye-closed');

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            
            openEye?.classList.toggle('hidden', !isPassword);
            closedEye?.classList.toggle('hidden', isPassword);
        });
    });

    // ==========================================================================
    // 7. КЕРУВАННЯ СТАТТЮ (Tab / Focus)
    // ==========================================================================
    [genderFemale, genderMale].forEach(radio => {
        if (radio) {
            radio.addEventListener('change', () => {
                if (genderError) genderError.textContent = '';
                genderFemale?.setCustomValidity('');
                genderMale?.setCustomValidity('');
            });
            radio.addEventListener('focus', () => {
                radio.checked = true;
                if (genderError) genderError.textContent = '';
                genderFemale?.setCustomValidity('');
                genderMale?.setCustomValidity('');
            });
        }
    });

    // ==========================================================================
    // 8. ЖИВА ВАЛІДАЦІЯ ПОЛІВ ВВЕДЕННЯ
    // ==========================================================================

    // --- Валідація Входу ---
    function validateLoginEmail() {
        if (!emailInput) return;
        emailInput.setCustomValidity('');
        const val = emailInput.value.trim();

        if (!val) {
            if (emailError) emailError.textContent = 'Поле Email не може бути порожнім.';
            emailInput.setCustomValidity('Заповніть це поле.');
        } else if (!emailInput.checkValidity()) {
            if (emailError) emailError.textContent = 'Введіть коректний Email.';
            emailInput.setCustomValidity('Некоректний формат.');
        } else {
            if (emailError) emailError.textContent = '';
            emailInput.setCustomValidity('');
        }
    }

    function validateLoginPassword() {
        if (!passwordInput) return;
        const val = passwordInput.value;

        if (!val) {
            if (passwordError) passwordError.textContent = 'Поле Пароль не може бути порожнім.';
            passwordInput.setCustomValidity('Заповніть це поле.');
        } else if (val.length < 6) {
            if (passwordError) passwordError.textContent = 'Мінімум 6 символів.';
            passwordInput.setCustomValidity('Пароль занадто короткий.');
        } else {
            if (passwordError) passwordError.textContent = '';
            passwordInput.setCustomValidity('');
        }
    }

    // --- Валідація Реєстрації ---
    function validateLastName() {
        if (!lastNameInput) return;
        if (!lastNameInput.value.trim()) {
            if (lastNameError) lastNameError.textContent = 'Поле Last Name не може бути порожнім.';
            lastNameInput.setCustomValidity('Заповніть поле.');
        } else {
            if (lastNameError) lastNameError.textContent = '';
            lastNameInput.setCustomValidity('');
        }
    }

    function validateFirstName() {
        if (!firstNameInput) return;
        if (!firstNameInput.value.trim()) {
            if (firstNameError) firstNameError.textContent = 'Поле First Name не може бути порожнім.';
            firstNameInput.setCustomValidity('Заповніть поле.');
        } else {
            if (firstNameError) firstNameError.textContent = '';
            firstNameInput.setCustomValidity('');
        }
    }

    function validateRegEmail() {
        if (!emailRegInput) return;
        emailRegInput.setCustomValidity('');
        const val = emailRegInput.value.trim();

        if (!val) {
            if (emailRegError) emailRegError.textContent = 'Поле Email не може бути порожнім.';
            emailRegInput.setCustomValidity('Заповніть поле.');
        } else if (!emailRegInput.checkValidity()) {
            if (emailRegError) emailRegError.textContent = 'Введіть коректний Email.';
            emailRegInput.setCustomValidity('Некоректний формат.');
        } else {
            if (emailRegError) emailRegError.textContent = '';
            emailRegInput.setCustomValidity('');
        }
    }

    function validatePhone() {
        if (!phoneInput) return;
        if (!phoneInput.value.trim()) {
            if (phoneError) phoneError.textContent = 'Поле Phone Number не може бути порожнім.';
            phoneInput.setCustomValidity('Заповніть поле.');
        } else {
            if (phoneError) phoneError.textContent = '';
            phoneInput.setCustomValidity('');
        }
    }

    function validateRegPasswords() {
        if (!regPasswordInput || !confirmPasswordInput) return;
        const pass = regPasswordInput.value;
        const confirmPass = confirmPasswordInput.value;

        if (!pass) {
            if (passwordRegError) passwordRegError.textContent = 'Password cannot be empty.';
            regPasswordInput.setCustomValidity('Заповніть поле.');
        } else if (pass.length < 8) {
            if (passwordRegError) passwordRegError.textContent = 'Minimum 8 characters required.';
            regPasswordInput.setCustomValidity('Короткий пароль.');
        } else {
            if (passwordRegError) passwordRegError.textContent = '';
            regPasswordInput.setCustomValidity('');
        }

        if (confirmPasswordError) {
            if (!confirmPass) {
                confirmPasswordError.textContent = '';
                confirmPasswordInput.setCustomValidity('');
            } else if (pass !== confirmPass) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordInput.setCustomValidity('Паролі не збігаються.');
            } else {
                confirmPasswordError.textContent = '';
                confirmPasswordInput.setCustomValidity('');
            }
        }
    }

    function validateGender() {
        if (!genderFemale || !genderMale) return;
        if (!genderFemale.checked && !genderMale.checked) {
            if (genderError) genderError.textContent = 'Будь ласка, оберіть вашу стать.';
            genderFemale.setCustomValidity('Оберіть стать');
        } else {
            if (genderError) genderError.textContent = '';
            genderFemale.setCustomValidity('');
            genderMale.setCustomValidity('');
        }
    }

    // Слухачі live-введення
    emailInput?.addEventListener('input', validateLoginEmail);
    passwordInput?.addEventListener('input', validateLoginPassword);

    lastNameInput?.addEventListener('input', validateLastName);
    firstNameInput?.addEventListener('input', validateFirstName);
    emailRegInput?.addEventListener('input', validateRegEmail);
    phoneInput?.addEventListener('input', validatePhone);
    regPasswordInput?.addEventListener('input', validateRegPasswords);
    confirmPasswordInput?.addEventListener('input', validateRegPasswords);

    // ==========================================================================
    // 9. ЗАПОБІЖНИК ВІД ENTER ТА ОБРОБКА SUBMIT
    // ==========================================================================
    
    document.querySelectorAll('form').forEach(formElement => {
        formElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                e.preventDefault();
                const inputs = Array.from(formElement.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]'));
                const currentIndex = inputs.indexOf(e.target);
                if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        });
    });

    // --- ОБРОБКА ВХОДУ ---
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        validateLoginEmail();
        validateLoginPassword();

        if (!loginForm.checkValidity()) return;

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Успішний вхід:', data);
        
        alert(`Ласкаво просимо, ${data.email || ''}!`);
        closeModal(loginModal, loginForm, [emailError, passwordError]);
    });

    // --- ОБРОБКА РЕЄСТРАЦІЇ ---
    registrationForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        validateLastName();
        validateFirstName();
        validateRegEmail();
        validatePhone();
        validateRegPasswords();
        validateGender();

        if (!registrationForm.checkValidity()) return;

        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Успішна реєстрація:', data);

        alert(`Вітаємо, ${data.firstName || ''}! Реєстрація пройшла успішно.`);
        closeModal(registerModal, registrationForm, [lastNameError, firstNameError, emailRegError, phoneError, passwordRegError, confirmPasswordError, genderError]);
    });
});