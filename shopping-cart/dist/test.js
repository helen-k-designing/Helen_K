"use strict";
/*class Album1 implements IAlbum {
    // protected title: string;
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[];

    constructor(opts: { title: string; artist: string; releaseYear: number, trackList: string[] }) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
        this.trackList = opts.trackList;
    }
    displayInfo() {
        console.log(`${this.title} by ${this.artist}, released in ${this.releaseYear}.`,);
    }
}

interface IAlbum {
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[];
}

class SpecialEditionAlbum extends Album1 {
    // bonusTracks
    // bonusTracks: string[];

    // constructor(opts: { title: string; artist: string; releaseYear: number, bonusTracks: string[] }) {
    //     super(opts);
    //     this.bonusTracks = opts.bonusTracks;
    // }

    getTitle() {
        return this.title;
    }

    override displayInfo() {
        console.log(
            `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
        );
        // console.log(`Bonus tracks: ${this.bonusTracks.join(", ")}`);
    }
}

const opts = {
    title: "Plastic Ono Band",
    artist: "John Lennon",
    releaseYear: 2000,
    bonusTracks: ["Power to the People", "Do the Oz"],
};

// let specialEditionAlbum = new SpecialEditionAlbum(opts);

abstract class AlbumBase {
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[] = [];
    constructor(opts: { title: string; artist: string; releaseYear: number }) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }
    addTrack(track: string) {
        this.trackList.push(track);
    }

    abstract addReview(author: string, review: string): void;
}

class Album extends AlbumBase {
   addReview(author: string, review: string): void{
        
   };
}

const album = new Album({
    title: "Unknown Album",
    artist: "Unknown Artist",
    releaseYear: 0,
});

*/
function getFirstElement(arr) {
    return arr[0];
}
const num = getFirstElement([1, 2, 3]); // тип num буде any, компілятор не знає, що це number
// З Generic (Тип зберігається)
// Ми додаємо параметр типу <T> перед круглими дужками функції:
function getFirstItem(arr) {
    return arr[0];
}
// Компілятор автоматично розуміє (виводить) тип:
const firstNumber = getFirstItem([10, 20, 30]); // Тип: number
const firstString = getFirstItem(["яблуко", "банан"]); // Тип: string
// Повторне використання інтерфейсу для різних сутностей:
const userResponse = {
    status: "success",
    statusCode: 200,
    data: { id: 1, name: "Олексій" }
};
const productResponse = {
    status: "success",
    statusCode: 200,
    data: { id: "p1", title: "Ноутбук", price: 25000 }
};
console.log(firstNumber); // Виведе: 10
console.log(firstString); // Виведе: "яблуко"
console.log(userResponse.data.name); // Виведе: "Олексій"   
console.log(productResponse.data.title); // Виведе: "Ноутбук"
console.log(productResponse.data.price); // Виведе: 25000
// Тип T обов'язково повинен мати властивість length
function logLength(item) {
    console.log(`Довжина: ${item.length}`);
}
logLength("Привіт"); // Працює (у рядків є length)
logLength([1, 2, 3]); // Працює (у масивів є length)
// logLength(123); // Помилка компіляції: у чисел немає length
// Звичайна стрілочна функція (.ts)
const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};
// Для .tsx файлів додають кому або extends, щоб JSX-парсер не помилявся:
const getFirst = (arr) => arr[0];
const getSecond = (arr) => arr[1];
function mergeObjects(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
// TypeScript автоматично виведе тип: { name: string } & { age: number }
const person = mergeObjects({ name: "Іван" }, { age: 25 });
console.log(person.name); // Працює!
console.log(person.age); // Працює!
const stringBox = { content: "Текст" }; // T є string за замовчуванням
const numberBox = { content: 42 }; // Явно перевизначили на number
function getValue(obj, key) {
    return obj[key];
}
const user = { id: 1, username: "dev_user", isActive: true };
const username = getValue(user, "username"); // Тип: string
const userId = getValue(user, "id"); // Тип: number
// 1. Partial<T> - робить усі поля необов'язковими
function updateTodo(todo, fieldsToUpdate) {
    return Object.assign(Object.assign({}, todo), fieldsToUpdate);
}
// 2. Readonly<T> - забороняє змінювати поля об'єкта
const myTodo = { title: "Learn TS", description: "Deep dive", completed: false };
// myTodo.completed = true;
// Помилка: Cannot assign to 'completed' because it is a read-only property.
// 3. Record<K, T> - створює об'єкт із заданими ключами K та значеннями T
const pageLogos = {
    home: "home.png",
    about: "about.png",
};
function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i));
    }
    return result;
}
// Приклад використання:
const numbers = [1, 2, 3];
const strings = myMap(numbers, (num) => `Число ${num}`);
// strings має тип string[] -> ["Число 1", "Число 2", "Число 3"]
console.log(strings); // Виведе: ["Число 1", "Число 2", "Число 3"]
function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i)) {
            result.push(array[i]);
        }
    }
    return result;
}
// Приклад використання:
const mixedNumbers = [1, 2, 3, 4, 5, 6];
const evens = myFilter(mixedNumbers, (num) => num % 2 === 0);
// evens має тип number[] -> [2, 4, 6]
console.log(evens); // Виведе: [2, 4, 6]
function myReduce(array, callback, initialValue) {
    const hasInitialValue = arguments.length === 3;
    if (array.length === 0 && !hasInitialValue) {
        throw new TypeError("Reduce of empty array with no initial value");
    }
    let accumulator = hasInitialValue ? initialValue : array[0];
    const startIndex = hasInitialValue ? 0 : 1;
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i);
    }
    return accumulator;
}
// Приклад використання:
const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
const totalPrice = myReduce(items, (sum, item) => sum + item.price, 0);
// totalPrice має тип number -> 60
console.log(totalPrice); // Виведе: 60
// 3. Єдина реалізація функції
function myTGFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i)) {
            result.push(array[i]);
        }
    }
    return result;
}
console.log(myTGFilter([1, 2, 3, 4], (num) => num > 2)); // Виведе: [3, 4]
const mixedArray = ["Привіт", null, "Світ", undefined];
// Створюємо Type Guard функцію
const isNotNullish = (item) => {
    return item !== null && item !== undefined;
};
// TypeScript автоматично виводить тип cleanArray як string[] (замість (string | null | undefined)[])
const cleanArray = myFilter(mixedArray, isNotNullish);
console.log(cleanArray); // ["Привіт", "Світ"]
const users = [
    { role: "admin", name: "Аліса", deleteUser: () => { } },
    { role: "guest", name: "Іван" }
];
console.log(myTGFilter(users, (user) => user.role === "admin")); // Виведе: [{ role: "admin", name: "Аліса", deleteUser: [Function] }]   
// Type Guard для перевірки, чи є користувач адміном
function isAdmin(user) {
    return user.role === "admin";
}
// TypeScript розуміє, що admins —це масив типу Admin[]
const admins = myTGFilter(users, isAdmin);
// Тепер ми можемо безпечно викликати методи адміна без помилок типізації:
admins.forEach(admin => admin.deleteUser());
console.log(admins); // Виведе: [{ role: "admin", name: "Аліса", deleteUser: [Function] }]
// Акумулятор `sum` автоматично отримує тип number
const sum = myReduce(numbers, (sum, num) => sum + num);
// sum = 10 (тип number)
console.log(sum); // Виведе: 10
// Трансформуємо масив об'єктів у число.
const cart = [{ price: 100 }, { price: 200 }];
// Обов'язково передаємо 0, щоб TypeScript знав, що акумулятор —це number, а не об'єкт
const total = myReduce(cart, (sum, item) => sum + item.price, 0);
// total = 300 (тип number)
console.log(total); // Виведе: 300
try {
    myReduce([], (acc, val) => acc + val);
}
catch (e) {
    console.error(e.message); // "Reduce of empty array with no initial value"
}
