'use strict';

// Очікуємо повного завантаження структури HTML-документа
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. СЕЛЕКТОРИ ЕЛЕМЕНТІВ ІНТЕРФЕЙСУ
    // ==========================================================================
    const modal = document.getElementById('modalOverlay');       /* Підкладка модального вікна */
    const openBtn = document.getElementById('openModalBtn');     /* Кнопка "Open Login" на сайті */
    const closeBtn = document.getElementById('closeModalBtn');   /* Хрестик закриття карти */
    const cancelBtn = document.getElementById('cancelModalBtn'); /* Кнопка "Відмінити" всередині форми */
    const form = document.getElementById('loginForm') || document.querySelector('form'); /* Тег форми */

    // Поля введення даних користувача
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Текстові спани під інпутами, куди записуються помилки
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Змінна для зберігання кнопки, яка відкрила форму
    let lastActiveElement;

    // ==========================================================================
    // 2. ПЕРЕВІРКА СТАТУСУ АВТОРИЗАЦІЇ ПРИ ЗАВАНТАЖЕННІ
    // ==========================================================================
    /*const isUserAuthorized = localStorage.getItem('isAuthorized') === 'true';
    
    if (isUserAuthorized && openBtn) {
        openBtn.textContent = "Перейти в кабінет";
    }*/

    // ==========================================================================
    // 3. ФУНКЦІЇ КЕРУВАННЯ МОДАЛЬНИМ ВІКНОМ
    // ==========================================================================
    
    function closeModalWindow() {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        
        if (form) form.reset();
        
        if (emailError) emailError.textContent = '';
        if (passwordError) passwordError.textContent = '';
        if (emailInput) emailInput.setCustomValidity('');
        if (passwordInput) passwordInput.setCustomValidity('');
        
        if (lastActiveElement) lastActiveElement.focus();
    }

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            lastActiveElement = document.activeElement;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            modal.addEventListener('transitionend', function onEnd(e) {
                if (e.target === modal) {
                    if (emailInput) emailInput.focus();
                    modal.removeEventListener('transitionend', onEnd);
                }
            });
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModalWindow);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModalWindow);

    if (modal) {
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) closeModalWindow(); 
        });
    }

    // ==========================================================================
    // 4. ЛОГІКА РОБОТИ ІКОНКИ ОКА (Показ/приховання пароля)
    // ==========================================================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            const openEyeIcon = this.querySelector('.eye-open');
            const closedEyeIcon = this.querySelector('.eye-closed');

            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    if (openEyeIcon) openEyeIcon.classList.remove('hidden');
                    if (closedEyeIcon) closedEyeIcon.classList.add('hidden');
                } else {
                    input.type = 'password';
                    if (openEyeIcon) openEyeIcon.classList.add('hidden');
                    if (closedEyeIcon) closedEyeIcon.classList.remove('hidden');
                }
            }
        });
    });

    // ==========================================================================
    // 5. ФУНКЦІЇ КАСТОМНОЇ ВАЛІДАЦІЇ ПОЛІВ ВВЕДЕННЯ
    // ==========================================================================

    function validateEmail() {
        if (!emailInput) return;

        // КЛЮЧОВЕ ВИПРАВЛЕННЯ: обов'язково скидаємо прапорець помилки перед checkValidity()
        emailInput.setCustomValidity('');

        const emailValue = emailInput.value.trim();

        if (!emailValue) {
            if (emailError) emailError.textContent = 'Поле Email не може бути порожнім.';
            emailInput.setCustomValidity('Заповніть це поле.');
        } else if (!emailInput.checkValidity()) {
            if (emailError) emailError.textContent = 'Введіть коректну адресу електронної пошти (наприклад: name@mail.com).';
            emailInput.setCustomValidity('Некоректний формат email.');
        } else {
            if (emailError) emailError.textContent = '';
            emailInput.setCustomValidity('');
        }
    }

    function validatePassword() {
        if (!passwordInput) return;

        const passwordValue = passwordInput.value;

        if (!passwordValue) {
            if (passwordError) passwordError.textContent = 'Поле Пароль не може бути порожнім.';
            passwordInput.setCustomValidity('Заповніть це поле.');
        } else if (passwordValue.length < 6) {
            if (passwordError) passwordError.textContent = 'Пароль має містити щонайменше 6 символів.';
            passwordInput.setCustomValidity('Пароль занадто короткий.');
        } else {
            if (passwordError) passwordError.textContent = '';
            passwordInput.setCustomValidity('');
        }
    }

    // Безпечне підключення слухачів подій
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (passwordInput) passwordInput.addEventListener('input', validatePassword);

    // ==========================================================================
    // 6. ОБРОБКА НАДСИЛАННЯ ФОРМИ (Клік на кнопку "Увійти")
    // ==========================================================================
    if (form) {
        form.addEventListener('submit', (e) => {
            validateEmail();
            validatePassword();

            if (!form.checkValidity()) {
                e.preventDefault();
                console.log('Форма містить помилки заповнення. Відправку скасовано.');
                return;
            }

            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Дані авторизації надіслано успішно:', data);
            
            if (data.rememberMe) {
                localStorage.setItem('isAuthorized', 'true');
            }
            
            alert(`Ласкаво просимо! Ви успішно увійшли як: ${data.email || ''}`);
            form.reset();
            closeModalWindow();
        });
    }

});