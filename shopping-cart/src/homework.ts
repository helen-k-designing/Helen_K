
// ==========================================
// Урок 25. ЗАВДАННЯ 1: Функція з необов'язковим параметром
// ==========================================
const concatName = (first: string, last?: string) => {
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
const concatTwoStrings = (a: string, b: string): string => {
  return [a, b].join(" ");
};

const result3 = concatTwoStrings("Hello", "World");
console.log(result3); // "Hello World"


// ==========================================
// Урок 25. ЗАВДАННЯ 3: Математичне додавання чисел
// ==========================================
const add = (a: number, b: number): number => {
  return a + b;
};

const result = add(10, 20);
console.log(result); // 30


// ==========================================
// Урок 25. ЗАВДАННЯ 4: Робота зі складними типами та масивами (modifyUser)
// ==========================================
type User = {
  id: string;
  name: string;
};

const modifyUser = (
  user: User[], 
  id: string, 
  makeChange: (user: User) => User
) => {
  return user.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }
    return u;
  });
};

const users: User[] = [
  { id: "1", name: "John" },
  { id: "2", name: "Jane" },
];

const modifiedUsers = modifyUser(users, "1", (user) => {
  return { ...user, name: "Waqas" };
});

console.log(modifiedUsers);

// ==========================================
// Урок26. ЗАВДАННЯ 1: Базові властивості x та y з модифікатором readonly
// ==========================================
class CanvasNodeTask1 {
  readonly x: number = 0;
  readonly y: number = 0;
}

const nodeTask1 = new CanvasNodeTask1();
console.log(nodeTask1.x); // 0
console.log(nodeTask1.y); // 0


// ==========================================
// Урок26. ЗАВДАННЯ 2: Додавання методу move
// ==========================================
class CanvasNodeTask2 {
  x = 0;
  y = 0;

  move(x: number, y: number) {
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
  x: number;
  y: number;

  constructor(position?: { x: number; y: number }) {
    this.x = position?.x ?? 0;
    this.y = position?.y ?? 0;
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  move(x: number, y: number) {
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
  #x: number;
  #y: number;

  constructor(position?: { x: number; y: number }) {
    this.#x = position?.x ?? 0;
    this.#y = position?.y ?? 0;
  }

  get position(): { x: number; y: number } {
    return { x: this.#x, y: this.#y };
  }

  set position(newPosition: { x: number; y: number }) {
    this.#x = newPosition.x;
    this.#y = newPosition.y;
  }

  move(x: number, y: number): void {
    this.#x = x;
    this.#y = y;
  }
}

const finalNode = new CanvasNode();
console.log("Початкова позиція:", finalNode.position); // { x: 0, y: 0 }

finalNode.move(10, 20);
console.log("Після move(10, 20):", finalNode.position); // { x: 10, y: 20 }

finalNode.position = { x: 75, y: 150 };
console.log("Після оновлення через сеттер:", finalNode.position); // { x: 75, y: 150 }

// ==========================================
// Урок 27. ЗАВДАННЯ 1: Створення інтерфейсу UserProfile та об'єкта myUser
// ==========================================
interface UserProfile {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  readonly createdAt: Date | string;
}

const myUser: UserProfile = {
  id: 1,
  name: "Олександр",
  email: "oleksandr@example.com",
  createdAt: new Date(),
};

console.log("Початковий користувач:", myUser);

// Помилки компілятора (закоментовані, щоб код збігався):
// myUser.id = 2;               // Помилка: Неможливо змінити, але тут помилка через відсутність readonly, проте в логіці завдання id зазвичай змінюється, якщо немає readonly. Якщо зробити id readonly: readonly id: number, тоді буде помилка.
// myUser.createdAt = "2026-01-01"; // Помилка компілятора: Cannot assign to 'createdAt' because it is a read-only property.


// ==========================================
// Урок 27. ЗАВДАННЯ 2: Інтерфейс для функції фільтрації масиву та реалізація filterLength
// ==========================================
interface StringFilterFn {
  (array: string[], criterion: string): string[];
}

const filterLength: StringFilterFn = (array, criterion) => {
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
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  work(): string {
    return `${this.name} працює.`;
  }
}

class Developer extends Worker {
  programmingLanguage: string;

  constructor(name: string, programmingLanguage: string) {
    super(name);
    this.programmingLanguage = programmingLanguage;
  }

  work(): string {
    return `${this.name} пише код на ${this.programmingLanguage}.`;
  }
}

const dev = new Developer("Олександр", "TypeScript");
console.log(dev.work()); // Олександр пише код на TypeScript.


// ==========================================
// Урок 28. ЗАВДАННЯ 2: Базовий клас Rectangle та дочірній Square (використання super)
// ==========================================
class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  side: number;

  constructor(side: number) {
    super(side, side);
    this.side = side;
  }

  describe(): string {
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
  protected balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }
}

class SavingsAccount extends BankAccount {
  addInterest(rate: number): void {
    this.balance += this.balance * (rate / 100);
  }

  getBalance(): number {
    return this.balance; // Доступно завдяки модифікатору protected
  }
}

const myAccount = new SavingsAccount(1000);
myAccount.deposit(500);
myAccount.addInterest(10); // Нараховуємо 10%
console.log("Поточний баланс ощадного рахунку:", myAccount.getBalance()); // 1650


// Ізоляція файлу як модуля для запобігання конфліктам імен з іншими файлами
export {};

