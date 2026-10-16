"use strict";
const hello = "Hello, World!";
console.log(hello);
// --- Функції з домашнього завдання TypeScript ---
// 1. Функція для з'єднання двох рядків (наприклад, бренд + назва товару)
const concatTwoStrings = (a, b) => {
    return [a, b].join(" ");
};
// 2. Функція для додавання чисел (наприклад, розрахунок загальної вартості)
const add = (a, b) => {
    return a + b;
};
// Початковий стан магазину
let products = [];
let currentPage = 1;
const itemsPerPage = 3;
// --- Робота з елементами інтерфейсу (DOM) ---
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (event) => {
    const input = event.target;
    console.log(`User typed: ${input.value}`);
    // Тут в майбутньому буде фільтрація за назвою
});
const sortSelect = document.getElementById("sortSelect");
sortSelect.addEventListener("change", (event) => {
    const select = event.target;
    console.log(`User selected: ${select.value}`);
});
const priceMax = document.getElementById("priceMax");
priceMax.addEventListener("input", (event) => {
    const input = event.target;
    console.log(`User set max price: ${input.value}`);
});
const priceMin = document.getElementById("priceMin");
priceMin.addEventListener("input", (event) => {
    const input = event.target;
    console.log(`User set min price: ${input.value}`);
});
const checkboxes = document.querySelectorAll('.category-checkbox');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
        const input = event.target;
        console.log(`User ${input.checked ? "checked" : "unchecked"}: ${input.value}`);
    });
});
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
clearFiltersBtn.addEventListener("click", () => {
    searchInput.value = "";
    sortSelect.selectedIndex = 0;
    priceMax.value = "";
    priceMin.value = "";
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    console.log("Filters cleared");
});
const container = document.getElementById('productsContainer');
const paginationContainer = document.getElementById('paginationContainer');
const totalProductsCountHTML = document.getElementById('totalProductsCount');
// --- Демонстрація роботи домашнього завдання на сторінці ---
document.addEventListener("DOMContentLoaded", () => {
    // Використовуємо функцію concatTwoStrings для формування назви товару
    const formattedTitle = concatTwoStrings("Super", "Gadget Pro");
    // Використовуємо функцію add для розрахунку ціни зі знижкою чи доставкою
    const basePrice = 1000;
    const deliveryCost = 150;
    const finalPrice = add(basePrice, deliveryCost);
    if (totalProductsCountHTML) {
        totalProductsCountHTML.textContent = "1";
    }
    if (container) {
        container.innerHTML = `
      <div class="product-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fff;">
        <h3>${formattedTitle}</h3>
        <p>Ціна з доставкою: <strong>${finalPrice} грн</strong></p>
        <button id="demoBuyBtn" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Купити</button>
      </div>
    `;
        const demoBuyBtn = document.getElementById("demoBuyBtn");
        demoBuyBtn === null || demoBuyBtn === void 0 ? void 0 : demoBuyBtn.addEventListener("click", () => {
            alert(`Ви замовили "${formattedTitle}" на суму ${finalPrice} грн!`);
        });
    }
});
// 3. Клас для кошика
class ShoppingCart {
    constructor() {
        // private items: CartItem[] = [];
        // Використовуємо Map для швидкого пошуку та оновлення за id товару
        this.items = new Map();
    }
    // Додати товар у кошик
    addItem(product, quantity = 1) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero.");
        }
        if (this.items.has(product.id)) {
            // Якщо товар вже є у кошику, оновлюємо кількість
            const existingItem = this.items.get(product.id);
            existingItem.quantity += quantity;
        }
        else {
            // Якщо товару немає у кошику, додаємо новий елемент
            this.items.set(product.id, { product, quantity });
        }
    }
    // Видалити товар з кошика
    // removeItem(productId: string): void {
    //   if (this.items.has(productId)) {
    //     this.items.delete(productId);
    //   } else {
    //     throw new Error("Product not found in the cart.");
    //   }
    // }
    // removeItem(productId: string):boolean {
    //   if (this.items.has(productId)) {
    //     this.items.delete(productId);
    //     return true; // Повертаємо true, якщо товар успішно видалено
    //   } else {
    //     return false; // Повертаємо false, якщо товар не знайдено
    //   }
    // }
    removeItem(productId) {
        return this.items.delete(productId);
    }
    // updateItemQuantity(productId: string, quantity: number): void {
    //   if (quantity <= 0) {
    //     throw new Error("Quantity must be greater than zero.");
    //   }
    //   if (this.items.has(productId)) {
    //     const item = this.items.get(productId)!;
    //     item.quantity = quantity;
    //   } else {
    //     throw new Error("Product not found in the cart.");
    //   }
    // }
    // Отримати всі товари у кошику
    getItems() {
        return Array.from(this.items.values());
    }
    // Оновити кількість товару у кошику
    updateItemQuantity(productId, quantity) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero.");
        }
        if (this.items.has(productId)) {
            const item = this.items.get(productId);
            item.quantity = quantity;
        }
        else {
            throw new Error("Product not found in the cart.");
        }
    }
    // Отримати загальну вартість товарів у кошику
    getTotalPrice() {
        let total = 0;
        for (const item of this.items.values()) {
            total += item.product.price * item.quantity;
        }
        // return total;
        // Округлення до 2 знаків після коми для уникнення проблем з розрахунками Float
        return Math.round(total * 100) / 100;
    }
    // Отримати загальну кількість товарів у кошику
    getTotalItems() {
        let totalItems = 0;
        for (const item of this.items.values()) {
            totalItems += item.quantity;
        }
        return totalItems;
    }
    // Очистити кошик
    clearCart() {
        this.items.clear();
    }
}
const cart = new ShoppingCart();
// Наші товари
const laptop = { id: "p1", name: "Ноутбук", price: 25000 };
const mouse = { id: "p2", name: "Мишка", price: 800 };
// 1. Додаємо товари
cart.addItem(laptop);
cart.addItem(mouse, 2); // Додали 2 мишки
cart.addItem(mouse); // Додали ще одну мишку (разом 3)
console.log("Товари в кошику:", cart.getItems());
console.log("Загальна кількість:", cart.getTotalItems()); // Виведе: 4
console.log("Загальна вартість:", cart.getTotalPrice()); // Виведе: 27400
// 2. Оновлюємо кількість
cart.updateItemQuantity("p2", 1); // Зменшили кількість мишок до 1
console.log("Нова вартість після оновлення:", cart.getTotalPrice()); // Виведе: 25800
// 3. Видаляємо товар
cart.removeItem("p1"); // Видалили ноутбук
console.log("Загальна кількість після видалення:", cart.getTotalItems()); // Виведе: 1