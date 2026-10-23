var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CanvasNode_x, _CanvasNode_y;
// ==========================================
// Урок 25. ЗАВДАННЯ 1: Функція з необов'язковим параметром
// ==========================================
const concatName = (first, last) => {
    if (!last) {
        return first;
    }
    return `${first} ${last}`;
};
const result1 = concatName("John", "Doe");
const result2 = concatName("John");
console.log(result1); // "John Doe"
console.log(result2); // "John"
// ==========================================
// Урок 25. ЗАВДАННЯ 2: Об'єднання двох обов'язкових рядків
// ==========================================
const concatTwoStrings = (a, b) => {
    return [a, b].join(" ");
};
const result3 = concatTwoStrings("Hello", "World");
console.log(result3); // "Hello World"
// ==========================================
// Урок 25. ЗАВДАННЯ 3: Математичне додавання чисел
// ==========================================
const add = (a, b) => {
    return a + b;
};
const result = add(10, 20);
console.log(result); // 30
const modifyUser = (user, id, makeChange) => {
    return user.map((u) => {
        if (u.id === id) {
            return makeChange(u);
        }
        return u;
    });
};
const users = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
];
const modifiedUsers = modifyUser(users, "1", (user) => {
    return Object.assign(Object.assign({}, user), { name: "Waqas" });
});
console.log(modifiedUsers);
// ==========================================
// Урок26. ЗАВДАННЯ 1: Базові властивості x та y з модифікатором readonly
// ==========================================
class CanvasNodeTask1 {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const nodeTask1 = new CanvasNodeTask1();
console.log(nodeTask1.x); // 0
console.log(nodeTask1.y); // 0
// ==========================================
// Урок26. ЗАВДАННЯ 2: Додавання методу move
// ==========================================
class CanvasNodeTask2 {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}
const nodeTask2 = new CanvasNodeTask2();
nodeTask2.move(10, 20);
console.log(nodeTask2.x); // 10
console.log(nodeTask2.y); // 20
// ==========================================
// Урок26. ЗАВДАННЯ 3: Конструктор з об'єктом position та гетер position
// ==========================================
class CanvasNodeTask3 {
    constructor(position) {
        var _a, _b;
        this.x = (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : 0;
        this.y = (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : 0;
    }
    get position() {
        return { x: this.x, y: this.y };
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}
const nodeTask3 = new CanvasNodeTask3({ x: 10, y: 20 });
console.log(nodeTask3.position); // { x: 10, y: 20 }
// ==========================================
// Урок26. ЗАВДАННЯ 4: Приватні поля (#x, #y) та сеттер position (Фінальний клас)
// ==========================================
class CanvasNode {
    constructor(position) {
        var _a, _b;
        _CanvasNode_x.set(this, void 0);
        _CanvasNode_y.set(this, void 0);
        __classPrivateFieldSet(this, _CanvasNode_x, (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : 0, "f");
        __classPrivateFieldSet(this, _CanvasNode_y, (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : 0, "f");
    }
    get position() {
        return { x: __classPrivateFieldGet(this, _CanvasNode_x, "f"), y: __classPrivateFieldGet(this, _CanvasNode_y, "f") };
    }
    set position(newPosition) {
        __classPrivateFieldSet(this, _CanvasNode_x, newPosition.x, "f");
        __classPrivateFieldSet(this, _CanvasNode_y, newPosition.y, "f");
    }
    move(x, y) {
        __classPrivateFieldSet(this, _CanvasNode_x, x, "f");
        __classPrivateFieldSet(this, _CanvasNode_y, y, "f");
    }
}
_CanvasNode_x = new WeakMap(), _CanvasNode_y = new WeakMap();
const finalNode = new CanvasNode();
console.log("Початкова позиція:", finalNode.position); // { x: 0, y: 0 }
finalNode.move(10, 20);
console.log("Після move(10, 20):", finalNode.position); // { x: 10, y: 20 }
finalNode.position = { x: 75, y: 150 };
console.log("Після оновлення через сеттер:", finalNode.position); // { x: 75, y: 150 }
const myUser = {
    id: 1,
    name: "Олександр",
    email: "oleksandr@example.com",
    createdAt: new Date(),
};
console.log("Початковий користувач:", myUser);
const filterLength = (array, criterion) => {
    const minLength = Number(criterion);
    return array.filter((str) => str.length > minLength);
};
const words = ["apple", "banana", "cat", "elephant", "dog"];
const filteredWords = filterLength(words, "4");
console.log("Відфільтровані рядки (довжина > 4):", filteredWords);
// Виведе: ["apple", "banana", "elephant"]
// ==========================================
// Урок 28. ЗАВДАННЯ 1: Базовий клас Worker та дочірній Developer
// ==========================================
class Worker {
    constructor(name) {
        this.name = name;
    }
    work() {
        return `${this.name} працює.`;
    }
}
class Developer extends Worker {
    constructor(name, programmingLanguage) {
        super(name);
        this.programmingLanguage = programmingLanguage;
    }
    work() {
        return `${this.name} пише код на ${this.programmingLanguage}.`;
    }
}
const dev = new Developer("Олександр", "TypeScript");
console.log(dev.work()); // Олександр пише код на TypeScript.
// ==========================================
// Урок 28. ЗАВДАННЯ 2: Базовий клас Rectangle та дочірній Square (використання super)
// ==========================================
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
class Square extends Rectangle {
    constructor(side) {
        super(side, side);
        this.side = side;
    }
    describe() {
        const area = this.getArea(); // Отримуємо площу через успадкований метод
        return `Квадрат зі стороною ${this.side} має площу ${area}`;
    }
}
const square = new Square(5);
console.log(square.describe()); // Квадрат зі стороною 5 має площу 25
// ==========================================
// Урок 28. ЗАВДАННЯ 3: Модифікатори доступу та наслідування (protected у BankAccount)
// ==========================================
class BankAccount {
    constructor(initialBalance) {
        this.balance = initialBalance;
    }
    deposit(amount) {
        this.balance += amount;
    }
}
class SavingsAccount extends BankAccount {
    addInterest(rate) {
        this.balance += this.balance * (rate / 100);
    }
    getBalance() {
        return this.balance; // Доступно завдяки модифікатору protected
    }
}
const myAccount = new SavingsAccount(1000);
myAccount.deposit(500);
myAccount.addInterest(10); // Нараховуємо 10%
console.log("Поточний баланс ощадного рахунку:", myAccount.getBalance()); // 1650
export {};
