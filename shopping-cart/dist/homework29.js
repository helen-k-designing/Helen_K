// ==========================================
// ЗАВДАННЯ 1: Функція wrapInArray
// ==========================================
function wrapInArray(value) {
    return [value];
}
const numArr = wrapInArray(42); // Має мати тип number[]
const strArr = wrapInArray("hello"); // Має мати тип string[]
console.log("wrapInArray (number):", numArr);
console.log("wrapInArray (string):", strArr);
function getLength(arg) {
    return arg.length;
}
console.log("getLength масиву:", getLength([1, 2, 3])); // Працює (3)
console.log("getLength рядка:", getLength("TypeScript")); // Працює (10)
// getLength(123); // Помилка компіляції: у number немає length
// ==========================================
// ЗАВДАННЯ 3: Функція first для отримання першого елемента масиву
// ==========================================
function first(coll) {
    var _a;
    return (_a = coll[0]) !== null && _a !== void 0 ? _a : null;
}
console.log("first пустого масиву:", first([])); // null
console.log("first масиву чисел:", first([3, 2])); // 3
console.log("first масиву рядків:", first(["code-basics", "hexlet"])); // code-basics
// ==========================================
// ЗАВДАННЯ 4: Функція getProperty з використанням keyof
// ==========================================
function getProperty(obj, key) {
    return obj[key];
}
const user = { id: 1, name: "Олена" };
console.log("getProperty для 'name':", getProperty(user, "name")); // Працює, повертає 'Олена'
export {};
