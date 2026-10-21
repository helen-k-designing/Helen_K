"use strict";
// 2. Імплементуємо інтерфейс у класі User
class User {
    // Конструктор для ініціалізації властивостей
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActive = true; // значення за замовчуванням
    }
    //  Class 'User' incorrectly implements interface 'IUser'.
    //   Property 'getProfileInfo' is missing in type 'User' but required in type 'IUser'.ts(2420)
    // user.ts(8, 5): 'getProfileInfo' is declared here.
    // Обов'язкова реалізація методу з інтерфейсу
    getProfileInfo() {
        return `Користувач: ${this.name} (${this.email}), ID: ${this.id} Status: ${this.isActive}`;
    }
    // У класі також можна створювати власні методи, яких немає в інтерфейсі
    toggleStatus() {
        this.isActive = !this.isActive;
    }
}
// 3. Використання класу
const myUser = new User(1, "Олександр", "alex@example.com");
console.log(myUser.getProfileInfo());
myUser.toggleStatus();
console.log(myUser.getProfileInfo());
// Виведе: Користувач: Олександр (alex@example.com), ID: 1
class ShortUser {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActive = true;
    }
    getProfileInfo() {
        return `${this.name} - ${this.email}`;
    }
}
const shortUser = new ShortUser(2, "Tom Cat", "tom@example.com");
console.log(shortUser.getProfileInfo());
class AUser {
    constructor(id, email, name, role) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.name = name;
    }
    // Методи з IAuthenticatable
    login() {
        console.log(`Користувач  ${this.name}: ${this.email} увійшов в систему як ${this.role}.`);
    }
    logout() {
        console.log(`Користувач  ${this.name}: ${this.email} вийшов із системи.`);
    }
}
const aUser = new AUser("user_2", "jdoe@example.com", "John Doe", "Customer");
aUser.login();
aUser.logout();
// Обидва інтерфейси вимагають метод save(): void
class BackupManager {
    // Одна реалізація покриває обидва інтерфейси
    save() {
        console.log("Дані збережено і локально, і в хмару!");
    }
}
class OUser {
    // 2. Єдина універсальна реалізація методу
    // Тип параметра об'єднуємо через union (string | number)
    // Тип повернення об'єднуємо або використовуємо any
    notify(payload) {
        if (typeof payload === "string") {
            console.log(`Надсилаємо Email: ${payload}`);
            return true; // задовольняє IEmailNotifier
        }
        else if (typeof payload === "number") {
            console.log(`Надсилаємо SMS з кодом помилки: ${payload}`);
            // повертає undefined за замовчуванням, що задовольняє void в ISmsNotifier
        }
    }
}
// Використання:
const ouser = new OUser();
const emailResult = ouser.notify("Привіт!"); // Працює як функція з string -> boolean
ouser.notify(404); // Працює як функція з number -> void
class OPUser {
    // phoneNumber та sendNotification ми вирішили взагалі не додавати в цей клас
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        if (age) {
            this.age = age;
        }
    }
}
// 3. Створення об'єктів
const userWithAge = new OPUser(1, "Іван", 25);
const userWithoutAge = new OPUser(2, "Марія");
console.log(userWithAge.age); // Виведе: 25
console.log(userWithoutAge.age); // Виведе: undefined
// 1. Створюємо абстрактний клас
class BaseUser {
    // Звичайні властивості
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    // метод з реалізацією (спільний для всіх)
    getGreeting() {
        return `Привіт, я ${this.name}!`;
    }
}
// 2. Створюємо клас-нащадок за допомогою `extends`
class Customer extends BaseUser {
    // Обов'язково реалізуємо абстрактний метод
    saveToDatabase() {
        console.log(`Зберігаємо клієнта ${this.name} у таблицю 'customers'`);
    }
}
class Admin extends BaseUser {
    // Адмін зберігається інакше
    saveToDatabase() {
        console.log(`Зберігаємо адміна ${this.name} у таблицю 'admins' з підвищеними правами`);
    }
}
// const base = new BaseUser("1", "Хтось"); 
// Cannot create an instance of an abstract class.ts(2511)
// constructor BaseUser(id: string, name: string): BaseUser
const customer = new Customer("c-1", "Аліса");
console.log(customer.getGreeting()); // Працює успадкований метод: "Привіт, я Аліса!"
customer.saveToDatabase(); // Працює власна реалізація
class BaseAuthService {
    // Спільний метод для всіх сервісів: хешування/перевірка пароля
    verifyPassword(plain, hashed) {
        // В реальності тут буде бібліотека bcrypt або argon2
        return plain === hashed;
    }
    // Спільний метод: генерація JWT токена
    generateJWT(userId) {
        return `jwt-token-for-${userId}-${Date.now()}`;
    }
    login(email, password) {
        const user = this.findUserByEmail(email);
        if (!user) {
            throw new Error("Користувача не знайдено");
        }
        const isPasswordValid = this.verifyPassword(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error("Невірний пароль");
        }
        // Створюємо та повертаємо сесію
        return {
            token: this.generateJWT(user.id),
            expiresAt: new Date(Date.now() + 3600000), // +1 година
            userId: user.id
        };
    }
}
// Сервіс для звичайних клієнтів
class CustomerAuthService extends BaseAuthService {
    // Реалізуємо пошук користувача конкретно в таблиці клієнтів
    findUserByEmail(email) {
        console.log(`Пошук у таблиці [Customers] за email: ${email}`);
        // Імітація бази даних
        if (email === "user@test.com") {
            return { id: "cust-1", passwordHash: "123456" };
        }
        return null;
    }
}
// Сервіс для адміністраторів (з підтримкою 2FA)
class AdminAuthService extends BaseAuthService {
    constructor() {
        super(...arguments);
        this.secret2FA = "SUPER_SECRET_KEY";
    }
    // Реалізуємо пошук у таблиці адміністраторів
    findUserByEmail(email) {
        console.log(`Пошук у таблиці [Admins] за email: ${email}`);
        if (email === "admin@test.com") {
            return { id: "admin-99", passwordHash: "admin_pass" };
        }
        return null;
    }
    // Реалізація обов'язкового методу з інтерфейсу ITwoFactorAuthenticatable
    verify2FACode(code) {
        console.log(`Перевірка 2FA коду: ${code}`);
        return code === "123456"; // спрощена перевірка
    }
}
// 1. Спроба увійти як звичайний користувач
const customerAuth = new CustomerAuthService();
try {
    const session = customerAuth.login("user@test.com", "123456");
    console.log("Успішний вхід користувача! Токен:", session.token);
}
catch (error) {
    console.error("Помилка:", error.message);
}
console.log("-----------------------------------------");
// 2. Вхід для адміністратора
const adminAuth = new AdminAuthService();
try {
    const session = adminAuth.login("admin@test.com", "admin_pass");
    console.log("Перший етап пройдено. Перевіряємо 2FA...");
    if (adminAuth.verify2FACode("123456")) {
        console.log("Адміністратор успішно авторизований! Токен:", session.token);
    }
    else {
        console.log("Невірний код 2FA!");
    }
}
catch (error) {
    console.error("Помилка:", error.message);
}
