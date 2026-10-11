'use strict';

// Чекаємо, поки браузер повністю побудує всі HTML-теги на сторінці
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. СЕЛЕКТОРИ ЕЛЕМЕНТІВ ІНТЕРФЕЙСУ
    // ==========================================================================
    const modal = document.getElementById('modalOverlay');       /* Підкладка модального вікна */
    const openBtn = document.getElementById('openModalBtn');     /* Кнопка "Open Registration" */
    const closeBtn = document.getElementById('closeModalBtn');   /* Хрестик закриття карти */
    const form = document.querySelector('form');                 /* Сама HTML-форма реєстрації */

    // Текстові поля введення інформації
    const firstInput = document.getElementById('lastName');
    const firstNameInput = document.getElementById('firstName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password-reg'); // Виправлено: id="password-reg"
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Нативні радіо-кнопки статі
    const genderFemale = document.getElementById('genderFemale');
    const genderMale = document.getElementById('genderMale');

    // Текстові спани під інпутами для виведення помилок валідації
    const lastNameError = document.getElementById('lastNameError');
    const firstNameError = document.getElementById('firstNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordRegError'); // Виправлено під ваш HTML id
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError = document.getElementById('genderError');

    // Змінна для збереження кнопки, яка відкрила модалку
    let lastActiveElement;

    // ==========================================================================
    // 2. ФУНКЦІЇ КЕРУВАННЯ ВІКНОМ ТА СКИДАННЯ ПОМИЛОК
    // ==========================================================================
    
    function closeModalWindow() {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        if (form) form.reset();
        clearAllErrors();
        if (lastActiveElement) lastActiveElement.focus();
    }

    function clearAllErrors() {
        [lastNameError, firstNameError, emailError, phoneError, passwordError, confirmPasswordError, genderError].forEach(err => {
            if (err) err.textContent = '';
        });
        [firstInput, firstNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput, genderFemale, genderMale].forEach(inp => {
            if (inp) inp.setCustomValidity('');
        });
    }

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            lastActiveElement = document.activeElement;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            modal.addEventListener('transitionend', function onEnd(e) {
                if (e.target === modal) {
                    if (firstInput) firstInput.focus();
                    modal.removeEventListener('transitionend', onEnd);
                }
            });
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModalWindow);
    if (modal) {
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) closeModalWindow(); 
        });
    }

    // ==========================================================================
    // 3. ЛОГІКА РОБОТИ ІКОНОК ОКА (Показ пароля)
    // ==========================================================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const openEye = this.querySelector('.eye-open');
            const closedEye = this.querySelector('.eye-closed');

            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    if (openEye) openEye.classList.remove('hidden');
                    if (closedEye) closedEye.classList.add('hidden');
                } else {
                    input.type = 'password';
                    if (openEye) openEye.classList.add('hidden');
                    if (closedEye) closedEye.classList.remove('hidden');
                }
            }
        });
    });

    // ==========================================================================
    // 4. ОПТИМІЗАЦІЯ КЕРУВАННЯ СТАТТЮ
    // ==========================================================================
    [genderFemale, genderMale].forEach(radio => {
        if (radio) {
            radio.addEventListener('change', () => {
                if (genderError) genderError.textContent = '';
                if (genderFemale) genderFemale.setCustomValidity('');
                if (genderMale) genderMale.setCustomValidity('');
            });
            
            radio.addEventListener('focus', () => {
                radio.checked = true;
                if (genderError) genderError.textContent = '';
                if (genderFemale) genderFemale.setCustomValidity('');
                if (genderMale) genderMale.setCustomValidity('');
            });
        }
    });

    function validateGender() {
        if (!genderFemale || !genderMale || !genderError) return;
        if (!genderFemale.checked && !genderMale.checked) {
            genderError.textContent = 'Будь ласка, оберіть вашу стать.';
            genderFemale.setCustomValidity('Оберіть стать');
        } else {
            genderError.textContent = '';
            genderFemale.setCustomValidity('');
            genderMale.setCustomValidity('');
        }
    }

    // ==========================================================================
    // 5. ЖИВА ВАЛІДАЦІЯ ТЕКСТОВИХ ПОЛІВ ВВЕДЕННЯ
    // ==========================================================================
    
    function validateLastName() {
        if (!firstInput || !lastNameError) return;
        if (!firstInput.value.trim()) {
            lastNameError.textContent = "Поле Last Name не може бути порожнім.";
            firstInput.setCustomValidity("Заповніть поле.");
        } else { 
            lastNameError.textContent = ""; 
            firstInput.setCustomValidity(""); 
        }
    }

    function validateFirstName() {
        if (!firstNameInput || !firstNameError) return;
        if (!firstNameInput.value.trim()) {
            firstNameError.textContent = "Поле First Name не може бути порожнім.";
            firstNameInput.setCustomValidity("Заповніть поле.");
        } else { 
            firstNameError.textContent = ""; 
            firstNameInput.setCustomValidity(""); 
        }
    }

    function validateEmail() {
        if (!emailInput || !emailError) return;

        // КЛЮЧОВЕ ВИПРАВЛЕННЯ: Спочатку скидаємо кастомне повідомлення,
        // щоб checkValidity() перевіряв лише формат тексту в інпуті
        emailInput.setCustomValidity('');

        if (!emailInput.value.trim()) {
            emailError.textContent = "Поле Email не може бути порожнім.";
            emailInput.setCustomValidity("Заповніть поле.");
        } else if (!emailInput.checkValidity()) {
            emailError.textContent = "Введіть коректний Email (наприклад: name@mail.com).";
            emailInput.setCustomValidity("Некоректний формат.");
        } else { 
            emailError.textContent = ""; 
            emailInput.setCustomValidity(""); 
        }
    }

    function validatePhone() {
        if (!phoneInput || !phoneError) return;
        if (!phoneInput.value.trim()) {
            phoneError.textContent = "Поле Phone Number не може бути порожнім.";
            phoneInput.setCustomValidity("Заповніть поле.");
        } else { 
            phoneError.textContent = ""; 
            phoneInput.setCustomValidity(""); 
        }
    }

    function validatePasswords() {
        if (!passwordInput || !confirmPasswordInput) return;

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Перевірка головного пароля
        if (!password) {
            if (passwordError) passwordError.textContent = 'Password cannot be empty.';
            passwordInput.setCustomValidity('Заповніть поле');
        } else if (password.length < 8) {
            if (passwordError) passwordError.textContent = 'Minimum 8 characters required.';
            passwordInput.setCustomValidity('Занадто короткий пароль');
        } else {
            if (passwordError) passwordError.textContent = '';
            passwordInput.setCustomValidity('');
        }

        // Перевірка на збіг з підтвердженням
        if (confirmPasswordError) {
            if (!confirmPassword) {
                confirmPasswordError.textContent = '';
                confirmPasswordInput.setCustomValidity('');
            } else if (password !== confirmPassword) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordInput.setCustomValidity('Паролі не збігаються');
            } else {
                confirmPasswordError.textContent = '';
                confirmPasswordInput.setCustomValidity('');
            }
        }
    }

    // Підключаємо слухачі тільки за наявності елементів в DOM
    if (firstInput) firstInput.addEventListener('input', validateLastName);
    if (firstNameInput) firstNameInput.addEventListener('input', validateFirstName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (phoneInput) phoneInput.addEventListener('input', validatePhone);
    if (passwordInput) passwordInput.addEventListener('input', validatePasswords);
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', validatePasswords);

    // ==========================================================================
    // 6. ЗАПОБІЖНИК ВІД ВИПАДКОВОГО НАТИСКАННЯ ENTER В ПОЛЯХ
    // ==========================================================================
    if (form) {
        form.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                e.preventDefault();
                const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]'));
                const currentIndex = inputs.indexOf(e.target);
                if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        });

        // ==========================================================================
        // 7. ОБРОБКА ВІДПРАВКИ ФОРМИ (Клік на кнопку "Register")
        // ==========================================================================
        form.addEventListener('submit', (e) => {
            validateLastName();
            validateFirstName();
            validateEmail();
            validatePhone();
            validatePasswords();
            validateGender();

            if (!form.checkValidity()) {
                e.preventDefault();
                console.log('Скасовано: форма реєстрації містить помилки заповнення.');
                return;
            }

            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Дані реєстрації успішно надіслано в консоль:', data);

            alert(`Дякуємо, ${data.firstName || ''}! Реєстрація пройшла успішно.`);
            form.reset();
            closeModalWindow();
        });
    }
});