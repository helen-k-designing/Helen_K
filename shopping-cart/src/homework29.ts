// ==========================================
// ЗАВДАННЯ 1: Функція wrapInArray
// ==========================================
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numArr = wrapInArray(42); // Має мати тип number[]
const strArr = wrapInArray("hello"); // Має мати тип string[]

console.log("wrapInArray (number):", numArr);
console.log("wrapInArray (string):", strArr);


// ==========================================
// ЗАВДАННЯ 2: Функція getLength з обмеженням (extends HasLength)
// ==========================================
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

console.log("getLength масиву:", getLength([1, 2, 3])); // Працює (3)
console.log("getLength рядка:", getLength("TypeScript")); // Працює (10)
// getLength(123); // Помилка компіляції: у number немає length


// ==========================================
// ЗАВДАННЯ 3: Функція first для отримання першого елемента масиву
// ==========================================
function first<T>(coll: Array<T>): T | null {
  return coll[0] ?? null;
}

console.log("first пустого масиву:", first([])); // null
console.log("first масиву чисел:", first([3, 2])); // 3
console.log("first масиву рядків:", first(["code-basics", "hexlet"])); // code-basics


// ==========================================
// ЗАВДАННЯ 4: Функція getProperty з використанням keyof
// ==========================================
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Олена" };
console.log("getProperty для 'name':", getProperty(user, "name")); // Працює, повертає 'Олена'
// getProperty(user, "age"); // Помилка компіляції: 'age' не існує в user


// Ізоляція файлу як модуля для запобігання конфліктам імен з іншими файлами
export {};